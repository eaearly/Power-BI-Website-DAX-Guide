"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState, useMemo, memo } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  className?: string;
  showLineNumbers?: boolean;
}

/** Parse DAX code and return syntax-highlighted JSX */
function highlightDAX(code: string): React.ReactNode[] {
  const lines = code.split("\n");
  return lines.map((line, lineIdx) => {
    const tokens: React.ReactNode[] = [];
    let remaining = line;
    let key = 0;

    while (remaining.length > 0) {
      // Comments
      const commentMatch = remaining.match(/^(\/\/.*|--.*)/);
      if (commentMatch) {
        tokens.push(<span key={key++} className="dax-comment">{commentMatch[0]}</span>);
        remaining = remaining.slice(commentMatch[0].length);
        continue;
      }

      // Strings
      const stringMatch = remaining.match(/^"[^"]*"/);
      if (stringMatch) {
        tokens.push(<span key={key++} className="dax-string">{stringMatch[0]}</span>);
        remaining = remaining.slice(stringMatch[0].length);
        continue;
      }

      // Table references (single-quoted)
      const tableMatch = remaining.match(/^'[^']*'/);
      if (tableMatch) {
        tokens.push(<span key={key++} className="dax-table">{tableMatch[0]}</span>);
        remaining = remaining.slice(tableMatch[0].length);
        continue;
      }

      // Column references [Column Name]
      const colMatch = remaining.match(/^\[[^\]]*\]/);
      if (colMatch) {
        tokens.push(<span key={key++} className="dax-column">{colMatch[0]}</span>);
        remaining = remaining.slice(colMatch[0].length);
        continue;
      }

      // Numbers
      const numMatch = remaining.match(/^\b\d+(\.\d+)?\b/);
      if (numMatch) {
        tokens.push(<span key={key++} className="dax-number">{numMatch[0]}</span>);
        remaining = remaining.slice(numMatch[0].length);
        continue;
      }

      // Keywords (DAX)
      const kwMatch = remaining.match(
        /^\b(DEFINE|EVALUATE|ORDER BY|ASC|DESC|VAR|RETURN|MEASURE|COLUMN|TABLE|IN|NOT|AND|OR|TRUE|FALSE|BLANK)\b/i
      );
      if (kwMatch) {
        tokens.push(<span key={key++} className="dax-keyword">{kwMatch[0]}</span>);
        remaining = remaining.slice(kwMatch[0].length);
        continue;
      }

      // Functions
      const fnMatch = remaining.match(
        /^\b(CALCULATE|FILTER|ALL|ALLEXCEPT|ALLSELECTED|VALUES|DISTINCT|RELATED|RELATEDTABLE|SUMMARIZE|SUMMARIZECOLUMNS|ADDCOLUMNS|SELECTCOLUMNS|TOPN|RANKX|EARLIER|EARLIEST|HASONEVALUE|SELECTEDVALUE|ISBLANK|IF|SWITCH|DIVIDE|SUM|SUMX|AVERAGE|AVERAGEX|COUNT|COUNTX|COUNTA|COUNTAX|COUNTBLANK|COUNTROWS|MIN|MINX|MAX|MAXX|CALENDAR|CALENDARAUTO|DATE|DATESYTD|DATESQTD|DATESMTD|TOTALYTD|TOTALQTD|TOTALMTD|SAMEPERIODLASTYEAR|PREVIOUSMONTH|PREVIOUSQUARTER|PREVIOUSYEAR|NEXTDAY|NEXTMONTH|NEXTQUARTER|NEXTYEAR|DATEADD|DATESBETWEEN|DATESINPERIOD|PARALLELPERIOD|STARTOFMONTH|STARTOFQUARTER|STARTOFYEAR|ENDOFMONTH|ENDOFQUARTER|ENDOFYEAR|YEAR|MONTH|DAY|HOUR|MINUTE|SECOND|NOW|TODAY|FORMAT|CONCATENATE|CONCATENATEX|LEFT|RIGHT|MID|LEN|TRIM|UPPER|LOWER|SUBSTITUTE|SEARCH|FIND|EXACT|REPT|UNICHAR|UNICODE|COMBINEVALUES|ROUND|ROUNDUP|ROUNDDOWN|INT|TRUNC|ABS|SIGN|SQRT|POWER|EXP|LN|LOG|LOG10|MOD|RAND|RANDBETWEEN|IFERROR|ISFILTERED|ISCROSSFILTERED|USERELATIONSHIP|CROSSFILTER|TREATAS|INTERSECT|UNION|EXCEPT|NATURALINNERJOIN|NATURALLEFTOUTERJOIN|GENERATE|GENERATEALL|ROW|DATATABLE|GENERATESERIES|KEEPFILTERS|REMOVEFILTERS|LOOKUPVALUE|PATH|PATHCONTAINS|PATHITEM|PATHITEMREVERSE|PATHLENGTH|SELECTEDVALUE|NAMEOF|CONTAINSROW|CONTAINS|GROUPBY|ROLLUP|ROLLUPADDISSUBTOTAL|ISSUBTOTAL|IGNORE|NONVISUAL)\b/i
      );
      if (fnMatch) {
        tokens.push(<span key={key++} className="dax-function">{fnMatch[0]}</span>);
        remaining = remaining.slice(fnMatch[0].length);
        continue;
      }

      // Operator / whitespace / other single chars
      tokens.push(<span key={key++}>{remaining[0]}</span>);
      remaining = remaining.slice(1);
    }

    return (
      <span key={lineIdx}>
        {tokens}
        {lineIdx < lines.length - 1 ? "\n" : ""}
      </span>
    );
  });
}

export const CodeBlock = memo(function CodeBlock({
  code,
  language = "dax",
  title,
  className,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  /* Memoize expensive syntax highlighting — only recompute if code or language changes */
  const highlighted = useMemo(() => {
    if (language !== "dax") return null;
    return highlightDAX(code);
  }, [code, language]);

  const highlightedLines = useMemo(() => {
    if (language !== "dax" || !showLineNumbers) return null;
    return lines.map((line) => highlightDAX(line));
  }, [code, language, showLineNumbers, lines]);

  return (
    <div className={cn("group relative overflow-hidden rounded-lg border border-border", className)}>
      {/* Header */}
      {title && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">{title}</span>
          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-yellow-700 dark:text-primary">
            {language}
          </span>
        </div>
      )}

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="focus-ring absolute right-3 top-2 rounded-md bg-card/80 p-1.5 text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity hover:text-foreground group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
      </button>

      {/* Code */}
      <pre className="m-0 overflow-x-auto rounded-none border-0 bg-muted/30 p-4">
        <code className="text-sm leading-relaxed">
          {showLineNumbers ? (
            <table className="border-collapse">
              <tbody>
                {lines.map((line, i) => (
                  <tr key={i}>
                    <td className="select-none pr-4 text-right text-xs text-muted-foreground/50">
                      {i + 1}
                    </td>
                    <td className="whitespace-pre">
                      {highlightedLines ? highlightedLines[i] : line}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>{highlighted ?? code}</>
          )}
        </code>
      </pre>
    </div>
  );
});
