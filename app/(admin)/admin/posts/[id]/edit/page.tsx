import { notFound } from "next/navigation";
import { PostUpdateForm } from "@/components/admin/posts/post-update-form";
import { getPostWithRelations } from "@/queries/post-queries";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const postObj = await getPostWithRelations(id);

  if (!postObj) {
    notFound();
  }


  return (
    <div className="p-2">
      <h1 className="font-bold">Editing Post</h1>
      <PostUpdateForm 
        post={ postObj }
      />
    </div>
  );
}
