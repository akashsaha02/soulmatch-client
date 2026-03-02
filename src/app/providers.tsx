"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";
import { AuthListener } from "@/features/auth/components/AuthListener";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const store = storeRef.current;

  return (
    <Provider store={store}>
      <AuthListener />
      {children}
    </Provider>
  );
}
