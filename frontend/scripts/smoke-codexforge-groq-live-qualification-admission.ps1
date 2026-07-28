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
  "src/lib/codexforge/groq-provider/groq-provider-live-execution-acceptance.ts",
  "src/lib/codexforge/groq-provider/groq-provider-qualification.ts",
  "src/lib/codexforge/groq-provider/index.ts",
  "src/lib/codexforge/model-routing/model-routing-catalog.ts",
  "docs/codexforge-private-alpha-groq-live-execution-admission-v0.md",
  "scripts/smoke-codexforge-all.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-live-execution-admission.ps1",
  "scripts/smoke-codexforge-private-alpha-manual-groq-execution-foundation.ps1"
)

$requiredFiles = @(
  "src/lib/codexforge/private-alpha/index.ts",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/PrivateAlphaRunPanel.tsx",
  "src/lib/codexforge/jarvis-unified-product-ia-map/components/JarvisUnifiedProductShell.module.css",
  "scripts/smoke-codexforge-private-alpha-cloud-approval-binding-foundation.ps1",
  "scripts/smoke-codexforge-jarvis-live-command-center-ui.ps1",
  "scripts/smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts/smoke-codexforge-private-alpha-provider-adapter-foundation.ps1",
  "scripts/smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts/smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts/smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts/smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "docs/codexforge-jarvis-manual-provider-model-selector-v0.md"
) | ForEach-Object { $_ -replace '/', '\' }
foreach ($file in $requiredFiles) {
  Assert-FileExists $file
}

foreach ($scriptPath in @(
  "scripts\smoke-codexforge-jarvis-manual-provider-model-selector.ps1",
  "scripts\smoke-codexforge-groq-live-qualification-admission.ps1",
  "scripts\smoke-codexforge-groq-provider-qualification-foundation.ps1",
  "scripts\smoke-codexforge-model-routing-policy-foundation.ps1",
  "scripts\smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1",
  "scripts\smoke-codexforge-private-alpha-groq-live-execution-admission.ps1"
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
Assert-True ($changedPaths.Count -eq $allowedChangedFiles.Count) "Git changed scope contains exactly the fifteen allowed Slice L files"
foreach ($path in $changedPaths) {
  Assert-True ($allowedChangedFiles -contains $path) "Git changed scope stays within the allowed smoke-repair files: $path"
}

Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-credential.server.ts" "Groq credential module remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/groq-provider/groq-provider-client.server.ts" "Groq client module remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-provider.server.ts" "Generic provider contract remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama-adapter.server.ts" "Ollama adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-groq-adapter.server.ts" "Groq adapter remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-state-machine.ts" "Current private-alpha state machine remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-ollama.server.ts" "Current Ollama client remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-kill-switch.server.ts" "Current private-alpha kill switch remains unchanged"
Assert-NoGitDiff "src/lib/codexforge/private-alpha/private-alpha-api-client.ts" "Current private-alpha API client remains unchanged"
Assert-NoGitDiff "src/app/api/codexforge/private-alpha" "Current private-alpha API routes remain unchanged"
Assert-NoGitDiff "src/app/jarvis" "Jarvis route entry remains unchanged"
Assert-NoGitDiff ".codexforge/private-alpha" "Production .codexforge/private-alpha remains untouched"

$typesSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-types.ts"
$qualificationSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-qualification.ts"
$catalogSource = Get-Content -Raw "src\lib\codexforge\model-routing\model-routing-catalog.ts"
$sliceHDocSource = Get-Content -Raw "docs\codexforge-private-alpha-groq-adapter-runtime-foundation-v0.md"
$sliceKDocSource = Get-Content -Raw "docs\codexforge-private-alpha-manual-groq-execution-foundation-v0.md"
$sliceDSource = Get-Content -Raw "scripts\smoke-codexforge-private-alpha-provider-adapter-foundation.ps1"
$sliceESource = Get-Content -Raw "scripts\smoke-codexforge-model-routing-policy-foundation.ps1"
$sliceFSource = Get-Content -Raw "scripts\smoke-codexforge-groq-provider-qualification-foundation.ps1"
$sliceHSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-private-alpha-groq-adapter-runtime-foundation.ps1"
$newSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-groq-live-qualification-admission.ps1"
$credentialSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-credential.server.ts"
$clientSource = Get-Content -Raw "src\lib\codexforge\groq-provider\groq-provider-client.server.ts"
$groqAdapterSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts"
$runtimeModuleSource = Get-Content -Raw "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts"
$modelRoutingSource = (
  Get-ChildItem -LiteralPath "src\lib\codexforge\model-routing" -File -Filter "*.ts" |
    Sort-Object FullName |
    ForEach-Object { Get-Content -Raw $_.FullName }
) -join "`n"
$jarvisSource = Get-Content -Raw "src\lib\codexforge\jarvis-unified-product-ia-map\components\PrivateAlphaRunPanel.tsx"
$athenaAliasSource = Get-Content -Raw "src\app\athena\page.tsx"
$videoPanelSource = Get-Content -Raw "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesSource = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"

$boundedAdmissionSource = $typesSource + "`n" + $qualificationSource + "`n" + $catalogSource + "`n" + $sliceHDocSource
$transportRuntimeSource = $credentialSource + "`n" + $clientSource + "`n" + $typesSource + "`n" + $qualificationSource + "`n" + $catalogSource
$runtimeBoundarySource = $groqAdapterSource + "`n" + $runtimeModuleSource

Assert-Contains $sliceKDocSource "The next step is live acceptance of the exact 20B and 120B paths" "Slice K documentation records live acceptance remains a later step"
Assert-Contains $sliceHDocSource "Groq remains manual-only in the production catalog." "Slice H documentation records manual-only Groq admission"
Assert-Contains $sliceHDocSource "No credential or acceptance token is stored." "Slice H documentation records that no credential or acceptance token is stored"
Assert-True ((Get-Content "src\lib\codexforge\private-alpha\private-alpha-groq-adapter.server.ts" -TotalCount 1) -eq 'import "server-only";') 'private-alpha-groq-adapter.server.ts begins with import "server-only";'
Assert-True ((Get-Content "src\lib\codexforge\private-alpha\private-alpha-provider-runtime.server.ts" -TotalCount 1) -eq 'import "server-only";') 'private-alpha-provider-runtime.server.ts begins with import "server-only";'

Assert-NotMatches $boundedAdmissionSource "GROQ_API_KEY|apiKey|Authorization|x-groq-request-id|prompt_tokens|completion_tokens|total_tokens|tool_calls|executed_tools" "Bounded admission metadata excludes credential and raw-response fields"

foreach ($forbiddenToken in @(
  'from\s+["'']groq-sdk["'']',
  'from\s+["'']openai["'']',
  'from\s+["'']axios["'']',
  'require\(["'']groq-sdk["'']\)',
  'require\(["'']openai["'']\)',
  'require\(["'']axios["'']\)'
)) {
  Assert-NotMatches $transportRuntimeSource $forbiddenToken "Runtime source excludes $forbiddenToken"
}

Assert-NotMatches $modelRoutingSource "localStorage|sessionStorage|indexedDB" "Model-routing source excludes browser storage"
Assert-NotMatches $modelRoutingSource "process\.env" "Model-routing source excludes process.env reads"
Assert-Contains $jarvisSource 'data-codexforge-private-alpha-provider-selector="manual"' "Jarvis UI exposes the manual provider selector"
Assert-Contains $jarvisSource 'data-codexforge-private-alpha-model-selector="manual"' "Jarvis UI exposes the manual model selector"
Assert-Contains $jarvisSource 'data-codexforge-private-alpha-cloud-execution-acknowledgement="required"' "Jarvis UI requires a separate cloud execution acknowledgement"
Assert-Contains $jarvisSource 'data-codexforge-private-alpha-cloud-execute="manual"' "Jarvis UI marks Groq execution as manual"
Assert-Contains $jarvisSource 'Execute once on Groq Cloud' "Jarvis UI exposes the manual Groq execute control"
Assert-Contains $jarvisSource 'No transfer occurs now, the exact model remains fixed, and no automatic routing occurs.' "Jarvis UI preserves the no-routing bound-model posture"
Assert-NotMatches $runtimeBoundarySource "routeCodexForgeModel|runtimeSnapshots|manualModelKey|createPrivateAlphaStore|executeRun|/api/codexforge/private-alpha" "Runtime boundary performs no routing or execution integration"
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
$typeScriptFiles = $requiredFiles | Where-Object { $_ -like "*.ts" }
foreach ($sourcePath in $typeScriptFiles) {
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
  const groqAcceptanceModule = require(path.join(
    repoRoot,
    "src",
    "lib",
    "codexforge",
    "groq-provider",
    "groq-provider-live-execution-acceptance.ts"
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
  const acceptance = groqAcceptanceModule.CODEXFORGE_GROQ_LIVE_EXECUTION_ACCEPTANCE;

  assert(
    groqTypesModule.CODEXFORGE_GROQ_QUALIFICATION_VERSION ===
      "codexforge-groq-qualification-v2",
    "qualification version constant is v2"
  );
  assert(qualification.qualificationVersion === "codexforge-groq-qualification-v2", "qualification record version is v2");
  assert(qualification.providerId === "groq-cloud", "qualification provider ID is groq-cloud");
  assert(qualification.providerTransportQualificationState === "live-verified", "qualification transport state is live-verified");
  assert(qualification.manualPrivateAlphaExecutionAdmissionState === "admitted", "qualification manual admission state is admitted");
  assert(qualification.productionRoutingState === "manual-only", "qualification production routing state is manual-only");
  assert(qualification.automaticRoutingState === "disabled", "qualification automatic routing state is disabled");
  assert(qualification.models.length === 2, "qualification contains exactly two models");
  assert(
    qualification.models[0].modelId === allowedModels[0] &&
      qualification.models[1].modelId === allowedModels[1],
    "qualification model ordering is exact"
  );
  assert(
    qualification.liveExecutionAcceptance.acceptanceVersion ===
      "codexforge-groq-live-execution-acceptance-v1" &&
      qualification.liveExecutionAcceptance.acceptanceId ===
        "codexforge-groq-private-alpha-live-execution-20260727-165043" &&
      qualification.liveExecutionAcceptance.acceptedOn === "2026-07-27" &&
      qualification.liveExecutionAcceptance.acceptanceCheckpointCommit ===
        "b17311bb5720a5037edd756d91c266eee7ce6947",
    "qualification links to the typed acceptance record"
  );

  for (const entry of qualification.models) {
    assert(entry.transportQualificationState === "live-verified", "qualification model transport state is live-verified");
    assert(entry.manualPrivateAlphaExecutionAdmissionState === "admitted", "qualification model manual admission state is admitted");
    assert(entry.routingState === "manual-only", "qualification model is manual-only");
    assert(entry.automaticRoutingState === "disabled", "qualification model automatic routing state is disabled");
    assert(entry.accountTierState === "operator-confirmed-free", "qualification model account tier is operator-confirmed-free");
    assert(entry.dataBoundary === "cloud-provider", "qualification model data boundary is cloud-provider");
    assert(entry.capabilities.length === 1 && entry.capabilities[0] === "text-generation", "qualification model capability is text-generation only");
    assert(entry.transportLiveVerifiedOn === "2026-07-26", "qualification transportLiveVerifiedOn is exact");
    assert(entry.operatorTierConfirmedOn === "2026-07-26", "qualification operatorTierConfirmedOn is exact");
    assert(entry.manualPrivateAlphaExecutionAcceptedOn === "2026-07-27", "qualification manual admission date is exact");
    assert(entry.providerReportedContextWindowTokens === 131072, "qualification provider context window is exact");
    assert(entry.providerReportedMaximumOutputTokens === 65536, "qualification provider maximum output is exact");
    assert(entry.admittedMaximumOutputTokens === 512, "qualification admitted maximum output is exact");
    assert(entry.admittedExecutionEnvelope === "text-only", "qualification admitted execution envelope is exact");
    assert(entry.liveExecutionAcceptanceId === acceptance.acceptanceId, "qualification model links to the typed acceptance ID");
    assert(entry.evidence.includes("authenticated model discovery completed on 2026-07-26"), "qualification evidence records discovery");
    assert(entry.evidence.includes("exact visible-output transport qualification completed on 2026-07-26"), "qualification evidence records exact transport visible-output");
    assert(entry.evidence.includes("manual Private Alpha execution admitted on 2026-07-27"), "qualification evidence records manual execution admission");
    assert(entry.evidence.includes("typed acceptance record linked by codexforge-groq-private-alpha-live-execution-20260727-165043"), "qualification evidence records the typed acceptance link");
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
  assert(qualificationCloneA.liveExecutionAcceptance !== qualification.liveExecutionAcceptance, "qualification getter clones the live-execution acceptance reference");

  const productionCatalog = modelRoutingIndexModule.CODEXFORGE_PRODUCTION_MODEL_CATALOG;
  assert(
    modelRoutingIndexModule.CODEXFORGE_MODEL_ROUTING_CATALOG_VERSION ===
      "codexforge-model-routing-v3",
    "production catalog version is v3"
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
  assert(groqProvider.notes.includes("Production routing remains manual-only and automatic Groq routing stays disabled."), "Groq provider notes keep automatic routing disabled");
  assert(groqProvider.notes.includes(`Acceptance evidence links to ${acceptance.acceptanceId}.`), "Groq provider notes link to the acceptance evidence");

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
    assert(groqModel.approvedMaximumOutputTokens === 512, "Groq catalog approved maximum output is exact");
    assert(Object.keys(groqModel.taskProfileScores).length === 0, "Groq catalog task-profile scores stay empty");
    assert(groqModel.evidence.includes(acceptance.acceptanceId), "Groq catalog evidence records the acceptance ID");
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
  assert(freshGroqProvider.notes[0] === "Transport qualification remains live-verified from 2026-07-26.", "catalog clone mutations do not alter Groq notes");
  assert(freshGroq20Model.pricing.sourceLabel === "Operator-confirmed Groq Free tier on 2026-07-26; account tier may change and requires revalidation", "catalog clone mutations do not alter Groq pricing");
  assert(freshGroq20Model.evidence[0] === "codexforge-groq-qualification-v2", "catalog clone mutations do not alter Groq evidence");

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
      512
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
      512
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
      512
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
      512
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
      512
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
      512
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
      512
    ),
    productionCatalog
  );
  assert(unknownQuotaDecision.status === "manual-selection-invalid", "unknown Groq quota is rejected");

  const missingCapabilityDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: groq20Model.modelKey }),
      productionRuntime,
      ["tool-use"],
      512
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
      513
    ),
    productionCatalog
  );
  assert(outputExceededDecision.status === "manual-selection-invalid", "output above 512 rejects manual Groq");
  assert(hasCode(candidateByKey(outputExceededDecision, groq20Model.modelKey).rejectionCodes, "output-limit-exceeded"), "output above 512 adds the expected rejection code");

  const manualMissingDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: null }),
      productionRuntime,
      ["text-generation"],
      512
    ),
    productionCatalog
  );
  assert(manualMissingDecision.status === "manual-selection-required", "missing manualModelKey returns manual-selection-required");

  const manualUnknownDecision = routerModule.routeCodexForgeModel(
    routeRequest(
      policy("manual", { manualModelKey: "groq-cloud::unknown-model" }),
      productionRuntime,
      ["text-generation"],
      512
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
