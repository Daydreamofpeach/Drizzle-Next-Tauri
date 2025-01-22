"use client";

import { startTransition, useActionState } from "react";
import { updateUser, UpdateUserState } from "@/actions/admin/users/update-user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { User } from "@/schema/users";

export function UserUpdateForm({ 
  user,
}: { 
  user: User;
}) {
  const initialState: UpdateUserState = {};
  const [state, dispatch] = useActionState(updateUser, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
    <div>
      <form action={dispatch} onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="hidden" name="id" value={ user.id } />
        <div>
          <Label>Name</Label>
          <Input name="name" defaultValue={ user.name ?? "" } />
          {state.errors?.name?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Email</Label>
          <Input name="email" defaultValue={ user.email ?? "" } />
          {state.errors?.email?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Email Verified</Label>
          <Input name="emailVerified" defaultValue={ user.emailVerified?.toLocaleString() ?? "" } />
          {state.errors?.emailVerified?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Image</Label>
          <Input name="image" defaultValue={ user.image ?? "" } />
          {state.errors?.image?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Role</Label>
          <Input name="role" defaultValue={ user.role ?? "" } />
          {state.errors?.role?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Password</Label>
          <Input name="password" defaultValue={ user.password ?? "" } />
          {state.errors?.password?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Created At</Label>
          <Input name="createdAt" defaultValue={ user.createdAt?.toLocaleString() ?? "" } />
          {state.errors?.createdAt?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Updated At</Label>
          <Input name="updatedAt" defaultValue={ user.updatedAt?.toLocaleString() ?? "" } />
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
