import type { Metadata } from "next";
import { SignupForm } from "./signup-form";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a PowerBIHub account to access bookmarks, notes, and personalized content.",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <AnimateOnScroll variant="fade-up" duration={700}>
        <SignupForm />
      </AnimateOnScroll>
    </div>
  );
}
