"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";
import { PageTransition } from "@/components/ui/page-transition";
import { ZoomableImage } from "@/components/ui/zoomable-image";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Database,
  Eye,
  FileUp,
  Layers,
  LayoutDashboard,
  Monitor,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  ExternalLink,
  ArrowRight,
  PieChart,
  TrendingUp,
  Table2,
  CreditCard,
  Map,
  BrainCircuit,
  SlidersHorizontal,
  Bookmark,
  Palette,
  Puzzle,
  Target,
  Filter,
  Gauge,
  Globe,
  LineChart,
  AreaChart,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Sidebar Navigation Items                                           */
/* ------------------------------------------------------------------ */

const sidebarNav = [
  { id: "overview", label: "Overview" },
  { id: "copilot", label: "Copilot for Power BI" },
  { id: "data-prep", label: "Data Preparation" },
  { id: "create-report", label: "Creating Reports" },
  { id: "dashboards", label: "Building Dashboards" },
  { id: "vis-pane", label: "Visualization Pane" },
  { id: "comparison", label: "Comparison Charts" },
  { id: "trend", label: "Trend & Time Charts" },
  { id: "part-whole", label: "Part-to-Whole Charts" },
  { id: "distribution", label: "Distribution Charts" },
  { id: "tables-matrices", label: "Tables & Matrices" },
  { id: "cards-kpis", label: "Cards, KPI & Gauges" },
  { id: "maps", label: "Maps & Spatial" },
  { id: "ai-visuals", label: "AI Visuals" },
  { id: "slicers", label: "Slicers & Filtering" },
  { id: "bookmarks", label: "Bookmarks & Navigation" },
  { id: "formatting", label: "Formatting Visuals" },
  { id: "custom-visuals", label: "Custom Visuals" },
  { id: "scorecards", label: "Metrics & Scorecards" },
  { id: "publish", label: "Publishing Reports" },
  { id: "best-practices", label: "Best Practices" },
];

/* ------------------------------------------------------------------ */
/*  Step-by-step types                                                 */
/* ------------------------------------------------------------------ */

interface Step {
  step: number;
  title: string;
  description: string;
  tip?: string;
}

interface VisualType {
  name: string;
  description: string;
  useCase: string;
  icon: React.ElementType;
  tip?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DataVisualizationContent() {
  const [activeSection, setActiveSection] = useState("overview");

  /* Track scroll position for sidebar active state */
  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarNav.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i].el;
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── Data Arrays ── */

  const createReportSteps: Step[] = [
    {
      step: 1,
      title: "Connect to Your Data Source",
      description:
        "Open Power BI Desktop and click 'Get Data' from the Home ribbon. Choose your data source — SQL Server, Excel, SharePoint, Web, or 200+ other connectors. Enter your connection details and credentials.",
      tip: "Use DirectQuery for real-time data or Import mode for cached, fast performance.",
    },
    {
      step: 2,
      title: "Transform Data in Power Query",
      description:
        "The Power Query Editor opens automatically. Clean and shape your data: remove unnecessary columns, filter rows, change data types, merge queries, and create custom columns. Every transformation is recorded as a step you can edit later.",
      tip: "Keep transformations as close to the source as possible for query folding optimization.",
    },
    {
      step: 3,
      title: "Build Your Data Model",
      description:
        "Switch to the Model view to define relationships between tables. Create a star schema with fact tables at the center and dimension tables around them. Set relationship cardinality (one-to-many) and cross-filter direction.",
      tip: "Always use a dedicated Date table and mark it as a Date table for time intelligence to work.",
    },
    {
      step: 4,
      title: "Create Measures with DAX",
      description:
        "Switch to the Report view. Right-click your fact table and select 'New Measure'. Write DAX formulas like Total Sales = SUM('Sales'[Amount]). Measures calculate dynamically based on the user's filter context in the report.",
      tip: "Use VAR/RETURN to break complex measures into readable, debuggable steps.",
    },
    {
      step: 5,
      title: "Design Your Report Page",
      description:
        "Drag fields onto the canvas to create visuals. Choose from bar charts, line charts, tables, cards, maps, and more. Use the Format pane to customize colors, fonts, labels, and conditional formatting. Arrange visuals in a clear, logical layout.",
      tip: "Start with a KPI card row at the top, then detailed charts below. Keep it clean — less is more.",
    },
    {
      step: 6,
      title: "Add Interactivity with Slicers and Filters",
      description:
        "Add slicer visuals for date ranges, categories, and regions. Configure visual interactions so clicking one chart filters the others. Use bookmarks to create toggle states and drillthrough pages for detail views.",
    },
  ];

  const publishSteps: Step[] = [
    {
      step: 1,
      title: "Save Your Report",
      description:
        "Save your .pbix file locally. Ensure all data connections are working and the report has no errors. Review each page for visual alignment and data accuracy.",
    },
    {
      step: 2,
      title: "Sign In to Power BI Service",
      description:
        "In Power BI Desktop, click 'Publish' on the Home ribbon. Sign in with your organizational Microsoft 365 account. You need a Power BI Pro or Premium Per User license to publish.",
    },
    {
      step: 3,
      title: "Select a Workspace",
      description:
        "Choose the destination workspace. Use 'My Workspace' for personal reports or a shared workspace for team collaboration. Workspaces on Premium capacity enable additional features like paginated reports and deployment pipelines.",
      tip: "Create separate workspaces for Development, Test, and Production using deployment pipelines.",
    },
    {
      step: 4,
      title: "Configure Scheduled Refresh",
      description:
        "In the Power BI service, go to Dataset Settings. Configure a data gateway if connecting to on-premises data. Set up scheduled refresh (up to 8 times daily with Pro, 48 with Premium). Enter data source credentials.",
    },
    {
      step: 5,
      title: "Create a Dashboard",
      description:
        "Open your published report in the Power BI service. Hover over a visual, click the pin icon, and pin it to a new or existing dashboard. Dashboards show live tiles from multiple reports on a single page.",
      tip: "Dashboards are unique to Power BI service — they don't exist in Desktop. Use them for executive summaries.",
    },
    {
      step: 6,
      title: "Share and Distribute",
      description:
        "Share directly with users by entering their email, or create a Power BI App to package multiple reports, dashboards, and datasets. Set row-level security (RLS) to restrict data access by user role. Configure subscriptions for automated email reports.",
    },
  ];

