// No providers, GUI, renderers or production data. Every persisted input is synthetic.
// This suite deliberately retains both pristine and corrupted test evidence.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createStudioTestLoader, blockStudioTestNetwork } from "./animation-studio-test-loader.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendRoot = path.resolve(__dirname, "..");
assert.equal(path.resolve(process.cwd()), frontendRoot, "Run this suite from its own frontend worktree.");
const networkAttempts = blockStudioTestNetwork();
const loader = createStudioTestLoader(frontendRoot);
let domain, validation, policies, workspace, sample, store;
function loadRuntime() {
  domain = loader.load("@/lib/codexforge/animation-studio/domain");
  validation = loader.load("@/lib/codexforge/animation-studio/validation");
  policies = loader.load("@/lib/codexforge/animation-studio/policies");
  workspace = loader.load("@/lib/codexforge/animation-studio/workspace");
  sample = loader.load("@/lib/codexforge/animation-studio/sample");
  store = loader.load("@/lib/codexforge/animation-studio/store.server");
}
const clone = value => JSON.parse(JSON.stringify(value));
const sha = bytes => createHash("sha256").update(bytes).digest("hex");
const canonical = value => JSON.stringify(sortJson(value));
function sortJson(value) {
  if (Array.isArray(value)) return value.map(sortJson);
  if (value && typeof value === "object") return Object.fromEntries(Object.keys(value).sort().map(key => [key, sortJson(value[key])]));
  return value;
}
const money = (minorUnits = 0, currency = "GBP") => ({ currency, minorUnits });
const fixedTime = second => new Date(Date.parse("2026-09-13T12:00:00.000Z") + second * 1000).toISOString();
const limits = { MAX_SHOT_GENERATION_COST: money(100), MAX_PROJECT_GENERATION_COST: money(1000), MAX_ATTEMPTS_PER_SHOT: 10 };
const actor = "synthetic-phase0-test-operator";
const identity = (kind, label) => `${kind}_${label.replaceAll("-", "_")}`;

