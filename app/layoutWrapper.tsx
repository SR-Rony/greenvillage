"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer/footer";
import CartIcon from "@/components/cart/cartIcon";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
      {!isDashboard && <CartIcon />}
    </>
  );
}
