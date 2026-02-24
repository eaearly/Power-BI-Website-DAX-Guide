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

/* ------------------------------------------------------------------ */
/*  DAX Keywords & Functions                                           */
/* ------------------------------------------------------------------ */

const DAX_KEYWORDS = [
  "DEFINE", "EVALUATE", "ORDER", "BY", "ASC", "DESC", "VAR", "RETURN",
  "MEASURE", "COLUMN", "TABLE", "IN", "NOT", "AND", "OR", "TRUE", "FALSE",
  "BLANK", "START", "AT",
];

const DAX_FUNCTIONS = [
  "CALCULATE", "CALCULATETABLE", "FILTER", "ALL", "ALLEXCEPT", "ALLSELECTED",
  "ALLNOBLANKROW", "VALUES", "DISTINCT", "DISTINCTCOUNT", "RELATED",
  "RELATEDTABLE", "SUMMARIZE", "SUMMARIZECOLUMNS", "ADDCOLUMNS",
  "SELECTCOLUMNS", "TOPN", "RANKX", "EARLIER", "EARLIEST", "HASONEVALUE",
  "SELECTEDVALUE", "ISBLANK", "IF", "SWITCH", "DIVIDE", "SUM", "SUMX",
  "AVERAGE", "AVERAGEX", "COUNT", "COUNTX", "COUNTA", "COUNTAX",
  "COUNTBLANK", "COUNTROWS", "MIN", "MINX", "MAX", "MAXX", "CALENDAR",
  "CALENDARAUTO", "DATE", "DATESYTD", "DATESQTD", "DATESMTD", "TOTALYTD",
  "TOTALQTD", "TOTALMTD", "SAMEPERIODLASTYEAR", "PREVIOUSMONTH",
  "PREVIOUSQUARTER", "PREVIOUSYEAR", "NEXTDAY", "NEXTMONTH", "NEXTQUARTER",
  "NEXTYEAR", "DATEADD", "DATESBETWEEN", "DATESINPERIOD", "PARALLELPERIOD",
  "STARTOFMONTH", "STARTOFQUARTER", "STARTOFYEAR", "ENDOFMONTH",
  "ENDOFQUARTER", "ENDOFYEAR", "YEAR", "MONTH", "DAY", "HOUR", "MINUTE",
  "SECOND", "NOW", "TODAY", "FORMAT", "CONCATENATE", "CONCATENATEX", "LEFT",
  "RIGHT", "MID", "LEN", "TRIM", "UPPER", "LOWER", "SUBSTITUTE", "SEARCH",
  "FIND", "EXACT", "REPT", "UNICHAR", "UNICODE", "COMBINEVALUES", "ROUND",
  "ROUNDUP", "ROUNDDOWN", "INT", "TRUNC", "ABS", "SIGN", "SQRT", "POWER",
  "EXP", "LN", "LOG", "LOG10", "MOD", "RAND", "RANDBETWEEN", "IFERROR",
  "ISFILTERED", "ISCROSSFILTERED", "USERELATIONSHIP", "CROSSFILTER",
  "TREATAS", "INTERSECT", "UNION", "EXCEPT", "NATURALINNERJOIN",
  "NATURALLEFTOUTERJOIN", "GENERATE", "GENERATEALL", "ROW", "DATATABLE",
  "GENERATESERIES", "KEEPFILTERS", "REMOVEFILTERS", "LOOKUPVALUE", "PATH",
  "PATHCONTAINS", "PATHITEM", "PATHITEMREVERSE", "PATHLENGTH", "NAMEOF",
  "CONTAINSROW", "CONTAINS", "GROUPBY", "ROLLUP", "ROLLUPADDISSUBTOTAL",
  "ISSUBTOTAL", "IGNORE", "NONVISUAL", "BLANK", "ERROR", "FIRSTDATE",
  "LASTDATE", "FIRSTNONBLANK", "LASTNONBLANK", "OPENINGBALANCEMONTH",
  "OPENINGBALANCEQUARTER", "OPENINGBALANCEYEAR", "CLOSINGBALANCEMONTH",
  "CLOSINGBALANCEQUARTER", "CLOSINGBALANCEYEAR", "PRODUCT", "PRODUCTX",
  "GEOMEAN", "GEOMEANX", "MEDIAN", "MEDIANX", "PERCENTILE.INC",
  "PERCENTILE.EXC", "PERCENTILEX.INC", "PERCENTILEX.EXC",
  "STDEV.S", "STDEV.P", "STDEVX.S", "STDEVX.P",
  "VAR.S", "VAR.P", "VARX.S", "VARX.P",
  "NORM.DIST", "NORM.INV", "NORM.S.DIST", "NORM.S.INV",
  "BETA.DIST", "BETA.INV", "CHISQ.DIST", "CHISQ.INV",
  "EXPON.DIST", "T.DIST", "T.INV",
  "COMBIN", "COMBINA", "PERMUT", "FACT",
  "GCD", "LCM", "QUOTIENT", "EVEN", "ODD", "CEILING", "FLOOR",
  "MROUND", "ISO.CEILING", "CURRENCY",
  "ISEMPTY", "ISLOGICAL", "ISNUMBER", "ISTEXT", "ISERROR", "ISEVEN", "ISODD",
  "HASONEFILTER", "ISAFTER",
  "USERNAME", "USERPRINCIPALNAME", "CUSTOMDATA",
  "SELECTEDMEASURE", "SELECTEDMEASURENAME", "SELECTEDMEASUREFORMATSTRING",
];

