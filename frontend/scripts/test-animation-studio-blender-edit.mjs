// Canonical persistence and public contract checks. Native save/reopen is separately qualified with the real local fixture.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { blockStudioTestNetwork, createStudioTestLoader } from "./animation-studio-test-loader.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), attempts = blockStudioTestNetwork(), loader = createStudioTestLoader(root);
const contract = loader.load("@/lib/codexforge/animation-studio/blender-edit-contract"), { readBlenderEditJob } = loader.load("@/lib/codexforge/animation-studio/blender-edit-identity.server"), { openStudioRepository } = loader.load("@/lib/codexforge/animation-studio/store.server");
const { validateBlenderAction } = loader.load("@/lib/codexforge/animation-studio/blender-http.server"), { hashJarvisChatCanonicalJson: digest } = loader.load("@/lib/codexforge/jarvis-chat/jarvis-chat-crypto");
const { readBlenderJob } = loader.load("@/lib/codexforge/animation-studio/blender-source-identity.server");
const { readPinnedBlenderCatalogue } = loader.load("@/lib/codexforge/animation-studio/blender-source-config.server");
const { openStudioFootageSource, writeStudioFootageSource } = loader.load("@/lib/codexforge/animation-studio/footage-storage.server"), { openCreatorNativeRoot } = loader.load("@/lib/codexforge/creator/creator-native-filesystem.server");
const sha = value => createHash("sha256").update(value).digest("hex"), clone = value => JSON.parse(JSON.stringify(value));
let serial = 0; const now = () => new Date(Date.UTC(2026, 9, 14, 12, 0, serial++)).toISOString(), key = name => `${name}_${String(serial++).padStart(8, "0")}`, actor = "synthetic-native-edit-test";
const namespace = `native-edit-${randomUUID()}`, evidence = path.join(root, ".codexforge", "acceptance", namespace); fs.mkdirSync(evidence);
const repoOptions = { workspace: "test", namespace, mediaStorage: "workspace" }; let repository = openStudioRepository(repoOptions);
const results = []; function test(name, run) { run(); results.push({ name, status: "PASS" }); console.log("PASS", name); }
const projectId = "project_native_edit_contract", oldHash = sha("original synthetic native"), changed = Buffer.alloc(2 * 1024 ** 2 + 37, 0x62), newHash = sha(changed);
const scene = { name: "Scene", cameras: ["Camera"], activeCamera: "Camera", frameStart: 1, frameEnd: 1500, fps: 25, fpsBase: 1 };
const oldInspection = { schemaVersion: 1, supported: true, unsupported: [], sourceSha256: oldHash, sourceBytes: 100, blenderVersion: "5.0.1", dependencies: [], scenes: [scene] };
const descriptor = { format: "studio-blender-source-v1", catalogueId: "native-edit-synthetic", label: "Synthetic native edit fixture", source: { originalPath: "D:\\designated-not-read\\fixture.blend", relativeName: "fixture.blend", byteLength: 100, sha256: oldHash }, dependencies: [], inspection: oldInspection };
const renderSettings = { profile: "BLENDER_PREVIEW_720P25_V1", scene: "Scene", camera: "Camera", frameStart: 76, frameEnd: 150, width: 1280, height: 720, fps: 25, adapterVersion: "synthetic-render-contract", blender: { path: "C:\\Synthetic\\blender.exe", sha256: sha("tool"), version: "5.0.1" }, ffmpeg: { path: "C:\\Synthetic\\ffmpeg.exe", sha256: sha("ffmpeg") }, ffprobe: { path: "C:\\Synthetic\\ffprobe.exe", sha256: sha("ffprobe") }, scriptHashes: { inspect: sha("legacy-inspect"), render: sha("legacy-render") }, colourTransform: "Synthetic only; no colour proof" };
let shotId, source, proposal, job, token, published, baselineRender;
try {
  test("sRGB interpretation uses independent IEC examples and preserves alpha", () => { assert.deepEqual(contract.srgbToBlenderLinear("#000000", 0.7), [0, 0, 0, 0.7]); assert.deepEqual(contract.srgbToBlenderLinear("#FFFFFF"), [1, 1, 1, 1]); assert.ok(Math.abs(contract.srgbToBlenderLinear("#808080")[0] - 0.21586050011389926) < 1e-7); for (const value of ["red", "#fff", "#GG0000", "#FFFFFFFF", "#000000\n"]) assert.throws(() => contract.srgbToBlenderLinear(value)); });
  test("runtime catalogue consumes exactly pinned bytes and rejects changed or missing accepted identity", () => {
    const filename = path.join(evidence, "catalogue-pin-fixture.json"), value = { schemaVersion: 1, sources: [] }, bytes = Buffer.from(JSON.stringify(value)); fs.writeFileSync(filename, bytes, { flag: "wx" });
    assert.deepEqual(readPinnedBlenderCatalogue(filename, sha(bytes)), value); assert.throws(() => readPinnedBlenderCatalogue(filename, undefined)); assert.throws(() => readPinnedBlenderCatalogue(filename, sha(bytes) + "\n")); assert.throws(() => readPinnedBlenderCatalogue(filename, sha("different catalogue")));
    fs.appendFileSync(filename, "\n"); assert.throws(() => readPinnedBlenderCatalogue(filename, sha(bytes))); assert.deepEqual(readPinnedBlenderCatalogue(filename, sha(Buffer.concat([bytes, Buffer.from("\n")]))), value);
    const oversized = path.join(evidence, "oversized-catalogue-fixture.json"); fs.writeFileSync(oversized, Buffer.alloc(32769, 32), { flag: "wx" }); assert.throws(() => readPinnedBlenderCatalogue(oversized, sha(fs.readFileSync(oversized))));
  });
  test("native bytes reuse qualified chunk storage: index-last failure, exact replay, no overwrite", () => {
    const nativeRoot = openCreatorNativeRoot([".codexforge", "studio-tests", `${namespace}-storage`], "persistent"), index = `studio/projects/project_native_storage_contract/blender/native-versions/${newHash}.blend.json`, segments = index.split("/"), source = { byteLength: changed.length, contentHash: newHash, read: (offset, length) => changed.subarray(offset, offset + length) };
    try {
      const interrupted = { readFile: (...args) => nativeRoot.readFile(...args), writeAtomicExclusive: (target, temporaryName, data) => { if (target.join("/") === index) throw new Error("synthetic-index-publication-interruption"); nativeRoot.writeAtomicExclusive(target, temporaryName, data); } };
      assert.throws(() => writeStudioFootageSource(interrupted, index, source), /synthetic-index-publication-interruption/); assert.throws(() => nativeRoot.readFile(segments, 524288), error => error.code === "not_found"); assert.equal(nativeRoot.listDirectory(segments.slice(0, -1)).filter(name => name.includes(".part-")).length, 5);
      writeStudioFootageSource(nativeRoot, index, source); writeStudioFootageSource(nativeRoot, index, source);
      assert.throws(() => writeStudioFootageSource(nativeRoot, index, { ...source, read: (offset, length) => { const part = Buffer.from(source.read(offset, length)); part[0] ^= 1; return part; } }));
      const reader = openStudioFootageSource(nativeRoot, index, newHash, changed.length); try { reader.verify(); assert.deepEqual(reader.read(524280, 32), changed.subarray(524280, 524312)); } finally { reader.close(); }
      assert.throws(() => openStudioFootageSource(nativeRoot, index.replace(".blend.json", ".blend"), newHash, changed.length));
    } finally { nativeRoot.close(); }
  });
  test("create source then prepare exact edit without execution", () => {
    repository.createDraftProject({ schemaVersion: 1, projectId, revision: 1, title: "Native revision persistence", description: "Synthetic contract only", currency: "GBP", createdAt: now() }, key("create"), actor); let state = repository.loadManifest(projectId); shotId = state.shots[0].shotId;
    source = repository.registerBlenderSource({ projectId, shotId, expectedProjectRevision: state.project.revision, requestedAt: now(), descriptor }, key("register"), actor).value.source;
    baselineRender = repository.prepareBlenderRender({ projectId, shotId, expectedProjectRevision: repository.loadManifest(projectId).project.revision, requestedAt: now(), source, settings: renderSettings }, key("baseline-plan"), actor).value;
    const target = { targetId: sha("exact target"), materialName: "Allowed", nodeName: "Saved tint", socketIdentifier: "Color2", originalLinear: [0.1, 0.2, 0.3, 1], users: ["AllowedObject"], eligible: true, reason: null };
    proposal = contract.validateBlenderEditProposal({ format: "studio-blender-material-proposal-v1", projectId, shotId, source, descriptorHash: digest(descriptor), blendSha256: oldHash, inspectionDigest: sha("inspection"), semanticDigest: sha("before semantic"), dependenciesDigest: digest([]), protectedDigest: sha("protected"), policy: { sourceSha256: oldHash, allowedMaterials: ["Allowed"], protectedObjects: ["Camera", "Screen"], protectedMaterials: ["White"] }, target, colourSrgb: "#FF0000", originalLinear: target.originalLinear, requestedLinear: [1, 0, 0, 1], adapterVersion: contract.BLENDER_EDIT_ADAPTER, blender: { path: "C:\\Synthetic\\blender.exe", sha256: sha("tool"), version: "5.0.1" }, scriptHashes: { materialEdit: sha("edit"), semanticSnapshot: sha("verify") }, legacyAdapterDigest: sha("legacy inspection adapter") });
    const input = { projectId, shotId, expectedProjectRevision: repository.loadManifest(projectId).project.revision, requestedAt: now(), proposal }, requestKey = key("prepare"); const receipt = repository.prepareBlenderEdit(input, requestKey, actor); job = receipt.value;
    assert.deepEqual(repository.prepareBlenderEdit(input, requestKey, actor), receipt); assert.equal(readBlenderEditJob(job).phase, "PREPARED"); assert.equal(job.attempt, 0); assert.equal(repository.loadManifest(projectId).assets.length, 1);
  });
  test("protected target, no-op, malformed colour and proposal mutations reject", () => {
    for (const mutate of [p => p.policy.allowedMaterials.push("White"), p => p.target.users = ["Screen"], p => p.target.users.push("UnrelatedObject"), p => p.target.users = [], p => p.target.eligible = false, p => p.target.eligible = 1, p => p.requestedLinear = p.originalLinear, p => p.requestedLinear[0] = NaN, p => p.policy.sourceSha256 = sha("changed"), p => p.target.targetId = "bad", p => p.colourSrgb = "#ff0000"]) { const value = clone(proposal); mutate(value); assert.throws(() => contract.validateBlenderEditProposal(value)); }
    const request = { action: "apply-edit", projectId, jobId: job.jobId, proposalDigest: digest(proposal), approved: true, requestedAt: now() }; assert.deepEqual(validateBlenderAction(request), request); for (const patch of [{ approved: false }, { outputPath: "D:\\not-authorized.blend" }, { python: "arbitrary" }, { proposalDigest: "bad" }]) assert.throws(() => validateBlenderAction({ ...request, ...patch }));
    const preparation = { action: "prepare-edit", projectId, shotId, assetId: source.assetId, version: 1, expectedProjectRevision: 1, inspectionDigest: proposal.inspectionDigest, targetId: proposal.target.targetId, colourSrgb: "#FF0000", requestedAt: now() }; assert.deepEqual(validateBlenderAction(preparation), preparation); assert.throws(() => validateBlenderAction({ ...preparation, colourSrgb: "#FF0000\n" }));
  });
  test("post-save inspection adapter identity is included in approval and checked before execution", () => {
    contract.assertBlenderEditAdapterBinding(proposal, proposal.legacyAdapterDigest); assert.throws(() => contract.assertBlenderEditAdapterBinding(proposal, sha("changed inspect.py")), error => error.code === "BLENDER_EDIT_PLAN_CHANGED");
    const changedPin = clone(proposal); changedPin.legacyAdapterDigest = sha("changed inspect.py"); assert.notEqual(digest(changedPin), digest(proposal));
    const missing = clone(proposal); delete missing.legacyAdapterDigest; assert.throws(() => contract.validateBlenderEditProposal(missing));
  });
  test("stale prepared edit and changed proposal digest grant no execution", () => {
    assert.throws(() => repository.acquireBlenderEdit(projectId, job.jobId, sha("changed proposal"), key("wrong-proposal"), actor, now()));
    repository.registerBlenderSource({ projectId, shotId, expectedProjectRevision: repository.loadManifest(projectId).project.revision, requestedAt: now(), descriptor }, key("same-source-metadata"), actor);
    assert.throws(() => repository.acquireBlenderEdit(projectId, job.jobId, digest(proposal), key("stale-apply"), actor, now()));
    assert.equal(readBlenderEditJob(repository.loadManifest(projectId).jobs.find(item => item.jobId === job.jobId)).phase, "PREPARED");
    assert.throws(() => repository.prepareBlenderEdit({ projectId, shotId, expectedProjectRevision: 1, requestedAt: now(), proposal }, key("stale-preparation"), actor));
    job = repository.prepareBlenderEdit({ projectId, shotId, expectedProjectRevision: repository.loadManifest(projectId).project.revision, requestedAt: now(), proposal }, key("fresh-edit-plan"), actor).value;
  });
  test("one-shot exact approval and managed generic-dispatch guard", () => {
    assert.throws(() => repository.createJob(job, key("generic"), actor, now()));
    const requestKey = key("apply"), at = now(); const acquired = repository.acquireBlenderEdit(projectId, job.jobId, digest(proposal), requestKey, actor, at); token = acquired.token; assert.equal(acquired.acquired, true); assert.ok(token);
    const replay = repository.acquireBlenderEdit(projectId, job.jobId, digest(proposal), requestKey, actor, at); assert.equal(replay.acquired, false); assert.equal(replay.token, null);
    assert.throws(() => repository.acquireBlenderEdit(projectId, job.jobId, digest(proposal), key("duplicate"), actor, now()));
    repository.checkpointBlenderEdit(projectId, job.jobId, token, { pid: 123, identity: "synthetic-no-process", executableSha256: proposal.blender.sha256, startedAt: acquired.job.startedAt }, key("process"), actor, now());
    const activeJob = repository.loadManifest(projectId).jobs.find(item => item.jobId === job.jobId);
    for (const startedAt of ["October 14 2026", "2026-10-14T12:00:00Z", new Date(Date.parse(activeJob.startedAt) - 1).toISOString(), "2026-02-30T12:00:00.000Z"]) { const value = clone(activeJob); value.checkpoint.blenderEdit.process.startedAt = startedAt; assert.throws(() => readBlenderEditJob(value)); }
  });
  const verification = () => ({ format: "studio-blender-material-verification-v1", outputSha256: newHash, outputBytes: changed.length, beforeSemanticDigest: proposal.semanticDigest, afterSemanticDigest: sha("after semantic"), protectedDigest: proposal.protectedDigest, changedTargetId: proposal.target.targetId, originalLinear: proposal.originalLinear, requestedLinear: proposal.requestedLinear, reopened: true, onlyIntendedChange: true });
  test("failed reopen and unexpected semantic changes cannot publish", () => { for (const patch of [{ reopened: false }, { onlyIntendedChange: false }, { protectedDigest: sha("different screen") }, { beforeSemanticDigest: sha("stale source") }, { outputBytes: changed.length + 1 }]) { assert.throws(() => repository.publishBlenderEdit(projectId, job.jobId, token, changed, { ...oldInspection, sourceSha256: newHash, sourceBytes: changed.length }, { ...verification(), ...patch }, key("failed"), actor, now())); } assert.equal(repository.loadManifest(projectId).assets.length, 1); });
  test("new immutable source publication and exact receipt replay", () => {
    const requestKey = key("publish"), at = now(), inspection = { ...oldInspection, sourceSha256: newHash, sourceBytes: changed.length }, proof = verification(); const receipt = repository.publishBlenderEdit(projectId, job.jobId, token, changed, inspection, proof, requestKey, actor, at); published = receipt.value.source;
    assert.deepEqual(repository.publishBlenderEdit(projectId, job.jobId, token, changed, inspection, proof, requestKey, actor, at), receipt); assert.equal(published.assetId, source.assetId); assert.equal(published.version, 2);
    assert.deepEqual(repository.readBlenderSource(projectId, source), descriptor); assert.deepEqual(repository.readBlenderNativeVersion(projectId, published), changed); const newDescriptor = repository.readBlenderSource(projectId, published); assert.equal(newDescriptor.source.sha256, newHash); assert.equal(newDescriptor.revision.proposalDigest, digest(proposal)); assert.ok(changed.length > 1024 ** 2); assert.equal(newDescriptor.revision.nativeStorage.format, "studio-footage-chunks-v1"); assert.ok(newDescriptor.revision.nativeStorage.indexPath.endsWith(`${newHash}.blend.json`)); assert.equal(Object.hasOwn(newDescriptor.revision, "nativePath"), false);
    const state = repository.loadManifest(projectId); assert.equal(state.assets.length, 2); assert.equal(state.jobs.length, 3); const completed = state.jobs.find(item => item.jobId === job.jobId); assert.equal(readBlenderEditJob(completed).phase, "COMPLETED"); assert.throws(() => repository.publishBlenderEdit(projectId, job.jobId, token, changed, inspection, proof, key("duplicatepub"), actor, now()));
    const invalidTime = clone(completed); invalidTime.checkpoint.blenderEdit.process.startedAt = new Date(Date.parse(completed.finishedAt) + 1).toISOString(); assert.throws(() => readBlenderEditJob(invalidTime));
  });
  test("missing or tampered native chunk fails closed without altering original source", () => {
    const index = repository.readBlenderSource(projectId, published).revision.nativeStorage.indexPath, directory = path.dirname(path.join(root, ".codexforge", "studio-tests", namespace, index)), part = path.join(directory, `${newHash}.part-0000.bin`), preserved = fs.readFileSync(part), retained = part + ".temporarily-retained";
    fs.renameSync(part, retained); try { assert.throws(() => repository.readBlenderNativeVersion(projectId, published)); } finally { fs.renameSync(retained, part); }
    const altered = Buffer.from(preserved); altered[0] ^= 1; fs.writeFileSync(part, altered); try { assert.throws(() => repository.readBlenderNativeVersion(projectId, published)); } finally { fs.writeFileSync(part, preserved); }
    assert.deepEqual(repository.readBlenderNativeVersion(projectId, published), changed); assert.deepEqual(repository.readBlenderSource(projectId, source), descriptor);
  });
  test("edited version has a distinct render identity; old plan and source are retained but stale", () => {
    assert.throws(() => repository.acquireBlenderRender(projectId, baselineRender.jobId, readBlenderJob(baselineRender).specDigest, key("old-render-start"), actor, now()));
    assert.throws(() => repository.prepareBlenderRender({ projectId, shotId, expectedProjectRevision: repository.loadManifest(projectId).project.revision, requestedAt: now(), source, settings: renderSettings }, key("old-source-plan"), actor));
    const next = repository.prepareBlenderRender({ projectId, shotId, expectedProjectRevision: repository.loadManifest(projectId).project.revision, requestedAt: now(), source: published, settings: renderSettings }, key("edited-source-plan"), actor).value, execution = readBlenderJob(next);
    assert.deepEqual(execution.spec.source, published); assert.equal(execution.spec.blendSha256, newHash); assert.notEqual(execution.specDigest, readBlenderJob(baselineRender).specDigest); assert.notEqual(execution.spec.descriptorHash, readBlenderJob(baselineRender).spec.descriptorHash);
    assert.throws(() => repository.acquireBlenderRender(projectId, next.jobId, readBlenderJob(baselineRender).specDigest, key("old-approval-new-version"), actor, now()));
    assert.deepEqual(repository.loadManifest(projectId).jobs.find(item => item.jobId === baselineRender.jobId), baselineRender); assert.equal(next.attempt, 0);
  });
  test("reopen repository retains source versions and edit provenance", () => { repository.close(); repository = openStudioRepository(repoOptions); assert.deepEqual(repository.readBlenderNativeVersion(projectId, published), changed); assert.deepEqual(repository.readBlenderSource(projectId, source), descriptor); assert.equal(readBlenderEditJob(repository.loadManifest(projectId).jobs.find(item => item.jobId === job.jobId)).source.version, 2); });
  assert.deepEqual(attempts, []); fs.writeFileSync(path.join(evidence, "result.json"), JSON.stringify({ status: "PASS", scope: "SYNTHETIC_STORE_AND_CONTRACT_NOT_NATIVE_PROOF", results, namespace, networkAttempts: attempts }, null, 2), { flag: "wx" }); console.log(JSON.stringify({ status: "PASS", evidence, passed: results.length }));
} finally { repository.close(); }
