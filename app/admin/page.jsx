import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <main className="adminPage min-h-screen flex flex-col items-center text-white">
      <header className="adminHeader w-full py-2 text-center ">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p>Welcome, {session.user.username}</p>
      </header>
      <section>
        <div className="flex justify-center flex-row gap-4 mt-8">
          <Link
            href="/"
            className="adminMenuButton flex justify-center items-center py-2"
          >
            Home
          </Link>
          <Link
            href="/"
            className="adminMenuButton flex justify-center items-center py-2"
          >
            Add Venue
          </Link>
          <Link
            href="/"
            className="adminMenuButton flex justify-center items-center py-2"
          >
            Remove User
          </Link>
          <Link
            href="/"
            className="adminMenuButton flex justify-center items-center py-2"
          >
            Remove Post
          </Link>
          <Link
            href="/"
            className="adminMenuButton flex justify-center items-center py-2"
          >
            Remove Comment
          </Link>
          <Link
            href="/"
            className="adminMenuButton flex justify-center items-center py-2"
          >
            Submit Warning
          </Link>
        </div>
      </section>
    </main>
  );
}
