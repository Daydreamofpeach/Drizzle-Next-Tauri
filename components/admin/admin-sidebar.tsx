"use client";

import { Table2Icon, GaugeIcon, SettingsIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = [
  { title: "Admin", url: "/admin", icon: GaugeIcon },
    { title: "Users", url: "/admin/users", icon: Table2Icon },
  { title: "Posts", url: "/admin/posts", icon: Table2Icon },
// [CODE_MARK admin-sidebar-items]
  { title: "Settings", url: "/admin/settings", icon: SettingsIcon },
  { title: "Sign out", url: "/signout", icon: LogOutIcon },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col text-sm w-8 sm:w-40 fixed min-h-screen z-20 top-8 border-r bg-gray-200 dark:bg-gray-900 border-gray-300 dark:border-gray-700">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className={cn(
            "flex items-center gap-1 p-1 hover:bg-muted m-1 rounded",
            pathname === item.url && "bg-muted"
          )}
        >
          <item.icon className="flex-shrink-0 w-4 h-4" />
          <span className="hidden sm:block">{item.title}</span>
        </Link>
      ))}
    </div>
  );
}