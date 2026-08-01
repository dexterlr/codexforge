$ErrorActionPreference = "Stop"

function Assert-True([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw "[FAIL] $Message" }
  Write-Host "[PASS] $Message"
}

function Assert-PowerShellParses([string]$Path) {
  $sliceRTokens = $null
  $sliceRErrors = $null
  [System.Management.Automation.Language.Parser]::ParseFile((Resolve-Path $Path), [ref]$sliceRTokens, [ref]$sliceRErrors) | Out-Null
  Assert-True ($sliceRErrors.Count -eq 0) "PowerShell parses: $Path"
}

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
Write-Host "=== CodexForge Slice R exact Qwen qualification and controlled acceptance smoke ==="

$macroPhaseBPaths = @(
  "src/app/athena/page.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/AthenaLiveCommandCenterPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  "src/lib/codexforge/navigation-shell/primary-product-area-model.ts",
  "src/lib/codexforge/navigation-shell/components/CodexForgeSidebar.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeShellMobileNav.tsx",
  "src/lib/codexforge/navigation-shell/components/CodexForgeAppShell.tsx",
  "src/lib/codexforge/navigation-shell/navigation-route-registry.ts",
  "src/lib/codexforge/command-palette/command-registry.ts",
  "src/lib/codexforge/navigation/codexforge-routes.ts",
  "src/lib/codexforge/cockpit-navigation-cleanup-user-ux/components/CockpitNavigationCleanupUserUxPanel.tsx",
  "scripts/smoke-codexforge-unified-jarvis-product-experience.ps1",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-local-first-jarvis-working-product-loop.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-private-alpha-ollama-local-first-live-acceptance.ps1",
  "scripts/smoke-codexforge-first-exact-installed-local-model-candidate-declaration.ps1",
  "scripts/smoke-codexforge-free-local-provider-registry-foundation.ps1",
  "scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1",
  "scripts/smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract.ps1",
  "scripts/smoke-codexforge-private-alpha-free-first-automatic-routing-policy-integration.ps1"
)

$changedPaths = @(
  (& git status --short --untracked-files=all) |
    Where-Object { $_.Length -ge 4 } |
    ForEach-Object { $_.Substring(3).Trim() -replace "\\", "/" } |
    Sort-Object -Unique
)
Assert-True ($changedPaths.Count -eq 23) "Dirty scope contains exactly twenty-three Macro Phase B paths"
foreach ($path in $changedPaths) {
  Assert-True ($macroPhaseBPaths -contains $path) "Dirty path is approved for Macro Phase B: $path"
}

$protectedPaths = @(
  "src/lib/codexforge/model-routing/model-routing-provider-registry.ts",
  "src/lib/codexforge/model-routing/model-routing-catalog.ts",
  "src/lib/codexforge/model-routing/model-routing-types.ts",
  "src/lib/codexforge/model-routing/model-routing-policy.server.ts",
  "src/lib/codexforge/model-routing/index.ts",
  "src/lib/codexforge/ollama-provider",
  "src/lib/codexforge/groq-provider",
  "src/lib/codexforge/private-alpha",
  "src/app/api/codexforge/private-alpha"
)
foreach ($path in $protectedPaths) {
  $diff = ((& git -c core.safecrlf=false diff --name-only -- $path) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($diff)) "Protected path is unchanged: $path"
}

$runtimeModules = @(
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-canonicalization.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification.server.ts",
  "src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-controlled-live-acceptance.server.ts"
)
foreach ($path in $runtimeModules) {
  Assert-True ((Get-Content -LiteralPath $path -TotalCount 1) -eq 'import "server-only";') "Runtime module is server-only: $path"
}

foreach ($path in @($changedPaths | Where-Object { $_ -like "*.ps1" })) {
  Assert-PowerShellParses $path
}

$aggregate = Get-Content -Raw -LiteralPath "scripts/smoke-codexforge-all.ps1"
$releaseBlock = [regex]::Match($aggregate, '(?s)\$currentReleaseGateScripts = @\((.*?)\r?\n\)').Groups[1].Value
$entries = @($releaseBlock -split "`n" | Where-Object { $_ -match '^  @\{' })
Assert-True ($entries.Count -eq 70) "Aggregate executable count is 70"
Assert-True (@($entries | Where-Object { $_ -match 'Required = \$true' }).Count -eq 67) "Aggregate required count is 67"
Assert-True (@($entries | Where-Object { $_ -match 'Required = \$false' }).Count -eq 3) "Aggregate optional count is 3"
Assert-True ($releaseBlock -match 'First Exact Installed Local Model Candidate Declaration"; File = "smoke-codexforge-first-exact-installed-local-model-candidate-declaration\.ps1"; Required = \$true \},\r?\n  @\{ Name = "Exact Qwen 2\.5 Coder 32B Qualification and Controlled Acceptance Contract"; File = "smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract\.ps1"; Required = \$true \},') "Slice R follows Slice Q and is required"
Assert-True ($releaseBlock -notmatch 'qualify-codexforge-qwen2-5-coder-32b-installed-candidate|run-codexforge-qwen2-5-coder-32b-controlled-live-acceptance') "Manual scripts are absent from the aggregate"

