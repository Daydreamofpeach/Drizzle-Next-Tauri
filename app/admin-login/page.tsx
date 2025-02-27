import { AdminLoginForm } from "@/components/admin-login/admin-login-form";

export default async function Page() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-5 border rounded p-5">
        <h1>Admin Login</h1>
        <AdminLoginForm />
      </div>
    </div>
  );
}
