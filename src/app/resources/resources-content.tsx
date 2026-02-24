"use client";

import Image from "next/image";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { PageTransition } from "@/components/ui/page-transition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Mail, Bug, MessageCircle } from "lucide-react";

/* ── Logo imports ── */
import w3schoolsLogo from "@/logos/w3schools-logo-icon.png";
import datacampLogo from "@/logos/datacamp-icon.png";
import udemySvg from "@/logos/udemy-3.svg";
import powerBiLogo from "@/logos/microsoft_power-bi.png";
import devPhoto from "@/logos/devphoto.jpg";

/* ── Brand Identity Icons ── */
const MicrosoftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="10.5" height="10.5" rx="1" fill="#F25022" />
    <rect x="12.5" y="1" width="10.5" height="10.5" rx="1" fill="#7FBA00" />
    <rect x="1" y="12.5" width="10.5" height="10.5" rx="1" fill="#00A4EF" />
    <rect x="12.5" y="12.5" width="10.5" height="10.5" rx="1" fill="#FFB900" />
  </svg>
);

const CourseraIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" fill="#0056D2" />
    <path d="M15.5 12a3.5 3.5 0 1 1-3.5-3.5c1.16 0 2.19.57 2.82 1.44l2.1-1.52A6.48 6.48 0 0 0 12 5.5a6.5 6.5 0 1 0 6.5 6.5h-3z" fill="white" />
  </svg>
);

const UdemyIcon = ({ className }: { className?: string }) => (
  <Image src={udemySvg} alt="Udemy" width={20} height={20} className={className} />
);

const W3SchoolsIcon = ({ className }: { className?: string }) => (
  <Image src={w3schoolsLogo} alt="W3Schools" width={20} height={20} className={className} />
);

const DataCampIcon = ({ className }: { className?: string }) => (
  <Image src={datacampLogo} alt="DataCamp" width={20} height={20} className={className} />
);

const MySQLIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="6" rx="9" ry="3.5" fill="#00758F" />
    <path d="M3 6v12c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5V6" stroke="#00758F" strokeWidth="2" />
    <path d="M3 12c0 1.93 4.03 3.5 9 3.5s9-1.57 9-3.5" stroke="#F29111" strokeWidth="1.5" />
  </svg>
);

const TableauIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.2 1h1.6v4.8h4.8v1.6h-4.8V12h-1.6V7.4H6.4V5.8h4.8V1z" fill="#E97627" />
    <path d="M5.2 9.5h1.2v3.2h3.2v1.2H6.4v3.2H5.2v-3.2H2v-1.2h3.2V9.5z" fill="#C72037" />
    <path d="M17.2 9.5h1.2v3.2h3.2v1.2h-3.2v3.2h-1.2v-3.2H14v-1.2h3.2V9.5z" fill="#5B879B" />
    <path d="M11.2 17h1.6v3h3v1.6h-3V24h-1.6v-2.4H8.2V20h3v-3z" fill="#1F457E" />
  </svg>
);

const DataVizIcon = ({ className }: { className?: string }) => (
  <Image src={powerBiLogo} alt="Power BI" width={20} height={20} className={className} />
);