const ALL_DAX_IDENTIFIERS = [...new Set([...DAX_KEYWORDS, ...DAX_FUNCTIONS])];

/* ------------------------------------------------------------------ */
/*  DAX Template Snippets                                              */
/* ------------------------------------------------------------------ */

const DAX_TEMPLATES = [
  {
    label: "Basic SUM Measure",
    category: "Basic Measures",
    code: `Total Sales = SUM( 'Sales'[Amount] )`,
  },
  {
    label: "AVERAGE Measure",
    category: "Basic Measures",
    code: `Avg Order Value = AVERAGE( 'Sales'[Amount] )`,
  },
  {
    label: "COUNTROWS Measure",
    category: "Basic Measures",
    code: `Order Count = COUNTROWS( 'Sales' )`,
  },
  {
    label: "CALCULATE with Filter",
    category: "Basic Measures",
    code: `Online Sales =\nCALCULATE(\n    SUM( 'Sales'[Amount] ),\n    'Sales'[Channel] = "Online"\n)`,
  },
  {
    label: "Year-to-Date",
    category: "Time Intelligence",
    code: `YTD Sales =\nTOTALYTD(\n    SUM( 'Sales'[Amount] ),\n    'Date'[Date]\n)`,
  },
  {
    label: "Same Period Last Year",
    category: "Time Intelligence",
    code: `Sales LY =\nCALCULATE(\n    SUM( 'Sales'[Amount] ),\n    SAMEPERIODLASTYEAR( 'Date'[Date] )\n)`,
  },
  {
    label: "Year-over-Year %",
    category: "Time Intelligence",
    code: `YoY % =\nVAR CurrentYear = SUM( 'Sales'[Amount] )\nVAR LastYear =\n    CALCULATE(\n        SUM( 'Sales'[Amount] ),\n        SAMEPERIODLASTYEAR( 'Date'[Date] )\n    )\nRETURN\n    DIVIDE( CurrentYear - LastYear, LastYear )`,
  },
  {
    label: "Moving Average",
    category: "Time Intelligence",
    code: `Moving Avg 3M =\nAVERAGEX(\n    DATESINPERIOD(\n        'Date'[Date],\n        MAX( 'Date'[Date] ),\n        -3,\n        MONTH\n    ),\n    CALCULATE( SUM( 'Sales'[Amount] ) )\n)`,
  },
  {
    label: "RANKX with ALL",
    category: "Advanced",
    code: `Product Rank =\nRANKX(\n    ALL( 'Product'[ProductName] ),\n    [Total Sales],\n    ,\n    DESC,\n    Dense\n)`,
  },
  {
    label: "Dynamic Segmentation",
    category: "Advanced",
    code: `Customer Segment =\nVAR CustomerTotal = [Total Sales]\nRETURN\n    SWITCH(\n        TRUE(),\n        CustomerTotal >= 10000, "Premium",\n        CustomerTotal >= 5000, "Gold",\n        CustomerTotal >= 1000, "Silver",\n        "Bronze"\n    )`,
  },
  {
    label: "SUMMARIZECOLUMNS",
    category: "Advanced",
    code: `EVALUATE\nSUMMARIZECOLUMNS(\n    'Product'[Category],\n    'Date'[Year],\n    "Total Revenue", SUM( 'Sales'[Amount] ),\n    "Order Count", COUNTROWS( 'Sales' )\n)\nORDER BY 'Date'[Year] ASC, [Total Revenue] DESC`,
  },
  {
    label: "VAR / RETURN Pattern",
    category: "Advanced",
    code: `Profit Margin % =\nVAR TotalRevenue = SUM( 'Sales'[Revenue] )\nVAR TotalCost = SUM( 'Sales'[Cost] )\nVAR Profit = TotalRevenue - TotalCost\nRETURN\n    DIVIDE( Profit, TotalRevenue )`,
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

function validateDAXCode(code: string): ValidationResult {
  const trimmed = code.trim();

  if (!trimmed) {
    return {
      status: "warning",
      message: "Empty code. Write a DAX expression to validate.",
    };
  }

  const tokenErrors: TokenError[] = [];
  const suggestions: string[] = [];
  const lines = code.split("\n");

  // Remove comments for analysis
  const codeNoComments = trimmed
    .replace(/\/\/.*$/gm, "")
    .replace(/--.*$/gm, "")
    .trim();

  // Remove strings for analysis
  const codeNoStrings = codeNoComments
    .replace(/"[^"]*"/g, '""')
    .replace(/'[^']*'/g, "''");

  /* ── Detect plain words / gibberish (no DAX keywords or functions) ── */
  const strippedForCheck = codeNoStrings
    .replace(/\[[^\]]*\]/g, "") // remove column refs
    .trim();

  const hasKnownIdentifier = ALL_DAX_IDENTIFIERS.some((kw) =>
    new RegExp(`\\b${kw.replace(/\./g, "\\.")}\\b`, "i").test(codeNoComments)
  );

  // Check if it looks like a measure definition (Name = ...)
  const isMeasureDef = /^[A-Za-z_][A-Za-z0-9_ ]*\s*=/.test(codeNoComments);

  // If no known identifiers and not just numbers/operators, it's invalid
  if (!hasKnownIdentifier && !isMeasureDef) {
    // Check if it's just plain text / random words
    const onlyNumbersOps = /^[\s\d.,+\-*/()=;]*$/.test(strippedForCheck);
    if (onlyNumbersOps && strippedForCheck.length > 0) {
      for (let i = 0; i < lines.length; i++) {
        const clean = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "").trim();
        if (!clean) continue;
        tokenErrors.push({
          line: i + 1,
          column: 0,
          length: clean.length,
          token: clean,
          message: "Standalone expression is not valid DAX — write a measure or query",
          suggestion: "Write a DAX measure, e.g.:\nTotal Sales = SUM( 'Sales'[Amount] )",
        });
        break;
      }
    } else if (strippedForCheck.length > 0) {
      // Random words like "s", "good", "hello"
      for (let i = 0; i < lines.length; i++) {
        const clean = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "").trim();
        if (!clean) continue;

        // Check each word individually
        const words = clean.split(/\s+/);
        for (const word of words) {
          const plainWord = word.replace(/[()=,+\-*/[\]'"]/g, "").trim();
          if (!plainWord) continue;
          if (/^\d+(\.\d+)?$/.test(plainWord)) continue; // skip numbers
          if (ALL_DAX_IDENTIFIERS.some(k => k.toUpperCase() === plainWord.toUpperCase())) continue;

          const col = lines[i].indexOf(word);
          tokenErrors.push({
            line: i + 1,
            column: col >= 0 ? col : 0,
            length: word.length,
            token: word,
            message: `'${word}' is not a valid DAX keyword, function, or identifier`,
            suggestion: "DAX code must contain valid functions (SUM, CALCULATE, IF, etc.) or be a measure definition.\nExample: Total Sales = SUM( 'Sales'[Amount] )",
          });
        }
        break; // only flag first problematic line
      }

      if (tokenErrors.length === 0) {
        tokenErrors.push({
          line: 1,
          column: 0,
          length: lines[0].trim().length,
          token: lines[0].trim(),
          message: "Code does not contain any valid DAX keywords or functions",
          suggestion: "Start with a measure definition (Name = ...) or EVALUATE / DEFINE.\nOr pick a template from the Templates dropdown.",
        });
      }
    }
  }

  // If we already found it's not DAX at all, return early
  if (tokenErrors.length > 0 && !hasKnownIdentifier && !isMeasureDef) {
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
    return {
      status: "error",
      message: `Found ${tokenErrors.length} error${tokenErrors.length > 1 ? "s" : ""} in your DAX code`,
      lineErrors: errors,
      tokenErrors,
    };
  }

  /* ── Parentheses balance with exact positions ── */
  let parenCount = 0;
  const openParenStack: { line: number; column: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "");
    // Remove strings to avoid false positives
    const lineClean = lineNoComment.replace(/"[^"]*"/g, "").replace(/'[^']*'/g, "");
    for (let j = 0; j < lineClean.length; j++) {
      const ch = lineClean[j];
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

  /* ── Unclosed string literals ── */
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "");
    let dblQuoteCount = 0;
    let lastDblIdx = -1;
    for (let j = 0; j < lineNoComment.length; j++) {
      if (lineNoComment[j] === '"') {
        dblQuoteCount++;
        lastDblIdx = j;
      }
    }
    if (dblQuoteCount % 2 !== 0 && lastDblIdx >= 0) {
      tokenErrors.push({
        line: i + 1,
        column: lastDblIdx,
        length: 1,
        token: '"',
        message: "Unclosed string literal",
        suggestion: 'Add a closing double quote (") to complete the string.',
      });
    }
  }

  /* ── Unclosed bracket references ── */
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "");
    let bracketOpen = false;
    let bracketCol = -1;
    for (let j = 0; j < lineNoComment.length; j++) {
      if (lineNoComment[j] === "[" && !bracketOpen) {
        bracketOpen = true;
        bracketCol = j;
      } else if (lineNoComment[j] === "]") {
        bracketOpen = false;
      }
    }
    if (bracketOpen && bracketCol >= 0) {
      tokenErrors.push({
        line: i + 1,
        column: bracketCol,
        length: 1,
        token: "[",
        message: "Unclosed column reference bracket '['",
        suggestion: "Add a closing ']' to complete the column reference.",
      });
    }
  }

  /* ── Double comma ── */
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "").trim();
    if (!lineNoComment) continue;
    const doubleComma = /,,/.exec(lineNoComment);
    if (doubleComma) {
      const col = lines[i].indexOf(",,");
      tokenErrors.push({
        line: i + 1,
        column: col >= 0 ? col : doubleComma.index,
        length: 2,
        token: ",,",
        message: "Double comma detected",
        suggestion: "Remove the extra comma.",
      });
    }
  }

  /* ── Unknown function calls ── */
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "");
    // Remove strings and table/column refs
    const lineClean = lineNoComment
      .replace(/"[^"]*"/g, "")
      .replace(/'[^']*'/g, "")
      .replace(/\[[^\]]*\]/g, "");

    const funcCallRegex = /\b([A-Z_][A-Z0-9_.]*)\s*\(/gi;
    let match;
    while ((match = funcCallRegex.exec(lineClean)) !== null) {
      const funcName = match[1].toUpperCase();
      // Skip short aliases or measure name defs
      if (funcName.length <= 1) continue;
      if (!ALL_DAX_IDENTIFIERS.includes(funcName)) {
        const similar = findSimilar(funcName, DAX_FUNCTIONS);
        tokenErrors.push({
          line: i + 1,
          column: match.index,
          length: match[1].length,
          token: match[1],
          message: `'${match[1]}' is not a recognized DAX function`,
          suggestion: similar
            ? `Did you mean '${similar}'? Replace '${match[1]}' with '${similar}'.`
            : `'${match[1]}' is not a standard DAX function. Check the spelling.`,
        });
      }
    }
  }

  /* ── VAR without RETURN ── */
  if (/\bVAR\b/i.test(codeNoComments) && !/\bRETURN\b/i.test(codeNoComments)) {
    for (let i = 0; i < lines.length; i++) {
      const varMatch = /\b(VAR)\b/i.exec(lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, ""));
      if (varMatch) {
        tokenErrors.push({
          line: i + 1,
          column: varMatch.index,
          length: varMatch[1].length,
          token: varMatch[1],
          message: "VAR without matching RETURN",
          suggestion: "Every VAR block must have a RETURN statement.\nExample:\nVAR x = 10\nRETURN x",
        });
        break;
      }
    }
  }

  /* ── RETURN without VAR ── */
  if (/\bRETURN\b/i.test(codeNoComments) && !/\bVAR\b/i.test(codeNoComments)) {
    for (let i = 0; i < lines.length; i++) {
      const retMatch = /\b(RETURN)\b/i.exec(lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, ""));
      if (retMatch) {
        tokenErrors.push({
          line: i + 1,
          column: retMatch.index,
          length: retMatch[1].length,
          token: retMatch[1],
          message: "RETURN without a preceding VAR declaration",
          suggestion: "RETURN must follow one or more VAR declarations.",
        });
        break;
      }
    }
  }

  /* ── CALCULATE with no arguments ── */
  const calcEmptyRegex = /\bCALCULATE\s*\(\s*\)/gi;
  for (let i = 0; i < lines.length; i++) {
    // Check across the line and possibly next
    const combinedLine = lines.slice(i, Math.min(i + 2, lines.length)).join(" ");
    const cm = calcEmptyRegex.exec(combinedLine);
    if (cm) {
      const col = lines[i].toUpperCase().indexOf("CALCULATE");
      if (col >= 0) {
        tokenErrors.push({
          line: i + 1,
          column: col,
          length: 9,
          token: "CALCULATE",
          message: "CALCULATE requires at least one argument (expression)",
          suggestion: "CALCULATE( <expression>, [<filter1>], [<filter2>], ... )",
        });
      }
      break;
    }
  }

  /* ── SUM/AVERAGE/COUNT used with expression instead of column ── */
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "");
    const simpleAggMatch = /\b(SUM|AVERAGE|COUNT|COUNTA|MIN|MAX)\s*\(\s*([^)]+)\)/gi;
    let aggMatch;
    while ((aggMatch = simpleAggMatch.exec(lineNoComment)) !== null) {
      const innerArg = aggMatch[2].trim();
      // If it contains mathematical operators, it should use the X variant
      if (/[+\-*/]/.test(innerArg) && innerArg.includes("[")) {
        const funcName = aggMatch[1].toUpperCase();
        suggestions.push(
          `Line ${i + 1}: ${funcName}() only accepts a single column reference. Use ${funcName}X() for expressions.\nExample: ${funcName}X( 'Table', [Col1] * [Col2] )`
        );
      }
    }
  }

  /* ── Empty table reference '' ── */
  for (let i = 0; i < lines.length; i++) {
    const emptyTableMatch = /''/.exec(lines[i]);
    if (emptyTableMatch) {
      tokenErrors.push({
        line: i + 1,
        column: emptyTableMatch.index,
        length: 2,
        token: "''",
        message: "Empty table reference",
        suggestion: "Provide a table name between the quotes, e.g., 'Sales'",
      });
    }
  }

  /* ── Measure definition without = ── */
  if (isMeasureDef) {
    // Check the right side actually has something
    const eqIdx = codeNoComments.indexOf("=");
    if (eqIdx >= 0) {
      const rightSide = codeNoComments.slice(eqIdx + 1).trim();
      if (!rightSide) {
        tokenErrors.push({
          line: 1,
          column: eqIdx,
          length: 1,
          token: "=",
          message: "Measure definition has no expression after '='",
          suggestion: "Add a DAX expression, e.g.:\nTotal Sales = SUM( 'Sales'[Amount] )",
        });
      }
    }
  }

  /* ── Keyword concatenated with numbers (e.g. RETURN3123) ── */
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "");
    const lineClean = lineNoComment
      .replace(/"[^"]*"/g, "")
      .replace(/'[^']*'/g, "")
      .replace(/\[[^\]]*\]/g, "");

    const wordRegex = /\b([A-Za-z_][A-Za-z0-9_.]*)\b/g;
    let kwMatch;
    while ((kwMatch = wordRegex.exec(lineClean)) !== null) {
      const token = kwMatch[1];
      const tokenUpper = token.toUpperCase();
      // Skip if it's already a recognized identifier
      if (ALL_DAX_IDENTIFIERS.includes(tokenUpper)) continue;
      // Skip if used as a variable name (after VAR) or measure name (before =)
      const beforeToken = lineClean.substring(0, kwMatch.index).trim();
      const afterToken = lineClean.substring(kwMatch.index + token.length).trim();
      if (/\bVAR\s*$/i.test(beforeToken)) continue;
      if (afterToken.startsWith("=")) continue;
      // Find the longest DAX keyword that this token starts with
      let bestKw = "";
      for (const kw of DAX_KEYWORDS) {
        if (tokenUpper.startsWith(kw) && kw.length > bestKw.length) {
          bestKw = kw;
        }
      }
      if (bestKw && tokenUpper !== bestKw) {
        const trailing = token.slice(bestKw.length);
        if (/^\d+$/.test(trailing)) {
          const col = lines[i].indexOf(token, kwMatch.index > 0 ? kwMatch.index - 1 : 0);
          tokenErrors.push({
            line: i + 1,
            column: col >= 0 ? col : kwMatch.index,
            length: token.length,
            token: token,
            message: `'${token}' appears to be keyword '${bestKw}' with invalid number '${trailing}' appended`,
            suggestion: `Did you mean '${bestKw}'? Remove the trailing '${trailing}'.`,
          });
        }
      }
    }
  }

  /* ── Stray number after closing parenthesis (e.g. )2 ) ── */
  for (let i = 0; i < lines.length; i++) {
    const lineNoComment = lines[i].replace(/\/\/.*$/, "").replace(/--.*$/, "");
    const lineClean = lineNoComment
      .replace(/"[^"]*"/g, "")
      .replace(/'[^']*'/g, "");

    const strayNumRegex = /\)\s*(\d+(?:\.\d+)?)\b/g;
    let numMatch;
    while ((numMatch = strayNumRegex.exec(lineClean)) !== null) {
      const num = numMatch[1];
      const numCol = numMatch.index + numMatch[0].indexOf(num);
      const actualCol = lines[i].indexOf(num, numCol > 0 ? numCol - 1 : 0);
      tokenErrors.push({
        line: i + 1,
        column: actualCol >= 0 ? actualCol : numCol,
        length: num.length,
        token: num,
        message: `Unexpected number '${num}' after closing parenthesis`,
        suggestion: "Remove the stray number, or add an operator (+, -, *, /) between ')' and the number.",
      });
    }
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
      message: `Found ${tokenErrors.length} error${tokenErrors.length > 1 ? "s" : ""} in your DAX code`,
      lineErrors: errors,
      tokenErrors,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    };
  }

  if (suggestions.length > 0) {
    return {
      status: "warning",
      message: "DAX code parsed with suggestions",
      suggestions,
    };
  }

  return {
    status: "success",
    message: "DAX expression looks valid! No syntax issues detected.",
  };
}

