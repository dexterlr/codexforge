"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const net = require("node:net");
const path = require("node:path");

const CONFIG_FORMAT = "codexforge-animation-studio-local-launch-v1";
const CONFIG_V2_FORMAT = "codexforge-animation-studio-local-launch-v2";
const STATE_FORMAT = "codexforge-animation-studio-owned-process-v1";
const STATE_V2_FORMAT = "codexforge-animation-studio-owned-process-v2";
const COPY_FORMAT = "codexforge-animation-studio-runtime-copy-v1";
const ARTIFACT_FORMAT = "codexforge-animation-studio-built-artifact-v1";
const CONTROL_STATUS_PATH = "/.codexforge/local-control/status";
const CONTROL_STOP_PATH = "/.codexforge/local-control/stop";
const HASH_PATTERN = /^[a-f0-9]{64}$/u;
const NAMESPACE_PATTERN = /^[a-z0-9][a-z0-9-]{7,63}$/u;

class LocalLauncherError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "LocalLauncherError";
    this.code = code;
  }
}

function fail(code, message) {
  throw new LocalLauncherError(code, message);
}

function plain(value) {
  return typeof value === "object" && value !== null && Object.getPrototypeOf(value) === Object.prototype;
}

function exactKeys(value, expected, label) {
  if (!plain(value) || Object.keys(value).sort().join("\0") !== [...expected].sort().join("\0")) {
    fail("INVALID_CONFIGURATION", `${label} must contain exactly: ${[...expected].sort().join(", ")}.`);
  }
  return value;
}

function sortJson(value) {
  if (Array.isArray(value)) return value.map(sortJson);
  if (plain(value)) return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortJson(value[key])]));
  return value;
}

function canonicalJson(value) {
  return JSON.stringify(sortJson(value));
}

function sha256Buffer(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function sha256File(filename) {
  const before = fs.lstatSync(filename);
  if (!before.isFile() || before.isSymbolicLink()) fail("IDENTITY_MISMATCH", `Expected a regular file: ${filename}`);
  const descriptor = fs.openSync(filename, "r");
  const hash = crypto.createHash("sha256");
  const buffer = Buffer.allocUnsafe(1024 * 1024);
  try {
    for (;;) {
      const bytesRead = fs.readSync(descriptor, buffer, 0, buffer.length, null);
      if (bytesRead === 0) break;
      hash.update(buffer.subarray(0, bytesRead));
    }
  } finally {
    fs.closeSync(descriptor);
  }
  const after = fs.lstatSync(filename);
  if (!after.isFile() || after.isSymbolicLink() || before.size !== after.size || before.mtimeMs !== after.mtimeMs) {
    fail("IDENTITY_MISMATCH", `File changed while its identity was checked: ${filename}`);
  }
  return hash.digest("hex");
}

function resolvedAbsolute(value, label) {
  if (typeof value !== "string" || value.length < 3 || value.length > 1024 || !path.isAbsolute(value) || path.resolve(value) !== value) {
    fail("INVALID_CONFIGURATION", `${label} must be an exact absolute path.`);
  }
  return value;
}

function samePath(left, right) {
  return path.resolve(left).toLowerCase() === path.resolve(right).toLowerCase();
}

function existingDirectory(value, label) {
  const pathname = resolvedAbsolute(value, label);
  let stat;
  let real;
  try {
    stat = fs.lstatSync(pathname);
    real = fs.realpathSync.native(pathname);
  } catch {
    fail("MISSING_DIRECTORY", `${label} is unavailable: ${pathname}`);
  }
  if (!stat.isDirectory() || stat.isSymbolicLink() || !samePath(real, pathname)) {
    fail("IDENTITY_MISMATCH", `${label} is not the expected ordinary directory: ${pathname}`);
  }
  return real;
}

function verifyFile(record, label) {
  exactKeys(record, ["path", "sha256"], label);
  const filename = resolvedAbsolute(record.path, `${label}.path`);
  if (!HASH_PATTERN.test(record.sha256)) fail("INVALID_CONFIGURATION", `${label}.sha256 is invalid.`);
  let actual;
  try {
    actual = sha256File(filename);
  } catch (error) {
    if (error instanceof LocalLauncherError) throw error;
    fail("MISSING_FILE", `${label} is unavailable: ${filename}`);
  }
  if (actual !== record.sha256) fail("IDENTITY_MISMATCH", `${label} identity differs: ${filename}`);
  return filename;
}

function readJsonFile(filename, maximumBytes, label) {
  let bytes;
  try {
    const stat = fs.lstatSync(filename);
    if (!stat.isFile() || stat.isSymbolicLink() || stat.size < 2 || stat.size > maximumBytes) throw new Error("bounds");
    bytes = fs.readFileSync(filename);
  } catch {
    fail("INVALID_RECORD", `${label} is missing, linked, or outside its byte bound: ${filename}`);
  }
  let value;
  try {
    value = JSON.parse(new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes));
  } catch {
    fail("INVALID_RECORD", `${label} is not strict UTF-8 JSON: ${filename}`);
  }
  if (!plain(value)) fail("INVALID_RECORD", `${label} must be a JSON object: ${filename}`);
  return { bytes, value };
}

