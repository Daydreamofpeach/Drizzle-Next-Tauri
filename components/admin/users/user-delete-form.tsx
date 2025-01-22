"use client";

import { deleteUser, DeleteUserState } from "@/actions/admin/users/delete-user";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { User } from "@/schema/users";

export function UserDeleteForm({ user }: { user: User }) {
  const initialState: DeleteUserState = {};
  const [state, dispatch] = useActionState(deleteUser, initialState);

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-2">
        <input type="hidden" name="id" value={ user.id} />
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
