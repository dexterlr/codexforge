import {
  buildRegressionTriageStableKey,
  uniqueRegressionStrings,
  type RegressionImpactMap,
  type RegressionRollbackAdvice,
  type RegressionRollbackOption,
  type RegressionRollbackOptionKind,
  type RegressionRiskLevel,
  type RegressionSignal,
  type RegressionUrgency,
} from "./regression-triage-types";

function optionTitle(kind: RegressionRollbackOptionKind): string {
  switch (kind) {
    case "inspect-first":
      return "No rollback; inspect first";
    case "git-restore-target-file-before-commit":
      return "git restore target file before commit";
    case "revert-last-commit-after-commit":
      return "git revert last commit after commit";
    case "isolate-patch-branch":
      return "isolate patch branch";
    case "rollback-ui-integration-only":
      return "rollback UI integration only";
    case "rollback-smoke-expectation-only":
      return "rollback smoke expectation only";
    case "rollback-domain-module-only":
      return "rollback domain module only";
    case "stop-and-stabilize":
      return "stop and stabilize";
  }
}

function commandPreview(kind: RegressionRollbackOptionKind, targetFile: string | null): string | null {
  if (kind === "git-restore-target-file-before-commit") return `git restore -- ${targetFile || "<target-file>"}`;
  if (kind === "revert-last-commit-after-commit") return "git revert <commit-sha>";
  if (kind === "isolate-patch-branch") return "git switch -c regression-triage-isolation";
  return null;
}

function riskForKind(kind: RegressionRollbackOptionKind): RegressionRiskLevel {
  if (kind === "stop-and-stabilize" || kind === "revert-last-commit-after-commit") return "high";
  if (kind === "git-restore-target-file-before-commit" || kind === "rollback-domain-module-only") return "medium";
  return "low";
}

export function buildRegressionRollbackOption(args: {
  kind: RegressionRollbackOptionKind;
  targetFile?: string | null;
  reason?: string | null;
  whenToUse?: string | null;
}): RegressionRollbackOption {
  const title = optionTitle(args.kind);
  return {
    optionId: buildRegressionTriageStableKey("regression-rollback-option", args.kind, args.targetFile ?? "none"),
    kind: args.kind,
    title,
    commandPreview: commandPreview(args.kind, args.targetFile ?? null),
    reason: args.reason?.trim() || "Rollback option is a copyable preview only and is not executed here.",
    risk: riskForKind(args.kind),
    whenToUse: args.whenToUse?.trim() || "Use only after inspecting failed output and current files.",
    warnings: [
      "Do not run rollback from this UI.",
      "Warn before rollback if working tree has unrelated changes.",
      "Preserve smoke output before changing anything.",
    ],
    reviewRequired: true,
  };
}

function urgencyFor(signals: readonly RegressionSignal[], impactMap: RegressionImpactMap): RegressionUrgency {
  if (signals.some((signal) => signal.severity === "blocker") && impactMap.items.some((item) => item.riskLevel === "critical")) {
    return "stop-and-stabilize";
  }
  if (signals.some((signal) => signal.severity === "blocker" || signal.severity === "error")) return "high";
  if (signals.some((signal) => signal.severity === "warning")) return "medium";
  return "low";
}

export function buildRegressionRollbackAdvice(args: {
  signals?: readonly RegressionSignal[] | null;
  impactMap?: RegressionImpactMap | null;
} = {}): RegressionRollbackAdvice {
  const signals = args.signals ?? [];
  const impactMap = args.impactMap ?? { id: "regression-impact-map" as const, items: [], summary: [] };
  const firstFile = impactMap.items[0]?.filePath ?? null;
  const optionKinds: RegressionRollbackOptionKind[] = [
    "inspect-first",
    "git-restore-target-file-before-commit",
    "revert-last-commit-after-commit",
    "isolate-patch-branch",
  ];

  if (impactMap.items.some((item) => item.routeOrSurface === "/ai" || item.routeOrSurface === "/files" || item.routeOrSurface === "/tasks")) {
    optionKinds.push("rollback-ui-integration-only");
  }
  if (impactMap.items.some((item) => item.routeOrSurface === "smoke suite")) optionKinds.push("rollback-smoke-expectation-only");
  if (impactMap.items.some((item) => item.routeOrSurface === "runtime/domain module")) optionKinds.push("rollback-domain-module-only");
  if (signals.some((signal) => signal.severity === "blocker")) optionKinds.push("stop-and-stabilize");

  const options = uniqueRegressionStrings(optionKinds).map((kind) =>
    buildRegressionRollbackOption({
      kind: kind as RegressionRollbackOptionKind,
      targetFile: firstFile,
      reason:
        kind === "inspect-first"
          ? "No rollback is recommended until the failed output and current files are inspected."
          : "Command preview is supplied for human review only.",
    })
  );
  const urgency = urgencyFor(signals, impactMap);
  const warnings = [
    "Rollback advice is informational only.",
    "Warn before rollback if working tree has unrelated changes.",
    "Preserve smoke output and triage evidence before changing anything.",
  ];

  return {
    id: "regression-rollback-advice",
    urgency,
    options,
    warnings,
    summary: summarizeRegressionRollbackAdvice({ urgency, options, warnings }),
  };
}

export function summarizeRegressionRollbackAdvice(advice: Pick<RegressionRollbackAdvice, "urgency" | "options" | "warnings">): string[] {
  return [
    `Rollback urgency is ${advice.urgency}.`,
    `${advice.options.length} rollback options are visible as copyable command previews only.`,
    `${advice.warnings.length} rollback warnings are shown before any human action.`,
  ];
}
