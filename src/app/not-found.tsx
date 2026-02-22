import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <div className="text-center">
        <p className="text-8xl font-bold text-[var(--color-primary)]">404</p>
        <h1 className="mt-4 text-3xl font-bold text-[var(--color-foreground)]">Page Not Found</h1>
        <p className="mt-2 text-lg text-[var(--color-muted-foreground)]">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-3 font-semibold text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary)]/90"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/dax-guide"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-3 font-semibold text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)]"
          >
            <ArrowLeft className="h-4 w-4" />
            DAX Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
