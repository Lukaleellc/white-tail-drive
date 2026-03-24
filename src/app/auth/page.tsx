"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Redirect to the property page on success
        router.push("/");
        router.refresh();
      } else {
        setError("Invalid access code.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0c0a09] flex flex-col items-center justify-center px-6 selection:bg-[#f5f5f4]/10 selection:text-[#f5f5f4]">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo */}
        <div className="text-xl font-serif font-bold tracking-[0.3em] text-[#f5f5f4] uppercase mb-16">
          WHITE TAIL
        </div>

        {/* Auth Box */}
        <div className="w-full bg-[#1c1917]/30 border border-white/5 backdrop-blur-xl p-8 rounded-sm">
          <p className="text-[#a8a29e] font-sans text-[0.65rem] uppercase tracking-[0.2em] mb-8 text-center">
            Private Access Area
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                placeholder="Access Code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-3 text-center text-[#f5f5f4] font-light tracking-widest placeholder:text-[#44403c] focus:outline-none focus:border-white/40 transition-all duration-500"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-400/80 text-[0.7rem] uppercase tracking-wider text-center animate-pulse">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#f5f5f4] text-[#0c0a09] text-[0.7rem] uppercase tracking-[0.2em] font-bold hover:bg-[#e7e5e4] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Enter Site"}
            </button>
          </form>
        </div>

        <p className="mt-12 text-[#44403c] font-sans text-[0.6rem] uppercase tracking-[0.15em] text-center max-w-[200px] leading-loose">
          Secure portal for invited guests and stakeholders.
        </p>
      </div>
    </main>
  );
}
