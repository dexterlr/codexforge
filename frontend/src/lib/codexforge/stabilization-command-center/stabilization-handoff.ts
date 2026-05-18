import type {
  StabilizationCommandCenterInput,
  StabilizationHandoff,
  StabilizationNextActionPlan,
} from "./stabilization-types";
import { normalizeStabilizationValidationCommands } from "./stabilization-types";
import { buildStabilizationNextActionPlan } from "./stabilization-next-action";

export function buildStabilizationPrompt(plan: StabilizationNextActionPlan): string {
  return [
    "Stabilization Command Center handoff",
    "",
    "Inspect current state first.",
    "Verify current files.",
    "Evidence is context, not proof.",
    "No file writes without approval.",
    "No command execution without approval.",
    "No auto-fix.",
    "No auto-rollback.",
    "Preserve latest-message authority.",
    "Use Safe Patch Preview for edits.",
    "Use Preview Diff Composer before apply.",
    "",
    `Next action: ${plan.selected.action}`,
    "",
    "Blockers:",
    ...(plan.blockers.length > 0 ? plan.blockers.map((item) => `- ${item}`) : ["- none"]),
    "",
    "Warnings:",
    ...(plan.warnings.length > 0 ? plan.warnings.map((item) => `- ${item}`) : ["- none"]),
    "",
    "Validation commands:",
    ...plan.validationCommands.map((command) => `- ${command}`),
  ].join("\n");
}

export function buildStabilizationHandoff(input: StabilizationCommandCenterInput = {}): StabilizationHandoff {
  const plan = buildStabilizationNextActionPlan(input);
  const validationCommands = normalizeStabilizationValidationCommands(input.validationCommands);
  const prompt = buildStabilizationPrompt({ ...plan, validationCommands });

  return {
    id: "stabilization-handoff",
    prompt,
    blockers: plan.blockers,
    warnings: plan.warnings,
    nextAction: plan.selected.action,
    validationCommands,
    summary: summarizeStabilizationHandoff({ prompt, blockers: plan.blockers, warnings: plan.warnings, nextAction: plan.selected.action, validationCommands }),
  };
}

export function summarizeStabilizationHandoff(handoff: Pick<StabilizationHandoff, "blockers" | "warnings" | "nextAction" | "validationCommands"> & { prompt?: string }): string[] {
  return [
    `Handoff next action is ${handoff.nextAction}.`,
    `${handoff.blockers.length} blockers and ${handoff.warnings.length} warnings are included.`,
    `${handoff.validationCommands.length} validation commands are included for manual use.`,
    "Handoff says inspect current state first and use Safe Patch Preview for edits.",
  ];
}
