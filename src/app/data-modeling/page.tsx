import type { Metadata } from "next";
import { DataModelingContent } from "./data-modeling-content";

export const metadata: Metadata = {
  title: "Data Modeling Best Practices",
  description:
    "Star schema design, relationships, query folding, and optimization patterns for Power BI data models. Industry-standard data modeling best practices.",
  keywords: [
    "Data Modeling",
    "Star Schema",
    "Query Folding",
    "Power BI",
    "Relationships",
    "Fact Table",
    "Dimension Table",
    "Snowflake Schema",
  ],
};

export default function DataModelingPage() {
  return <DataModelingContent />;
}
