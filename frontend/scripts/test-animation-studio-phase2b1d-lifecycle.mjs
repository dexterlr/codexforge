// Real native estimate lifecycle plus the production one-shot wire, mapped only to
// an owned ephemeral loopback server. No accepted fixture or real credential access.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import tls from 'node:tls';
import dns from 'node:dns';
import dgram from 'node:dgram';
import http2 from 'node:http2';
import { spawn } from 'node:child_process';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { NextRequest } from 'next/server.js';
import { createStudioTestLoader } from './animation-studio-test-loader.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(path.resolve(process.cwd()), root, 'Run from the exact frontend source root.');
const nativeRequest = http.request, nativeConnect = net.Socket.prototype.connect, nativeLookup = dns.lookup;
const allowedPorts = new Set(), networkAttempts = [];
const deniedNetwork = label => { networkAttempts.push(label); throw Error('NON_OWNED_NETWORK_FORBIDDEN'); };
globalThis.fetch = () => deniedNetwork('fetch');
for (const [label, api, methods] of [
  ['http', http, ['request', 'get']], ['https', https, ['request', 'get']], ['tls', tls, ['connect']],
  ['dgram', dgram, ['createSocket']], ['http2', http2, ['connect']],
  ['dns', dns, ['lookup', 'resolve', 'resolve4', 'resolve6']],
  ['dns.promises', dns.promises, ['lookup', 'resolve', 'resolve4', 'resolve6']],
]) for (const name of methods) api[name] = () => deniedNetwork(label + '.' + name);
dns.lookup = function (hostname, ...args) {
  if (hostname !== '127.0.0.1') return deniedNetwork('dns.lookup');
  return nativeLookup.call(this, hostname, ...args);
};
net.Socket.prototype.connect = function (...args) {
  let options = args[0]; if (Array.isArray(options)) options = options[0];
  if (!options || typeof options !== 'object' || options.host !== '127.0.0.1' || !allowedPorts.has(Number(options.port))) return deniedNetwork('Socket.connect');
  return nativeConnect.apply(this, args);
};
if (globalThis.WebSocket) globalThis.WebSocket = () => deniedNetwork('WebSocket');

