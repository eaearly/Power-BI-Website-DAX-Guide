"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  BarChart3,
  BookOpen,
  Code2,
  Database,
  Menu,
  LogIn,
  LayoutDashboard,
  Home,
  LinkIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

const navigation = [
  { name: "DAX Guide", href: "/dax-guide", icon: Code2 },
  { name: "Measures vs Columns", href: "/measures-vs-columns", icon: BarChart3 },
  { name: "Data Modeling", href: "/data-modeling", icon: Database },
  { name: "SQL Reference", href: "/sql-reference", icon: BookOpen },
  { name: "Resources", href: "/resources", icon: LinkIcon },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300 ease-out",
        scrolled
          ? "border-yellow-500/20 bg-background/80 shadow-md shadow-yellow-500/5 backdrop-blur-xl dark:border-yellow-400/15 dark:shadow-yellow-400/5"
          : "border-transparent bg-background/0 backdrop-blur-none"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-transform duration-300 group-hover:scale-110">
            <LayoutDashboard className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            PowerBI<span className="text-yellow-700 dark:text-primary"> Guide</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" role="navigation" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-yellow-700 dark:text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <AnimatedThemeToggler className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95" />
          <Link href="/auth/login" className="hidden lg:block">
            <Button variant="outline" size="sm" className="gap-1.5">
              <LogIn className="h-3.5 w-3.5" />
              Sign In
            </Button>
          </Link>

          {/* Mobile sheet sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-md border border-border transition-colors hover:bg-muted lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <SheetHeader className="border-b border-border px-5 py-4">
                <SheetTitle className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
                    <LayoutDashboard className="h-3.5 w-3.5 text-primary-foreground" />
                  </div>
                  <span className="text-base font-bold">
                    PowerBI<span className="text-yellow-700 dark:text-primary"> Guide</span>
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-3 py-4">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      pathname === "/"
                        ? "bg-primary/10 text-yellow-700 dark:text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                </SheetClose>

                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-yellow-700 dark:text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </SheetClose>
                  );
                })}

                <div className="my-3 h-px bg-border" />

                <SheetClose asChild>
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full gap-2">
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </Button>
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
