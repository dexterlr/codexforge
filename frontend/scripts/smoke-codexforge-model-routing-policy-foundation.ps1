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

Write-Host ""
Write-Host "=== CodexForge model routing policy foundation smoke ==="

$requiredFiles = @(
  "src\lib\codexforge\model-routing\model-routing-types.ts",
  "src\lib\codexforge\model-routing\model-routing-catalog.ts",
  "src\lib\codexforge\model-routing\model-routing-policy.server.ts",
  "src\lib\codexforge\model-routing\index.ts",
  "docs\codexforge-model-routing-policy-foundation-v0.md",
  "scripts\smoke-codexforge-model-routing-policy-foundation.ps1"
)

foreach ($file in $requiredFiles) {
  Assert-FileExists $file
}

$tokens = $null
$parseErrors = $null
[System.Management.Automation.Language.Parser]::ParseFile(
  $PSCommandPath,
  [ref]$tokens,
  [ref]$parseErrors
) | Out-Null
Assert-True ($parseErrors.Count -eq 0) "PowerShell parses"

$policyPath = "src\lib\codexforge\model-routing\model-routing-policy.server.ts"
$indexPath = "src\lib\codexforge\model-routing\index.ts"
$typesPath = "src\lib\codexforge\model-routing\model-routing-types.ts"
$catalogPath = "src\lib\codexforge\model-routing\model-routing-catalog.ts"
$groqAdapterPath = "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts"
$runtimePath = "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"

foreach ($runtimeFile in @($groqAdapterPath, $runtimePath)) {
  Assert-FileExists $runtimeFile
  $runtimeFirstLine = Get-Content $runtimeFile -TotalCount 1
  Assert-True ($runtimeFirstLine -eq 'import "server-only";') "$runtimeFile begins with import ""server-only"";"
}

$policyFirstLine = Get-Content $policyPath -TotalCount 1
Assert-True ($policyFirstLine -eq 'import "server-only";') 'model-routing-policy.server.ts begins with import "server-only";'

$indexSource = Get-Content -Raw $indexPath
$typesSource = Get-Content -Raw $typesPath
$catalogSource = Get-Content -Raw $catalogPath
$policySource = Get-Content -Raw $policyPath
$groqAdapterSource = Get-Content -Raw $groqAdapterPath
$runtimeSource = Get-Content -Raw $runtimePath
$jarvisPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$liveRoutingSource = $typesSource + "`n" + $catalogSource + "`n" + $policySource + "`n" + $indexSource
$runtimeBoundarySource = $groqAdapterSource + "`n" + $runtimeSource

Assert-True (-not $indexSource.Contains("model-routing-policy.server")) "Client-safe index excludes the server router"

foreach ($forbiddenImport in @(
  "ai-provider-registry",
  "athena-model-routing-provider-selection-preview"
)) {
  Assert-True (-not $liveRoutingSource.Contains($forbiddenImport)) "Live model-routing source excludes $forbiddenImport imports"
}

Assert-NoGitDiff "src/lib/codexforge/ai-provider-registry" "Historical provider-registry directory remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/athena-model-routing-provider-selection-preview" "Historical routing-preview directory remains unchanged"

foreach ($historicalPath in @(
  "src\lib\codexforge\ai-provider-registry\index.ts",
  "src\lib\codexforge\ai-provider-registry\ai-provider-registry-types.ts",
  "src\lib\codexforge\athena-model-routing-provider-selection-preview\index.ts",
  "src\lib\codexforge\athena-model-routing-provider-selection-preview\athena-model-routing-provider-selection-preview-types.ts",
  "src\lib\codexforge\athena-model-routing-provider-selection-preview\athena-model-routing-provider-selection-preview-catalog.ts"
)) {
  Assert-FileExists $historicalPath
}

foreach ($pattern in @(
  'fetch\s*\(',
  'process\.env',
  'localhost',
  '127\.0\.0\.1',
  'api\.openai\.com',
  'anthropic\.com',
  'generativelanguage',
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY',
  'GOOGLE_API_KEY',
  'localStorage',
  'sessionStorage',
  'randomUUID',
  'Math\.random',
  'Date\.now',
  'new Date'
)) {
  Assert-NotMatches $liveRoutingSource $pattern "Live model-routing source excludes $pattern"
}

$newSourceFiles = @(
  $typesPath,
  $catalogPath,
  $policyPath,
  $indexPath
)

$plainTokenPattern = '\b' + 'a' + 'ny' + '\b'
$asTokenPattern = '\b' + 'as ' + 'a' + 'ny' + '\b'
$noCheckPattern = 'ts-' + 'nocheck'
$expectErrorPattern = 'ts-' + 'expect-error'

foreach ($sourcePath in $newSourceFiles) {
  $sourceText = Get-Content -Raw $sourcePath
  Assert-NotMatches $sourceText $asTokenPattern "$sourcePath excludes the as-token escape"
  Assert-NotMatches $sourceText $noCheckPattern "$sourcePath excludes the no-check directive"
  Assert-NotMatches $sourceText $expectErrorPattern "$sourcePath excludes the expect-error directive"
  Assert-NotMatches $sourceText $plainTokenPattern "$sourcePath excludes the plain token escape"
}

