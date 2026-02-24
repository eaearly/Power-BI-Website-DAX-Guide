import type { Metadata } from "next";
import { DataVisualizationContent } from "./data-visualization-content";

export const metadata: Metadata = {
  title: "Data Visualization",
  description:
    "Learn how to create stunning Power BI dashboards, reports, and data visualizations. Step-by-step guide covering Copilot, report building, and publishing.",
};

export default function DataVisualizationPage() {
  return <DataVisualizationContent />;
}
