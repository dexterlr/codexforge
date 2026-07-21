param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$repoRoot = Resolve-Path $root
if (-not (Test-Path (Join-Path $repoRoot "package.json"))) {
  $parentRoot = Resolve-Path (Join-Path $root "..")
  if (Test-Path (Join-Path $parentRoot "package.json")) {
    $repoRoot = $parentRoot
  }
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
  if ([regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase -bor [System.Text.RegularExpressions.RegexOptions]::Multiline)) {
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
        @(".ts", ".tsx", ".js", ".jsx", ".md", ".ps1") -contains $_.Extension
      }
    } else {
      $files += $item
    }
  }

  return @($files | Sort-Object -Property FullName -Unique)
}

function Get-CombinedSourceText {
  param([System.IO.FileInfo[]]$Files)
  return ($Files | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
}

function Invoke-ProviderDryRunExecutionReviewValidation {
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
  "min-provider-exec-review",
  "index.ts"
));

const executionModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-exec",
  "index.ts"
));

const requiredReviewExports = [
  "buildStableProviderDryRunExecutionReviewKey",
  "buildStableProviderDryRunExecutionOutputReviewKey",
  "buildStableProviderDryRunExecutionGateFailureReviewKey",
  "buildStableProviderDryRunExecutionRecoveryPlanKey",
  "buildStableProviderDryRunExecutionRecoveryReadinessChecklistKey",
  "buildStableProviderDryRunExecutionReviewAuditSummaryKey",
  "buildStableProviderDryRunExecutionAcceptancePostureKey",
  "buildUniqueProviderDryRunExecutionReviewDisplayStrings",
  "listBackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviews",
  "listProviderDryRunExecutionOutputReviewRecords",
  "listProviderDryRunExecutionGateFailureReviewRecords",
  "listProviderDryRunExecutionRecoveryPlanPreviews",
  "listProviderDryRunExecutionRecoveryReadinessChecklistRecords",
  "listProviderDryRunExecutionReviewAuditSummaries",
  "listProviderDryRunExecutionAcceptancePostureRecords",
  "groupProviderDryRunExecutionReviewsByCapabilityFamily",
  "groupProviderDryRunExecutionReviewsByProviderSlot",
  "groupProviderDryRunExecutionReviewsByCredentialReference",
  "buildProviderDryRunExecutionReviewSummary",
  "buildProviderDryRunExecutionOutputReviewSummary",
  "buildProviderDryRunExecutionGateFailureSummary",
  "buildProviderDryRunExecutionRecoverySummary",
  "buildProviderAdapterDryRunResultCaptureMvpChecklist"
];