function requireCanonicalRecord(record, label) {
  const expected = Buffer.from(`${canonicalJson(record.value)}\n`, "utf8");
  if (!record.bytes.equals(expected)) fail("INVALID_RECORD", `${label} must use exact canonical JSON bytes.`);
  return record.value;
}

function writeExclusiveJson(filename, value) {
  const bytes = Buffer.from(`${canonicalJson(value)}\n`, "utf8");
  fs.writeFileSync(filename, bytes, { flag: "wx" });
  return bytes;
}

function replaceJson(filename, value) {
  const temporary = `${filename}.${process.pid}.${crypto.randomBytes(8).toString("hex")}.tmp`;
  const bytes = Buffer.from(`${canonicalJson(value)}\n`, "utf8");
  fs.writeFileSync(temporary, bytes, { flag: "wx" });
  fs.renameSync(temporary, filename);
  return bytes;
}

function deriveLibraryId(projectRoot, namespace) {
  const normalizedRoot = projectRoot.replaceAll("\\", "/");
  return sha256Buffer(Buffer.from(canonicalJson({
    format: "studio-footage-library-identity-v1",
    projectRoot: normalizedRoot,
    scope: { namespace, workspace: "test" },
  }), "utf8"));
}

function markerBytes(libraryId) {
  return Buffer.from(canonicalJson({
    format: "studio-footage-library-v1",
    libraryId,
    storageLocation: "codexforge-media-d-v1",
  }), "utf8");
}

function classifyLibraryState({ cMarkerExists, dRootExists, dMarkerExists, witnessPresent }) {
  if (![cMarkerExists, dRootExists, dMarkerExists, witnessPresent].every((value) => typeof value === "boolean")) fail("INVALID_LIBRARY_STATE", "Media-library state inputs must be boolean.");
  if (!cMarkerExists && !dRootExists && !dMarkerExists) {
    if (witnessPresent) fail("LIBRARY_IDENTITY_MISMATCH", "The previously observed media library is missing; it cannot be reprovisioned as new.");
    return "uninitialized";
  }
  if (!(dRootExists && dMarkerExists)) fail("LIBRARY_IDENTITY_MISMATCH", "The C:/D: media-library binding is incomplete; no fallback is permitted.");
  if (!cMarkerExists && witnessPresent) fail("LIBRARY_IDENTITY_MISMATCH", "The observed C: project-state binding is missing; D: media cannot be adopted as a fresh publication.");
  return cMarkerExists ? "bound" : "d-marker-only";
}

function nativeMarkerState(binding, base, rootSegments, markerSegments, label) {
  let rootExists;
  try { rootExists = binding.rootExists(base, rootSegments); }
  catch { fail("LIBRARY_UNAVAILABLE", `${label} could not be inspected through the qualified safe resolver.`); }
  if (!rootExists) return Object.freeze({ rootExists: false, markerExists: false, bytes: null });
  let root;
  try {
    root = new binding.Root(base, rootSegments, "existing");
    try {
      return Object.freeze({ rootExists: true, markerExists: true, bytes: root.readFile(markerSegments, 4096) });
    } catch (error) {
      if (error?.code === "not_found") return Object.freeze({ rootExists: true, markerExists: false, bytes: null });
      throw error;
    }
  } catch {
    fail("LIBRARY_UNAVAILABLE", `${label} could not be opened through the qualified safe resolver.`);
  } finally {
    try { root?.close(); } catch { /* admission already fails on an earlier resolver error */ }
  }
}

