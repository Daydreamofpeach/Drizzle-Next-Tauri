"use client";

import { deletePost, DeletePostState } from "@/actions/admin/posts/delete-post";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { Post } from "@/schema/posts";

export function PostDeleteForm({ post }: { post: Post }) {
  const initialState: DeletePostState = {};
  const [state, dispatch] = useActionState(deletePost, initialState);

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-2">
        <input type="hidden" name="id" value={ post.id} />
        <div>
          <Button type="submit">
            Delete
          </Button>
        </div>
        {state.message && <p>{state.message}</p>}
      </form>
    </div>
  );
}
