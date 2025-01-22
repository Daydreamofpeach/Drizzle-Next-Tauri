import { eq, asc, desc, SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { Post, posts } from "@/schema/posts";

export type PostsWithRelationsList = Awaited<
  ReturnType<typeof getPostsWithRelationsList>
>;

export async function getPostsWithRelationsList({
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
  if (sort && sort in posts) {
    switch (sortOrder) {
      case "asc":
        orderBy = asc(posts[sort as keyof Post]);
        break;
      case "desc":
        orderBy = desc(posts[sort as keyof Post]);
        break;
    }
  }

  return await db.query.posts.findMany({
    where: filters,
    orderBy: orderBy,
    limit: limit,
    offset: offset,
    with: undefined
  });
}

export type PostWithRelations = Awaited<
  ReturnType<typeof getPostWithRelations>
>;

export async function getPostWithRelations(id: string) {
  return await db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: undefined,
  });
}
