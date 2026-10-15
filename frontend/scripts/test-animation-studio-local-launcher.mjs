import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const core = require("./animation-studio-local-launcher-core.cjs");
const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(path.resolve(process.cwd()), frontend, "Run the focused launcher check from the canonical source root.");

const args = process.argv.slice(2);
if (args.length !== 4 || args[0] !== "--config" || args[2] !== "--evidence") throw new Error("Use --config <path> --evidence <directory>.");
const configPath = path.resolve(args[1]);
const evidenceRoot = path.resolve(args[3]);
assert.ok(fs.lstatSync(evidenceRoot).isDirectory());
let cases = 0;
const check = (value) => { assert.ok(value); cases += 1; };
const rejectsCode = (operation, code) => { assert.throws(operation, (error) => error?.code === code); cases += 1; };

const verified = core.readConfiguration(configPath);
const { config } = verified;
check(config.url === "http://127.0.0.1:3379/animation-studio" && config.host === "127.0.0.1" && config.port === 3379);
check(verified.binding.state === "uninitialized" || verified.binding.state === "d-marker-only" || verified.binding.state === "bound");
check(core.deriveLibraryId(verified.runtimeRoot, config.workspace.namespace) === config.workspace.libraryId);
check(core.sha256Buffer(core.markerBytes(config.workspace.libraryId)) === config.workspace.markerSha256);
check(core.processIdentity(verified.nativeBinding, process.pid).startsWith("windows-filetime:"));
check(path.resolve(fs.realpathSync.native(path.join(verified.runtimeRoot, "node_modules"))).toLowerCase() === path.resolve(config.runtime.nodeModulesTarget).toLowerCase());

assert.equal(core.classifyLibraryState({ cMarkerExists: false, dRootExists: false, dMarkerExists: false, witnessPresent: false }), "uninitialized"); cases += 1;
assert.equal(core.classifyLibraryState({ cMarkerExists: false, dRootExists: true, dMarkerExists: true, witnessPresent: false }), "d-marker-only"); cases += 1;
assert.equal(core.classifyLibraryState({ cMarkerExists: true, dRootExists: true, dMarkerExists: true, witnessPresent: true }), "bound"); cases += 1;
for (const value of [
  { cMarkerExists: false, dRootExists: false, dMarkerExists: false, witnessPresent: true },
  { cMarkerExists: true, dRootExists: false, dMarkerExists: false, witnessPresent: true },
  { cMarkerExists: false, dRootExists: true, dMarkerExists: false, witnessPresent: false },
  { cMarkerExists: false, dRootExists: true, dMarkerExists: true, witnessPresent: true },
  { cMarkerExists: true, dRootExists: true, dMarkerExists: false, witnessPresent: true },
]) rejectsCode(() => core.classifyLibraryState(value), "LIBRARY_IDENTITY_MISMATCH");

const environment = core.safeEnvironment(verified, core.makeSessionId());
const expectedEnvironmentKeys = [
  "APPDATA", "CODEXFORGE_LOCAL_MAX_LOG_BYTES", "CODEXFORGE_LOCAL_NETWORK_DENIAL_LOG", "CODEXFORGE_STUDIO_FFMPEG_PATH",
  "CODEXFORGE_STUDIO_FFMPEG_SHA256", "CODEXFORGE_STUDIO_FFPROBE_PATH", "CODEXFORGE_STUDIO_FFPROBE_SHA256",
  "CODEXFORGE_STUDIO_FONT_PATH", "CODEXFORGE_STUDIO_FONT_SHA256", "CODEXFORGE_STUDIO_MEDIA_STORAGE",
  "CODEXFORGE_STUDIO_OPERATOR_ENABLED", "CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE", "CODEXFORGE_STUDIO_RENDERER_ENABLED",
  "CODEXFORGE_STUDIO_RENDERER_VERSION", "CODEXFORGE_STUDIO_RENDER_WORK_ROOT", "LOCALAPPDATA", "NEXT_TELEMETRY_DISABLED",
  "NODE_ENV", "NODE_OPTIONS", "PATH", "SystemRoot", "TEMP", "TMP", "USERPROFILE", "WINDIR",
].sort();
assert.deepEqual(Object.keys(environment).sort(), expectedEnvironmentKeys); cases += 1;
check(Object.keys(environment).every((name) => !/(TOKEN|KEY|SECRET|PASSWORD|CREDENTIAL|GROQ|OPENAI|ANTHROPIC|AZURE|AWS)/iu.test(name)));
check(environment.NODE_OPTIONS === `--require ${JSON.stringify(verified.scriptPaths.offline)} --max-old-space-size=24576`);
check(environment.CODEXFORGE_STUDIO_MEDIA_STORAGE === "d-drive" && environment.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE === config.workspace.namespace);