// A fresh process proves restart behavior without invoking any adapter or worker.
if (process.argv[2] === "--restart-probe") {
  loadRuntime();
  const [namespace, projectId, jobId] = process.argv.slice(3);
  const repository = store.openStudioRepository({ workspace: "test", namespace });
  try {
    const before = repository.load(projectId);
    const recovery = repository.recoveryPlan(projectId, jobId);
    assert.equal(repository.load(projectId).recordDigest, before.recordDigest);
    assert.equal(networkAttempts.length, 0);
    process.stdout.write(JSON.stringify({ recovery, recordDigest: before.recordDigest, revision: before.project.revision, networkAttempts, actualProviderExecutions: 0 }));
  } finally { repository.close(); }
} else {
  const runId = randomUUID();
  const namespace = `phase0-${runId}`;
  const testRoot = path.join(frontendRoot, ".codexforge", "studio-tests", namespace);
  const evidenceRoot = path.join(frontendRoot, ".codexforge", "acceptance", `studio-phase0-tests-${runId}`);
  fs.mkdirSync(path.dirname(evidenceRoot), { recursive: true });
  fs.mkdirSync(evidenceRoot);
  const logFd = fs.openSync(path.join(evidenceRoot, "test.log"), "wx");
  const results = [];
  const statesSeen = new Set();
  let repository;
  let serial = 0;
  let clock = 0;
  const tick = () => fixedTime(++clock);
  const key = label => `${label}-${String(++serial).padStart(6, "0")}`;
  const evidence = (name, value) => fs.writeFileSync(path.join(evidenceRoot, name), typeof value === "string" || Buffer.isBuffer(value) ? value : `${JSON.stringify(value, null, 2)}\n`, { flag: "wx" });
  const log = text => { fs.writeSync(logFd, `${text}\n`); process.stderr.write(`${text}\n`); };
  function test(label, action) {
    try { action(); results.push({ label, status: "PASS" }); log(`PASS ${label}`); }
    catch (error) {
      results.push({ label, status: "FAIL", error: { name: error.name, code: error.code || null, message: error.message, stack: error.stack } });
      log(`FAIL ${label}: ${error.message}`);
    }
  }
  function throwsCode(action, code) { assert.throws(action, error => error.code === code, `Expected ${code}`); }
  function project(label) {
    const value = { ...clone(sample.sampleProject), projectId: identity("project", label), createdAt: tick() };
    assert.equal(repository.createProject(value, key("project"), actor).code, "PROJECT_CREATED");
    return value.projectId;
  }
  function shot(projectId, label = projectId.slice(8)) {
    const sequence = { ...clone(sample.sampleSequence), sequenceId: identity("sequence", label), projectId, shotIds: [] };
    repository.saveSequence(sequence, key("sequence"), actor, tick());
    const value = { ...clone(sample.sampleShot), shotId: identity("shot", label), sequenceId: sequence.sequenceId, projectId };
    repository.saveShot(value, key("shot"), actor, tick());
    return value;
  }
  function job(projectId, label, changes = {}) {
    return {
      schemaVersion: 1, jobId: identity("job", label), type: "QC", projectId, shotId: null, dependencies: [], state: "QUEUED", attempt: 0, maxAttempts: 3,
      createdAt: tick(), startedAt: null, finishedAt: null, adapterMetadata: null, inputs: [], outputs: [], error: null, checkpoint: {},
      costEstimate: money(), actualCost: money(), externalActions: [], requiredGates: [], approvalSubjectHash: repository.approvalScope(projectId), dispatch: null,
      ...changes,
    };
  }
  function createJob(value) {
    assert.equal(repository.createJob(value, key("job-create"), actor).code, "JOB_CREATED");
    statesSeen.add(repository.load(value.projectId).jobs.find(item => item.jobId === value.jobId).state);
    return value;
  }
  function readJob(projectId, jobId) {
    const value = repository.load(projectId).jobs.find(item => item.jobId === jobId);
    assert.ok(value); statesSeen.add(value.state); return value;
  }
  function finish(projectId, jobId, state, changes = {}) {
    const input = { state, outputs: [], error: state === "FAILED" ? { code: "SYNTHETIC_FAILURE", message: "Deterministic failure fixture", retryable: false } : null, actualCost: money(), adapterMetadata: null, dispatchToken: null, ...changes };
    const result = repository.finishJob(projectId, jobId, input, key("finish"), actor, tick());
    readJob(projectId, jobId); return result;
  }
  function approval(projectId, gate, subjectHash, state = "APPROVED", at = tick(), suffix = key("approval")) {
    return { schemaVersion: 1, approvalId: identity("approval", suffix), projectId, gate, subjectHash, state, actor, reason: state === "REJECTED" ? "Synthetic rejection" : "Synthetic review only", createdAt: at, decidedAt: state === "PENDING" ? null : at };
  }
  function approveThrough(projectId, count) {
    const hash = repository.approvalScope(projectId);
    for (let index = 1; index <= count; index++) {
      assert.equal(repository.recordApproval(approval(projectId, `GATE_${String(index).padStart(2, "0")}`, hash), key("approval-record")).status, "APPLIED");
    }
  }
  function asset(projectId, label, version, bytes, lineage = []) {
    const contentHash = sha(bytes), createdAt = tick();
    const value = {
      schemaVersion: 1, assetId: identity("asset", label), projectId, version, sourcePath: "", contentHash, assetType: "DOCUMENT", approvalState: "DRAFT",
      provenance: { adapterMetadata: null, promptId: null, negativePrompt: null, referenceAssets: [], timestamp: createdAt, cost: money(), contentHash, parentAssets: clone(lineage), jobId: null, approvalState: "DRAFT", rejectionReason: null },
      dependencies: [], rights: { status: "OWNED", license: null, evidence: "Original synthetic test text" }, createdAt, supersededBy: null, lineage: clone(lineage),
    };
    value.sourcePath = workspace.resolveAssetPath(projectId, value, value.assetType, contentHash);
    return value;
  }
  function restart(projectId, jobId) {
    const before = repository.load(projectId);
    repository.close();
    const child = spawnSync(process.execPath, [__filename, "--restart-probe", namespace, projectId, jobId], { cwd: frontendRoot, encoding: "utf8", timeout: 30000, windowsHide: true, maxBuffer: 1024 * 1024 });
    repository = store.openStudioRepository({ workspace: "test", namespace });
    evidence(`restart-${key("probe")}.json`, { status: child.status, stdout: child.stdout, stderr: child.stderr, error: child.error ? child.error.message : null });
    assert.equal(child.status, 0, child.stderr || child.error?.message);
    const result = JSON.parse(child.stdout);
    assert.equal(result.recordDigest, before.recordDigest);
    assert.equal(result.revision, before.project.revision);
    assert.equal(result.actualProviderExecutions, 0);
    assert.deepEqual(result.networkAttempts, []);
    return result.recovery;
  }
  function fixturePath(relativePath) {
    const absolute = path.resolve(testRoot, ...relativePath.split("/"));
    assert.ok(absolute.startsWith(`${testRoot}${path.sep}`), "Fault injection must remain in this unique test namespace.");
    return absolute;
  }
  function corruptFixture(relativePath, bytes, evidenceName) {
    const original = fs.readFileSync(fixturePath(relativePath));
    evidence(`${evidenceName}-original.bin`, original);
    evidence(`${evidenceName}-injected.bin`, bytes);
    const native = loader.load("@/lib/codexforge/creator/creator-native-filesystem.server").openCreatorNativeRoot([".codexforge", "studio-tests", namespace], "persistent");
    try { native.writeAtomicReplace(relativePath.split("/"), `corrupt-${randomUUID()}.tmp`, Buffer.from(bytes), original, null, null); }
    finally { native.close(); }
  }

  try {
    loadRuntime();
    repository = store.openStudioRepository({ workspace: "test", namespace });

    test("01 Sample project, sequence and shot persist through the public repository API", () => {
      assert.deepEqual(store.parseShotManifestJson(JSON.stringify(sample.sampleShot)), sample.sampleShot);
      for (const [filename, expected] of [["project", sample.sampleProject], ["sequence", sample.sampleSequence], ["shot", sample.sampleShot]]) {
        const example = fs.readFileSync(path.join(frontendRoot, "docs", "examples", "animation-studio-phase0", `${filename}.json`), "utf8");
        assert.deepEqual(store.parseStudioJson(example), expected, "Published synthetic examples must match the validated runtime sample.");
      }
      const projectId = project("sample"); const value = shot(projectId);
      repository.close(); repository = store.openStudioRepository({ workspace: "test", namespace });
      const state = repository.load(projectId);
      assert.deepEqual(state.shots, [value]);
      assert.deepEqual(state.sequences[0].shotIds, [value.shotId]);
      assert.equal(state.project.revision, 3); assert.equal(state.events.length, 3);
      throwsCode(() => repository.saveShot({ ...value, shotId: "shot_currency_mismatch", costEstimate: money(0, "USD"), actualCost: money(0, "USD") }, key("wrong-currency"), actor, tick()), "CURRENCY_MISMATCH");
      for (const area of workspace.PROJECT_DIRECTORIES) assert.ok(fs.statSync(fixturePath(workspace.resolveStudioPath(projectId, area))).isDirectory());
      evidence("sample-persisted.json", state);
    });

    test("02 Strict JSON and manifests reject malformed, duplicate, deep and hostile inputs", () => {
      for (const invalid of ['{"x":1,"x":2}', '{"x":1,"\\u0078":2}', '{"nested":{"k":1,"k":2}}', '{', '\ufeff{}', '['.repeat(33) + '0' + ']'.repeat(33)]) assert.throws(() => store.parseStudioJson(invalid));
      assert.throws(() => store.parseStudioJson(' '.repeat(1048577)));
      assert.throws(() => validation.validateShotManifest({ ...sample.sampleShot, unknownField: true }));
      for (const mutation of [{ schemaVersion: 2 }, { duration: 0 }, { fps: NaN }, { aspectRatio: { width: 1, height: 1 } }, { dependencies: [sample.sampleShot.shotId] }, { selectedVersion: { assetId: "asset_missing", version: 1 } }]) assert.throws(() => validation.validateShotManifest({ ...clone(sample.sampleShot), ...mutation }));
      const missing = clone(sample.sampleShot); delete missing.storyPurpose;
      assert.throws(() => validation.validateShotManifest(missing));
      let getterCalls = 0; const hostile = {}; Object.defineProperty(hostile, "description", { enumerable: true, get() { getterCalls++; return "must not run"; } });
      assert.throws(() => validation.validateShotManifest(hostile)); assert.equal(getterCalls, 0);
      assert.throws(() => validation.validateJsonObject(JSON.parse('{"__proto__":{"polluted":true}}')));
      let deep = {}; for (let index = 0; index < 14; index++) deep = { next: deep };
      assert.throws(() => validation.validateJsonObject(deep));
      assert.equal({}.polluted, undefined);
    });

    test("03 Six production methods route deterministically and exact identity blocks unsafe generation", () => {
      const cases = [["GENERATIVE", "HIGGSFIELD"], ["RIGGED", "CHARACTER_ANIMATOR"], ["3D", "BLENDER"], ["2_5D", "AFTER_EFFECTS"], ["LIVE_ACTION", "PREMIERE"], ["HYBRID", "AFTER_EFFECTS"]];
      for (const [method, engine] of cases) {
        const value = { ...clone(sample.sampleShot), generationMethod: method };
        const observations = [{ engine, availability: "AVAILABLE", evidence: "Synthetic capability observation, not installed-tool discovery", checkedAt: fixedTime(0), methods: [method] }];
        const route = policies.routeShot(value, observations, fixedTime(1));
        assert.equal(route.status, "READY"); assert.deepEqual(route.selectedEngines, [engine]); assert.equal(route.selectedMethod, method);
        assert.deepEqual(policies.routeShot(value, observations, fixedTime(1)), route);
        assert.ok(route.reasoningCodes.includes("ROUTING_IS_NOT_EXECUTION_AUTHORIZATION"));
      }
      const exact = { ...clone(sample.sampleShot), generationMethod: "GENERATIVE", identityStrictness: "EXACT" };
      assert.equal(policies.routeShot(exact, [], fixedTime(1)).status, "BLOCKED");
      const safe = policies.routeShot({ ...exact, fallbackEngine: "MOHO" }, [{ engine: "MOHO", availability: "AVAILABLE", evidence: "Synthetic rigged fallback evidence", checkedAt: fixedTime(0), methods: ["RIGGED"] }], fixedTime(1));
      assert.equal(safe.status, "READY"); assert.equal(safe.selectedMethod, "RIGGED"); assert.deepEqual(safe.selectedEngines, ["MOHO"]);
    });

    test("04 Capability routing fails closed on missing, stale, future and contradictory evidence", () => {
      const current = { engine: "BLENDER", availability: "AVAILABLE", evidence: "Synthetic evidence", checkedAt: fixedTime(0), methods: ["3D"] };
      for (const observations of [[], [{ ...current, availability: "UNKNOWN" }], [{ ...current, availability: "UNAVAILABLE" }], [{ ...current, checkedAt: "2026-09-11T12:00:00.000Z" }], [{ ...current, checkedAt: fixedTime(20) }], [{ ...current, methods: ["RIGGED"] }], [current, { ...current, availability: "UNAVAILABLE" }]]) assert.equal(policies.routeShot(sample.sampleShot, observations, fixedTime(1)).status, "BLOCKED");
      assert.equal(policies.routeShot(sample.sampleShot, [current]).status, "BLOCKED");
      assert.equal(policies.routeShot(sample.sampleShot, [current, clone(current)], fixedTime(1)).status, "READY");
      assert.equal(policies.routeShot({ ...sample.sampleShot, preferredEngine: "HIGGSFIELD" }, [current], fixedTime(1)).status, "BLOCKED");
    });

    test("05 All eight gates enforce project scope, ordered upstream decisions and supersession", () => {
      assert.deepEqual(domain.APPROVAL_GATES, ["GATE_01", "GATE_02", "GATE_03", "GATE_04", "GATE_05", "GATE_06", "GATE_07", "GATE_08"]);
      const projectId = "project_policy", hash = "a".repeat(64);
      const decisions = domain.APPROVAL_GATES.map((gate, index) => approval(projectId, gate, hash, "APPROVED", fixedTime(index + 1), `ordered-${index}`));
      assert.equal(policies.evaluateApprovalGates(projectId, ["GATE_08"], hash, decisions).status, "ALLOWED");
      for (let index = 0; index < 8; index++) assert.notEqual(policies.evaluateApprovalGates(projectId, ["GATE_08"], hash, decisions.filter((_, at) => at !== index)).status, "ALLOWED");
      assert.notEqual(policies.evaluateApprovalGates("project_other", ["GATE_01"], hash, decisions).status, "ALLOWED");
      assert.notEqual(policies.evaluateApprovalGates(projectId, ["GATE_01"], "b".repeat(64), decisions).status, "ALLOWED");
      const changed = [...decisions, approval(projectId, "GATE_01", hash, "APPROVED", fixedTime(20), "new-upstream")];
      assert.ok(policies.evaluateApprovalGates(projectId, ["GATE_08"], hash, changed).reasons.some(reason => reason.includes("UPSTREAM_APPROVAL_CHANGED")));
      for (const state of ["REJECTED", "PENDING"]) assert.notEqual(policies.evaluateApprovalGates(projectId, ["GATE_08"], hash, [...decisions, approval(projectId, "GATE_01", hash, state, fixedTime(21), `latest-${state.toLowerCase()}`)]).status, "ALLOWED");
      const conflict = { ...decisions[0], state: "REJECTED", reason: "Conflict" };
      assert.equal(policies.evaluateApprovalGates(projectId, ["GATE_01"], hash, [...decisions, conflict]).status, "BLOCKED");
    });

    test("06 Cost ceilings use exact minor units and reject overflow, currencies and attempt overages", () => {
      const context = { shotSpent: money(90), projectSpent: money(990), estimate: money(10), attempts: 9 };
      assert.equal(policies.evaluateCostPolicy(limits, context).status, "ALLOWED");
      assert.equal(policies.evaluateCostPolicy(limits, { ...context, estimate: money(11) }).status, "REQUIRES_APPROVAL");
      assert.equal(policies.evaluateCostPolicy(limits, { ...context, estimate: money(11), approvedOverage: true }).status, "REQUIRES_APPROVAL");
      assert.equal(policies.evaluateCostPolicy(limits, { ...context, attempts: 10 }).status, "BLOCKED");
      for (const amount of [money(-1), money(0.5), money(NaN), money(Infinity), money(0, "USD")]) assert.equal(policies.evaluateCostPolicy(limits, { ...context, estimate: amount }).status, "BLOCKED");
      const maximum = Number.MAX_SAFE_INTEGER;
      assert.ok(policies.evaluateCostPolicy({ ...limits, MAX_SHOT_GENERATION_COST: money(maximum), MAX_PROJECT_GENERATION_COST: money(maximum) }, { shotSpent: money(maximum), projectSpent: money(maximum), estimate: money(1), attempts: 0 }).reasons.includes("COST_SAFE_INTEGER_OVERFLOW"));
      assert.equal(policies.evaluateCostPolicy({}, context).status, "BLOCKED");
    });

    test("07 All external execution flags default false and malformed flags never grant authority", () => {
      assert.deepEqual(policies.DEFAULT_EXTERNAL_EXECUTION_POLICY, { externalGenerationEnabled: false, paidGenerationEnabled: false, adobeAutomationEnabled: false, blenderRenderEnabled: false });
      assert.ok(Object.isFrozen(policies.DEFAULT_EXTERNAL_EXECUTION_POLICY));
      for (const action of ["EXTERNAL_GENERATION", "PAID_GENERATION", "ADOBE_AUTOMATION", "BLENDER_RENDER"]) assert.equal(policies.evaluateExternalExecution(policies.DEFAULT_EXTERNAL_EXECUTION_POLICY, [action]).status, "BLOCKED");
      assert.equal(policies.evaluateExternalExecution(policies.DEFAULT_EXTERNAL_EXECUTION_POLICY, []).status, "ALLOWED");
      for (const invalid of [{}, null, { ...policies.DEFAULT_EXTERNAL_EXECUTION_POLICY, externalGenerationEnabled: "true" }, { ...policies.DEFAULT_EXTERNAL_EXECUTION_POLICY, extra: true }]) assert.equal(policies.evaluateExternalExecution(invalid, []).status, "BLOCKED");
      assert.equal(policies.evaluateExternalExecution({ ...policies.DEFAULT_EXTERNAL_EXECUTION_POLICY, paidGenerationEnabled: true }, ["PAID_GENERATION"]).status, "BLOCKED");
      assert.equal(policies.evaluateExternalExecution(policies.DEFAULT_EXTERNAL_EXECUTION_POLICY, ["UNKNOWN_ACTION"]).status, "BLOCKED");
    });

    test("08 Local jobs checkpoint, resume after process restart, complete once, fail and cancel", () => {
      const projectId = project("local-jobs"); const value = createJob(job(projectId, "local"));
      assert.equal(repository.startJob(projectId, value.jobId, key("start"), actor, tick(), limits).code, "LOCAL_JOB_STARTED");
      readJob(projectId, value.jobId);
      assert.equal(repository.checkpointJob(projectId, value.jobId, { step: 2, completedFrames: [1, 2] }, key("checkpoint"), actor, tick()).code, "CHECKPOINT_SAVED");
      const recovery = restart(projectId, value.jobId); assert.equal(recovery.action, "RESUME_LOCAL_CHECKPOINT"); assert.equal(recovery.job.checkpoint.step, 2);
      assert.equal(finish(projectId, value.jobId, "SUCCEEDED").code, "SUCCEEDED");
      assert.equal(repository.recoveryPlan(projectId, value.jobId).action, "NONE");
      assert.equal(repository.startJob(projectId, value.jobId, key("repeat-start"), actor, tick(), limits).code, "JOB_NOT_DISPATCHABLE");
      throwsCode(() => finish(projectId, value.jobId, "SUCCEEDED"), "JOB_TERMINAL");
      const failed = createJob(job(projectId, "failed")); repository.startJob(projectId, failed.jobId, key("start"), actor, tick(), limits); finish(projectId, failed.jobId, "FAILED");
      assert.equal(repository.startJob(projectId, failed.jobId, key("retry"), actor, tick(), limits).status, "BLOCKED");
      const cancelled = createJob(job(projectId, "cancelled")); finish(projectId, cancelled.jobId, "CANCELLED");
      assert.equal(repository.recoveryPlan(projectId, cancelled.jobId).action, "NONE");
      const invalid = createJob(job(projectId, "invalid-transition")); throwsCode(() => finish(projectId, invalid.jobId, "SUCCEEDED"), "INVALID_TRANSITION");
    });

    test("09 Required job gates cannot be omitted and dependencies and stale scope block starts", () => {
      const projectId = project("gates");
      const unclassified = createJob(job(projectId, "unclassified-render", { type: "RENDER", requiredGates: [] }));
      assert.equal(repository.startJob(projectId, unclassified.jobId, key("classify-start"), actor, tick(), limits).code, "EXECUTION_EFFECT_CLASSIFICATION_REQUIRED");
      const value = createJob(job(projectId, "gate-render", { type: "RENDER", requiredGates: [], externalActions: ["BLENDER_RENDER"] }));
      const simulatedIntentPolicy = { ...policies.DEFAULT_EXTERNAL_EXECUTION_POLICY, blenderRenderEnabled: true };
      const blocked = repository.startJob(projectId, value.jobId, key("start"), actor, tick(), limits, simulatedIntentPolicy);
      assert.equal(blocked.code, "APPROVAL_REQUIRED"); assert.equal(readJob(projectId, value.jobId).state, "WAITING_APPROVAL");
      assert.equal(repository.recordApproval(approval(projectId, "GATE_04", repository.approvalScope(projectId)), key("out-of-order")).code, "UPSTREAM_APPROVAL_REQUIRED");
      approveThrough(projectId, 4);
      assert.equal(repository.startJob(projectId, unclassified.jobId, key("classified-still-needed"), actor, tick(), limits, simulatedIntentPolicy).code, "EXECUTION_EFFECT_CLASSIFICATION_REQUIRED");
      assert.equal(repository.startJob(projectId, value.jobId, key("approved-start"), actor, tick(), limits, simulatedIntentPolicy).code, "EXTERNAL_INTENT_RECORDED_NO_ADAPTER_CALLED");
      const parent = createJob(job(projectId, "dependency-parent")); const child = createJob(job(projectId, "dependency-child", { dependencies: [parent.jobId] }));
      assert.equal(repository.startJob(projectId, child.jobId, key("dependency-start"), actor, tick(), limits).code, "DEPENDENCY_NOT_SUCCEEDED");
      repository.startJob(projectId, parent.jobId, key("parent-start"), actor, tick(), limits); finish(projectId, parent.jobId, "SUCCEEDED");
      assert.equal(repository.startJob(projectId, child.jobId, key("child-start"), actor, tick(), limits).status, "APPLIED");
      const stale = createJob(job(projectId, "stale-scope")); const oldHash = repository.approvalScope(projectId); shot(projectId, "scope-change");
      assert.equal(repository.startJob(projectId, stale.jobId, key("stale-start"), actor, tick(), limits).code, "STALE_JOB_SCOPE");
      throwsCode(() => repository.recordApproval(approval(projectId, "GATE_01", oldHash), key("stale-approval")), "STALE_APPROVAL");
    });

    test("10 External intent survives restart without execution, redispatch or unbound completion", () => {
      const projectId = project("external-intent"); approveThrough(projectId, 3);
      const value = createJob(job(projectId, "external", { type: "GENERATION", externalActions: [] }));
      assert.equal(repository.startJob(projectId, value.jobId, key("disabled-start"), actor, tick(), limits).code, "EXTERNAL_EXECUTION_DISABLED");
      const policy = { ...policies.DEFAULT_EXTERNAL_EXECUTION_POLICY, externalGenerationEnabled: true };
      const result = repository.startJob(projectId, value.jobId, key("intent-start"), actor, tick(), limits, policy);
      assert.equal(result.code, "EXTERNAL_INTENT_RECORDED_NO_ADAPTER_CALLED");
      const active = readJob(projectId, value.jobId); assert.equal(active.dispatch.state, "INTENT_RECORDED");
      const recovery = restart(projectId, value.jobId); assert.equal(recovery.action, "RECONCILE_EXTERNAL"); assert.equal(recovery.job.dispatch.token, active.dispatch.token);
      assert.equal(repository.startJob(projectId, value.jobId, key("no-redispatch"), actor, tick(), limits, policy).code, "JOB_NOT_DISPATCHABLE");
      const metadata = { adapterId: "synthetic-not-executed", provider: null, model: null, providerJobId: "synthetic-ledger-only", externalGenerationId: null, settings: { actualExecution: false } };
      throwsCode(() => finish(projectId, value.jobId, "WAITING_EXTERNAL", { adapterMetadata: metadata, dispatchToken: "wrong-token" }), "DISPATCH_BINDING");
      assert.equal(finish(projectId, value.jobId, "WAITING_EXTERNAL", { adapterMetadata: metadata, dispatchToken: active.dispatch.token, actualCost: money(100) }).code, "WAITING_EXTERNAL");
      const chargedDigest = repository.load(projectId).recordDigest;
      throwsCode(() => finish(projectId, value.jobId, "SUCCEEDED", { adapterMetadata: metadata, dispatchToken: active.dispatch.token, actualCost: money(0) }), "COST_REGRESSION");
      assert.equal(repository.load(projectId).recordDigest, chargedDigest);
      assert.equal(finish(projectId, value.jobId, "SUCCEEDED", { adapterMetadata: metadata, dispatchToken: active.dispatch.token, actualCost: money(100) }).code, "SUCCEEDED");
      assert.equal(repository.recoveryPlan(projectId, value.jobId).action, "NONE");
      assert.deepEqual(networkAttempts, []);
      evidence("external-intent-zero-execution.json", { actualProviderExecutions: 0, actualRenderExecutions: 0, simulatedLedgerOnly: true, snapshot: repository.load(projectId) });
    });

    test("11 Idempotent receipts replay exact inputs and reject conflicting input reuse", () => {
      const projectId = project("idempotency"); const value = job(projectId, "idempotent"); const createKey = key("create-once");
      const first = repository.createJob(value, createKey, actor); const before = repository.load(projectId);
      assert.deepEqual(repository.createJob(clone(value), createKey, actor), first);
      assert.equal(repository.load(projectId).recordDigest, before.recordDigest);
      throwsCode(() => repository.createJob({ ...value, maxAttempts: 2 }, createKey, actor), "IDEMPOTENCY_CONFLICT");
      const startKey = key("start-once"), now = tick(); const started = repository.startJob(projectId, value.jobId, startKey, actor, now, limits);
      const after = repository.load(projectId); assert.deepEqual(repository.startJob(projectId, value.jobId, startKey, actor, now, limits), started);
      assert.equal(repository.load(projectId).recordDigest, after.recordDigest); assert.equal(after.jobs[0].attempt, 1);
      throwsCode(() => repository.startJob(projectId, value.jobId, startKey, actor, tick(), limits), "IDEMPOTENCY_CONFLICT");
      assert.equal(repository.load(projectId).recordDigest, after.recordDigest);
    });

    test("12 Asset versions preserve immutable bytes, provenance and explicit v2 lineage", () => {
      const projectId = project("assets"); const firstBytes = Buffer.from("Original synthetic asset version one.\n"); const first = asset(projectId, "document", 1, firstBytes);
      first.approvalState = "APPROVED"; first.provenance.approvalState = "APPROVED";
      assert.deepEqual(store.parseAssetManifestJson(JSON.stringify(first)), first);
      repository.registerAsset(first, firstBytes, key("asset-v1"), actor, tick());
      const secondBytes = Buffer.from("Original synthetic asset version two.\n"); const ref = { assetId: first.assetId, version: 1 }; const second = asset(projectId, "document", 2, secondBytes, [ref]);
      repository.registerAsset(second, secondBytes, key("asset-v2"), actor, tick());
      const state = repository.load(projectId); assert.equal(state.assets.length, 2); assert.deepEqual(state.assets[1].lineage, [ref]);
      assert.deepEqual(fs.readFileSync(fixturePath(first.sourcePath)), firstBytes); assert.deepEqual(fs.readFileSync(fixturePath(second.sourcePath)), secondBytes);
      const replacement = asset(projectId, "document", 1, Buffer.from("Must not replace v1"));
      throwsCode(() => repository.registerAsset(replacement, Buffer.from("Must not replace v1"), key("replace-v1"), actor, tick()), "ASSET_VERSION_CONFLICT");
      const missingLineage = asset(projectId, "document", 3, Buffer.from("Missing lineage"));
      throwsCode(() => repository.registerAsset(missingLineage, Buffer.from("Missing lineage"), key("bad-v3"), actor, tick()), "ASSET_VERSION_CONFLICT");
      throwsCode(() => repository.registerAsset(first, Buffer.from("wrong hash"), key("bad-hash"), actor, tick()), "INVALID_ASSET_CONTENT");
      assert.throws(() => validation.validateAssetManifest({ ...first, provenance: { ...first.provenance, contentHash: "0".repeat(64) } }));
      assert.deepEqual(fs.readFileSync(fixturePath(first.sourcePath)), firstBytes);
      const character = { schemaVersion: 1, characterId: "character_test", projectId, name: "Synthetic character", identityAssets: [], rigId: null };
      throwsCode(() => repository.registerDefinition(projectId, { ...character, identityAssets: [{ assetId: "asset_missing", version: 1 }] }, key("missing-identity"), actor, tick()), "MISSING_ASSET");
      throwsCode(() => repository.registerDefinition(projectId, { ...character, rigId: "rig_missing" }, key("missing-rig"), actor, tick()), "MISSING_RIG");
      throwsCode(() => repository.registerDefinition(projectId, { schemaVersion: 1, rigId: "rig_test", projectId, assets: [{ assetId: "asset_missing", version: 1 }], compatibleMethods: ["RIGGED"] }, key("missing-rig-asset"), actor, tick()), "MISSING_ASSET");
      const beforeDefinition = repository.load(projectId).recordDigest;
      assert.equal(repository.registerDefinition(projectId, { ...character, identityAssets: [ref] }, key("valid-definition"), actor, tick()).status, "APPLIED");
      assert.notEqual(repository.load(projectId).recordDigest, beforeDefinition);
      evidence("immutable-asset-lineage.json", state.assets);
    });

    test("13 Audit events form an ordered, tamper-evident chain and cover all seven job states", () => {
      assert.deepEqual([...statesSeen].sort(), ["QUEUED", "RUNNING", "WAITING_EXTERNAL", "WAITING_APPROVAL", "SUCCEEDED", "FAILED", "CANCELLED"].sort());
      const projectId = project("audit"); const value = createJob(job(projectId, "audit"));
      repository.startJob(projectId, value.jobId, key("audit-start"), actor, tick(), limits); finish(projectId, value.jobId, "SUCCEEDED");
      repository.startJob(projectId, value.jobId, key("audit-blocked"), actor, tick(), limits);
      const state = repository.load(projectId); let previousHash = null;
      state.events.forEach((event, index) => {
        assert.equal(event.sequence, index + 1); assert.equal(event.previousHash, previousHash);
        const { eventHash, ...body } = event; assert.equal(eventHash, sha(canonical(body))); previousHash = eventHash;
      });
      assert.equal(state.events.length, state.project.revision); assert.equal(state.receipts.length, state.events.length);
      assert.deepEqual(state.events.map(event => event.type), ["PROJECT_CREATED", "JOB_CREATED", "JOB_STARTED", "JOB_COMPLETED", "JOB_BLOCKED"]);
      const before = state.recordDigest; repository.recoveryPlan(projectId, value.jobId); assert.equal(repository.load(projectId).recordDigest, before);
      evidence("audit-chain.json", state.events);
    });

    test("14 Windows path confinement and corrupted aggregate/asset files fail closed", () => {
      for (const filename of ["../escape", "..\\escape", "C:\\outside", "\\\\server\\share", "file:stream", "CON", "con.txt", "NUL.bin", "COM1", "LPT9.txt", "trailing.", "trailing ", "/absolute", "file\u0000name"]) assert.throws(() => workspace.resolveStudioPath("project_paths", "manifests", filename), filename);
      for (const id of ["project_../escape", "project_C:drive", "project_\\server", "other_project", "project_UPPERCASE"]) assert.throws(() => workspace.resolveStudioPath(id));
      assert.throws(() => workspace.resolveStudioPath("project_paths", "../outside"));
      for (const options of [{}, { workspace: "production" }, { workspace: "test", namespace: "../escape" }, { workspace: "test", namespace: "short" }]) throwsCode(() => store.openStudioRepository(options), "INVALID_WORKSPACE");
      const corruptId = project("corrupt-record"); const corruptPath = workspace.resolveStudioPath(corruptId, "manifests", "project.json");
      const state = repository.load(corruptId); state.project.title = "Tampered without a new digest";
      corruptFixture(corruptPath, canonical(state), "aggregate-digest-corruption"); throwsCode(() => repository.load(corruptId), "CORRUPT_STORE");
      const malformedId = project("corrupt-json"); const malformedPath = workspace.resolveStudioPath(malformedId, "manifests", "project.json");
      corruptFixture(malformedPath, '{"schemaVersion":1,"schemaVersion":2}', "aggregate-duplicate-json"); assert.throws(() => repository.load(malformedId));
      const assetId = project("corrupt-asset"), bytes = Buffer.from("Tamper test original bytes"); const value = asset(assetId, "tamper", 1, bytes);
      repository.registerAsset(value, bytes, key("tamper-asset"), actor, tick()); corruptFixture(value.sourcePath, "Tampered immutable bytes", "immutable-byte-corruption");
      throwsCode(() => repository.load(assetId), "CORRUPT_ASSET");
    });
  } catch (error) {
    results.push({ label: "SUITE_SETUP", status: "FAIL", error: { name: error.name, message: error.message, stack: error.stack } });
    log(`FAIL SUITE_SETUP: ${error.message}`);
  } finally {
    if (repository) repository.close();
    const passed = results.filter(item => item.status === "PASS").length;
    const result = {
      schemaVersion: 1, suite: "animation-studio-phase0", runId, namespace, testRoot, evidenceRoot,
      status: results.length === 14 && passed === 14 && networkAttempts.length === 0 ? "PASS" : "FAIL",
      passed, failed: results.filter(item => item.status === "FAIL").length, expectedCases: 14,
      actualProviderExecutions: 0, actualRenderExecutions: 0, actualGuiExecutions: 0, networkAttempts,
      sourceFiles: loader.loaded, results, retainedFixtures: true,
      limitations: ["No live provider, renderer, GUI, visual quality, throughput or browser behavior is exercised.", "External job results are explicit synthetic ledger inputs, not provider execution evidence."],
    };
    evidence("result.json", result);
    fs.closeSync(logFd);
    process.stdout.write(`${JSON.stringify(result)}\n`);
    if (result.status !== "PASS") process.exitCode = 1;
  }
}
