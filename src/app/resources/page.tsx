import type { Metadata } from "next";
import { ResourcesContent } from "./resources-content";

export const metadata: Metadata = {
  title: "Resources & References",
  description:
    "Curated learning resources, documentation, and reference links for Power BI, DAX, SQL, and data analytics. Microsoft Learn, Coursera, DataCamp, W3Schools, MySQL, and more.",
  keywords: [
    "Power BI Resources",
    "DAX Learning",
    "SQL Tutorial",
    "Data Analytics Courses",
    "Microsoft Learn",
    "Coursera Data",
    "DataCamp",
    "Tableau",
  ],
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
