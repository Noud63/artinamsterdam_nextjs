import MapLoader from "@/components/MapLoader";
import dbConnect from "@/lib/dbConnect";
import Venue from "@/models/venue";

export default async function Home() {
   await dbConnect();
  
   const data = await Venue.find({}).lean();
   
//Convert DB data to GeoJSON
const venues = {
  type: "FeatureCollection",
  features: data.map((venue) => ({
    type: "Feature",

    id: venue.legacyId,

    geometry: {
      type: "Point",
      coordinates: venue.location.coordinates,
    },

    properties: {
      name: venue.name,
      title: venue.title,
      image: venue.image,
      address: venue.address,
      extra: venue.extra,
      link: venue.link,
      open: venue.open,
      category: venue.category,
    },
  })),
};
  
  return (
    <main className="relative h-full w-full overflow-hidden">
      <MapLoader venues={JSON.parse(JSON.stringify(venues))} />
    </main>
  );
}
