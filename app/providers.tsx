"use client";

import { Provider } from "react-redux";
import { ReactNode, useEffect } from "react";
import { store } from "@/redux/store";
import { setCart } from "@/redux/features/cart/cartSlice";
import { hydrateAuth } from "@/redux/features/auth/authSlice";

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Hydrate Cart from localStorage
    try {
      const savedCart = localStorage.getItem("gv_cart");
      if (savedCart) {
        store.dispatch(setCart(JSON.parse(savedCart)));
      }
    } catch (e) {
      console.warn("Failed to hydrate cart:", e);
    }

    // Hydrate Auth from localStorage
    try {
      const savedAuth = localStorage.getItem("auth");
      if (savedAuth) {
        store.dispatch(hydrateAuth(JSON.parse(savedAuth)));
      }
    } catch (e) {
      console.warn("Failed to hydrate auth:", e);
    }

    // Subscribe to store and persist cart and auth on changes
    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();
        localStorage.setItem("gv_cart", JSON.stringify(state.cart));
        if (state.auth) {
          localStorage.setItem("auth", JSON.stringify(state.auth));
        }
      } catch (e) {
        console.warn("Failed to persist store:", e);
      }
    });

    return () => unsubscribe();
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