$nodeScript = @'
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const Module = require("module");
const childProcess = require("child_process");
const root = process.argv[2];
const ts = require(path.join(root, "node_modules", "typescript"));
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request, parent, isMain, options) {
  if (request.startsWith("@/")) request = path.join(root, "src", request.slice(2));
  return originalResolve.call(this, request, parent, isMain, options);
};
const originalLoad = Module._load;
Module._load = function(request, parent, isMain) {
  if (request === "server-only") return {};
  return originalLoad.apply(this, arguments);
};
require.extensions[".ts"] = function(module, filename) {
  const source = fs.readFileSync(filename, "utf8");
  const output = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, moduleResolution: ts.ModuleResolutionKind.NodeJs, esModuleInterop: true },
    fileName: filename,
  }).outputText;
  module._compile(output, filename);
};

function load(relativePath) { return require(path.join(root, relativePath)); }
function assert(condition, message) { if (!condition) throw new Error(message); }
function clone(value) { return JSON.parse(JSON.stringify(value)); }
function deepFrozen(value, seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return true;
  seen.add(value);
  return Object.isFrozen(value) && Reflect.ownKeys(value).every((key) => deepFrozen(value[key], seen));
}
function response(value, status = 200) {
  const bytes = new TextEncoder().encode(typeof value === "string" ? value : JSON.stringify(value));
  return {
    ok: status >= 200 && status < 300,
    status,
    body: new ReadableStream({ start(controller) { controller.enqueue(bytes); controller.close(); } }),
  };
}
function abortError() { const error = new Error("aborted"); error.name = "AbortError"; return error; }

