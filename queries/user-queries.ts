import { eq, asc, desc, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { User, users } from "@/schema/users";

export type UsersWithRelationsList = Awaited<
  ReturnType<typeof getUsersWithRelationsList>
>;

export async function getUsersWithRelationsList({
  filters,
  limit,
  offset,
  sort,
  sortOrder,
}: {
  filters?: SQL;
  limit?: number;
  offset?: number;
  sort?: string;
  sortOrder?: string;
}) {
  let orderBy;
  if (sort && sort in users) {
    switch (sortOrder) {
      case "asc":
        orderBy = asc(users[sort as keyof User]);
        break;
      case "desc":
        orderBy = desc(users[sort as keyof User]);
        break;
    }
  }

  return await db.query.users.findMany({
    where: filters,
    orderBy: orderBy,
    limit: limit,
    offset: offset,
    with: undefined
  });
}

export type UserWithRelations = Awaited<
  ReturnType<typeof getUserWithRelations>
>;

export async function getUserWithRelations(id: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: undefined,
  });
}
