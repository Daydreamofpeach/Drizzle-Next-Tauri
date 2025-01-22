import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { db } from "@/lib/db";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search-input";
import { parseSearchParams } from "@/lib/search-params-utils";
import { posts } from "@/schema/posts";
import { PostTable } from "@/components/admin/posts/post-table";
import { getPostsWithRelationsList } from "@/queries/post-queries";
import { like } from "drizzle-orm";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const {
    page = 1,
    pageIndex = 0,
    pageSize = 10,
    search,
    sort = "createdAt",
    sortOrder = "desc",
  } = parseSearchParams(searchParams);
  const filters = search ? like(posts.id, `%${search}%`) : undefined;
  const count = await db.$count(posts, filters);
  const totalPages = Math.ceil(count / pageSize);
  const postList = await getPostsWithRelationsList({
    filters: filters,
    sort: sort,
    sortOrder: sortOrder,
    limit: pageSize,
    offset: pageIndex * pageSize,
  });

  return (
    <div className="flex flex-col p-2 gap-2">
      <h1 className="font-bold">Posts</h1>
      <div className="flex gap-2 flex-wrap justify-between">
        <div>
          <SearchInput />
        </div>
        <div>
          <Link href="/admin/posts/new">
            <Button className="flex gap-1">
              <PlusIcon /> New
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <PostTable postList={ postList } />
      </div>
      <div className="p-2">
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          count={count}
        />
      </div>
    </div>
  );
}