$longestNewPathLength = ($requiredFiles | ForEach-Object { $_.Length } | Measure-Object -Maximum).Maximum
Assert-True ($longestNewPathLength -lt 220) "Longest new source path remains below 220 characters"

Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts" "Generic provider contract remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts" "Groq adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts" "Current private-alpha state machine remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Current Ollama client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts" "Current private-alpha kill switch remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-api-client.ts" "Current private-alpha API client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential module remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq client module remains unchanged"
Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "Current private-alpha API routes remain unchanged"
Assert-NoGitDiff "src/app/jarvis" "Jarvis route entry remains unchanged"
Assert-NotMatches $runtimeBoundarySource "routeCodexForgeModel|runtimeSnapshots|manualModelKey|createPrivateAlphaStore|executeRun|/api/codexforge/private-alpha" "Runtime boundary performs no routing or execution integration"
Assert-Contains $jarvisPanelSource 'data-codexforge-private-alpha-provider-selector="manual"' "Jarvis uses a manual provider selector instead of routing"
Assert-Contains $jarvisPanelSource 'data-codexforge-private-alpha-model-selector="manual"' "Jarvis uses a manual model selector instead of routing"

$athenaAliasSource = Get-Content -Raw "src\app\athena\page.tsx"
Assert-Contains $athenaAliasSource 'export { default } from "../jarvis/page";' "/athena remains an alias of /jarvis"

$videoPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
foreach ($marker in @(
  "Mission brief",
  "Blocked action command deck",
  "Release summary"
)) {
  Assert-Contains $videoPanelSource $marker "/jarvis-video retains marker $marker"
}

$navigationTypesSource = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains strongly typed"
Assert-NoGitDiff ".codexforge/private-alpha" "Production .codexforge/private-alpha remains untouched"

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const Module = require("module");
let ts = null;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function loadTypeScript(repoRoot) {
  ts = require(path.join(repoRoot, "node_modules", "typescript"));

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

function provider(id, locality, catalogState) {
  return {
    providerId: id,
    label: id,
    locality,
    dataBoundary: locality === "local" ? "local-machine" : "cloud-provider",
    catalogState,
    adapterId: id + "-adapter",
    notes: [],
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
      pricingAsOf: null,
      sourceLabel: "free test",
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
          : "2026-07-24",
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
    label: input.label || input.modelId,
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
    catalogVersion: version || "test-catalog-v1",
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
        : "2026-07-24T00:00:00.000Z",
    };
  });
}

function routeRequest(policy, runtimeSnapshots, requiredCapabilities, maximumOutputTokens, taskProfile, estimatedInputTokens) {
  return {
    taskProfile: taskProfile || "general-text",
    requiredCapabilities: requiredCapabilities || [],
    estimatedInputTokens:
      Object.prototype.hasOwnProperty.call(arguments.length > 5 ? { estimatedInputTokens } : {}, "estimatedInputTokens")
        ? estimatedInputTokens
        : 1000,
    maximumOutputTokens:
      Object.prototype.hasOwnProperty.call(arguments.length > 3 ? { maximumOutputTokens } : {}, "maximumOutputTokens")
        ? maximumOutputTokens
        : 500,
    policy,
    runtimeSnapshots,
  };
}

