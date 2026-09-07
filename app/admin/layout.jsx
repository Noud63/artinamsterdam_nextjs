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
    <div className="flex flex-col text-white w-full flex flex-col min-h-screen items-center overflow-y-auto">
      <main>{children}</main>
    </div>
  );
}