function verifyLibraryBinding(config, workspaceRoot, suppliedBinding) {
  // A v1 witness calls the library-owning workspace "runtimeRoot". Preserve its
  // exact bytes when a v2 launcher serves application code from another root.
  const runtimeRoot = workspaceRoot;
  const namespace = config.workspace.namespace;
  if (typeof namespace !== "string" || !NAMESPACE_PATTERN.test(namespace)) fail("INVALID_CONFIGURATION", "The pilot namespace is invalid.");
  const expectedId = deriveLibraryId(runtimeRoot, namespace);
  if (config.workspace.libraryId !== expectedId) fail("LIBRARY_IDENTITY_MISMATCH", "The configured D: library ID does not match the exact runtime root and namespace.");
  const expectedMarker = markerBytes(expectedId);
  if (sha256Buffer(expectedMarker) !== config.workspace.markerSha256) fail("LIBRARY_IDENTITY_MISMATCH", "The configured media-library marker identity differs.");

  const driveRoot = existingDirectory(config.workspace.driveRoot, "workspace.driveRoot");
  if (!samePath(driveRoot, "D:\\CodexForge")) fail("INVALID_CONFIGURATION", "The Studio D: root must remain D:\\CodexForge.");
  const libraryParent = existingDirectory(config.workspace.libraryParent, "workspace.libraryParent");
  if (!samePath(libraryParent, path.join(driveRoot, ".codexforge", "media-libraries"))) fail("INVALID_CONFIGURATION", "The media-library parent differs.");
  const nativeBinding = suppliedBinding || loadNativeBinding(config.tools.native.path);
  let parentGuard;
  try { parentGuard = new nativeBinding.Root(driveRoot, [".codexforge", "media-libraries"], "existing"); }
  catch { fail("LIBRARY_UNAVAILABLE", "The approved media-library parent failed qualified safe-resolver admission."); }
  finally { try { parentGuard?.close(); } catch { /* the next admission still fails closed */ } }

  const expectedLibraryRoot = path.join(libraryParent, expectedId);
  if (!samePath(config.workspace.libraryRoot, expectedLibraryRoot)) fail("INVALID_CONFIGURATION", "The media-library leaf differs.");
  const expectedProjectState = path.join(runtimeRoot, ".codexforge", "studio-tests", namespace);
  if (!samePath(config.workspace.projectStateRoot, expectedProjectState)) fail("INVALID_CONFIGURATION", "The project-state root differs.");
  const expectedCMarker = path.join(expectedProjectState, "studio", "media-library.json");
  const expectedDMarker = path.join(expectedLibraryRoot, "media-library.json");
  const expectedWitness = path.join(config.directories.launcherRoot, "state", "library-binding-observed.json");
  if (!samePath(config.workspace.cMarkerPath, expectedCMarker) || !samePath(config.workspace.dMarkerPath, expectedDMarker)) {
    fail("INVALID_CONFIGURATION", "A media-library marker path differs.");
  }
  if (!samePath(config.workspace.witnessPath, expectedWitness)) fail("INVALID_CONFIGURATION", "The media-library witness path differs.");

  let witnessPresent = false;
  if (fs.existsSync(expectedWitness)) {
    const record = readJsonFile(expectedWitness, 4096, "media-library witness");
    const witness = requireCanonicalRecord(record, "media-library witness");
    exactKeys(witness, ["format", "libraryId", "markerSha256", "namespace", "runtimeRoot"], "media-library witness");
    if (witness.format !== "codexforge-animation-studio-library-binding-observed-v1" || witness.libraryId !== expectedId || witness.markerSha256 !== config.workspace.markerSha256 || witness.namespace !== namespace || !samePath(witness.runtimeRoot, runtimeRoot)) fail("LIBRARY_IDENTITY_MISMATCH", "The retained media-library witness differs.");
    witnessPresent = true;
  }

  const cState = nativeMarkerState(nativeBinding, runtimeRoot, [".codexforge", "studio-tests", namespace], ["studio", "media-library.json"], "C: project-state marker");
  const dState = nativeMarkerState(nativeBinding, driveRoot, [".codexforge", "media-libraries", expectedId], ["media-library.json"], "D: media-library marker");
  const cExists = cState.markerExists;
  const dRootExists = dState.rootExists;
  const dMarkerExists = dState.markerExists;
  const state = classifyLibraryState({ cMarkerExists: cExists, dRootExists, dMarkerExists, witnessPresent });
  if (state === "uninitialized") return Object.freeze({ state, libraryId: expectedId, markerSha256: config.workspace.markerSha256, witnessPresent });
  if (!Buffer.isBuffer(dState.bytes) || !dState.bytes.equals(expectedMarker)) fail("LIBRARY_IDENTITY_MISMATCH", "The D: media-library marker differs.");
  if (state === "d-marker-only") return Object.freeze({ state, libraryId: expectedId, markerSha256: config.workspace.markerSha256, witnessPresent });
  if (!Buffer.isBuffer(cState.bytes) || !cState.bytes.equals(expectedMarker)) fail("LIBRARY_IDENTITY_MISMATCH", "The C: media-library marker differs.");
  return Object.freeze({ state, libraryId: expectedId, markerSha256: config.workspace.markerSha256, witnessPresent });
}

function observeLibraryBinding(verified) {
  const workspaceRoot = verified.workspaceRoot ?? verified.runtimeRoot;
  const binding = verifyLibraryBinding(verified.config, workspaceRoot, verified.nativeBinding);
  if (binding.state !== "bound" && binding.state !== "d-marker-only") return binding;
  const filename = verified.config.workspace.witnessPath;
  const value = {
    format: "codexforge-animation-studio-library-binding-observed-v1",
    libraryId: binding.libraryId,
    markerSha256: binding.markerSha256,
    namespace: verified.config.workspace.namespace,
    runtimeRoot: workspaceRoot,
  };
  if (!fs.existsSync(filename)) {
    try { writeExclusiveJson(filename, value); }
    catch (error) { if (error.code !== "EEXIST") throw error; }
  }
  const record = readJsonFile(filename, 4096, "media-library witness");
  if (!record.bytes.equals(Buffer.from(`${canonicalJson(value)}\n`, "utf8"))) fail("LIBRARY_IDENTITY_MISMATCH", "The retained media-library witness differs.");
  return Object.freeze({ ...binding, witnessPresent: true });
}

let loadedNative = null;
let loadedNativePath = null;
function loadNativeBinding(addonPath) {
  if (loadedNative && loadedNativePath && samePath(loadedNativePath, addonPath)) return loadedNative;
  const loaded = { exports: {} };
  process.dlopen(loaded, addonPath);
  const rootPrototype = typeof loaded.exports.Root === "function" ? loaded.exports.Root.prototype : null;
  if (typeof loaded.exports.getProcessIdentity !== "function" || typeof loaded.exports.rootExists !== "function" || typeof loaded.exports.Root !== "function" || typeof rootPrototype?.readFile !== "function" || typeof rootPrototype?.close !== "function") fail("NATIVE_INTERFACE_INVALID", "The qualified native filesystem/process-identity interface is unavailable.");
  loadedNative = loaded.exports;
  loadedNativePath = addonPath;
  return loadedNative;
}

