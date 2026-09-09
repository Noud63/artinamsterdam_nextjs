import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex w-full flex-col text-white min-h-screen items-center overflow-y-auto mx-8">
      <main className="w-full min-w-0">{children}</main>
    </div>
  );
}
