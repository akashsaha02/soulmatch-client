"use client";

import googleIcon from "@/assets/icons/icons8-google.svg";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { axiosPublic } from "@/shared/lib/axios";

export default function SocialSignIn() {
  const { googleSignIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams?.get("from") || "/";

  const handleGoogleSignIn = () => {
    try {
      googleSignIn().then((res) => {
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data?.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Logged in successfully with Google!",
            }).then(() => {
              router.push(from);
            });
          }
        });
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err instanceof Error ? err.message : "Error logging in with Google.",
      });
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="p-4 border border-me-brown rounded-lg flex justify-center items-center gap-4 w-full"
      >
        <img src={typeof googleIcon === "string" ? googleIcon : (googleIcon as { src: string }).src} alt="google" className="w-5" />
        <p className="font-medium capitalize">Sign in with google</p>
      </button>
    </div>
  );
}
