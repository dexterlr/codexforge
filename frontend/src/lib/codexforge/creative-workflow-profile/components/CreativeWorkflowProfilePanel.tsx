"use client";

import { UniversalExecutionReviewSurface } from "@/lib/codexforge/universal-execution-review-kit";
import { buildCreativeWorkflowProfileModel } from "@/lib/codexforge/creative-workflow-profile";

const CREATIVE_WORKFLOW_PROFILE_MARKERS = [
  "Creative workflow profile",
  "Creative workflow profile does not generate images, video, or 3D assets",
  "Creative execution requires explicit operator approval",
  "Unsafe creative workflows stay blocked",
  "Creative groups",
  "Storyboard lanes",
] as const;

export function CreativeWorkflowProfilePanel() {
  const model = buildCreativeWorkflowProfileModel();

  return (
    <UniversalExecutionReviewSurface
      phase="Phase 630"
      title="Creative workflow profile"
      subtitle="Creative workflow profile reviews video, image, 3D, and storyboard readiness without generation. Creative execution requires explicit operator approval, and unsafe creative workflows stay blocked."
      primaryLabel="Review creative profile"
      anchor="creative-workflow-profile"
      plainEnglishTitle="Plain-English creative workflow profile"
      plainEnglishCopy="This page prepares future cinematic video, image, 3D, storyboard, prompt, render, evidence, result, recovery, and packaging workflows. It does not generate assets, call providers, start local tools, write files, export files, or store outputs from UI."
      language={model.language}
      markers={[...CREATIVE_WORKFLOW_PROFILE_MARKERS]}
      links={[
        { href: "/workflow-profile-registry", label: "Workflow registry" },
        { href: "/universal-execution-boundary-inventory", label: "Universal inventory" },
        { href: "/provider-model-call-approval-boundary", label: "Provider/model boundary" },
      ]}
      packets={model.creativeWorkflowProfiles}
      advancedSummary="Advanced creative workflow profile details"
      advancedDetails={model.advancedDetails}
      advancedCopy="advanced creative workflow profile details collapsed/secondary. This route does not generate images, video, 3D assets, prompts to providers, local runtime jobs, files, packages, or exports."
      dataScope="creative-workflow-profile buildCreativeWorkflowProfileStableKey CreativeWorkflowProfilePanel"
    />
  );
}
