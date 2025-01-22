import { notFound } from "next/navigation";
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
      <h1 className="font-bold">Post</h1>
      <p><strong>Title:</strong> { postObj.title }</p>
      <p><strong>Content:</strong> { postObj.content }</p>
      <p><strong>Created At:</strong> { postObj.createdAt?.toLocaleString() }</p>
      <p><strong>Updated At:</strong> { postObj.updatedAt?.toLocaleString() }</p>
    </div>
  );
}
