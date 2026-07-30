$ErrorActionPreference = "Stop"

function Assert-True([bool]$Condition, [string]$Message) {
  if (-not $Condition) {
    throw "[FAIL] $Message"
  }
  Write-Host "[PASS] $Message"
}

function Assert-FileExists([string]$Path) {
  Assert-True (Test-Path -LiteralPath $Path -PathType Leaf) "File exists: $Path"
}

function Assert-NoGitDiff([string]$Path, [string]$Message) {
  $diff = ((& git -c core.safecrlf=false diff --name-only -- $Path 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($diff)) $Message
}

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$foundationFiles = @(
  "docs/codexforge-registry-backed-free-local-provider-onboarding-admission-foundation-v0.md",
  "src/lib/codexforge/model-routing/onboarding/onboarding-types.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-constants.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-authority.server.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-canonicalization.server.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-validation.server.ts",
  "src/lib/codexforge/model-routing/onboarding/index.ts",
  "src/lib/codexforge/model-routing/onboarding/server.ts",
  "scripts/smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation.ps1"
)
foreach ($file in $foundationFiles) {
  Assert-FileExists $file
}

$serverFiles = @(
  "src/lib/codexforge/model-routing/onboarding/onboarding-authority.server.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-canonicalization.server.ts",
  "src/lib/codexforge/model-routing/onboarding/onboarding-validation.server.ts",
  "src/lib/codexforge/model-routing/onboarding/server.ts"
)
foreach ($file in $serverFiles) {
  Assert-True ((Get-Content -LiteralPath $file -TotalCount 1) -eq 'import "server-only";') "$file is server-only"
}

$clientIndex = Get-Content -Raw -LiteralPath "src/lib/codexforge/model-routing/onboarding/index.ts"
Assert-True ($clientIndex -notmatch '\.server') "Client-safe onboarding barrel exports no server module"

$serverSource = ($serverFiles | ForEach-Object { Get-Content -Raw -LiteralPath $_ }) -join "`n"
Assert-True ($serverSource -notmatch 'process\.env') "Foundation contains no environment read"
Assert-True ($serverSource -notmatch '\bfetch\s*\(') "Foundation contains no fetch call"
Assert-True ($serverSource -notmatch 'provider-client') "Foundation imports no provider client"
Assert-True ($serverSource -notmatch 'private-alpha-store') "Foundation imports no Private Alpha store"
Assert-True ($serverSource -notmatch '\b(?:writeFile|appendFile|rename|spawn|execFile|execSync)\s*\(') "Foundation contains no write or process primitive"

$productionSourceFiles = @(
  Get-ChildItem -LiteralPath "src" -Recurse -File -Include "*.ts", "*.tsx" |
    Where-Object { $_.FullName -notmatch '[\\/]model-routing[\\/]onboarding[\\/]' }
)
$productionImports = @(
  $productionSourceFiles |
    Select-String -Pattern 'model-routing/onboarding', 'model-routing\onboarding' -SimpleMatch
)
Assert-True ($productionImports.Count -eq 0) "No live production source imports the onboarding foundation"

foreach ($protectedPath in @(
  "src/lib/codexforge/model-routing/model-routing-provider-registry.ts",
  "src/lib/codexforge/model-routing/model-routing-catalog.ts",
  "src/lib/codexforge/model-routing/model-routing-types.ts",
  "src/lib/codexforge/model-routing/model-routing-policy.server.ts",
  "src/lib/codexforge/ollama-provider",
  "src/lib/codexforge/groq-provider",
  "src/lib/codexforge/private-alpha",
  "src/app/api/codexforge/private-alpha",
  "src/app/jarvis",
  "src/app/athena",
  ".codexforge/private-alpha"
)) {
  Assert-NoGitDiff $protectedPath "Protected production path remains unchanged: $protectedPath"
}

$aggregate = Get-Content -Raw -LiteralPath "scripts/smoke-codexforge-all.ps1"
$releaseBlock = [regex]::Match($aggregate, '(?s)\$currentReleaseGateScripts = @\((.*?)\r?\n\)').Groups[1].Value
$entries = @($releaseBlock -split "`n" | Where-Object { $_ -match '^  @\{' })
Assert-True ($entries.Count -eq 68) "Aggregate executable entry count is 68"
Assert-True (@($entries | Where-Object { $_ -match 'Required = \$true' }).Count -eq 65) "Aggregate required count is 65"
Assert-True (@($entries | Where-Object { $_ -match 'Required = \$false' }).Count -eq 3) "Aggregate optional count is 3"
Assert-True ($releaseBlock -match 'Free/Local Provider Registry Foundation"; File = "smoke-codexforge-free-local-provider-registry-foundation\.ps1"; Required = \$true \},\r?\n  @\{ Name = "Registry-Backed Free/Local Provider Onboarding and Admission Foundation"; File = "smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation\.ps1"; Required = \$true \},') "Slice P smoke follows Slice O in executable order"
Assert-True ($releaseBlock -match 'Registry-Backed Free/Local Provider Onboarding and Admission Foundation"; File = "smoke-codexforge-registry-backed-free-local-provider-onboarding-admission-foundation\.ps1"; Required = \$true \},\r?\n  @\{ Name = "First Exact Installed Local Model Candidate Declaration"; File = "smoke-codexforge-first-exact-installed-local-model-candidate-declaration\.ps1"; Required = \$true \},') "Slice Q smoke follows Slice P in executable order"
Assert-True ($releaseBlock -match 'First Exact Installed Local Model Candidate Declaration"; File = "smoke-codexforge-first-exact-installed-local-model-candidate-declaration\.ps1"; Required = \$true \},\r?\n  @\{ Name = "Exact Qwen 2\.5 Coder 32B Qualification and Controlled Acceptance Contract"; File = "smoke-codexforge-qwen2-5-coder-32b-qualification-controlled-live-acceptance-contract\.ps1"; Required = \$true \},') "Slice R smoke follows Slice Q in executable order"

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Module = require("module");
const childProcess = require("child_process");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function deepFrozen(value, seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return true;
  seen.add(value);
  if (!Object.isFrozen(value)) return false;
  return Reflect.ownKeys(value).every((key) => deepFrozen(value[key], seen));
}

function loadTypeScript(repoRoot) {
  const ts = require(path.join(repoRoot, "node_modules", "typescript"));
  const originalLoad = Module._load;
  Module._load = function(request, parent, isMain) {
    if (request === "server-only") return {};
    if (/provider-client\.server|private-alpha-store\.server|private-alpha-execution\.server|private-alpha-provider-runtime\.server|private-alpha-ollama\.server/.test(request)) {
      sideEffects.providerCapableModuleLoads += 1;
      throw new Error("provider-capable module must not load");
    }
    return originalLoad.apply(this, arguments);
  };
  const originalResolve = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request.startsWith("@/")) request = path.join(repoRoot, "src", request.slice(2));
    return originalResolve.call(this, request, parent, isMain, options);
  };
  require.extensions[".ts"] = function(module, filename) {
    const source = fs.readFileSync(filename, "utf8");
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        esModuleInterop: true,
      },
      fileName: filename,
    });
    module._compile(transpiled.outputText, filename);
  };
}

