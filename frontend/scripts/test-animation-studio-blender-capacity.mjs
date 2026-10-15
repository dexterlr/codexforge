// Synthetic canonical persistence only: no Blender/FFmpeg execution, media decode,
// real project mutation, D: access, network, or commercial/Browser acceptance.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import childProcess from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const filename = fileURLToPath(import.meta.url), frontend = path.resolve(path.dirname(filename), "..");
assert.equal(path.resolve(process.cwd()), frontend);
const networkAttempts = blockStudioTestNetwork(), processAttempts = [], allowedNodeRestart = childProcess.spawnSync;
for (const method of ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]) childProcess[method] = (...args) => { processAttempts.push({ method, executable: String(args[0]) }); throw Error("External process forbidden in capacity fixture"); };
const loader = createStudioTestLoader(frontend);
const store = loader.load("@/lib/codexforge/animation-studio/store.server");
const validation = loader.load("@/lib/codexforge/animation-studio/validation");
const { readBlenderJob } = loader.load("@/lib/codexforge/animation-studio/blender-source-identity.server");
const { defaultLayerTransform } = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const { openCreatorNativeRoot } = loader.load("@/lib/codexforge/creator/creator-native-filesystem.server");
const { createStudioBlenderHandler } = loader.load("@/lib/codexforge/animation-studio/blender-http.server");
const { hashJarvisChatCanonicalJson: digest, serializeJarvisChatCanonicalJson: canonical } = loader.load("@/lib/codexforge/jarvis-chat/jarvis-chat-crypto");
const editContract = loader.load("@/lib/codexforge/animation-studio/blender-edit-contract");
const journal = loader.load("@/lib/codexforge/animation-studio/blender-record-journal.server");
const { readStudioBlenderRecoveryAuthorization } = loader.load("@/lib/codexforge/animation-studio/operator-repository.server");
const sha = value => createHash("sha256").update(value).digest("hex"), clone = value => JSON.parse(JSON.stringify(value));
const actor = "synthetic-capacity-test", run = "blender-capacity-" + randomUUID().replaceAll("-", "").slice(0, 20);
let serial = 0;
const now = () => new Date(Date.UTC(2026, 9, 15, 0, 0, 0, serial++ * 2)).toISOString();
const key = name => `${name}_${String(serial++).padStart(10, "0")}`;
const oldHash = sha("synthetic unopened native v1"), nativeV2 = Buffer.from("synthetic unopened native version two"), newHash = sha(nativeV2);
const inspection = { schemaVersion: 1, supported: true, unsupported: [], sourceSha256: oldHash, sourceBytes: 100, blenderVersion: "5.0.1", dependencies: [], scenes: [{ name: "Scene", cameras: ["Camera"], activeCamera: "Camera", frameStart: 1, frameEnd: 1500, fps: 25, fpsBase: 1 }] };
const descriptor = { format: "studio-blender-source-v1", catalogueId: "synthetic-capacity-source", label: "Synthetic native only", source: { originalPath: "C:\\SyntheticUnopened\\fixture.blend", relativeName: "fixture.blend", byteLength: 100, sha256: oldHash }, dependencies: [], inspection };
const settings = { profile: "BLENDER_PREVIEW_720P25_V1", scene: "Scene", camera: "Camera", frameStart: 76, frameEnd: 150, width: 1280, height: 720, fps: 25, adapterVersion: "synthetic-capacity-v1", blender: { path: "C:\\SyntheticUnopened\\blender.exe", sha256: sha("blender"), version: "5.0.1" }, ffmpeg: { path: "C:\\SyntheticUnopened\\ffmpeg.exe", sha256: sha("ffmpeg") }, ffprobe: { path: "C:\\SyntheticUnopened\\ffprobe.exe", sha256: sha("ffprobe") }, scriptHashes: { inspect: sha("inspect"), render: sha("render") }, colourTransform: "SYNTHETIC_METADATA_NOT_COLOUR_PROOF" };
const video = Buffer.alloc(524_288 + 29, 0x56);
function staged(overrides = {}) {
  return { mediaType: "VIDEO", contentType: "video/mp4", byteLength: video.length, contentHash: sha(video), technical: { schema: "studio-qualified-local-media-v1", mediaType: "VIDEO", contentType: "video/mp4", container: "mp4", codec: "h264", pixelFormat: "yuv420p", width: 1280, height: 720, frameRate: { numerator: 25, denominator: 1 }, frameCadence: "CFR_25_EXACT", duration: { numerator: 3, denominator: 1 }, sourceUnits: 75, sourceUnit: "FRAME", timeBase: { numerator: 1, denominator: 12800 }, colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", dynamicRange: "SDR_BT709", rotationDegrees: 0, streamCount: 1, probeDigest: sha("synthetic-not-probed") }, read: (offset, length) => video.subarray(offset, offset + length), close() {}, ...overrides };
}
function independentText(value) {
  if (typeof value === "string") return value.length;
  if (Array.isArray(value)) return value.reduce((sum, v) => sum + independentText(v), 0);
  if (value && typeof value === "object") return Object.entries(value).reduce((sum, [k, v]) => sum + k.length + independentText(v), 0);
  return 0;
}
if (process.argv[2] === "--restart") {
  assert.equal(process.argv.length, 5); assert.match(process.argv[3], /^blender-capacity-[a-z0-9-]+$/);
  const repository = store.openStudioRepository({ workspace: "test", namespace: process.argv[3], mediaStorage: "workspace" });
  try { console.log(JSON.stringify({ snapshot: repository.load(process.argv[4]), networkAttempts, processAttempts })); } finally { repository.close(); }
} else {
  assert.equal(process.argv.length, 2);
  const evidence = path.join(frontend, ".codexforge", "acceptance", run); fs.mkdirSync(evidence, { recursive: false });
  const results = [], contexts = [], measurements = [];
  const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
  async function test(name, action) { try { await action(); results.push({ name, status: "PASS" }); } catch (error) { results.push({ name, status: "FAIL", code: error.code ?? null, message: error.message, stack: error.stack }); } console.log(results.at(-1).status + " " + name); }
  function context(label, gate = null) {
    const namespace = `${run}-${label}`, projectId = `project_capacity_${label.replaceAll("-", "_")}`;
    const c = { namespace, projectId, control: { beforeReplace: null, exclusiveFailure: null }, gate, repository: null, source: null, shotId: null };
    c.directory = path.join(frontend, ".codexforge", "studio-tests", namespace);
    c.manifest = path.join(c.directory, "studio", "projects", projectId, "manifests", "project.json");
    c.open = () => {
      const native = openCreatorNativeRoot([".codexforge", "studio-tests", namespace], "persistent");
      const proxy = new Proxy(native, { get(target, property) {
        if (property === "writeAtomicReplace") return (...args) => { const hook = c.control.beforeReplace; if (hook) { c.control.beforeReplace = null; hook(args); } return target.writeAtomicReplace(...args); };
        if (property === "writeAtomicExclusive") return (...args) => { if (c.control.exclusiveFailure?.(args)) throw Object.assign(Error("Synthetic exclusive write failure"), { code: "synthetic_io" }); return target.writeAtomicExclusive(...args); };
        const value = target[property]; return typeof value === "function" ? value.bind(target) : value;
      } });
      return new store.StudioRepository(proxy, undefined, null, c.gate);
    };
    c.repository = c.open(); contexts.push(c);
    c.reopen = () => { c.repository.close(); c.repository = c.open(); };
    c.snapshot = () => c.repository.loadManifest(projectId);
    c.disk = () => JSON.parse(fs.readFileSync(c.manifest, "utf8"));
    c.prepare = () => { const input = { projectId, shotId: c.shotId, expectedProjectRevision: c.snapshot().project.revision, requestedAt: now(), source: c.source, settings }, requestKey = key("prepare"), receipt = c.repository.prepareBlenderRender(input, requestKey, actor); c.lastPreparation = { input, key: requestKey, receipt }; return receipt.value; };
    c.acquire = job => c.repository.acquireBlenderRender(projectId, job.jobId, readBlenderJob(job).specDigest, key("acquire"), actor, now());
    c.progress = (active, completedFrames = 75, phase = "VALIDATING", requestKey = key("progress"), at = now()) => c.repository.checkpointBlenderRender(projectId, active.job.jobId, active.token, { phase, completedFrames, totalFrames: 75, process: { pid: 12345, identity: "synthetic-not-a-real-process", executableSha256: settings.blender.sha256, startedAt: active.job.startedAt } }, requestKey, actor, at);
    c.publish = (active, data = staged(), requestKey = key("publish"), at = now()) => c.repository.publishBlenderRenderOutput(projectId, active.job.jobId, active.token, data, requestKey, actor, at);
    c.terminate = (active, phase, requestKey = key("terminal"), at = now(), errorCode = "SYNTHETIC_INTERRUPTION") => c.repository.terminateBlenderRender(projectId, active.job.jobId, active.token, phase, errorCode, requestKey, actor, at);
    c.repository.createDraftProject({ schemaVersion: 1, projectId, revision: 1, title: "Synthetic capacity regression", description: "Synthetic only — not an actual render", currency: "GBP", createdAt: now() }, key("create"), actor);
    c.shotId = c.snapshot().shots[0].shotId;
    c.source = c.repository.registerBlenderSource({ projectId, shotId: c.shotId, expectedProjectRevision: c.snapshot().project.revision, requestedAt: now(), descriptor }, key("register"), actor).value.source;
    return c;
  }
  function fillToAdmissionBoundary(c) {
    let length = 8192, accepted = 0, rejected = 0;
    while (length >= 64 && accepted + rejected < 60) {
      const before = fs.readFileSync(c.manifest), definition = { schemaVersion: 1, promptId: `prompt_capacity_${serial++}`, version: 1, text: "Genuine synthetic retained history. " + "x".repeat(length), negativePrompt: null, references: [] };
      try { c.repository.registerDefinition(c.projectId, definition, key("history"), actor, now()); accepted++; }
      catch (error) { const active = c.snapshot().jobs.some(j => j.state === "RUNNING"); if (active) assert.equal(error.code, "BLENDER_RECORD_CAPACITY", "Near-limit mutation must expose the reserved-capacity reason"); else assert.ok(error.code === "BLENDER_RECORD_CAPACITY" || error.issues?.[0]?.code === "TEXT_LIMIT", "Only actual aggregate capacity may end fixture filling"); assert.deepEqual(fs.readFileSync(c.manifest), before); length = Math.floor(length / 2); rejected++; }
    }
    assert.ok(rejected > 0 && accepted + rejected < 60); const actual = store.measureStudioRecordCapacity(c.disk()); assert.equal(actual.textCharacters, independentText(c.disk()));
    assert.ok(actual.textCharacters > 180000 && actual.textCharacters <= 262144, "High-occupancy fixture must approach the actual limit"); measurements.push({ label: c.namespace, accepted, rejected, ...actual }); return actual;
  }
  function nativeLineage(c) {
    const baseline = c.acquire(c.prepare()); c.progress(baseline); const baselineReceipt = c.publish(baseline), oldSource = clone(c.source);
    const target = { targetId: sha("collar socket"), materialName: "Collar", nodeName: "Tint", socketIdentifier: "Color1", originalLinear: [0.1, 0.2, 0.3, 1], users: ["CollarObject"], eligible: true, reason: null };
    const proposal = editContract.validateBlenderEditProposal({ format: "studio-blender-material-proposal-v1", projectId: c.projectId, shotId: c.shotId, source: c.source, descriptorHash: digest(descriptor), blendSha256: oldHash, inspectionDigest: sha("inspection"), semanticDigest: sha("before"), dependenciesDigest: digest([]), protectedDigest: sha("protected"), policy: { sourceSha256: oldHash, allowedMaterials: ["Collar"], protectedObjects: ["Camera", "Screen"], protectedMaterials: ["White"] }, target, colourSrgb: "#FF0000", originalLinear: target.originalLinear, requestedLinear: [1, 0, 0, 1], adapterVersion: editContract.BLENDER_EDIT_ADAPTER, blender: { path: "C:\\SyntheticUnopened\\blender.exe", sha256: settings.blender.sha256, version: "5.0.1" }, scriptHashes: { materialEdit: sha("edit"), semanticSnapshot: sha("verify") }, legacyAdapterDigest: sha("adapter") });
    const job = c.repository.prepareBlenderEdit({ projectId: c.projectId, shotId: c.shotId, expectedProjectRevision: c.snapshot().project.revision, requestedAt: now(), proposal }, key("prepare-edit"), actor).value;
    const active = c.repository.acquireBlenderEdit(c.projectId, job.jobId, digest(proposal), key("apply-edit"), actor, now());
    c.repository.checkpointBlenderEdit(c.projectId, job.jobId, active.token, { pid: 54321, identity: "synthetic-edit-process", executableSha256: settings.blender.sha256, startedAt: active.job.startedAt }, key("edit-process"), actor, now());
    const proof = { format: "studio-blender-material-verification-v1", outputSha256: newHash, outputBytes: nativeV2.length, beforeSemanticDigest: proposal.semanticDigest, afterSemanticDigest: sha("after"), protectedDigest: proposal.protectedDigest, changedTargetId: target.targetId, originalLinear: target.originalLinear, requestedLinear: [1, 0, 0, 1], reopened: true, onlyIntendedChange: true };
    const receipt = c.repository.publishBlenderEdit(c.projectId, job.jobId, active.token, nativeV2, { ...inspection, sourceSha256: newHash, sourceBytes: nativeV2.length }, proof, key("publish-edit"), actor, now()); c.source = receipt.value.source;
    return { oldSource, baseline: baselineReceipt.value.asset, before: clone(c.snapshot()) };
  }
  try {
    await test("01 actual UTF-16 aggregate text boundary below/at/above, keys, non-ASCII and JSON escaping", () => {
      assert.equal(validation.STUDIO_VALIDATION_LIMITS.maxTotalStringLength, 262144);
      for (const character of ["x", "é", "😀", "\\", "\n"]) {
        const piece = character.repeat(16384 / character.length), exact = Array.from({ length: 16 }, () => piece);
        const below = [...exact]; below[15] = below[15].slice(0, -1); const above = [...exact, "x"];
        assert.equal(independentText(below), 262143); assert.equal(independentText(exact), 262144); assert.equal(independentText(above), 262145);
        assert.deepEqual(validation.cloneStudioJson(below), below); assert.deepEqual(validation.cloneStudioJson(exact), exact);
        assert.throws(() => validation.cloneStudioJson(above), e => e.issues?.[0]?.code === "TEXT_LIMIT");
        const encoded = JSON.stringify(exact); assert.deepEqual(validation.cloneStudioJson(store.parseStudioJson(encoded)), exact);
        const measured = store.measureStudioRecordCapacity(exact); assert.equal(measured.textCharacters, 262144); assert.equal(measured.bytes, Buffer.byteLength(canonical(exact), "utf8"));
        measurements.push({ case: character, textCharacters: measured.textCharacters, serializedCharacters: encoded.length, utf8Bytes: measured.bytes });
      }
      const keyed = { a: Array.from({ length: 16 }, () => "x".repeat(16384)) }; assert.equal(independentText(keyed), 262145); assert.throws(() => validation.cloneStudioJson(keyed), e => e.issues?.[0]?.code === "TEXT_LIMIT");
    });
    await test("02 600 frame/heartbeat callbacks have bounded latest progress and no audit/receipt growth", () => {
      const c = context("progress"), retained = nativeLineage(c), active = c.acquire(c.prepare()), before = c.snapshot(), checkpoints = [];
      const initialKey = key("initial-progress"), initialAt = now(); c.progress(active, 1, "RENDERING", initialKey, initialAt);
      const initialBytes = fs.readFileSync(c.manifest);
      assert.throws(() => c.progress(active, 2, "RENDERING", initialKey, initialAt), "The same progress key cannot authorize different progress");
      assert.throws(() => c.progress(active, 2, "RENDERING", key("stale-progress"), new Date(Date.parse(active.job.startedAt) - 1).toISOString()), "A timestamp predating acquisition cannot replace progress");
      assert.deepEqual(fs.readFileSync(c.manifest), initialBytes);
      for (let i = 1; i <= 600; i++) { c.progress(active, Math.ceil(i / 8), "RENDERING"); if ([1, 75, 300, 600].includes(i)) checkpoints.push({ callbacks: i, ...store.measureStudioRecordCapacity(c.disk()) }); }
      const after = c.snapshot(); assert.equal(after.project.revision, before.project.revision); assert.equal(after.events.length, before.events.length); assert.equal(after.receipts.length, before.receipts.length);
      assert.ok(Math.max(...checkpoints.map(x => x.textCharacters)) - Math.min(...checkpoints.map(x => x.textCharacters)) < 1024);
      assert.deepEqual(after.assets, retained.before.assets); assert.deepEqual(after.jobs.filter(j => j.jobId !== active.job.jobId), retained.before.jobs);
      assert.deepEqual(c.repository.readBlenderSource(c.projectId, retained.oldSource), descriptor); assert.deepEqual(c.repository.readBlenderNativeVersion(c.projectId, c.source), nativeV2); assert.deepEqual(c.repository.readFootage(c.projectId, retained.baseline.assetId, retained.baseline.version), video);
      const stable = fs.readFileSync(c.manifest), requestKey = key("duplicate"), at = now(); c.progress(active, 75, "RENDERING", requestKey, at); const once = fs.readFileSync(c.manifest); c.progress(active, 75, "RENDERING", requestKey, at); assert.deepEqual(fs.readFileSync(c.manifest), once);
      assert.ok(stable.length > 0); assert.throws(() => c.progress(active, 74, "RENDERING")); assert.throws(() => c.progress(active, 75, "STARTING"));
      c.progress(active); c.publish(active); const terminal = fs.readFileSync(c.manifest); assert.throws(() => c.progress(active)); assert.deepEqual(fs.readFileSync(c.manifest), terminal); measurements.push({ label: "600-callback-growth", checkpoints });
    });
    await test("02b working-copy anchor created during RUNNING survives same-revision progress and terminal publication", () => {
      const c = context("editorial-anchor"), retained = nativeLineage(c), active = c.acquire(c.prepare());
      const original = c.repository.reviewEditorial(c.projectId), content = clone(original.editorial.content), compositionId = content.compositions[0].compositionId, stamp = now();
      const takeId = "take_capacity_anchor", layerId = "layer_capacity_anchor";
      content.takes = [{ schemaVersion: 1, takeId, projectId: c.projectId, shotId: c.shotId, source: retained.baseline, name: "Retained synthetic baseline", createdAt: stamp, review: { state: "UNREVIEWED", note: "", reviewedAt: null } }];
      content.selectedTakes = [{ shotId: c.shotId, takeId }];
      content.compositions[0].layers = [{ schemaVersion: 1, layerId, compositionId, name: "Original anchor layer", type: "VIDEO", source: { kind: "ASSET", asset: retained.baseline, takeId }, enabled: true, locked: false, solo: false, startUs: 0, durationUs: 1_000_000, sourceOffsetUs: 0, playbackRate: 1, reverse: false, transform: defaultLayerTransform(), opacity: 1, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } }];
      c.repository.saveEditorial({ projectId: c.projectId, expectedRevision: 0, expectedProjectRevision: original.snapshot.project.revision, content, requestedAt: now() }, key("running-original-save"), actor);
      c.repository.migrateEditorialV2({ operation: "COPY_V1_TO_V2", projectId: c.projectId, expectedProjectRevision: c.snapshot().project.revision, expectedEditorialRevision: 1, requestedAt: now() }, key("running-copy"), actor);
      const current = () => c.repository.reviewEditorialV2Composition(c.projectId, compositionId), initial = current();
      c.repository.editEditorialV2Layer({ operation: "SET_LAYER_PROPERTIES", projectId: c.projectId, compositionId, layerId, expectedRevision: initial.revision, expectedCompositionRevision: initial.composition.revision, changes: { name: "Edited anchor layer" }, requestedAt: now() }, key("running-editorial-edit"), actor);
      const anchored = current(), originalEditorial = clone(c.repository.reviewEditorial(c.projectId).editorial), beforeProgress = c.snapshot();
      assert.equal(anchored.history.undo.available, true); assert.equal(beforeProgress.jobs.find(j => j.jobId === active.job.jobId).state, "RUNNING");
      for (const frame of [1, 2, 3]) {
        c.progress(active, frame, "RENDERING"); const after = c.snapshot();
        assert.equal(after.project.revision, beforeProgress.project.revision); assert.equal(after.events.length, beforeProgress.events.length); assert.equal(after.receipts.length, beforeProgress.receipts.length);
        assert.notEqual(after.recordDigest, beforeProgress.recordDigest); assert.deepEqual(current(), anchored); assert.equal(c.repository.inspectEditorialV2WorkingCopy(c.projectId).workingCopy.state, "READY");
      }
      c.reopen(); assert.deepEqual(current(), anchored); assert.deepEqual(c.repository.reviewEditorial(c.projectId).editorial, originalEditorial);
      c.progress(active); const published = c.publish(active); assert.equal(c.snapshot().jobs.find(j => j.jobId === active.job.jobId).state, "SUCCEEDED"); assert.notDeepEqual(published.value.asset, retained.baseline);
      assert.deepEqual(current(), anchored); assert.deepEqual(c.repository.reviewEditorial(c.projectId).editorial, originalEditorial); assert.deepEqual(c.repository.readFootage(c.projectId, retained.baseline.assetId, retained.baseline.version), video);
      for (const [operation, expectedName] of [["UNDO_EDITORIAL_EDIT", "Original anchor layer"], ["REDO_EDITORIAL_EDIT", "Edited anchor layer"]]) { const view = current(); c.repository.navigateEditorialV2History({ operation, projectId: c.projectId, compositionId, expectedRevision: view.revision, expectedHeadDigest: view.headDigest, expectedCompositionRevision: view.composition.revision, requestedAt: now() }, key("anchor-history"), actor); assert.equal(current().composition.layers[0].name, expectedName); }
      assert.equal(c.repository.inspectEditorialV2WorkingCopy(c.projectId).takeCatalogue.length, 1); assert.deepEqual(c.repository.readBlenderNativeVersion(c.projectId, c.source), nativeV2);
    });
    for (const terminal of ["SUCCEEDED", "FAILED", "CANCELLED", "INTERRUPTED"]) await test(`03 near-limit ${terminal} retains capacity, one consumed attempt and exact replay after reopen`, () => {
      const c = context("near-" + terminal.toLowerCase()), active = c.acquire(c.prepare()); c.progress(active); const occupancy = fillToAdmissionBoundary(c), historical = clone(c.snapshot().definitions);
      const requestKey = key("terminal"), at = now(), receipt = terminal === "SUCCEEDED" ? c.publish(active, staged(), requestKey, at) : c.terminate(active, terminal, requestKey, at, "S".repeat(96));
      const final = c.snapshot(), job = final.jobs.find(j => j.jobId === active.job.jobId); assert.equal(job.state, terminal === "SUCCEEDED" ? "SUCCEEDED" : terminal === "CANCELLED" ? "CANCELLED" : "FAILED"); assert.equal(readBlenderJob(job).phase, terminal === "SUCCEEDED" ? "COMPLETED" : terminal); assert.equal(job.attempt, 1); assert.deepEqual(final.definitions, historical);
      const bytes = fs.readFileSync(c.manifest); c.reopen(); const replay = terminal === "SUCCEEDED" ? c.publish(active, staged(), requestKey, at) : c.terminate(active, terminal, requestKey, at, "S".repeat(96)); assert.deepEqual(replay, receipt); assert.deepEqual(fs.readFileSync(c.manifest), bytes);
      assert.throws(() => c.progress(active)); assert.throws(() => c.acquire(active.job)); assert.deepEqual(c.snapshot(), final); assert.equal(final.assets.length, terminal === "SUCCEEDED" ? 2 : 1); measurements.push({ terminal, before: occupancy, after: store.measureStudioRecordCapacity(c.disk()) });
    });
    await test("04 capacity admission rejects before claim, authority or any process launch", () => {
      const c = context("admission"); fillToAdmissionBoundary(c); const before = fs.readFileSync(c.manifest); assert.throws(() => c.prepare(), e => e.code === "BLENDER_RECORD_CAPACITY"); assert.deepEqual(fs.readFileSync(c.manifest), before); assert.deepEqual(c.snapshot().jobs, []); assert.deepEqual(processAttempts, []);
    });
    await test("05 deterministic stale progress CAS cannot overwrite a concurrent terminal state", () => {
      const c = context("stale"), active = c.acquire(c.prepare()); c.progress(active, 1, "RENDERING"); const other = c.open();
      try { c.control.beforeReplace = () => other.terminateBlenderRender(c.projectId, active.job.jobId, active.token, "INTERRUPTED", "SYNTHETIC_INTERRUPTED", key("other-terminal"), actor, now()); assert.throws(() => c.progress(active, 2, "RENDERING"), e => e.code === "compare_mismatch"); }
      finally { other.close(); }
      c.reopen(); const job = c.snapshot().jobs[0]; assert.equal(job.state, "FAILED"); assert.equal(readBlenderJob(job).phase, "INTERRUPTED"); assert.equal(job.attempt, 1); assert.equal(readBlenderJob(job).progress.completedFrames, 1);
    });
    await test("06 partial chunk/index and canonical write failures never report completed publication", () => {
      const c = context("partial"), active = c.acquire(c.prepare()); c.progress(active); const before = fs.readFileSync(c.manifest), requestKey = key("publication"), at = now();
      assert.throws(() => c.publish(active, staged({ read(offset, length) { if (offset >= 524288) throw Object.assign(Error("Synthetic partial staged file"), { code: "synthetic_read" }); return video.subarray(offset, offset + length); } }), requestKey, at)); assert.deepEqual(fs.readFileSync(c.manifest), before); assert.equal(c.snapshot().assets.length, 1);
      c.control.exclusiveFailure = args => args[0].join("/").includes("/renders/") && args[0].at(-1).endsWith(".bin") && !args[0].at(-1).includes(".part-");
      assert.throws(() => c.publish(active, staged(), requestKey, at)); assert.deepEqual(fs.readFileSync(c.manifest), before); assert.deepEqual(c.snapshot().jobs[0].outputs, []); c.control.exclusiveFailure = null;
      c.control.beforeReplace = () => { throw Object.assign(Error("Synthetic disk unavailable after immutable media"), { code: "synthetic_io" }); };
      assert.throws(() => c.publish(active, staged(), requestKey, at)); assert.deepEqual(fs.readFileSync(c.manifest), before); assert.equal(c.snapshot().jobs[0].state, "RUNNING");
      c.reopen(); const receipt = c.publish(active, staged(), requestKey, at); assert.deepEqual(c.publish(active, staged(), requestKey, at), receipt); assert.equal(c.snapshot().assets.length, 2); assert.equal(c.snapshot().jobs[0].outputs.length, 1);
    });
    await test("07 failed terminal write remains unresolved; exact later reconciliation is persisted and idempotent", () => {
      const c = context("terminal-io"), active = c.acquire(c.prepare()); c.progress(active, 5, "RENDERING"); const before = fs.readFileSync(c.manifest), requestKey = key("reconcile"), at = now();
      c.control.beforeReplace = () => { throw Object.assign(Error("Synthetic full disk"), { code: "synthetic_io" }); }; assert.throws(() => c.terminate(active, "INTERRUPTED", requestKey, at)); assert.deepEqual(fs.readFileSync(c.manifest), before); assert.equal(c.snapshot().jobs[0].state, "RUNNING");
      const receipt = c.terminate(active, "INTERRUPTED", requestKey, at), expected = c.snapshot(); c.repository.close();
      const child = allowedNodeRestart(process.execPath, [filename, "--restart", c.namespace, c.projectId], { cwd: frontend, env: { SystemRoot: "C:\\Windows", WINDIR: "C:\\Windows", PATH: `${path.dirname(process.execPath)};C:\\Windows\\System32` }, windowsHide: true, encoding: "utf8", timeout: 30000, maxBuffer: 2 * 1024 ** 2 });
      assert.equal(child.error, undefined); assert.equal(child.status, 0, child.stderr); const recovered = JSON.parse(child.stdout); assert.deepEqual(recovered.snapshot, expected); assert.deepEqual(recovered.networkAttempts, []); assert.deepEqual(recovered.processAttempts, []);
      c.repository = c.open(); assert.deepEqual(c.terminate(active, "INTERRUPTED", requestKey, at), receipt); assert.deepEqual(c.snapshot(), expected); assert.equal(expected.jobs[0].attempt, 1); assert.equal(expected.jobs[0].outputs.length, 0);
    });
    await test("08 real HTTP boundary distinguishes record capacity from invalid field data and I/O failure", async () => {
      const origin = "http://127.0.0.1:3391", url = origin + "/api/codexforge/animation-studio/blender", action = { action: "reconcile", projectId: "project_capacity_http", jobId: "job_capacity_http", specDigest: "a".repeat(64), requestedAt: now() };
      const headers = { Host: "127.0.0.1:3391", Origin: origin, "X-CodexForge-Animation-Studio": "local-operator-v1", "Sec-Fetch-Site": "same-origin", "Content-Type": "application/json", "Idempotency-Key": "capacity_http_test" };
      for (const [error, expectedStatus, expectedCode] of [[new store.StudioStoreError("BLENDER_RECORD_CAPACITY", "capacity"), 409, "project_capacity_exhausted"], ...["TEXT_LIMIT", "NODE_LIMIT", "ARRAY_LIMIT"].map(code => [new validation.StudioValidationError([{ path: "$", code, message: "bounded fixture" }]), 409, "project_capacity_exhausted"]), [new validation.StudioValidationError([{ path: "$", code: "INVALID_TEXT", message: "bad text" }]), 400, "invalid_manifest"], [Object.assign(Error("disk unavailable"), { code: "synthetic_io" }), 503, "local_storage_unavailable"]]) {
        const handler = createStudioBlenderHandler({ enabled: true, listeners: () => ["127.0.0.1"], inspect: () => assert.fail(), execute: () => { throw error; } }); const response = await handler(new Request(url, { method: "POST", headers, body: JSON.stringify(action) })), payload = await response.json(); assert.equal(response.status, expectedStatus); assert.equal(payload.error.code, expectedCode);
        if (expectedStatus === 409) { assert.match(payload.error.message, /capacity|record|storage/i); assert.match(payload.error.message, /saved|persist/i); assert.match(payload.error.message, /no automatic retry|do not retry.*automatically/i); assert.doesNotMatch(payload.error.message, /check its text, timing|another project/i); }
      }
    });
    await test("09 recovery authorization is exact-project/job/hash isolated-workspace only, never inferred from chat or development mode", () => {
      const projectId = "project_capacity_authority", jobId = "job_capacity_authority", expectedSnapshotSha256 = "a".repeat(64), value = { namespace: "synthetic-recovery", projectId, jobId, expectedSnapshotSha256 };
      const environment = { CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE: value.namespace, CODEXFORGE_STUDIO_MEDIA_STORAGE: "workspace", CODEXFORGE_STUDIO_BLENDER_RECORD_RECOVERY: JSON.stringify(value) };
      assert.equal(readStudioBlenderRecoveryAuthorization(projectId, jobId, {}), undefined);
      assert.deepEqual(readStudioBlenderRecoveryAuthorization(projectId, jobId, environment), { projectId, jobId, expectedSnapshotSha256 });
      assert.equal(readStudioBlenderRecoveryAuthorization("project_other", jobId, environment), undefined); assert.equal(readStudioBlenderRecoveryAuthorization(projectId, "job_other", environment), undefined);
      for (const changed of [{ ...environment, CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE: undefined }, { ...environment, CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE: "another-namespace" }, { ...environment, CODEXFORGE_STUDIO_MEDIA_STORAGE: "d-drive" }, ...["{", "[]", "null", JSON.stringify({ ...value, expectedSnapshotSha256: "b" }), JSON.stringify({ ...value, extra: true }), "x".repeat(1025)].map(raw => ({ ...environment, CODEXFORGE_STUDIO_BLENDER_RECORD_RECOVERY: raw }))]) assert.throws(() => readStudioBlenderRecoveryAuthorization(projectId, jobId, changed), e => e.code === "BLENDER_RECOVERY_UNAUTHORIZED");
    });
    await test("10 lossless exact-preimage legacy recovery preserves old events, replay payloads, native versions and baseline", () => {
      const c = context("legacy"), retained = nativeLineage(c), active = c.acquire(c.prepare()), prepared = clone(c.lastPreparation);
      for (let count = 0; independentText(c.disk()) < 165000; count++) { assert.ok(count < 30); c.repository.registerDefinition(c.projectId, { schemaVersion: 1, promptId: `prompt_preserved_${count}`, version: 1, text: "Retained historical fixture content: " + "é".repeat(4000), negativePrompt: null, references: [] }, key("retained-history"), actor, now()); }
      const native = openCreatorNativeRoot([".codexforge", "studio-tests", c.namespace], "persistent");
      let old, originalBytes, originalHash;
      try {
        const current = c.snapshot(), expanded = journal.blenderHistoryForComparison(native, current); old = { ...clone(current), ...clone(expanded) };
        // Deliberately construct the documented HISTORICAL format in this new
        // synthetic namespace only, using its old append/hash rules. This is
        // fixture construction, not a migration or real-project JSON repair.
        let count = 0;
        for (;;) {
          const candidate = clone(old), job = candidate.jobs.find(j => j.jobId === active.job.jobId), requestKey = key("legacy-progress"), at = now();
          const progress = { phase: "RENDERING", completedFrames: 5, totalFrames: 75, process: { pid: 12345, identity: "synthetic-legacy-closed", executableSha256: settings.blender.sha256, startedAt: job.startedAt } };
          job.checkpoint.blenderExecution.progress = progress; candidate.project.revision++;
          const request = { type: "CHECKPOINT_BLENDER_RENDER", jobId: job.jobId, token: active.token, progress }, keyHash = sha(requestKey), requestDigest = digest({ request, actor, now: at });
          const receipt = { status: "APPLIED", code: "BLENDER_PROGRESS_RECORDED", revision: candidate.project.revision, value: clone(job) };
          const body = { schemaVersion: 1, eventId: `event_${digest({ projectId: c.projectId, keyHash }).slice(0,24)}`, projectId: c.projectId, sequence: candidate.project.revision, type: "JOB_CHECKPOINTED", timestamp: at, actor, subjectId: job.jobId, details: { request, result: receipt, blenderOperation: true }, previousHash: candidate.events.at(-1).eventHash };
          candidate.events.push({ ...body, eventHash: digest(body) }); candidate.receipts.push({ keyHash, requestDigest, result: receipt });
          const { recordDigest: omitted, ...withoutDigest } = candidate; void omitted; candidate.recordDigest = digest(withoutDigest);
          if (independentText(candidate) > 259500) break;
          old = candidate; assert.ok(++count < 100, "Bounded historical fixture append count");
        }
        assert.ok(independentText(old) > 250000); validation.cloneStudioJson(old); originalBytes = Buffer.from(canonical(old)); originalHash = sha(originalBytes);
        retain("legacy-original.json", old);
        const currentBytes = fs.readFileSync(c.manifest); native.writeAtomicReplace(["studio", "projects", c.projectId, "manifests", "project.json"], `synthetic-legacy-${randomUUID()}.tmp`, originalBytes, currentBytes, null, null);
      } finally { native.close(); }
      c.reopen(); assert.deepEqual(c.snapshot(), old); assert.throws(() => c.repository.compactBlenderHistoryForRecovery(c.projectId, active.job.jobId, originalHash, now())); assert.deepEqual(fs.readFileSync(c.manifest), originalBytes);
      c.gate = { projectId: c.projectId, jobId: active.job.jobId, expectedSnapshotSha256: originalHash }; c.reopen();
      const at = now(); assert.throws(() => c.repository.compactBlenderHistoryForRecovery(c.projectId, active.job.jobId, "f".repeat(64), at)); assert.deepEqual(fs.readFileSync(c.manifest), originalBytes);
      const receipt = c.repository.compactBlenderHistoryForRecovery(c.projectId, active.job.jobId, originalHash, at); assert.equal(receipt.code, "BLENDER_HISTORY_COMPACTED");
      const compacted = c.snapshot(), root = openCreatorNativeRoot([".codexforge", "studio-tests", c.namespace], "persistent");
      try { const historical = journal.blenderHistoryForComparison(root, compacted); assert.deepEqual(historical.events, old.events); assert.deepEqual(historical.receipts, old.receipts); assert.deepEqual(root.readFile(journal.blenderArchivePath(c.projectId, originalHash), 1048576), originalBytes); }
      finally { root.close(); }
      assert.deepEqual(compacted.jobs, old.jobs); assert.deepEqual(compacted.assets, old.assets); assert.deepEqual(compacted.definitions, old.definitions); assert.equal(compacted.project.revision, old.project.revision);
      assert.deepEqual(c.repository.prepareBlenderRender(prepared.input, prepared.key, actor), prepared.receipt);
      assert.ok(store.measureStudioRecordCapacity(c.disk()).textCharacters < independentText(old) - 50000);
      c.reopen(); const compactBytes = fs.readFileSync(c.manifest); assert.deepEqual(c.repository.compactBlenderHistoryForRecovery(c.projectId, active.job.jobId, originalHash, at), receipt); assert.deepEqual(fs.readFileSync(c.manifest), compactBytes);
      c.terminate(active, "INTERRUPTED"); c.reopen(); assert.equal(readBlenderJob(c.snapshot().jobs.find(j => j.jobId === active.job.jobId)).phase, "INTERRUPTED"); assert.equal(c.snapshot().jobs.find(j => j.jobId === active.job.jobId).attempt, 1);
      assert.deepEqual(c.repository.readBlenderSource(c.projectId, retained.oldSource), descriptor); assert.deepEqual(c.repository.readBlenderNativeVersion(c.projectId, c.source), nativeV2); assert.deepEqual(c.repository.readFootage(c.projectId, retained.baseline.assetId, retained.baseline.version), video);
      measurements.push({ label: "historical-recovery", originalTextCharacters: independentText(old), originalBytes: originalBytes.length, originalHash, compacted: store.measureStudioRecordCapacity(compacted) });
    });
  } finally { for (const c of contexts) { try { c.repository.close(); } catch { /* Preserve the primary test result; no shared runtime is owned. */ } } }
  assert.deepEqual(networkAttempts, []); assert.deepEqual(processAttempts, []);
  const failed = results.filter(result => result.status === "FAIL").length;
  retain("result.json", { status: failed ? "FAIL" : "PASS", scope: "SYNTHETIC_CAPACITY_AND_RECOVERY_NOT_REAL_RENDER_OR_BROWSER_ACCEPTANCE", results, measurements, namespaces: contexts.map(c => c.namespace), networkAttempts, forbiddenProcessAttempts: processAttempts, bindings: loader.loaded.map(name => ({ path: name, sha256: sha(fs.readFileSync(path.join(frontend, name))) })) });
  console.log(JSON.stringify({ status: failed ? "FAIL" : "PASS", passed: results.length - failed, failed, evidence })); process.exitCode = failed ? 1 : 0;
}
