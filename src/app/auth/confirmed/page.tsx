"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmedPage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md text-center"
      >
        {/* Animated check icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
        >
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-2xl font-semibold text-foreground"
        >
          You&apos;re all set!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-3 text-base text-muted-foreground"
        >
          Your email has been confirmed and your account is ready.
          <br />
          You can safely close this tab.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <button
            onClick={() => window.close()}
            className="cursor-pointer rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-medium text-[var(--color-primary-foreground)] transition-opacity hover:opacity-90"
          >
            Close this tab
          </button>
          <a
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            or go to homepage
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
