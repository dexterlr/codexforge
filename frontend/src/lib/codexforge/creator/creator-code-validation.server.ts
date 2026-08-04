import "server-only";

// @ts-expect-error Next ships this pinned server parser without TypeScript declarations.
import acornModule from "next/dist/compiled/acorn/acorn.js";
// @ts-expect-error ESLint supplies this installed server-only ESTree scope analyzer without TypeScript declarations.
import * as eslintScopeModule from "eslint-scope";
import postcss from "postcss";
import {
  assertCreatorJsonHasUniqueObjectKeys,
  CreatorDuplicateJsonKeyError,
} from "./creator-contract.server";
import type { CreatorValidationIssue } from "./creator-types";

const acorn = acornModule as {
  parse(source: string, options: Record<string, unknown>): unknown;
};
const eslintScope = eslintScopeModule as unknown as {
  analyze(root: unknown, options: Record<string, unknown>): {
    globalScope: CreatorJavaScriptScope | null;
    scopes: readonly CreatorJavaScriptScope[];
  };
};

type CreatorJavaScriptScopeReference = Readonly<{
  identifier?: AstRecord;
  init?: boolean;
  resolved?: Readonly<{
    defs?: readonly Readonly<{
      type?: string;
      node?: AstRecord;
    }>[];
  }> | null;
}>;

type CreatorJavaScriptScope = Readonly<{
  references?: readonly CreatorJavaScriptScopeReference[];
  through?: readonly CreatorJavaScriptScopeReference[];
  variables?: readonly Readonly<{ name?: string }>[];
}>;

const CREATOR_CSS_IDENTIFIER = "[a-z_][a-z0-9_-]*";
const CREATOR_CSS_ATTRIBUTE_SELECTOR = `\\[${CREATOR_CSS_IDENTIFIER}(?:\\s*(?:[~|^$*]?=)\\s*(?:${CREATOR_CSS_IDENTIFIER}|[0-9]+|\"[^\"]*\"|'[^']*'))?\\]`;
const CREATOR_CSS_PSEUDO_CLASS = `:(?:active|checked|disabled|empty|enabled|first-child|focus|focus-visible|focus-within|hover|invalid|last-child|only-child|optional|placeholder-shown|required|root|target|valid)`;
const CREATOR_CSS_PSEUDO_ELEMENT = "::(?:after|before|marker)";
const CREATOR_CSS_SIMPLE_SUFFIX = `(?:#${CREATOR_CSS_IDENTIFIER}|\\.${CREATOR_CSS_IDENTIFIER}|${CREATOR_CSS_ATTRIBUTE_SELECTOR}|${CREATOR_CSS_PSEUDO_CLASS}|${CREATOR_CSS_PSEUDO_ELEMENT})`;
const CREATOR_CSS_COMPOUND_SELECTOR = `(?:(?:\\*|[a-z][a-z0-9-]*)${CREATOR_CSS_SIMPLE_SUFFIX}*|${CREATOR_CSS_SIMPLE_SUFFIX}+)`;
const CREATOR_CSS_SELECTOR = new RegExp(
  `^${CREATOR_CSS_COMPOUND_SELECTOR}(?:\\s*(?:[>+~]\\s*|\\s+)${CREATOR_CSS_COMPOUND_SELECTOR})*$`,
  "i"
);
const CREATOR_CSS_NUMBER = /^([+-]?(?:(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?))([a-z%]+)?$/i;
const CREATOR_CSS_LITERAL_COLOR_FUNCTIONS = new Set([
  "rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch", "oklab", "oklch", "color",
]);
const CREATOR_CSS_VISIBLE_KEYWORDS = new Set([
  "inherit", "initial", "revert", "revert-layer", "unset",
]);
const CREATOR_MIN_VISIBLE_ALPHA = 0.1;
const CREATOR_MIN_TEXT_CONTRAST = 4.5;

type CreatorCssColor = Readonly<{ red: number; green: number; blue: number; alpha: number }>;
const CREATOR_CSS_NAMED_COLORS: Readonly<Record<string, CreatorCssColor>> = Object.freeze({
  black: { red: 0, green: 0, blue: 0, alpha: 1 },
  white: { red: 255, green: 255, blue: 255, alpha: 1 },
  red: { red: 255, green: 0, blue: 0, alpha: 1 },
  green: { red: 0, green: 128, blue: 0, alpha: 1 },
  blue: { red: 0, green: 0, blue: 255, alpha: 1 },
  yellow: { red: 255, green: 255, blue: 0, alpha: 1 },
  gray: { red: 128, green: 128, blue: 128, alpha: 1 },
  grey: { red: 128, green: 128, blue: 128, alpha: 1 },
  navy: { red: 0, green: 0, blue: 128, alpha: 1 },
  teal: { red: 0, green: 128, blue: 128, alpha: 1 },
  maroon: { red: 128, green: 0, blue: 0, alpha: 1 },
  purple: { red: 128, green: 0, blue: 128, alpha: 1 },
  orange: { red: 255, green: 165, blue: 0, alpha: 1 },
  silver: { red: 192, green: 192, blue: 192, alpha: 1 },
});
const CREATOR_CSS_USER_AGENT_INTERACTIVE_COLORS: readonly CreatorCssColor[] = Object.freeze([
  { red: 0, green: 0, blue: 238, alpha: 1 },
  { red: 85, green: 26, blue: 139, alpha: 1 },
]);

type CreatorCssNumeric = Readonly<{ value: number; unit: string }>;

function readCssNumeric(source: string): CreatorCssNumeric | null {
  const match = CREATOR_CSS_NUMBER.exec(source.trim());
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value)
    ? { value, unit: (match[2] ?? "").toLowerCase() }
    : null;
}

function readCssRatio(source: string): number | null {
  const numeric = readCssNumeric(source);
  if (!numeric || (numeric.unit !== "" && numeric.unit !== "%")) return null;
  return numeric.unit === "%" ? numeric.value / 100 : numeric.value;
}

function readCssColorChannel(source: string): number | null {
  const numeric = readCssNumeric(source);
  if (!numeric || (numeric.unit !== "" && numeric.unit !== "%")) return null;
  const value = numeric.unit === "%" ? numeric.value * 2.55 : numeric.value;
  return value >= 0 && value <= 255 ? value : null;
}

function readCssLiteralColor(source: string): CreatorCssColor | null {
  const normalized = source.trim().toLowerCase();
  const named = CREATOR_CSS_NAMED_COLORS[normalized];
  if (named) return named;
  const hex = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(normalized)?.[1];
  if (hex) {
    const expanded = hex.length <= 4
      ? [...hex].map((character) => `${character}${character}`).join("")
      : hex;
    return {
      red: Number.parseInt(expanded.slice(0, 2), 16),
      green: Number.parseInt(expanded.slice(2, 4), 16),
      blue: Number.parseInt(expanded.slice(4, 6), 16),
      alpha: expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1,
    };
  }
  const functional = /^(rgba?)\((.*)\)$/i.exec(normalized);
  if (!functional || /[()]/.test(functional[2])) return null;
  const body = functional[2].trim();
  const slashParts = body.split("/");
  if (slashParts.length > 2) return null;
  const commaParts = body.split(",").map((part) => part.trim());
  let channels: readonly string[];
  let alphaSource: string | null = slashParts.length === 2 ? slashParts[1].trim() : null;
  if (commaParts.length > 1) {
    if (slashParts.length !== 1 || (commaParts.length !== 3 && commaParts.length !== 4)) return null;
    channels = commaParts.slice(0, 3);
    alphaSource = commaParts[3] ?? null;
  } else {
    channels = slashParts[0].trim().split(/\s+/);
    if (channels.length !== 3) return null;
  }
  const parsedChannels = channels.map(readCssColorChannel);
  const alpha = alphaSource === null ? 1 : readCssRatio(alphaSource);
  if (parsedChannels.some((channel) => channel === null) || alpha === null || alpha < 0 || alpha > 1) {
    return null;
  }
  return {
    red: parsedChannels[0] as number,
    green: parsedChannels[1] as number,
    blue: parsedChannels[2] as number,
    alpha,
  };
}

function cssRelativeLuminance(color: CreatorCssColor): number {
  const linear = (channel: number) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(color.red) + 0.7152 * linear(color.green) + 0.0722 * linear(color.blue);
}

function cssContrastRatio(left: CreatorCssColor, right: CreatorCssColor): number {
  if (left.alpha !== 1 || right.alpha !== 1) return 0;
  const leftLuminance = cssRelativeLuminance(left);
  const rightLuminance = cssRelativeLuminance(right);
  return (Math.max(leftLuminance, rightLuminance) + 0.05) /
    (Math.min(leftLuminance, rightLuminance) + 0.05);
}

function readCssOutlineLiteralColor(source: string): CreatorCssColor | null {
  const functionalMatches = [...source.matchAll(/\brgba?\([^()]*\)/gi)].map((match) => match[0]);
  const tokenMatches = readCssTokensOutsideFunctions(source).filter(
    (token) => token.startsWith("#") || CREATOR_CSS_NAMED_COLORS[token.toLowerCase()] !== undefined
  );
  const candidates = [...functionalMatches, ...tokenMatches];
  if (candidates.length === 0) return null;
  if (candidates.length !== 1) return null;
  return readCssLiteralColor(candidates[0]);
}

