import { notFound } from "next/navigation";
import { UserUpdateForm } from "@/components/admin/users/user-update-form";
import { getUserWithRelations } from "@/queries/user-queries";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const { id } = params;
  const userObj = await getUserWithRelations(id);

  if (!userObj) {
    notFound();
  }


  return (
    <div className="p-2">
      <h1 className="font-bold">Editing User</h1>
      <UserUpdateForm 
        user={ userObj }
      />
    </div>
  );
}
