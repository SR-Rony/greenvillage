"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-4">
      <h1 className="text-[10rem] font-extrabold text-[var(--primary)]">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mt-4">Oops! Page Not Found</h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Button
          className="bg-[var(--primary)] hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
          onClick={() => router.push("/")}
        >
          Go to Homepage
        </Button>
        <Link
          href="/contact"
          className="border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white px-6 py-2 rounded-lg transition text-[var(--primary)] text-center"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
