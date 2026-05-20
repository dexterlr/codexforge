import type {
  PathBoundaryAudit,
  RealCreativeReadinessAuditItem,
  RealCreativeReadinessAuditStatus,
  RealCreativeReadinessInput,
} from "./real-creative-readiness-types";
import {
  buildRealCreativeReadinessStableId,
  summarizeRealCreativeAuditStatus,
} from "./real-creative-readiness-types";
import { buildRealCreativeReadinessInput } from "./readiness-input";

type PathCheckKey =
  | "projectRootBoundaryVisible"
  | "artifactOutputRootBoundaryVisible"
  | "noAbsoluteUnreviewedOutputPath"
  | "noParentDirectoryTraversal"
  | "noWriteTargetOutsideArtifactRoot"
  | "noExecutablePathUsedAsOutputPath"
  | "pathPlaceholdersMarked"
  | "futureExecutorRequiresPathValidation"
  | "windowsPathHandlingReviewed"
  | "longPathBehaviorReviewed";

const CHECKS: Array<{
  key: PathCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}> = [
  { key: "projectRootBoundaryVisible", label: "project root boundary visible", critical: true, missingStatus: "blocker", detail: "Future execution needs an explicit project root boundary before any local path is trusted.", nextStep: "Define project root boundary evidence." },
  { key: "artifactOutputRootBoundaryVisible", label: "artifact output root boundary visible", critical: true, missingStatus: "blocker", detail: "Artifact output root boundary must be visible before any future artifact writes.", nextStep: "Define artifact output root boundary." },
  { key: "noAbsoluteUnreviewedOutputPath", label: "no absolute unreviewed output path", critical: true, missingStatus: "blocker", detail: "Absolute paths need explicit review and cannot be accepted as silent output destinations.", nextStep: "Replace absolute output path with reviewed bounded path metadata." },
  { key: "noParentDirectoryTraversal", label: "no parent directory traversal", critical: true, missingStatus: "blocker", detail: "Parent directory traversal must be rejected before any future output write is allowed.", nextStep: "Add path traversal validation posture." },
  { key: "noWriteTargetOutsideArtifactRoot", label: "no write target outside artifact root", critical: true, missingStatus: "blocker", detail: "Future writes must stay inside the artifact output root.", nextStep: "Constrain future write targets to artifact root." },
  { key: "noExecutablePathUsedAsOutputPath", label: "no executable path used as output path", critical: true, missingStatus: "blocker", detail: "Executable paths and output paths must be separate to avoid tool path confusion.", nextStep: "Separate executable path hints from artifact paths." },
  { key: "pathPlaceholdersMarked", label: "path placeholders clearly marked", critical: false, missingStatus: "warning", detail: "Placeholder paths must be clearly marked so fake evidence is not confused with generated outputs.", nextStep: "Label path placeholders." },
  { key: "futureExecutorRequiresPathValidation", label: "future executor requires path validation", critical: true, missingStatus: "blocker", detail: "A future executor cannot accept paths without deterministic validation.", nextStep: "Require path validation in the future executor contract." },
  { key: "windowsPathHandlingReviewed", label: "Windows path handling reviewed", critical: false, missingStatus: "warning", detail: "Windows drive, separator, reserved name, and normalization behavior need review before real local execution.", nextStep: "Review Windows path handling." },
  { key: "longPathBehaviorReviewed", label: "long path behavior reviewed", critical: false, missingStatus: "warning", detail: "Long path behavior needs a visible posture before generated artifact names are written.", nextStep: "Review long path behavior." },
];

export function buildPathBoundaryAuditItem(input: {
  input: RealCreativeReadinessInput;
  key: PathCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}): RealCreativeReadinessAuditItem {
  const passed = input.input.evidence[input.key];
  return {
    itemId: buildRealCreativeReadinessStableId("path-boundary-item", [
      input.input.auditId,
      input.key,
    ]),
    label: input.label,
    status: passed ? "ready" : input.missingStatus,
    detail: input.detail,
    evidence: passed ? "Path boundary evidence is present and bounded." : "Path boundary evidence is missing or unsafe.",
    critical: input.critical,
    nextStep: passed ? "Keep path validation before artifact writes." : input.nextStep,
  };
}

export function buildPathBoundaryAudit(
  input: RealCreativeReadinessInput = buildRealCreativeReadinessInput()
): PathBoundaryAudit {
  const items = CHECKS.map((check) => buildPathBoundaryAuditItem({ input, ...check }));
  const status = summarizeRealCreativeAuditStatus(items);
  const audit = {
    auditId: buildRealCreativeReadinessStableId("path-boundary-audit", [
      input.auditId,
      input.targetExecutorKind,
    ]),
    targetExecutorKind: input.targetExecutorKind,
    status,
    items,
    blockerCount: items.filter((item) => item.status === "blocker" || item.status === "needs-config").length,
    warningCount: items.filter((item) => item.status === "warning").length,
    summary: [] as string[],
  };

  return { ...audit, summary: summarizePathBoundaryAudit(audit) };
}

export function summarizePathBoundaryAudit(
  audit: Pick<PathBoundaryAudit, "items" | "status" | "blockerCount" | "warningCount">
): string[] {
  return [
    `Path boundary status: ${audit.status}.`,
    `${audit.items.length} path checks reviewed before any artifact write posture; ${audit.blockerCount} blocker/config item(s), ${audit.warningCount} warning(s).`,
    "Path boundary audit checks project root boundary, output root boundary, parent directory traversal, outside-root writes, executable/output confusion, Windows paths, and long paths.",
  ];
}
