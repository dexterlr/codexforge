import type {
  CodexForgeCommand,
  CodexForgeCommandGroup,
  CodexForgeCommandGroupInput,
  CodexForgeCommandGroupModel,
} from "./command-palette-types";

const GROUP_ORDER: readonly CodexForgeCommandGroup[] = [
  "Navigate",
  "Stabilize",
  "Patch workflow",
  "Verification",
  "Memory",
  "Runtime",
  "Handoff",
  "Creative",
  "Validation",
  "Safety",
  "Next action",
] as const;

const GROUP_DESCRIPTIONS: Record<CodexForgeCommandGroup, string> = {
  Navigate: "Route search and safe navigation.",
  Stabilize: "Regression triage, fix queue, and stabilization review.",
  "Patch workflow": "Preview-only patch preparation and review gates.",
  Verification: "Copy and review validation output.",
  Memory: "Memory candidate review without auto-promotion.",
  Runtime: "Runtime event journal audit and review handoffs.",
  Handoff: "Continuity Handoff Packet prompts and validation checklist.",
  Creative: "Creative preview surfaces and handoffs.",
  Validation: "Copyable build, smoke, and git checks.",
  Safety: "Blocked mutation pathways and authority guidance.",
  "Next action": "Safe continuation and checkpoint recommendations.",
};

function stableGroupId(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function buildCodexForgeCommandGroup(
  input: CodexForgeCommandGroupInput
): CodexForgeCommandGroupModel {
  const priority = input.priority ?? GROUP_ORDER.indexOf(input.label) * 10;
  return {
    id: input.id ?? stableGroupId(input.label),
    label: input.label,
    description: input.description ?? GROUP_DESCRIPTIONS[input.label],
    priority,
    commands: [...(input.commands ?? [])].sort(
      (a, b) => a.priority - b.priority || a.id.localeCompare(b.id)
    ),
  };
}

export function buildCodexForgeCommandGroups(
  commands: readonly CodexForgeCommand[]
): CodexForgeCommandGroupModel[] {
  return GROUP_ORDER.map((label) =>
    buildCodexForgeCommandGroup({
      label,
      commands: commands.filter((command) => command.group === label),
    })
  ).filter((group) => group.commands.length > 0);
}

export function summarizeCodexForgeCommandGroups(
  groups: readonly CodexForgeCommandGroupModel[]
): string {
  return groups.map((group) => `${group.label}: ${group.commands.length}`).join("; ");
}
