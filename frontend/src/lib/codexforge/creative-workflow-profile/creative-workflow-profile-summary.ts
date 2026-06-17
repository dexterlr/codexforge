import type { CreativeWorkflowProfile, CreativeWorkflowProfileBoundary, CreativeWorkflowProfileModel } from "./creative-workflow-profile-types";
import { buildCreativeWorkflowProfileStableKey } from "./creative-workflow-profile-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const CREATIVE_WORKFLOW_PROFILE_LANGUAGE = [
  "Creative workflow profile",
  "Creative workflow profile does not generate images, video, or 3D assets",
  "Creative execution requires explicit operator approval",
  "Unsafe creative workflows stay blocked",
  "Creative groups",
  "Storyboard lanes",
] as const;

export function buildCreativeWorkflowProfile(input: Omit<CreativeWorkflowProfile, "id"> & { idHint: string }): CreativeWorkflowProfile {
  const { idHint, ...profile } = input;
  return { id: buildCreativeWorkflowProfileStableKey("creative-workflow-profile", idHint, input.status), ...profile };
}

export function buildCreativeWorkflowProfiles(): CreativeWorkflowProfile[] {
  return [
    buildCreativeWorkflowProfile({
      idHint: "creative-workflow-profile",
      status: "blocked",
      identity: "Creative workflow profile identity: creative-workflow-profile reviews image, video, 3D, storyboard, provider/model, runtime/tool, evidence, result, recovery, and export readiness without generating assets.",
      sections: [
        { label: "Creative groups", items: ["Creative groups: image generation, video generation, 3D generation, storyboard planning, shot planning, style review, local tool execution, provider/model routing, result review, and packaging."] },
        { label: "Image/video/3D/storyboard lanes", items: ["Storyboard lanes: image, video, 3D, storyboard, shot list, prompt plan, asset safety, and export lane stay review-only until approved boundaries exist."] },
        { label: "Provider/model boundary checklist", items: ["Provider/model boundary checklist: prompt preview, redaction, model/provider choice, budget, output handling, and no prompt sending before explicit approval."] },
        { label: "Local runtime/tool boundary checklist", items: ["Local runtime/tool boundary checklist: local creative tools, render runtimes, file writes, commands, ports, process lifecycle, and stop plans require approved boundaries."] },
        { label: "Evidence/result/recovery/export checklist", items: ["Evidence/result/recovery/export checklist: evidence capture, result review, retry, recovery, packaging, destination, redaction, and license safety stay review-only."] },
        { label: "Denied creative actions", items: ["Denied creative actions: generate images, generate video, generate 3D assets, call providers, call local runtimes, write files, export files, store outputs, or execute tools from UI."] },
        { label: "Unresolved creative blockers", items: ["Unresolved creative blockers: missing provider/model boundary, missing local runtime boundary, missing file boundary, missing result review, missing recovery route, and missing export route keep unsafe creative workflows blocked."] },
      ],
      routes: ["/workflow-profile-registry", "/universal-execution-boundary-inventory", "/provider-model-call-approval-boundary"],
      nextRecommendedAction: "Next recommended action: keep creative generation blocked, review provider/model and runtime requirements, then return to the workflow profile registry for approval planning.",
      advancedDetails: `Advanced creative workflow profile details: Creative workflow profile does not generate images, video, or 3D assets. Creative execution requires explicit operator approval. Unsafe creative workflows stay blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildCreativeWorkflowProfileBoundary(): CreativeWorkflowProfileBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeCreativeWorkflowProfile(model: Pick<CreativeWorkflowProfileModel, "creativeWorkflowProfiles">): string {
  return "Creative workflow profile reviews " + model.creativeWorkflowProfiles.length + " creative profile packet without generating images, video, or 3D assets. Creative execution requires explicit operator approval, and unsafe creative workflows stay blocked.";
}

export function buildCreativeWorkflowProfileModel(): CreativeWorkflowProfileModel {
  const creativeWorkflowProfiles = buildCreativeWorkflowProfiles();
  const model: CreativeWorkflowProfileModel = {
    title: "Creative workflow profile",
    summary: "",
    reviewPackets: creativeWorkflowProfiles,
    creativeWorkflowProfiles,
    boundary: buildCreativeWorkflowProfileBoundary(),
    language: [...CREATIVE_WORKFLOW_PROFILE_LANGUAGE],
    advancedDetails: [
      "Creative workflow profile identity",
      "Creative groups",
      "Image/video/3D/storyboard lanes",
      "Provider/model boundary checklist",
      "Local runtime/tool boundary checklist",
      "Evidence/result/recovery/export checklist",
      "Denied creative actions",
      "Unresolved creative blockers",
      "Workflow profile registry route",
      "Universal execution inventory route",
      "Next recommended action",
      "advanced creative workflow profile details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeCreativeWorkflowProfile(model) };
}
