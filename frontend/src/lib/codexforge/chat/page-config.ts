export type CodexForgeBackendMode = "api" | "local-fallback";

export type Suggestion = {
  id: string;
  label: string;
  prompt: string;
};

export type LatestReplySnapshot = {
  sourceLabel: string;
  textLength: number;
  structured: boolean;
  toolCount: number;
  domainLabel: string;
  tagCount: number;
  modeLabel: string;
  stepCount: number;
  diffCount: number;
  snapshotFileCount: number | null;
  executionPhaseLabel: string;
  logCount: number;
};

export type SurfaceLink = {
  href: string;
  label: string;
  detail: string;
};

export const SUGGESTIONS: Suggestion[] = [
  {
    id: "plan-feature",
    label: "Plan a feature",
    prompt:
      "Help me plan a feature. Give me a concrete goal, files to change, risks, and the first three implementation steps.",
  },
  {
    id: "debug-error",
    label: "Debug an error",
    prompt:
      "Help me debug the current problem. Ask for missing context only if needed, then give a safe investigation plan.",
  },
  {
    id: "inspect-repo",
    label: "Inspect the repo",
    prompt:
      "Inspect the current repo context and tell me the most important next edit point, with files and why.",
  },
  {
    id: "upgrade-ui",
    label: "Upgrade the UI",
    prompt:
      "Suggest a focused UI upgrade for CodexForge that improves clarity without breaking the current local-first workflow.",
  },
  {
    id: "memory-plan",
    label: "Plan memory",
    prompt:
      "Design the next memory upgrade for CodexForge. Include data shape, UI affordance, and safe persistence notes.",
  },
  {
    id: "safe-operator",
    label: "Operator safety",
    prompt:
      "Review the operator-style execution flow and propose one safe improvement around snapshot, diff, apply, or rollback.",
  },
];

export const EMPTY_EXAMPLES = [
  "Plan my next CodexForge feature",
  "Design an offline-first AI workspace",
  "Build repo diff approvals with safe apply",
] as const;

export const BACKEND_LABELS: Record<CodexForgeBackendMode, string> = {
  api: "API",
  "local-fallback": "Fallback",
};

export const SURFACE_LINKS: readonly SurfaceLink[] = [
  {
    href: "/ai",
    label: "Workspace",
    detail:
      "Use the main AI workspace for planning, chat, memory routing, and local-first engineering work.",
  },
  {
    href: "/brain",
    label: "Brain",
    detail:
      "Inspect project memory, graph state, and workspace knowledge surfaces.",
  },
  {
    href: "/files",
    label: "Files",
    detail:
      "Review file context, safe patch previews, and approval-first file workflows.",
  },
  {
    href: "/runs",
    label: "Runs",
    detail:
      "Track operator run queues, approvals, safety gates, and execution state.",
  },
  {
    href: "/capabilities",
    label: "Capabilities",
    detail:
      "Open the capability cockpit for tool readiness, routing, and production workflows.",
  },
  {
    href: "/creative",
    label: "Creative",
    detail:
      "Plan creative production, preview artifacts, and approval-safe handoffs.",
  },
  {
    href: "/history",
    label: "History",
    detail:
      "Review local conversation and execution records from the workspace.",
  },
  {
    href: "/clawd",
    label: "Operator",
    detail:
      "Use approval-driven snapshot, diff, apply, test, and checkpoint controls.",
  },
  {
    href: "/entry",
    label: "Quick launch",
    detail:
      "Prepare a structured draft and send it into the AI workspace with activity tracking.",
  },
];

export function buildSystemGuide() {
  return [
    "You are CodexForge, an AI developer assistant and research copilot.",
    "CodexForge is the real product and the primary AI workspace frontend.",
    "Treat CodexForge as the main application, not as a test harness.",
    "Be structured, practical, and beginner-safe.",
    "Prefer the smallest correct next step.",
    "When useful, organize responses as: goal, files, commands, risks, and next action.",
    "Keep local-first behavior working even when the backend is unavailable.",
  ].join("\n");
}

export function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getRepoLabel(repoPath?: string) {
  if (!repoPath) return "No repo selected";

  const normalized = repoPath.replace(/\\/g, "/");
  const parts = normalized.split("/").filter(Boolean);
  return parts.at(-1) ?? repoPath;
}
