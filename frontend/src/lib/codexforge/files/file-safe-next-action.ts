import type { CodexForgeFileBrainContext } from "./file-brain-context";
import type { CodexForgeFileReadinessBoard } from "./file-readiness";
import type { CodexForgeFileNode } from "./types";

export type CodexForgeFileSafeNextActionState =
  | "ready"
  | "preview-only"
  | "approval-required"
  | "blocked";

export type CodexForgeFileSafeNextAction = {
  id: string;
  label: string;
  detail: string;
  state: CodexForgeFileSafeNextActionState;
  priority: number;
  readOnly: true;
  target?: string;
};

export type CodexForgeFileSafeActionQueueInput = {
  file: CodexForgeFileNode;
  brainContext?: CodexForgeFileBrainContext;
  readinessBoard?: CodexForgeFileReadinessBoard;
  suggestedSmokeTests?: string[];
};

function action(args: CodexForgeFileSafeNextAction): CodexForgeFileSafeNextAction {
  return {
    ...args,
    priority: Math.max(0, Math.min(100, Math.round(args.priority))),
    readOnly: true,
  };
}

function hasApplyBlocker(board?: CodexForgeFileReadinessBoard): boolean {
  return (
    board?.items.some(
      (item) => item.id === "apply-readiness" && item.status === "blocked"
    ) ?? true
  );
}

export function buildFileSafeActionQueue(
  input: CodexForgeFileSafeActionQueueInput
): CodexForgeFileSafeNextAction[] {
  const brainNodeCount = input.brainContext?.relatedNodes.length ?? 0;
  const smokeCount =
    input.suggestedSmokeTests?.length ??
    input.brainContext?.relatedSmokeScripts.length ??
    0;

  const queue: CodexForgeFileSafeNextAction[] = [
    action({
      id: "inspect-brain-context",
      label: brainNodeCount > 0 ? "Inspect Brain context" : "Inspect file first",
      detail:
        brainNodeCount > 0
          ? `Review ${brainNodeCount} related Brain memories before planning ${input.file.path}.`
          : `No Brain memory is attached yet. Start with a direct read of ${input.file.path}.`,
      state: "ready",
      priority: brainNodeCount > 0 ? 96 : 92,
      target: input.file.path,
      readOnly: true,
    }),
    action({
      id: "copy-brain-aware-prompt",
      label: "Copy brain-aware prompt",
      detail:
        "Use the deterministic File to Brain context as a chat or workspace handoff prompt.",
      state: "ready",
      priority: 88,
      target: input.file.path,
      readOnly: true,
    }),
    action({
      id: "review-readiness-board",
      label: "Review readiness board",
      detail:
        input.readinessBoard?.summary ??
        "Check context, Brain memory, smoke coverage, risk, review, and apply gates.",
      state:
        input.readinessBoard?.status === "blocked"
          ? "approval-required"
          : "preview-only",
      priority: 78,
      target: input.file.path,
      readOnly: true,
    }),
    action({
      id: "prepare-validation-checklist",
      label: "Prepare validation checklist",
      detail:
        smokeCount > 0
          ? `${smokeCount} suggested smoke or build checks are available. This panel only lists them.`
          : "No direct smoke test is attached; ask chat to propose the smallest safe validation set.",
      state: "preview-only",
      priority: 66,
      target: input.file.path,
      readOnly: true,
    }),
    action({
      id: "guarded-apply-later",
      label: "Guarded apply later",
      detail:
        "Apply remains blocked, preview-only, and approval required. Files UI does not mutate project files.",
      state: hasApplyBlocker(input.readinessBoard) ? "blocked" : "approval-required",
      priority: 8,
      target: input.file.path,
      readOnly: true,
    }),
  ];

  return queue.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.id.localeCompare(b.id);
  });
}

export function selectFileSafeNextAction(
  input: CodexForgeFileSafeActionQueueInput | CodexForgeFileSafeNextAction[]
): CodexForgeFileSafeNextAction {
  const queue = Array.isArray(input) ? input : buildFileSafeActionQueue(input);
  return (
    queue.find((item) => item.state === "ready") ??
    queue.find((item) => item.state === "preview-only") ??
    queue.find((item) => item.state === "approval-required") ??
    queue[0] ??
    action({
      id: "inspect-file",
      label: "Inspect file",
      detail: "Inspect the selected file before any plan or mutation.",
      state: "ready",
      priority: 50,
      readOnly: true,
    })
  );
}

export function summarizeFileSafeNextAction(action: CodexForgeFileSafeNextAction): string {
  return `${action.label}: ${action.detail} State: ${action.state}.`;
}
