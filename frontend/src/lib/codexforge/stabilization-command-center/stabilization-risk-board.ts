import type {
  StabilizationCommandCenterInput,
  StabilizationRiskBoard,
  StabilizationRiskCategory,
  StabilizationRiskItem,
  StabilizationSeverity,
  StabilizationSignal,
  StabilizationSource,
  StabilizationRelatedSurface,
} from "./stabilization-types";
import { buildStabilizationSignals } from "./stabilization-signal-model";
import { buildStabilizationStableKey } from "./stabilization-types";

const RISK_RANK: Record<StabilizationSeverity, number> = {
  ready: 0,
  info: 1,
  warning: 2,
  risk: 3,
  blocker: 4,
};

function signalSeverity(signals: readonly StabilizationSignal[], type: StabilizationSignal["type"]): StabilizationSeverity {
  const signal = signals.find((item) => item.type === type);
  return signal?.severity ?? "info";
}

export function buildStabilizationRiskItem(args: {
  id?: string | null;
  category: StabilizationRiskCategory;
  title: string;
  severity: StabilizationSeverity;
  source: StabilizationSource;
  relatedSurface: StabilizationRelatedSurface;
  mitigation: string;
  safePatchPreviewRequired: boolean;
  verificationRequired: boolean;
}): StabilizationRiskItem {
  return {
    id: args.id ?? buildStabilizationStableKey("stabilization-risk", args.category, args.title),
    category: args.category,
    title: args.title,
    severity: args.severity,
    source: args.source,
    relatedSurface: args.relatedSurface,
    mitigation: args.mitigation,
    safePatchPreviewRequired: args.safePatchPreviewRequired,
    verificationRequired: args.verificationRequired,
  };
}

export function buildStabilizationRiskBoard(input: StabilizationCommandCenterInput = {}): StabilizationRiskBoard {
  const signals = buildStabilizationSignals(input);
  const latestAuthoritySeverity = input.latestMessageAuthorityPreserved === false ? "blocker" : "info";
  const items: StabilizationRiskItem[] = [
    buildStabilizationRiskItem({
      category: "build-break",
      title: "Build break risk",
      severity: signalSeverity(signals, "build-posture"),
      source: "build",
      relatedSurface: "smoke suite",
      mitigation: "Review npm run build output manually before continuing.",
      safePatchPreviewRequired: true,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "smoke-break",
      title: "Smoke break risk",
      severity: signalSeverity(signals, "smoke-posture"),
      source: "smoke",
      relatedSurface: "smoke suite",
      mitigation: "Run targeted smoke manually outside this UI, then paste output.",
      safePatchPreviewRequired: true,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "browser-warning",
      title: "Browser warning risk",
      severity: "info",
      source: "regression-triage",
      relatedSurface: "/files",
      mitigation: "Treat browser warnings as regression triage context until verified.",
      safePatchPreviewRequired: true,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "UI-layout-risk",
      title: "UI layout risk",
      severity: "info",
      source: "stabilization-command-center",
      relatedSurface: "/stabilization",
      mitigation: "Use responsive grids, wrapping text, and stable keys.",
      safePatchPreviewRequired: false,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "policy-boundary-risk",
      title: "Policy boundary risk",
      severity: signalSeverity(signals, "apply-gate-posture"),
      source: "patch-application-gate",
      relatedSurface: "/files",
      mitigation: "Keep apply-diff, write-file, run-command, and broker-execution outside stabilization.",
      safePatchPreviewRequired: true,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "mutation-risk",
      title: "Mutation risk",
      severity: "risk",
      source: "stabilization-command-center",
      relatedSurface: "/stabilization",
      mitigation: "Expose copy-only handoffs; no mutation buttons.",
      safePatchPreviewRequired: true,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "stale-evidence-risk",
      title: "Stale evidence risk",
      severity: signalSeverity(signals, "verification-posture"),
      source: "verification-ingestion",
      relatedSurface: "/jarvis",
      mitigation: "Evidence is context, not proof; verify current files before edits.",
      safePatchPreviewRequired: true,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "rollback-risk",
      title: "Rollback risk",
      severity: signalSeverity(signals, "rollback-posture"),
      source: "post-apply-verification",
      relatedSurface: "/files",
      mitigation: "Prepare rollback before execution gate review.",
      safePatchPreviewRequired: true,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "memory-authority-risk",
      title: "Memory authority risk",
      severity: signalSeverity(signals, "memory-review-posture"),
      source: "memory-review",
      relatedSurface: "/memory",
      mitigation: "Keep memory candidates review-required; no auto-promotion and no graph mutation.",
      safePatchPreviewRequired: false,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "latest-message-authority-risk",
      title: "Latest-message authority risk",
      severity: latestAuthoritySeverity,
      source: "stabilization-command-center",
      relatedSurface: "/stabilization",
      mitigation: "Preserve latest-message authority before any copied handoff prompt is used.",
      safePatchPreviewRequired: false,
      verificationRequired: true,
    }),
    buildStabilizationRiskItem({
      category: "unknown-risk",
      title: "Unknown evidence risk",
      severity: signals.some((signal) => signal.type === "unknown") ? "warning" : "info",
      source: "unknown",
      relatedSurface: "/stabilization",
      mitigation: "Paste verification output and inspect current state first.",
      safePatchPreviewRequired: true,
      verificationRequired: true,
    }),
  ].sort((a, b) => {
    const rankDelta = RISK_RANK[b.severity] - RISK_RANK[a.severity];
    if (rankDelta !== 0) return rankDelta;
    return a.id.localeCompare(b.id);
  });

  const blockerCount = items.filter((item) => item.severity === "blocker").length;
  const warningCount = items.filter((item) => item.severity === "warning" || item.severity === "risk").length;

  return {
    id: "stabilization-risk-board",
    items,
    topRisk: items[0] ?? null,
    blockerCount,
    warningCount,
    summary: summarizeStabilizationRiskBoard({ items, topRisk: items[0] ?? null, blockerCount, warningCount }),
  };
}

export function summarizeStabilizationRiskBoard(board: Pick<StabilizationRiskBoard, "items" | "topRisk" | "blockerCount" | "warningCount">): string[] {
  return [
    `${board.items.length} risk categories are visible.`,
    `${board.blockerCount} blocker risk(s) and ${board.warningCount} warning or risk item(s).`,
    board.topRisk ? `Top risk: ${board.topRisk.title}.` : "No top risk yet.",
  ];
}
