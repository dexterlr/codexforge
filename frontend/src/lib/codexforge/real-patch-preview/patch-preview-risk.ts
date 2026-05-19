import {
  buildRealPatchPreviewStableId,
  clampRealPatchPreviewScore,
  projectRiskToRealPatchRisk,
  type PatchChangeRequest,
  type PatchPreviewContext,
  type RealPatchPreviewPlan,
  type RealPatchPreviewRiskFactor,
  type RealPatchPreviewRiskLevel,
  type RealPatchPreviewRiskReport,
  type RealPatchPreviewTestPlan,
} from "./real-patch-preview-types";

function factor(
  id: string,
  label: string,
  points: number,
  level: RealPatchPreviewRiskLevel,
  detail: string
): RealPatchPreviewRiskFactor {
  return { id, label, points, level, detail };
}

function hasAny(text: string, values: readonly string[]): boolean {
  return values.some((value) => text.includes(value));
}

function collectFactors(input: {
  request?: PatchChangeRequest | null;
  context?: PatchPreviewContext | null;
  plan?: RealPatchPreviewPlan | null;
  testPlan?: RealPatchPreviewTestPlan | null;
}): RealPatchPreviewRiskFactor[] {
  const path = (input.context?.filePath ?? input.request?.selectedFilePath ?? input.plan?.selectedFile ?? "").toLowerCase();
  const requestText = input.request?.requestedChangeText.toLowerCase() ?? "";
  const factors: RealPatchPreviewRiskFactor[] = [];

  if (path.includes("/api/") || path.endsWith("route.ts")) {
    factors.push(factor("api-route", "API route", 28, "high", "Route handlers can affect request/response behavior."));
  }
  if (hasAny(path, ["storage", "persistence", "database", "journal"])) {
    factors.push(factor("storage-persistence", "storage/persistence", 30, "high", "Persistence boundaries need extra review."));
  }
  if (hasAny(path, ["brain", "graph", "runtime"])) {
    factors.push(factor("brain-runtime", "Brain graph/runtime", 38, "critical", "Brain/runtime surfaces can affect memory or reducer posture."));
  }
  if (hasAny(path, ["navigation", "shell", "layout.tsx", "command-palette"])) {
    factors.push(factor("shell-layout-navigation", "shell/layout/navigation", 18, "medium", "Navigation changes can affect operator workflow."));
  }
  if (path.includes("scripts/smoke-codexforge")) {
    factors.push(factor("smoke-suite", "smoke suite", 16, "medium", "Smoke scripts validate product safety markers."));
  }
  if (hasAny(path, ["package.json", "tsconfig", "next.config", "eslint.config", ".env"])) {
    factors.push(factor("package-config", "package/config", 26, "high", "Package/config changes have broad build impact."));
  }
  if (hasAny(path, ["patch", "apply-diff", "apply", "diff", "write-file", "run-command"])) {
    factors.push(factor("patch-apply-write-run", "patch/apply/write/run-command files", 34, "critical", "Mutation workflow files require approval boundaries."));
  }
  if (hasAny(path, ["apply-diff"]) || requestText.includes("apply-diff")) {
    factors.push(factor("detect-apply-diff", "apply-diff detected", 34, "critical", "apply-diff requires Patch Application Gate before any future apply."));
  }
  if (hasAny(path, ["write-file"]) || requestText.includes("write-file")) {
    factors.push(factor("detect-write-file", "write-file detected", 34, "critical", "write-file is a mutation-capable tool boundary."));
  }
  if (hasAny(path, ["run-command"]) || requestText.includes("run-command")) {
    factors.push(factor("detect-run-command", "run-command detected", 34, "critical", "run-command is execution-capable and blocked from preview UI."));
  }
  if (input.context?.fileRisk) {
    const level = projectRiskToRealPatchRisk(input.context.fileRisk.level);
    if (level !== "low") {
      factors.push(factor("local-reader-risk", "high file risk from Local Project Reader", input.context.fileRisk.score, level, input.context.fileRisk.summary));
    }
  }
  if ((input.plan?.expectedTouchedFiles.length ?? 0) > 1) {
    factors.push(factor("multi-file-expected-touch", "multi-file expected touch", 16, "medium", "Preview plan expects more than one touched file."));
  }
  if (!input.request?.requestedChangeText || /\b(fix it|make better|improve|update stuff)\b/i.test(input.request.requestedChangeText)) {
    factors.push(factor("ambiguous-change-request", "ambiguous change request", 20, "medium", "Request is missing or ambiguous; exact patch preview may fall back to pseudo-diff."));
  }
  if ((input.testPlan?.targetedChecks.length ?? 0) === 0) {
    factors.push(factor("missing-tests", "missing tests", 14, "medium", "No targeted smoke check was selected."));
  }
  if (input.context?.truncated) {
    factors.push(factor("large-truncated-context", "large file/truncated context", 22, "high", "Context was truncated, so exact line authority is incomplete."));
  }

  return factors;
}

