import { auth } from "@/auth";

export async function POST(request) {
  const session = await auth();

  const { name } = await request.json();

  if (session?.user?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  return Response.json({ name }, { status: 200 });
}