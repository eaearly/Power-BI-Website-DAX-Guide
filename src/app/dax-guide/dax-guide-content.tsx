"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Calendar,
  Filter,
  Hash,
  Layers,
  ListTree,
  Search,
  Table2,
  Type,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DAX Function Data                                                  */
/* ------------------------------------------------------------------ */

interface DAXFunction {
  name: string;
  syntax: string;
  description: string;
  example: string;
  category: string;
  tip?: string;
}

const categories = [
  { id: "all", label: "All Functions", icon: Layers },
  { id: "aggregation", label: "Aggregation", icon: Calculator },
  { id: "filter", label: "Filter", icon: Filter },
  { id: "time-intelligence", label: "Time Intelligence", icon: Calendar },
  { id: "text", label: "Text", icon: Type },
  { id: "logical", label: "Logical", icon: ListTree },
  { id: "table", label: "Table", icon: Table2 },
  { id: "math", label: "Math & Stats", icon: Hash },
  { id: "information", label: "Information", icon: Search },
];

const daxFunctions: DAXFunction[] = [
  // --- Aggregation ---
  {
    name: "SUM",
    syntax: "SUM( <column> )",
    description:
      "Returns the sum of all values in a column. Only works with numeric columns.",
    example: `Total Sales = SUM( 'Sales'[Amount] )`,
    category: "aggregation",
    tip: "SUM only accepts a column reference. For row-by-row calculations, use SUMX.",
  },
  {
    name: "SUMX",
    syntax: "SUMX( <table>, <expression> )",
    description:
      "Iterates over a table, evaluates an expression for each row, and returns the sum. This is an iterator function that respects row context.",
    example: `Total Revenue =
SUMX(
    'Sales',
    'Sales'[Quantity] * RELATED( 'Product'[Unit Price] )
)`,
    category: "aggregation",
    tip: "SUMX creates a row context. Use RELATED() to pull columns from related tables.",
  },
  {
    name: "AVERAGE",
    syntax: "AVERAGE( <column> )",
    description: "Returns the arithmetic mean of all numbers in a column. Ignores blanks.",
    example: `Avg Order Value = AVERAGE( 'Sales'[Amount] )`,
    category: "aggregation",
  },
  {
    name: "AVERAGEX",
    syntax: "AVERAGEX( <table>, <expression> )",
    description: "Iterator version of AVERAGE. Evaluates an expression for each row and returns the mean.",
    example: `Avg Line Total =
AVERAGEX(
    'Sales',
    'Sales'[Quantity] * 'Sales'[Unit Price]
)`,
    category: "aggregation",
  },
  {
    name: "COUNT",
    syntax: "COUNT( <column> )",
    description: "Counts the number of rows that contain a number in a column.",
    example: `Order Count = COUNT( 'Sales'[OrderID] )`,
    category: "aggregation",
  },
  {
    name: "COUNTROWS",
    syntax: "COUNTROWS( <table> )",
    description: "Counts the number of rows in a table or table expression.",
    example: `Total Transactions = COUNTROWS( 'Sales' )`,
    category: "aggregation",
    tip: "COUNTROWS is often more efficient than COUNTA for counting table rows.",
  },
  {
    name: "DISTINCTCOUNT",
    syntax: "DISTINCTCOUNT( <column> )",
    description: "Counts the number of distinct values in a column. Includes BLANK as a value.",
    example: `Unique Customers = DISTINCTCOUNT( 'Sales'[CustomerID] )`,
    category: "aggregation",
  },
  {
    name: "MIN / MAX",
    syntax: "MIN( <column> ) / MAX( <column> )",
    description: "Returns the minimum or maximum value in a column.",
    example: `Earliest Order = MIN( 'Sales'[OrderDate] )
Latest Order  = MAX( 'Sales'[OrderDate] )`,
    category: "aggregation",
  },

  // --- Filter Functions ---
  {
    name: "CALCULATE",
    syntax: "CALCULATE( <expression>, <filter1>, <filter2>, ... )",
    description:
      "The most powerful DAX function. Evaluates an expression in a modified filter context. Each filter argument overrides or adds to the current filter context.",
    example: `Sales Last Year =
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR( 'Date'[Date] )
)

-- With multiple filters
Premium Sales =
CALCULATE(
    [Total Sales],
    'Product'[Category] = "Premium",
    'Date'[Year] = 2024
)`,
    category: "filter",
    tip: "CALCULATE converts row context to filter context (context transition). This is crucial for measures inside iterators.",
  },
  {
    name: "FILTER",
    syntax: "FILTER( <table>, <expression> )",
    description:
      "Returns a table that is a subset of another table or expression. Iterates row by row and evaluates the condition.",
    example: `High Value Sales =
CALCULATE(
    [Total Sales],
    FILTER(
        'Sales',
        'Sales'[Amount] > 1000
    )
)`,
    category: "filter",
    tip: "Avoid FILTER on large tables when a direct column filter in CALCULATE suffices. FILTER is an iterator and can be slow.",
  },
  {
    name: "ALL",
    syntax: "ALL( <table_or_column> )",
    description:
      "Removes all filters from a table or column. Returns all rows ignoring any applied filters.",
    example: `-- Percentage of Total
Sales % =
DIVIDE(
    [Total Sales],
    CALCULATE( [Total Sales], ALL( 'Sales' ) )
)`,
    category: "filter",
    tip: "ALL is a CALCULATE modifier. It removes existing filters, enabling total calculations.",
  },
  {
    name: "ALLEXCEPT",
    syntax: "ALLEXCEPT( <table>, <column1>, <column2>, ... )",
    description:
      "Removes all filters from a table EXCEPT the specified columns. Useful for keeping certain slicers active.",
    example: `Category Sales % =
DIVIDE(
    [Total Sales],
    CALCULATE(
        [Total Sales],
        ALLEXCEPT( 'Product', 'Product'[Category] )
    )
)`,
    category: "filter",
  },
  {
    name: "ALLSELECTED",
    syntax: "ALLSELECTED( <table_or_column> )",
    description:
      "Removes filters applied inside the current visual but keeps external slicer selections.",
    example: `Visual % =
DIVIDE(
    [Total Sales],
    CALCULATE( [Total Sales], ALLSELECTED( 'Product' ) )
)`,
    category: "filter",
    tip: "ALLSELECTED respects slicer selections while removing visual-level filters. Great for % of visible total.",
  },
  {
    name: "KEEPFILTERS",
    syntax: "KEEPFILTERS( <expression> )",
    description:
      "Modifies CALCULATE behavior so that filter arguments are intersected with (not replacing) existing filters.",
    example: `Red Sales =
CALCULATE(
    [Total Sales],
    KEEPFILTERS( 'Product'[Color] = "Red" )
)`,
    category: "filter",
  },
  {
    name: "REMOVEFILTERS",
    syntax: "REMOVEFILTERS( <table_or_column> )",
    description: "Alias for ALL when used as a CALCULATE modifier. Clears filters from specified columns or tables.",
    example: `Unfiltered Sales =
CALCULATE(
    [Total Sales],
    REMOVEFILTERS( 'Date' )
)`,
    category: "filter",
  },
  {
    name: "VALUES",
    syntax: "VALUES( <column_or_table> )",
    description:
      "Returns a single-column table of unique values from a column, respecting filters. Includes BLANK if present.",
    example: `Selected Category =
IF(
    HASONEVALUE( 'Product'[Category] ),
    VALUES( 'Product'[Category] ),
    "Multiple"
)`,
    category: "filter",
  },
  {
    name: "SELECTEDVALUE",
    syntax: "SELECTEDVALUE( <column>, <alternateResult> )",
    description: "Returns the value of a column when the filter context has exactly one distinct value. Otherwise returns the alternate result.",
    example: `Current Year =
SELECTEDVALUE( 'Date'[Year], "All Years" )`,
    category: "filter",
  },

  // --- Time Intelligence ---
  {
    name: "TOTALYTD",
    syntax: "TOTALYTD( <expression>, <dates>, [<filter>], [<year_end_date>] )",
    description: "Evaluates a year-to-date total for the given expression over a date column.",
    example: `Sales YTD =
TOTALYTD(
    [Total Sales],
    'Date'[Date]
)`,
    category: "time-intelligence",
    tip: "Requires a proper Date table marked as a Date table in the model with a continuous date column.",
  },
  {
    name: "SAMEPERIODLASTYEAR",
    syntax: "SAMEPERIODLASTYEAR( <dates> )",
    description: "Returns a set of dates shifted back one year from the dates in the specified column.",
    example: `Sales PY =
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR( 'Date'[Date] )
)

YoY Growth =
VAR CurrentSales = [Total Sales]
VAR PriorSales = [Sales PY]
RETURN
    DIVIDE( CurrentSales - PriorSales, PriorSales )`,
    category: "time-intelligence",
  },
  {
    name: "DATEADD",
    syntax: "DATEADD( <dates>, <number_of_intervals>, <interval> )",
    description: "Shifts a set of dates by the given interval (DAY, MONTH, QUARTER, YEAR).",
    example: `Sales 3 Months Ago =
CALCULATE(
    [Total Sales],
    DATEADD( 'Date'[Date], -3, MONTH )
)`,
    category: "time-intelligence",
  },
  {
    name: "DATESYTD",
    syntax: "DATESYTD( <dates>, [<year_end_date>] )",
    description: "Returns a table of dates for the year-to-date in the current filter context.",
    example: `Cumulative Sales =
CALCULATE(
    [Total Sales],
    DATESYTD( 'Date'[Date] )
)`,
    category: "time-intelligence",
  },
  {
    name: "DATESBETWEEN",
    syntax: "DATESBETWEEN( <dates>, <start_date>, <end_date> )",
    description: "Returns dates between two date values.",
    example: `Q1 Sales =
CALCULATE(
    [Total Sales],
    DATESBETWEEN(
        'Date'[Date],
        DATE( 2024, 1, 1 ),
        DATE( 2024, 3, 31 )
    )
)`,
    category: "time-intelligence",
  },
  {
    name: "PARALLELPERIOD",
    syntax: "PARALLELPERIOD( <dates>, <number_of_intervals>, <interval> )",
    description: "Returns a complete parallel period shifted by the specified number of intervals.",
    example: `Sales Same Quarter LY =
CALCULATE(
    [Total Sales],
    PARALLELPERIOD( 'Date'[Date], -4, QUARTER )
)`,
    category: "time-intelligence",
  },

  // --- Text Functions ---
  {
    name: "CONCATENATEX",
    syntax: 'CONCATENATEX( <table>, <expression>, [<delimiter>], [<orderBy>], [<order>] )',
    description: "Concatenates the result of an expression evaluated for each row, with optional delimiter.",
    example: `Product List =
CONCATENATEX(
    VALUES( 'Product'[Name] ),
    'Product'[Name],
    ", ",
    'Product'[Name], ASC
)`,
    category: "text",
  },
  {
    name: "FORMAT",
    syntax: "FORMAT( <value>, <format_string> )",
    description: "Converts a value to text using the specified format string.",
    example: `Formatted Sales =
FORMAT( [Total Sales], "$#,##0.00" )

Formatted Date =
FORMAT( TODAY(), "MMMM DD, YYYY" )`,
    category: "text",
    tip: "FORMAT returns text. Avoid using it in calculations — it prevents numeric operations.",
  },
  {
    name: "COMBINEVALUES",
    syntax: "COMBINEVALUES( <delimiter>, <expression1>, <expression2>, ... )",
    description: "Joins values into a single text string with a delimiter. Optimized for composite keys in DirectQuery.",
    example: `Composite Key =
COMBINEVALUES(
    "-",
    'Sales'[StoreID],
    'Sales'[ProductID]
)`,
    category: "text",
    tip: "COMBINEVALUES enables query folding for composite key relationships in DirectQuery mode.",
  },

  // --- Logical Functions ---
  {
    name: "IF",
    syntax: "IF( <condition>, <value_if_true>, [<value_if_false>] )",
    description: "Evaluates a condition and returns one value if TRUE, another if FALSE.",
    example: `Sales Status =
IF(
    [Total Sales] > 100000,
    "Above Target",
    "Below Target"
)`,
    category: "logical",
  },
  {
    name: "SWITCH",
    syntax: "SWITCH( <expression>, <value1>, <result1>, ..., [<else>] )",
    description: "Evaluates an expression against a list of values and returns the matching result. More readable than nested IFs.",
    example: `Rating =
SWITCH(
    TRUE(),
    [Margin %] >= 0.3, "Excellent",
    [Margin %] >= 0.2, "Good",
    [Margin %] >= 0.1, "Fair",
    "Poor"
)`,
    category: "logical",
    tip: "SWITCH(TRUE(), ...) is the idiomatic DAX pattern for multi-condition branching.",
  },
  {
    name: "DIVIDE",
    syntax: "DIVIDE( <numerator>, <denominator>, [<alternateResult>] )",
    description: "Safe division that handles divide-by-zero. Returns BLANK or the alternate result instead of an error.",
    example: `Margin % =
DIVIDE(
    [Profit],
    [Total Sales],
    0
)`,
    category: "logical",
    tip: "Always prefer DIVIDE over the / operator to avoid divide-by-zero errors.",
  },
  {
    name: "IFERROR",
    syntax: "IFERROR( <expression>, <value_if_error> )",
    description: "Returns the expression result unless it is an error. In that case, returns the alternate value.",
    example: `Safe Calc =
IFERROR( [Complex Measure], BLANK() )`,
    category: "logical",
  },

  // --- Table Functions ---
  {
    name: "SUMMARIZECOLUMNS",
    syntax: "SUMMARIZECOLUMNS( <groupBy_column1>, ..., [<filterTable>], [<name>, <expression>], ... )",
    description:
      "The most efficient grouping function in DAX. Groups by specified columns and adds calculated columns. Automatically removes blank rows.",
    example: `EVALUATE
SUMMARIZECOLUMNS(
    'Product'[Category],
    'Date'[Year],
    "Total Sales", [Total Sales],
    "Avg Price", [Avg Unit Price]
)`,
    category: "table",
    tip: "SUMMARIZECOLUMNS is optimized by the engine and is the preferred function for generating grouped results.",
  },
  {
    name: "ADDCOLUMNS",
    syntax: "ADDCOLUMNS( <table>, <name>, <expression>, ... )",
    description: "Returns a table with new calculated columns added.",
    example: `ADDCOLUMNS(
    VALUES( 'Product'[Category] ),
    "Category Sales", [Total Sales],
    "Category Margin", [Margin %]
)`,
    category: "table",
  },
  {
    name: "SELECTCOLUMNS",
    syntax: "SELECTCOLUMNS( <table>, <name>, <expression>, ... )",
    description: "Returns a table with only the specified columns (like SQL SELECT).",
    example: `SELECTCOLUMNS(
    'Customer',
    "Full Name", 'Customer'[FirstName] & " " & 'Customer'[LastName],
    "City", 'Customer'[City]
)`,
    category: "table",
  },
  {
    name: "TOPN",
    syntax: "TOPN( <n_value>, <table>, <orderBy_expression>, [<order>] )",
    description: "Returns the top N rows of a table sorted by the specified expression.",
    example: `Top 10 Products =
CALCULATE(
    [Total Sales],
    TOPN( 10, VALUES( 'Product'[Name] ), [Total Sales], DESC )
)`,
    category: "table",
  },
  {
    name: "GENERATE",
    syntax: "GENERATE( <table1>, <table2> )",
    description: "Cross joins two tables. For each row in table1, evaluates table2 and returns the combined result.",
    example: `GENERATE(
    VALUES( 'Date'[Year] ),
    TOPN( 3, VALUES( 'Product'[Name] ), [Total Sales], DESC )
)`,
    category: "table",
  },
  {
    name: "TREATAS",
    syntax: "TREATAS( <expression>, <column1>, <column2>, ... )",
    description: "Applies a virtual relationship by treating values as if they exist in target columns. No physical relationship needed.",
    example: `Budget vs Actual =
CALCULATE(
    [Total Budget],
    TREATAS(
        VALUES( 'Sales'[ProductID] ),
        'Budget'[ProductID]
    )
)`,
    category: "table",
    tip: "TREATAS is essential for virtual relationships and many-to-many patterns without bridge tables.",
  },

  // --- Math Functions ---
  {
    name: "RANKX",
    syntax: "RANKX( <table>, <expression>, [<value>], [<order>], [<ties>] )",
    description: "Returns the rank of the current context value within the specified table.",
    example: `Product Rank =
RANKX(
    ALL( 'Product'[Name] ),
    [Total Sales],
    ,
    DESC,
    Dense
)`,
    category: "math",
    tip: "Use ALL() in the first argument to rank across all products regardless of current filters.",
  },
  {
    name: "ROUND / ROUNDUP / ROUNDDOWN",
    syntax: "ROUND( <number>, <num_digits> )",
    description: "Rounds a number to the specified number of digits.",
    example: `Rounded Sales = ROUND( [Total Sales], 2 )
Ceiling Sales = ROUNDUP( [Total Sales], 0 )`,
    category: "math",
  },
  {
    name: "ABS",
    syntax: "ABS( <number> )",
    description: "Returns the absolute (positive) value of a number.",
    example: `Variance = ABS( [Actual] - [Budget] )`,
    category: "math",
  },

  // --- Information Functions ---
  {
    name: "ISBLANK",
    syntax: "ISBLANK( <value> )",
    description: "Returns TRUE if the value is BLANK.",
    example: `Has Sales =
IF( ISBLANK( [Total Sales] ), "No Sales", "Has Sales" )`,
    category: "information",
  },
  {
    name: "HASONEVALUE",
    syntax: "HASONEVALUE( <column> )",
    description: "Returns TRUE if the current filter context has exactly one distinct value for the column.",
    example: `Dynamic Title =
IF(
    HASONEVALUE( 'Product'[Category] ),
    "Sales for " & VALUES( 'Product'[Category] ),
    "Sales for All Categories"
)`,
    category: "information",
  },
  {
    name: "ISFILTERED",
    syntax: "ISFILTERED( <column> )",
    description: "Returns TRUE if a column is being directly filtered.",
    example: `Filter Status =
IF( ISFILTERED( 'Product'[Category] ), "Filtered", "Not Filtered" )`,
    category: "information",
  },
  {
    name: "RELATED",
    syntax: "RELATED( <column> )",
    description: "Follows a many-to-one relationship to return a value from the related table. Requires row context.",
    example: `-- In a calculated column on Sales table:
Product Category =
RELATED( 'Product'[Category] )

-- In a measure using SUMX:
Weighted Sales =
SUMX(
    'Sales',
    'Sales'[Quantity] * RELATED( 'Product'[Unit Price] )
)`,
    category: "information",
    tip: "RELATED only works in row context (calculated columns or inside iterators like SUMX).",
  },
  {
    name: "RELATEDTABLE",
    syntax: "RELATEDTABLE( <table> )",
    description: "Returns all rows from the related table (one-to-many side). Requires row context on the 'one' side.",
    example: `-- Calculated column on Product table:
Order Count =
COUNTROWS( RELATEDTABLE( 'Sales' ) )`,
    category: "information",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DAXGuideContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = daxFunctions.filter((fn) => {
    const matchesCategory = activeCategory === "all" || fn.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      fn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fn.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <AnimateOnScroll variant="fade-up" duration={600}>
      <div className="mb-10">
        <Badge variant="dax" className="mb-3">
          <Zap className="mr-1 h-3 w-3" />
          DAX Reference
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">DAX Syntax Guide</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Complete reference for Data Analysis Expressions (DAX) in Power BI. Browse by category,
          search functions, and copy ready-to-use examples with syntax highlighting.
        </p>
      </div>
      </AnimateOnScroll>

      {/* Quick Introduction */}
      <AnimateOnScroll variant="fade-up" delay={50}>
      <Card className="mb-10 border-blue-500/20 bg-blue-500/5">
        <CardContent className="py-6">
          <h3 className="mb-2 text-lg font-semibold">What is DAX?</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">DAX (Data Analysis Expressions)</strong> is the formula language used in Power BI, Analysis Services, and Power Pivot.
            It lets you create custom calculations for computed columns, measures, and calculated tables. If you&apos;ve used Excel formulas before,
            DAX will feel familiar — but it&apos;s much more powerful because it works with entire tables and understands filter context.
            Think of DAX as the language that turns raw data into meaningful business insights inside your Power BI reports.
          </p>
        </CardContent>
      </Card>
      </AnimateOnScroll>

      {/* Performance Tips Card */}
      <AnimateOnScroll variant="fade-up" delay={100}>
      <Card className="mb-10 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700 dark:text-primary">
            <Zap className="h-5 w-5" /> DAX Performance Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 text-sm sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Use <strong>variables (VAR / RETURN)</strong> to avoid repeating expensive calculations.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Prefer <strong>DIVIDE()</strong> over the <code>/</code> operator for safe division.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Avoid <strong>FILTER()</strong> on large tables when a simple column filter works.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Use <strong>SUMMARIZECOLUMNS</strong> instead of SUMMARIZE + ADDCOLUMNS.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Never use <strong>FORMAT()</strong> inside calculations — it returns text.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              Always create a dedicated <strong>Date table</strong> for time intelligence.
            </li>
          </ul>
        </CardContent>
      </Card>
      </AnimateOnScroll>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search DAX functions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="focus-ring w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-4 text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.id ? "default" : "outline"}
            size="sm"
            className="gap-1.5"
            onClick={() => setActiveCategory(cat.id)}
          >
            <cat.icon className="h-3.5 w-3.5" />
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        Showing <strong>{filtered.length}</strong> function{filtered.length !== 1 ? "s" : ""}
        {activeCategory !== "all" && (
          <> in <Badge variant="outline">{categories.find((c) => c.id === activeCategory)?.label}</Badge></>
        )}
      </p>

      {/* Function Cards */}
      <div className="space-y-6">
        {filtered.map((fn, i) => (
          <AnimateOnScroll key={fn.name} variant="fade-up" delay={Math.min(i * 60, 300)}>
          <Card id={fn.name.toLowerCase().replace(/\s/g, "-")} className="scroll-mt-20 transition-all duration-200 hover:border-primary/20 hover:shadow-md">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="font-mono text-lg">{fn.name}</CardTitle>
                <Badge variant={getCategoryBadge(fn.category)}>
                  {categories.find((c) => c.id === fn.category)?.label}
                </Badge>
              </div>
              <CardDescription className="mt-1">{fn.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Syntax */}
              <div>
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Syntax
                </h4>
                <code className="block rounded-md bg-muted px-3 py-2 font-mono text-sm">
                  {fn.syntax}
                </code>
              </div>

              {/* Example */}
              <div>
                <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Example
                </h4>
                <CodeBlock code={fn.example} language="dax" showLineNumbers={fn.example.split("\n").length > 1} />
              </div>

              {/* Tip */}
              {fn.tip && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                  <p className="text-sm">
                    <strong className="text-yellow-700 dark:text-primary">💡 Tip:</strong> {fn.tip}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          </AnimateOnScroll>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">No functions found matching your search.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

/* Helper */
function getCategoryBadge(category: string) {
  switch (category) {
    case "aggregation": return "measure" as const;
    case "filter": return "dax" as const;
    case "time-intelligence": return "secondary" as const;
    case "text": return "accent" as const;
    case "table": return "column" as const;
    default: return "outline" as const;
  }
}