function containsInsufficientVisibleCssColor(source: string): boolean {
  if (/\btransparent\b/i.test(source)) return true;
  for (const match of source.matchAll(/#([0-9a-f]{4}|[0-9a-f]{8})\b/gi)) {
    const alphaHex = match[1].length === 4
      ? `${match[1].slice(-1)}${match[1].slice(-1)}`
      : match[1].slice(-2);
    if (Number.parseInt(alphaHex, 16) / 255 < CREATOR_MIN_VISIBLE_ALPHA) return true;
  }
  const colorFunction = /\b(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color)\(([^()]*)\)/gi;
  for (const match of source.matchAll(colorFunction)) {
    const functionName = match[1].toLowerCase();
    const body = match[2];
    let alpha: string | null = null;
    const slash = body.lastIndexOf("/");
    if (slash >= 0) {
      alpha = body.slice(slash + 1);
    } else if (["rgba", "hsla"].includes(functionName)) {
      const comma = body.lastIndexOf(",");
      if (comma >= 0) alpha = body.slice(comma + 1);
    }
    if (alpha !== null) {
      const ratio = readCssRatio(alpha);
      if (ratio === null || ratio < CREATOR_MIN_VISIBLE_ALPHA) return true;
    }
  }
  return false;
}

function containsCssFunction(source: string, allowLiteralColorFunctions: boolean): boolean {
  for (const match of source.matchAll(/\b([a-z][a-z0-9-]*)\s*\(/gi)) {
    if (!allowLiteralColorFunctions || !CREATOR_CSS_LITERAL_COLOR_FUNCTIONS.has(match[1].toLowerCase())) {
      return true;
    }
  }
  return false;
}

function isUnsafeCssFontSize(source: string): boolean {
  const normalized = source.trim().toLowerCase();
  if (
    CREATOR_CSS_VISIBLE_KEYWORDS.has(normalized) ||
    ["xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large"].includes(normalized)
  ) {
    return false;
  }
  const numeric = readCssNumeric(normalized);
  if (!numeric) return true;
  const bounds: Readonly<Record<string, readonly [number, number]>> = {
    px: [8, 256],
    rem: [0.5, 16],
    pt: [6, 192],
  };
  const bound = bounds[numeric.unit];
  return !bound || numeric.value < bound[0] || numeric.value > bound[1];
}

function isUnsafeCssOutlineWidth(source: string): boolean {
  const normalized = source.trim().toLowerCase();
  if (["thin", "medium", "thick"].includes(normalized) || CREATOR_CSS_VISIBLE_KEYWORDS.has(normalized)) {
    return false;
  }
  const numeric = readCssNumeric(normalized);
  if (!numeric) return true;
  const bounds: Readonly<Record<string, readonly [number, number]>> = {
    px: [1, 32],
    rem: [0.0625, 2],
    em: [0.0625, 2],
    pt: [0.75, 24],
  };
  const bound = bounds[numeric.unit];
  return !bound || numeric.value < bound[0] || numeric.value > bound[1];
}

function readCssTokensOutsideFunctions(source: string): readonly string[] {
  let depth = 0;
  let outside = "";
  for (const character of source) {
    if (character === "(") {
      depth += 1;
      outside += " ";
    } else if (character === ")" && depth > 0) {
      depth -= 1;
      outside += " ";
    } else {
      outside += depth === 0 ? character : " ";
    }
  }
  return outside.split(/\s+/).filter(Boolean);
}

function hasUnsafeCssOutlineShorthandWidth(source: string): boolean {
  return readCssTokensOutsideFunctions(source)
    .filter((token) => readCssNumeric(token) !== null)
    .some((token) => isUnsafeCssOutlineWidth(token));
}

function isUnsafeCssLineHeight(source: string): boolean {
  const normalized = source.trim().toLowerCase();
  if (normalized === "normal" || CREATOR_CSS_VISIBLE_KEYWORDS.has(normalized)) return false;
  const numeric = readCssNumeric(normalized);
  if (!numeric) return true;
  const bounds: Readonly<Record<string, readonly [number, number]>> = {
    "": [0.8, 4],
    px: [8, 512],
    rem: [0.5, 32],
    pt: [6, 384],
  };
  const bound = bounds[numeric.unit];
  return !bound || numeric.value < bound[0] || numeric.value > bound[1];
}

function isBoundedCssRadius(source: string): boolean {
  const tokens = source.trim().split(/\s+/);
  if (tokens.length < 1 || tokens.length > 4) return false;
  return tokens.every((token) => {
    const numeric = readCssNumeric(token);
    if (!numeric || numeric.value < 0) return false;
    if (numeric.unit === "px") return numeric.value <= 64;
    if (numeric.unit === "rem") return numeric.value <= 4;
    if (numeric.unit === "%") return numeric.value <= 50;
    return numeric.unit === "" && numeric.value === 0;
  });
}

function isAllowedCreatorCssDeclaration(property: string, source: string): boolean {
  switch (property) {
    case "background":
    case "background-color":
    case "color":
    case "text-decoration-color": {
      const color = readCssLiteralColor(source);
      return color !== null && color.alpha === 1;
    }
    case "display":
      return /^(?:block|inline|inline-block|list-item|flow-root|table|table-row|table-cell)$/.test(source);
    case "font-family":
      return /^(?:(?:system-ui|ui-sans-serif|ui-serif|ui-monospace|sans-serif|serif|monospace|cursive|fantasy)(?:\s*,\s*)?)+$/.test(source);
    case "font-size":
      return !isUnsafeCssFontSize(source) && !containsCssFunction(source, false);
    case "font-style":
      return /^(?:normal|italic)$/.test(source);
    case "font-weight":
      return /^(?:normal|bold|lighter|bolder|[1-9]00)$/.test(source);
    case "line-height":
      return !isUnsafeCssLineHeight(source) && !containsCssFunction(source, false);
    case "text-align":
      return /^(?:start|end|left|right|center)$/.test(source);
    case "text-decoration":
      return /^(?:(?:underline|overline|line-through|solid|double|dotted|dashed|wavy)(?:\s+|$))+$/.test(`${source} `);
    case "text-decoration-style":
      return /^(?:solid|double|dotted|dashed|wavy)$/.test(source);
    case "text-decoration-thickness":
      return isUnsafeCssOutlineWidth(source) === false;
    case "text-transform":
      return /^(?:none|capitalize|uppercase|lowercase)$/.test(source);
    case "white-space":
      return /^(?:normal|pre-wrap|break-spaces)$/.test(source);
    case "overflow-wrap":
      return /^(?:normal|break-word|anywhere)$/.test(source);
    case "word-break":
      return /^(?:normal|break-all|keep-all|break-word)$/.test(source);
    case "list-style-position":
      return /^(?:inside|outside)$/.test(source);
    case "list-style-type":
      return /^(?:disc|circle|square|decimal|lower-alpha|upper-alpha|lower-roman|upper-roman|none)$/.test(source);
    case "border-radius":
      return isBoundedCssRadius(source);
    case "box-sizing":
      return /^(?:border-box|content-box)$/.test(source);
    case "cursor":
      return /^(?:auto|default|pointer|text)$/.test(source);
    default:
      return false;
  }
}

function hasForbiddenCreatorAtRulePreludeToken(source: string): boolean {
  return (
    source.length > 120 ||
    /[\u0000-\u001f\u007f\\@;{}]/.test(source) ||
    /(?:url|image-set|cross-fade|element|attr|expression|var|calc|min|max|clamp)\s*\(/i.test(source) ||
    /\b(?:https?|data|javascript|file|blob):|\/\//i.test(source)
  );
}

function isAllowedCreatorMediaPrelude(source: string): boolean {
  if (hasForbiddenCreatorAtRulePreludeToken(source)) return false;
  const normalized = source.trim().toLowerCase().replace(/\s+/g, " ");
  const feature = "(?:prefers-reduced-motion: (?:reduce|no-preference)|prefers-color-scheme: (?:light|dark)|(?:min|max)-width: (?:[1-9]\\d{0,3}px|(?:[1-9]\\d?|0\\.[1-9]\\d?)rem))";
  return new RegExp(`^(?:(?:all|screen) and )?\\(${feature}\\)(?: and \\(${feature}\\)){0,2}$`).test(normalized);
}

function isAllowedCreatorSupportsPrelude(source: string): boolean {
  if (hasForbiddenCreatorAtRulePreludeToken(source)) return false;
  const match = /^\(\s*([a-z-]{1,32})\s*:\s*([^()]{1,64})\s*\)$/i.exec(source.trim());
  if (!match) return false;
  return isAllowedCreatorCssDeclaration(match[1].toLowerCase(), match[2].trim().toLowerCase());
}

function codeIssue(
  code: string,
  filePath: string,
  message: string,
  suggestedRepairContext: string
): CreatorValidationIssue {
  return {
    code,
    stage: 4,
    severity: "error",
    filePath,
    message,
    suggestedRepairContext,
    blocksMaterialization: true,
  };
}

function containsNonCssSyntaxSeparatorOrFormat(source: string): boolean {
  for (const character of source) {
    if (
      character !== " " &&
      (/^\p{Z}$/u.test(character) || /^\p{Cf}$/u.test(character))
    ) {
      return true;
    }
  }
  return false;
}

export function validateCreatorCss(
  filePath: string,
  content: string
): readonly CreatorValidationIssue[] {
  const issues: CreatorValidationIssue[] = [];
  const implicitForeground = CREATOR_CSS_NAMED_COLORS.black;
  const implicitBackground = CREATOR_CSS_NAMED_COLORS.white;
  const globalForegrounds: CreatorCssColor[] = [];
  const globalBackgrounds: CreatorCssColor[] = [];
  const ruleColorPairs: Array<Readonly<{
    foregrounds: readonly CreatorCssColor[];
    backgrounds: readonly CreatorCssColor[];
  }>> = [];
  const selectorBackgrounds = new Map<string, CreatorCssColor[]>();
  const focusOutlineColors: Array<Readonly<{
    selector: string;
    color: CreatorCssColor;
  }>> = [];
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(content)) {
    issues.push(codeIssue("css.control_character", filePath, "CSS contains a forbidden control character.", "Use complete UTF-8 CSS with tabs and line breaks only."));
  }
  if (containsNonCssSyntaxSeparatorOrFormat(content)) {
    issues.push(codeIssue("css.non_ascii_syntax_character", filePath, "CSS contains a Unicode separator or format character outside the exact CSS syntax whitespace set.", "Use only space, tab, line feed, form feed, or carriage return between CSS tokens."));
  }
  if (content.includes("/*") || content.includes("*/")) {
    issues.push(codeIssue("css.comment_forbidden", filePath, "CSS comments are outside the unambiguous local style subset.", "Remove comments so forbidden functions and properties cannot be split across tokens."));
  }
  if (content.includes("\\")) {
    issues.push(codeIssue("css.escape_forbidden", filePath, "CSS escapes are outside the v0 safe subset.", "Use literal local CSS identifiers and values."));
  }
  try {
    const root = postcss.parse(content, { from: undefined });
    let topologyIssueAdded = false;
    const rejectTopology = () => {
      if (topologyIssueAdded) return;
      topologyIssueAdded = true;
      issues.push(codeIssue(
        "css.ast_topology_forbidden",
        filePath,
        "CSS declarations and nested blocks must use the exact top-level rule topology.",
        "Put declarations only inside ordinary style rules, and put style rules directly at the root or inside one top-level media or supports block."
      ));
    };
    for (const node of root.nodes ?? []) {
      if (node.type !== "rule" && node.type !== "atrule") rejectTopology();
    }
    root.walk((node) => {
      if (node.type === "decl" && node.parent?.type !== "rule") {
        rejectTopology();
      } else if (node.type === "rule") {
        const parentIsRoot = node.parent === root;
        const parentIsTopLevelAtRule =
          node.parent?.type === "atrule" && node.parent.parent === root;
        if (
          (!parentIsRoot && !parentIsTopLevelAtRule) ||
          (node.nodes ?? []).some((child) => child.type !== "decl")
        ) {
          rejectTopology();
        }
      } else if (node.type === "atrule") {
        if (
          node.parent !== root ||
          !Array.isArray(node.nodes) ||
          node.nodes.some((child) => child.type !== "rule")
        ) {
          rejectTopology();
        }
      }
    });
    root.walkAtRules((rule) => {
      const name = rule.name.toLowerCase();
      if (!["media", "supports"].includes(name)) {
        issues.push(codeIssue("css.at_rule_forbidden", filePath, `CSS @${name} is forbidden.`, "Use only local CSS with media or supports at-rules."));
      } else if (!Array.isArray(rule.nodes) || !rule.params.trim()) {
        issues.push(codeIssue("css.at_rule_block_required", filePath, `CSS @${name} requires a non-empty prelude and an explicit block.`, "Return one complete block-form media, supports, or keyframes rule."));
      } else if (
        (name === "media" && !isAllowedCreatorMediaPrelude(rule.params)) ||
        (name === "supports" && !isAllowedCreatorSupportsPrelude(rule.params))
      ) {
        issues.push(codeIssue("css.at_rule_prelude_forbidden", filePath, `CSS @${name} uses a prelude outside the exact bounded local subset.`, "Use one bounded local media feature or one allowlisted literal supports declaration without URLs, schemes, imports, or dynamic functions."));
      }
    });
    root.walkRules((rule) => {
      if (
        !rule.selector.trim() ||
        rule.selector.split(",").some((selector) => !selector.trim() || !CREATOR_CSS_SELECTOR.test(selector.trim()))
      ) {
        issues.push(codeIssue("css.selector_invalid", filePath, "CSS selectors must use the complete conservative local selector grammar.", "Use complete type, class, ID, bounded attribute, or allowlisted state selectors joined by ordinary local combinators."));
      }
      if (/::(?:before|after)\b/i.test(rule.selector)) {
        issues.push(codeIssue("css.interaction_suppression_forbidden", filePath, "Generated pseudo-elements can cover or replace validated interactive content and are forbidden.", "Use ordinary validated elements and keep generated marker styling non-interactive."));
      }
      const declarations = new Map<string, string[]>();
      for (const node of rule.nodes ?? []) {
        if (node.type !== "decl") continue;
        const property = node.prop.toLowerCase();
        const values = declarations.get(property) ?? [];
        values.push(node.value.toLowerCase().replace(/\s*!important\s*$/i, "").trim());
        declarations.set(property, values);
      }
      const hasClippingOverflow = ["overflow", "overflow-y", "overflow-block"].some((property) =>
        (declarations.get(property) ?? []).some((value) => /^(?:hidden|clip)$/i.test(value))
      );
      const clippedSizeProperties = [
          "height", "max-height", "block-size", "max-block-size",
          "width", "max-width", "inline-size", "max-inline-size",
          "font-size", "line-height",
        ] as const;
      const hidesByClippedExplicitSize =
        clippedSizeProperties.some((property) => declarations.has(property)) &&
        hasClippingOverflow;
      const positioning = declarations.get("position") ?? [];
      const hasUnsafeDisplacement = (properties: readonly string[]) => properties.some((property) =>
        (declarations.get(property) ?? []).some((value) => {
          if (/\b(?:calc|min|max|clamp|var)\s*\(/i.test(value)) return true;
          return value.split(/\s+/).some((token) => {
            if (/^[+]?0+(?:\.0+)?$/.test(token)) return false;
            const match = /^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(px|rem|em|vw|vh|vmin|vmax|%)$/i.exec(token);
            if (!match) return /^[+-]?(?:\d|\.\d)/.test(token);
            const magnitude = Number(match[1]);
            if (!Number.isFinite(magnitude) || magnitude < 0) return true;
            const unit = match[2].toLowerCase();
            if (["vw", "vh", "vmin", "vmax", "%"].includes(unit)) return magnitude >= 50;
            return magnitude > (unit === "px" ? 128 : 8);
          });
        })
      );
      const hasUnsafePosition = hasUnsafeDisplacement([
        "inset", "inset-block", "inset-block-start", "inset-block-end", "inset-inline",
        "inset-inline-start", "inset-inline-end", "left", "right", "top", "bottom",
      ]);
      const hasUnsafeMargin = hasUnsafeDisplacement([
        "margin", "margin-block", "margin-block-start", "margin-block-end", "margin-inline",
        "margin-inline-start", "margin-inline-end", "margin-left", "margin-right", "margin-top", "margin-bottom",
      ]);
      const hasUnsafePaddingOrBorder = hasUnsafeDisplacement([
        "padding", "padding-block", "padding-block-start", "padding-block-end", "padding-inline",
        "padding-inline-start", "padding-inline-end", "padding-left", "padding-right", "padding-top", "padding-bottom",
        "border", "border-width", "border-block", "border-block-width", "border-block-start", "border-block-start-width",
        "border-block-end", "border-block-end-width", "border-inline", "border-inline-width", "border-inline-start",
        "border-inline-start-width", "border-inline-end", "border-inline-end-width", "border-left", "border-left-width",
        "border-right", "border-right-width", "border-top", "border-top-width", "border-bottom", "border-bottom-width",
      ]);
      if (
        hidesByClippedExplicitSize ||
        hasUnsafeMargin ||
        hasUnsafePaddingOrBorder ||
        (positioning.length > 0 && hasUnsafePosition)
      ) {
        issues.push(codeIssue("css.rendering_suppression_forbidden", filePath, "CSS cannot move validated content off screen or collapse and clip it from rendering.", "Keep validated semantic content within a visible, nonzero layout box."));
      }
      const selectors = rule.selector.split(",").map((selector) => selector.trim().toLowerCase());
      const foregrounds = (declarations.get("color") ?? [])
        .map(readCssLiteralColor)
        .filter((color): color is CreatorCssColor => color !== null);
      const backgrounds = [
        ...(declarations.get("background") ?? []),
        ...(declarations.get("background-color") ?? []),
      ].map(readCssLiteralColor).filter((color): color is CreatorCssColor => color !== null);
      if (foregrounds.length > 0 || backgrounds.length > 0) {
        ruleColorPairs.push({ foregrounds, backgrounds });
      }
      for (const selector of selectors) {
        if (["html", "body", ":root", "*"].includes(selector)) {
          globalForegrounds.push(...foregrounds);
          globalBackgrounds.push(...backgrounds);
        }
        if (backgrounds.length > 0) {
          selectorBackgrounds.set(selector, [
            ...(selectorBackgrounds.get(selector) ?? []),
            ...backgrounds,
          ]);
        }
        if (/:focus(?:-visible|-within)?\b/.test(selector)) {
          for (const value of [
            ...(declarations.get("outline-color") ?? []),
            ...(declarations.get("outline") ?? []),
          ]) {
            const color = declarations.has("outline-color")
              ? readCssLiteralColor(value)
              : readCssOutlineLiteralColor(value);
            if (color) focusOutlineColors.push({ selector, color });
          }
        }
      }
    });
    root.walkDecls((declaration) => {
      const property = declaration.prop.toLowerCase();
      const value = declaration.value.toLowerCase();
      const normalizedValue = value.replace(/\s*!important\s*$/i, "").trim();
      if (!declaration.value.trim()) {
        issues.push(codeIssue("css.declaration_value_invalid", filePath, `CSS property ${property} requires a non-empty value.`, "Return one complete literal value for every declaration."));
      }
      if (!isAllowedCreatorCssDeclaration(property, normalizedValue)) {
        issues.push(codeIssue("css.property_or_value_forbidden", filePath, `CSS declaration ${property} is outside the exact conservative presentation subset.`, "Use an allowlisted static presentation property with one bounded literal value."));
      }
      if (
        /\b(?:calc|min|max|clamp)\s*\(/i.test(value) &&
        (/(?:\+|-|\*|\/)\s*\)/.test(value) || /\bcalc\s*\(\s*\)/i.test(value))
      ) {
        issues.push(codeIssue("css.math_value_invalid", filePath, "CSS math functions cannot end with an operator or be empty.", "Return one complete bounded CSS math expression."));
      }
      if (["behavior", "-moz-binding"].includes(property)) {
        issues.push(codeIssue("css.property_forbidden", filePath, `CSS property ${property} is forbidden.`, "Remove browser behavior and binding properties."));
      }
      if (property.startsWith("-")) {
        issues.push(codeIssue("css.vendor_property_forbidden", filePath, `CSS property ${property} is outside the portable static subset.`, "Use one unprefixed allowlisted static CSS property without custom or vendor-prefixed behavior."));
      }
      if (property === "animation" || property.startsWith("animation-") || property === "transition" || property.startsWith("transition-")) {
        issues.push(codeIssue("css.motion_forbidden", filePath, "CSS animation and transition behavior is outside the bounded static preview subset.", "Use a motion-free static presentation with direct state changes."));
      }
      if (
        property === "offset" ||
        property.startsWith("offset-") ||
        property === "motion" ||
        property.startsWith("motion-") ||
        /\b(?:anchor|anchor-size|path|ray)\s*\(/i.test(normalizedValue)
      ) {
        issues.push(codeIssue("css.rendering_suppression_forbidden", filePath, "CSS motion paths and anchor-positioning geometry can move validated content outside the preview and are forbidden.", "Use ordinary bounded static flow, flex, or grid positioning without motion paths or anchors."));
      }
      if (property === "scroll-behavior" && normalizedValue === "smooth") {
        issues.push(codeIssue("css.motion_forbidden", filePath, "Smooth scrolling is outside the motion-free static preview subset.", "Use the default immediate scrolling behavior."));
      }
      const insufficientVisibleCssColor = containsInsufficientVisibleCssColor(normalizedValue);
      const hasAnyFunction = containsCssFunction(normalizedValue, false);
      const hasNonLiteralColorFunction = containsCssFunction(normalizedValue, true);
      const opacityRatio = property === "opacity" ? readCssRatio(normalizedValue) : null;
      const literalColorRequired = ["color", "background", "background-color", "outline-color"].includes(property);
      const literalColor = literalColorRequired ? readCssLiteralColor(normalizedValue) : null;
      const outlineSuppressed =
        (property === "outline" && (
          /(?:^|\s)(?:none|hidden)(?:\s|$)/i.test(normalizedValue) ||
          hasUnsafeCssOutlineShorthandWidth(normalizedValue) ||
          insufficientVisibleCssColor ||
          hasNonLiteralColorFunction
        )) ||
        (property === "outline-style" && /^(?:none|hidden)$/i.test(normalizedValue)) ||
        (property === "outline-width" && (isUnsafeCssOutlineWidth(normalizedValue) || hasAnyFunction)) ||
        (property === "outline-color" && (insufficientVisibleCssColor || hasNonLiteralColorFunction));
      const outlineOffsetInvalid = property === "outline-offset" && (() => {
        if (/^[+]?0+(?:\.0+)?$/.test(normalizedValue)) return false;
        const match = /^\+?(\d+(?:\.\d+)?|\.\d+)(px|rem|em)$/i.exec(normalizedValue);
        if (!match) return true;
        const magnitude = Number(match[1]);
        return !Number.isFinite(magnitude) || magnitude > (match[2].toLowerCase() === "px" ? 64 : 4);
      })();
      if (
        outlineSuppressed ||
        outlineOffsetInvalid ||
        ["all", "appearance", "caret-color", "accent-color", "forced-color-adjust"].includes(property) ||
        (property === "pointer-events" && normalizedValue === "none") ||
        property === "touch-action" ||
        (property === "cursor" && normalizedValue === "none")
      ) {
        issues.push(codeIssue("css.interaction_suppression_forbidden", filePath, "CSS cannot remove focus indication or disable pointer, touch, zoom, or cursor interaction in the accessible static subset.", "Keep a visible focus outline and preserve ordinary pointer, touch, zoom, and cursor behavior."));
      }
      if (
        (property === "display" && /^(?:none|contents)$/i.test(normalizedValue)) ||
        (property === "visibility" && /^(?:hidden|collapse)$/i.test(normalizedValue)) ||
        (property === "content-visibility" && normalizedValue === "hidden") ||
        (property === "opacity" && opacityRatio !== 1) ||
        (property.startsWith("overflow") && /(?:^|\s)(?:hidden|clip)(?:\s|$)/i.test(normalizedValue)) ||
        ["transform", "translate", "scale", "rotate", "zoom", "clip", "clip-path", "filter", "backdrop-filter", "mask", "mask-image", "text-indent"].includes(property) ||
        property === "font" ||
        property === "font-size-adjust" ||
        (property === "font-size" && (isUnsafeCssFontSize(normalizedValue) || hasAnyFunction)) ||
        (property === "line-height" && (isUnsafeCssLineHeight(normalizedValue) || hasAnyFunction)) ||
        (literalColorRequired && (literalColor === null || literalColor.alpha !== 1)) ||
        ((property === "color" || property === "-webkit-text-fill-color") && (insufficientVisibleCssColor || hasNonLiteralColorFunction))
      ) {
        issues.push(codeIssue("css.rendering_suppression_forbidden", filePath, "CSS cannot suppress rendered content in the accessible static subset.", "Keep validated semantic content visibly rendered; do not use display none, hidden visibility, hidden content visibility, or zero opacity."));
      }
      if (
        (property === "position" && /^(?:absolute|fixed|sticky)$/.test(normalizedValue)) ||
        property === "z-index" ||
        property === "grid-area" ||
        property.startsWith("grid-row") ||
        property.startsWith("grid-column") ||
        property === "contain" ||
        property === "order" ||
        (property === "flex-direction" && /^(?:row|column)-reverse$/i.test(normalizedValue)) ||
        (property === "flex-flow" && /(?:^|\s)(?:row|column)-reverse(?:\s|$)/i.test(normalizedValue)) ||
        property === "direction" ||
        property === "unicode-bidi"
      ) {
        issues.push(codeIssue("css.interaction_suppression_forbidden", filePath, "CSS cannot establish a full-cover or stacked overlay over validated content and controls.", "Use ordinary static, relative, flex, or automatically placed grid flow without absolute, fixed, sticky, stacking, overlapping grid placement, or paint containment."));
      }
      if (
        /(?:url|image-set|cross-fade|element|attr|expression|var)\s*\(/i.test(value) ||
        /\b(?:https?|data|javascript|file|blob):|\/\//i.test(value)
      ) {
        issues.push(codeIssue("css.remote_or_dynamic_value", filePath, "CSS URLs, external resources, and dynamic value functions are forbidden.", "Use literal colors, layout, typography, and local class selectors without resource URLs."));
      }
    });
    const effectiveGlobalForegrounds = globalForegrounds.length > 0
      ? globalForegrounds
      : [implicitForeground];
    const effectiveGlobalBackgrounds = globalBackgrounds.length > 0
      ? globalBackgrounds
      : [implicitBackground];
    const allDeclaredForegrounds = ruleColorPairs.flatMap((pair) => pair.foregrounds);
    const allDeclaredBackgrounds = ruleColorPairs.flatMap((pair) => pair.backgrounds);
    const conservativeForegrounds = [
      implicitForeground,
      ...CREATOR_CSS_USER_AGENT_INTERACTIVE_COLORS,
      ...allDeclaredForegrounds,
    ];
    const conservativeBackgrounds = [
      implicitBackground,
      ...allDeclaredBackgrounds,
    ];
    let contrastInsufficient = conservativeForegrounds.some((foreground) =>
      conservativeBackgrounds.some((background) =>
        cssContrastRatio(foreground, background) < CREATOR_MIN_TEXT_CONTRAST
      )
    );
    for (const focus of focusOutlineColors) {
      const baseSelector = focus.selector.replace(/:focus(?:-visible|-within)?\b/g, "").trim();
      const backgrounds = selectorBackgrounds.get(baseSelector) ?? effectiveGlobalBackgrounds;
      if (backgrounds.some((background) =>
        cssContrastRatio(focus.color, background) < 3
      )) {
        contrastInsufficient = true;
      }
    }
    if (contrastInsufficient) {
      issues.push(codeIssue("css.contrast_insufficient", filePath, "CSS literal foreground, background, or focus colors do not preserve conservative visible contrast.", "Use opaque literal colors with at least 4.5:1 text contrast and 3:1 focus-indicator contrast."));
    }
  } catch {
    issues.push(codeIssue("css.parse_failed", filePath, "CSS syntax could not be parsed.", "Return complete valid CSS syntax."));
  }
  return issues;
}

type AstRecord = Record<string, unknown> & { type?: string };

const BANNED_IDENTIFIERS = new Set([
  "eval", "Function", "fetch", "XMLHttpRequest", "WebSocket", "EventSource", "Worker",
  "SharedWorker", "BroadcastChannel", "WebAssembly", "Proxy", "Reflect", "globalThis",
  "localStorage", "sessionStorage", "indexedDB", "caches", "atob", "btoa", "setInterval",
  "setTimeout", "requestAnimationFrame", "queueMicrotask", "location", "history", "open", "top",
  "parent", "opener", "frames", "postMessage", "navigator", "RTCPeerConnection", "RTCDataChannel",
  "WebTransport", "WebSocketStream", "FileReader", "showOpenFilePicker", "showSaveFilePicker",
  "DOMParser", "Audio", "AudioContext", "OfflineAudioContext", "FontFace", "window", "self",
  "navigation", "require", "process", "module", "exports", "Deno", "Bun", "Buffer",
  "arguments", "BigInt", "JSON",
  "__dirname", "__filename", "global",
  "XPathResult", "XPathEvaluator", "webkitRTCPeerConnection", "mozRTCPeerConnection",
  "RTCIceTransport", "RTCDtlsTransport", "RTCSctpTransport",
  "Promise", "MessageChannel", "MessagePort", "MutationObserver", "ResizeObserver",
  "IntersectionObserver", "PerformanceObserver", "ReportingObserver", "Notification",
  "speechSynthesis", "SpeechSynthesisUtterance", "print", "alert", "confirm", "prompt",
  "requestIdleCallback", "cancelIdleCallback", "setImmediate", "clearImmediate", "scheduler",
  "Array", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Int8Array", "Uint8Array",
  "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array",
  "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array", "RegExp",
]);
const BANNED_MEMBER_NAMES = new Set([
  "constructor", "prototype", "__proto__", "cookie", "localStorage", "sessionStorage",
  "indexedDB", "caches", "serviceWorker", "sendBeacon", "location", "history", "open", "top",
  "parent", "opener", "frames", "postMessage", "innerHTML", "outerHTML", "insertAdjacentHTML",
  "write", "writeln", "setAttribute", "createObjectURL", "revokeObjectURL", "fromCharCode",
  "href", "src", "srcset", "action", "formAction", "target", "download",
  "protocol", "host", "hostname", "port", "username", "password", "origin", "pathname",
  "search", "hash", "httpEquiv",
  "assign", "defineProperty", "defineProperties", "getOwnPropertyDescriptor",
  "getOwnPropertyDescriptors", "getPrototypeOf", "setPrototypeOf", "call", "apply", "bind",
  "credentials", "usb", "serial", "hid", "bluetooth", "mediaDevices", "share",
  "defaultView", "keys", "values", "entries",
  "setAttributeNS", "setAttributeNode", "setAttributeNodeNS", "createAttribute",
  "createAttributeNS", "getAttributeNode", "getAttributeNodeNS", "attributes", "nodeValue",
  "getNamedItem", "setNamedItem", "setNamedItemNS", "DOMParser", "createContextualFragment",
  "execCommand", "createElement", "createElementNS", "append", "prepend", "appendChild",
  "insertBefore", "replaceChild", "replaceChildren", "insertAdjacentElement", "before", "after",
  "replaceWith", "cloneNode", "style", "cssText", "setProperty", "insertRule", "deleteRule",
  "replaceSync", "replace", "adoptedStyleSheets", "paintWorklet", "audioWorklet", "addModule",
  "background", "poster", "codeBase", "archive", "domain",
  "navigate", "reload", "traverseTo", "back", "forward", "setHTMLUnsafe", "setHTML",
  "parseHTMLUnsafe", "parseHTML", "files", "showPicker", "type", "webkitdirectory",
  "accept", "capture", "exec", "execFile", "spawn", "fork",
  "evaluate", "createExpression", "createNSResolver", "singleNodeValue", "iterateNext",
  "snapshotItem", "__lookupGetter__", "__lookupSetter__", "__defineGetter__", "__defineSetter__",
  "then", "catch", "finally", "repeat", "padStart", "padEnd", "requestPermission",
  "requestFullscreen", "animate", "getVoices", "speak",
  "click", "submit", "requestSubmit", "dispatchEvent",
  "concat", "join", "replaceAll", "reduce", "reduceRight", "flat", "flatMap",
  "forEach", "map", "filter", "some", "every", "find", "findIndex", "findLast",
  "findLastIndex", "sort", "toSorted", "push", "unshift", "splice",
  "callee", "caller", "match", "matchAll", "search",
  "removeChild", "removeAttribute", "toggleAttribute", "outerText", "hidden", "ariaHidden",
  "role", "tabIndex", "htmlFor", "createRange", "selectNode", "selectNodeContents",
  "deleteContents", "extractContents", "insertNode", "surroundContents", "getSelection",
  "deleteFromDocument", "addRange", "removeAllRanges", "modify",
  "stringify", "toString", "toLocaleString", "valueOf",
]);
const BANNED_NODE_TYPES = new Set([
  "ImportDeclaration", "ExportNamedDeclaration", "ExportDefaultDeclaration", "ExportAllDeclaration",
  "ImportExpression", "WithStatement", "MetaProperty", "ClassDeclaration", "ClassExpression",
  "SpreadElement", "RestElement", "AssignmentPattern", "TaggedTemplateExpression", "ArrayPattern", "ObjectPattern",
]);

function isAstRecord(value: unknown): value is AstRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const STATIC_TRUTHY_OBJECT = Symbol("creator-static-truthy-object");
const STATIC_UNKNOWN = Symbol("creator-static-unknown");
type StaticValue =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | typeof STATIC_TRUTHY_OBJECT;

function readStaticBinaryValue(
  operator: string,
  left: StaticValue,
  right: StaticValue
): StaticValue | typeof STATIC_UNKNOWN {
  if (left === STATIC_TRUTHY_OBJECT || right === STATIC_TRUTHY_OBJECT) {
    return STATIC_UNKNOWN;
  }
  if (operator === "===") return left === right;
  if (operator === "!==") return left !== right;
  if (typeof left === "number" && typeof right === "number") {
    switch (operator) {
      case "+": return left + right;
      case "-": return left - right;
      case "*": return left * right;
      case "/": return left / right;
      case "%": return left % right;
      case "**": return left ** right;
      case "|": return left | right;
      case "&": return left & right;
      case "^": return left ^ right;
      case "<<": return left << right;
      case ">>": return left >> right;
      case ">>>": return left >>> right;
      case "<": return left < right;
      case "<=": return left <= right;
      case ">": return left > right;
      case ">=": return left >= right;
      default: return STATIC_UNKNOWN;
    }
  }
  if (typeof left === "string" && typeof right === "string") {
    switch (operator) {
      case "+": return left + right;
      case "<": return left < right;
      case "<=": return left <= right;
      case ">": return left > right;
      case ">=": return left >= right;
      default: return STATIC_UNKNOWN;
    }
  }
  return STATIC_UNKNOWN;
}

function readStaticValue(
  value: unknown,
  depth = 0
): StaticValue | typeof STATIC_UNKNOWN {
  if (depth > 32 || !isAstRecord(value)) return STATIC_UNKNOWN;
  if (value.type === "Literal") {
    if (isAstRecord(value.regex)) return STATIC_TRUTHY_OBJECT;
    if (
      value.value === null ||
      ["string", "number", "bigint", "boolean", "undefined"].includes(
        typeof value.value
      )
    ) {
      return value.value as string | number | bigint | boolean | null | undefined;
    }
    return STATIC_UNKNOWN;
  }
  if (value.type === "TemplateLiteral") {
    if (!Array.isArray(value.expressions) || value.expressions.length !== 0) {
      return STATIC_UNKNOWN;
    }
    const quasi = Array.isArray(value.quasis) ? value.quasis[0] : null;
    const quasiValue = isAstRecord(quasi) && isAstRecord(quasi.value) ? quasi.value : null;
    return (
      typeof quasiValue?.cooked === "string"
        ? quasiValue.cooked
        : typeof quasiValue?.raw === "string"
          ? quasiValue.raw
          : STATIC_UNKNOWN
    );
  }
  if (
    [
      "ArrayExpression",
      "ObjectExpression",
      "FunctionExpression",
      "ArrowFunctionExpression",
      "ClassExpression",
      "NewExpression",
    ].includes(value.type ?? "")
  ) {
    return STATIC_TRUTHY_OBJECT;
  }
  if (value.type === "Identifier") {
    if (value.name === "Infinity") return Number.POSITIVE_INFINITY;
    if (value.name === "NaN") return Number.NaN;
    if (value.name === "undefined") return undefined;
    if (value.name === "document") return STATIC_TRUTHY_OBJECT;
  }
  if (value.type === "UnaryExpression") {
    if (value.operator === "void") return undefined;
    if (value.operator === "typeof") return "static-type";
    const argument = readStaticValue(value.argument, depth + 1);
    if (argument === STATIC_UNKNOWN) return STATIC_UNKNOWN;
    if (value.operator === "!") {
      return !Boolean(argument);
    }
    if (argument === STATIC_TRUTHY_OBJECT || typeof argument === "bigint") {
      return STATIC_UNKNOWN;
    }
    if (value.operator === "+") return Number(argument);
    if (value.operator === "-") return -Number(argument);
    if (value.operator === "~") return ~Number(argument);
    return STATIC_UNKNOWN;
  }
  if (value.type === "SequenceExpression" && Array.isArray(value.expressions)) {
    return readStaticValue(value.expressions.at(-1), depth + 1);
  }
  if (value.type === "LogicalExpression") {
    const left = readStaticValue(value.left, depth + 1);
    if (left === STATIC_UNKNOWN) return STATIC_UNKNOWN;
    if (value.operator === "&&") {
      return Boolean(left)
        ? readStaticValue(value.right, depth + 1)
        : left;
    }
    if (value.operator === "||") {
      return Boolean(left)
        ? left
        : readStaticValue(value.right, depth + 1);
    }
    if (value.operator === "??") {
      return left === null || left === undefined
        ? readStaticValue(value.right, depth + 1)
        : left;
    }
  }
  if (value.type === "ConditionalExpression") {
    const test = readStaticValue(value.test, depth + 1);
    if (test === STATIC_UNKNOWN) return STATIC_UNKNOWN;
    return readStaticValue(
      Boolean(test) ? value.consequent : value.alternate,
      depth + 1
    );
  }
  if (value.type === "BinaryExpression" && typeof value.operator === "string") {
    const left = readStaticValue(value.left, depth + 1);
    const right = readStaticValue(value.right, depth + 1);
    if (left === STATIC_UNKNOWN || right === STATIC_UNKNOWN) return STATIC_UNKNOWN;
    return readStaticBinaryValue(value.operator, left, right);
  }
  if (value.type === "AssignmentExpression" && value.operator === "=") {
    return readStaticValue(value.right, depth + 1);
  }
  return STATIC_UNKNOWN;
}

function readStaticBoolean(value: unknown): boolean | null {
  const result = readStaticValue(value);
  return result === STATIC_UNKNOWN ? null : Boolean(result);
}

const CREATOR_MAX_STATIC_LOOP_ITERATIONS = 10_000;
const CREATOR_MAX_STATIC_LOOP_WORK = 100_000;

function saturatingCreatorWorkProduct(...values: readonly number[]): number {
  let product = 1;
  for (const value of values) {
    if (!Number.isFinite(value) || value < 0) return CREATOR_MAX_STATIC_LOOP_WORK + 1;
    product *= Math.max(1, value);
    if (product > CREATOR_MAX_STATIC_LOOP_WORK) return CREATOR_MAX_STATIC_LOOP_WORK + 1;
  }
  return product;
}

function readCreatorLoopBodyWeight(value: unknown, depth = 0): number {
  if (depth > 128) return CREATOR_MAX_STATIC_LOOP_WORK + 1;
  if (Array.isArray(value)) {
    return value.reduce(
      (sum, child) => Math.min(
        CREATOR_MAX_STATIC_LOOP_WORK + 1,
        sum + readCreatorLoopBodyWeight(child, depth + 1)
      ),
      0
    );
  }
  if (!isAstRecord(value)) return 0;
  if (
    depth > 0 &&
    ["ForStatement", "WhileStatement", "DoWhileStatement", "ForInStatement", "ForOfStatement"].includes(value.type ?? "")
  ) {
    return 1;
  }
  if (value.type === "Literal") {
    return typeof value.value === "string" ? Math.max(1, value.value.length) : 1;
  }
  let weight = value.type === "Identifier" ? 1 : 0;
  for (const [key, child] of Object.entries(value)) {
    if (["start", "end", "loc", "range", "type", "raw"].includes(key)) continue;
    weight = Math.min(
      CREATOR_MAX_STATIC_LOOP_WORK + 1,
      weight + readCreatorLoopBodyWeight(child, depth + 1)
    );
  }
  return Math.max(1, weight);
}

function readIdentifierName(value: unknown): string | null {
  return isAstRecord(value) && value.type === "Identifier" && typeof value.name === "string"
    ? value.name
    : null;
}

function readStaticFiniteNumber(value: unknown): number | null {
  if (!isAstRecord(value)) return null;
  if (value.type === "Literal" && typeof value.value === "number" && Number.isFinite(value.value)) {
    return value.value;
  }
  if (value.type === "UnaryExpression" && (value.operator === "+" || value.operator === "-")) {
    const literal = isAstRecord(value.argument) && value.argument.type === "Literal" && typeof value.argument.value === "number"
      ? value.argument.value
      : null;
    if (literal === null || !Number.isFinite(literal)) return null;
    return value.operator === "-" ? -literal : literal;
  }
  return null;
}

function readForLoopIterations(value: AstRecord): number | null {
  if (value.type !== "ForStatement") return null;
  const init = isAstRecord(value.init) ? value.init : null;
  let variableName: string | null = null;
  let start: number | null = null;
  if (
    init?.type === "VariableDeclaration" &&
    init.kind === "let" &&
    Array.isArray(init.declarations) &&
    init.declarations.length === 1
  ) {
    const declaration = isAstRecord(init.declarations[0]) ? init.declarations[0] : null;
    variableName = readIdentifierName(declaration?.id);
    start = readStaticFiniteNumber(declaration?.init);
  }
  if (!variableName || start === null) return null;

  const test = isAstRecord(value.test) && value.test.type === "BinaryExpression"
    ? value.test
    : null;
  if (!test || typeof test.operator !== "string") return null;
  let operator = test.operator;
  let bound: number | null = null;
  if (readIdentifierName(test.left) === variableName) {
    bound = readStaticFiniteNumber(test.right);
  } else if (readIdentifierName(test.right) === variableName) {
    bound = readStaticFiniteNumber(test.left);
    operator = ({ "<": ">", "<=": ">=", ">": "<", ">=": "<=" } as Record<string, string>)[operator] ?? "";
  }
  if (bound === null || !["<", "<=", ">", ">="].includes(operator)) return null;

  const update = isAstRecord(value.update) ? value.update : null;
  let step: number | null = null;
  if (update?.type === "UpdateExpression" && readIdentifierName(update.argument) === variableName) {
    step = update.operator === "++" ? 1 : update.operator === "--" ? -1 : null;
  } else if (
    update?.type === "AssignmentExpression" &&
    readIdentifierName(update.left) === variableName &&
    (update.operator === "+=" || update.operator === "-=")
  ) {
    const magnitude = readStaticFiniteNumber(update.right);
    if (magnitude !== null) step = update.operator === "+=" ? magnitude : -magnitude;
  }
  if (step === null || step === 0) return Number.POSITIVE_INFINITY;

  const initiallyTrue =
    operator === "<" ? start < bound :
      operator === "<=" ? start <= bound :
        operator === ">" ? start > bound : start >= bound;
  if (!initiallyTrue) return 0;
  if ((operator === "<" || operator === "<=") && step < 0) return Number.POSITIVE_INFINITY;
  if ((operator === ">" || operator === ">=") && step > 0) return Number.POSITIVE_INFINITY;
  const compare = (candidate: number): boolean =>
    operator === "<" ? candidate < (bound as number) :
      operator === "<=" ? candidate <= (bound as number) :
        operator === ">" ? candidate > (bound as number) : candidate >= (bound as number);
  let candidate = start;
  let iterations = 0;
  while (compare(candidate)) {
    if (iterations > CREATOR_MAX_STATIC_LOOP_ITERATIONS) return Number.POSITIVE_INFINITY;
    const next = candidate + step;
    if (Object.is(next, candidate)) return Number.POSITIVE_INFINITY;
    candidate = next;
    iterations += 1;
  }
  return iterations;
}

function readNamedFunctionAnalysis(root: unknown): Readonly<{
  hasCycle: boolean;
  functionNames: ReadonlySet<string>;
  callableNames: ReadonlySet<string>;
}> {
  const functions = new Map<string, AstRecord>();
  const aliases = new Map<string, string>();
  const discovery: unknown[] = [root];
  while (discovery.length > 0) {
    const current = discovery.pop();
    if (Array.isArray(current)) {
      discovery.push(...current);
      continue;
    }
    if (!isAstRecord(current)) continue;
    if (current.type === "FunctionDeclaration") {
      const name = readIdentifierName(current.id);
      if (name) functions.set(name, current);
    }
    if (current.type === "VariableDeclarator") {
      const name = readIdentifierName(current.id);
      const init = isAstRecord(current.init) ? current.init : null;
      if (name && init && ["FunctionExpression", "ArrowFunctionExpression"].includes(init.type ?? "")) {
        functions.set(name, init);
      }
      const alias = readIdentifierName(current.init);
      if (name && alias) aliases.set(name, alias);
    }
    if (current.type === "AssignmentExpression" && current.operator === "=") {
      const name = readIdentifierName(current.left);
      const alias = readIdentifierName(current.right);
      if (name && alias) aliases.set(name, alias);
    }
    if (current.type === "FunctionExpression") {
      const name = readIdentifierName(current.id);
      if (name) functions.set(name, current);
    }
    for (const [key, child] of Object.entries(current)) {
      if (!["start", "end", "loc", "range"].includes(key)) discovery.push(child);
    }
  }

  const edges = new Map<string, Set<string>>();
  const resolveAlias = (name: string): string | null => {
    const seen = new Set<string>();
    let current = name;
    while (aliases.has(current)) {
      if (seen.has(current)) return null;
      seen.add(current);
      current = aliases.get(current) as string;
    }
    return functions.has(current) ? current : null;
  };
  for (const [name, fn] of functions) {
    const calls = new Set<string>();
    const body = isAstRecord(fn.body) ? fn.body : fn.body;
    const stack: unknown[] = [body];
    while (stack.length > 0) {
      const current = stack.pop();
      if (Array.isArray(current)) {
        stack.push(...current);
        continue;
      }
      if (!isAstRecord(current)) continue;
      if (current.type === "CallExpression") {
        const callee = readIdentifierName(current.callee);
        const target = callee ? resolveAlias(callee) : null;
        if (target) calls.add(target);
      }
      for (const [key, child] of Object.entries(current)) {
        if (!["start", "end", "loc", "range"].includes(key)) stack.push(child);
      }
    }
    edges.set(name, calls);
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (name: string): boolean => {
    if (visiting.has(name)) return true;
    if (visited.has(name)) return false;
    visiting.add(name);
    for (const target of edges.get(name) ?? []) {
      if (visit(target)) return true;
    }
    visiting.delete(name);
    visited.add(name);
    return false;
  };
  const callableNames = new Set<string>(functions.keys());
  for (const alias of aliases.keys()) {
    if (resolveAlias(alias)) callableNames.add(alias);
  }
  return {
    hasCycle: [...functions.keys()].some(visit),
    functionNames: new Set(functions.keys()),
    callableNames,
  };
}

function countIdentifierReferences(root: unknown, name: string, limit = 2): number {
  const stack: Array<{ value: unknown; parent: AstRecord | null; key: string | null }> = [
    { value: root, parent: null, key: null },
  ];
  let count = 0;
  while (stack.length > 0 && count < limit) {
    const current = stack.pop() as { value: unknown; parent: AstRecord | null; key: string | null };
    if (Array.isArray(current.value)) {
      for (const child of current.value) stack.push({ value: child, parent: current.parent, key: current.key });
      continue;
    }
    if (!isAstRecord(current.value)) continue;
    if (current.value.type === "Identifier" && current.value.name === name) {
      const isNonComputedMemberName = current.parent?.type === "MemberExpression" && current.key === "property" && current.parent.computed !== true;
      const isNonComputedPropertyName = current.parent?.type === "Property" && current.key === "key" && current.parent.computed !== true;
      if (!isNonComputedMemberName && !isNonComputedPropertyName) count += 1;
    }
    for (const [key, child] of Object.entries(current.value)) {
      if (["start", "end", "loc", "range"].includes(key)) continue;
      stack.push({ value: child, parent: current.value, key });
    }
  }
  return count;
}

function containsNamedFunctionReference(root: unknown, names: ReadonlySet<string>): boolean {
  const stack: Array<{ value: unknown; parent: AstRecord | null; key: string | null }> = [
    { value: root, parent: null, key: null },
  ];
  while (stack.length > 0) {
    const current = stack.pop() as { value: unknown; parent: AstRecord | null; key: string | null };
    if (Array.isArray(current.value)) {
      for (const child of current.value) stack.push({ value: child, parent: current.parent, key: current.key });
      continue;
    }
    if (!isAstRecord(current.value)) continue;
    if (current.value.type === "Identifier" && names.has(String(current.value.name))) {
      const isNonComputedMemberName = current.parent?.type === "MemberExpression" && current.key === "property" && current.parent.computed !== true;
      const isNonComputedPropertyName = current.parent?.type === "Property" && current.key === "key" && current.parent.computed !== true;
      if (!isNonComputedMemberName && !isNonComputedPropertyName) return true;
    }
    for (const [key, child] of Object.entries(current.value)) {
      if (["start", "end", "loc", "range"].includes(key)) continue;
      stack.push({ value: child, parent: current.value, key });
    }
  }
  return false;
}

function containsFunctionValue(root: unknown): boolean {
  const stack: unknown[] = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    if (Array.isArray(current)) {
      stack.push(...current);
      continue;
    }
    if (!isAstRecord(current)) continue;
    if (["FunctionExpression", "ArrowFunctionExpression"].includes(current.type ?? "")) return true;
    for (const [key, child] of Object.entries(current)) {
      if (!["start", "end", "loc", "range"].includes(key)) stack.push(child);
    }
  }
  return false;
}

function collectCreatorAllowedLoopUpdates(root: unknown): ReadonlySet<unknown> {
  const allowed = new Set<unknown>();
  const stack: unknown[] = [root];
  let visited = 0;
  while (stack.length > 0 && visited <= 20_000) {
    const value = stack.pop();
    if (Array.isArray(value)) {
      stack.push(...value);
      continue;
    }
    if (!isAstRecord(value)) continue;
    visited += 1;
    if (
      value.type === "ForStatement" &&
      readForLoopIterations(value) !== null &&
      isAstRecord(value.update)
    ) {
      allowed.add(value.update);
    }
    for (const [key, child] of Object.entries(value)) {
      if (!["start", "end", "loc", "range"].includes(key)) stack.push(child);
    }
  }
  return allowed;
}

function isForbiddenCreatorBindingName(name: string | null): boolean {
  return name !== null && (
    new Set(["Infinity", "NaN", "document", "name", "undefined"]).has(name) ||
    /^on/i.test(name)
  );
}

function hasExcessiveStaticExpansion(root: unknown): boolean {
  const bindings: Array<{ start: number; name: string; value: unknown }> = [];
  const discovery: unknown[] = [root];
  while (discovery.length > 0) {
    const current = discovery.pop();
    if (Array.isArray(current)) {
      discovery.push(...current);
      continue;
    }
    if (!isAstRecord(current)) continue;
    if (current.type === "VariableDeclarator") {
      const name = readIdentifierName(current.id);
      if (name && current.init !== undefined) {
        bindings.push({ start: typeof current.start === "number" ? current.start : Number.MAX_SAFE_INTEGER, name, value: current.init });
      }
    }
    if (current.type === "AssignmentExpression" && current.operator === "=") {
      const name = readIdentifierName(current.left);
      if (name) {
        bindings.push({ start: typeof current.start === "number" ? current.start : Number.MAX_SAFE_INTEGER, name, value: current.right });
      }
    }
    for (const [key, child] of Object.entries(current)) {
      if (!["start", "end", "loc", "range"].includes(key)) discovery.push(child);
    }
  }
  bindings.sort((left, right) => left.start - right.start);
  const weights = new Map<string, number>();
  const readWeight = (value: unknown, depth = 0): number => {
    if (depth > 64 || !isAstRecord(value)) return 1;
    if (value.type === "Literal") {
      return typeof value.value === "string" ? Math.max(1, value.value.length) : 1;
    }
    if (value.type === "Identifier") return weights.get(String(value.name)) ?? 1;
    if (value.type === "TemplateLiteral") {
      const literalWeight = Array.isArray(value.quasis)
        ? value.quasis.reduce((sum, quasi) => {
            const raw = isAstRecord(quasi) && isAstRecord(quasi.value) && typeof quasi.value.raw === "string" ? quasi.value.raw.length : 0;
            return Math.min(CREATOR_MAX_STATIC_LOOP_WORK + 1, sum + raw);
          }, 0)
        : 0;
      const expressionWeight = Array.isArray(value.expressions)
        ? value.expressions.reduce((sum, expression) => Math.min(CREATOR_MAX_STATIC_LOOP_WORK + 1, sum + readWeight(expression, depth + 1)), 0)
        : 0;
      return Math.min(CREATOR_MAX_STATIC_LOOP_WORK + 1, Math.max(1, literalWeight + expressionWeight));
    }
    if (value.type === "BinaryExpression" && value.operator === "+") {
      return Math.min(CREATOR_MAX_STATIC_LOOP_WORK + 1, readWeight(value.left, depth + 1) + readWeight(value.right, depth + 1));
    }
    if (value.type === "ArrayExpression" && Array.isArray(value.elements)) {
      return value.elements.reduce((sum, element) => Math.min(CREATOR_MAX_STATIC_LOOP_WORK + 1, sum + readWeight(element, depth + 1)), 1);
    }
    if (value.type === "ObjectExpression" && Array.isArray(value.properties)) {
      return value.properties.reduce((sum, property) => {
        const propertyValue = isAstRecord(property) ? property.value : null;
        return Math.min(CREATOR_MAX_STATIC_LOOP_WORK + 1, sum + readWeight(propertyValue, depth + 1));
      }, 1);
    }
    if (value.type === "ConditionalExpression") {
      return Math.max(readWeight(value.consequent, depth + 1), readWeight(value.alternate, depth + 1));
    }
    if (value.type === "LogicalExpression") {
      return Math.max(readWeight(value.left, depth + 1), readWeight(value.right, depth + 1));
    }
    if (value.type === "SequenceExpression" && Array.isArray(value.expressions)) {
      return readWeight(value.expressions.at(-1), depth + 1);
    }
    return 1;
  };
  for (const binding of bindings) {
    const weight = readWeight(binding.value);
    if (weight > CREATOR_MAX_STATIC_LOOP_WORK) return true;
    weights.set(binding.name, weight);
  }
  return false;
}

export type CreatorJavaScriptHtmlTarget = Readonly<{
  id: string;
  elementName: string;
  hasElementChildren: boolean;
  inputType: string | null;
}>;

type CreatorDomAnalysisContext = Readonly<{
  filePath: string;
  htmlTargets: readonly CreatorJavaScriptHtmlTarget[] | null;
  includeLocalIssues: boolean;
}>;

function readMemberName(value: unknown): string | null {
  if (!isAstRecord(value) || value.type !== "MemberExpression" || !isAstRecord(value.property)) return null;
  if (value.property.type === "Identifier" && typeof value.property.name === "string") return value.property.name;
  if (value.property.type === "Literal" && typeof value.property.value === "string") return value.property.value;
  return null;
}

function readExactDocumentQueryId(value: unknown): string | null {
  if (!isAstRecord(value) || value.type !== "CallExpression" || !isAstRecord(value.callee)) return null;
  const callee = value.callee;
  if (
    callee.type !== "MemberExpression" ||
    readMemberName(callee) !== "querySelector" ||
    !isAstRecord(callee.object) ||
    callee.object.type !== "Identifier" ||
    callee.object.name !== "document" ||
    !Array.isArray(value.arguments) ||
    value.arguments.length !== 1 ||
    !isAstRecord(value.arguments[0]) ||
    value.arguments[0].type !== "Literal" ||
    typeof value.arguments[0].value !== "string" ||
    !/^#[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(value.arguments[0].value)
  ) {
    return null;
  }
  return value.arguments[0].value.slice(1);
}

function validateCreatorJavaScriptDomSubset(
  content: string,
  context: CreatorDomAnalysisContext
): readonly CreatorValidationIssue[] {
  let root: unknown;
  try {
    root = acorn.parse(content, { ecmaVersion: 2022, sourceType: "script", allowHashBang: false });
  } catch {
    return [];
  }
  const issues: CreatorValidationIssue[] = [];
  const emitted = new Set<string>();
  const emit = (code: string, message: string, repair: string) => {
    if (emitted.has(code)) return;
    emitted.add(code);
    issues.push(codeIssue(code, context.filePath, message, repair));
  };
  const records: Array<Readonly<{ node: AstRecord; parent: AstRecord | null; key: string | null }>> = [];
  const stack: Array<Readonly<{ value: unknown; parent: AstRecord | null; key: string | null; depth: number }>> = [
    { value: root, parent: null, key: null, depth: 0 },
  ];
  while (stack.length > 0 && records.length <= 20_000) {
    const current = stack.pop()!;
    if (current.depth > 256) break;
    if (Array.isArray(current.value)) {
      for (let index = current.value.length - 1; index >= 0; index -= 1) {
        stack.push({ value: current.value[index], parent: current.parent, key: current.key, depth: current.depth + 1 });
      }
      continue;
    }
    if (!isAstRecord(current.value)) continue;
    records.push({ node: current.value, parent: current.parent, key: current.key });
    for (const [key, child] of Object.entries(current.value)) {
      if (["start", "end", "loc", "range"].includes(key)) continue;
      stack.push({ value: child, parent: current.value, key, depth: current.depth + 1 });
    }
  }
  if (records.length > 20_000 || stack.length > 0) return issues;

  const selectorBindings = new Map<string, string>();
  const selectorBindingStarts = new Map<string, number>();
  const callbackBindings = new Set<string>();
  const callbackBindingStarts = new Map<string, number>();
  const orderedRecords = [...records].sort(
    (left, right) => Number(left.node.start ?? 0) - Number(right.node.start ?? 0)
  );
  const parentByNode = new Map(records.map((record) => [record.node, record]));
  const isInsideFunction = (node: AstRecord): boolean => {
    let ancestor = parentByNode.get(node)?.parent ?? null;
    while (ancestor) {
      if (["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"].includes(ancestor.type ?? "")) return true;
      ancestor = parentByNode.get(ancestor)?.parent ?? null;
    }
    return false;
  };
  const declarationCounts = new Map<string, number>();
  const assignedIdentifiers = new Set<string>();
  for (const { node } of orderedRecords) {
    if (node.type === "VariableDeclarator") {
      const name = readIdentifierName(node.id);
      if (name) declarationCounts.set(name, (declarationCounts.get(name) ?? 0) + 1);
    }
    if (node.type === "FunctionDeclaration") {
      const name = readIdentifierName(node.id);
      if (name) declarationCounts.set(name, (declarationCounts.get(name) ?? 0) + 1);
    }
    if (
      ["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"].includes(node.type ?? "") &&
      Array.isArray(node.params)
    ) {
      for (const parameter of node.params) {
        const name = readIdentifierName(parameter);
        if (name) declarationCounts.set(name, (declarationCounts.get(name) ?? 0) + 1);
      }
    }
    if (node.type === "AssignmentExpression") {
      const name = readIdentifierName(node.left);
      if (name) assignedIdentifiers.add(name);
    }
    if (node.type === "UpdateExpression") {
      const name = readIdentifierName(node.argument);
      if (name) assignedIdentifiers.add(name);
    }
  }
  const isTopLevelConstDeclarator = (node: AstRecord): boolean => {
    const declarationRecord = isAstRecord(node) ? parentByNode.get(node) : undefined;
    const declaration = declarationRecord?.parent;
    const declarationParent = declaration ? parentByNode.get(declaration)?.parent : null;
    return declaration?.type === "VariableDeclaration" && declaration.kind === "const" && declarationParent?.type === "Program";
  };
  for (const { node, parent } of orderedRecords) {
    if (node.type === "FunctionDeclaration") {
      const name = readIdentifierName(node.id);
      if (
        name &&
        parent?.type === "Program" &&
        declarationCounts.get(name) === 1 &&
        !assignedIdentifiers.has(name)
      ) {
        callbackBindings.add(name);
        callbackBindingStarts.set(name, Number.NEGATIVE_INFINITY);
      }
    }
    if (node.type !== "VariableDeclarator" || !isAstRecord(node.id)) continue;
    const bindingName = readIdentifierName(node.id);
    if (!bindingName) continue;
    const queryId = readExactDocumentQueryId(node.init);
    const canOwnStableBinding =
      isTopLevelConstDeclarator(node) &&
      declarationCounts.get(bindingName) === 1 &&
      !assignedIdentifiers.has(bindingName);
    if (queryId && canOwnStableBinding) {
      selectorBindings.set(bindingName, queryId);
      selectorBindingStarts.set(bindingName, Number(node.end ?? node.start ?? 0));
    } else if (queryId && context.includeLocalIssues) {
      emit("js.dom_binding_invalid", "DOM query bindings must be unique immutable top-level const declarations.", "Bind each exact document.querySelector result once in one top-level const without shadowing or reassignment.");
    }
    if (
      canOwnStableBinding &&
      isAstRecord(node.init) &&
      ["FunctionExpression", "ArrowFunctionExpression"].includes(node.init.type ?? "")
    ) {
      callbackBindings.add(bindingName);
      callbackBindingStarts.set(bindingName, Number(node.end ?? node.start ?? 0));
    }
    else if (readMemberName(node.init) === "querySelector" && context.includeLocalIssues) {
      emit("js.dom_method_extraction", "DOM query methods cannot be extracted from their document receiver.", "Call document.querySelector directly with one exact local #id selector.");
    }
  }
  for (let pass = 0; pass < orderedRecords.length; pass += 1) {
    let changed = false;
    for (const { node } of orderedRecords) {
      if (node.type !== "VariableDeclarator" || !isAstRecord(node.id) || !isTopLevelConstDeclarator(node)) continue;
      const bindingName = readIdentifierName(node.id);
      const aliasName = readIdentifierName(node.init);
      if (
        !bindingName ||
        !aliasName ||
        declarationCounts.get(bindingName) !== 1 ||
        assignedIdentifiers.has(bindingName)
      ) continue;
      const aliasTarget = selectorBindings.get(aliasName);
      if (aliasTarget && !selectorBindings.has(bindingName)) {
        selectorBindings.set(bindingName, aliasTarget);
        selectorBindingStarts.set(bindingName, Number(node.end ?? node.start ?? 0));
        changed = true;
      }
      if (callbackBindings.has(aliasName) && !callbackBindings.has(bindingName)) {
        callbackBindings.add(bindingName);
        callbackBindingStarts.set(bindingName, Number(node.end ?? node.start ?? 0));
        changed = true;
      }
    }
    if (!changed) break;
  }

  const resolveTargetId = (value: unknown, useStart = Number.POSITIVE_INFINITY): string | null => {
    const direct = readExactDocumentQueryId(value);
    if (direct) return direct;
    const identifier = readIdentifierName(value);
    if (!identifier || (selectorBindingStarts.get(identifier) ?? Number.POSITIVE_INFINITY) >= useStart) return null;
    return selectorBindings.get(identifier) ?? null;
  };
  const targetsFor = (id: string): readonly CreatorJavaScriptHtmlTarget[] =>
    context.htmlTargets?.filter((target) => target.id === id) ?? [];
  const requireBoundTarget = (value: unknown, useStart = Number.POSITIVE_INFINITY): Readonly<{ id: string; target: CreatorJavaScriptHtmlTarget | null }> | null => {
    const id = resolveTargetId(value, useStart);
    if (!id) {
      if (context.includeLocalIssues) {
        emit("js.dom_target_unbound", "DOM mutations and event registration require an exact document.querySelector(\"#id\") target.", "Bind one declared HTML ID with document.querySelector and use that exact local element.");
      }
      return null;
    }
    if (context.htmlTargets === null) return { id, target: null };
    const matches = targetsFor(id);
    if (matches.length !== 1) {
      emit("js.selector_unresolved", `JavaScript selector #${id} does not resolve to one exact validated HTML target.`, "Use one unique ID declared in the validated HTML loaded with this local script.");
      return { id, target: null };
    }
    return { id, target: matches[0] };
  };
  const meaningfulStaticText = (value: unknown): boolean => {
    if (!isAstRecord(value)) return false;
    const text = value.type === "Literal" && typeof value.value === "string"
      ? value.value
      : value.type === "TemplateLiteral" && Array.isArray(value.expressions) && value.expressions.length === 0 &&
          Array.isArray(value.quasis) && isAstRecord(value.quasis[0]) && isAstRecord(value.quasis[0].value) &&
          typeof value.quasis[0].value.cooked === "string"
        ? value.quasis[0].value.cooked
        : null;
    return typeof text === "string" && text.length <= 512 && !/\p{Cf}/u.test(text) && /[\p{L}\p{N}\p{P}\p{S}]/u.test(text.normalize("NFKC"));
  };
  const boundedStaticScalar = (value: unknown): boolean => {
    if (!isAstRecord(value)) return false;
    if (value.type === "Literal") {
      return (
        (typeof value.value === "string" && value.value.length <= 512 && !/\p{Cf}/u.test(value.value)) ||
        (typeof value.value === "number" && Number.isFinite(value.value) && Math.abs(value.value) <= 1_000_000)
      );
    }
    return value.type === "TemplateLiteral" && Array.isArray(value.expressions) && value.expressions.length === 0 &&
      Array.isArray(value.quasis) && value.quasis.length === 1 && isAstRecord(value.quasis[0]) && isAstRecord(value.quasis[0].value) &&
      typeof value.quasis[0].value.cooked === "string" && value.quasis[0].value.cooked.length <= 512 && !/\p{Cf}/u.test(value.quasis[0].value.cooked);
  };

  const allowedEvents = new Set(["change", "click", "input", "keydown", "keyup"]);
  const allowedEventTargets = new Set(["a", "button", "input", "select", "summary", "textarea"]);
  const registeredListenerKeys = new Set<string>();
  for (const { node, parent, key } of records) {
    if (node.type === "DebuggerStatement" && context.includeLocalIssues) {
      emit("js.debugger_forbidden", "Debugger statements can suspend preview execution and are forbidden.", "Remove debugger statements from generated client code.");
    }
    if (node.type === "ThrowStatement" && context.includeLocalIssues) {
      emit("js.throw_forbidden", "Explicit exceptions are outside the preview-ready JavaScript subset.", "Handle bounded local UI state without throwing from generated code.");
    }
    if (node.type === "MemberExpression") {
      const memberName = readMemberName(node);
      const directCall = parent?.type === "CallExpression" && key === "callee";
      const exactDocumentQuery =
        memberName === "querySelector" &&
        directCall &&
        node.computed !== true &&
        isAstRecord(node.object) &&
        node.object.type === "Identifier" &&
        node.object.name === "document";
      const exactEventRegistration =
        memberName === "addEventListener" && directCall && node.computed !== true;
      const exactClassMethod =
        ["add", "remove", "toggle"].includes(memberName ?? "") &&
        directCall &&
        node.computed !== true &&
        isAstRecord(node.object) &&
        node.object.type === "MemberExpression" &&
        node.object.computed !== true &&
        readMemberName(node.object) === "classList";
      const parentRecord = parent ? parentByNode.get(parent) : undefined;
      const exactClassListReceiver =
        memberName === "classList" &&
        node.computed !== true &&
        parent?.type === "MemberExpression" &&
        key === "object" &&
        parent.computed !== true &&
        ["add", "remove", "toggle"].includes(readMemberName(parent) ?? "") &&
        parentRecord?.parent?.type === "CallExpression" &&
        parentRecord.key === "callee";
      const exactTypedWrite =
        ["textContent", "value", "checked", "disabled"].includes(memberName ?? "") &&
        node.computed !== true &&
        parent?.type === "AssignmentExpression" &&
        key === "left";
      if (
        !exactDocumentQuery &&
        !exactEventRegistration &&
        !exactClassMethod &&
        !exactClassListReceiver &&
        !exactTypedWrite &&
        context.includeLocalIssues
      ) {
        emit("js.member_access_forbidden", "JavaScript member reads and calls are limited to the exact validated DOM subset.", "Use document.querySelector, top-level addEventListener, literal classList add/remove/toggle, or an allowlisted typed DOM assignment.");
      }
    }
    if (node.type === "MemberExpression" && readMemberName(node) === "querySelector") {
      const isDirectCall = parent?.type === "CallExpression" && key === "callee";
      if (!isDirectCall && context.includeLocalIssues) {
        emit("js.dom_method_extraction", "DOM query methods cannot be extracted, aliased, or invoked without their document receiver.", "Call document.querySelector directly with one exact local #id selector.");
      }
    }
    if (node.type === "CallExpression") {
      const callee = isAstRecord(node.callee) ? node.callee : null;
      const methodName = readMemberName(callee);
      if (methodName === "querySelector") {
        const queryId = readExactDocumentQueryId(node);
        if (!queryId) {
          if (context.includeLocalIssues) {
            emit("js.selector_invalid", "DOM queries require one literal, syntactically bounded #id selector on document.", "Use document.querySelector(\"#declared-id\") with one exact validated HTML ID.");
          }
        } else if (context.htmlTargets !== null) {
          requireBoundTarget(node);
        }
        continue;
      }
      if (methodName === "addEventListener" && callee) {
        if (isInsideFunction(node) && context.includeLocalIssues) {
          emit("js.event_registration_nested", "Event listeners cannot be registered from inside another callback or function.", "Register each bounded listener once during top-level initialization.");
        }
        const bound = requireBoundTarget(callee.object, Number(node.start ?? 0));
        const args = Array.isArray(node.arguments) ? node.arguments : [];
        const eventName = isAstRecord(args[0]) && args[0].type === "Literal" && typeof args[0].value === "string"
          ? args[0].value
          : null;
        const callback = args[1];
        const callbackName = readIdentifierName(callback);
        const callbackValid = isAstRecord(callback) && (
          callback.type === "FunctionExpression" ||
          callback.type === "ArrowFunctionExpression" ||
          (callback.type === "Identifier" &&
            callbackName !== null &&
            callbackBindings.has(callbackName) &&
            (callbackBindingStarts.get(callbackName) ?? Number.POSITIVE_INFINITY) < Number(node.start ?? 0))
        );
        const optionsValid = args.length <= 2 || (args.length === 3 && isAstRecord(args[2]) && args[2].type === "Literal" && args[2].value === false);
        if (!eventName || !allowedEvents.has(eventName) || !callbackValid || !optionsValid) {
          if (context.includeLocalIssues) {
            emit("js.event_contract_invalid", "Event listeners require one allowlisted literal event, a direct callback, and no dynamic options.", "Use click, input, change, keydown, or keyup with one direct synchronous callback.");
          }
        }
        if (bound && eventName && allowedEvents.has(eventName)) {
          const registrationKey = `${bound.id}\u0000${eventName}`;
          if (registeredListenerKeys.has(registrationKey)) {
            emit("js.duplicate_event_listener", `JavaScript registers more than one ${eventName} listener for #${bound.id}.`, "Register each exact target and literal event pair once during top-level initialization.");
          } else {
            registeredListenerKeys.add(registrationKey);
          }
        }
        if (bound?.target && !allowedEventTargets.has(bound.target.elementName)) {
          emit("js.event_target_invalid", `Event listener target #${bound.id} is not a native interactive element.`, "Register events only on a validated native link, button, input, select, summary, or textarea ID.");
        }
        continue;
      }
      if (["add", "remove", "toggle"].includes(methodName ?? "") && callee && isAstRecord(callee.object) && readMemberName(callee.object) === "classList") {
        requireBoundTarget(callee.object.object, Number(node.start ?? 0));
        const args = Array.isArray(node.arguments) ? node.arguments : [];
        if (
          args.length < 1 ||
          args.length > (methodName === "toggle" ? 2 : 8) ||
          args.some((argument, index) =>
            index === 1 && methodName === "toggle" && isAstRecord(argument) && argument.type === "Literal" && typeof argument.value === "boolean"
              ? false
              : !isAstRecord(argument) || argument.type !== "Literal" || typeof argument.value !== "string" ||
                !/^[A-Za-z_-][A-Za-z0-9_-]{0,63}$/.test(argument.value)
          )
        ) {
          if (context.includeLocalIssues) {
            emit("js.dom_token_invalid", "classList operations require bounded literal single-token class names.", "Use one or more literal ASCII class tokens without whitespace or dynamic values.");
          }
        }
        continue;
      }
      if (context.includeLocalIssues) {
        emit("js.call_forbidden", "Only exact document queries, event registration, and bounded classList calls are allowed.", "Use direct document.querySelector, addEventListener, or literal classList add/remove/toggle behavior.");
      }
    }
    if (node.type === "AssignmentExpression" && isAstRecord(node.left) && node.left.type === "MemberExpression") {
      const propertyName = readMemberName(node.left);
      const bound = requireBoundTarget(node.left.object, Number(node.start ?? 0));
      if (!propertyName || !["textContent", "value", "checked", "disabled"].includes(propertyName)) continue;
      const validValue =
        node.operator === "=" &&
        ((propertyName === "textContent" && meaningfulStaticText(node.right)) ||
          (propertyName === "value" && boundedStaticScalar(node.right)) ||
          (["checked", "disabled"].includes(propertyName) && isAstRecord(node.right) && node.right.type === "Literal" && typeof node.right.value === "boolean"));
      if (!validValue) {
        emit("js.dom_mutation_value_invalid", `JavaScript ${propertyName} mutation requires one exact bounded static value.`, "Use a meaningful literal text, a bounded literal string/finite number value, or an exact boolean for checked and disabled state.");
      }
      if (!bound?.target) continue;
      const target = bound.target;
      const validType =
        (propertyName === "textContent" && ["button", "p", "small", "span"].includes(target.elementName) && !target.hasElementChildren) ||
        (propertyName === "value" && (
          ["select", "textarea"].includes(target.elementName) ||
          (target.elementName === "input" && ["number", "range", "text"].includes(target.inputType ?? "text"))
        )) ||
        (propertyName === "checked" && target.elementName === "input" && ["checkbox", "radio"].includes(target.inputType ?? "")) ||
        (propertyName === "disabled" && ["button", "input", "select", "textarea"].includes(target.elementName));
      if (!validType) {
        emit("js.dom_mutation_target_invalid", `JavaScript ${propertyName} mutation is incompatible with validated target #${bound.id}.`, "Use a meaningful literal text update on an empty passive leaf or button, or a type-compatible local form-control property.");
      }
    }
  }
  return issues;
}

export function validateCreatorJavaScriptAgainstHtml(
  filePath: string,
  content: string,
  htmlTargets: readonly CreatorJavaScriptHtmlTarget[]
): readonly CreatorValidationIssue[] {
  return validateCreatorJavaScriptDomSubset(content, { filePath, htmlTargets, includeLocalIssues: false });
}

export function validateCreatorJavaScript(
  filePath: string,
  content: string
): readonly CreatorValidationIssue[] {
  const issues: CreatorValidationIssue[] = [];
  let root: unknown;
  const comments: unknown[] = [];
  try {
    root = acorn.parse(content, {
      ecmaVersion: 2022,
      sourceType: "script",
      allowHashBang: false,
      ranges: true,
      onComment: comments,
    });
  } catch {
    return [codeIssue("js.parse_failed", filePath, "JavaScript syntax could not be parsed without execution.", "Return complete classic client-side JavaScript syntax.")];
  }

  if (comments.length > 0) {
    issues.push(codeIssue(
      "js.comment_forbidden",
      filePath,
      "JavaScript comments are outside the unambiguous local script subset.",
      "Remove comments, source-map directives, and comment-based obfuscation from the generated script."
    ));
  }

  const emitted = new Set<string>();
  const emit = (code: string, message: string, repair: string) => {
    if (emitted.has(code)) return;
    emitted.add(code);
    issues.push(codeIssue(code, filePath, message, repair));
  };
  try {
    const scopeManager = eslintScope.analyze(root, {
      ecmaVersion: 2022,
      sourceType: "script",
      optimistic: false,
      ignoreEval: false,
    });
    if (!scopeManager.globalScope || !Array.isArray(scopeManager.scopes)) {
      throw new Error("Creator scope analysis did not return a global scope");
    }
    const allowedGlobals = new Set(["document", "Infinity", "NaN", "undefined"]);
    const declaredGlobalNames = new Set(
      (scopeManager.globalScope.variables ?? [])
        .map((variable) => variable.name)
        .filter((name): name is string => typeof name === "string")
    );
    for (const reference of scopeManager.globalScope.through ?? []) {
      const name = readIdentifierName(reference.identifier);
      if (name && !allowedGlobals.has(name) && !declaredGlobalNames.has(name)) {
        emit("js.unresolved_identifier", `JavaScript identifier ${name} is not declared in its lexical scope.`, "Declare each local value before use and use only the exact document global from the bounded DOM subset.");
      }
    }
    for (const scope of scopeManager.scopes) {
      for (const reference of scope.references ?? []) {
        if (reference.init === true || !isAstRecord(reference.identifier) || !reference.resolved) continue;
        const referenceStart = Number(reference.identifier.start ?? Number.POSITIVE_INFINITY);
        for (const definition of reference.resolved.defs ?? []) {
          if (definition.type !== "Variable" || !isAstRecord(definition.node)) continue;
          const initializationEnd = Number(definition.node.end ?? Number.NEGATIVE_INFINITY);
          if (referenceStart < initializationEnd) {
            emit("js.temporal_dead_zone", "JavaScript reads a lexical binding before its declaration has completed.", "Declare and initialize each local binding before every textual use.");
          }
        }
      }
    }
  } catch {
    emit("js.scope_analysis_failed", "JavaScript lexical scope could not be validated fail-closed.", "Use a smaller script with direct declarations, exact DOM queries, and bounded event callbacks.");
  }
  const functionAnalysis = readNamedFunctionAnalysis(root);
  const allowedLoopUpdates = collectCreatorAllowedLoopUpdates(root);
  const stack: Array<{
    value: unknown;
    depth: number;
    parentType: string | null;
    loopWork: number;
    insideLoopBody: boolean;
    allowedLoopUpdate: boolean;
  }> = [
    { value: root, depth: 0, parentType: null, loopWork: 1, insideLoopBody: false, allowedLoopUpdate: false },
  ];
  if (functionAnalysis.hasCycle) {
    emit("js.recursion_forbidden", "Direct and mutual named recursion are outside the bounded preview subset.", "Use non-recursive event handlers and bounded iteration.");
  }
  if (hasExcessiveStaticExpansion(root)) {
    emit("js.static_value_amplification", "Statically provable value expansion exceeds the preview work ceiling.", `Keep literal and alias expansion at or below ${CREATOR_MAX_STATIC_LOOP_WORK} units.`);
  }
  let visitedNodes = 0;
  let cumulativeStaticLoopWork = 0;
  try {
    while (stack.length > 0) {
      const current = stack.pop() as {
        value: unknown;
        depth: number;
        parentType: string | null;
        loopWork: number;
        insideLoopBody: boolean;
        allowedLoopUpdate: boolean;
      };
      if (current.depth > 256 || visitedNodes > 20_000) {
        emit("js.ast_complexity", "JavaScript syntax exceeds the bounded validation complexity ceiling.", "Use a smaller, shallower event-driven script.");
        break;
      }
      if (Array.isArray(current.value)) {
        for (let index = current.value.length - 1; index >= 0; index -= 1) {
          stack.push({
            value: current.value[index],
            depth: current.depth + 1,
            parentType: current.parentType,
            loopWork: current.loopWork,
            insideLoopBody: current.insideLoopBody,
            allowedLoopUpdate: current.allowedLoopUpdate,
          });
        }
        continue;
      }
      if (!isAstRecord(current.value)) continue;
      const value = current.value;
      visitedNodes += 1;

      if (value.type && BANNED_NODE_TYPES.has(value.type)) {
        emit("js.module_or_dynamic_code", "Modules, dynamic or meta-programming, classes, spread, and complex binding patterns are forbidden.", "Use one classic local script with direct simple bindings and bounded DOM behavior.");
      }
      if (value.type === "TryStatement" || value.type === "CatchClause") {
        emit("js.exception_control_flow_forbidden", "Exception-driven control flow and catch bindings are outside the bounded preview subset.", "Use direct top-level initialization and bounded event callbacks without try or catch blocks.");
      }
      if (value.type === "DebuggerStatement") {
        emit("js.debugger_forbidden", "Debugger statements can suspend preview execution and are forbidden.", "Remove debugger statements from generated client code.");
      }
      if (value.type === "NewExpression") {
        emit("js.constructor_forbidden", "Object construction is outside the bounded preview subset.", "Use literal data and the already validated document without constructors.");
      }
      if (
        ["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"].includes(value.type ?? "") &&
        (value.async === true || value.generator === true)
      ) {
        emit("js.function_mode_forbidden", "Async and generator functions are outside the bounded preview subset.", "Use synchronous event handlers without promises, generators, or background scheduling.");
      }
      if (value.type === "VariableDeclaration" && value.kind === "var") {
        emit("js.var_declaration_forbidden", "Classic-script var declarations can create browser-global state and are forbidden.", "Use bounded top-level const declarations or local let declarations without reassignment.");
      }
      if (
        (value.type === "VariableDeclarator" && isForbiddenCreatorBindingName(readIdentifierName(value.id))) ||
        (["FunctionDeclaration", "FunctionExpression"].includes(value.type ?? "") && isForbiddenCreatorBindingName(readIdentifierName(value.id))) ||
        (["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"].includes(value.type ?? "") &&
          Array.isArray(value.params) && value.params.some((parameter) => isForbiddenCreatorBindingName(readIdentifierName(parameter))))
      ) {
        emit("js.global_binding_forbidden", "Bindings that shadow validator-reserved browser globals or overlap event-handler slots are forbidden.", "Use a neutral local identifier that does not shadow document, undefined, NaN, Infinity, name, or any on-prefixed event slot.");
      }
      if (value.type === "Literal" && isAstRecord(value.regex)) {
        emit("js.regex_forbidden", "Regular expressions are outside the bounded preview subset.", "Use bounded literal comparisons instead of runtime regular expressions.");
      }
      if (value.type === "Literal" && typeof value.value === "bigint") {
        emit("js.bigint_forbidden", "BigInt arithmetic is outside the bounded preview subset.", "Use bounded ordinary numeric values.");
      }
      if (value.type === "ThisExpression") {
        emit("js.global_access_forbidden", "Global this access is outside the static v0 subset.", "Use direct local DOM queries and bounded event handlers.");
      }
      if (value.type === "Identifier" && typeof value.name === "string" && BANNED_IDENTIFIERS.has(value.name)) {
        emit("js.api_forbidden", `JavaScript API ${value.name} is forbidden.`, "Remove network, evaluation, storage, worker, reflection, navigation, file, and timer APIs.");
      }
      if (value.type === "CallExpression") {
        const calleeName = readIdentifierName(value.callee);
        if (
          (calleeName && functionAnalysis.callableNames.has(calleeName)) ||
          containsNamedFunctionReference(value.callee, functionAnalysis.functionNames)
        ) {
          emit("js.user_function_call_forbidden", "Direct invocation of user-declared functions is outside the bounded event-only subset.", "Register a named or inline callback with addEventListener instead of invoking user code synchronously.");
        }
        if (isAstRecord(value.callee) && ["FunctionExpression", "ArrowFunctionExpression"].includes(value.callee.type ?? "")) {
          emit("js.user_function_call_forbidden", "Immediately invoked user functions are outside the bounded event-only subset.", "Use direct top-level initialization and event callbacks without synchronous user-function calls.");
        }
      }
      if (value.type === "MemberExpression") {
        const property = isAstRecord(value.property) ? value.property : null;
        const propertyName =
          property?.type === "Identifier" && typeof property.name === "string"
            ? property.name
            : property?.type === "Literal" && typeof property.value === "string"
              ? property.value
              : null;
        if (propertyName && (BANNED_MEMBER_NAMES.has(propertyName) || BANNED_IDENTIFIERS.has(propertyName) || /^on/i.test(propertyName) || /^aria/i.test(propertyName))) {
          emit("js.member_forbidden", `JavaScript member ${propertyName} is forbidden.`, "Remove navigation, storage, cross-window, HTML injection, reflection, file, and resource behavior.");
        }
        if (propertyName === "remove") {
          const object = isAstRecord(value.object) ? value.object : null;
          const receiverProperty = object?.type === "MemberExpression" && isAstRecord(object.property)
            ? readIdentifierName(object.property)
            : null;
          if (receiverProperty !== "classList") {
            emit("js.member_forbidden", "Destructive DOM removal is outside the bounded preview subset.", "Update safe text, classes, values, or checked state without removing validated elements.");
          }
        }
        if (value.computed === true && property?.type !== "Literal") {
          emit("js.computed_member_forbidden", "Dynamic computed member access is forbidden.", "Use direct allowlisted DOM property access.");
        }
      }
      if (value.type === "Property" && current.parentType === "ObjectPattern") {
        const key = isAstRecord(value.key) ? value.key : null;
        const keyName =
          key?.type === "Identifier" && typeof key.name === "string"
            ? key.name
            : key?.type === "Literal" && typeof key.value === "string"
              ? key.value
              : null;
        if (keyName && (BANNED_MEMBER_NAMES.has(keyName) || BANNED_IDENTIFIERS.has(keyName))) {
          emit("js.member_forbidden", `JavaScript destructuring key ${keyName} is forbidden.`, "Do not extract or rebind forbidden browser and resource methods.");
        }
        if (value.computed === true) {
          emit("js.computed_member_forbidden", "Computed destructuring keys are forbidden.", "Use direct local variables without dynamic browser-member extraction.");
        }
      }
      if (
        value.type === "Property" &&
        (value.method === true || value.kind === "get" || value.kind === "set" ||
          (isAstRecord(value.value) && ["FunctionExpression", "ArrowFunctionExpression"].includes(value.value.type ?? "")))
      ) {
        emit("js.function_container_forbidden", "Object methods, accessors, and embedded function values are outside the bounded preview subset.", "Declare a named non-recursive function or event callback directly instead of hiding executable behavior in an object.");
      }
      if (
        value.type === "VariableDeclarator" &&
        isAstRecord(value.init) &&
        !["FunctionExpression", "ArrowFunctionExpression"].includes(value.init.type ?? "") &&
        containsFunctionValue(value.init)
      ) {
        emit("js.function_container_forbidden", "Conditional and nested function containers are outside the bounded event subset.", "Declare one named or direct arrow callback and pass it only to addEventListener.");
      }
      if (value.type === "Property" && functionAnalysis.functionNames.has(readIdentifierName(value.value) ?? "")) {
        emit("js.function_container_forbidden", "Named functions cannot be stored in object properties in the bounded preview subset.", "Pass one named callback directly to addEventListener instead of storing callable object members.");
      }
      if (
        (value.type === "BinaryExpression" || value.type === "AssignmentExpression") &&
        (value.operator === "**" || value.operator === "**=")
      ) {
        emit("js.exponentiation_forbidden", "Runtime exponentiation is outside the bounded preview subset.", "Use small literal values and ordinary bounded arithmetic.");
      }
      if (value.type === "BinaryExpression" && ["in", "instanceof"].includes(String(value.operator))) {
        emit("js.relational_object_operator_forbidden", "The in and instanceof operators are outside the non-throwing bounded preview subset.", "Use direct literal comparisons without prototype or object-membership operators.");
      }
      if (value.type === "AssignmentExpression") {
        const leftName = readIdentifierName(value.left);
        const exactLoopUpdate = allowedLoopUpdates.has(value);
        if (
          (!exactLoopUpdate && current.parentType !== "ExpressionStatement") ||
          (value.operator !== "=" && !(exactLoopUpdate && ["+=", "-="].includes(String(value.operator))))
        ) {
          emit("js.assignment_form_forbidden", "Nested and compound assignment forms are outside the bounded preview subset.", "Use standalone simple scalar assignments; reserve += or -= only for a validator-proven for-loop counter.");
        }
        if (leftName !== null && !exactLoopUpdate) {
          emit("js.identifier_reassignment_forbidden", "Identifier reassignment can escape lexical scope or accumulate state across interactions and is forbidden.", "Use immutable local data and mutate only an allowlisted typed DOM property; loop counters may update only in one validator-proven for statement.");
        }
        const selfAmplifying =
          leftName !== null && (
            (value.operator === "=" && countIdentifierReferences(value.right, leftName) >= 2) ||
            (value.operator !== "=" && countIdentifierReferences(value.right, leftName, 1) >= 1)
          );
        if (selfAmplifying) {
          emit("js.self_amplifying_assignment", "Self-amplifying assignment is outside the bounded preview subset.", "Update bounded scalar values without repeatedly duplicating prior content.");
        }
        if (containsFunctionValue(value.right)) {
          emit("js.function_container_forbidden", "Assigning callback functions after declaration is outside the bounded event subset.", "Declare one named or const callback before passing it to addEventListener.");
        }
        const leftMember = isAstRecord(value.left) && value.left.type === "MemberExpression";
        const rightFunction = isAstRecord(value.right) && (
          ["FunctionExpression", "ArrowFunctionExpression"].includes(value.right.type ?? "") ||
          functionAnalysis.functionNames.has(readIdentifierName(value.right) ?? "")
        );
        if (leftMember && rightFunction) {
          emit("js.function_container_forbidden", "Functions cannot be assigned into callable object members in the bounded preview subset.", "Pass one declared callback directly to addEventListener without creating callable containers.");
        }
        if (leftMember) {
          const left = value.left as AstRecord;
          const property = isAstRecord(left.property) ? left.property : null;
          const propertyName =
            property?.type === "Identifier" && typeof property.name === "string"
              ? property.name
              : property?.type === "Literal" && typeof property.value === "string"
                ? property.value
                : null;
          if (!propertyName || !["textContent", "value", "checked", "disabled"].includes(propertyName)) {
            emit("js.dom_mutation_forbidden", "JavaScript member assignment is limited to textContent, value, checked, and disabled.", "Preserve validated structure and semantics; mutate only the exact allowlisted local control properties.");
          }
        }
      }
      if (value.type === "UpdateExpression" && isAstRecord(value.argument) && value.argument.type === "MemberExpression") {
        emit("js.dom_mutation_forbidden", "Incrementing or decrementing object members is outside the bounded DOM mutation subset.", "Assign one bounded value to an allowlisted local control property instead.");
      }
      if (value.type === "UpdateExpression") {
        const updateName = readIdentifierName(value.argument);
        if (updateName !== null && !allowedLoopUpdates.has(value)) {
          emit("js.identifier_reassignment_forbidden", "Identifier updates can escape lexical scope or accumulate state across interactions and are forbidden.", "Use immutable local data; update only the exact counter of one validator-proven for statement.");
        }
      }
      if (
        current.insideLoopBody &&
        !current.allowedLoopUpdate &&
        (value.type === "AssignmentExpression" || value.type === "UpdateExpression")
      ) {
        emit("js.loop_mutation_forbidden", "Loop bodies cannot mutate runtime state in the bounded static subset.", "Use a small call-free literal loop with side-effect-free reads, or move one bounded state change outside the loop.");
      }
      if (current.insideLoopBody && value.type === "CallExpression") {
        emit("js.loop_call_forbidden", "Loop bodies cannot invoke DOM or user behavior in the bounded static subset.", "Keep proven-bounded loops call-free and perform one bounded DOM action outside the loop.");
      }
      const staticLoopTest = readStaticBoolean(value.test);
      if (
        ((value.type === "WhileStatement" || value.type === "DoWhileStatement") &&
          staticLoopTest === true) ||
        (value.type === "ForStatement" &&
          (value.test == null || staticLoopTest === true))
      ) {
        emit("js.obvious_infinite_loop", "Obvious unbounded loops are forbidden in preview code.", "Use event-driven bounded iteration.");
      }
      const staticForIterations = readForLoopIterations(value);
      if (staticForIterations !== null && staticForIterations > CREATOR_MAX_STATIC_LOOP_ITERATIONS) {
        emit("js.excessive_static_loop", "A statically bounded loop exceeds the preview iteration ceiling.", `Keep literal loop bounds at or below ${CREATOR_MAX_STATIC_LOOP_ITERATIONS}.`);
      }
      const childLoopWork =
        value.type === "ForStatement" && staticForIterations !== null && Number.isFinite(staticForIterations)
          ? saturatingCreatorWorkProduct(
              current.loopWork,
              staticForIterations,
              readCreatorLoopBodyWeight(value.body)
            )
          : current.loopWork;
      if (value.type === "ForStatement" && staticForIterations !== null) {
        cumulativeStaticLoopWork = Math.min(
          CREATOR_MAX_STATIC_LOOP_WORK + 1,
          cumulativeStaticLoopWork + childLoopWork
        );
        if (cumulativeStaticLoopWork > CREATOR_MAX_STATIC_LOOP_WORK) {
          emit("js.excessive_cumulative_loop_work", "The cumulative statically visible work across preview loops exceeds the aggregate ceiling.", `Keep total proven loop iterations and body work across the complete script at or below ${CREATOR_MAX_STATIC_LOOP_WORK} units.`);
        }
      }
      if (childLoopWork > CREATOR_MAX_STATIC_LOOP_WORK) {
        emit("js.excessive_nested_loop_work", "Literal loop iterations and body work exceed the aggregate preview work ceiling.", `Keep the product of nested literal loop bounds and statically visible body work at or below ${CREATOR_MAX_STATIC_LOOP_WORK}.`);
      }
      if (
        ((value.type === "WhileStatement" || value.type === "DoWhileStatement") && staticLoopTest === null) ||
        (value.type === "ForStatement" && staticForIterations === null) ||
        value.type === "ForInStatement" ||
        value.type === "ForOfStatement"
      ) {
        emit("js.loop_not_statically_bounded", "Every preview loop must have a validator-provable finite literal bound.", `Use a classic for loop whose literal start, comparison, and step prove at most ${CREATOR_MAX_STATIC_LOOP_ITERATIONS} iterations.`);
      }
      if (value.type === "Literal" && typeof value.value === "string" && /\b(?:https?|wss?|data|javascript|file|blob):|\/\//i.test(value.value)) {
        emit("js.url_literal_forbidden", "External and dangerous URL literals are forbidden.", "Use only local element IDs and literal UI content.");
      }
      if (
        value.type === "TemplateElement" &&
        isAstRecord(value.value) &&
        [value.value.raw, value.value.cooked].some(
          (candidate) => typeof candidate === "string" && /\b(?:https?|wss?|data|javascript|file|blob):|\/\//i.test(candidate)
        )
      ) {
        emit("js.url_literal_forbidden", "External and dangerous URL templates are forbidden.", "Use only local element IDs and literal UI content.");
      }
      for (const [key, child] of Object.entries(value)) {
        if (["start", "end", "loc", "range"].includes(key)) continue;
        const isLoop = ["ForStatement", "WhileStatement", "DoWhileStatement", "ForInStatement", "ForOfStatement"].includes(value.type ?? "");
        stack.push({
          value: child,
          depth: current.depth + 1,
          parentType: value.type ?? null,
          loopWork: childLoopWork,
          insideLoopBody: current.insideLoopBody || (isLoop && key === "body"),
          allowedLoopUpdate: value.type === "ForStatement" && key === "update",
        });
      }
    }
  } catch {
    emit("js.ast_complexity", "JavaScript syntax could not be traversed within the bounded validator.", "Use a smaller, shallower event-driven script.");
  }
  return [
    ...issues,
    ...validateCreatorJavaScriptDomSubset(content, { filePath, htmlTargets: null, includeLocalIssues: true }),
  ];
}

export function validateCreatorJsonFile(
  filePath: string,
  content: string
): readonly CreatorValidationIssue[] {
  try {
    assertCreatorJsonHasUniqueObjectKeys(content);
    JSON.parse(content);
    return [];
  } catch (error) {
    if (error instanceof CreatorDuplicateJsonKeyError) {
      return [codeIssue("json.duplicate_key", filePath, "JSON artifact object keys must be unique at every depth.", "Remove every duplicate object key and return one unambiguous JSON value.")];
    }
    return [codeIssue("json.parse_failed", filePath, "JSON artifact syntax is invalid.", "Return one complete valid JSON value.")];
  }
}

export function validateCreatorPlainText(
  filePath: string,
  content: string
): readonly CreatorValidationIssue[] {
  return /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(content)
    ? [codeIssue("text.control_character", filePath, "Documentation contains forbidden control characters.", "Use UTF-8 text with tabs and line breaks only.")]
    : [];
}
