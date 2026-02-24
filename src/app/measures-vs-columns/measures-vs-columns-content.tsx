"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { PageTransition } from "@/components/ui/page-transition";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  Columns3,
  Calculator,
  AlertTriangle,
  Database,
  Table2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Comparison Data                                                    */
/* ------------------------------------------------------------------ */

const comparisonRows = [
  { aspect: "Evaluation Time", measure: "Query time (dynamic)", column: "Refresh time (static)" },
  { aspect: "Storage", measure: "No storage — computed on the fly", column: "Stored in the model (increases size)" },
  { aspect: "Context", measure: "Filter context (aggregates)", column: "Row context (row-by-row)" },
  { aspect: "Slicers / Filters", measure: "Responds dynamically to all filters", column: "Fixed value per row" },
  { aspect: "Use in Visuals", measure: "Values, tooltips, conditional formatting", column: "Axes, slicers, legends, filters" },
  { aspect: "RELATED()", measure: "Only inside iterators (SUMX, etc.)", column: "Directly available in row context" },
  { aspect: "Performance", measure: "Can be optimized by engine caching", column: "Increases model RAM consumption" },
  { aspect: "Recalculation", measure: "Every query / interaction", column: "Only on data refresh" },
];

const sidebarNav = [
  { id: "definitions", label: "Definitions" },
  { id: "comparison", label: "Comparison Table" },
  { id: "eval-context", label: "Evaluation Context" },
  { id: "context-transition", label: "Context Transition" },
  { id: "decision-guide", label: "Decision Guide" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "create-measures", label: "How to Create Measures" },
  { id: "create-columns", label: "How to Create Columns" },
  { id: "functions-ref", label: "Functions Reference" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MeasuresVsColumnsContent() {
  const [activeSection, setActiveSection] = useState("definitions");
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const sections = sidebarNav.map((item) => ({
          id: item.id,
          el: document.getElementById(item.id),
        }));
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = sections[i].el;
          if (el && el.getBoundingClientRect().top <= 120) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-12 sm:px-10 lg:px-16">
        {/* Header */}
        <AnimateOnScroll variant="fade-up" duration={600}>
          <div className="mb-12 flex flex-col items-center text-center">
            <Badge variant="measure" className="mb-3">
              <BarChart3 className="mr-1 h-3 w-3" />
              Core Concepts
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Measures vs Calculated Columns
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
              One of the most critical concepts in Power BI. Understanding when to use a <strong>Measure</strong> versus a{" "}
              <strong>Calculated Column</strong> affects performance, correctness, and model design.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Quick Introduction */}
        <AnimateOnScroll variant="fade-up" delay={50}>
          <Card className="mb-12 border-blue-500/20 hover:border-blue-500/40 bg-blue-500/5">
            <CardContent className="py-6">
              <h3 className="mb-2 text-lg font-semibold">Quick Introduction</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                In Power BI, there are two main ways to add calculations: <strong className="text-foreground">Measures</strong> and{" "}
                <strong className="text-foreground">Calculated Columns</strong>. A <em>measure</em> is a dynamic formula that calculates on the fly
                whenever you interact with a report — it responds to slicers, filters, and cross-highlights. A <em>calculated column</em>{" "}
                is computed once during data refresh and stored as a fixed value in each row of your table. Choosing the right one is essential
                for building fast, accurate, and maintainable Power BI reports.
              </p>
            </CardContent>
          </Card>
        </AnimateOnScroll>

        {/* Quick Rule */}
        <AnimateOnScroll variant="fade-up" delay={100}>
          <Card className="mb-12 border-primary/20 hover:border-primary/40 bg-primary/5">
            <CardContent className="py-6">
              <p className="text-center text-lg font-semibold">
                <Zap className="mr-2 inline h-5 w-5 text-yellow-700 dark:text-primary" />
                <span className="text-yellow-700 dark:text-primary">Golden Rule:</span> If you need to <em>aggregate</em> data or react to slicer
                selections → use a <strong>Measure</strong>. If you need a <em>fixed value per row</em> for filtering or
                sorting → use a <strong>Calculated Column</strong>.
              </p>
            </CardContent>
          </Card>
        </AnimateOnScroll>

        {/* ── Layout: Sidebar + Content ── */}
        <div className="flex gap-10">
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                In this article
              </p>
              <nav className="flex max-h-[calc(100vh-8rem)] flex-col gap-0.5 overflow-y-auto border-l border-border pr-2">
                {sidebarNav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={cn(
                      "-ml-px border-l-2 px-4 py-1.5 text-sm transition-colors",
                      activeSection === item.id
                        ? "border-primary font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1 space-y-12">

            {/* Side-by-side Definition Cards */}
            <section id="definitions" className="scroll-mt-24">
              <div className="mb-12 grid gap-6 md:grid-cols-2">
                {/* Measure Card */}
                <AnimateOnScroll variant="fade-right" delay={0}>
                  <Card className="border-blue-500/20 hover:border-blue-500/40">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                          <Calculator className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <CardTitle>Measures</CardTitle>
                          <CardDescription>Dynamic, query-time calculations</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Measures are <strong>DAX formulas that evaluate at query time</strong>. They operate in{" "}
                        <strong>filter context</strong> — meaning their result changes based on slicers, filters, rows, and columns
                        in your report visuals.
                      </p>

                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Characteristics</h4>
                        <ul className="space-y-1.5 text-sm">
                          {[
                            "Evaluated dynamically when the visual renders",
                            "Responds to slicers, filters, and cross-filtering",
                            "Does NOT consume storage in the model",
                            "Cannot be used directly as a slicer or axis",
                            "Uses filter context by default",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <CodeBlock
                        title="Measure Example"
                        language="dax"
                        code={`Total Sales =
SUM( 'Sales'[Amount] )

-- With time intelligence
Sales YTD =
TOTALYTD(
    [Total Sales],
    'Date'[Date]
)

-- Year-over-year growth
YoY Growth % =
VAR CurrentYear = [Total Sales]
VAR PriorYear =
    CALCULATE(
        [Total Sales],
        SAMEPERIODLASTYEAR( 'Date'[Date] )
    )
RETURN
    DIVIDE( CurrentYear - PriorYear, PriorYear )`}
                      />
                    </CardContent>
                  </Card>
                </AnimateOnScroll>

                {/* Calculated Column Card */}
                <AnimateOnScroll variant="fade-left" delay={100}>
                  <Card className="border-emerald-500/20 hover:border-emerald-500/40">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                          <Columns3 className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div>
                          <CardTitle>Calculated Columns</CardTitle>
                          <CardDescription>Static, row-level computation</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Calculated columns are <strong>DAX formulas computed during data refresh</strong> and stored in the model.
                        They operate in <strong>row context</strong> — meaning the formula evaluates for each row individually.
                      </p>

                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Characteristics</h4>
                        <ul className="space-y-1.5 text-sm">
                          {[
                            "Evaluated once during data refresh",
                            "Value is fixed per row — does not change with slicers",
                            "Stored in the model (increases file size and RAM)",
                            "Can be used as slicer, axis, legend, or filter",
                            "Uses row context by default (can access RELATED())",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <CodeBlock
                        title="Calculated Column Example"
                        language="dax"
                        code={`-- On the Sales table
Profit Margin =
DIVIDE(
    'Sales'[Revenue] - 'Sales'[Cost],
    'Sales'[Revenue]
)

-- Using RELATED to get data from another table
Product Category =
RELATED( 'Product'[Category] )

-- Classification column
Sales Tier =
SWITCH(
    TRUE(),
    'Sales'[Amount] >= 1000, "High",
    'Sales'[Amount] >= 500,  "Medium",
    "Low"
)`}
                      />
                    </CardContent>
                  </Card>
                </AnimateOnScroll>
              </div>
            </section>

            {/* Comparison Table */}
            <section id="comparison" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <div className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold">Side-by-Side Comparison</h2>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-4 py-3 text-left font-semibold">Aspect</th>
                          <th className="px-4 py-3 text-left font-semibold text-blue-500">
                            <Calculator className="mr-1 inline h-4 w-4" /> Measure
                          </th>
                          <th className="px-4 py-3 text-left font-semibold text-emerald-500">
                            <Columns3 className="mr-1 inline h-4 w-4" /> Calculated Column
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonRows.map((row, i) => (
                          <tr key={row.aspect} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                            <td className="px-4 py-3 font-medium">{row.aspect}</td>
                            <td className="px-4 py-3 text-muted-foreground">{row.measure}</td>
                            <td className="px-4 py-3 text-muted-foreground">{row.column}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </AnimateOnScroll>
            </section>

            {/* Evaluation Context Deep-Dive */}
            <section id="eval-context" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <div className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold">Understanding Evaluation Context</h2>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Filter Context */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-blue-500">Filter Context</CardTitle>
                        <CardDescription>The set of active filters when a DAX expression evaluates</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Filter context is determined by:
                        </p>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                            Report-level, page-level, and visual-level filters
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                            Slicer selections
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                            Row and column headers in a matrix/table visual
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                            CALCULATE filter arguments
                          </li>
                        </ul>
                        <CodeBlock
                          language="dax"
                          code={`-- Filter context example
-- When Year slicer = 2024 and
-- Category axis = "Electronics":
Total Sales = SUM( 'Sales'[Amount] )
-- Returns sales only for Electronics in 2024`}
                        />
                      </CardContent>
                    </Card>

                    {/* Row Context */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-emerald-500">Row Context</CardTitle>
                        <CardDescription>Iteration over individual rows of a table</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Row context exists in:
                        </p>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            Calculated columns (automatic for each row)
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            Iterator functions (SUMX, AVERAGEX, FILTER, etc.)
                          </li>
                          <li className="flex items-start gap-2">
                            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                            RELATED() and RELATEDTABLE() navigation
                          </li>
                        </ul>
                        <CodeBlock
                          language="dax"
                          code={`-- Row context in a calculated column
Line Total =
'Sales'[Quantity] * 'Sales'[Unit Price]

-- Row context in an iterator
Total Revenue =
SUMX(
    'Sales',
    'Sales'[Quantity] * 'Sales'[Unit Price]
)
-- SUMX creates row context for each row`}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AnimateOnScroll>
            </section>

            {/* Context Transition */}
            <section id="context-transition" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-scale">
                <Card className="mb-12 border-yellow-500/20 hover:border-yellow-500/40 bg-yellow-500/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      Context Transition (Critical Concept)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Context transition</strong> occurs when CALCULATE converts the current <em>row context</em> into a{" "}
                      <em>filter context</em>. This happens automatically when you reference a measure inside an iterator.
                    </p>
                    <CodeBlock
                      title="Context Transition Example"
                      language="dax"
                      code={`-- Define a measure
Total Sales = SUM( 'Sales'[Amount] )

-- Using it inside SUMX triggers context transition
Weighted Sales =
SUMX(
    'Product',
    -- [Total Sales] is a measure reference
    -- CALCULATE is implicitly called:
    -- CALCULATE( SUM('Sales'[Amount]) )
    -- The current row context (Product row) becomes
    -- a filter context that filters Sales!
    [Total Sales] * 'Product'[Weight]
)`}
                    />
                    <div className="rounded-lg bg-card p-4 text-sm">
                      <p>
                        <strong>Why this matters:</strong> When <code>[Total Sales]</code> is evaluated inside SUMX, it{" "}
                        <strong>automatically</strong> wraps in CALCULATE. The current Product row becomes a filter — so{" "}
                        <code>[Total Sales]</code> returns only the sales for <em>that specific product</em>.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            </section>

            {/* When To Use What */}
            <section id="decision-guide" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <div className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold">Decision Guide: When To Use What</h2>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Use a Measure */}
                    <Card className="border-blue-500/20 hover:border-blue-500/40">
                      <CardHeader>
                        <CardTitle className="text-blue-500">✅ Use a Measure When…</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {[
                            "You need a value that reacts to slicers and filters",
                            "You're performing aggregations (SUM, COUNT, AVERAGE)",
                            "You need time intelligence (YTD, YoY, etc.)",
                            "You want to calculate percentages of totals",
                            "You're building KPIs or scorecards",
                            "You need conditional formatting values",
                            "You want to optimize model size (no storage cost)",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Use a Calculated Column */}
                    <Card className="border-emerald-500/20 hover:border-emerald-500/40">
                      <CardHeader>
                        <CardTitle className="text-emerald-500">✅ Use a Calculated Column When…</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {[
                            "You need to classify or bucket rows (High/Med/Low)",
                            "You need the value as a slicer or filter",
                            "You need to sort by a computed value",
                            "You're creating a composite key for relationships",
                            "You need row-level security (RLS) columns",
                            "The value must be available in the axis of a chart",
                            "You need RELATED() values for denormalization",
                          ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AnimateOnScroll>
            </section>

            {/* Common Mistakes */}
            <section id="common-mistakes" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <div className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold"><span className="text-emerald-600 dark:text-emerald-400">Common Mistakes to Avoid</span></h2>
                  <div className="space-y-4">
                    {[
                      {
                        mistake: "Using a calculated column instead of a measure for aggregation",
                        why: "Calculated columns store a value per row. If you SUM a calc column in a visual, it works but wastes storage and doesn't adapt to filter changes the way a proper measure would.",
                        fix: "Convert to a measure: Total Sales = SUM('Sales'[Amount])",
                      },
                      {
                        mistake: "Using FILTER() on the entire table when a simple predicate works",
                        why: "FILTER() iterates row-by-row. For simple column comparisons, CALCULATE can push the filter to the storage engine directly.",
                        fix: "Replace CALCULATE([Sales], FILTER('Sales', 'Sales'[Year]=2024)) with CALCULATE([Sales], 'Sales'[Year]=2024)",
                      },
                      {
                        mistake: "Using FORMAT() in measures used for sorting or calculations",
                        why: "FORMAT() returns text, which breaks numeric sorting and cannot be used in further calculations.",
                        fix: "Apply formatting in the visual's format pane or use FORMAT() only for display-only text measures.",
                      },
                    ].map((item) => (
                      <Card key={item.mistake}>
                        <CardContent className="py-4">
                          <div className="flex items-start gap-3">
                            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                            <div className="space-y-1.5">
                              <p className="font-semibold">{item.mistake}</p>
                              <p className="text-sm text-muted-foreground">{item.why}</p>
                              <p className="text-sm">
                                <strong className="text-emerald-600 dark:text-emerald-400">Fix:</strong> {item.fix}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            </section>

            {/* ============================================================ */}
            {/* HOW TO CREATE NEW MEASURES                                    */}
            {/* ============================================================ */}
            <section id="create-measures" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <div className="mb-16">
                  <h2 className="mb-2 text-3xl font-bold">
                    <Calculator className="mr-2 inline h-7 w-7 text-blue-500" />
                    How to Create New Measures
                  </h2>
                  <p className="mb-8 max-w-3xl text-muted-foreground">
                    Step-by-step guide to creating measures in Power BI, covering aggregation functions, time intelligence, iterators, and advanced techniques.
                  </p>

                  {/* Step 1: Basic Aggregation Measures */}
                  <Card className="mb-6 border-blue-500/20 hover:border-blue-500/40">
                    <CardHeader>
                      <CardTitle className="text-blue-500">1. Basic Aggregation Measures</CardTitle>
                      <CardDescription>The foundation — SUM, AVERAGE, COUNT, MIN, MAX</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">How to create:</strong> In Power BI Desktop, go to the <em>Modeling</em> tab → click <strong>New Measure</strong>, or right-click a table in the Fields pane → <strong>New Measure</strong>. Then type your DAX formula.
                      </p>
                      <CodeBlock
                        title="Basic Aggregation Measures"
                        language="dax"
                        code={`-- Sum of all sales
Total Sales = SUM( 'Sales'[Amount] )

-- Average order value
Avg Order Value = AVERAGE( 'Sales'[Amount] )

-- Count total transactions
Total Transactions = COUNTROWS( 'Sales' )

-- Count unique customers
Unique Customers = DISTINCTCOUNT( 'Sales'[CustomerID] )

-- Minimum and maximum
First Order Date = MIN( 'Sales'[OrderDate] )
Last Order Date  = MAX( 'Sales'[OrderDate] )`}
                      />
                    </CardContent>
                  </Card>

                  {/* Step 2: CALCULATE Measures */}
                  <Card className="mb-6 border-blue-500/20 hover:border-blue-500/40">
                    <CardHeader>
                      <CardTitle className="text-blue-500">2. Filtered Measures with CALCULATE</CardTitle>
                      <CardDescription>Modify the filter context to create conditional measures</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        <code>CALCULATE</code> is the most powerful DAX function. It evaluates an expression in a <strong>modified filter context</strong>.
                      </p>
                      <CodeBlock
                        title="CALCULATE Measures"
                        language="dax"
                        code={`-- Sales for a specific category
Electronics Sales =
CALCULATE(
    [Total Sales],
    'Product'[Category] = "Electronics"
)

-- Sales for the current year
Current Year Sales =
CALCULATE(
    [Total Sales],
    'Date'[Year] = YEAR( TODAY() )
)

-- Percentage of total (using ALL to remove filters)
Sales % of Total =
DIVIDE(
    [Total Sales],
    CALCULATE( [Total Sales], ALL( 'Sales' ) )
)

-- Sales keeping only category filter
Category % =
DIVIDE(
    [Total Sales],
    CALCULATE(
        [Total Sales],
        ALLEXCEPT( 'Product', 'Product'[Category] )
    )
)`}
                      />
                    </CardContent>
                  </Card>

                  {/* Step 3: Iterator (X) Measures */}
                  <Card className="mb-6 border-blue-500/20 hover:border-blue-500/40">
                    <CardHeader>
                      <CardTitle className="text-blue-500">3. Iterator Functions (SUMX, AVERAGEX, COUNTX, MINX, MAXX)</CardTitle>
                      <CardDescription>Row-by-row evaluation for complex expressions</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Iterator functions loop through a table row by row, evaluate an expression on each row, and aggregate the results. They create <strong>row context</strong>.
                      </p>
                      <CodeBlock
                        title="Iterator Measures"
                        language="dax"
                        code={`-- Revenue = Qty × Unit Price (row by row)
Total Revenue =
SUMX(
    'Sales',
    'Sales'[Quantity] * RELATED( 'Product'[UnitPrice] )
)

-- Average line total
Avg Line Total =
AVERAGEX(
    'Sales',
    'Sales'[Quantity] * 'Sales'[UnitPrice]
)

-- Count of high-value orders
High Value Orders =
COUNTX(
    FILTER( 'Sales', 'Sales'[Amount] > 1000 ),
    'Sales'[OrderID]
)

-- Most expensive product sold
Max Product Price =
MAXX( 'Sales', RELATED( 'Product'[UnitPrice] ) )`}
                      />
                    </CardContent>
                  </Card>

                  {/* Step 4: Time Intelligence */}
                  <Card className="mb-6 border-blue-500/20 hover:border-blue-500/40">
                    <CardHeader>
                      <CardTitle className="text-blue-500">4. Time Intelligence Measures</CardTitle>
                      <CardDescription>Year-to-date, year-over-year, rolling averages, and more</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Requires a proper <strong>Date table</strong> marked as a Date table in the model with a continuous date column.
                      </p>
                      <CodeBlock
                        title="Time Intelligence Measures"
                        language="dax"
                        code={`-- Year-to-Date
Sales YTD =
TOTALYTD( [Total Sales], 'Date'[Date] )

-- Same Period Last Year
Sales PY =
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR( 'Date'[Date] )
)

-- Year-over-Year Growth %
YoY Growth % =
VAR CurrentYear = [Total Sales]
VAR PriorYear = [Sales PY]
RETURN
    DIVIDE( CurrentYear - PriorYear, PriorYear )

-- Month-to-Date
Sales MTD =
TOTALMTD( [Total Sales], 'Date'[Date] )

-- Rolling 3-Month Average
Rolling 3M Avg =
CALCULATE(
    [Total Sales] / 3,
    DATESINPERIOD(
        'Date'[Date],
        MAX( 'Date'[Date] ),
        -3, MONTH
    )
)

-- Running Total (Cumulative)
Cumulative Sales =
CALCULATE(
    [Total Sales],
    FILTER(
        ALL( 'Date'[Date] ),
        'Date'[Date] <= MAX( 'Date'[Date] )
    )
)`}
                      />
                    </CardContent>
                  </Card>

                  {/* Step 5: Advanced Techniques */}
                  <Card className="mb-6 border-blue-500/20 hover:border-blue-500/40">
                    <CardHeader>
                      <CardTitle className="text-blue-500">5. Advanced Measure Techniques</CardTitle>
                      <CardDescription>Variables, SWITCH, ranking, dynamic formatting, and KPIs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CodeBlock
                        title="Advanced Measures"
                        language="dax"
                        code={`-- Using Variables (VAR/RETURN) for readability & performance
Profit Margin % =
VAR TotalRevenue = [Total Sales]
VAR TotalCost = SUM( 'Sales'[Cost] )
VAR Profit = TotalRevenue - TotalCost
RETURN
    DIVIDE( Profit, TotalRevenue )

-- Dynamic SWITCH for conditional KPI
Performance Status =
SWITCH(
    TRUE(),
    [YoY Growth %] >= 0.15, "★ Excellent",
    [YoY Growth %] >= 0.05, "● Good",
    [YoY Growth %] >= 0,    "▲ Stable",
    "▼ Declining"
)

-- Ranking measure
Product Rank =
RANKX(
    ALL( 'Product'[ProductName] ),
    [Total Sales],
    ,
    DESC,
    Dense
)

-- Top N Sales
Top 5 Product Sales =
CALCULATE(
    [Total Sales],
    TOPN( 5, VALUES( 'Product'[ProductName] ), [Total Sales], DESC )
)

-- Dynamic measure with SELECTEDVALUE
Dynamic Metric =
VAR SelectedMetric = SELECTEDVALUE( 'Metric'[MetricName], "Sales" )
RETURN
    SWITCH(
        SelectedMetric,
        "Sales", [Total Sales],
        "Profit", [Total Profit],
        "Orders", [Total Transactions],
        [Total Sales]
    )

-- DIVIDE (safe division — always use this!)
Conversion Rate =
DIVIDE(
    [Completed Orders],
    [Total Orders],
    0  -- alternate result if denominator is 0
)`}
                      />
                    </CardContent>
                  </Card>
                </div>
              </AnimateOnScroll>
            </section>

            {/* ============================================================ */}
            {/* HOW TO CREATE NEW COLUMNS                                     */}
            {/* ============================================================ */}
            <section id="create-columns" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <div className="mb-16">
                  <h2 className="mb-2 text-3xl font-bold">
                    <Columns3 className="mr-2 inline h-7 w-7 text-emerald-500" />
                    How to Create New Columns
                  </h2>
                  <p className="mb-8 max-w-3xl text-muted-foreground">
                    Step-by-step guide to creating calculated columns in Power BI — classification, lookups, composite keys, and conditional logic.
                  </p>

                  {/* Step 1: Basic Calculated Columns */}
                  <Card className="mb-6 border-emerald-500/20 hover:border-emerald-500/40">
                    <CardHeader>
                      <CardTitle className="text-emerald-500">1. Basic Calculated Columns</CardTitle>
                      <CardDescription>Row-level computations and concatenation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">How to create:</strong> Select a table in the Fields pane → go to <em>Modeling</em> tab → click <strong>New Column</strong>, or right-click the table → <strong>New Column</strong>. Then type your DAX formula.
                      </p>
                      <CodeBlock
                        title="Basic Calculated Columns"
                        language="dax"
                        code={`-- Line total (Quantity × Price)
Line Total =
'Sales'[Quantity] * 'Sales'[UnitPrice]

-- Profit per row
Profit =
'Sales'[Revenue] - 'Sales'[Cost]

-- Full name concatenation
Full Name =
'Customer'[FirstName] & " " & 'Customer'[LastName]

-- Year from date
Order Year =
YEAR( 'Sales'[OrderDate] )

-- Month-Year label
Month Year =
FORMAT( 'Sales'[OrderDate], "MMM YYYY" )`}
                      />
                    </CardContent>
                  </Card>

                  {/* Step 2: RELATED Columns */}
                  <Card className="mb-6 border-emerald-500/20 hover:border-emerald-500/40">
                    <CardHeader>
                      <CardTitle className="text-emerald-500">2. Lookup Values with RELATED()</CardTitle>
                      <CardDescription>Pull data from related dimension tables into fact tables</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        <code>RELATED()</code> follows a many-to-one relationship to bring dimension values into the current table. This is one of the most common uses for calculated columns.
                      </p>
                      <CodeBlock
                        title="RELATED Columns"
                        language="dax"
                        code={`-- On the Sales table — pull Product category
Product Category =
RELATED( 'Product'[Category] )

-- Pull customer segment
Customer Segment =
RELATED( 'Customer'[Segment] )

-- Pull store region
Store Region =
RELATED( 'Store'[Region] )

-- Calculate using related values
Extended Price =
'Sales'[Quantity] * RELATED( 'Product'[UnitPrice] )`}
                      />
                    </CardContent>
                  </Card>

                  {/* Step 3: Classification Columns */}
                  <Card className="mb-6 border-emerald-500/20 hover:border-emerald-500/40">
                    <CardHeader>
                      <CardTitle className="text-emerald-500">3. Classification & Bucketing Columns</CardTitle>
                      <CardDescription>IF, SWITCH, and conditional logic for grouping rows</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Use classification columns when you need to <strong>group, filter, or slice</strong> your data by computed categories.
                      </p>
                      <CodeBlock
                        title="Classification Columns"
                        language="dax"
                        code={`-- Sales tier classification
Sales Tier =
SWITCH(
    TRUE(),
    'Sales'[Amount] >= 1000, "High",
    'Sales'[Amount] >= 500,  "Medium",
    "Low"
)

-- Age group bucketing
Age Group =
SWITCH(
    TRUE(),
    'Customer'[Age] < 25,  "18-24",
    'Customer'[Age] < 35,  "25-34",
    'Customer'[Age] < 45,  "35-44",
    'Customer'[Age] < 55,  "45-54",
    "55+"
)

-- Binary flag
Is High Value =
IF( 'Sales'[Amount] >= 1000, "Yes", "No" )

-- Weekend flag
Is Weekend =
IF(
    WEEKDAY( 'Sales'[OrderDate], 2 ) >= 6,
    "Weekend",
    "Weekday"
)`}
                      />
                    </CardContent>
                  </Card>

                  {/* Step 4: Composite Keys & Sorting Columns */}
                  <Card className="mb-6 border-emerald-500/20 hover:border-emerald-500/40">
                    <CardHeader>
                      <CardTitle className="text-emerald-500">4. Composite Keys & Sorting Columns</CardTitle>
                      <CardDescription>Build relationship keys and custom sort orders</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CodeBlock
                        title="Composite Keys & Sort Columns"
                        language="dax"
                        code={`-- Composite key for relationships
Composite Key =
'Sales'[StoreID] & "-" & 'Sales'[ProductID]

-- Better: Use COMBINEVALUES for DirectQuery
Composite Key DQ =
COMBINEVALUES( "-", 'Sales'[StoreID], 'Sales'[ProductID] )

-- Month sort column (numeric for proper sorting)
Month Sort =
MONTH( 'Date'[Date] )

-- Custom sort order
Day Sort =
WEEKDAY( 'Date'[Date], 2 )

-- Year-Month sort key
Year Month Sort =
YEAR( 'Date'[Date] ) * 100 + MONTH( 'Date'[Date] )`}
                      />
                    </CardContent>
                  </Card>
                </div>
              </AnimateOnScroll>

            </section>

            {/* ============================================================ */}
            {/* ALL DAX FUNCTIONS & TECHNIQUES REFERENCE                      */}
            {/* ============================================================ */}
            <section id="functions-ref" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <div className="mb-16">
                  <h2 className="mb-2 text-3xl font-bold">
                    <Zap className="mr-2 inline h-7 w-7 text-yellow-700 dark:text-primary" />
                    Complete Functions &amp; Techniques Reference
                  </h2>
                  <p className="mb-8 max-w-3xl text-muted-foreground">
                    All essential DAX functions organized by category — aggregation, filter, time intelligence, text, logical, table, and math.
                  </p>

                  {/* Aggregation Functions */}
                  <Card className="mb-6">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                          <Calculator className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <CardTitle>Aggregation Functions</CardTitle>
                          <CardDescription>Sum, count, average, min, max — and their iterator variants</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto rounded-lg border border-border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/50">
                              <th className="px-4 py-2.5 text-left font-semibold">Function</th>
                              <th className="px-4 py-2.5 text-left font-semibold">Description</th>
                              <th className="px-4 py-2.5 text-left font-semibold">Iterator Variant</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { fn: "SUM( column )", desc: "Sum of all values in a column", iter: "SUMX( table, expr )" },
                              { fn: "AVERAGE( column )", desc: "Arithmetic mean of values", iter: "AVERAGEX( table, expr )" },
                              { fn: "COUNT( column )", desc: "Count of numeric values", iter: "COUNTX( table, expr )" },
                              { fn: "COUNTROWS( table )", desc: "Count of rows in a table", iter: "—" },
                              { fn: "DISTINCTCOUNT( column )", desc: "Count of unique values", iter: "DISTINCTCOUNTX (via COUNTX)" },
                              { fn: "MIN( column )", desc: "Minimum value", iter: "MINX( table, expr )" },
                              { fn: "MAX( column )", desc: "Maximum value", iter: "MAXX( table, expr )" },
                              { fn: "COUNTA( column )", desc: "Count of non-blank values", iter: "COUNTAX( table, expr )" },
                              { fn: "COUNTBLANK( column )", desc: "Count of blank values", iter: "—" },
                              { fn: "PRODUCT( column )", desc: "Product of all values", iter: "PRODUCTX( table, expr )" },
                            ].map((row, i) => (
                              <tr key={row.fn} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                                <td className="px-4 py-2 font-mono text-xs text-blue-500">{row.fn}</td>
                                <td className="px-4 py-2 text-muted-foreground">{row.desc}</td>
                                <td className="px-4 py-2 font-mono text-xs text-purple-500">{row.iter}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Filter Functions */}
                  <Card className="mb-6">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                          <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <CardTitle>Filter &amp; Context Functions</CardTitle>
                          <CardDescription>Manipulate the filter context — the heart of DAX</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto rounded-lg border border-border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/50">
                              <th className="px-4 py-2.5 text-left font-semibold">Function</th>
                              <th className="px-4 py-2.5 text-left font-semibold">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { fn: "CALCULATE( expr, filter1, ... )", desc: "Evaluate expression in a modified filter context" },
                              { fn: "CALCULATETABLE( table, filter1, ... )", desc: "Returns a table evaluated in modified filter context" },
                              { fn: "FILTER( table, condition )", desc: "Returns a filtered subset of a table (iterator)" },
                              { fn: "ALL( table_or_column )", desc: "Removes all filters — returns all rows" },
                              { fn: "ALLEXCEPT( table, col1, col2 )", desc: "Removes all filters EXCEPT specified columns" },
                              { fn: "ALLSELECTED( table_or_column )", desc: "Keeps slicer selections, removes visual filters" },
                              { fn: "REMOVEFILTERS( table_or_column )", desc: "Alias for ALL inside CALCULATE" },
                              { fn: "KEEPFILTERS( expr )", desc: "Intersects rather than replaces existing filters" },
                              { fn: "VALUES( column )", desc: "One-column table of unique values (respects filters)" },
                              { fn: "SELECTEDVALUE( col, alt )", desc: "Single selected value or alternate if multiple" },
                              { fn: "HASONEVALUE( column )", desc: "TRUE if exactly one distinct value in filter context" },
                              { fn: "ISFILTERED( column )", desc: "TRUE if column is directly filtered" },
                              { fn: "ISCROSSFILTERED( column )", desc: "TRUE if column is filtered via relationship" },
                              { fn: "USERELATIONSHIP( col1, col2 )", desc: "Activates an inactive relationship inside CALCULATE" },
                              { fn: "CROSSFILTER( col1, col2, dir )", desc: "Changes cross-filter direction inside CALCULATE" },
                              { fn: "TREATAS( expr, col1, col2 )", desc: "Virtual relationship — treats values as filter" },
                            ].map((row, i) => (
                              <tr key={row.fn} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                                <td className="px-4 py-2 font-mono text-xs text-yellow-600 dark:text-yellow-400">{row.fn}</td>
                                <td className="px-4 py-2 text-muted-foreground">{row.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Time Intelligence Functions */}
                  <Card className="mb-6">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                          <ArrowRight className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <CardTitle>Time Intelligence Functions</CardTitle>
                          <CardDescription>YTD, prior year, rolling periods, and date shifting</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto rounded-lg border border-border">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border bg-muted/50">
                              <th className="px-4 py-2.5 text-left font-semibold">Function</th>
                              <th className="px-4 py-2.5 text-left font-semibold">Purpose</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { fn: "TOTALYTD( expr, dates )", desc: "Year-to-date total" },
                              { fn: "TOTALMTD( expr, dates )", desc: "Month-to-date total" },
                              { fn: "TOTALQTD( expr, dates )", desc: "Quarter-to-date total" },
                              { fn: "SAMEPERIODLASTYEAR( dates )", desc: "Shifts dates back by one year" },
                              { fn: "DATEADD( dates, n, interval )", desc: "Shifts dates by N days/months/quarters/years" },
                              { fn: "DATESYTD( dates )", desc: "Returns YTD date range" },
                              { fn: "DATESMTD( dates )", desc: "Returns MTD date range" },
                              { fn: "DATESQTD( dates )", desc: "Returns QTD date range" },
                              { fn: "DATESBETWEEN( dates, start, end )", desc: "Returns dates between two date values" },
                              { fn: "DATESINPERIOD( dates, start, n, intv )", desc: "Returns dates for a rolling period" },
                              { fn: "PARALLELPERIOD( dates, n, intv )", desc: "Returns a complete parallel period" },
                              { fn: "PREVIOUSMONTH / PREVIOUSYEAR", desc: "Returns dates for the prior month/year" },
                              { fn: "NEXTMONTH / NEXTYEAR", desc: "Returns dates for the next month/year" },
                              { fn: "OPENINGBALANCEYEAR( expr, dates )", desc: "Value at the start of the year" },
                              { fn: "CLOSINGBALANCEYEAR( expr, dates )", desc: "Value at the end of the year" },
                            ].map((row, i) => (
                              <tr key={row.fn} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                                <td className="px-4 py-2 font-mono text-xs text-purple-500">{row.fn}</td>
                                <td className="px-4 py-2 text-muted-foreground">{row.desc}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Logical, Text, Table, Math Functions */}
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Logical */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Logical Functions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5 text-sm">
                          {[
                            { fn: "IF( cond, true, false )", desc: "Conditional branching" },
                            { fn: "SWITCH( expr, val, res, ... )", desc: "Multi-condition matching" },
                            { fn: "DIVIDE( num, denom, alt )", desc: "Safe division" },
                            { fn: "IFERROR( expr, alt )", desc: "Error handling" },
                            { fn: "AND( a, b ) / OR( a, b )", desc: "Logical operators" },
                            { fn: "NOT( condition )", desc: "Negation" },
                            { fn: "TRUE() / FALSE()", desc: "Boolean constants" },
                            { fn: "COALESCE( val1, val2, ... )", desc: "First non-blank value" },
                          ].map((item) => (
                            <li key={item.fn} className="flex items-start gap-2">
                              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              <span><code className="text-xs text-blue-500">{item.fn}</code> — {item.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Text */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Text Functions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5 text-sm">
                          {[
                            { fn: "CONCATENATEX( tbl, expr, delim )", desc: "Concatenate with delimiter" },
                            { fn: "FORMAT( value, format )", desc: "Value to formatted text" },
                            { fn: "COMBINEVALUES( delim, ... )", desc: "Composite key (DirectQuery)" },
                            { fn: "LEFT / RIGHT / MID", desc: "Extract substrings" },
                            { fn: "LEN( text )", desc: "Text length" },
                            { fn: "UPPER / LOWER / TRIM", desc: "Text transformation" },
                            { fn: "SUBSTITUTE( text, old, new )", desc: "Replace text" },
                            { fn: "SEARCH / FIND", desc: "Find position of text" },
                          ].map((item) => (
                            <li key={item.fn} className="flex items-start gap-2">
                              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              <span><code className="text-xs text-emerald-500">{item.fn}</code> — {item.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Table */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Table Functions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5 text-sm">
                          {[
                            { fn: "SUMMARIZECOLUMNS( ... )", desc: "Optimized GROUP BY" },
                            { fn: "ADDCOLUMNS( tbl, ... )", desc: "Add calculated columns to table" },
                            { fn: "SELECTCOLUMNS( tbl, ... )", desc: "Select specific columns" },
                            { fn: "TOPN( n, tbl, expr )", desc: "Top N rows by expression" },
                            { fn: "GENERATE( tbl1, tbl2 )", desc: "Cross join tables" },
                            { fn: "UNION / INTERSECT / EXCEPT", desc: "Set operations on tables" },
                            { fn: "DATATABLE( ... )", desc: "Create static table in DAX" },
                            { fn: "ROW( name, expr, ... )", desc: "Single-row table" },
                          ].map((item) => (
                            <li key={item.fn} className="flex items-start gap-2">
                              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              <span><code className="text-xs text-purple-500">{item.fn}</code> — {item.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Math & Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Math &amp; Statistical Functions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5 text-sm">
                          {[
                            { fn: "RANKX( tbl, expr, ... )", desc: "Rank values in context" },
                            { fn: "ROUND / ROUNDUP / ROUNDDOWN", desc: "Numerical rounding" },
                            { fn: "ABS( number )", desc: "Absolute value" },
                            { fn: "MOD( number, divisor )", desc: "Modulo / remainder" },
                            { fn: "INT( number )", desc: "Integer truncation" },
                            { fn: "SQRT( number )", desc: "Square root" },
                            { fn: "POWER( base, exp )", desc: "Exponentiation" },
                            { fn: "PERCENTILE.INC( col, k )", desc: "Percentile calculation" },
                            { fn: "MEDIAN( column )", desc: "Median value" },
                            { fn: "STDEV.P / STDEV.S", desc: "Standard deviation" },
                          ].map((item) => (
                            <li key={item.fn} className="flex items-start gap-2">
                              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              <span><code className="text-xs text-yellow-600 dark:text-yellow-400">{item.fn}</code> — {item.desc}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AnimateOnScroll>
            </section>

            {/* Related Content */}
            <AnimateOnScroll variant="fade-up">
              <div className="mt-12">
                <h3 className="mb-4 text-lg font-semibold text-foreground">Related Content</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { href: "/dax-guide", icon: Calculator, title: "DAX Functions Guide", description: "Explore the full DAX function library to write better measures and columns." },
                    { href: "/data-modeling", icon: Database, title: "Data Modeling", description: "Design star schemas and relationships that support your calculations." },
                    { href: "/data-visualization", icon: BarChart3, title: "Data Visualization", description: "See how measures and columns drive your Power BI visuals and reports." },
                    { href: "/sql-reference", icon: Table2, title: "SQL Reference", description: "Transition from SQL to DAX with side-by-side query patterns." },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href} className="group block">
                        <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/30 hover:bg-accent/50 hover:shadow-md">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">{item.title}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                          </div>
                          <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </AnimateOnScroll>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}
