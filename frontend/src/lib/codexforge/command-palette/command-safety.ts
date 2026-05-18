import type {
  CodexForgeCommand,
  CodexForgeCommandSafetyItem,
  CodexForgeCommandSafetyReport,
} from "./command-palette-types";

const BLOCKED_MUTATION_MARKERS = [
  "apply-diff",
  "write-file",
  "run-command",
  "run-tests",
  "build-web-app",
  "broker-execution",
  "external api action",
  "external API action",
] as const;

export function buildCodexForgeCommandSafetyItem(
  input: Partial<CodexForgeCommandSafetyItem> & { id: string; label: string }
): CodexForgeCommandSafetyItem {
  return {
    blocked: true,
    reason: "Mutation-capable action is blocked from the command palette.",
    priority: 100,
    ...input,
  };
}

export function isCodexForgeCommandMutationBlocked(command: CodexForgeCommand): boolean {
  if (!command.noMutation) return true;
  const searchable = [
    command.id,
    command.label,
    ...command.keywords,
  ].join(" ");

  return BLOCKED_MUTATION_MARKERS.some((marker) =>
    searchable.toLowerCase().includes(marker.toLowerCase())
  );
}

export function buildCodexForgeCommandSafetyReport(
  commands: readonly CodexForgeCommand[] = []
): CodexForgeCommandSafetyReport {
  const policyItems = [
    buildCodexForgeCommandSafetyItem({
      id: "block-apply-diff",
      label: "apply-diff blocked",
      reason: "apply-diff cannot be called from command palette UI.",
      priority: 10,
    }),
    buildCodexForgeCommandSafetyItem({
      id: "block-write-file",
      label: "write-file blocked",
      reason: "write-file cannot be called from command palette UI.",
      priority: 20,
    }),
    buildCodexForgeCommandSafetyItem({
      id: "block-run-command",
      label: "run-command blocked",
      reason: "run-command cannot be called from command palette UI.",
      priority: 30,
    }),
    buildCodexForgeCommandSafetyItem({
      id: "block-broker-execution",
      label: "broker-execution blocked",
      reason: "broker-execution is blocked-policy text only.",
      priority: 40,
    }),
    buildCodexForgeCommandSafetyItem({
      id: "block-external-api-action",
      label: "external API action blocked",
      reason: "Palette logic is local-first and performs no external network calls.",
      priority: 50,
    }),
  ];
  const commandItems = commands
    .filter(isCodexForgeCommandMutationBlocked)
    .map((command, index) =>
      buildCodexForgeCommandSafetyItem({
        id: `command-${command.id}`,
        label: command.label,
        reason: command.disabledReason ?? "Command is mutation-marked and blocked.",
        priority: 100 + index,
      })
    );
  const items = [...policyItems, ...commandItems].sort(
    (a, b) => a.priority - b.priority || a.id.localeCompare(b.id)
  );

  return {
    items,
    blockedCount: items.filter((item) => item.blocked).length,
    posture: commandItems.length > 0 ? "blocked-mutation-present" : "copy-link-review-only",
  };
}

export function summarizeCodexForgeCommandSafety(
  report = buildCodexForgeCommandSafetyReport()
): string {
  return `${report.blockedCount} mutation pathways blocked; posture is ${report.posture}; route actions navigate only and copy actions copy text only.`;
}
