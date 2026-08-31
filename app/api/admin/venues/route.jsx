import { auth } from "@/auth";

export async function POST(request) {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  // Admin-only operation
}