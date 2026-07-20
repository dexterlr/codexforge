param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$parentRoot = Resolve-Path (Join-Path $root "..")
if (Test-Path (Join-Path $parentRoot "README.md")) {
  $repoRoot = $parentRoot
} else {
  $repoRoot = Resolve-Path $root
}
Set-Location $root

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw "[FAIL] Missing $Name`: $Needle"
  }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Unexpected $Name with pattern $Pattern"
  }
  Write-Host "[PASS] $Name"
}

function Assert-Equal {
  param(
    [AllowEmptyString()][string]$Actual,
    [string]$Expected,
    [string]$Name
  )
  if ($Actual -ne $Expected) {
    throw "[FAIL] $Name expected '$Expected' found '$Actual'"
  }
  Write-Host "[PASS] $Name"
}

function Get-SourceFiles {
  param([string[]]$Paths)

  $files = @()
  foreach ($path in $Paths) {
    if (-not (Test-Path $path)) {
      continue
    }

    $item = Get-Item $path
    if ($item.PSIsContainer) {
      $files += Get-ChildItem -Path $item.FullName -Recurse -File | Where-Object {
        @(".ts", ".tsx", ".js", ".jsx") -contains $_.Extension
      }
    } else {
      $files += $item
    }
  }

  return @($files | Sort-Object -Property FullName -Unique)
}

function Get-CombinedFileText {
  param([string[]]$Paths)
  return ($Paths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
}

function Get-CombinedSourceText {
  param([System.IO.FileInfo[]]$Files)
  return ($Files | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
}

function Normalize-Whitespace {
  param([AllowEmptyString()][string]$Text)
  return ([regex]::Replace($Text, "\s+", " ")).Trim()
}

function Invoke-TextAdapterReviewPreviewValidation {
  param([string]$RepoRootPath)

  $nodeScript = @'
const fs = require("fs");
const path = require("path");
const Module = require("module");
const ts = require("typescript");

const repoRoot = process.argv[2];

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
  const result = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX
    },
    fileName: filename
  });
  module._compile(result.outputText, filename);
};

require.extensions[".ts"] = compileTypeScript;
require.extensions[".tsx"] = compileTypeScript;

const reviewModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-text-adapter-review",
  "index.ts"
));

const helperModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-text-adapter",
  "min-text-adapter-helper.server.ts"
));

const requiredExports = [
  "listBackendOwnedMinimalManualGatedTextModelAdapterReviews",
  "listTextAdapterOutputReviewRecords",
  "listTextAdapterGateFailureReviewRecords",
  "listTextAdapterRecoveryPlanPreviews",
  "listTextAdapterRecoveryReadinessChecklistRecords",
  "listTextAdapterReviewAuditSummaries",
  "listTextAdapterAcceptancePostureRecords",
  "buildTextAdapterReviewSummary",
  "buildTextAdapterOutputReviewSummary",
  "buildTextAdapterGateFailureSummary",
  "buildTextAdapterRecoverySummary",
  "buildMinimalTextAdapterResultCaptureMvpChecklist"
];

