import "server-only";
import { assertStudioId } from "./workspace";
import { assertStudioBlenderRequest, OperatorHttpError, studioOperatorFailureResponse } from "./operator-http.server";
import { parseStudioJson } from "./store.server";
import { BlenderBoundaryError } from "./blender-source-config.server";
import { BlenderSourceError } from "./blender-source-contract";
import { BlenderAdapterError } from "./blender-adapter.server";
import type { StudioId } from "./domain";

export type BlenderAction = {
  action: "register"; projectId: StudioId<"project">; shotId: StudioId<"shot">; expectedProjectRevision: number; sourceId: string; requestedAt: string;
} | { action: "prepare"; projectId: StudioId<"project">; shotId: StudioId<"shot">; expectedProjectRevision: number; assetId: StudioId<"asset">; version: number; scene: string; camera: string; frameStart: number; frameEnd: number; requestedAt: string;
} | { action: "start" | "cancel" | "reconcile"; projectId: StudioId<"project">; jobId: StudioId<"job">; specDigest: string; requestedAt: string;
} | { action: "reconcile-inspection"; projectId: StudioId<"project">; requestedAt: string }
  | { action: "use-take"; projectId: StudioId<"project">; jobId: StudioId<"job">; compositionId: string; expectedRevision: number; expectedHeadDigest: string; requestedAt: string }
  | { action: "inspect-edit"; projectId: StudioId<"project">; shotId: StudioId<"shot">; assetId: StudioId<"asset">; version: number; requestedAt: string }
  | { action: "prepare-edit"; projectId: StudioId<"project">; shotId: StudioId<"shot">; assetId: StudioId<"asset">; version: number; expectedProjectRevision: number; inspectionDigest: string; targetId: string; colourSrgb: string; requestedAt: string }
  | { action: "apply-edit"; projectId: StudioId<"project">; jobId: StudioId<"job">; proposalDigest: string; approved: true; requestedAt: string }
  | { action: "reconcile-edit"; projectId: StudioId<"project">; jobId: StudioId<"job">; proposalDigest: string; requestedAt: string };
