"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, Home, LayoutGrid, Package, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "./searchbar";
import MenuItem from "./menuItem";
import Sitebar from "./sitebar";

export default function Navbar() {
  const [cartCount] = useState(3);

  const categories = [
    "All Products",
    "Fruits & Vegetables",
    "Meat & Fish",
    "Dairy & Eggs",
    "Snacks",
    "Drinks",
    "New Arrivals",
    "Trending",
  ];
  return (
    <header className="w-full sticky top-0 z-50 shadow-md bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Top Row: Menu + Logo + Right Icons */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between h-auto md:h-16 gap-2 md:gap-4 py-2 relative">
        <div className="w-full flex items-center justify-between md:justify-start gap-3 md:gap-4">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <Sitebar/>

            <Link
              href="/"
              className="text-2xl font-extrabold text-[var(--primary)] tracking-wide hover:scale-105 transition-transform"
            >
              GreenVillage
            </Link>
          </div>

          {/* Right: User + Cart */}
          <div className="flex items-center gap-3 md:ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700 hover:bg-gray-200 rounded-lg p-2 transition"
            >
              <User className="h-6 w-6" />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-700 hover:bg-gray-200 rounded-lg p-2 transition"
              >
                <ShoppingCart className="h-6 w-6" />
              </Button>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--primary)] text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full md:ml-15 md:w-1/2 mt-2 md:mt-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-20">
          <SearchBar/>
        </div>
      </div>

      {/* Secondary Navigation (Desktop Only) */}
      <MenuItem/>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t md:hidden z-50">
        <div className="flex justify-around items-center py-2">
          <Link href="/" className="flex flex-col items-center text-gray-700 hover:text-[var(--primary)]">
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Link>

          <Link href="/all-products" className="flex flex-col items-center text-gray-700 hover:text-[var(--primary)]">
            <Package className="h-5 w-5" />
            <span className="text-xs">All Products</span>
          </Link>

          {/* Sidebar Trigger for Categories */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center text-gray-700 hover:text-[var(--primary)]">
                <LayoutGrid className="h-5 w-5" />
                <span className="text-xs">Categories</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6 bg-white text-gray-800">
              <h2 className="text-lg font-bold text-[var(--primary)] mb-4">Categories</h2>
              <nav className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-[var(--primary)] font-medium transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/contact" className="flex flex-col items-center text-gray-700 hover:text-[var(--primary)]">
            <Phone className="h-5 w-5" />
            <span className="text-xs">Contact</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
