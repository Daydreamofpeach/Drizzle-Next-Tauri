import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { UserDeleteForm } from "@/components/admin/users/user-delete-form";
import { db } from "@/lib/db";
import { users } from "@/schema/users";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const userObj = await db.query.users.findFirst({ where: eq(users.id, id) });

  if (!userObj) {
    notFound();
  }

  return (
    <div className="p-2">
      <h1 className="font-bold">Delete User</h1>
      <UserDeleteForm user={ userObj } />
    </div>
  );
}
