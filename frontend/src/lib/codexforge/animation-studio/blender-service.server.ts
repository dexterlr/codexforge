import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { closeSync, constants, copyFileSync, fsyncSync, lstatSync, mkdtempSync, openSync, readFileSync, readdirSync, realpathSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { getExactWindowsProcessIdentity } from "../creator/creator-native-filesystem.server";
import { hashJarvisChatCanonicalJson as digest } from "../jarvis-chat/jarvis-chat-crypto";
import type { AssetRef, JsonObject, StudioId } from "./domain";
import type { BlenderRecoveryAuthorization, StudioRepository } from "./store.server";
import { openStudioOperatorRepository, readStudioBlenderRecoveryAuthorization } from "./operator-repository.server";
import { qualifyStudioMediaImportFile } from "./footage-import.server";
import { BLENDER_PROFILE, isBlenderJob, isBlenderSourceAsset, validateBlenderSourceDescriptor, type BlenderProgress, type BlenderRenderSettings, type BlenderSourceDescriptor } from "./blender-source-contract";
import { readBlenderJob } from "./blender-source-identity.server";
import { BlenderBoundaryError, canonicalBlenderFile, checkBlenderWorkCapacity, readBlenderConfiguration, verifyApprovedBlenderSource, type ApprovedBlenderSource } from "./blender-source-config.server";
import { BLENDER_ADAPTER_VERSION, BLENDER_COLOUR_TRANSFORM, BlenderAdapterError, getBlenderAdapterScripts, inspectBlenderSource, isExactBlenderProcessAlive, renderBlenderPreview, type BlenderProcessIdentity } from "./blender-adapter.server";
import type { BlenderAction } from "./blender-http.server";
import { BLENDER_EDIT_ADAPTER, assertBlenderEditAdapterBinding, isBlenderEditJob, srgbToBlenderLinear, validateBlenderEditProposal, type BlenderEditPolicy, type BlenderMaterialInspection, type BlenderEditProposal } from "./blender-edit-contract";
import { readBlenderEditJob } from "./blender-edit-identity.server";
import { applyBlenderMaterialEdit, getBlenderEditScripts, inspectBlenderMaterials } from "./blender-adapter.server";

const ACTOR = "local-studio-blender-operator";
const STATE = Symbol.for("codexforge.studio.blender.executions.v1");
type Running = { controller: AbortController; token: string; progress: BlenderProgress; workDirectory: string; key: string };
type Host = Record<symbol, unknown>;
const executions = ((process as unknown as Host)[STATE] ??= new Map<string, Running>()) as Map<string, Running>;
const editExecutions = new Map<string, { workDirectory: string }>();
const materialInspections = new Map<string, { projectId: string; source: AssetRef; descriptorHash: string; policy: BlenderEditPolicy; inspection: BlenderMaterialInspection; scriptHashes: BlenderEditProposal["scriptHashes"]; legacyAdapterDigest: string }>();
const executionKey = (projectId: string, jobId: string) => `${projectId}:${jobId}`;
const now = () => new Date().toISOString();
function withRepository<T>(operation: (repository: StudioRepository) => T, recovery?: BlenderRecoveryAuthorization): T { const repository=openStudioOperatorRepository(recovery); try { return operation(repository); } finally { repository.close(); } }
function blocked(code: string, message: string): never { throw new BlenderBoundaryError(code,message); }
/** Bounded diagnostic evidence, not a claim that the canonical terminal write succeeded. */
function recordPersistenceFailure(entry: Running, jobId: string, stage: "progress" | "terminal", error: unknown): void {
  const value = error && typeof error === "object" ? error as { code?: unknown; issues?: unknown } : {};
  const boundedCode = (code: unknown) => typeof code === "string" && /^[a-zA-Z0-9_-]{1,80}$/u.test(code) ? code : "UNCLASSIFIED_STORAGE_FAILURE";
  const issueCodes = Array.isArray(value.issues) ? value.issues.slice(0, 4).map(issue => boundedCode(issue && typeof issue === "object" ? (issue as { code?: unknown }).code : null)) : [];
  const evidence = { format: "studio-blender-persistence-failure-v1", jobId, stage, observedAt: now(), canonicalOutcomePersisted: false, code: boundedCode(value.code), issueCodes, progress: { phase: entry.progress.phase, completedFrames: entry.progress.completedFrames, totalFrames: entry.progress.totalFrames } };
  try { writeFileSync(path.join(entry.workDirectory, `${stage}-persistence-failure.json`), JSON.stringify(evidence), { flag: "wx" }); }
  catch { /* A failed diagnostic write cannot establish durability either. Never overwrite evidence. */ }
  console.error(`[studio-blender] ${jobId}: ${stage} persistence unresolved (${evidence.code}${issueCodes.length ? "; " + issueCodes.join(",") : ""}); inspect canonical saved state before any action.`);
}
type ResolvedBlenderSource = ApprovedBlenderSource & { nativeBytes?: Buffer };
function approved(config: ReturnType<typeof readBlenderConfiguration>, descriptor: BlenderSourceDescriptor, projectId?: StudioId<"project">): ResolvedBlenderSource {
  const source=config.sources.find(item=>item.sourceId===descriptor.catalogueId);
  if (descriptor.revision && projectId) {
    if (!source || source.path !== descriptor.source.originalPath || source.sha256 !== descriptor.revision.originalSha256) return blocked("BLENDER_SOURCE_CHANGED", "The native revision lost its approved original lineage."); verifyApprovedBlenderSource(source);
    return withRepository(repository => {
      let parent = repository.readBlenderSource(projectId, descriptor.revision!.parent), depth = 0;
      while (parent.revision) { if (++depth > 32 || parent.catalogueId !== source.sourceId || parent.revision.originalSha256 !== source.sha256) return blocked("BLENDER_SOURCE_CHANGED", "Native ancestry is not qualified."); parent = repository.readBlenderSource(projectId, parent.revision.parent); }
      if (parent.source.sha256 !== source.sha256 || parent.source.originalPath !== source.path) return blocked("BLENDER_SOURCE_CHANGED", "Native ancestry differs from the approved original.");
      const asset = repository.loadManifest(projectId).assets.find(asset => isBlenderSourceAsset(asset) && asset.contentHash === digest(descriptor)); if (!asset) return blocked("BLENDER_SOURCE_CHANGED", "The exact native version is unavailable.");
      const nativeBytes = repository.readBlenderNativeVersion(projectId, asset); return { ...source, sha256: descriptor.source.sha256, byteLength: nativeBytes.length, nativeBytes };
    });
  }
  if(!source || source.path!==descriptor.source.originalPath || source.sha256!==descriptor.source.sha256 || source.byteLength!==descriptor.source.byteLength) return blocked("BLENDER_SOURCE_CHANGED","This registered source no longer matches its approved local catalogue. No saved plan can start.");
  verifyApprovedBlenderSource(source);return source;
}
function sourceCopy(config: ReturnType<typeof readBlenderConfiguration>, source: ResolvedBlenderSource) {
  checkBlenderWorkCapacity(config.workRoot);if (!source.nativeBytes) verifyApprovedBlenderSource(source);
  const directory=mkdtempSync(path.join(config.workRoot,"blender-")),filename=path.join(directory,"source.blend");
  if (source.nativeBytes) writeFileSync(filename, source.nativeBytes, { flag: "wx" }); else copyFileSync(source.path,filename,constants.COPYFILE_EXCL);
  const copy=canonicalBlenderFile(filename,128*1024*1024);if (!source.nativeBytes) verifyApprovedBlenderSource(source);
  if(copy.sha256!==source.sha256 || copy.byteLength!==source.byteLength)blocked("BLENDER_SOURCE_CHANGED","Native working-copy verification failed. The original has not been changed.");
  return {directory,filename};
}
/** Cross-server exclusive lease. A crash leaves it retained; never automatically steal a lock. */
function lease(workRoot: string,operation: string,workDirectory: string) {
  const filename=path.join(workRoot,"blender-active-lease.json"),record={format:"studio-blender-lease-v1",operation,workDirectory,pid:process.pid,identity:getExactWindowsProcessIdentity(process.pid),createdAt:now(),nonce:randomUUID()};
  let fd: number;
  try { fd=openSync(filename,"wx",0o600); } catch { return blocked("BLENDER_LEASE_HELD","A native inspection/render or retained interrupted lease already owns this staging root. Nothing was retried. Resolve its recorded process before another start."); }
  const bytes=JSON.stringify(record);try {writeFileSync(fd,bytes);fsyncSync(fd);}finally{closeSync(fd);}
  return () => { if(readFileSync(filename,"utf8")!==bytes)blocked("BLENDER_LEASE_CHANGED","The native execution lease changed; it was retained for explicit recovery.");unlinkSync(filename); };
}
/** Explicit interrupted-job reconciliation, never startup lock stealing or PID-only killing. */
function reconciledLease(workRoot:string,jobId:string):()=>void {
  const filename=path.join(workRoot,"blender-active-lease.json");
  let bytes:string;
  try{canonicalBlenderFile(filename,16384);bytes=readFileSync(filename,"utf8");}catch(error){if((error as NodeJS.ErrnoException).code==="ENOENT")return()=>undefined;throw error;}
  const record=JSON.parse(bytes) as Record<string,unknown>;
  if(Object.keys(record).sort().join()!=="createdAt,format,identity,nonce,operation,pid,workDirectory"||record.format!=="studio-blender-lease-v1"||record.operation!==jobId||!Number.isSafeInteger(record.pid)||typeof record.identity!=="string"||typeof record.workDirectory!=="string")blocked("BLENDER_LEASE_CHANGED","The retained lease does not belong to this exact job. Nothing was released.");
  if(isExactBlenderProcessAlive({processId:Number(record.pid),identity:String(record.identity)}))blocked("BLENDER_SERVER_STILL_ALIVE","The recorded server still owns this lease. No cross-server reconciliation is allowed.");
  const directory=path.resolve(String(record.workDirectory)),root=realpathSync.native(workRoot);
  if(path.dirname(directory).toLowerCase()!==root.toLowerCase()||!/^blender-[a-zA-Z0-9]+$/u.test(path.basename(directory))||lstatSync(directory).isSymbolicLink()||realpathSync.native(directory).toLowerCase()!==directory.toLowerCase())blocked("BLENDER_LEASE_CHANGED","The retained native work directory cannot be verified.");
  const records=readdirSync(directory).filter(name=>name.endsWith("-process.json"));
  if(records.length>8)blocked("BLENDER_LEASE_CHANGED","Unexpected process evidence was retained for review.");
  for(const name of records){const full=path.join(directory,name);canonicalBlenderFile(full,32768);const child=JSON.parse(readFileSync(full,"utf8")) as BlenderProcessIdentity;if(!Number.isSafeInteger(child.processId)||typeof child.identity!=="string"||isExactBlenderProcessAlive(child))blocked("BLENDER_PROCESS_STILL_ALIVE","A recorded child still exists or its identity is invalid. No lease was released and no result was assumed.");}
  return()=>{if(readFileSync(filename,"utf8")!==bytes)blocked("BLENDER_LEASE_CHANGED","The retained lease changed during reconciliation.");unlinkSync(filename);};
}
function settings(config: ReturnType<typeof readBlenderConfiguration>,descriptor:BlenderSourceDescriptor,input:{scene:string;camera:string;frameStart:number;frameEnd:number}):BlenderRenderSettings {
  const scripts=getBlenderAdapterScripts();
  return {profile:BLENDER_PROFILE,...input,width:1280,height:720,fps:25,adapterVersion:BLENDER_ADAPTER_VERSION,blender:{...config.blender,version:String(descriptor.inspection.blenderVersion)},ffmpeg:config.ffmpeg,ffprobe:config.ffprobe,scriptHashes:{inspect:scripts.inspect.sha256,render:scripts.render.sha256},colourTransform:BLENDER_COLOUR_TRANSFORM};
}
export function inspectStudioBlender(projectId:StudioId<"project">,shotId:StudioId<"shot">) {
  return withRepository(repository=>{
    const snapshot=repository.loadManifest(projectId);if(!snapshot.shots.some(shot=>shot.shotId===shotId))blocked("BLENDER_SHOT_MISSING","Choose a saved shot before using a native source.");
    let configuration:ReturnType<typeof readBlenderConfiguration>|null=null,unavailable:string|null=null;
    try{configuration=readBlenderConfiguration();}catch(error){unavailable=error instanceof BlenderBoundaryError?error.message:"The qualified local Blender tools are unavailable.";}
    const sources=snapshot.assets.filter(asset=>isBlenderSourceAsset(asset)&&asset.provenance.adapterMetadata?.settings.shotId===shotId).map(asset=>({assetId:asset.assetId,version:asset.version,descriptor:repository.readBlenderSource(projectId,asset)}));
    const jobs=snapshot.jobs.filter(job=>isBlenderJob(job)&&job.shotId===shotId).map(job=>{
      const execution=readBlenderJob(job),active=executions.get(executionKey(projectId,job.jobId));
      return {jobId:job.jobId,state:job.state,execution,progress:active?.progress??execution.progress,active:!!active,interrupted:execution.phase==="RUNNING"&&!active,outputs:job.outputs,error:job.error};
    });
    const editJobs = snapshot.jobs.filter(job => isBlenderEditJob(job) && job.shotId === shotId).map(job => { const execution = readBlenderEditJob(job), active = editExecutions.has(executionKey(projectId, job.jobId)); return { jobId: job.jobId, state: job.state, execution, active, interrupted: execution.phase === "RUNNING" && !active, outputs: job.outputs, error: job.error }; });
    let editEnabled = false, editUnavailable: string | null = null; try { getBlenderEditScripts(); editEnabled = true; } catch { editUnavailable = "Typed material editing has not been enabled with pinned application scripts on this runtime."; }
    let inspectionRecovery=false;
    if(configuration)try{const filename=path.join(configuration.workRoot,"blender-active-lease.json");canonicalBlenderFile(filename,16384);const retained=JSON.parse(readFileSync(filename,"utf8"));inspectionRecovery=retained.operation==="inspect"&&!isExactBlenderProcessAlive({processId:retained.pid,identity:retained.identity});}catch{/* Unavailable/corrupt ownership never permits release. */}
    return {projectId,shotId,projectRevision:snapshot.project.revision,enabled:!!configuration,unavailable,inspectionRecovery,editEnabled,editUnavailable,catalogue:configuration?.sources.map(({sourceId,label,version,lineage})=>({sourceId,label,version,lineage}))??[],sources,jobs,editJobs,providerRequests:0,delivery:"SERVER_GENERATED_LOCAL_RENDER",previewMode:"Direct native scene preview; external authored contact-shadow composite is not reproduced. Final character is not approved."};
  });
}
async function render(projectId:StudioId<"project">,jobId:StudioId<"job">,entry:Running,descriptor:BlenderSourceDescriptor,source:ResolvedBlenderSource,config:ReturnType<typeof readBlenderConfiguration>,release:()=>void,filename:string) {
  let count=0;
  const checkpoint=(force=false)=>{
    if(!force && entry.progress.completedFrames%5!==0)return;
    try { withRepository(repository=>repository.checkpointBlenderRender(projectId,jobId,entry.token,entry.progress,`blender_progress_${jobId}_${++count}`,ACTOR,now())); }
    catch (error) { recordPersistenceFailure(entry, jobId, "progress", error); throw error; }
  };
  try {
    const current=withRepository(repository=>readBlenderJob(repository.loadManifest(projectId).jobs.find(job=>job.jobId===jobId)!));
    const spec=current.spec,exact=settings(config,descriptor,spec.settings);
    if(digest(exact)!==digest(spec.settings))blocked("BLENDER_PLAN_CHANGED","Tool or render settings changed after approval. The consumed job cannot be reused.");
    approved(readBlenderConfiguration(),descriptor,projectId);
    const total=spec.settings.frameEnd-spec.settings.frameStart+1;
    const result=await renderBlenderPreview({blender:config.blender,ffmpeg:config.ffmpeg,ffprobe:config.ffprobe,sourcePath:filename,expectedSourceSha256:source.sha256,workDirectory:entry.workDirectory,adapterScriptDigest:getBlenderAdapterScripts().digest,signal:entry.controller.signal,scene:spec.settings.scene,camera:spec.settings.camera,startFrame:spec.settings.frameStart,endFrame:spec.settings.frameEnd,width:1280,height:720,fps:25,
      onProcess:(identity:BlenderProcessIdentity)=>{entry.progress.process={pid:identity.processId,identity:identity.identity,executableSha256:identity.executable===config.blender.path?config.blender.sha256:identity.executable===config.ffmpeg.path?config.ffmpeg.sha256:config.ffprobe.sha256,startedAt:identity.recordedAt};checkpoint(true);},
      onProgress:progress=>{entry.progress={...entry.progress,phase:progress.phase==="INSPECTING"?"STARTING":progress.phase,completedFrames:progress.phase==="RENDERING"?progress.completed:progress.phase==="INSPECTING"?0:total,totalFrames:total};checkpoint(progress.phase!=="RENDERING");}
    });
    if(entry.controller.signal.aborted)throw new BlenderAdapterError("BLENDER_CANCELLED");
    approved(readBlenderConfiguration(),descriptor,projectId);
    if(digest(result.inspection)!==digest(descriptor.inspection))blocked("BLENDER_INSPECTION_CHANGED","The exact native inspection changed between preparation and execution. No result was published.");
    entry.progress={...entry.progress,phase:"VALIDATING",completedFrames:total};checkpoint(true);
    const staged=await qualifyStudioMediaImportFile({sourcePath:result.outputPath,mediaType:"VIDEO",expectedBytes:result.bytes,expectedHash:result.sha256});
    try {
      if(entry.controller.signal.aborted)throw new BlenderAdapterError("BLENDER_CANCELLED");
      entry.progress={...entry.progress,phase:"PUBLISHING"};checkpoint(true);
      withRepository(repository=>repository.publishBlenderRenderOutput(projectId,jobId,entry.token,staged,`blender_publish_${jobId}`,ACTOR,now()));
    }finally{staged.close();}
  }catch(error){
    const cancelled=entry.controller.signal.aborted || error instanceof BlenderAdapterError&&error.code==="BLENDER_CANCELLED";
    const code=error instanceof BlenderAdapterError||error instanceof BlenderBoundaryError?error.code:"BLENDER_EXECUTION_FAILED";
    try{withRepository(repository=>repository.terminateBlenderRender(projectId,jobId,entry.token,cancelled?"CANCELLED":"FAILED",code,`blender_terminal_${jobId}`,ACTOR,now()));}catch(persistenceError){recordPersistenceFailure(entry,jobId,"terminal",persistenceError);/* Canonical RUNNING remains unresolved; never invent completion. */}
  }finally{
    executions.delete(executionKey(projectId,jobId));
    // The adapter returns only after closing each exact owned child. Retain all evidence files.
    try{release();}catch{/* A changed lease is intentionally retained. */}
  }
}
export async function executeStudioBlender(input:BlenderAction,key:string) {
  if (["inspect-edit", "prepare-edit", "apply-edit", "reconcile-edit"].includes(input.action)) return executeMaterialEdit(input as Extract<BlenderAction, { action: "inspect-edit" | "prepare-edit" | "apply-edit" | "reconcile-edit" }>, key);
  if(input.action==="reconcile-inspection"){
    withRepository(repository=>repository.loadManifest(input.projectId));
    const release=reconciledLease(readBlenderConfiguration().workRoot,"inspect");release();
    return{inspectionReconciled:true,retried:false};
  }
  if(input.action==="cancel"){
    const saved=withRepository(repository=>repository.loadManifest(input.projectId).jobs.find(job=>job.jobId===input.jobId));
    if(!saved||readBlenderJob(saved).specDigest!==input.specDigest)blocked("BLENDER_JOB_MISSING","The exact saved native job was not found.");
    const active=executions.get(executionKey(input.projectId,input.jobId));
    if(!active)blocked("BLENDER_NOT_ACTIVE","This process does not own an active render. No unrelated process was stopped.");
    active.controller.abort();return{cancelRequested:true};
  }
  if(input.action==="reconcile"){
    const recovery = readStudioBlenderRecoveryAuthorization(input.projectId, input.jobId);
    return withRepository(repository=>{
      const job=repository.loadManifest(input.projectId).jobs.find(job=>job.jobId===input.jobId);if(!job)blocked("BLENDER_JOB_MISSING","The native job was not found.");
      const saved=readBlenderJob(job);if(saved.specDigest!==input.specDigest||executions.has(executionKey(input.projectId,input.jobId)))blocked("BLENDER_RECONCILE_BLOCKED","Only an unowned interrupted native job can be reconciled. No retry was made.");
      // An explicit repeated status reconciliation is a read of the sealed failure,
      // not new authority, another lifecycle event, or a reset of the consumed attempt.
      if (saved.phase === "INTERRUPTED" && job.state === "FAILED" && job.outputs.length === 0) return { jobId: job.jobId, reconciled: true, retried: false, state: "INTERRUPTED" };
      if (saved.phase !== "RUNNING" || job.outputs.length !== 0) blocked("BLENDER_RECONCILE_BLOCKED", "Only an unowned incomplete native job can be reconciled. Existing outputs cannot be reclassified.");
      const child=saved.progress?.process;
      if(child&&isExactBlenderProcessAlive({processId:child.pid,identity:child.identity}))blocked("BLENDER_PROCESS_STILL_ALIVE","The recorded child still exists. Its result cannot be assumed complete and no unrelated process will be stopped.");
      const configuration = readBlenderConfiguration();
      const release=reconciledLease(configuration.workRoot,input.jobId);
      // Validate all retained assets (including the baseline) and exact native ancestry
      // before the optional, individually authorized lossless representation transition.
      const retained = repository.load(input.projectId);
      if (retained.assets.some(asset => asset.provenance.jobId === job.jobId)) blocked("BLENDER_RECONCILE_BLOCKED", "A result already references this job. No failure was recorded.");
      approved(configuration, repository.readBlenderSource(input.projectId, saved.spec.source), input.projectId);
      if (recovery) repository.compactBlenderHistoryForRecovery(input.projectId, input.jobId, recovery.expectedSnapshotSha256, input.requestedAt);
      const result=repository.terminateBlenderRender(input.projectId,input.jobId,job.dispatch!.token,"INTERRUPTED","BLENDER_INTERRUPTED",key,ACTOR,input.requestedAt);
      release();return result;
    }, recovery);
  }
  if(input.action==="use-take"){
    return withRepository(repository=>{
      const job=repository.loadManifest(input.projectId).jobs.find(job=>job.jobId===input.jobId);if(!job||!isBlenderJob(job)||job.state!=="SUCCEEDED"||job.outputs.length!==1)blocked("BLENDER_OUTPUT_UNAVAILABLE","Only a validated completed native render can become a Take.");
      return repository.admitEditorialV2DerivedTake({operation:"ADMIT_DERIVED_TAKE",projectId:input.projectId,compositionId:input.compositionId,expectedRevision:input.expectedRevision,expectedHeadDigest:input.expectedHeadDigest,assetId:job.outputs[0].assetId,version:job.outputs[0].version,requestedAt:input.requestedAt},key,ACTOR);
    });
  }
  // Exact receipt recovery is a read of already sealed registration, not new inspection authority.
  // It must precede current revision/tool/source checks after a lost response.
  if(input.action==="register"){
    const recovered=withRepository(repository=>{
      const snapshot=repository.loadManifest(input.projectId),keyHash=createHash("sha256").update(key).digest("hex");
      if(!snapshot.receipts.some(receipt=>receipt.keyHash===keyHash))return null;
      const event=repository.readCanonicalEvent(input.projectId, `event_${digest({projectId:input.projectId,keyHash}).slice(0,24)}` as StudioId<"event">);
      const request=event?.details.request as JsonObject|undefined,original=request?.input as JsonObject|undefined,descriptor=original?.descriptor as unknown as BlenderSourceDescriptor|undefined;
      if(request?.type!=="REGISTER_BLENDER_SOURCE"||!descriptor||descriptor.catalogueId!==input.sourceId)blocked("BLENDER_RECEIPT_CONFLICT","That request key belongs to different exact inputs. It was not retried.");
      return repository.registerBlenderSource({projectId:input.projectId,shotId:input.shotId,expectedProjectRevision:input.expectedProjectRevision,requestedAt:input.requestedAt,descriptor},key,ACTOR);
    });
    if(recovered)return recovered;
  }
  const config=readBlenderConfiguration();
  if(input.action==="register"){
    const source=config.sources.find(item=>item.sourceId===input.sourceId);if(!source)blocked("BLENDER_SOURCE_UNAPPROVED","Choose an explicitly approved native source from this runtime's catalogue.");
    withRepository(repository=>{const snapshot=repository.loadManifest(input.projectId);if(snapshot.project.revision!==input.expectedProjectRevision||!snapshot.shots.some(shot=>shot.shotId===input.shotId))blocked("BLENDER_STALE_PROJECT","Reload the saved shot before native registration.");});
    const copy=sourceCopy(config,source),release=lease(config.workRoot,"inspect",copy.directory);
    try{
      const inspection=await inspectBlenderSource({blender:config.blender,sourcePath:copy.filename,expectedSourceSha256:source.sha256,workDirectory:copy.directory,adapterScriptDigest:getBlenderAdapterScripts().digest});
      verifyApprovedBlenderSource(source);
      const descriptor=validateBlenderSourceDescriptor({format:"studio-blender-source-v1",catalogueId:source.sourceId,label:source.label,source:{originalPath:source.path,relativeName:path.basename(source.path),byteLength:source.byteLength,sha256:source.sha256},dependencies:[],inspection:inspection as unknown as JsonObject});
      return withRepository(repository=>repository.registerBlenderSource({projectId:input.projectId,shotId:input.shotId,expectedProjectRevision:input.expectedProjectRevision,requestedAt:input.requestedAt,descriptor},key,ACTOR));
    }finally{release();}
  }
  if(input.action==="prepare"){
    return withRepository(repository=>{
      const ref:AssetRef={assetId:input.assetId,version:input.version};const descriptor=repository.readBlenderSource(input.projectId,ref);approved(config,descriptor,input.projectId);checkBlenderWorkCapacity(config.workRoot);
      return repository.prepareBlenderRender({projectId:input.projectId,shotId:input.shotId,expectedProjectRevision:input.expectedProjectRevision,requestedAt:input.requestedAt,source:ref,settings:settings(config,descriptor,{scene:input.scene,camera:input.camera,frameStart:input.frameStart,frameEnd:input.frameEnd})},key,ACTOR);
    });
  }
  // Only this explicit action consumes exact prepared authority and dispatches Blender.
  if (input.action !== "start") return blocked("BLENDER_ACTION_INVALID", "Use a supported exact native action.");
  const context=withRepository(repository=>{const job=repository.loadManifest(input.projectId).jobs.find(job=>job.jobId===input.jobId);if(!job)blocked("BLENDER_JOB_MISSING","The native job was not found.");const execution=readBlenderJob(job);if(execution.specDigest!==input.specDigest)blocked("BLENDER_PLAN_CHANGED","The exact prepared plan changed.");return{job,execution,descriptor:repository.readBlenderSource(input.projectId,execution.spec.source)};});
  if(context.execution.phase!=="PREPARED")return{jobId:input.jobId,started:false,state:context.execution.phase};
  const source=approved(config,context.descriptor,input.projectId);
  if(digest(settings(config,context.descriptor,context.execution.spec.settings))!==digest(context.execution.spec.settings))blocked("BLENDER_PLAN_CHANGED","The pinned tools or adapter scripts changed. Prepare a new exact job before explicit Start.");
  const copy=sourceCopy(config,source),release=lease(config.workRoot,input.jobId,copy.directory);let retained=false;
  try{
    const acquired=withRepository(repository=>repository.acquireBlenderRender(input.projectId,input.jobId,input.specDigest,key,ACTOR,input.requestedAt));
    if(!acquired.acquired||!acquired.token)return{jobId:input.jobId,started:false};
    const spec=context.execution.spec;
    const entry:Running={controller:new AbortController(),token:acquired.token,workDirectory:copy.directory,key,progress:{phase:"STARTING",completedFrames:0,totalFrames:spec.settings.frameEnd-spec.settings.frameStart+1,process:null}};
    executions.set(executionKey(input.projectId,input.jobId),entry);retained=true;
    void render(input.projectId,input.jobId,entry,context.descriptor,source,config,release,copy.filename);
    return{jobId:input.jobId,started:true};
  }finally{if(!retained)release();}
}

type MaterialAction = Extract<BlenderAction, { action: "inspect-edit" | "prepare-edit" | "apply-edit" | "reconcile-edit" }>;
function materialPins() { const scripts = getBlenderEditScripts(); return { materialEdit: scripts.materialEdit.sha256, semanticSnapshot: scripts.semanticSnapshot.sha256 }; }
function materialPolicy(source: ResolvedBlenderSource): BlenderEditPolicy { if (!source.editPolicy) return blocked("BLENDER_EDIT_NOT_QUALIFIED", "This exact source has no deployment-approved material and protected-element policy. No target is editable."); return { ...source.editPolicy, sourceSha256: source.sha256 }; }
async function executeMaterialEdit(input: MaterialAction, key: string): Promise<unknown> {
  const config = readBlenderConfiguration(), pins = materialPins(), legacyAdapterDigest = getBlenderAdapterScripts().digest;
  if (input.action === "reconcile-edit") {
    return withRepository(repository => {
      const job = repository.loadManifest(input.projectId).jobs.find(job => job.jobId === input.jobId); if (!job || !isBlenderEditJob(job)) return blocked("BLENDER_EDIT_MISSING", "The exact native edit was not found."); const execution = readBlenderEditJob(job);
      if (execution.proposalDigest !== input.proposalDigest || execution.phase !== "RUNNING" || editExecutions.has(executionKey(input.projectId, input.jobId)) || (execution.process && isExactBlenderProcessAlive({ processId: execution.process.pid, identity: execution.process.identity }))) return blocked("BLENDER_EDIT_RECONCILE_BLOCKED", "Only an unowned interrupted native edit can be reconciled. No retry was made.");
      const release = reconciledLease(config.workRoot, input.jobId); const result = repository.terminateBlenderEdit(input.projectId, input.jobId, job.dispatch!.token, "INTERRUPTED", "BLENDER_EDIT_INTERRUPTED", key, ACTOR, input.requestedAt); release(); return result;
    });
  }
  if (input.action === "inspect-edit" || input.action === "prepare-edit") {
    if (input.action === "prepare-edit") {
      const recovered = withRepository(repository => {
        const state = repository.loadManifest(input.projectId), keyHash = createHash("sha256").update(key).digest("hex"); if (!state.receipts.some(receipt => receipt.keyHash === keyHash)) return null;
        const event = repository.readCanonicalEvent(input.projectId, `event_${digest({ projectId: input.projectId, keyHash }).slice(0, 24)}` as StudioId<"event">), request = event.details.request as JsonObject | undefined, stored = request?.input as unknown as { proposal: BlenderEditProposal; expectedProjectRevision: number; requestedAt: string; shotId: string } | undefined;
        if (request?.type !== "PREPARE_BLENDER_EDIT" || !stored || stored.requestedAt !== input.requestedAt || stored.expectedProjectRevision !== input.expectedProjectRevision || stored.shotId !== input.shotId || stored.proposal.source.assetId !== input.assetId || stored.proposal.source.version !== input.version || stored.proposal.inspectionDigest !== input.inspectionDigest || stored.proposal.target.targetId !== input.targetId || stored.proposal.colourSrgb !== input.colourSrgb.toUpperCase()) return blocked("BLENDER_RECEIPT_CONFLICT", "The exact native request key has different inputs.");
        return repository.prepareBlenderEdit({ projectId: input.projectId, shotId: input.shotId, expectedProjectRevision: input.expectedProjectRevision, requestedAt: input.requestedAt, proposal: stored.proposal }, key, ACTOR);
      }); if (recovered) return recovered;
    }
    const ref: AssetRef = { assetId: input.assetId, version: input.version }, descriptor = withRepository(repository => { const state = repository.loadManifest(input.projectId); if (!state.shots.some(shot => shot.shotId === input.shotId) || state.assets.filter(asset => asset.assetId === ref.assetId).at(-1)?.version !== ref.version) return blocked("BLENDER_EDIT_STALE", "Choose the latest registered source in this saved shot."); const asset = state.assets.find(asset => asset.assetId === ref.assetId && asset.version === ref.version); if (asset?.provenance.adapterMetadata?.settings.shotId !== input.shotId) return blocked("BLENDER_EDIT_STALE", "The source belongs to a different shot."); return repository.readBlenderSource(input.projectId, ref); });
    const source = approved(config, descriptor, input.projectId), policy = materialPolicy(source);
    if (input.action === "inspect-edit") {
      const copy = sourceCopy(config, source), release = lease(config.workRoot, "inspect", copy.directory);
      try {
        const inspection = await inspectBlenderMaterials({ blender: config.blender, sourcePath: copy.filename, expectedSourceSha256: source.sha256, workDirectory: copy.directory, adapterScriptDigest: legacyAdapterDigest, policy, scriptHashes: pins });
        approved(readBlenderConfiguration(), descriptor, input.projectId); if (inspection.policyDigest !== digest(policy)) return blocked("BLENDER_EDIT_POLICY_CHANGED", "Material inspection policy does not match.");
        if (legacyAdapterDigest !== getBlenderAdapterScripts().digest || digest(pins) !== digest(materialPins())) return blocked("BLENDER_EDIT_INSPECTION_STALE", "Native inspection scripts changed during inspection.");
        const inspectionDigest = digest(inspection); if (materialInspections.size >= 16) materialInspections.delete(materialInspections.keys().next().value!); materialInspections.set(inspectionDigest, { projectId: input.projectId, source: ref, descriptorHash: digest(descriptor), policy, inspection, scriptHashes: pins, legacyAdapterDigest }); return { source: ref, inspectionDigest, inspection };
      } finally { release(); }
    }
    const saved = materialInspections.get(input.inspectionDigest); if (!saved || saved.projectId !== input.projectId || digest(saved.source) !== digest(ref) || saved.descriptorHash !== digest(descriptor) || digest(saved.policy) !== digest(policy) || saved.legacyAdapterDigest !== legacyAdapterDigest || digest(saved.scriptHashes) !== digest(pins)) return blocked("BLENDER_EDIT_INSPECTION_STALE", "Inspect this exact source again before preparing its edit. No automatic inspection or edit was run.");
    const target = saved.inspection.targets.find(target => target.targetId === input.targetId); if (!target?.eligible || !target.originalLinear) return blocked("BLENDER_EDIT_TARGET_UNSUPPORTED", target?.reason ?? "The exact material target is unavailable.");
    const proposal = validateBlenderEditProposal({ format: "studio-blender-material-proposal-v1", projectId: input.projectId, shotId: input.shotId, source: ref, descriptorHash: digest(descriptor), blendSha256: source.sha256, inspectionDigest: input.inspectionDigest, semanticDigest: saved.inspection.semanticDigest, dependenciesDigest: saved.inspection.dependenciesDigest, protectedDigest: saved.inspection.protectedDigest, policy, target, colourSrgb: input.colourSrgb.toUpperCase(), originalLinear: target.originalLinear, requestedLinear: srgbToBlenderLinear(input.colourSrgb, target.originalLinear[3]), adapterVersion: BLENDER_EDIT_ADAPTER, blender: { ...config.blender, version: String(descriptor.inspection.blenderVersion) }, scriptHashes: pins, legacyAdapterDigest });
    return withRepository(repository => repository.prepareBlenderEdit({ projectId: input.projectId, shotId: input.shotId, expectedProjectRevision: input.expectedProjectRevision, requestedAt: input.requestedAt, proposal }, key, ACTOR));
  }
  const context = withRepository(repository => { const job = repository.loadManifest(input.projectId).jobs.find(job => job.jobId === input.jobId); if (!job || !isBlenderEditJob(job)) return blocked("BLENDER_EDIT_MISSING", "The exact native edit was not found."); const execution = readBlenderEditJob(job); if (execution.proposalDigest !== input.proposalDigest || input.approved !== true) return blocked("BLENDER_EDIT_APPROVAL_CHANGED", "Explicit approval must match the exact prepared edit."); return { job, execution, descriptor: repository.readBlenderSource(input.projectId, execution.proposal.source) }; });
  if (context.execution.phase !== "PREPARED") return { jobId: input.jobId, started: false, state: context.execution.phase };
  const proposal = context.execution.proposal, source = approved(config, context.descriptor, input.projectId);
  assertBlenderEditAdapterBinding(proposal, legacyAdapterDigest);
  if (digest(materialPolicy(source)) !== digest(proposal.policy) || digest(pins) !== digest(proposal.scriptHashes) || config.blender.path !== proposal.blender.path || config.blender.sha256 !== proposal.blender.sha256) return blocked("BLENDER_EDIT_PLAN_CHANGED", "Native tools or protected-source policy changed. Prepare a new exact edit.");
  const copy = sourceCopy(config, source), release = lease(config.workRoot, input.jobId, copy.directory); let retained = false;
  try {
    const acquired = withRepository(repository => repository.acquireBlenderEdit(input.projectId, input.jobId, input.proposalDigest, key, ACTOR, input.requestedAt)); if (!acquired.acquired || !acquired.token) return { jobId: input.jobId, started: false };
    const token = acquired.token, jobId = input.jobId, projectId = input.projectId, activeKey = executionKey(projectId, jobId); editExecutions.set(activeKey, { workDirectory: copy.directory }); retained = true;
    void (async () => {
      let ordinal = 0;
      try {
        const result = await applyBlenderMaterialEdit({ blender: config.blender, sourcePath: copy.filename, expectedSourceSha256: source.sha256, workDirectory: copy.directory, adapterScriptDigest: proposal.legacyAdapterDigest, proposal, onProcess: process => { withRepository(repository => repository.checkpointBlenderEdit(projectId, jobId, token, { pid: process.processId, identity: process.identity, executableSha256: config.blender.sha256, startedAt: process.recordedAt }, `native_edit_process_${jobId}_${++ordinal}`, ACTOR, now())); } });
        approved(readBlenderConfiguration(), context.descriptor, projectId);
        assertBlenderEditAdapterBinding(proposal, getBlenderAdapterScripts().digest);
        if (digest(materialPins()) !== digest(proposal.scriptHashes) || digest(materialPolicy(approved(readBlenderConfiguration(), context.descriptor, projectId))) !== digest(proposal.policy)) return blocked("BLENDER_EDIT_PLAN_CHANGED", "Native authority changed before publication.");
        withRepository(repository => repository.publishBlenderEdit(projectId, jobId, token, readFileSync(result.outputPath), result.inspection as unknown as JsonObject, result.verification, `native_edit_publish_${jobId}`, ACTOR, now()));
      } catch (error) { const code = error instanceof BlenderBoundaryError || error instanceof BlenderAdapterError ? error.code : "BLENDER_NATIVE_EDIT_FAILED"; try { withRepository(repository => repository.terminateBlenderEdit(projectId, jobId, token, "FAILED", code, `native_edit_terminal_${jobId}`, ACTOR, now())); } catch { /* Preserve interrupted canonical state; never assume a version was published. */ } }
      finally { editExecutions.delete(activeKey); try { release(); } catch { /* Preserve changed ownership for explicit recovery. */ } }
    })();
    return { jobId, started: true };
  } finally { if (!retained) release(); }
}
