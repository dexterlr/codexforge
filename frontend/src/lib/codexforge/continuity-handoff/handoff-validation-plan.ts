import type { ContinuityHandoffValidationCommand, ContinuityHandoffValidationPlan } from "./continuity-handoff-types";
import { CONTINUITY_HANDOFF_VALIDATION_COMMANDS, buildContinuityHandoffStableKey } from "./continuity-handoff-types";

const PURPOSES: Record<string, string> = {
  "npm run build": "Confirm TypeScript and Next build health.",
  "npm run smoke:codexforge:server": "Confirm managed smoke suite health through the server runner.",
  "git diff --check": "Detect whitespace and conflict marker issues.",
  "git status --short": "Show working tree state before commit or handoff.",
  "git diff --stat": "Show changed-file breadth for review.",
};

export function buildContinuityHandoffValidationCommand(input: {
  label: string;
  command: string;
  purpose?: string;
  required?: boolean;
  manualOnly?: boolean;
  expectedOutcome?: string;
  failureNextAction?: string;
}): ContinuityHandoffValidationCommand {
  return {
    id: buildContinuityHandoffStableKey("handoff-validation-command", input.command),
    label: input.label,
    command: input.command,
    purpose: input.purpose ?? PURPOSES[input.command] ?? "Run targeted smoke for current phase or upstream surface.",
    required: input.required ?? true,
    manualOnly: input.manualOnly ?? true,
    expectedOutcome: input.expectedOutcome ?? "Command completes successfully with no failures.",
    failureNextAction: input.failureNextAction ?? "Stop and stabilize before next phase work.",
  };
}

export function buildContinuityHandoffValidationPlan(): ContinuityHandoffValidationPlan {
  const commands = CONTINUITY_HANDOFF_VALIDATION_COMMANDS.map((command) =>
    buildContinuityHandoffValidationCommand({
      label: command.includes("continuity-handoff") ? "Targeted Continuity Handoff smoke" : command,
      command,
    })
  );
  return {
    id: "continuity-handoff-validation-plan",
    commands,
    requiredCount: commands.filter((command) => command.required).length,
    manualOnly: true,
    summary: summarizeContinuityHandoffValidationPlan(commands),
  };
}

export function summarizeContinuityHandoffValidationPlan(commandsOrPlan: readonly ContinuityHandoffValidationCommand[] | ContinuityHandoffValidationPlan): string[] {
  const commands = "commands" in commandsOrPlan ? commandsOrPlan.commands : commandsOrPlan;
  return [
    `${commands.length} validation commands are copy-only and manual only.`,
    "Validation plan includes npm run build, targeted smoke, upstream smoke, npm run smoke:codexforge:server, git diff --check, git status --short, and git diff --stat.",
    "UI cannot execute commands.",
  ];
}
