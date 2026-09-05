import React from 'react'
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';
import Link from 'next/link';

const UserEmailsPage = async () => {

    await dbConnect();

    const data = await User.find({}).lean();
    const emails = data.map((user) => user.email);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="w-full text-xl font-bold mb-4 border-b">User Emails</h1>
      <ul className="list-disc list-inside">
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
      <div className="backButton mt-8">
        <Link href="/admin">Back</Link>
      </div>
    </div>
  )
}

export default UserEmailsPage