const sideEffects = {
  fetchCalls: 0,
  credentialReads: 0,
  providerCapableModuleLoads: 0,
  fileWrites: 0,
  childProcesses: 0,
  browserStorageReads: 0,
};

function instrumentRuntime() {
  global.fetch = async function() {
    sideEffects.fetchCalls += 1;
    throw new Error("fetch forbidden");
  };
  const originalEnvironment = process.env;
  process.env = new Proxy(originalEnvironment, {
    get(target, property, receiver) {
      if (typeof property === "string" && /KEY|SECRET|TOKEN|PASSWORD|CREDENTIAL|AUTH/i.test(property)) {
        sideEffects.credentialReads += 1;
        throw new Error("credential read forbidden");
      }
      return Reflect.get(target, property, receiver);
    },
  });
  for (const name of ["writeFileSync", "appendFileSync", "renameSync", "writeFile", "appendFile", "rename"]) {
    fs[name] = function() {
      sideEffects.fileWrites += 1;
      throw new Error("filesystem mutation forbidden");
    };
  }
  for (const name of ["spawn", "spawnSync", "exec", "execSync", "execFile", "execFileSync", "fork"]) {
    childProcess[name] = function() {
      sideEffects.childProcesses += 1;
      throw new Error("child process forbidden");
    };
  }
  for (const name of ["localStorage", "sessionStorage", "indexedDB"]) {
    Object.defineProperty(global, name, {
      configurable: true,
      get() {
        sideEffects.browserStorageReads += 1;
        throw new Error("browser storage forbidden");
      },
    });
  }
}

const SHA_A = "a".repeat(64);
const SHA_B = "b".repeat(64);
const COMMIT = "7deb7a858a4b9bbc193f3c6d70f074efc33833e5";
const AS_OF = "2026-07-30";

function evidence(evidenceId, kind, providerKey, modelKey, options = {}) {
  return {
    evidenceId,
    evidenceVersion: options.version || "v1",
    kind,
    scope: modelKey === null
      ? { level: "provider", providerKey }
      : { level: "model", providerKey, modelKey },
    provenance: options.provenance || "repository-deterministic-smoke",
    artifactSha256: options.artifactSha256 || SHA_A,
    checkpointCommit: COMMIT,
    observedOn: options.observedOn || "2026-07-29",
    validThrough: Object.prototype.hasOwnProperty.call(options, "validThrough")
      ? options.validThrough
      : kind === "free-tier-verification" ? "2026-08-31" : null,
  };
}

const LOCAL_PROVIDER = "candidate-local";
const LOCAL_MODEL_ID = "test-model:1";
const LOCAL_MODEL = `${LOCAL_PROVIDER}::${LOCAL_MODEL_ID}`;
const CLOUD_PROVIDER = "candidate-cloud";
const CLOUD_MODEL_ID = "free-model-1";
const CLOUD_MODEL = `${CLOUD_PROVIDER}::${CLOUD_MODEL_ID}`;

const E = {
  localProvider: evidence("local-provider-qualification", "provider-qualification", LOCAL_PROVIDER, null),
  localCapability: evidence("local-capability", "capability-verification", LOCAL_PROVIDER, LOCAL_MODEL),
  localModel: evidence("local-model-qualification", "model-qualification", LOCAL_PROVIDER, LOCAL_MODEL),
  localLive: evidence("local-live", "exact-model-live-acceptance", LOCAL_PROVIDER, LOCAL_MODEL, { provenance: "repository-live-acceptance" }),
  localManual: evidence("local-manual", "manual-execution-admission", LOCAL_PROVIDER, LOCAL_MODEL),
  cloudProvider: evidence("cloud-provider-qualification", "provider-qualification", CLOUD_PROVIDER, null),
  cloudCost: evidence("cloud-free-tier", "free-tier-verification", CLOUD_PROVIDER, CLOUD_MODEL),
  cloudCapability: evidence("cloud-capability", "capability-verification", CLOUD_PROVIDER, CLOUD_MODEL),
  cloudModel: evidence("cloud-model-qualification", "model-qualification", CLOUD_PROVIDER, CLOUD_MODEL),
  cloudLive: evidence("cloud-live", "exact-model-live-acceptance", CLOUD_PROVIDER, CLOUD_MODEL, { provenance: "repository-live-acceptance" }),
  cloudManual: evidence("cloud-manual", "manual-execution-admission", CLOUD_PROVIDER, CLOUD_MODEL),
};