for (const exportName of requiredExports) {
  if (typeof reviewModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

if (typeof helperModule.runMinimalManualGatedTextModelAdapterMvpForStaticFixture !== "function") {
  throw new Error("Missing runMinimalManualGatedTextModelAdapterMvpForStaticFixture export.");
}

const reviewsFirst = reviewModule.listBackendOwnedMinimalManualGatedTextModelAdapterReviews();
const reviewsSecond = reviewModule.listBackendOwnedMinimalManualGatedTextModelAdapterReviews();
if (JSON.stringify(reviewsFirst) !== JSON.stringify(reviewsSecond)) {
  throw new Error("Text adapter review records are not deterministic.");
}

const outputs = reviewModule.listTextAdapterOutputReviewRecords();
const gateFailures = reviewModule.listTextAdapterGateFailureReviewRecords();
const recoveryPlans = reviewModule.listTextAdapterRecoveryPlanPreviews();
const readiness = reviewModule.listTextAdapterRecoveryReadinessChecklistRecords();
const auditSummaries = reviewModule.listTextAdapterReviewAuditSummaries();
const acceptance = reviewModule.listTextAdapterAcceptancePostureRecords();
const summary = reviewModule.buildTextAdapterReviewSummary();
const outputSummary = reviewModule.buildTextAdapterOutputReviewSummary();
const gateSummary = reviewModule.buildTextAdapterGateFailureSummary();
const recoverySummary = reviewModule.buildTextAdapterRecoverySummary();
const checklist = reviewModule.buildMinimalTextAdapterResultCaptureMvpChecklist();
const helper = helperModule.runMinimalManualGatedTextModelAdapterMvpForStaticFixture();

process.stdout.write(JSON.stringify({
  reviewCount: reviewsFirst.length,
  outputReviewCount: outputs.length,
  gateFailureCount: gateFailures.length,
  recoveryPlanCount: recoveryPlans.length,
  readinessCount: readiness.length,
  auditSummaryCount: auditSummaries.length,
  acceptanceCount: acceptance.length,
  highestDetectedPhase: String(summary.highestDetectedPhase),
  latestCompletedBatch: summary.latestCompletedBatch,
  previousCompletedBatch: summary.previousCompletedBatch,
  nextLikelyBatch: summary.nextLikelyBatch,
  currentReadiness: summary.currentReadiness,
  acceptanceState: summary.acceptanceState,
  outputStatement: outputs[0].explicitFixtureResponseOnlyNoRealOutputNoProviderCallNoPersistenceStatement,
  gateStatement: gateFailures[0].explicitNoLiveGatePassStatement,
  recoveryStatement: recoveryPlans[0].explicitNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement,
  acceptanceStatement: acceptance[0].explicitTextAdapterFixtureAcceptedLiveProviderExecutionNotAcceptedStatement,
  outputSummaryCount: outputSummary.outputReviewCount,
  topGateLabelsCount: gateSummary.topFailedGateLabels.length,
  recoverySummaryCount: recoverySummary.recoveryPlanCount,
  checklistCount: checklist.length,
  helperAdapterState: helper.adapterState,
  helperProviderResponseState: helper.providerResponseState,
  helperModelOutputState: helper.modelOutputState,
  helperPersistenceState: helper.persistenceState
}));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute text adapter review preview validation."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$providersPagePath = Join-Path $root "src\app\ai-providers\page.tsx"
$providersPageClientPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$videoPagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$videoPageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$jarvisIaContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$reviewTypesPath = Join-Path $root "src\lib\codexforge\min-text-adapter-review\min-text-adapter-review-types.ts"
$reviewCatalogPath = Join-Path $root "src\lib\codexforge\min-text-adapter-review\min-text-adapter-review-catalog.ts"
$reviewIndexPath = Join-Path $root "src\lib\codexforge\min-text-adapter-review\index.ts"
$textAdapterHelperPath = Join-Path $root "src\lib\codexforge\min-text-adapter\min-text-adapter-helper.server.ts"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"

$requiredPaths = @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $providersPagePath,
  $providersPageClientPath,
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $jarvisIaContentPath,
  $navigationTypesPath,
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath,
  $textAdapterHelperPath,
  $allSmokePath,
  $checkpointCurrentPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$jarvisSource = Get-CombinedFileText @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $jarvisIaContentPath
)
$homeSource = Get-CombinedFileText @(
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $athenaModelPath,
  $jarvisIaContentPath
)
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$typedModelSource = Get-CombinedFileText @(
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath
)
$serverHelperSource = Get-Content -Raw $textAdapterHelperPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$athenaPanelSource = Get-Content -Raw $athenaPanelPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\app\ai-providers"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$serverHelperNormalized = Normalize-Whitespace $serverHelperSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource

foreach ($needle in @(
  "5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview",
  "5705",
  "Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal manual-gated text model adapter MVP",
  "Text adapter evidence preview",
  "Backend-owned minimal text adapter review",
  "Text adapter output review",
  "Text adapter gate failure review",
  "Text adapter recovery plan",
  "Text adapter recovery readiness",
  "Text adapter review audit summary",
  "Text adapter acceptance posture",
  "Athena can review the backend-owned minimal manual-gated text model adapter MVP",
  "minimal text adapter review is preview-only",
  "server-only text adapter helper exists",
  "text adapter output is deterministic fixture output only",
  "text adapter is not provider-capable yet",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "no provider execution",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "text adapter result capture MVP comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now review the backend-owned minimal manual-gated text model adapter MVP",
  "minimal text adapter review is preview-only",
  "server-only text adapter helper exists",
  "text adapter output is deterministic fixture output only",
  "text adapter is not provider-capable yet",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "text adapter result capture MVP comes next"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Generate video - locked"
)) {
  Assert-Contains $videoNormalized $needle "/jarvis-video contains $needle"
}

foreach ($needle in @(
  "backend-owned-minimal-manual-gated-text-model-adapter-review-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-output-review-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-gate-failure-review-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-recovery-plan-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-recovery-readiness-checklist-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-review-audit-summary-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-acceptance-posture-preview-v1",
  "Backend-owned minimal text adapter review",
  "Text adapter output review",
  "Text adapter gate failure review",
  "Text adapter recovery plan",
  "Text adapter recovery readiness",
  "Text adapter review audit summary",
  "Text adapter acceptance posture",
  "no LLM/model calls",
  "no prompt sending",
  "no provider SDK imports",
  "no provider execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'import "server-only";',
  "runMinimalManualGatedTextModelAdapterMvpForStaticFixture",
  "completed-text-adapter-fixture-only",
  "static placeholder only",
  "minimal-text-adapter-mvp-only / backend-only / fixture-only / not provider-capable / not persistent"
)) {
  Assert-Contains $serverHelperNormalized $needle "server-only text adapter helper marker contains $needle"
}

foreach ($source in @($typedModelSource, $serverHelperSource)) {
  Assert-NotMatches $source "Math\.random|Date\.now|crypto\.randomUUID" "deterministic text adapter review source excludes nondeterministic generators"
  Assert-NotMatches $source "fetch\s*\(|XMLHttpRequest|axios\.|navigator\.sendBeacon" "deterministic text adapter review source excludes network calls"
  Assert-NotMatches $source "process\.env\." "deterministic text adapter review source excludes env var reads"
  Assert-NotMatches $source "localStorage|sessionStorage|indexedDB|document\.cookie" "deterministic text adapter review source excludes browser storage"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-review-recovery-preview-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $allSmokeNormalized "Phase 5705 Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview" "scripts/smoke-codexforge-all.ps1 contains phase 5705 release gate"

Assert-Contains $checkpointNormalized "Highest detected phase: 5705" "checkpoint current doc reports Highest detected phase: 5705"
Assert-Contains $checkpointNormalized "Latest completed batch: 5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview" "checkpoint current doc reports latest completed text adapter review batch"
Assert-Contains $checkpointNormalized "Previous completed batch: 5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP" "checkpoint current doc reports previous completed text adapter MVP batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP" "checkpoint current doc reports next likely text adapter result capture batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesSource "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesSource "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"

Assert-Contains $athenaPanelSource '"text-adapter-review-capability"' "AthenaCommandCenterPanel uses scoped text adapter review capability keys"
Assert-Contains $athenaPanelSource '"text-adapter-review-workspace"' "AthenaCommandCenterPanel uses scoped text adapter review workspace keys"
Assert-NotMatches $athenaPanelSource "key=\{group\.capabilityFamilyId\}" "AthenaCommandCenterPanel does not use raw repeated capability ids as sibling React keys for text adapter review list rendering"
Assert-NotMatches $athenaPanelSource "key=\{group\.workspaceTarget\}" "AthenaCommandCenterPanel does not use raw workspace ids as sibling React keys for text adapter review list rendering"

$validation = Invoke-TextAdapterReviewPreviewValidation $root
Assert-Equal $validation.highestDetectedPhase "5705" "review summary reports phase 5705"
Assert-Equal $validation.latestCompletedBatch "5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview" "review summary reports latest completed batch"
Assert-Equal $validation.previousCompletedBatch "5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP" "review summary reports previous completed batch"
Assert-Equal $validation.nextLikelyBatch "5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP" "review summary reports next likely batch"
Assert-Equal $validation.currentReadiness "minimal-text-adapter-review-only / backend-only / fixture-only / not provider-capable / not persistent" "review summary reports review readiness"
Assert-Equal $validation.acceptanceState "not accepted for live provider execution / text adapter fixture MVP accepted only" "review summary reports acceptance state"
Assert-Equal $validation.outputStatement "Fixture response only. No real output. No provider call. No persistence." "output review keeps fixture-only statement"
Assert-Equal $validation.gateStatement "No live gate pass." "gate failure review keeps no-live statement"
Assert-Equal $validation.recoveryStatement "No retry. No fallback. No provider execution. No prompt sending. No persistence." "recovery plan keeps no-retry/no-fallback statement"
Assert-Equal $validation.acceptanceStatement "Text adapter fixture accepted only. Live provider execution not accepted." "acceptance posture keeps fixture acceptance statement"
Assert-Equal $validation.helperAdapterState "completed-text-adapter-fixture-only" "server-only helper remains fixture-only"
Assert-Equal $validation.helperProviderResponseState "not received" "server-only helper keeps provider response blocked"
Assert-Equal $validation.helperModelOutputState "not generated" "server-only helper keeps model output blocked"
Assert-Equal $validation.helperPersistenceState "not implemented" "server-only helper keeps persistence blocked"

if ([int]$validation.reviewCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter review records."
}
Write-Host "[PASS] text adapter review record count is $($validation.reviewCount)"

if ([int]$validation.outputReviewCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter output review records."
}
Write-Host "[PASS] text adapter output review record count is $($validation.outputReviewCount)"

if ([int]$validation.gateFailureCount -lt 30) {
  throw "[FAIL] Expected at least 30 text adapter gate failure review records."
}
Write-Host "[PASS] text adapter gate failure review count is $($validation.gateFailureCount)"

if ([int]$validation.recoveryPlanCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter recovery plan records."
}
Write-Host "[PASS] text adapter recovery plan count is $($validation.recoveryPlanCount)"

if ([int]$validation.readinessCount -lt 28) {
  throw "[FAIL] Expected at least 28 text adapter recovery readiness checklist records."
}
Write-Host "[PASS] text adapter recovery readiness checklist count is $($validation.readinessCount)"

if ([int]$validation.auditSummaryCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter review audit summary records."
}
Write-Host "[PASS] text adapter review audit summary count is $($validation.auditSummaryCount)"

if ([int]$validation.acceptanceCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter acceptance posture records."
}
Write-Host "[PASS] text adapter acceptance posture count is $($validation.acceptanceCount)"

if ([int]$validation.topGateLabelsCount -lt 10) {
  throw "[FAIL] Expected at least 10 unique top gate labels."
}
Write-Host "[PASS] text adapter gate summary reports $($validation.topGateLabelsCount) unique gate labels"

if ([int]$validation.checklistCount -lt 4) {
  throw "[FAIL] Expected at least 4 result capture checklist lines."
}
Write-Host "[PASS] text adapter result capture checklist count is $($validation.checklistCount)"

Write-Host "[PASS] CodexForge Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview smoke completed."
