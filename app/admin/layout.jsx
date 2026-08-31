import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="adminPage min-h-screen flex flex-col text-white">
      <AdminHeader user={session.user} />
      <main className="flex-1 w-full px-4 py-8">{children}</main>
    </div>
  );
}
