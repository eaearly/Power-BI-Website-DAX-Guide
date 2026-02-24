"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
    children: ReactNode;
    /** Minimum height to reserve before content loads (prevents layout shift) */
    minHeight?: number;
    /** How far before the section enters the viewport to start rendering (px) */
    rootMargin?: string;
    className?: string;
    id?: string;
}

/**
 * Defers mounting its children until the placeholder enters
 * (or is about to enter) the viewport. Once mounted the content
 * stays mounted — no re-unmounting on scroll-away.
 */
export function LazySection({
    children,
    minHeight = 200,
    rootMargin = "600px 0px",
    className,
    id,
}: LazySectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setMounted(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <section ref={ref} id={id} className={className}>
            {mounted ? children : <div style={{ minHeight }} />}
        </section>
    );
}
