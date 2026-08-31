import Link from "next/link";

export default function RemoveUserPage() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-6">Remove User</h2>
      <div className="w-full max-w-2xl">
        <p className="flex justify-center text-gray-300 mb-6">
          Search and remove users from the system.
        </p>
        {/* Add RemoveUserForm component here */}
      </div>
      <div className="backButton mt-8">
        <Link href="/admin">Back</Link>
      </div>
    </div>
  );
}
