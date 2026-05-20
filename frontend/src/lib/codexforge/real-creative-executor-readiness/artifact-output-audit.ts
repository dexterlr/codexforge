import type {
  ArtifactOutputAudit,
  RealCreativeReadinessAuditItem,
  RealCreativeReadinessAuditStatus,
  RealCreativeReadinessInput,
} from "./real-creative-readiness-types";
import {
  buildRealCreativeReadinessStableId,
  summarizeRealCreativeAuditStatus,
} from "./real-creative-readiness-types";
import { buildRealCreativeReadinessInput } from "./readiness-input";

type ArtifactCheckKey =
  | "expectedArtifactTypesKnown"
  | "artifactCapturePlanExists"
  | "metadataPlanExists"
  | "provenancePlanExists"
  | "reviewRouteExists"
  | "retentionStrategyExists"
  | "overwritePolicyExists"
  | "partialOutputHandlingExists"
  | "failedOutputHandlingExists"
  | "generatedVsPlaceholderClear";

const CHECKS: Array<{
  key: ArtifactCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}> = [
  { key: "expectedArtifactTypesKnown", label: "expected artifact types known", critical: true, missingStatus: "blocker", detail: "Expected output types must be listed before any executor can be considered.", nextStep: "List expected artifact types." },
  { key: "artifactCapturePlanExists", label: "artifact capture plan exists", critical: true, missingStatus: "blocker", detail: "Artifact capture needs a plan before future real output is possible.", nextStep: "Define artifact capture plan." },
  { key: "metadataPlanExists", label: "metadata plan exists", critical: true, missingStatus: "blocker", detail: "Metadata capture must be visible for review, traceability, and debugging.", nextStep: "Define metadata capture plan." },
  { key: "provenancePlanExists", label: "provenance plan exists", critical: true, missingStatus: "blocker", detail: "Generated artifacts need provenance before review or retention.", nextStep: "Define provenance plan." },
  { key: "reviewRouteExists", label: "review route exists", critical: true, missingStatus: "blocker", detail: "Artifacts need a review route before operator acceptance.", nextStep: "Route outputs to Creative Artifact Review." },
  { key: "retentionStrategyExists", label: "retention strategy exists", critical: false, missingStatus: "warning", detail: "Retention strategy keeps temporary, partial, and review artifacts understandable.", nextStep: "Define retention strategy." },
  { key: "overwritePolicyExists", label: "overwrite policy exists or missing warning", critical: false, missingStatus: "warning", detail: "Overwrite policy should be explicit; missing policy is a warning until real writes are designed.", nextStep: "Define overwrite policy before writes." },
  { key: "partialOutputHandlingExists", label: "partial output handling exists", critical: true, missingStatus: "blocker", detail: "Interrupted renders or captures may produce partial outputs; future handling must be clear.", nextStep: "Document partial output handling." },
  { key: "failedOutputHandlingExists", label: "failed output handling exists", critical: true, missingStatus: "blocker", detail: "Failed outputs need a preservation, review, or discard posture.", nextStep: "Document failed output handling." },
  { key: "generatedVsPlaceholderClear", label: "generated-vs-placeholder distinction clear", critical: true, missingStatus: "blocker", detail: "Fake placeholders, supplied evidence, and generated artifacts must not be conflated.", nextStep: "Label generated vs placeholder outputs." },
];

export function buildArtifactOutputAuditItem(input: {
  input: RealCreativeReadinessInput;
  key: ArtifactCheckKey;
  label: string;
  critical: boolean;
  missingStatus: RealCreativeReadinessAuditStatus;
  detail: string;
  nextStep: string;
}): RealCreativeReadinessAuditItem {
  const passed = input.input.evidence[input.key];
  return {
    itemId: buildRealCreativeReadinessStableId("artifact-output-item", [
      input.input.auditId,
      input.key,
    ]),
    label: input.label,
    status: passed ? "ready" : input.missingStatus,
    detail: input.detail,
    evidence: passed ? "Artifact output posture is visible." : "Artifact output posture needs review before any future write.",
    critical: input.critical,
    nextStep: passed ? "Keep artifact capture review-first." : input.nextStep,
  };
}

export function buildArtifactOutputAudit(
  input: RealCreativeReadinessInput = buildRealCreativeReadinessInput()
): ArtifactOutputAudit {
  const items = CHECKS.map((check) => buildArtifactOutputAuditItem({ input, ...check }));
  const status = summarizeRealCreativeAuditStatus(items);
  const audit = {
    auditId: buildRealCreativeReadinessStableId("artifact-output-audit", [
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

  return { ...audit, summary: summarizeArtifactOutputAudit(audit) };
}

export function summarizeArtifactOutputAudit(
  audit: Pick<ArtifactOutputAudit, "items" | "status" | "blockerCount" | "warningCount">
): string[] {
  return [
    `Artifact output status: ${audit.status}.`,
    `${audit.items.length} artifact output checks reviewed; ${audit.blockerCount} blocker/config item(s), ${audit.warningCount} warning(s).`,
    "Artifact output audit checks expected artifact types, capture, metadata, provenance, review route, retention, overwrite, partial output, failed output, and generated-vs-placeholder distinction.",
  ];
}
