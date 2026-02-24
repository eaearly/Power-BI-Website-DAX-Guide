"use client";

import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Copy,
  Check,
  ChevronDown,
  Code2,
  Wand2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { format as sqlFormat } from "sql-formatter";

/* ------------------------------------------------------------------ */
/*  SQL Keywords & Functions                                           */
/* ------------------------------------------------------------------ */

const SQL_KEYWORDS = [
  "SELECT", "FROM", "WHERE", "AND", "OR", "NOT", "IN", "BETWEEN", "LIKE", "IS",
  "NULL", "AS", "ON", "JOIN", "INNER", "LEFT", "RIGHT", "FULL", "OUTER", "CROSS",
  "GROUP", "BY", "ORDER", "ASC", "DESC", "HAVING", "LIMIT", "OFFSET", "DISTINCT",
  "UNION", "ALL", "INTERSECT", "EXCEPT", "EXISTS", "ANY", "SOME",
  "INSERT", "INTO", "VALUES", "UPDATE", "SET", "DELETE", "CREATE", "TABLE",
  "ALTER", "DROP", "INDEX", "VIEW", "MATERIALIZED", "WITH", "RECURSIVE",
  "CASE", "WHEN", "THEN", "ELSE", "END",
  "TRUE", "FALSE", "DEFAULT", "PRIMARY", "KEY", "FOREIGN", "REFERENCES",
  "CONSTRAINT", "UNIQUE", "CHECK", "CASCADE", "NULLS", "FIRST", "LAST",
  "OVER", "PARTITION", "ROWS", "RANGE", "UNBOUNDED", "PRECEDING", "FOLLOWING",
  "CURRENT", "ROW", "FILTER", "WITHIN", "GRANT", "REVOKE", "TRUNCATE",
  "BEGIN", "COMMIT", "ROLLBACK", "SAVEPOINT", "TRANSACTION",
  "IF", "THEN", "ELSIF", "LOOP", "WHILE", "FOR", "RETURN", "DECLARE",
  "FETCH", "CURSOR", "OPEN", "CLOSE", "DEALLOCATE",
  "LATERAL", "TABLESAMPLE", "WINDOW", "GROUPING", "SETS", "ROLLUP", "CUBE",
  "INCLUDE", "REFRESH", "ANALYZE", "EXPLAIN", "VACUUM",
];

const SQL_FUNCTIONS = [
  "COUNT", "SUM", "AVG", "MIN", "MAX", "ARRAY_AGG", "STRING_AGG", "BOOL_AND", "BOOL_OR",
  "ROW_NUMBER", "RANK", "DENSE_RANK", "NTILE", "LAG", "LEAD",
  "FIRST_VALUE", "LAST_VALUE", "NTH_VALUE", "PERCENT_RANK", "CUME_DIST",
  "CONCAT", "LENGTH", "UPPER", "LOWER", "TRIM", "LTRIM", "RTRIM",
  "SUBSTRING", "REPLACE", "POSITION", "LEFT", "RIGHT", "LPAD", "RPAD",
  "INITCAP", "REVERSE", "REPEAT", "SPLIT_PART", "TRANSLATE", "REGEXP_REPLACE",
  "REGEXP_MATCH", "REGEXP_MATCHES",
  "ABS", "CEIL", "CEILING", "FLOOR", "ROUND", "TRUNC", "MOD", "POWER", "SQRT",
  "LOG", "LN", "EXP", "SIGN", "RANDOM", "PI", "GREATEST", "LEAST",
  "NOW", "CURRENT_DATE", "CURRENT_TIMESTAMP", "DATE_TRUNC", "DATE_PART",
  "EXTRACT", "AGE", "INTERVAL", "TO_DATE", "TO_TIMESTAMP", "TO_CHAR",
  "MAKE_DATE", "MAKE_TIMESTAMP",
  "CAST", "COALESCE", "NULLIF",
  "CASE", "IIF",
  "JSON_BUILD_OBJECT", "JSON_AGG", "JSONB_SET", "JSONB_EXTRACT_PATH",
  "EXISTS", "NOT", "IN", "BETWEEN", "LIKE", "ILIKE", "SIMILAR",
  "GENERATE_SERIES", "UNNEST", "ARRAY_LENGTH",
];

