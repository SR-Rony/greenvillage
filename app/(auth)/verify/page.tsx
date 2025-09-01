"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(`${baseUrl}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      console.log("daata",data);
      
      if (res.ok) {
        setMessage("✅ Email verified successfully!");
        setTimeout(() => router.push("/login"), 1500); // redirect to login
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      console.log(err);
      
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
        <p className="text-sm text-gray-600 text-center">
          Enter the code sent to your email
        </p>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
        </div>

        {message && (
          <p
            className={`text-center text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
