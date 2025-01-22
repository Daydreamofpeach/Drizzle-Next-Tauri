import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignInForm } from "@/components/signin/signin-form";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-5 border p-5 m-5 rounded">
        <h1 className="font-bold mb-5">Sign In</h1>
            <SignInForm />
          {searchParams.error && (
            <p>Login failed</p>
          )}
      </div>
    </div>
  );
}
