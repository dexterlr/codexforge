"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AssetRef } from "../domain";
import type { BlenderExecution, BlenderProgress, BlenderSourceDescriptor } from "../blender-source-contract";
import type { BlenderEditExecution, BlenderMaterialInspection } from "../blender-edit-contract";
import styles from "./BlenderSourcePanel.module.css";

const ENDPOINT="/api/codexforge/animation-studio/blender";
const HEADERS={"X-CodexForge-Animation-Studio":"local-operator-v1"};
const EDIT_ACTIONS=["inspect-edit","prepare-edit","apply-edit","reconcile-edit"];
type JobView={jobId:string;state:string;execution:BlenderExecution;progress:BlenderProgress|null;active:boolean;interrupted:boolean;outputs:AssetRef[];error:{code:string;message:string}|null};
type EditJobView={jobId:string;state:string;execution:BlenderEditExecution;active:boolean;interrupted:boolean;outputs:AssetRef[];error:{code:string;message:string}|null};
type MaterialReview={source:AssetRef;inspectionDigest:string;inspection:BlenderMaterialInspection};
type State={projectId:string;shotId:string;projectRevision:number;enabled:boolean;unavailable:string|null;inspectionRecovery:boolean;editEnabled?:boolean;editUnavailable?:string|null;catalogue:{sourceId:string;label:string;version:number;lineage:string}[];sources:{assetId:string;version:number;descriptor:BlenderSourceDescriptor}[];jobs:JobView[];editJobs?:EditJobView[];previewMode:string};
type Pending={key:string;body:Record<string,unknown>};
function retainedRequest(raw:string,projectId:string):Pending{
  if(new TextEncoder().encode(raw).length>32768)throw Error("Native recovery record exceeds its bound.");
  const value=JSON.parse(raw) as Pending;
  if(!value||typeof value!=="object"||Object.keys(value).sort().join()!=="body,key"||typeof value.key!=="string"||!/^[a-zA-Z0-9_-]{8,128}$/u.test(value.key)||!value.body||typeof value.body!=="object"||Array.isArray(value.body)||value.body.projectId!==projectId||!["register","prepare","start","cancel","reconcile","reconcile-inspection","use-take","inspect-edit","prepare-edit","apply-edit","reconcile-edit"].includes(String(value.body.action))||typeof value.body.requestedAt!=="string"||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(value.body.requestedAt)||!Number.isFinite(Date.parse(value.body.requestedAt)))throw Error("Native recovery record is invalid.");
  return value;
}
function validTakeReceipt(value:unknown):boolean{
  if(!value||typeof value!=="object")return false;
  const receipt=value as Record<string,unknown>;
  return Number.isSafeInteger(receipt.revision)&&Number(receipt.revision)>0&&typeof receipt.headDigest==="string"&&/^[a-f0-9]{64}$/u.test(receipt.headDigest)&&typeof receipt.takeId==="string"&&/^take_blender_[a-f0-9]{24}$/u.test(receipt.takeId);
}
type Props={projectId:string;shotId:string;compositionId:string;revision:number;headDigest:string;disabled:boolean;onBusyChange:(busy:boolean)=>void;onTakeUsed:()=>void};
export function BlenderSourcePanel({projectId,shotId,compositionId,revision,headDigest,disabled,onBusyChange,onTakeUsed}:Props){
  const [state,setState]=useState<State|null>(null),[error,setError]=useState(""),[notice,setNotice]=useState(""),[working,setWorking]=useState(false),[pending,setPending]=useState<Pending|null>(null);
  const [ready,setReady]=useState(false),[recoveryIssue,setRecoveryIssue]=useState("");
  const [sourceId,setSourceId]=useState(""),[assetKey,setAssetKey]=useState(""),[scene,setScene]=useState(""),[camera,setCamera]=useState(""),[start,setStart]=useState(76),[end,setEnd]=useState(150),[approval,setApproval]=useState("");
  const [preview,setPreview]=useState<AssetRef|null>(null);
  const [materialReview,setMaterialReview]=useState<MaterialReview|null>(null),[targetId,setTargetId]=useState(""),[colourSrgb,setColourSrgb]=useState("#D05030"),[editApproval,setEditApproval]=useState("");
  const [comparisonA,setComparisonA]=useState(""),[comparisonB,setComparisonB]=useState(""),[previewJobId,setPreviewJobId]=useState("");
  const active=useRef(false),mounted=useRef(false),pendingRef=useRef<Pending|null>(null);
  const dialogRef=useRef<HTMLDialogElement|null>(null),triggerRef=useRef<HTMLButtonElement|null>(null);
  const dialogId=`studio-native-plan-${projectId}`,boundaryId=`${dialogId}-boundary`,lockId=`${dialogId}-lock`;
  const storageKey=`codexforge.studio.blender.pending.v1.${projectId}`;
  const editReady=state?.enabled===true&&state.editEnabled===true;
  const editUnavailableReason=editReady?"":state?.editUnavailable||"Typed material editing is unavailable on this runtime. Native preview rendering remains a separate capability.";
  const pendingEditUnavailable=!!pending&&EDIT_ACTIONS.includes(String(pending.body.action))&&!editReady;
  const running=!!(state?.jobs.some(job=>job.active)||state?.editJobs?.some(job=>job.active));
  const chosen=state?.sources.find(item=>`${item.assetId}:${item.version}`===assetKey);
  const scenes=(chosen?.descriptor.inspection.scenes??[]) as {name:string;cameras:string[];activeCamera?:string;frameStart:number;frameEnd:number;fps:number;fpsBase:number}[];
  const selectedScene=scenes.find(item=>item.name===scene);
  const refresh=useCallback(async()=>{
    const response=await fetch(`${ENDPOINT}?${new URLSearchParams({projectId,shotId})}`,{cache:"no-store",credentials:"same-origin",headers:HEADERS});
    const data=await response.json();if(!response.ok||data.ok!==true)throw Error(data.error?.message??"Native status is unavailable. No result has been assumed.");
    const next=data.result as State;if(next.projectId!==projectId||next.shotId!==shotId||!Array.isArray(next.sources)||!Array.isArray(next.jobs)||!Array.isArray(next.catalogue)||next.editJobs!==undefined&&!Array.isArray(next.editJobs))throw Error("Native status did not match this saved shot.");
    if(mounted.current)setState(next);return next;
  },[projectId,shotId]);
  useEffect(()=>{mounted.current=true;const timer=window.setTimeout(()=>{
    try{const raw=sessionStorage.getItem(storageKey);if(raw){const saved=retainedRequest(raw,projectId);pendingRef.current=saved;setPending(saved);}setReady(true);}
    catch{setRecoveryIssue("Native-request recovery could not be read. Nothing was submitted automatically. Keep the tab and resolve its retained browser storage.");setReady(true);}
    void refresh().catch(cause=>setError(cause instanceof Error?cause.message:"Native status unavailable."));
  },0);return()=>{mounted.current=false;window.clearTimeout(timer);};},[refresh,storageKey,projectId]);
  useEffect(()=>{onBusyChange(!ready||!!recoveryIssue||working||running||!!pending);return()=>onBusyChange(false);},[ready,recoveryIssue,working,running,pending,onBusyChange]);
  useEffect(()=>{if(!running)return;const timer=window.setInterval(()=>{if(!active.current)void refresh().catch(cause=>setError(cause instanceof Error?cause.message:"Status polling failed; no completion is assumed."));},2000);return()=>window.clearInterval(timer);},[running,refresh]);
  const send=async(operation:Pending)=>{
    if(!ready||recoveryIssue||disabled||active.current||pendingRef.current&&pendingRef.current!==operation||EDIT_ACTIONS.includes(String(operation.body.action))&&!editReady)return;active.current=true;setWorking(true);setError("");setNotice("");
    try{
      const response=await fetch(ENDPOINT,{method:"POST",cache:"no-store",credentials:"same-origin",headers:{...HEADERS,"Content-Type":"application/json","Idempotency-Key":operation.key},body:JSON.stringify(operation.body)});
      const data=await response.json();
      if(!response.ok||data.ok!==true){
        if(data.ok===false&&response.status>=400&&response.status<500&&![408,429].includes(response.status)){sessionStorage.removeItem(storageKey);pendingRef.current=null;setPending(null);}
        throw Error(`${data.error?.code??"NATIVE_REQUEST_FAILED"}: ${data.error?.message??"No outcome has been assumed. Reload status before another explicit action."}`);
      }
      if(operation.body.action==="use-take"&&!validTakeReceipt(data.result))throw Error("The native admission receipt did not confirm a saved Take. Its exact request remains retained.");
      if(operation.body.action==="inspect-edit"){
        const result=data.result as MaterialReview;
        const exactSource=state?.sources.find(item=>item.assetId===operation.body.assetId&&item.version===operation.body.version);
        if(!exactSource||result?.source?.assetId!==operation.body.assetId||result?.source?.version!==operation.body.version||!/^[a-f0-9]{64}$/u.test(result?.inspectionDigest??"")||result?.inspection?.sourceSha256!==exactSource.descriptor.source.sha256||result.inspection.format!=="studio-blender-material-inspection-v1"||!Array.isArray(result.inspection.targets)||result.inspection.targets.length>256||result.inspection.targets.some(target=>!/^[a-f0-9]{64}$/u.test(target.targetId)||typeof target.eligible!=="boolean"||typeof target.materialName!=="string"||typeof target.nodeName!=="string"||typeof target.socketIdentifier!=="string"||(target.eligible?target.reason!==null:typeof target.reason!=="string")||((target.eligible||target.originalLinear!==null)&&(!Array.isArray(target.originalLinear)||target.originalLinear.length!==4||target.originalLinear.some(value=>typeof value!=="number"||!Number.isFinite(value)||value<0||value>1)))||!Array.isArray(target.users)||target.users.some(value=>typeof value!=="string")))throw Error("Material inspection did not confirm the exact source. Its request remains retained.");
        setMaterialReview(result);setTargetId("");
      }
      if(operation.body.action==="prepare-edit"){
        // Preparation returns the canonical StudioResult, not an unwrapped Job.
        // Keep the exact retry token unless both the saved receipt and its job agree.
        const receipt=data.result,job=receipt?.value,execution=job?.checkpoint?.blenderEdit as BlenderEditExecution|undefined;
        if(receipt?.status!=="APPLIED"||receipt.code!=="BLENDER_EDIT_PREPARED"||!Number.isSafeInteger(receipt.revision)||receipt.revision!==Number(operation.body.expectedProjectRevision)+1||job?.type!=="EDIT"||job.projectId!==projectId||job.shotId!==operation.body.shotId||!/^(?:job_blender_edit_)[a-f0-9]{24}$/u.test(job.jobId??"")||job.state!=="QUEUED"||job.attempt!==0||execution?.format!=="studio-blender-material-execution-v1"||execution.phase!=="PREPARED"||execution.preparedRevision!==receipt.revision||!/^[a-f0-9]{64}$/u.test(execution.proposalDigest)||execution.proposal?.source?.assetId!==operation.body.assetId||execution.proposal.source.version!==operation.body.version||execution.proposal.inspectionDigest!==operation.body.inspectionDigest||execution.proposal.target?.targetId!==operation.body.targetId||execution.proposal.colourSrgb!==operation.body.colourSrgb)throw Error("The response did not confirm the exact prepared native change. Its request remains retained.");
      }
      if(operation.body.action==="apply-edit"&&(data.result?.jobId!==operation.body.jobId||typeof data.result?.started!=="boolean"))throw Error("The response did not confirm this native-edit job. Its request remains retained.");
      const nativeEditAction=EDIT_ACTIONS.includes(String(operation.body.action));
      const releaseRequest=()=>{sessionStorage.removeItem(storageKey);pendingRef.current=null;setPending(null);setApproval("");setEditApproval("");};
      // A successful start receipt without readable saved status is still an
      // unknown native-edit outcome. Keep its exact retry token and parent lock.
      if(!nativeEditAction)releaseRequest();
      // Admission changes the v2 head. Invalidate it immediately after a valid
      // receipt; an unrelated status GET must not leave the parent on stale data.
      if(operation.body.action==="use-take"){onTakeUsed();return;}
      const next=await refresh();
      if(nativeEditAction)releaseRequest();
      if(operation.body.action==="register"){
        const item=next.sources.find(row=>row.descriptor.catalogueId===operation.body.sourceId);
        if(item){setAssetKey(`${item.assetId}:${item.version}`);const first=(item.descriptor.inspection.scenes as {name:string;cameras:string[];activeCamera?:string}[])[0];setScene(first.name);setCamera(first.activeCamera??first.cameras[0]??"");}
      }
      setNotice(operation.body.action==="inspect-edit"?"Exact material inspection received. Choose an eligible target; no material has been changed.":operation.body.action==="prepare-edit"?"Native change prepared, not applied. Review the exact colour conversion and approve the new version separately.":operation.body.action==="apply-edit"?"Native edit started. A new source is available only after save, reopen and semantic verification; no render or timeline replacement was requested.":operation.body.action==="start"?"Exact Start recorded. Progress comes from the owned local process; no provider is contacted.":operation.body.action==="use-take"?"The validated result is now an alternative Take. Add it as a layer with the existing Add a layer controls; that placement supports Undo/Redo. No existing selection was replaced.":operation.body.action==="prepare"?"Exact plan saved. Blender has not started. Review it and explicitly approve Start below.":"Saved native state confirmed.");
    }catch(cause){setError(cause instanceof Error?cause.message:"Request interrupted. Its exact token is retained; nothing will retry automatically.");}
    finally{active.current=false;if(mounted.current)setWorking(false);}
  };
  function act(body:Record<string,unknown>){
    if(!ready||recoveryIssue||active.current||pendingRef.current||disabled||EDIT_ACTIONS.includes(String(body.action))&&!editReady||running&&!["cancel","reconcile","reconcile-edit"].includes(String(body.action)))return;
    try{const operation={key:crypto.randomUUID(),body:{...body,projectId,requestedAt:new Date().toISOString()}};sessionStorage.setItem(storageKey,JSON.stringify(operation));pendingRef.current=operation;setPending(operation);void send(operation);}
    catch{setError("The browser could not retain an exact request token. Nothing was sent.");}
  }
  const locked=disabled||!ready||!!recoveryIssue||working||!!pending;
  const blockedReason=disabled?"Finish or resolve the editor/export activity before a native action.":!ready?"Reading retained native-request state before enabling actions.":recoveryIssue?recoveryIssue:working?"A native request is being confirmed. Wait for its saved response.":pending?"Resolve the retained exact request before another native action.":running?"An owned Blender operation is active. Wait for its confirmed outcome; rendering has a separate explicit cancel action.":!state?.enabled?state?.unavailable??"Reading native readiness…":"";
  const prepareReason=blockedReason||(!chosen?"Choose a registered source before preparing a preview.":!selectedScene||!camera?"Choose a recorded scene and camera.":!Number.isSafeInteger(start)||!Number.isSafeInteger(end)||end<start||end-start>=75||start<selectedScene.frameStart||end>selectedScene.frameEnd?"Choose an inclusive range of 1–75 whole frames within the recorded scene range.":"");
  const selectSource=(value:string)=>{setAssetKey(value);const source=state?.sources.find(item=>`${item.assetId}:${item.version}`===value),first=(source?.descriptor.inspection.scenes as typeof scenes|undefined)?.[0];setScene(first?.name??"");setCamera(first?.activeCamera??first?.cameras[0]??"");setApproval("");setEditApproval("");setMaterialReview(null);setTargetId("");};
  const currentInspection=materialReview&&chosen&&materialReview.source.assetId===chosen.assetId&&materialReview.source.version===chosen.version&&materialReview.inspection.sourceSha256===chosen.descriptor.source.sha256?materialReview:null;
  const selectedTarget=currentInspection?.inspection.targets.find(target=>target.targetId===targetId);
  const editReason=blockedReason||editUnavailableReason||(!chosen?"Choose a registered source version to inspect.":!currentInspection?"Inspect this exact source before choosing a material.":!selectedTarget?"Select an inspected material.":!selectedTarget.eligible?selectedTarget.reason??"This target is not supported.":!/^#[0-9a-fA-F]{6}$/u.test(colourSrgb)?"Enter a six-digit display-sRGB colour, such as #D05030.":"");
  const completedJobs=state?.jobs.filter(job=>job.execution.phase==="COMPLETED"&&job.outputs[0])??[];
  const previewJob=completedJobs.find(job=>job.jobId===previewJobId);
  function reviewJob(job:JobView){if(locked||!job.outputs[0])return;setPreview(job.outputs[0]);setPreviewJobId(job.jobId);}
  const latestJob=state?.jobs.at(-1);
  const latestEdit=state?.editJobs?.at(-1);
  return <section className={styles.summary} aria-label="Native Blender source to Take">
    <h4>Native Blender preview</h4>
    <p>{!state?"Reading status…":latestEdit?.active?"Native version save/reopen running":latestJob?.active?"Preview running":latestEdit?.execution.phase==="PREPARED"?"Native change ready for review":latestJob?.execution.phase==="PREPARED"?"Plan ready for review":latestJob?.execution.phase==="COMPLETED"?"Validated result available":`${state.sources.length} registered source${state.sources.length===1?"":"s"}`}</p>
    {(error||recoveryIssue||pending)&&<p role="status">Native action needs attention. Open the plan for details.</p>}
    <button ref={triggerRef} type="button" aria-haspopup="dialog" aria-controls={dialogId} onClick={()=>{if(dialogRef.current&&!dialogRef.current.open)dialogRef.current.showModal();}}>Open Blender plan</button>
    <dialog ref={dialogRef} id={dialogId} className={styles.dialog} aria-labelledby={`${dialogId}-heading`} onClose={()=>triggerRef.current?.focus({preventScroll:true})}>
      <header className={styles.header}><h2 id={`${dialogId}-heading`}>Native Blender preview plan</h2><button type="button" onClick={()=>dialogRef.current?.close()}>Close Blender plan</button></header>
      <div className={styles.body}>
    <p>Preview an approved local .blend, or prepare one supported material base-colour edit as a new native version. Saving a version, rendering it and using its video as a Take are separate explicit actions. Native rig and animation remain editable; unrestricted Blender editing is not available.</p>
    <p className={styles.muted}>Local execution only · maximum 75 frames · 1280×720 at 25 fps · video only. No cloud/model generation. Opening or closing this plan does not start, cancel or retry work.</p>
    {error&&<p role="alert" className={styles.error}>{error}</p>}{recoveryIssue&&<p role="alert" className={styles.error}>{recoveryIssue}</p>}{notice&&<p role="status">{notice}</p>}
    {pending&&<div className={styles.warning}><p>An exact native request is retained. No automatic retry will occur.</p>{pendingEditUnavailable&&<p id={`${dialogId}-pending-edit`}>{editUnavailableReason} The exact request remains retained; refresh status after the runtime capability is restored.</p>}<button disabled={!ready||!!recoveryIssue||working||disabled||pendingEditUnavailable} aria-describedby={pendingEditUnavailable?`${dialogId}-pending-edit`:undefined} onClick={()=>void send(pending)}>Check by retrying exact native request</button></div>}
    <button type="button" disabled={working} onClick={()=>void refresh().catch(cause=>setError(String(cause)))}>Refresh native status</button>
    <p id={lockId} className={styles.muted}>{blockedReason||"Native actions are available. Start still requires approval of one exact saved plan."}</p>
    {!state?.enabled&&<p className={styles.warning}>{state?.unavailable??"Reading native readiness…"}</p>}
    {state?.inspectionRecovery&&<div className={styles.warning}><p>A previous native inspection was interrupted. No source registration or render completion has been assumed.</p><button disabled={locked} onClick={()=>act({action:"reconcile-inspection"})}>Release verified stopped inspection — no retry</button></div>}
    {state?.jobs.slice().reverse().map(job=>{
      const spec=job.execution.spec,settings=spec.settings,source=state.sources.find(item=>item.assetId===spec.source.assetId&&item.version===spec.source.version);
      const startReason=blockedReason||(!source?"The exact registered source is unavailable. Refresh status before Start.":approval!==job.execution.specDigest?"Tick the exact-plan approval below to enable Start.":"Ready for explicit Start. The server will revalidate the saved source, dependencies, settings and destination.");
      const startDisabled=locked||running||!state.enabled||!source||approval!==job.execution.specDigest;
      return <article key={job.jobId} className={styles.card}>
      <h3>{job.execution.phase==="COMPLETED"?"Validated local Blender result":job.execution.phase==="PREPARED"?"Prepared — awaiting explicit Start":job.interrupted?"Interrupted — completion not assumed":job.execution.phase}</h3>
      <dl className={styles.plan}>
        <div><dt>Native source</dt><dd className={styles.identity}>{source?.descriptor.label??"Exact source unavailable"}</dd><dd className={styles.identity}>{source?.descriptor.source.relativeName??spec.source.assetId} · version {spec.source.version}</dd></div>
        <div><dt>Registered identity</dt><dd className={styles.identity}>{spec.source.assetId} · v{spec.source.version}</dd><dd className={styles.identity}>.blend SHA-256: {spec.blendSha256}</dd></div>
        <div><dt>Scene</dt><dd className={styles.identity}>{settings.scene}</dd></div>
        <div><dt>Camera</dt><dd className={styles.identity}>{settings.camera}</dd></div>
        <div><dt>Exact source range</dt><dd>Frames {settings.frameStart}–{settings.frameEnd} inclusive · {settings.frameEnd-settings.frameStart+1} frames</dd></div>
        <div><dt>Duration and output</dt><dd>{(settings.frameEnd-settings.frameStart+1)/settings.fps} seconds · {settings.width}×{settings.height} · {settings.fps} fps · video only</dd></div>
        <div><dt>Readiness and dependencies</dt><dd>{!state.enabled?state.unavailable??"Native readiness unavailable":!source?"Registered source unavailable":`Registered inspection recorded; ${source.descriptor.dependencies.length} external dependencies. Start rechecks exact source and tool identities.`}</dd></div>
        <div><dt>Destination shot</dt><dd className={styles.identity}>{spec.shotId}</dd><dd>Result becomes a derived video. Use as Take and layer placement remain separate explicit actions.</dd></div>
      </dl>
      {job.progress&&<p role="status">{job.progress.phase} · {job.progress.completedFrames}/{job.progress.totalFrames} actual frames reported</p>}
      {job.error&&<p className={styles.warning}>{job.error.code}: {job.error.message}</p>}
      {job.execution.phase==="PREPARED"&&<><p>Start approves only this hash-bound local preview. It does not approve the character, asset rights or a commercial film. Staging stays on C:; originals are read-only.</p><p id={`${dialogId}-${job.jobId}-start`} className={styles.muted}>{startReason}</p><label className={styles.check}><input type="checkbox" disabled={locked||running||!state.enabled||!source} aria-describedby={`${lockId} ${dialogId}-${job.jobId}-start`} checked={approval===job.execution.specDigest} onChange={event=>setApproval(event.target.checked?job.execution.specDigest:"")}/>I approve this exact bounded local Blender preview.</label><button disabled={startDisabled} aria-describedby={`${dialogId}-${job.jobId}-start`} onClick={()=>act({action:"start",jobId:job.jobId,specDigest:job.execution.specDigest})}>Start approved Blender preview</button></>}
      {job.active&&<button disabled={locked} aria-describedby={lockId} onClick={()=>act({action:"cancel",jobId:job.jobId,specDigest:job.execution.specDigest})}>Cancel owned Blender preview</button>}
      {job.interrupted&&<button disabled={locked} aria-describedby={lockId} onClick={()=>act({action:"reconcile",jobId:job.jobId,specDigest:job.execution.specDigest})}>Record interrupted job — no retry</button>}
      {job.execution.phase==="COMPLETED"&&job.outputs[0]&&<><p>Server-generated local render · technically validated · creative review still needed. Existing Takes and layers are unchanged.</p><div className={styles.actions}><button disabled={locked} aria-describedby={lockId} onClick={()=>reviewJob(job)}>Review Blender result</button><button disabled={locked||running} aria-describedby={lockId} onClick={()=>act({action:"use-take",jobId:job.jobId,compositionId,expectedRevision:revision,expectedHeadDigest:headDigest})}>Use as Take</button></div></>}
      <details><summary>Exact plan, source binding and job provenance</summary><pre>{JSON.stringify(job,null,2)}</pre></details>
    </article>;})}
    {completedJobs.length>=2&&<fieldset className={styles.fields} disabled={locked} aria-describedby={`${dialogId}-comparison`}>
      <legend>A/B output review</legend>
      <p id={`${dialogId}-comparison`} className={styles.wide}>View-only comparison through one player. Choosing A or B does not edit a layer, admit a Take, start a render or replace anything.</p>
      <label className={styles.field}>Output A<select value={comparisonA} onChange={event=>setComparisonA(event.target.value)}><option value="">Choose baseline output</option>{completedJobs.map(job=><option key={job.jobId} value={job.jobId}>Source v{job.execution.spec.source.version} · {job.jobId}</option>)}</select></label>
      <label className={styles.field}>Output B<select value={comparisonB} onChange={event=>setComparisonB(event.target.value)}><option value="">Choose changed output</option>{completedJobs.map(job=><option key={job.jobId} value={job.jobId}>Source v{job.execution.spec.source.version} · {job.jobId}</option>)}</select></label>
      <button type="button" disabled={!completedJobs.some(job=>job.jobId===comparisonA)} aria-pressed={!!comparisonA&&previewJobId===comparisonA} onClick={()=>{const job=completedJobs.find(item=>item.jobId===comparisonA);if(job)reviewJob(job);}}>View A</button>
      <button type="button" disabled={!completedJobs.some(job=>job.jobId===comparisonB)||comparisonA===comparisonB} aria-pressed={!!comparisonB&&previewJobId===comparisonB} onClick={()=>{const job=completedJobs.find(item=>item.jobId===comparisonB);if(job)reviewJob(job);}}>View B</button>
    </fieldset>}
    {preview&&<div className={styles.card}>{previewJob&&<p className={styles.identity}>Reviewing {previewJobId===comparisonA?"A":previewJobId===comparisonB?"B":"output"} · source {previewJob.execution.spec.source.assetId} v{previewJob.execution.spec.source.version} · .blend SHA-256 {previewJob.execution.spec.blendSha256} · render job {previewJob.jobId} · derived video {preview.assetId} v{preview.version}</p>}<video key={`${preview.assetId}:${preview.version}`} aria-label="Validated native Blender result" controls preload="metadata" className={styles.video} src={`/api/codexforge/animation-studio/footage?${new URLSearchParams({projectId,assetId:preview.assetId,version:String(preview.version)})}`}/><button onClick={()=>{setPreview(null);setPreviewJobId("");}}>Close native result</button></div>}
    <section className={styles.card} aria-labelledby={`${dialogId}-material-heading`}>
      <h3 id={`${dialogId}-material-heading`}>Versioned native material edit</h3>
      <p>Only an inspected, independently assigned supported material base colour is editable. The original .blend, scene animation, camera and protected laptop/display remain unchanged. Unsupported targets explain why; no graph, driver or shader is silently replaced.</p>
      <p id={`${dialogId}-edit-capability`} className={editReady?styles.muted:styles.warning}>{editUnavailableReason||"Typed material editing is enabled with pinned application scripts. Inspection, preparation and application remain separate explicit actions."}</p>
      <fieldset className={styles.fields} disabled={locked||running||!editReady} aria-describedby={`${lockId} ${dialogId}-colour ${dialogId}-edit-capability`}>
        <legend>Inspect an exact source version</legend>
        <label className={styles.field}>Native source to edit<select value={assetKey} onChange={event=>selectSource(event.target.value)}><option value="">Choose a registered version</option>{state?.sources.map(item=><option key={`${item.assetId}:${item.version}`} value={`${item.assetId}:${item.version}`}>{item.descriptor.label} · v{item.version} · {item.descriptor.source.sha256.slice(0,12)}</option>)}</select></label>
        <button type="button" disabled={!chosen} onClick={()=>chosen&&act({action:"inspect-edit",shotId,assetId:chosen.assetId,version:chosen.version})}>Inspect material edit targets</button>
        {chosen&&<p className={`${styles.wide} ${styles.identity}`}>Exact source: {chosen.assetId} · v{chosen.version} · SHA-256 {chosen.descriptor.source.sha256}</p>}
        {currentInspection&&<><label className={styles.field}>Inspected material<select value={targetId} onChange={event=>{setTargetId(event.target.value);setEditApproval("");}}><option value="">Choose a material</option>{currentInspection.inspection.targets.map(target=><option key={target.targetId} value={target.targetId}>{target.materialName} · {target.eligible?"eligible":"unsupported"}</option>)}</select></label><p className={styles.wide}>{currentInspection.inspection.targets.length===0?"No eligible material data was returned. No change is available.":`${currentInspection.inspection.targets.filter(target=>target.eligible).length} eligible target(s). Select any entry to review eligibility and affected objects.`}</p></>}
        {selectedTarget&&<div className={`${styles.wide} ${styles.target}`}><p>Material: {selectedTarget.materialName} · {selectedTarget.nodeName} / {selectedTarget.socketIdentifier}</p><p>Affected objects: {selectedTarget.users.join(", ")||"No assigned objects"}</p><p>Existing native scene-linear RGBA: {JSON.stringify(selectedTarget.originalLinear)}</p><p className={selectedTarget.eligible?styles.muted:styles.warning}>{selectedTarget.eligible?"Eligible for this single base-colour operation.":`Unsupported: ${selectedTarget.reason}`}</p></div>}
        <label className={styles.field}>New display-sRGB colour<input type="text" value={colourSrgb} maxLength={7} pattern="#[0-9a-fA-F]{6}" spellCheck={false} aria-describedby={`${dialogId}-colour`} onChange={event=>{setColourSrgb(event.target.value);setEditApproval("");}}/></label>
        <p id={`${dialogId}-colour`} className={styles.wide}>Enter #RRGGBB in display sRGB. Studio converts RGB to scene-linear sRGB for Blender and preserves alpha. The saved proposal below shows the exact original and requested native values before approval.</p>
        <p id={`${dialogId}-edit-reason`} className={styles.wide}>{editReason||"Preparing records a source-bound change summary only. It does not apply the edit or render."}</p>
        <button type="button" disabled={!!editReason} aria-describedby={`${dialogId}-edit-reason`} onClick={()=>state&&chosen&&currentInspection&&selectedTarget?.eligible&&act({action:"prepare-edit",shotId,assetId:chosen.assetId,version:chosen.version,expectedProjectRevision:state.projectRevision,inspectionDigest:currentInspection.inspectionDigest,targetId:selectedTarget.targetId,colourSrgb:colourSrgb.toUpperCase()})}>Prepare native colour change</button>
      </fieldset>
      {state?.editJobs?.slice().reverse().map(job=>{
        const execution=job.execution,proposal=execution.proposal,source=state.sources.find(item=>item.assetId===proposal.source.assetId&&item.version===proposal.source.version),newSource=state.sources.find(item=>item.assetId===execution.source?.assetId&&item.version===execution.source?.version);
        const applyReason=blockedReason||editUnavailableReason||(!source?"The proposal's exact source is unavailable.":editApproval!==execution.proposalDigest?"Tick approval for this exact saved native change.":"Ready to create a new native version. The original and older versions are retained.");
        const verified=execution.phase==="COMPLETED"&&execution.verification?.reopened===true&&execution.verification?.onlyIntendedChange===true&&!!newSource&&execution.verification.outputSha256===newSource.descriptor.source.sha256;
        return <article key={job.jobId} className={styles.card}>
          <h4>{verified?"New native version verified":job.interrupted?"Native edit interrupted — no success assumed":execution.phase==="PREPARED"?"Prepared native change — awaiting approval":`Native edit: ${execution.phase}`}</h4>
          <dl className={styles.plan}>
            <div><dt>Source version</dt><dd className={styles.identity}>{proposal.source.assetId} · v{proposal.source.version}</dd><dd className={styles.identity}>SHA-256 {proposal.blendSha256}</dd></div>
            <div><dt>Exact target and affected objects</dt><dd>{proposal.target.materialName} · {proposal.target.nodeName} / {proposal.target.socketIdentifier}</dd><dd className={styles.identity}>{proposal.target.users.join(", ")}</dd></div>
            <div><dt>Requested display-sRGB</dt><dd>{proposal.colourSrgb}</dd></div>
            <div><dt>Native scene-linear RGBA</dt><dd>Original: {JSON.stringify(proposal.originalLinear)}</dd><dd>New: {JSON.stringify(proposal.requestedLinear)}</dd></div>
            <div><dt>Protected elements</dt><dd className={styles.identity}>{proposal.policy.protectedObjects.join(", ")}</dd><dd className={styles.identity}>Materials: {proposal.policy.protectedMaterials.join(", ")}</dd></div>
            <div><dt>Native edit job</dt><dd className={styles.identity}>{job.jobId}</dd><dd className={styles.identity}>Proposal {execution.proposalDigest}</dd></div>
          </dl>
          {job.error&&<p className={styles.warning}>{job.error.code}: {job.error.message}</p>}
          {execution.phase==="PREPARED"&&<><p id={`${dialogId}-${job.jobId}-apply`}>{applyReason}</p><label className={styles.check}><input type="checkbox" checked={editApproval===execution.proposalDigest} disabled={locked||running||!editReady||!source} aria-describedby={`${dialogId}-${job.jobId}-apply`} onChange={event=>setEditApproval(event.target.checked?execution.proposalDigest:"")}/>I approve this exact native colour change and creation of a new editable version.</label><button type="button" disabled={locked||running||!editReady||!source||editApproval!==execution.proposalDigest} aria-describedby={`${dialogId}-${job.jobId}-apply`} onClick={()=>act({action:"apply-edit",jobId:job.jobId,proposalDigest:execution.proposalDigest,approved:true})}>Apply approved native change</button></>}
          {job.active&&<p role="status">Owned native edit is running. Save and reopen verification must complete before publication. No render or timeline replacement is implied.</p>}
          {job.interrupted&&<button type="button" disabled={locked||running||!editReady} aria-describedby={`${lockId} ${dialogId}-edit-capability`} onClick={()=>act({action:"reconcile-edit",jobId:job.jobId,proposalDigest:execution.proposalDigest})}>Record interrupted native edit — no retry</button>}
          {verified&&newSource&&<><p className={styles.identity}>Saved and reopened: {newSource.assetId} v{newSource.version} · SHA-256 {newSource.descriptor.source.sha256}. Semantic comparison confirms only the intended property changed. Rendering and creative review are still separate.</p><button type="button" disabled={locked||running} aria-describedby={lockId} onClick={()=>{selectSource(`${newSource.assetId}:${newSource.version}`);setNotice("The new native source is selected. Open Prepare a short preview below, review its exact source/range, then prepare and explicitly Start a new render.");}}>Select edited source for a separate preview</button></>}
          {execution.phase==="COMPLETED"&&!verified&&<p className={styles.warning}>The new source and reopen verification are not both available. No native-version success is assumed.</p>}
          <details><summary>Exact native change and verification provenance</summary><pre>{JSON.stringify(job,null,2)}</pre></details>
        </article>;
      })}
    </section>
    <details className={styles.setup} open={state?.jobs.length===0}><summary>Register a source or prepare another preview</summary>
    <fieldset disabled={locked||running||!state?.enabled} className={styles.fields} aria-describedby={`${boundaryId} ${lockId}`}>
      <legend>Register a server-approved source</legend>
      <label className={styles.field}>Approved native source<select value={sourceId} onChange={event=>setSourceId(event.target.value)}><option value="">Choose a designated source</option>{state?.catalogue.map(item=><option key={item.sourceId} value={item.sourceId}>{item.label}</option>)}</select></label>
      <button type="button" disabled={!sourceId||state?.sources.some(item=>item.descriptor.catalogueId===sourceId)} onClick={()=>state&&act({action:"register",shotId,expectedProjectRevision:state.projectRevision,sourceId})}>Inspect and register native source</button>
      <p id={boundaryId} className={styles.wide}>Only explicitly configured source IDs are accepted. Embedded automatic scripts are disabled; that is not a complete security sandbox. The initial profile requires self-contained files without unsupported drivers, simulations or external dependencies. Rights and final character quality are not approved by technical admission.</p>
    </fieldset>
    <fieldset disabled={locked||running||!state?.enabled} className={styles.fields} aria-describedby={lockId}>
      <legend>Prepare a short preview</legend>
      <label className={styles.field}>Registered Blender source<select value={assetKey} onChange={event=>selectSource(event.target.value)}><option value="">Choose a registered source</option>{state?.sources.map(item=><option key={`${item.assetId}:${item.version}`} value={`${item.assetId}:${item.version}`}>{item.descriptor.label} · v{item.version} · {item.descriptor.source.sha256.slice(0,12)}</option>)}</select></label>
      {chosen&&<><p className={`${styles.wide} ${styles.identity}`}>{chosen.descriptor.label} · {chosen.descriptor.source.relativeName} · Native source registered · dependencies verified · Blender {String(chosen.descriptor.inspection.blenderVersion)}</p><details className={styles.wide}><summary>Native source, dependencies and provenance</summary><pre>{JSON.stringify(chosen,null,2)}</pre></details></>}
      <label className={styles.field}>Scene<select value={scene} onChange={event=>{setScene(event.target.value);setCamera(scenes.find(row=>row.name===event.target.value)?.cameras[0]??"");}}><option value="">Choose scene</option>{scenes.map(item=><option key={item.name}>{item.name}</option>)}</select></label>
      <label className={styles.field}>Camera<select value={camera} onChange={event=>setCamera(event.target.value)}><option value="">Choose camera</option>{selectedScene?.cameras.map(item=><option key={item}>{item}</option>)}</select></label>
      <label className={styles.field}>First source frame<input type="number" min={selectedScene?.frameStart??1} max={selectedScene?.frameEnd??1000000} value={Number.isNaN(start)?"":start} onChange={event=>setStart(event.target.valueAsNumber)}/></label>
      <label className={styles.field}>Last source frame (inclusive)<input type="number" min={start} max={Math.min(start+74,selectedScene?.frameEnd??1000000)} value={Number.isNaN(end)?"":end} onChange={event=>setEnd(event.target.valueAsNumber)}/></label>
      <p id={`${dialogId}-prepare`} className={styles.wide}>{prepareReason||"Preparing saves the exact plan for review. It does not start Blender."}</p>
      <button type="button" disabled={!!prepareReason} aria-describedby={`${dialogId}-prepare`} onClick={()=>state&&chosen&&act({action:"prepare",shotId,expectedProjectRevision:state.projectRevision,assetId:chosen.assetId,version:chosen.version,scene,camera,frameStart:start,frameEnd:end})}>Prepare preview plan</button>
    </fieldset>
    </details>
    <p className={styles.muted}>{state?.previewMode}</p>
      </div>
    </dialog>
  </section>;
}
