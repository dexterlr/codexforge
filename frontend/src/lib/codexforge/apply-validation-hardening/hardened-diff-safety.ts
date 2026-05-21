import {
  buildApplyValidationStableId,
  hasApplyValidationPathTraversal,
  normalizeApplyValidationPath,
  uniqueApplyValidationStrings,
  type ApplyValidationHardeningStatus,
  type HardenedDiffSafety,
  type HardenedDiffSafetyCheck,
} from "./apply-validation-hardening-types";

function extractTouchedFiles(diffText: string): string[] {
  const files = diffText
    .split(/\r?\n/)
    .flatMap((line) => {
      const match = /^(?:diff --git a\/(.+?) b\/(.+)|\+\+\+ b\/(.+)|--- a\/(.+))$/.exec(line.trim());
      return match ? [match[1], match[2], match[3], match[4]] : [];
    })
    .filter(Boolean)
    .map((file) => normalizeApplyValidationPath(file));
  return uniqueApplyValidationStrings(files);
}

function hasMojibakeText(value: string): boolean {
  const mojibakeSignals = ["\u00c3", "\u00c2", "\u00e2\u20ac\u2122", "\u00e2\u20ac\u0153", "\u00e2\u20ac"];
  return mojibakeSignals.some((signal) => value.includes(signal));
}

export function buildHardenedDiffSafetyCheck(input: HardenedDiffSafetyCheck): HardenedDiffSafetyCheck {
  return { ...input };
}

