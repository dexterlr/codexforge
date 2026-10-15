// Actual BlenderSourcePanel TSX handlers with installed JSX runtime and bounded
// hook/session/fetch seams. This is not browser, native execution or media proof.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { setImmediate as nextTask } from 'node:timers/promises';
import ts from 'typescript';
import { blockStudioTestNetwork, createStudioTestLoader } from './animation-studio-test-loader.mjs';

const frontend=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
assert.equal(process.cwd(),frontend);
const networkAttempts=blockStudioTestNetwork(),loader=createStudioTestLoader(frontend);
const {openStudioRepository,StudioStoreError}=loader.load('@/lib/codexforge/animation-studio/store.server');
const {createStudioBlenderHandler}=loader.load('@/lib/codexforge/animation-studio/blender-http.server');
const editContract=loader.load('@/lib/codexforge/animation-studio/blender-edit-contract');
const {readBlenderEditJob}=loader.load('@/lib/codexforge/animation-studio/blender-edit-identity.server');
const {hashJarvisChatCanonicalJson:digest}=loader.load('@/lib/codexforge/jarvis-chat/jarvis-chat-crypto');
const relative='src/lib/codexforge/animation-studio/components/BlenderSourcePanel.tsx',filename=path.join(frontend,relative);
const boundPaths=[...new Set([relative,relative.replace('.tsx','.module.css'),'src/lib/codexforge/animation-studio/blender-edit-contract.ts','scripts/test-animation-studio-blender-revision-ui.mjs','scripts/animation-studio-test-loader.mjs',...loader.loaded])];
const hash=file=>createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const bindings=boundPaths.map(name=>({path:name,sha256:hash(path.join(frontend,name))}));
const content=fs.readFileSync(filename,'utf8'),results=[],repositoryNamespaces=[];
const projectId='project_native_revision_ui',shotId='shot_native_revision_ui',compositionId='composition_native_revision_ui';
const key=`codexforge.studio.blender.pending.v1.${projectId}`,stamp='2026-10-14T12:00:00.000Z';
const clone=value=>JSON.parse(JSON.stringify(value)),envelope=result=>({ok:true,result:clone(result),providerRequests:0});
const source=(version=1)=>({assetId:'asset_blender_revision_ui',version,descriptor:{label:'Synthetic material fixture — UI evidence only',catalogueId:'synthetic-source',source:{relativeName:`source-v${version}.blend`,sha256:(version===1?'a':'b').repeat(64),byteLength:1234},dependencies:[],inspection:{blenderVersion:'5.0.1',scenes:[{name:'Scene',cameras:['Camera'],activeCamera:'Camera',frameStart:1,frameEnd:1500,fps:25,fpsBase:1}]}}});
const eligible={targetId:'1'.repeat(64),materialName:'Synthetic independent collar',nodeName:'Principled',socketIdentifier:'Base Color',originalLinear:[0.1,0.2,0.3,1],users:['SyntheticCollar'],eligible:true,reason:null};
const rejected={...eligible,targetId:'2'.repeat(64),materialName:'Protected white display',originalLinear:null,users:['LaptopDisplay'],eligible:false,reason:'Protected display material cannot be edited.'};
function inspection(){return {source:{assetId:source().assetId,version:1},inspectionDigest:'3'.repeat(64),inspection:{format:'studio-blender-material-inspection-v1',sourceSha256:'a'.repeat(64),sourceBytes:1234,semanticDigest:'4'.repeat(64),dependenciesDigest:'5'.repeat(64),protectedDigest:'6'.repeat(64),policyDigest:'7'.repeat(64),targets:[eligible,rejected]}};}
function editJob(phase='PREPARED'){
 const proposal={format:'studio-blender-material-proposal-v1',projectId,shotId,source:{assetId:source().assetId,version:1},blendSha256:'a'.repeat(64),descriptorHash:'8'.repeat(64),inspectionDigest:'3'.repeat(64),semanticDigest:'4'.repeat(64),dependenciesDigest:'5'.repeat(64),protectedDigest:'6'.repeat(64),legacyAdapterDigest:'c'.repeat(64),policy:{sourceSha256:'a'.repeat(64),allowedMaterials:[eligible.materialName],protectedObjects:['LaptopDisplay','Camera'],protectedMaterials:[rejected.materialName]},target:eligible,colourSrgb:'#D05030',originalLinear:eligible.originalLinear,requestedLinear:[0.630757,0.08022,0.029557,1],adapterVersion:'STUDIO_BLENDER_MATERIAL_BASE_COLOUR_V1'};
 const execution={format:'studio-blender-material-execution-v1',proposal,proposalDigest:'9'.repeat(64),preparedRevision:4,phase,process:null,verification:phase==='COMPLETED'?{reopened:true,onlyIntendedChange:true,outputSha256:'b'.repeat(64)}:null,source:phase==='COMPLETED'?{assetId:source().assetId,version:2}:null};
 return {jobId:'job_blender_edit_'+ 'a'.repeat(24),state:phase==='COMPLETED'?'SUCCEEDED':phase==='PREPARED'?'QUEUED':'RUNNING',execution,active:phase==='RUNNING',interrupted:phase==='INTERRUPTED',outputs:[],error:null};
}
function preparedReceipt(){const job=editJob();return {status:'APPLIED',code:'BLENDER_EDIT_PREPARED',revision:5,value:{jobId:job.jobId,type:'EDIT',projectId,shotId,state:'QUEUED',attempt:0,checkpoint:{blenderEdit:{...job.execution,preparedRevision:5}}}};}
function renderJob(version){return {jobId:`job_render_ui_${version}`,state:'SUCCEEDED',execution:{phase:'COMPLETED',specDigest:String(version).repeat(64),spec:{source:{assetId:source().assetId,version},blendSha256:(version===1?'a':'b').repeat(64),shotId,settings:{scene:'Scene',camera:'Camera',frameStart:76,frameEnd:150,fps:25,width:1280,height:720}}},progress:null,active:false,interrupted:false,error:null,outputs:[{assetId:`asset_output_ui_${version}`,version:1}]};}
function state(){return {projectId,shotId,projectRevision:4,enabled:true,unavailable:null,inspectionRecovery:false,editEnabled:true,editUnavailable:null,catalogue:[],sources:[source()],jobs:[],editJobs:[],previewMode:'Synthetic UI fixture only.'};}
function nodes(value){if(Array.isArray(value))return value.flatMap(nodes);if(!value||typeof value!=='object'||!value.props)return [];return [value,...nodes(value.props.children)];}
function words(value){if(value==null||typeof value==='boolean')return '';if(Array.isArray(value))return value.map(words).join('');if(typeof value!=='object')return String(value);return words(value.props?.children);}
function harness(options={}){
 const slots=[],effects=[],timers=new Map(),calls=[],busy=[],session=options.session??new Map(),replies=[...(options.replies??[])];
 let cursor=0,timerId=0,tree,view=clone(options.state??state());
 const config={failStatus:false,...options},props={projectId,shotId,compositionId,revision:3,headDigest:'f'.repeat(64),disabled:false,onBusyChange:value=>busy.push(value),onTakeUsed:()=>{throw Error('No Take admission expected in native-edit UI tests');},...options.props};
 const changed=(deps,old)=>!old||deps.length!==old.deps.length||deps.some((value,index)=>!Object.is(value,old.deps[index]));
 const hooks={useState(initial){const i=cursor++;if(!(i in slots))slots[i]=typeof initial==='function'?initial():initial;return [slots[i],value=>{slots[i]=typeof value==='function'?value(slots[i]):value;}];},useRef(initial){const i=cursor++;if(!(i in slots))slots[i]={current:initial};return slots[i];},useCallback(callback,deps){const i=cursor++;if(changed(deps,slots[i]))slots[i]={deps,callback};return slots[i].callback;},useEffect(callback,deps){const i=cursor++,old=slots[i];if(changed(deps,old))effects.push(()=>{old?.cleanup?.();slots[i]={deps,cleanup:callback()};});}};
 const compiled=ts.transpileModule(content,{fileName:filename,reportDiagnostics:true,compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}});
 assert.equal((compiled.diagnostics??[]).filter(item=>item.category===ts.DiagnosticCategory.Error).length,0);
 const componentModule=new Module(filename);componentModule.filename=filename;const jsxRuntime=Module.createRequire(filename)('react/jsx-runtime');
 componentModule.require=name=>{if(name==='react')return hooks;if(name==='react/jsx-runtime')return jsxRuntime;if(name.endsWith('.module.css'))return new Proxy({},{get:(_,property)=>String(property)});throw Error(`Unexpected runtime import ${name}`);};componentModule._compile(compiled.outputText,filename);
 const saved={window:Object.getOwnPropertyDescriptor(globalThis,'window'),sessionStorage:Object.getOwnPropertyDescriptor(globalThis,'sessionStorage'),fetch:globalThis.fetch};
 Object.defineProperty(globalThis,'window',{configurable:true,value:{setTimeout(callback,delay){const id=++timerId;timers.set(id,{callback,delay});return id;},clearTimeout:id=>timers.delete(id),setInterval(callback,delay){const id=++timerId;timers.set(id,{callback,delay});return id;},clearInterval:id=>timers.delete(id)}});
 Object.defineProperty(globalThis,'sessionStorage',{configurable:true,value:{getItem:name=>session.get(name)??null,setItem(name,value){if(config.failStorage)throw Error('Synthetic denied storage');session.set(name,value);},removeItem:name=>session.delete(name)}});
 globalThis.fetch=async(url,init={})=>{
  const parsed=new URL(url,'http://synthetic.invalid');assert.equal(parsed.origin,'http://synthetic.invalid');assert.equal(parsed.pathname,'/api/codexforge/animation-studio/blender');assert.equal(init.credentials,'same-origin');
  const headers=new Headers(init.headers);assert.equal(headers.get('X-CodexForge-Animation-Studio'),'local-operator-v1');
  const method=init.method??'GET',call={method,url,body:init.body??null,key:headers.get('Idempotency-Key')};calls.push(call);
  async function throughHttp(){const origin='http://127.0.0.1:3379',requestHeaders=new Headers(headers);requestHeaders.set('Host','127.0.0.1:3379');requestHeaders.set('Sec-Fetch-Site','same-origin');if(method==='POST')requestHeaders.set('Origin',origin);const response=await config.httpHandler(new Request(origin+parsed.pathname+parsed.search,{method,headers:requestHeaders,...(method==='POST'?{body:call.body}:{})}));if(config.httpResponse)await config.httpResponse({call,response:response.clone()});return response;}
  if(method==='GET'){if(config.failStatus)throw Error('Synthetic saved-status outage');return config.httpHandler?throughHttp():Response.json(envelope(view));}
  assert.equal(method,'POST');const pending=JSON.parse(session.get(key));assert.equal(pending.key,call.key);assert.deepEqual(pending.body,JSON.parse(call.body));if(config.httpHandler)return throughHttp();assert.ok(replies.length,'Unexpected or automatic POST');
  let reply=replies.shift();if(typeof reply==='function')reply=reply({body:JSON.parse(call.body),setState:value=>{view=clone(value);},config});if(reply==='throw')throw Error('Synthetic lost response');
  return Response.json(reply.payload??envelope(reply.result),{status:reply.status??200});
 };
 function render(){cursor=0;tree=componentModule.exports.BlenderSourcePanel(props);while(effects.length)effects.shift()();return tree;}
 function find(predicate,root=tree){const values=nodes(root).filter(predicate);assert.equal(values.length,1,`Expected unique control, got ${values.length}: ${predicate}`);return values[0];}
 function disabled(control,node=tree,inherited=false){if(Array.isArray(node)){for(const child of node){const found=disabled(control,child??null,inherited);if(found!==null)return found;}return null;}if(!node?.props)return null;const value=inherited||!!node.props.disabled;if(node===control)return value;return disabled(control,node.props.children??null,inherited||(node.type==='fieldset'&&!!node.props.disabled));}
 const button=label=>find(node=>node.type==='button'&&words(node)===label);
 async function settle(){for(let i=0;i<6;i++){for(const [id,timer] of [...timers])if(timer.delay===0){timers.delete(id);timer.callback();}await nextTask();render();}}
 async function click(label){const control=button(label);assert.equal(disabled(control),false,`Disabled ${label}`);control.props.onClick();await settle();}
 function field(label,value){const parent=find(node=>node.type==='label'&&words(node).startsWith(label)),control=find(node=>['input','select'].includes(node.type),parent);assert.equal(disabled(control),false,`Disabled ${label}`);control.props.onChange({target:{value,valueAsNumber:Number(value)}});render();}
 function check(value){const parent=find(node=>node.type==='label'&&words(node)==='I approve this exact native colour change and creation of a new editable version.'),control=find(node=>node.type==='input',parent);assert.equal(disabled(control),false);control.props.onChange({target:{checked:value}});render();}
 function dispose(){for(const slot of slots)slot?.cleanup?.();globalThis.fetch=saved.fetch;for(const property of ['window','sessionStorage']){if(saved[property])Object.defineProperty(globalThis,property,saved[property]);else delete globalThis[property];}}
 render();return {render,settle,click,field,check,find,button,disabled,dispose,props,calls,busy,session,config,replies,text:()=>words(tree),tree:()=>tree,posts:()=>calls.filter(call=>call.method==='POST')};
}
async function test(name,run){try{await run();results.push({name,status:'PASS'});}catch(error){results.push({name,status:'FAIL',message:error.message,stack:error.stack});}}
async function using(options,run){const h=harness(options);try{await h.settle();await run(h);}finally{h.dispose();}}
async function inspect(h){h.field('Native source to edit',`${source().assetId}:1`);await h.click('Inspect material edit targets');}

