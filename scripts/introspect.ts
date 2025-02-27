/**
 * introspect.
 * this is a utility script for reading an existing drizzle table
 * and generating a drizzle-next scaffold command from the table.
 * usage example: tsx scripts/introspect.ts myTable
 */

import { schema } from "@/lib/schema";
import { getTableConfig } from "drizzle-orm/sqlite-core";
import fs from "fs";

type PackageManagers = "npm" | "pnpm" | "bun";

const PACKAGE_MANAGER_RECORD: Record<PackageManagers, string> = {
  npm: "npx",
  pnpm: "pnpm dlx",
  bun: "bunx",
};

async function main() {
  const tableName = process.argv[2];

  const drizzleNextConfig = JSON.parse(
    fs.readFileSync("drizzle-next.config.json", "utf-8")
  );

  const pkg =
    PACKAGE_MANAGER_RECORD[drizzleNextConfig.packageManager as PackageManagers];

  const table = schema[tableName as keyof typeof schema];

  if (!table) {
    throw new Error(`${tableName} schema not found`);
  }

  const conf = getTableConfig(table as any);

  const fkSet = new Set<string>();

  for (const fk of conf.foreignKeys) {
    const ref = fk.reference();
    for (const column of ref.columns) {
      fkSet.add(column.name);
    }
  }

  let command =
    `${pkg} drizzle-next@latest scaffold ${camelToSnakeCase(tableName)}` + ` -c `;

  for (const col of conf.columns) {
    if (
      ["id", "created_at", "updated_at"].includes(camelToSnakeCase(col.name))
    ) {
      continue;
    }

    command +=
      camelToSnakeCase(col.name) +
      ":" +
      transformSQLType(col.getSQLType(), col.name, fkSet) +
      " ";
  }

  console.log(command);
}

function camelToSnakeCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

function transformSQLType(
  sqlType: string,
  columnName: string,
  fkSet: Set<string>
) {
  if (columnName.endsWith("Id") && fkSet.has(columnName)) {
    return "references";
  }
  if (sqlType.startsWith("varchar")) {
    return "varchar";
  }
  if (sqlType.startsWith("char")) {
    return "char";
  }
  if (sqlType.startsWith("double precision")) {
    return "doublePrecision";
  }
  return sqlType;
}

main();
