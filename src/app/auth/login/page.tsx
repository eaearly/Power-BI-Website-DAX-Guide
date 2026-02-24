import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to PowerBIHub to access bookmarks, notes, and personalized content.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <AnimateOnScroll variant="fade-up" duration={700}>
        <LoginForm />
      </AnimateOnScroll>
    </div>
  );
}
