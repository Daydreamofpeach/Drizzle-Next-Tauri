import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { PostDeleteForm } from "@/components/admin/posts/post-delete-form";
import { db } from "@/lib/db";
import { posts } from "@/schema/posts";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const postObj = await db.query.posts.findFirst({ where: eq(posts.id, id) });

  if (!postObj) {
    notFound();
  }

  return (
    <div className="p-2">
      <h1 className="font-bold">Delete Post</h1>
      <PostDeleteForm post={ postObj } />
    </div>
  );
}