const ALL_SQL_IDENTIFIERS = [...new Set([...SQL_KEYWORDS, ...SQL_FUNCTIONS])];

/* ------------------------------------------------------------------ */
/*  SQL Template Snippets                                              */
/* ------------------------------------------------------------------ */

const SQL_TEMPLATES = [
  {
    label: "Basic SELECT",
    category: "Queries",
    code: `SELECT\n    column1,\n    column2\nFROM table_name\nWHERE condition\nORDER BY column1;`,
  },
  {
    label: "JOIN Query",
    category: "Queries",
    code: `SELECT\n    a.column1,\n    b.column2\nFROM table_a a\nINNER JOIN table_b b ON a.id = b.a_id\nWHERE a.status = 'active';`,
  },
  {
    label: "GROUP BY with Aggregation",
    category: "Queries",
    code: `SELECT\n    category,\n    COUNT(*) AS total_count,\n    SUM(amount) AS total_amount,\n    AVG(amount) AS avg_amount\nFROM sales\nGROUP BY category\nHAVING SUM(amount) > 1000\nORDER BY total_amount DESC;`,
  },
  {
    label: "CTE (Common Table Expression)",
    category: "Advanced",
    code: `WITH monthly_totals AS (\n    SELECT\n        DATE_TRUNC('month', order_date) AS month,\n        SUM(amount) AS total\n    FROM orders\n    GROUP BY DATE_TRUNC('month', order_date)\n)\nSELECT\n    month,\n    total,\n    AVG(total) OVER () AS overall_avg\nFROM monthly_totals\nORDER BY month;`,
  },
  {
    label: "Window Function",
    category: "Advanced",
    code: `SELECT\n    employee_name,\n    department,\n    salary,\n    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,\n    SUM(salary) OVER (PARTITION BY department) AS dept_total\nFROM employees;`,
  },
  {
    label: "Subquery with EXISTS",
    category: "Advanced",
    code: `SELECT c.customer_name, c.email\nFROM customers c\nWHERE EXISTS (\n    SELECT 1\n    FROM orders o\n    WHERE o.customer_id = c.customer_id\n        AND o.order_date >= '2024-01-01'\n);`,
  },
  {
    label: "Star Schema Query",
    category: "Power BI",
    code: `SELECT\n    d.year,\n    d.month_name,\n    p.category,\n    SUM(s.quantity) AS total_qty,\n    SUM(s.quantity * p.unit_price) AS revenue\nFROM fact_sales s\nINNER JOIN dim_date d ON s.date_key = d.date_key\nINNER JOIN dim_product p ON s.product_key = p.product_key\nWHERE d.year = 2024\nGROUP BY d.year, d.month_name, p.category\nORDER BY revenue DESC;`,
  },
  {
    label: "CREATE INDEX (DirectQuery)",
    category: "Power BI",
    code: `-- Index fact table foreign keys for DirectQuery\nCREATE INDEX idx_sales_date ON fact_sales(date_key);\nCREATE INDEX idx_sales_product ON fact_sales(product_key);\nCREATE INDEX idx_sales_customer ON fact_sales(customer_key);`,
  },
];

/* ------------------------------------------------------------------ */
/*  Token Error Type                                                   */
/* ------------------------------------------------------------------ */

interface TokenError {
  line: number;
  column: number;
  length: number;
  token: string;
  message: string;
  suggestion?: string;
}

interface ValidationResult {
  status: "success" | "error" | "warning";
  message: string;
  suggestions?: string[];
  lineErrors?: { line: number; message: string }[];
  tokenErrors?: TokenError[];
}

/* ------------------------------------------------------------------ */
/*  Validation Logic                                                   */
/* ------------------------------------------------------------------ */

