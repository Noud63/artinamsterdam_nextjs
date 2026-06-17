"use client";
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import Link from "next/link";
import SignInWithEmail from "./SignInWithEmail";
import { MdOutlineArrowCircleLeft } from "react-icons/md";

const LoginForm = () => {
  return (
    <div className="w-full flex mt-4 flex-col items-center">
      <div className="text-white text-lg mb-4 font-semibold">Sign in with Google: </div>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex w-[240px] h-[60px] items-center justify-center rounded-full text-lg text-white font-normal border-t border-t-yellow-200 border-b-2 border-b-yellow-950/50 bg-linear-to-t from-yellow-800 to-transparent cursor-pointer"
      >
        <Image
          src="/images/google_icon.png"
          alt="Google logo"
          width={35}
          height={35}
          style={{ width: "35px", height: "auto", marginRight: "10px" }}
        />
        Google Sign In
      </button>
        <div className="text-white text-lg font-semibold mb-4 mt-8">Or Email login link:</div>
        
      <SignInWithEmail />
      
      <Link
        href="/"
        className="mt-12 flex w-[240px] h-[60px] items-center justify-center rounded-full text-lg text-white font-semibold border-t border-t-yellow-200 border-b-2 border-b-yellow-950/60 bg-linear-to-t from-yellow-900 to-transparent"
      >
        <MdOutlineArrowCircleLeft size={40} />
      </Link>
    </div>
  );
};

export default LoginForm;
