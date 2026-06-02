export type LocalRenderQueuePersistenceFieldId =
  | "queue item identity"
  | "source trial"
  | "local-only target"
  | "approval snapshot summary"
  | "artifact capture handoff"
  | "status snapshot"
  | "retry eligibility"
  | "recovery route"
  | "retention note"
  | "no secret storage"
  | "no automatic queue mutation";

export type LocalRenderQueuePersistenceField = {
  id: LocalRenderQueuePersistenceFieldId;
  label: string;
  plainEnglish: string;
  persistedAutomatically: false;
};

export type LocalRenderQueuePersistenceReadiness = {
  id: "approved-local-boundary";
  label: string;
  status: "contract-ready";
  plainEnglish: string;
  approvalGated: true;
  livePersistenceEnabled: false;
};

export type LocalRenderQueuePersistenceBoundary = {
  localOnly: true;
  secretStorageAllowed: false;
  promptStorageAutomatic: false;
  fileStorageAutomatic: false;
  automaticQueueMutationAllowed: false;
  artifactDeletionAllowed: false;
};

export type LocalRenderQueuePersistenceModel = {
  title: "Local render queue persistence";
  summary: string;
  fields: LocalRenderQueuePersistenceField[];
  readiness: LocalRenderQueuePersistenceReadiness;
  boundary: LocalRenderQueuePersistenceBoundary;
  handoffs: string[];
  retentionNote: string;
};

export function buildLocalRenderQueuePersistenceStableKey(
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
