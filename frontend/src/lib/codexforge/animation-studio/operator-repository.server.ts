import "server-only";
import { openStudioRepository, StudioStoreError, type BlenderRecoveryAuthorization } from "./store.server";
import { assertStudioId } from "./workspace";

/** Server-only, exact preimage authority; never inferred from a client request or startup. */
export function readStudioBlenderRecoveryAuthorization(projectId: string, jobId: string, environment: NodeJS.ProcessEnv = process.env): BlenderRecoveryAuthorization | undefined {
  const raw = environment.CODEXFORGE_STUDIO_BLENDER_RECORD_RECOVERY;
  if (raw === undefined) return undefined;
  const denied = (): never => { throw new StudioStoreError("BLENDER_RECOVERY_UNAUTHORIZED", "The isolated record-recovery authorization is missing, malformed or outside this workspace."); };
  if (raw.length > 1024) return denied();
  let value: Record<string, unknown>;
  try { value = JSON.parse(raw); } catch { return denied(); }
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join() !== "expectedSnapshotSha256,jobId,namespace,projectId" || typeof value.namespace !== "string" || !/^[a-z0-9][a-z0-9-]{7,63}$/u.test(value.namespace) || value.namespace !== environment.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE || (environment.CODEXFORGE_STUDIO_MEDIA_STORAGE ?? "workspace") !== "workspace" || typeof value.expectedSnapshotSha256 !== "string" || !/^[a-f0-9]{64}$/u.test(value.expectedSnapshotSha256)) return denied();
  try { assertStudioId(value.projectId, "project"); assertStudioId(value.jobId, "job"); } catch { return denied(); }
  if (value.projectId !== projectId || value.jobId !== jobId) return undefined;
  return { projectId: value.projectId, jobId: value.jobId, expectedSnapshotSha256: value.expectedSnapshotSha256 } as BlenderRecoveryAuthorization;
}

/** Called only after the existing operator request boundary has accepted the request. */
export function openStudioOperatorRepository(blenderRecovery?: BlenderRecoveryAuthorization) {
  const namespace = process.env.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE;
  const configured = process.env.CODEXFORGE_STUDIO_MEDIA_STORAGE;
  if (configured !== undefined && configured !== "workspace" && configured !== "d-drive") {
    throw new StudioStoreError("INVALID_MEDIA_STORAGE", "Use workspace or d-drive for the server media destination.");
  }
  const mediaStorage = configured ?? "workspace";
  if (blenderRecovery && (namespace === undefined || mediaStorage !== "workspace")) throw new StudioStoreError("BLENDER_RECOVERY_UNAUTHORIZED", "Record recovery requires an explicitly authorized isolated workspace.");
  // Missing namespace selects development; empty/malformed namespace still fails closed.
  return namespace === undefined ? openStudioRepository({ workspace: "development", mediaStorage }) : openStudioRepository({ workspace: "test", namespace, mediaStorage, ...(blenderRecovery ? { blenderRecovery } : {}) });
}
