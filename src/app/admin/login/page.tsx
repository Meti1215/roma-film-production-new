"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    const supabase = createClient();

    const { data, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError || !data.user) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", data.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setError("You do not have administrator access.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  async function handleForgotPassword() {
    setError("");
    setMessage("");

    if (!email) {
      setError("Enter your admin email address first.");
      return;
    }

    setResetLoading(true);

    const supabase = createClient();

    const { error: resetError } =
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/admin/reset-password",
  });

    if (resetError) {
      setError(resetError.message);
      setResetLoading(false);
      return;
    }

    setMessage(
      "Password reset email sent. Check your email and click the reset link."
    );

    setResetLoading(false);
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#C59B6B] px-6 py-10">
      <div className="login-card w-full max-w-md rounded-[8px] border border-[#C59B6B]/40 bg-[#EEECE9] p-10 text-[#111111] shadow-[0_15px_40px_rgba(0,0,0,0.18)]">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#111111]">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-[#777777]">
            Sign in to access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#111111]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Admin email"
              required
              className="w-full rounded-[6px] border border-[#C59B6B]/60 bg-[#F5F3F0] px-4 py-3 text-[#111111] outline-none transition focus:border-[#C59B6B] focus:ring-[3px] focus:ring-[#C59B6B]/[0.18]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#111111]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-[6px] border border-[#C59B6B]/60 bg-[#F5F3F0] px-4 py-3 text-[#111111] outline-none transition focus:border-[#C59B6B] focus:ring-[3px] focus:ring-[#C59B6B]/[0.18]"
            />
          </div>

          {error && (
            <div className="rounded-[6px] border border-[#C59B6B]/60 bg-[#F5F3F0] px-4 py-3 text-sm text-[#111111]">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-[6px] border border-[#C59B6B]/60 bg-[#F5F3F0] px-4 py-3 text-sm text-[#111111]">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-[6px] border-none bg-[#000000] px-4 py-3 font-medium text-[#FFFFFF] transition-all duration-300 ease-in-out hover:bg-[#C59B6B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleForgotPassword}
          disabled={resetLoading}
          className="mt-5 w-full text-center text-sm text-[#777777] underline transition-colors hover:text-[#C59B6B] disabled:opacity-50"
        >
          {resetLoading
            ? "Sending reset email..."
            : "Forgot password?"}
        </button>
      </div>

      <style jsx>{`
        .login-card {
          animation: fadeUp 0.6s ease-out;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}