function validateSQLCode(code: string): ValidationResult {
  const trimmed = code.trim();

  if (!trimmed) {
    return {
      status: "warning",
      message: "Empty code. Write a SQL query to validate.",
    };
  }

  const tokenErrors: TokenError[] = [];
  const suggestions: string[] = [];
  // ⚡ KEY FIX: split RAW code so line numbers match the editor
  const lines = code.split("\n");

  // Remove comments for analysis
  const codeNoComments = trimmed
    .replace(/--.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  /* ── Detect standalone numbers / gibberish / plain words (no real SQL) ── */
  const stripped = codeNoComments
    .replace(/'[^']*'/g, "")
    .replace(/"[^"]*"/g, "")
    .trim();
  const hasKnownKeyword = ALL_SQL_IDENTIFIERS.some((kw) =>
    new RegExp(`\\b${kw}\\b`, "i").test(codeNoComments)
  );

  if (!hasKnownKeyword && stripped.length > 0) {
    // Only numbers / operators
    if (/^[\s\d.,+\-*/()=;]*$/.test(stripped)) {
      for (let i = 0; i < lines.length; i++) {
        const clean = lines[i].replace(/--.*$/, "").trim();
        if (!clean) continue;
        const numMatch = /\b(\d[\d.,]*)\b/.exec(clean);
        if (numMatch) {
          tokenErrors.push({
            line: i + 1, column: lines[i].indexOf(numMatch[1]), length: numMatch[1].length,
            token: numMatch[1],
            message: "Standalone number is not valid SQL — write a query",
            suggestion: "Write a SQL query, e.g.:\nSELECT column FROM table WHERE condition;",
          });
          break;
        }
      }
    } else {
      // Plain words / gibberish — flag each unrecognized word
      for (let i = 0; i < lines.length; i++) {
        const clean = lines[i].replace(/--.*$/, "").replace(/\/\*.*?\*\//g, "").trim();
        if (!clean) continue;
        const words = clean.split(/[\s,;()=+\-*/]+/).filter(Boolean);
        for (const word of words) {
          const plainWord = word.replace(/['"]/g, "").trim();
          if (!plainWord) continue;
          if (/^\d+(\.\d+)?$/.test(plainWord)) continue;
          if (ALL_SQL_IDENTIFIERS.some(k => k.toUpperCase() === plainWord.toUpperCase())) continue;
          const col = lines[i].indexOf(word);
          tokenErrors.push({
            line: i + 1,
            column: col >= 0 ? col : 0,
            length: word.length,
            token: word,
            message: `'${word}' is not a valid SQL keyword, function, or identifier`,
            suggestion: "SQL code must start with a valid statement like SELECT, CREATE, INSERT, UPDATE, or DELETE.\nOr pick a template from the Templates dropdown.",
          });
        }
        if (tokenErrors.length > 0) break;
      }
      if (tokenErrors.length === 0) {
        tokenErrors.push({
          line: 1, column: 0, length: lines[0].trim().length, token: lines[0].trim(),
          message: "Code does not contain any valid SQL keywords or functions",
          suggestion: "Start with SELECT, CREATE, INSERT, UPDATE, or DELETE.\nOr pick a template from the Templates dropdown.",
        });
      }
    }

    // Early return for non-SQL input
    if (tokenErrors.length > 0) {
      const errors: { line: number; message: string }[] = [];
      for (const te of tokenErrors) {
        if (!errors.some(e => e.line === te.line)) {
          errors.push({ line: te.line, message: te.message });
        }
      }
      return {
        status: "error",
        message: `Found ${tokenErrors.length} error${tokenErrors.length > 1 ? "s" : ""} in your SQL code`,
        lineErrors: errors,
        tokenErrors,
      };
    }
  }

  // --- Parentheses balance with exact positions ---
  let parenCount = 0;
  const openParenStack: { line: number; column: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/--.*$/, "").replace(/'[^']*'/g, "");
    for (let j = 0; j < lineNoComment.length; j++) {
      const ch = lineNoComment[j];
      if (ch === "(") {
        parenCount++;
        openParenStack.push({ line: i + 1, column: j });
      }
      if (ch === ")") {
        parenCount--;
        if (parenCount < 0) {
          tokenErrors.push({
            line: i + 1,
            column: j,
            length: 1,
            token: ")",
            message: "Unexpected closing parenthesis ')'",
            suggestion: "Remove this ')' or add a matching '(' before it.",
          });
          parenCount = 0;
          openParenStack.length = 0;
        } else {
          openParenStack.pop();
        }
      }
    }
  }
  if (parenCount > 0) {
    for (const pos of openParenStack) {
      tokenErrors.push({
        line: pos.line,
        column: pos.column,
        length: 1,
        token: "(",
        message: "Unmatched opening parenthesis '('",
        suggestion: "Add a closing ')' to match this '('.",
      });
    }
  }

  // --- Unclosed string literals ---
  let inString = false;
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/--.*$/, "");
    let quoteCount = 0;
    let lastQuoteIdx = -1;
    for (let j = 0; j < lineNoComment.length; j++) {
      if (lineNoComment[j] === "'") {
        quoteCount++;
        lastQuoteIdx = j;
      }
    }
    if (quoteCount % 2 !== 0) {
      inString = !inString;
      if (inString && lastQuoteIdx >= 0) {
        tokenErrors.push({
          line: i + 1,
          column: lastQuoteIdx,
          length: 1,
          token: "'",
          message: "Unclosed string literal",
          suggestion: "Add a closing single quote (') to complete the string.",
        });
      }
    }
  }

  // --- Per-line checks ---
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNoComment = line.replace(/--.*$/, "").trim();

    if (!lineNoComment || lineNoComment.startsWith("--")) continue;

    // Double comma
    const doubleComma = /,,/.exec(lineNoComment);
    if (doubleComma) {
      const col = line.indexOf(",,");
      tokenErrors.push({
        line: i + 1,
        column: col >= 0 ? col : doubleComma.index,
        length: 2,
        token: ",,",
        message: "Double comma detected",
        suggestion: "Remove the extra comma.",
      });
    }

    // Trailing comma before clause keywords
    if (/,\s*$/.test(lineNoComment)) {
      const nextNonEmpty = lines.slice(i + 1).find((l) => l.trim() && !l.trim().startsWith("--"));
      if (nextNonEmpty && /^\s*(FROM|WHERE|GROUP|ORDER|HAVING|INNER|LEFT|RIGHT|FULL|CROSS|JOIN|ON|LIMIT|OFFSET|UNION|INTERSECT|EXCEPT)\b/i.test(nextNonEmpty)) {
        const keyword = nextNonEmpty.trim().split(/\s/)[0].toUpperCase();
        const commaIdx = line.lastIndexOf(",");
        tokenErrors.push({
          line: i + 1,
          column: commaIdx >= 0 ? commaIdx : 0,
          length: 1,
          token: ",",
          message: `Trailing comma before ${keyword}`,
          suggestion: `Remove the comma. The last column before ${keyword} should not have a trailing comma.`,
        });
      }
    }

    // SELECT *
    const starMatch = /\bSELECT\s+(\*)/i.exec(lineNoComment);
    if (starMatch) {
      const col = line.toUpperCase().indexOf("*", line.toUpperCase().indexOf("SELECT"));
      suggestions.push(`Line ${i + 1}: SELECT * is not recommended. Specify explicit column names for better performance and clarity.`);
      if (col >= 0) {
        tokenErrors.push({
          line: i + 1,
          column: col,
          length: 1,
          token: "*",
          message: "SELECT * is not recommended in production queries",
          suggestion: "Replace * with explicit column names for better performance.",
        });
      }
    }
  }

  // --- Unknown functions with token positions ---
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/--.*$/, "");
    const funcCallRegex = /\b([A-Z_][A-Z0-9_]*)\s*\(/gi;
    let match;
    while ((match = funcCallRegex.exec(lineNoComment)) !== null) {
      const funcName = match[1].toUpperCase();
      // Skip very short aliases (single letters, common table aliases)
      if (funcName.length <= 2) continue;
      if (!ALL_SQL_IDENTIFIERS.includes(funcName)) {
        const similar = findSimilar(funcName, [...SQL_FUNCTIONS, ...SQL_KEYWORDS]);
        tokenErrors.push({
          line: i + 1,
          column: match.index,
          length: match[1].length,
          token: match[1],
          message: `'${match[1]}' is not a recognized SQL function`,
          suggestion: similar
            ? `Did you mean '${similar}'? Replace '${match[1]}' with '${similar}'.`
            : `'${match[1]}' is not a standard SQL function. Check the spelling.`,
        });
      }
    }
  }

  // --- HAVING without GROUP BY ---
  if (/\bHAVING\b/i.test(codeNoComments) && !/\bGROUP\s+BY\b/i.test(codeNoComments)) {
    for (let i = 0; i < lines.length; i++) {
      const havingMatch = /\b(HAVING)\b/i.exec(lines[i]);
      if (havingMatch) {
        tokenErrors.push({
          line: i + 1,
          column: havingMatch.index,
          length: havingMatch[1].length,
          token: havingMatch[1],
          message: "HAVING clause without GROUP BY",
          suggestion: "HAVING filters grouped results. Add a GROUP BY clause, or use WHERE instead.",
        });
        break;
      }
    }
  }

  // --- JOIN without ON ---
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/--.*$/, "");
    const joinMatch = /\b((?:INNER|LEFT|RIGHT|FULL)?\s*JOIN)\b/i.exec(lineNoComment);
    if (joinMatch && !/\bCROSS\s+JOIN\b/i.test(lineNoComment) && !/\bNATURAL\b/i.test(lineNoComment)) {
      const restOfQuery = lines.slice(i, Math.min(i + 3, lines.length)).join(" ");
      if (!/\bON\b/i.test(restOfQuery) && !/\bUSING\b/i.test(restOfQuery)) {
        tokenErrors.push({
          line: i + 1,
          column: joinMatch.index,
          length: joinMatch[1].length,
          token: joinMatch[1],
          message: "JOIN without ON or USING clause",
          suggestion: "Specify the join condition: JOIN table ON a.id = b.id",
        });
      }
    }
  }

  // --- WHERE with aggregate function ---
  const whereMatch = codeNoComments.match(/\bWHERE\b([\s\S]*?)(?:\bGROUP\b|\bORDER\b|\bLIMIT\b|\bHAVING\b|;|$)/i);
  if (whereMatch) {
    const aggInWhere = /\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.exec(whereMatch[1]);
    if (aggInWhere) {
      suggestions.push("Aggregate function used in WHERE clause. Use HAVING instead — WHERE filters rows before grouping, HAVING filters after.");
    }
  }

  // --- GROUP BY without aggregate ---
  if (/\bGROUP\s+BY\b/i.test(codeNoComments) && !/\b(COUNT|SUM|AVG|MIN|MAX|ARRAY_AGG|STRING_AGG)\s*\(/i.test(codeNoComments)) {
    suggestions.push("GROUP BY used without any aggregate function (COUNT, SUM, AVG, etc.). This may be unintentional.");
  }

  // --- Missing trailing semicolon for multi-statement ---
  const statements = codeNoComments.split(";").filter((s) => s.trim());
  if (statements.length > 1 && !codeNoComments.trim().endsWith(";")) {
    suggestions.push("Multiple statements detected but missing trailing semicolon.");
  }

  // Try sql-formatter for additional validation
  try {
    sqlFormat(trimmed, { language: "postgresql" });
  } catch {
    suggestions.push("sql-formatter could not fully parse the query. There may be a structural syntax issue.");
  }

  // Build lineErrors from tokenErrors
  const errors: { line: number; message: string }[] = [];
  const lineErrorMap = new Map<number, string>();
  for (const te of tokenErrors) {
    if (!lineErrorMap.has(te.line)) {
      lineErrorMap.set(te.line, te.message);
    }
  }
  for (const [line, message] of lineErrorMap) {
    errors.push({ line, message });
  }

  if (tokenErrors.length > 0) {
    return {
      status: "error",
      message: `Found ${tokenErrors.length} error${tokenErrors.length > 1 ? "s" : ""} in your SQL code`,
      lineErrors: errors,
      tokenErrors,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    };
  }

  if (suggestions.length > 0) {
    return {
      status: "warning",
      message: "SQL query parsed with suggestions",
      suggestions,
    };
  }

  return {
    status: "success",
    message: "SQL query looks valid! No syntax issues detected.",
  };
}