/** Install only the already hash-verified native addon before the application
 * loader runs. This uses its existing process cache, not a new path override. */
function bootstrapNativeBinding(verified) {
  const pathname = verifyFile(verified.config.tools.native, "tools.native");
  if (!samePath(pathname, verified.nativePath)) fail("IDENTITY_MISMATCH", "The verified native bootstrap path differs.");
  const binding = loadNativeBinding(pathname);
  const key = Symbol.for("codexforge.creator.native-filesystem.binding.v1");
  const existing = process[key];
  if (existing !== undefined && existing !== binding) fail("NATIVE_INTERFACE_INVALID", "A different native filesystem binding already owns the process cache.");
  if (existing === undefined) Object.defineProperty(process, key, { value: binding, configurable: false, enumerable: false, writable: false });
  return binding;
}

function processIdentity(binding, processId) {
  if (!Number.isSafeInteger(processId) || processId < 1 || processId > 0xffffffff) fail("INVALID_PROCESS_ID", "The recorded process ID is invalid.");
  const value = binding.getProcessIdentity(processId);
  if (!validProcessIdentity(value)) fail("NATIVE_INTERFACE_INVALID", "The native process identity is invalid.");
  return value;
}

function validProcessIdentity(value) {
  if (typeof value !== "string" || !/^windows-filetime:(?:0|[1-9]\d{0,19})$/u.test(value)) return false;
  const ticks = BigInt(value.slice("windows-filetime:".length));
  return ticks > 0n && ticks <= 18446744073709551615n;
}

function isExactProcessAlive(binding, processId, identity) {
  try {
    return processIdentity(binding, processId) === identity;
  } catch {
    return false;
  }
}

function validateState(value) {
  const version2 = plain(value) && value.format === STATE_V2_FORMAT;
  exactKeys(value, ["format", "phase", "sessionId", "pid", "processIdentity", "controlToken", "configSha256", "url", "runtimeRoot", "namespace", "libraryId", "buildId", "startedAt", "readyAt", ...(version2 ? ["workspaceRoot"] : [])], "owned process state");
  if (![STATE_FORMAT, STATE_V2_FORMAT].includes(value.format) || !["starting", "running", "failed"].includes(value.phase)) fail("INVALID_STATE", "The owned process state format or phase differs.");
  if (typeof value.sessionId !== "string" || !/^local-\d{8}T\d{6}Z-[a-f0-9]{12}$/u.test(value.sessionId)) fail("INVALID_STATE", "The owned session ID is invalid.");
  if (!Number.isSafeInteger(value.pid) || value.pid < 1 || value.pid > 0xffffffff || !validProcessIdentity(value.processIdentity)) fail("INVALID_STATE", "The owned process identity is invalid.");
  if (typeof value.controlToken !== "string" || !/^[a-f0-9]{64}$/u.test(value.controlToken) || !HASH_PATTERN.test(value.configSha256) || !HASH_PATTERN.test(value.libraryId)) fail("INVALID_STATE", "The owned process authority is invalid.");
  if (value.url !== "http://127.0.0.1:3379/animation-studio" || typeof value.runtimeRoot !== "string" || !path.isAbsolute(value.runtimeRoot) || path.resolve(value.runtimeRoot) !== value.runtimeRoot || typeof value.namespace !== "string" || !NAMESPACE_PATTERN.test(value.namespace) || typeof value.buildId !== "string" || !/^[A-Za-z0-9_-]{8,64}$/u.test(value.buildId)) fail("INVALID_STATE", "The owned process state contains invalid bindings.");
  if (version2 && (typeof value.workspaceRoot !== "string" || !path.isAbsolute(value.workspaceRoot) || path.resolve(value.workspaceRoot) !== value.workspaceRoot)) fail("INVALID_STATE", "The owned workspace binding is invalid.");
  const timestamps = [value.startedAt, ...(value.readyAt === null ? [] : [value.readyAt])];
  if (timestamps.some((stamp) => typeof stamp !== "string" || Number.isNaN(Date.parse(stamp)) || new Date(stamp).toISOString() !== stamp)) fail("INVALID_STATE", "The owned process timestamps are invalid.");
  return value;
}

function stateMatchesConfiguration(state, verified) {
  const config = verified.config, version2 = config.format === CONFIG_V2_FORMAT;
  return state.format === (version2 ? STATE_V2_FORMAT : STATE_FORMAT) &&
    state.configSha256 === verified.configSha256 && samePath(state.runtimeRoot, verified.runtimeRoot) &&
    (!version2 || samePath(state.workspaceRoot, verified.workspaceRoot)) &&
    state.url === config.url && state.namespace === config.workspace.namespace &&
    state.libraryId === config.workspace.libraryId && state.buildId === config.runtime.buildId;
}

function verifyBuiltArtifactProof(record, config, applicationRoot, nodeModulesTarget) {
  const proof = exactKeys(requireCanonicalRecord(record, "built application proof"), ["format", "status", "mode", "applicationRoot", "buildId", "nodeModulesTarget", "sourceBuildVerificationSha256", "nativeSha256"], "built application proof");
  if (proof.format !== ARTIFACT_FORMAT || proof.status !== "PASS" || proof.mode !== "built-in-place" ||
      !samePath(resolvedAbsolute(proof.applicationRoot, "artifact.applicationRoot"), applicationRoot) ||
      proof.buildId !== config.runtime.buildId || !samePath(resolvedAbsolute(proof.nodeModulesTarget, "artifact.nodeModulesTarget"), nodeModulesTarget) ||
      proof.sourceBuildVerificationSha256 !== config.runtime.acceptedBuildProof.sha256 || proof.nativeSha256 !== config.tools.native.sha256) {
    fail("IDENTITY_MISMATCH", "The retained built-in-place application proof differs.");
  }
  return proof;
}

