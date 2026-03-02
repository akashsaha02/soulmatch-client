"use client";

import { useAppSelector, useAppDispatch } from "@/shared/hooks/useRedux";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import auth from "@/firebase/config";
import { setLoading, logout } from "../store/authSlice";

export function useAuth() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const createUser = (email: string, password: string) => {
    dispatch(setLoading(true));
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email: string, password: string) => {
    dispatch(setLoading(true));
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logoutUser = async () => {
    dispatch(setLoading(true));
    await signOut(auth);
    dispatch(logout());
    dispatch(setLoading(false));
  };

  const googleSignIn = () => {
    dispatch(setLoading(true));
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const checkAuth = () => !!user;

  return {
    user,
    loading,
    createUser,
    loginUser,
    logoutUser,
    googleSignIn,
    checkAuth,
  };
}