for (const exportName of requiredReviewExports) {
  if (typeof reviewModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

const reviewsA = reviewModule.listBackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviews();
const reviewsB = reviewModule.listBackendOwnedMinimalManualGatedProviderAdapterDryRunExecutionReviews();
if (JSON.stringify(reviewsA) !== JSON.stringify(reviewsB)) {
  throw new Error("Provider dry-run execution review records are not deterministic.");
}

const outputReviews = reviewModule.listProviderDryRunExecutionOutputReviewRecords();
const gateFailureReviews = reviewModule.listProviderDryRunExecutionGateFailureReviewRecords();
const recoveryPlans = reviewModule.listProviderDryRunExecutionRecoveryPlanPreviews();
const readinessChecks = reviewModule.listProviderDryRunExecutionRecoveryReadinessChecklistRecords();
const auditSummaries = reviewModule.listProviderDryRunExecutionReviewAuditSummaries();
const acceptancePostures = reviewModule.listProviderDryRunExecutionAcceptancePostureRecords();
const capabilityGroups = reviewModule.groupProviderDryRunExecutionReviewsByCapabilityFamily();
const providerSlotGroups = reviewModule.groupProviderDryRunExecutionReviewsByProviderSlot();
const credentialReferenceGroups = reviewModule.groupProviderDryRunExecutionReviewsByCredentialReference();
const reviewSummary = reviewModule.buildProviderDryRunExecutionReviewSummary();
const outputReviewSummary = reviewModule.buildProviderDryRunExecutionOutputReviewSummary();
const gateFailureSummary = reviewModule.buildProviderDryRunExecutionGateFailureSummary();
const recoverySummary = reviewModule.buildProviderDryRunExecutionRecoverySummary();
const resultCaptureChecklist = reviewModule.buildProviderAdapterDryRunResultCaptureMvpChecklist();
const uniqueDisplayStrings = reviewModule.buildUniqueProviderDryRunExecutionReviewDisplayStrings([
  "alpha",
  "alpha",
  "beta"
]);

const executionHelperA = executionModule.runMinimalManualGatedProviderDryRunExecutionMvpForStaticFixture();
const executionHelperB = executionModule.runMinimalManualGatedProviderDryRunExecutionMvpForStaticFixture();
if (JSON.stringify(executionHelperA) !== JSON.stringify(executionHelperB)) {
  throw new Error("Provider dry-run execution helper output is not deterministic.");
}

process.stdout.write(JSON.stringify({
  reviewCount: reviewsA.length,
  outputReviewCount: outputReviews.length,
  gateFailureCount: gateFailureReviews.length,
  recoveryPlanCount: recoveryPlans.length,
  readinessChecklistCount: readinessChecks.length,
  auditSummaryCount: auditSummaries.length,
  acceptancePostureCount: acceptancePostures.length,
  capabilityGroupCount: capabilityGroups.length,
  providerSlotGroupCount: providerSlotGroups.length,
  credentialReferenceGroupCount: credentialReferenceGroups.length,
  reviewSummaryPhase: String(reviewSummary.highestDetectedPhase),
  reviewSummaryLatestBatch: reviewSummary.latestCompletedBatch,
  reviewSummaryPreviousBatch: reviewSummary.previousCompletedBatch,
  reviewSummaryNextBatch: reviewSummary.nextLikelyBatch,
  reviewSummaryCurrentReadiness: reviewSummary.currentReadiness,
  reviewSummaryAcceptanceState: reviewSummary.acceptanceState,
  reviewSummaryRecoveryPosture: reviewSummary.recoveryPosture,
  outputReviewSummaryCount: outputReviewSummary.recordCount,
  gateFailureSummaryCount: gateFailureSummary.recordCount,
  recoverySummaryPlanCount: recoverySummary.planCount,
  recoverySummaryChecklistCount: recoverySummary.checklistCount,
  checklistLineCount: resultCaptureChecklist.length,
  stableReviewKey: reviewModule.buildStableProviderDryRunExecutionReviewKey("openai-compatible-text-provider-dry-run-execution-slot"),
  stableOutputReviewKey: reviewModule.buildStableProviderDryRunExecutionOutputReviewKey("code-assistance-request"),
  uniqueDisplayCount: uniqueDisplayStrings.length,
  executionHelperState: executionHelperA.executionState,
  executionHelperCredentialValueState: executionHelperA.credentialValueState,
  executionHelperEnvVarState: executionHelperA.envVarState,
  executionHelperProviderKeyState: executionHelperA.providerKeyState,
  executionHelperProviderSdkImportState: executionHelperA.providerSdkImportState,
  executionHelperLiveProviderExecutionState: executionHelperA.liveProviderExecutionState,
  executionHelperProviderResponseState: executionHelperA.providerResponseState,
  executionHelperModelOutputState: executionHelperA.modelOutputState,
  executionHelperPersistenceState: executionHelperA.persistenceState,
  executionHelperNoFrontendRequestStatement: executionHelperA.noFrontendRequestStatement,
  executionHelperNoApiRouteStatement: executionHelperA.noApiRouteStatement,
  executionHelperNoProviderCallStatement: executionHelperA.noProviderCallStatement,
  executionHelperNoModelCallStatement: executionHelperA.noModelCallStatement
}));
'@

  $validationRaw = $nodeScript | node - $RepoRootPath
  return $validationRaw | ConvertFrom-Json
}

Write-Host "=== Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview smoke ==="

$jarvisPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$homePath = Join-Path $root "src\app\page-client.tsx"
$providersPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$athenaContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$athenaShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$jarvisVideoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$reviewModuleDir = Join-Path $root "src\lib\codexforge\min-provider-exec-review"
$executionModuleDir = Join-Path $root "src\lib\codexforge\min-provider-exec"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"

foreach ($path in @(
  $jarvisPath,
  $homePath,
  $providersPath,
  $athenaContentPath,
  $athenaPanelPath,
  $athenaShellPath,
  $athenaModelPath,
  $jarvisVideoPanelPath,
  $navigationTypesPath,
  $reviewModuleDir,
  $executionModuleDir,
  $checkpointPath,
  $allSmokePath
)) {
  Assert-FileExists $path
}

$jarvisSource = Get-CombinedSourceText (Get-SourceFiles @(
  $jarvisPath,
  $athenaContentPath,
  $athenaPanelPath,
  $athenaShellPath,
  $athenaModelPath
))
$homeSource = Get-CombinedSourceText (Get-SourceFiles @(
  $homePath,
  $athenaContentPath,
  $athenaShellPath,
  $athenaModelPath
))
$videoSource = Get-CombinedSourceText (Get-SourceFiles @($jarvisVideoPanelPath))
$reviewModuleSource = Get-CombinedSourceText (Get-SourceFiles @($reviewModuleDir))
$executionModuleSource = Get-CombinedSourceText (Get-SourceFiles @($executionModuleDir))
$frontEndSource = Get-CombinedSourceText (Get-SourceFiles @(
  $jarvisPath,
  $homePath,
  $providersPath,
  $athenaContentPath,
  $athenaPanelPath,
  $athenaShellPath,
  $athenaModelPath
))
$allSmokeText = Get-Content -Raw $allSmokePath
$checkpointText = Get-Content -Raw $checkpointPath
$navigationTypesText = Get-Content -Raw $navigationTypesPath
$athenaPanelText = Get-Content -Raw $athenaPanelPath

$validation = Invoke-ProviderDryRunExecutionReviewValidation -RepoRootPath $repoRoot

Assert-Equal ([string]$validation.reviewCount) "9" "review record count"
Assert-Equal ([string]$validation.outputReviewCount) "9" "output review record count"
Assert-Equal ([string]$validation.recoveryPlanCount) "9" "recovery plan count"
Assert-Equal ([string]$validation.auditSummaryCount) "9" "audit summary count"
Assert-Equal ([string]$validation.acceptancePostureCount) "9" "acceptance posture count"
Assert-Equal ([string]$validation.reviewSummaryPhase) "6025" "review summary phase"
Assert-Equal $validation.reviewSummaryLatestBatch "5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview" "review summary latest batch"
Assert-Equal $validation.reviewSummaryPreviousBatch "5962-5993 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution MVP" "review summary previous batch"
Assert-Equal $validation.reviewSummaryNextBatch "6026-6057 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP" "review summary next batch"
Assert-Equal $validation.reviewSummaryCurrentReadiness "minimal-provider-dry-run-execution-review-only / backend-only / dry-run-fixture-only / credential-reference-only / not-live-provider-executing / not persistent" "review summary readiness"
Assert-Equal $validation.reviewSummaryAcceptanceState "not accepted for live provider execution / provider dry-run execution fixture MVP accepted only" "review summary acceptance state"
Assert-Equal $validation.reviewSummaryRecoveryPosture "manual review only" "review summary recovery posture"
Assert-Equal ([string]$validation.capabilityGroupCount) "2" "capability group count"
Assert-Equal ([string]$validation.providerSlotGroupCount) "5" "provider slot group count"
Assert-Equal ([string]$validation.credentialReferenceGroupCount) "2" "credential reference group count"
Assert-Equal ([string]$validation.checklistLineCount) "5" "result capture checklist line count"
Assert-Equal $validation.stableReviewKey "backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review:openai-compatible-text-provider-dry-run-execution-slot" "stable review key"
Assert-Equal $validation.uniqueDisplayCount "2" "unique display helper deduplicates"
Assert-Equal $validation.executionHelperState "executed-provider-dry-run-fixture-in-memory-only" "execution helper state preserved"
Assert-Equal $validation.executionHelperCredentialValueState "not present / not read" "execution helper credential value state preserved"
Assert-Equal $validation.executionHelperEnvVarState "not read" "execution helper env var state preserved"
Assert-Equal $validation.executionHelperProviderKeyState "not read" "execution helper provider key state preserved"
Assert-Equal $validation.executionHelperProviderSdkImportState "not imported" "execution helper provider SDK import state preserved"
Assert-Equal $validation.executionHelperLiveProviderExecutionState "blocked" "execution helper live provider execution state preserved"
Assert-Equal $validation.executionHelperProviderResponseState "not received from provider" "execution helper provider response state preserved"
Assert-Equal $validation.executionHelperModelOutputState "not generated by provider/model" "execution helper model output state preserved"
Assert-Equal $validation.executionHelperPersistenceState "not implemented" "execution helper persistence state preserved"
Assert-Contains $validation.executionHelperNoFrontendRequestStatement "no frontend request" "execution helper no frontend request statement"
Assert-Contains $validation.executionHelperNoApiRouteStatement "no API route" "execution helper no API route statement"
Assert-Contains $validation.executionHelperNoProviderCallStatement "no provider call" "execution helper no provider call statement"
Assert-Contains $validation.executionHelperNoModelCallStatement "no model call" "execution helper no model call statement"

if ([int]$validation.gateFailureCount -ne 486) {
  throw "[FAIL] gate failure review record count expected 486 found $($validation.gateFailureCount)"
}
Write-Host "[PASS] gate failure review record count"

if ([int]$validation.readinessChecklistCount -ne 351) {
  throw "[FAIL] readiness checklist record count expected 351 found $($validation.readinessChecklistCount)"
}
Write-Host "[PASS] readiness checklist record count"

Assert-Contains $reviewModuleSource "5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview" "batch marker 5994-6025 exists"
Assert-Contains $reviewModuleSource "6025" "phase 6025 exists"
Assert-Contains $reviewModuleSource "Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview" "review and recovery preview title exists"

Assert-Contains $jarvisSource "Athena" "/jarvis contains Athena"
Assert-Contains $jarvisSource "Athena Command Center" "/jarvis contains Athena Command Center"
Assert-Contains $jarvisSource "Backend-owned minimal manual-gated provider adapter dry-run execution MVP" "/jarvis contains Backend-owned minimal manual-gated provider adapter dry-run execution MVP"
Assert-Contains $jarvisSource "Provider adapter dry-run execution evidence preview" "/jarvis contains Provider adapter dry-run execution evidence preview"
Assert-Contains $jarvisSource "Backend-owned minimal provider adapter dry-run execution review" "/jarvis contains Backend-owned minimal provider adapter dry-run execution review"
Assert-Contains $jarvisSource "Provider adapter dry-run execution output review" "/jarvis contains Provider adapter dry-run execution output review"
Assert-Contains $jarvisSource "Provider adapter dry-run execution gate failure review" "/jarvis contains Provider adapter dry-run execution gate failure review"
Assert-Contains $jarvisSource "Provider adapter dry-run execution recovery plan" "/jarvis contains Provider adapter dry-run execution recovery plan"
Assert-Contains $jarvisSource "Provider adapter dry-run execution recovery readiness" "/jarvis contains Provider adapter dry-run execution recovery readiness"
Assert-Contains $jarvisSource "Provider adapter dry-run execution review audit summary" "/jarvis contains Provider adapter dry-run execution review audit summary"
Assert-Contains $jarvisSource "Provider adapter dry-run execution acceptance posture" "/jarvis contains Provider adapter dry-run execution acceptance posture"
Assert-Contains $jarvisSource "Athena can review the backend-owned minimal manual-gated provider adapter dry-run execution MVP" "/jarvis contains review copy"
Assert-Contains $jarvisSource "provider adapter dry-run execution review is preview-only" "/jarvis contains preview-only review copy"
Assert-Contains $jarvisSource "server-only provider dry-run execution helper exists" "/jarvis contains server-only helper copy"
Assert-Contains $jarvisSource "provider dry-run execution is deterministic fixture-only" "/jarvis contains deterministic fixture copy"
Assert-Contains $jarvisSource "dry-run fixture response is produced in memory only" "/jarvis contains fixture response copy"
Assert-Contains $jarvisSource "live provider execution is blocked" "/jarvis contains blocked live execution copy"
Assert-Contains $jarvisSource "credential reference is opaque label only" "/jarvis contains opaque credential reference copy"
Assert-Contains $jarvisSource "credential value is not present" "/jarvis contains credential value not present copy"
Assert-Contains $jarvisSource "credential value is not read" "/jarvis contains credential value not read copy"
Assert-Contains $jarvisSource "env vars are not read" "/jarvis contains env vars not read copy"
Assert-Contains $jarvisSource "provider key is not read" "/jarvis contains provider key not read copy"
Assert-Contains $jarvisSource "selected provider slot is preview-only" "/jarvis contains selected provider slot preview-only copy"
Assert-Contains $jarvisSource "provider adapter dry-run execution is not live provider execution" "/jarvis contains not-live execution copy"
Assert-Contains $jarvisSource "no frontend request is created" "/jarvis contains no frontend request copy"
Assert-Contains $jarvisSource "no API route is created" "/jarvis contains no API route copy"
Assert-Contains $jarvisSource "No prompt sending" "/jarvis contains no prompt sending copy"
Assert-Contains $jarvisSource "No model calls yet" "/jarvis contains no model calls yet copy"
Assert-Contains $jarvisSource "No provider SDKs imported" "/jarvis contains no provider SDKs imported copy"
Assert-Contains $jarvisSource "no live provider execution" "/jarvis contains no live provider execution copy"
Assert-Contains $jarvisSource "provider adapter dry-run result capture MVP comes next" "/jarvis contains next batch copy"

Assert-Contains $homeSource "CodexForge Operator Cockpit" "home contains CodexForge Operator Cockpit"
Assert-Contains $homeSource "Athena can now review the backend-owned minimal manual-gated provider adapter dry-run execution MVP" "home contains review copy"
Assert-Contains $homeSource "provider adapter dry-run execution review is preview-only" "home contains preview-only review copy"
Assert-Contains $homeSource "server-only provider dry-run execution helper exists" "home contains server-only helper copy"
Assert-Contains $homeSource "provider dry-run execution is deterministic fixture-only" "home contains deterministic fixture copy"
Assert-Contains $homeSource "dry-run fixture response is produced in memory only" "home contains fixture response copy"
Assert-Contains $homeSource "live provider execution is blocked" "home contains blocked live execution copy"
Assert-Contains $homeSource "credential reference is opaque label only" "home contains opaque credential reference copy"
Assert-Contains $homeSource "credential value is not read" "home contains credential value not read copy"
Assert-Contains $homeSource "env vars are not read" "home contains env vars not read copy"
Assert-Contains $homeSource "provider adapter dry-run result capture MVP comes next" "home contains next batch copy"

Assert-Contains $videoSource "Video generation control" "/jarvis-video still contains Video generation control"
Assert-Contains $videoSource "Prompt / concept" "/jarvis-video still contains Prompt / concept"
Assert-Contains $videoSource "Output preview" "/jarvis-video still contains Output preview"
Assert-Contains $videoSource "Generate video - locked" "/jarvis-video still contains Generate video - locked"

Assert-Contains $reviewModuleSource "Backend-owned minimal provider adapter dry-run execution review" "typed model/data contains provider adapter dry-run execution review markers"
Assert-Contains $reviewModuleSource "Provider adapter dry-run execution output review" "typed model/data contains provider dry-run execution output review markers"
Assert-Contains $reviewModuleSource "Provider adapter dry-run execution gate failure review" "typed model/data contains provider dry-run execution gate failure review markers"
Assert-Contains $reviewModuleSource "Provider adapter dry-run execution recovery plan" "typed model/data contains provider dry-run execution recovery plan markers"
Assert-Contains $reviewModuleSource "Provider adapter dry-run execution recovery readiness" "typed model/data contains provider dry-run execution recovery readiness checklist markers"
Assert-Contains $reviewModuleSource "Provider adapter dry-run execution review audit summary" "typed model/data contains provider dry-run execution review audit summary markers"
Assert-Contains $reviewModuleSource "Provider adapter dry-run execution acceptance posture" "typed model/data contains provider dry-run execution acceptance posture markers"
Assert-Contains $executionModuleSource "server-only provider dry-run execution helper exists" "server-only provider dry-run execution helper marker still exists"
Assert-Contains $executionModuleSource "provider dry-run execution is deterministic fixture-only" "deterministic provider dry-run execution marker still exists"
Assert-Contains $reviewModuleSource "credential reference is opaque label only" "opaque credential reference marker exists"
Assert-Contains $reviewModuleSource "credential value is not read" "credential value not read marker exists"
Assert-Contains $reviewModuleSource "env vars are not read" "env vars not read marker exists"
Assert-Contains $reviewModuleSource "provider key is not read" "provider key not read marker exists"
Assert-Contains $reviewModuleSource "live provider execution is blocked" "live provider execution blocked marker exists"
Assert-Contains $reviewModuleSource 'modelCallState: "not called"' "typed model/data contains no model calls markers"
Assert-Contains $reviewModuleSource "no prompt sending" "typed model/data contains no prompt sending markers"
Assert-Contains $reviewModuleSource "no provider SDK imports" "typed model/data contains no provider SDK imports markers"
Assert-Contains $reviewModuleSource "no live provider execution" "typed model/data contains no live provider execution markers"
Assert-Contains $reviewModuleSource "no result persistence" "typed model/data contains no result persistence markers"
Assert-Contains $reviewModuleSource "no audit persistence" "typed model/data contains no audit persistence markers"
Assert-Contains $reviewModuleSource "no approval persistence" "typed model/data contains no approval persistence markers"
Assert-Contains $reviewModuleSource "no database writes" "typed model/data contains no database write markers"
Assert-Contains $reviewModuleSource "no file writes" "typed model/data contains no file write markers"

Assert-Contains $allSmokeText "smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-dry-run-execution-review-recovery-preview-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $checkpointText "Highest detected phase: 6025" "checkpoint current doc reports Highest detected phase: 6025"
Assert-Contains $checkpointText "Latest completed batch: 5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointText "Next likely batch: 6026-6057 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource 'from\s+["''](?:openai|@anthropic-ai/sdk|anthropic|@google/generative-ai|google-generativeai|gemini)["'']|require\(["''](?:openai|@anthropic-ai/sdk|anthropic|@google/generative-ai|google-generativeai|gemini)["'']\)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\bfetch\s*\(|\bXMLHttpRequest\b|\baxios\b' "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource 'window\.localStorage|globalThis\.localStorage|\blocalStorage\s*\.|\blocalStorage\s*\[|window\.sessionStorage|globalThis\.sessionStorage|\bsessionStorage\s*\.|\bsessionStorage\s*\[|window\.indexedDB|globalThis\.indexedDB|\bindexedDB\s*\.|document\.cookie' "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource 'child_process|execSync|exec\(|spawn\(|Start-Process|powershell' "no command/process/shell execution from app code"
Assert-Contains $navigationTypesText "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesText 'CodexForgeNavigationRouteHref\s*=\s*string' "no route href loosening to string"
Assert-Contains $navigationTypesText "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesText 'commandDeckRole\s*:\s*string' "no commandDeckRole loosening to string"
Assert-NotMatches $reviewModuleSource 'process\.env' "no env var reads in provider dry-run execution review module"
Assert-NotMatches $reviewModuleSource 'credentials?\s*\.\s*value' "no credential value reads in provider dry-run execution review module"
Assert-NotMatches $reviewModuleSource 'provider(Key|ApiKey|Token)\s*[:=]\s*(get|read|load|fetch)' "no provider key reads in provider dry-run execution review module"
Assert-NotMatches $athenaPanelText 'key=\{(?:record|review)[^}]*providerSlotId\}' "AthenaCommandCenterPanel does not use raw repeated provider ids as sibling React keys for provider dry-run execution review list rendering"
Assert-NotMatches $athenaPanelText 'key=\{(?:record|review)[^}]*credentialReferenceId\}' "AthenaCommandCenterPanel does not use raw repeated credential ids as sibling React keys for provider dry-run execution review list rendering"

Write-Host "[PASS] Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview smoke passed"
