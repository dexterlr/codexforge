import type { AssetRef, Job, JsonObject, StudioId } from "./domain";
import { blenderExact, blenderFail, blenderHash, blenderObject } from "./blender-source-contract";
import { validateAssetRef } from "./validation";

export const BLENDER_EDIT_ADAPTER = "STUDIO_BLENDER_MATERIAL_BASE_COLOUR_V1";
export type BlenderRgba = [number, number, number, number];
export interface BlenderEditPolicy { sourceSha256: string; allowedMaterials: string[]; protectedObjects: string[]; protectedMaterials: string[] }
export interface BlenderMaterialTarget { targetId: string; materialName: string; nodeName: string; socketIdentifier: string; originalLinear: BlenderRgba | null; users: string[]; eligible: boolean; reason: string | null }
export interface BlenderMaterialInspection { format: "studio-blender-material-inspection-v1"; sourceSha256: string; sourceBytes: number; semanticDigest: string; dependenciesDigest: string; protectedDigest: string; policyDigest: string; targets: BlenderMaterialTarget[] }
export interface BlenderEditProposal {
  format: "studio-blender-material-proposal-v1"; projectId: StudioId<"project">; shotId: StudioId<"shot">; source: AssetRef; descriptorHash: string; blendSha256: string;
  inspectionDigest: string; semanticDigest: string; dependenciesDigest: string; protectedDigest: string; policy: BlenderEditPolicy; target: BlenderMaterialTarget;
  colourSrgb: string; originalLinear: BlenderRgba; requestedLinear: BlenderRgba; adapterVersion: typeof BLENDER_EDIT_ADAPTER;
  blender: { path: string; sha256: string; version: string }; scriptHashes: { materialEdit: string; semanticSnapshot: string }; legacyAdapterDigest: string;
}
export interface BlenderMaterialVerification { format: "studio-blender-material-verification-v1"; outputSha256: string; outputBytes: number; beforeSemanticDigest: string; afterSemanticDigest: string; protectedDigest: string; changedTargetId: string; originalLinear: BlenderRgba; requestedLinear: BlenderRgba; reopened: true; onlyIntendedChange: true }
export interface BlenderEditExecution { format: "studio-blender-material-execution-v1"; proposal: BlenderEditProposal; proposalDigest: string; preparedRevision: number; phase: "PREPARED" | "RUNNING" | "COMPLETED" | "FAILED" | "INTERRUPTED"; process: { pid: number; identity: string; executableSha256: string; startedAt: string } | null; verification: BlenderMaterialVerification | null; source: AssetRef | null }
export function isBlenderEditJob(job: Job): boolean { return !!job?.checkpoint && Object.hasOwn(job.checkpoint, "blenderEdit"); }
export function editRgba(value: unknown): BlenderRgba { if (!Array.isArray(value) || value.length !== 4 || value.some(n => typeof n !== "number" || !Number.isFinite(n) || n < 0 || n > 1)) return blenderFail("BLENDER_COLOUR_INVALID"); return value as BlenderRgba; }
export function srgbToBlenderLinear(colour: string, alpha = 1): BlenderRgba {
  if (typeof colour !== "string" || colour.length !== 7 || !/^#[0-9a-fA-F]{6}$/u.test(colour)) return blenderFail("BLENDER_COLOUR_INVALID", "Choose a six-digit sRGB colour. Native RGB values use scene-linear sRGB; alpha is preserved.");
  const rgb = [1, 3, 5].map(offset => { const c = Number.parseInt(colour.slice(offset, offset + 2), 16) / 255; return Math.fround(c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4); });
  return editRgba([...rgb, alpha]);
}
function names(value: unknown): string[] { if (!Array.isArray(value) || value.length > 256 || value.some(v => typeof v !== "string" || !v || v.length > 256 || /[\u0000-\u001f]/u.test(v)) || new Set(value).size !== value.length) return blenderFail("BLENDER_EDIT_POLICY_INVALID"); return value; }
export function validateBlenderEditPolicy(input: unknown): BlenderEditPolicy { const v = blenderObject(input); blenderExact(v, "sourceSha256,allowedMaterials,protectedObjects,protectedMaterials"); blenderHash(v.sourceSha256); if (!names(v.allowedMaterials).length || !names(v.protectedObjects).length || !names(v.protectedMaterials).length || names(v.allowedMaterials).some(name => names(v.protectedMaterials).includes(name))) blenderFail("BLENDER_EDIT_POLICY_INVALID"); return v as unknown as BlenderEditPolicy; }
export function validateBlenderMaterialInspection(input: unknown): BlenderMaterialInspection {
  const v = blenderObject(input); blenderExact(v, "format,sourceSha256,sourceBytes,semanticDigest,dependenciesDigest,protectedDigest,policyDigest,targets");
  if (v.format !== "studio-blender-material-inspection-v1" || !Number.isSafeInteger(v.sourceBytes) || Number(v.sourceBytes) < 1 || Number(v.sourceBytes) > 128 * 1024 ** 2 || !Array.isArray(v.targets) || v.targets.length > 256) blenderFail("BLENDER_EDIT_INSPECTION_INVALID");
  for (const key of ["sourceSha256", "semanticDigest", "dependenciesDigest", "protectedDigest", "policyDigest"]) blenderHash(v[key]);
  const ids = new Set<string>(); for (const raw of v.targets as unknown[]) { const target = blenderObject(raw); blenderExact(target, "targetId,materialName,nodeName,socketIdentifier,originalLinear,users,eligible,reason"); blenderHash(target.targetId); if (ids.has(String(target.targetId))) blenderFail(); ids.add(String(target.targetId)); names([target.materialName]); if (target.nodeName !== "") names([target.nodeName]); if (target.socketIdentifier !== "") names([target.socketIdentifier]); names(target.users); if (target.originalLinear !== null) editRgba(target.originalLinear); if (typeof target.eligible !== "boolean" || (target.eligible ? target.reason !== null || target.originalLinear === null || !target.nodeName || !target.socketIdentifier : typeof target.reason !== "string" || !target.reason)) blenderFail(); }
  return v as unknown as BlenderMaterialInspection;
}
export function validateBlenderEditProposal(input: unknown): BlenderEditProposal {
  const v = blenderObject(input); blenderExact(v, "format,projectId,shotId,source,descriptorHash,blendSha256,inspectionDigest,semanticDigest,dependenciesDigest,protectedDigest,policy,target,colourSrgb,originalLinear,requestedLinear,adapterVersion,blender,scriptHashes,legacyAdapterDigest");
  if (v.format !== "studio-blender-material-proposal-v1" || v.adapterVersion !== BLENDER_EDIT_ADAPTER) blenderFail(); validateAssetRef(v.source);
  for (const key of ["descriptorHash", "blendSha256", "inspectionDigest", "semanticDigest", "dependenciesDigest", "protectedDigest", "legacyAdapterDigest"]) blenderHash(v[key]);
  const policy = validateBlenderEditPolicy(v.policy), target = blenderObject(v.target); blenderExact(target, "targetId,materialName,nodeName,socketIdentifier,originalLinear,users,eligible,reason");
  blenderHash(target.targetId); editRgba(target.originalLinear); names(target.users); names([target.materialName]); names([target.nodeName]); names([target.socketIdentifier]);
  const users = names(target.users);
  if (target.eligible !== true || target.reason !== null || users.length !== 1 || users.some(name => policy.protectedObjects.includes(name)) || !policy.allowedMaterials.includes(String(target.materialName)) || policy.sourceSha256 !== v.blendSha256 || JSON.stringify(editRgba(v.originalLinear)) !== JSON.stringify(target.originalLinear) || typeof v.colourSrgb !== "string" || v.colourSrgb !== v.colourSrgb.toUpperCase() || JSON.stringify(editRgba(v.requestedLinear)) !== JSON.stringify(srgbToBlenderLinear(v.colourSrgb, (v.originalLinear as BlenderRgba)[3])) || JSON.stringify(v.originalLinear) === JSON.stringify(v.requestedLinear)) blenderFail("BLENDER_EDIT_PROPOSAL_INVALID");
  const tool = blenderObject(v.blender); blenderExact(tool, "path,sha256,version"); blenderHash(tool.sha256); if (typeof tool.path !== "string" || !/^C:[\\/].*blender\.exe$/iu.test(tool.path) || tool.version !== "5.0.1") blenderFail();
  const scripts = blenderObject(v.scriptHashes); blenderExact(scripts, "materialEdit,semanticSnapshot"); blenderHash(scripts.materialEdit); blenderHash(scripts.semanticSnapshot);
  return v as unknown as BlenderEditProposal;
}
/** Includes the immutable legacy inspect/render script identity used for post-save native admission. */
export function assertBlenderEditAdapterBinding(proposal: BlenderEditProposal, actualDigest: string): void {
  if (blenderHash(proposal.legacyAdapterDigest) !== blenderHash(actualDigest)) blenderFail("BLENDER_EDIT_PLAN_CHANGED", "The pinned native admission adapter changed after edit preparation. No saved approval can execute it.");
}
export function validateBlenderMaterialVerification(input: unknown, proposal: BlenderEditProposal): BlenderMaterialVerification {
  const v = blenderObject(input); blenderExact(v, "format,outputSha256,outputBytes,beforeSemanticDigest,afterSemanticDigest,protectedDigest,changedTargetId,originalLinear,requestedLinear,reopened,onlyIntendedChange");
  if (v.format !== "studio-blender-material-verification-v1" || v.reopened !== true || v.onlyIntendedChange !== true || v.beforeSemanticDigest !== proposal.semanticDigest || v.protectedDigest !== proposal.protectedDigest || v.changedTargetId !== proposal.target.targetId || JSON.stringify(v.originalLinear) !== JSON.stringify(proposal.originalLinear) || JSON.stringify(v.requestedLinear) !== JSON.stringify(proposal.requestedLinear) || !Number.isSafeInteger(v.outputBytes) || Number(v.outputBytes) < 1 || Number(v.outputBytes) > 128 * 1024 ** 2) blenderFail("BLENDER_EDIT_VERIFICATION_FAILED");
  blenderHash(v.outputSha256); blenderHash(v.afterSemanticDigest); if (v.outputSha256 === proposal.blendSha256 || v.afterSemanticDigest === v.beforeSemanticDigest) blenderFail("BLENDER_EDIT_UNCHANGED"); return v as unknown as BlenderMaterialVerification;
}
export function blenderEditCheckpoint(value: BlenderEditExecution): JsonObject { return { blenderEdit: value as unknown as JsonObject }; }