const loader = createStudioTestLoader(root), load = name => loader.load('@/lib/codexforge/animation-studio/' + name);
const { createHiggsfieldEstimateWire } = load('higgsfield-estimate-wire.server');
const { RealHiggsfieldEstimateTransport } = load('higgsfield-estimate-transport.server');
const { openStudioRepository } = load('store.server');
const { sampleProject, sampleSequence, sampleShot } = load('sample');
const { readEstimateIntent, liveEstimateAuthorization, isEstimateJob } = load('higgsfield-estimate-intent');
const { executeHiggsfieldEstimateLive } = load('higgsfield-estimate.server');
const { createStudioOperatorHandler } = load('operator-http.server');
const { EstimateExecutionTracker } = load('higgsfield-estimate-execution.server');
const { parseEstimateExecutionReport } = load('higgsfield-estimate-execution');
const { DEFAULT_EXTERNAL_EXECUTION_POLICY } = load('policies');
const sentinel = 'PHASE2B1D_LIFECYCLE_SYNTHETIC_KEY:PHASE2B1D_LIFECYCLE_SYNTHETIC_SECRET';
const unicodeSentinel = 'PHASE2B1D_UNICODE_SYNTHETIC_KEY:PHASE2B1D_SYNTHETIC_\u0100_SECRET';
const secretParts = [sentinel, ...sentinel.split(':'), unicodeSentinel, ...unicodeSentinel.split(':')];
const hash = value => createHash('sha256').update(value).digest('hex');
const noSecret = value => { const text = typeof value === 'string' ? value : JSON.stringify(value); for (const part of secretParts) assert.ok(!text.includes(part), 'Synthetic authentication leaked.'); };
const sourceBindings = [...new Set([...loader.loaded, 'scripts/animation-studio-test-loader.mjs', 'scripts/test-animation-studio-phase2b1d-lifecycle.mjs'])].sort().map(name => ({ path: name, sha256: hash(fs.readFileSync(path.join(root, name))) }));
const sourceFingerprint = hash(JSON.stringify(sourceBindings));
const now = '2026-09-14T20:00:00.000Z', actor = 'phase2b1d-synthetic-wire-lifecycle';
const providerUrl = 'https://api.higgsfield.ai/estimate/bytedance/seedance/v1/lite/text-to-video';
const providerPath = new URL(providerUrl).pathname;
const exactInput = { prompt: 'An original matte blue sphere moves slowly across a plain white background.', duration: 2, resolution: '480', aspect_ratio: '1:1', camera_fixed: true };
const repos = [], fixtures = [], children = [], results = [], tests = [], observations = [], serverErrors = [], wireReceipts = [];
const test = (name, run) => tests.push({ name, run });
let port = 0, active = null, server = null, syntheticAuthorityGrants = 0;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const state = v => v.repo.load(v.projectId);
const job = v => state(v).jobs.find(item => item.jobId === v.jobId);
const intent = v => readEstimateIntent(job(v));
const claimPath = v => path.join(root, '.codexforge/studio-tests', v.namespace, 'studio/higgsfield-estimate-single-test-claim.json');
const generationClaimPath = v => path.join(root, '.codexforge/studio-tests', v.namespace, 'studio/higgsfield-single-test-claim.json');
function open(namespace) {
  assert.match(namespace, /^phase2b1d-life-[a-f0-9-]{36}$/u);
  const repo = openStudioRepository({ workspace: 'test', namespace }); repos.push(repo); return repo;
}
function transport(value = sentinel) {
  const stats = { transportInvocations: 0, lookups: 0, factoryCalls: 0, events: [], constructionFailure: false };
  const once = createHiggsfieldEstimateWire((url, options, callback) => {
    stats.factoryCalls++;
    assert.equal(url.href, providerUrl); assert.equal(options.method, 'POST');
    assert.ok(options.headers.Authorization === 'Key ' + sentinel, 'Only injected synthetic authentication is sent.');
    if (stats.constructionFailure) throw Error('Synthetic request construction failure');
    const local = new URL(`http://127.0.0.1:${port}${url.pathname}`);
    return nativeRequest(local, { ...options, protocol: 'http:' }, callback);
  }, event => stats.events.push(event));
  class ObservedTransport extends RealHiggsfieldEstimateTransport {
    constructor() { super(name => { assert.equal(name, 'HF_CREDENTIALS'); stats.lookups++; return value; }, once); }
    estimate(...args) { stats.transportInvocations++; return super.estimate(...args); }
  }
  return { value: new ObservedTransport(), stats };
}
function setup(credential = sentinel) {
  const namespace = 'phase2b1d-life-' + randomUUID(), suffix = randomUUID().replaceAll('-', '');
  assert.equal(fs.existsSync(path.join(root, '.codexforge/studio-tests', namespace)), false);
  const v = { namespace, projectId: 'project_' + suffix, sequenceId: 'sequence_' + suffix, shotId: 'shot_' + suffix, repo: open(namespace), transport: transport(credential), receipts: [], mode: 'status', status: 200, delayRelease: null };
  v.repo.createProject({ ...sampleProject, projectId: v.projectId, title: 'Synthetic single-wire lifecycle', description: 'Owned local HTTP only.', currency: 'USD', createdAt: now }, randomUUID(), actor);
  v.repo.saveSequence({ ...sampleSequence, projectId: v.projectId, sequenceId: v.sequenceId }, randomUUID(), actor, now);
  const shot = { ...sampleShot, projectId: v.projectId, sequenceId: v.sequenceId, shotId: v.shotId,
    description: exactInput.prompt, duration: exactInput.duration, resolution: { width: 480, height: 480 }, aspectRatio: { width: 1, height: 1 },
    camera: { ...sampleShot.camera, movement: 'static' }, preferredEngine: 'HIGGSFIELD', fallbackEngine: null, continuityRequirements: [], identityStrictness: 'FLEXIBLE', generationMethod: 'GENERATIVE',
    costEstimate: { currency: 'USD', minorUnits: 0 }, actualCost: { currency: 'USD', minorUnits: 0 } };
  v.repo.saveShot(shot, randomUUID(), actor, now);
  v.jobId = v.repo.prepareEstimateIntent(v.projectId, v.shotId, state(v).project.revision, shot.revision, randomUUID(), actor, now, 'LIVE_ESTIMATE').value.jobId;
  assert.deepEqual(intent(v).request.input, exactInput); v.requestDigest = intent(v).request.requestDigest;
  fixtures.push(v); active = v; return v;
}
function authorize(v) { v.repo.authorizeEstimateIntent(v.projectId, v.jobId, randomUUID(), actor, now, liveEstimateAuthorization(intent(v))); syntheticAuthorityGrants++; return v; }
const execute = (v, changes = {}) => executeHiggsfieldEstimateLive({ repository: v.repo, transport: v.transport.value, actor, now: () => now, timeoutMs: 1500, ...changes }, v.projectId, v.jobId, randomUUID());
function handler(v, configure = () => {}, timeoutMs = 1500) {
  return createStudioOperatorHandler({ enabled: true, listenerAddresses: () => ['127.0.0.1'], openRepository: () => { const repo = open(v.namespace); configure(repo); return repo; }, liveEstimate: { transport: v.transport.value, now: () => now, timeoutMs } });
}
async function call(v, configure = () => {}, { timeoutMs = 1500, inputChanges = {} } = {}) {
  active = v; const saved = state(v);
  const request = new NextRequest(new Request(`http://127.0.0.1:${port}/api/codexforge/animation-studio`, {
    method: 'POST', headers: { Host: `127.0.0.1:${port}`, Origin: `http://127.0.0.1:${port}`, 'X-CodexForge-Animation-Studio': 'local-operator-v1', 'Sec-Fetch-Site': 'same-origin', 'Content-Type': 'application/json', 'Idempotency-Key': randomUUID() },
    body: JSON.stringify({ action: 'execute-estimate', projectId: v.projectId, shotId: v.shotId, expectedProjectRevision: saved.project.revision, expectedShotRevision: saved.shots[0].revision, requestedAt: now, ...inputChanges }),
  }));
  const response = await handler(v, configure, timeoutMs)(request), body = await response.json(); noSecret(body); noSecret([...response.headers]);
  assert.equal(response.headers.get('Cache-Control'), 'no-store'); assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
  const rawReport = body.ok ? body.result.executionOutcome : body.executionOutcome;
  const report = parseEstimateExecutionReport(rawReport); assert.ok(report, 'Execution report must remain canonical.'); assert.equal(report.retryAllowed, false);
  observations.push({ status: response.status, report }); return { status: response.status, body, report };
}
function counts(v, expected) {
  assert.equal(v.receipts.length, expected, 'Server-observed HTTP request count');
  for (const event of ['invocation', 'request-created', 'request-ended', 'socket-assigned']) assert.equal(v.transport.stats.events.filter(item => item === event).length, expected, event);
  assert.equal(v.transport.stats.factoryCalls, expected);
}
function generationLocked(v) {
  const saved = state(v); assert.deepEqual(saved.approvals, []); assert.deepEqual(saved.costs, []); assert.ok(saved.jobs.every(isEstimateJob));
  assert.deepEqual(saved.shots[0].generationAttempts, []); assert.equal(saved.shots[0].actualCost.minorUnits, 0); assert.equal(job(v).actualCost.minorUnits, 0);
  assert.equal(fs.existsSync(generationClaimPath(v)), false); assert.equal(intent(v).request.requestDigest, v.requestDigest); noSecret(saved);
}
function consumed(v, phase) {
  const saved = job(v), operation = intent(v);
  assert.equal(saved.attempt, 1); assert.equal(saved.maxAttempts, 1); assert.equal(operation.attempt, 1); assert.equal(operation.phase, phase);
  assert.equal(operation.authorization.consumedAt, now); assert.ok(saved.dispatch); assert.equal(fs.existsSync(claimPath(v)), true); generationLocked(v);
}
async function restarted(v) {
  const env = {
    SystemRoot: 'C:/Windows', WINDIR: 'C:/Windows', SystemDrive: 'C:', COMSPEC: 'C:/Windows/System32/cmd.exe',
    USERPROFILE: 'C:/Users/User', LOCALAPPDATA: 'C:/Users/User/AppData/Local', APPDATA: 'C:/Users/User/AppData/Roaming',
    HOMEDRIVE: 'C:', HOMEPATH: '/Users/User', TEMP: 'C:/Users/User/AppData/Local/Temp', TMP: 'C:/Users/User/AppData/Local/Temp',
    PATH: 'C:/Program Files/nodejs;C:/Windows/System32;C:/Windows;C:/Windows/System32/WindowsPowerShell/v1.0',
    CI: '1', NEXT_TELEMETRY_DISABLED: '1', NEXT_IGNORE_INCORRECT_LOCKFILE: '1', NEXT_DISABLE_SWC_WASM: '1',
  };
  return new Promise((resolve, reject) => {
    const startedAt = new Date().toISOString(), p = spawn(process.execPath, [fileURLToPath(import.meta.url), '--child', v.namespace, v.projectId, v.jobId, String(port), v.requestDigest], { cwd: root, env, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '', err = ''; p.stdout.on('data', bytes => { out += bytes; }); p.stderr.on('data', bytes => { err += bytes; }); p.once('error', reject);
    p.once('close', exitCode => {
      children.push({ pid: p.pid, startedAt, finishedAt: new Date().toISOString(), exitCode, closed: true });
      try { noSecret(out); noSecret(err); assert.equal(exitCode, 0, 'Owned restart process failed.'); const value = JSON.parse(out); assert.equal(value.sourceFingerprint, sourceFingerprint); resolve(value); } catch (error) { reject(error); }
    });
  });
}
async function noReplay(v, phase) {
  consumed(v, phase); const before = state(v), count = v.receipts.length, claim = hash(fs.readFileSync(claimPath(v)));
  for (let n = 0; n < 2; n++) await execute(v);
  assert.equal(v.receipts.length, count); assert.deepEqual(state(v), before);
  v.repo.close(); repos.splice(repos.indexOf(v.repo), 1); v.repo = open(v.namespace); assert.deepEqual(state(v), before);
  const child = await restarted(v); assert.equal(child.transportInvocations, 0); assert.equal(child.wireInvocations, 0); assert.equal(child.factoryCalls, 0); assert.equal(child.lookups, 0);
  assert.equal(child.attempt, 1); assert.equal(child.phase, phase); assert.equal(child.claimSha256, claim); assert.equal(child.recovery, ['SUCCEEDED', 'FAILED'].includes(phase) ? 'NONE' : 'RECONCILE_EXTERNAL');
  await sleep(60); assert.equal(v.receipts.length, count); assert.deepEqual(state(v), before); assert.equal(hash(fs.readFileSync(claimPath(v))), claim);
}
async function startServer() {
  server = http.createServer((request, response) => {
    const owner = active, chunks = [];
    const receipt = { namespace: owner?.namespace ?? 'UNBOUND', method: request.method, path: request.url, bodyBytes: null, bodySha256: null, observedAt: new Date().toISOString() };
    wireReceipts.push(receipt); owner?.receipts.push(receipt);
    request.on('data', bytes => chunks.push(bytes));
    request.on('end', () => {
      try {
        assert.ok(owner, 'Every observed local request belongs to a synthetic case.');
        assert.equal(request.method, 'POST'); assert.equal(request.url, providerPath);
        assert.ok(request.headers.authorization === 'Key ' + sentinel, 'Unexpected local authentication.');
        const bytes = Buffer.concat(chunks); receipt.bodyBytes = bytes.length; receipt.bodySha256 = hash(bytes);
        assert.equal(bytes.toString('utf8'), JSON.stringify(exactInput)); owner.observed?.();
        if (owner.mode === 'close') { response.destroy(); return; }
        if (owner.mode === 'timeout') return;
        const send = () => {
          response.statusCode = owner.status; response.setHeader('X-Correlation-ID', 'phase2b1d-local-correlation');
          if (owner.status >= 300 && owner.status < 400) response.setHeader('Location', `http://127.0.0.1:${port}/must-never-follow`);
          response.end(owner.mode === 'malformed' ? '{' : owner.status === 200 ? JSON.stringify({ credits: '1.25', usd: '0.012345' }) : JSON.stringify({ detail: sentinel }));
        };
        if (owner.mode === 'delayed') owner.delayRelease = send; else send();
      } catch { serverErrors.push('LOCAL_REQUEST_CONTRACT_REJECTED'); response.destroy(); }
    });
  });
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen({ host: '127.0.0.1', port: 0, exclusive: true }, resolve); });
  port = server.address().port; assert.notEqual(port, 3000); assert.notEqual(port, 3317); allowedPorts.add(port);
}

