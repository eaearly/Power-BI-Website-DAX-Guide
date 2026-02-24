"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DaxCodeEditor } from "@/components/ui/dax-code-editor";
import { SqlCodeEditor } from "@/components/ui/sql-code-editor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Code2, Database, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type EditorMode = "dax" | "sql";
type ValidationStatus = "idle" | "success" | "error" | "warning";

export function TerminalCodeEditor() {
  const [mode, setMode] = useState<EditorMode>("dax");
  const [status, setStatus] = useState<ValidationStatus>("idle");

  const handleValidationChange = useCallback((newStatus: ValidationStatus) => {
    setStatus(newStatus);
  }, []);

  const handleModeChange = useCallback((newMode: EditorMode) => {
    setMode(newMode);
    setStatus("idle");
  }, []);

  return (
    <div className="dark overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl">
      {/* ── Terminal Title Bar ── */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
        {/* Traffic light dots */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Terminal className="h-3.5 w-3.5" />
            <span className="font-mono">code-editor</span>
          </div>
        </div>

        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-500">
              {mode === "dax" ? (
                <Code2 className="h-3.5 w-3.5 text-yellow-400" />
              ) : (
                <Database className="h-3.5 w-3.5 text-blue-400" />
              )}
              <span>{mode === "dax" ? "DAX Code Editor" : "SQL Code Editor"}</span>
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark w-48 border-zinc-700 bg-zinc-900 text-zinc-200">
            <DropdownMenuItem
              onClick={() => handleModeChange("dax")}
              className={cn(
                "cursor-pointer gap-2 text-xs focus:bg-zinc-800 focus:text-zinc-100",
                mode === "dax" && "bg-zinc-800"
              )}
            >
              <Code2 className="h-3.5 w-3.5 text-yellow-400" />
              DAX Code Editor
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleModeChange("sql")}
              className={cn(
                "cursor-pointer gap-2 text-xs focus:bg-zinc-800 focus:text-zinc-100",
                mode === "sql" && "bg-zinc-800"
              )}
            >
              <Database className="h-3.5 w-3.5 text-blue-400" />
              SQL Code Editor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ── Editor Content ── */}
      <div className="relative min-h-[500px]">
        <AnimatePresence mode="wait">
          {mode === "dax" ? (
            <motion.div
              key="dax-editor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DaxCodeEditor onValidationChange={handleValidationChange} />
            </motion.div>
          ) : (
            <motion.div
              key="sql-editor"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SqlCodeEditor onValidationChange={handleValidationChange} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Terminal Status Bar ── */}
      <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900 px-4 py-1.5">
        <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-mono">
          <span className="flex items-center gap-1">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-colors duration-300",
                status === "idle" && "bg-green-500 animate-pulse",
                status === "success" && "bg-emerald-400",
                status === "error" && "bg-red-500 animate-pulse",
                status === "warning" && "bg-yellow-500 animate-pulse"
              )}
            />
            <span
              className={cn(
                "transition-colors duration-300",
                status === "idle" && "text-zinc-500",
                status === "success" && "text-emerald-400",
                status === "error" && "text-red-400",
                status === "warning" && "text-yellow-400"
              )}
            >
              {status === "idle" && "Ready"}
              {status === "success" && "Valid — No Errors"}
              {status === "error" && "Errors Found"}
              {status === "warning" && "Warnings"}
            </span>
          </span>
          <span className="text-zinc-700">|</span>
          <span>{mode === "dax" ? "DAX" : "SQL"}</span>
        </div>
        <div className="text-[10px] text-zinc-500 font-mono">
          UTF-8 &nbsp;·&nbsp; LF &nbsp;·&nbsp; {mode === "dax" ? "Power BI" : "ANSI SQL"}
        </div>
      </div>
    </div>
  );
}
