import type {
  CodexForgeBrainNode,
  CodexForgeBrainNodeId,
} from "@/lib/codexforge/brain/graph/types";
import { normalizeMemoryFingerprint } from "./semantic-dedupe";

export type CodexForgeContradictionSignal = {
  label: string;
  polarity: "positive" | "negative";
  term: string;
  contextFingerprint: string;
};

export type CodexForgeMemoryContradiction = {
  id: string;
  riskScore: number;
  reason: string;
  nodeIds: [CodexForgeBrainNodeId, CodexForgeBrainNodeId];
  evidenceSnippets: [string, string];
  opposingTerms: [string, string];
  normalizedFingerprints: [string, string];
  signals: [CodexForgeContradictionSignal, CodexForgeContradictionSignal];
};

export type CodexForgeContradictionRiskScore = {
  riskScore: number;
  reason: string;
  opposingTerms: [string, string] | [];
  normalizedFingerprints: [string, string];
  signals: [CodexForgeContradictionSignal, CodexForgeContradictionSignal] | [];
};

export type CodexForgeDetectMemoryContradictionsInput = {
  nodes: readonly CodexForgeBrainNode[];
  maxPairs?: number;
};

type OppositionPattern = {
  label: string;
  positive: string;
  negative: string;
  positivePattern: RegExp;
  negativePattern: RegExp;
};

const OPPOSITION_PATTERNS: OppositionPattern[] = [
  {
    label: "is/is not",
    positive: "is",
    negative: "is not",
    positivePattern: /\bis\b(?!\s+not\b)/,
    negativePattern: /\bis\s+not\b/,
  },
  {
    label: "enabled/disabled",
    positive: "enabled",
    negative: "disabled",
    positivePattern: /\benabled\b/,
    negativePattern: /\bdisabled\b/,
  },
  {
    label: "blocked/allowed",
    positive: "allowed",
    negative: "blocked",
    positivePattern: /\ballowed\b/,
    negativePattern: /\bblocked\b/,
  },
  {
    label: "should/should not",
    positive: "should",
    negative: "should not",
    positivePattern: /\bshould\b(?!\s+not\b)/,
    negativePattern: /\bshould\s+not\b/,
  },
  {
    label: "can/cannot",
    positive: "can",
    negative: "cannot",
    positivePattern: /\bcan\b(?!\s+not\b)/,
    negativePattern: /\b(cannot|can\s+not|can't)\b/,
  },
  {
    label: "pass/fail",
    positive: "pass",
    negative: "fail",
    positivePattern: /\bpass\b/,
    negativePattern: /\bfail\b/,
  },
  {
    label: "passes/fails",
    positive: "passes",
    negative: "fails",
    positivePattern: /\bpasses\b/,
    negativePattern: /\bfails\b/,
  },
  {
    label: "safe/unsafe",
    positive: "safe",
    negative: "unsafe",
    positivePattern: /\bsafe\b/,
    negativePattern: /\bunsafe\b/,
  },
  {
    label: "active/archived",
    positive: "active",
    negative: "archived",
    positivePattern: /\bactive\b/,
    negativePattern: /\barchived\b/,
  },
  {
    label: "required/optional",
    positive: "required",
    negative: "optional",
    positivePattern: /\brequired\b/,
    negativePattern: /\boptional\b/,
  },
  {
    label: "exists/missing",
    positive: "exists",
    negative: "missing",
    positivePattern: /\bexists\b/,
    negativePattern: /\bmissing\b/,
  },
  {
    label: "available/unavailable",
    positive: "available",
    negative: "unavailable",
    positivePattern: /\bavailable\b/,
    negativePattern: /\bunavailable\b/,
  },
];

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function stableHash(input: string): string {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16);
}

function getNodeText(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  const parts = [
    data.label,
    data.content,
    data.summary,
    data.description,
    data.text,
    data.goal,
    data.nextAction,
  ].filter((value): value is string => typeof value === "string" && value.trim().length > 0);

  return parts.join(" ");
}

