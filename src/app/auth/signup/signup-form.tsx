"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, Loader2, Eye, EyeOff, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import powerBiLogo from "@/logos/microsoft_power-bi.png";

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Passwords match", met: password.length > 0 && password === confirmPassword },
  ];

  const allRequirementsMet = passwordRequirements.every((r) => r.met);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!allRequirementsMet) {
      setError("Please meet all password requirements.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        if (signUpError.message?.includes("rate limit")) {
          setError("Too many signup attempts. Please wait a few minutes and try again.");
        } else if (signUpError.message?.toLowerCase().includes("already registered")) {
          setError("An account with this email already exists. Try logging in instead.");
        } else {
          setError(signUpError.message);
        }
      } else {
        setSuccess(true);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleOAuthSignup(provider: "github" | "google") {
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full max-w-lg space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Check Your Email</h1>
            <p className="mt-2 text-[var(--color-muted-foreground)]">
              We&apos;ve sent a confirmation link to <strong className="text-[var(--color-foreground)]">{email}</strong>.
              Click the link in the email to activate your account.
            </p>
          </div>
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm text-[var(--color-muted-foreground)]">
            <p>Didn&apos;t receive the email? Check your spam folder or try signing up again.</p>
          </div>
          <Link
            href="/auth/login"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-3 font-semibold text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary)]/90"
          >
            Go to Login
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-full max-w-lg space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-xl transition-[box-shadow,border-color] duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-[var(--color-primary)]/20">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary overflow-hidden">
            <Image src={powerBiLogo} alt="PowerBIHub" width={32} height={32} className="object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Create an Account</h1>
          <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
            Join PowerBIHub to bookmark functions and save notes
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleOAuthSignup("github")}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm font-medium text-[var(--color-foreground)] transition-[background-color,box-shadow,border-color,transform] duration-300 hover:bg-[var(--color-muted)] hover:shadow-sm hover:border-[var(--color-primary)]/30 hover:-translate-y-0.5"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Continue with GitHub
          </button>
          <button
            type="button"
            onClick={() => handleOAuthSignup("google")}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 text-sm font-medium text-[var(--color-foreground)] transition-[background-color,box-shadow,border-color,transform] duration-300 hover:bg-[var(--color-muted)] hover:shadow-sm hover:border-[var(--color-primary)]/30 hover:-translate-y-0.5"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border)]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[var(--color-card)] px-2 text-[var(--color-muted-foreground)]">Or sign up with email</span>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--color-foreground)]">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted-foreground)]" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[var(--color-foreground)]">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                required
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] py-2.5 pl-4 pr-10 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-[var(--color-foreground)]">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2.5 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
            />
          </div>

          {/* Password Requirements */}
          {password.length > 0 && (
            <div className="space-y-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-3">
              <p className="text-xs font-medium text-[var(--color-muted-foreground)]">Password requirements:</p>
              {passwordRequirements.map((req) => (
                <div key={req.label} className="flex items-center gap-2 text-xs">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${req.met ? "bg-green-500" : "bg-[var(--color-muted-foreground)]"
                      }`}
                  />
                  <span className={req.met ? "text-green-600 dark:text-green-400" : "text-[var(--color-muted-foreground)]"}>
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !allRequirementsMet}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-3 font-semibold text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary)]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-muted-foreground)]">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-[var(--color-primary)] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
