export async function DELETE(request) {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  // Validate ID, connect to database, delete user
}