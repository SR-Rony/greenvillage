"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Orders", icon: ShoppingBag, href: "/dashboard/orders" },
    { label: "Products", icon: Package, href: "/dashboard/products" },
    { label: "Categories", icon: Layers, href: "/dashboard/categories" },
    { label: "Users", icon: Users, href: "/dashboard/users" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 lg:translate-x-0`}
      >
        <div className="flex items-center gap-2 p-4 border-b">
          <Image src="/logo.png" alt="Greenvillage" width={36} height={36} />
          <span className="text-lg font-bold text-green-600">Greenvillage</span>
        </div>

        <nav className="mt-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-green-100 text-green-700 font-medium"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
          <button className="flex items-center gap-2 px-4 py-2 w-full text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        {/* Top navbar */}
        <header className="flex items-center justify-between bg-white px-6 py-4 border-b sticky top-0 z-40">
          <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            ☰
          </Button>
          <div className="flex items-center gap-4 w-full max-w-md">
            <Input placeholder="Search products, orders..." />
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            <Image src="/avatar.png" alt="User" width={40} height={40} className="rounded-full" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