/* ------------------------------------------------------------------ */
/*  Autocomplete                                                       */
/* ------------------------------------------------------------------ */

function getDAXSuggestions(code: string, cursorPos: number): string[] {
  const beforeCursor = code.slice(0, cursorPos);
  const wordMatch = beforeCursor.match(/\b([A-Z_][A-Z0-9_.]*)\s*$/i);
  if (!wordMatch) return [];
  const partial = wordMatch[1].toUpperCase();
  if (partial.length < 2) return [];
  return ALL_DAX_IDENTIFIERS.filter(
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
    const d = levenshtein(target.toUpperCase(), c.toUpperCase());
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
/*  DAX Formatter                                                      */
/* ------------------------------------------------------------------ */

function formatDAXCode(code: string): string {
  let result = code;

  // Normalize keywords to UPPERCASE
  const allKeywords = [...DAX_KEYWORDS, ...DAX_FUNCTIONS];
  for (const kw of allKeywords) {
    const regex = new RegExp(`\\b${kw.replace(/\./g, "\\.")}\\b`, "gi");
    result = result.replace(regex, kw);
  }

  // Ensure spaces after commas
  result = result.replace(/,(?!\s)/g, ", ");

  // Ensure spaces around =
  result = result.replace(/(?<!\s)=(?!\s)/g, " = ");
  // fix double spaces
  result = result.replace(/  +/g, " ");

  return result;
}

/* ------------------------------------------------------------------ */
/*  Sample Code                                                        */
/* ------------------------------------------------------------------ */

const SAMPLE_DAX = `// Try writing your DAX code here!
// Example: Year-over-Year comparison measure

YoY Sales Growth % =
VAR CurrentSales = SUM( 'Sales'[Amount] )
VAR PriorYearSales =
    CALCULATE(
        SUM( 'Sales'[Amount] ),
        SAMEPERIODLASTYEAR( 'Date'[Date] )
    )
RETURN
    DIVIDE(
        CurrentSales - PriorYearSales,
        PriorYearSales,
        BLANK()
    )`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function DaxCodeEditor({ onValidationChange }: { onValidationChange?: (status: "idle" | "success" | "error" | "warning") => void }) {
  const [code, setCode] = useState(SAMPLE_DAX);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [acSuggestions, setAcSuggestions] = useState<string[]>([]);
  const [showAcSuggestions, setShowAcSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleRun = useCallback(() => {
    const validationResult = validateDAXCode(code);
    setResult(validationResult);
    setShowAcSuggestions(false);
    onValidationChange?.(validationResult.status);
  }, [code, onValidationChange]);

  const handleReset = () => {
    setCode(SAMPLE_DAX);
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
      const formatted = formatDAXCode(code);
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
    const sug = getDAXSuggestions(newCode, cursorPos);
    setAcSuggestions(sug);
    setShowAcSuggestions(sug.length > 0);
  };

  const applySuggestion = (suggestion: string) => {
    if (!textareaRef.current) return;
    const cursorPos = textareaRef.current.selectionStart;
    const beforeCursor = code.slice(0, cursorPos);
    const afterCursor = code.slice(cursorPos);
    const wordMatch = beforeCursor.match(/\b([A-Z_][A-Z0-9_.]*)\s*$/i);
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

  const codeLines = code.split("\n");
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
  const templateCategories = [...new Set(DAX_TEMPLATES.map((t) => t.category))];

  return (
    <Card className="overflow-hidden border-border hover:translate-y-0 hover:shadow-sm">
      {/* Toolbar */}
      <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
        <CardTitle className="text-sm font-semibold">DAX Code Editor</CardTitle>
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
                    {DAX_TEMPLATES.filter((t) => t.category === cat).map((t) => (
                      <DropdownMenuItem
                        key={t.label}
                        onClick={() => handleInsertTemplate(t.code)}
                      >
                        <Code2 className="mr-2 h-3.5 w-3.5 text-yellow-500" />
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
            {codeLines.map((_, i) => (
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
              placeholder="Write your DAX expression here..."
            />

            {/* Error line highlights — red row */}
            {result?.lineErrors && result.lineErrors.length > 0 && (
              <div className="pointer-events-none absolute inset-0 py-4" aria-hidden>
                {codeLines.map((_, i) => (
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
                {codeLines.map((lineText, i) => (
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
                    <span className="text-yellow-600 dark:text-yellow-400">{s}</span>
                    <span className="ml-2 text-[10px] text-muted-foreground">
                      {DAX_FUNCTIONS.includes(s) ? "function" : "keyword"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results panel */}
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
