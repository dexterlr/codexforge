import type { PrimaryAction, ProductSimplificationRoute } from "./product-simplification-types";

export function buildPrimaryAction(input: PrimaryAction): PrimaryAction {
  return { ...input, safeOnly: true };
}

const ACTIONS: readonly PrimaryAction[] = [
  { route: "/ai", label: "Ask CodexForge", description: "Focus the composer and describe what you want.", kind: "focus", safeOnly: true },
  { route: "/code-flow", label: "Fix code safely", description: "Pick a file, preview the change, approve it, then run checks.", kind: "focus", safeOnly: true },
  { route: "/apply-validation", label: "Apply safely, then validate", description: "Review policy, rollback, validation output, and result routing.", kind: "prepare", safeOnly: true },
  { route: "/run-history", label: "Review run history", description: "Review recent runs, copy handoffs, and choose the next safe action.", kind: "copy", safeOnly: true },
  { route: "/files", label: "Inspect a file", description: "Open the file explorer and preview code.", kind: "focus", safeOnly: true },
  { route: "/validation", label: "Prepare checks", description: "Review validation choices before execution.", kind: "prepare", safeOnly: true },
  { route: "/closed-loop", label: "Start fix loop", description: "Choose a failure or paste output first.", kind: "prepare", safeOnly: true },
  { route: "/creative", label: "Plan creative work", description: "Choose a creative path.", kind: "open", safeOnly: true },
  { route: "/creative-mvp", label: "Review MVP candidate", description: "Review the recommended design-only candidate.", kind: "open", safeOnly: true },
  { route: "/local-bridge-health", label: "Check setup", description: "Review local tool readiness.", kind: "open", safeOnly: true },
  { route: "/health-probe", label: "Prepare probe", description: "Review metadata-only probe details.", kind: "prepare", safeOnly: true },
  { route: "/artifacts/review", label: "Review artifact", description: "Inspect artifact output and provenance.", kind: "open", safeOnly: true },
  { route: "/creative-sandbox", label: "Run simulation", description: "Open the simulation-only lifecycle.", kind: "open", safeOnly: true },
  { route: "/creative-executor", label: "Review dry run", description: "Review dry-run packet only.", kind: "open", safeOnly: true },
  { route: "/creative-readiness", label: "Audit readiness", description: "Review readiness posture.", kind: "open", safeOnly: true },
  { route: "/", label: "Go to Start", description: "Open the guided start page.", kind: "open", safeOnly: true },
  { route: "/start", label: "Choose an intent", description: "Pick what you want to do next.", kind: "focus", safeOnly: true },
];

export function buildDefaultPrimaryActions(): PrimaryAction[] {
  return ACTIONS.map(buildPrimaryAction);
}

export function selectPrimaryActionForRoute(route: ProductSimplificationRoute): PrimaryAction {
  return buildDefaultPrimaryActions().find((action) => action.route === route) ?? buildPrimaryAction({ route, label: "Review first", description: "Review this surface before taking action.", kind: "open", safeOnly: true });
}

export function summarizePrimaryAction(action: PrimaryAction): string {
  return `${action.route}: ${action.label} (${action.kind}); safe-only.`;
}
