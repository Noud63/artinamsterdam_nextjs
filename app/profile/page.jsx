import { auth } from "@/auth";

const ProfilePage = async () => {
  const session = await auth();

  return (
    <div className="w-full max-w-[400px] flex flex-col mt-16 min-h-screen text-white px-4">
      <h1 className="text-xl font-bold mb-4 border-b-2 border-dotted pb-2"> {session?.user?.role?.charAt(0)?.toUpperCase() + session?.user?.role?.slice(1)} Profile</h1>
      <div className="flex flex-col gap-2">
      <div className="flex"><span className="font-bold w-[100px] flex">Name:</span> {session?.user?.name}</div>
      <div className="flex"><span className="font-bold w-[100px] flex">Username:</span> {session?.user?.username}</div>
      <div className="flex"><span className="font-bold w-[100px] flex">Email:</span> {session?.user?.email}</div>
      <div className="flex"><span className="font-bold w-[100px] flex">Avatar:</span> {session?.user?.avatar ? session?.user?.avatar : "No avatar"}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
