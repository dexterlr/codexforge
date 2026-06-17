import type { EvidenceCaptureBoundary, EvidenceCaptureBoundaryBoundary, EvidenceCaptureBoundaryModel } from "./evidence-capture-boundary-types";
import { buildEvidenceCaptureBoundaryStableKey } from "./evidence-capture-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const EVIDENCE_CAPTURE_BOUNDARY_LANGUAGE = [
  "Evidence capture boundary",
  "Evidence capture boundary does not capture or ingest evidence automatically",
  "Evidence capture requires explicit operator approval",
  "Private evidence stays redacted",
  "Evidence groups",
  "Retention checklist",
] as const;

export function buildEvidenceCaptureBoundary(input: Omit<EvidenceCaptureBoundary, "id"> & { idHint: string }): EvidenceCaptureBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildEvidenceCaptureBoundaryStableKey("evidence-capture-boundary", idHint, input.status), ...boundary };
}

export function buildEvidenceCaptureBoundaries(): EvidenceCaptureBoundary[] {
  return [
    buildEvidenceCaptureBoundary({
      idHint: "evidence-capture-boundary",
      status: "blocked",
      identity: "Evidence capture boundary identity: evidence-capture-boundary reviews evidence sources, logs, citations, redaction, privacy, and retention without capturing or ingesting evidence automatically.",
      sections: [
        { label: "Evidence groups", items: ["Evidence groups: command logs, provider outputs, connector data, research sources, screenshots, video artifacts, meeting notes, runtime logs, and operator feedback stay review-only."] },
        { label: "Log/source checklist", items: ["Log/source checklist: source owner, capture method, boundary route, timestamp policy, redaction state, and explicit approval status must be visible before future capture."] },
        { label: "Citation checklist", items: ["Citation checklist: citation source, source freshness, claim mapping, quote limits, connector/web boundary, and result review route must be defined before research evidence is reused."] },
        { label: "Redaction/privacy checklist", items: ["Redaction/privacy checklist: private evidence stays redacted; secrets, credentials, personal data, connector data, local paths, and proprietary outputs are not stored automatically."] },
        { label: "Retention checklist", items: ["Retention checklist: retention owner, expiration, rejection path, deletion review, output handling, and memory/RAG ingestion policy must be reviewed before persistence."] },
        { label: "Denied evidence actions", items: ["Denied evidence actions: capture evidence, ingest evidence, ingest memory/RAG, store outputs, fetch connector data, browse/search web, auto-ingest feedback, or persist audit data from UI."] },
        { label: "Unresolved evidence blockers", items: ["Unresolved evidence blockers: missing source approval, missing redaction, missing citation policy, missing retention rule, missing result review, and missing recovery route keep evidence capture blocked."] },
      ],
      routes: ["/result-review-boundary", "/recovery-retry-boundary", "/universal-execution-boundary-inventory"],
      nextRecommendedAction: "Next recommended action: keep evidence capture blocked, review redaction and retention, then route results and recovery before explicit operator approval.",
      advancedDetails: `Advanced evidence capture boundary details: Evidence capture boundary does not capture or ingest evidence automatically. Evidence capture requires explicit operator approval. Private evidence stays redacted. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildEvidenceCaptureBoundaryBoundary(): EvidenceCaptureBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeEvidenceCaptureBoundary(model: Pick<EvidenceCaptureBoundaryModel, "evidenceCaptureBoundaries">): string {
  return "Evidence capture boundary reviews " + model.evidenceCaptureBoundaries.length + " evidence boundary packet without capturing or ingesting evidence automatically. Evidence capture requires explicit operator approval, and private evidence stays redacted.";
}

export function buildEvidenceCaptureBoundaryModel(): EvidenceCaptureBoundaryModel {
  const evidenceCaptureBoundaries = buildEvidenceCaptureBoundaries();
  const model: EvidenceCaptureBoundaryModel = {
    title: "Evidence capture boundary",
    summary: "",
    reviewPackets: evidenceCaptureBoundaries,
    evidenceCaptureBoundaries,
    boundary: buildEvidenceCaptureBoundaryBoundary(),
    language: [...EVIDENCE_CAPTURE_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Evidence capture boundary identity",
      "Evidence groups",
      "Log/source checklist",
      "Citation checklist",
      "Redaction/privacy checklist",
      "Retention checklist",
      "Denied evidence actions",
      "Unresolved evidence blockers",
      "Result review boundary route",
      "Recovery boundary route",
      "Next recommended action",
      "advanced evidence capture boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeEvidenceCaptureBoundary(model) };
}
