import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, GaugeIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col justify-center h-screen">
      <Header />
      <main className="flex flex-col flex-1 gap-5 w-72 m-auto justify-center">
        <h1 className="text-4xl font-bold font-mono">drizzle-next</h1>
        <Link href="https://www.drizzle-next.com/docs" target="_blank">
          <Button className="w-full flex items-center gap-2 justify-center">
            <ExternalLinkIcon /> View Documentation
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button className="w-full flex items-center gap-2 justify-center">
            <LayoutDashboardIcon /> User Dashboard
          </Button>
        </Link>
        <Link href="/admin">
          <Button className="w-full flex items-center gap-2 justify-center">
            <GaugeIcon /> Admin Dashboard
          </Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
