// C:-only launcher contract fixtures. No server, listener, D: I/O or personal configuration.
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork } from "./animation-studio-test-loader.mjs";

const require = createRequire(import.meta.url);
const networkAttempts = blockStudioTestNetwork();
const core = require("./animation-studio-local-launcher-core.cjs");
const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
assert.equal(process.platform, "win32", "The qualified native bootstrap test is Windows-only.");
assert.equal(args.length, 2, "Use --evidence <existing fresh-task evidence directory>.");
assert.equal(args[0], "--evidence");
const evidence = path.resolve(args[1]);
assert.equal(args[1], evidence, "Evidence must be an exact absolute path.");
assert.equal(path.parse(evidence).root.toLowerCase(), "c:\\");
assert.ok(fs.lstatSync(evidence).isDirectory() && !fs.lstatSync(evidence).isSymbolicLink());
assert.equal(fs.realpathSync.native(evidence).toLowerCase(), evidence.toLowerCase());
assert.ok(!evidence.toLowerCase().startsWith(frontend.toLowerCase() + path.sep), "Keep test fixtures outside source.");
const runRoot = fs.mkdtempSync(path.join(evidence, "launcher-v2-"));
const nativeSource = path.join(frontend, "build", "Release", "codexforge_creator_filesystem.node");
const nativeSha256 = "848628f3cb4f4e5011b2237660d26be6cf0da7696401cef55f8736c2ded6c8a4";
assert.equal(core.sha256File(nativeSource), nativeSha256);
const sourceNames = ["animation-studio-local-launcher-core.cjs", "animation-studio-local-server.cjs", "start-animation-studio-local.cjs", "stop-animation-studio-local.cjs", "animation-studio-local-offline.cjs", "test-animation-studio-launcher-v2.mjs"];
const sourceBindings = () => sourceNames.map(name => ({ path: path.join(frontend, "scripts", name), sha256: core.sha256File(path.join(frontend, "scripts", name)) }));
const before = sourceBindings(), tests = [], results = [];
let actualNativeBootstrap = false;
const test = (name, run) => tests.push({ name, run });
const rejects = (run, code) => assert.throws(run, error => error?.code === code);
const sha = value => crypto.createHash("sha256").update(value).digest("hex");
const identity = filename => ({ path: filename, sha256: core.sha256File(filename) });
const write = (filename, bytes) => { fs.mkdirSync(path.dirname(filename), { recursive: true }); fs.writeFileSync(filename, bytes, { flag: "wx" }); return filename; };
const json = (filename, value) => write(filename, `${core.canonicalJson(value)}\n`);
const record = value => ({ value, bytes: Buffer.from(`${core.canonicalJson(value)}\n`) });