  /* ── Visualization Types by Category ── */

  const comparisonCharts: VisualType[] = [
    {
      name: "Bar Chart",
      description: "Horizontal bars comparing values across categories. Best when category labels are long.",
      useCase: "Sales by product name, customer ranking, survey responses",
      icon: BarChart3,
      tip: "Use horizontal bars when you have many categories (10+) to avoid label overlap.",
    },
    {
      name: "Column Chart",
      description: "Vertical bars for comparing values. Ideal for time-based comparisons with a small number of categories.",
      useCase: "Monthly revenue, quarterly sales by region",
      icon: BarChart3,
    },
    {
      name: "Stacked Bar/Column",
      description: "Bars divided into segments showing composition. Each segment represents a sub-category within the total.",
      useCase: "Revenue by product category stacked by region, budget allocation",
      icon: BarChart3,
      tip: "Use 100% stacked to compare proportions rather than absolute values.",
    },
    {
      name: "Clustered Bar/Column",
      description: "Groups of bars side by side for direct comparison between categories across multiple series.",
      useCase: "Sales by quarter grouped by product line, year-over-year comparison",
      icon: BarChart3,
    },
  ];

  const trendCharts: VisualType[] = [
    {
      name: "Line Chart",
      description: "Connect data points with lines to show trends over continuous time periods. Supports multiple series.",
      useCase: "Revenue trend over months, stock price movement, website traffic",
      icon: LineChart,
      tip: "Use a continuous date axis (not categorical) for accurate time representation.",
    },
    {
      name: "Area Chart",
      description: "Line chart with the area below filled. Shows both trend and volume. Useful for cumulative totals.",
      useCase: "Cumulative revenue, market share over time, inventory levels",
      icon: AreaChart,
      tip: "Use stacked area charts carefully — the overlapping areas can be misleading.",
    },
    {
      name: "Combo Chart",
      description: "Combines column and line on the same visual with dual Y-axes. Perfect for comparing different metrics at different scales.",
      useCase: "Revenue (bars) vs profit margin % (line), sales volume vs average price",
      icon: BarChart3,
    },
    {
      name: "Ribbon Chart",
      description: "Like a stacked area chart but re-ranks categories at each time point, showing which category leads.",
      useCase: "Market share ranking over time, top products by quarter",
      icon: TrendingUp,
    },
  ];

  const partToWholeCharts: VisualType[] = [
    {
      name: "Pie Chart",
      description: "Circular chart divided into slices showing proportion of a whole. Best with 3–6 categories maximum.",
      useCase: "Market share distribution, expense breakdown, demographic split",
      icon: PieChart,
      tip: "Avoid pie charts with more than 6 slices. Use bar charts for precise comparisons instead.",
    },
    {
      name: "Donut Chart",
      description: "Similar to pie chart with a hollow center. The center can display a total value or KPI metric.",
      useCase: "Budget allocation, project completion percentage",
      icon: PieChart,
    },
    {
      name: "Treemap",
      description: "Nested rectangles sized by value. Shows hierarchical part-to-whole relationships in a compact space.",
      useCase: "Product hierarchy sales, file storage usage, organizational headcount",
      icon: Layers,
      tip: "Treemaps work great for hierarchical data — drill into subcategories by clicking.",
    },
    {
      name: "Funnel Chart",
      description: "Shows values across sequential stages of a process. Each stage is proportionally sized to the value.",
      useCase: "Sales pipeline stages, recruitment funnel, website conversion funnel",
      icon: Filter,
    },
  ];

  const distributionCharts: VisualType[] = [
    {
      name: "Scatter Chart",
      description: "Plots individual data points using X and Y axes. Reveals correlations, clusters, and outliers in data.",
      useCase: "Price vs quantity, customer spend vs frequency, advertising spend vs revenue",
      icon: BarChart3,
      tip: "Add a play axis (animation) to watch how scatter points change over time.",
    },
    {
      name: "Bubble Chart",
      description: "Like scatter but adds a third dimension encoded as bubble size. Shows three measures simultaneously.",
      useCase: "Revenue vs profit with deal size, GDP vs life expectancy with population",
      icon: BarChart3,
    },
    {
      name: "Waterfall Chart",
      description: "Shows how sequential positive and negative values contribute to a total. Floating bars connected by lines.",
      useCase: "Profit bridge analysis, budget variance (start → additions → deductions → end)",
      icon: BarChart3,
    },
  ];

  const tableVisuals: VisualType[] = [
    {
      name: "Table Visual",
      description: "Flat tabular display with rows and columns. Supports conditional formatting, data bars, sparklines, and web URLs.",
      useCase: "Detailed transaction log, customer list, line-item sales data",
      icon: Table2,
      tip: "Use conditional formatting (background color, data bars, icons) to highlight key values.",
    },
    {
      name: "Matrix Visual",
      description: "Pivot-table style with row and column grouping, expand/collapse, subtotals, and stepped layout hierarchies.",
      useCase: "Financial statements, year-over-year comparison pivots, multi-level grouping",
      icon: Table2,
      tip: "Enable stepped layout for hierarchical row headers and use +/- expand to drill into details.",
    },
  ];

