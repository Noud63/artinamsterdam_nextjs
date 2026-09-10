import AddVenueForm from "@/components/AddVenueForm";


export default function AdminAddVenuePage() {

  return (
    <div className="max-w-[650px] flex flex-col items-center min-h-screen mb-20 mt-20 mx-auto">
      <h2 className="w-full text-3xl font-semibold mb-6 border-b-2 border-dotted pb-2">Add Venue</h2>
      
        <AddVenueForm />
     
     
    </div>
  );
}
