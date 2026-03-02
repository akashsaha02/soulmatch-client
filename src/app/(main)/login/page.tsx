"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "@/features/auth/hooks/useAuth";
import SocialSignIn from "@/components/shared/SocialSignIn";
import loginImg from "@/assets/couple2.jpg";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams?.get("from") || "/";
  const { loginUser, logoutUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    setLoading(true);
    setError("");
    try {
      await loginUser(email, password);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logged in successfully!",
      }).then(() => {
        router.push(from);
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error logging in.";
      setError(message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewAccountClick = () => router.push("/register");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 bg-white items-center">
        <div className="hidden md:block">
          <img src={loginImg.src} alt="login" className="w-full" />
        </div>
        <div className="p-8 max-w-md">
          <p className="uppercase text-me-brown font-medium">start for free</p>
          <h2 className="text-3xl font-bold my-2 playfair">Sign in to SoulMatch</h2>
          <p className="capitalize text-me-brown font-medium mb-4">
            Not a member?{" "}
            <span onClick={handleNewAccountClick} className="text-blue-500 cursor-pointer">
              Sign Up Now
            </span>
          </p>
          <hr className="my-4 md:my-6" />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="email" className="text-dark-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent"
                autoComplete="on"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="password" className="text-dark-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent"
                autoComplete="on"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className={`block text-center py-3 px-4 text-white font-semibold w-full rounded-lg my-4 ${loading ? "bg-gray-300 cursor-not-allowed" : "bg-me-teal"}`}
              >
                {loading ? "Loading..." : "Login now"}
              </button>
            </div>
          </form>
          <div className="flex items-center flex-col justify-center gap-4">
            <p>Or sign in with</p>
            <SocialSignIn />
            <button
              onClick={() => router.push("/forgot-password")}
              className="text-me-teal font-semibold cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
