import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 dark:border-gray-700">
      <div className="container flex mx-auto h-14 items-center justify-center">
        <Link
          href="https://www.drizzle-next.com"
          className="underline"
          target="_blank"
        >
          www.drizzle-next.com
        </Link>
      </div>
    </footer>
  );
}
