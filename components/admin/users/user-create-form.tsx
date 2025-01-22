"use client";

import { startTransition, useActionState } from "react";
import { createUser, CreateUserState } from "@/actions/admin/users/create-user";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export function UserCreateForm() {
  const initialState: CreateUserState = {};
  const [state, dispatch] = useActionState(createUser, initialState);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    startTransition(() => dispatch(formData));
  }

  return (
    <div>
      <form action={dispatch} onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div>
          <Label>Name</Label>
          <Input name="name" />
          {state.errors?.name?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Email</Label>
          <Input name="email" />
          {state.errors?.email?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Email Verified</Label>
          <Input name="emailVerified" />
          {state.errors?.emailVerified?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Image</Label>
          <Input name="image" />
          {state.errors?.image?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Role</Label>
          <Input name="role" />
          {state.errors?.role?.map((error) => (
            <p className="text-destructive" key={error}>{error}</p>
          ))}
        </div>
        <div>
          <Label>Password</Label>
          <Input name="password" />
          {state.errors?.password?.map((error) => (
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
