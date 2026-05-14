import type { CodexForgeFileCognitiveContext } from "./file-cognitive-context";
import type { CodexForgeFileBrainContext } from "./file-brain-context";
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
  fileBrainContext?: CodexForgeFileBrainContext;
  safePlan?: CodexForgeSafeFilePlan;
}): CodexForgeFileReadinessBoard {
  const risk = calculateFileRisk(args.file);
  const tested = args.file.tags.includes("tested") || args.file.path.includes("smoke-");
  const contextSignalCount = args.cognitiveContext?.signals.length ?? 0;
  const brainNodeCount =
    args.fileBrainContext?.relatedNodes.length ??
    args.cognitiveContext?.relatedBrainNodes.length ??
    0;
  const smokeCount =
    args.fileBrainContext?.relatedSmokeScripts.length ??
    (tested ? 1 : 0);
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
      label: "Test/smoke readiness",
      status: smokeCount > 0 || tested ? "ready" : "needs-context",
      score: smokeCount > 0 || tested ? 86 : 54,
      summary:
        smokeCount > 0
          ? `${smokeCount} related smoke or validation hints are attached.`
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
      label: "Brain memory readiness",
      status: brainNodeCount > 0 ? "ready" : "needs-context",
      score: brainNodeCount > 0 ? 76 : 48,
      summary: `${brainNodeCount} related Brain memory nodes found by path/name/subsystem heuristics.`,
    }),
    readinessItem({
      id: "risk-readiness",
      label: "Risk readiness",
      status: reviewRequired ? "review-required" : "ready",
      score: reviewRequired ? 56 : 82,
      summary: risk.summary,
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
      status: "blocked",
      score: 0,
      summary:
        "Apply readiness is blocked, preview-only, and approval required. Files UI does not mutate project files.",
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
  return `${board.filePath} readiness is ${board.status} at ${board.score}/100; apply remains blocked, preview-only, and approval required.`;
}
