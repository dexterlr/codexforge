"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildResultReviewBoundaryModel } from "@/lib/codexforge/result-review-boundary";

const RESULT_REVIEW_BOUNDARY_MARKERS = [
  "Result review boundary",
  "Result review boundary does not store or reuse outputs automatically",
  "Result reuse persistence requires explicit operator approval",
  "Unsafe results stay blocked",
  "Result groups",
  "Persistence checklist",
] as const;

export function ResultReviewBoundaryPanel() {
  const model = buildResultReviewBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 626"
      title="Result review boundary"
      subtitle="Result review boundary reviews outputs before reuse or persistence. It does not store or reuse outputs automatically, result reuse persistence requires explicit operator approval, and unsafe results stay blocked."
      primaryLabel="Review result boundary"
      anchor="result-review-boundary"
      plainEnglishTitle="Plain-English result review boundary"
      plainEnglishCopy="This page enables future use of command results, provider/model outputs, connector findings, creative drafts, research summaries, chatbot drafts, meeting notes, and automation findings only after approved result review. It does not store outputs, persist memory, reuse outputs automatically, or export files from UI."
      language={model.language}
      markers={[...RESULT_REVIEW_BOUNDARY_MARKERS]}
      links={[
        { href: "/recovery-retry-boundary", label: "Recovery boundary" },
        { href: "/packaging-export-boundary", label: "Packaging boundary" },
        { href: "/workflow-profile-registry", label: "Workflow profiles" },
      ]}
      packets={model.resultReviewBoundaries}
      advancedSummary="Advanced result review boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced result review boundary details collapsed/secondary. This route does not store outputs, persist memory, reuse outputs automatically, promote memory, or export files."
      dataScope="result-review-boundary buildResultReviewBoundaryStableKey ResultReviewBoundaryPanel"
    />
  );
}