if (process.argv[2] === '--child') {
  const [, , , namespace, projectId, jobId, rawPort, requestDigest] = process.argv;
  port = Number(rawPort); assert.ok(Number.isInteger(port) && port > 0 && port !== 3000 && port !== 3317); allowedPorts.add(port);
  const v = { namespace, projectId, jobId, requestDigest, repo: open(namespace), transport: transport() };
  try { await execute(v); } catch { /* Existing authority/claim fencing stays closed. */ }
  assert.deepEqual(networkAttempts, []); generationLocked(v);
  const value = { transportInvocations: v.transport.stats.transportInvocations, wireInvocations: v.transport.stats.events.filter(event => event === 'invocation').length, factoryCalls: v.transport.stats.factoryCalls, lookups: v.transport.stats.lookups, attempt: job(v).attempt, phase: intent(v).phase, recovery: v.repo.recoveryPlan(projectId, jobId).action, claimSha256: hash(fs.readFileSync(claimPath(v))), sourceFingerprint };
  v.repo.close(); noSecret(value); console.log(JSON.stringify(value));
} else {
  const evidence = path.join(root, '.codexforge/acceptance/studio-phase2b1d-lifecycle-tests-' + randomUUID()); fs.mkdirSync(evidence, { recursive: true });
  const write = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
  const startedAt = new Date().toISOString(); write('intent.json', { startedAt, pid: process.pid, command: 'node scripts/test-animation-studio-phase2b1d-lifecycle.mjs', sourceBindings, sourceFingerprint, scope: 'Fresh native synthetic namespaces, production single-request wire and owned loopback HTTP only. No live fixture or provider.' });

  test('constructor creates no request object and reads no configuration', () => { const t = transport(); assert.equal(t.stats.transportInvocations, 0); assert.equal(t.stats.lookups, 0); assert.equal(t.stats.factoryCalls, 0); assert.deepEqual(t.stats.events, []); });
  test('missing exact authorization rejects before lookups claims attempts and actual wire', async () => {
    const v = setup(), answer = await call(v); assert.equal(answer.status, 403); assert.equal(answer.report.externalExecution, 'NOT_ATTEMPTED');
    counts(v, 0); assert.equal(v.transport.stats.lookups, 0); assert.equal(job(v).attempt, 0); assert.equal(intent(v).authorization, null); assert.equal(fs.existsSync(claimPath(v)), false);
  });
  for (const [label, credential] of [['missing', null], ['malformed', 'malformed']]) test(`${label} synthetic credential after valid authority sends zero and never restores consumed attempt`, async () => {
    const v = authorize(setup(credential)), answer = await call(v); assert.equal(answer.report.externalExecution, 'NOT_ATTEMPTED'); assert.equal(intent(v).failure.transmitted, false);
    counts(v, 0); assert.equal(v.transport.stats.lookups, 1); consumed(v, 'FAILED'); await noReplay(v, 'FAILED');
  });
  test('parser-valid Unicode rejected by core header preflight remains NOT_ATTEMPTED with zero construction', async () => {
    const v = authorize(setup(unicodeSentinel)), answer = await call(v);
    assert.equal(answer.report.externalExecution, 'NOT_ATTEMPTED'); assert.equal(v.transport.stats.lookups, 1); assert.equal(v.transport.stats.factoryCalls, 0);
    assert.equal(v.receipts.length, 0); assert.deepEqual(v.transport.stats.events, ['invocation']); assert.equal(intent(v).failure.transmitted, false);
    consumed(v, 'FAILED'); await noReplay(v, 'FAILED');
  });
  test('factory failure after irreversible entry is ambiguous even with zero observed wire', async () => {
    const v = authorize(setup()); v.transport.stats.constructionFailure = true;
    const answer = await call(v); assert.equal(answer.report.externalExecution, 'ATTEMPTED'); assert.equal(answer.report.reconciliationRequired, true); assert.equal(v.receipts.length, 0); assert.equal(v.transport.stats.factoryCalls, 1);
    assert.deepEqual(v.transport.stats.events, ['invocation']); consumed(v, 'RESULT_UNKNOWN'); await noReplay(v, 'RESULT_UNKNOWN');
  });
  test('valid exact authority acquires one claim one attempt and exactly one canonical POST', async () => {
    const v = authorize(setup()), answer = await call(v); assert.equal(answer.report.externalExecution, 'ATTEMPTED'); assert.equal(answer.report.persistence, 'PERSISTED'); assert.equal(answer.report.reconciliationRequired, false);
    counts(v, 1); consumed(v, 'SUCCEEDED'); assert.equal(intent(v).result.requestDigest, v.requestDigest); assert.equal(intent(v).result.credits, '1.25');
    assert.throws(() => authorize(v)); await noReplay(v, 'SUCCEEDED');
  });
  test('double-click while first actual request is pending cannot acquire or dispatch again', async () => {
    const v = authorize(setup()); v.mode = 'delayed'; let observed; const seen = new Promise(resolve => { observed = resolve; }); v.observed = observed;
    const first = call(v); await Promise.race([seen, sleep(2000).then(() => { throw Error('Owned local request did not arrive.'); })]); consumed(v, 'EXECUTION_STARTED'); const second = await call(v);
    assert.equal(second.report.externalExecution, 'UNKNOWN'); assert.equal(second.report.retryAllowed, false); assert.equal(v.receipts.length, 1);
    v.delayRelease(); const answer = await first; assert.equal(answer.report.externalExecution, 'ATTEMPTED'); counts(v, 1); await noReplay(v, 'SUCCEEDED');
  });
  for (const status of [421, 301, 302, 303, 307, 308]) test(`actual HTTP ${status} is a definite ATTEMPTED failure with one POST and no follow or retry`, async () => {
    const v = authorize(setup()); v.status = status; const answer = await call(v);
    assert.equal(answer.report.externalExecution, 'ATTEMPTED'); assert.equal(answer.report.outcome, 'FAILED'); assert.equal(answer.report.response.httpStatus, status); assert.equal(answer.report.reconciliationRequired, false);
    assert.equal(intent(v).failure.httpStatus, status); assert.equal(intent(v).failure.retryable, false); counts(v, 1); await noReplay(v, 'FAILED');
  });
  for (const mode of ['close', 'timeout', 'malformed']) test(`actual ${mode} response remains ambiguous with one POST and no restart resubmission`, async () => {
    const v = authorize(setup()); v.mode = mode; const answer = await call(v, () => {}, { timeoutMs: mode === 'timeout' ? 100 : 1500 });
    assert.equal(answer.report.externalExecution, 'ATTEMPTED'); assert.equal(answer.report.outcome, 'RESULT_UNKNOWN'); assert.equal(answer.report.reconciliationRequired, true);
    assert.equal(answer.report.response, null); assert.equal(intent(v).failure.transmitted, true); counts(v, 1); await noReplay(v, 'RESULT_UNKNOWN');
  });
  test('definite real response plus native result-publication failure stays ATTEMPTED and reconciliation-required', async () => {
    const v = authorize(setup()); let failures = 0;
    const answer = await call(v, repo => {
      const native = repo.root;
      repo.root = new Proxy(native, { get(target, property) {
        const method = Reflect.get(target, property); if (property !== 'writeAtomicReplace') return typeof method === 'function' ? method.bind(target) : method;
        return (...args) => {
          const candidate = JSON.parse(Buffer.from(args[2]).toString('utf8'));
          if (candidate.events.at(-1)?.details.request.type !== 'RECORD_ESTIMATE_OUTCOME') return method.apply(target, args);
          const completed = readEstimateIntent(candidate.jobs.find(item => item.jobId === v.jobId)); assert.equal(completed.phase, 'SUCCEEDED'); assert.equal(completed.result.credits, '1.25');
          assert.equal(v.receipts.length, 1); failures++; throw Error('Synthetic native publication failure: ' + sentinel);
        };
      } });
    });
    assert.equal(answer.status, 503); assert.equal(failures, 1); assert.equal(answer.report.externalExecution, 'ATTEMPTED'); assert.equal(answer.report.persistence, 'UNCONFIRMED'); assert.equal(answer.report.reconciliationRequired, true);
    assert.equal(answer.report.response.httpStatus, 200); assert.equal(answer.report.response.credits, '1.25'); counts(v, 1); await noReplay(v, 'EXECUTION_STARTED');
  });
  test('transport-entry tracker cannot regress to NOT_ATTEMPTED after actual local send', async () => {
    const v = authorize(setup()), tracker = new EstimateExecutionTracker(); assert.equal(tracker.snapshot().externalExecution, 'NOT_ATTEMPTED');
    await execute(v, { executionTracker: tracker }); tracker.localFailure(); tracker.replay(job(v));
    assert.equal(tracker.snapshot().externalExecution, 'ATTEMPTED'); assert.equal(tracker.snapshot().transportPhase, 'TRANSPORT_ENTERED'); assert.equal(tracker.snapshot().retryAllowed, false); counts(v, 1);
  });
  test('client cannot supply endpoint URL authorization or wire selection', async () => {
    const v = authorize(setup());
    for (const field of ['endpoint', 'url', 'providerUrl', 'hostname', 'Authorization', 'wire', 'transport', 'authorization']) {
      const answer = await call(v, () => {}, { inputChanges: { [field]: 'http://external.invalid/forged' } }); assert.equal(answer.status, 400); assert.equal(answer.report.externalExecution, 'NOT_ATTEMPTED');
    }
    counts(v, 0); assert.equal(v.transport.stats.lookups, 0); assert.equal(job(v).attempt, 0); assert.equal(fs.existsSync(claimPath(v)), false);
  });
  test('all synthetic fixtures remain generation-locked with secrets absent and external network attempts zero', () => {
    for (const v of fixtures) generationLocked(v);
    for (const value of [observations, wireReceipts, children]) noSecret(value);
    assert.deepEqual(DEFAULT_EXTERNAL_EXECUTION_POLICY, { externalGenerationEnabled: false, paidGenerationEnabled: false, adobeAutomationEnabled: false, blenderRenderEnabled: false });
    assert.deepEqual(networkAttempts, []); assert.deepEqual(serverErrors, []);
  });

  try {
    await startServer();
    for (const t of tests) {
      try { await t.run(); results.push({ name: t.name, status: 'PASS' }); }
      catch (error) { let message = error instanceof Error ? error.message : 'Synthetic test failed'; for (const part of secretParts) message = message.replaceAll(part, '[REDACTED_SYNTHETIC]'); results.push({ name: t.name, status: 'FAIL', error: message }); process.exitCode = 1; break; }
    }
  } catch { results.push({ name: 'owned-local-server startup', status: 'FAIL', error: 'Owned local server failed to start.' }); process.exitCode = 1; }
  finally {
    for (const repo of repos) { try { repo.close(); } catch { /* A deliberately injected native fault must not suppress terminal evidence. */ } }
    if (server) { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
    allowedPorts.clear();
  }
  const sourceUnchanged = sourceBindings.every(item => hash(fs.readFileSync(path.join(root, item.path))) === item.sha256);
  const summary = { startedAt, finishedAt: new Date().toISOString(), pid: process.pid, command: 'node scripts/test-animation-studio-phase2b1d-lifecycle.mjs',
    status: results.length === tests.length && results.every(item => item.status === 'PASS') && networkAttempts.length === 0 && serverErrors.length === 0 && sourceUnchanged ? 'PASS' : 'FAIL',
    planned: tests.length, testCount: results.length, results, observations, children, sourceBindings, sourceFingerprint, sourceUnchanged,
    namespaces: fixtures.map(v => v.namespace), localPort: port, localServerClosed: !server?.listening, localSyntheticHttpRequests: wireReceipts.length, wireReceipts,
    instrumentation: fixtures.map(v => ({ namespace: v.namespace, ...v.transport.stats })), syntheticAuthorityGrants,
    networkAttempts, serverErrors, realCredentialReads: 0, providerRequests: 0, higgsfieldRequests: 0, paidGenerationRequests: 0, generationProviderRequests: 0, productionDataMutations: 0, privateServerActions: 0, port3000Actions: 0,
  };
  noSecret(summary); write('result.json', summary);
  console.log(JSON.stringify({ evidence, status: summary.status, tests: results.length, planned: tests.length, localSyntheticHttpRequests: wireReceipts.length, networkAttempts: networkAttempts.length, localServerClosed: summary.localServerClosed, sourceFingerprint }));
  if (summary.status !== 'PASS') process.exitCode = 1;
}
