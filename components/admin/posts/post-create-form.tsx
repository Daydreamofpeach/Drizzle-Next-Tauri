"use client";

import { startTransition, useActionState } from "react";
import { createPost, CreatePostState } from "@/actions/admin/posts/create-post";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TiptapEditor } from "@/components/tiptap-editor";


export function PostCreateForm() {
  const initialState: CreatePostState = {};
  const [state, dispatch] = useActionState(createPost, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
    <div>
      <form action={dispatch} onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <Label>Title</Label>
          <Input name="title" />
          {state.errors?.title?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Content</Label>
          <TiptapEditor html="" name="content" />
          {state.errors?.content?.map((error) => (
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