function readState(filename) {
  if (!fs.existsSync(filename)) return null;
  const record = readJsonFile(filename, 16 * 1024, "owned process state");
  return validateState(requireCanonicalRecord(record, "owned process state"));
}

/** Optional v2 native execution authority is explicit, pinned and application-owned.
 * Stop validates its shape but must still work if Blender or the built app is absent. */
function verifyBlenderLaunchConfiguration(config, runtimeRoot, options = {}) {
  if (!Object.hasOwn(config, "blender")) return null;
  if (config.format !== CONFIG_V2_FORMAT) fail("INVALID_CONFIGURATION", "Native Blender authority requires the separate application/workspace launcher.");
  const native = exactKeys(config.blender, ["enabled", "executable", "sourceCatalog", "scripts"], "blender");
  if (native.enabled !== true) fail("INVALID_CONFIGURATION", "Omit Blender configuration unless its pinned native preview is explicitly enabled.");
  const materialEditing = Object.hasOwn(native.scripts ?? {}, "materialEdit") || Object.hasOwn(native.scripts ?? {}, "semanticSnapshot");
  exactKeys(native.scripts, ["inspect", "render", ...(materialEditing ? ["materialEdit", "semanticSnapshot"] : [])], "blender.scripts");
  const scriptRoot = path.join(resolvedAbsolute(runtimeRoot, "runtime.root"), "scripts", "blender-studio");
  function pinned(record, label, maximum, expectedPath) {
    exactKeys(record, ["path", "sha256"], label);
    const filename = resolvedAbsolute(record.path, `${label}.path`);
    if (!/^C:\\/iu.test(filename) || !HASH_PATTERN.test(record.sha256) || (expectedPath && !samePath(filename, expectedPath))) fail("INVALID_CONFIGURATION", `${label} escaped its approved pinned location.`);
    if (options.verifyFiles !== false) {
      existingDirectory(path.dirname(filename), `${label} parent`);
      let stat; try { stat = fs.lstatSync(filename); } catch { fail("MISSING_FILE", `${label} is unavailable.`); }
      if (!stat.isFile() || stat.isSymbolicLink() || stat.size < 1 || stat.size > maximum || !samePath(fs.realpathSync.native(filename), filename)) fail("IDENTITY_MISMATCH", `${label} is not a bounded ordinary file.`);
      verifyFile(record, label);
    }
    return filename;
  }
  if (typeof native.executable?.path !== "string" || path.basename(native.executable.path).toLowerCase() !== "blender.exe") fail("INVALID_CONFIGURATION", "The native executable must be the pinned Blender binary.");
  const executable = pinned(native.executable, "blender.executable", 512 * 1024 ** 2);
  const cataloguePath = pinned(native.sourceCatalog, "blender.sourceCatalog", 32768);
  for (const name of ["inspect", "render"]) pinned(native.scripts[name], `blender.scripts.${name}`, 1024 ** 2, path.join(scriptRoot, `${name}.py`));
  if (materialEditing) for (const [name, file] of [["materialEdit", "material_edit.py"], ["semanticSnapshot", "semantic_snapshot.py"]]) pinned(native.scripts[name], `blender.scripts.${name}`, 1024 ** 2, path.join(scriptRoot, file));
  if (options.verifyFiles !== false) {
    const record = readJsonFile(cataloguePath, 32768, "Blender source catalogue");
    if (sha256Buffer(record.bytes) !== native.sourceCatalog.sha256) fail("IDENTITY_MISMATCH", "The native source catalogue changed while it was checked.");
    const catalogue = exactKeys(record.value, ["schemaVersion", "sources"], "Blender source catalogue");
    if (catalogue.schemaVersion !== 1 || !Array.isArray(catalogue.sources) || catalogue.sources.length > 8) fail("INVALID_CONFIGURATION", "The native source catalogue profile is unsupported.");
    const seen = new Set();
    for (const item of catalogue.sources) {
      exactKeys(item, ["sourceId", "label", "path", "sha256", "byteLength", "version", "lineage", ...(Object.hasOwn(item, "editPolicy") ? ["editPolicy"] : [])], "Blender source");
      if (Object.hasOwn(item, "editPolicy")) {
        const policy = exactKeys(item.editPolicy, ["sourceSha256", "allowedMaterials", "protectedObjects", "protectedMaterials"], "Blender edit policy");
        if (policy.sourceSha256 !== item.sha256) fail("INVALID_CONFIGURATION", "Material edit policy must bind the exact approved source bytes.");
        for (const field of ["allowedMaterials", "protectedObjects", "protectedMaterials"]) if (!Array.isArray(policy[field]) || !policy[field].length || policy[field].length > 256 || new Set(policy[field]).size !== policy[field].length || policy[field].some(name => typeof name !== "string" || !name || name.length > 256 || /[\u0000-\u001f]/u.test(name))) fail("INVALID_CONFIGURATION", "Material edit policy requires exact bounded source-defined identities.");
        if (policy.allowedMaterials.some(name => policy.protectedMaterials.includes(name))) fail("INVALID_CONFIGURATION", "A protected material cannot be editable.");
      }
      if (typeof item.sourceId !== "string" || !/^[a-z0-9][a-z0-9-]{0,79}$/u.test(item.sourceId) || seen.has(item.sourceId) || typeof item.label !== "string" || !item.label.trim() || item.label.length > 160 || typeof item.lineage !== "string" || item.lineage.length > 512 || typeof item.path !== "string" || !/^[A-Za-z]:\\/u.test(item.path) || path.extname(item.path).toLowerCase() !== ".blend" || !HASH_PATTERN.test(item.sha256) || !Number.isSafeInteger(item.byteLength) || item.byteLength < 1 || item.byteLength > 128 * 1024 ** 2 || !Number.isSafeInteger(item.version) || item.version < 1 || /[\u0000-\u001f\u007f]/u.test(item.label + item.path + item.lineage)) fail("INVALID_CONFIGURATION", "A designated native source identity is invalid.");
      resolvedAbsolute(item.path, "Blender source path"); seen.add(item.sourceId);
      // Do not read .blend files or D: dependencies at launcher admission. The
      // application's inspection/start boundary verifies their current bytes.
    }
  }
  return Object.freeze({ executable, cataloguePath, scriptRoot, materialEditing });
}

