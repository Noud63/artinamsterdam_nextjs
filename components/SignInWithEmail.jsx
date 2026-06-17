"use client";
import Image from "next/image";

import { signIn } from "next-auth/react";
import { useState } from "react";

const  SignInWithEmail = () =>  {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn("email", {
      email,
      callbackUrl: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-[240px]">
      {/* <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@domain.com"
        className="flex pl-6 border-2 border-white w-full rounded-full h-[60px] outline-none placeholder-white/80 caret-white"
      /> */}

      <button type="submit" className="mt-1 flex w-full h-[60px] items-center justify-center rounded-full text-lg text-white  border-t border-t-yellow-200 
      border-b-2 border-b-yellow-950/50 bg-linear-to-t from-yellow-800 to-transparent cursor-pointer" disabled={true}>
        <Image
          src="/images/magiclink_3.png"
          alt="magic link"
          width={35}
          height={35}
          style={{ width: "35px", height: "auto", marginRight: "10px" }}
        />Send email link
      </button>
    </form>
  );
}

export default SignInWithEmail