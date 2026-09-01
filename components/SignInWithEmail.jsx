"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

const SignInWithEmail = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => {
        setSent(false);
        setMessage("");
      }, 5000); // Reset after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [sent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSent(true);
    setMessage("Check your email for a login link!");
    setEmail("");
    try {
      await signIn("resend", {
        email,
        redirect: false,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Sign in error:", error);
      setSent(false);
      setIsLoading(false);
      setEmail("");
    }
  };


  return (
    <>
      {sent && <p className="text-yellow-300 text-shadow-md text-center mb-4 text-xl font-semibold">{message}</p>}
      <form onSubmit={handleSubmit} className="w-[240px]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="example@domain.com"
          className={sent ? "hidden" : "flex pl-6 border-2 border-white w-full rounded-full h-[60px] outline-none placeholder-white/80 caret-white mb-4"}
        />

        <button
          type="submit"
          className="mt-1 flex w-full h-[60px] items-center justify-center rounded-full text-lg text-white  border-t border-t-yellow-200 
      border-b-2 border-b-yellow-950/50 bg-linear-to-t from-yellow-800 to-transparent cursor-pointer"
          disabled={isLoading}
        >
          <Image
            src="/images/magiclink_3.png"
            alt="magic link"
            width={35}
            height={35}
            style={{ width: "35px", height: "auto", marginRight: "10px" }}
          />
          {isLoading ? "Sending..." : "Send email link"}
        </button>
      </form>
    </>
  );
};

export default SignInWithEmail;
