// Actual core HTTP(S) wire tests. All credentials and TLS material are synthetic.
// Production endpoint validation remains real; only the server-owned connector maps
// the validated endpoint to an exact ephemeral listener owned by this process.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';
import tls from 'node:tls';
import dns from 'node:dns';
import dgram from 'node:dgram';
import { spawn } from 'node:child_process';
import { createHash, generateKeyPairSync, randomBytes, randomUUID, sign, X509Certificate } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createStudioTestLoader } from './animation-studio-test-loader.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.cwd(), root);
const mode = process.argv[2];
assert.ok(['--focused', '--matrix', '--debug-child'].includes(mode), 'Select an explicit bounded test mode.');
assert.equal(process.argv.length, mode === '--debug-child' ? 4 : 3);
const hash = value => createHash('sha256').update(value).digest('hex');
const credential = 'PHASE2B1D_SYNTHETIC_ID_ONLY:PHASE2B1D_SYNTHETIC_SECRET_ONLY';
const secretParts = [credential, ...credential.split(':')];
const canonicalUrl = 'https://api.higgsfield.ai/estimate/bytedance/seedance/v1/lite/text-to-video';
const canonicalPath = '/estimate/bytedance/seedance/v1/lite/text-to-video';
const input = { prompt: 'An original matte blue sphere moves slowly across a plain white background.', duration: 2, resolution: '480', aspect_ratio: '1:1', camera_fixed: true };
const canonicalBody = JSON.stringify(input);
const expectedDigest = '2a12e72614839b1af9d8bcc0487d0b97678caf0ace7821f73d35fd9733226e8b';
const evidence = path.join(root, '.codexforge/acceptance', `studio-phase2b1d-wire-${mode.slice(2)}-${randomUUID()}`);
const tests = [], results = [], observations = [], children = [], active = new Set(), allowed = new Set(), networkAttempts = [];
let ownedLoopbackBindDepth = 0;
const startedAt = new Date().toISOString();
function safe(value) {
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  for (const part of secretParts) assert.equal(text.includes(part), false, 'Synthetic credential escaped a safe boundary.');
  assert.equal(text.includes('-----BEGIN PRIVATE KEY-----'), false, 'Ephemeral TLS key escaped.');
  return value;
}
function redact(error) {
  let text = error instanceof Error ? error.message : 'UNKNOWN_LOCAL_TEST_FAILURE';
  for (const part of secretParts) text = text.replaceAll(part, '[REDACTED_SYNTHETIC]');
  return text.slice(0, 3000);
}
const write = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(safe(value), null, 2) + '\n', { flag: 'wx' });
const deny = name => { networkAttempts.push(name); throw Error('UNOWNED_NETWORK_BLOCKED'); };
function endpointAllowed(host, port) { return (host === '127.0.0.1' || host === '::ffff:127.0.0.1') && allowed.has(Number(port)); }
function socketAddress(args) {
  const first = Array.isArray(args[0]) ? args[0][0] : args[0];
  return first && typeof first === 'object' ? [first.hostname ?? first.host, first.port] : [args[1], first];
}
// Guard both request APIs and the underlying connection primitives. DNS is never
// needed for a numeric owned loopback address. No arbitrary hostname is resolved.
for (const [name, api] of [['http', http], ['https', https]]) {
  for (const method of ['request', 'get']) {
    const original = api[method];
    api[method] = function (...args) {
      const first = args[0];
      let host, port;
      if (first instanceof URL || typeof first === 'string') {
        const url = new URL(first); host = url.hostname; port = url.port;
      } else { host = first?.hostname ?? first?.host; port = first?.port; }
      if (!endpointAllowed(host, port)) return deny(`${name}.${method}`);
      return original.apply(this, args);
    };
  }
}
for (const [api, method, label] of [[net, 'connect', 'net.connect'], [net, 'createConnection', 'net.createConnection'], [tls, 'connect', 'tls.connect'], [net.Socket.prototype, 'connect', 'Socket.connect']]) {
  const original = api[method];
  api[method] = function (...args) { const [host, port] = socketAddress(args); if (!endpointAllowed(host, port)) return deny(label); return original.apply(this, args); };
}
const nativeLookup = dns.lookup;
dns.lookup = function (hostname, ...args) {
  // Server.listen uses lookup even for a literal IP. Delegate only this owned
  // numeric bind; Node resolves the literal without a DNS network request.
  if (ownedLoopbackBindDepth > 0 && hostname === '127.0.0.1') return nativeLookup.call(this, hostname, ...args);
  return deny('dns.lookup');
};
for (const method of ['resolve', 'resolve4', 'resolve6']) dns[method] = () => deny(`dns.${method}`);
dgram.createSocket = () => deny('dgram.createSocket');
globalThis.fetch = () => deny('fetch');
if (typeof globalThis.WebSocket !== 'undefined') globalThis.WebSocket = class { constructor() { deny('WebSocket'); } };