  const cardVisuals: VisualType[] = [
    {
      name: "Card Visual",
      description: "Displays a single large number. Use for headline KPIs that need to stand out prominently on the page.",
      useCase: "Total revenue, customer count, average order value",
      icon: CreditCard,
    },
    {
      name: "Multi-Row Card",
      description: "Multiple KPIs in a compact card layout. Each row shows a label and value, great for summary panels.",
      useCase: "Executive summary: revenue + orders + customers + margin",
      icon: CreditCard,
    },
    {
      name: "KPI Visual",
      description: "Shows current value, trend graph, and target (goal). Color-coded to show on-track (green) or behind (red).",
      useCase: "Sales vs target, monthly goal tracking, SLA compliance",
      icon: Target,
      tip: "KPI visuals need a trend axis field (usually date) and a target goal value.",
    },
    {
      name: "Gauge Visual",
      description: "Semicircular gauge showing a value against a minimum, maximum, and optional target. Visual progress indicator.",
      useCase: "Server CPU usage, quarterly progress, customer satisfaction score",
      icon: Gauge,
    },
  ];

  const mapVisuals: VisualType[] = [
    {
      name: "Bing Map (Bubble Map)",
      description: "Plots data points as bubbles on a Bing-powered map. Size and color encode measure values at geographic locations.",
      useCase: "Store locations with revenue, customer density, shipping origins",
      icon: Map,
    },
    {
      name: "Filled Map (Choropleth)",
      description: "Colors entire regions/countries based on a measure value. Uses shading intensity to represent data levels.",
      useCase: "Sales by state/country, population density, election results",
      icon: Map,
      tip: "Ensure your geographic data matches Bing Maps naming (e.g., 'United States' not 'USA').",
    },
    {
      name: "Azure Map",
      description: "Advanced mapping with Azure Maps. Supports heat maps, route visualization, and custom tile layers.",
      useCase: "Real-time fleet tracking, IoT sensor data on a map, custom spatial analysis",
      icon: Globe,
    },
    {
      name: "ArcGIS Map",
      description: "Enterprise-grade Esri ArcGIS integration. Reference layers, demographic data, heatmaps, and drive-time analysis.",
      useCase: "Advanced geospatial analytics, site selection, demographic overlays",
      icon: Globe,
      tip: "ArcGIS Maps for Power BI is a free visual but requires an ArcGIS account for premium features.",
    },
  ];

  const aiVisuals: VisualType[] = [
    {
      name: "Decomposition Tree",
      description: "Interactively break down a measure by different dimensions. AI suggests the next best split to explain high/low values.",
      useCase: "Root cause analysis, why revenue dropped, drill-down exploration",
      icon: BrainCircuit,
      tip: "Use the lightbulb icon to let AI suggest the most impactful dimension to split by.",
    },
    {
      name: "Key Influencers",
      description: "AI identifies which factors most influence a metric to increase or decrease. Built-in statistical analysis.",
      useCase: "What drives customer churn, factors affecting satisfaction scores",
      icon: BrainCircuit,
    },
    {
      name: "Q&A Visual",
      description: "Type natural language questions and Power BI generates a visual answer automatically. Supports synonyms and custom terms.",
      useCase: "Executive self-service: 'Show me total sales by region last quarter'",
      icon: BrainCircuit,
      tip: "Train Q&A by adding synonyms in the Modeling tab → Q&A setup to improve accuracy.",
    },
    {
      name: "Smart Narrative",
      description: "AI auto-generates a text summary of your data with key insights, trends, and callouts. Updates dynamically.",
      useCase: "Automated report summaries, data storytelling, executive briefs",
      icon: BrainCircuit,
    },
    {
      name: "Anomaly Detection",
      description: "Automatically detects and flags anomalies in time-series line charts. Shows expected range and explanations.",
      useCase: "Detecting unusual spikes/drops in sales, traffic, or operational metrics",
      icon: AlertTriangle,
    },
  ];