function policy(mode, options) {
  const config = options || {};
  return {
    mode,
    privacyRequirement: config.privacyRequirement || "cloud-allowed",
    maximumEstimatedCostUsd:
      Object.prototype.hasOwnProperty.call(config, "maximumEstimatedCostUsd")
        ? config.maximumEstimatedCostUsd
        : 1,
    paidApprovalState: config.paidApprovalState || "not-granted",
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

function main() {
  const repoRoot = process.argv[2];
  loadTypeScript(repoRoot);

  const indexModule = require(path.join(
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

  assert(!Object.prototype.hasOwnProperty.call(indexModule, "routeCodexForgeModel"), "client-safe index does not export the server router");
  assert(indexModule.CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION === "codexforge-model-routing-v2", "production catalog version is exact");

  const productionCatalog = indexModule.CODEXFORGE_PRODUCTION_MODEL_CATALOG;
  assert(productionCatalog.providers.length === 2, "production catalog contains exactly two providers");
  const productionLocalProvider = productionCatalog.providers.find(
    (entry) => entry.providerId === "ollama-local"
  );
  const productionGroqProvider = productionCatalog.providers.find(
    (entry) => entry.providerId === "groq-cloud"
  );
  assert(Boolean(productionLocalProvider), "enabled production provider still includes ollama-local");
  assert(Boolean(productionGroqProvider), "enabled production provider now includes groq-cloud");
  assert(productionLocalProvider.locality === "local", "Local Ollama remains a local provider");
  assert(productionLocalProvider.dataBoundary === "local-machine", "Local Ollama boundary remains local-machine");
  assert(productionLocalProvider.catalogState === "enabled", "Local Ollama remains enabled");
  assert(productionGroqProvider.locality === "cloud", "Groq Cloud provider locality is cloud");
  assert(productionGroqProvider.dataBoundary === "cloud-provider", "Groq Cloud provider boundary is cloud-provider");
  assert(productionGroqProvider.catalogState === "enabled", "Groq Cloud provider is enabled");
  assert(productionGroqProvider.adapterId === "groq-provider-client", "Groq Cloud adapter id is exact");
  assert(productionCatalog.models.length === 3, "production catalog contains exactly three models");
  const productionLocalModel = productionCatalog.models.find(
    (entry) => entry.modelKey === "ollama-local::gpt-oss:20b"
  );
  const productionGroq20Model = productionCatalog.models.find(
    (entry) => entry.modelKey === "groq-cloud::openai/gpt-oss-20b"
  );
  const productionGroq120Model = productionCatalog.models.find(
    (entry) => entry.modelKey === "groq-cloud::openai/gpt-oss-120b"
  );
  assert(Boolean(productionLocalModel), "production catalog keeps the local gpt-oss:20b model");
  assert(Boolean(productionGroq20Model), "production catalog includes groq-cloud::openai/gpt-oss-20b");
  assert(Boolean(productionGroq120Model), "production catalog includes groq-cloud::openai/gpt-oss-120b");
  assert(productionLocalModel.routingState === "automatic", "production local model routing is automatic");
  assert(productionLocalModel.qualificationState === "live-verified", "production local model remains live-verified");
  assert(productionLocalModel.capabilities.length === 1 && productionLocalModel.capabilities[0] === "text-generation", "production local model is text-generation capable");
  assert(productionLocalModel.pricing.costClass === "local-no-provider-token-charge", "production local model cost class remains local-no-provider-token-charge");
  assert(productionLocalModel.pricing.inputUsdPerMillionTokens === 0, "production local model input token price remains zero");
  assert(productionLocalModel.pricing.outputUsdPerMillionTokens === 0, "production local model output token price remains zero");
  assert(productionLocalModel.approvedMaximumOutputTokens === 4096, "production local model output remains capped at 4096");
  for (const groqModel of [productionGroq20Model, productionGroq120Model]) {
    assert(groqModel.routingState === "manual-only", "production Groq model routing is manual-only");
    assert(groqModel.qualificationState === "live-verified", "production Groq model qualification is live-verified");
    assert(groqModel.capabilities.length === 1 && groqModel.capabilities[0] === "text-generation", "production Groq model is text-generation capable");
    assert(groqModel.pricing.costClass === "free-tier", "production Groq model cost class is free-tier");
    assert(groqModel.pricing.inputUsdPerMillionTokens === 0, "production Groq model input token price is zero");
    assert(groqModel.pricing.outputUsdPerMillionTokens === 0, "production Groq model output token price is zero");
    assert(groqModel.approvedMaximumOutputTokens === 4096, "production Groq model output is capped at 4096");
    assert(groqModel.contextWindowTokens === 131072, "production Groq model context window is 131072");
    assert(Object.keys(groqModel.taskProfileScores).length === 0, "production Groq model has no task-profile score");
  }
  assert(indexModule.validateCodexForgeModelCatalog(productionCatalog).length === 0, "production catalog validates successfully");

  const clonedCatalog = indexModule.getCodexForgeProductionModelCatalog();
  const clonedGroqProvider = clonedCatalog.providers.find(
    (entry) => entry.providerId === "groq-cloud"
  );
  const clonedGroq20Model = clonedCatalog.models.find(
    (entry) => entry.modelKey === "groq-cloud::openai/gpt-oss-20b"
  );
  clonedGroqProvider.notes[0] = "mutated note";
  clonedGroq20Model.pricing.sourceLabel = "mutated source";
  clonedGroq20Model.evidence[0] = "mutated evidence";
  clonedCatalog.providers.push(provider("mutated-provider", "local", "enabled"));
  clonedCatalog.models.push(model(indexModule.buildCodexForgeModelKey, {
    providerId: "ollama-local",
    modelId: "mutated-extra",
  }));
  const freshCatalog = indexModule.getCodexForgeProductionModelCatalog();
  const freshGroqProvider = freshCatalog.providers.find(
    (entry) => entry.providerId === "groq-cloud"
  );
  const freshGroq20Model = freshCatalog.models.find(
    (entry) => entry.modelKey === "groq-cloud::openai/gpt-oss-20b"
  );
  assert(freshCatalog.providers.length === 2, "catalog copy mutations do not affect authoritative provider count");
  assert(freshCatalog.models.length === 3, "catalog copy mutations do not affect authoritative model count");
  assert(freshCatalog.providers[0].label === "Local Ollama", "production provider clone does not mutate the authoritative catalog");
  assert(freshGroqProvider.notes[0] === "Live-qualified for discovery and visible text generation on 2026-07-26.", "Groq provider notes remain immutable in the authoritative catalog");
  assert(freshGroq20Model.pricing.sourceLabel === "Operator-confirmed Groq Free tier on 2026-07-26; account limits may change", "nested Groq pricing clone mutation does not mutate the authoritative catalog");
  assert(freshGroq20Model.evidence[0] === "codexforge-groq-provider-qualification-foundation-clean", "nested Groq evidence clone mutation does not mutate the authoritative catalog");

  const productionRuntime = runtimeForModels(productionCatalog.models);
  const productionLocalOnlyDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("local-only"), productionRuntime),
    productionCatalog
  );
  assert(productionLocalOnlyDecision.selectedModelKey === productionLocalModel.modelKey, "production local-only selects Local Ollama");
  assert(hasCode(candidateByKey(productionLocalOnlyDecision, productionGroq20Model.modelKey).rejectionCodes, "model-disabled"), "production local-only rejects Groq 20b as manual-only");
  assert(hasCode(candidateByKey(productionLocalOnlyDecision, productionGroq120Model.modelKey).rejectionCodes, "model-disabled"), "production local-only rejects Groq 120b as manual-only");

  const productionFreeOnlyDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("free-only"), productionRuntime),
    productionCatalog
  );
  assert(productionFreeOnlyDecision.selectedModelKey === productionLocalModel.modelKey, "production free-only selects Local Ollama");
  assert(hasCode(candidateByKey(productionFreeOnlyDecision, productionGroq20Model.modelKey).rejectionCodes, "model-disabled"), "production free-only rejects Groq 20b automatically");
  assert(hasCode(candidateByKey(productionFreeOnlyDecision, productionGroq120Model.modelKey).rejectionCodes, "model-disabled"), "production free-only rejects Groq 120b automatically");

  const productionFreeFirstDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("free-first"), productionRuntime),
    productionCatalog
  );
  assert(productionFreeFirstDecision.selectedModelKey === productionLocalModel.modelKey, "production free-first selects Local Ollama when available");

  const productionFreeFirstNoLocalDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("free-first"),
      runtimeForModels(productionCatalog.models, {
        [productionLocalModel.modelKey]: { availability: "unavailable" },
      })
    ),
    productionCatalog
  );
  assert(productionFreeFirstNoLocalDecision.status === "no-eligible-model", "production free-first returns no-eligible-model when only manual-only Groq models remain");

  const productionBestBudgetDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("best-within-budget"), productionRuntime),
    productionCatalog
  );
  assert(productionBestBudgetDecision.selectedModelKey === productionLocalModel.modelKey, "production best-within-budget does not select Groq automatically");

  const productionManual20Decision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", {
        manualModelKey: productionGroq20Model.modelKey,
      }),
      productionRuntime,
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(productionManual20Decision.status === "selected", "production manual mode can select Groq 20b");
  assert(productionManual20Decision.selectedModelKey === productionGroq20Model.modelKey, "production manual mode selects the exact Groq 20b key");
  assert(productionManual20Decision.estimatedCostUsd === 0, "production manual Groq 20b selection has zero estimated cost");

  const productionManual120Decision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", {
        manualModelKey: productionGroq120Model.modelKey,
      }),
      productionRuntime,
      ["text-generation"],
      4096
    ),
    productionCatalog
  );
  assert(productionManual120Decision.status === "selected", "production manual mode can select Groq 120b");
  assert(productionManual120Decision.selectedModelKey === productionGroq120Model.modelKey, "production manual mode selects the exact Groq 120b key");
  assert(productionManual120Decision.estimatedCostUsd === 0, "production manual Groq 120b selection has zero estimated cost");

  assert(routerModule.estimateCodexForgeModelCostUsd(pricing("local-no-provider-token-charge"), 1200, 800) === 0, "cost estimation returns zero for local");
  assert(routerModule.estimateCodexForgeModelCostUsd(pricing("free-tier"), 1200, 800) === 0, "cost estimation returns zero for free-tier");
  assert(routerModule.estimateCodexForgeModelCostUsd(pricing("unknown"), 1200, 800) === null, "cost estimation returns null for unknown pricing");
  const exactPaidEstimate = routerModule.estimateCodexForgeModelCostUsd(
    pricing("paid", { input: 1.5, output: 2.5, pricingAsOf: "2026-07-24" }),
    2000,
    3000
  );
  assert(Math.abs(exactPaidEstimate - 0.0105) < 1e-12, "cost estimation returns the exact expected paid maximum estimate");

  const buildKey = indexModule.buildCodexForgeModelKey;
  const localEnabledProvider = provider("local-enabled", "local", "enabled");
  const cloudEnabledProvider = provider("cloud-enabled", "cloud", "enabled");
  const disabledCloudProvider = provider("cloud-disabled", "cloud", "disabled");

  const duplicateProviderCatalog = snapshot("invalid-1", [localEnabledProvider, localEnabledProvider], []);
  assert(indexModule.validateCodexForgeModelCatalog(duplicateProviderCatalog).length > 0, "catalog validation rejects duplicate provider ID");

  const modelA = model(buildKey, { providerId: "local-enabled", modelId: "model-a" });
  const duplicateModelCatalog = snapshot("invalid-2", [localEnabledProvider], [modelA, modelA]);
  assert(indexModule.validateCodexForgeModelCatalog(duplicateModelCatalog).length > 0, "catalog validation rejects duplicate model key");

  const unknownProviderCatalog = snapshot("invalid-3", [localEnabledProvider], [
    model(buildKey, { providerId: "missing-provider", modelId: "orphan-model" }),
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(unknownProviderCatalog).length > 0, "catalog validation rejects unknown provider reference");

  const malformedKeyCatalog = snapshot("invalid-4", [localEnabledProvider], [
    {
      ...model(buildKey, { providerId: "local-enabled", modelId: "malformed-model" }),
      modelKey: "bad-key",
    },
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(malformedKeyCatalog).length > 0, "catalog validation rejects malformed model key");

  const invalidScoreCatalog = snapshot("invalid-5", [localEnabledProvider], [
    model(buildKey, {
      providerId: "local-enabled",
      modelId: "invalid-score",
      taskProfileScores: { "general-text": 101 },
    }),
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(invalidScoreCatalog).length > 0, "catalog validation rejects invalid score");

  const invalidOutputCatalog = snapshot("invalid-6", [localEnabledProvider], [
    model(buildKey, {
      providerId: "local-enabled",
      modelId: "invalid-output",
      approvedMaximumOutputTokens: 0,
    }),
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(invalidOutputCatalog).length > 0, "catalog validation rejects invalid output limit");

  const negativePricingCatalog = snapshot("invalid-7", [localEnabledProvider], [
    model(buildKey, {
      providerId: "local-enabled",
      modelId: "negative-pricing",
      pricing: pricing("paid", { input: -1, output: 2, pricingAsOf: "2026-07-24" }),
    }),
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(negativePricingCatalog).length > 0, "catalog validation rejects negative pricing");

  const paidMissingRatesCatalog = snapshot("invalid-8", [localEnabledProvider], [
    model(buildKey, {
      providerId: "local-enabled",
      modelId: "missing-paid-rates",
      pricing: pricing("paid", { input: null, output: 2, pricingAsOf: "2026-07-24" }),
    }),
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(paidMissingRatesCatalog).length > 0, "catalog validation rejects paid pricing without rates");

  const paidMissingPricingAsOfCatalog = snapshot("invalid-9", [localEnabledProvider], [
    model(buildKey, {
      providerId: "local-enabled",
      modelId: "missing-paid-date",
      pricing: pricing("paid", { input: 1, output: 2, pricingAsOf: null }),
    }),
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(paidMissingPricingAsOfCatalog).length > 0, "catalog validation rejects paid pricing without pricingAsOf");

  const unknownPricingWithRatesCatalog = snapshot("invalid-10", [localEnabledProvider], [
    model(buildKey, {
      providerId: "local-enabled",
      modelId: "unknown-with-rates",
      pricing: {
        costClass: "unknown",
        currency: "USD",
        inputUsdPerMillionTokens: 1,
        outputUsdPerMillionTokens: 2,
        pricingAsOf: null,
        sourceLabel: "bad unknown",
      },
    }),
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(unknownPricingWithRatesCatalog).length > 0, "catalog validation rejects unknown pricing with rates");

  const automaticUnqualifiedCatalog = snapshot("invalid-11", [localEnabledProvider], [
    model(buildKey, {
      providerId: "local-enabled",
      modelId: "automatic-discovered",
      qualificationState: "discovered",
    }),
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(automaticUnqualifiedCatalog).length > 0, "catalog validation rejects automatic unqualified model");

  const automaticDisabledProviderCatalog = snapshot("invalid-12", [disabledCloudProvider], [
    model(buildKey, {
      providerId: "cloud-disabled",
      modelId: "automatic-disabled-provider",
    }),
  ]);
  assert(indexModule.validateCodexForgeModelCatalog(automaticDisabledProviderCatalog).length > 0, "catalog validation rejects automatic model on a disabled provider");

  const localModel = model(buildKey, {
    providerId: "local-enabled",
    modelId: "local-model",
    taskProfileScores: { "general-text": 40 },
    pricing: pricing("local-no-provider-token-charge"),
  });
  const cloudHighModel = model(buildKey, {
    providerId: "cloud-enabled",
    modelId: "cloud-high",
    taskProfileScores: { "general-text": 95 },
    pricing: pricing("free-tier"),
  });
  const localOnlyCatalog = snapshot("route-local-only", [localEnabledProvider, cloudEnabledProvider], [localModel, cloudHighModel]);
  const localOnlyDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("local-only"), runtimeForModels(localOnlyCatalog.models)),
    localOnlyCatalog
  );
  assert(localOnlyDecision.status === "selected", "local-only selects a local model");
  assert(localOnlyDecision.selectedModelKey === localModel.modelKey, "local-only selects the local model even when a higher-scored cloud model exists");
  assert(hasCode(candidateByKey(localOnlyDecision, cloudHighModel.modelKey).rejectionCodes, "locality-not-allowed"), "local-only rejects every cloud model");

  const paidCloudModel = model(buildKey, {
    providerId: "cloud-enabled",
    modelId: "paid-cloud",
    taskProfileScores: { "general-text": 99 },
    pricing: pricing("paid", { input: 1, output: 1, pricingAsOf: "2026-07-24" }),
  });
  const freeOnlyCatalog = snapshot("route-free-only", [localEnabledProvider, cloudEnabledProvider], [localModel, cloudHighModel, paidCloudModel]);
  const freeOnlyDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("free-only"), runtimeForModels(freeOnlyCatalog.models)),
    freeOnlyCatalog
  );
  assert(freeOnlyDecision.status === "selected", "free-only can select the best eligible local/free model");
  assert(freeOnlyDecision.selectedModelKey === cloudHighModel.modelKey, "free-only selects the best eligible local/free model");
  assert(freeOnlyDecision.recommendedPaidModelKey === null, "free-only never recommends paid");
  assert(freeOnlyDecision.selectedModelKey !== paidCloudModel.modelKey, "free-only never selects paid");

  const freeFirstLocalDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("free-first"), runtimeForModels(freeOnlyCatalog.models)),
    freeOnlyCatalog
  );
  assert(freeFirstLocalDecision.selectedModelKey === localModel.modelKey, "free-first selects local before a higher-scored free cloud model");

  const localUnavailableDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("free-first"),
      runtimeForModels(freeOnlyCatalog.models, {
        [localModel.modelKey]: { availability: "unavailable" },
      })
    ),
    freeOnlyCatalog
  );
  assert(localUnavailableDecision.selectedModelKey === cloudHighModel.modelKey, "free-first selects free cloud when no eligible local model exists");

  const paidOnlyCatalog = snapshot("route-free-first-paid", [localEnabledProvider, cloudEnabledProvider], [paidCloudModel]);
  const paidApprovalNeededDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("free-first", { maximumEstimatedCostUsd: 1, paidApprovalState: "not-granted" }),
      runtimeForModels(paidOnlyCatalog.models)
    ),
    paidOnlyCatalog
  );
  assert(paidApprovalNeededDecision.status === "paid-approval-required", "free-first returns paid-approval-required when only an affordable paid model remains and approval is absent");
  assert(paidApprovalNeededDecision.selectedModelKey === null, "paid-approval-required does not select a model");
  assert(paidApprovalNeededDecision.recommendedPaidModelKey === paidCloudModel.modelKey, "paid-approval-required recommends the best paid model");
  assert(paidApprovalNeededDecision.requiresPaidApproval === true, "paid-approval-required marks explicit paid approval as required");

  const freeFirstPaidApprovedDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("free-first", { maximumEstimatedCostUsd: 1, paidApprovalState: "granted-for-request" }),
      runtimeForModels(paidOnlyCatalog.models)
    ),
    paidOnlyCatalog
  );
  assert(freeFirstPaidApprovedDecision.status === "selected", "free-first selects an affordable paid model after explicit approval");
  assert(freeFirstPaidApprovedDecision.selectedModelKey === paidCloudModel.modelKey, "free-first selects that paid model only after explicit paid approval");

  const freeAlternativeModel = model(buildKey, {
    providerId: "cloud-enabled",
    modelId: "free-alternative",
    taskProfileScores: { "general-text": 70 },
    pricing: pricing("free-tier"),
  });
  const bestBudgetCatalog = snapshot("route-budget", [localEnabledProvider, cloudEnabledProvider], [localModel, freeAlternativeModel, paidCloudModel]);
  const bestBudgetApprovedDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", {
        maximumEstimatedCostUsd: 1,
        paidApprovalState: "granted-for-request",
      }),
      runtimeForModels(bestBudgetCatalog.models)
    ),
    bestBudgetCatalog
  );
  assert(bestBudgetApprovedDecision.selectedModelKey === paidCloudModel.modelKey, "best-within-budget selects a higher-scored paid model when price is known, within budget, and approval is granted");

  const bestBudgetApprovalRequiredDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", {
        maximumEstimatedCostUsd: 1,
        paidApprovalState: "not-granted",
      }),
      runtimeForModels(bestBudgetCatalog.models)
    ),
    bestBudgetCatalog
  );
  assert(bestBudgetApprovalRequiredDecision.status === "paid-approval-required", "best-within-budget returns paid-approval-required when the paid winner is not yet approved");

  const expensivePaidModel = model(buildKey, {
    providerId: "cloud-enabled",
    modelId: "expensive-paid",
    taskProfileScores: { "general-text": 98 },
    pricing: pricing("paid", { input: 1000, output: 1000, pricingAsOf: "2026-07-24" }),
  });
  const overBudgetCatalog = snapshot("route-budget-over", [localEnabledProvider, cloudEnabledProvider], [freeAlternativeModel, expensivePaidModel]);
  const overBudgetDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", {
        maximumEstimatedCostUsd: 0.01,
        paidApprovalState: "granted-for-request",
      }),
      runtimeForModels(overBudgetCatalog.models)
    ),
    overBudgetCatalog
  );
  assert(overBudgetDecision.selectedModelKey === freeAlternativeModel.modelKey, "best-within-budget rejects over-budget paid candidates and can select an eligible free alternative");
  assert(hasCode(candidateByKey(overBudgetDecision, expensivePaidModel.modelKey).rejectionCodes, "over-budget"), "over-budget paid candidate is rejected");

  const manualMissingDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("manual", { manualModelKey: null }), runtimeForModels(bestBudgetCatalog.models)),
    bestBudgetCatalog
  );
  assert(manualMissingDecision.status === "manual-selection-required", "manual mode requires an exact model key");

  const manualUnknownKey = "cloud-enabled::unknown-manual";
  const manualUnknownDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("manual", { manualModelKey: manualUnknownKey }), runtimeForModels(bestBudgetCatalog.models)),
    bestBudgetCatalog
  );
  assert(manualUnknownDecision.status === "manual-selection-invalid", "manual mode never substitutes another model");
  assert(manualUnknownDecision.selectedModelKey === null, "manual mode never substitutes another model");

  const manualPaidNoBudgetDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", {
        manualModelKey: paidCloudModel.modelKey,
        maximumEstimatedCostUsd: null,
        paidApprovalState: "granted-for-request",
      }),
      runtimeForModels(paidOnlyCatalog.models)
    ),
    paidOnlyCatalog
  );
  assert(manualPaidNoBudgetDecision.status === "manual-selection-invalid", "manual paid selection requires a budget");

  const manualPaidNoApprovalDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", {
        manualModelKey: paidCloudModel.modelKey,
        maximumEstimatedCostUsd: 1,
        paidApprovalState: "not-granted",
      }),
      runtimeForModels(paidOnlyCatalog.models)
    ),
    paidOnlyCatalog
  );
  assert(manualPaidNoApprovalDecision.status === "manual-selection-invalid", "manual paid selection requires paid approval");

  const localRequiredDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", {
        privacyRequirement: "local-required",
        maximumEstimatedCostUsd: 1,
        paidApprovalState: "granted-for-request",
      }),
      runtimeForModels(bestBudgetCatalog.models)
    ),
    bestBudgetCatalog
  );
  assert(localRequiredDecision.selectedModelKey === localModel.modelKey, "local-required privacy rejects cloud candidates");
  assert(hasCode(candidateByKey(localRequiredDecision, freeAlternativeModel.modelKey).rejectionCodes, "privacy-local-required"), "cloud candidate is rejected by local-required privacy");

  const toolRequiredDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", { maximumEstimatedCostUsd: 1, paidApprovalState: "granted-for-request" }),
      runtimeForModels(bestBudgetCatalog.models),
      ["tool-use"]
    ),
    bestBudgetCatalog
  );
  assert(toolRequiredDecision.status === "no-eligible-model", "missing capability rejects a candidate");
  assert(hasCode(candidateByKey(toolRequiredDecision, localModel.modelKey).rejectionCodes, "capability-mismatch"), "missing capability adds capability-mismatch");

  const outputExceededDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", { maximumEstimatedCostUsd: 1, paidApprovalState: "granted-for-request" }),
      runtimeForModels(bestBudgetCatalog.models),
      [],
      9999
    ),
    bestBudgetCatalog
  );
  assert(outputExceededDecision.status === "no-eligible-model", "excessive output request rejects a candidate");
  assert(hasCode(candidateByKey(outputExceededDecision, localModel.modelKey).rejectionCodes, "output-limit-exceeded"), "excessive output adds output-limit-exceeded");

  const unavailableDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", { maximumEstimatedCostUsd: 1, paidApprovalState: "granted-for-request" }),
      runtimeForModels(bestBudgetCatalog.models, {
        [localModel.modelKey]: { availability: "unavailable" },
        [freeAlternativeModel.modelKey]: { availability: "unavailable" },
        [paidCloudModel.modelKey]: { availability: "unavailable" },
      })
    ),
    bestBudgetCatalog
  );
  assert(unavailableDecision.status === "no-eligible-model", "unavailable runtime snapshot rejects a candidate");
  assert(hasCode(candidateByKey(unavailableDecision, localModel.modelKey).rejectionCodes, "unavailable"), "unavailable runtime adds unavailable rejection");

  const unknownAvailabilityDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", { maximumEstimatedCostUsd: 1, paidApprovalState: "granted-for-request" }),
      runtimeForModels(bestBudgetCatalog.models, {
        [localModel.modelKey]: { availability: "unknown" },
        [freeAlternativeModel.modelKey]: { availability: "unknown" },
        [paidCloudModel.modelKey]: { availability: "unknown" },
      })
    ),
    bestBudgetCatalog
  );
  assert(unknownAvailabilityDecision.status === "no-eligible-model", "unknown availability rejects a candidate");

  const exhaustedQuotaDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("free-only"),
      runtimeForModels(freeOnlyCatalog.models, {
        [cloudHighModel.modelKey]: { quotaState: "exhausted" },
      })
    ),
    freeOnlyCatalog
  );
  assert(hasCode(candidateByKey(exhaustedQuotaDecision, cloudHighModel.modelKey).rejectionCodes, "quota-unavailable"), "exhausted free quota rejects a free-tier candidate");

  const unknownPricingModel = model(buildKey, {
    providerId: "cloud-enabled",
    modelId: "unknown-pricing",
    pricing: pricing("unknown"),
    taskProfileScores: { "general-text": 100 },
  });
  const unknownPricingCatalog = snapshot("route-unknown-pricing", [cloudEnabledProvider], [unknownPricingModel]);
  const unknownPricingDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", { maximumEstimatedCostUsd: 1, paidApprovalState: "granted-for-request" }),
      runtimeForModels(unknownPricingCatalog.models)
    ),
    unknownPricingCatalog
  );
  assert(unknownPricingDecision.status === "no-eligible-model", "unknown paid pricing is rejected");
  assert(hasCode(candidateByKey(unknownPricingDecision, unknownPricingModel.modelKey).rejectionCodes, "pricing-unknown"), "unknown pricing adds pricing-unknown");

  const deterministicModel = model(buildKey, {
    providerId: "local-enabled",
    modelId: "deterministic-model",
    qualificationState: "deterministic-tested",
    taskProfileScores: { "general-text": 50 },
  });
  const liveModel = model(buildKey, {
    providerId: "local-enabled",
    modelId: "live-model",
    qualificationState: "live-verified",
    taskProfileScores: { "general-text": 50 },
  });
  const discoveredModel = model(buildKey, {
    providerId: "local-enabled",
    modelId: "discovered-model",
    qualificationState: "discovered",
    taskProfileScores: { "general-text": 99 },
  });
  const metadataModel = model(buildKey, {
    providerId: "local-enabled",
    modelId: "metadata-model",
    qualificationState: "metadata-ready",
    taskProfileScores: { "general-text": 99 },
  });
  const disabledModel = model(buildKey, {
    providerId: "local-enabled",
    modelId: "disabled-model",
    qualificationState: "disabled",
    taskProfileScores: { "general-text": 99 },
  });
  const deprecatedModel = model(buildKey, {
    providerId: "local-enabled",
    modelId: "deprecated-model",
    qualificationState: "deprecated",
    taskProfileScores: { "general-text": 99 },
  });
  const qualificationCatalog = snapshot("route-qualification", [localEnabledProvider], [
    deterministicModel,
    liveModel,
    discoveredModel,
    metadataModel,
    disabledModel,
    deprecatedModel,
  ]);
  const qualificationDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("best-within-budget"), runtimeForModels(qualificationCatalog.models)),
    qualificationCatalog
  );
  assert(candidateByKey(qualificationDecision, deterministicModel.modelKey).eligible === true, "deterministic-tested models may route when enabled");
  assert(candidateByKey(qualificationDecision, liveModel.modelKey).eligible === true, "live-verified models may route when enabled");
  assert(hasCode(candidateByKey(qualificationDecision, discoveredModel.modelKey).rejectionCodes, "model-not-qualified"), "discovered models cannot route automatically");
  assert(hasCode(candidateByKey(qualificationDecision, metadataModel.modelKey).rejectionCodes, "model-not-qualified"), "metadata-ready models cannot route automatically");
  assert(hasCode(candidateByKey(qualificationDecision, disabledModel.modelKey).rejectionCodes, "model-not-qualified"), "disabled models cannot route automatically");
  assert(hasCode(candidateByKey(qualificationDecision, deprecatedModel.modelKey).rejectionCodes, "model-not-qualified"), "deprecated models cannot route automatically");
  assert(qualificationDecision.selectedModelKey === liveModel.modelKey, "live-verified wins a qualification tie");

  const lowCostPaidModel = model(buildKey, {
    providerId: "cloud-enabled",
    modelId: "low-cost-paid",
    taskProfileScores: { "general-text": 80 },
    pricing: pricing("paid", { input: 1, output: 1, pricingAsOf: "2026-07-24" }),
  });
  const highCostPaidModel = model(buildKey, {
    providerId: "cloud-enabled",
    modelId: "high-cost-paid",
    taskProfileScores: { "general-text": 80 },
    pricing: pricing("paid", { input: 2, output: 2, pricingAsOf: "2026-07-24" }),
  });
  const costTieCatalog = snapshot("route-cost-tie", [cloudEnabledProvider], [lowCostPaidModel, highCostPaidModel]);
  const costTieDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("best-within-budget", { maximumEstimatedCostUsd: 1, paidApprovalState: "granted-for-request" }),
      runtimeForModels(costTieCatalog.models)
    ),
    costTieCatalog
  );
  assert(costTieDecision.selectedModelKey === lowCostPaidModel.modelKey, "lower known cost wins a task-score tie");

  const localTieModel = model(buildKey, {
    providerId: "local-enabled",
    modelId: "local-tie",
    taskProfileScores: { "general-text": 70 },
  });
  const cloudTieModel = model(buildKey, {
    providerId: "cloud-enabled",
    modelId: "cloud-tie",
    taskProfileScores: { "general-text": 70 },
    pricing: pricing("local-no-provider-token-charge"),
  });
  const localityTieCatalog = snapshot("route-locality-tie", [localEnabledProvider, cloudEnabledProvider], [localTieModel, cloudTieModel]);
  const localityTieDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("best-within-budget"), runtimeForModels(localityTieCatalog.models)),
    localityTieCatalog
  );
  assert(localityTieDecision.selectedModelKey === localTieModel.modelKey, "local wins a remaining locality tie");

  const lexicalA = model(buildKey, {
    providerId: "local-enabled",
    modelId: "alpha",
    taskProfileScores: { "general-text": 60 },
  });
  const lexicalB = model(buildKey, {
    providerId: "local-enabled",
    modelId: "beta",
    taskProfileScores: { "general-text": 60 },
  });
  const lexicalTieCatalog = snapshot("route-lexical-tie", [localEnabledProvider], [lexicalB, lexicalA]);
  const lexicalTieDecision = routerModule.routeCodexForgeModel(
    routeRequest(policy("best-within-budget"), runtimeForModels(lexicalTieCatalog.models)),
    lexicalTieCatalog
  );
  assert(lexicalTieDecision.selectedModelKey === lexicalA.modelKey, "lexical model key resolves the final tie deterministically");
  assert(hasCode(lexicalTieDecision.reasonCodes, "stable-key-tiebreak"), "routing decisions contain stable reason codes");
  assert(typeof lexicalTieDecision.explanation === "string" && lexicalTieDecision.explanation.length > 0 && lexicalTieDecision.explanation.length < 240, "routing decisions contain concise explanations");

  const promptFreeRequest = routeRequest(policy("best-within-budget"), runtimeForModels(bestBudgetCatalog.models));
  assert(!Object.prototype.hasOwnProperty.call(promptFreeRequest, "prompt"), "routing requests contain no prompt field");
  assert(!Object.prototype.hasOwnProperty.call(promptFreeRequest, "message"), "routing requests contain no message field");
  assert(!Object.prototype.hasOwnProperty.call(bestBudgetApprovedDecision, "prompt"), "routing decisions contain no prompt field");
  assert(!Object.prototype.hasOwnProperty.call(bestBudgetApprovedDecision, "message"), "routing decisions contain no message field");
}

main();
'@

$tempNodeScript = Join-Path $env:TEMP "codexforge-model-routing-policy-foundation-smoke.js"
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

Write-Host "[PASS] CodexForge model routing policy foundation smoke complete."