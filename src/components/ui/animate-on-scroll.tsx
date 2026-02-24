"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-scale"
  | "blur-in";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

const variantStyles: Record<AnimationVariant, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-down": {
    from: "opacity-0 -translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-left": {
    from: "opacity-0 -translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "fade-right": {
    from: "opacity-0 translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "fade-scale": {
    from: "opacity-0 scale-95",
    to: "opacity-100 scale-100",
  },
  "blur-in": {
    from: "opacity-0 blur-sm",
    to: "opacity-100 blur-0",
  },
};

/* ------------------------------------------------------------------ */
/*  Shared IntersectionObserver — one observer for ALL instances       */
/* ------------------------------------------------------------------ */
type ObserverCallback = (isIntersecting: boolean) => void;
const observedElements = new Map<Element, ObserverCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const cb = observedElements.get(entry.target);
          if (cb) cb(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );
  }
  return sharedObserver;
}

function observe(el: Element, callback: ObserverCallback) {
  observedElements.set(el, callback);
  getSharedObserver().observe(el);
}

function unobserve(el: Element) {
  observedElements.delete(el);
  sharedObserver?.unobserve(el);
  if (observedElements.size === 0 && sharedObserver) {
    sharedObserver.disconnect();
    sharedObserver = null;
  }
}

export function AnimateOnScroll({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    observe(el, (isIntersecting) => {
      if (isIntersecting) {
        setIsVisible(true);
        if (once) unobserve(el);
      } else if (!once) {
        setIsVisible(false);
      }
    });

    return () => unobserve(el);
  }, [once]);

  const { from, to } = variantStyles[variant];

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform,filter]",
        isVisible ? to : from,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Staggered animation wrapper — each child gets an incremental delay.
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  variant?: AnimationVariant;
  duration?: number;
  baseDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 100,
  variant = "fade-up",
  duration = 500,
  baseDelay = 0,
}: StaggerContainerProps) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {items.map((child, i) => (
        <AnimateOnScroll
          key={i}
          variant={variant}
          delay={baseDelay + i * staggerDelay}
          duration={duration}
        >
          {child}
        </AnimateOnScroll>
      ))}
    </div>
  );
}
