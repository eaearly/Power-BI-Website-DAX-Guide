"use client";

import { CodeBlock } from "@/components/ui/code-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import {
  BookOpen,
  Layers,
  Table2,
  GitBranch,
  BarChart3,
  Zap,
  Filter,
  ArrowUpDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  SQL Topics                                                         */
/* ------------------------------------------------------------------ */

interface SQLTopic {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  examples: { title: string; code: string; note?: string }[];
}

const sqlTopics: SQLTopic[] = [
  {
    id: "select",
    title: "SELECT Fundamentals",
    icon: Table2,
    description:
      "The foundation of every SQL query. SELECT retrieves columns from tables with optional filtering, sorting, and grouping.",
    examples: [
      {
        title: "Basic SELECT with filtering",
        code: `SELECT
    p.product_name,
    p.category,
    p.unit_price
FROM products p
WHERE p.category = 'Electronics'
    AND p.unit_price > 50.00
ORDER BY p.unit_price DESC;`,
        note: "SELECT picks which columns to show, FROM says which table, WHERE filters rows, and ORDER BY sorts the results.",
      },
      {
        title: "SELECT DISTINCT with aliases",
        code: `SELECT DISTINCT
    c.city,
    c.state,
    COUNT(*) AS customer_count
FROM customers c
GROUP BY c.city, c.state
HAVING COUNT(*) > 10
ORDER BY customer_count DESC;`,
        note: "DISTINCT removes duplicate rows. GROUP BY groups rows that share the same values, and HAVING filters groups after aggregation.",
      },
      {
        title: "CASE expression (like DAX SWITCH)",
        code: `SELECT
    order_id,
    total_amount,
    CASE
        WHEN total_amount >= 1000 THEN 'High'
        WHEN total_amount >= 500  THEN 'Medium'
        ELSE 'Low'
    END AS order_tier
FROM orders;`,
        note: "CASE is the SQL equivalent of DAX SWITCH(TRUE(), ...).",
      },
    ],
  },
  {
    id: "joins",
    title: "JOIN Operations",
    icon: GitBranch,
    description:
      "Combine data from multiple tables using various join types. Essential for building the SQL queries that Power BI DirectQuery generates.",
    examples: [
      {
        title: "INNER JOIN (matching rows only)",
        code: `-- Get sales with product details
SELECT
    s.order_id,
    s.quantity,
    p.product_name,
    p.category,
    s.quantity * p.unit_price AS line_total
FROM sales s
INNER JOIN products p ON s.product_id = p.product_id;`,
        note: "INNER JOIN = only rows that match in both tables. Equivalent to DAX RELATED() in row context.",
      },
      {
        title: "LEFT JOIN (keep all left rows)",
        code: `-- All customers, even those without orders
SELECT
    c.customer_name,
    c.email,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS lifetime_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_name, c.email;`,
        note: "LEFT JOIN keeps all rows from the left table. Use COALESCE for NULLs (like DAX IF(ISBLANK(...))).",
      },
      {
        title: "Multi-table star schema JOIN",
        code: `-- Classic star schema query
SELECT
    d.year,
    d.month_name,
    p.category,
    st.store_name,
    SUM(s.quantity) AS total_quantity,
    SUM(s.quantity * p.unit_price) AS total_revenue
FROM sales s
INNER JOIN dim_date d ON s.date_key = d.date_key
INNER JOIN products p ON s.product_id = p.product_id
INNER JOIN stores st ON s.store_id = st.store_id
WHERE d.year = 2024
GROUP BY d.year, d.month_name, p.category, st.store_name
ORDER BY d.year, d.month_name;`,
        note: "This is the type of query Power BI generates when using DirectQuery against a star schema.",
      },
    ],
  },
  {
    id: "aggregation",
    title: "Aggregation & GROUP BY",
    icon: BarChart3,
    description:
      "Aggregate functions summarize data across groups of rows. Equivalent to DAX measures with SUMMARIZECOLUMNS.",
    examples: [
      {
        title: "Common aggregation functions",
        code: `SELECT
    p.category,
    COUNT(*) AS transaction_count,
    COUNT(DISTINCT s.customer_id) AS unique_customers,
    SUM(s.amount) AS total_sales,
    AVG(s.amount) AS avg_sale,
    MIN(s.amount) AS min_sale,
    MAX(s.amount) AS max_sale,
    ROUND(SUM(s.amount) / NULLIF(COUNT(*), 0), 2) AS avg_per_txn
FROM sales s
INNER JOIN products p ON s.product_id = p.product_id
GROUP BY p.category
ORDER BY total_sales DESC;`,
        note: "Use NULLIF to prevent divide-by-zero — similar to DAX DIVIDE().",
      },
      {
        title: "HAVING clause (filter after aggregation)",
        code: `-- Customers with > $10k lifetime spend
SELECT
    c.customer_name,
    SUM(o.total_amount) AS lifetime_value,
    COUNT(o.order_id) AS order_count
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_name
HAVING SUM(o.total_amount) > 10000
ORDER BY lifetime_value DESC;`,
        note: "WHERE filters individual rows before grouping. HAVING filters groups after aggregation — use it when your condition involves SUM, COUNT, AVG, etc.",
      },
      {
        title: "GROUPING SETS / ROLLUP",
        code: `-- Multiple levels of aggregation in one query
SELECT
    COALESCE(p.category, 'All Categories') AS category,
    COALESCE(p.subcategory, 'All Subcategories') AS subcategory,
    SUM(s.amount) AS total_sales
FROM sales s
INNER JOIN products p ON s.product_id = p.product_id
GROUP BY ROLLUP (p.category, p.subcategory)
ORDER BY p.category NULLS FIRST, p.subcategory NULLS FIRST;`,
        note: "ROLLUP generates subtotals and grand totals — similar to how Power BI visuals show totals.",
      },
    ],
  },
  {
    id: "cte",
    title: "Common Table Expressions (CTEs)",
    icon: Layers,
    description:
      "CTEs make complex queries readable and maintainable. They act as temporary named result sets, similar to DAX variables (VAR/RETURN).",
    examples: [
      {
        title: "Basic CTE (like DAX VAR/RETURN)",
        code: `-- CTEs are the SQL equivalent of DAX variables
WITH monthly_sales AS (
    SELECT
        DATE_TRUNC('month', order_date) AS month,
        SUM(amount) AS total_sales
    FROM orders
    WHERE order_date >= '2024-01-01'
    GROUP BY DATE_TRUNC('month', order_date)
),
monthly_avg AS (
    SELECT AVG(total_sales) AS avg_monthly
    FROM monthly_sales
)
SELECT
    ms.month,
    ms.total_sales,
    ma.avg_monthly,
    ms.total_sales - ma.avg_monthly AS variance,
    ROUND(ms.total_sales / NULLIF(ma.avg_monthly, 0) * 100, 1) AS pct_of_avg
FROM monthly_sales ms
CROSS JOIN monthly_avg ma
ORDER BY ms.month;`,
        note: "Think of each CTE as a DAX VAR — define the value once, use it multiple times.",
      },
      {
        title: "Recursive CTE (hierarchies)",
        code: `-- Employee hierarchy (like DAX PATH functions)
WITH RECURSIVE org_chart AS (
    -- Anchor: top-level managers
    SELECT
        employee_id,
        employee_name,
        manager_id,
        1 AS level,
        employee_name::TEXT AS path
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: subordinates
    SELECT
        e.employee_id,
        e.employee_name,
        e.manager_id,
        oc.level + 1,
        oc.path || ' > ' || e.employee_name
    FROM employees e
    INNER JOIN org_chart oc ON e.manager_id = oc.employee_id
)
SELECT * FROM org_chart
ORDER BY path;`,
        note: "Recursive CTEs handle parent-child hierarchies — equivalent to DAX PATH() / PATHITEM().",
      },
    ],
  },
  {
    id: "window",
    title: "Window Functions",
    icon: ArrowUpDown,
    description:
      "Window functions perform calculations across related rows without collapsing them. Equivalent to DAX iterators like RANKX and running totals.",
    examples: [
      {
        title: "ROW_NUMBER, RANK, DENSE_RANK",
        code: `SELECT
    product_name,
    category,
    total_sales,
    ROW_NUMBER() OVER (ORDER BY total_sales DESC) AS row_num,
    RANK() OVER (ORDER BY total_sales DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY total_sales DESC) AS dense_rank,
    -- Rank within each category
    RANK() OVER (
        PARTITION BY category
        ORDER BY total_sales DESC
    ) AS category_rank
FROM product_sales;`,
        note: "ROW_NUMBER = unique sequential. RANK = ties get same rank, gap after. DENSE_RANK = no gaps. Like DAX RANKX().",
      },
      {
        title: "Running total and moving average",
        code: `SELECT
    order_date,
    daily_sales,
    -- Cumulative / running total (like DAX DATESYTD)
    SUM(daily_sales) OVER (
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total,
    -- 7-day moving average
    AVG(daily_sales) OVER (
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS moving_avg_7d,
    -- Previous day (like DAX DATEADD -1 DAY)
    LAG(daily_sales, 1) OVER (ORDER BY order_date) AS prev_day,
    -- Day-over-day change
    daily_sales - LAG(daily_sales, 1) OVER (ORDER BY order_date) AS dod_change
FROM daily_sales_summary
ORDER BY order_date;`,
        note: "Window functions are equivalent to DAX time intelligence patterns — running totals, prior period comparisons.",
      },
      {
        title: "Percentage of total (like DAX ALL pattern)",
        code: `SELECT
    category,
    total_sales,
    -- % of total (equivalent to DIVIDE([Sales], CALCULATE([Sales], ALL(Product))))
    ROUND(
        total_sales * 100.0 / SUM(total_sales) OVER (),
        2
    ) AS pct_of_total,
    -- % of category (like ALLEXCEPT)
    ROUND(
        total_sales * 100.0 / SUM(total_sales) OVER (PARTITION BY category),
        2
    ) AS pct_of_category
FROM product_sales;`,
        note: "SUM() OVER() without PARTITION BY gives the grand total. With PARTITION BY, it gives the subtotal per group — perfect for calculating percentage contributions.",
      },
    ],
  },
  {
    id: "subqueries",
    title: "Subqueries & EXISTS",
    icon: Filter,
    description:
      "Subqueries allow nesting queries within queries for complex filtering and derived tables.",
    examples: [
      {
        title: "Correlated subquery",
        code: `-- Products with above-average sales in their category
SELECT
    p.product_name,
    p.category,
    ps.total_sales
FROM products p
INNER JOIN product_sales ps ON p.product_id = ps.product_id
WHERE ps.total_sales > (
    SELECT AVG(ps2.total_sales)
    FROM product_sales ps2
    INNER JOIN products p2 ON ps2.product_id = p2.product_id
    WHERE p2.category = p.category
);`,
        note: "A correlated subquery runs once for each row of the outer query. Here it calculates the average sales per category, then compares each product against its category average.",
      },
      {
        title: "EXISTS for semi-join",
        code: `-- Customers who have placed at least one order in 2024
SELECT c.customer_name, c.email
FROM customers c
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.customer_id = c.customer_id
        AND o.order_date >= '2024-01-01'
);`,
        note: "EXISTS is efficient for checking if related rows exist — similar to checking COUNTROWS > 0 in DAX.",
      },
    ],
  },
  {
    id: "directquery",
    title: "DirectQuery Optimization",
    icon: Zap,
    description:
      "When Power BI uses DirectQuery, every visual interaction generates a SQL query. Optimizing your database is critical for report performance.",
    examples: [
      {
        title: "Create indexes for DirectQuery",
        code: `-- Index fact table foreign keys
CREATE INDEX idx_sales_date ON sales(date_key);
CREATE INDEX idx_sales_product ON sales(product_id);
CREATE INDEX idx_sales_customer ON sales(customer_id);
CREATE INDEX idx_sales_store ON sales(store_id);

-- Composite index for common filter patterns
CREATE INDEX idx_sales_date_product
ON sales(date_key, product_id);

-- Covering index for frequent queries
CREATE INDEX idx_sales_covering
ON sales(date_key, product_id)
INCLUDE (quantity, amount);`,
        note: "Index all foreign keys in fact tables and columns commonly used in slicers and filters.",
      },
      {
        title: "Materialized views for aggregates",
        code: `-- Pre-aggregate common calculations
CREATE MATERIALIZED VIEW mv_daily_category_sales AS
SELECT
    s.date_key,
    p.category,
    COUNT(*) AS transaction_count,
    SUM(s.quantity) AS total_quantity,
    SUM(s.amount) AS total_amount
FROM sales s
INNER JOIN products p ON s.product_id = p.product_id
GROUP BY s.date_key, p.category;

-- Refresh periodically
REFRESH MATERIALIZED VIEW mv_daily_category_sales;`,
        note: "Materialized views can dramatically speed up DirectQuery reports by pre-computing aggregates.",
      },
      {
        title: "Query optimization tips",
        code: `-- Use EXPLAIN ANALYZE to check query plans
EXPLAIN ANALYZE
SELECT
    d.year,
    p.category,
    SUM(s.amount) AS total_sales
FROM sales s
INNER JOIN dim_date d ON s.date_key = d.date_key
INNER JOIN products p ON s.product_id = p.product_id
WHERE d.year = 2024
GROUP BY d.year, p.category;

-- Check for sequential scans (bad for large tables)
-- Look for Index Scan or Index Only Scan (good)`,
        note: "Run EXPLAIN ANALYZE on the queries Power BI generates to identify performance bottlenecks.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SQLReferenceContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <AnimateOnScroll variant="fade-up" duration={600}>
      <div className="mb-12">
        <Badge variant="secondary" className="mb-3">
          <BookOpen className="mr-1 h-3 w-3" />
          SQL Reference
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          SQL Reference for Power BI
        </h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
          SQL fundamentals tailored for Power BI developers. PostgreSQL query patterns, CTEs,
          window functions, and DirectQuery optimization — with DAX equivalents noted throughout.
        </p>
      </div>
      </AnimateOnScroll>

      {/* Quick Introduction */}
      <AnimateOnScroll variant="fade-up" delay={50}>
      <Card className="mb-12 border-blue-500/20 bg-blue-500/5">
        <CardContent className="py-6">
          <h3 className="mb-2 text-lg font-semibold">Quick Introduction</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">SQL (Structured Query Language)</strong> is the standard language for communicating with
            relational databases. As a Power BI developer, you&apos;ll encounter SQL when connecting to databases via DirectQuery,
            writing custom SQL queries in Power Query, or optimizing your data source for better report performance.
            Understanding SQL helps you write efficient queries, design better data models, and troubleshoot
            the queries that Power BI generates behind the scenes.
          </p>
        </CardContent>
      </Card>
      </AnimateOnScroll>

      {/* Quick Nav */}
      <AnimateOnScroll variant="fade-up" delay={100}>
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {sqlTopics.map((topic) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm transition-colors hover:bg-muted"
              >
                <topic.icon className="h-3.5 w-3.5 text-yellow-700 dark:text-primary" />
                {topic.title}
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
      </AnimateOnScroll>

      {/* SQL vs DAX Quick Reference */}
      <AnimateOnScroll variant="fade-up">
      <Card className="mb-12 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-yellow-700 dark:text-primary">SQL ↔ DAX Quick Reference</CardTitle>
          <CardDescription>Common equivalents between SQL and DAX</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left">SQL</th>
                  <th className="px-3 py-2 text-left">DAX Equivalent</th>
                  <th className="px-3 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  { sql: "SELECT ... FROM ... WHERE", dax: "CALCULATETABLE / FILTER", note: "Filter context vs row-by-row" },
                  { sql: "GROUP BY + SUM()", dax: "SUMMARIZECOLUMNS", note: "DAX auto-groups in visuals" },
                  { sql: "INNER JOIN ... ON", dax: "RELATED()", note: "Relationships defined in model" },
                  { sql: "LEFT JOIN", dax: "NATURALLEFTOUTERJOIN", note: "Or handle with IF(ISBLANK(...))" },
                  { sql: "CASE WHEN", dax: "SWITCH(TRUE(), ...)", note: "Multi-condition branching" },
                  { sql: "COALESCE(x, 0)", dax: "IF(ISBLANK(x), 0, x)", note: "Handle blanks/NULLs" },
                  { sql: "COUNT(DISTINCT col)", dax: "DISTINCTCOUNT(col)", note: "Same semantics" },
                  { sql: "ROW_NUMBER() OVER()", dax: "RANKX()", note: "Ranking in context" },
                  { sql: "LAG() / LEAD()", dax: "DATEADD / SAMEPERIODLASTYEAR", note: "Prior period comparisons" },
                  { sql: "SUM() OVER()", dax: "CALCULATE + ALL pattern", note: "Window vs filter manipulation" },
                  { sql: "CTE (WITH ... AS)", dax: "VAR / RETURN", note: "Named intermediate results" },
                  { sql: "CREATE INDEX", dax: "N/A (VertiPaq handles it)", note: "Import mode auto-optimizes" },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/10"}>
                    <td className="px-3 py-2 font-mono text-xs">{row.sql}</td>
                    <td className="px-3 py-2 font-mono text-xs">{row.dax}</td>
                    <td className="px-3 py-2 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </AnimateOnScroll>

      {/* Topics */}
      <div className="space-y-16">
        {sqlTopics.map((topic) => (
          <AnimateOnScroll key={topic.id} variant="fade-up">
          <section id={topic.id} className="scroll-mt-20">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <topic.icon className="h-5 w-5 text-yellow-700 dark:text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{topic.title}</h2>
                  <p className="text-sm text-muted-foreground">{topic.description}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {topic.examples.map((example) => (
                <Card key={example.title}>
                  <CardHeader>
                    <CardTitle className="text-base">{example.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CodeBlock code={example.code} language="sql" />
                    {example.note && (
                      <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                        <p className="text-sm">
                          <strong className="text-yellow-700 dark:text-primary">💡 Power BI Note:</strong> {example.note}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
}
