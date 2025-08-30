"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react"; // ✅ use bag instead of cart
import { useAppSelector } from "@/redux/hook";

export default function CartIcon() {
  const { totalQuantity } = useAppSelector((state) => state.cart);

  return (
    <Link
      href="/cart"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition"
    >
      <ShoppingBag size={28} /> {/* ✅ bag icon */}
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}
