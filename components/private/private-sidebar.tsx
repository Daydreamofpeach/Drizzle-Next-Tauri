"use client";

import {
  Table2Icon,
  LayoutDashboardIcon,
  UserIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboardIcon },
  // [CODE_MARK private-sidebar-items]
  { title: "Profile", url: "/profile", icon: UserIcon },
  { title: "Sign out", url: "/signout", icon: LogOutIcon },
];

export function PrivateSidebar() {
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