const invalid = (): never => { throw new OperatorHttpError(400, "invalid_blender_request", "Use only the supported native-source controls and exact saved identities. No arbitrary path or script is accepted."); };
function object(value: unknown): Record<string, unknown> { if (!value || typeof value !== "object" || Array.isArray(value)) return invalid(); return value as Record<string, unknown>; }
function id(value: unknown, kind: "project" | "shot" | "asset" | "job") { try { assertStudioId(value, kind); } catch { return invalid(); } }
function revision(value: unknown) { if (!Number.isSafeInteger(value) || Number(value) < 1 || Number(value) > 1_000_000) invalid(); }
function hash(value: unknown) { if (typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value)) invalid(); }
function name(value: unknown) { if (typeof value !== "string" || !value.trim() || value.length > 160 || /[\u0000-\u001f\u007f]/u.test(value)) invalid(); }
export function validateBlenderAction(value: unknown): BlenderAction {
  const v = object(value); id(v.projectId, "project");
  if (typeof v.requestedAt !== "string" || !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(v.requestedAt) || !Number.isFinite(Date.parse(v.requestedAt)) || new Date(v.requestedAt).toISOString() !== v.requestedAt) invalid();
  let fields = "action,projectId,requestedAt";
  if (v.action === "register") {
    fields += ",shotId,expectedProjectRevision,sourceId"; id(v.shotId, "shot"); revision(v.expectedProjectRevision);
    if (typeof v.sourceId !== "string" || !/^[a-z0-9][a-z0-9-]{0,79}$/u.test(v.sourceId)) invalid();
  } else if (v.action === "prepare") {
    fields += ",shotId,expectedProjectRevision,assetId,version,scene,camera,frameStart,frameEnd";
    id(v.shotId,"shot"); id(v.assetId,"asset"); revision(v.expectedProjectRevision); revision(v.version); name(v.scene); name(v.camera); revision(v.frameStart); revision(v.frameEnd);
    if (Number(v.frameEnd) < Number(v.frameStart) || Number(v.frameEnd)-Number(v.frameStart) >= 75) invalid();
  } else if (v.action === "inspect-edit" || v.action === "prepare-edit") {
    fields += ",shotId,assetId,version"; id(v.shotId,"shot"); id(v.assetId,"asset"); revision(v.version);
    if (v.action === "prepare-edit") { fields += ",expectedProjectRevision,inspectionDigest,targetId,colourSrgb"; revision(v.expectedProjectRevision); hash(v.inspectionDigest); hash(v.targetId); if (typeof v.colourSrgb !== "string" || v.colourSrgb.length !== 7 || !/^#[a-fA-F0-9]{6}$/u.test(v.colourSrgb)) invalid(); }
  } else if (v.action === "apply-edit" || v.action === "reconcile-edit") {
    fields += ",jobId,proposalDigest"; id(v.jobId,"job"); hash(v.proposalDigest); if (v.action === "apply-edit") { fields += ",approved"; if (v.approved !== true) invalid(); }
  } else if (["start","cancel","reconcile"].includes(String(v.action))) {
    fields += ",jobId,specDigest"; id(v.jobId,"job"); hash(v.specDigest);
  } else if (v.action === "reconcile-inspection") {
    // Explicit recovery only; no source selection, registration, process start or retry.
  } else if (v.action === "use-take") {
    fields += ",jobId,compositionId,expectedRevision,expectedHeadDigest"; id(v.jobId,"job"); revision(v.expectedRevision); hash(v.expectedHeadDigest);
    if (typeof v.compositionId !== "string" || !/^composition_[a-z0-9]+(?:_[a-z0-9]+)*$/u.test(v.compositionId) || v.compositionId.length > 128) invalid();
  } else invalid();
  if (Object.keys(v).sort().join() !== fields.split(",").sort().join()) invalid();
  return v as unknown as BlenderAction;
}
async function body(request: Request): Promise<BlenderAction> {
  if (!["application/json", "application/json; charset=utf-8"].includes(request.headers.get("Content-Type")?.toLowerCase() ?? "")) throw new OperatorHttpError(415,"content_type_required","Native-source requests require UTF-8 JSON.");
  const length = request.headers.get("Content-Length");
  if (length !== null && (!/^(?:0|[1-9]\d*)$/u.test(length) || Number(length)>32768)) invalid();
  if (!request.body) return invalid();
  const reader = request.body.getReader(); let bytes = 0; const chunks: Uint8Array[] = [];
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => { void reader.cancel().catch(()=>undefined); reject(new OperatorHttpError(408,"body_timeout","The bounded native-source request timed out.")); },5000); });
  try { while (true) { const part = await Promise.race([reader.read(),timeout]); if(part.done) break; bytes+=part.value.length; if(bytes>32768){void reader.cancel().catch(()=>undefined);return invalid();} chunks.push(part.value); }
    return validateBlenderAction(parseStudioJson(new TextDecoder("utf-8",{fatal:true}).decode(Buffer.concat(chunks))));
  } finally { clearTimeout(timer); reader.releaseLock(); }
}
const response = (data: unknown, status=200) => Response.json(data,{status,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff","Content-Security-Policy":"default-src 'none'; sandbox"}});
export function createStudioBlenderHandler(options: {
  enabled: boolean; listeners?: () => readonly string[] | null;
  inspect: (projectId: StudioId<"project">,shotId: StudioId<"shot">) => unknown | Promise<unknown>;
  execute: (action: BlenderAction,key: string) => unknown | Promise<unknown>;
}) {
  return async (request: Request): Promise<Response> => {
    try {
      if (!options.enabled) throw new OperatorHttpError(503,"studio_disabled","The local Studio operator is disabled.");
      if (!["GET","POST"].includes(request.method)) throw new OperatorHttpError(405,"method_not_allowed","Use explicit native-source reads and actions.");
      const url = assertStudioBlenderRequest(request,options.listeners?.());
      if (request.method === "GET") {
        if (request.body!==null || request.headers.has("Transfer-Encoding") || (request.headers.has("Content-Length") && request.headers.get("Content-Length")!=="0") || [...url.searchParams.keys()].sort().join()!=="projectId,shotId") invalid();
        const projectId=url.searchParams.get("projectId"),shotId=url.searchParams.get("shotId"); id(projectId,"project");id(shotId,"shot");
        return response({ok:true,result:await options.inspect(projectId as StudioId<"project">,shotId as StudioId<"shot">)});
      }
      if(url.search) invalid();
      const key=request.headers.get("Idempotency-Key");if(!key || !/^[a-zA-Z0-9_-]{8,128}$/u.test(key))invalid();
      const input=await body(request); if(request.signal.aborted)invalid();
      return response({ok:true,result:await options.execute(input,key!)});
    } catch(error) {
      if(error instanceof BlenderBoundaryError || error instanceof BlenderSourceError || error instanceof BlenderAdapterError) return response({ok:false,error:{code:error.code,message:error.message}},409);
      return studioOperatorFailureResponse(error);
    }
  };
}
