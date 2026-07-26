param()

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-True {
  param([bool]$Condition, [string]$Message)
  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Message)
  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing $Message`: $Needle"
  }

  Write-Host "[PASS] $Message"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Message)
  if ([regex]::IsMatch($Haystack, $Pattern)) {
    throw "[FAIL] Unexpected $Message with pattern $Pattern"
  }

  Write-Host "[PASS] $Message"
}

function Assert-NoGitDiff {
  param([string]$Path, [string]$Message)
  $diff = ((& git diff --name-only -- $Path 2>$null) | Out-String).Trim()
  Assert-True ([string]::IsNullOrWhiteSpace($diff)) $Message
}

function Assert-PowerShellParses {
  param([string]$Path)
  $tokens = $null
  $parseErrors = $null
  [System.Management.Automation.Language.Parser]::ParseFile(
    (Join-Path $root $Path),
    [ref]$tokens,
    [ref]$parseErrors
  ) | Out-Null
  Assert-True ($parseErrors.Count -eq 0) "PowerShell parses: $Path"
}

Write-Host ""
Write-Host "=== CodexForge Groq live qualification admission smoke ==="

$allowedChangedFiles = @(
  "src/lib/codexforge/groq-provider/groq-provider-types.ts",
  "src/lib/codexforge/groq-provider/groq-provider-qualification.ts",
  "src/lib/codexforge/model-routing/model-routing-catalog.ts",
  "scripts/smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts/smoke-codexforge-model-routing-policy-foundation.ps1",
  "docs/codexforge-groq-live-qualification-admission-v0.md",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1"
)

$requiredFiles = $allowedChangedFiles | ForEach-Object { $_ -replace '/', '\' }
foreach ($file in $requiredFiles) {
  Assert-FileExists $file
}

foreach ($scriptPath in @(
  "scripts\smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts\smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts\smoke-codexforge-model-routing-policy-foundation.ps1"
)) {
  Assert-PowerShellParses $scriptPath
}

$statusLines = @(
  (& git status --short 2>$null) |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
)
$changedPaths = $statusLines |
  ForEach-Object {
    if ($_.Length -lt 4) {
      throw "[FAIL] Unexpected git status line: $_"
    }

    $_.Substring(3).Trim() -replace "\\", "/"
  } |
  Sort-Object -Unique
Assert-True ($changedPaths.Count -eq $allowedChangedFiles.Count) "Git changed scope contains exactly the seven allowed Slice G files"
foreach ($path in $changedPaths) {
  Assert-True ($allowedChangedFiles -contains $path) "Git changed scope stays within the allowed Slice G files: $path"
}

Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential module remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq client module remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha" "Current private-alpha source remains unchanged"
Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "Current private-alpha API routes remain unchanged"
Assert-NoGitDiff "src/app/jarvis" "Current Jarvis UI remains unchanged"
Assert-NoGitDiff ".codexforge/private-alpha" "Production .codexforge/private-alpha remains untouched"

$typesSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-types.ts"
$qualificationSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-qualification.ts"
$catalogSource = Get-Content -Raw "src\lib\codexforge\model-routing\model-routing-catalog.ts"
$sliceFSource = Get-Content -Raw "scripts\smoke-codexforge-groq-provider-qualification-foundation.ps1"
$sliceESource = Get-Content -Raw "scripts\smoke-codexforge-model-routing-policy-foundation.ps1"
$docSource = Get-Content -Raw "docs\codexforge-groq-live-qualification-admission-v0.md"
$newSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-groq-live-qualification-admission.ps1"
$credentialSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-credential.server.ts"
$clientSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-client.server.ts"
$modelRoutingSource = (
  Get-ChildItem -LiteralPath "src\lib\codexforge\model-routing" -File -Filter "*.ts" |
    Sort-Object FullName |
    ForEach-Object { Get-Content -Raw $_.FullName }
) -join "`n"
$jarvisSource = (
  Get-ChildItem -LiteralPath "src\app\jarvis" -Recurse -File |
    Sort-Object FullName |
    ForEach-Object { Get-Content -Raw $_.FullName }
) -join "`n"
$athenaAliasSource = Get-Content -Raw "src\app\athena\page.tsx"
$videoPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesSource = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"

