import Image from "next/image";
import { User2Icon } from "lucide-react";
import { User } from "@/schema/users";
import Link from "next/link";

export function PrivateHeader({ user }: { user: User }) {
  return (
    <header className="flex h-8 shrink-0 items-center gap-2 bg-gray-200 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 fixed w-full z-20 justify-between">
      <div className="flex w-full justify-between items-center">
        <div className="font-mono font-bold px-2">
          <Link href="/">drizzle-next</Link>
        </div>
        <div className="flex gap-2 px-2">
          {user.image ? (
            <Image src={user.image} unoptimized alt="avatar" />
          ) : (
            <User2Icon />
          )}
          <div>{user.name}</div>
        </div>
      </div>
    </header>
  );
}
