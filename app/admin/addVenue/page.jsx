import AddVenueForm from "@/components/AddVenueForm";


export default function AdminAddVenuePage() {

  return (
    <div className="flex flex-col items-center min-h-screen mb-20">
      <h2 className="text-3xl font-semibold mb-6">Add Venue</h2>
      <div className="flex w-full justify-center">
        <AddVenueForm />
      </div>
     
    </div>
  );
}
