import AddVenueForm from "@/components/AddVenueForm";
import Link from "next/link";

export default function AdminAddVenuePage() {

  return (
    <div className="flex flex-col items-center min-h-screen mb-20">
      <h2 className="text-3xl font-semibold mb-6">Add Venue</h2>
      <div className="flex w-full justify-center">
        <AddVenueForm />
      </div>
     <div className="backButton mt-8">
        <Link href="/admin">Back</Link>
      </div>
    </div>
  );
}
