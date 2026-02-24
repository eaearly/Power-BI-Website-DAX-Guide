"use client";

import { StarsBackground } from "@/components/ui/stars-background";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ScrollProgress, ScrollToTop } from "@/components/ui/scroll-progress";

export function GlobalEffects() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
      <StarsBackground starDensity={0.00015} minTwinkleSpeed={0.4} maxTwinkleSpeed={1.5} />
      <div className="hidden md:block">
        <SmoothCursor />
      </div>
    </>
  );
}
