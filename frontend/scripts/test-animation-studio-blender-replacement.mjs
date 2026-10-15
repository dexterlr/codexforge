// Canonical replacement, HTTP and real native persistence; synthetic qualified
// media is NOT a decoder/render/Blender/browser proof. Only fresh C: test data.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const file = fileURLToPath(import.meta.url), frontend = path.resolve(path.dirname(file), "..");
assert.equal(path.resolve(process.cwd()), frontend);
const networkAttempts = blockStudioTestNetwork(), loader = createStudioTestLoader(frontend);
const { openStudioRepository } = loader.load("@/lib/codexforge/animation-studio/store.server");
const { createStudioEditorialV2Handler } = loader.load("@/lib/codexforge/animation-studio/editorial-v2-http.server");
const { defaultLayerTransform } = loader.load("@/lib/codexforge/animation-studio/composition-contract");
const { resolveAssetPath } = loader.load("@/lib/codexforge/animation-studio/workspace");
const sha = value => createHash("sha256").update(value).digest("hex"), clone = value => JSON.parse(JSON.stringify(value));
const rational = (numerator, denominator = 1) => ({ numerator, denominator });
const actor = "synthetic-blender-replacement-test", code = expected => error => error?.code === expected;
const open = namespace => openStudioRepository({ workspace: "test", namespace, mediaStorage: "workspace" });

