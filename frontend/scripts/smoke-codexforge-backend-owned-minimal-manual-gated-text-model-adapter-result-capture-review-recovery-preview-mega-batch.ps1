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

function Invoke-TextAdapterResultCaptureReviewValidation {
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
  "min-text-capture-review",
  "index.ts"
));

const helperModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-text-capture",
  "min-text-capture-helper.server.ts"
));

const requiredExports = [
  "buildStableMinimalTextAdapterResultCaptureReviewKey",
  "buildStableTextAdapterResultCaptureOutputReviewKey",
  "buildStableTextAdapterResultCaptureGateFailureReviewKey",
  "buildStableTextAdapterResultCaptureRecoveryPlanKey",
  "buildStableTextAdapterResultCaptureRecoveryReadinessChecklistKey",
  "buildStableTextAdapterResultCaptureReviewAuditSummaryKey",
  "buildStableTextAdapterResultCaptureAcceptancePostureKey",
  "listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews",
  "listTextAdapterResultCaptureOutputReviewRecords",
  "listTextAdapterResultCaptureGateFailureReviewRecords",
  "listTextAdapterResultCaptureRecoveryPlanPreviews",
  "listTextAdapterResultCaptureRecoveryReadinessChecklistRecords",
  "listTextAdapterResultCaptureReviewAuditSummaries",
  "listTextAdapterResultCaptureAcceptancePostureRecords",
  "groupTextAdapterResultCaptureReviewsByCapabilityFamily",
  "groupTextAdapterResultCaptureReviewsByWorkspaceTarget",
  "buildTextAdapterResultCaptureReviewSummary",
  "buildTextAdapterResultCaptureOutputReviewSummary",
  "buildTextAdapterResultCaptureGateFailureSummary",
  "buildTextAdapterResultCaptureRecoverySummary",
  "buildMinimalTextAdapterAuditApprovalJoinMvpChecklist"
];