function provider(locality, qualified = false) {
  const local = locality === "local";
  const providerKey = local ? LOCAL_PROVIDER : CLOUD_PROVIDER;
  return {
    packetKind: "provider",
    providerKey,
    identity: { providerId: providerKey, displayName: local ? "Local candidate" : "Cloud candidate" },
    adapter: {
      adapterId: local ? "candidate-local-adapter" : "candidate-cloud-adapter",
      protocol: local ? "ollama-native-http-v1" : "openai-compatible-chat-completions-v1",
    },
    locality,
    dataBoundary: local ? "local-machine" : "cloud-provider",
    credentialMode: local ? "none" : "server-environment-only",
    qualification: qualified
      ? { state: "qualified", evidence: clone(local ? E.localProvider : E.cloudProvider) }
      : { state: "not-qualified", evidence: null },
  };
}

function model(locality, stage = "candidate") {
  const local = locality === "local";
  const providerKey = local ? LOCAL_PROVIDER : CLOUD_PROVIDER;
  const modelId = local ? LOCAL_MODEL_ID : CLOUD_MODEL_ID;
  const modelKey = local ? LOCAL_MODEL : CLOUD_MODEL;
  const verified = stage !== "candidate";
  const qualified = stage === "qualified" || stage === "live" || stage === "manual";
  const live = stage === "live" || stage === "manual";
  const manual = stage === "manual";
  return {
    packetKind: "model",
    providerKey,
    modelKey,
    identity: { providerId: providerKey, modelId, displayName: local ? "Exact local model" : "Exact cloud model" },
    adapter: {
      adapterId: local ? "candidate-local-adapter" : "candidate-cloud-adapter",
      protocol: local ? "ollama-native-http-v1" : "openai-compatible-chat-completions-v1",
    },
    locality,
    dataBoundary: local ? "local-machine" : "cloud-provider",
    credentialMode: local ? "none" : "server-environment-only",
    capabilities: ["text-generation"],
    inputModalities: ["text"],
    outputModalities: ["text"],
    limits: {
      providerReportedContextWindowTokens: 8192,
      providerReportedMaximumOutputTokens: local ? 8192 : 4096,
      requestedAdmissionMaximumOutputTokens: local ? 4096 : 512,
    },
    cost: local
      ? {
          classification: "local-no-provider-token-charge",
          billingEnabled: false,
          trialCreditOnly: false,
          freeTierVerificationState: "not-applicable-local",
          evidence: null,
        }
      : {
          classification: "free-tier",
          billingEnabled: false,
          trialCreditOnly: false,
          freeTierVerificationState: verified ? "verified-current" : "unverified",
          evidence: verified ? clone(E.cloudCost) : null,
        },
    capabilityVerification: verified
      ? { state: "verified", evidence: clone(local ? E.localCapability : E.cloudCapability) }
      : { state: "unverified", evidence: null },
    modelQualification: qualified
      ? { state: "qualified", evidence: clone(local ? E.localModel : E.cloudModel) }
      : { state: "not-qualified", evidence: null },
    liveAcceptance: live
      ? { state: "accepted", evidence: clone(local ? E.localLive : E.cloudLive) }
      : { state: "not-accepted", evidence: null },
    manualExecutionAdmission: manual
      ? { state: "admitted", evidence: clone(local ? E.localManual : E.cloudManual) }
      : { state: "not-admitted", evidence: null },
    automaticRoutingAdmission: { state: "not-admitted", evidence: null, modes: [] },
    approvalRequirements: {
      manualApprovalBeforeEveryExecution: true,
      exactModelApprovalBinding: true,
      cloudDataTransferRequirement: local ? "not-required" : "explicit-operator-acknowledgement-required",
      requiredCloudDataTransferAcknowledgement: local ? null : "granted-for-approved-scope",
      requiredCloudExecutionAcknowledgement: local ? null : "granted-for-approved-scope-execution",
      requiredFreeTierExecutionConfirmation: local ? null : "operator-confirmed-current-free-tier",
    },
    executionPosture: {
      killSwitchCheckpoints: [
        "before-provider-adapter-resolution-or-credential-work",
        "immediately-before-provider-generation",
      ],
      maximumProviderAttempts: 1,
      retryAllowed: false,
      fallbackAllowed: false,
      reroutingAfterPersistenceAllowed: false,
      providerSubstitutionAllowed: false,
      modelSubstitutionAllowed: false,
      automaticModelSizeSwitchingAllowed: false,
      paidExecutionAllowed: false,
    },
    installationPosture: {
      state: local ? "operator-managed-local-install" : "not-applicable",
      automaticModelDownloadAllowed: false,
    },
  };
}

function bundle(packets) {
  return {
    schemaVersion: "codexforge-free-local-onboarding-v1",
    bundleId: "slice-p-smoke-candidate-bundle",
    contentDigest: null,
    packets,
    activation: {
      registryMembership: "candidate-only",
      catalogMembership: "candidate-only",
      routingVisibility: "none",
      uiVisibility: "none",
      runtimeVisibility: "none",
    },
  };
}

function routeRequest(catalog) {
  return {
    taskProfile: "general-text",
    requiredCapabilities: [],
    estimatedInputTokens: 1000,
    maximumOutputTokens: 500,
    candidateModelKeys: null,
    policy: {
      mode: "free-first",
      privacyRequirement: "cloud-allowed",
      maximumEstimatedCostUsd: 1,
      paidApprovalState: "not-granted",
      manualModelKey: null,
      paidExecutionAdmission: "request-scoped",
      freeTierConfirmationState: "confirmed-for-request",
    },
    runtimeSnapshots: catalog.models.map((entry) => ({
      modelKey: entry.modelKey,
      availability: "available",
      quotaState: entry.pricing.costClass === "free-tier" ? "available" : "not-applicable",
      observedLatencyMs: 25,
      observedAt: "2026-07-30T00:00:00.000Z",
    })),
  };
}

