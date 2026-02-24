"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

/**
 * Scroll-progress bar — a thin animated bar at the top of the viewport
 * showing how far the user has scrolled down the page.
 */
export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
        rafId = 0;
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-60 h-0.75">
      <motion.div
        className="h-full origin-left bg-linear-to-r from-primary via-yellow-400 to-primary"
        style={{ scaleX: progress }}
      />
    </div>
  );
}

/**
 * Floating "back-to-top" button that appears after scrolling down.
 */
export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let rafId = 0;
    const toggle = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setShow(window.scrollY > 400);
        rafId = 0;
      });
    };
    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
    return () => {
      window.removeEventListener("scroll", toggle);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 shadow-lg backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
