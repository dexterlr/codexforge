import {
  buildGuardedApplyCandidateStableId,
  hasGuardedApplyCandidatePathTraversal,
  normalizeGuardedApplyCandidatePath,
  uniqueGuardedApplyCandidateStrings,
  type GuardedApplyCandidateStatus,
  type SingleFileApplyScope,
  type SingleFileApplyScopeCheck,
  type SingleFileApplyScopeSource,
} from "./guarded-apply-candidate-types";

const HIGH_RISK_PATTERNS = [
  "package.json",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "next.config",
  "tsconfig",
  "tool-policy",
  "brain-runtime",
  "src/lib/codexforge/brain",
  ".env",
];

function isHighRiskFile(path: string): boolean {
  const normalized = path.toLowerCase();
  return HIGH_RISK_PATTERNS.some((pattern) => normalized.includes(pattern));
}

function combineStatus(checks: readonly SingleFileApplyScopeCheck[]): GuardedApplyCandidateStatus {
  if (checks.some((check) => check.status === "blocker")) return "blocker";
  if (checks.some((check) => check.status === "warning")) return "warning";
  if (checks.some((check) => check.status === "unknown")) return "unknown";
  return "pass";
}

export function buildSingleFileApplyScopeCheck(
  id: string,
  label: string,
  status: GuardedApplyCandidateStatus,
  detail: string,
  blocksCandidate = status === "blocker"
): SingleFileApplyScopeCheck {
  return { id, label, status, detail, blocksCandidate };
}

export function buildSingleFileApplyScope(source: SingleFileApplyScopeSource = {}): SingleFileApplyScope {
  const selectedFilePath = source.selectedFilePath ? normalizeGuardedApplyCandidatePath(source.selectedFilePath) : "";
  const diffTargets = uniqueGuardedApplyCandidateStrings(
    (source.diffTargets ?? []).map((target) => (target ? normalizeGuardedApplyCandidatePath(target) : ""))
  );
  const selectedMatchesDiff = selectedFilePath && diffTargets.length === 1 && diffTargets[0] === selectedFilePath;
  const operation = source.operation ?? "modify";
  const highRisk = isHighRiskFile(selectedFilePath) || source.packageOrLockFile === true || source.configFile === true || source.toolPolicyFile === true || source.brainRuntimeFile === true;
  const checks = [
    buildSingleFileApplyScopeCheck("exactly-one-selected-file", "Exactly one selected file", selectedFilePath ? "pass" : "blocker", selectedFilePath ? `Selected file: ${selectedFilePath}.` : "Single file scope requires exactly one selected file."),
    buildSingleFileApplyScopeCheck("exactly-one-diff-target", "Exactly one diff target", diffTargets.length === 1 ? "pass" : "blocker", diffTargets.length === 1 ? `One diff target: ${diffTargets[0]}.` : "Single file scope blocks multi-file diff."),
    buildSingleFileApplyScopeCheck("selected-file-matches-diff-target", "Selected file matches diff target", selectedMatchesDiff ? "pass" : "blocker", selectedMatchesDiff ? "Selected file matches the preview diff target." : "Selected file must match the exact diff target."),
    buildSingleFileApplyScopeCheck("generated-file-reviewed", "Generated file reviewed", source.generatedFileExplicitlyReviewed === false ? "blocker" : "pass", source.generatedFileExplicitlyReviewed === false ? "Generated file unless explicitly reviewed is blocked." : "Generated file status is reviewed or not applicable."),
    buildSingleFileApplyScopeCheck("no-delete-rename-operation", "No delete or rename", operation === "delete" || operation === "rename" ? "blocker" : "pass", operation === "delete" || operation === "rename" ? "Delete/rename operation in first candidate is blocked." : "First candidate is modify/create text only."),
    buildSingleFileApplyScopeCheck("no-binary-patch", "No binary patch", source.binaryPatch === true ? "blocker" : "pass", source.binaryPatch === true ? "Single file scope blocks binary patch." : "Binary patch not present."),
    buildSingleFileApplyScopeCheck("no-package-lock-config-tool-policy-brain-runtime", "No high-risk first candidate file", highRisk ? "blocker" : "pass", highRisk ? "Single file scope blocks package/lock/config/tool-policy/brain-runtime edit for first candidate." : "Safe file category preferred."),
    buildSingleFileApplyScopeCheck("path-relative-to-project-root", "Path relative to project root", !selectedFilePath || hasGuardedApplyCandidatePathTraversal(selectedFilePath) ? "blocker" : "pass", !selectedFilePath || hasGuardedApplyCandidatePathTraversal(selectedFilePath) ? "Path must be relative to project root with no parent traversal." : "Path is project-relative."),
  ];
  const overallStatus = combineStatus(checks);
  const scope: SingleFileApplyScope = {
    id: buildGuardedApplyCandidateStableId("single-file-scope", selectedFilePath || "no-file", diffTargets.join(",")),
    selectedFilePath,
    diffTargets,
    checks,
    overallStatus,
    blockerCount: checks.filter((check) => check.status === "blocker").length,
    warningCount: checks.filter((check) => check.status === "warning").length,
    safeFileCategoryPreferred: !highRisk,
    pathRelativeToProjectRoot: !!selectedFilePath && !hasGuardedApplyCandidatePathTraversal(selectedFilePath),
    summary: [],
  };
  return { ...scope, summary: summarizeSingleFileApplyScope(scope) };
}

export function summarizeSingleFileApplyScope(scope: SingleFileApplyScope): string[] {
  return [
    `Single file scope status: ${scope.overallStatus}.`,
    "First real candidate should be low-risk one-file text patch only.",
    `${scope.blockerCount} blocker(s), ${scope.warningCount} warning(s).`,
  ];
}
