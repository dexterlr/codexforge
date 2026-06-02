export type RenderJobControlBoundaryActionId =
  | "job identity"
  | "current status"
  | "hold eligibility"
  | "cancel eligibility"
  | "required confirmation copy"
  | "expected effect"
  | "artifact retention rule"
  | "recovery path"
  | "audit/handoff summary";

export type RenderJobControlBoundaryAction = {
  id: RenderJobControlBoundaryActionId;
  label: string;
  plainEnglish: string;
  approvalRequired: true;
  deletesArtifacts: false;
};

export type RenderJobControlBoundaryModel = {
  title: "Render job cancel and hold boundary";
  summary: string;
  actions: RenderJobControlBoundaryAction[];
  holdMeaning: "Hold prevents the next step";
  cancelMeaning: "Cancel requests stop through approved boundary";
  artifactRule: "Neither action deletes artifacts";
  requiredConfirmationCopy: string;
  localOnly: true;
  directBackendCancelAllowed: false;
  silentQueueMutationAllowed: false;
};

export function buildRenderJobControlBoundaryStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