(async () => {
const types = load("src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-types.ts");
const canonical = load("src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification-live-acceptance-canonicalization.server.ts");
const candidate = load("src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-installed-candidate.server.ts");
const qualification = load("src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-qualification.server.ts");
const acceptance = load("src/lib/codexforge/model-routing/onboarding/qwen2-5-coder-32b-controlled-live-acceptance.server.ts");
const catalog = load("src/lib/codexforge/model-routing/model-routing-catalog.ts").CODEXFORGE_PRODUCTION_MODEL_CATALOG;

const counters = {
  globalFetch: 0,
  environmentReads: 0,
  credentialReads: 0,
  childProcesses: 0,
  fileMutations: 0,
  injectedMetadataCalls: 0,
  injectedGenerationCalls: 0,
  preflightCalls: 0,
  approvalConsumptions: 0,
  retry: 0,
  fallback: 0,
  reroute: 0,
  providerSubstitution: 0,
  modelSubstitution: 0,
  downloads: 0,
  groqCalls: 0,
  normalApproval: 0,
};
global.fetch = async () => { counters.globalFetch += 1; throw new Error("global fetch forbidden"); };
const originalEnvironment = process.env;
process.env = new Proxy(originalEnvironment, {
  get(target, property, receiver) {
    counters.environmentReads += 1;
    if (typeof property === "string" && /KEY|SECRET|TOKEN|PASSWORD|CREDENTIAL|AUTH/i.test(property)) counters.credentialReads += 1;
    throw new Error("environment read forbidden");
  },
});
for (const name of ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]) {
  childProcess[name] = () => { counters.childProcesses += 1; throw new Error("child process forbidden"); };
}
for (const name of ["writeFileSync", "appendFileSync", "renameSync", "writeFile", "appendFile", "rename"]) {
  fs[name] = () => { counters.fileMutations += 1; throw new Error("file mutation forbidden"); };
}

const expectedMetadata = qualification.getCodexForgeQwen25Coder32BExpectedQualificationMetadata();
const NOW = "2026-07-30T18:00:00.000Z";
const REVIEW_NOW = "2026-07-30T18:02:00.000Z";
const CHECKPOINT = "5e190a28decba0e75c47d2491e905df79f679028";
assert(qualification.CODEXFORGE_QWEN25_CODER_32B_METADATA_RESPONSE_MAXIMUM_BYTES === 262144, "qualification metadata response ceiling remains exactly 262144 bytes");
assert(JSON.stringify(qualification.CODEXFORGE_QWEN25_CODER_32B_SHOW_BODY) === '{"model":"qwen2.5-coder:32b","verbose":false}', "qualification show body is exact compact non-verbose JSON");
const qualifiedResult = qualification.qualifyCodexForgeQwen25Coder32BNormalizedMetadataForTesting({ normalizedMetadata: expectedMetadata, now: NOW });
assert(qualifiedResult.ok, `exact normalized metadata must qualify: ${JSON.stringify(qualifiedResult)}`);
const qualified = qualifiedResult.value;
assert(deepFrozen(qualifiedResult), "qualification result must be deeply frozen");
assert(qualified.metadataRequestCount === 2 && qualified.generationAttemptCount === 0, "qualification evidence counts are exact");

function resign(value) { value.contentDigest = canonical.calculateCodexForgeQwen25Coder32BContentDigest(value); return value; }
function qCode(result, code) { assert(!result.ok && result.rejection.codes.includes(code), `qualification code missing: ${code}; got ${JSON.stringify(result)}`); seenQ.add(code); }
const seenQ = new Set();

qCode(qualification.qualifyCodexForgeQwen25Coder32BNormalizedMetadataForTesting({ normalizedMetadata: expectedMetadata, now: NOW, candidate: 42 }), "candidate-declaration-invalid");
let mutatedCandidate = clone(candidate.getCodexForgeQwen25Coder32BInstalledCandidate());
mutatedCandidate.installationEvidence.artifactDigest.sha256 = "a".repeat(64);
qCode(qualification.qualifyCodexForgeQwen25Coder32BNormalizedMetadataForTesting({ normalizedMetadata: expectedMetadata, now: NOW, candidate: mutatedCandidate }), "candidate-evidence-digest-mismatch");
mutatedCandidate = clone(candidate.getCodexForgeQwen25Coder32BInstalledCandidate());
mutatedCandidate.contentDigest.sha256 = "a".repeat(64);
qCode(qualification.qualifyCodexForgeQwen25Coder32BNormalizedMetadataForTesting({ normalizedMetadata: expectedMetadata, now: NOW, candidate: mutatedCandidate }), "candidate-content-digest-mismatch");
const canceledController = new AbortController(); canceledController.abort();
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ signal: canceledController.signal, fetchFn: async () => { throw new Error("must not call"); } }), "qualification-canceled");
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async () => { counters.injectedMetadataCalls += 1; throw new Error("offline"); } }), "ollama-unavailable");
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async (_url, init) => new Promise((_resolve, reject) => init.signal.addEventListener("abort", () => reject(abortError()), { once: true })) }), "ollama-timeout");
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async () => response({}, 500) }), "ollama-http-failure");
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async () => response("x".repeat(262145)) }), "metadata-response-too-large");
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async () => response("{" ) }), "metadata-malformed-response");
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async () => response({ models: [] }) }), "model-missing");
const tag = clone(expectedMetadata.tag);
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async () => response({ models: [tag, clone(tag)] }) }), "duplicate-model-entry");
const wrongName = clone(tag); wrongName.name = wrongName.model = "other:32b";
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async () => response({ models: [wrongName] }) }), "model-name-mismatch");
const wrongDigest = clone(tag); wrongDigest.digest = "a".repeat(64);
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async () => response({ models: [wrongDigest] }) }), "installed-digest-mismatch");
const wrongMetadata = clone(tag); wrongMetadata.size += 1;
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async () => response({ models: [wrongMetadata] }) }), "metadata-mismatch");
let requestSequence = 0;
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async (url, init) => {
  counters.injectedMetadataCalls += 1;
  requestSequence += 1;
  if (requestSequence === 1) {
    assert(String(url) === "http://127.0.0.1:11434/api/tags" && init.method === "GET" && init.redirect === "error", "tags request is exact");
    return response({ models: [tag] });
  }
  assert(String(url) === "http://127.0.0.1:11434/api/show" && init.method === "POST" && init.redirect === "error", "show request is exact");
  assert(init.body === '{"model":"qwen2.5-coder:32b","verbose":false}', "show body is exact compact non-verbose JSON");
  return response({ model_info: {}, capabilities: ["wrong"] });
} }), "unsupported-capability-metadata");