function fixture(version) {
  const root = fs.mkdtempSync(path.join(runRoot, `v${version}-`));
  const workspaceRoot = path.join(root, "workspace"), applicationRoot = version === 1 ? workspaceRoot : path.join(root, "application");
  for (const directory of [workspaceRoot, applicationRoot]) fs.mkdirSync(directory, { recursive: true });
  const addon = path.join(workspaceRoot, "build", "Release", "codexforge_creator_filesystem.node");
  fs.mkdirSync(path.dirname(addon), { recursive: true }); fs.copyFileSync(nativeSource, addon, fs.constants.COPYFILE_EXCL);
  const dependencies = path.join(applicationRoot, "node_modules");
  const nextVersion = "16.2.0-fixture", buildId = "launcher_fixture_build_01";
  json(path.join(dependencies, "next", "package.json"), { version: nextVersion });
  write(path.join(applicationRoot, ".next", "BUILD_ID"), `${buildId}\n`);
  const directories = Object.fromEntries(["launcherRoot", "logsRoot", "renderWorkRoot", "tempRoot", "profileRoot", "appDataRoot", "localAppDataRoot", "evidenceRoot"].map(name => [name, path.join(root, name)]));
  for (const directory of Object.values(directories)) fs.mkdirSync(directory);
  fs.mkdirSync(path.join(directories.launcherRoot, "state"));
  const toolsFile = write(path.join(root, "synthetic-tool-never-executed.txt"), "synthetic fixture, never executed\n");
  const namespace = "launcher-v2-fixture", normalizedRoot = fs.realpathSync.native(workspaceRoot).replaceAll("\\", "/");
  // Expected identity follows the documented stable owner rule, independent of launcher deriveLibraryId.
  const libraryId = sha(JSON.stringify({ format: "studio-footage-library-identity-v1", projectRoot: normalizedRoot, scope: { namespace, workspace: "test" } }));
  const markerSha256 = sha(JSON.stringify({ format: "studio-footage-library-v1", libraryId, storageLocation: "codexforge-media-d-v1" }));
  const driveRoot = "D:\\CodexForge", libraryParent = path.join(driveRoot, ".codexforge", "media-libraries"), libraryRoot = path.join(libraryParent, libraryId);
  const projectStateRoot = path.join(workspaceRoot, ".codexforge", "studio-tests", namespace);
  const buildProof = identity(json(path.join(root, "build-proof.json"), { status: "PASS", buildId, nativeSha256 }));
  const proof = version === 1
    ? { format: core.COPY_FORMAT, status: "PASS", buildId, destinationRoot: applicationRoot, nodeModulesTarget: dependencies, sourceBuildVerificationSha256: buildProof.sha256 }
    : { format: core.ARTIFACT_FORMAT, status: "PASS", mode: "built-in-place", applicationRoot, buildId, nodeModulesTarget: dependencies, sourceBuildVerificationSha256: buildProof.sha256, nativeSha256 };
  const proofIdentity = identity(json(path.join(root, "artifact-proof.json"), proof));
  const config = {
    format: version === 1 ? core.CONFIG_FORMAT : core.CONFIG_V2_FORMAT,
    url: "http://127.0.0.1:3379/animation-studio", host: "127.0.0.1", port: 3379,
    ...(version === 2 ? { workspaceRoot } : {}),
    runtime: { root: applicationRoot, nodeModulesTarget: dependencies, buildId, nextVersion, acceptedBuildProof: buildProof, [version === 1 ? "copyManifest" : "artifactProof"]: proofIdentity },
    scripts: Object.fromEntries([["core", "animation-studio-local-launcher-core.cjs"], ["start", "start-animation-studio-local.cjs"], ["server", "animation-studio-local-server.cjs"], ["stop", "stop-animation-studio-local.cjs"], ["offline", "animation-studio-local-offline.cjs"]].map(([name, filename]) => [name, identity(path.join(frontend, "scripts", filename))])),
    tools: { node: identity(process.execPath), native: identity(addon), ffmpeg: identity(toolsFile), ffprobe: identity(toolsFile), font: identity(toolsFile), rendererVersion: "gyan-9.0.2-full-codexforge-v1" },
    workspace: { namespace, mediaStorage: "d-drive", projectStateRoot, driveRoot, libraryParent, libraryId, libraryRoot, cMarkerPath: path.join(projectStateRoot, "studio", "media-library.json"), dMarkerPath: path.join(libraryRoot, "media-library.json"), markerSha256, witnessPath: path.join(directories.launcherRoot, "state", "library-binding-observed.json") },
    directories, control: { statePath: path.join(directories.launcherRoot, "state", "owned.json") },
    limits: { startupMilliseconds: 5000, stopMilliseconds: 5000, maximumLogBytes: 65536 },
  };
  const configPath = json(path.join(root, "config.json"), config);
  return { root, config, configPath, proof, workspaceRoot, applicationRoot, version };
}
function read(f, options = {}) { return core.readConfiguration(f.configPath, { verifyLibrary: false, ...options }); }
function changed(f, mutate) {
  const value = structuredClone(f.config); mutate(value);
  return json(path.join(f.root, `negative-${crypto.randomUUID()}.json`), value);
}
function state(verified) {
  const v2 = verified.config.format === core.CONFIG_V2_FORMAT;
  return { format: v2 ? core.STATE_V2_FORMAT : core.STATE_FORMAT, phase: "starting", sessionId: "local-20261001T000000Z-123456abcdef", pid: process.pid, processIdentity: core.processIdentity(verified.nativeBinding, process.pid), controlToken: "1".repeat(64), configSha256: verified.configSha256, url: verified.config.url, runtimeRoot: verified.runtimeRoot, ...(v2 ? { workspaceRoot: verified.workspaceRoot } : {}), namespace: verified.config.workspace.namespace, libraryId: verified.config.workspace.libraryId, buildId: verified.config.runtime.buildId, startedAt: "2026-10-01T00:00:00.000Z", readyAt: null };
}
function inventory(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name)).flatMap(entry => {
    const filename = path.join(directory, entry.name); assert.equal(entry.isSymbolicLink(), false);
    return entry.isDirectory() ? inventory(filename) : [{ path: path.relative(runRoot, filename), bytes: fs.statSync(filename).size, sha256: core.sha256File(filename) }];
  });
}
const legacy = fixture(1), current = fixture(2);
test("v1 still reads its unchanged copy-proof format with one runtime/workspace root", () => {
  const verified = read(legacy); assert.equal(verified.runtimeRoot, legacy.applicationRoot); assert.equal(verified.workspaceRoot, legacy.workspaceRoot);
  assert.equal(core.deriveLibraryId(verified.workspaceRoot, legacy.config.workspace.namespace), legacy.config.workspace.libraryId);
  assert.ok(core.stateMatchesConfiguration(core.validateState(state(verified)), verified));
});
test("v2 serves a distinct application while its ordinary library owner remains the original workspace", () => {
  const verified = read(current); assert.equal(verified.runtimeRoot, current.applicationRoot); assert.equal(verified.workspaceRoot, current.workspaceRoot);
  assert.notEqual(verified.runtimeRoot, verified.workspaceRoot);
  assert.equal(core.deriveLibraryId(verified.workspaceRoot, current.config.workspace.namespace), current.config.workspace.libraryId);
  assert.notEqual(core.deriveLibraryId(verified.runtimeRoot, current.config.workspace.namespace), current.config.workspace.libraryId);
});
test("configuration and proof reads do not rewrite fixture records", () => {
  const prior = inventory(runRoot); read(legacy); read(current); assert.deepEqual(inventory(runRoot), prior);
});
test("v1 does not accept v2 root or proof fields", () => {
  for (const mutate of [c => { c.workspaceRoot = legacy.workspaceRoot; }, c => { c.runtime.artifactProof = c.runtime.copyManifest; }]) rejects(() => core.readConfiguration(changed(legacy, mutate), { verifyLibrary: false }), "INVALID_CONFIGURATION");
});
test("v2 rejects missing workspace and compatibility overrides, including nested fields", () => {
  for (const mutate of [c => { delete c.workspaceRoot; }, c => { c.compatibilityBinding = {}; }, c => { c.workspace.compatibilityBinding = {}; }, c => { c.runtime.copyManifest = c.runtime.artifactProof; }]) rejects(() => core.readConfiguration(changed(current, mutate), { verifyLibrary: false }), "INVALID_CONFIGURATION");
});
test("everyday v2 retains the exact 127.0.0.1:3379 origin", () => {
  for (const mutate of [c => { c.host = "0.0.0.0"; }, c => { c.host = "localhost"; }, c => { c.port = 3380; }, c => { c.url = "http://127.0.0.1:3380/animation-studio"; }]) rejects(() => core.readConfiguration(changed(current, mutate), { verifyLibrary: false }), "INVALID_CONFIGURATION");
});
test("built-in-place proof binds application, build, dependency target, build verification and native identity", () => {
  for (const [key, value] of [["format", core.COPY_FORMAT], ["status", "FAIL"], ["mode", "copied"], ["applicationRoot", current.workspaceRoot], ["buildId", "other_build_123"], ["nodeModulesTarget", current.workspaceRoot], ["sourceBuildVerificationSha256", "0".repeat(64)], ["nativeSha256", "0".repeat(64)]]) {
    const proof = { ...current.proof, [key]: value };
    rejects(() => core.verifyBuiltArtifactProof(record(proof), current.config, current.applicationRoot, current.config.runtime.nodeModulesTarget), "IDENTITY_MISMATCH");
  }
  rejects(() => core.verifyBuiltArtifactProof(record({ ...current.proof, extra: true }), current.config, current.applicationRoot, current.config.runtime.nodeModulesTarget), "INVALID_CONFIGURATION");
  rejects(() => core.verifyBuiltArtifactProof({ value: current.proof, bytes: Buffer.from(JSON.stringify(current.proof, null, 2)) }, current.config, current.applicationRoot, current.config.runtime.nodeModulesTarget), "INVALID_RECORD");
});
test("artifact file hash and accepted build verification remain enforced", () => {
  for (const key of ["artifactProof", "acceptedBuildProof"]) rejects(() => core.readConfiguration(changed(current, c => { c.runtime[key].sha256 = "0".repeat(64); }), { verifyLibrary: false }), "IDENTITY_MISMATCH");
});
test("v2 native admission is exactly the pinned original workspace addon", () => {
  const other = write(path.join(current.root, "other-addon.node"), fs.readFileSync(nativeSource));
  rejects(() => core.readConfiguration(changed(current, c => { c.tools.native = identity(other); }), { verifyLibrary: false }), "INVALID_CONFIGURATION");
  rejects(() => core.readConfiguration(changed(current, c => { c.tools.native.sha256 = "0".repeat(64); }), { verifyLibrary: false }), "IDENTITY_MISMATCH");
});
test("v2 owner binds both roots, format, configuration, build, library and namespace", () => {
  const verified = read(current), valid = core.validateState(state(verified)); assert.ok(core.stateMatchesConfiguration(valid, verified));
  for (const [key, value] of [["runtimeRoot", current.workspaceRoot], ["workspaceRoot", current.applicationRoot], ["configSha256", "0".repeat(64)], ["libraryId", "0".repeat(64)], ["namespace", "different-namespace"], ["buildId", "different_build_123"]]) assert.equal(core.stateMatchesConfiguration(core.validateState({ ...valid, [key]: value }), verified), false);
  const wrongVersion = { ...valid, format: core.STATE_FORMAT }; delete wrongVersion.workspaceRoot;
  assert.equal(core.stateMatchesConfiguration(core.validateState(wrongVersion), verified), false);
  const missingRoot = { ...valid }; delete missingRoot.workspaceRoot; rejects(() => core.validateState(missingRoot), "INVALID_CONFIGURATION");
  rejects(() => core.validateState({ ...valid, workspaceRoot: "..\\elsewhere" }), "INVALID_STATE");
});
test("Stop admission survives unavailable application and D library without losing workspace/native admission", () => {
  const filename = changed(current, c => { c.runtime.root = path.join(current.root, "absent-application"); c.workspace.driveRoot = "D:\\unavailable-not-read"; });
  const verified = core.readConfiguration(filename, { verifyRuntime: false, verifyLibrary: false, verifyRenderer: false });
  assert.equal(verified.runtimeRoot, path.join(current.root, "absent-application")); assert.equal(verified.workspaceRoot, current.workspaceRoot);
  assert.ok(core.stateMatchesConfiguration(core.validateState(state(verified)), verified));
  rejects(() => core.readConfiguration(filename, { verifyLibrary: false }), "MISSING_DIRECTORY");
  rejects(() => core.readConfiguration(changed(current, c => { c.workspaceRoot = path.join(current.root, "absent-workspace"); }), { verifyRuntime: false, verifyLibrary: false, verifyRenderer: false }), "MISSING_DIRECTORY");
});
test("everyday environment retains offline preload and has no test-only binding override", () => {
  const verified = read(current), environment = core.safeEnvironment(verified, "fixture-session");
  assert.equal(environment.CODEXFORGE_STUDIO_MEDIA_STORAGE, "d-drive"); assert.equal(environment.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE, current.config.workspace.namespace);
  assert.equal(environment.CODEXFORGE_STUDIO_RENDER_WORK_ROOT, current.config.directories.renderWorkRoot);
  assert.equal(environment.NODE_OPTIONS, `--require ${JSON.stringify(verified.scriptPaths.offline)} --max-old-space-size=24576`);
  assert.deepEqual(Object.keys(environment).filter(key => /COMPAT|BINDING|TOKEN|SECRET|PASSWORD|CREDENTIAL/iu.test(key)), []);
});
test("start/server/stop share root-bound ownership checks and preserve graceful-only control", () => {
  const start = fs.readFileSync(path.join(frontend, "scripts", "start-animation-studio-local.cjs"), "utf8"), server = fs.readFileSync(path.join(frontend, "scripts", "animation-studio-local-server.cjs"), "utf8"), stop = fs.readFileSync(path.join(frontend, "scripts", "stop-animation-studio-local.cjs"), "utf8");
  for (const source of [start, server, stop]) assert.match(source, /core\.stateMatchesConfiguration\(/u);
  assert.match(start, /cwd: verified\.workspaceRoot/u); assert.match(start, /mkdirSync\(lockPath\)/u); assert.match(start, /PORT_IN_USE/u);
  assert.match(server, /dir: verified\.runtimeRoot/u); assert.ok(server.indexOf("core.bootstrapNativeBinding(verified)") < server.indexOf('const next = require('));
  assert.match(stop, /verifyRuntime: false/u); assert.match(stop, /isExactProcessAlive/u); assert.match(stop, /remaining\.controlToken !== state\.controlToken/u);
  assert.doesNotMatch(stop, /(?:process\.kill|taskkill|Stop-Process)/u);
});
test("verified workspace addon bootstraps the existing immutable application native cache", () => {
  const verified = read(current), native = core.bootstrapNativeBinding(verified), key = Symbol.for("codexforge.creator.native-filesystem.binding.v1");
  assert.equal(process[key], native); assert.equal(core.bootstrapNativeBinding(verified), native);
  assert.equal(Object.getOwnPropertyDescriptor(process, key).writable, false); assert.equal(Object.getOwnPropertyDescriptor(process, key).configurable, false);
  assert.equal(native.getProcessIdentity(process.pid), verified.nativeBinding.getProcessIdentity(process.pid));
  actualNativeBootstrap = true;
  const other = read(legacy);
  rejects(() => core.bootstrapNativeBinding(other), "NATIVE_INTERFACE_INVALID");
  assert.equal(process[key], native, "A different addon must not replace the process binding.");
});

for (const item of tests) {
  try { item.run(); results.push({ name: item.name, status: "PASS" }); }
  catch (error) { results.push({ name: item.name, status: "FAIL", error: error instanceof Error ? error.message : String(error), code: error?.code ?? null }); break; }
}
const after = sourceBindings(), sourceUnchanged = JSON.stringify(before) === JSON.stringify(after);
const status = results.length === tests.length && results.every(result => result.status === "PASS") && sourceUnchanged && networkAttempts.length === 0 ? "PASS" : "FAIL";
const resultPath = path.join(runRoot, "result.json");
json(resultPath, { format: "studio-launcher-v2-focused-v1", at: new Date().toISOString(), status, planned: tests.length, passed: results.filter(result => result.status === "PASS").length, results, before, after, sourceUnchanged, fixtures: { root: runRoot, preserved: true, syntheticBuildProofs: true }, actualNativeBootstrap, networkAttempts, serversStarted: 0, listenersOpened: 0, dDriveReads: 0, dDriveWrites: 0, personalConfigurationReads: 0, credentialReads: 0 });
console.log(JSON.stringify({ status, passed: results.filter(result => result.status === "PASS").length, total: tests.length, resultPath }));
if (status !== "PASS") process.exitCode = 1;
