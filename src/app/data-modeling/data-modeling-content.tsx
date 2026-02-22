"use client";

import { CodeBlock } from "@/components/ui/code-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  Database,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Layers,
  Network,
  Zap,
  AlertTriangle,
  Star,
  Table2,
  Link2,
  Shield,
} from "lucide-react";

export function DataModelingContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <AnimateOnScroll variant="fade-up" duration={600}>
      <div className="mb-12">
        <Badge variant="column" className="mb-3">
          <Database className="mr-1 h-3 w-3" />
          Data Architecture
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Data Modeling Best Practices
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          Build efficient, scalable Power BI data models using star schema design, proper relationships,
          and query folding optimization. Industry-standard patterns for production-grade BI solutions.
        </p>
      </div>
      </AnimateOnScroll>

      {/* Quick Introduction */}
      <AnimateOnScroll variant="fade-up" delay={50}>
      <Card className="mb-12 border-blue-500/20 bg-blue-500/5">
        <CardContent className="py-6">
          <h3 className="mb-2 text-lg font-semibold">Quick Introduction</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Data Modeling</strong> is the foundation of every Power BI report. It defines how your tables
            relate to each other, how data flows through filters, and how efficiently your reports perform.
            A well-designed data model uses a <em>star schema</em> pattern — with a central fact table surrounded by dimension tables —
            which allows the VertiPaq engine to compress data efficiently and enables intuitive DAX formula writing.
            Poor data modeling is the #1 cause of slow reports and incorrect calculations.
          </p>
        </CardContent>
      </Card>
      </AnimateOnScroll>

      {/* Table of Contents */}
      <AnimateOnScroll variant="fade-up" delay={100}>
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>On This Page</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { label: "Star Schema Design", href: "#star-schema", icon: Star },
              { label: "Fact vs Dimension Tables", href: "#fact-dimension", icon: Table2 },
              { label: "Relationships", href: "#relationships", icon: Link2 },
              { label: "Query Folding", href: "#query-folding", icon: Zap },
              { label: "Snowflake vs Star", href: "#snowflake-vs-star", icon: Network },
              { label: "Row-Level Security", href: "#rls", icon: Shield },
              { label: "Performance Optimization", href: "#performance", icon: Layers },
              { label: "Common Anti-Patterns", href: "#anti-patterns", icon: AlertTriangle },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
              >
                <item.icon className="h-4 w-4 text-yellow-700 dark:text-primary" />
                {item.label}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
      </AnimateOnScroll>

      {/* ============================================================ */}
      {/* STAR SCHEMA */}
      {/* ============================================================ */}
      <section id="star-schema" className="mb-16 scroll-mt-20">
        <AnimateOnScroll variant="fade-up">
        <h2 className="mb-6 text-3xl font-bold">
          <Star className="mr-2 inline h-7 w-7 text-yellow-700 dark:text-primary" />
          Star Schema Design
        </h2>

        <div className="mb-6 space-y-4 text-muted-foreground">
          <p>
            The <strong className="text-foreground">star schema</strong> is the recommended data model topology for
            Power BI. It organizes data into one or more <strong className="text-foreground">fact tables</strong>{" "}
            (containing measurable events) surrounded by <strong className="text-foreground">dimension tables</strong>{" "}
            (containing descriptive attributes).
          </p>
          <p>
            This design is optimized for the VertiPaq storage engine in Power BI, enabling fast aggregation,
            efficient compression, and intuitive DAX authoring.
          </p>
        </div>

        {/* Visual Diagram — True Star Layout with SVG connecting lines */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="py-8 sm:py-12">
            <div className="flex flex-col items-center">
              <p className="mb-8 text-sm font-semibold text-muted-foreground">Star Schema Topology</p>

              {/* Star diagram — mobile: stacked grid, desktop: SVG star layout */}
              {/* Mobile layout */}
              <div className="flex w-full flex-col items-center gap-3 sm:hidden">
                {/* Fact table */}
                <div className="w-full max-w-[280px] rounded-2xl border-2 border-blue-500 bg-blue-500/10 px-5 py-4 text-center shadow-lg shadow-blue-500/10">
                  <Database className="mx-auto mb-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Fact</p>
                  <p className="text-base font-bold">Sales</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">OrderID, DateKey, Qty, Amt</p>
                </div>
                <p className="text-[10px] font-medium text-muted-foreground">connects to ↓</p>
                {/* Dimension tables grid */}
                <div className="grid w-full max-w-[320px] grid-cols-2 gap-2">
                  {[
                    { emoji: "📅", name: "Date", detail: "Year, Quarter, Month" },
                    { emoji: "🏬", name: "Store", detail: "Name, Region, City" },
                    { emoji: "📦", name: "Product", detail: "Name, Category, Price" },
                    { emoji: "👤", name: "Customer", detail: "Name, Segment, Email" },
                    { emoji: "👨‍💼", name: "Employee", detail: "" },
                    { emoji: "🏷️", name: "Promotion", detail: "" },
                  ].map((dim) => (
                    <div key={dim.name} className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-3 py-2 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                      <p className="text-xs font-semibold">{dim.emoji} {dim.name}</p>
                      {dim.detail && <p className="text-[9px] text-muted-foreground">{dim.detail}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop layout */}
              <div className="relative mx-auto hidden h-[460px] w-full max-w-[520px] sm:block">
                {/* SVG connector lines */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 520 460"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Top — Date to center */}
                  <line x1="260" y1="80" x2="260" y2="190" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />

                  {/* Bottom — Store to center */}
                  <line x1="260" y1="270" x2="260" y2="380" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />

                  {/* Left — Product to center */}
                  <line x1="120" y1="230" x2="200" y2="230" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />

                  {/* Right — Customer to center */}
                  <line x1="320" y1="230" x2="400" y2="230" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />

                  {/* Top-left — Employee to center */}
                  <line x1="100" y1="100" x2="210" y2="195" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />

                  {/* Top-right — Promotion to center */}
                  <line x1="420" y1="100" x2="310" y2="195" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />

                  {/* Relationship labels (1:*) */}
                  <text x="248" y="145" className="fill-yellow-600 dark:fill-yellow-400 text-[10px] font-bold" textAnchor="end">1</text>
                  <text x="265" y="175" className="fill-blue-500 dark:fill-blue-400 text-[10px] font-bold" textAnchor="start">*</text>

                  <text x="248" y="315" className="fill-yellow-600 dark:fill-yellow-400 text-[10px] font-bold" textAnchor="end">1</text>
                  <text x="265" y="285" className="fill-blue-500 dark:fill-blue-400 text-[10px] font-bold" textAnchor="start">*</text>

                  <text x="155" y="222" className="fill-yellow-600 dark:fill-yellow-400 text-[10px] font-bold" textAnchor="middle">1</text>
                  <text x="185" y="245" className="fill-blue-500 dark:fill-blue-400 text-[10px] font-bold" textAnchor="middle">*</text>

                  <text x="365" y="222" className="fill-yellow-600 dark:fill-yellow-400 text-[10px] font-bold" textAnchor="middle">1</text>
                  <text x="335" y="245" className="fill-blue-500 dark:fill-blue-400 text-[10px] font-bold" textAnchor="middle">*</text>
                </svg>

                {/* Center — FACT table */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="rounded-2xl border-2 border-blue-500 bg-blue-500/10 px-6 py-5 text-center shadow-lg shadow-blue-500/10 transition-transform duration-300 hover:scale-105">
                    <Database className="mx-auto mb-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Fact</p>
                    <p className="text-base font-bold">Sales</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">OrderID, DateKey, Qty, Amt</p>
                  </div>
                </div>

                {/* Top — Date dimension */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-4 py-2.5 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">📅 Date</p>
                    <p className="text-[10px] text-muted-foreground">Year, Quarter, Month</p>
                  </div>
                </div>

                {/* Bottom — Store dimension */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-4 py-2.5 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">🏬 Store</p>
                    <p className="text-[10px] text-muted-foreground">Name, Region, City</p>
                  </div>
                </div>

                {/* Left — Product dimension */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-4 py-2.5 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">📦 Product</p>
                    <p className="text-[10px] text-muted-foreground">Name, Category, Price</p>
                  </div>
                </div>

                {/* Right — Customer dimension */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-4 py-2.5 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">👤 Customer</p>
                    <p className="text-[10px] text-muted-foreground">Name, Segment, Email</p>
                  </div>
                </div>

                {/* Top-left — Employee dimension */}
                <div className="absolute left-0 top-2">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-3 py-2 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">👨‍💼 Employee</p>
                  </div>
                </div>

                {/* Top-right — Promotion dimension */}
                <div className="absolute right-0 top-2">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-3 py-2 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">🏷️ Promotion</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border-2 border-blue-500 bg-blue-500/10" />
                  <span>Fact Table</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border-2 border-emerald-500/50 bg-emerald-500/5" />
                  <span>Dimension Table</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" className="text-emerald-500/60" /></svg>
                  <span>1:* Relationship</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Each dimension connects to the fact table via a one-to-many (1:*) relationship using surrogate integer keys.
              </p>
            </div>
          </CardContent>
        </Card>
        </AnimateOnScroll>
      </section>

      {/* ============================================================ */}
      {/* FACT vs DIMENSION */}
      {/* ============================================================ */}
      <section id="fact-dimension" className="mb-16 scroll-mt-20">
        <AnimateOnScroll variant="fade-up">
        <h2 className="mb-6 text-3xl font-bold">
          <Table2 className="mr-2 inline h-7 w-7 text-yellow-700 dark:text-primary" />
          Fact Tables vs Dimension Tables
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-500">Fact Tables</CardTitle>
              <CardDescription>Store measurable business events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ul className="space-y-2">
                {[
                  "Contain foreign keys pointing to dimension tables",
                  "Store numeric measures (Amount, Quantity, Cost)",
                  "Typically the largest tables in the model",
                  "Grain = one row per event (order line, transaction)",
                  "Avoid storing text descriptions — use dimension lookups",
                  "Examples: Sales, Orders, Inventory Snapshots, Web Logs",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <CodeBlock
                title="Fact Table Structure"
                language="dax"
                code={`-- Sales Fact Table columns:
-- OrderID (PK)
-- DateKey (FK → Date)
-- ProductKey (FK → Product)
-- CustomerKey (FK → Customer)
-- StoreKey (FK → Store)
-- Quantity (measure)
-- UnitPrice (measure)
-- DiscountAmount (measure)
-- LineTotal (measure)`}
              />
            </CardContent>
          </Card>

          <Card className="border-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-emerald-500">Dimension Tables</CardTitle>
              <CardDescription>Describe the context of business events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ul className="space-y-2">
                {[
                  "Contain the primary key referenced by fact tables",
                  "Store descriptive attributes (Name, Category, Region)",
                  "Typically smaller than fact tables",
                  "Enable filtering, grouping, and slicing in reports",
                  "Should be denormalized (flat) in star schema",
                  "Examples: Date, Product, Customer, Store, Employee",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <CodeBlock
                title="Dimension Table Structure"
                language="dax"
                code={`-- Product Dimension columns:
-- ProductKey (PK)
-- ProductName
-- Category
-- Subcategory
-- Brand
-- Color
-- UnitPrice
-- IsActive (TRUE/FALSE)`}
              />
            </CardContent>
          </Card>
        </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================================ */}
      {/* RELATIONSHIPS */}
      {/* ============================================================ */}
      <section id="relationships" className="mb-16 scroll-mt-20">
        <AnimateOnScroll variant="fade-up">
        <h2 className="mb-6 text-3xl font-bold">
          <Link2 className="mr-2 inline h-7 w-7 text-yellow-700 dark:text-primary" />
          Relationships
        </h2>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Relationship Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-accent">✅ Do</h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Use single-direction filtering (1:* from dimension to fact)",
                      "Create integer surrogate keys for relationships",
                      "Mark one Date table as the official Date table",
                      "Ensure referential integrity where possible",
                      "Use inactive relationships with USERELATIONSHIP()",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-destructive">❌ Avoid</h4>
                  <ul className="space-y-2 text-sm">
                    {[
                      "Bi-directional filtering unless absolutely necessary",
                      "Many-to-many relationships without bridge tables",
                      "Snowflake chains longer than 2 levels",
                      "Calculated columns for relationship keys",
                      "Text columns as relationship keys (use integer keys)",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Using Multiple Relationships (Role-Playing Dimensions)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                When a fact table has multiple date columns (OrderDate, ShipDate, DueDate), you create multiple
                relationships to the Date dimension. Only one can be active — use <code>USERELATIONSHIP</code> for the
                others.
              </p>
              <CodeBlock
                title="Role-Playing Date Dimensions"
                language="dax"
                code={`-- Active relationship: Date[DateKey] → Sales[OrderDateKey]
-- Inactive relationship: Date[DateKey] → Sales[ShipDateKey]

Sales by Ship Date =
CALCULATE(
    [Total Sales],
    USERELATIONSHIP( 'Date'[DateKey], 'Sales'[ShipDateKey] )
)`}
              />
            </CardContent>
          </Card>
        </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================================ */}
      {/* QUERY FOLDING */}
      {/* ============================================================ */}
      <section id="query-folding" className="mb-16 scroll-mt-20">
        <AnimateOnScroll variant="fade-up">
        <h2 className="mb-6 text-3xl font-bold">
          <Zap className="mr-2 inline h-7 w-7 text-yellow-700 dark:text-primary" />
          Query Folding
        </h2>

        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="py-6">
            <p className="text-center text-lg">
              <strong className="text-yellow-700 dark:text-primary">Query Folding</strong> is the ability of Power Query to translate
              M transformations into native SQL queries that execute on the source database — dramatically improving
              refresh performance.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-accent">Operations That Fold</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {[
                  "Filtering rows (WHERE clause)",
                  "Selecting / removing columns (SELECT)",
                  "Grouping and aggregation (GROUP BY)",
                  "Sorting (ORDER BY)",
                  "Joining tables (JOIN)",
                  "Renaming columns (AS alias)",
                  "Type conversions supported by source (CAST)",
                  "Top N rows (TOP / LIMIT)",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Operations That Break Folding</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {[
                  "Adding custom columns with complex M expressions",
                  "Merging queries from different data sources",
                  "Using Table.Buffer() or List.Buffer()",
                  "Pivot / Unpivot operations (sometimes)",
                  "Complex conditional columns (try/otherwise)",
                  "Custom functions with non-foldable logic",
                  "Changing data types AFTER non-foldable steps",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Verify Query Folding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <ol className="list-decimal space-y-2 pl-5">
              <li>In Power Query Editor, right-click on a step</li>
              <li>If &quot;View Native Query&quot; is available and not grayed out → <strong className="text-accent">folding is active</strong></li>
              <li>If grayed out → folding broke at or before this step</li>
              <li>Re-order your steps to keep foldable operations first</li>
            </ol>
            <div className="rounded-lg bg-primary/5 p-4">
              <p>
                <strong className="text-yellow-700 dark:text-primary">Pro Tip:</strong> Always filter rows and select columns{" "}
                <em>before</em> any non-foldable transformation. This reduces the data pulled from the source.
              </p>
            </div>
          </CardContent>
        </Card>
        </AnimateOnScroll>
      </section>

      {/* ============================================================ */}
      {/* SNOWFLAKE vs STAR */}
      {/* ============================================================ */}
      <section id="snowflake-vs-star" className="mb-16 scroll-mt-20">
        <AnimateOnScroll variant="fade-up">
        <h2 className="mb-6 text-3xl font-bold">
          <Network className="mr-2 inline h-7 w-7 text-yellow-700 dark:text-primary" />
          Star Schema vs Snowflake Schema
        </h2>

        <div className="overflow-x-auto rounded-xl border border-border mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold">Aspect</th>
                <th className="px-4 py-3 text-left font-semibold text-yellow-700 dark:text-primary">Star Schema ⭐</th>
                <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Snowflake Schema ❄️</th>
              </tr>
            </thead>
            <tbody>
              {[
                { aspect: "Dimensions", star: "Flat / denormalized", snow: "Normalized (split into sub-tables)" },
                { aspect: "Number of tables", star: "Fewer tables", snow: "More tables" },
                { aspect: "Query complexity", star: "Simple — fewer joins", snow: "Complex — multiple joins" },
                { aspect: "VertiPaq performance", star: "Excellent compression", snow: "Slightly less efficient" },
                { aspect: "DAX complexity", star: "Simple RELATED() patterns", snow: "Longer chain traversals" },
                { aspect: "Power BI recommendation", star: "✅ Recommended", snow: "⚠️ Acceptable but flatten if possible" },
              ].map((row, i) => (
                <tr key={row.aspect} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                  <td className="px-4 py-3 font-medium">{row.aspect}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.star}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.snow}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Snowflake Schema Visual Diagram */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="py-8 sm:py-12">
            <div className="flex flex-col items-center">
              <p className="mb-8 text-sm font-semibold text-muted-foreground">❄️ Snowflake Schema Topology</p>

              {/* Mobile layout */}
              <div className="flex w-full flex-col items-center gap-3 sm:hidden">
                {/* Fact table */}
                <div className="w-full max-w-[280px] rounded-2xl border-2 border-blue-500 bg-blue-500/10 px-5 py-4 text-center shadow-lg shadow-blue-500/10">
                  <Database className="mx-auto mb-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Fact</p>
                  <p className="text-base font-bold">Sales</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">OrderID, DateKey, Qty, Amt</p>
                </div>
                <p className="text-[10px] font-medium text-muted-foreground">connects to ↓</p>
                {/* Dimension tables */}
                <div className="grid w-full max-w-[320px] grid-cols-2 gap-2">
                  {[
                    { emoji: "📅", name: "Date", detail: "DateKey, MonthID" },
                    { emoji: "📦", name: "Product", detail: "ProductKey, SubCatID" },
                    { emoji: "👤", name: "Customer", detail: "CustKey, CityID" },
                    { emoji: "🏬", name: "Store", detail: "StoreKey, RegionID" },
                  ].map((dim) => (
                    <div key={dim.name} className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-3 py-2 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                      <p className="text-xs font-semibold">{dim.emoji} {dim.name}</p>
                      <p className="text-[9px] text-muted-foreground">{dim.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-medium text-muted-foreground">→ further normalized into ↓</p>
                {/* Sub-dimension tables */}
                <div className="grid w-full max-w-[320px] grid-cols-2 gap-2">
                  {[
                    { emoji: "📆", name: "Month", detail: "MonthID, Quarter, Year" },
                    { emoji: "🏷️", name: "Subcategory", detail: "SubCatID, CatID" },
                    { emoji: "🏙️", name: "City", detail: "CityID, StateID" },
                    { emoji: "🌍", name: "Region", detail: "RegionID, Country" },
                    { emoji: "📁", name: "Category", detail: "CategoryID, Dept" },
                    { emoji: "🗺️", name: "State", detail: "StateID, Country" },
                  ].map((sub) => (
                    <div key={sub.name} className="rounded-xl border-2 border-purple-500/50 bg-purple-500/5 px-3 py-2 text-center">
                      <p className="text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Sub-Dim</p>
                      <p className="text-xs font-semibold">{sub.emoji} {sub.name}</p>
                      <p className="text-[9px] text-muted-foreground">{sub.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop snowflake layout */}
              <div className="relative mx-auto hidden h-[580px] w-full max-w-[700px] sm:block">
                {/* SVG connector lines — plain lines only, no dots */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 700 580"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Fact → Date (up) */}
                  <line x1="350" y1="250" x2="350" y2="112" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />
                  {/* Fact → Product (left) */}
                  <line x1="290" y1="290" x2="155" y2="290" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />
                  {/* Fact → Customer (right) */}
                  <line x1="410" y1="290" x2="545" y2="290" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />
                  {/* Fact → Store (down) */}
                  <line x1="350" y1="340" x2="350" y2="460" stroke="currentColor" strokeWidth="2" className="text-emerald-500/60 dark:text-emerald-400/50" strokeDasharray="6 3" />

                  {/* Date → Month (sub-dim, up-left) */}
                  <line x1="310" y1="75" x2="190" y2="30" stroke="currentColor" strokeWidth="2" className="text-purple-500/60 dark:text-purple-400/50" strokeDasharray="4 3" />

                  {/* Product → Subcategory (sub-dim, left-up) */}
                  <line x1="90" y1="260" x2="55" y2="175" stroke="currentColor" strokeWidth="2" className="text-purple-500/60 dark:text-purple-400/50" strokeDasharray="4 3" />
                  {/* Subcategory → Category (sub-dim, further-left) */}
                  <line x1="55" y1="130" x2="55" y2="65" stroke="currentColor" strokeWidth="2" className="text-purple-500/60 dark:text-purple-400/50" strokeDasharray="4 3" />

                  {/* Customer → City (sub-dim, right-up) */}
                  <line x1="610" y1="260" x2="645" y2="175" stroke="currentColor" strokeWidth="2" className="text-purple-500/60 dark:text-purple-400/50" strokeDasharray="4 3" />
                  {/* City → State (sub-dim, further-right) */}
                  <line x1="645" y1="130" x2="645" y2="65" stroke="currentColor" strokeWidth="2" className="text-purple-500/60 dark:text-purple-400/50" strokeDasharray="4 3" />

                  {/* Store → Region (sub-dim, down) */}
                  <line x1="310" y1="500" x2="190" y2="545" stroke="currentColor" strokeWidth="2" className="text-purple-500/60 dark:text-purple-400/50" strokeDasharray="4 3" />

                  {/* Relationship labels */}
                  <text x="340" y="185" className="fill-yellow-600 dark:fill-yellow-400 text-[10px] font-bold" textAnchor="end">1</text>
                  <text x="360" y="240" className="fill-blue-500 dark:fill-blue-400 text-[10px] font-bold" textAnchor="start">*</text>
                  <text x="220" y="280" className="fill-yellow-600 dark:fill-yellow-400 text-[10px] font-bold" textAnchor="end">1</text>
                  <text x="225" y="305" className="fill-blue-500 dark:fill-blue-400 text-[10px] font-bold" textAnchor="start">*</text>
                  <text x="475" y="280" className="fill-yellow-600 dark:fill-yellow-400 text-[10px] font-bold" textAnchor="end">1</text>
                  <text x="480" y="305" className="fill-blue-500 dark:fill-blue-400 text-[10px] font-bold" textAnchor="start">*</text>
                  <text x="340" y="400" className="fill-yellow-600 dark:fill-yellow-400 text-[10px] font-bold" textAnchor="end">1</text>
                  <text x="360" y="360" className="fill-blue-500 dark:fill-blue-400 text-[10px] font-bold" textAnchor="start">*</text>
                </svg>

                {/* Center — FACT table */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="rounded-2xl border-2 border-blue-500 bg-blue-500/10 px-6 py-5 text-center shadow-lg shadow-blue-500/10 transition-transform duration-300 hover:scale-105">
                    <Database className="mx-auto mb-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Fact</p>
                    <p className="text-base font-bold">Sales</p>
                    <p className="mt-1 text-[10px] text-muted-foreground">OrderID, DateKey, Qty, Amt</p>
                  </div>
                </div>

                {/* Top — Date dimension */}
                <div className="absolute left-1/2 top-[50px] -translate-x-1/2">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-4 py-2.5 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">📅 Date</p>
                    <p className="text-[10px] text-muted-foreground">DateKey, MonthID</p>
                  </div>
                </div>

                {/* Top-left — Month sub-dimension */}
                <div className="absolute left-[80px] top-0">
                  <div className="rounded-xl border-2 border-purple-500/50 bg-purple-500/5 px-3 py-2 text-center transition-transform duration-300 hover:scale-105 hover:border-purple-500">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Sub-Dim</p>
                    <p className="text-xs font-semibold">📆 Month</p>
                    <p className="text-[9px] text-muted-foreground">Quarter, Year</p>
                  </div>
                </div>

                {/* Left — Product dimension */}
                <div className="absolute left-[10px] top-[255px]">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-4 py-2.5 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">📦 Product</p>
                    <p className="text-[10px] text-muted-foreground">Name, SubCatID</p>
                  </div>
                </div>

                {/* Left-up — Subcategory sub-dimension */}
                <div className="absolute left-0 top-[130px]">
                  <div className="rounded-xl border-2 border-purple-500/50 bg-purple-500/5 px-3 py-2 text-center transition-transform duration-300 hover:scale-105 hover:border-purple-500">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Sub-Dim</p>
                    <p className="text-xs font-semibold">🏷️ Subcategory</p>
                    <p className="text-[9px] text-muted-foreground">SubCatID, CatID</p>
                  </div>
                </div>

                {/* Far left-up — Category sub-dimension */}
                <div className="absolute left-0 top-[20px]">
                  <div className="rounded-xl border-2 border-purple-500/50 bg-purple-500/5 px-3 py-2 text-center transition-transform duration-300 hover:scale-105 hover:border-purple-500">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Sub-Dim</p>
                    <p className="text-xs font-semibold">📁 Category</p>
                    <p className="text-[9px] text-muted-foreground">CategoryID, Dept</p>
                  </div>
                </div>

                {/* Right — Customer dimension */}
                <div className="absolute right-[10px] top-[255px]">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-4 py-2.5 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">👤 Customer</p>
                    <p className="text-[10px] text-muted-foreground">Name, CityID</p>
                  </div>
                </div>

                {/* Right-up — City sub-dimension */}
                <div className="absolute right-0 top-[130px]">
                  <div className="rounded-xl border-2 border-purple-500/50 bg-purple-500/5 px-3 py-2 text-center transition-transform duration-300 hover:scale-105 hover:border-purple-500">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Sub-Dim</p>
                    <p className="text-xs font-semibold">🏙️ City</p>
                    <p className="text-[9px] text-muted-foreground">CityID, StateID</p>
                  </div>
                </div>

                {/* Far right-up — State sub-dimension */}
                <div className="absolute right-0 top-[20px]">
                  <div className="rounded-xl border-2 border-purple-500/50 bg-purple-500/5 px-3 py-2 text-center transition-transform duration-300 hover:scale-105 hover:border-purple-500">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Sub-Dim</p>
                    <p className="text-xs font-semibold">🗺️ State</p>
                    <p className="text-[9px] text-muted-foreground">StateID, Country</p>
                  </div>
                </div>

                {/* Bottom — Store dimension */}
                <div className="absolute bottom-[50px] left-1/2 -translate-x-1/2">
                  <div className="rounded-xl border-2 border-emerald-500/50 bg-emerald-500/5 px-4 py-2.5 text-center transition-transform duration-300 hover:scale-105 hover:border-emerald-500">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
                    <p className="text-sm font-semibold">🏬 Store</p>
                    <p className="text-[10px] text-muted-foreground">Name, RegionID</p>
                  </div>
                </div>

                {/* Bottom-left — Region sub-dimension */}
                <div className="absolute bottom-0 left-[80px]">
                  <div className="rounded-xl border-2 border-purple-500/50 bg-purple-500/5 px-3 py-2 text-center transition-transform duration-300 hover:scale-105 hover:border-purple-500">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Sub-Dim</p>
                    <p className="text-xs font-semibold">🌍 Region</p>
                    <p className="text-[9px] text-muted-foreground">RegionID, Country</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border-2 border-blue-500 bg-blue-500/10" />
                  <span>Fact Table</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border-2 border-emerald-500/50 bg-emerald-500/5" />
                  <span>Dimension Table</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm border-2 border-purple-500/50 bg-purple-500/5" />
                  <span>Sub-Dimension Table</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="24" height="2"><line x1="0" y1="1" x2="24" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" className="text-emerald-500/60" /></svg>
                  <span>1:* Relationship</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                In a snowflake schema, dimension tables are <strong className="text-foreground">normalized</strong> — attributes are split into sub-dimension tables (e.g., Product → Subcategory → Category). This reduces redundancy but adds join complexity.
              </p>
            </div>
          </CardContent>
        </Card>
        </AnimateOnScroll>
      </section>

      {/* ============================================================ */}
      {/* ROW-LEVEL SECURITY */}
      {/* ============================================================ */}
      <section id="rls" className="mb-16 scroll-mt-20">
        <AnimateOnScroll variant="fade-up">
        <h2 className="mb-6 text-3xl font-bold">
          <Shield className="mr-2 inline h-7 w-7 text-yellow-700 dark:text-primary" />
          Row-Level Security (RLS)
        </h2>

        <Card>
          <CardContent className="space-y-4 py-6">
            <p className="text-muted-foreground">
              Row-Level Security restricts which data rows a user can see based on their identity.
              RLS is defined using DAX filter expressions on tables.
            </p>

            <CodeBlock
              title="RLS Role Definition"
              language="dax"
              code={`-- Role: Regional Manager
-- Table filter on Store dimension:
[Region] = USERPRINCIPALNAME()

-- Or using a security table:
[Email] = USERPRINCIPALNAME()

-- Dynamic RLS with a bridge table:
FILTER(
    'SecurityMapping',
    'SecurityMapping'[UserEmail] = USERPRINCIPALNAME()
)`}
            />

            <div className="rounded-lg bg-primary/5 p-4 text-sm">
              <strong className="text-yellow-700 dark:text-primary">Implementation Steps:</strong>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
                <li>Create a security role in Power BI Desktop (Modeling → Manage Roles)</li>
                <li>Define DAX filter expressions for each table</li>
                <li>Test using &quot;View As&quot; feature</li>
                <li>Publish to Power BI Service and assign users to roles</li>
              </ol>
            </div>
          </CardContent>
        </Card>
        </AnimateOnScroll>
      </section>

      {/* ============================================================ */}
      {/* PERFORMANCE */}
      {/* ============================================================ */}
      <section id="performance" className="mb-16 scroll-mt-20">
        <AnimateOnScroll variant="fade-up">
        <h2 className="mb-6 text-3xl font-bold">
          <Layers className="mr-2 inline h-7 w-7 text-yellow-700 dark:text-primary" />
          Performance Optimization
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Reduce Model Size",
              items: [
                "Remove unnecessary columns from tables",
                "Avoid high-cardinality text columns in fact tables",
                "Use integer keys instead of text for relationships",
                "Disable Auto Date/Time in Options",
                "Split large Date ranges to relevant periods only",
              ],
            },
            {
              title: "Optimize DAX",
              items: [
                "Use variables (VAR/RETURN) to avoid repeated calculations",
                "Prefer SUMMARIZECOLUMNS over SUMMARIZE + ADDCOLUMNS",
                "Minimize use of EARLIER() — use VAR instead",
                "Avoid nested iterators on large tables",
                "Use DIVIDE() instead of division operator",
              ],
            },
            {
              title: "Power Query Best Practices",
              items: [
                "Apply filters as early as possible",
                "Remove unnecessary columns at the source",
                "Maintain query folding (verify with View Native Query)",
                "Use parameters for source connections",
                "Avoid using Excel files as primary data sources",
              ],
            },
            {
              title: "Report Design",
              items: [
                "Limit visuals per page to 8-10 maximum",
                "Use bookmarks instead of many report pages",
                "Avoid bi-directional cross-filtering",
                "Use drill-through pages for detail views",
                "Set appropriate data reduction (Top N) in visuals",
              ],
            },
          ].map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle className="text-base">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-yellow-700 dark:text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        </AnimateOnScroll>
      </section>

      {/* ============================================================ */}
      {/* ANTI-PATTERNS */}
      {/* ============================================================ */}
      <section id="anti-patterns" className="mb-16 scroll-mt-20">
        <AnimateOnScroll variant="fade-up">
        <h2 className="mb-6 text-3xl font-bold">
          <AlertTriangle className="mr-2 inline h-7 w-7 text-yellow-700 dark:text-primary" />
          <span className="text-emerald-600 dark:text-emerald-400">Common Anti-Patterns</span>
        </h2>

        <div className="space-y-4">
          {[
            {
              pattern: "Single Flat Table (Wide Table)",
              problem: "All data in one denormalized table. Leads to data redundancy, large model sizes, and complex DAX.",
              fix: "Split into proper star schema with fact & dimension tables.",
            },
            {
              pattern: "Bi-Directional Filtering Everywhere",
              problem: "Causes ambiguous filter paths, performance degradation, and unexpected DAX results.",
              fix: "Use single-direction filtering (dimension → fact). Use CROSSFILTER() in DAX for rare exceptions.",
            },
            {
              pattern: "Calculated Columns for Aggregation",
              problem: "Storing aggregated values as calculated columns wastes storage and doesn't react to filters.",
              fix: "Use measures for any aggregation. Calculated columns for row-level classification only.",
            },
            {
              pattern: "Direct Relationships Between Fact Tables",
              problem: "Many-to-many between facts creates ambiguity. The engine can't determine proper filter direction.",
              fix: "Use shared dimensions (conformed dimensions) that both fact tables reference.",
            },
            {
              pattern: "Not Using a Date Table",
              problem: "Without a dedicated Date table, time intelligence functions won't work correctly.",
              fix: "Create a separate Date dimension with a continuous date range and mark it as a Date table.",
            },
          ].map((item) => (
            <Card key={item.pattern} className="border-destructive/20">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  <div className="space-y-1.5">
                    <p className="font-semibold">{item.pattern}</p>
                    <p className="text-sm text-muted-foreground">{item.problem}</p>
                    <p className="text-sm">
                      <strong className="text-emerald-600 dark:text-emerald-400">Fix:</strong> {item.fix}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </AnimateOnScroll>
      </section>
    </div>
  );
}