/* ------------------------------------------------------------------ */
/*  Autocomplete                                                       */
/* ------------------------------------------------------------------ */

function getSQLSuggestions(code: string, cursorPos: number): string[] {
  const beforeCursor = code.slice(0, cursorPos);
  const wordMatch = beforeCursor.match(/\b([A-Z_][A-Z0-9_]*)$/i);
  if (!wordMatch) return [];
  const partial = wordMatch[1].toUpperCase();
  if (partial.length < 2) return [];
  return ALL_SQL_IDENTIFIERS.filter(
    (kw) => kw.startsWith(partial) && kw !== partial
  ).slice(0, 8);
}

/* ------------------------------------------------------------------ */
/*  Utility                                                            */
/* ------------------------------------------------------------------ */

function findSimilar(target: string, candidates: string[]): string | null {
  let bestMatch: string | null = null;
  let bestDist = Infinity;
  for (const c of candidates) {
    const d = levenshtein(target, c);
    if (d < bestDist && d <= 3) {
      bestDist = d;
      bestMatch = c;
    }
  }
  return bestMatch;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/* ------------------------------------------------------------------ */
/*  Sample Code                                                        */
/* ------------------------------------------------------------------ */

const SAMPLE_SQL = `-- Try writing your SQL code here!
-- Example: Star schema query with aggregation

SELECT
    d.year,
    d.month_name,
    p.category,
    COUNT(*) AS transaction_count,
    SUM(s.quantity) AS total_quantity,
    SUM(s.quantity * p.unit_price) AS total_revenue
FROM sales s
INNER JOIN dim_date d ON s.date_key = d.date_key
INNER JOIN products p ON s.product_id = p.product_id
WHERE d.year = 2024
GROUP BY d.year, d.month_name, p.category
ORDER BY total_revenue DESC;`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SqlCodeEditor({ onValidationChange }: { onValidationChange?: (status: "idle" | "success" | "error" | "warning") => void }) {
  const [code, setCode] = useState(SAMPLE_SQL);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [acSuggestions, setAcSuggestions] = useState<string[]>([]);
  const [showAcSuggestions, setShowAcSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleRun = useCallback(() => {
    const validationResult = validateSQLCode(code);
    setResult(validationResult);
    setShowAcSuggestions(false);
    onValidationChange?.(validationResult.status);
  }, [code, onValidationChange]);

  const handleReset = () => {
    setCode(SAMPLE_SQL);
    setResult(null);
    setAcSuggestions([]);
    setShowAcSuggestions(false);
    onValidationChange?.("idle");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    try {
      const formatted = sqlFormat(code, {
        language: "postgresql",
        tabWidth: 4,
        keywordCase: "upper",
      });
      setCode(formatted);
      setResult(null);
    } catch {
      setResult({
        status: "error",
        message: "Could not format — check for structural syntax errors first.",
      });
    }
  };

  const handleInsertTemplate = (templateCode: string) => {
    setCode(templateCode);
    setResult(null);
    setAcSuggestions([]);
    setShowAcSuggestions(false);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    setResult(null);
    onValidationChange?.("idle");
    const cursorPos = e.target.selectionStart;
    const sug = getSQLSuggestions(newCode, cursorPos);
    setAcSuggestions(sug);
    setShowAcSuggestions(sug.length > 0);
  };

  const applySuggestion = (suggestion: string) => {
    if (!textareaRef.current) return;
    const cursorPos = textareaRef.current.selectionStart;
    const beforeCursor = code.slice(0, cursorPos);
    const afterCursor = code.slice(cursorPos);
    const wordMatch = beforeCursor.match(/\b([A-Z_][A-Z0-9_]*)$/i);
    if (wordMatch) {
      const newBefore = beforeCursor.slice(0, -wordMatch[1].length) + suggestion;
      setCode(newBefore + afterCursor);
      setShowAcSuggestions(false);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = newBefore.length;
          textareaRef.current.selectionEnd = newBefore.length;
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showAcSuggestions && acSuggestions.length > 0) {
      if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        applySuggestion(acSuggestions[0]);
      }
      if (e.key === "Escape") {
        setShowAcSuggestions(false);
      }
    }
  };

  const lines = code.split("\n");
  const errorLines = new Set(result?.lineErrors?.map((e) => e.line) ?? []);

  // Build token error map per line
  const tokenErrorsByLine = new Map<number, TokenError[]>();
  if (result?.tokenErrors) {
    for (const te of result.tokenErrors) {
      const arr = tokenErrorsByLine.get(te.line) || [];
      arr.push(te);
      tokenErrorsByLine.set(te.line, arr);
    }
  }

  function renderTokenHighlights(lineIndex: number, lineText: string) {
    const lineNum = lineIndex + 1;
    const tErrors = tokenErrorsByLine.get(lineNum);
    if (!tErrors || tErrors.length === 0) return null;
    const sorted = [...tErrors].sort((a, b) => a.column - b.column);
    const spans: React.ReactNode[] = [];
    let lastEnd = 0;
    for (let i = 0; i < sorted.length; i++) {
      const te = sorted[i];
      if (te.column > lastEnd) {
        spans.push(
          <span key={`gap-${i}`} className="invisible">{lineText.slice(lastEnd, te.column)}</span>
        );
      }
      spans.push(
        <span key={`err-${i}`} className="relative inline-block" title={te.message}>
          <span className="invisible">{lineText.slice(te.column, te.column + te.length)}</span>
          <span className="absolute inset-x-0 bottom-0 border-b-2 border-red-500 rounded-sm" style={{ borderBottomStyle: "dashed" }} />
          <span className="absolute inset-0 bg-red-500/15 rounded-sm" />
        </span>
      );
      lastEnd = te.column + te.length;
    }
    if (lastEnd < lineText.length) {
      spans.push(<span key="rest" className="invisible">{lineText.slice(lastEnd)}</span>);
    }
    return (
      <>{spans}</>
    );
  }

  // Group templates by category
  const templateCategories = [...new Set(SQL_TEMPLATES.map((t) => t.category))];

  return (
    <Card className="overflow-hidden border-border hover:translate-y-0 hover:shadow-sm">
      {/* Toolbar */}
      <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
        <CardTitle className="text-sm font-semibold">SQL Code Editor</CardTitle>
        <div className="flex items-center gap-2">
          {/* Template Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-foreground">
                <Code2 className="h-3.5 w-3.5" />
                Templates
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {templateCategories.map((cat, ci) => (
                <div key={cat}>
                  {ci > 0 && <DropdownMenuSeparator />}
                  <DropdownMenuLabel>{cat}</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    {SQL_TEMPLATES.filter((t) => t.category === cat).map((t) => (
                      <DropdownMenuItem
                        key={t.label}
                        onClick={() => handleInsertTemplate(t.code)}
                      >
                        <Code2 className="mr-2 h-3.5 w-3.5 text-blue-500" />
                        {t.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-foreground" onClick={handleFormat}>
            <Wand2 className="h-3.5 w-3.5" />
            Format
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-foreground" onClick={handleCopy}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-foreground" onClick={handleReset}>
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-xs" onClick={handleRun}>
            <Play className="h-3.5 w-3.5" />
            Validate
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Editor area */}
        <div className="relative flex min-h-[320px] font-mono text-sm">
          {/* Line numbers */}
          <div className="flex flex-col border-r border-border bg-muted/20 px-3 py-4 text-right text-xs leading-6 text-muted-foreground select-none">
            {lines.map((_, i) => (
              <span key={i} className={errorLines.has(i + 1) ? "text-red-500 font-bold" : ""}>
                {i + 1}
              </span>
            ))}
          </div>

          {/* Code input */}
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              onBlur={() => setTimeout(() => setShowAcSuggestions(false), 150)}
              spellCheck={false}
              className="h-full w-full resize-none bg-background px-4 py-4 leading-6 text-foreground outline-none placeholder:text-muted-foreground"
              style={{ tabSize: 4, minHeight: "320px" }}
              placeholder="Write your SQL query here..."
            />

            {/* Error line highlights */}
            {result?.lineErrors && result.lineErrors.length > 0 && (
              <div className="pointer-events-none absolute inset-0 py-4" aria-hidden>
                {lines.map((_, i) => (
                  <div
                    key={`line-${i}`}
                    className={errorLines.has(i + 1) ? "bg-red-500/10 border-l-2 border-red-500" : ""}
                    style={{ height: "1.5rem" }}
                  />
                ))}
              </div>
            )}

            {/* Token-level error underlines */}
            {result?.tokenErrors && result.tokenErrors.length > 0 && (
              <div className="pointer-events-none absolute inset-0 px-4 py-4 font-mono text-sm leading-6" aria-hidden>
                {lines.map((lineText, i) => (
                  <div key={i} className="relative whitespace-pre" style={{ height: "1.5rem" }}>
                    {renderTokenHighlights(i, lineText)}
                  </div>
                ))}
              </div>
            )}

            {/* Autocomplete dropdown */}
            {showAcSuggestions && acSuggestions.length > 0 && (
              <div
                className="absolute left-4 z-50 mt-1 max-h-48 overflow-auto rounded-md border border-border bg-card shadow-lg"
                style={{ top: `${code.slice(0, textareaRef.current?.selectionStart ?? 0).split("\n").length * 1.5 + 1}rem` }}
              >
                {acSuggestions.map((s, i) => (
                  <button
                    key={s}
                    className={`block w-full px-3 py-1.5 text-left text-xs font-mono transition-colors hover:bg-muted ${i === 0 ? "bg-muted/50" : ""}`}
                    onMouseDown={(e) => { e.preventDefault(); applySuggestion(s); }}
                  >
                    <span className="text-blue-600 dark:text-blue-400">{s}</span>
                    <span className="ml-2 text-[10px] text-muted-foreground">
                      {SQL_FUNCTIONS.includes(s) ? "function" : "keyword"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results panel with AnimatePresence */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.status}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className={`border-t px-4 py-3 ${
                  result.status === "success"
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : result.status === "error"
                    ? "border-red-500/30 bg-red-500/5"
                    : "border-yellow-500/30 bg-yellow-500/5"
                }`}
              >
                {/* Status header */}
                <div className="flex items-center gap-2 mb-2">
                  {result.status === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : result.status === "error" ? (
                    <XCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <Lightbulb className="h-4 w-4 text-yellow-500" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      result.status === "success"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : result.status === "error"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {result.message}
                  </span>
                </div>

                {/* Token errors */}
                {result.tokenErrors && result.tokenErrors.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {result.tokenErrors.map((te, i) => (
                      <div key={i} className="rounded-md border border-red-500/20 bg-red-500/5 px-3 py-2">
                        <div className="flex items-start gap-2 text-sm">
                          <span className="shrink-0 rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-bold text-red-600 dark:text-red-400">
                            Ln {te.line}, Col {te.column + 1}
                          </span>
                          <div className="flex-1">
                            <span className="text-red-600 dark:text-red-400 font-mono font-semibold">{te.token}</span>
                            <span className="text-muted-foreground ml-1.5">— {te.message}</span>
                          </div>
                        </div>
                        {te.suggestion && (
                          <div className="mt-1.5 flex items-start gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                            <Lightbulb className="h-3 w-3 mt-0.5 shrink-0" />
                            <span className="whitespace-pre-wrap">{te.suggestion}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {result.suggestions && result.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" /> Suggestions
                    </p>
                    {result.suggestions.map((s, i) => (
                      <div
                        key={i}
                        className="rounded-md border border-border bg-card px-3 py-2 text-xs text-muted-foreground whitespace-pre-wrap font-mono"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