$boundedAdmissionSource = $typesSource + "`n" + $qualificationSource + "`n" + $catalogSource + "`n" + $docSource
$runtimeSource = $credentialSource + "`n" + $clientSource + "`n" + $typesSource + "`n" + $qualificationSource + "`n" + $catalogSource

Assert-Contains $docSource "openai/gpt-oss-20b" "Slice G documentation records openai/gpt-oss-20b"
Assert-Contains $docSource "openai/gpt-oss-120b" "Slice G documentation records openai/gpt-oss-120b"
Assert-Contains $docSource 'provider-reported context window: `131072`' "Slice G documentation records the provider context window"
Assert-Contains $docSource 'provider-reported maximum output: `65536`' "Slice G documentation records the provider maximum output"
Assert-Contains $docSource 'CodexForge-approved maximum output remains `4096`' "Slice G documentation records the lower CodexForge output cap"
Assert-Contains $docSource "No credential is stored." "Slice G documentation records that no credential is stored"
Assert-Contains $docSource "No acceptance token is stored." "Slice G documentation records that no acceptance token is stored"

Assert-NotMatches $boundedAdmissionSource "GROQ_API_KEY|apiKey|Authorization|x-groq-request-id|prompt_tokens|completion_tokens|total_tokens|tool_calls|executed_tools" "Bounded admission metadata excludes credential and raw-response fields"

foreach ($forbiddenToken in @(
  'from\s+["'']groq-sdk["'']',
  'from\s+["'']openai["'']',
  'from\s+["'']axios["'']',
  'require\(["'']groq-sdk["'']\)',
  'require\(["'']openai["'']\)',
  'require\(["'']axios["'']\)'
)) {
  Assert-NotMatches $runtimeSource $forbiddenToken "Runtime source excludes $forbiddenToken"
}

Assert-NotMatches $modelRoutingSource "localStorage|sessionStorage|indexedDB" "Model-routing source excludes browser storage"
Assert-NotMatches $modelRoutingSource "process\.env" "Model-routing source excludes process.env reads"
Assert-NotMatches $jarvisSource "groq-cloud|openai/gpt-oss-20b|openai/gpt-oss-120b" "Current Jarvis UI does not expose Groq selector metadata"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena remains an alias of /jarvis"
foreach ($marker in @(
  "Mission brief",
  "Blocked action command deck",
  "Release summary"
)) {
  Assert-Contains $videoPanelSource $marker "/jarvis-video retains marker $marker"
}
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains strongly typed"

$plainTokenPattern = '\b' + 'a' + 'ny' + '\b'
$asTokenPattern = '\b' + 'as ' + 'a' + 'ny' + '\b'
$noCheckPattern = 'ts-' + 'nocheck'
$expectErrorPattern = 'ts-' + 'expect-error'
foreach ($sourcePath in $requiredFiles) {
  $sourceText = Get-Content -Raw $sourcePath
  Assert-NotMatches $sourceText $asTokenPattern "$sourcePath excludes the as-token escape"
  Assert-NotMatches $sourceText $noCheckPattern "$sourcePath excludes the no-check directive"
  Assert-NotMatches $sourceText $expectErrorPattern "$sourcePath excludes the expect-error directive"
  Assert-NotMatches $sourceText $plainTokenPattern "$sourcePath excludes the plain token escape"
}