const resources = [
  {
    name: "Microsoft Learn — DAX Reference",
    description:
      "Official Microsoft DAX function reference and documentation. Covers every DAX function with syntax, examples, data modeling reference, and enterprise deployment best practices.",
    url: "https://learn.microsoft.com/en-us/dax/",
    icon: MicrosoftIcon,
    category: "Official Docs",
    color: "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10",
    borderColor: "border-blue-500/30 hover:border-blue-500/50",
    iconColor: "text-blue-600 dark:text-blue-400",
    highlights: ["DAX Reference", "Power Query M", "Data Modelling Reference", "Dataflows"],
  },
  {
    name: "Coursera — Google Data Analytics",
    description:
      "World-class online courses from top universities and companies. Google Data Analytics Professional Certificate to build your data analytics skills.",
    url: "https://www.coursera.org/professional-certificates/google-data-analytics",
    icon: CourseraIcon,
    category: "Courses",
    color: "from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10",
    borderColor: "border-indigo-500/30 hover:border-indigo-500/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    highlights: ["Certifications", "Google Data Analytics", "Professional Certificate", "IBM BI"],
  },
  {
    name: "Udemy — Power BI Free Course",
    description:
      "Free Power BI course on Udemy for data analysis. Learn Microsoft Power BI from scratch with hands-on projects, dashboard creation, and data visualization techniques.",
    url: "https://www.udemy.com/course/microsoft-power-bi-for-data-analysis-free-course/",
    icon: UdemyIcon,
    category: "Free Course",
    color: "from-purple-500/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10",
    borderColor: "border-purple-500/30 hover:border-purple-500/50",
    iconColor: "text-purple-600 dark:text-purple-400",
    highlights: ["Free Course", "Power BI Basics", "Data Analysis", "Dashboards"],
  },
  {
    name: "W3Schools — SQL Introduction",
    description:
      "The world's largest web developer site. Comprehensive SQL tutorials starting from the basics with a try-it-yourself editor, perfect for learning SQL syntax.",
    url: "https://www.w3schools.com/sql/sql_intro.asp",
    icon: W3SchoolsIcon,
    category: "Tutorial",
    color: "from-green-500/20 to-lime-500/20 dark:from-green-500/10 dark:to-lime-500/10",
    borderColor: "border-green-500/30 hover:border-green-500/50",
    iconColor: "text-green-600 dark:text-green-400",
    highlights: ["SQL Basics", "JOIN Types", "Aggregate Functions", "Try It Editor"],
  },
  {
    name: "DataCamp — Power BI",
    description:
      "Interactive data science and analytics courses. Hands-on coding exercises for Power BI, SQL, Python, and data visualization with real-world projects.",
    url: "https://www.datacamp.com/category/power-bi?page=1",
    icon: DataCampIcon,
    category: "Interactive Learning",
    color: "from-emerald-500/20 to-green-500/20 dark:from-emerald-500/10 dark:to-green-500/10",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/50",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    highlights: ["Hands-on Labs", "Power BI Course", "SQL Fundamentals", "Data Visualization"],
  },
  {
    name: "MySQL Documentation",
    description:
      "Official MySQL reference manual. Essential for understanding relational databases, query optimization, and data source connections used with Power BI.",
    url: "https://dev.mysql.com/doc/",
    icon: MySQLIcon,
    category: "Database Docs",
    color: "from-orange-500/20 to-amber-500/20 dark:from-orange-500/10 dark:to-amber-500/10",
    borderColor: "border-orange-500/30 hover:border-orange-500/50",
    iconColor: "text-orange-600 dark:text-orange-400",
    highlights: ["Query Optimization", "Indexing", "Stored Procedures", "Data Types"],
  },
  {
    name: "Tableau — Community Resources",
    description:
      "Explore Tableau's community resources, tutorials, and public visualizations. Great for learning visualization best practices and dashboard design ideas applicable to Power BI.",
    url: "https://public.tableau.com/app/learn/community-resources",
    icon: TableauIcon,
    category: "Visualization",
    color: "from-sky-500/20 to-blue-500/20 dark:from-sky-500/10 dark:to-blue-500/10",
    borderColor: "border-sky-500/30 hover:border-sky-500/50",
    iconColor: "text-sky-600 dark:text-sky-400",
    highlights: ["Viz Gallery", "Community Resources", "Chart Types", "Best Practices"],
  },
  {
    name: "Microsoft Learn — Data Visualizations",
    description:
      "Official Power BI visualization guide from Microsoft Learn. Covers all chart types, custom visuals, formatting techniques, and interactive report design.",
    url: "https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-types-for-reports-and-q-and-a",
    icon: DataVizIcon,
    category: "Visualizations",
    color: "from-yellow-500/20 to-amber-500/20 dark:from-yellow-500/10 dark:to-amber-500/10",
    borderColor: "border-yellow-500/30 hover:border-yellow-500/50",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    highlights: ["Chart Types", "Custom Visuals", "Report Design", "Formatting"],
  },
];

const quickLinks = [
  { name: "Data Visualization Community — Custom Visuals", url: "https://community.fabric.microsoft.com/t5/Custom-Visuals-Development/Power-BI-Custom-Visuals-Community/m-p/667211" },
  { name: "GitHub — Power BI Data Analysis", url: "https://github.com/topics/data-analysis-powerbi" },
  { name: "SQLBI — Advanced DAX patterns", url: "https://www.sqlbi.com" },
  { name: "Power BI Blog — Official updates", url: "https://powerbi.microsoft.com/blog/" },
  { name: "DAX Guide — Function reference", url: "https://dax.guide" },
  { name: "Power BI Tips — Community tips", url: "https://powerbi.tips" },
  { name: "Guy in a Cube — YouTube channel", url: "https://www.youtube.com/@GuyInACube" },
];