if (process.argv[2] === "--restart") {
  const repo = open(process.argv[3]);
  try { const projectId = process.argv[4], compositionId = process.argv[5]; console.log(JSON.stringify({ view: repo.reviewEditorialV2Composition(projectId, compositionId), snapshot: repo.load(projectId), catalogue: repo.inspectEditorialV2WorkingCopy(projectId), networkAttempts })); }
  finally { repo.close(); }
} else {
  const namespace = `blender-replacement-${randomUUID()}`, evidence = path.join(frontend, ".codexforge", "acceptance", namespace);
  fs.mkdirSync(evidence);
  const rootPath = path.join(frontend, ".codexforge", "studio-tests", namespace), results = [];
  const retain = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + "\n", { flag: "wx" });
  const sourceFiles = [...new Set([...loader.loaded, "scripts/animation-studio-test-loader.mjs", "scripts/test-animation-studio-blender-replacement.mjs", "build/Release/codexforge_creator_filesystem.node"])];
  const bindings = sourceFiles.map(name => ({ name, bytes: fs.statSync(path.join(frontend, name)).size, sha256: sha(fs.readFileSync(path.join(frontend, name))) }));
  assert.equal(bindings.find(item => item.name.endsWith(".node")).sha256, "848628f3cb4f4e5011b2237660d26be6cf0da7696401cef55f8736c2ded6c8a4");
  retain("intent.json", { namespace, evidence, bindings, scope: "Synthetic qualified media, real canonical persistence and Node restart. No Blender, decoder, server, provider, D: or personal data activity." });
  let repo = open(namespace), serial = 0;
  const now = () => new Date(Date.UTC(2026, 9, 14, 12, 0, serial++)).toISOString(), key = label => `${label}-${String(serial++).padStart(8, "0")}`;
  async function test(name, run) { await run(); results.push({ name, status: "PASS" }); console.log("PASS " + name); }
  const projectId = "project_blender_replacement", otherShotId = "shot_blender_replacement_other";
  let shotId, compositionId, original, originalEditorial, originalView, savedReplacement, replacementInput, replacementKey;
  const refs = {}, media = new Map();
  const current = () => repo.reviewEditorialV2Composition(projectId, compositionId);
  const change = (takeId = "take_replacement_new", layerId = "layer_replacement_main", overrides = {}) => {
    const view = current(); return { operation: "REPLACE_LAYER_TAKE", projectId, compositionId, layerId, takeId, expectedRevision: view.revision, expectedHeadDigest: view.headDigest, expectedCompositionRevision: view.composition.revision, requestedAt: now(), ...overrides };
  };
  const navigate = operation => { const view = current(); return repo.navigateEditorialV2History({ operation, projectId, compositionId, expectedRevision: view.revision, expectedHeadDigest: view.headDigest, expectedCompositionRevision: view.composition.revision, requestedAt: now() }, key("history"), actor); };
  function inventory(target) {
    const files = [];
    function visit(relative) {
      assert.ok(files.length < 10_000); const full = path.join(target, relative), stat = fs.lstatSync(full); assert.equal(stat.isSymbolicLink(), false);
      if (stat.isDirectory()) for (const name of fs.readdirSync(full).sort()) visit(path.join(relative, name));
      else { assert.ok(stat.isFile()); files.push({ name: relative.split(path.sep).join("/"), bytes: stat.size, sha256: sha(fs.readFileSync(full)) }); }
    }
    visit(""); return files;
  }
  function staged(label, seconds) {
    const bytes = Buffer.alloc(128, label.charCodeAt(0)); bytes.writeUInt32BE(24, 0); bytes.write("ftypisom", 4, "ascii");
    media.set(label, bytes);
    return { mediaType: "VIDEO", contentType: "video/mp4", byteLength: bytes.length, contentHash: sha(bytes), technical: { schema: "studio-qualified-local-media-v1", mediaType: "VIDEO", contentType: "video/mp4", container: "mp4", codec: "h264", pixelFormat: "yuv420p", width: 1280, height: 720, frameRate: rational(25), frameCadence: "CFR_25_EXACT", duration: rational(seconds), sourceUnits: seconds * 25, sourceUnit: "FRAME", timeBase: rational(1, 12800), colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", dynamicRange: "SDR_BT709", rotationDegrees: 0, streamCount: 1, probeDigest: sha(`synthetic-probe-${label}`) }, read: (offset, length) => Buffer.from(bytes.subarray(offset, offset + length)), close() {} };
  }
  try {
    await test("Setup uses only canonical synthetic C-only imports and saved Takes before copying editorial state", () => {
      repo.createDraftProject({ schemaVersion: 1, projectId, revision: 1, title: "Synthetic Take replacement", description: "No actual decoded or rendered footage", currency: "GBP", createdAt: now() }, key("create"), actor);
      const initialShot = repo.load(projectId).shots[0]; shotId = initialShot.shotId;
      repo.saveShot({ ...clone(initialShot), shotId: otherShotId, revision: 1 }, key("other-shot"), actor, now());
      for (const [label, seconds] of [["old", 4], ["new", 3], ["short", 2]]) {
        const snapshot = repo.load(projectId), shot = snapshot.shots.find(item => item.shotId === shotId);
        const result = repo.importFootageFile({ projectId, shotId, expectedProjectRevision: snapshot.project.revision, expectedShotRevision: shot.revision, requestedAt: now(), originalName: label + ".mp4", sourceLabel: "Synthetic " + label, rights: { status: "OWNED", license: null, evidence: "Synthetic in-memory framing for store tests only" }, mediaType: "VIDEO" }, staged(label, seconds), key("import"), actor);
        refs[label] = result.value.asset;
      }
      for (const [label, assetType] of [["unqualified", "VIDEO"], ["image", "IMAGE"]]) {
        const bytes = Buffer.from("synthetic " + label), contentHash = sha(bytes), stamp = now(), ref = { assetId: "asset_replacement_" + label, version: 1 };
        repo.registerAsset({ schemaVersion: 1, ...ref, projectId, sourcePath: resolveAssetPath(projectId, ref, assetType, contentHash), contentHash, assetType, approvalState: "DRAFT", dependencies: [], rights: { status: "OWNED", license: null, evidence: "Synthetic bytes, not visual media" }, createdAt: stamp, supersededBy: null, lineage: [], provenance: { adapterMetadata: null, promptId: null, negativePrompt: null, referenceAssets: [], timestamp: stamp, cost: { currency: "GBP", minorUnits: 0 }, contentHash, parentAssets: [], jobId: null, approvalState: "DRAFT", rejectionReason: null } }, bytes, key("raw-asset"), actor, now());
        refs[label] = ref;
      }
      const snapshot = repo.load(projectId), content = repo.reviewEditorial(projectId).editorial.content, stamp = now(); compositionId = content.compositions.find(item => item.shotId === shotId).compositionId;
      const take = (label, ref, shot = shotId) => ({ schemaVersion: 1, takeId: "take_replacement_" + label, projectId, shotId: shot, source: ref, name: "Synthetic " + label, createdAt: stamp, review: { state: "UNREVIEWED", note: "", reviewedAt: null } });
      content.takes = [...Object.entries(refs).map(([label, ref]) => take(label, ref)), take("wrong_shot", refs.new, otherShotId)];
      content.selectedTakes = [{ shotId, takeId: "take_replacement_old" }];
      const layer = { schemaVersion: 1, layerId: "layer_replacement_main", compositionId, name: "Keep this occurrence name", type: "VIDEO", source: { kind: "ASSET", asset: refs.old, takeId: "take_replacement_old" }, enabled: true, locked: false, solo: false, startUs: 500_000, durationUs: 2_000_000, sourceOffsetUs: 1_000_000, playbackRate: 1, reverse: false, transform: { ...defaultLayerTransform(), x: 87, rotationDeg: 3, scaleX: 0.9 }, opacity: 0.625, keyframes: [], createdAt: stamp, updatedAt: stamp, version: 1, approvalState: "DRAFT", provenance: { kind: "EDITORIAL_INSTRUCTION", providerRequests: 0 } };
      const composition = content.compositions.find(item => item.compositionId === compositionId);
      composition.durationUs = 4_000_000;
      composition.layers = [layer, { ...clone(layer), layerId: "layer_replacement_locked", locked: true }, { ...clone(layer), layerId: "layer_replacement_over", durationUs: 2_040_000 }, { ...clone(layer), layerId: "layer_replacement_text", type: "TEXT", source: { kind: "TEXT" }, sourceOffsetUs: 0, text: { text: "Retained title", fontRef: "ARIAL_REGULAR", fontSizePx: 24, color: "#FFFFFF" } }];
      repo.saveEditorial({ projectId, expectedRevision: 0, expectedProjectRevision: snapshot.project.revision, requestedAt: now(), content }, key("save-v1"), actor);
      original = clone(repo.load(projectId)); originalEditorial = clone(repo.reviewEditorial(projectId).editorial);
      repo.migrateEditorialV2({ operation: "COPY_V1_TO_V2", projectId, expectedProjectRevision: original.project.revision, expectedEditorialRevision: 1, requestedAt: now() }, key("copy"), actor);
      originalView = current();
    });
    await test("Wrong Take, type, shot, locked layer and exact one-frame insufficient coverage reject without any write", () => {
      const before = inventory(rootPath), view = current();
      for (const [takeId, layerId, error] of [["take_replacement_short", "layer_replacement_main", "EDITORIAL_V2_SOURCE_COVERAGE"], ["take_replacement_new", "layer_replacement_over", "EDITORIAL_V2_SOURCE_COVERAGE"], ["take_replacement_unqualified", "layer_replacement_main", "EDITORIAL_V2_SOURCE_COVERAGE"], ["take_replacement_wrong_shot", "layer_replacement_main", "EDITORIAL_V2_INVALID"], ["take_replacement_image", "layer_replacement_main", "EDITORIAL_V2_INVALID"], ["take_missing", "layer_replacement_main", "EDITORIAL_V2_INVALID"], ["take_replacement_new", "layer_replacement_locked", "EDITORIAL_V2_INVALID"], ["take_replacement_new", "layer_replacement_text", "EDITORIAL_V2_INVALID"]]) assert.throws(() => repo.editEditorialV2Layer(change(takeId, layerId), key("rejected"), actor), code(error));
      assert.deepEqual(current(), view); assert.deepEqual(inventory(rootPath), before);
    });
    await test("Stale head and forbidden client-supplied timing/source fields reject without publication", () => {
      const before = inventory(rootPath), view = current();
      // The migrated composition already has its own revision. Bind each stale
      // check to the observed state instead of assuming a particular revision.
      const wrongHeadDigest = (view.headDigest[0] === "f" ? "e" : "f") + view.headDigest.slice(1);
      for (const override of [{ expectedHeadDigest: wrongHeadDigest }, { expectedRevision: view.revision + 1 }, { expectedCompositionRevision: view.composition.revision + 1 }]) assert.throws(() => repo.editEditorialV2Layer(change(undefined, undefined, override), key("stale"), actor), code("EDITORIAL_V2_CONFLICT"));
      for (const override of [{ source: { kind: "ASSET", asset: refs.new } }, { sourceOffset: rational(0) }, { duration: rational(1) }, { start: rational(0) }, { changes: { opacity: 0 } }, { takeId: "../../unsafe" }]) assert.throws(() => repo.editEditorialV2Layer(change(undefined, undefined, override), key("extra"), actor), code("EDITORIAL_V2_INVALID"));
      assert.deepEqual(inventory(rootPath), before);
    });
    await test("One exact replacement changes only one source relationship and publication metadata", () => {
      replacementInput = change(); replacementKey = key("replacement");
      repo.editEditorialV2Layer(replacementInput, replacementKey, actor); savedReplacement = current();
      const expected = clone(originalView.composition); expected.revision++; expected.layers[0].source = { kind: "ASSET", asset: refs.new, takeId: "take_replacement_new" }; expected.layers[0].version++; expected.layers[0].updatedAt = replacementInput.requestedAt;
      assert.deepEqual(savedReplacement.composition, expected); assert.equal(savedReplacement.history.undo.targetOperation, "REPLACE_LAYER_TAKE"); assert.equal(savedReplacement.history.undo.label, "Undo Take replacement");
      assert.deepEqual(repo.load(projectId), original); assert.deepEqual(repo.reviewEditorial(projectId).editorial, originalEditorial);
      const beforeReplay = inventory(rootPath); repo.editEditorialV2Layer(replacementInput, replacementKey, actor); assert.deepEqual(current(), savedReplacement); assert.deepEqual(inventory(rootPath), beforeReplay);
      assert.throws(() => repo.editEditorialV2Layer(change(), key("same-take"), actor), code("EDITORIAL_V2_INVALID"));
      assert.throws(() => repo.editEditorialV2Layer({ ...replacementInput, takeId: "take_replacement_old" }, replacementKey, actor), code("EDITORIAL_V2_CONFLICT"));
      retain("replacement.json", { originalView, replacementInput, savedReplacement });
    });
    await test("Undo restores old source, a fresh Node reopens while undone, and Redo restores the same replacement", () => {
      navigate("UNDO_EDITORIAL_EDIT"); const undone = current();
      assert.deepEqual(undone.composition, { ...originalView.composition, revision: savedReplacement.composition.revision + 1 }); assert.equal(undone.history.redo.targetOperation, "REPLACE_LAYER_TAKE");
      repo.close(); repo = null;
      const child = spawnSync(process.execPath, [file, "--restart", namespace, projectId, compositionId], { cwd: frontend, env: { SystemRoot: "C:\\Windows", WINDIR: "C:\\Windows", PATH: `${path.dirname(process.execPath)};C:\\Windows\\System32` }, windowsHide: true, encoding: "utf8", timeout: 30_000, maxBuffer: 2 * 1024 * 1024 });
      assert.equal(child.error, undefined); assert.equal(child.status, 0, child.stderr); const recovered = JSON.parse(child.stdout); assert.deepEqual(recovered.networkAttempts, []); assert.deepEqual(recovered.view, undone); assert.deepEqual(recovered.snapshot, original);
      repo = open(namespace); const beforeReplay = inventory(rootPath); repo.editEditorialV2Layer(replacementInput, replacementKey, actor); assert.deepEqual(current(), undone); assert.deepEqual(inventory(rootPath), beforeReplay);
      navigate("REDO_EDITORIAL_EDIT"); const redone = current(); assert.deepEqual(redone.composition, { ...savedReplacement.composition, revision: undone.composition.revision + 1 });
      assert.deepEqual(repo.load(projectId), original); assert.deepEqual(repo.reviewEditorial(projectId).editorial, originalEditorial); assert.equal(repo.auditEditorialV2History(projectId, 64).complete, true);
      for (const [label, bytes] of media) assert.deepEqual(repo.readFootage(projectId, refs[label].assetId, 1), bytes);
      retain("undo-restart-redo.json", { undone, recovered, redone });
    });
    await test("Real HTTP action admits only exact replacement schema and safe local authority", async () => {
      const handler = createStudioEditorialV2Handler({ enabled: true, listenerAddresses: () => ["127.0.0.1"], openRepository: () => open(namespace) });
      const input = change("take_replacement_old"), operationKey = key("http-replacement");
      const call = async (body, overrides = {}) => {
        const response = await handler(new Request("http://127.0.0.1:3382/api/codexforge/animation-studio/editorial-v2", { method: "POST", headers: { Host: "127.0.0.1:3382", Origin: "http://127.0.0.1:3382", "Sec-Fetch-Site": "same-origin", "X-CodexForge-Animation-Studio": "local-operator-v1", "Content-Type": "application/json", "Idempotency-Key": operationKey, ...overrides }, body: JSON.stringify(body) })); return { status: response.status, body: await response.json() };
      };
      const before = inventory(rootPath);
      for (const changes of [{ duration: rational(1) }, { expectedHeadDigest: "bad" }, { takeId: "file:///x" }, { layerId: "" }]) assert.equal((await call({ ...input, ...changes })).status, 400);
      const noHead = clone(input); delete noHead.expectedHeadDigest; assert.equal((await call(noHead)).status, 400);
      assert.ok((await call(input, { Origin: "https://external.invalid" })).status >= 400); assert.deepEqual(inventory(rootPath), before);
      const result = await call(input); assert.equal(result.status, 200); assert.equal(result.body.providerRequests, 0); assert.equal(result.body.generation, "LOCKED");
      const committed = current(), files = inventory(rootPath); assert.deepEqual(await call(input), result); assert.deepEqual(current(), committed); assert.deepEqual(inventory(rootPath), files);
      assert.deepEqual(committed.composition.layers[0].source, originalView.composition.layers[0].source);
    });
    assert.deepEqual(networkAttempts, []); const sourceUnchanged = bindings.every(item => sha(fs.readFileSync(path.join(frontend, item.name))) === item.sha256); assert.ok(sourceUnchanged);
    retain("result.json", { status: "PASS", results, namespace, evidence, bindings, sourceUnchanged, networkAttempts, actualBlenderExecution: false, actualServerExecution: false, nativeFilesystemPersistence: true, cleanNodeRestart: true, providerRequests: 0, dWrites: 0, scope: "SYNTHETIC_QUALIFIED_MEDIA_CANONICAL_REPLACEMENT_NOT_RENDER_ACCEPTANCE" });
    console.log(JSON.stringify({ status: "PASS", passed: results.length, failed: 0, evidence, namespace }));
  } catch (error) { retain("failure.json", { status: "FAIL", results, namespace, evidence, message: error.message, code: error.code ?? null, stack: error.stack }); throw error; }
  finally { repo?.close(); }
}