export function buildHardenedDiffSafety(args: {
  selectedFilePath?: string | null;
  previewDiffText?: string | null;
  touchedFiles?: readonly string[] | null;
  targetedSmokeCommands?: readonly string[] | null;
} = {}): HardenedDiffSafety {
  const selectedFilePath = normalizeApplyValidationPath(args.selectedFilePath ?? "");
  const diffText = String(args.previewDiffText ?? "");
  const touchedFiles = uniqueApplyValidationStrings([...(args.touchedFiles ?? []), ...extractTouchedFiles(diffText)]);
  const lowerDiff = diffText.toLowerCase();
  const targetedSmoke = (args.targetedSmokeCommands ?? []).join("\n").toLowerCase();
  const checks = [
    buildHardenedDiffSafetyCheck({
      id: "unified-diff-present",
      label: "Unified diff present",
      status: diffText.includes("diff --git") || diffText.includes("@@") ? "pass" : "blocker",
      detail: "Preview diff must be reviewable before apply.",
      blocksApply: !(diffText.includes("diff --git") || diffText.includes("@@")),
    }),
    buildHardenedDiffSafetyCheck({
      id: "file-path-matches-selected-file",
      label: "File path matches selected file",
      status: selectedFilePath && (touchedFiles.length === 0 || touchedFiles.includes(selectedFilePath)) ? "pass" : "blocker",
      detail: "Touched files must stay aligned with the selected file unless explicitly reviewed.",
      blocksApply: Boolean(selectedFilePath && touchedFiles.length > 0 && !touchedFiles.includes(selectedFilePath)),
    }),
    buildHardenedDiffSafetyCheck({
      id: "touched-files-bounded",
      label: "Touched files bounded",
      status: touchedFiles.length <= 6 ? "pass" : "risk",
      detail: `${touchedFiles.length} touched file(s) detected.`,
      blocksApply: false,
    }),
    buildHardenedDiffSafetyCheck({
      id: "path-traversal-check",
      label: "Path traversal check",
      status: [selectedFilePath, ...touchedFiles].some(hasApplyValidationPathTraversal) ? "blocker" : "pass",
      detail: "Absolute paths and .. segments are blocked.",
      blocksApply: [selectedFilePath, ...touchedFiles].some(hasApplyValidationPathTraversal),
    }),
    buildHardenedDiffSafetyCheck({
      id: "binary-patch-check",
      label: "Binary patch check",
      status: lowerDiff.includes("binary files") || lowerDiff.includes("git binary patch") ? "blocker" : "pass",
      detail: "Binary patches are not reviewable in this hardening panel.",
      blocksApply: lowerDiff.includes("binary files") || lowerDiff.includes("git binary patch"),
    }),
    buildHardenedDiffSafetyCheck({
      id: "generated-huge-patch-check",
      label: "Huge generated patch check",
      status: diffText.length > 50000 || diffText.split(/\r?\n/).length > 900 ? "risk" : "pass",
      detail: "Large generated patches require separate review.",
      blocksApply: false,
    }),
    buildHardenedDiffSafetyCheck({
      id: "package-config-change-warning",
      label: "Package/config change warning",
      status: touchedFiles.some((file) => /(^|\/)(package(-lock)?\.json|next\.config|tsconfig|\.env)/.test(file)) ? "warning" : "pass",
      detail: "Package or config changes need explicit validation coverage.",
      blocksApply: false,
    }),
    buildHardenedDiffSafetyCheck({
      id: "smoke-script-targeted-smoke",
      label: "Smoke script edit has targeted smoke",
      status: touchedFiles.some((file) => file.includes("scripts/smoke-")) && !targetedSmoke.includes("smoke-codexforge") ? "risk" : "pass",
      detail: "Smoke script edits should include targeted smoke validation.",
      blocksApply: false,
    }),
    buildHardenedDiffSafetyCheck({
      id: "apply-write-run-command-warning",
      label: "Apply/write/run-command edit warning",
      status: touchedFiles.some((file) => /tools\/(apply-diff|run-command)|write-file/.test(file)) ? "risk" : "pass",
      detail: "Execution-capable tool edits require high-risk acknowledgement.",
      blocksApply: false,
    }),
    buildHardenedDiffSafetyCheck({
      id: "brain-runtime-edit-warning",
      label: "Brain graph/runtime edit warning",
      status: touchedFiles.some((file) => /brain|runtime/.test(file)) ? "risk" : "pass",
      detail: "Brain graph/runtime edits require extra review and no UI mutation.",
      blocksApply: false,
    }),
    buildHardenedDiffSafetyCheck({
      id: "secrets-in-diff-check",
      label: "Secrets in diff check",
      status: /(api[_-]?key|secret|token|password)\s*[:=]\s*['"][^'"]+/i.test(diffText) ? "blocker" : "pass",
      detail: "Hardcoded API keys, secrets, tokens, and passwords block apply.",
      blocksApply: /(api[_-]?key|secret|token|password)\s*[:=]\s*['"][^'"]+/i.test(diffText),
    }),
    buildHardenedDiffSafetyCheck({
      id: "mojibake-check",
      label: "Mojibake check",
      status: hasMojibakeText(diffText) ? "blocker" : "pass",
      detail: "Mojibake blocks review until corrected.",
      blocksApply: hasMojibakeText(diffText),
    }),
  ];
  const blockerCount = checks.filter((check) => check.status === "blocker" || check.blocksApply).length;
  const riskCount = checks.filter((check) => check.status === "risk").length;
  const warningCount = checks.filter((check) => check.status === "warning").length;
  const overallStatus: ApplyValidationHardeningStatus = blockerCount ? "blocker" : riskCount ? "risk" : warningCount ? "warning" : "pass";
  const safety: HardenedDiffSafety = {
    id: buildApplyValidationStableId("hardened-diff-safety", selectedFilePath, String(touchedFiles.length), overallStatus),
    selectedFilePath,
    touchedFiles,
    checks,
    overallStatus,
    blockerCount,
    warningCount,
    riskCount,
    summary: [],
  };
  return { ...safety, summary: summarizeHardenedDiffSafety(safety) };
}

export function summarizeHardenedDiffSafety(safety: HardenedDiffSafety): string[] {
  return [
    `Diff safety status is ${safety.overallStatus}.`,
    `${safety.blockerCount} blocker(s), ${safety.riskCount} risk(s), ${safety.warningCount} warning(s).`,
    `Touched files: ${safety.touchedFiles.length ? safety.touchedFiles.join(", ") : "none detected"}.`,
  ];
}