$longestNewPathLength = ($requiredFiles | ForEach-Object { $_.Length } | Measure-Object -Maximum).Maximum
Assert-True ($longestNewPathLength -lt 220) "Longest new source path remains below 220 characters"

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const Module = require("module");
let ts = null;
let fetchCallCount = 0;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function loadTypeScript(repoRoot) {
  ts = require(path.join(repoRoot, "node_modules", "typescript"));
  global.fetch = async function() {
    fetchCallCount += 1;
    throw new Error("fetch should not run in routing admission smoke");
  };

  const originalLoad = Module._load;
  Module._load = function(request, parent, isMain) {
    if (request === "server-only") {
      return {};
    }

    return originalLoad.apply(this, arguments);
  };

  const originalResolveFilename = Module._resolveFilename;
  Module._resolveFilename = function(request, parent, isMain, options) {
    if (request.startsWith("@/")) {
      request = path.join(repoRoot, "src", request.slice(2));
    }

    return originalResolveFilename.call(this, request, parent, isMain, options);
  };

  const compileTypeScript = (module, filename) => {
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

  require.extensions[".ts"] = compileTypeScript;
  require.extensions[".tsx"] = compileTypeScript;
}

function provider(id, locality, catalogState, options) {
  const config = options || {};
  return {
    providerId: id,
    label: Object.prototype.hasOwnProperty.call(config, "label") ? config.label : id,
    locality,
    dataBoundary: Object.prototype.hasOwnProperty.call(config, "dataBoundary")
      ? config.dataBoundary
      : locality === "local"
        ? "local-machine"
        : "cloud-provider",
    catalogState,
    adapterId: Object.prototype.hasOwnProperty.call(config, "adapterId")
      ? config.adapterId
      : id + "-adapter",
    notes: Object.prototype.hasOwnProperty.call(config, "notes") ? config.notes : [],
  };
}

function pricing(costClass, options) {
  const config = options || {};
  if (costClass === "local-no-provider-token-charge") {
    return {
      costClass,
      currency: "USD",
      inputUsdPerMillionTokens: 0,
      outputUsdPerMillionTokens: 0,
      pricingAsOf: null,
      sourceLabel: "local test",
    };
  }

  if (costClass === "free-tier") {
    return {
      costClass,
      currency: "USD",
      inputUsdPerMillionTokens: 0,
      outputUsdPerMillionTokens: 0,
      pricingAsOf: Object.prototype.hasOwnProperty.call(config, "pricingAsOf")
        ? config.pricingAsOf
        : null,
      sourceLabel: Object.prototype.hasOwnProperty.call(config, "sourceLabel")
        ? config.sourceLabel
        : "free test",
    };
  }

  if (costClass === "paid") {
    return {
      costClass,
      currency: "USD",
      inputUsdPerMillionTokens:
        Object.prototype.hasOwnProperty.call(config, "input") ? config.input : 1.0,
      outputUsdPerMillionTokens:
        Object.prototype.hasOwnProperty.call(config, "output") ? config.output : 2.0,
      pricingAsOf:
        Object.prototype.hasOwnProperty.call(config, "pricingAsOf")
          ? config.pricingAsOf
          : "2026-07-26",
      sourceLabel: "paid test",
    };
  }

  return {
    costClass,
    currency: "USD",
    inputUsdPerMillionTokens: null,
    outputUsdPerMillionTokens: null,
    pricingAsOf: null,
    sourceLabel: "unknown test",
  };
}

function model(buildKey, input) {
  return {
    modelKey: buildKey(input.providerId, input.modelId),
    providerId: input.providerId,
    modelId: input.modelId,
    label: Object.prototype.hasOwnProperty.call(input, "label")
      ? input.label
      : input.modelId,
    routingState: Object.prototype.hasOwnProperty.call(input, "routingState")
      ? input.routingState
      : "automatic",
    qualificationState: Object.prototype.hasOwnProperty.call(input, "qualificationState")
      ? input.qualificationState
      : "live-verified",
    capabilities: Object.prototype.hasOwnProperty.call(input, "capabilities")
      ? input.capabilities
      : ["text-generation"],
    approvedMaximumOutputTokens:
      Object.prototype.hasOwnProperty.call(input, "approvedMaximumOutputTokens")
        ? input.approvedMaximumOutputTokens
        : 4096,
    contextWindowTokens: Object.prototype.hasOwnProperty.call(input, "contextWindowTokens")
      ? input.contextWindowTokens
      : null,
    pricing: Object.prototype.hasOwnProperty.call(input, "pricing")
      ? input.pricing
      : pricing("local-no-provider-token-charge"),
    taskProfileScores: Object.prototype.hasOwnProperty.call(input, "taskProfileScores")
      ? input.taskProfileScores
      : {},
    evidence: Object.prototype.hasOwnProperty.call(input, "evidence")
      ? input.evidence
      : ["test evidence"],
  };
}

function snapshot(version, providers, models) {
  return {
    catalogVersion: version,
    providers,
    models,
  };
}

function runtimeForModels(models, overrides) {
  const overrideMap = overrides || {};
  return models.map((entry) => {
    const override = overrideMap[entry.modelKey] || {};
    const costClass = entry.pricing.costClass;
    const defaultQuotaState = costClass === "free-tier" ? "available" : "not-applicable";
    return {
      modelKey: entry.modelKey,
      availability: Object.prototype.hasOwnProperty.call(override, "availability")
        ? override.availability
        : "available",
      quotaState: Object.prototype.hasOwnProperty.call(override, "quotaState")
        ? override.quotaState
        : defaultQuotaState,
      observedLatencyMs: Object.prototype.hasOwnProperty.call(override, "observedLatencyMs")
        ? override.observedLatencyMs
        : 25,
      observedAt: Object.prototype.hasOwnProperty.call(override, "observedAt")
        ? override.observedAt
        : "2026-07-26T00:00:00.000Z",
    };
  });
}

function routeRequest(policyConfig, runtimeSnapshots, requiredCapabilities, maximumOutputTokens, taskProfile, estimatedInputTokens) {
  return {
    taskProfile: taskProfile || "general-text",
    requiredCapabilities: requiredCapabilities || [],
    estimatedInputTokens:
      arguments.length > 5 ? estimatedInputTokens : 1000,
    maximumOutputTokens:
      arguments.length > 3 ? maximumOutputTokens : 500,
    policy: policyConfig,
    runtimeSnapshots,
  };
}

function policy(mode, options) {
  const config = options || {};
  return {
    mode,
    privacyRequirement: Object.prototype.hasOwnProperty.call(config, "privacyRequirement")
      ? config.privacyRequirement
      : "cloud-allowed",
    maximumEstimatedCostUsd:
      Object.prototype.hasOwnProperty.call(config, "maximumEstimatedCostUsd")
        ? config.maximumEstimatedCostUsd
        : 1,
    paidApprovalState: Object.prototype.hasOwnProperty.call(config, "paidApprovalState")
      ? config.paidApprovalState
      : "not-granted",
    manualModelKey:
      Object.prototype.hasOwnProperty.call(config, "manualModelKey")
        ? config.manualModelKey
        : null,
  };
}

function candidateByKey(decision, modelKey) {
  const found = decision.candidates.find((candidate) => candidate.modelKey === modelKey);
  assert(Boolean(found), "missing candidate " + modelKey);
  return found;
}

function hasCode(values, expected) {
  return Array.isArray(values) && values.includes(expected);
}

function assertErrorIncludes(errors, expected, message) {
  assert(errors.some((entry) => String(entry).includes(expected)), message);
}

function main() {
  const repoRoot = process.argv[2];
  loadTypeScript(repoRoot);

  const groqTypesModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-types.ts"
  ));
  const groqQualificationModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-qualification.ts"
  ));
  const modelRoutingIndexModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "model-routing",
    "index.ts"
  ));
  const routerModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "model-routing",
    "model-routing-policy.server.ts"
  ));

  const allowedModels = groqTypesModule.CODEXFORGE_GROQ_MODEL_IDS;
  const qualification = groqQualificationModule.CODEXFORGE_GROQ_PROVIDER_QUALIFICATION;

  assert(
    groqTypesModule.CODEXFORGE_GROQ_QUALIFICATION_VERSION ===
      "codexforge-groq-qualification-v1",
    "qualification version constant is v1"
  );
  assert(qualification.qualificationVersion === "codexforge-groq-qualification-v1", "qualification record version is v1");
  assert(qualification.providerId === "groq-cloud", "qualification provider ID is groq-cloud");
  assert(qualification.adapterState === "live-verified", "qualification adapter state is live-verified");
  assert(qualification.productionRoutingState === "manual-only", "qualification production routing state is manual-only");
  assert(qualification.models.length === 2, "qualification contains exactly two models");
  assert(
    qualification.models[0].modelId === allowedModels[0] &&
      qualification.models[1].modelId === allowedModels[1],
    "qualification model ordering is exact"
  );

  for (const entry of qualification.models) {
    assert(entry.qualificationState === "live-verified", "qualification model is live-verified");
    assert(entry.routingState === "manual-only", "qualification model is manual-only");
    assert(entry.accountTierState === "operator-confirmed-free", "qualification model account tier is operator-confirmed-free");
    assert(entry.dataBoundary === "cloud-provider", "qualification model data boundary is cloud-provider");
    assert(entry.capabilities.length === 1 && entry.capabilities[0] === "text-generation", "qualification model capability is text-generation only");
    assert(entry.liveVerifiedOn === "2026-07-26", "qualification liveVerifiedOn is exact");
    assert(entry.operatorTierConfirmedOn === "2026-07-26", "qualification operatorTierConfirmedOn is exact");
    assert(entry.providerReportedContextWindowTokens === 131072, "qualification provider context window is exact");
    assert(entry.providerReportedMaximumOutputTokens === 65536, "qualification provider maximum output is exact");
    assert(entry.approvedMaximumOutputTokens === 4096, "qualification approved maximum output remains exact");
    assert(entry.evidence.includes("authenticated model discovery completed on 2026-07-26"), "qualification evidence records discovery");
    assert(entry.evidence.includes("exact visible-output qualification completed on 2026-07-26"), "qualification evidence records exact visible-output");
    assert(entry.evidence.includes("reasoning was not exposed in live qualification"), "qualification evidence records reasoning privacy");
    assert(entry.evidence.includes("operator confirmed Groq Free tier on 2026-07-26"), "qualification evidence records operator-confirmed Free tier");
  }

  assert(Object.isFrozen(qualification), "authoritative qualification record is frozen");
  assert(Object.isFrozen(qualification.models), "authoritative qualification model list is frozen");
  const qualificationCloneA = groqQualificationModule.getCodexForgeGroqProviderQualification();
  const qualificationCloneB = groqQualificationModule.getCodexForgeGroqProviderQualification();
  assert(qualificationCloneA !== qualification, "qualification getter returns a distinct record");
  assert(qualificationCloneA !== qualificationCloneB, "qualification getter returns distinct clones");
  assert(qualificationCloneA.models !== qualification.models, "qualification getter clones the model list");
  assert(qualificationCloneA.models[0] !== qualification.models[0], "qualification getter clones nested model records");
  assert(qualificationCloneA.models[0].evidence !== qualification.models[0].evidence, "qualification getter clones nested evidence");

  const productionCatalog = modelRoutingIndexModule.CODEXFORGE_PRODUCTION_MODEL_CATALOG;
  assert(
    modelRoutingIndexModule.CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION ===
      "codexforge-model-routing-v2",
    "production catalog version is v2"
  );
  assert(productionCatalog.providers.length === 2, "production catalog contains exactly two providers");
  const localProvider = productionCatalog.providers.find(
    (entry) => entry.providerId === "ollama-local"
  );
  const groqProvider = productionCatalog.providers.find(
    (entry) => entry.providerId === "groq-cloud"
  );
  assert(Boolean(localProvider), "production catalog contains Local Ollama provider");
  assert(Boolean(groqProvider), "production catalog contains Groq Cloud provider");
  assert(localProvider.label === "Local Ollama", "Local Ollama provider remains unchanged");
  assert(localProvider.locality === "local", "Local Ollama locality remains local");
  assert(localProvider.dataBoundary === "local-machine", "Local Ollama data boundary remains local-machine");
  assert(localProvider.catalogState === "enabled", "Local Ollama remains enabled");
  assert(groqProvider.catalogState === "enabled", "Groq provider is enabled");
  assert(groqProvider.locality === "cloud", "Groq provider locality is cloud");
  assert(groqProvider.dataBoundary === "cloud-provider", "Groq provider data boundary is cloud-provider");
  assert(groqProvider.adapterId === "groq-provider-client", "Groq provider adapter id is exact");
  assert(groqProvider.notes.includes("Manual routing metadata only."), "Groq provider notes keep manual routing only");
  assert(groqProvider.notes.includes("Operator-confirmed Free tier on 2026-07-26."), "Groq provider notes record operator-confirmed Free tier");

  assert(productionCatalog.models.length === 3, "production catalog contains exactly three models");
  const localModel = productionCatalog.models.find(
    (entry) => entry.modelKey === "ollama-local::gpt-oss:20b"
  );
  const groq20Model = productionCatalog.models.find(
    (entry) => entry.modelKey === "groq-cloud::openai/gpt-oss-20b"
  );
  const groq120Model = productionCatalog.models.find(
    (entry) => entry.modelKey === "groq-cloud::openai/gpt-oss-120b"
  );
  assert(Boolean(localModel), "Local Ollama model key remains exact");
  assert(Boolean(groq20Model), "Groq 20b model key is exact");
  assert(Boolean(groq120Model), "Groq 120b model key is exact");
  assert(localModel.routingState === "automatic", "Local Ollama model remains automatic");
  assert(localModel.qualificationState === "live-verified", "Local Ollama model remains live-verified");

  for (const groqModel of [groq20Model, groq120Model]) {
    assert(groqModel.routingState === "manual-only", "Groq catalog model is manual-only");
    assert(groqModel.qualificationState === "live-verified", "Groq catalog model is live-verified");
    assert(groqModel.pricing.costClass === "free-tier", "Groq catalog model cost class is free-tier");
    assert(groqModel.pricing.inputUsdPerMillionTokens === 0, "Groq catalog model input price is zero");
    assert(groqModel.pricing.outputUsdPerMillionTokens === 0, "Groq catalog model output price is zero");
    assert(groqModel.pricing.pricingAsOf === "2026-07-26", "Groq catalog pricingAsOf is exact");
    assert(groqModel.contextWindowTokens === 131072, "Groq catalog context window is exact");
    assert(groqModel.approvedMaximumOutputTokens === 4096, "Groq catalog approved maximum output is exact");
    assert(Object.keys(groqModel.taskProfileScores).length === 0, "Groq catalog task-profile scores stay empty");
    assert(groqModel.evidence.includes("reasoning not exposed in live qualification"), "Groq catalog evidence records reasoning privacy");
  }

  assert(
    modelRoutingIndexModule.validateCodexForgeModelCatalog(productionCatalog).length === 0,
    "production catalog validates successfully"
  );

  const clonedCatalog = modelRoutingIndexModule.getCodexForgeProductionModelCatalog();
  const clonedGroqProvider = clonedCatalog.providers.find(
    (entry) => entry.providerId === "groq-cloud"
  );
  const clonedGroq20Model = clonedCatalog.models.find(
    (entry) => entry.modelKey === "groq-cloud::openai/gpt-oss-20b"
  );
  clonedGroqProvider.notes[0] = "mutated note";
  clonedGroq20Model.pricing.sourceLabel = "mutated price source";
  clonedGroq20Model.evidence[0] = "mutated evidence";
  clonedCatalog.providers.push(provider("mutated-provider", "local", "enabled"));
  clonedCatalog.models.push(model(modelRoutingIndexModule.buildCodexForgeModelKey, {
    providerId: "ollama-local",
    modelId: "mutated-extra",
  }));
  const freshCatalog = modelRoutingIndexModule.getCodexForgeProductionModelCatalog();
  const freshGroqProvider = freshCatalog.providers.find(
    (entry) => entry.providerId === "groq-cloud"
  );
  const freshGroq20Model = freshCatalog.models.find(
    (entry) => entry.modelKey === "groq-cloud::openai/gpt-oss-20b"
  );
  assert(freshCatalog.providers.length === 2, "catalog clone mutations do not alter provider count");
  assert(freshCatalog.models.length === 3, "catalog clone mutations do not alter model count");
  assert(freshGroqProvider.notes[0] === "Live-qualified for discovery and visible text generation on 2026-07-26.", "catalog clone mutations do not alter Groq notes");
  assert(freshGroq20Model.pricing.sourceLabel === "Operator-confirmed Groq Free tier on 2026-07-26; account limits may change", "catalog clone mutations do not alter Groq pricing");
  assert(freshGroq20Model.evidence[0] === "codexforge-groq-provider-qualification-foundation-clean", "catalog clone mutations do not alter Groq evidence");

  const buildKey = modelRoutingIndexModule.buildCodexForgeModelKey;
  const localBoundaryMismatchErrors = modelRoutingIndexModule.validateCodexForgeModelCatalog(
    snapshot("invalid-local-boundary", [
      provider("bad-local-boundary", "local", "enabled", { dataBoundary: "cloud-provider" }),
    ], [])
  );
  assertErrorIncludes(
    localBoundaryMismatchErrors,
    "Local provider must use local-machine data boundary",
    "catalog validation rejects local/cloud boundary mismatch"
  );
  const cloudBoundaryMismatchErrors = modelRoutingIndexModule.validateCodexForgeModelCatalog(
    snapshot("invalid-cloud-boundary", [
      provider("bad-cloud-boundary", "cloud", "enabled", { dataBoundary: "local-machine" }),
    ], [])
  );
  assertErrorIncludes(
    cloudBoundaryMismatchErrors,
    "Cloud provider must use cloud-provider data boundary",
    "catalog validation rejects cloud/local boundary mismatch"
  );

  const manualDisabledProviderErrors = modelRoutingIndexModule.validateCodexForgeModelCatalog(
    snapshot("invalid-manual-disabled-provider", [
      provider("disabled-cloud", "cloud", "disabled"),
    ], [
      model(buildKey, {
        providerId: "disabled-cloud",
        modelId: "manual-free",
        routingState: "manual-only",
        qualificationState: "live-verified",
        pricing: pricing("free-tier"),
      }),
    ])
  );
  assertErrorIncludes(
    manualDisabledProviderErrors,
    "Manual-only routing requires an enabled provider",
    "catalog validation rejects manual-only model on disabled provider"
  );

  const manualUnqualifiedErrors = modelRoutingIndexModule.validateCodexForgeModelCatalog(
    snapshot("invalid-manual-unqualified", [
      provider("enabled-cloud", "cloud", "enabled"),
    ], [
      model(buildKey, {
        providerId: "enabled-cloud",
        modelId: "manual-discovered",
        routingState: "manual-only",
        qualificationState: "discovered",
        pricing: pricing("free-tier"),
      }),
    ])
  );
  assertErrorIncludes(
    manualUnqualifiedErrors,
    "Manual-only routing requires deterministic-tested or live-verified qualification",
    "catalog validation rejects unqualified manual-only model"
  );

  const manualDisabledModelErrors = modelRoutingIndexModule.validateCodexForgeModelCatalog(
    snapshot("invalid-manual-disabled-model", [
      provider("enabled-cloud", "cloud", "enabled"),
    ], [
      model(buildKey, {
        providerId: "enabled-cloud",
        modelId: "manual-disabled",
        routingState: "manual-only",
        qualificationState: "disabled",
        pricing: pricing("free-tier"),
      }),
    ])
  );
  assertErrorIncludes(
    manualDisabledModelErrors,
    "Disabled or deprecated models cannot be manual-only",
    "catalog validation rejects disabled manual-only model"
  );
  const manualDeprecatedModelErrors = modelRoutingIndexModule.validateCodexForgeModelCatalog(
    snapshot("invalid-manual-deprecated-model", [
      provider("enabled-cloud", "cloud", "enabled"),
    ], [
      model(buildKey, {
        providerId: "enabled-cloud",
        modelId: "manual-deprecated",
        routingState: "manual-only",
        qualificationState: "deprecated",
        pricing: pricing("free-tier"),
      }),
    ])
  );
  assertErrorIncludes(
    manualDeprecatedModelErrors,
    "Disabled or deprecated models cannot be manual-only",
    "catalog validation rejects deprecated manual-only model"
  );

  const cloudLocalNoChargeErrors = modelRoutingIndexModule.validateCodexForgeModelCatalog(
    snapshot("invalid-cloud-local-cost", [
      provider("enabled-cloud", "cloud", "enabled"),
    ], [
      model(buildKey, {
        providerId: "enabled-cloud",
        modelId: "local-cost-cloud",
        pricing: pricing("local-no-provider-token-charge"),
      }),
    ])
  );
  assertErrorIncludes(
    cloudLocalNoChargeErrors,
    "Local no-charge pricing is invalid on a cloud provider",
    "catalog validation rejects local-no-provider-token-charge on cloud provider"
  );

  const productionRuntime = runtimeForModels(productionCatalog.models);
  const localOnlyDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("local-only"), productionRuntime),
    productionCatalog
  );
  assert(localOnlyDecision.selectedModelKey === localModel.modelKey, "local-only never selects Groq");

  const freeOnlyDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("free-only"), productionRuntime),
    productionCatalog
  );
  assert(freeOnlyDecision.selectedModelKey === localModel.modelKey, "free-only never selects Groq automatically");

  const freeFirstDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("free-first"), productionRuntime),
    productionCatalog
  );
  assert(freeFirstDecision.selectedModelKey === localModel.modelKey, "free-first never selects Groq automatically when local is available");

  const bestBudgetDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("best-within-budget"), productionRuntime),
    productionCatalog
  );
  assert(bestBudgetDecision.selectedModelKey === localModel.modelKey, "best-within-budget never selects Groq automatically");

  const freeFirstNoLocalDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("free-first"),
      runtimeForModels(productionCatalog.models, {
        [localModel.modelKey]: { availability: "unavailable" },
      })
    ),
    productionCatalog
  );
  assert(freeFirstNoLocalDecision.status === "no-eligible-model", "free-first returns no-eligible-model when only manual-only Groq models remain");

  const manual20Decision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: groq20Model.modelKey }),
      productionRuntime,
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(manual20Decision.status === "selected", "manual mode selects openai/gpt-oss-20b when all gates pass");
  assert(manual20Decision.selectedModelKey === groq20Model.modelKey, "manual mode selects the exact Groq 20b key");
  assert(manual20Decision.estimatedCostUsd === 0, "manual Groq 20b decision has zero estimated cost");

  const manual120Decision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: groq120Model.modelKey }),
      productionRuntime,
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(manual120Decision.status === "selected", "manual mode selects openai/gpt-oss-120b when all gates pass");
  assert(manual120Decision.selectedModelKey === groq120Model.modelKey, "manual mode selects the exact Groq 120b key");
  assert(manual120Decision.estimatedCostUsd === 0, "manual Groq 120b decision has zero estimated cost");

  const localRequiredDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", {
        manualModelKey: groq20Model.modelKey,
        privacyRequirement: "local-required",
      }),
      productionRuntime,
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(localRequiredDecision.status === "manual-selection-invalid", "local-required privacy rejects manual Groq");
  assert(hasCode(candidateByKey(localRequiredDecision, groq20Model.modelKey).rejectionCodes, "privacy-local-required"), "local-required privacy adds the expected rejection code");

  const unavailableManualDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: groq20Model.modelKey }),
      runtimeForModels(productionCatalog.models, {
        [groq20Model.modelKey]: { availability: "unavailable" },
      }),
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(unavailableManualDecision.status === "manual-selection-invalid", "unavailable manual Groq snapshot is rejected");
  assert(hasCode(candidateByKey(unavailableManualDecision, groq20Model.modelKey).rejectionCodes, "unavailable"), "unavailable manual Groq adds the expected rejection code");

  const unknownAvailabilityDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: groq20Model.modelKey }),
      runtimeForModels(productionCatalog.models, {
        [groq20Model.modelKey]: { availability: "unknown" },
      }),
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(unknownAvailabilityDecision.status === "manual-selection-invalid", "unknown manual Groq availability is rejected");

  const exhaustedQuotaDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: groq20Model.modelKey }),
      runtimeForModels(productionCatalog.models, {
        [groq20Model.modelKey]: { quotaState: "exhausted" },
      }),
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(exhaustedQuotaDecision.status === "manual-selection-invalid", "exhausted Groq quota is rejected");
  assert(hasCode(candidateByKey(exhaustedQuotaDecision, groq20Model.modelKey).rejectionCodes, "quota-unavailable"), "exhausted Groq quota adds the expected rejection code");

  const unknownQuotaDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: groq20Model.modelKey }),
      runtimeForModels(productionCatalog.models, {
        [groq20Model.modelKey]: { quotaState: "unknown" },
      }),
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(unknownQuotaDecision.status === "manual-selection-invalid", "unknown Groq quota is rejected");

  const missingCapabilityDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: groq20Model.modelKey }),
      productionRuntime,
      ["tool-use"],
      4096
    ),
    productionCatalog
  );
  assert(missingCapabilityDecision.status === "manual-selection-invalid", "missing text-generation capability rejects manual Groq");
  assert(hasCode(candidateByKey(missingCapabilityDecision, groq20Model.modelKey).rejectionCodes, "capability-mismatch"), "missing capability adds the expected rejection code");

  const outputExceededDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: groq20Model.modelKey }),
      productionRuntime,
      ["text-generation"],
      4097
    ),
    productionCatalog
  );
  assert(outputExceededDecision.status === "manual-selection-invalid", "output above 4096 rejects manual Groq");
  assert(hasCode(candidateByKey(outputExceededDecision, groq20Model.modelKey).rejectionCodes, "output-limit-exceeded"), "output above 4096 adds the expected rejection code");

  const manualMissingDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: null }),
      productionRuntime,
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(manualMissingDecision.status === "manual-selection-required", "missing manualModelKey returns manual-selection-required");

  const manualUnknownDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: "groq-cloud::unknown-model" }),
      productionRuntime,
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(manualUnknownDecision.status === "manual-selection-invalid", "unknown manualModelKey returns manual-selection-invalid");

  assert(fetchCallCount === 0, "routing decisions perform no provider fetch");
}

main();
'@

$tempNodeScript = Join-Path $env:TEMP "codexforge-groq-live-qualification-admission-smoke.js"
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

Write-Host "[PASS] CodexForge Groq live qualification admission smoke complete."