function readConfiguration(filename, options = {}) {
  const configPath = resolvedAbsolute(filename, "configuration path");
  const record = readJsonFile(configPath, 64 * 1024, "launcher configuration");
  const configSha256 = sha256Buffer(record.bytes);
  const parsed = requireCanonicalRecord(record, "launcher configuration"), version2 = parsed.format === CONFIG_V2_FORMAT;
  const config = exactKeys(parsed, ["format", "url", "host", "port", "runtime", "scripts", "tools", "workspace", "directories", "control", "limits", ...(version2 ? ["workspaceRoot"] : []), ...(version2 && Object.hasOwn(parsed, "blender") ? ["blender"] : [])], "configuration");
  if (![CONFIG_FORMAT, CONFIG_V2_FORMAT].includes(config.format) || config.host !== "127.0.0.1" || config.port !== 3379 || config.url !== "http://127.0.0.1:3379/animation-studio") {
    fail("INVALID_CONFIGURATION", "The launcher must use the stable loopback-only Studio origin.");
  }

  exactKeys(config.runtime, ["root", "nodeModulesTarget", "buildId", "nextVersion", "acceptedBuildProof", version2 ? "artifactProof" : "copyManifest"], "runtime");
  exactKeys(config.scripts, ["core", "start", "server", "stop", "offline"], "scripts");
  exactKeys(config.tools, ["node", "native", "ffmpeg", "ffprobe", "font", "rendererVersion"], "tools");
  exactKeys(config.workspace, ["namespace", "mediaStorage", "projectStateRoot", "driveRoot", "libraryParent", "libraryId", "libraryRoot", "cMarkerPath", "dMarkerPath", "markerSha256", "witnessPath"], "workspace");
  exactKeys(config.directories, ["launcherRoot", "logsRoot", "renderWorkRoot", "tempRoot", "profileRoot", "appDataRoot", "localAppDataRoot", "evidenceRoot"], "directories");
  exactKeys(config.control, ["statePath"], "control");
  exactKeys(config.limits, ["startupMilliseconds", "stopMilliseconds", "maximumLogBytes"], "limits");

  // Stop can still authenticate its exact owner if the installed application is
  // unavailable. Its original workspace and pinned native addon remain required.
  const runtimeRoot = version2 && options.verifyRuntime === false
    ? resolvedAbsolute(config.runtime.root, "runtime.root") : existingDirectory(config.runtime.root, "runtime.root");
  const workspaceRoot = version2 ? existingDirectory(config.workspaceRoot, "workspaceRoot") : runtimeRoot;
  verifyBlenderLaunchConfiguration(config, runtimeRoot, { verifyFiles: options.verifyRuntime !== false });
  const launcherRoot = existingDirectory(config.directories.launcherRoot, "directories.launcherRoot");
  for (const [name, pathname] of Object.entries(config.directories)) {
    existingDirectory(pathname, `directories.${name}`);
  }
  if (!samePath(path.dirname(config.control.statePath), path.join(launcherRoot, "state"))) fail("INVALID_CONFIGURATION", "The owned state path escaped the launcher's state directory.");
  existingDirectory(path.dirname(config.control.statePath), "control state directory");

  const scriptPaths = {};
  for (const [name, identity] of Object.entries(config.scripts)) scriptPaths[name] = verifyFile(identity, `scripts.${name}`);
  const nodePath = verifyFile(config.tools.node, "tools.node");
  const nativePath = verifyFile(config.tools.native, "tools.native");
  if (!samePath(nativePath, path.join(version2 ? workspaceRoot : runtimeRoot, "build", "Release", "codexforge_creator_filesystem.node"))) fail("INVALID_CONFIGURATION", "The native addon path escaped its pinned workspace/runtime location.");
  const nativeBinding = loadNativeBinding(nativePath);

  if (options.verifyRuntime !== false) {
    const nodeModulesPath = path.join(runtimeRoot, "node_modules");
    const nodeModulesTarget = existingDirectory(config.runtime.nodeModulesTarget, "runtime.nodeModulesTarget");
    let linkedTarget;
    try { linkedTarget = fs.realpathSync.native(nodeModulesPath); } catch { fail("MISSING_DIRECTORY", "The pinned node_modules junction is unavailable."); }
    if (!samePath(linkedTarget, nodeModulesTarget)) fail("IDENTITY_MISMATCH", "The node_modules junction target differs.");
    const buildProofPath = verifyFile(config.runtime.acceptedBuildProof, "runtime.acceptedBuildProof");
    const buildProof = readJsonFile(buildProofPath, 128 * 1024, "accepted build proof").value;
    if (buildProof.status !== "PASS" || buildProof.buildId !== config.runtime.buildId || buildProof.nativeSha256 !== config.tools.native.sha256) fail("IDENTITY_MISMATCH", "The inherited accepted build proof differs.");
    if (version2) {
      const artifactPath = verifyFile(config.runtime.artifactProof, "runtime.artifactProof");
      verifyBuiltArtifactProof(readJsonFile(artifactPath, 64 * 1024, "built application proof"), config, runtimeRoot, nodeModulesTarget);
    } else {
      const copyManifestPath = verifyFile(config.runtime.copyManifest, "runtime.copyManifest");
      const copyManifestRecord = readJsonFile(copyManifestPath, 1024 * 1024, "runtime copy manifest");
      const copyManifest = requireCanonicalRecord(copyManifestRecord, "runtime copy manifest");
      if (copyManifest.format !== COPY_FORMAT || copyManifest.status !== "PASS" || copyManifest.buildId !== config.runtime.buildId || !samePath(copyManifest.destinationRoot, runtimeRoot) || !samePath(copyManifest.nodeModulesTarget, nodeModulesTarget) || copyManifest.sourceBuildVerificationSha256 !== config.runtime.acceptedBuildProof.sha256) {
        fail("IDENTITY_MISMATCH", "The retained runtime-copy proof differs.");
      }
    }
    const buildId = fs.readFileSync(path.join(runtimeRoot, ".next", "BUILD_ID"), "utf8").trim();
    if (buildId !== config.runtime.buildId) fail("IDENTITY_MISMATCH", "The accepted runtime build ID differs.");
    const nextPackage = readJsonFile(path.join(runtimeRoot, "node_modules", "next", "package.json"), 1024 * 1024, "Next package identity").value;
    if (nextPackage.version !== config.runtime.nextVersion) fail("IDENTITY_MISMATCH", "The accepted Next runtime version differs.");
  }

  if (options.verifyRenderer !== false) {
    verifyFile(config.tools.ffmpeg, "tools.ffmpeg");
    verifyFile(config.tools.ffprobe, "tools.ffprobe");
    verifyFile(config.tools.font, "tools.font");
  }
  if (config.tools.rendererVersion !== "gyan-9.0.2-full-codexforge-v1") fail("INVALID_CONFIGURATION", "The renderer version differs from the qualified contract.");
  if (config.workspace.mediaStorage !== "d-drive") fail("INVALID_CONFIGURATION", "The personal pilot must use the D:-backed media-library mode.");
  const binding = options.verifyLibrary === false
    ? Object.freeze({ state: "not-checked", libraryId: config.workspace.libraryId, markerSha256: config.workspace.markerSha256, witnessPresent: fs.existsSync(config.workspace.witnessPath) })
    : verifyLibraryBinding(config, workspaceRoot, nativeBinding);

  for (const [key, minimum, maximum] of [["startupMilliseconds", 5_000, 120_000], ["stopMilliseconds", 5_000, 120_000], ["maximumLogBytes", 64 * 1024, 32 * 1024 * 1024]]) {
    if (!Number.isSafeInteger(config.limits[key]) || config.limits[key] < minimum || config.limits[key] > maximum) fail("INVALID_CONFIGURATION", `limits.${key} is outside the supported bound.`);
  }
  return Object.freeze({ configPath, configSha256, config, runtimeRoot, workspaceRoot, launcherRoot, scriptPaths, nodePath, nativePath, nativeBinding, binding });
}

