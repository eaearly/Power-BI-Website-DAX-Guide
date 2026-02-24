"use client"

import React, { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { Database } from "lucide-react"

const SchemaNode = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    variant?: "fact" | "dimension"
  }
>(({ className, children, variant = "dimension" }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex flex-col items-center justify-center rounded-xl border-2 px-4 py-3 text-center shadow-md transition-transform duration-300 hover:scale-105",
        variant === "fact"
          ? "border-blue-500 bg-blue-500/10 shadow-blue-500/20 dark:bg-blue-500/15 min-w-[130px]"
          : "border-emerald-500/60 bg-emerald-500/5 shadow-emerald-500/10 dark:bg-emerald-500/10 min-w-[110px]",
        className
      )}
    >
      {children}
    </div>
  )
})

SchemaNode.displayName = "SchemaNode"

export function StarSchemaBeam() {
  const containerRef = useRef<HTMLDivElement>(null)
  const factRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const productRef = useRef<HTMLDivElement>(null)
  const customerRef = useRef<HTMLDivElement>(null)
  const storeRef = useRef<HTMLDivElement>(null)
  const employeeRef = useRef<HTMLDivElement>(null)
  const promotionRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-card/50 p-6 sm:p-10"
      style={{ minHeight: "420px" }}
    >
      <div className="flex size-full max-w-2xl flex-col items-stretch justify-between gap-8 sm:gap-10" style={{ minHeight: "360px" }}>
        {/* Top row */}
        <div className="flex flex-row items-center justify-between">
          <SchemaNode ref={employeeRef}>
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
            <p className="text-xs font-semibold">Employee</p>
          </SchemaNode>
          <SchemaNode ref={dateRef}>
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
            <p className="text-xs font-semibold">Date</p>
            <p className="text-[9px] text-muted-foreground">Year, Quarter, Month</p>
          </SchemaNode>
          <SchemaNode ref={promotionRef}>
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
            <p className="text-xs font-semibold">🏷️ Promotion</p>
          </SchemaNode>
        </div>

        {/* Middle row */}
        <div className="flex flex-row items-center justify-between">
          <SchemaNode ref={productRef}>
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
            <p className="text-xs font-semibold">📦 Product</p>
            <p className="text-[9px] text-muted-foreground">Name, Category, Price</p>
          </SchemaNode>

          <SchemaNode ref={factRef} variant="fact" className="mx-4 sm:mx-8">
            <Database className="mx-auto mb-1 h-5 w-5 text-blue-600 dark:text-blue-400" />
            <p className="text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Fact</p>
            <p className="text-sm font-bold">Sales</p>
            <p className="mt-0.5 text-[9px] text-muted-foreground">OrderID, DateKey, Qty, Amt</p>
          </SchemaNode>

          <SchemaNode ref={customerRef}>
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
            <p className="text-xs font-semibold">👤 Customer</p>
            <p className="text-[9px] text-muted-foreground">Name, Segment, Email</p>
          </SchemaNode>
        </div>

        {/* Bottom row */}
        <div className="flex flex-row items-center justify-between">
          <div className="w-[110px]" />
          <SchemaNode ref={storeRef}>
            <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
            <p className="text-xs font-semibold">🏬 Store</p>
            <p className="text-[9px] text-muted-foreground">Name, Region, City</p>
          </SchemaNode>
          <div className="w-[110px]" />
        </div>
      </div>

      {/* Animated beams — each connects to a distinct edge of the Fact node */}
      {/* Employee (top-left) → Fact top-left edge */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={employeeRef}
        toRef={factRef}
        curvature={-30}
        endXOffset={-30}
        endYOffset={-50}
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={2}
        pathOpacity={0.3}
        delay={0}
        duration={4}
        gradientStartColor="#10b981"
        gradientStopColor="#3b82f6"
      />
      {/* Date (top-center) → Fact top edge */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dateRef}
        toRef={factRef}
        curvature={0}
        endYOffset={-25}
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={2}
        pathOpacity={0.3}
        delay={0.6}
        duration={4}
        gradientStartColor="#10b981"
        gradientStopColor="#3b82f6"
      />
      {/* Promotion (top-right) → Fact top-right edge */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={promotionRef}
        toRef={factRef}
        curvature={0}
        endXOffset={25}
        endYOffset={-18}
        reverse
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={2}
        pathOpacity={0.3}
        delay={1.2}
        duration={4}
        gradientStartColor="#3b82f6"
        gradientStopColor="#10b981"
      />
      {/* Product (middle-left) → Fact left edge */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={productRef}
        toRef={factRef}
        curvature={0}
        endXOffset={-40}
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={2}
        pathOpacity={0.3}
        delay={1.8}
        duration={4}
        gradientStartColor="#10b981"
        gradientStopColor="#3b82f6"
      />
      {/* Customer (middle-right) → Fact right edge */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={customerRef}
        toRef={factRef}
        curvature={0}
        endXOffset={40}
        reverse
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={2}
        pathOpacity={0.3}
        delay={2.4}
        duration={4}
        gradientStartColor="#3b82f6"
        gradientStopColor="#10b981"
      />
      {/* Store (bottom-center) → Fact bottom edge */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={storeRef}
        toRef={factRef}
        curvature={0}
        endYOffset={25}
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={2}
        pathOpacity={0.3}
        delay={3.0}
        duration={4}
        gradientStartColor="#10b981"
        gradientStopColor="#3b82f6"
      />
    </div>
  )
}
