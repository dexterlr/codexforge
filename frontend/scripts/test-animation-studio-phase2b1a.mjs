// Phase 2B.1A: real lifecycle and native persistence, synthetic credentials/fake wire only.
// All namespaces are freshly generated. No private server, accepted runtime fixture or live network.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { NextRequest } from 'next/server.js';
import { blockStudioTestNetwork, createStudioTestLoader } from './animation-studio-test-loader.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(path.resolve(process.cwd()), root, 'Run from the exact frontend source root.');
const network = blockStudioTestNetwork(), loader = createStudioTestLoader(root);
const load = name => loader.load('@/lib/codexforge/animation-studio/' + name);
const { openStudioRepository } = load('store.server');
const { sampleProject, sampleSequence, sampleShot } = load('sample');
const { readEstimateIntent, liveEstimateAuthorization, isEstimateJob } = load('higgsfield-estimate-intent');
const { executeHiggsfieldEstimateLive } = load('higgsfield-estimate.server');
const { RealHiggsfieldEstimateTransport } = load('higgsfield-estimate-transport.server');
const { HiggsfieldTransportError } = load('higgsfield-transport.server');
const { createStudioOperatorHandler } = load('operator-http.server');
const { DEFAULT_EXTERNAL_EXECUTION_POLICY } = load('policies');
const { parseEstimateExecutionReport, unknownEstimateExecutionReport, estimateExecutionOperatorMessage } = load('higgsfield-estimate-execution');
const { EstimateExecutionTracker } = load('higgsfield-estimate-execution.server');
const sentinel = 'PHASE2B1A_SYNTHETIC_KEY_ONLY:PHASE2B1A_SYNTHETIC_SECRET_ONLY';
const secretParts = [sentinel, ...sentinel.split(':')];
const now = '2026-09-14T17:00:00.000Z', actor = 'phase2b1a-synthetic-failure-repair';
const key = () => randomUUID(), hash = bytes => createHash('sha256').update(bytes).digest('hex');
const sourceBindings = [...new Set([...loader.loaded, 'scripts/animation-studio-test-loader.mjs', 'scripts/test-animation-studio-phase2b1a.mjs'])].sort().map(name => ({ path: name, sha256: hash(fs.readFileSync(path.join(root, name))) }));
const sourceFingerprint = hash(JSON.stringify(sourceBindings));
const repos = [], fixtures = [], children = [], tests = [], results = [], observations = [], faultEvidence = [];
const test = (name, run) => tests.push({ name, run });
const endpoint = 'http://127.0.0.1:3341/api/codexforge/animation-studio';
const noSecret = value => { const text = typeof value === 'string' ? value : JSON.stringify(value); for (const part of secretParts) assert.equal(text.includes(part), false, 'A synthetic credential escaped.'); assert.equal(text.includes('Authorization:'), false); assert.equal(text.includes('Key PHASE2B1A'), false); };
function open(namespace) { assert.match(namespace, /^phase2b1a-[a-f0-9-]{36}$/u); const repo = openStudioRepository({ workspace: 'test', namespace }); repos.push(repo); return repo; }
class FakeEstimateTransport extends RealHiggsfieldEstimateTransport {
  constructor(credential = sentinel) {
    const stats = { calls: 0, lookups: 0, handler: null, lookupFailure: null };
    super(name => { assert.equal(name, 'HF_CREDENTIALS'); stats.lookups++; if (stats.lookupFailure) throw stats.lookupFailure; return credential; }, async (url, init) => {
      assert.equal(url, 'https://api.higgsfield.ai/estimate/bytedance/seedance/v1/lite/text-to-video');
      assert.equal(init.method, 'POST'); assert.equal(init.redirect, 'error'); assert.equal(init.credentials, 'omit');
      assert.equal(init.headers.Authorization, 'Key ' + sentinel); stats.calls++;
      return stats.handler ? stats.handler(init) : Response.json({ credits: '1.25', usd: '0.012345' }, { headers: { 'X-Correlation-ID': 'phase2b1a-correlation' } });
    });
    this.stats = stats;
  }
}
const state = v => v.repo.load(v.projectId);
const job = v => state(v).jobs.find(item => item.jobId === v.jobId);
const intent = v => readEstimateIntent(job(v));
const count = v => v.fake.stats.calls;
const claimPath = v => path.join(root, '.codexforge/studio-tests', v.namespace, 'studio/higgsfield-estimate-single-test-claim.json');
function setup(credential = sentinel) {
  const namespace = 'phase2b1a-' + randomUUID(), suffix = randomUUID().replaceAll('-', '');
  assert.equal(fs.existsSync(path.join(root, '.codexforge/studio-tests', namespace)), false);
  const v = { namespace, projectId: 'project_' + suffix, sequenceId: 'sequence_' + suffix, shotId: 'shot_' + suffix, repo: open(namespace), fake: new FakeEstimateTransport(credential) };
  v.repo.createProject({ ...sampleProject, projectId: v.projectId, title: 'Synthetic post-dispatch recovery only', description: 'Isolated mock execution. No remote request.', currency: 'USD', createdAt: now }, key(), actor);
  v.repo.saveSequence({ ...sampleSequence, projectId: v.projectId, sequenceId: v.sequenceId }, key(), actor, now);
  const shot = { ...sampleShot, projectId: v.projectId, sequenceId: v.sequenceId, shotId: v.shotId,
    description: 'An original matte blue sphere moves slowly across a plain white background.', duration: 2,
    resolution: { width: 480, height: 480 }, aspectRatio: { width: 1, height: 1 }, camera: { ...sampleShot.camera, movement: 'static' },
    preferredEngine: 'HIGGSFIELD', fallbackEngine: null, continuityRequirements: [], identityStrictness: 'FLEXIBLE', generationMethod: 'GENERATIVE',
    costEstimate: { currency: 'USD', minorUnits: 0 }, actualCost: { currency: 'USD', minorUnits: 0 } };
  v.repo.saveShot(shot, key(), actor, now);
  v.jobId = v.repo.prepareEstimateIntent(v.projectId, v.shotId, state(v).project.revision, shot.revision, key(), actor, now, 'LIVE_ESTIMATE').value.jobId;
  fixtures.push(v); return v;
}
function authorize(v) { v.repo.authorizeEstimateIntent(v.projectId, v.jobId, key(), actor, now, liveEstimateAuthorization(intent(v))); return v; }
const execute = (v, changes = {}) => executeHiggsfieldEstimateLive({ repository: v.repo, transport: v.fake, actor, now: () => now, timeoutMs: 1000, ...changes }, v.projectId, v.jobId, key());
function operation(v) { const s = state(v); return { action: 'execute-estimate', projectId: v.projectId, shotId: v.shotId, expectedProjectRevision: s.project.revision, expectedShotRevision: s.shots[0].revision, requestedAt: now }; }
function handler(v, configure = () => {}) {
  return createStudioOperatorHandler({ enabled: true, listenerAddresses: () => ['127.0.0.1'], openRepository: () => { const repo = open(v.namespace); configure(repo); return repo; }, liveEstimate: { transport: v.fake, now: () => now, timeoutMs: 1000 } });
}
async function call(target, input, changes = {}) {
  const headers = new Headers({ Host: '127.0.0.1:3341', 'X-CodexForge-Animation-Studio': 'local-operator-v1', 'Sec-Fetch-Site': 'same-origin', ...(input ? { Origin: 'http://127.0.0.1:3341', 'Content-Type': 'application/json', 'Idempotency-Key': changes.key ?? key() } : {}) });
  for (const [name, value] of Object.entries(changes.headers ?? {})) { if (value === null) headers.delete(name); else headers.set(name, value); }
  const request = new NextRequest(new Request(changes.url ?? endpoint, { method: input ? 'POST' : 'GET', headers, ...(input ? { body: JSON.stringify(input) } : {}) }));
  const response = await target(request), raw = await response.text(), body = JSON.parse(raw);
  noSecret(raw); noSecret([...response.headers]); assert.equal(response.headers.get('Cache-Control'), 'no-store'); assert.equal(response.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null); assert.equal(response.headers.get('Authorization'), null);
  const answer = { status: response.status, body }; observations.push(answer); return answer;
}
function expectExecution(answer, externalExecution, reconciliationRequired) {
  const raw = answer.body.ok ? answer.body.result.executionOutcome : answer.body.executionOutcome;
  const report = parseEstimateExecutionReport(raw); assert.ok(report, 'HTTP must include a valid structured execution report.');
  assert.equal(report.externalExecution, externalExecution); assert.equal(report.retryAllowed, false);
  if (reconciliationRequired !== undefined) assert.equal(report.reconciliationRequired, reconciliationRequired);
  if (externalExecution !== 'NOT_ATTEMPTED') {
    assert.notEqual(report.transportPhase, 'BEFORE_TRANSPORT');
    assert.doesNotMatch(JSON.stringify(answer.body), /No external execution was attempted|No provider request was made|No estimate was executed/iu);
  }
  const rendered = estimateExecutionOperatorMessage(report); noSecret(rendered);
  assert.equal(typeof rendered.heading, 'string'); assert.ok(rendered.heading.length > 0); assert.equal(typeof rendered.message, 'string');
  if (reconciliationRequired) assert.match(JSON.stringify(rendered), /reconcil|do not retry/iu);
  return report;
}
function assertGeneration(v) {
  const s = state(v); assert.deepEqual(s.approvals, []); assert.ok(s.jobs.every(isEstimateJob));
  assert.deepEqual(s.shots[0].generationAttempts, []); assert.equal(s.shots[0].actualCost.minorUnits, 0);
  assert.deepEqual(s.costs, []); assert.equal(s.jobs.filter(item => item.type === 'GENERATION').length, 0);
  assert.deepEqual(DEFAULT_EXTERNAL_EXECUTION_POLICY, { externalGenerationEnabled: false, paidGenerationEnabled: false, adobeAutomationEnabled: false, blenderRenderEnabled: false }); noSecret(s);
}
// All quote, correlation, failure and terminal fields belong to ONE validated atomic aggregate.
// Inspect the actual candidate bytes at the native boundary rather than invent independent writes.
function atomicFault(repo, v, { event = 'RECORD_ESTIMATE_OUTCOME', afterCommit = false, inspect = () => {}, label = event } = {}) {
  const native = repo.root, seen = [];
  repo.root = new Proxy(native, { get(target, property) {
    const method = Reflect.get(target, property);
    if (property !== 'writeAtomicReplace') return typeof method === 'function' ? method.bind(target) : method;
    return (...args) => {
      const candidate = JSON.parse(Buffer.from(args[2]).toString('utf8'));
      if (candidate.events.at(-1)?.details.request.type !== event) return method.apply(target, args);
      const saved = candidate.jobs.find(item => item.jobId === v.jobId), current = readEstimateIntent(saved); inspect(current, saved, candidate);
      const entry = { label, event, afterCommit, phase: current.phase, attempt: saved.attempt, dispatchState: saved.dispatch?.state ?? null,
        hasResult: current.result !== null, hasFailure: current.failure !== null, correlationId: current.correlationId,
        quote: current.result ? { credits: current.result.credits, usd: current.result.usd } : null,
        candidateSha256: hash(args[2]), providerWireCalls: count(v) };
      seen.push(entry); faultEvidence.push(entry); if (afterCommit) method.apply(target, args);
      throw Error('Synthetic atomic persistence failure: ' + sentinel);
    };
  } });
  return seen;
}
async function child(v, mode = 'execute') {
  const env = Object.fromEntries(['SystemRoot', 'WINDIR', 'PATH', 'TEMP', 'TMP', 'COMSPEC'].filter(name => process.env[name] !== undefined).map(name => [name, process.env[name]]));
  return new Promise((resolve, reject) => {
    const startedAt = new Date().toISOString(), p = spawn(process.execPath, [fileURLToPath(import.meta.url), '--child', v.namespace, v.projectId, v.jobId, mode], { cwd: root, env, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '', err = ''; p.stdout.on('data', bytes => { out += bytes; }); p.stderr.on('data', bytes => { err += bytes; }); p.once('error', reject);
    p.once('close', exitCode => { children.push({ pid: p.pid, mode, startedAt, finishedAt: new Date().toISOString(), exitCode, closed: true }); try { noSecret(out); noSecret(err); assert.equal(exitCode, ({ 'crash-entered': 70, 'crash-response': 71, 'crash-after-commit': 72 })[mode] ?? 0, err); const answer = JSON.parse(out); assert.equal(answer.sourceFingerprint, sourceFingerprint, 'Child execution must use exactly the initially bound source.'); resolve(answer); } catch (error) { reject(error); } });
  });
}
function assertConsumed(v, phase = 'EXECUTION_STARTED') {
  const current = job(v), operation = readEstimateIntent(current);
  assert.equal(current.attempt, 1); assert.equal(operation.attempt, 1); assert.equal(current.maxAttempts, 1);
  assert.equal(operation.phase, phase); assert.equal(operation.authorization.consumedAt, now);
  assert.ok(current.dispatch); assert.equal(fs.existsSync(claimPath(v)), true); assertGeneration(v);
}
async function assertNoReplay(v, phase = 'EXECUTION_STARTED') {
  assertConsumed(v, phase); const saved = state(v), claim = hash(fs.readFileSync(claimPath(v))), beforeCalls = count(v);
  for (let n = 0; n < 2; n++) await execute(v);
  assert.equal(count(v), beforeCalls); assert.deepEqual(state(v), saved); assert.equal(hash(fs.readFileSync(claimPath(v))), claim);
  assert.deepEqual(open(v.namespace).load(v.projectId), saved);
  const refreshed = await call(handler(v), null, { url: endpoint + '?projectId=' + v.projectId }); assert.equal(refreshed.status, 200);
  if (phase === 'RESULT_UNKNOWN') {
    const report = parseEstimateExecutionReport(refreshed.body.result.estimateViews.find(item => item.estimateIntentId === v.jobId).executionOutcome);
    assert.ok(report); assert.equal(report.response, null); assert.doesNotMatch(JSON.stringify(estimateExecutionOperatorMessage(report)), /A provider response was observed/iu);
  }
  assert.equal(count(v), beforeCalls); assert.deepEqual(state(v), saved);
  const restarted = await child(v); assert.equal(restarted.wireCalls, 0); assert.equal(restarted.attempt, 1); assert.equal(restarted.phase, phase); assert.equal(restarted.claimSha256, claim);
  assert.equal(restarted.recovery, ['SUCCEEDED', 'FAILED'].includes(phase) ? 'NONE' : 'RECONCILE_EXTERNAL');
  assert.deepEqual(state(v), saved); assert.equal(hash(fs.readFileSync(claimPath(v))), claim);
}
if (process.argv[2] === '--child') {
  const [, , , namespace, projectId, jobId, mode = 'execute'] = process.argv;
  const v = { namespace, projectId, jobId, repo: open(namespace), fake: new FakeEstimateTransport() };
  // Intentional exits affect only this freshly owned synthetic child. No process signalling.
  const crash = exitCode => { assert.deepEqual(network, []); fs.writeSync(1, JSON.stringify({ mode, wireCalls: count(v), attemptedExitCode: exitCode, sourceFingerprint })); process.exit(exitCode); };
  if (mode === 'crash-entered') v.fake.stats.handler = () => crash(70);
  if (mode === 'crash-response') v.repo.recordEstimateOutcome = () => { assert.equal(count(v), 1); crash(71); };
  if (mode === 'crash-after-commit') {
    const original = v.repo.recordEstimateOutcome.bind(v.repo);
    v.repo.recordEstimateOutcome = (...args) => { original(...args); assert.equal(count(v), 1); crash(72); };
  }
  try { await execute(v); } catch { /* Never acquire a replacement authority on consumed state. */ }
  const saved = job(v); assert.deepEqual(network, []); assertGeneration(v);
  console.log(JSON.stringify({ wireCalls: count(v), attempt: saved.attempt, phase: readEstimateIntent(saved).phase, recovery: v.repo.recoveryPlan(projectId, jobId).action, claimSha256: fs.existsSync(claimPath(v)) ? hash(fs.readFileSync(claimPath(v))) : null, sourceFingerprint }));
  v.repo.close();
} else {
  const evidence = path.join(root, '.codexforge/acceptance/studio-phase2b1a-tests-' + randomUUID());
  fs.mkdirSync(evidence, { recursive: true });
  const startedAt = new Date().toISOString();
  const write = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
  write('intent.json', { startedAt, pid: process.pid, command: 'node scripts/test-animation-studio-phase2b1a.mjs', scope: 'Fresh synthetic native stores, synthetic credentials and fake wire. No accepted fixture, private server or actual network.', sourceBindings, sourceFingerprint });

  test('structured report parser fails closed on absent malformed or forged metadata', () => {
    const unknown = unknownEstimateExecutionReport(); assert.equal(unknown.externalExecution, 'UNKNOWN'); assert.equal(unknown.reconciliationRequired, true); assert.equal(unknown.retryAllowed, false);
    assert.deepEqual(parseEstimateExecutionReport(unknown), unknown);
    for (const value of [null, undefined, {}, [], 'No external execution was attempted', { ...unknown, externalExecution: 'SAFE' }, { ...unknown, retryAllowed: true }, { ...unknown, extra: sentinel }, { ...unknown, response: { httpStatus: 200, correlationId: sentinel, credits: '1', usd: '0' } }]) assert.equal(parseEstimateExecutionReport(value), null);
  });
  test('report enum fields require strings and cannot be arrays or coercible objects', () => {
    const report = unknownEstimateExecutionReport();
    for (const field of ['externalExecution', 'transportPhase', 'outcome', 'persistence']) for (const invalid of [[report[field]], { toString: () => report[field] }]) assert.equal(parseEstimateExecutionReport({ ...report, [field]: invalid }), null);
  });
  test('success and definite failure cannot be fabricated from inconsistent structured fields', () => {
    const attempted = { externalExecution: 'ATTEMPTED', transportPhase: 'TRANSPORT_ENTERED', outcome: 'SUCCEEDED', persistence: 'PERSISTED', reconciliationRequired: false, retryAllowed: false, response: { httpStatus: 200, correlationId: null, credits: '1', usd: '0.01' } };
    assert.deepEqual(parseEstimateExecutionReport(attempted), attempted);
    for (const change of [{ outcome: 'NOT_STARTED' }, { response: null }, { response: { ...attempted.response, credits: null, usd: null } }, { response: { ...attempted.response, httpStatus: 401 } }]) assert.equal(parseEstimateExecutionReport({ ...attempted, ...change }), null);
    assert.equal(parseEstimateExecutionReport({ ...attempted, outcome: 'RESULT_UNKNOWN', reconciliationRequired: true, response: { httpStatus: null, correlationId: null, credits: null, usd: null } }), null);
  });
  test('operator message follows structured unknown state and never implies a safe automatic retry', () => {
    const message = estimateExecutionOperatorMessage(unknownEstimateExecutionReport());
    assert.match(JSON.stringify(message), /reconcil|do not retry/iu); assert.doesNotMatch(JSON.stringify(message), /No external execution was attempted/iu);
  });
  test('execution tracker flips irreversibly immediately at actual fake wire entry', async () => {
    const v = authorize(setup()), tracker = new EstimateExecutionTracker();
    assert.equal(tracker.snapshot().externalExecution, 'NOT_ATTEMPTED');
    v.fake.stats.handler = () => {
      const entered = tracker.snapshot(); assert.equal(entered.transportPhase, 'TRANSPORT_ENTERED'); assert.notEqual(entered.externalExecution, 'NOT_ATTEMPTED');
      tracker.localFailure(); assert.equal(tracker.snapshot().transportPhase, 'TRANSPORT_ENTERED'); assert.notEqual(tracker.snapshot().externalExecution, 'NOT_ATTEMPTED');
      throw new HiggsfieldTransportError(null, false);
    };
    await execute(v, { executionTracker: tracker }); const terminal = tracker.snapshot();
    assert.equal(terminal.externalExecution, 'ATTEMPTED'); assert.equal(terminal.outcome, 'RESULT_UNKNOWN'); assert.equal(terminal.transportPhase, 'TRANSPORT_ENTERED'); assert.equal(terminal.reconciliationRequired, true); assert.equal(count(v), 1); assertConsumed(v, 'RESULT_UNKNOWN');
  });
  test('replay projection cannot erase the same tracker irreversible transport observation', () => {
    const v = setup(), tracker = new EstimateExecutionTracker(); tracker.transportEntered(); tracker.replay(job(v));
    assert.equal(tracker.snapshot().externalExecution, 'ATTEMPTED'); assert.equal(tracker.snapshot().transportPhase, 'TRANSPORT_ENTERED'); assert.equal(tracker.snapshot().reconciliationRequired, true); assert.equal(count(v), 0); assertGeneration(v);
  });
  test('unauthorized estimate is definitely NOT_ATTEMPTED before credential lookup', async () => {
    const v = setup(), answer = await call(handler(v), operation(v));
    assert.equal(answer.status, 403); expectExecution(answer, 'NOT_ATTEMPTED');
    assert.equal(count(v), 0); assert.equal(v.fake.stats.lookups, 0); assert.equal(job(v).attempt, 0); assert.equal(fs.existsSync(claimPath(v)), false); assertGeneration(v);
  });
  test('stale revision is definitely NOT_ATTEMPTED before acquisition', async () => {
    const v = authorize(setup()), answer = await call(handler(v), { ...operation(v), expectedShotRevision: 2 });
    assert.equal(answer.status, 409); expectExecution(answer, 'NOT_ATTEMPTED'); assert.equal(count(v), 0); assert.equal(job(v).attempt, 0); assertGeneration(v);
  });
  test('claim acquisition failure is NOT_ATTEMPTED and cannot expose raw errors', async () => {
    const v = authorize(setup()), answer = await call(handler(v, repo => { repo.acquireEstimateExecution = () => { throw Error(sentinel); }; }), operation(v));
    assert.equal(answer.status, 503); expectExecution(answer, 'NOT_ATTEMPTED'); assert.equal(count(v), 0); assert.equal(job(v).attempt, 0); assert.equal(fs.existsSync(claimPath(v)), false); assertGeneration(v);
  });
  test('pre-transport fenced dispatch publication failure preserves surviving claim and blocks replay', async () => {
    const v = authorize(setup()); let observed;
    const answer = await call(handler(v, repo => { observed = atomicFault(repo, v, { event: 'ACQUIRE_ESTIMATE', inspect: (i, j) => { assert.equal(i.phase, 'EXECUTION_STARTED'); assert.equal(j.dispatch.state, 'INTENT_RECORDED'); assert.equal(count(v), 0); } }); }), operation(v));
    assert.equal(answer.status, 503); expectExecution(answer, 'NOT_ATTEMPTED'); assert.equal(observed.length, 1);
    assert.equal(count(v), 0); assert.equal(job(v).attempt, 0); assert.equal(fs.existsSync(claimPath(v)), true);
    const claim = hash(fs.readFileSync(claimPath(v))), restarted = await child(v);
    assert.equal(restarted.wireCalls, 0); assert.equal(restarted.attempt, 0); assert.equal(restarted.recovery, 'RECONCILE_EXTERNAL'); assert.equal(restarted.claimSha256, claim); assertGeneration(v);
    const refreshed = await call(handler(v), null, { url: endpoint + '?projectId=' + v.projectId });
    const report = parseEstimateExecutionReport(refreshed.body.result.estimateViews.find(item => item.estimateIntentId === v.jobId).executionOutcome);
    assert.ok(report); assert.equal(report.externalExecution, 'UNKNOWN'); assert.equal(report.reconciliationRequired, true); assert.equal(report.retryAllowed, false);
  });
  for (const [label, credential] of [['missing', null], ['malformed', 'malformed']]) test(`credential ${label} is NOT_ATTEMPTED with consumed attempt and no wire entry`, async () => {
    const v = authorize(setup(credential)), answer = await call(handler(v), operation(v)); expectExecution(answer, 'NOT_ATTEMPTED');
    assert.equal(answer.status, 200); assert.equal(count(v), 0); assert.equal(intent(v).failure.transmitted, false); assertConsumed(v, 'FAILED'); await assertNoReplay(v, 'FAILED');
  });
  test('credential lookup exception is redacted and remains definitely before wire entry', async () => {
    const v = authorize(setup()); v.fake.stats.lookupFailure = Error(sentinel);
    const answer = await call(handler(v), operation(v)); expectExecution(answer, 'NOT_ATTEMPTED');
    assert.equal(count(v), 0); assert.equal(v.fake.stats.lookups, 1); assertConsumed(v, 'FAILED'); assert.equal(intent(v).failure.transmitted, false);
  });
  test('final acquired-authority assertion fails before wire and never leaks injected exception', async () => {
    const v = authorize(setup()), answer = await call(handler(v, repo => { repo.assertAcquiredEstimateCurrent = () => { throw Error(sentinel); }; }), operation(v));
    expectExecution(answer, 'NOT_ATTEMPTED'); assert.equal(count(v), 0); assert.equal(v.fake.stats.lookups, 0); assertConsumed(v, 'FAILED');
  });
  for (const [label, thrown] of [['plain exception', Error(sentinel)], ['misleading transmitted false exception', new HiggsfieldTransportError(null, false)]]) test(`wire entry cannot be downgraded by ${label}`, async () => {
    const v = authorize(setup()); v.fake.stats.handler = () => { throw thrown; };
    const answer = await call(handler(v), operation(v)); const report = expectExecution(answer, 'ATTEMPTED', true); assert.equal(report.outcome, 'RESULT_UNKNOWN'); assert.equal(answer.status, 200);
    assert.equal(report.response, null); assert.doesNotMatch(JSON.stringify(estimateExecutionOperatorMessage(report)), /A provider response was observed/iu);
    assert.equal(count(v), 1); assert.equal(intent(v).failure.transmitted, true); assertConsumed(v, 'RESULT_UNKNOWN'); await assertNoReplay(v, 'RESULT_UNKNOWN');
  });
  test('provider success persists credits USD correlation bound request and terminal state', async () => {
    const v = authorize(setup()), digest = intent(v).request.requestDigest, answer = await call(handler(v), operation(v));
    assert.equal(answer.status, 200); const report = expectExecution(answer, 'ATTEMPTED', false); assert.equal(report.persistence, 'PERSISTED'); assertConsumed(v, 'SUCCEEDED');
    const i = intent(v); assert.equal(i.result.credits, '1.25'); assert.equal(i.result.usd, '0.012345'); assert.equal(i.result.correlationId, 'phase2b1a-correlation');
    assert.equal(i.result.requestDigest, digest); assert.equal(i.result.estimateIntentId, v.jobId); assert.equal(i.result.attempt, 1); assert.equal(i.result.synthetic, false);
    assert.equal(count(v), 1); await assertNoReplay(v, 'SUCCEEDED');
  });
  for (const status of [401, 403, 404, 422, 429, 500, 503]) test(`HTTP ${status} is definite ATTEMPTED failure with persisted correlation and no retry`, async () => {
    const v = authorize(setup()); v.fake.stats.handler = () => Response.json({ detail: sentinel }, { status, headers: { 'X-Correlation-ID': 'phase2b1a-correlation' } });
    const answer = await call(handler(v), operation(v)); assert.equal(answer.status, 200); expectExecution(answer, 'ATTEMPTED', false);
    assertConsumed(v, 'FAILED'); assert.equal(intent(v).failure.httpStatus, status); assert.equal(intent(v).failure.retryable, false); assert.equal(intent(v).correlationId, 'phase2b1a-correlation');
    await execute(v); assert.equal(count(v), 1); assertGeneration(v);
  });
  for (const [label, inspect] of [
    ['provider response metadata', i => { assert.equal(i.phase, 'SUCCEEDED'); assert.equal(i.result.estimatedAt, now); assert.equal(i.result.provider, 'HIGGSFIELD'); }],
    ['result and quote cost', i => { assert.equal(i.result.credits, '1.25'); assert.equal(i.result.usd, '0.012345'); }],
    ['correlation ID', i => { assert.equal(i.correlationId, 'phase2b1a-correlation'); assert.equal(i.result.correlationId, i.correlationId); }],
    ['terminal job state', (i, j) => { assert.equal(i.phase, 'SUCCEEDED'); assert.equal(j.state, 'SUCCEEDED'); assert.equal(j.finishedAt, now); }],
    ['completed dispatch metadata', (i, j) => { assert.equal(i.attempt, 1); assert.equal(j.dispatch.state, 'COMPLETED'); }],
  ]) test(`atomic ${label} publication failure after a definite success requires reconciliation`, async () => {
    const v = authorize(setup()); let observed;
    const answer = await call(handler(v, repo => { observed = atomicFault(repo, v, { label, inspect }); }), operation(v));
    assert.equal(answer.status, 503); const report = expectExecution(answer, 'ATTEMPTED', true); assert.equal(report.persistence, 'UNCONFIRMED'); assert.equal(observed.length, 1); assert.equal(observed[0].providerWireCalls, 1);
    assert.deepEqual(report.response, { httpStatus: 200, correlationId: 'phase2b1a-correlation', credits: '1.25', usd: '0.012345' });
    assert.equal(count(v), 1); assertConsumed(v); await assertNoReplay(v);
  });
  for (const status of [401, 503]) test(`HTTP ${status} failure-record publication failure remains ATTEMPTED and consumed`, async () => {
    const v = authorize(setup()); v.fake.stats.handler = () => Response.json({ detail: sentinel }, { status, headers: { 'X-Correlation-ID': 'phase2b1a-correlation' } });
    let observed; const answer = await call(handler(v, repo => { observed = atomicFault(repo, v, { label: 'failure record', inspect: i => { assert.equal(i.phase, 'FAILED'); assert.equal(i.failure.httpStatus, status); assert.equal(i.failure.transmitted, true); assert.equal(i.correlationId, 'phase2b1a-correlation'); } }); }), operation(v));
    assert.equal(answer.status, 503); expectExecution(answer, 'ATTEMPTED', true); assert.equal(observed.length, 1); assertConsumed(v); await assertNoReplay(v);
  });
  test('ambiguous-response publication failure remains UNKNOWN with durable dispatch and no retry', async () => {
    const v = authorize(setup()); v.fake.stats.handler = () => { throw Error(sentinel); };
    const answer = await call(handler(v, repo => { atomicFault(repo, v, { inspect: i => { assert.equal(i.phase, 'RESULT_UNKNOWN'); assert.equal(i.failure.transmitted, true); } }); }), operation(v));
    assert.equal(answer.status, 503); const report = expectExecution(answer, 'ATTEMPTED', true); assert.equal(report.outcome, 'RESULT_UNKNOWN'); assertConsumed(v); await assertNoReplay(v);
  });
  test('commit completed but acknowledgement failed returns durable success without another wire call', async () => {
    const v = authorize(setup()); let observed;
    const answer = await call(handler(v, repo => { observed = atomicFault(repo, v, { afterCommit: true }); }), operation(v));
    assert.equal(answer.status, 200); expectExecution(answer, 'ATTEMPTED', false); assert.equal(observed.length, 1); assertConsumed(v, 'SUCCEEDED'); await assertNoReplay(v, 'SUCCEEDED');
  });
  for (const mode of ['crash-entered', 'crash-response', 'crash-after-commit']) test(`actual process ${mode} preserves canonical no-retry state on restart`, async () => {
    const v = authorize(setup()), crashed = await child(v, mode);
    assert.equal(crashed.wireCalls, 1); assert.equal(count(v), 0);
    const phase = mode === 'crash-after-commit' ? 'SUCCEEDED' : 'EXECUTION_STARTED';
    assertConsumed(v, phase); await assertNoReplay(v, phase);
    const refreshed = await call(handler(v), null, { url: endpoint + '?projectId=' + v.projectId });
    const report = parseEstimateExecutionReport(refreshed.body.result.estimateViews.find(item => item.estimateIntentId === v.jobId).executionOutcome);
    assert.ok(report); assert.equal(report.externalExecution, phase === 'SUCCEEDED' ? 'ATTEMPTED' : 'UNKNOWN');
    assert.equal(report.reconciliationRequired, phase !== 'SUCCEEDED'); assert.equal(report.retryAllowed, false);
  });
  for (const boundary of ['load', 'listProjects', 'close']) test(`post-response ${boundary} failure cannot replace provenance with no-execution message`, async () => {
    const v = authorize(setup()); const answer = await call(handler(v, repo => {
      const original = repo[boundary].bind(repo);
      repo[boundary] = (...args) => { if (count(v) > 0) { if (boundary === 'close') original(...args); throw Error(sentinel); } return original(...args); };
    }), operation(v));
    assert.equal(answer.status, 503); expectExecution(answer, 'ATTEMPTED', true); assert.equal(count(v), 1); assertGeneration(v);
    assert.equal(fs.existsSync(claimPath(v)), true); assert.equal(job(v).attempt, 1);
  });
  test('secondary close failure preserves primary post-response publication failure classification', async () => {
    const v = authorize(setup()); const answer = await call(handler(v, repo => {
      atomicFault(repo, v); const close = repo.close.bind(repo); repo.close = () => { close(); throw Error('Secondary close: ' + sentinel); };
    }), operation(v));
    assert.equal(answer.status, 503); expectExecution(answer, 'ATTEMPTED', true); assertConsumed(v); await assertNoReplay(v);
  });
  test('secondary close failure does not relabel definite pre-transport authorization rejection', async () => {
    const v = setup(), answer = await call(handler(v, repo => { const close = repo.close.bind(repo); repo.close = () => { close(); throw Error(sentinel); }; }), operation(v));
    assert.equal(answer.status, 403); assert.equal(answer.body.error.code, 'ESTIMATE_EXECUTION_NOT_AUTHORIZED'); expectExecution(answer, 'NOT_ATTEMPTED'); assert.equal(count(v), 0); assertGeneration(v);
  });
  test('double click during delayed wire entry invokes the provider fake exactly once', async () => {
    const v = authorize(setup()); let release, entered;
    const started = new Promise(resolve => { entered = resolve; });
    v.fake.stats.handler = () => { entered(); return new Promise(resolve => { release = resolve; }); };
    const pending = call(handler(v), operation(v)); await started;
    assertConsumed(v); assert.equal(count(v), 1); const duplicate = await call(handler(v), operation(v));
    expectExecution(duplicate, 'UNKNOWN', true); assert.equal(count(v), 1);
    release(Response.json({ credits: '1.25', usd: '0.012345' })); const answer = await pending;
    expectExecution(answer, 'ATTEMPTED', false); assert.equal(count(v), 1); assertConsumed(v, 'SUCCEEDED');
  });
  test('provider correlation containing a credential sentinel never reaches recovery metadata', async () => {
    const v = authorize(setup()); v.fake.stats.handler = () => Response.json({ credits: '1', usd: '0.1' }, { headers: { 'X-Correlation-ID': sentinel.split(':')[1] } });
    const answer = await call(handler(v, repo => { atomicFault(repo, v, { inspect: i => { assert.equal(i.correlationId, null); } }); }), operation(v));
    expectExecution(answer, 'ATTEMPTED', true); assert.equal(count(v), 1); assertConsumed(v);
  });
  test('every isolated fixture remains generation-locked and free of secret-bearing provenance', () => { for (const v of fixtures) assertGeneration(v); for (const item of observations) noSecret(item); for (const item of faultEvidence) noSecret(item); });
  test('live provider and socket tripwires remain exactly zero', () => assert.deepEqual(network, []));

  for (const t of tests) {
    try { await t.run(); results.push({ name: t.name, status: 'PASS' }); }
    catch (error) { let message = error instanceof Error ? error.message : 'Unknown synthetic test failure'; for (const part of secretParts) message = message.replaceAll(part, '[REDACTED_SYNTHETIC]'); results.push({ name: t.name, status: 'FAIL', error: message }); console.error('FAIL: ' + t.name + ': ' + message); process.exitCode = 1; break; }
  }
  for (const repo of repos) { try { repo.close(); } catch { /* A deliberately throwing close seam was already observed in its case. */ } }
  const sourceUnchanged = sourceBindings.every(item => hash(fs.readFileSync(path.join(root, item.path))) === item.sha256);
  const summary = { startedAt, finishedAt: new Date().toISOString(), pid: process.pid, command: 'node scripts/test-animation-studio-phase2b1a.mjs',
    status: results.length === tests.length && results.every(item => item.status === 'PASS') && network.length === 0 && sourceUnchanged ? 'PASS' : 'FAIL',
    planned: tests.length, testCount: results.length, results, observations, faultEvidence, children, namespaces: fixtures.map(v => v.namespace),
    networkAttempts: network, realCredentialReads: 0, providerRequests: 0, paidGenerationRequests: 0, generationRequests: 0, productionDataMutations: 0,
    fakeEstimateWireCalls: fixtures.reduce((total, v) => total + count(v), 0), injectedCredentialLookups: fixtures.reduce((total, v) => total + v.fake.stats.lookups, 0),
    sourceBindings, sourceFingerprint, sourceUnchanged };
  write('result.json', summary); console.log(JSON.stringify({ evidence, status: summary.status, tests: results.length, planned: tests.length, networkAttempts: network.length }));
  if (summary.status !== 'PASS') process.exitCode = 1;
}
