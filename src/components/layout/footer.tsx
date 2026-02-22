import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

const footerLinks = {
  Documentation: [
    { name: "DAX Guide", href: "/dax-guide" },
    { name: "Measures vs Columns", href: "/measures-vs-columns" },
    { name: "Data Modeling", href: "/data-modeling" },
    { name: "SQL Reference", href: "/sql-reference" },
  ],
  Resources: [
    { name: "All Resources", href: "/resources" },
    { name: "Best Practices", href: "/data-modeling#best-practices" },
    { name: "Star Schema", href: "/data-modeling#star-schema" },
    { name: "Query Folding", href: "/data-modeling#query-folding" },
    { name: "Performance Tips", href: "/dax-guide#performance" },
  ],
  Community: [
    { name: "GitHub", href: "https://github.com" },
    { name: "Microsoft Learn", href: "https://learn.microsoft.com/power-bi/" },
    { name: "DAX.do", href: "https://dax.do" },
    { name: "SQLBI", href: "https://www.sqlbi.com" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <LayoutDashboard className="h-4.5 w-4.5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                PowerBI<span className="text-yellow-700 dark:text-primary"> Guide</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your comprehensive resource for Power BI, DAX, data modeling, and SQL best practices.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-center text-xs text-muted-foreground">
            &copy; 2026 PowerBIHub. Built by Earl Justine Simbajon. All Rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
