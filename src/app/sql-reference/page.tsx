import type { Metadata } from "next";
import { SQLReferenceContent } from "./sql-reference-content";

export const metadata: Metadata = {
  title: "SQL Reference for Power BI",
  description:
    "SQL fundamentals for Power BI developers. PostgreSQL query patterns, CTEs, window functions, joins, and DirectQuery optimization.",
  keywords: [
    "SQL",
    "PostgreSQL",
    "Power BI SQL",
    "CTEs",
    "Window Functions",
    "DirectQuery",
    "SQL Joins",
  ],
};

export default function SQLReferencePage() {
  return <SQLReferenceContent />;
}
