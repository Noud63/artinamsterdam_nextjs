import DeleteVenueForm from "@/components/DeleteVenueForm";
import Link from "next/link";

export default function DeleteVenuePage() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-6">Delete Venue</h2>
      <div className="flex w-full max-w-4xl justify-center">
        <DeleteVenueForm />
      </div>
      <div className="backButton mt-8">
        <Link href="/admin">Back</Link>
      </div>
    </div>
  );
}