let oversizedRequestSequence = 0;
const oversizedVerboseStyleShow = {
  model_info: {
    "general.parameter_count": expectedMetadata.show.parameterCount,
    "qwen2.context_length": expectedMetadata.show.contextLengthTokens,
    "qwen2.embedding_length": expectedMetadata.show.embeddingLength,
    "tokenizer.ggml.tokens": Array.from({ length: 70000 }, (_value, index) => `token-${index}`),
  },
};
assert(Buffer.byteLength(JSON.stringify(oversizedVerboseStyleShow), "utf8") > qualification.CODEXFORGE_QWEN25_CODER_32B_METADATA_RESPONSE_MAXIMUM_BYTES, "oversized verbose-style tokenizer metadata is constructed in memory above the exact ceiling");
qCode(await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ fetchFn: async (url, init) => {
  oversizedRequestSequence += 1;
  if (oversizedRequestSequence === 1) return response({ models: [tag] });
  assert(oversizedRequestSequence === 2 && String(url) === "http://127.0.0.1:11434/api/show", "oversized verbose-style metadata rejection occurs on the second metadata request");
  assert(init.body === '{"model":"qwen2.5-coder:32b","verbose":false}', "oversized-response lane still sends the exact compact non-verbose body");
  return response(oversizedVerboseStyleShow);
} }), "metadata-response-too-large");
assert(oversizedRequestSequence === 2, "oversized verbose-style response rejects after exactly two metadata requests");

const originalSha256Utf8 = canonical.sha256CodexForgeQwen25Coder32BUtf8;
const compactContent = {
  template: "t".repeat(expectedMetadata.show.content.template.utf8Bytes),
  license: "l".repeat(expectedMetadata.show.content.license.utf8Bytes),
  system: "s".repeat(expectedMetadata.show.content.system.utf8Bytes),
  modelfile: "m".repeat(expectedMetadata.show.content.modelfile.utf8Bytes),
};
const compactContentDigests = new Map([
  [compactContent.template, expectedMetadata.show.content.template.sha256],
  [compactContent.license, expectedMetadata.show.content.license.sha256],
  [compactContent.system, expectedMetadata.show.content.system.sha256],
  [compactContent.modelfile, expectedMetadata.show.content.modelfile.sha256],
]);
canonical.sha256CodexForgeQwen25Coder32BUtf8 = (value) => compactContentDigests.get(value) || originalSha256Utf8(value);
const boundedNonVerboseShow = {
  details: clone(expectedMetadata.show.details),
  capabilities: clone(expectedMetadata.show.capabilities),
  model_info: {
    "general.parameter_count": expectedMetadata.show.parameterCount,
    "qwen2.context_length": expectedMetadata.show.contextLengthTokens,
    "qwen2.embedding_length": expectedMetadata.show.embeddingLength,
  },
  ...compactContent,
};
assert(!Object.prototype.hasOwnProperty.call(boundedNonVerboseShow, "parameters"), "bounded non-verbose metadata deliberately omits parameters");
assert(Buffer.byteLength(JSON.stringify(boundedNonVerboseShow), "utf8") < qualification.CODEXFORGE_QWEN25_CODER_32B_METADATA_RESPONSE_MAXIMUM_BYTES, "bounded non-verbose metadata fits beneath the exact response ceiling");
let successfulMetadataCalls = 0;
let boundedQualification;
try {
  boundedQualification = await qualification.qualifyCodexForgeQwen25Coder32BInstalledCandidate({ now: () => NOW, fetchFn: async (url, init) => {
    successfulMetadataCalls += 1;
    if (successfulMetadataCalls === 1) return response({ models: [tag] });
    assert(successfulMetadataCalls === 2 && String(url) === "http://127.0.0.1:11434/api/show", "bounded non-verbose metadata reaches the second metadata request");
    assert(init.body === '{"model":"qwen2.5-coder:32b","verbose":false}', "successful qualification sends the exact compact non-verbose body");
    return response(boundedNonVerboseShow);
  } });
} finally {
  canonical.sha256CodexForgeQwen25Coder32BUtf8 = originalSha256Utf8;
}
assert(boundedQualification.ok, `bounded non-verbose metadata advances past size and schema validation: ${JSON.stringify(boundedQualification)}`);
assert(boundedQualification.value.metadataRequestCount === 2 && successfulMetadataCalls === 2, "successful qualification uses exactly two metadata calls");
assert(boundedQualification.value.generationAttemptCount === 0 && counters.injectedGenerationCalls === 0, "successful qualification performs zero generation calls");
assert(expectedMetadata.show.content.parameters === null && boundedQualification.ok, "absent parameters normalizes to null during successful qualification");
assert(counters.retry === 0 && counters.fallback === 0 && counters.reroute === 0 && counters.providerSubstitution === 0 && counters.modelSubstitution === 0, "qualification performs no retry, fallback, reroute, or substitution");
assert(counters.downloads === 0 && counters.groqCalls === 0 && counters.credentialReads === 0 && counters.fileMutations === 0, "qualification performs no download, Groq, credential, or persistence activity");
qCode(qualification.qualifyCodexForgeQwen25Coder32BNormalizedMetadataForTesting({ normalizedMetadata: expectedMetadata, now: "invalid" }), "qualification-evidence-construction-failed");
assert(types.CODEXFORGE_QWEN25_CODER_32B_QUALIFICATION_REJECTION_CODES.every((code) => seenQ.has(code)), "every qualification rejection code is exercised");

