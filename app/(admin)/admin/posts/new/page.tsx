import { PostCreateForm } from "@/components/admin/posts/post-create-form";

export default async function Page() {

  return (
    <div className="p-2">
      <h1 className="font-bold">New Post</h1>
      <PostCreateForm 
      />
    </div>
  );
}
