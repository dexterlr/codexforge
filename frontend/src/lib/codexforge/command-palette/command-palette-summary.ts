import type {
  CodexForgeCommand,
  CodexForgeCommandPaletteSummary,
  CodexForgePaletteNextActionContext,
} from "./command-palette-types";
import { buildCodexForgeCommandGroups } from "./command-groups";
import { buildCodexForgeCommandSafetyReport } from "./command-safety";
import { selectCodexForgePaletteNextAction } from "./command-next-action";

export function buildCodexForgeCommandPaletteSummary(
  commands: readonly CodexForgeCommand[],
  context: CodexForgePaletteNextActionContext = {}
): CodexForgeCommandPaletteSummary {
  const groups = buildCodexForgeCommandGroups(commands);
  const safety = buildCodexForgeCommandSafetyReport(commands);
  const nextAction = selectCodexForgePaletteNextAction(context);
  const disabledCount = commands.filter((command) => command.disabledReason).length;

  return {
    commandCount: commands.length,
    enabledCount: commands.length - disabledCount,
    disabledCount,
    groups: groups.map((group) => group.label),
    mutationBlockedCount: safety.blockedCount,
    nextActionCommand: nextAction.label,
    safetyPosture: safety.posture,
  };
}

export function summarizeCodexForgeCommandPaletteSession(
  summary: CodexForgeCommandPaletteSummary
): string {
  return `${summary.commandCount} commands, ${summary.enabledCount} enabled, ${summary.disabledCount} disabled, ${summary.mutationBlockedCount} blocked mutation pathways, next action: ${summary.nextActionCommand}, posture: ${summary.safetyPosture}.`;
}
