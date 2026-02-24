"use client"

import React, { forwardRef, useRef } from "react"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/ui/animated-beam"
import { Database } from "lucide-react"

const SnowflakeNode = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    variant?: "fact" | "dimension" | "sub-dimension"
  }
>(({ className, children, variant = "dimension" }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex flex-col items-center justify-center rounded-xl border-2 px-2.5 py-1.5 text-center shadow-md transition-transform duration-300 hover:scale-105",
        variant === "fact"
          ? "border-blue-500 bg-blue-500/10 shadow-blue-500/20 dark:bg-blue-500/15 min-w-[110px]"
          : variant === "dimension"
          ? "border-emerald-500/60 bg-emerald-500/5 shadow-emerald-500/10 dark:bg-emerald-500/10 min-w-[90px]"
          : "border-purple-500/60 bg-purple-500/5 shadow-purple-500/10 dark:bg-purple-500/10 min-w-[80px]",
        className
      )}
    >
      {children}
    </div>
  )
})

SnowflakeNode.displayName = "SnowflakeNode"

export function SnowflakeSchemaBeam() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Center
  const factRef = useRef<HTMLDivElement>(null)

  // Dimension tables (5 around the center, matching the reference photo)
  const dimTopLeftRef = useRef<HTMLDivElement>(null)
  const dimTopRightRef = useRef<HTMLDivElement>(null)
  const dimLeftRef = useRef<HTMLDivElement>(null)
  const dimRightRef = useRef<HTMLDivElement>(null)
  const dimBottomRef = useRef<HTMLDivElement>(null)

  // Sub-dim tables (2 per dimension = 10 total, matching the reference photo)
  const subDimTL1Ref = useRef<HTMLDivElement>(null)
  const subDimTL2Ref = useRef<HTMLDivElement>(null)
  const subDimTR1Ref = useRef<HTMLDivElement>(null)
  const subDimTR2Ref = useRef<HTMLDivElement>(null)
  const subDimL1Ref = useRef<HTMLDivElement>(null)
  const subDimL2Ref = useRef<HTMLDivElement>(null)
  const subDimR1Ref = useRef<HTMLDivElement>(null)
  const subDimR2Ref = useRef<HTMLDivElement>(null)
  const subDimB1Ref = useRef<HTMLDivElement>(null)
  const subDimB2Ref = useRef<HTMLDivElement>(null)

  const SubDimLabel = ({ name }: { name: string }) => (
    <>
      <p className="text-[8px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Sub-Dim</p>
      <p className="text-[10px] font-semibold">{name}</p>
    </>
  )

  const DimLabel = ({ name, icon }: { name: string; icon: string }) => (
    <>
      <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Dim</p>
      <p className="text-xs font-semibold">{icon} {name}</p>
    </>
  )

  return (
    <div
      ref={containerRef}
      className="relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-border bg-card/50 p-4 sm:p-8"
      style={{ minHeight: "560px" }}
    >
      <div className="flex size-full max-w-3xl flex-col items-stretch justify-between gap-4 sm:gap-6" style={{ minHeight: "500px" }}>
        {/* Row 1: Sub-dims top-left, Sub-dims top-right */}
        <div className="flex flex-row items-start justify-between px-2 sm:px-4">
          <div className="flex gap-2">
            <SnowflakeNode ref={subDimTL1Ref} variant="sub-dimension">
              <SubDimLabel name="📆 Month" />
            </SnowflakeNode>
            <SnowflakeNode ref={subDimTL2Ref} variant="sub-dimension">
              <SubDimLabel name="📁 Quarter" />
            </SnowflakeNode>
          </div>
          <div className="flex gap-2">
            <SnowflakeNode ref={subDimTR1Ref} variant="sub-dimension">
              <SubDimLabel name="🏙️ City" />
            </SnowflakeNode>
            <SnowflakeNode ref={subDimTR2Ref} variant="sub-dimension">
              <SubDimLabel name="🗺️ State" />
            </SnowflakeNode>
          </div>
        </div>

        {/* Row 2: Dim top-left, Dim top-right */}
        <div className="flex flex-row items-center justify-between px-8 sm:px-16">
          <SnowflakeNode ref={dimTopLeftRef}>
            <DimLabel name="Date" icon="📅" />
          </SnowflakeNode>
          <SnowflakeNode ref={dimTopRightRef}>
            <DimLabel name="Customer" icon="👤" />
          </SnowflakeNode>
        </div>

        {/* Row 3: Sub-dim left + Dim left, FACT center, Dim right + Sub-dim right */}
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <SnowflakeNode ref={subDimL1Ref} variant="sub-dimension">
              <SubDimLabel name="🏷️ SubCat" />
            </SnowflakeNode>
            <SnowflakeNode ref={dimLeftRef}>
              <DimLabel name="Product" icon="📦" />
            </SnowflakeNode>
          </div>

          <SnowflakeNode ref={factRef} variant="fact" className="mx-2 sm:mx-6">
            <Database className="mx-auto mb-0.5 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <p className="text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Fact</p>
            <p className="text-sm font-bold">Sales</p>
          </SnowflakeNode>

          <div className="flex items-center gap-2">
            <SnowflakeNode ref={dimRightRef}>
              <DimLabel name="Store" icon="🏬" />
            </SnowflakeNode>
            <SnowflakeNode ref={subDimR1Ref} variant="sub-dimension">
              <SubDimLabel name="🌍 Region" />
            </SnowflakeNode>
          </div>
        </div>

        {/* Row 4: Sub-dim left-bottom, Dim bottom, Sub-dim right-bottom */}
        <div className="flex flex-row items-center justify-center">
          <SnowflakeNode ref={dimBottomRef}>
            <DimLabel name="Employee" icon="👨‍💼" />
          </SnowflakeNode>
        </div>

        {/* Row 5: Sub-dims bottom */}
        <div className="flex flex-row items-end justify-center gap-6 sm:gap-10">
          <SnowflakeNode ref={subDimL2Ref} variant="sub-dimension">
            <SubDimLabel name="📁 Category" />
          </SnowflakeNode>
          <SnowflakeNode ref={subDimB1Ref} variant="sub-dimension">
            <SubDimLabel name="🏢 Dept" />
          </SnowflakeNode>
          <SnowflakeNode ref={subDimB2Ref} variant="sub-dimension">
            <SubDimLabel name="📋 Role" />
          </SnowflakeNode>
          <SnowflakeNode ref={subDimR2Ref} variant="sub-dimension">
            <SubDimLabel name="🗺️ Country" />
          </SnowflakeNode>
        </div>
      </div>

      {/* === Fact → Dimension beams (thick, both modes visible) === */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dimTopLeftRef}
        toRef={factRef}
        curvature={-20}
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={3}
        pathOpacity={0.35}
        delay={0}
        duration={4}
        gradientStartColor="#10b981"
        gradientStopColor="#3b82f6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dimTopRightRef}
        toRef={factRef}
        curvature={20}
        reverse
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={3}
        pathOpacity={0.35}
        delay={0.5}
        duration={4}
        gradientStartColor="#3b82f6"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dimLeftRef}
        toRef={factRef}
        curvature={0}
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={3}
        pathOpacity={0.35}
        delay={1.0}
        duration={4}
        gradientStartColor="#10b981"
        gradientStopColor="#3b82f6"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dimRightRef}
        toRef={factRef}
        curvature={0}
        reverse
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={3}
        pathOpacity={0.35}
        delay={1.5}
        duration={4}
        gradientStartColor="#3b82f6"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={dimBottomRef}
        toRef={factRef}
        curvature={0}
        pathColor="var(--beam-path-color, #64748b)"
        pathWidth={3}
        pathOpacity={0.35}
        delay={2.0}
        duration={4}
        gradientStartColor="#10b981"
        gradientStopColor="#3b82f6"
      />

      {/* === Dimension → Sub-Dimension beams (thick, both modes visible) === */}
      {/* Date → Month, Quarter */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimTL1Ref}
        toRef={dimTopLeftRef}
        curvature={-12}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={0.3}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimTL2Ref}
        toRef={dimTopLeftRef}
        curvature={12}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={0.6}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />

      {/* Customer → City, State */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimTR1Ref}
        toRef={dimTopRightRef}
        curvature={-12}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={0.9}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimTR2Ref}
        toRef={dimTopRightRef}
        curvature={12}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={1.2}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />

      {/* Product → SubCat */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimL1Ref}
        toRef={dimLeftRef}
        curvature={0}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={1.5}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />
      {/* Product → Category (bottom-left) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimL2Ref}
        toRef={dimLeftRef}
        curvature={25}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={1.8}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />

      {/* Store → Region */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimR1Ref}
        toRef={dimRightRef}
        curvature={0}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={2.1}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />
      {/* Store → Country (bottom-right) */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimR2Ref}
        toRef={dimRightRef}
        curvature={-25}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={2.4}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />

      {/* Employee → Dept, Role */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimB1Ref}
        toRef={dimBottomRef}
        curvature={-10}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={2.7}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={subDimB2Ref}
        toRef={dimBottomRef}
        curvature={10}
        pathColor="var(--beam-sub-color, #94a3b8)"
        pathWidth={2.5}
        pathOpacity={0.3}
        delay={3.0}
        duration={3.5}
        gradientStartColor="#a855f7"
        gradientStopColor="#10b981"
      />
    </div>
  )
}
