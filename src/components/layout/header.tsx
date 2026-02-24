"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import powerBiLogo from "@/logos/microsoft_power-bi.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Eye,
  Menu,
  LogIn,
  LogOut,
  Home,
  LinkIcon,
  Bookmark,
  StickyNote,
  User,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navigation = [
  { name: "DAX Guide", href: "/dax-guide", icon: Code2 },
  { name: "Measures vs Columns", href: "/measures-vs-columns", icon: BarChart3 },
  { name: "Data Modeling", href: "/data-modeling", icon: Database },
  { name: "Data Visualization", href: "/data-visualization", icon: Eye },
  { name: "SQL Reference", href: "/sql-reference", icon: BookOpen },
  { name: "Resources", href: "/resources", icon: LinkIcon },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    // Get the current session
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoadingUser(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoadingUser(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
    // Keep overlay visible briefly for smooth transition
    setTimeout(() => setSigningOut(false), 800);
  };

  const getUserDisplayName = () => {
    if (!user) return "";
    return (
      user.user_metadata?.full_name ||
      user.user_metadata?.name ||
      user.email?.split("@")[0] ||
      "User"
    );
  };

  const getUserAvatar = () => {
    return user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
  };

  const getUserFirstName = () => {
    return getUserDisplayName().split(" ")[0];
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300 ease-out",
        scrolled
          ? "border-yellow-500/20 bg-background/80 shadow-md shadow-yellow-500/5 backdrop-blur-xl dark:border-yellow-400/15 dark:shadow-yellow-400/5"
          : "border-transparent bg-background/0 backdrop-blur-none"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary transition-transform duration-300 group-hover:scale-110">
            <Image src={powerBiLogo} alt="PowerBIHub" width={20} height={20} className="h-5 w-5 object-contain" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            PowerBI<span className="text-yellow-700 dark:text-primary">Hub</span>
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

          {/* Auth section - Desktop */}
          {!loadingUser && (
            <div className="hidden lg:flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus-ring flex items-center gap-2 rounded-full border border-border bg-card px-2.5 py-1.5 transition-colors hover:bg-muted">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src={getUserAvatar() || undefined} alt={getUserDisplayName()} referrerPolicy="no-referrer" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-bold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium max-w-[140px] truncate">
                        Hello, {getUserFirstName()}!
                      </span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={getUserAvatar() || undefined} alt={getUserDisplayName()} referrerPolicy="no-referrer" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium truncate">{getUserDisplayName()}</span>
                        <span className="text-[10px] text-muted-foreground truncate">{user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=profile" className="cursor-pointer gap-2">
                        <User className="h-4 w-4" />
                        My Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=bookmarks" className="cursor-pointer gap-2">
                        <Bookmark className="h-4 w-4" />
                        Bookmarks
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=notes" className="cursor-pointer gap-2">
                        <StickyNote className="h-4 w-4" />
                        Notes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard?tab=code-editor" className="cursor-pointer gap-2">
                        <Code2 className="h-4 w-4" />
                        Code Editor
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <LogIn className="h-3.5 w-3.5" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          )}

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
                    <Image src={powerBiLogo} alt="PowerBIHub" width={16} height={16} className="h-4 w-4 object-contain" />
                  </div>
                  <span className="text-base font-bold">
                    PowerBI<span className="text-yellow-700 dark:text-primary">Hub</span>
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-1 px-3 py-4">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                  className="flex flex-col gap-1"
                >

                {/* ── User section first ── */}
                {!loadingUser && user && (
                  <>
                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}>
                      <div className="flex items-center gap-2.5 px-3 py-2.5">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={getUserAvatar() || undefined} alt={getUserDisplayName()} referrerPolicy="no-referrer" />
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold truncate">
                            Hello, {getUserFirstName()}!
                          </span>
                          <span className="text-[10px] text-muted-foreground truncate">{user.email}</span>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}>
                      <SheetClose asChild>
                        <Link
                          href="/dashboard?tab=profile"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <User className="h-4 w-4" />
                          My Dashboard
                        </Link>
                      </SheetClose>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}>
                      <SheetClose asChild>
                        <Link
                          href="/dashboard?tab=bookmarks"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Bookmark className="h-4 w-4" />
                          Bookmarks
                        </Link>
                      </SheetClose>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}>
                      <SheetClose asChild>
                        <Link
                          href="/dashboard?tab=notes"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <StickyNote className="h-4 w-4" />
                          Notes
                        </Link>
                      </SheetClose>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}>
                      <SheetClose asChild>
                        <Link
                          href="/dashboard?tab=code-editor"
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Code2 className="h-4 w-4" />
                          Code Editor
                        </Link>
                      </SheetClose>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }}>
                      <div className="my-3 h-px bg-border" />
                    </motion.div>
                  </>
                )}

                {/* ── PowerBI Guide nav links ── */}
                <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}>
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
                </motion.div>

                {navigation.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <motion.div key={item.href} variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.3 } } }}>
                      <SheetClose asChild>
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
                    </motion.div>
                  );
                })}

                {/* ── Bottom actions ── */}
                <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }}>
                  <div className="my-3 h-px bg-border" />
                </motion.div>

                {!loadingUser && (
                  user ? (
                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={handleSignOut}
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </Button>
                      </SheetClose>
                    </motion.div>
                  ) : (
                    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
                      <SheetClose asChild>
                        <Link href="/auth/login">
                          <Button variant="outline" className="w-full gap-2">
                            <LogIn className="h-4 w-4" />
                            Sign In
                          </Button>
                        </Link>
                      </SheetClose>
                    </motion.div>
                  )
                )}
                </motion.div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Sign-out loading overlay */}
      <AnimatePresence>
        {signingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center gap-4"
            >
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">Signing out...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