function safeEnvironment(verified, sessionId) {
  const config = verified.config;
  const env = {
    SystemRoot: process.env.SystemRoot || "C:\\Windows",
    WINDIR: process.env.WINDIR || "C:\\Windows",
    PATH: `${path.dirname(verified.nodePath)};C:\\Windows\\System32`,
    TEMP: config.directories.tempRoot,
    TMP: config.directories.tempRoot,
    USERPROFILE: config.directories.profileRoot,
    APPDATA: config.directories.appDataRoot,
    LOCALAPPDATA: config.directories.localAppDataRoot,
    NODE_ENV: "production",
    NEXT_TELEMETRY_DISABLED: "1",
    NODE_OPTIONS: `--require ${JSON.stringify(verified.scriptPaths.offline)} --max-old-space-size=24576`,
    CODEXFORGE_STUDIO_OPERATOR_ENABLED: "1",
    CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE: config.workspace.namespace,
    CODEXFORGE_STUDIO_MEDIA_STORAGE: "d-drive",
    CODEXFORGE_STUDIO_RENDERER_ENABLED: "1",
    CODEXFORGE_STUDIO_RENDERER_VERSION: config.tools.rendererVersion,
    CODEXFORGE_STUDIO_RENDER_WORK_ROOT: config.directories.renderWorkRoot,
    CODEXFORGE_STUDIO_FFMPEG_PATH: config.tools.ffmpeg.path,
    CODEXFORGE_STUDIO_FFMPEG_SHA256: config.tools.ffmpeg.sha256,
    CODEXFORGE_STUDIO_FFPROBE_PATH: config.tools.ffprobe.path,
    CODEXFORGE_STUDIO_FFPROBE_SHA256: config.tools.ffprobe.sha256,
    CODEXFORGE_STUDIO_FONT_PATH: config.tools.font.path,
    CODEXFORGE_STUDIO_FONT_SHA256: config.tools.font.sha256,
    CODEXFORGE_LOCAL_NETWORK_DENIAL_LOG: path.join(config.directories.logsRoot, `${sessionId}-network-denials.ndjson`),
    CODEXFORGE_LOCAL_MAX_LOG_BYTES: String(config.limits.maximumLogBytes),
  };
  const blender = verifyBlenderLaunchConfiguration(config, verified.runtimeRoot);
  if (blender) Object.assign(env, {
    CODEXFORGE_STUDIO_BLENDER_ENABLED: "1",
    CODEXFORGE_STUDIO_BLENDER_PATH: blender.executable,
    CODEXFORGE_STUDIO_BLENDER_SHA256: config.blender.executable.sha256,
    CODEXFORGE_STUDIO_BLENDER_SOURCE_CATALOG_JSON: blender.cataloguePath,
    CODEXFORGE_STUDIO_BLENDER_SOURCE_CATALOG_SHA256: config.blender.sourceCatalog.sha256,
    CODEXFORGE_STUDIO_BLENDER_SCRIPT_ROOT: blender.scriptRoot,
  });
  if (blender?.materialEditing) Object.assign(env, { CODEXFORGE_STUDIO_BLENDER_EDIT_ENABLED: "1", CODEXFORGE_STUDIO_BLENDER_EDIT_SHA256: config.blender.scripts.materialEdit.sha256, CODEXFORGE_STUDIO_BLENDER_SEMANTIC_SHA256: config.blender.scripts.semanticSnapshot.sha256 });
  const credentialKeys = Object.keys(env).filter((name) => /(TOKEN|KEY|SECRET|PASSWORD|CREDENTIAL|GROQ|OPENAI|ANTHROPIC|AZURE|AWS)/iu.test(name));
  if (credentialKeys.length !== 0) fail("CREDENTIAL_ENVIRONMENT", "Credential-like environment keys are forbidden.");
  return Object.freeze(env);
}

