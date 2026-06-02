import type {
  RenderJobControlBoundaryAction,
  RenderJobControlBoundaryActionId,
  RenderJobControlBoundaryModel,
} from "./render-job-control-boundary-types";

const ACTION_COPY: Record<RenderJobControlBoundaryActionId, string> = {
  "job identity":
    "The reviewed local job identity must be visible before any hold or cancel request can be prepared.",
  "current status":
    "The current status explains whether the job is queued, running, held, stopped, complete, failed, or unknown.",
  "hold eligibility":
    "Hold eligibility means the next step can be paused or prevented through an approved boundary.",
  "cancel eligibility":
    "Cancel eligibility means a stop request may be prepared only for the approved local boundary.",
  "required confirmation copy":
    "Required confirmation copy must be explicit so the operator understands exactly what is being requested.",
  "expected effect":
    "Expected effect is shown in plain English before any future approved boundary receives the request.",
  "artifact retention rule":
    "Artifact retention rule is fixed: hold and cancel do not delete artifacts.",
  "recovery path":
    "Recovery path sends stopped, held, failed, or unclear jobs to reviewed recovery before retry.",
  "audit/handoff summary":
    "Audit/handoff summary records what was requested without silently mutating a queue from this UI.",
};

export function buildRenderJobControlBoundaryAction(
  id: RenderJobControlBoundaryActionId
): RenderJobControlBoundaryAction {
  return {
    id,
    label: id,
    plainEnglish: ACTION_COPY[id],
    approvalRequired: true,
    deletesArtifacts: false,
  };
}

export function buildRenderJobControlBoundaryActions(): RenderJobControlBoundaryAction[] {
  return (Object.keys(ACTION_COPY) as RenderJobControlBoundaryActionId[]).map(
    buildRenderJobControlBoundaryAction
  );
}

export function buildRenderJobControlBoundaryModel(): RenderJobControlBoundaryModel {
  const model: RenderJobControlBoundaryModel = {
    title: "Render job cancel and hold boundary",
    summary: "",
    actions: buildRenderJobControlBoundaryActions(),
    holdMeaning: "Hold prevents the next step",
    cancelMeaning: "Cancel requests stop through approved boundary",
    artifactRule: "Neither action deletes artifacts",
    requiredConfirmationCopy:
      "Required confirmation copy: I understand hold prevents the next step, cancel requests stop through approved boundary, neither action deletes artifacts, and no silent queue mutation is allowed.",
    localOnly: true,
    directBackendCancelAllowed: false,
    silentQueueMutationAllowed: false,
  };

  return { ...model, summary: summarizeRenderJobControlBoundary(model) };
}

export function summarizeRenderJobControlBoundary(
  model: RenderJobControlBoundaryModel
): string {
  return `${model.title}: ${model.holdMeaning}. ${model.cancelMeaning}. ${model.artifactRule}. Required confirmation copy is visible before any approved local boundary handoff.`;
}
