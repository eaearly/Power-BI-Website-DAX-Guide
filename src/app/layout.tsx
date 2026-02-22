import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PowerBIHub — DAX Guide, Data Modeling & SQL Reference",
    template: "%s | PowerBIHub",
  },
  description:
    "Comprehensive technical documentation for Power BI, DAX syntax, measures vs calculated columns, star schema data modeling, query folding, and SQL best practices.",
  keywords: [
    "Power BI",
    "DAX",
    "DAX Guide",
    "Measures",
    "Calculated Columns",
    "Data Modeling",
    "Star Schema",
    "Query Folding",
    "SQL",
    "Business Intelligence",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PowerBIHub",
    title: "PowerBIHub — DAX Guide, Data Modeling & SQL Reference",
    description:
      "Comprehensive technical documentation for Power BI, DAX syntax, data modeling, and SQL.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