const approval = acceptance.createCodexForgeQwen25Coder32BAcceptanceApproval({
  approvalId: "slice-r-approval",
  approvalNonce: "0123456789abcdef0123456789abcdef",
  approvedAt: "2026-07-30T18:01:00.000Z",
  expiresAt: "2026-07-30T18:10:00.000Z",
  qualificationEvidenceSha256: qualified.contentDigest.sha256,
});
assert(deepFrozen(approval), "approval is deeply frozen");
const preflightResult = qualification.qualifyCodexForgeQwen25Coder32BNormalizedMetadataForTesting({ normalizedMetadata: expectedMetadata, now: REVIEW_NOW });
assert(preflightResult.ok, "synthetic preflight qualifies");
const validPayload = {
  model: "qwen2.5-coder:32b", done: true, done_reason: "stop", eval_count: 8,
  message: { role: "assistant", content: "export const codexForgeSliceR = 32;" },
  total_duration: 10, load_duration: 2, prompt_eval_count: 20,
};
function preflightFailure(code) { return async () => ({ ok: false, rejection: { schemaVersion: "codexforge-qwen2-5-coder-32b-qualification-rejection-v1", qualificationState: "rejected", codes: [code] } }); }
function defaultStore(result = "consumed") { return { consume: async () => { counters.approvalConsumptions += 1; return result; } }; }
function defaultPreflight() { return async () => { counters.preflightCalls += 1; return preflightResult; }; }
function generationFetch(payload = validPayload, status = 200) { return async (url, init) => {
  counters.injectedGenerationCalls += 1;
  assert(String(url) === "http://127.0.0.1:11434/api/chat", "generation endpoint is exact loopback chat");
  assert(init.method === "POST" && init.redirect === "error", "generation method and redirect policy are exact");
  const body = JSON.parse(init.body);
  assert(body.model === "qwen2.5-coder:32b" && body.stream === false, "generation model and stream are exact");
  assert(body.messages.length === 1 && body.messages[0].role === "user", "generation has exactly one user message");
  assert(JSON.stringify(body.options) === JSON.stringify({ temperature: 0, seed: 0, num_predict: 64 }), "generation options are exact");
  return response(payload, status);
}; }
function input(overrides = {}) { return { qualification: qualified, approval, implementationCheckpointCommit: CHECKPOINT, ...overrides }; }
function options(overrides = {}) { return { fetchFn: generationFetch(), now: () => REVIEW_NOW, killSwitchReader: async () => ({ killSwitchEngaged: false }), approvalConsumptionStore: defaultStore(), qualificationRunner: defaultPreflight(), ...overrides }; }
async function run(overrides = {}, optionOverrides = {}) { return acceptance.runCodexForgeQwen25Coder32BControlledLiveAcceptance(input(overrides), options(optionOverrides)); }
function aCode(result, code, attempts) { assert(!result.ok && result.rejection.codes.includes(code), `acceptance code missing: ${code}`); assert(result.rejection.generationAttemptCount === attempts, `${code} attempt count`); seenA.add(code); }
const seenA = new Set();

