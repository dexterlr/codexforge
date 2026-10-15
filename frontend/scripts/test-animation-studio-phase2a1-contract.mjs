// Real contract/transport source with explicit fake I/O. No provider request or secret lookup.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createStudioTestLoader, blockStudioTestNetwork } from './animation-studio-test-loader.mjs';

const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const contract = loader.load('@/lib/codexforge/animation-studio/higgsfield-contract.server');
const transport = loader.load('@/lib/codexforge/animation-studio/higgsfield-transport.server');
const { sampleShot } = loader.load('@/lib/codexforge/animation-studio/sample');
const { hashJarvisChatCanonicalJson: digest } = loader.load('@/lib/codexforge/jarvis-chat/jarvis-chat-crypto');
const runId = randomUUID(), evidence = path.join(frontend, '.codexforge/acceptance', `studio-phase2a1-contract-tests-${runId}`);
fs.mkdirSync(evidence, { recursive: true });
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const write = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
const startedAt = new Date().toISOString();
write('intent.json', { startedAt, pid: process.pid, runId, command: 'node scripts/test-animation-studio-phase2a1-contract.mjs', scope: 'Documented contract, injected mock transport and local validation only' });
const sentinel = 'SYNTHETIC_HF_KEY_PHASE2A1:SYNTHETIC_HF_SECRET_PHASE2A1';
const shot = { ...sampleShot, projectId: 'project_provider_test_001', sequenceId: 'sequence_provider_test_001', shotId: 'shot_provider_test_001', description: 'An original matte blue sphere moves across a plain white background.', duration: 2, resolution: { width: 480, height: 480 }, aspectRatio: { width: 1, height: 1 }, identityStrictness: 'FLEXIBLE', continuityRequirements: [], generationMethod: 'GENERATIVE', camera: { ...sampleShot.camera, movement: 'static' }, notes: ['Synthetic document-contract test only. Output FPS and pixel grid are not provider guarantees.'] };
const request = contract.buildHiggsfieldRequest(shot);
const requestId = '12345678-1234-4234-8234-123456789abc';
const statusUrl = `https://api.higgsfield.ai/requests/${requestId}/status`, cancelUrl = `https://api.higgsfield.ai/requests/${requestId}/cancel`;
const response = status => ({ status, request_id: requestId, status_url: statusUrl, cancel_url: cancelUrl });
const completed = { ...response('completed'), video: { url: 'https://media.example.com/synthetic.mp4' } };
const upload = { public_url: 'https://media.example.com/synthetic.mp4', upload_url: 'https://storage.example.com/upload?signature=synthetic', content_type: 'video/mp4', upload_headers: { 'Content-Type': 'video/mp4', 'x-amz-tagging': 'retention=temporary' } };
class FakeHiggsfieldTransport {
  kind = 'MOCK'; calls = [];
  constructor(statusHandler = async () => ({ status: 200, headers: {}, body: response('queued') })) { this.statusHandler = statusHandler; }
  async submit(value) { this.calls.push({ operation: 'submit', requestDigest: value.requestDigest }); return { status: 200, headers: { 'X-Correlation-ID': 'synthetic-correlation' }, body: response('queued') }; }
  async status(url, options) { this.calls.push({ operation: 'status', url }); return this.statusHandler(url, options); }
  async cancel(url) { this.calls.push({ operation: 'cancel', url }); return { status: 202, headers: {}, body: null }; }
  async estimate(value) { this.calls.push({ operation: 'estimate', requestDigest: value.requestDigest }); return { status: 200, headers: {}, body: { credits: '0.125', usd: '0.001' } }; }
  async createUpload() { return { status: 200, headers: {}, body: upload }; }
  async upload() { this.calls.push({ operation: 'upload' }); }
  async download() { this.calls.push({ operation: 'download' }); return { bytes: new Uint8Array([1]), contentType: 'video/mp4' }; }
}
const policy = { maxAttempts: 3, totalDeadlineMs: 500, baseDelayMs: 10, maxDelayMs: 30 };
function fakeClock() { let instant = 0; const sleeps = []; return { sleeps, now: () => instant, sleep: async ms => { sleeps.push(ms); instant += ms; }, random: () => 0.5 }; }
const tests = [];
const test = (name, body) => tests.push({ name, body });

