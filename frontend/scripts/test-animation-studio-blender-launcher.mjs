// C:-only configuration fixtures. No installed Blender launch, personal config or D: access.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork } from "./animation-studio-test-loader.mjs";
const require = createRequire(import.meta.url), core = require("./animation-studio-local-launcher-core.cjs"), network = blockStudioTestNetwork();
const frontend = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), [flag, folder, ...extra] = process.argv.slice(2);
assert.equal(flag, "--evidence"); assert.equal(extra.length, 0); assert.equal(path.resolve(folder), folder); assert.match(folder, /^C:\\/iu);
assert.ok(fs.lstatSync(folder).isDirectory() && !fs.lstatSync(folder).isSymbolicLink()); assert.equal(fs.realpathSync.native(folder).toLowerCase(), folder.toLowerCase());
assert.ok(!folder.toLowerCase().startsWith(frontend.toLowerCase() + path.sep));
const root = fs.mkdtempSync(path.join(folder, "blender-launcher-")), app = path.join(root, "application"), scriptRoot = path.join(app, "scripts", "blender-studio");
const write = (file, bytes) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, bytes, { flag: "wx" }); return file; };
const json = (file, value) => write(file, `${core.canonicalJson(value)}\n`), pin = file => ({ path: file, sha256: core.sha256File(file) });
const executable = pin(write(path.join(root, "tools", "blender.exe"), "Synthetic executable fixture; never run."));
const source = { sourceId: "designated-proxy", label: "Designated technical proxy", path: "D:\\designated-not-read\\proxy.blend", sha256: "1".repeat(64), byteLength: 1, version: 1, lineage: "Technical test only" };
const sourceCatalog = pin(json(path.join(root, "catalog.json"), { schemaVersion: 1, sources: [source] }));
const scripts = Object.fromEntries(["inspect", "render"].map(name => [name, pin(write(path.join(scriptRoot, `${name}.py`), `# reviewed ${name} fixture; never executed\n`))]));
const blender = { enabled: true, executable, sourceCatalog, scripts }, config = { format: core.CONFIG_V2_FORMAT, blender };
const cases = [], results = [], test = (name, run) => cases.push({ name, run });
const reject = (change, code = "INVALID_CONFIGURATION") => { const value = structuredClone(config); change(value); assert.throws(() => core.verifyBlenderLaunchConfiguration(value, app), error => error.code === code); };
const before = ["animation-studio-local-launcher-core.cjs", "test-animation-studio-blender-launcher.mjs"].map(name => pin(path.join(frontend, "scripts", name)));
test("missing optional configuration remains disabled", () => assert.equal(core.verifyBlenderLaunchConfiguration({ format: core.CONFIG_V2_FORMAT }, app), null));
test("v2 admits only pinned approved source catalog and application-owned scripts", () => {
  const result = core.verifyBlenderLaunchConfiguration(config, app); assert.equal(result.scriptRoot, scriptRoot); assert.equal(result.executable, executable.path); assert.equal(result.cataloguePath, sourceCatalog.path);
});
test("native-edit script pins are optional for old render-only configuration and complete when enabled", () => {
  assert.equal(core.verifyBlenderLaunchConfiguration(config, app).materialEditing, false);
  const materialEdit = pin(write(path.join(scriptRoot, "material_edit.py"), "# synthetic material edit pin; never executed\n")), semanticSnapshot = pin(write(path.join(scriptRoot, "semantic_snapshot.py"), "# synthetic semantic verifier pin; never executed\n"));
  const next = structuredClone(config); Object.assign(next.blender.scripts, { materialEdit, semanticSnapshot }); assert.equal(core.verifyBlenderLaunchConfiguration(next, app).materialEditing, true);
  const missing = structuredClone(next); delete missing.blender.scripts.semanticSnapshot; assert.throws(() => core.verifyBlenderLaunchConfiguration(missing, app));
  const changed = structuredClone(next); changed.blender.scripts.materialEdit.sha256 = "0".repeat(64); assert.throws(() => core.verifyBlenderLaunchConfiguration(changed, app), error => error.code === "IDENTITY_MISMATCH");
});
test("legacy v1 cannot add native execution authority", () => reject(c => { c.format = core.CONFIG_FORMAT; }));
test("optional authority has strict keys and requires explicit enabled true", () => {
  for (const change of [c => { c.blender = null; }, c => { c.blender.enabled = false; }, c => { c.blender.extra = true; }, c => { c.blender.scripts.extra = scripts.inspect; }, c => { c.blender.executable.extra = true; }]) reject(change);
});
test("tool, catalog and both script hashes are enforced", () => {
  for (const change of [c => { c.blender.executable.sha256 = "0".repeat(64); }, c => { c.blender.sourceCatalog.sha256 = "0".repeat(64); }, c => { c.blender.scripts.inspect.sha256 = "0".repeat(64); }, c => { c.blender.scripts.render.sha256 = "0".repeat(64); }]) reject(change, "IDENTITY_MISMATCH");
});
test("script locations cannot escape versioned application or swap roles", () => {
  reject(c => { c.blender.scripts.inspect = scripts.render; });
  const outside = pin(write(path.join(root, "elsewhere", "inspect.py"), "# not application-owned\n")); reject(c => { c.blender.scripts.inspect = outside; });
});
test("catalog and executable paths stay absolute C paths without inherited overrides", () => {
  reject(c => { c.blender.sourceCatalog.path = "D:\\not-read.json"; }); reject(c => { c.blender.executable.path = "blender.exe"; });
  const wrong = pin(write(path.join(root, "tools", "python.exe"), "Never executed.")); reject(c => { c.blender.executable = wrong; });
});
test("catalog schema, duplicate IDs and native-source version bounds are checked without opening D", () => {
  for (const catalog of [{ schemaVersion: 2, sources: [] }, { schemaVersion: 1, sources: [source, source] }, { schemaVersion: 1, sources: [{ ...source, version: 0 }] }, { schemaVersion: 1, sources: [{ ...source, path: "relative.blend" }] }, { schemaVersion: 1, sources: [{ ...source, extra: true }] }]) {
    const identity = pin(json(path.join(root, `bad-${crypto.randomUUID()}.json`), catalog)); reject(c => { c.blender.sourceCatalog = identity; });
  }
});
test("safe environment emits only six verified render-only native settings including catalogue pin and preserves normal media storage", () => {
  const dirs = Object.fromEntries(["tempRoot", "profileRoot", "appDataRoot", "localAppDataRoot", "renderWorkRoot", "logsRoot"].map(key => [key, root]));
  const full = { ...config, directories: dirs, workspace: { namespace: "personal-preserved" }, tools: { rendererVersion: "qualified", ffmpeg: executable, ffprobe: executable, font: executable }, limits: { maximumLogBytes: 65536 } };
  const verified = { config: full, runtimeRoot: app, nodePath: process.execPath, scriptPaths: { offline: scripts.inspect.path } };
  const env = core.safeEnvironment(verified, "fixture");
  assert.equal(env.CODEXFORGE_STUDIO_BLENDER_SCRIPT_ROOT, scriptRoot); assert.equal(env.CODEXFORGE_STUDIO_BLENDER_PATH, executable.path); assert.equal(env.CODEXFORGE_STUDIO_BLENDER_SHA256, executable.sha256);
  assert.equal(env.CODEXFORGE_STUDIO_BLENDER_SOURCE_CATALOG_JSON, sourceCatalog.path); assert.equal(env.CODEXFORGE_STUDIO_BLENDER_ENABLED, "1");
  assert.equal(env.CODEXFORGE_STUDIO_BLENDER_SOURCE_CATALOG_SHA256, sourceCatalog.sha256);
  assert.equal(Object.keys(env).filter(key => key.startsWith("CODEXFORGE_STUDIO_BLENDER_")).length, 6);
  assert.equal(env.CODEXFORGE_STUDIO_MEDIA_STORAGE, "d-drive"); assert.equal(env.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE, "personal-preserved");
  assert.equal(Object.keys(env).filter(key => /TOKEN|SECRET|PASSWORD|CREDENTIAL|GROQ|OPENAI|COMPATIBILITY/iu.test(key)).length, 0);
  const old = { ...full }; delete old.blender;
  assert.equal(Object.keys(core.safeEnvironment({ ...verified, config: old }, "fixture")).filter(key => key.startsWith("CODEXFORGE_STUDIO_BLENDER_")).length, 0);
});
test("safe stop can validate shape without touching a missing native installation or app", () => {
  const value = structuredClone(config); value.blender.executable.path = path.join(root, "absent", "blender.exe");
  assert.equal(core.verifyBlenderLaunchConfiguration(value, app, { verifyFiles: false }).executable, value.blender.executable.path);
  assert.throws(() => core.verifyBlenderLaunchConfiguration(value, app), error => ["MISSING_FILE", "MISSING_DIRECTORY"].includes(error.code));
});
test("public configuration reader accepts the optional block and Stop tolerates unavailable native runtime", () => {
  const workspaceRoot = path.join(root, "workspace"), addon = path.join(workspaceRoot, "build", "Release", "codexforge_creator_filesystem.node");
  write(addon, fs.readFileSync(path.join(frontend, "build", "Release", "codexforge_creator_filesystem.node")));
  const native = pin(addon); assert.equal(native.sha256, "848628f3cb4f4e5011b2237660d26be6cf0da7696401cef55f8736c2ded6c8a4");
  const buildId = "blender_launcher_fixture", dependencies = path.join(app, "node_modules");
  json(path.join(dependencies, "next", "package.json"), { version: "16.1.6-fixture" }); write(path.join(app, ".next", "BUILD_ID"), buildId);
  const directories = Object.fromEntries(["launcherRoot", "logsRoot", "renderWorkRoot", "tempRoot", "profileRoot", "appDataRoot", "localAppDataRoot", "evidenceRoot"].map(key => [key, path.join(root, key)]));
  for (const value of Object.values(directories)) fs.mkdirSync(value); fs.mkdirSync(path.join(directories.launcherRoot, "state"));
  const proof = pin(json(path.join(root, "build-proof.json"), { status: "PASS", buildId, nativeSha256: native.sha256 }));
  const artifact = pin(json(path.join(root, "artifact.json"), { format: core.ARTIFACT_FORMAT, status: "PASS", mode: "built-in-place", applicationRoot: app, buildId, nodeModulesTarget: dependencies, sourceBuildVerificationSha256: proof.sha256, nativeSha256: native.sha256 }));
  const value = { ...config, url: "http://127.0.0.1:3379/animation-studio", host: "127.0.0.1", port: 3379, workspaceRoot,
    runtime: { root: app, nodeModulesTarget: dependencies, buildId, nextVersion: "16.1.6-fixture", acceptedBuildProof: proof, artifactProof: artifact },
    scripts: Object.fromEntries([["core", "animation-studio-local-launcher-core.cjs"], ["start", "start-animation-studio-local.cjs"], ["server", "animation-studio-local-server.cjs"], ["stop", "stop-animation-studio-local.cjs"], ["offline", "animation-studio-local-offline.cjs"]].map(([key, name]) => [key, pin(path.join(frontend, "scripts", name))])),
    tools: { node: pin(process.execPath), native, ffmpeg: executable, ffprobe: executable, font: executable, rendererVersion: "gyan-9.0.2-full-codexforge-v1" },
    workspace: { namespace: "blender-fixture", mediaStorage: "d-drive", projectStateRoot: workspaceRoot, driveRoot: "D:\\not-read", libraryParent: "D:\\not-read", libraryId: "1".repeat(64), libraryRoot: "D:\\not-read", cMarkerPath: path.join(workspaceRoot, "missing-marker.json"), dMarkerPath: "D:\\not-read\\marker.json", markerSha256: "2".repeat(64), witnessPath: path.join(directories.launcherRoot, "state", "missing-witness.json") },
    directories, control: { statePath: path.join(directories.launcherRoot, "state", "owned.json") }, limits: { startupMilliseconds: 5000, stopMilliseconds: 5000, maximumLogBytes: 65536 } };
  const filename = json(path.join(root, "full-config.json"), value), verified = core.readConfiguration(filename, { verifyLibrary: false });
  assert.equal(core.safeEnvironment(verified, "fixture").CODEXFORGE_STUDIO_BLENDER_SCRIPT_ROOT, scriptRoot);
  const stopped = structuredClone(value); stopped.runtime.root = path.join(root, "absent-application"); stopped.blender.executable.path = path.join(root, "absent-tools", "blender.exe");
  for (const name of ["inspect", "render"]) stopped.blender.scripts[name].path = path.join(stopped.runtime.root, "scripts", "blender-studio", `${name}.py`);
  const unavailable = json(path.join(root, "stop-config.json"), stopped);
  assert.equal(core.readConfiguration(unavailable, { verifyRuntime: false, verifyLibrary: false, verifyRenderer: false }).workspaceRoot, workspaceRoot);
  assert.throws(() => core.readConfiguration(unavailable, { verifyLibrary: false }), error => error.code === "MISSING_DIRECTORY");
});
for (const item of cases) { try { item.run(); results.push({ name: item.name, status: "PASS" }); } catch (error) { results.push({ name: item.name, status: "FAIL", error: error.message, code: error.code ?? null }); break; } }
const sourceUnchanged = before.every(item => core.sha256File(item.path) === item.sha256), status = results.length === cases.length && results.every(item => item.status === "PASS") && sourceUnchanged && network.length === 0 ? "PASS" : "FAIL";
const resultPath = path.join(root, "result.json"); json(resultPath, { format: "studio-blender-launcher-focused-v1", status, at: new Date().toISOString(), results, planned: cases.length, sourceBindings: before, sourceUnchanged, networkAttempts: network, dDriveReads: 0, dDriveWrites: 0, personalConfigReads: 0, nativeProcesses: 0, retainedFixtureRoot: root });
console.log(JSON.stringify({ status, passed: results.filter(item => item.status === "PASS").length, total: cases.length, resultPath })); if (status !== "PASS") process.exitCode = 1;