for (const exportName of requiredExports) {
  if (typeof reviewModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

if (typeof helperModule.runMinimalManualGatedTextAdapterResultCaptureMvpForStaticFixture !== "function") {
  throw new Error("Missing runMinimalManualGatedTextAdapterResultCaptureMvpForStaticFixture export.");
}

const reviewsA = reviewModule.listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews();
const reviewsB = reviewModule.listBackendOwnedMinimalManualGatedTextModelAdapterResultCaptureReviews();
if (JSON.stringify(reviewsA) !== JSON.stringify(reviewsB)) {
  throw new Error("Text adapter result capture review records are not deterministic.");
}

const reviews = reviewsA;
const outputReviews = reviewModule.listTextAdapterResultCaptureOutputReviewRecords();
const gateFailures = reviewModule.listTextAdapterResultCaptureGateFailureReviewRecords();
const recoveryPlans = reviewModule.listTextAdapterResultCaptureRecoveryPlanPreviews();
const readiness = reviewModule.listTextAdapterResultCaptureRecoveryReadinessChecklistRecords();
const auditSummaries = reviewModule.listTextAdapterResultCaptureReviewAuditSummaries();
const acceptancePostures = reviewModule.listTextAdapterResultCaptureAcceptancePostureRecords();
const capabilityGroups = reviewModule.groupTextAdapterResultCaptureReviewsByCapabilityFamily();
const workspaceGroups = reviewModule.groupTextAdapterResultCaptureReviewsByWorkspaceTarget();
const reviewSummary = reviewModule.buildTextAdapterResultCaptureReviewSummary();
const outputReviewSummary = reviewModule.buildTextAdapterResultCaptureOutputReviewSummary();
const gateFailureSummary = reviewModule.buildTextAdapterResultCaptureGateFailureSummary();
const recoverySummary = reviewModule.buildTextAdapterResultCaptureRecoverySummary();
const checklist = reviewModule.buildMinimalTextAdapterAuditApprovalJoinMvpChecklist();
const helper = helperModule.runMinimalManualGatedTextAdapterResultCaptureMvpForStaticFixture();

process.stdout.write(JSON.stringify({
  reviewCount: reviews.length,
  outputReviewCount: outputReviews.length,
  gateFailureCount: gateFailures.length,
  recoveryPlanCount: recoveryPlans.length,
  readinessCount: readiness.length,
  auditSummaryCount: auditSummaries.length,
  acceptanceCount: acceptancePostures.length,
  capabilityGroupCount: capabilityGroups.length,
  workspaceGroupCount: workspaceGroups.length,
  checklistCount: checklist.length,
  topGateLabelsCount: gateFailureSummary.topFailedGateLabels.length,
  highestDetectedPhase: String(reviewSummary.highestDetectedPhase),
  latestCompletedBatch: reviewSummary.latestCompletedBatch,
  previousCompletedBatch: reviewSummary.previousCompletedBatch,
  nextLikelyBatch: reviewSummary.nextLikelyBatch,
  currentReadiness: reviewSummary.currentReadiness,
  acceptanceState: reviewSummary.acceptanceState,
  stableReviewKey: reviewModule.buildStableMinimalTextAdapterResultCaptureReviewKey("conversational-planning-request"),
  stableOutputKey: reviewModule.buildStableTextAdapterResultCaptureOutputReviewKey("conversational-planning-request"),
  outputStatement: outputReviews[0].explicitFixtureCaptureOnlyNoRealOutputNoProviderCallNoPersistenceStatement,
  gateStatement: gateFailures[0].explicitNoLiveGatePassStatement,
  recoveryStatement: recoveryPlans[0].explicitNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement,
  acceptanceStatement: acceptancePostures[0].explicitTextAdapterResultCaptureFixtureAcceptedLivePersistenceNotAcceptedStatement,
  helperCaptureState: helper.captureState,
  helperProviderResponseState: helper.providerResponseState,
  helperModelOutputState: helper.modelOutputState,
  helperPersistenceState: helper.persistenceState,
  outputReviewSummaryCount: String(outputReviewSummary.outputReviewCount),
  recoverySummaryCount: String(recoverySummary.recoveryPlanCount)
}));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute text adapter result capture review validation."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview Mega Batch smoke ==="

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
$reviewTypesPath = Join-Path $root "src\lib\codexforge\min-text-capture-review\min-text-capture-review-types.ts"
$reviewCatalogPath = Join-Path $root "src\lib\codexforge\min-text-capture-review\min-text-capture-review-catalog.ts"
$reviewIndexPath = Join-Path $root "src\lib\codexforge\min-text-capture-review\index.ts"
$captureTypesPath = Join-Path $root "src\lib\codexforge\min-text-capture\min-text-capture-types.ts"
$captureCatalogPath = Join-Path $root "src\lib\codexforge\min-text-capture\min-text-capture-catalog.ts"
$captureIndexPath = Join-Path $root "src\lib\codexforge\min-text-capture\index.ts"
$captureHelperPath = Join-Path $root "src\lib\codexforge\min-text-capture\min-text-capture-helper.server.ts"
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
  $captureTypesPath,
  $captureCatalogPath,
  $captureIndexPath,
  $captureHelperPath,
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
$providersSource = Get-CombinedFileText @(
  $providersPagePath,
  $providersPageClientPath
)
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$typedModelSource = Get-CombinedFileText @(
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath,
  $captureTypesPath,
  $captureCatalogPath,
  $captureIndexPath
)
$serverHelperSource = Get-Content -Raw $captureHelperPath
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
$providersNormalized = Normalize-Whitespace $providersSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$serverHelperNormalized = Normalize-Whitespace $serverHelperSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource

foreach ($needle in @(
  "5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview",
  "5769",
  "Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $providersNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal manual-gated text model adapter result capture MVP",
  "Text adapter result capture evidence preview",
  "Backend-owned minimal text adapter result capture review",
  "Text adapter result capture output review",
  "Text adapter result capture gate failure review",
  "Text adapter result capture recovery plan",
  "Text adapter result capture recovery readiness",
  "Text adapter result capture review audit summary",
  "Text adapter result capture acceptance posture",
  "Athena can review the backend-owned minimal manual-gated text model adapter result capture MVP",
  "minimal text adapter result capture review is preview-only",
  "server-only text adapter result capture helper exists",
  "text adapter fixture response is captured in memory only",
  "text adapter result capture is not persistent",
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
  "Backend-owned minimal manual-gated text model adapter audit and approval join MVP"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now review the backend-owned minimal manual-gated text model adapter result capture MVP",
  "minimal text adapter result capture review is preview-only",
  "server-only text adapter result capture helper exists",
  "text adapter fixture response is captured in memory only",
  "text adapter result capture is not persistent",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "Athena can now review the backend-owned minimal manual-gated text model adapter audit and approval join MVP"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Backend-owned minimal text adapter result capture review",
  "Text adapter result capture output review",
  "Text adapter result capture gate failure review",
  "Text adapter result capture recovery plan",
  "Text adapter result capture recovery readiness",
  "Text adapter result capture acceptance posture",
  "minimal text adapter result capture review is preview-only",
  "server-only text adapter result capture helper exists",
  "text adapter fixture response is captured in memory only",
  "text adapter result capture is not persistent",
  "no provider execution",
  "no model calls",
  "no persistence",
  "Backend-owned minimal manual-gated text model adapter audit and approval join MVP"
)) {
  Assert-Contains $providersNormalized $needle "/ai-providers contains $needle"
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
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-output-review-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-failure-review-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-plan-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-recovery-readiness-checklist-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review-audit-summary-preview-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-acceptance-posture-preview-v1",
  "Backend-owned minimal text adapter result capture review",
  "Text adapter result capture output review",
  "Text adapter result capture gate failure review",
  "Text adapter result capture recovery plan",
  "Text adapter result capture recovery readiness",
  "Text adapter result capture review audit summary",
  "Text adapter result capture acceptance posture",
  "no model calls",
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
  "captureMinimalManualGatedTextModelAdapterResultMvp",
  "runMinimalManualGatedTextAdapterResultCaptureMvpForStaticFixture",
  "captured-text-adapter-fixture-in-memory-only",
  "deterministic fixture result captured in memory only"
)) {
  Assert-Contains $serverHelperNormalized $needle "server-only text adapter result capture helper marker contains $needle"
}

foreach ($source in @($typedModelSource, $serverHelperSource)) {
  Assert-NotMatches $source "Math\.random|Date\.now|crypto\.randomUUID" "deterministic text adapter result capture review source excludes nondeterministic generators"
  Assert-NotMatches $source "fetch\s*\(|XMLHttpRequest|axios\.|navigator\.sendBeacon" "deterministic text adapter result capture review source excludes network calls"
  Assert-NotMatches $source "process\.env\." "deterministic text adapter result capture review source excludes env var reads"
  Assert-NotMatches $source "localStorage|sessionStorage|indexedDB|document\.cookie" "deterministic text adapter result capture review source excludes browser storage"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-result-capture-review-recovery-preview-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"

Assert-Contains $checkpointNormalized "Highest detected phase: 5769" "checkpoint current doc reports Highest detected phase: 5769"
Assert-Contains $checkpointNormalized "Latest completed batch: 5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview" "checkpoint current doc reports latest completed text adapter result capture review batch"
Assert-Contains $checkpointNormalized "Previous completed batch: 5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP" "checkpoint current doc reports previous completed text adapter result capture MVP batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP" "checkpoint current doc reports next likely text adapter audit and approval join batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesSource "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesSource "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"

Assert-Contains $athenaPanelSource '"text-adapter-result-capture-review-capability"' "AthenaCommandCenterPanel uses scoped text adapter result capture review capability keys"
Assert-Contains $athenaPanelSource '"text-adapter-result-capture-review-workspace"' "AthenaCommandCenterPanel uses scoped text adapter result capture review workspace keys"
Assert-NotMatches $athenaPanelSource "key=\{group\.capabilityFamilyId\}" "AthenaCommandCenterPanel does not use raw repeated capability ids as sibling React keys for text adapter result capture review list rendering"

$validation = Invoke-TextAdapterResultCaptureReviewValidation $root
Assert-Equal $validation.highestDetectedPhase "5769" "review summary reports phase 5769"
Assert-Equal $validation.latestCompletedBatch "5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview" "review summary reports latest completed batch"
Assert-Equal $validation.previousCompletedBatch "5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP" "review summary reports previous completed batch"
Assert-Equal $validation.nextLikelyBatch "5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP" "review summary reports next likely batch"
Assert-Equal $validation.currentReadiness "minimal-text-adapter-result-capture-review-only / backend-only / fixture-only / in-memory-only / not persistent" "review summary reports review readiness"
Assert-Equal $validation.acceptanceState "not accepted for live persistence / text adapter result capture fixture MVP accepted only" "review summary reports acceptance state"
Assert-Equal $validation.outputStatement "Fixture capture only. No real output. No provider call. No persistence." "output review keeps fixture-only statement"
Assert-Equal $validation.gateStatement "No live gate pass." "gate failure review keeps no-live statement"
Assert-Equal $validation.recoveryStatement "No retry. No fallback. No provider execution. No prompt sending. No persistence." "recovery plan keeps no-retry/no-fallback statement"
Assert-Equal $validation.acceptanceStatement "Text adapter result capture fixture accepted only. Live persistence not accepted." "acceptance posture keeps fixture acceptance statement"
Assert-Equal $validation.helperCaptureState "captured-text-adapter-fixture-in-memory-only" "server-only helper remains in-memory only"
Assert-Equal $validation.helperProviderResponseState "not received" "server-only helper keeps provider response blocked"
Assert-Equal $validation.helperModelOutputState "not generated" "server-only helper keeps model output blocked"
Assert-Equal $validation.helperPersistenceState "not implemented" "server-only helper keeps persistence blocked"

if ([int]$validation.reviewCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter result capture review records."
}
Write-Host "[PASS] text adapter result capture review record count is $($validation.reviewCount)"

if ([int]$validation.outputReviewCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter result capture output review records."
}
Write-Host "[PASS] text adapter result capture output review record count is $($validation.outputReviewCount)"

if ([int]$validation.gateFailureCount -lt 30) {
  throw "[FAIL] Expected at least 30 text adapter result capture gate failure review records."
}
Write-Host "[PASS] text adapter result capture gate failure review count is $($validation.gateFailureCount)"

if ([int]$validation.recoveryPlanCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter result capture recovery plan records."
}
Write-Host "[PASS] text adapter result capture recovery plan count is $($validation.recoveryPlanCount)"

if ([int]$validation.readinessCount -lt 28) {
  throw "[FAIL] Expected at least 28 text adapter result capture recovery readiness checklist records."
}
Write-Host "[PASS] text adapter result capture recovery readiness checklist count is $($validation.readinessCount)"

if ([int]$validation.auditSummaryCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter result capture review audit summary records."
}
Write-Host "[PASS] text adapter result capture review audit summary count is $($validation.auditSummaryCount)"

if ([int]$validation.acceptanceCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter result capture acceptance posture records."
}
Write-Host "[PASS] text adapter result capture acceptance posture count is $($validation.acceptanceCount)"

if ([int]$validation.topGateLabelsCount -lt 4) {
  throw "[FAIL] Expected at least 4 unique text adapter result capture gate labels."
}
Write-Host "[PASS] text adapter result capture gate summary reports $($validation.topGateLabelsCount) unique gate labels"

if ([int]$validation.checklistCount -lt 4) {
  throw "[FAIL] Expected at least 4 text adapter audit and approval join checklist lines."
}
Write-Host "[PASS] text adapter audit and approval join checklist count is $($validation.checklistCount)"

Write-Host "[PASS] backend-owned minimal manual-gated text model adapter result capture review and recovery preview mega batch smoke passed"
