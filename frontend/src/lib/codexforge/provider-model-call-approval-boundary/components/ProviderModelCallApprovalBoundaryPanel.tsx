"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildProviderModelCallApprovalBoundaryModel } from "@/lib/codexforge/provider-model-call-approval-boundary";

const PROVIDER_MODEL_CALL_APPROVAL_BOUNDARY_MARKERS = [
  "Provider model call approval boundary",
  "Provider/model call approval boundary does not call providers or models",
  "Provider/model calls require explicit operator approval",
  "Unsafe provider/model calls stay blocked",
  "Provider model groups",
  "Prompt preview checklist",
] as const;

export function ProviderModelCallApprovalBoundaryPanel() {
  const model = buildProviderModelCallApprovalBoundaryModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 622"
      title="Provider model call approval boundary"
      subtitle="Provider/model call approval boundary reviews provider and model calls without sending prompts. Provider/model calls require explicit operator approval, and unsafe provider/model calls stay blocked."
      primaryLabel="Review provider/model boundary"
      anchor="provider-model-call-approval-boundary"
      plainEnglishTitle="Plain-English provider/model call approval boundary"
      plainEnglishCopy="This page enables future coding, research, creative, chatbot, meeting, monitoring, and routing workflows only after a real provider/model boundary exists. It does not send prompts, call providers, call local models, store outputs, or persist credentials from UI."
      language={model.language}
      markers={[...PROVIDER_MODEL_CALL_APPROVAL_BOUNDARY_MARKERS]}
      links={[
        { href: "/evidence-capture-boundary", label: "Evidence boundary" },
        { href: "/result-review-boundary", label: "Result boundary" },
        { href: "/universal-execution-boundary-inventory", label: "Universal inventory" },
      ]}
      packets={model.providerModelCallApprovalBoundaries}
      advancedSummary="Advanced provider/model call approval boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced provider/model call approval boundary details collapsed/secondary. This route does not call providers or models, send prompts, store provider outputs, or route live traffic."
      dataScope="provider-model-call-approval-boundary buildProviderModelCallApprovalBoundaryStableKey ProviderModelCallApprovalBoundaryPanel"
    />
  );
}