function makeSessionId(now = new Date()) {
  const stamp = now.toISOString().replaceAll("-", "").replaceAll(":", "").replace(/\.\d{3}Z$/u, "Z");
  return `local-${stamp}-${crypto.randomBytes(6).toString("hex")}`;
}

function controlRequest(config, state, method, pathname, timeoutMilliseconds = 5_000) {
  return new Promise((resolve, reject) => {
    const request = http.request({
      host: config.host,
      port: config.port,
      method,
      path: pathname,
      headers: { Authorization: `Bearer ${state.controlToken}`, Host: `${config.host}:${config.port}`, Connection: "close" },
      timeout: timeoutMilliseconds,
    }, (response) => {
      const chunks = [];
      let total = 0;
      response.on("data", (chunk) => {
        total += chunk.length;
        if (total > 16 * 1024) request.destroy(new Error("Control response exceeded 16 KiB."));
        else chunks.push(chunk);
      });
      response.on("end", () => {
        let body = null;
        try { body = JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { /* caller checks */ }
        resolve({ status: response.statusCode ?? 0, body });
      });
    });
    request.once("timeout", () => request.destroy(new Error("Control request timed out.")));
    request.once("error", reject);
    request.end();
  });
}

function probePort(host, port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.once("error", (error) => {
      if (error.code === "EADDRINUSE" || error.code === "EACCES") resolve(false);
      else reject(error);
    });
    server.listen({ host, port, exclusive: true }, () => server.close((error) => error ? reject(error) : resolve(true)));
  });
}

function pause(milliseconds) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
}

module.exports = Object.freeze({
  CONFIG_FORMAT,
  CONFIG_V2_FORMAT,
  STATE_FORMAT,
  STATE_V2_FORMAT,
  COPY_FORMAT,
  ARTIFACT_FORMAT,
  CONTROL_STATUS_PATH,
  CONTROL_STOP_PATH,
  LocalLauncherError,
  canonicalJson,
  sha256Buffer,
  sha256File,
  writeExclusiveJson,
  replaceJson,
  deriveLibraryId,
  markerBytes,
  classifyLibraryState,
  verifyLibraryBinding,
  observeLibraryBinding,
  readConfiguration,
  loadNativeBinding,
  bootstrapNativeBinding,
  processIdentity,
  isExactProcessAlive,
  validateState,
  stateMatchesConfiguration,
  verifyBuiltArtifactProof,
  verifyBlenderLaunchConfiguration,
  readState,
  safeEnvironment,
  makeSessionId,
  controlRequest,
  probePort,
  pause,
  samePath,
});
