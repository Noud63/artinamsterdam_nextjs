import React from "react";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import Link from "next/link";

const UserEmailsPage = async () => {
  await dbConnect();

  const data = await User.find({}).lean();
  const emails = data.map((user) => user.email);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="w-full text-xl font-bold mb-4 border-b-2 border-dotted">User Emails</h1>
      <ul className="list-disc list-inside">
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
      <div className="rounded-full w-[200px] py-3 px-2 mt-8 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-900 
      bg-[linear-gradient(to_top,rgb(120,69,21,1),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest">
        <Link href="/admin">Back</Link>
      </div>
    </div>
  );
};

export default UserEmailsPage;