const loader = createStudioTestLoader(root), load = name => loader.load('@/lib/codexforge/animation-studio/' + name);
const { createHiggsfieldEstimateWire, sendHiggsfieldEstimateOnce } = load('higgsfield-estimate-wire.server');
const { RealHiggsfieldEstimateTransport } = load('higgsfield-estimate-transport.server');
const { validateHiggsfieldRequest } = load('higgsfield-contract.server');
const { EstimateExecutionTracker } = load('higgsfield-estimate-execution.server');
const { DEFAULT_EXTERNAL_EXECUTION_POLICY } = load('policies');
const prepared = validateHiggsfieldRequest({ schemaVersion: 1, provider: 'HIGGSFIELD', model: 'bytedance/seedance/v1/lite', endpoint: '/bytedance/seedance/v1/lite/text-to-video', mode: 'TEXT_TO_VIDEO', projectId: 'project_phase2b0c_prepared', sequenceId: 'sequence_phase2b0c_prepared', shotId: 'shot_phase2b0c_prepared', shotRevision: 1, input, requestDigest: expectedDigest });
const sourceBindings = [...new Set([...loader.loaded, 'scripts/animation-studio-test-loader.mjs', 'scripts/test-animation-studio-phase2b1d-wire.mjs'])].sort().map(file => ({ path: file, sha256: hash(fs.readFileSync(path.join(root, file))) }));
if (mode === '--debug-child') {
  // This endpoint is an already-listening parent-owned synthetic server. The
  // child receives no credential/environment data from another process.
  const port = Number(process.argv[3]);
  assert.ok(Number.isInteger(port) && port >= 1024 && port <= 65535 && port !== 3000 && port !== 3317);
  allowed.add(port);
  const stat = metrics();
  const wire = createHiggsfieldEstimateWire((url, options, callback) => {
    stat.requestFactoryCalls++;
    assert.equal(url.href, canonicalUrl);
    return http.request(new URL(`http://127.0.0.1:${port}${url.pathname}`), options, callback);
  }, event => stat.events.push(event));
  let caught;
  try { stat.transportInvocations++; await wire(canonicalUrl, requestInit(), () => { stat.entered++; }); }
  catch (error) { caught = error; }
  const answer = { ...stat, errorTransmitted: caught?.transmitted ?? null, rejected: Boolean(caught), providerRequests: 0, networkAttempts, sourceBindings };
  console.log(JSON.stringify(safe(answer)));
  process.exit(caught?.transmitted === false && stat.entered === 0 && stat.requestFactoryCalls === 0 && networkAttempts.length === 0 ? 0 : 1);
}
fs.mkdirSync(evidence, { recursive: false });
write('intent.json', { phase: '2B.1D', mode, startedAt, pid: process.pid, scope: 'Actual production sendOnce, isolated owned HTTP/HTTPS counting servers; no protected fixture or external request.', sourceBindings, requestDigest: expectedDigest, providerRequestsAuthorized: 0 });
const test = (name, run) => tests.push({ name, run });
const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
function requestInit(signal = new AbortController().signal) {
  return { method: 'POST', headers: { Authorization: 'Key ' + credential, 'Content-Type': 'application/json', Accept: 'application/json' }, body: canonicalBody, redirect: 'error', credentials: 'omit', cache: 'no-store', signal };
}

