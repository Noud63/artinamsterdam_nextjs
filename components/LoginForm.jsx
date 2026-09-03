"use client";
import { useState, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import React from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (disabled) return;

    try {
      setSuccess(false);
      setLoginErrorMessage("");
      setMessage("");

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("Response from signIn:", res);

      if (res?.ok === true && !res?.error) {
        setSuccess(true);
        setDisabled(true);
        router.push("/");
        return;
      }

      if (res?.error) {
        setError(true);
        setLoginErrorMessage("Invalid credentials. Please try again.");
        setTimeout(() => setLoginErrorMessage(""), 3000);
        setEmail("");
      setPassword("");
        setDisabled(false);
      }
    } catch (error) {
      console.error("Unexpected client error:", error);
      setLoginErrorMessage("An unexpected error occurred. Please try again later.");
      setTimeout(() => setLoginErrorMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full px-4 max-xsm:px-2 mt-16 mb-20">
      <div className="mx-auto max-w-[620px] rounded-2xl p-6 ">
        <div className="mb-4 flex justify-center border-b-2 border-dotted border-white pb-4 text-white text-xl font-bold">
          Sign in
        </div>

        <form onSubmit={handleSubmit} className="text-white">
          <div className="mb-4">
            <label className="text-md mb-2 block font-bold" htmlFor="email">
              Email:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border-2 px-3 py-3 leading-tight shadow focus:outline-none"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-md mb-2 block font-bold" htmlFor="password">
              Password:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border-2 px-3 py-3 leading-tight shadow focus:outline-none"
              id="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginErrorMessage && (
            <div className="flex w-full flex-row items-center rounded-md bg-red-100 px-4 py-3">
              <span className="text-red-800">{loginErrorMessage}</span>
            </div>
          )}

          {success && (
            <div className="mb-2 flex w-full flex-row items-center rounded-md bg-green-100 px-4 py-2">
              <CircleCheckBig size={20} color="green" className="mr-2" />
              <span className="text-green-600">Je bent ingelogd!</span>
            </div>
          )}

          <div className="mb-4 mt-4">
            <button
              disabled={disabled}
              className={`text-md flex w-full items-center justify-center rounded-lg py-4 text-white ${
                disabled
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-[linear-gradient(to_top,rgba(73,39,0,0.9),rgba(211,142,64,0.7))] bg-no-repeat bg-cover bg-center"
              }`}
              type="submit"
            >
              {isLoading ? (
                <Spinner loading={isLoading} height={24} width={24} />
              ) : (
                <>
                  <SendHorizontal className="mr-2" /> Send
                </>
              )}
            </button>

            <div className="text-white text-lg mb-4 font-semibold mt-6">
              Sign in with Google:{" "}
            </div>
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="text-md flex w-full items-center justify-center rounded-lg py-4 text-white bg-[linear-gradient(to_top,rgba(73,39,0,0.9),rgba(211,142,64,0.7))] bg-no-repeat bg-cover bg-center"
            >
              <Image
                src="/images/google_icon.png"
                alt="Google logo"
                width={35}
                height={35}
                style={{ width: "24px", height: "auto", marginRight: "10px" }}
              />
              Google Sign In
            </button>
          </div>

          <div className="mt-4 flex w-full items-center gap-1 font-medium">
            Don't have an account? <ArrowRight size={16} />{" "}
            <Link href="/register">
              <span className="underline cursor-pointer">Register</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
