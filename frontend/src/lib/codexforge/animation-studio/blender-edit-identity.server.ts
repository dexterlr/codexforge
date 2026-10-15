import "server-only";
import { hashJarvisChatCanonicalJson as digest } from "../jarvis-chat/jarvis-chat-crypto";
import type { Job } from "./domain";
import { blenderExact, blenderFail, blenderHash, blenderObject } from "./blender-source-contract";
import { validateBlenderEditProposal, validateBlenderMaterialVerification, type BlenderEditExecution } from "./blender-edit-contract";

export function readBlenderEditJob(job: Job): BlenderEditExecution {
  const checkpoint = blenderObject(job.checkpoint); blenderExact(checkpoint, "blenderEdit"); const v = blenderObject(checkpoint.blenderEdit); blenderExact(v, "format,proposal,proposalDigest,preparedRevision,phase,process,verification,source");
  const proposal = validateBlenderEditProposal(v.proposal); const states = { PREPARED: "QUEUED", RUNNING: "RUNNING", COMPLETED: "SUCCEEDED", FAILED: "FAILED", INTERRUPTED: "FAILED" };
  if (v.format !== "studio-blender-material-execution-v1" || job.type !== "EDIT" || job.maxAttempts !== 1 || job.externalActions.length || job.dependencies.length || job.requiredGates.length || job.costEstimate.minorUnits || job.actualCost.minorUnits || job.projectId !== proposal.projectId || job.shotId !== proposal.shotId || digest(job.inputs) !== digest([proposal.source]) || blenderHash(v.proposalDigest) !== digest(proposal) || job.approvalSubjectHash !== v.proposalDigest || !Number.isSafeInteger(v.preparedRevision) || Number(v.preparedRevision) < 1 || !Object.hasOwn(states, String(v.phase)) || job.state !== states[v.phase as keyof typeof states]) blenderFail("BLENDER_EDIT_BINDING");
  if (v.phase === "PREPARED" ? job.attempt !== 0 || job.dispatch !== null || v.process !== null : job.attempt !== 1 || job.dispatch === null) blenderFail("BLENDER_EDIT_BINDING");
  if (v.process !== null) {
    const process = blenderObject(v.process); blenderExact(process, "pid,identity,executableSha256,startedAt");
    if (!Number.isSafeInteger(process.pid) || Number(process.pid) < 1 || Number(process.pid) > 2_147_483_647 || typeof process.identity !== "string" || !process.identity || process.identity.length > 256 || process.executableSha256 !== proposal.blender.sha256 || typeof process.startedAt !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(process.startedAt) || !Number.isFinite(Date.parse(process.startedAt)) || new Date(process.startedAt).toISOString() !== process.startedAt || job.startedAt === null || Date.parse(process.startedAt) < Date.parse(job.startedAt) || (job.finishedAt !== null && Date.parse(process.startedAt) > Date.parse(job.finishedAt))) blenderFail("BLENDER_EDIT_BINDING");
  }
  if (v.phase === "COMPLETED") { validateBlenderMaterialVerification(v.verification, proposal); if (!v.source || digest(job.outputs) !== digest([v.source]) || job.dispatch?.state !== "COMPLETED") blenderFail("BLENDER_EDIT_BINDING"); }
  else if (job.outputs.length || v.source !== null || v.verification !== null || job.adapterMetadata !== null || (v.phase === "RUNNING" && job.dispatch?.state !== "INTENT_RECORDED") || (["FAILED", "INTERRUPTED"].includes(String(v.phase)) && job.dispatch?.state !== "ACKNOWLEDGED")) blenderFail("BLENDER_EDIT_BINDING");
  return v as unknown as BlenderEditExecution;
}