await test('Inspection is explicit, exact-source-bound and explains unsupported/protected targets',()=>using({replies:[{result:inspection()}]},async h=>{
 assert.equal(h.posts().length,0);await inspect(h);const body=JSON.parse(h.posts()[0].body);assert.equal(body.action,'inspect-edit');assert.equal(body.assetId,source().assetId);assert.equal(body.version,1);assert.equal(body.shotId,shotId);
 h.field('Inspected material',rejected.targetId);assert.match(h.text(),/Protected display material cannot be edited/);assert.equal(h.disabled(h.button('Prepare native colour change')),true);
 h.field('Inspected material',eligible.targetId);h.field('New display-sRGB colour','#invalid');assert.equal(h.disabled(h.button('Prepare native colour change')),true);h.field('New display-sRGB colour','#d05030');assert.equal(h.disabled(h.button('Prepare native colour change')),false);assert.match(h.text(),/scene-linear sRGB/);assert.match(h.text(),/SyntheticCollar/);
}));
await test('Prepare records exact reviewed target and conversion; apply requires separate approval and never starts render',()=>using({replies:[{result:inspection()},({body,setState})=>{assert.equal(body.action,'prepare-edit');assert.equal(body.inspectionDigest,'3'.repeat(64));assert.equal(body.targetId,eligible.targetId);assert.equal(body.colourSrgb,'#D05030');assert.equal(body.expectedProjectRevision,4);setState({...state(),editJobs:[editJob()]});return {result:preparedReceipt()};},({body,setState})=>{assert.deepEqual(Object.keys(body).sort(),['action','approved','jobId','projectId','proposalDigest','requestedAt']);assert.equal(body.approved,true);assert.equal(body.proposalDigest,'9'.repeat(64));setState({...state(),editJobs:[editJob('RUNNING')]});return {result:{jobId:editJob().jobId,started:true}};}]},async h=>{
 await inspect(h);h.field('Inspected material',eligible.targetId);await h.click('Prepare native colour change');assert.equal(h.posts().length,2);assert.equal(h.disabled(h.button('Apply approved native change')),true);assert.match(h.text(),/Original: \[0.1,0.2,0.3,1\]/);assert.match(h.text(),/New: \[0.630757,0.08022,0.029557,1\]/);h.check(true);await h.click('Apply approved native change');assert.equal(h.posts().length,3);assert.equal(h.busy.at(-1),true);assert.match(h.text(),/Save and reopen verification must complete/);assert.equal(h.posts().some(call=>JSON.parse(call.body).action==='start'),false);
}));
await test('Real repository receipt crosses the real HTTP handler into the actual component, with exact replay after lost delivery',async()=>{
 for(const loseFirstPrepare of [false,true]){
  const namespace=`native-edit-ui-boundary-${randomUUID()}`;repositoryNamespaces.push(namespace);
  const repository=openStudioRepository({workspace:'test',namespace,mediaStorage:'workspace'}),actor='synthetic-ui-boundary-test',httpReceipts=[];
  let lost=false,originalReceipt;
  try{
   repository.createDraftProject({schemaVersion:1,projectId,revision:1,title:'Native edit HTTP UI boundary',description:'Synthetic persisted contract only; no Blender execution or media',currency:'GBP',createdAt:stamp},'boundary_create_0001',actor);
   const initial=repository.loadManifest(projectId),actualShotId=initial.shots[0].shotId,sourceHash='a'.repeat(64);
   const descriptor={format:'studio-blender-source-v1',catalogueId:'native-edit-ui-boundary',label:'Synthetic native boundary source',source:{originalPath:'C:\\Synthetic\\not-read.blend',relativeName:'not-read.blend',byteLength:1234,sha256:sourceHash},dependencies:[],inspection:{schemaVersion:1,supported:true,unsupported:[],sourceSha256:sourceHash,sourceBytes:1234,blenderVersion:'5.0.1',dependencies:[],scenes:[{name:'Scene',cameras:['Camera'],activeCamera:'Camera',frameStart:1,frameEnd:1500,fps:25,fpsBase:1}]}};
   const registered=repository.registerBlenderSource({projectId,shotId:actualShotId,expectedProjectRevision:initial.project.revision,requestedAt:stamp,descriptor},'boundary_register_0001',actor).value.source;
   const review={...inspection(),source:registered,inspection:{...inspection().inspection,sourceSha256:sourceHash,sourceBytes:1234}};
   function savedView(){const saved=repository.loadManifest(projectId);return {...state(),shotId:actualShotId,projectRevision:saved.project.revision,sources:[{...registered,descriptor}],editJobs:saved.jobs.map(job=>({jobId:job.jobId,state:job.state,execution:readBlenderEditJob(job),active:false,interrupted:false,outputs:job.outputs,error:job.error}))};}
   const handler=createStudioBlenderHandler({enabled:true,listeners:()=>['127.0.0.1'],inspect:(requestedProject,requestedShot)=>{assert.equal(requestedProject,projectId);assert.equal(requestedShot,actualShotId);return savedView();},execute:(action,requestKey)=>{
    assert.equal(action.projectId,projectId);assert.equal(action.shotId,actualShotId);assert.equal(action.assetId,registered.assetId);assert.equal(action.version,registered.version);
    if(action.action==='inspect-edit')return review;
    assert.equal(action.action,'prepare-edit','No apply, render or other mutation is authorized by this boundary fixture');assert.equal(action.inspectionDigest,review.inspectionDigest);assert.equal(action.targetId,eligible.targetId);assert.equal(action.colourSrgb,'#FF4000');
    const proposal=editContract.validateBlenderEditProposal({...editJob().execution.proposal,projectId,shotId:actualShotId,source:registered,descriptorHash:digest(descriptor),blendSha256:sourceHash,inspectionDigest:review.inspectionDigest,colourSrgb:action.colourSrgb,requestedLinear:editContract.srgbToBlenderLinear(action.colourSrgb,eligible.originalLinear[3]),blender:{path:'C:\\Synthetic\\blender.exe',sha256:'d'.repeat(64),version:'5.0.1'},scriptHashes:{materialEdit:'e'.repeat(64),semanticSnapshot:'f'.repeat(64)}});
    const receipt=repository.prepareBlenderEdit({projectId,shotId:actualShotId,expectedProjectRevision:action.expectedProjectRevision,requestedAt:action.requestedAt,proposal},requestKey,actor);
    if(originalReceipt)assert.deepEqual(receipt,originalReceipt,'Exact retry must return the original canonical receipt');else originalReceipt=clone(receipt);
    return receipt;
   }});
   const options={props:{shotId:actualShotId},httpHandler:handler,httpResponse:async({call,response})=>{
    assert.equal(response.status,200);assert.equal(response.headers.get('Cache-Control'),'no-store');const payload=await response.json();assert.equal(payload.ok,true);
    if(call.method==='POST'&&JSON.parse(call.body).action==='prepare-edit'){
     assert.equal(payload.result.status,'APPLIED');assert.equal(payload.result.code,'BLENDER_EDIT_PREPARED');assert.equal(payload.result.value.type,'EDIT');assert.equal(payload.result.checkpoint,undefined);httpReceipts.push(clone(payload));
     if(loseFirstPrepare&&!lost){lost=true;throw Error('Synthetic response loss after canonical preparation and HTTP serialization');}
    }
   }};
   const session=new Map();let retained;
   await using({...options,session},async h=>{
    h.field('Native source to edit',`${registered.assetId}:1`);await h.click('Inspect material edit targets');h.field('Inspected material',eligible.targetId);h.field('New display-sRGB colour','#FF4000');await h.click('Prepare native colour change');
    assert.equal(h.posts().length,2);assert.equal(repository.loadManifest(projectId).jobs.length,1);assert.equal(repository.loadManifest(projectId).jobs[0].attempt,0);
    if(loseFirstPrepare){retained=JSON.parse(session.get(key));assert.equal(h.busy.at(-1),true);assert.match(h.text(),/Synthetic response loss/);}
    else{assert.equal(session.has(key),false);assert.match(h.text(),/Native change prepared, not applied/);assert.equal(h.disabled(h.button('Apply approved native change')),true);assert.equal(h.busy.at(-1),false);}
   });
   if(loseFirstPrepare)await using({...options,session},async h=>{
    assert.equal(h.posts().length,0,'Remount must not retry automatically');await h.click('Check by retrying exact native request');assert.equal(h.posts().length,1);assert.equal(h.posts()[0].key,retained.key);assert.deepEqual(JSON.parse(h.posts()[0].body),retained.body);assert.equal(session.has(key),false);assert.match(h.text(),/Native change prepared, not applied/);assert.equal(h.disabled(h.button('Apply approved native change')),true);assert.equal(h.busy.at(-1),false);
   });
   const saved=repository.loadManifest(projectId);assert.equal(saved.jobs.length,1);assert.equal(saved.jobs[0].state,'QUEUED');assert.equal(saved.jobs[0].attempt,0);assert.equal(saved.assets.length,1);assert.equal(saved.project.revision,originalReceipt.revision);assert.equal(httpReceipts.length,loseFirstPrepare?2:1);if(loseFirstPrepare)assert.deepEqual(httpReceipts[0],httpReceipts[1]);
  }finally{repository.close();}
 }
});
await test('Unwrapped, blocked, stale and mismatched preparation receipts retain the exact request instead of claiming preparation',async()=>{
 const mutations=[receipt=>receipt.value,receipt=>({...receipt,status:'BLOCKED'}),receipt=>({...receipt,code:'OTHER_RESULT'}),receipt=>({...receipt,revision:4}),receipt=>{receipt.value.projectId='project_other';return receipt;},receipt=>{receipt.value.checkpoint.blenderEdit.preparedRevision=6;return receipt;},receipt=>{receipt.value.checkpoint.blenderEdit.proposal.target.targetId='b'.repeat(64);return receipt;},receipt=>{receipt.value.checkpoint.blenderEdit.proposal.colourSrgb='#FF4000';return receipt;}];
 for(const mutate of mutations)await using({replies:[{result:inspection()},{result:mutate(clone(preparedReceipt()))}]},async h=>{
  await inspect(h);h.field('Inspected material',eligible.targetId);await h.click('Prepare native colour change');assert.equal(h.posts().length,2);assert.equal(JSON.parse(h.session.get(key)).body.action,'prepare-edit');assert.equal(h.busy.at(-1),true);assert.match(h.text(),/did not confirm the exact prepared native change/);assert.doesNotMatch(h.text(),/Native change prepared, not applied/);assert.equal(h.disabled(h.button('Prepare native colour change')),true);
 });
});
await test('Source selection invalidates inspection; changing requested colour clears approval',()=>using({state:{...state(),sources:[source(),source(2)],editJobs:[editJob()]},replies:[{result:inspection()}]},async h=>{
 await inspect(h);h.check(true);assert.equal(h.disabled(h.button('Apply approved native change')),false);h.field('New display-sRGB colour','#AABBCC');assert.equal(h.disabled(h.button('Apply approved native change')),true);h.field('Native source to edit',`${source().assetId}:2`);assert.equal(nodes(h.tree()).some(node=>node.type==='label'&&words(node).startsWith('Inspected material')),false);assert.equal(h.disabled(h.button('Prepare native colour change')),true);
}));
await test('Parent activity lock and storage denial prevent all native-edit submission',async()=>{
 await using({props:{disabled:true},state:{...state(),editJobs:[editJob()]}},async h=>{assert.equal(h.disabled(h.button('Inspect material edit targets')),true);assert.equal(h.disabled(h.button('Apply approved native change')),true);h.button('Apply approved native change').props.onClick();await h.settle();assert.equal(h.posts().length,0);});
 await using({failStorage:true},async h=>{h.field('Native source to edit',`${source().assetId}:1`);await h.click('Inspect material edit targets');assert.equal(h.posts().length,0);assert.match(h.text(),/Nothing was sent/);});
});
await test('Render-only and legacy runtimes disable native edits without disabling preview controls or discarding retained requests',async()=>{
 for(const capability of [{editEnabled:false,editUnavailable:'Typed editing is not enabled for this qualified render-only runtime.'},{editEnabled:undefined,editUnavailable:undefined}]){
  const view={...state(),...capability,editJobs:[editJob()]};
  await using({state:view},async h=>{
   h.field('Registered Blender source',`${source().assetId}:1`);
   assert.equal(h.disabled(h.button('Prepare preview plan')),false);
   for(const label of ['Inspect material edit targets','Prepare native colour change','Apply approved native change']){assert.equal(h.disabled(h.button(label)),true);h.button(label).props.onClick();}
   await h.settle();assert.equal(h.posts().length,0);assert.equal(h.session.has(key),false);
   assert.match(h.text(),capability.editEnabled===false?/qualified render-only runtime/:/Typed material editing is unavailable/);
  });
  const pending={key:'native_edit_retained_0001',body:{action:'apply-edit',projectId,jobId:editJob().jobId,proposalDigest:'9'.repeat(64),approved:true,requestedAt:stamp}},session=new Map([[key,JSON.stringify(pending)]]);
  await using({state:view,session},async h=>{assert.equal(h.disabled(h.button('Check by retrying exact native request')),true);h.button('Check by retrying exact native request').props.onClick();await h.settle();assert.equal(h.posts().length,0);assert.deepEqual(JSON.parse(session.get(key)),pending);assert.equal(h.busy.at(-1),true);assert.match(h.text(),/exact request remains retained/);});
 }
});
await test('Lost native-edit response retains exact request without automatic retry, including remount',async()=>{
 const session=new Map();await using({session,state:{...state(),editJobs:[editJob()]},replies:['throw']},async h=>{h.check(true);await h.click('Apply approved native change');assert.equal(h.posts().length,1);assert.equal(h.busy.at(-1),true);assert.ok(session.has(key));});
 const saved=JSON.parse(session.get(key));await using({session,state:{...state(),editJobs:[editJob('RUNNING')]},replies:[{result:{jobId:editJob().jobId,started:false}}]},async h=>{assert.equal(h.posts().length,0);await h.click('Check by retrying exact native request');assert.equal(h.posts()[0].key,saved.key);assert.deepEqual(JSON.parse(h.posts()[0].body),saved.body);assert.equal(session.has(key),false);assert.equal(h.busy.at(-1),true);});
});
await test('Successful apply receipt plus unavailable saved status remains pending and locked',()=>using({state:{...state(),editJobs:[editJob()]},replies:[({config})=>{config.failStatus=true;return {result:{jobId:editJob().jobId,started:true}};}]},async h=>{h.check(true);await h.click('Apply approved native change');assert.ok(h.session.has(key));assert.equal(h.busy.at(-1),true);assert.equal(h.disabled(h.button('Apply approved native change')),true);assert.match(h.text(),/saved-status outage/);}));
await test('Malformed inspection response is not success and keeps exact recovery token',()=>using({replies:[{result:{...inspection(),source:{assetId:'asset_other',version:1}}}]},async h=>{await inspect(h);assert.ok(h.session.has(key));assert.match(h.text(),/did not confirm the exact source/);assert.equal(h.disabled(h.button('Prepare native colour change')),true);}));
await test('A failed save or incomplete completed record cannot expose verified native version',async()=>{
 for(const job of [editJob('FAILED'),{...editJob('COMPLETED'),execution:{...editJob('COMPLETED').execution,verification:null}}])await using({state:{...state(),sources:[source(),source(2)],editJobs:[job]}},async h=>{assert.doesNotMatch(h.text(),/New native version verified/);assert.equal(nodes(h.tree()).some(node=>node.type==='button'&&words(node)==='Select edited source for a separate preview'),false);assert.equal(h.posts().length,0);});
});
await test('Verified native version is selected explicitly for separate render preparation without mutation',()=>using({state:{...state(),sources:[source(),source(2)],editJobs:[editJob('COMPLETED')]}},async h=>{assert.match(h.text(),/New native version verified/);assert.match(h.text(),/Saved and reopened/);await h.click('Select edited source for a separate preview');assert.equal(h.posts().length,0);const parent=h.find(node=>node.type==='label'&&words(node).startsWith('Registered Blender source'));const select=h.find(node=>node.type==='select',parent);assert.equal(select.props.value,`${source().assetId}:2`);assert.match(h.text(),/separate/);}));
await test('A/B selects one canonical playback element, preserving source/job labels and issuing no POST',()=>using({state:{...state(),sources:[source(),source(2)],jobs:[renderJob(1),renderJob(2)]}},async h=>{
 h.field('Output A',renderJob(1).jobId);h.field('Output B',renderJob(2).jobId);await h.click('View A');let video=h.find(node=>node.type==='video');assert.match(video.props.src,/asset_output_ui_1/);assert.match(h.text(),/Reviewing A/);await h.click('View B');video=h.find(node=>node.type==='video');assert.match(video.props.src,/asset_output_ui_2/);assert.equal(nodes(h.tree()).filter(node=>node.type==='video').length,1);assert.match(h.text(),/Reviewing B/);assert.match(h.text(),/job_render_ui_2/);assert.equal(h.posts().length,0);
}));
await test('Interrupted native edit is honestly labelled and reconciles only explicitly',()=>using({state:{...state(),editJobs:[editJob('INTERRUPTED')]},replies:[{result:{reconciled:true}}]},async h=>{assert.match(h.text(),/Native edit interrupted/);assert.equal(h.posts().length,0);await h.click('Record interrupted native edit — no retry');assert.equal(JSON.parse(h.posts()[0].body).action,'reconcile-edit');assert.equal(JSON.parse(h.posts()[0].body).proposalDigest,'9'.repeat(64));}));
await test('Actual HTTP capacity and storage errors remain honest in the component, without automatic render or reconciliation retry',async()=>{
 for(const failure of [new StudioStoreError('BLENDER_RECORD_CAPACITY','Synthetic capacity reservation denied'),Object.assign(Error('Synthetic persistence unavailable'),{code:'synthetic_io'})]){
  const interrupted={...renderJob(2),state:'RUNNING',execution:{...renderJob(2).execution,phase:'RUNNING'},active:false,interrupted:true,outputs:[]},view={...state(),sources:[source(),source(2)],jobs:[interrupted]};let actions=0,actualMessage;
  const handler=createStudioBlenderHandler({enabled:true,listeners:()=>['127.0.0.1'],inspect:()=>clone(view),execute:action=>{actions++;assert.equal(action.action,'reconcile');assert.equal(action.jobId,interrupted.jobId);throw failure;}});
  await using({state:view,httpHandler:handler,httpResponse:async({call,response})=>{if(call.method==='POST'){assert.equal(response.status,failure.code==='BLENDER_RECORD_CAPACITY'?409:503);actualMessage=(await response.json()).error.message;}}},async h=>{
   assert.equal(h.posts().length,0);await h.click('Record interrupted job — no retry');assert.equal(actions,1);assert.equal(h.posts().length,1);assert.ok(h.text().includes(actualMessage));assert.doesNotMatch(h.text(),/interrupted job recorded|reconciliation complete/i);assert.match(h.text(),/Interrupted/);
   if(failure.code==='BLENDER_RECORD_CAPACITY'){assert.match(actualMessage,/capacity/i);assert.match(actualMessage,/saved state/i);assert.doesNotMatch(actualMessage,/check its text, timing/i);}
   else{assert.ok(h.session.has(key));assert.equal(h.busy.at(-1),true);}
   await h.settle();assert.equal(actions,1);assert.equal(h.posts().some(call=>JSON.parse(call.body).action==='start'),false);
  });
 }
});

