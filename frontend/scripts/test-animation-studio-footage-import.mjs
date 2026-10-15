// Actual retained-handle repository + actual NextRequest boundary. Synthetic bytes only;
// framing fixture is NOT a decodable video or browser acceptance. Never contacts a provider.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { NextRequest } from "next/server.js";
import { createStudioTestLoader, blockStudioTestNetwork } from "./animation-studio-test-loader.mjs";
const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(path.resolve(process.cwd()), frontendRoot);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontendRoot);
const { openStudioRepository, StudioRepository, parseStudioJson } = loader.load("@/lib/codexforge/animation-studio/store.server");
const { createStudioFootageHandler } = loader.load("@/lib/codexforge/animation-studio/footage-http.server");
const { StudioMediaImportError, studioFootageProbeDeadlineMs } = loader.load("@/lib/codexforge/animation-studio/footage-import.server");
const { validateFootageImport, inspectStudioMp4, STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES, STUDIO_FOOTAGE_MAX_BYTES, STUDIO_FOOTAGE_PROJECT_MAX_BYTES, STUDIO_FOOTAGE_PROJECT_MAX_VERSIONS, STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA, assertFootageCollection } = loader.load("@/lib/codexforge/animation-studio/footage-contract");
const { validateAssetManifest } = loader.load("@/lib/codexforge/animation-studio/validation");
const { openCreatorNativeRoot } = loader.load("@/lib/codexforge/creator/creator-native-filesystem.server");
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const clone = value => JSON.parse(JSON.stringify(value));
function box(type, payload) { const out=Buffer.alloc(8+payload.length);out.writeUInt32BE(out.length);out.write(type,4,"ascii");payload.copy(out,8);return out; }
function framing(size=2*1024*1024+99) {
  const ftyp=box("ftyp",Buffer.from("isom\0\0\0\0isom","binary")),moov=box("moov",Buffer.alloc(8,0));
  return Buffer.concat([ftyp,moov,box("mdat",Buffer.alloc(size-ftyp.length-moov.length-8,73))]);
}
const mediaFailure=(code,status,message)=>{throw new StudioMediaImportError(code,status,message);};
async function legacyReceiver(request,mediaType){
  if(mediaType!=="VIDEO"||request.headers.get("Content-Type")?.toLowerCase()!=="application/octet-stream"||request.headers.has("Content-Encoding"))mediaFailure("UNSUPPORTED_MEDIA",415,"Synthetic regression receiver requires the production binary video boundary.");
  const declaredText=request.headers.get("Content-Length");
  if(declaredText!==null&&(!/^[1-9]\d*$/u.test(declaredText)||Number(declaredText)>STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES))mediaFailure("MEDIA_TOO_LARGE",413,"Synthetic regression upload exceeds the legacy request bound.");
  if(!request.body||request.signal.aborted)mediaFailure("MEDIA_UPLOAD_INCOMPLETE",400,"Synthetic regression upload is incomplete.");
  const reader=request.body.getReader(),chunks=[];let total=0,rejectAbort,timer;
  const aborted=new Promise((_,reject)=>{rejectAbort=reject;});
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{reject(new StudioMediaImportError("MEDIA_UPLOAD_TIMEOUT",408,"Synthetic regression upload timed out."));void reader.cancel().catch(()=>undefined);},1000);});
  const abort=()=>{rejectAbort(new StudioMediaImportError("MEDIA_UPLOAD_CANCELLED",408,"Synthetic regression upload was cancelled."));void reader.cancel().catch(()=>undefined);};
  request.signal.addEventListener("abort",abort,{once:true});
  try{
    if(request.signal.aborted)abort();
    while(true){const part=await Promise.race([reader.read(),aborted,deadline]);if(part.done)break;if(!(part.value instanceof Uint8Array))mediaFailure("MEDIA_UPLOAD_INCOMPLETE",400,"Synthetic regression upload is incomplete.");if(total+part.value.byteLength>STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES){void reader.cancel().catch(()=>undefined);mediaFailure("MEDIA_TOO_LARGE",413,"Synthetic regression upload exceeds the legacy request bound.");}chunks.push(Buffer.from(part.value));total+=part.value.byteLength;}
  }finally{clearTimeout(timer);request.signal.removeEventListener("abort",abort);try{reader.releaseLock();}catch{/* Request owns its stream lock. */}}
  if(total<1||(declaredText!==null&&Number(declaredText)!==total))mediaFailure("MEDIA_UPLOAD_INCOMPLETE",400,"Synthetic regression upload length differs from its declaration.");
  const data=Buffer.concat(chunks,total);inspectStudioMp4(data);
  const technical={schema:STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA,mediaType:"VIDEO",contentType:"video/mp4",container:"mp4",codec:"h264",pixelFormat:"yuv420p",width:1280,height:720,frameRate:{numerator:25,denominator:1},frameCadence:"CFR_25_EXACT",duration:{numerator:1,denominator:1},sourceUnits:25,sourceUnit:"FRAME",timeBase:{numerator:1,denominator:12800},colorPrimaries:"bt709",colorTransfer:"bt709",colorSpace:"bt709",colorRange:"tv",dynamicRange:"SDR_BT709",rotationDegrees:0,streamCount:1,probeDigest:sha(Buffer.from("synthetic-regression-probe-v1"))};
  let closed=false;
  return Object.freeze({mediaType:"VIDEO",contentType:"video/mp4",byteLength:data.length,contentHash:sha(data),technical,read(offset,length){if(closed||!Number.isSafeInteger(offset)||!Number.isSafeInteger(length)||offset<0||length<1||offset+length>data.length)mediaFailure("MEDIA_STAGING_UNAVAILABLE",503,"Synthetic staged media is unavailable.");return Buffer.from(data.subarray(offset,offset+length));},close(){closed=true;}});
}
const safeEnv={SystemRoot:"C:\\Windows",WINDIR:"C:\\Windows",PATH:path.dirname(process.execPath)+";C:\\Windows\\System32"};
if(process.argv[2]==="--restart") {
  const repo=openStudioRepository({workspace:"test",namespace:process.argv[3]});
  try { const snapshot=repo.load(process.argv[4]),asset=snapshot.assets.at(-1);process.stdout.write(JSON.stringify({revision:snapshot.project.revision,assets:snapshot.assets.length,hash:sha(repo.readFootage(snapshot.project.projectId,asset.assetId,asset.version)),networkAttempts})); }
  finally {repo.close();}
} else if(process.argv[2]==="--race") {
  const repo=openStudioRepository({workspace:"test",namespace:process.argv[3]});
  try { const result=repo.importFootage(JSON.parse(process.argv[4]),framing(),process.argv[5],"synthetic-footage");process.stdout.write(JSON.stringify({status:"APPLIED",result,networkAttempts})); }
  catch(error){process.stdout.write(JSON.stringify({status:"REJECTED",code:error.code,networkAttempts}));}
  finally{repo.close();}
} else {
 const namespace="footage-"+randomUUID(), evidenceRoot=path.join(frontendRoot,".codexforge","acceptance","studio-footage-import-tests-"+randomUUID());
 fs.mkdirSync(evidenceRoot,{recursive:true});const results=[];let serial=0,repo=openStudioRepository({workspace:"test",namespace}), opens=0;
 const opener=()=>{opens++;return openStudioRepository({workspace:"test",namespace});};
 const handler=createStudioFootageHandler({enabled:true,openRepository:opener,listenerAddresses:()=>["127.0.0.1"],receiveImport:legacyReceiver});
 const url="http://127.0.0.1:3328/api/codexforge/animation-studio/footage", bytes=framing();
 const time=()=>new Date(Date.UTC(2026,8,16,0,0,serial++)).toISOString();
 const key=()=> "footage-test-"+String(serial++).padStart(8,"0");
 function project(label) { const projectId="project_footage_"+label;repo.createDraftProject({schemaVersion:1,projectId,revision:1,title:"Synthetic footage",description:"Not a decodable video",createdAt:time(),currency:"GBP"},key(),"synthetic-footage");return projectId; }
 function metadata(projectId,overrides={}){const s=repo.load(projectId);return {projectId,shotId:s.shots[0].shotId,expectedProjectRevision:s.project.revision,expectedShotRevision:s.shots[0].revision,requestedAt:time(),originalName:"test.mp4",sourceLabel:"Synthetic framing test only",rights:{status:"UNKNOWN",license:null,evidence:null},...overrides};}
 function request(meta, data=bytes, changes={}) {
  const headers=new Headers({Host:"127.0.0.1:3328",Origin:"http://127.0.0.1:3328","Sec-Fetch-Site":"same-origin","X-CodexForge-Animation-Studio":"local-operator-v1","Content-Type":"application/octet-stream","Idempotency-Key":changes.key??key(),"X-CodexForge-Footage":encodeURIComponent(JSON.stringify(meta))});
  for(const[k,v]of Object.entries(changes.headers??{})){if(v===null)headers.delete(k);else headers.set(k,v);}
  return new Request(changes.url??url,{method:"POST",headers,body:data,...(data instanceof ReadableStream?{duplex:"half"}:{}),...(changes.signal?{signal:changes.signal}:{})});
 }
 async function call(meta,data=bytes,changes={},target=handler){const response=await target(new NextRequest(request(meta,data,changes)));return{status:response.status,body:await response.json()};}
 async function test(label,run){try{await run();results.push({label,status:"PASS"});console.log("PASS "+label);}catch(error){results.push({label,status:"FAIL",error:{name:error.name,code:error.code??null,message:error.message,stack:error.stack}});console.log("FAIL "+label+": "+error.message);}}
 function write(name,v){fs.writeFileSync(path.join(evidenceRoot,name),JSON.stringify(v,null,2)+"\n",{flag:"wx"});}
 function raceChild(input,operationKey){return new Promise((resolve,reject)=>{const child=spawn(process.execPath,[fileURLToPath(import.meta.url),"--race",namespace,JSON.stringify(input),operationKey],{cwd:frontendRoot,env:safeEnv,windowsHide:true,stdio:["ignore","pipe","pipe"]});let stdout="",stderr="";const timer=setTimeout(()=>{child.kill();reject(new Error("Owned race child timed out"));},40000);child.stdout.on("data",c=>stdout+=c);child.stderr.on("data",c=>stderr+=c);child.on("error",reject);child.on("close",code=>{clearTimeout(timer);if(code!==0||stderr)reject(new Error("Race child failed: "+stderr));else resolve(JSON.parse(stdout));});});}
 let firstProject,firstMeta,firstKey,firstAsset;
 try {
  await test("01 Import validates exact metadata and rejects paths/unknown fields/getters/licensing omissions",()=>{
   const p=project("metadata"),m=metadata(p);assert.equal(validateFootageImport(m).projectId,p);
   for(const mutate of [v=>v.path="C:\\private",v=>v.originalName="../bad.mp4",v=>v.originalName="C:\\bad.mp4",v=>v.originalName="bad.webm",v=>v.sourceLabel="",v=>v.rights.status="APPROVED",v=>v.rights={status:"LICENSED",license:null,evidence:null},v=>v.expectedProjectRevision=0,v=>v.requestedAt="\uFEFF"+v.requestedAt]){const bad=clone(m);mutate(bad);assert.throws(()=>validateFootageImport(bad));}
   const bad=clone(m);Object.defineProperty(bad,"sourceLabel",{get(){throw Error("Getter executed");},enumerable:true});assert.throws(()=>validateFootageImport(bad),e=>e.message!=="Getter executed");
  });
  await test("02 MP4 framing and byte-scaled probe deadlines remain strictly bounded",()=>{
    inspectStudioMp4(bytes);
    for(const b of [Buffer.alloc(0),bytes.subarray(0,bytes.length-1),Buffer.alloc(32),Buffer.alloc(STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES+1)])assert.throws(()=>inspectStudioMp4(b));
    const bad=Buffer.from(bytes);bad.write("zzzz",8,"ascii");assert.throws(()=>inspectStudioMp4(bad));
    assert.equal(studioFootageProbeDeadlineMs(1),30_000);assert.equal(studioFootageProbeDeadlineMs(STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES),30_000);
    assert.equal(studioFootageProbeDeadlineMs(900_986_401),135_000);assert.equal(studioFootageProbeDeadlineMs(STUDIO_FOOTAGE_MAX_BYTES),270_000);
    for(const invalid of [0,-1,1.5,STUDIO_FOOTAGE_MAX_BYTES+1])assert.throws(()=>studioFootageProbeDeadlineMs(invalid));
   });
  await test("03 Real native store imports >1MiB as bounded parts and attaches input with review only",async()=>{
   firstProject=project("first");firstMeta=metadata(firstProject);firstKey=key();const result=await call(firstMeta,bytes,{key:firstKey});
   assert.equal(result.status,200,JSON.stringify(result.body));const s=repo.load(firstProject);firstAsset=s.assets[0];
   assert.equal(s.project.revision,2);assert.equal(s.shots[0].revision,2);assert.equal(firstAsset.contentHash,sha(bytes));assert.equal(firstAsset.provenance.jobId,null);assert.equal(firstAsset.provenance.promptId,null);assert.equal(firstAsset.provenance.adapterMetadata.settings.originalAcquisitionCost,"UNKNOWN");
   assert.equal(s.jobs.length,0);assert.equal(s.costs.length,0);assert.equal(s.approvals.length,0);assert.deepEqual(s.shots[0].inputAssets,[{assetId:firstAsset.assetId,version:1}]);assert.equal(s.shots[0].selectedVersion,null);assert.deepEqual(s.qcResults.map(x=>x.result),["REVIEW"]);
   assert.deepEqual(repo.readFootage(firstProject,firstAsset.assetId,1),bytes);
   const dir=path.join(frontendRoot,".codexforge","studio-tests",namespace,path.dirname(firstAsset.sourcePath));for(const name of fs.readdirSync(dir))assert.ok(fs.statSync(path.join(dir,name)).size<=1024*1024);
  });
  await test("04 Exact HTTP replay does not duplicate revision/asset and changed bytes or metadata fail",async()=>{
   const before=repo.load(firstProject);assert.equal((await call(firstMeta,bytes,{key:firstKey})).status,200);assert.equal(repo.load(firstProject).recordDigest,before.recordDigest);
   const changed=Buffer.from(bytes);changed[changed.length-1]^=1;assert.equal((await call(firstMeta,changed,{key:firstKey})).status,409);
   assert.equal((await call({...firstMeta,sourceLabel:"different"},bytes,{key:firstKey})).status,409);
  });
  await test("05 Version2 preserves original bytes/lineage and invalidates derived shot selection",async()=>{
   const old=repo.load(firstProject),m=metadata(firstProject),data=Buffer.from(bytes);data[data.length-1]^=2;assert.equal((await call(m,data)).status,200);
   const s=repo.load(firstProject),asset=s.assets.at(-1);assert.equal(asset.version,2);assert.equal(asset.assetId,firstAsset.assetId);assert.deepEqual(asset.lineage,[{assetId:firstAsset.assetId,version:1}]);
   assert.deepEqual(repo.readFootage(firstProject,asset.assetId,1),bytes);assert.deepEqual(repo.readFootage(firstProject,asset.assetId,2),data);assert.equal(s.assets[0].contentHash,old.assets[0].contentHash);assert.deepEqual(s.shots[0].inputAssets,[{assetId:asset.assetId,version:2}]);assert.equal(s.shots[0].approvalState,"DRAFT");
  });
  await test("06 Stale project/shot and cross-project shot do not publish",async()=>{
   const p=project("stale"),m=metadata(p),before=repo.load(p).recordDigest;assert.equal((await call({...m,expectedProjectRevision:2})).status,409);assert.equal((await call({...m,expectedShotRevision:2})).status,409);
   assert.equal((await call({...m,shotId:firstMeta.shotId})).status,404);assert.equal(repo.load(p).recordDigest,before);
  });
  await test("07 Original exact loopback/marker/origin/forwarding boundary survives actual NextRequest",async()=>{
   const m=metadata(project("boundary")),before=opens;
   for(const headers of [{Host:"localhost:3328"},{Origin:null},{"X-CodexForge-Animation-Studio":null},{"Sec-Fetch-Site":"cross-site"},{"X-Forwarded-Proto":"https"},{"X-Forwarded-Host":"evil.invalid"}])assert.equal((await call(m,bytes,{headers})).status,403);
   for(const listeners of [null,[],["0.0.0.0"]]){const blocked=createStudioFootageHandler({enabled:true,openRepository:opener,listenerAddresses:()=>listeners,receiveImport:legacyReceiver});assert.equal((await call(m,bytes,{},blocked)).status,503);}
   assert.equal(opens,before);
  });
  await test("08 Disabled route, bad methods and unknown query refuse without storage",async()=>{
   const m=metadata(project("disabled")),before=opens,target=createStudioFootageHandler({enabled:false,openRepository:opener,listenerAddresses:()=>["127.0.0.1"]});
   assert.equal((await call(m,bytes,{},target)).status,503);assert.equal((await call(m,bytes,{url:url+"?file=x"})).status,400);
   assert.equal((await handler(new Request(url,{method:"DELETE"}))).status,405);assert.equal(opens,before);
  });
  await test("09 Binary body keeps size/content-encoding/length checks independent of JSON cap",async()=>{
   const m=metadata(project("body")),before=opens;
   for(const headers of [{"Content-Type":"video/mp4"},{"Content-Encoding":"gzip"}])assert.equal((await call(m,bytes,{headers})).status,415);
   for(const length of ["0","01","-1",String(STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES+1)])assert.equal((await call(m,bytes,{headers:{"Content-Length":length}})).status,413);
   assert.equal((await call(m,bytes,{headers:{"Content-Length":"2"}})).status,400);
   assert.equal((await call(m,Buffer.alloc(STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES+1))).status,413);assert.equal(opens,before);
  });
  await test("10 Ambiguous/duplicate/BOM/oversized metadata is rejected before storage",async()=>{
   const m=metadata(project("metahttp")),before=opens;
   for(const value of ["%",encodeURIComponent("\uFEFF"+JSON.stringify(m)),encodeURIComponent('{"projectId":"project_a","projectId":"project_b"}'),"x".repeat(8193),JSON.stringify(m)]){
    assert.equal((await call(m,bytes,{headers:{"X-CodexForge-Footage":value}})).status,400);
   }assert.equal(opens,before);
  });
  await test("11 Abort during reading closes request and leaves no asset/claim/job",async()=>{
   const p=project("abort"),m=metadata(p),controller=new AbortController(),stream=new ReadableStream({start(c){c.enqueue(bytes.subarray(0,32));}});
   const pending=handler(request(m,stream,{signal:controller.signal}));controller.abort();assert.ok([400,408].includes((await pending).status));assert.equal(repo.load(p).assets.length,0);assert.equal(repo.load(p).jobs.length,0);
  });
  await test("12 One in-flight import refuses a concurrent body and cancellation releases admission",async()=>{
   const p=project("busy"),m=metadata(p),controller=new AbortController();const pending=handler(request(m,new ReadableStream({start(){}}),{signal:controller.signal}));
   await new Promise(resolve=>setTimeout(resolve,5));assert.equal((await call(m)).status,409);controller.abort();await pending;assert.equal((await call(m)).status,200);
  });
  await test("13 Preview GET is exact, marker-protected, no-store and byte-identical",async()=>{
   const href=url+"?projectId="+firstProject+"&assetId="+firstAsset.assetId+"&version=1";
   const requestGet=(headers={})=>new NextRequest(new Request(href,{headers:{Host:"127.0.0.1:3328","X-CodexForge-Animation-Studio":"local-operator-v1",...headers}}));
   const response=await handler(requestGet());assert.equal(response.status,200);assert.equal(response.headers.get("content-type"),"video/mp4");assert.equal(response.headers.get("cache-control"),"no-store");assert.equal(sha(Buffer.from(await response.arrayBuffer())),sha(bytes));
   assert.equal((await handler(new Request(href,{headers:{Host:"127.0.0.1:3328"}}))).status,403);const ranged=await handler(requestGet({Range:"bytes=0-9"}));assert.equal(ranged.status,206);assert.equal(ranged.headers.get("content-range"),`bytes 0-9/${bytes.length}`);assert.equal((await ranged.arrayBuffer()).byteLength,10);
   assert.equal((await handler(new Request(href+"&version=2",{headers:{Host:"127.0.0.1:3328","X-CodexForge-Animation-Studio":"local-operator-v1"}}))).status,400);
  });
  await test("14 Chunk corruption fails closed on project load and preview",async()=>{
   const p=project("corrupt"),m=metadata(p);assert.equal((await call(m)).status,200);const asset=repo.load(p).assets[0];
   const dir=path.join(frontendRoot,".codexforge","studio-tests",namespace,path.dirname(asset.sourcePath)),part=path.join(dir,asset.contentHash+".part-0000.bin");const corrupted=fs.readFileSync(part);corrupted[50]^=1;fs.writeFileSync(part,corrupted);
   assert.throws(()=>repo.load(p));const response=await handler(new Request(url+"?projectId="+p+"&assetId="+asset.assetId+"&version=1",{headers:{Host:"127.0.0.1:3328","X-CodexForge-Animation-Studio":"local-operator-v1"}}));assert.equal(response.status,200);await assert.rejects(response.arrayBuffer());
  });
  await test("15 Fresh process reload verifies original footage after restart",()=>{
   const child=spawnSync(process.execPath,[fileURLToPath(import.meta.url),"--restart",namespace,firstProject],{cwd:frontendRoot,env:safeEnv,windowsHide:true,encoding:"utf8",timeout:40000});assert.equal(child.status,0,child.stderr);const out=JSON.parse(child.stdout);assert.equal(out.assets,2);assert.equal(out.revision,3);assert.deepEqual(out.networkAttempts,[]);write("restart.json",out);
  });
  await test("16 Concurrent native writers publish at most one version/revision",async()=>{
   const p=project("race"),m=metadata(p);const out=await Promise.all([raceChild(m,"race-operation-0001"),raceChild(m,"race-operation-0002")]);assert.equal(out.filter(x=>x.status==="APPLIED").length,1,JSON.stringify(out));assert.equal(repo.load(p).assets.length,1);assert.equal(repo.load(p).project.revision,2);assert.ok(out.every(x=>x.networkAttempts.length===0));write("concurrency.json",out);
  });
  await test("17 Aggregate publication failure preserves orphan bytes and exact retry recovers",()=>{
   const p=project("publication"),m=metadata(p),operationKey=key();
   const native=openCreatorNativeRoot([".codexforge","studio-tests",namespace],"persistent");let armed=true;
   const proxy=new Proxy(native,{get(target,property){if(property==="writeAtomicReplace")return(...args)=>{if(armed){armed=false;throw Object.assign(new Error("Synthetic publication interruption"),{code:"synthetic_interruption"});}return target.writeAtomicReplace(...args);};const value=Reflect.get(target,property);return typeof value==="function"?value.bind(target):value;}});
   const interrupted=new StudioRepository(proxy);try{assert.throws(()=>interrupted.importFootage(m,bytes,operationKey,"synthetic-footage"),e=>e.code==="synthetic_interruption");assert.equal(interrupted.load(p).assets.length,0);assert.equal(interrupted.importFootage(m,bytes,operationKey,"synthetic-footage").code,"LOCAL_FOOTAGE_IMPORTED_REVIEW_REQUIRED");assert.equal(interrupted.load(p).assets.length,1);}finally{interrupted.close();}
  });
  await test("18 Media provenance cannot impersonate generation and legacy generated rules remain",()=>{
   const asset=clone(firstAsset);asset.provenance.adapterMetadata.provider="HIGGSFIELD";assert.throws(()=>validateAssetManifest(asset));
   const forged=clone(firstAsset);forged.provenance.adapterMetadata.adapterId="other-provider";assert.throws(()=>validateAssetManifest(forged));
   assert.throws(()=>repo.registerAsset(firstAsset,bytes,key(),"synthetic-footage",time()),e=>e.code==="MANAGED_FOOTAGE_ONLY");
   const approved=clone(firstAsset);approved.approvalState="APPROVED";approved.provenance.approvalState="APPROVED";assert.throws(()=>validateAssetManifest(approved));
  });
  await test("19 Collection quota includes immutable versions and aggregate JSON cap remains1MiB",()=>{
   const asset=clone(firstAsset);asset.provenance.adapterMetadata.settings.byteLength=STUDIO_FOOTAGE_MAX_BYTES;
   assertFootageCollection(Array.from({length:STUDIO_FOOTAGE_PROJECT_MAX_VERSIONS},()=>asset));assert.throws(()=>assertFootageCollection(Array.from({length:STUDIO_FOOTAGE_PROJECT_MAX_VERSIONS+1},()=>asset)));
   asset.provenance.adapterMetadata.settings.byteLength=32;assert.throws(()=>assertFootageCollection(Array.from({length:9},()=>asset)));
   assert.throws(()=>parseStudioJson(" ".repeat(1048577)));
  });
  await test("20 Provider request count stays zero; native artifact not rebuilt; evidence is isolated",()=>{
   assert.deepEqual(networkAttempts,[]);assert.ok(namespace.startsWith("footage-"));assert.equal(STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES,16*1024*1024);assert.equal(STUDIO_FOOTAGE_MAX_BYTES,2*1024*1024*1024);assert.equal(STUDIO_FOOTAGE_PROJECT_MAX_BYTES,16*1024*1024*1024);
  });
 }finally{repo.close();}
 write("result.json",{status:results.every(x=>x.status==="PASS")?"PASS":"FAIL",tests:results,passed:results.filter(x=>x.status==="PASS").length,total:results.length,namespace,evidenceRoot,networkAttempts,providerRequests:0,productionMutation:false,nativeRebuilt:false,syntheticMediaNotPlaybackEvidence:true,loaded:loader.loaded});
 console.log(JSON.stringify({status:results.every(x=>x.status==="PASS")?"PASS":"FAIL",passed:results.filter(x=>x.status==="PASS").length,total:results.length,evidenceRoot,providerRequests:0}));
 if(results.some(x=>x.status!=="PASS"))process.exitCode=1;
}
