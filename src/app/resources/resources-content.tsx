"use client";

import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, GraduationCap, Code2, Database, BarChart3, Monitor, Layers, PlayCircle } from "lucide-react";

const resources = [
  {
    name: "Microsoft Learn — DAX Reference",
    description:
      "Official Microsoft DAX function reference and documentation. Covers every DAX function with syntax, examples, data modeling reference, and enterprise deployment best practices.",
    url: "https://learn.microsoft.com/en-us/dax/",
    icon: Monitor,
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
    icon: GraduationCap,
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
    icon: PlayCircle,
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
    icon: BookOpen,
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
    icon: Code2,
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
    icon: Database,
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
    icon: Layers,
    category: "Visualization",
    color: "from-sky-500/20 to-blue-500/20 dark:from-sky-500/10 dark:to-blue-500/10",
    borderColor: "border-sky-500/30 hover:border-sky-500/50",
    iconColor: "text-sky-600 dark:text-sky-400",
    highlights: ["Viz Gallery", "Community Resources", "Chart Types", "Best Practices"],
  },
];

const quickLinks = [
  { name: "DAX.do — Online DAX sandbox", url: "https://dax.do" },
  { name: "SQLBI — Advanced DAX patterns", url: "https://www.sqlbi.com" },
  { name: "Power BI Blog — Official updates", url: "https://powerbi.microsoft.com/blog/" },
  { name: "DAX Guide — Function reference", url: "https://dax.guide" },
  { name: "Power BI Tips — Community tips", url: "https://powerbi.tips" },
  { name: "Guy in a Cube — YouTube channel", url: "https://www.youtube.com/@GuyInACube" },
];

export function ResourcesContent() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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
        <div className="rounded-2xl border border-border bg-card/50 p-8">
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
                  className="group flex items-center gap-3 rounded-lg border border-border/50 bg-background/60 px-4 py-3 transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
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
    </div>
  );
}
