"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  User,
  Home,
  LayoutGrid,
  Package,
  Phone,
  LogOut,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "./searchbar";
import MenuItem from "./menuItem";
import Sitebar from "./sitebar";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { logout as logoutAction } from "@/redux/features/auth/authSlice";

type UserType = {
  name?: string;
  role?: "user" | "admin";
};

export default function Navbar() {
  const user = useAppSelector((state) => state.auth.user) as UserType | null;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const userName = user?.name?.slice(0, 2).toUpperCase() || "GU";
  const dispatch = useAppDispatch();
  

  const categories: string[] = [
    "All Products",
    "Fruits & Vegetables",
    "Meat & Fish",
    "Dairy & Eggs",
    "Snacks",
    "Drinks",
    "New Arrivals",
    "Trending",
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAction());
    setDropdownOpen(false);
    router.push("/login");
  };

  return (
    <header className="w-full sticky top-0 z-50 shadow-md bg-gradient-to-r from-gray-50 to-gray-100">
      {/* Top Row: Menu + Logo + Right Icons */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between h-auto md:h-16 gap-2 md:gap-4 py-2 relative">
        <div className="w-full flex items-center justify-between md:justify-start gap-3 md:gap-4">
          {/* Left: Menu + Logo */}
          <div className="flex items-center gap-3">
            <Sitebar />
            <Link
              href="/"
              className="text-2xl font-extrabold text-[var(--primary)] tracking-wide hover:scale-105 transition-transform"
            >
              GreenVillage
            </Link>
          </div>

          {/* User Icon / Login & Register */}
          <div className="flex items-center gap-3 md:ml-auto relative" ref={dropdownRef}>
            {user ? (
              <div>
                <span
                  className="text-[var(--primary)] cursor-pointer flex items-center gap-1"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User className="h-5 w-5" />
                  <span>{userName}</span>
                </span>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                    <ul className="flex flex-col">
                      <li>
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 px-4 py-2 hover:text-[var(--primary)] hover:bg-gray-100 rounded-t-xl"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" /> Profile
                        </Link>
                      </li>
                      {user.role === "admin" && (
                        <li>
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:text-[var(--primary)] rounded-t-xl"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-red-500 cursor-pointer hover:bg-gray-100 w-full rounded-b-xl"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" className="hover:text-[var(--primary)]">Login</Link>
                <span className="text-[var(--primary)]">/</span>
                <Link href="/register" className="hover:text-[var(--primary)]">Register</Link>
              </div>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full md:ml-15 md:w-1/2 mt-2 md:mt-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-20">
          <SearchBar />
        </div>
      </div>

      {/* Secondary Navigation (Desktop Only) */}
      <MenuItem />

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
