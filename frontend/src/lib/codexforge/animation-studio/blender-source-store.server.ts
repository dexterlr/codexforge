import "server-only";
import { randomBytes } from "node:crypto";
import type { CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { hashJarvisChatCanonicalJson as digest, serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { StudioSnapshot } from "./store.server";
import { BLENDER_RENDER_ADAPTER, blenderFail, isBlenderJob, isBlenderSourceAsset, validateBlenderSourceDescriptor } from "./blender-source-contract";
import { readBlenderJob, validateBlenderSourceAsset } from "./blender-source-identity.server";
import { validateBlenderDerivedMediaAsset } from "./footage-contract";
import type { Job } from "./domain";
import { resolveStudioPath } from "./workspace";
import { isBlenderEditJob } from "./blender-edit-contract";
import { readBlenderEditJob } from "./blender-edit-identity.server";
import { blenderHistoryForComparison } from "./blender-record-journal.server";

const LIMIT = 1_048_576;
const baselinePath = (snapshot: StudioSnapshot, hash: string) => [...resolveStudioPath(snapshot.project.projectId, "manifests").split("/"), "blender-source-baselines", hash + ".json"];
function validateDigest(snapshot: StudioSnapshot): void { const { recordDigest, ...body } = snapshot; if (digest(body) !== recordDigest) blenderFail("BLENDER_BASELINE_INVALID"); }
const same = (left: unknown, right: unknown) => canonical(left) === canonical(right);
function stableProject(snapshot: StudioSnapshot) { const { revision, ...project } = snapshot.project; void revision; return project; }
function fixedJob(job: Job) {
  const { state, attempt, startedAt, finishedAt, adapterMetadata, outputs, error, checkpoint, dispatch, ...fixed } = job;
  void state; void attempt; void startedAt; void finishedAt; void adapterMetadata; void outputs; void error; void checkpoint; void dispatch;
  if (isBlenderEditJob(job)) { const execution = readBlenderEditJob(job); return { ...fixed, proposal: execution.proposal, proposalDigest: execution.proposalDigest, preparedRevision: execution.preparedRevision }; }
  const execution = readBlenderJob(job); return { ...fixed, spec: execution.spec, specDigest: execution.specDigest, preparedRevision: execution.preparedRevision };
}
/** This admits only explicit Blender metadata extensions, never rebases editorial instructions. */
export function assertBlenderOnlySnapshotExtension(root: CreatorNativeRoot, snapshot: StudioSnapshot, originalDigest: string): void {
  if (!/^[a-f0-9]{64}$/u.test(originalDigest)) blenderFail("BLENDER_BASELINE_INVALID");
  if (snapshot.recordDigest === originalDigest) return;
  let original: StudioSnapshot;
  try { const bytes = root.readFile(baselinePath(snapshot, originalDigest), LIMIT); original = JSON.parse(bytes.toString("utf8")) as StudioSnapshot; if (canonical(original) !== bytes.toString("utf8")) blenderFail(); validateDigest(original); }
  catch { return blenderFail("BLENDER_BASELINE_UNAVAILABLE"); }
  validateDigest(snapshot);
  if (snapshot.schemaVersion !== original.schemaVersion || original.recordDigest !== originalDigest || !same(stableProject(original), stableProject(snapshot)) || snapshot.project.revision < original.project.revision) blenderFail("BLENDER_BASELINE_CHANGED");
  for (const field of ["sequences", "shots", "definitions", "approvals", "costs"] as const) if (!same(original[field], snapshot[field])) blenderFail("BLENDER_BASELINE_CHANGED");
  const originalHistory = blenderHistoryForComparison(root, original), currentHistory = blenderHistoryForComparison(root, snapshot);
  if (!same(original.assets, snapshot.assets.slice(0, original.assets.length)) || !same(originalHistory.events, currentHistory.events.slice(0, original.events.length)) || !same(originalHistory.receipts, currentHistory.receipts.slice(0, original.receipts.length)) || !same(original.qcResults, snapshot.qcResults.slice(0, original.qcResults.length))) blenderFail("BLENDER_BASELINE_CHANGED");
  for (const asset of snapshot.assets.slice(original.assets.length)) {
    if (isBlenderSourceAsset(asset)) {
      validateBlenderSourceAsset(asset);
      const descriptor = validateBlenderSourceDescriptor(JSON.parse(root.readFile(asset.sourcePath.split("/"), LIMIT).toString("utf8")));
      if (digest(descriptor) !== asset.contentHash || descriptor.source.sha256 !== asset.provenance.adapterMetadata!.settings.blendSha256) blenderFail("BLENDER_BASELINE_CHANGED");
    } else if (asset.provenance.adapterMetadata?.adapterId === BLENDER_RENDER_ADAPTER) {
      validateBlenderDerivedMediaAsset(asset);
      const job = snapshot.jobs.find(candidate => candidate.jobId === asset.provenance.jobId);
      if (!job || job.state !== "SUCCEEDED" || !same(job.outputs, [{ assetId: asset.assetId, version: asset.version }]) || readBlenderJob(job).specDigest !== asset.provenance.adapterMetadata.settings.specDigest) blenderFail("BLENDER_BASELINE_CHANGED");
    } else blenderFail("BLENDER_BASELINE_CHANGED");
  }
  if (!same(original.jobs.map(job => job.jobId), snapshot.jobs.slice(0, original.jobs.length).map(job => job.jobId))) blenderFail("BLENDER_BASELINE_CHANGED");
  for (const before of original.jobs) {
    const after = snapshot.jobs.find(job => job.jobId === before.jobId); if (!after) blenderFail("BLENDER_BASELINE_CHANGED");
    if (!isBlenderJob(before) && !isBlenderEditJob(before)) { if (!same(before, after)) blenderFail("BLENDER_BASELINE_CHANGED"); }
    else {
      if ((!isBlenderJob(after!) && !isBlenderEditJob(after!)) || !same(fixedJob(before), fixedJob(after!))) blenderFail("BLENDER_BASELINE_CHANGED");
      if (["SUCCEEDED", "FAILED", "CANCELLED"].includes(before.state) && !same(before, after)) blenderFail("BLENDER_BASELINE_CHANGED");
      if (before.attempt > after!.attempt || (before.startedAt !== null && before.startedAt !== after!.startedAt) || (before.dispatch !== null && (before.dispatch.token !== after!.dispatch?.token || before.dispatch.recordedAt !== after!.dispatch?.recordedAt))) blenderFail("BLENDER_BASELINE_CHANGED");
    }
  }
  for (const job of snapshot.jobs.filter(job => !original.jobs.some(old => old.jobId === job.jobId))) { if (isBlenderEditJob(job)) readBlenderEditJob(job); else { if (!isBlenderJob(job)) blenderFail("BLENDER_BASELINE_CHANGED"); readBlenderJob(job); } }
  for (const qc of snapshot.qcResults.slice(original.qcResults.length)) if (qc.rule !== "BLENDER_DERIVED_VIDEO_TECHNICAL_ADMISSION" || !snapshot.assets.some(asset => asset.assetId === qc.subject.assetId && asset.version === qc.subject.version && asset.provenance.adapterMetadata?.adapterId === BLENDER_RENDER_ADAPTER)) blenderFail("BLENDER_BASELINE_CHANGED");
  const allowed = ["REGISTER_BLENDER_SOURCE", "PREPARE_BLENDER_RENDER", "ACQUIRE_BLENDER_RENDER", "CHECKPOINT_BLENDER_RENDER", "PUBLISH_BLENDER_RENDER", "TERMINATE_BLENDER_RENDER", "PREPARE_BLENDER_EDIT", "ACQUIRE_BLENDER_EDIT", "CHECKPOINT_BLENDER_EDIT", "PUBLISH_BLENDER_EDIT", "TERMINATE_BLENDER_EDIT"];
  for (const event of snapshot.events.slice(original.events.length)) if (event.details.blenderOperation !== true || !event.details.request || typeof event.details.request !== "object" || Array.isArray(event.details.request) || !allowed.includes(String(event.details.request.type))) blenderFail("BLENDER_BASELINE_CHANGED");
}
/** Capture only the exact live anchor, before any permitted project mutation. */
export function retainBlenderEditorialBaseline(root: CreatorNativeRoot, snapshot: StudioSnapshot): void {
  const headPath = [...resolveStudioPath(snapshot.project.projectId, "manifests").split("/"), "editorial-v2", "head.json"];
  let head: { projectId: string; anchor: { projectRecordDigest: string } };
  try { head = JSON.parse(root.readFile(headPath, 4096).toString("utf8")) as typeof head; }
  catch (error) {
    if ((error as { code?: string }).code === "not_found") {
      try { root.stat(headPath.slice(0, -1)); }
      catch (presenceError) { if ((presenceError as { code?: string }).code === "not_found") return; }
    }
    return blenderFail("BLENDER_EDITORIAL_UNAVAILABLE");
  }
  if (head.projectId !== snapshot.project.projectId || !head.anchor || !/^[a-f0-9]{64}$/u.test(head.anchor.projectRecordDigest)) blenderFail("BLENDER_EDITORIAL_UNAVAILABLE");
  if (head.anchor.projectRecordDigest !== snapshot.recordDigest) return assertBlenderOnlySnapshotExtension(root, snapshot, head.anchor.projectRecordDigest);
  validateDigest(snapshot); const bytes = Buffer.from(canonical(snapshot)), destination = baselinePath(snapshot, snapshot.recordDigest);
  try { root.writeAtomicExclusive(destination, "blender-baseline-" + randomBytes(12).toString("hex") + ".tmp", bytes, resolveStudioPath(snapshot.project.projectId, "manifests", "project.json").split("/"), bytes); }
  catch (error) { if ((error as { code?: string }).code !== "already_exists" || !root.readFile(destination, LIMIT).equals(bytes)) throw error; }
}