aCode(await run({ qualification: null }), "qualification-required", 0);
const expiredQualification = resign({ ...clone(qualified), validUntil: "2026-07-30T18:01:00.000Z" });
aCode(await run({ qualification: expiredQualification }), "qualification-expired", 0);
const badQualification = clone(qualified); badQualification.contentDigest.sha256 = "a".repeat(64);
aCode(await run({ qualification: badQualification }), "qualification-evidence-mismatch", 0);
aCode(await run({ approval: null }), "acceptance-approval-required", 0);
const malformedApproval = resign({ ...clone(approval), approvalNonce: "bad" });
aCode(await run({ approval: malformedApproval }), "acceptance-approval-malformed", 0);
const expiredApproval = resign({ ...clone(approval), expiresAt: "2026-07-30T18:01:30.000Z" });
aCode(await run({ approval: expiredApproval }), "acceptance-approval-expired", 0);
const wrongScopeApproval = resign({ ...clone(approval), maximumOutputTokens: 63 });
aCode(await run({ approval: wrongScopeApproval }), "acceptance-approval-scope-mismatch", 0);
aCode(await run({}, { approvalConsumptionStore: defaultStore("already-consumed") }), "acceptance-approval-already-consumed", 0);
const promptMismatch = { ...clone(acceptance.CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT), prompt: "wrong" };
aCode(await run({ contract: promptMismatch }), "acceptance-prompt-mismatch", 0);
const envelopeMismatch = { ...clone(acceptance.CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_CONTRACT), maximumOutputTokens: 63 };
aCode(await run({ contract: envelopeMismatch }), "acceptance-envelope-mismatch", 0);
aCode(await run({}, { killSwitchReader: async () => ({ killSwitchEngaged: true }) }), "kill-switch-blocked-before-provider-resolution", 0);
aCode(await run({}, { qualificationRunner: preflightFailure("model-missing") }), "preflight-model-missing", 0);
aCode(await run({}, { qualificationRunner: preflightFailure("model-name-mismatch") }), "preflight-model-name-mismatch", 0);
aCode(await run({}, { qualificationRunner: preflightFailure("installed-digest-mismatch") }), "preflight-installed-digest-mismatch", 0);
aCode(await run({}, { qualificationRunner: preflightFailure("metadata-mismatch") }), "preflight-metadata-mismatch", 0);
let killCheck = 0;
aCode(await run({}, { killSwitchReader: async () => ({ killSwitchEngaged: ++killCheck === 2 }) }), "kill-switch-blocked-before-generation", 0);
aCode(await run({}, { approvalConsumptionStore: defaultStore("attempt-budget-exhausted") }), "execution-attempt-budget-exhausted", 0);
const preCanceled = new AbortController(); preCanceled.abort();
aCode(await run({}, { signal: preCanceled.signal }), "acceptance-canceled", 0);
aCode(await run({}, { fetchFn: async () => { counters.injectedGenerationCalls += 1; throw new Error("offline"); } }), "ollama-unavailable", 1);
aCode(await run({}, { generationTimeoutMsForTesting: 1, fetchFn: async (_url, init) => { counters.injectedGenerationCalls += 1; return new Promise((_resolve, reject) => init.signal.addEventListener("abort", () => reject(abortError()), { once: true })); } }), "ollama-timeout", 1);
aCode(await run({}, { fetchFn: generationFetch({}, 500) }), "ollama-http-failure", 1);
aCode(await run({}, { fetchFn: async () => { counters.injectedGenerationCalls += 1; return response("x".repeat(65537)); } }), "generation-response-too-large", 1);
aCode(await run({}, { fetchFn: async () => { counters.injectedGenerationCalls += 1; return response("{"); } }), "malformed-generation-response", 1);
aCode(await run({}, { fetchFn: generationFetch({ ...validPayload, message: { ...validPayload.message, tool_calls: [] } }) }), "tool-call-response-rejected", 1);
aCode(await run({}, { fetchFn: generationFetch({ ...validPayload, message: { ...validPayload.message, images: [] } }) }), "image-response-rejected", 1);
aCode(await run({}, { fetchFn: generationFetch({ ...validPayload, model: "other:32b" }) }), "unexpected-model-substitution", 1);
aCode(await run({}, { fetchFn: generationFetch({ ...validPayload, message: { role: "assistant", content: "" } }) }), "empty-output", 1);
aCode(await run({}, { fetchFn: generationFetch({ ...validPayload, message: { role: "assistant", content: "x".repeat(257) } }) }), "oversized-output", 1);
aCode(await run({}, { fetchFn: generationFetch({ ...validPayload, eval_count: 65 }) }), "output-token-count-invalid", 1);
aCode(await run({}, { fetchFn: generationFetch({ ...validPayload, message: { role: "assistant", content: "wrong" } }) }), "acceptance-output-mismatch", 1);
aCode(await run({ implementationCheckpointCommit: "invalid" }), "acceptance-evidence-construction-failed", 1);
const afterDispatchController = new AbortController();
aCode(await run({}, { signal: afterDispatchController.signal, fetchFn: async (_url, init) => { counters.injectedGenerationCalls += 1; setTimeout(() => afterDispatchController.abort(), 0); return new Promise((_resolve, reject) => init.signal.addEventListener("abort", () => reject(abortError()), { once: true })); } }), "acceptance-canceled", 1);
assert(types.CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_REJECTION_CODES.every((code) => seenA.has(code)), "every acceptance rejection code is exercised");

const success = await run();
assert(success.ok && deepFrozen(success), "controlled acceptance succeeds once and is deeply frozen");
assert(success.value.executionProof.generationAttemptCount === 1 && success.value.executionProof.retryCount === 0 && success.value.executionProof.fallbackCount === 0, "success proves exactly one attempt and no retry/fallback");
assert(success.value.rawPromptStored === false && success.value.rawOutputStored === false && success.value.rawProviderResponseStored === false, "evidence excludes raw prompt, output, and provider response");
assert(!JSON.stringify(success.value).includes(acceptance.CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_PROMPT), "evidence does not contain raw prompt");
assert(!JSON.stringify(success.value).includes(acceptance.CODEXFORGE_QWEN25_CODER_32B_EXPECTED_OUTPUT), "evidence does not contain raw output");

