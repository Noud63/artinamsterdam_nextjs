"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

const LoginForm = () => {
  return (
    <div className="w-full flex mt-4 flex-col items-center">
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex w-[240px] h-[60px] items-center justify-center rounded-full text-lg text-white font-semibold border-t border-t-yellow-200 border-b-2 border-b-yellow-900 bg-linear-to-t from-yellow-700 to-transparent"
      >
        <Image
          src="/images/google_icon.png"
          alt="Google logo"
          width={35}
          height={30}
          style={{ width: "35px", height: "auto", marginRight: "10px" }}
        />
        Google Sign In
      </button>
      <button
        type="button"
        onClick={() => signIn("email", { callbackUrl: "/" })}
        className="mt-4 flex w-[240px] h-[60px] items-center justify-center rounded-full text-lg text-white font-semibold border-t border-t-yellow-200 border-b-2 border-b-yellow-900 bg-linear-to-t from-yellow-700 to-transparent"
      >
        <Image
          src="/images/magiclink_3.png"
          alt="Google logo"
          width={35}
          height={30}
          style={{ width: "35px", height: "auto", marginRight: "10px" }}
        />
          Send login link
      </button>
      <Link href="/" className="mt-4 flex w-[240px] h-[60px] items-center justify-center rounded-full text-lg text-white font-semibold border-t border-t-yellow-200 border-b-2 border-b-yellow-900 bg-linear-to-t from-yellow-700 to-transparent">
      <MdOutlineArrowCircleLeft size={40}/>
      </Link>
    </div>
  );
};

export default LoginForm;