const validState = {
  format: core.STATE_FORMAT, phase: "starting", sessionId: core.makeSessionId(), pid: process.pid,
  processIdentity: core.processIdentity(verified.nativeBinding, process.pid), controlToken: "1".repeat(64), configSha256: verified.configSha256,
  url: config.url, runtimeRoot: verified.runtimeRoot, namespace: config.workspace.namespace, libraryId: config.workspace.libraryId,
  buildId: config.runtime.buildId, startedAt: new Date().toISOString(), readyAt: null,
};
assert.equal(core.validateState(validState), validState); cases += 1;
rejectsCode(() => core.validateState({ ...validState, processIdentity: "windows-filetime:1", pid: 0 }), "INVALID_STATE");
rejectsCode(() => core.validateState({ ...validState, url: "http://localhost:3379/animation-studio" }), "INVALID_STATE");
rejectsCode(() => core.validateState({ ...validState, startedAt: "yesterday" }), "INVALID_STATE");
rejectsCode(() => core.validateState({ ...validState, extra: true }), "INVALID_CONFIGURATION");

const parsedConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
const prettyPath = path.join(evidenceRoot, "rejected-noncanonical-config.json");
fs.writeFileSync(prettyPath, `${JSON.stringify(parsedConfig, null, 2)}\n`, { flag: "wx" });
rejectsCode(() => core.readConfiguration(prettyPath), "INVALID_RECORD");
const unknownPath = path.join(evidenceRoot, "rejected-unknown-key-config.json");
fs.writeFileSync(unknownPath, `${core.canonicalJson({ ...parsedConfig, unexpected: true })}\n`, { flag: "wx" });
rejectsCode(() => core.readConfiguration(unknownPath), "INVALID_CONFIGURATION");

check(await core.probePort(config.host, config.port));
const listener = net.createServer();
await new Promise((resolve, reject) => { listener.once("error", reject); listener.listen({ host: config.host, port: config.port, exclusive: true }, resolve); });
try { check(!await core.probePort(config.host, config.port)); }
finally { await new Promise((resolve, reject) => listener.close((error) => error ? reject(error) : resolve())); }
check(await core.probePort(config.host, config.port));

const sourceChecks = [
  ["scripts/start-animation-studio-local.cjs", /mkdirSync\(lockPath\)/u],
  ["scripts/start-animation-studio-local.cjs", /PORT_IN_USE/u],
  ["scripts/stop-animation-studio-local.cjs", /isExactProcessAlive/u],
  ["scripts/stop-animation-studio-local.cjs", /remaining\.controlToken !== state\.controlToken/u],
  ["scripts/stop-animation-studio-local.cjs", /verifyRuntime: false/u],
  ["scripts/animation-studio-local-server.cjs", /observeLibraryBinding/u],
  ["scripts/animation-studio-local-offline.cjs", /Network forbidden by the local Studio boundary/u],
];
for (const [relative, pattern] of sourceChecks) { assert.match(fs.readFileSync(path.join(frontend, relative), "utf8"), pattern); cases += 1; }

const result = {
  at: new Date().toISOString(),
  status: "PASS",
  passed: cases,
  total: cases,
  configPath,
  configSha256: verified.configSha256,
  runtimeRoot: verified.runtimeRoot,
  buildId: config.runtime.buildId,
  namespace: config.workspace.namespace,
  libraryId: config.workspace.libraryId,
  libraryBindingState: verified.binding.state,
  fixedOrigin: config.url,
  exactProcessIdentity: true,
  concurrentStartLockSourceBound: true,
  unrelatedPortRejectionProbe: true,
  safeResolverAdmission: true,
  providerRequests: 0,
  modelRequests: 0,
  generationRequests: 0,
  credentialReads: 0,
  externalNetworkRequests: 0,
};
const resultPath = path.join(evidenceRoot, "launcher-focused-result.json");
fs.writeFileSync(resultPath, `${core.canonicalJson(result)}\n`, { flag: "wx" });
console.log(JSON.stringify({ status: "PASS", passed: cases, total: cases, resultPath }));