function admit(evidence, overrides = {}) { return acceptance.admitCodexForgeQwen25Coder32BLiveAcceptanceEvidence({ evidence, expectedQualificationEvidenceSha256: qualified.contentDigest.sha256, expectedApprovalDigestSha256: approval.contentDigest.sha256, expectedImplementationCheckpointCommit: CHECKPOINT, reviewedAt: REVIEW_NOW, ...overrides }); }
function eCode(result, code) { assert(!result.ok && result.rejection.codes.includes(code), `admission code missing: ${code}`); seenE.add(code); }
const seenE = new Set();
eCode(admit({ acceptanceState: "rejected" }), "live-acceptance-not-succeeded");
let evidence = resign({ ...clone(success.value), schemaVersion: "wrong" }); eCode(admit(evidence), "evidence-schema-mismatch");
evidence = clone(success.value); evidence.contentDigest.sha256 = "a".repeat(64); eCode(admit(evidence), "evidence-digest-mismatch");
evidence = resign({ ...clone(success.value), identity: { ...clone(success.value.identity), modelId: "wrong" } }); eCode(admit(evidence), "candidate-binding-mismatch");
evidence = resign({ ...clone(success.value), qualificationEvidenceSha256: "a".repeat(64) }); eCode(admit(evidence), "qualification-binding-mismatch");
evidence = resign({ ...clone(success.value), approvalDigestSha256: "a".repeat(64) }); eCode(admit(evidence), "approval-binding-mismatch");
evidence = clone(success.value); evidence.executionProof.retryCount = 1; resign(evidence); eCode(admit(evidence), "attempt-proof-mismatch");
evidence = resign({ ...clone(success.value), rawOutputStored: true }); eCode(admit(evidence), "redaction-boundary-violation");
evidence = resign({ ...clone(success.value), outputUtf8Bytes: 34 }); eCode(admit(evidence), "execution-invariant-mismatch");
eCode(admit(success.value, { expectedImplementationCheckpointCommit: "a".repeat(40) }), "implementation-checkpoint-mismatch");
assert(types.CODEXFORGE_QWEN25_CODER_32B_EVIDENCE_ADMISSION_REJECTION_CODES.every((code) => seenE.has(code)), "every evidence-admission rejection code is exercised");
const admitted = admit(success.value);
assert(admitted.ok && admitted.value.productionRegistryAdmission === "not-granted" && admitted.value.routingAdmission === "not-granted" && admitted.value.executionAdmission === "not-granted", "evidence admission grants no production authority");

const malicious = [];
let getterCalls = 0;
const getter = {}; Object.defineProperty(getter, "value", { enumerable: true, get() { getterCalls += 1; return "x"; } }); malicious.push([getter, "accessor-property-rejected"]);
malicious.push([new Proxy({ value: 1 }, {}), "proxy-rejected"]);
malicious.push([{ value: Symbol("x") }, "symbol-value-rejected"]);
malicious.push([{ value: () => true }, "function-value-rejected"]);
const symbolKey = {}; symbolKey[Symbol("x")] = 1; malicious.push([symbolKey, "symbol-key-rejected"]);
const cycle = {}; cycle.self = cycle; malicious.push([cycle, "cycle-detected"]);
const shared = {}; const sharedRoot = { left: shared, right: shared }; malicious.push([sharedRoot, "shared-reference-detected"]);
malicious.push([new (class Exotic { constructor() { this.value = 1; } })(), "exotic-prototype-rejected"]);
const sparse = []; sparse.length = 1; malicious.push([sparse, "sparse-array-rejected"]);
for (const [value, code] of malicious) {
  let observed = null;
  try { canonical.canonicalizeCodexForgeQwen25Coder32BSliceRValue(value); } catch (error) { observed = error.code; }
  assert(observed === code, `malicious plain-data case rejected: ${code}`);
}
assert(getterCalls === 0, "malicious getter was never invoked");
const ordered = [...types.CODEXFORGE_QWEN25_CODER_32B_ACCEPTANCE_REJECTION_CODES];
assert(ordered.indexOf("qualification-required") < ordered.indexOf("ollama-timeout") && ordered.indexOf("ollama-timeout") < ordered.indexOf("acceptance-output-mismatch"), "rejection precedence is deterministic");

