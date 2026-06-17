"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildEvidenceCaptureBoundaryModel } from "@/lib/codexforge/evidence-capture-boundary";

const EVIDENCE_CAPTURE_BOUNDARY_MARKERS = [
  "Evidence capture boundary",
  "Evidence capture boundary does not capture or ingest evidence automatically",
  "Evidence capture requires explicit operator approval",
  "Private evidence stays redacted",
  "Evidence groups",
  "Retention checklist",
] as const;

export function EvidenceCaptureBoundaryPanel() {
  const model = buildEvidenceCaptureBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 625"
      title="Evidence capture boundary"
      subtitle="Evidence capture boundary reviews evidence capture without capturing or ingesting evidence automatically. Evidence capture requires explicit operator approval, and private evidence stays redacted."
      primaryLabel="Review evidence boundary"
      anchor="evidence-capture-boundary"
      plainEnglishTitle="Plain-English evidence capture boundary"
      plainEnglishCopy="This page enables future logs, citations, screenshots, meeting notes, research sources, runtime evidence, and artifact evidence only after approved evidence boundaries exist. It does not capture evidence, ingest memory/RAG, store outputs, fetch connector data, or browse/search from UI."
      language={model.language}
      markers={[...EVIDENCE_CAPTURE_BOUNDARY_MARKERS]}
      links={[
        { href: "/result-review-boundary", label: "Result boundary" },
        { href: "/recovery-retry-boundary", label: "Recovery boundary" },
        { href: "/universal-execution-boundary-inventory", label: "Universal inventory" },
      ]}
      packets={model.evidenceCaptureBoundaries}
      advancedSummary="Advanced evidence capture boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced evidence capture boundary details collapsed/secondary. This route does not capture evidence, ingest evidence, ingest memory/RAG, store outputs, or fetch connector/web/search data."
      dataScope="evidence-capture-boundary buildEvidenceCaptureBoundaryStableKey EvidenceCaptureBoundaryPanel"
    />
  );
}