  /* ── Helper: render a visual card ── */
  const VisualCard = ({ vis }: { vis: VisualType }) => (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <vis.icon className="h-4 w-4 text-amber-500" />
          {vis.name}
        </CardTitle>
        <CardDescription>{vis.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Use for:</strong> {vis.useCase}
        </p>
        {vis.tip && (
          <div className="rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
            <p className="text-xs">
              <strong className="text-yellow-700 dark:text-primary">💡 Tip:</strong> {vis.tip}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  /* ── Helper: section header ── */
  const SectionHeader = ({
    icon: Icon,
    color,
    title,
    subtitle,
  }: {
    icon: React.ElementType;
    color: string;
    title: string;
    subtitle: string;
  }) => (
    <div className="mb-6 flex items-center gap-3">
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", color)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-12 sm:px-10 lg:px-16">
        {/* ── Page Header ── */}
        <AnimateOnScroll variant="fade-up" duration={600}>
          <div className="mb-10 flex flex-col items-center text-center">
            <Badge variant="secondary" className="mb-3 border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-400">
              <Eye className="mr-1 h-3 w-3" />
              Data Visualization
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Data Visualization & Reports
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Complete guide to creating Power BI dashboards, reports, and data visualizations.
              From data preparation and Copilot AI to publishing and sharing — step by step.
            </p>
          </div>
        </AnimateOnScroll>

        {/* ── Layout: Sidebar + Content ── */}
        <div className="flex gap-10">
          {/* Sidebar Navigation — sticky, Microsoft Learn style */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                In this article
              </p>
              <nav className="flex max-h-[calc(100vh-8rem)] flex-col gap-0.5 overflow-y-auto border-l border-border pr-2">
                {sidebarNav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={cn(
                      "-ml-px border-l-2 px-4 py-1.5 text-sm transition-colors",
                      activeSection === item.id
                        ? "border-primary font-medium text-foreground"
                        : "border-transparent text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="min-w-0 flex-1 space-y-16">
            {/* ════════════ OVERVIEW ════════════ */}
            <section id="overview" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <Card className="border-violet-500/20 hover:border-violet-500/40 bg-violet-500/5">
                  <CardContent className="py-6">
                    <h2 className="mb-3 text-2xl font-bold">Overview</h2>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      <strong className="text-foreground">Power BI</strong> is Microsoft&apos;s business intelligence platform
                      that transforms raw data into interactive visualizations and reports. It consists of{" "}
                      <strong>Power BI Desktop</strong> (for authoring reports), the{" "}
                      <strong>Power BI service</strong> (cloud-based publishing, dashboards, and sharing), and{" "}
                      <strong>Power BI Mobile</strong> (for on-the-go access). Together they form an end-to-end
                      analytics workflow: connect to data, model it, create visuals, publish, and share insights
                      with your organization.
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {[
                        { icon: Database, label: "Connect & Model", desc: "200+ data connectors, Power Query ETL, star schema modeling" },
                        { icon: BarChart3, label: "Visualize & Analyze", desc: "30+ visual types, DAX measures, Copilot AI insights" },
                        { icon: FileUp, label: "Publish & Share", desc: "Cloud dashboards, scheduled refresh, row-level security" },
                      ].map((item) => (
                        <div key={item.label} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                          <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-violet-600 dark:text-violet-400" />
                          <div>
                            <p className="text-sm font-semibold">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            </section>

            {/* ════════════ COPILOT ════════════ */}
            <section id="copilot" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Sparkles}
                  color="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  title="Copilot for Power BI"
                  subtitle="AI-powered report generation and insights"
                />

                <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">APPLIES TO:</span>
                  <Badge variant="outline" className="gap-1 border-green-500/40 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-3 w-3" /> Power BI Desktop
                  </Badge>
                  <Badge variant="outline" className="gap-1 border-green-500/40 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-3 w-3" /> Power BI Service
                  </Badge>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-foreground/80">
                  <strong>Copilot in Power BI</strong> uses large language models to help you create reports faster.
                  Describe what you want in natural language and Copilot generates report pages, DAX measures,
                  narrative summaries, and data insights.
                </p>

                {/* Screenshots */}
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/copilot-introduction/copilot-build-reports.png"
                    alt="Copilot building a report in Power BI"
                    caption="Copilot in Power BI — building reports with AI assistance"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/copilot-introduction/copilot-pane-questions.png"
                    alt="Copilot pane for asking questions about reports"
                    caption="The Copilot pane — ask questions about your open report"
                  />
                </div>

                {/* Copilot requirements */}
                <Card className="border-amber-500/20 hover:border-amber-500/40 bg-amber-500/5">
                  <CardContent className="py-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                      <div>
                        <h3 className="text-sm font-semibold">Requirements for Copilot</h3>
                        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                            Fabric F64 or Power BI Premium P1 capacity (or higher)
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                            Tenant admin must enable Copilot in the admin portal
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                            Data must be in a supported region with Bing-safe-search-like compliance
                          </li>
                          <li className="flex items-start gap-2">
                            <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                            Works best with clean, well-modeled star schema data
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimateOnScroll>
            </section>

            {/* ════════════ DATA PREPARATION ════════════ */}
            <section id="data-prep" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Database}
                  color="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  title="Data Preparation"
                  subtitle="Clean, transform, and model your data in Power Query"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Clean & Transform",
                      desc: "Remove duplicates, handle nulls, split columns, change types, and apply conditional logic in Power Query.",
                      icon: CheckCircle2,
                    },
                    {
                      title: "Star Schema Design",
                      desc: "Organize tables into fact (measures) and dimension (attributes) tables with one-to-many relationships.",
                      icon: Layers,
                    },
                    {
                      title: "Optimize for Copilot",
                      desc: "Use descriptive column names, add synonyms, and maintain a clean model so Copilot produces better results.",
                      icon: Sparkles,
                    },
                    {
                      title: "Performance",
                      desc: "Enable query folding, reduce column cardinality, use appropriate data types, and avoid calculated columns on large tables.",
                      icon: Zap,
                    },
                  ].map((item) => (
                    <Card key={item.title}>
                      <CardContent className="flex gap-4 py-5">
                        <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        <div>
                          <h3 className="text-base font-semibold">{item.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ CREATING REPORTS ════════════ */}
            <section id="create-report" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={BookOpen}
                  color="bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  title="Creating Reports"
                  subtitle="Step-by-step guide from data connection to finished report"
                />

                <div className="space-y-4">
                  {createReportSteps.map((step) => (
                    <Card key={step.step}>
                      <CardContent className="flex gap-4 py-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-lg font-bold text-blue-600 dark:text-blue-400">
                          {step.step}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-semibold">{step.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                          {step.tip && (
                            <div className="mt-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
                              <p className="text-xs">
                                <strong className="text-yellow-700 dark:text-primary">💡 Tip:</strong> {step.tip}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Creating Reports screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/fundamentals/media/desktop-getting-started/getting-started-8.png"
                    alt="Power BI Desktop Get Data dialog showing available connectors"
                    caption="Step 1 — Get Data dialog with 200+ connectors (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/transform-model/media/desktop-query-overview/query-overview-transform.png"
                    alt="Power Query Editor with data transformation steps"
                    caption="Step 2 — Power Query Editor for data transformation (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-excel-stunning-report/power-bi-date-relationship.png"
                    alt="Power BI Desktop Model view showing table relationships"
                    caption="Step 3 — Model view with table relationships (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-excel-stunning-report/power-bi-excel-formatted-report.png"
                    alt="Power BI Desktop Report view with visuals on canvas"
                    caption="Step 5 — Report canvas with visuals and formatting (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ BUILDING DASHBOARDS ════════════ */}
            <section id="dashboards" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={LayoutDashboard}
                  color="bg-purple-500/10 text-purple-600 dark:text-purple-400"
                  title="Building Dashboards"
                  subtitle="Single-page canvases with live tiles from multiple reports"
                />

                <div className="mb-6 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
                  <p className="text-sm text-foreground/80">
                    <strong>Reports</strong> are multi-page, interactive documents created in Power BI Desktop with full
                    editing capabilities. <strong>Dashboards</strong> are single-page canvases in the Power BI service
                    that display live tiles pinned from one or more reports. Dashboards are great for executive
                    summaries — reports are great for detailed analysis.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Dashboard Best Practices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {[
                          "Keep dashboards focused — one theme or audience per dashboard",
                          "Place KPI cards and key metrics at the top",
                          "Use natural reading order: left-to-right, top-to-bottom",
                          "Limit to 6-8 tiles to avoid information overload",
                          "Use consistent colors aligned with your brand",
                          "Add Q&A visual for natural language exploration",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Dashboard Tiles & Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5">
                        {[
                          "Pin visuals, entire report pages, or custom tiles",
                          "Live tiles update automatically on data refresh",
                          "Set data alerts — get notified when a KPI crosses a threshold",
                          "Add streaming datasets for real-time monitoring",
                          "Use featured dashboard as your Power BI home landing",
                          "Pin from multiple reports for cross-domain executive views",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Dashboard screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/service-dashboards/power-bi-dashboard2.png"
                    alt="Power BI Dashboard with multiple tiles and KPIs"
                    caption="A Power BI Dashboard with live tiles pinned from reports (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/service-dashboard-create/power-bi-pin-live.png"
                    alt="Pin a visual to a dashboard"
                    caption="Pinning a report visual to a dashboard tile (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>
            <section id="vis-pane" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Eye}
                  color="bg-pink-500/10 text-pink-600 dark:text-pink-400"
                  title="Visualization Pane"
                  subtitle="Add, customize, and configure visuals from the pane"
                />

                <div className="mb-6">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-excel-stunning-report/power-bi-column-chart-date.png"
                    alt="Power BI column chart with date axis"
                    caption="Column chart visualization in Power BI (Source: Microsoft Learn)"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "Add a Visual",
                      desc: "Click an icon in the Visualizations pane or drag a field onto the canvas. Power BI auto-selects a visual type based on data type.",
                    },
                    {
                      title: "Field Wells",
                      desc: "Drag measures into Values, dimensions into Axis/Legend. Each visual type has different field wells for X-axis, Y-axis, Size, Color, etc.",
                    },
                    {
                      title: "Format Pane",
                      desc: "Use the paint roller icon to access visual-level formatting: titles, colors, data labels, backgrounds, borders, and conditional formatting rules.",
                    },
                  ].map((item) => (
                    <Card key={item.title}>
                      <CardContent className="py-5">
                        <h3 className="text-base font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ COMPARISON CHARTS ════════════ */}
            <section id="comparison" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={BarChart3}
                  color="bg-blue-500/10 text-blue-600 dark:text-blue-400"
                  title="Comparison Charts"
                  subtitle="Bar, column, stacked, and clustered charts"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {comparisonCharts.map((vis) => (
                    <VisualCard key={vis.name} vis={vis} />
                  ))}
                </div>

                {/* Comparison Charts screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-combo-chart/power-bi-column-chart-values.png"
                    alt="Power BI column chart values for comparison"
                    caption="Column chart comparing sales values across categories (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-combo-chart/power-bi-combo-chart-visualization.png"
                    alt="Power BI combo chart with line and columns"
                    caption="Combo chart combining column and line series (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>
            <section id="trend" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={TrendingUp}
                  color="bg-teal-500/10 text-teal-600 dark:text-teal-400"
                  title="Trend & Time Charts"
                  subtitle="Line, area, combo, and ribbon charts for time series"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {trendCharts.map((vis) => (
                    <VisualCard key={vis.name} vis={vis} />
                  ))}
                </div>

                {/* Trend Charts screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-basic-area-chart/power-bi-chart-example.png"
                    alt="Power BI Area Chart showing trend over time"
                    caption="Area chart showing data trends over a period (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-combo-chart/power-bi-clustered-combo.png"
                    alt="Power BI Combo Chart with columns and line"
                    caption="Combo chart combining columns and line for dual-axis analysis (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>
            <section id="part-whole" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={PieChart}
                  color="bg-orange-500/10 text-orange-600 dark:text-orange-400"
                  title="Part-to-Whole Charts"
                  subtitle="Pie, donut, treemap, and funnel charts"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {partToWholeCharts.map((vis) => (
                    <VisualCard key={vis.name} vis={vis} />
                  ))}
                </div>

                {/* Part-to-Whole Charts screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-treemaps/pbi-nancy-viz-treemap.png"
                    alt="Power BI Treemap showing hierarchical part-to-whole data"
                    caption="Treemap visual for nested, hierarchical part-to-whole data (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-excel-stunning-report/power-bi-report-by-numbers.png"
                    alt="Power BI report with multiple visual types"
                    caption="Complete report page with pie, bar, and table visuals (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>
            <section id="distribution" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={BarChart3}
                  color="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  title="Distribution & Relationship Charts"
                  subtitle="Scatter, bubble, and waterfall charts"
                />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {distributionCharts.map((vis) => (
                    <VisualCard key={vis.name} vis={vis} />
                  ))}
                </div>

                {/* Distribution Charts screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-scatter/power-bi-scatter-initial.png"
                    alt="Power BI Scatter Chart showing correlation data"
                    caption="Scatter chart revealing correlations and outliers (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-waterfall-charts/power-bi-waterfall-chart.png"
                    alt="Power BI Waterfall Chart showing sequential contributions"
                    caption="Waterfall chart showing positive and negative value contributions (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>
            <section id="tables-matrices" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Table2}
                  color="bg-slate-500/10 text-slate-600 dark:text-slate-400"
                  title="Tables & Matrices"
                  subtitle="Detailed tabular data with grouping and formatting"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {tableVisuals.map((vis) => (
                    <VisualCard key={vis.name} vis={vis} />
                  ))}
                </div>

                {/* Table & Matrix screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-tables/power-bi-table-format.png"
                    alt="Power BI Table visual with conditional formatting"
                    caption="Table visual with columns and conditional formatting (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-matrix-visual/build-matrix-visual-desktop-step-2.png"
                    alt="Power BI Matrix visual with row and column grouping"
                    caption="Matrix visual with hierarchical rows, columns, and subtotals (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ CARDS, KPI & GAUGES ════════════ */}
            <section id="cards-kpis" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={CreditCard}
                  color="bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  title="Cards, KPI & Gauges"
                  subtitle="Single-value metrics, targets, and progress indicators"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {cardVisuals.map((vis) => (
                    <VisualCard key={vis.name} vis={vis} />
                  ))}
                </div>

                {/* Cards & KPI screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-types-for-reports-and-q-and-a/power-bi-kpi.png"
                    alt="Power BI KPI Visual showing progress against target"
                    caption="KPI visual tracking current value against a target goal (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-radial-gauge-charts/gauge-m.png"
                    alt="Power BI Gauge Visual showing progress"
                    caption="Gauge visual showing a single metric against min/max/target (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ MAPS & SPATIAL ════════════ */}
            <section id="maps" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Map}
                  color="bg-green-500/10 text-green-600 dark:text-green-400"
                  title="Maps & Spatial Visuals"
                  subtitle="Geographic data visualization with Bing, Azure, and ArcGIS"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {mapVisuals.map((vis) => (
                    <VisualCard key={vis.name} vis={vis} />
                  ))}
                </div>

                {/* Maps screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-excel-stunning-report/power-bi-map-visual.png"
                    alt="Power BI Map visual with bubble data points"
                    caption="Bubble map plotting geographic data points with size encoding (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-filled-maps-choropleths/power-bi-filled-map.png"
                    alt="Power BI Filled Map (choropleth) showing state-level data"
                    caption="Filled map (choropleth) coloring regions by data values (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ AI VISUALS ════════════ */}
            <section id="ai-visuals" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={BrainCircuit}
                  color="bg-violet-500/10 text-violet-600 dark:text-violet-400"
                  title="AI Visuals"
                  subtitle="Machine-learning powered insights and natural language exploration"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  {aiVisuals.map((vis) => (
                    <VisualCard key={vis.name} vis={vis} />
                  ))}
                </div>

                {/* AI Visuals screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-decomposition-tree/tree-full.png"
                    alt="Power BI Decomposition Tree AI visual"
                    caption="Decomposition Tree — AI-powered drill-down analysis (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-influencers/power-bi-key-influencers.png"
                    alt="Power BI Key Influencers AI visual"
                    caption="Key Influencers — AI identifies factors driving metrics (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ SLICERS & FILTERING ════════════ */}
            <section id="slicers" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={SlidersHorizontal}
                  color="bg-rose-500/10 text-rose-600 dark:text-rose-400"
                  title="Slicers & Filtering"
                  subtitle="Interactive controls for filtering report data"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <SlidersHorizontal className="h-4 w-4 text-rose-500" />
                        Slicer Visual
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        On-canvas filter control. Supports <strong>list</strong>, <strong>dropdown</strong>,{" "}
                        <strong>between (range)</strong>, <strong>relative date</strong>, and <strong>relative time</strong> slicer types.
                        Users interact directly with slicers to filter all visuals on the page.
                      </p>
                      <div className="mt-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
                        <p className="text-xs">
                          <strong className="text-yellow-700 dark:text-primary">💡 Tip:</strong> Sync slicers across pages for a consistent
                          filtering experience — View → Sync Slicers pane.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Filter className="h-4 w-4 text-rose-500" />
                        Filters Pane
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Three filter levels: <strong>Visual-level</strong> (affects one visual), <strong>Page-level</strong>{" "}
                        (affects all visuals on a page), and <strong>Report-level</strong> (affects all pages). Use the Filters pane
                        to apply basic, advanced, Top N, or relative date filtering. Lock or hide filters from end users.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="sm:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <ArrowRight className="h-4 w-4 text-rose-500" />
                        Visual Interactions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        By default, clicking a visual cross-filters other visuals on the page. Customize this via{" "}
                        <strong>Format → Edit Interactions</strong>: choose <em>Filter</em> (show only matching data),{" "}
                        <em>Highlight</em> (dim non-matching data), or <em>None</em> (no interaction) for each visual pair.
                        Use drillthrough pages for detailed analysis — right-click a data point to drill into a focused detail page.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Slicers screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-slicers/power-bi-new-slicer-desktop.png"
                    alt="Power BI Slicer visual for interactive filtering"
                    caption="Slicer visual — on-canvas interactive filter control (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/power-bi-report-filter/power-bi-filter-reading.png"
                    alt="Power BI Filters pane in reading view"
                    caption="Filters pane — visual, page, and report level filters (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ BOOKMARKS & NAVIGATION ════════════ */}
            <section id="bookmarks" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Bookmark}
                  color="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  title="Bookmarks & Navigation"
                  subtitle="Save report states and build interactive navigation"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Bookmarks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {[
                          "Capture the current state of a page: filters, slicers, visual visibility, sort order",
                          "Create toggle states — e.g., show/hide a detail panel with two bookmarks",
                          "Build a guided analytics experience with sequential bookmarks",
                          "Personal bookmarks let end users save their own filter combinations",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Buttons & Navigation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1.5 text-sm text-muted-foreground">
                        {[
                          "Action buttons: assign bookmark, drillthrough, page navigation, web URL, or Q&A actions",
                          "Use conditional formatting to change button text/color based on data",
                          "Page navigator auto-generates navigation buttons for all pages",
                          "Combine buttons + bookmarks to build app-like multi-state interfaces",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Bookmarks screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-bookmarks/bookmarks-pane.png"
                    alt="Power BI Bookmarks pane and Selection pane"
                    caption="Bookmarks pane — save and manage report states (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-buttons/power-bi-button-action.png"
                    alt="Power BI button action configuration for bookmarks"
                    caption="Action buttons — assign bookmark, page navigation, or web URL actions (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ FORMATTING VISUALS ════════════ */}
            <section id="formatting" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Palette}
                  color="bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400"
                  title="Formatting & Visual Features"
                  subtitle="Conditional formatting, drill-down, tooltips, and more"
                />

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Conditional Formatting",
                      desc: "Apply background colors, font colors, data bars, icons, and web URLs based on data values or rules. Use field-based or rule-based formatting.",
                      icon: Palette,
                    },
                    {
                      title: "Drill-Down / Drill-Up",
                      desc: "Add hierarchies to axes (e.g., Year → Quarter → Month). Click the drill-down arrows to explore data at different levels. Double-click a bar to expand.",
                      icon: Layers,
                    },
                    {
                      title: "Tooltips",
                      desc: "Default tooltips show field values on hover. Create custom tooltip pages with detailed visuals that appear as rich, interactive hover cards.",
                      icon: Info,
                    },
                    {
                      title: "Custom Themes",
                      desc: "Import JSON themes to apply consistent colors, fonts, and visual defaults across all reports. Use the theme gallery or create your own.",
                      icon: Palette,
                    },
                    {
                      title: "Data Labels & Legends",
                      desc: "Show values directly on visuals. Configure label position, decimal places, display units (K, M, B). Customize legend position and font.",
                      icon: BarChart3,
                    },
                    {
                      title: "Responsive Design",
                      desc: "Use the mobile layout editor (View → Mobile Layout) to rearrange visuals for phone viewing. Test with Power BI Mobile app.",
                      icon: Monitor,
                    },
                  ].map((item) => (
                    <Card key={item.title} className="transition-shadow hover:shadow-md">
                      <CardContent className="py-5">
                        <div className="mb-2 flex items-center gap-2">
                          <item.icon className="h-4 w-4 text-fuchsia-500" />
                          <h3 className="text-base font-semibold">{item.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Formatting & Features screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/visuals/media/power-bi-visualization-tables/power-bi-format-visual.png"
                    alt="Power BI Format pane for conditional formatting"
                    caption="Conditional formatting — color scales, data bars, and icon sets (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-tooltips/desktop-tooltips-06.png"
                    alt="Power BI custom report-page tooltip"
                    caption="Custom tooltips — rich, interactive hover cards from tooltip pages (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ CUSTOM VISUALS ════════════ */}
            <section id="custom-visuals" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Puzzle}
                  color="bg-lime-500/10 text-lime-600 dark:text-lime-400"
                  title="Custom Visuals"
                  subtitle="Extend Power BI with AppSource marketplace visuals"
                />

                <Card className="mb-4">
                  <CardContent className="py-5">
                    <p className="text-sm leading-relaxed text-foreground/80">
                      The <strong>AppSource marketplace</strong> offers hundreds of custom visuals built by Microsoft and third-party
                      developers. Find specialized visuals like Gantt charts, org charts, Sankey diagrams, bullet charts, and more.
                      Custom visuals can also be developed in-house using the Power BI Visuals SDK (TypeScript + D3.js).
                    </p>
                  </CardContent>
                </Card>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      title: "Certified Visuals",
                      desc: "Microsoft-certified visuals pass security and code quality checks. They can be exported to PDF/PowerPoint and used in email subscriptions.",
                    },
                    {
                      title: "Organization Visuals",
                      desc: "Admins can upload custom visuals to the organization&apos;s visual store, making them available to all report creators without AppSource.",
                    },
                    {
                      title: "Build Your Own",
                      desc: "Use the Power BI Visuals SDK with TypeScript and D3.js to create fully custom, interactive visuals tailored to your business needs.",
                    },
                  ].map((item) => (
                    <Card key={item.title} className="transition-shadow hover:shadow-md">
                      <CardContent className="py-5">
                        <h3 className="text-base font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Custom Visuals screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/developer/visuals/media/power-bi-custom-visuals/power-bi-visualizations.png"
                    alt="Power BI default visualization pane with visual types"
                    caption="Visualization pane — core visuals available in Power BI (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/developer/visuals/media/power-bi-custom-visuals/app-purchase-plans.png"
                    alt="Custom visual pricing and plans on AppSource"
                    caption="AppSource marketplace — browse, purchase, and install custom visuals (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ METRICS & SCORECARDS ════════════ */}
            <section id="scorecards" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Target}
                  color="bg-red-500/10 text-red-600 dark:text-red-400"
                  title="Metrics & Scorecards"
                  subtitle="Track goals, OKRs, and KPIs with Power BI Metrics"
                />

                <Card className="mb-4 border-red-500/20 hover:border-red-500/40 bg-red-500/5">
                  <CardContent className="py-5">
                    <p className="text-sm leading-relaxed text-foreground/80">
                      <strong>Power BI Metrics</strong> (formerly Goals) lets you define business metrics with targets,
                      track progress over time, and assign owners. Create scorecards that roll up from individual
                      KPIs to organizational objectives. Status rules auto-color metrics as on-track, at-risk, or behind.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Scorecards",
                      items: [
                        "Create scorecards with connected metrics from Power BI datasets",
                        "Define targets, status rules, and check-in cadences",
                        "Roll up sub-metrics into parent goals for OKR tracking",
                        "Add manual check-ins with notes for qualitative updates",
                      ],
                    },
                    {
                      title: "Metric Features",
                      items: [
                        "Automated status rules: green/yellow/red based on % to target",
                        "Sparkline trends showing metric history at a glance",
                        "Owner assignment and @mention notifications",
                        "Embed scorecards in dashboards and share via Teams",
                      ],
                    },
                  ].map((section) => (
                    <Card key={section.title}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{section.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5">
                          {section.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Scorecards screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/service-goals-introduction/power-bi-goals-hub.png"
                    alt="Power BI Metrics (Goals) hub showing scorecards"
                    caption="Metrics hub — track business goals, OKRs, and KPIs (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/service-goals-introduction/scorecard-samples-recommended.png"
                    alt="Power BI scorecard with recommended goals and samples"
                    caption="Scorecard with recommended goals and metric samples (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ PUBLISHING ════════════ */}
            <section id="publish" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={FileUp}
                  color="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  title="Publishing Reports"
                  subtitle="Deploy your reports to the Power BI service"
                />

                <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">APPLIES TO:</span>
                  <Badge variant="outline" className="gap-1 border-green-500/40 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-3 w-3" /> Power BI Desktop
                  </Badge>
                  <Badge variant="outline" className="gap-1 border-green-500/40 text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-3 w-3" /> Power BI Service
                  </Badge>
                </div>

                <div className="space-y-4">
                  {publishSteps.map((step) => (
                    <Card key={step.step}>
                      <CardContent className="flex gap-4 py-5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-lg font-bold text-cyan-600 dark:text-cyan-400">
                          {step.step}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-semibold">{step.title}</h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                          {step.tip && (
                            <div className="mt-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2">
                              <p className="text-xs">
                                <strong className="text-yellow-700 dark:text-primary">💡 Tip:</strong> {step.tip}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Publishing Reports screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/collaborate-share/media/service-publish-to-web/power-bi-more-options-publish-web.png"
                    alt="Power BI Publish to Web option in the service"
                    caption="Step 2 — Publish option in Power BI Desktop (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/collaborate-share/media/service-create-distribute-apps/power-bi-apps-left-nav.png"
                    alt="Power BI workspace navigation showing apps"
                    caption="Step 3 — Workspace selection for publishing (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/connect-data/media/refresh-scheduled-refresh/scheduled-refresh.png"
                    alt="Scheduled refresh settings in Power BI service"
                    caption="Step 4 — Configure scheduled data refresh (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/service-dashboard-create/power-bi-pin-live.png"
                    alt="Pin visual to dashboard dialog in Power BI service"
                    caption="Step 5 — Pin visuals to create a dashboard (Source: Microsoft Learn)"
                  />
                </div>

                {/* Admin screenshot */}
                <div className="mt-6">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/copilot-introduction/copilot-access-standalone-enabled.png"
                    alt="Screenshot of the standalone Copilot admin settings enabled"
                    caption="Standalone Copilot admin workspace settings (Source: Microsoft Learn)"
                  />
                </div>
              </AnimateOnScroll>
            </section>

            {/* ════════════ BEST PRACTICES ════════════ */}
            <section id="best-practices" className="scroll-mt-24">
              <AnimateOnScroll variant="fade-up">
                <SectionHeader
                  icon={Zap}
                  color="bg-primary/10 text-yellow-700 dark:text-primary"
                  title="Best Practices"
                  subtitle="Professional tips for production-quality reports"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-primary/20 hover:border-primary/40 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-yellow-700 dark:text-primary">Report Design</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {[
                          "Use a consistent color palette (3-5 colors max)",
                          "Left-align text, right-align numbers",
                          "Group related visuals together",
                          "Use tooltips for additional context without cluttering",
                          "Test on different screen sizes and Power BI Mobile",
                          "Use bookmarks for toggle-based navigation",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-primary/20 hover:border-primary/40 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base text-yellow-700 dark:text-primary">Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {[
                          "Limit visuals to 8-10 per page for fast rendering",
                          "Use measures instead of calculated columns for aggregations",
                          "Avoid FILTER() on large tables — use direct filters",
                          "Enable query caching for Premium workspaces",
                          "Use aggregation tables for large datasets",
                          "Monitor performance with Performance Analyzer",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-muted-foreground">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* External links */}
                {/* Best Practices screenshots */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-excel-stunning-report/power-bi-excel-formatted-report.png"
                    alt="A stunning Power BI report from Excel data"
                    caption="Production-quality report built from Excel data (Source: Microsoft Learn)"
                  />
                  <ZoomableImage
                    src="https://learn.microsoft.com/en-us/power-bi/create-reports/media/desktop-excel-stunning-report/power-bi-report-by-numbers.png"
                    alt="Power BI Performance Analyzer pane"
                    caption="Performance Analyzer — measure visual render times (Source: Microsoft Learn)"
                  />
                </div>

                <div className="mt-6 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Related Content</p>
                  {[
                    { label: "Tutorial: From Excel workbook to stunning report in Power BI Desktop", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-excel-stunning-report" },
                    { label: "Overview of Copilot for Fabric (Preview)", url: "https://learn.microsoft.com/en-us/fabric/get-started/copilot-fabric-overview" },
                    { label: "Privacy, security, and responsible use for Copilot", url: "https://learn.microsoft.com/en-us/fabric/get-started/copilot-power-bi-privacy-security" },
                    { label: "Enable Fabric Copilot for Power BI", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-enable-power-bi" },
                    { label: "Create reports with Copilot", url: "https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-create-reports" },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm transition-colors hover:bg-muted group"
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-blue-500" />
                      <span className="text-blue-600 dark:text-blue-400 group-hover:underline">{link.label}</span>
                    </a>
                  ))}
                </div>
              </AnimateOnScroll>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
