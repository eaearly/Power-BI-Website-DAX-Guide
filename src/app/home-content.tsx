"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { PageTransition } from "@/components/ui/page-transition";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Code2,
  Database,
  Eye,
  Layers,
  Sparkles,
  Zap,
  Shield,
  Search,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "DAX Syntax Guide",
    description:
      "Complete DAX function reference with syntax highlighting, examples, and performance tips. From CALCULATE to time intelligence.",
    href: "/dax-guide",
    badge: "120+ Functions",
    badgeVariant: "dax" as const,
  },
  {
    icon: BarChart3,
    title: "Measures vs Columns",
    description:
      "Understand when to use measures versus calculated columns. Learn evaluation context, row context, and filter context.",
    href: "/measures-vs-columns",
    badge: "Best Practices",
    badgeVariant: "measure" as const,
  },
  {
    icon: Database,
    title: "Data Modeling",
    description:
      "Star schema design, relationships, query folding, and optimization patterns. Build efficient Power BI data models.",
    href: "/data-modeling",
    badge: "Star Schema",
    badgeVariant: "column" as const,
  },
  {
    icon: Eye,
    title: "Data Visualization",
    description:
      "Create stunning dashboards and reports. Copilot AI, visual types, publishing workflows, and best practices.",
    href: "/data-visualization",
    badge: "Copilot AI",
    badgeVariant: "secondary" as const,
  },
  {
    icon: BookOpen,
    title: "SQL Reference",
    description:
      "SQL fundamentals for Power BI developers. Query patterns, CTEs, window functions, and DirectQuery optimization.",
    href: "/sql-reference",
    badge: "PostgreSQL",
    badgeVariant: "secondary" as const,
  },
];

const highlights = [
  {
    icon: Sparkles,
    title: "Syntax Highlighting",
    description: "Custom DAX syntax highlighting with keyword, function, and column reference detection.",
  },
  {
    icon: Layers,
    title: "Star Schema",
    description: "Industry-standard data modeling patterns with fact & dimension table best practices.",
  },
  {
    icon: Zap,
    title: "Performance Focused",
    description: "Query folding, optimization tips, and DAX performance patterns for production models.",
  },
  {
    icon: Shield,
    title: "Secure Auth",
    description: "Supabase-powered authentication with SSR support and row-level security.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Server-rendered pages with structured metadata for maximum search visibility.",
  },
  {
    icon: Database,
    title: "PostgreSQL Backed",
    description: "Full Supabase/PostgreSQL backend for storing bookmarks, notes, and user preferences.",
  },
];

