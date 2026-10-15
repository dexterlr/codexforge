import "server-only";
import type { Asset, Job, JsonObject } from "./domain";
import { hashJarvisChatCanonicalJson as digest } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import { validateAssetRef } from "./validation";
import { assertStudioId } from "./workspace";
import { BLENDER_RENDER_ADAPTER, blenderFail, blenderObject, blenderExact, blenderHash, isBlenderSourceAsset, validateBlenderRenderSettings, validateBlenderProgress, type BlenderExecution } from "./blender-source-contract";

/** Server-only canonical identities: none of these digest checks are optional at persistence boundaries. */
export function validateBlenderSourceAsset(asset: Asset): void {
  const p = asset.provenance, m = p.adapterMetadata;
  if (!isBlenderSourceAsset(asset) || !m || m.provider !== null || m.model !== null || m.providerJobId !== null || m.externalGenerationId !== null || p.jobId !== null || p.promptId !== null || p.negativePrompt !== null || p.referenceAssets.length || p.cost.minorUnits !== 0 || asset.dependencies.length || digest(p.parentAssets) !== digest(asset.lineage) || asset.approvalState !== "DRAFT" || p.approvalState !== "DRAFT" || asset.supersededBy !== null) return blenderFail("BLENDER_SOURCE_BINDING");
  const settings = blenderObject(m.settings); blenderExact(settings, "format,catalogueId,shotId,descriptorHash,blendSha256,dependenciesDigest");
  if (!["studio-blender-source-v1", "studio-blender-source-revision-v1"].includes(String(settings.format)) || typeof settings.catalogueId !== "string" || !/^[a-z0-9][a-z0-9_-]{0,95}$/u.test(settings.catalogueId) || settings.descriptorHash !== asset.contentHash || settings.dependenciesDigest !== digest([])) blenderFail("BLENDER_SOURCE_BINDING");
  assertStudioId(settings.shotId, "shot"); blenderHash(settings.blendSha256);
  if (asset.assetId !== "asset_blender_" + digest({ projectId: asset.projectId, shotId: settings.shotId, catalogueId: settings.catalogueId }).slice(0, 24)) blenderFail("BLENDER_SOURCE_BINDING");
  if (digest(asset.lineage) !== digest(asset.version === 1 ? [] : [{ assetId: asset.assetId, version: asset.version - 1 }])) blenderFail("BLENDER_SOURCE_BINDING");
}
export function readBlenderJob(job: Job): BlenderExecution {
  const checkpoint = blenderObject(job.checkpoint); blenderExact(checkpoint, "blenderExecution"); const value = blenderObject(checkpoint.blenderExecution);
  blenderExact(value, "format,spec,specDigest,preparedRevision,phase,progress" + (Object.hasOwn(value, "latestProgress") ? ",latestProgress" : "")); const spec = blenderObject(value.spec);
  blenderExact(spec, "format,projectId,shotId,source,descriptorHash,blendSha256,dependenciesDigest,settings");
  if (spec.format !== "studio-blender-render-spec-v1" || spec.projectId !== job.projectId || spec.shotId !== job.shotId || job.type !== "RENDER" || job.maxAttempts !== 1 || job.externalActions.join() !== "BLENDER_RENDER" || job.requiredGates.length || job.costEstimate.minorUnits || job.actualCost.minorUnits) blenderFail();
  validateAssetRef(spec.source); if (digest(job.inputs) !== digest([spec.source])) blenderFail();
  blenderHash(spec.descriptorHash); blenderHash(spec.blendSha256); blenderHash(spec.dependenciesDigest); validateBlenderRenderSettings(spec.settings);
  if (value.format !== "studio-blender-execution-v1" || blenderHash(value.specDigest) !== digest(spec) || job.approvalSubjectHash !== value.specDigest || !["PREPARED", "RUNNING", "COMPLETED", "FAILED", "CANCELLED", "INTERRUPTED"].includes(String(value.phase))) blenderFail();
  if (!Number.isSafeInteger(value.preparedRevision) || Number(value.preparedRevision) < 1 || Number(value.preparedRevision) > 1_000_000) blenderFail();
  const states = { PREPARED: "QUEUED", RUNNING: "RUNNING", COMPLETED: "SUCCEEDED", FAILED: "FAILED", CANCELLED: "CANCELLED", INTERRUPTED: "FAILED" };
  if (job.dependencies.length || job.state !== states[value.phase as keyof typeof states] || (value.phase === "PREPARED" ? job.dispatch !== null || job.attempt !== 0 || value.progress !== null || job.outputs.length !== 0 || job.adapterMetadata !== null : job.attempt !== 1 || job.dispatch === null || value.progress === null)) blenderFail();
  if (value.phase === "RUNNING" && (job.outputs.length || job.adapterMetadata !== null || job.dispatch?.state !== "INTENT_RECORDED")) blenderFail();
  if (["FAILED", "CANCELLED", "INTERRUPTED"].includes(String(value.phase)) && (job.outputs.length || job.adapterMetadata !== null || job.dispatch?.state !== "ACKNOWLEDGED")) blenderFail();
  if (value.phase === "COMPLETED" && (job.outputs.length !== 1 || job.adapterMetadata?.adapterId !== BLENDER_RENDER_ADAPTER || job.dispatch?.state !== "COMPLETED")) blenderFail();
  if (value.progress !== null) validateBlenderProgress(value.progress, Number((spec.settings as JsonObject).frameEnd) - Number((spec.settings as JsonObject).frameStart) + 1);
  if (Object.hasOwn(value, "latestProgress")) {
    const latest = blenderObject(value.latestProgress); blenderExact(latest, "at,keyHash,requestDigest,diagnosticRef"); blenderHash(latest.keyHash); blenderHash(latest.requestDigest);
    if (latest.diagnosticRef !== job.jobId || typeof latest.at !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(latest.at) || !Number.isFinite(Date.parse(latest.at)) || new Date(latest.at).toISOString() !== latest.at || job.startedAt === null || Date.parse(latest.at) < Date.parse(job.startedAt) || (job.finishedAt !== null && Date.parse(latest.at) > Date.parse(job.finishedAt))) blenderFail("BLENDER_PROGRESS_BINDING");
  }
  return value as unknown as BlenderExecution;
}
