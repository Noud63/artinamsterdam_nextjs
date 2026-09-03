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
    <div className="min-h-screen flex flex-col text-white">
      <AdminHeader user={session.user} />
      <main>{children}</main>
    </div>
  );
}