function normalizeForSignals(text: string): string {
  return text
    .toLowerCase()
    .replace(/\bcan['`]t\b/g, "cannot")
    .replace(/[^a-z0-9._/\\:#\s-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function signalContext(text: string, pattern: OppositionPattern): string {
  return normalizeMemoryFingerprint(text)
    .replace(new RegExp(`\\b${pattern.positive.replace(/\s+/g, "\\s+")}\\b`, "g"), " ")
    .replace(new RegExp(`\\b${pattern.negative.replace(/\s+/g, "\\s+")}\\b`, "g"), " ")
    .replace(/\s+/g, " ")
    .trim();
}

function collectSignals(text: string): CodexForgeContradictionSignal[] {
  const normalized = normalizeForSignals(text);
  const signals: CodexForgeContradictionSignal[] = [];

  for (const pattern of OPPOSITION_PATTERNS) {
    if (pattern.positivePattern.test(normalized)) {
      signals.push({
        label: pattern.label,
        polarity: "positive",
        term: pattern.positive,
        contextFingerprint: signalContext(normalized, pattern),
      });
    }

    if (pattern.negativePattern.test(normalized)) {
      signals.push({
        label: pattern.label,
        polarity: "negative",
        term: pattern.negative,
        contextFingerprint: signalContext(normalized, pattern),
      });
    }
  }

  return signals.sort((a, b) => {
    if (a.label !== b.label) return a.label.localeCompare(b.label);
    if (a.polarity !== b.polarity) return a.polarity.localeCompare(b.polarity);
    return a.term.localeCompare(b.term);
  });
}

function tokenOverlap(a: string, b: string): number {
  const left = new Set(a.split(/\s+/).filter((token) => token.length > 2));
  const right = new Set(b.split(/\s+/).filter((token) => token.length > 2));
  if (left.size === 0 || right.size === 0) return 0;

  let shared = 0;
  for (const token of left) {
    if (right.has(token)) shared += 1;
  }

  return clamp01(shared / Math.max(left.size, right.size));
}

function bestOpposition(
  leftSignals: readonly CodexForgeContradictionSignal[],
  rightSignals: readonly CodexForgeContradictionSignal[]
): {
  left: CodexForgeContradictionSignal;
  right: CodexForgeContradictionSignal;
  overlap: number;
} | null {
  let best:
    | {
        left: CodexForgeContradictionSignal;
        right: CodexForgeContradictionSignal;
        overlap: number;
      }
    | null = null;

  for (const left of leftSignals) {
    for (const right of rightSignals) {
      if (left.label !== right.label || left.polarity === right.polarity) continue;

      const overlap = tokenOverlap(left.contextFingerprint, right.contextFingerprint);
      if (!best || overlap > best.overlap) {
        best = { left, right, overlap };
      }
    }
  }

  return best;
}

function snippet(text: string): string {
  const trimmed = text.trim();
  return trimmed.length <= 180 ? trimmed : `${trimmed.slice(0, 177)}...`;
}

export function scoreContradictionRisk(
  leftText: string,
  rightText: string
): CodexForgeContradictionRiskScore {
  const leftFingerprint = normalizeMemoryFingerprint(leftText);
  const rightFingerprint = normalizeMemoryFingerprint(rightText);
  const leftSignals = collectSignals(leftText);
  const rightSignals = collectSignals(rightText);
  const best = bestOpposition(leftSignals, rightSignals);

  if (!best) {
    return {
      riskScore: 0,
      reason: "No deterministic opposing terms were detected.",
      opposingTerms: [],
      normalizedFingerprints: [leftFingerprint, rightFingerprint],
      signals: [],
    };
  }

  const sameSubjectBoost = best.overlap >= 0.42 ? 0.2 : 0;
  const riskScore = clamp01(0.36 + best.overlap * 0.34 + sameSubjectBoost);

  return {
    riskScore: Math.min(0.92, riskScore),
    reason: `Candidate contradiction from ${best.left.label} terms with shared context score ${best.overlap.toFixed(2)}.`,
    opposingTerms: [best.left.term, best.right.term],
    normalizedFingerprints: [leftFingerprint, rightFingerprint],
    signals: [best.left, best.right],
  };
}

export function detectMemoryContradictions(
  input: CodexForgeDetectMemoryContradictionsInput
): CodexForgeMemoryContradiction[] {
  const nodes = [...input.nodes].sort((a, b) => a.id.localeCompare(b.id));
  const contradictions: CodexForgeMemoryContradiction[] = [];

  for (let leftIndex = 0; leftIndex < nodes.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < nodes.length; rightIndex += 1) {
      const left = nodes[leftIndex];
      const right = nodes[rightIndex];
      const leftText = getNodeText(left);
      const rightText = getNodeText(right);
      const risk = scoreContradictionRisk(leftText, rightText);

      if (
        risk.riskScore < 0.48 ||
        risk.signals.length !== 2 ||
        risk.opposingTerms.length !== 2
      ) {
        continue;
      }

      const opposingTerms = risk.opposingTerms as [string, string];
      const signals = risk.signals as [
        CodexForgeContradictionSignal,
        CodexForgeContradictionSignal,
      ];

      contradictions.push({
        id: `contradiction:${stableHash(`${left.id}:${right.id}:${opposingTerms.join(":")}`)}`,
        riskScore: risk.riskScore,
        reason: risk.reason,
        nodeIds: [left.id, right.id],
        evidenceSnippets: [snippet(leftText), snippet(rightText)],
        opposingTerms,
        normalizedFingerprints: risk.normalizedFingerprints,
        signals,
      });
    }
  }

  return contradictions
    .sort((a, b) => {
      if (b.riskScore !== a.riskScore) return b.riskScore - a.riskScore;
      return a.id.localeCompare(b.id);
    })
    .slice(0, input.maxPairs ?? 20);
}