// Minimal ephemeral self-signed certificate, generated entirely in memory. The
// synthetic connector trusts this exact certificate; production TLS is unchanged.
function certificate() {
  const der = (tag, ...parts) => {
    const body = Buffer.concat(parts.map(part => Buffer.isBuffer(part) ? part : Buffer.from(part)));
    const length = body.length < 128 ? Buffer.from([body.length]) : (() => { let hex = body.length.toString(16); if (hex.length % 2) hex = '0' + hex; const bytes = Buffer.from(hex, 'hex'); return Buffer.concat([Buffer.from([128 | bytes.length]), bytes]); })();
    return Buffer.concat([Buffer.from([tag]), length, body]);
  };
  const sequence = (...parts) => der(0x30, ...parts), algorithm = Buffer.from('300d06092a864886f70d01010b0500', 'hex');
  const subject = sequence(der(0x31, sequence(Buffer.from('0603550403', 'hex'), der(0x0c, Buffer.from('localhost')))));
  const { publicKey, privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const serial = randomBytes(16); serial[0] &= 0x7f; serial[0] |= 1;
  const extensions = der(0xa3, sequence(
    sequence(Buffer.from('0603551d11', 'hex'), der(0x04, sequence(der(0x82, Buffer.from('localhost')), der(0x87, Buffer.from([127, 0, 0, 1]))))),
    sequence(Buffer.from('0603551d13', 'hex'), der(0x01, Buffer.from([0xff])), der(0x04, sequence(der(0x01, Buffer.from([0xff]))))),
  ));
  const tbs = sequence(der(0xa0, der(0x02, Buffer.from([2]))), der(0x02, serial), algorithm, subject,
    sequence(der(0x17, Buffer.from('260101000000Z')), der(0x17, Buffer.from('300101000000Z'))), subject,
    publicKey.export({ type: 'spki', format: 'der' }), extensions);
  const bytes = sequence(tbs, algorithm, der(0x03, Buffer.from([0]), sign('RSA-SHA256', tbs, privateKey)));
  const cert = '-----BEGIN CERTIFICATE-----\n' + bytes.toString('base64').match(/.{1,64}/gu).join('\n') + '\n-----END CERTIFICATE-----\n';
  const parsed = new X509Certificate(cert); assert.equal(parsed.verify(publicKey), true); assert.equal(parsed.checkIP('127.0.0.1'), '127.0.0.1');
  return { key: privateKey.export({ type: 'pkcs8', format: 'pem' }), cert };
}
let tlsMaterial;
async function listener(protocol, scenario) {
  const item = { protocol, scenario: scenario.name, received: [], sockets: new Set(), closed: false, server: null, port: null };
  const handler = (request, response) => {
    const chunks = []; let bytes = 0;
    request.on('data', chunk => { bytes += chunk.length; if (bytes > 4096) request.destroy(); else chunks.push(chunk); });
    request.on('end', () => {
      const body = Buffer.concat(chunks);
      item.received.push({ method: request.method, path: request.url, bodyBytes: body.length, bodySha256: hash(body), exactBody: body.toString('utf8') === canonicalBody, syntheticCredentialMatched: request.headers.authorization === 'Key ' + credential });
      if (scenario.kind === 'close') { request.socket.destroy(); return; }
      if (scenario.kind === 'timeout') return;
      response.statusCode = scenario.status ?? 200;
      response.setHeader('X-Correlation-ID', 'phase2b1d-local-correlation');
      if ([301, 302, 303, 307, 308].includes(response.statusCode)) response.setHeader('Location', `${protocol}://127.0.0.1:${item.port}/must-never-be-followed`);
      response.end(scenario.kind === 'malformed' ? '{' : scenario.kind === 'empty' ? '' : scenario.kind === 'oversized' ? 'x'.repeat(16385) : JSON.stringify({ credits: '1.25', usd: '0.012345' }));
    });
  };
  if (protocol === 'https') { tlsMaterial ??= certificate(); item.server = https.createServer(tlsMaterial, handler); }
  else item.server = http.createServer(handler);
  item.server.on('connection', socket => { item.sockets.add(socket); socket.on('close', () => item.sockets.delete(socket)); });
  item.server.on('tlsClientError', () => {});
  await new Promise((resolve, reject) => {
    item.server.once('error', reject);
    ownedLoopbackBindDepth++;
    try { item.server.listen(0, '127.0.0.1', resolve); }
    finally { ownedLoopbackBindDepth--; }
  });
  item.port = item.server.address().port; assert.notEqual(item.port, 3000); assert.notEqual(item.port, 3317);
  allowed.add(item.port); active.add(item);
  item.close = async () => {
    if (item.closed) return;
    for (const socket of item.sockets) socket.destroy();
    await new Promise((resolve, reject) => item.server.close(error => error ? reject(error) : resolve()));
    allowed.delete(item.port); active.delete(item); item.closed = true;
  };
  return item;
}
function connector(item, metrics) {
  return (url, options, callback) => {
    metrics.requestFactoryCalls++;
    assert.equal(url.href, canonicalUrl); assert.equal(options.method, 'POST'); assert.equal(options.agent, false); assert.equal(options.autoSelectFamily, false);
    const target = new URL(`${item.protocol}://127.0.0.1:${item.port}${url.pathname}`);
    const mapped = { ...options, ...(item.protocol === 'https' ? { ca: tlsMaterial.cert, rejectUnauthorized: true, servername: 'localhost' } : {}) };
    const request = (item.protocol === 'https' ? https : http).request(target, mapped, callback);
    const originalEnd = request.end, originalWrite = request.write;
    request.write = function (...args) { metrics.writeCalls++; return originalWrite.apply(this, args); };
    request.end = function (...args) { metrics.endCalls++; if (args[0] !== undefined && args[0] !== null) { metrics.endBodyBytes += Buffer.byteLength(args[0]); metrics.endBodySha256 = hash(args[0]); } return originalEnd.apply(this, args); };
    return request;
  };
}
function metrics() { return { transportInvocations: 0, requestFactoryCalls: 0, writeCalls: 0, endCalls: 0, endBodyBytes: 0, endBodySha256: null, entered: 0, events: [] }; }
async function debugChild(item, channel) {
  assert.ok(['http', 'https', 'net', 'tls', '*'].includes(channel));
  const environment = { SystemRoot: 'C:/Windows', WINDIR: 'C:/Windows', SystemDrive: 'C:', ComSpec: 'C:/Windows/System32/cmd.exe', TEMP: 'C:/Users/User/AppData/Local/Temp', TMP: 'C:/Users/User/AppData/Local/Temp', USERPROFILE: 'C:/Users/User', LOCALAPPDATA: 'C:/Users/User/AppData/Local', APPDATA: 'C:/Users/User/AppData/Roaming', PATH: 'C:/Program Files/nodejs;C:/Windows/System32;C:/Windows', CI: '1', NEXT_TELEMETRY_DISABLED: '1', GIT_OPTIONAL_LOCKS: '0', NODE_DEBUG: channel };
  return new Promise((resolve, reject) => {
    const childStartedAt = new Date().toISOString();
    const child = spawn(process.execPath, [fileURLToPath(import.meta.url), '--debug-child', String(item.port)], { cwd: root, env: environment, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '', stderr = '', outputBoundExceeded = false;
    child.stdout.on('data', bytes => { if (stdout.length + bytes.length <= 2_097_152) stdout += bytes; else outputBoundExceeded = true; });
    child.stderr.on('data', bytes => { if (stderr.length + bytes.length <= 2_097_152) stderr += bytes; else outputBoundExceeded = true; });
    child.once('error', reject);
    child.once('close', (exitCode, signal) => {
      children.push({ pid: child.pid, channel, startedAt: childStartedAt, finishedAt: new Date().toISOString(), exitCode, signal, closed: true, stdoutBytes: Buffer.byteLength(stdout), stderrBytes: Buffer.byteLength(stderr), outputBoundExceeded });
      try {
        // Raw child output is inspected in memory, never persisted as a log.
        safe(stdout); safe(stderr); assert.equal(outputBoundExceeded, false); assert.equal(exitCode, 0); assert.equal(signal, null);
        const answer = JSON.parse(stdout); assert.deepEqual(answer.sourceBindings, sourceBindings); assert.deepEqual(answer.networkAttempts, []); resolve(answer);
      } catch (error) { reject(error); }
    });
  });
}

if (mode === '--focused') {
  test('production default uses the dedicated core wire, never global fetch', () => {
    assert.equal(typeof createHiggsfieldEstimateWire, 'function'); assert.equal(typeof sendHiggsfieldEstimateOnce, 'function');
    const source = fs.readFileSync(path.join(root, 'src/lib/codexforge/animation-studio/higgsfield-estimate-transport.server.ts'), 'utf8');
    assert.doesNotMatch(source, /globalThis\.fetch|\bfetch\s*\(/u); assert.match(source, /sendHiggsfieldEstimateOnce/u);
    assert.equal(prepared.requestDigest, expectedDigest); assert.deepEqual(prepared.input, input);
  });
  const invalid = [
    ['malformed URL', () => ['not-a-url', requestInit()]],
    ['alternate protocol', () => [canonicalUrl.replace('https:', 'http:'), requestInit()]],
    ['arbitrary hostname', () => [canonicalUrl.replace('api.higgsfield.ai', 'other.invalid'), requestInit()]],
    ['loopback URL from caller', () => [canonicalUrl.replace('api.higgsfield.ai', '127.0.0.1'), requestInit()]],
    ['alternate provider path', () => [canonicalUrl + '/alternate', requestInit()]],
    ['query string', () => [canonicalUrl + '?retry=1', requestInit()]],
    ['fragment', () => [canonicalUrl + '#fragment', requestInit()]],
    ['URL userinfo', () => [canonicalUrl.replace('https://', 'https://user:password@'), requestInit()]],
    ['non-POST method', () => [canonicalUrl, { ...requestInit(), method: 'GET' }]],
    ['missing synthetic credential', () => { const init = requestInit(); delete init.headers.Authorization; return [canonicalUrl, init]; }],
    ['invalid credential construction', () => { const init = requestInit(); init.headers.Authorization = 'Key invalid'; return [canonicalUrl, init]; }],
    ['header newline', () => { const init = requestInit(); init.headers.Authorization += '\r\nX-Injected: invalid'; return [canonicalUrl, init]; }],
    ['non-Latin-1 synthetic credential', () => { const init = requestInit(); init.headers.Authorization += '\u2603'; return [canonicalUrl, init]; }],
    ['caller-defined extra header', () => { const init = requestInit(); init.headers['X-Forwarded-Host'] = 'other.invalid'; return [canonicalUrl, init]; }],
    ['unsupported init option', () => [canonicalUrl, { ...requestInit(), dispatcher: {} }]],
    ['redirect follow requested', () => [canonicalUrl, { ...requestInit(), redirect: 'follow' }]],
    ['credential forwarding requested', () => [canonicalUrl, { ...requestInit(), credentials: 'include' }]],
    ['missing body', () => [canonicalUrl, { ...requestInit(), body: undefined }]],
    ['malformed body', () => [canonicalUrl, { ...requestInit(), body: '{' }]],
    ['non-string body', () => [canonicalUrl, { ...requestInit(), body: Buffer.from(canonicalBody) }]],
    ['already aborted', () => { const controller = new AbortController(); controller.abort(); return [canonicalUrl, requestInit(controller.signal)]; }],
  ];
  for (const [name, build] of invalid) test(`definite pre-send rejection: ${name}`, async () => {
    const item = await listener('http', { name, status: 200 }), stat = metrics(), tracker = new EstimateExecutionTracker();
    const wire = createHiggsfieldEstimateWire(connector(item, stat), event => stat.events.push(event));
    let caught;
    try { const [url, init] = build(); stat.transportInvocations++; await wire(url, init, () => { stat.entered++; tracker.transportEntered(); }); }
    catch (error) { caught = error; }
    finally { await delay(50); await item.close(); }
    assert.ok(caught, 'Invalid input must fail closed.'); safe(caught.message);
    assert.equal(caught.transmitted, false);
    assert.equal(stat.entered, 0); assert.equal(stat.requestFactoryCalls, 0); assert.equal(item.received.length, 0);
    assert.equal(tracker.snapshot().externalExecution, 'NOT_ATTEMPTED'); assert.equal(tracker.snapshot().retryAllowed, false);
    observations.push({ name, ...stat, serverRequests: item.received.length, externalExecution: tracker.snapshot().externalExecution, closed: item.closed });
  });
  for (const channel of ['http', 'https', 'net', 'tls', '*']) test(`unsafe NODE_DEBUG=${channel} blocks before credential-bearing request construction`, async () => {
    const item = await listener('http', { name: 'diagnostic-channel-pre-send', status: 200 });
    let answer;
    try { answer = await debugChild(item, channel); }
    finally { await delay(50); await item.close(); }
    assert.equal(answer.transportInvocations, 1); assert.equal(answer.requestFactoryCalls, 0); assert.equal(answer.entered, 0); assert.equal(answer.errorTransmitted, false); assert.equal(item.received.length, 0);
    observations.push({ name: 'diagnostic-channel-pre-send', channel, transportInvocations: answer.transportInvocations, requestFactoryCalls: answer.requestFactoryCalls, entered: answer.entered, errorTransmitted: answer.errorTransmitted, serverRequests: item.received.length, childOutputSecretFree: true, closed: item.closed });
  });
  test('Real estimate transport rejects absent authority before synthetic credential lookup or wire', async () => {
    let lookups = 0, wireCalls = 0, entered = 0;
    const transport = new RealHiggsfieldEstimateTransport(() => { lookups++; return credential; }, async () => { wireCalls++; throw Error('UNAUTHORIZED_WIRE'); });
    await assert.rejects(() => transport.estimate(prepared, { signal: new AbortController().signal, onTransportEntered: () => { entered++; } }));
    assert.equal(lookups, 0); assert.equal(wireCalls, 0); assert.equal(entered, 0);
    observations.push({ name: 'absent-authority', credentialLookups: lookups, wireCalls, entered });
  });
  test('every generation capability remains locked', () => assert.deepEqual(DEFAULT_EXTERNAL_EXECUTION_POLICY, { externalGenerationEnabled: false, paidGenerationEnabled: false, adobeAutomationEnabled: false, blenderRenderEnabled: false }));
}

if (mode === '--matrix') {
  const scenarios = [200, 201, 204, 400, 401, 403, 404, 405, 409, 421, 422, 429, 500, 503, 301, 302, 303, 307, 308].map(status => ({ name: `HTTP ${status}`, status }));
  scenarios.push({ name: 'malformed JSON', kind: 'malformed' }, { name: 'empty response', kind: 'empty' }, { name: 'oversized response', kind: 'oversized' }, { name: 'connection close after request', kind: 'close' }, { name: 'timeout after request', kind: 'timeout' });
  for (const protocol of ['http', 'https']) for (const scenario of scenarios) test(`${protocol} actual one-request count: ${scenario.name}`, async () => {
    const item = await listener(protocol, scenario), stat = metrics(), controller = new AbortController();
    const wire = createHiggsfieldEstimateWire(connector(item, stat), event => stat.events.push(event));
    let timer, response, caught, body = null;
    if (scenario.kind === 'timeout') timer = setTimeout(() => controller.abort(), 150);
    try { stat.transportInvocations++; response = await wire(canonicalUrl, requestInit(controller.signal), () => { stat.entered++; }); if (response) body = await response.text(); }
    catch (error) { caught = error; safe(error.message); }
    finally {
      clearTimeout(timer);
      // Keep the listener open after the first result to catch an implicit replay.
      await delay(scenario.status === 421 ? 500 : 100);
      await item.close();
    }
    assert.equal(item.received.length, 1, 'Exactly one local server-observed request is required.');
    assert.deepEqual(item.received[0], { method: 'POST', path: canonicalPath, bodyBytes: Buffer.byteLength(canonicalBody), bodySha256: hash(canonicalBody), exactBody: true, syntheticCredentialMatched: true });
    assert.equal(stat.transportInvocations, 1); assert.equal(stat.entered, 1); assert.equal(stat.requestFactoryCalls, 1); assert.equal(stat.endCalls, 1); assert.equal(stat.writeCalls, 0);
    assert.equal(stat.endBodyBytes, Buffer.byteLength(canonicalBody)); assert.equal(stat.endBodySha256, hash(canonicalBody));
    for (const event of ['invocation', 'request-created', 'request-ended', 'socket-assigned']) assert.equal(stat.events.filter(value => value === event).length, 1, `Expected one ${event} event.`);
    if (['close', 'timeout', 'oversized'].includes(scenario.kind)) assert.ok(caught, 'Interrupted/bounded request must not become a response success.');
    else {
      assert.equal(caught, undefined); assert.equal(response.status, scenario.status ?? 200);
      if (scenario.kind === 'malformed') assert.equal(body, '{');
      else if (scenario.kind === 'empty') assert.equal(body, '');
      else if (scenario.status === 200) assert.deepEqual(JSON.parse(body), { credits: '1.25', usd: '0.012345' });
      else assert.equal(body, '');
    }
    observations.push({ name: scenario.name, protocol, ...stat, serverRequests: item.received.length, received: item.received, responseStatus: response?.status ?? null, transportFailed: Boolean(caught), redirectsFollowed: item.received.filter(value => value.path !== canonicalPath).length, automaticRetries: item.received.length - 1, observationAfterOutcomeMs: scenario.status === 421 ? 500 : 100, closed: item.closed });
  });
}

test('all emitted evidence is secret-free and all network requests remained owned loopback', () => { observations.forEach(safe); assert.deepEqual(networkAttempts, []); assert.equal(active.size, 0); assert.equal(allowed.size, 0); });
for (const item of tests) {
  try { await item.run(); results.push({ name: item.name, status: 'PASS' }); }
  catch (error) { const message = redact(error); results.push({ name: item.name, status: 'FAIL', error: message }); console.error('FAIL: ' + item.name + ': ' + message); process.exitCode = 1; break; }
}
for (const item of [...active]) { try { await item.close(); } catch (error) { results.push({ name: 'owned listener closure', status: 'FAIL', error: redact(error) }); process.exitCode = 1; } }
const sourceUnchanged = sourceBindings.every(item => hash(fs.readFileSync(path.join(root, item.path))) === item.sha256);
const summary = { phase: '2B.1D', mode, startedAt, finishedAt: new Date().toISOString(), pid: process.pid, status: results.length === tests.length && results.every(item => item.status === 'PASS') && sourceUnchanged && networkAttempts.length === 0 && active.size === 0 ? 'PASS' : 'FAIL', planned: tests.length, testCount: results.length, results, observations, children, sourceBindings, sourceUnchanged, networkAttempts, remainingOwnedListeners: active.size, localSyntheticRequests: observations.reduce((count, item) => count + (item.serverRequests ?? 0), 0), realCredentialReads: 0, providerRequests: 0, generationRequests: 0, paidGenerationRequests: 0, productionDataMutations: 0, protectedFixtureAccesses: 0 };
write('result.json', summary);
console.log(JSON.stringify({ evidence, status: summary.status, mode, tests: results.length, planned: tests.length, localSyntheticRequests: summary.localSyntheticRequests, providerRequests: 0 }));
if (summary.status !== 'PASS') process.exitCode = 1;
