"use client";

import { startTransition, useActionState } from "react";
import { updatePost, UpdatePostState } from "@/actions/admin/posts/update-post";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TiptapEditor } from "@/components/tiptap-editor";

import { Post } from "@/schema/posts";

export function PostUpdateForm({ 
  post,
}: { 
  post: Post;
}) {
  const initialState: UpdatePostState = {};
  const [state, dispatch] = useActionState(updatePost, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
    <div>
      <form action={dispatch} onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="hidden" name="id" value={ post.id } />
        <div>
          <Label>Title</Label>
          <Input name="title" defaultValue={ post.title ?? "" } />
          {state.errors?.title?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Content</Label>
          <TiptapEditor html={ post.content ?? ""} name="content" />
          {state.errors?.content?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Created At</Label>
          <Input name="createdAt" defaultValue={ post.createdAt?.toLocaleString() ?? "" } />
          {state.errors?.createdAt?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Updated At</Label>
          <Input name="updatedAt" defaultValue={ post.updatedAt?.toLocaleString() ?? "" } />
          {state.errors?.updatedAt?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Button type="submit">Submit</Button>
        </div>
        {state.message && <p>{state.message}</p>}
      </form>
    </div>
  );
}
