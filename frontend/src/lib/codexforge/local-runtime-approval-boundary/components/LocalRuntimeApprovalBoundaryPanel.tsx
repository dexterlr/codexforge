"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildLocalRuntimeApprovalBoundaryModel } from "@/lib/codexforge/local-runtime-approval-boundary";

const LOCAL_RUNTIME_APPROVAL_BOUNDARY_MARKERS = [
  "Local runtime approval boundary",
  "Local runtime approval boundary does not start local runtimes",
  "Local runtime execution requires explicit operator approval",
  "Unsafe local runtime paths stay blocked",
  "Runtime groups",
  "Process lifecycle checklist",
] as const;

export function LocalRuntimeApprovalBoundaryPanel() {
  const model = buildLocalRuntimeApprovalBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 621"
      title="Local runtime approval boundary"
      subtitle="Local runtime approval boundary reviews local runtime startup and use without starting anything. Local runtime execution requires explicit operator approval, and unsafe local runtime paths stay blocked."
      primaryLabel="Review runtime boundary"
      anchor="local-runtime-approval-boundary"
      plainEnglishTitle="Plain-English local runtime approval boundary"
      plainEnglishCopy="This page enables future local app servers, game servers, model runtimes, creative tools, and connector bridges only after a real local runtime boundary exists. It does not start servers, processes, local bridges, process monitors, or background jobs from UI."
      language={model.language}
      markers={[...LOCAL_RUNTIME_APPROVAL_BOUNDARY_MARKERS]}
      links={[
        { href: "/command-execution-approval-boundary", label: "Command boundary" },
        { href: "/packaging-export-boundary", label: "Packaging boundary" },
        { href: "/universal-execution-boundary-inventory", label: "Universal inventory" },
      ]}
      packets={model.localRuntimeApprovalBoundaries}
      advancedSummary="Advanced local runtime approval boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced local runtime approval boundary details collapsed/secondary. This route does not start local runtimes, call local bridge endpoints, run commands, create background jobs, or send notifications."
      dataScope="local-runtime-approval-boundary buildLocalRuntimeApprovalBoundaryStableKey LocalRuntimeApprovalBoundaryPanel"
    />
  );
}
