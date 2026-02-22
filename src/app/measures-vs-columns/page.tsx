import type { Metadata } from "next";
import { MeasuresVsColumnsContent } from "./measures-vs-columns-content";

export const metadata: Metadata = {
  title: "Measures vs Calculated Columns",
  description:
    "Understand the differences between measures and calculated columns in Power BI DAX. Learn evaluation context, row context, filter context, and when to use each.",
  keywords: [
    "Measures",
    "Calculated Columns",
    "DAX",
    "Row Context",
    "Filter Context",
    "Power BI",
    "Evaluation Context",
  ],
};

export default function MeasuresVsColumnsPage() {
  return <MeasuresVsColumnsContent />;
}