export function HomeContent() {
  return (
    <PageTransition>
      <>
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          {/* Background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5 animate-gradient" />
            <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />
          </div>

          <div className="mx-auto w-full max-w-[1600px] px-6 py-14 sm:px-10 sm:py-28 lg:px-16 lg:py-36">
            <div className="mx-auto max-w-3xl text-center">
              <AnimateOnScroll variant="fade-scale" duration={500}>
                <Badge variant="dax" className="mb-4">
                  <Sparkles className="mr-1 h-3 w-3" />
                  PowerBIHub
                </Badge>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fade-up" delay={100} duration={700}>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
                  Master{" "}
                  <span className="bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-sm">
                    Power BI
                  </span>{" "}
                  &amp; DAX
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fade-up" delay={200} duration={600}>
                <p className="mt-4 text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8 sm:text-xl">
                  Comprehensive technical documentation for DAX syntax, measures vs calculated columns,
                  star schema data modeling, and SQL best practices — all in one place.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll variant="fade-up" delay={350}>
                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link href="/dax-guide">
                    <Button size="lg" className="w-full gap-2 sm:w-auto">
                      <Code2 className="h-4 w-4" />
                      Explore DAX Guide
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/data-modeling">
                    <Button variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
                      <Database className="h-4 w-4" />
                      Data Modeling
                    </Button>
                  </Link>
                </div>
              </AnimateOnScroll>
            </div>

            {/* DAX Preview Snippet */}
            <AnimateOnScroll variant="fade-up" delay={500} duration={800}>
              <div className="mx-auto mt-16 max-w-2xl">
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5 animate-pulse-glow transition-[box-shadow,transform,border-color] duration-500 hover:shadow-primary/20 hover:scale-[1.01] hover:border-primary/30 transform-gpu">
                  <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                    <span className="ml-2 text-xs text-muted-foreground">Total Sales Measure — DAX</span>
                  </div>
                  <pre className="m-0 overflow-x-auto rounded-none border-0 bg-transparent p-5">
                    <code className="font-mono text-sm leading-relaxed">
                      <span className="dax-keyword">DEFINE</span> <span className="dax-keyword">MEASURE</span>{"\n"}
                      {"    "}<span className="dax-table">&apos;Sales&apos;</span><span className="dax-column">[Total Revenue]</span> ={"\n"}
                      {"    "}<span className="dax-function">CALCULATE</span>({"\n"}
                      {"        "}<span className="dax-function">SUMX</span>({"\n"}
                      {"            "}<span className="dax-table">&apos;Sales&apos;</span>,{"\n"}
                      {"            "}<span className="dax-table">&apos;Sales&apos;</span><span className="dax-column">[Quantity]</span> * <span className="dax-function">RELATED</span>( <span className="dax-table">&apos;Product&apos;</span><span className="dax-column">[Unit Price]</span> ){"\n"}
                      {"        "}),{"\n"}
                      {"        "}<span className="dax-function">FILTER</span>({"\n"}
                      {"            "}<span className="dax-function">ALL</span>( <span className="dax-table">&apos;Date&apos;</span> ),{"\n"}
                      {"            "}<span className="dax-table">&apos;Date&apos;</span><span className="dax-column">[Year]</span> = <span className="dax-number">2024</span>{"\n"}
                      {"        "}){"\n"}
                      {"    "})
                    </code>
                  </pre>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16">
          <AnimateOnScroll variant="fade-up">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything You Need
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                From DAX syntax to data modeling — comprehensive guides for every Power BI developer.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map((feature, i) => (
              <AnimateOnScroll key={feature.href} variant="fade-up" delay={i * 120}>
                <Link href={feature.href} className="group block h-full">
                  <Card className="h-full transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transform-gpu">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                          <feature.icon className="h-5 w-5 text-yellow-700 dark:text-primary" />
                        </div>
                        <Badge variant={feature.badgeVariant}>{feature.badge}</Badge>
                      </div>
                      <CardTitle className="mt-3 transition-colors group-hover:text-yellow-700 dark:group-hover:text-primary">
                        {feature.title}
                      </CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-yellow-700 dark:text-primary">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        {/* Highlights Grid */}
        <section className="border-t border-border bg-muted/20">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16">
            <AnimateOnScroll variant="fade-up">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for Developers</h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  Modern tech stack with best-in-class developer experience.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((item, i) => (
                <AnimateOnScroll key={item.title} variant="fade-up" delay={i * 100}>
                  <div className="group flex gap-4 rounded-xl p-4 transition-[background-color,box-shadow,transform] duration-300 hover:bg-muted/50 hover:shadow-md hover:shadow-primary/5 hover:scale-[1.02] hover:-translate-y-0.5 cursor-default transform-gpu">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="h-5 w-5 text-yellow-700 dark:text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border">
          <div className="mx-auto w-full max-w-[1600px] px-6 py-20 sm:px-10 lg:px-16">
            <AnimateOnScroll variant="fade-scale" duration={700}>
              <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-blue-500/10 p-10 sm:p-16 transition-[box-shadow,border-color] duration-500 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />
                <div className="relative mx-auto max-w-2xl text-center">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Ready to Level Up Your Power BI Skills?
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Start with the DAX Guide and work your way through data modeling best practices.
                    Sign up for personalized bookmarks and notes.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link href="/dax-guide">
                      <Button size="lg" className="w-full gap-2 sm:w-auto">
                        Get Started
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/auth/login">
                      <Button variant="outline" size="lg" className="w-full gap-2 sm:w-auto">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </>
    </PageTransition>
  );
}
