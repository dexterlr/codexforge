import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const attempts=blockStudioTestNetwork();
const api=createStudioTestLoader(root).load("@/lib/codexforge/animation-studio/blender-http.server");
const when="2026-10-13T14:00:00.000Z",projectId="project_blender_http",shotId="shot_blender_http",jobId="job_blender_http",hash="a".repeat(64);
const register={action:"register",projectId,shotId,expectedProjectRevision:1,sourceId:"approved-native-source",requestedAt:when};
const prepare={action:"prepare",projectId,shotId,expectedProjectRevision:1,assetId:"asset_blender_http",version:1,scene:"Saved Scene",camera:"Locked Camera",frameStart:76,frameEnd:150,requestedAt:when};
const start={action:"start",projectId,jobId,specDigest:hash,requestedAt:when};
for(const value of [register,prepare,start,{...start,action:"cancel"},{...start,action:"reconcile"},{action:"use-take",projectId,jobId,compositionId:"composition_blender_http",expectedRevision:1,expectedHeadDigest:hash,requestedAt:when}])assert.deepEqual(api.validateBlenderAction(value),value);
let negative=0;
for(const value of [{...register,path:"D:\\private.blend"},{...register,sourceId:"../other"},{...register,python:"print(1)"},{...prepare,frameEnd:151},{...prepare,frameStart:76.1},{...prepare,frameStart:151},{...prepare,fps:30},{...prepare,scene:"scene\nscript"},{...start,specDigest:"b"},{...start,action:"restart"},{...start,requestedAt:"yesterday"},{...start,projectId:"../../"}]){assert.throws(()=>api.validateBlenderAction(value));negative++;}
let reads=0,actions=0;const recorded=[];
const handler=api.createStudioBlenderHandler({enabled:true,listeners:()=>["127.0.0.1"],inspect:(p,s)=>{reads++;return{projectId:p,shotId:s};},execute:(value,key)=>{actions++;recorded.push({value,key});return{accepted:true};}});
const base="http://127.0.0.1:3390/api/codexforge/animation-studio/blender";
const headers={Host:"127.0.0.1:3390",Origin:"http://127.0.0.1:3390","X-CodexForge-Animation-Studio":"local-operator-v1","Sec-Fetch-Site":"same-origin","Content-Type":"application/json","Idempotency-Key":"stable_request_0001"};
function post(value,patch={}){return new Request(base,{method:"POST",headers:{...headers,...patch},body:JSON.stringify(value)});}
assert.equal((await handler(new Request(`${base}?projectId=${projectId}&shotId=${shotId}`,{headers}))).status,200);assert.equal(reads,1);assert.equal(actions,0,"A status read must not execute or register anything.");
assert.equal((await handler(post(register))).status,200);assert.equal(actions,1);assert.deepEqual(recorded[0],{value:register,key:"stable_request_0001"});
for(const patch of [{Origin:"http://evil.invalid"},{Host:"localhost:3390"},{"X-CodexForge-Animation-Studio":"wrong"},{"Sec-Fetch-Site":"cross-site"},{"x-forwarded-for":"8.8.8.8"},{"Content-Type":"text/plain"}]){assert.ok((await handler(post(start,patch))).status>=400);negative++;}
const missingOrigin={...headers};delete missingOrigin.Origin;
assert.equal((await handler(new Request(base,{method:"POST",headers:missingOrigin,body:JSON.stringify(start)}))).status,403);negative++;
assert.equal((await handler(new Request(`${base}?projectId=${projectId}&shotId=${shotId}&shotId=${shotId}`,{headers}))).status,400);negative++;
assert.equal((await handler(post({...start,script:"anything"}))).status,400);negative++;
assert.equal((await handler(post(start,{"Content-Length":"32769"}))).status,400);negative++;
assert.ok((await handler(new Request(base,{method:"POST",headers,body:'{"action":"start","action":"cancel"}'}))).status>=400);negative++;
assert.equal(actions,1,"Rejected requests must not reach execution.");
const external=api.createStudioBlenderHandler({enabled:true,listeners:()=>["0.0.0.0"],inspect:()=>assert.fail(),execute:()=>assert.fail()});
assert.equal((await external(post(start))).status,503);negative++;
assert.equal((await api.createStudioBlenderHandler({enabled:false,inspect:()=>assert.fail(),execute:()=>assert.fail()})(post(start))).status,503);negative++;
const panel=fs.readFileSync(path.join(root,"src/lib/codexforge/animation-studio/components/BlenderSourcePanel.tsx"),"utf8");
assert.match(panel,/I approve this exact bounded local Blender preview/);assert.match(panel,/Start approved Blender preview/);assert.match(panel,/Use as Take/);assert.match(panel,/Server-generated local render/);assert.match(panel,/sessionStorage\.setItem/);assert.match(panel,/No automatic retry/);assert.doesNotMatch(panel,/<input[^>]+type="file"/);
assert.deepEqual(attempts,[]);
console.log(JSON.stringify({status:"PASS",positiveActions:6,negative,executionCalls:actions,networkAttempts:attempts.length,scope:"Boundary and UI source contracts; not rendered Browser acceptance"}));
