import type { CodexForgeFileCognitiveContext } from "./file-cognitive-context";
import { calculateFileRisk } from "./file-risk";
import type { CodexForgeSafeFilePlan } from "./file-safe-plan";
import type { CodexForgeFileNode } from "./types";

export type CodexForgeFileReadinessStatus =
  | "ready"
  | "needs-context"
  | "review-required"
  | "blocked"
  | "preview-only";

export type CodexForgeFileReadinessItem = {
  id: string;
  label: string;
  status: CodexForgeFileReadinessStatus;
  score: number;
  summary: string;
};

export type CodexForgeFileReadinessBoard = {
  filePath: string;
  items: CodexForgeFileReadinessItem[];
  score: number;
  status: CodexForgeFileReadinessStatus;
  summary: string;
};

function readinessItem(args: CodexForgeFileReadinessItem): CodexForgeFileReadinessItem {
  return {
    ...args,
    score: Math.max(0, Math.min(100, Math.round(args.score))),
  };
}

export function scoreFileReadiness(board: Pick<CodexForgeFileReadinessBoard, "items">): number {
  if (board.items.length === 0) return 0;
  return Math.round(
    board.items.reduce((total, item) => total + item.score, 0) / board.items.length
  );
}

export function buildFileReadinessBoard(args: {
  file: CodexForgeFileNode;
  cognitiveContext?: CodexForgeFileCognitiveContext;
  safePlan?: CodexForgeSafeFilePlan;
}): CodexForgeFileReadinessBoard {
  const risk = calculateFileRisk(args.file);
  const tested = args.file.tags.includes("tested") || args.file.path.includes("smoke-");
  const contextSignalCount = args.cognitiveContext?.signals.length ?? 0;
  const brainNodeCount = args.cognitiveContext?.relatedBrainNodes.length ?? 0;
  const reviewRequired = risk.level === "high" || risk.level === "critical";

  const items: CodexForgeFileReadinessItem[] = [
    readinessItem({
      id: "safety-readiness",
      label: "Safety readiness",
      status: reviewRequired ? "review-required" : "ready",
      score: reviewRequired ? 58 : 82,
      summary: risk.summary,
    }),
    readinessItem({
      id: "test-readiness",
      label: "Test readiness",
      status: tested ? "ready" : "needs-context",
      score: tested ? 86 : 54,
      summary: tested
        ? "Direct smoke or tested tag is attached."
        : "Add targeted validation before any guarded apply.",
    }),
    readinessItem({
      id: "context-readiness",
      label: "Context readiness",
      status: contextSignalCount > 0 ? "ready" : "needs-context",
      score: contextSignalCount > 0 ? 78 : 42,
      summary: `${contextSignalCount} cognitive signals available.`,
    }),
    readinessItem({
      id: "brain-readiness",
      label: "Brain readiness",
      status: brainNodeCount > 0 ? "ready" : "needs-context",
      score: brainNodeCount > 0 ? 76 : 48,
      summary: `${brainNodeCount} related brain nodes found by path/name/type heuristics.`,
    }),
    readinessItem({
      id: "review-readiness",
      label: "Review readiness",
      status: reviewRequired ? "review-required" : "ready",
      score: reviewRequired ? 60 : 80,
      summary: reviewRequired
        ? "Owner review gate should stay in front of guarded apply."
        : "Standard review gate is sufficient for preview planning.",
    }),
    readinessItem({
      id: "apply-readiness",
      label: "Apply readiness",
      status: "preview-only",
      score: 0,
      summary: "Apply readiness is blocked in Phase 4; apply must go through guarded tool approval later.",
    }),
  ];

  const score = scoreFileReadiness({ items });
  const status: CodexForgeFileReadinessStatus =
    items.some((item) => item.status === "blocked")
      ? "blocked"
      : items.some((item) => item.status === "preview-only")
        ? "preview-only"
        : items.some((item) => item.status === "review-required")
          ? "review-required"
          : "ready";

  const board = {
    filePath: args.file.path,
    items,
    score,
    status,
    summary: "",
  };

  return {
    ...board,
    summary: summarizeFileReadiness(board),
  };
}

export function summarizeFileReadiness(
  board: Omit<CodexForgeFileReadinessBoard, "summary"> | CodexForgeFileReadinessBoard
): string {
  return `${board.filePath} readiness is ${board.status} at ${board.score}/100; apply remains preview-only.`;
}