const catalogJson = JSON.stringify(catalog);
const catalogSha256 = crypto.createHash("sha256").update(catalogJson).digest("hex");
assert(catalog.catalogVersion === "codexforge-model-routing-v4", "catalog version unchanged");
assert(catalogSha256 === "06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b", "catalog digest unchanged");
assert(JSON.stringify(catalog.providers.map((entry) => entry.providerId)) === JSON.stringify(["ollama-local", "groq-cloud"]), "provider order unchanged");
assert(JSON.stringify(catalog.models.map((entry) => entry.modelKey)) === JSON.stringify(["ollama-local::gpt-oss:20b", "groq-cloud::openai/gpt-oss-20b", "groq-cloud::openai/gpt-oss-120b"]), "model order unchanged");
assert(!catalogJson.includes("qwen2.5-coder:32b"), "Qwen remains absent from production catalog");
assert(counters.globalFetch === 0 && counters.environmentReads === 0 && counters.credentialReads === 0, "global provider and credential traps remain zero");
assert(counters.childProcesses === 0 && counters.fileMutations === 0, "application child-process and persistence traps remain zero");
assert(counters.retry === 0 && counters.fallback === 0 && counters.reroute === 0 && counters.providerSubstitution === 0 && counters.modelSubstitution === 0 && counters.downloads === 0 && counters.groqCalls === 0 && counters.normalApproval === 0, "all forbidden execution counters remain zero");

process.env = originalEnvironment;
process.stdout.write(JSON.stringify({ success: true, catalogSha256, metadataResponseMaximumBytes: qualification.CODEXFORGE_QWEN25_CODER_32B_METADATA_RESPONSE_MAXIMUM_BYTES, counters, qualificationCodeCount: seenQ.size, acceptanceCodeCount: seenA.size, admissionCodeCount: seenE.size }));
})().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
'@

$tempNodeScript = Join-Path $env:TEMP "codexforge-slice-r-deterministic-smoke.js"
Set-Content -LiteralPath $tempNodeScript -Value $nodeScript -Encoding ASCII
try {
  $validationJson = & node $tempNodeScript $root
  if ($LASTEXITCODE -ne 0) { throw "[FAIL] Slice R Node smoke failed" }
} finally {
  if (Test-Path -LiteralPath $tempNodeScript) { Remove-Item -LiteralPath $tempNodeScript -Force }
}
$validation = $validationJson | ConvertFrom-Json
Assert-True ([bool]$validation.success) "Slice R deterministic Node smoke passed"
Assert-True ($validation.catalogSha256 -eq "06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b") "Catalog SHA-256 is exact"
Assert-True ([int]$validation.metadataResponseMaximumBytes -eq 262144) "Qualification metadata response ceiling remains exactly 262144 bytes"
Assert-True ([int]$validation.qualificationCodeCount -eq 16) "All sixteen qualification rejection codes executed"
Assert-True ([int]$validation.acceptanceCodeCount -eq 31) "All thirty-one acceptance rejection codes executed"
Assert-True ([int]$validation.admissionCodeCount -eq 10) "All ten evidence-admission rejection codes executed"
Assert-True ([int]$validation.counters.globalFetch -eq 0) "No global fetch or provider request"
Assert-True ([int]$validation.counters.credentialReads -eq 0) "No credential read"
Assert-True ([int]$validation.counters.childProcesses -eq 0) "No application child process"
Assert-True ([int]$validation.counters.fileMutations -eq 0) "No application persistence"

$productionFiles = @(
  Get-ChildItem -LiteralPath "src/app" -Recurse -File -Include "*.ts", "*.tsx"
  Get-ChildItem -LiteralPath "src/lib/codexforge/private-alpha" -Recurse -File -Include "*.ts", "*.tsx"
  Get-ChildItem -LiteralPath "src/lib/codexforge/ollama-provider" -Recurse -File -Include "*.ts", "*.tsx"
  Get-ChildItem -LiteralPath "src/lib/codexforge/groq-provider" -Recurse -File -Include "*.ts", "*.tsx"
  Get-Item -LiteralPath "src/lib/codexforge/model-routing/model-routing-provider-registry.ts"
  Get-Item -LiteralPath "src/lib/codexforge/model-routing/model-routing-catalog.ts"
  Get-Item -LiteralPath "src/lib/codexforge/model-routing/model-routing-policy.server.ts"
  Get-Item -LiteralPath "src/lib/codexforge/model-routing/index.ts"
)
$productionText = ($productionFiles | ForEach-Object { Get-Content -Raw -LiteralPath $_.FullName }) -join "`n"
Assert-True ($productionText -notmatch 'qwen2\.5-coder:32b|ollama-local::qwen2\.5-coder:32b') "Qwen remains absent from production runtime, UI, API, and selectors"

Write-Host "PASS: CodexForge Slice R exact Qwen qualification and controlled acceptance smoke"