test('01 Synthetic configuration parses without retaining a secret', () => {
  assert.deepEqual(contract.parseHiggsfieldConfiguration(sentinel), { configuration: 'LOCALLY_CONFIGURED', remoteAuthentication: 'NOT_VERIFIED', execution: 'EXECUTION_DISABLED' });
  for (const value of [undefined, null, '']) assert.equal(contract.parseHiggsfieldConfiguration(value).configuration, 'NOT_CONFIGURED');
  assert.equal(JSON.stringify(contract.parseHiggsfieldConfiguration(sentinel)).includes(sentinel), false);
});
test('02 Malformed credentials, extra separators and getters are rejected without reading properties', () => {
  for (const value of ['a', ':secret', 'key:', 'key:secret:extra', ' key:secret', 'key:secret\n', 42, {}, Object.defineProperty({}, 'value', { get() { throw Error('not called'); } })]) assert.equal(contract.parseHiggsfieldConfiguration(value).configuration, 'INVALID_LOCAL_FORMAT');
});
test('03 Injected environment lookup requests only HF_CREDENTIALS and redacts failure', () => {
  const names = [];
  const value = contract.readHiggsfieldConfiguration(name => { names.push(name); return sentinel; });
  assert.deepEqual(names, ['HF_CREDENTIALS']); assert.equal(value.configuration, 'LOCALLY_CONFIGURED');
  assert.equal(contract.readHiggsfieldConfiguration(() => { throw Error(sentinel); }).configuration, 'INVALID_LOCAL_FORMAT');
});
test('04 Candidate maps exact documented fields and preserves explicit saved intent', () => {
  assert.equal(request.model, 'bytedance/seedance/v1/lite'); assert.equal(request.endpoint, '/bytedance/seedance/v1/lite/text-to-video');
  assert.deepEqual(request.input, { prompt: shot.description, duration: 2, resolution: '480', aspect_ratio: '1:1', camera_fixed: true });
  assert.equal(Object.hasOwn(request.input, 'seed'), false); assert.equal(Object.hasOwn(request.input, 'fps'), false);
});
test('05 Historical one-second 512-square plan is rejected rather than silently rewritten', () => {
  assert.throws(() => contract.buildHiggsfieldRequest({ ...shot, duration: 1, resolution: { width: 512, height: 512 } }), /HIGGSFIELD/);
  assert.equal(shot.duration, 2); assert.equal(sampleShot.duration, 6);
});
test('06 Required references and non-text input fail closed including duplicates', () => {
  const reference = { assetId: 'asset_synthetic', version: 1 };
  for (const change of [{ inputAssets: [reference] }, { sourceReferences: [reference] }, { audio: [reference] }, { characters: ['character_synthetic'] }, { environment: 'environment_synthetic' }]) assert.throws(() => contract.buildHiggsfieldRequest({ ...shot, ...change }));
  for (const refs of [[{ ...reference, contentHash: 'a'.repeat(64) }], [reference, reference], null, {}]) assert.throws(() => contract.buildHiggsfieldRequest(shot, refs));
});
test('07 Duration boundaries are integer two through twelve, not string approximations', () => {
  for (const duration of [2, 12]) assert.equal(contract.buildHiggsfieldRequest({ ...shot, duration }).input.duration, duration);
  for (const duration of [1, 13, 2.5, '2', null]) assert.throws(() => contract.buildHiggsfieldRequest({ ...shot, duration }));
});
test('08 Aspect, resolution, identity and camera mismatches are not substituted', () => {
  for (const change of [{ camera: { ...shot.camera, movement: 'pan left' } }, { identityStrictness: 'EXACT' }, { generationMethod: '3D' }, { resolution: { width: 480, height: 720 } }, { aspectRatio: { width: 2, height: 1 } }]) assert.throws(() => contract.buildHiggsfieldRequest({ ...shot, ...change }));
  assert.equal(contract.buildHiggsfieldRequest({ ...shot, resolution: { width: 720, height: 720 } }).input.resolution, '720');
});
test('09 Request digest independently binds every canonical identity and provider-ready field', () => {
  const { requestDigest, ...payload } = request;
  assert.equal(requestDigest, digest(payload)); assert.deepEqual(contract.validateHiggsfieldRequest(JSON.parse(JSON.stringify(request))), request);
  assert.equal(payload.projectId, shot.projectId); assert.equal(payload.sequenceId, shot.sequenceId); assert.equal(payload.shotRevision, shot.revision);
});
test('10 Mutation without digest replacement is rejected across prompt, model, settings and shot revision', () => {
  for (const change of [{ input: { ...request.input, prompt: 'Changed original abstract prompt' } }, { input: { ...request.input, duration: 3 } }, { input: { ...request.input, camera_fixed: false } }, { shotRevision: 2 }, { shotId: 'shot_other' }, { model: 'other' }, { endpoint: '/other' }]) assert.throws(() => contract.validateHiggsfieldRequest({ ...request, ...change }));
});
test('11 Unknown authority fields, forged digest and credential-bearing request fields reject', () => {
  for (const change of [{ requestDigest: 'a'.repeat(64) }, { authorization: sentinel }, { providerJobId: requestId }, { cost: 0 }, { input: { ...request.input, credentials: sentinel } }]) assert.throws(() => contract.validateHiggsfieldRequest({ ...request, ...change }));
});
test('12 Six provider lifecycle states normalize deliberately without inventing completion', () => {
  for (const state of ['queued', 'in_progress', 'completed', 'failed', 'nsfw', 'canceled']) { const value = contract.normalizeHiggsfieldStatus(response(state)); assert.equal(value.status, state); assert.equal(value.requestId, requestId); assert.equal(value.videoUrl, null); }
});
test('13 Arbitrary provider error details are never retained or echoed', () => {
  for (const error of [sentinel, [sentinel], { secret: sentinel }]) { const value = contract.normalizeHiggsfieldStatus({ ...response('failed'), error }); assert.equal(value.errorCode, 'PROVIDER_FAILED'); assert.equal(JSON.stringify(value).includes(sentinel), false); }
  assert.equal(contract.normalizeHiggsfieldStatus(response('nsfw')).errorCode, 'CONTENT_MODERATED');
});
test('14 Identifier and lifecycle URL binding reject wrong paths, origins, ports and credentials', () => {
  for (const value of ['not-a-uuid', requestId.toUpperCase(), '../escape']) assert.throws(() => contract.normalizeHiggsfieldStatus({ ...response('queued'), request_id: value }));
  for (const url of [statusUrl.replace('api.higgsfield.ai', 'evil.example.com'), cancelUrl, statusUrl + '?token=bad', statusUrl + '#bad', statusUrl.replace('https:', 'http:'), statusUrl.replace('api.', 'key:secret@api.'), statusUrl.replace('.ai/', '.ai:444/'), statusUrl.replace(requestId, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa')]) assert.throws(() => contract.normalizeHiggsfieldStatus({ ...response('queued'), status_url: url }));
  assert.throws(() => contract.normalizeHiggsfieldStatus(response('queued'), {}, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'));
});
test('15 Shared status schema permits omitted lifecycle URLs without fabricating them', () => {
  const value = contract.normalizeHiggsfieldStatus({ request_id: requestId, status: 'queued' });
  assert.equal(value.statusUrl, null); assert.equal(value.cancelUrl, null); assert.equal(value.requestId, requestId);
});
test('16 Persisted normalized status is strictly revalidated', () => {
  const value = contract.normalizeHiggsfieldStatus(completed, { 'X-Correlation-ID': 'synthetic-123' });
  assert.deepEqual(contract.validateHiggsfieldStatus(value), value);
  for (const change of [{ errorCode: 'forged' }, { cost: 10 }, { status: 'success' }, { correlationId: 'bad\r\nheader' }]) assert.throws(() => contract.validateHiggsfieldStatus({ ...value, ...change }));
});
test('17 Optional correlation ID is bounded, unique and server-response-only', () => {
  assert.equal(contract.normalizeHiggsfieldStatus(response('queued')).correlationId, null);
  assert.equal(contract.normalizeHiggsfieldStatus(response('queued'), { 'x-correlation-id': 'synthetic123' }).correlationId, 'synthetic123');
  for (const headers of [{ 'X-Correlation-ID': 'x', 'x-correlation-id': 'x' }, { 'X-Correlation-ID': '' }, { 'X-Correlation-ID': 'a'.repeat(129) }]) assert.throws(() => contract.normalizeHiggsfieldStatus(response('queued'), headers));
});
test('18 Media normalization accepts bounded HTTPS outputs and rejects unsafe or token-bearing URLs', () => {
  assert.equal(contract.normalizeHiggsfieldStatus(completed).videoUrl, completed.video.url);
  for (const url of ['http://media.example.com/a', 'https://localhost/a', 'https://127.0.0.1/a', 'https://[::1]/a', 'https://media.internal/a', 'https://key:secret@media.example.com/a', 'https://media.example.com/a?token=bad', 'https://media.example.com/a#fragment']) assert.throws(() => contract.normalizeHiggsfieldStatus({ ...completed, video: { url } }));
  assert.throws(() => contract.normalizeHiggsfieldStatus({ ...completed, video: { ...completed.video, secret: sentinel } }));
});
test('19 Estimate preserves exact illustrative decimal strings, never inventing account pricing', () => {
  assert.deepEqual(contract.normalizeHiggsfieldEstimate({ credits: '0.125', usd: '0.001' }, request.requestDigest), { requestDigest: request.requestDigest, credits: '0.125', usd: '0.001' });
});
test('20 Missing, negative, exponential, imprecise or forged estimate shapes reject', () => {
  for (const value of [{ credits: '1' }, { credits: 1, usd: '0.1' }, { credits: '-1', usd: '0.1' }, { credits: '1e3', usd: '0.1' }, { credits: '1', usd: '0.0000001' }, { credits: '1', usd: '0.1', authorized: true }]) assert.throws(() => contract.normalizeHiggsfieldEstimate(value, request.requestDigest));
  assert.throws(() => contract.normalizeHiggsfieldEstimate({ credits: '1', usd: '0.1' }, 'forged'));
});
test('21 Documented upload fields and required storage headers are retained', () => {
  const value = contract.normalizeHiggsfieldUpload(upload);
  assert.equal(value.publicUrl, upload.public_url); assert.equal(value.uploadUrl, upload.upload_url);
  assert.deepEqual(value.headers, { 'content-type': 'video/mp4', 'x-amz-tagging': 'retention=temporary' });
});
test('22 Storage upload rejects API credentials, duplicate or unknown headers and MIME mismatch', () => {
  for (const headers of [{ ...upload.upload_headers, Authorization: `Key ${sentinel}` }, { ...upload.upload_headers, Cookie: sentinel }, { ...upload.upload_headers, 'hf-api-key': sentinel }, { ...upload.upload_headers, 'Content-Type': 'image/png' }, { ...upload.upload_headers, 'content-type': 'video/mp4' }, { ...upload.upload_headers, 'X-Unknown': 'unreviewed' }]) assert.throws(() => contract.normalizeHiggsfieldUpload({ ...upload, upload_headers: headers }));
});
test('23 Presigned PUT omits credentials and redirects, copies bytes, and requires approved origin', () => {
  const descriptor = contract.normalizeHiggsfieldUpload(upload), bytes = new Uint8Array([1, 2, 3]);
  const envelope = transport.prepareHiggsfieldUploadPut(descriptor, bytes, ['https://storage.example.com']);
  assert.equal(envelope.method, 'PUT'); assert.equal(envelope.credentials, 'omit'); assert.equal(envelope.redirect, 'error');
  assert.equal(Object.keys(envelope.headers).some(key => /authorization|cookie|hf-api-key|hf-secret/i.test(key)), false);
  bytes[0] = 255; assert.equal(envelope.bytes[0], 1);
  assert.throws(() => transport.prepareHiggsfieldUploadPut(descriptor, bytes, []));
  assert.throws(() => transport.prepareHiggsfieldUploadPut(descriptor, new Uint8Array(), ['https://storage.example.com']));
});
test('24 Media GET requires separately approved storage origin and has no API authorization', () => {
  const value = transport.prepareHiggsfieldMediaGet(completed.video.url, ['https://media.example.com']);
  assert.deepEqual(value.headers, {}); assert.equal(value.credentials, 'omit'); assert.equal(value.redirect, 'error');
  assert.throws(() => transport.prepareHiggsfieldMediaGet(completed.video.url, []));
});
test('25 Every real operation fails before any credential lookup or network activity', async () => {
  let lookupCalls = 0;
  const lookup = () => { lookupCalls++; return sentinel; };
  const disabled = new transport.DisabledHiggsfieldTransport({ lookup });
  for (const method of ['submit', 'status', 'cancel', 'estimate', 'createUpload', 'upload', 'download']) await assert.rejects(() => disabled[method](request, { externalGenerationEnabled: true, paidGenerationEnabled: true }), /LIVE_HIGGSFIELD_OPERATION_DISABLED/);
  assert.equal(lookupCalls, 0); assert.deepEqual(networkAttempts, []);
});
test('26 Mock submission and estimate use exactly the inspected request builder structure', async () => {
  const fake = new FakeHiggsfieldTransport();
  const accepted = await fake.submit(request), estimate = await fake.estimate(request);
  assert.equal(contract.normalizeHiggsfieldStatus(accepted.body, accepted.headers).requestId, requestId);
  assert.equal(contract.normalizeHiggsfieldEstimate(estimate.body, request.requestDigest).requestDigest, request.requestDigest);
  assert.deepEqual(fake.calls.map(value => value.requestDigest), [request.requestDigest, request.requestDigest]);
});
test('27 Status GET retries transient 5xx and network failure with bounded jittered backoff', async () => {
  let count = 0; const clock = fakeClock();
  const fake = new FakeHiggsfieldTransport(async () => { count++; if (count === 1) return { status: 503, headers: {}, body: {} }; if (count === 2) throw new transport.HiggsfieldTransportError(null, false); return { status: 200, headers: {}, body: response('queued') }; });
  assert.equal((await transport.retryHiggsfieldStatus(fake, statusUrl, policy, clock)).status, 200);
  assert.equal(count, 3); assert.deepEqual(clock.sleeps, [8.75, 17.5]);
});
test('28 Status GET maximum attempts is enforced with no fourth call', async () => {
  const fake = new FakeHiggsfieldTransport(async () => ({ status: 500, headers: {}, body: {} }));
  await assert.rejects(() => transport.retryHiggsfieldStatus(fake, statusUrl, policy, fakeClock()), /HIGGSFIELD_TRANSPORT_FAILED/);
  assert.equal(fake.calls.length, 3);
});
test('29 Status GET permanent errors and invalid response statuses are not retried', async () => {
  for (const status of [400, 401, 403, 404, 422]) { const fake = new FakeHiggsfieldTransport(async () => ({ status, headers: {}, body: {} })); assert.equal((await transport.retryHiggsfieldStatus(fake, statusUrl, policy, fakeClock())).status, status); assert.equal(fake.calls.length, 1); }
  for (const status of [0, 201, 202, 301, 399, 600, NaN]) { const fake = new FakeHiggsfieldTransport(async () => ({ status, headers: {}, body: {} })); await assert.rejects(() => transport.retryHiggsfieldStatus(fake, statusUrl, policy, fakeClock()), /HTTP_RESPONSE_REJECTED/); assert.equal(fake.calls.length, 1); }
});
test('30 Status deadline rejects a hanging transport, aborts it and performs zero retries', async () => {
  let aborted = false;
  const fake = new FakeHiggsfieldTransport((_url, options) => new Promise(() => { options.signal.addEventListener('abort', () => { aborted = true; }, { once: true }); }));
  const begun = performance.now();
  await assert.rejects(() => transport.retryHiggsfieldStatus(fake, statusUrl, { ...policy, totalDeadlineMs: 20 }, fakeClock()), /DEADLINE_EXCEEDED/);
  assert.equal(aborted, true); assert.equal(fake.calls.length, 1); assert.ok(performance.now() - begun < 1000);
});
test('31 Deadline and invalid policy prevent further scheduling or a first unsafe call', async () => {
  const fake = new FakeHiggsfieldTransport(async () => ({ status: 500, headers: {}, body: {} }));
  await assert.rejects(() => transport.retryHiggsfieldStatus(fake, statusUrl, { ...policy, totalDeadlineMs: 8 }, fakeClock())); assert.equal(fake.calls.length, 1);
  const invalid = new FakeHiggsfieldTransport();
  for (const change of [{ maxAttempts: 11 }, { totalDeadlineMs: 0 }, { baseDelayMs: 0 }]) await assert.rejects(() => transport.retryHiggsfieldStatus(invalid, statusUrl, { ...policy, ...change }, fakeClock()));
  assert.equal(invalid.calls.length, 0);
});
test('32 Retry clock/jitter and transport kind are validated without unlocking real execution', async () => {
  const fake = new FakeHiggsfieldTransport(async () => ({ status: 500, headers: {}, body: {} }));
  await assert.rejects(() => transport.retryHiggsfieldStatus(fake, statusUrl, policy, { ...fakeClock(), random: () => 1 }), /JITTER_REJECTED/);
  await assert.rejects(() => transport.retryHiggsfieldStatus(new transport.DisabledHiggsfieldTransport(), statusUrl, policy, fakeClock()), /LIVE_HIGGSFIELD_OPERATION_DISABLED/);
});
test('33 Ambiguous POST is non-retryable and permanent validation is not automatically repeated', () => {
  const ambiguous = contract.normalizeHiggsfieldError(null, 'SUBMIT', true);
  assert.equal(ambiguous.code, 'SUBMISSION_STATE_UNKNOWN'); assert.equal(ambiguous.submissionUnknown, true); assert.equal(ambiguous.retryable, false);
  for (const code of [400, 401, 403, 404, 422]) { const value = contract.normalizeHiggsfieldError(code, 'SUBMIT'); assert.equal(value.retryable, false); assert.equal(value.submissionUnknown, false); }
  assert.equal(contract.normalizeHiggsfieldError(500, 'SUBMIT').submissionUnknown, true);
});
test('34 Cancellation rejection is not classified as generation failure or retry authority', async () => {
  const fake = new FakeHiggsfieldTransport(); const value = await fake.cancel(cancelUrl);
  assert.equal(value.status, 202); assert.equal(value.body, null);
  assert.equal(contract.normalizeHiggsfieldError(400, 'CANCEL').code, 'PROVIDER_CANCELLATION_REJECTED');
  assert.equal(contract.normalizeHiggsfieldError(400, 'CANCEL').submissionUnknown, false);
});
test('35 Status failure retry classification does not carry over to other operations', () => {
  assert.equal(contract.normalizeHiggsfieldError(503, 'STATUS').retryable, true);
  for (const operation of ['SUBMIT', 'CANCEL', 'ESTIMATE', 'UPLOAD', 'DOWNLOAD']) assert.equal(contract.normalizeHiggsfieldError(503, operation).retryable, false);
});
test('36 Source import cannot read actual credentials and all provider counters remain zero', () => {
  for (const name of ['higgsfield-contract.server.ts', 'higgsfield-transport.server.ts']) { const source = fs.readFileSync(path.join(frontend, 'src/lib/codexforge/animation-studio', name), 'utf8'); assert.equal(/process\s*\.\s*env|process\s*\[\s*["']env/u.test(source), false); assert.equal(source.includes(sentinel), false); }
  assert.equal(JSON.stringify({ request, status: contract.normalizeHiggsfieldStatus(completed), estimate: contract.normalizeHiggsfieldEstimate({ credits: '0.125', usd: '0.001' }, request.requestDigest) }).includes(sentinel), false);
  assert.deepEqual(networkAttempts, []);
});
test('37 Safely observed UUID survives malformed response metadata without invoking accessors', () => {
  assert.equal(contract.extractHiggsfieldRequestId({ ...response('queued'), status_url: 'https://evil.example.com/status' }), requestId);
  for (const value of [{ request_id: 'forged' }, null, Object.defineProperty({}, 'request_id', { enumerable: true, get() { throw Error('must not invoke'); } })]) assert.equal(contract.extractHiggsfieldRequestId(value), null);
});
test('38 Explicit permanent status codes outrank conflicting network-failure flags', () => {
  for (const status of [400, 401, 403, 404, 422]) assert.equal(contract.normalizeHiggsfieldError(status, 'STATUS', true).retryable, false);
  assert.equal(contract.normalizeHiggsfieldError(null, 'STATUS', true).retryable, true);
  assert.equal(contract.normalizeHiggsfieldError(503, 'STATUS', true).retryable, true);
});

const results = [];
try {
  for (const item of tests) {
    try { await item.body(); results.push({ name: item.name, status: 'PASS' }); }
    catch (error) { results.push({ name: item.name, status: 'FAIL', message: String(error.message).replaceAll(sentinel, '[synthetic credential redacted]') }); process.exitCode = 1; }
    console.log(results.at(-1).status + ' ' + item.name);
  }
} finally {
  write('prepared-request.json', request);
  const result = { status: results.length === 38 && results.every(value => value.status === 'PASS') && networkAttempts.length === 0 ? 'PASS' : 'FAIL', startedAt, finishedAt: new Date().toISOString(), pid: process.pid, tests: results, total: results.length, passed: results.filter(value => value.status === 'PASS').length, networkAttempts, providerRequests: 0, credentialInspection: 'SYNTHETIC_INJECTED_VALUES_ONLY', limitations: 'Contract/fake transport only; persistence, multi-process dispatch, actual ingestion, HTTP and browser acceptance require separate suites.', sourceHashes: [...loader.loaded, 'scripts/test-animation-studio-phase2a1-contract.mjs'].map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) })) };
  write('result.json', result); if (result.status !== 'PASS') process.exitCode = 1;
  console.log(JSON.stringify({ evidence, status: result.status, passed: result.passed, total: result.total }));
}