export function ResourcesContent() {
  return (
    <PageTransition>
    <div className="mx-auto w-full max-w-[1600px] px-6 py-12 sm:px-10 lg:px-16">
      {/* Hero Section */}
      <AnimateOnScroll variant="fade-up">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 border-primary/40 text-yellow-700 dark:text-primary">
            Learning Resources
          </Badge>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            References &amp;{" "}
            <span className="text-yellow-700 dark:text-primary">Resources</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Curated collection of the best resources, documentation, and learning platforms to
            master Power BI, DAX, SQL, and data analytics.
          </p>
        </div>
      </AnimateOnScroll>

      {/* Resource Cards Grid */}
      <div className="mb-20 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <AnimateOnScroll
            key={resource.name}
            variant="fade-up"
            delay={index * 80}
          >
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              <Card
                className={`relative h-full overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${resource.borderColor}`}
              >
                {/* Gradient background */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${resource.color} opacity-60 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <CardHeader className="relative">
                  <div className="mb-3 flex items-center justify-between">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-background/80 backdrop-blur-sm ${resource.iconColor}`}
                    >
                      <resource.icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {resource.category}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {resource.name}
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5" />
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                    {resource.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {resource.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border/50 bg-muted/60 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          </AnimateOnScroll>
        ))}
      </div>

      {/* Quick Links Section */}
      <AnimateOnScroll variant="fade-up">
        <div className="rounded-2xl border border-border bg-card/50 p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
          <h2 className="mb-6 text-center text-2xl font-bold">
            More{" "}
            <span className="text-yellow-700 dark:text-primary">Quick Links</span>
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickLinks.map((link, index) => (
              <AnimateOnScroll key={link.name} variant="fade-up" delay={index * 60}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-border/50 bg-background/60 px-4 py-3 transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:shadow-sm hover:-translate-y-0.5"
                >
                  <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-yellow-700 dark:group-hover:text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {link.name}
                  </span>
                </a>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </AnimateOnScroll>

      {/* Disclaimer */}
      <AnimateOnScroll variant="fade-up" delay={100}>
        <p className="mt-10 text-center text-xs text-muted-foreground">
          These resources are provided for educational reference. All trademarks belong to their
          respective owners. Links open in a new tab.
        </p>
      </AnimateOnScroll>

      {/* Developer Contact Section */}
      <AnimateOnScroll variant="fade-up" delay={150}>
        <Separator className="my-10" />
        <div className="mx-auto max-w-xl">
          <Card className="relative overflow-hidden border border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 hover:-translate-y-1">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 dark:from-yellow-500/3 dark:to-amber-500/3" />
            <CardHeader className="relative pb-3 text-center">
              <CardTitle className="text-lg font-semibold">
                Found a Bug or Have Feedback?
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                If you encounter any corrections, bugs, or issues on this website,
                feel free to contact the developer.
              </CardDescription>
            </CardHeader>
            <CardContent className="relative pt-0">
              <div className="flex flex-col items-center gap-4">
                {/* Developer Avatar */}
                <div className="relative h-20 w-20 overflow-hidden rounded-full shadow-lg shadow-yellow-500/20 ring-2 ring-yellow-500/20 ring-offset-2 ring-offset-background">
                  <Image src={devPhoto} alt="Earl Justine Simbajon" fill className="object-cover" />
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5">
                  <span className="text-sm font-medium text-yellow-700 dark:text-primary">
                    Earl Justine Simbajon
                  </span>
                </div>
                {/* Clickable email */}
                <a
                  href="mailto:justinesimbajon9@gmail.com"
                  className="group inline-flex items-center gap-2 rounded-md border border-border/50 bg-background/60 px-3 py-1.5 text-sm text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-yellow-700 dark:hover:text-primary"
                >
                  <Mail className="h-3.5 w-3.5" />
                  justinesimbajon9@gmail.com
                </a>
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Bug className="h-3 w-3" />
                    Bug Reports
                  </span>
                  <span className="text-border">|</span>
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    Suggestions
                  </span>
                  <span className="text-border">|</span>
                  <span className="inline-flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Corrections
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimateOnScroll>
    </div>
    </PageTransition>
  );
}