const sourceUnchanged=bindings.every(binding=>hash(path.join(frontend,binding.path))===binding.sha256),status=results.every(result=>result.status==='PASS')&&sourceUnchanged&&networkAttempts.length===0?'PASS':'FAIL';
const evidence=path.join(frontend,'.codexforge','acceptance',`studio-blender-revision-ui-${randomUUID()}`);fs.mkdirSync(evidence,{recursive:true});
fs.writeFileSync(path.join(evidence,'result.json'),JSON.stringify({status,at:new Date().toISOString(),planned:results.length,passed:results.filter(result=>result.status==='PASS').length,results,sourceBindings:bindings,sourceUnchanged,networkAttempts,repositoryNamespaces,scope:'Actual TSX event handlers plus canonical test-repository preparation through the actual HTTP handler; synthetic native inspection and no sockets. Not browser DOM, native save/reopen, rendering, playback, accessibility geometry or promotion proof.',nativeExecutions:0,providerCalls:0,browserAcceptance:false},null,2)+'\n',{flag:'wx'});
console.log(JSON.stringify({status,planned:results.length,passed:results.filter(result=>result.status==='PASS').length,failures:results.filter(result=>result.status!=='PASS'),evidence,sourceUnchanged,networkAttempts}));
if(status!=='PASS')process.exitCode=1;
