import type {
  LocalRenderQueuePersistenceField,
  LocalRenderQueuePersistenceFieldId,
  LocalRenderQueuePersistenceModel,
  LocalRenderQueuePersistenceReadiness,
} from "./local-render-queue-persistence-types";

const FIELD_COPY: Record<LocalRenderQueuePersistenceFieldId, string> = {
  "queue item identity":
    "A stable local queue reference can identify the approved job without exposing prompts, files, API keys, or full local paths.",
  "source trial":
    "The remembered item keeps a plain source label such as image trial, keyframe trial, video draft trial, or approved submit trial.",
  "local-only target":
    "The target is local-only, typically the reviewed local bridge and Local ComfyUI boundary, not a cloud provider.",
  "approval snapshot summary":
    "Only a short approval snapshot summary is modeled here; raw prompts and files are not stored automatically.",
  "artifact capture handoff":
    "Artifact capture handoff is recorded so completed or failed local output moves to review without deleting files.",
  "status snapshot":
    "A status snapshot can show queued, held, blocked, complete, or failed without polling or mutating the live queue from this UI.",
  "retry eligibility":
    "Retry eligibility is a reviewed label, never an automatic retry and never a silent queue mutation.",
  "recovery route":
    "The recovery route points to reviewed retry guidance before any future queue operation is requested.",
  "retention note":
    "Retention notes explain how long a local record should stay visible without deleting artifacts.",
  "no secret storage":
    "No secrets are persisted, including passwords, API keys, tokens, or raw process environment values.",
  "no automatic queue mutation":
    "No automatic queue mutation means the remembered model cannot enqueue, cancel, delete, hold, retry, or reorder jobs by itself.",
};

export function buildLocalRenderQueuePersistenceField(
  id: LocalRenderQueuePersistenceFieldId
): LocalRenderQueuePersistenceField {
  return {
    id,
    label: id,
    plainEnglish: FIELD_COPY[id],
    persistedAutomatically: false,
  };
}

export function buildLocalRenderQueuePersistenceFields(): LocalRenderQueuePersistenceField[] {
  return (Object.keys(FIELD_COPY) as LocalRenderQueuePersistenceFieldId[]).map(
    buildLocalRenderQueuePersistenceField
  );
}

export function buildLocalRenderQueuePersistenceReadiness(): LocalRenderQueuePersistenceReadiness {
  return {
    id: "approved-local-boundary",
    label: "Persistence remains behind approved local boundary",
    status: "contract-ready",
    plainEnglish:
      "Persistence remains behind approved local boundary: this UI defines the typed contract and readiness surface, but it does not write queue state or store prompts/files automatically.",
    approvalGated: true,
    livePersistenceEnabled: false,
  };
}

export function buildLocalRenderQueuePersistenceModel(): LocalRenderQueuePersistenceModel {
  const fields = buildLocalRenderQueuePersistenceFields();
  const model: LocalRenderQueuePersistenceModel = {
    title: "Local render queue persistence",
    summary: "",
    fields,
    readiness: buildLocalRenderQueuePersistenceReadiness(),
    boundary: {
      localOnly: true,
      secretStorageAllowed: false,
      promptStorageAutomatic: false,
      fileStorageAutomatic: false,
      automaticQueueMutationAllowed: false,
      artifactDeletionAllowed: false,
    },
    handoffs: [
      "Artifact capture handoff",
      "/render-job-status",
      "/render-job-control-boundary",
      "/render-queue-recovery",
      "/video-review",
    ],
    retentionNote:
      "Retention note: the queue record is a local review aid. It does not delete artifacts, does not persist secrets, and does not store prompts or files automatically.",
  };

  return { ...model, summary: summarizeLocalRenderQueuePersistence(model) };
}

export function summarizeLocalRenderQueuePersistence(
  model: LocalRenderQueuePersistenceModel
): string {
  return `${model.title}: Queue items are remembered safely as a typed local-only contract. No secrets are persisted. No automatic queue mutation. ${model.readiness.label}.`;
}
