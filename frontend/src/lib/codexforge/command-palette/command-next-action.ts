import type {
  CodexForgeCommand,
  CodexForgePaletteNextActionContext,
} from "./command-palette-types";
import { buildCodexForgeCommand } from "./command-registry";

export function buildCodexForgePaletteNextActionCommand(
  input: Partial<CodexForgeCommand> & { id: string; label: string }
): CodexForgeCommand {
  return buildCodexForgeCommand({
    group: "Next action",
    kind: "safe-action",
    safetyLevel: "copy-only",
    requiresReview: true,
    noMutation: true,
    priority: 500,
    keywords: ["next action", "safe", "review"],
    ...input,
  });
}

export function selectCodexForgePaletteNextAction(
  context: CodexForgePaletteNextActionContext = {}
): CodexForgeCommand {
  if (context.hasStabilizationBlockers) {
    return buildCodexForgePaletteNextActionCommand({
      id: "next-review-stabilization-blockers",
      label: "Review stabilization blockers",
      description: "Stabilization blockers come before downstream workflow.",
      href: "/stabilization",
      priority: 10,
    });
  }
  if (context.needsVerificationReview) {
    return buildCodexForgePaletteNextActionCommand({
      id: "next-paste-verification-output",
      label: "Paste verification output",
      description: "Review verification evidence before triage or patch planning.",
      copyPayload: "Paste verification output for review. Do not run commands.",
      priority: 20,
    });
  }
  if (context.needsRegressionTriage) {
    return buildCodexForgePaletteNextActionCommand({
      id: "next-review-regression-triage",
      label: "Review regression triage",
      description: "Triage comes before fix queue.",
      href: "/stabilization",
      priority: 30,
    });
  }
  if (context.needsRegressionFixQueue) {
    return buildCodexForgePaletteNextActionCommand({
      id: "next-review-regression-fix-queue",
      label: "Review regression fix queue",
      description: "Fix queue comes before patch preview.",
      href: "/stabilization",
      priority: 40,
    });
  }
  if (context.needsPatchPreview) {
    return buildCodexForgePaletteNextActionCommand({
      id: "next-prepare-safe-patch-preview",
      label: "Prepare Safe Patch Preview",
      description: "Patch preview comes before preview diff.",
      copyPayload: "Prepare Safe Patch Preview. Inspect first and do not write files without approval.",
      priority: 50,
    });
  }
  if (context.needsPreviewDiff) {
    return buildCodexForgePaletteNextActionCommand({
      id: "next-compose-preview-diff",
      label: "Compose Preview Diff",
      description: "Preview diff comes before apply gate review.",
      copyPayload: "Compose Preview Diff only. Do not apply-diff.",
      priority: 60,
    });
  }
  if (context.needsApplyGateReview) {
    return buildCodexForgePaletteNextActionCommand({
      id: "next-review-apply-gate",
      label: "Review Apply Gate",
      description: "Review gate posture; no automatic apply.",
      href: "/stabilization",
      priority: 70,
    });
  }
  if (context.cleanCheckpointRecommended) {
    return buildCodexForgePaletteNextActionCommand({
      id: "next-commit-clean-checkpoint",
      label: "Recommend commit clean checkpoint",
      description: "Clean validation can recommend commit clean checkpoint without committing.",
      copyPayload: "Recommend commit clean checkpoint after validation. Do not commit without explicit approval.",
      priority: 80,
      keywords: ["next action", "commit clean checkpoint", "clean"],
    });
  }

  return buildCodexForgePaletteNextActionCommand({
    id: "next-continue-next-phase-safely",
    label: "Continue next phase safely",
    description: "Continue with inspect-first, review-gated handoff.",
    copyPayload: "Continue next phase safely. Preserve latest-message authority and no command execution without approval.",
    priority: 90,
  });
}

export function summarizeCodexForgePaletteNextAction(
  command = selectCodexForgePaletteNextAction()
): string {
  return `${command.label}: ${command.description}`;
}
