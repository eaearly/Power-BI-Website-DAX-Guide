import type { Metadata } from "next";
import { DAXGuideContent } from "./dax-guide-content";

export const metadata: Metadata = {
  title: "DAX Syntax Guide",
  description:
    "Complete DAX (Data Analysis Expressions) function reference for Power BI. Syntax highlighting, examples, and performance optimization tips.",
  keywords: [
    "DAX",
    "DAX Guide",
    "CALCULATE",
    "SUMX",
    "Power BI DAX",
    "DAX Functions",
    "Time Intelligence",
    "Filter Context",
  ],
};

export default function DAXGuidePage() {
  return <DAXGuideContent />;
}
