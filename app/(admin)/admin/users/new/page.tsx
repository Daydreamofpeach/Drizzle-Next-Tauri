import { UserCreateForm } from "@/components/admin/users/user-create-form";

export default async function Page() {

  return (
    <div className="p-2">
      <h1 className="font-bold">New User</h1>
      <UserCreateForm 
      />
    </div>
  );
}
