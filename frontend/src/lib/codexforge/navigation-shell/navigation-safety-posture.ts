import type { CodexForgeSafetyPostureInput, CodexForgeSafetyPostureItem } from "./navigation-shell-types";

const DEFAULT_POSTURE: readonly CodexForgeSafetyPostureItem[] = [
  {
    id: "local-first",
    label: "local-first",
    summary: "Navigation reads caller-provided local route state and does not use external network dependency logic.",
    state: "enforced",
    priority: 10,
  },
  {
    id: "operator-safe",
    label: "operator-safe",
    summary: "Shell surfaces status and links only; it exposes no mutation controls.",
    state: "enforced",
    priority: 20,
  },
  {
    id: "no-auto-fix",
    label: "no auto-fix",
    summary: "The command deck never starts repair work by itself.",
    state: "enforced",
    priority: 30,
  },
  {
    id: "no-command-execution-without-approval",
    label: "no command execution without approval",
    summary: "Execution remains behind explicit operator review outside the shell.",
    state: "enforced",
    priority: 40,
  },
  {
    id: "no-file-writes-without-approval",
    label: "no file writes without approval",
    summary: "The shell does not write project files and only links to review surfaces.",
    state: "enforced",
    priority: 50,
  },
  {
    id: "apply-diff-approval-gated",
    label: "apply-diff approval gated",
    summary: "Patch application remains behind apply-diff approval gated workflows.",
    state: "review-required",
    priority: 60,
  },
  {
    id: "memory-review-required",
    label: "memory review required",
    summary: "Memory promotion requires review and is never automatic from navigation.",
    state: "review-required",
    priority: 70,
  },
  {
    id: "brain-graph-mutation-review-required",
    label: "Brain graph mutation review required",
    summary: "Brain graph mutation review required before graph writes happen elsewhere.",
    state: "review-required",
    priority: 80,
  },
  {
    id: "latest-message-authority-preserved",
    label: "preserve latest-message authority",
    summary: "Route state and shell copy do not override the latest assistant message authority.",
    state: "visible",
    priority: 90,
  },
] as const;

export function buildCodexForgeSafetyPostureItem(
  input: CodexForgeSafetyPostureInput
): CodexForgeSafetyPostureItem {
  const fallback = DEFAULT_POSTURE.find((item) => item.id === input.id);
  return {
    id: input.id,
    label: input.label ?? fallback?.label ?? input.id,
    summary: input.summary ?? fallback?.summary ?? "Visible safety posture item.",
    state: input.state ?? fallback?.state ?? "visible",
    priority: input.priority ?? fallback?.priority ?? 100,
  };
}

export function buildCodexForgeNavigationSafetyPosture(
  overrides: readonly CodexForgeSafetyPostureInput[] = []
): CodexForgeSafetyPostureItem[] {
  const overrideById = new Map(overrides.map((item) => [item.id, item]));
  const merged = DEFAULT_POSTURE.map((item) =>
    buildCodexForgeSafetyPostureItem({ ...item, ...overrideById.get(item.id) })
  );
  const extra = overrides
    .filter((item) => !DEFAULT_POSTURE.some((defaultItem) => defaultItem.id === item.id))
    .map(buildCodexForgeSafetyPostureItem);

  return [...merged, ...extra].sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id));
}

export function summarizeCodexForgeNavigationSafetyPosture(
  posture: readonly CodexForgeSafetyPostureItem[]
): string {
  return posture.map((item) => `${item.label}: ${item.state}`).join("; ");
}