export function scoreRealPatchPreviewRisk(input: {
  request?: PatchChangeRequest | null;
  context?: PatchPreviewContext | null;
  plan?: RealPatchPreviewPlan | null;
  testPlan?: RealPatchPreviewTestPlan | null;
}): number {
  return clampRealPatchPreviewScore(collectFactors(input).reduce((total, item) => total + item.points, 0));
}

export function classifyRealPatchPreviewRisk(
  input: number | {
    request?: PatchChangeRequest | null;
    context?: PatchPreviewContext | null;
    plan?: RealPatchPreviewPlan | null;
    testPlan?: RealPatchPreviewTestPlan | null;
  }
): RealPatchPreviewRiskLevel {
  const factors = typeof input === "number" ? [] : collectFactors(input);
  const score = typeof input === "number" ? clampRealPatchPreviewScore(input) : scoreRealPatchPreviewRisk(input);
  if (factors.some((item) => item.level === "blocked")) return "blocked";
  if (score >= 95) return "critical";
  if (score >= 60) return "high";
  if (score >= 30) return "medium";
  return "low";
}

export function buildRealPatchPreviewRiskReport(input: {
  request?: PatchChangeRequest | null;
  context?: PatchPreviewContext | null;
  plan?: RealPatchPreviewPlan | null;
  testPlan?: RealPatchPreviewTestPlan | null;
}): RealPatchPreviewRiskReport {
  const factors = collectFactors(input);
  const blockedReasons = input.request && !input.request.validation.valid ? input.request.validation.blockedReasons : [];
  if (input.context?.fileRisk.level === "blocked") {
    blockedReasons.push("Local Project Reader marked the selected file as blocked.");
  }
  const score = blockedReasons.length ? 120 : scoreRealPatchPreviewRisk(input);
  const level = blockedReasons.length ? "blocked" : classifyRealPatchPreviewRisk(score);
  const filePath = input.context?.filePath ?? input.request?.selectedFilePath ?? input.plan?.selectedFile ?? "unselected";
  const report: RealPatchPreviewRiskReport = {
    id: buildRealPatchPreviewStableId("real-patch-risk", filePath, String(score), factors.map((item) => item.id).join("|")),
    filePath,
    score,
    level,
    factors,
    blockedReasons,
    summary: "",
    safeHandling:
      level === "blocked"
        ? "Do not prepare apply handoff until blockers are resolved."
        : "Keep preview-only, inspect first, and use Patch Application Gate before apply.",
  };

  return {
    ...report,
    summary: summarizeRealPatchPreviewRisk(report),
  };
}

export function summarizeRealPatchPreviewRisk(report: RealPatchPreviewRiskReport): string {
  const factorText = report.factors.length ? report.factors.map((item) => item.label).join(", ") : "no elevated factors";
  return `${report.level} risk (${report.score}) for ${report.filePath}: ${factorText}. ${report.safeHandling}`;
}
