"use client";

import { Provider } from "react-redux";
import { ReactNode, useEffect } from "react";
import { store } from "@/redux/store"; // adjust path
import { setCart } from "@/redux/features/cart/cartSlice";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Hydrate from localStorage (client-only)
    try {
      const saved = localStorage.getItem("gv_cart");
      if (saved) {
        store.dispatch(setCart(JSON.parse(saved)));
      }
    } catch (e) {
      console.warn("Failed to hydrate cart:", e);
    }

    // Subscribe to store and persist cart on changes
    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();
        localStorage.setItem("gv_cart", JSON.stringify(state.cart));
      } catch (e) {
        // ignore
      }
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
