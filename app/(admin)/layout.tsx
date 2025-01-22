import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { users } from "@/schema/users";
import { isAdmin } from "@/services/authorization-service";
import { AdminHeader } from "@/components/admin/admin-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/admin-login");
  }

  if (!isAdmin(session)) {
    redirect("/admin-login");
  }

  const userObj = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
  });

  if (!userObj) {
    redirect("/admin-login");
  }

  return (
    <div>
      <AdminHeader user={userObj} />
      <div>
        <AdminSidebar />
        <div className="flex flex-col ml-8 sm:ml-40">
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