function hasCode(result, code) {
  return !result.ok && result.rejection.codes.includes(code);
}

function expectCode(validate, raw, code, message) {
  const result = validate(raw);
  assert(!result.ok && result.rejection.codes.includes(code), `${message}: expected ${code}`);
  return result;
}

function expectValid(validate, raw, message) {
  const result = validate(raw);
  assert(result.ok, `${message}: ${result.ok ? "" : JSON.stringify(result.rejection.codes)}`);
  return result.value;
}

function main() {
  const repoRoot = process.argv[2];
  loadTypeScript(repoRoot);

  const catalogPath = path.join(repoRoot, "src/lib/codexforge/model-routing/model-routing-catalog.ts");
  const routerPath = path.join(repoRoot, "src/lib/codexforge/model-routing/model-routing-policy.server.ts");
  const baselineCatalog = require(catalogPath).CODEXFORGE_PRODUCTION_MODEL_CATALOG;
  const router = require(routerPath);
  const catalogJsonBefore = JSON.stringify(baselineCatalog);
  const routingBefore = JSON.stringify(router.routeCodexForgeModel(routeRequest(baselineCatalog), baselineCatalog));

  instrumentRuntime();

  const authorityModule = require(path.join(repoRoot, "src/lib/codexforge/model-routing/onboarding/onboarding-authority.server.ts"));
  const canonicalModule = require(path.join(repoRoot, "src/lib/codexforge/model-routing/onboarding/onboarding-canonicalization.server.ts"));
  const validationModule = require(path.join(repoRoot, "src/lib/codexforge/model-routing/onboarding/onboarding-validation.server.ts"));
  const constants = require(path.join(repoRoot, "src/lib/codexforge/model-routing/onboarding/onboarding-constants.ts"));

  const authority = authorityModule.createCodexForgeOnboardingValidationAuthority({
    asOfDate: AS_OF,
    adapterBindings: [
      {
        adapterId: "candidate-cloud-adapter",
        providerKey: CLOUD_PROVIDER,
        protocol: "openai-compatible-chat-completions-v1",
        locality: "cloud",
        dataBoundary: "cloud-provider",
        credentialMode: "server-environment-only",
      },
      {
        adapterId: "candidate-local-adapter",
        providerKey: LOCAL_PROVIDER,
        protocol: "ollama-native-http-v1",
        locality: "local",
        dataBoundary: "local-machine",
        credentialMode: "none",
      },
    ],
    evidenceCatalog: Object.values(E).map(clone),
  });
  assert(deepFrozen(authority), "trusted authority is deeply frozen");

  const validate = (raw) => validationModule.validateCodexForgeOnboardingBundle(raw, authority);

  expectValid(validate, bundle([provider("local")]), "valid local provider candidate");
  const localRaw = bundle([model("local"), provider("local")]);
  const localAccepted = expectValid(validate, localRaw, "valid exact local model candidate");
  assert(localAccepted.packets[0].packetKind === "provider" && localAccepted.packets[1].packetKind === "model", "canonical packet ordering places providers before models");
  assert(localAccepted.packets[1].limits.requestedAdmissionMaximumOutputTokens === 4096, "local candidate ceiling remains 4096");
  assert(localAccepted.derivedModelStages[0].highestVerifiedStage === "candidate-declared", "validator derives candidate stage");

  const cloudCandidate = expectValid(validate, bundle([provider("cloud"), model("cloud")]), "valid unverified Free-cloud candidate");
  assert(cloudCandidate.derivedModelStages[0].highestVerifiedStage === "candidate-declared", "unverified Free-cloud candidate does not advance");
  assert(cloudCandidate.packets[1].automaticRoutingAdmission.state === "not-admitted", "Free-cloud candidate is not automatically admitted");

  const cloudLive = expectValid(validate, bundle([provider("cloud", true), model("cloud", "live")]), "verified Free-cloud candidate without manual admission");
  assert(cloudLive.derivedModelStages[0].highestVerifiedStage === "live-accepted", "verified live candidate remains not manually admitted");
  assert(cloudLive.packets[1].manualExecutionAdmission.state === "not-admitted", "live acceptance does not imply manual admission");
  assert(cloudLive.packets[1].automaticRoutingAdmission.state === "not-admitted", "live acceptance does not imply automatic admission");

  const manualCloud = expectValid(validate, bundle([provider("cloud", true), model("cloud", "manual")]), "exact-model manual evidence is accepted");
  assert(manualCloud.derivedModelStages[0].highestVerifiedStage === "manual-execution-admitted", "manual stage is derived only with prerequisites");
  const manualWithoutLive = bundle([provider("cloud", true), model("cloud", "candidate")]);
  manualWithoutLive.packets[1].manualExecutionAdmission = { state: "admitted", evidence: clone(E.cloudManual) };
  expectCode(validate, manualWithoutLive, "live-acceptance-prerequisite-missing", "manual admission requires live acceptance");

  assert(deepFrozen(localAccepted), "accepted result is recursively frozen");
  const originalName = localAccepted.packets[1].identity.displayName;
  localRaw.packets[0].identity.displayName = "mutated provider";
  localRaw.packets[1].identity.displayName = "mutated model";
  assert(localAccepted.packets[1].identity.displayName === originalName, "accepted result is isolated from original mutation");
  assert(localAccepted.packets[1] !== localRaw.packets[1], "accepted result is a fresh clone");

  const orderA = expectValid(validate, bundle([provider("local"), model("local")]), "first insertion order");
  const orderB = expectValid(validate, bundle([model("local"), provider("local")]), "equivalent insertion order");
  assert(orderA.contentDigest.sha256 === orderB.contentDigest.sha256, "equivalent insertion orders produce identical digest");
  assert(canonicalModule.canonicalizeCodexForgeOnboardingBundleContent(orderA) === canonicalModule.canonicalizeCodexForgeOnboardingBundleContent(orderB), "equivalent insertion orders produce identical canonical JSON");

  const suppliedDigest = bundle(orderA.packets.map(clone));
  suppliedDigest.contentDigest = clone(orderA.contentDigest);
  const suppliedAccepted = expectValid(validate, suppliedDigest, "matching incoming digest");
  assert(suppliedAccepted.contentDigest !== suppliedDigest.contentDigest, "accepted digest is freshly calculated");
  const wrongDigest = clone(suppliedDigest);
  wrongDigest.contentDigest.sha256 = SHA_B;
  expectCode(validate, wrongDigest, "content-digest-mismatch", "incoming digest mismatch");

  for (const automaticState of ["admitted", "eligible", "automatic"]) {
    const raw = bundle([provider("local"), model("local")]);
    raw.packets[1].automaticRoutingAdmission.state = automaticState;
    expectCode(validate, raw, "automatic-admission-rejected", `automatic state ${automaticState} is impossible`);
  }
  for (const mutation of [
    (automatic) => { automatic.evidence = clone(E.localManual); },
    (automatic) => { automatic.modes = ["free-first"]; },
    (automatic) => { automatic.eligible = true; },
  ]) {
    const raw = bundle([provider("local"), model("local")]);
    mutation(raw.packets[1].automaticRoutingAdmission);
    const result = validate(raw);
    assert(!result.ok, "every automatic-admission form is rejected");
  }

  for (const [field, value] of [
    ["registryMembership", "active"],
    ["catalogMembership", "active"],
    ["routingVisibility", "automatic"],
    ["uiVisibility", "visible"],
    ["runtimeVisibility", "visible"],
  ]) {
    const raw = bundle([provider("local")]);
    raw.activation[field] = value;
    expectCode(validate, raw, "activation-state-invalid", `activation field ${field} is impossible`);
  }
  const activationExtra = bundle([provider("local")]);
  activationExtra.activation.activated = true;
  assert(!validate(activationExtra).ok, "unknown activation form is rejected");

  function nestedInput(wrapperCount) {
    let value = null;
    for (let index = 0; index < wrapperCount; index += 1) value = { next: value };
    return { extra: value };
  }
  const depthAtLimit = nestedInput(11);
  assert(!hasCode(validate(depthAtLimit), "maximum-nesting-depth-exceeded"), "nesting depth 12 is accepted by the complexity gate");
  const depthOver = nestedInput(12);
  expectCode(validate, depthOver, "maximum-nesting-depth-exceeded", "nesting depth 13");

  const innerArrays = [];
  for (let index = 0; index < 256; index += 1) innerArrays.push(new Array(index < 254 ? 15 : 14).fill(0));
  const nodesAtLimit = { extra: innerArrays };
  assert(!hasCode(validate(nodesAtLimit), "maximum-visited-values-exceeded"), "4096 visited values are accepted by the complexity gate");
  innerArrays[255].push(0);
  expectCode(validate, nodesAtLimit, "maximum-visited-values-exceeded", "4097 visited values");

  const objectAtLimit = { extra: {} };
  for (let index = 0; index < 128; index += 1) objectAtLimit.extra[`field${String(index).padStart(3, "0")}`] = index;
  assert(!hasCode(validate(objectAtLimit), "maximum-object-keys-exceeded"), "128 keys in one object are accepted by the complexity gate");
  objectAtLimit.extra.field128 = 128;
  expectCode(validate, objectAtLimit, "maximum-object-keys-exceeded", "129 keys in one object");

  const arrayAtLimit = { items: new Array(256).fill(0) };
  assert(!hasCode(validate(arrayAtLimit), "maximum-array-items-exceeded"), "256 array items are accepted by the complexity gate");
  arrayAtLimit.items.push(0);
  expectCode(validate, arrayAtLimit, "maximum-array-items-exceeded", "257 array items");

  const stringAtLimit = bundle([provider("local")]);
  stringAtLimit.bundleId = "x".repeat(8192);
  expectValid(validate, stringAtLimit, "8192 UTF-16 code-unit string");
  stringAtLimit.bundleId += "x";
  expectCode(validate, stringAtLimit, "maximum-string-length-exceeded", "8193 UTF-16 code-unit string");

  const payloadBundle = bundle([]);
  for (let index = 0; index < 32; index += 1) {
    const packet = provider("local");
    packet.providerKey = `payload-provider-${String(index).padStart(2, "0")}`;
    packet.identity.providerId = packet.providerKey;
    packet.identity.displayName = "";
    packet.adapter.adapterId = `payload-adapter-${String(index).padStart(2, "0")}`;
    payloadBundle.packets.push(packet);
  }
  const basePayloadLength = Buffer.byteLength(canonicalModule.canonicalizeCodexForgeOnboardingBundleContent(payloadBundle), "utf8");
  let remaining = constants.CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumCanonicalUtf8Bytes - basePayloadLength;
  for (const packet of payloadBundle.packets) {
    const amount = Math.min(remaining, constants.CODEXFORGE_ONBOARDING_COMPLEXITY_LIMITS.maximumStringLength);
    packet.identity.displayName = "p".repeat(amount);
    remaining -= amount;
  }
  assert(remaining === 0, "payload boundary can be constructed within string limits");
  const canonicalAtLimit = canonicalModule.canonicalizeCodexForgeOnboardingBundleContent(payloadBundle);
  assert(Buffer.byteLength(canonicalAtLimit, "utf8") === 262144, "262144-byte canonical payload is accepted");
  const growPacket = payloadBundle.packets.find((packet) => packet.identity.displayName.length < 8192);
  growPacket.identity.displayName += "p";
  let payloadRejected = false;
  try { canonicalModule.canonicalizeCodexForgeOnboardingBundleContent(payloadBundle); } catch (error) {
    payloadRejected = error && error.code === "maximum-canonical-payload-exceeded";
  }
  assert(payloadRejected, "262145-byte canonical payload is rejected");

  const cycle = bundle([provider("local")]);
  cycle.loop = cycle;
  expectCode(validate, cycle, "cycle-detected", "cyclic input");
  const sharedChild = { value: 1 };
  expectCode(validate, { first: sharedChild, second: sharedChild }, "shared-reference-detected", "shared reference input");
  let getterCalls = 0;
  const accessor = {};
  Object.defineProperty(accessor, "value", { enumerable: true, get() { getterCalls += 1; return 1; } });
  expectCode(validate, accessor, "accessor-property-rejected", "accessor input");
  assert(getterCalls === 0, "input getters are never invoked");
  expectCode(validate, { value() {} }, "function-value-rejected", "function input");
  expectCode(validate, { value: Symbol("value") }, "symbol-value-rejected", "symbol value input");
  const symbolKey = {};
  symbolKey[Symbol("key")] = 1;
  expectCode(validate, symbolKey, "symbol-key-rejected", "symbol key input");
  expectCode(validate, { value: new Date() }, "exotic-prototype-rejected", "exotic prototype input");
  let proxyTrapCalls = 0;
  const proxy = new Proxy({}, { getPrototypeOf() { proxyTrapCalls += 1; throw new Error("trap"); } });
  expectCode(validate, proxy, "exotic-prototype-rejected", "proxy input");
  assert(proxyTrapCalls === 0, "proxy traps are not invoked");
  const sparse = bundle([provider("local")]);
  sparse.packets = new Array(1);
  expectCode(validate, sparse, "sparse-array-rejected", "sparse array input");

  const unknownNested = bundle([provider("local"), model("local")]);
  unknownNested.packets[1].identity.routingPower = "automatic";
  expectCode(validate, unknownNested, "unknown-field", "unknown nested field");

  const duplicateProvider = bundle([provider("local"), provider("local")]);
  expectCode(validate, duplicateProvider, "duplicate-provider-key", "duplicate provider key");
  const duplicateModel = bundle([provider("local"), model("local"), model("local")]);
  expectCode(validate, duplicateModel, "duplicate-model-key", "duplicate model key");

  const providerMismatch = bundle([provider("local")]);
  providerMismatch.packets[0].identity.providerId = "different-provider";
  expectCode(validate, providerMismatch, "provider-key-mismatch", "provider identity mismatch");
  const modelKeyMismatch = bundle([provider("local"), model("local")]);
  modelKeyMismatch.packets[1].modelKey = `${LOCAL_PROVIDER}::different-model`;
  expectCode(validate, modelKeyMismatch, "model-key-mismatch", "model key mismatch");
  const adapterMismatch = bundle([provider("local"), model("local")]);
  adapterMismatch.packets[1].adapter.adapterId = "different-adapter";
  expectCode(validate, adapterMismatch, "adapter-identity-mismatch", "provider/model adapter mismatch");
  const authorityAdapterMismatch = bundle([provider("local")]);
  authorityAdapterMismatch.packets[0].adapter.adapterId = "unknown-adapter";
  expectCode(validate, authorityAdapterMismatch, "unknown-adapter-identity", "authority adapter mismatch");
  const unknownProtocol = bundle([provider("local")]);
  unknownProtocol.packets[0].adapter.protocol = "unknown-protocol";
  expectCode(validate, unknownProtocol, "unsupported-provider-protocol", "unknown provider protocol");

  const boundaryImpersonation = bundle([provider("cloud"), model("cloud")]);
  boundaryImpersonation.packets[0].locality = "local";
  boundaryImpersonation.packets[0].dataBoundary = "local-machine";
  boundaryImpersonation.packets[0].credentialMode = "none";
  expectCode(validate, boundaryImpersonation, "authority-boundary-mismatch", "cloud provider cannot impersonate local authority");
  const credentialMismatch = bundle([provider("cloud")]);
  credentialMismatch.packets[0].credentialMode = "none";
  expectCode(validate, credentialMismatch, "credential-mode-mismatch", "cloud credential posture");

  const secretKey = bundle([provider("local")]);
  secretKey.packets[0].apiKey = "not-echoed-material";
  const secretKeyResult = expectCode(validate, secretKey, "secret-material-detected", "secret-looking key");
  const secretValue = bundle([provider("local")]);
  secretValue.bundleId = "gsk_12345678901234567890";
  const secretValueResult = expectCode(validate, secretValue, "secret-material-detected", "secret-looking value");
  const rejectionText = JSON.stringify([secretKeyResult.rejection, secretValueResult.rejection]);
  assert(!rejectionText.includes("apiKey") && !rejectionText.includes("gsk_") && !rejectionText.includes("not-echoed"), "secret rejection does not echo key or value");

  for (const classification of ["paid", "trial-credit", "billing-enabled", "unknown", "unverifiable"]) {
    const raw = bundle([provider("cloud"), model("cloud")]);
    raw.packets[1].cost.classification = classification;
    expectCode(validate, raw, "unsupported-cost-class", `${classification} cost class`);
  }
  const billing = bundle([provider("cloud"), model("cloud")]);
  billing.packets[1].cost.billingEnabled = true;
  expectCode(validate, billing, "billing-enabled", "billing-enabled candidate");
  const trial = bundle([provider("cloud"), model("cloud")]);
  trial.packets[1].cost.trialCreditOnly = true;
  expectCode(validate, trial, "trial-credit-only", "trial-credit-only candidate");

  const missingEvidence = bundle([provider("cloud", true), model("cloud", "live")]);
  missingEvidence.packets[1].capabilityVerification.evidence = null;
  expectCode(validate, missingEvidence, "missing-evidence-reference", "missing evidence reference");
  const wrongScope = bundle([provider("cloud", true), model("cloud", "live")]);
  wrongScope.packets[1].capabilityVerification.evidence.scope.modelKey = `${CLOUD_PROVIDER}::other`;
  expectCode(validate, wrongScope, "evidence-scope-mismatch", "evidence scope mismatch");
  const wrongVersion = bundle([provider("cloud", true), model("cloud", "live")]);
  wrongVersion.packets[1].capabilityVerification.evidence.evidenceVersion = "v2";
  expectCode(validate, wrongVersion, "evidence-version-mismatch", "evidence version mismatch");
  const wrongArtifact = bundle([provider("cloud", true), model("cloud", "live")]);
  wrongArtifact.packets[1].capabilityVerification.evidence.artifactSha256 = SHA_B;
  expectCode(validate, wrongArtifact, "evidence-reference-mismatch", "evidence digest mismatch");
  const staleEvidence = clone(E.cloudCost);
  staleEvidence.evidenceId = "cloud-free-tier-stale";
  staleEvidence.validThrough = "2026-07-29";
  const staleAuthority = authorityModule.createCodexForgeOnboardingValidationAuthority({
    asOfDate: AS_OF,
    adapterBindings: authority.adapterBindings,
    evidenceCatalog: [...authority.evidenceCatalog, staleEvidence],
  });
  const staleRaw = bundle([provider("cloud"), model("cloud", "qualified")]);
  staleRaw.packets[1].cost.evidence = clone(staleEvidence);
  const staleResult = validationModule.validateCodexForgeOnboardingBundle(staleRaw, staleAuthority);
  assert(hasCode(staleResult, "stale-evidence-reference"), "stale evidence is rejected");

  const inheritedEvidence = bundle([provider("local"), model("local")]);
  inheritedEvidence.packets[1].manualExecutionAdmission.evidence = clone(E.localProvider);
  expectCode(validate, inheritedEvidence, "admission-inheritance-forbidden", "model cannot inherit provider admission evidence");
  const providerScopedManual = bundle([provider("local", true), model("local", "live")]);
  providerScopedManual.packets[1].manualExecutionAdmission = { state: "admitted", evidence: clone(E.localProvider) };
  expectCode(validate, providerScopedManual, "evidence-scope-mismatch", "provider evidence cannot grant model admission");

  const localEscalation = bundle([provider("local"), model("local")]);
  localEscalation.packets[1].limits.requestedAdmissionMaximumOutputTokens = 4097;
  expectCode(validate, localEscalation, "output-envelope-escalation", "local 4097-token escalation");
  const cloudEscalation = bundle([provider("cloud"), model("cloud")]);
  cloudEscalation.packets[1].limits.requestedAdmissionMaximumOutputTokens = 513;
  expectCode(validate, cloudEscalation, "output-envelope-escalation", "cloud 513-token escalation");
  const contextTooSmall = bundle([provider("local"), model("local")]);
  contextTooSmall.packets[1].limits.providerReportedContextWindowTokens = 4095;
  expectCode(validate, contextTooSmall, "invalid-context-window", "context capacity below output envelope");
  const descriptiveLimit = bundle([provider("cloud"), model("cloud")]);
  descriptiveLimit.packets[1].limits.providerReportedMaximumOutputTokens = 99999;
  const descriptiveAccepted = expectValid(validate, descriptiveLimit, "descriptive provider limit cannot enlarge envelope");
  assert(descriptiveAccepted.packets[1].limits.requestedAdmissionMaximumOutputTokens === 512, "cloud admitted request remains 512 despite descriptive limit");

  const unsupportedCapability = bundle([provider("local"), model("local")]);
  unsupportedCapability.packets[1].capabilities = ["tools"];
  expectCode(validate, unsupportedCapability, "unsupported-capability", "unsupported capability");
  const unsupportedInput = bundle([provider("local"), model("local")]);
  unsupportedInput.packets[1].inputModalities = ["image"];
  expectCode(validate, unsupportedInput, "unsupported-input-modality", "unsupported input modality");
  const unsupportedOutput = bundle([provider("local"), model("local")]);
  unsupportedOutput.packets[1].outputModalities = ["audio"];
  expectCode(validate, unsupportedOutput, "unsupported-output-modality", "unsupported output modality");

  const mutationCases = [
    ["maximumProviderAttempts", 2, "attempt-posture-invalid"],
    ["retryAllowed", true, "retry-enabled"],
    ["fallbackAllowed", true, "fallback-enabled"],
    ["reroutingAfterPersistenceAllowed", true, "rerouting-enabled"],
    ["providerSubstitutionAllowed", true, "provider-substitution-enabled"],
    ["modelSubstitutionAllowed", true, "model-substitution-enabled"],
    ["automaticModelSizeSwitchingAllowed", true, "automatic-model-size-switching-enabled"],
    ["paidExecutionAllowed", true, "paid-execution-enabled"],
  ];
  for (const [field, value, code] of mutationCases) {
    const raw = bundle([provider("local"), model("local")]);
    raw.packets[1].executionPosture[field] = value;
    expectCode(validate, raw, code, `forbidden execution posture ${field}`);
  }
  const download = bundle([provider("local"), model("local")]);
  download.packets[1].installationPosture.automaticModelDownloadAllowed = true;
  expectCode(validate, download, "automatic-model-download-enabled", "automatic model download");
  const reorderedKillSwitch = bundle([provider("local"), model("local")]);
  reorderedKillSwitch.packets[1].executionPosture.killSwitchCheckpoints.reverse();
  expectCode(validate, reorderedKillSwitch, "kill-switch-posture-invalid", "reordered kill-switch checkpoints");
  const missingKillSwitch = bundle([provider("local"), model("local")]);
  missingKillSwitch.packets[1].executionPosture.killSwitchCheckpoints.pop();
  expectCode(validate, missingKillSwitch, "kill-switch-posture-invalid", "missing kill-switch checkpoint");

  const approvalCases = [
    ["manualApprovalBeforeEveryExecution", false, "manual-approval-requirement-missing"],
    ["exactModelApprovalBinding", false, "exact-model-approval-binding-missing"],
    ["cloudDataTransferRequirement", "not-required", "cloud-transfer-acknowledgement-missing"],
    ["requiredCloudDataTransferAcknowledgement", null, "cloud-transfer-acknowledgement-missing"],
    ["requiredCloudExecutionAcknowledgement", null, "cloud-execution-acknowledgement-missing"],
    ["requiredFreeTierExecutionConfirmation", null, "free-tier-execution-confirmation-missing"],
  ];
  for (const [field, value, code] of approvalCases) {
    const raw = bundle([provider("cloud"), model("cloud")]);
    raw.packets[1].approvalRequirements[field] = value;
    expectCode(validate, raw, code, `missing approval/acknowledgement ${field}`);
  }
  const localCloudClaim = bundle([provider("local"), model("local")]);
  localCloudClaim.packets[1].approvalRequirements.requiredCloudExecutionAcknowledgement = "granted-for-approved-scope-execution";
  expectCode(validate, localCloudClaim, "cloud-execution-acknowledgement-missing", "local candidate cannot claim cloud acknowledgement");

  const orderedIssues = bundle([provider("local"), model("local")]);
  orderedIssues.packets[1].inputModalities = ["image"];
  orderedIssues.packets[1].executionPosture.retryAllowed = true;
  orderedIssues.packets[1].executionPosture.fallbackAllowed = true;
  const orderedResult = validate(orderedIssues);
  assert(!orderedResult.ok, "multi-issue packet is rejected");
  assert(orderedResult.rejection.codes.indexOf("unsupported-input-modality") < orderedResult.rejection.codes.indexOf("retry-enabled"), "issues follow fixed rejection-code order");
  assert(orderedResult.rejection.codes.indexOf("retry-enabled") < orderedResult.rejection.codes.indexOf("fallback-enabled"), "retry precedes fallback deterministically");
  assert(new Set(orderedResult.rejection.issues.map((issue) => `${issue.code}|${issue.packetKind}|${issue.packetIndex}`)).size === orderedResult.rejection.issues.length, "issues are deduplicated");

  const cappedPackets = [provider("local")];
  for (let index = 0; index < 65; index += 1) cappedPackets.push(provider("local"));
  const cappedOne = validate(bundle(cappedPackets));
  const cappedTwo = validate(bundle(cappedPackets.map(clone)));
  assert(!cappedOne.ok && cappedOne.rejection.issues.length === 64, "returned issues are capped at 64");
  assert(cappedOne.rejection.truncated === true, "issue cap reports truncation");
  assert(cappedOne.rejection.issues[63].code === "rejection-limit-reached", "final issue position is reserved for rejection-limit-reached");
  assert(JSON.stringify(cappedOne.rejection) === JSON.stringify(cappedTwo.rejection), "issue ordering and cap are stable");

  const catalogAfter = require(catalogPath).CODEXFORGE_PRODUCTION_MODEL_CATALOG;
  const catalogJsonAfter = JSON.stringify(catalogAfter);
  const routingAfter = JSON.stringify(router.routeCodexForgeModel(routeRequest(catalogAfter), catalogAfter));
  assert(catalogJsonBefore === catalogJsonAfter, "catalog JSON remains identical after loading and exercising onboarding modules");
  assert(crypto.createHash("sha256").update(catalogJsonAfter).digest("hex") === "06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b", "catalog SHA-256 remains pinned");
  assert(catalogAfter.catalogVersion === "codexforge-model-routing-v4", "catalog version remains v4");
  assert(JSON.stringify(catalogAfter.providers.map((entry) => entry.providerId)) === JSON.stringify(["ollama-local", "groq-cloud"]), "provider order remains unchanged");
  assert(JSON.stringify(catalogAfter.models.map((entry) => entry.modelKey)) === JSON.stringify([
    "ollama-local::gpt-oss:20b",
    "groq-cloud::openai/gpt-oss-20b",
    "groq-cloud::openai/gpt-oss-120b",
  ]), "model order remains unchanged");
  assert(routingBefore === routingAfter, "existing routing output remains byte-for-byte unchanged");
  assert(!catalogJsonAfter.includes(LOCAL_PROVIDER) && !catalogJsonAfter.includes(CLOUD_PROVIDER), "no candidate appears in production catalog");

  assert(sideEffects.fetchCalls === 0, "zero network/fetch calls");
  assert(sideEffects.credentialReads === 0, "zero environment/credential reads");
  assert(sideEffects.providerCapableModuleLoads === 0, "zero provider client, generation, Private Alpha store, approval, or execution construction");
  assert(sideEffects.fileWrites === 0, "zero validator filesystem writes/appends/renames");
  assert(sideEffects.childProcesses === 0, "zero child processes, package commands, or model downloads");
  assert(sideEffects.browserStorageReads === 0, "zero browser storage access");
}

main();
'@

$tempNodeScript = Join-Path $env:TEMP "codexforge-registry-backed-onboarding-admission-smoke.js"
Set-Content -LiteralPath $tempNodeScript -Value $nodeScript -Encoding ASCII
try {
  & node $tempNodeScript $root
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Node smoke execution failed"
  }
} finally {
  if (Test-Path -LiteralPath $tempNodeScript) {
    Remove-Item -LiteralPath $tempNodeScript -Force
  }
}

Write-Host "[PASS] CodexForge Registry-Backed Free/Local Provider Onboarding and Admission Foundation smoke complete."
