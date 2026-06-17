"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildResearchWorkflowProfileModel } from "@/lib/codexforge/research-workflow-profile";

const RESEARCH_WORKFLOW_PROFILE_MARKERS = [
  "Research workflow profile",
  "Research workflow profile does not browse, search, or fetch sources",
  "Research execution requires explicit operator approval",
  "Unsafe research workflows stay blocked",
  "Research groups",
  "Live research lane",
] as const;

export function ResearchWorkflowProfilePanel() {
  const model = buildResearchWorkflowProfileModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 631"
      title="Research workflow profile"
      subtitle="Research workflow profile reviews research and live research readiness without browsing, searching, or fetching sources. Research execution requires explicit operator approval, and unsafe research workflows stay blocked."
      primaryLabel="Review research profile"
      anchor="research-workflow-profile"
      plainEnglishTitle="Plain-English research workflow profile"
      plainEnglishCopy="This page prepares future static research, live research, source collection, citation review, freshness checks, monitoring, evidence, result, recovery, and report export workflows. It does not browse, search, fetch, call connectors, ingest sources, create schedules, or store outputs from UI."
      language={model.language}
      markers={[...RESEARCH_WORKFLOW_PROFILE_MARKERS]}
      links={[
        { href: "/workflow-profile-registry", label: "Workflow registry" },
        { href: "/evidence-capture-boundary", label: "Evidence boundary" },
        { href: "/connector-access-approval-boundary", label: "Connector boundary" },
      ]}
      packets={model.researchWorkflowProfiles}
      advancedSummary="Advanced research workflow profile details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced research workflow profile details collapsed/secondary. This route does not browse, search, fetch sources, call connectors, ingest sources, schedule checks, or export reports."
      dataScope="research-workflow-profile buildResearchWorkflowProfileStableKey ResearchWorkflowProfilePanel"
    />
  );
}
