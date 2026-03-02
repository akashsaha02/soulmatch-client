"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/config";
import { useAppDispatch } from "@/shared/hooks/useRedux";
import { setUser, setLoading } from "../store/authSlice";
import { axiosPublic } from "@/shared/lib/axios";

export function AuthListener() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      dispatch(setUser(currentUser));
      if (currentUser) {
        try {
          const res = await axiosPublic.post("/jwt", {
            email: currentUser.email,
          });
          if (res.data?.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        } catch {
          // Ignore JWT errors
        }
      } else {
        localStorage.removeItem("access-token");
      }
      dispatch(setLoading(false));
    });
    return () => unsubscribe();
  }, [dispatch]);

  return null;
}
