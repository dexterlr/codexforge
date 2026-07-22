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

function Normalize-Whitespace {
  param([AllowEmptyString()][string]$Text)
  return ([regex]::Replace($Text, "\s+", " ")).Trim()
}

function Invoke-ProviderDryRunResultCaptureReviewValidation {
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
  "min-provider-capture-review",
  "index.ts"
));

const captureModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-capture",
  "index.ts"
));

const helperModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-capture",
  "min-provider-capture-helper.server.ts"
));

const requiredReviewExports = [
  "buildStableProviderDryRunResultCaptureReviewKey",
  "buildStableProviderDryRunResultCaptureOutputReviewKey",
  "buildStableProviderDryRunResultCaptureGateFailureReviewKey",
  "buildStableProviderDryRunResultCaptureRecoveryPlanKey",
  "buildStableProviderDryRunResultCaptureRecoveryReadinessChecklistKey",
  "buildStableProviderDryRunResultCaptureReviewAuditSummaryKey",
  "buildStableProviderDryRunResultCaptureAcceptancePostureKey",
  "listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews",
  "listProviderDryRunResultCaptureOutputReviewRecords",
  "listProviderDryRunResultCaptureGateFailureReviewRecords",
  "listProviderDryRunResultCaptureRecoveryPlanPreviews",
  "listProviderDryRunResultCaptureRecoveryReadinessChecklistRecords",
  "listProviderDryRunResultCaptureReviewAuditSummaries",
  "listProviderDryRunResultCaptureAcceptancePostureRecords",
  "groupProviderDryRunResultCaptureReviewsByCapabilityFamily",
  "groupProviderDryRunResultCaptureReviewsByProviderSlot",
  "groupProviderDryRunResultCaptureReviewsByCredentialReference",
  "buildProviderDryRunResultCaptureReviewSummary",
  "buildProviderDryRunResultCaptureOutputReviewSummary",
  "buildProviderDryRunResultCaptureGateFailureSummary",
  "buildProviderDryRunResultCaptureRecoverySummary",
  "buildProviderAdapterDryRunAuditApprovalJoinMvpChecklist",
  "uniqueProviderDryRunResultCaptureReviewDisplayStrings"
];

for (const exportName of requiredReviewExports) {
  if (typeof reviewModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

if (typeof helperModule.captureMinimalManualGatedProviderAdapterDryRunResultMvp !== "function") {
  throw new Error("Missing captureMinimalManualGatedProviderAdapterDryRunResultMvp export.");
}

const reviewsA = reviewModule.listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews();
const reviewsB = reviewModule.listBackendOwnedMinimalManualGatedProviderAdapterDryRunResultCaptureReviews();
if (JSON.stringify(reviewsA) !== JSON.stringify(reviewsB)) {
  throw new Error("Provider dry-run result capture review records are not deterministic.");
}

const outputReviews = reviewModule.listProviderDryRunResultCaptureOutputReviewRecords();
const gateFailureReviews = reviewModule.listProviderDryRunResultCaptureGateFailureReviewRecords();
const recoveryPlans = reviewModule.listProviderDryRunResultCaptureRecoveryPlanPreviews();
const readinessChecks = reviewModule.listProviderDryRunResultCaptureRecoveryReadinessChecklistRecords();
const auditSummaries = reviewModule.listProviderDryRunResultCaptureReviewAuditSummaries();
const acceptancePostures = reviewModule.listProviderDryRunResultCaptureAcceptancePostureRecords();
const capabilityGroups = reviewModule.groupProviderDryRunResultCaptureReviewsByCapabilityFamily();
const providerSlotGroups = reviewModule.groupProviderDryRunResultCaptureReviewsByProviderSlot();
const credentialReferenceGroups = reviewModule.groupProviderDryRunResultCaptureReviewsByCredentialReference();
const reviewSummary = reviewModule.buildProviderDryRunResultCaptureReviewSummary();
const outputReviewSummary = reviewModule.buildProviderDryRunResultCaptureOutputReviewSummary();
const gateFailureSummary = reviewModule.buildProviderDryRunResultCaptureGateFailureSummary();
const recoverySummary = reviewModule.buildProviderDryRunResultCaptureRecoverySummary();
const auditApprovalJoinChecklist = reviewModule.buildProviderAdapterDryRunAuditApprovalJoinMvpChecklist();
const uniqueDisplayStrings = reviewModule.uniqueProviderDryRunResultCaptureReviewDisplayStrings([
  "alpha",
  "alpha",
  "beta"
]);

const inputs = captureModule.listProviderDryRunResultCaptureInputs();
const helperDirectA = helperModule.captureMinimalManualGatedProviderAdapterDryRunResultMvp(inputs[0]);
const helperDirectB = helperModule.captureMinimalManualGatedProviderAdapterDryRunResultMvp(inputs[0]);
if (JSON.stringify(helperDirectA) !== JSON.stringify(helperDirectB)) {
  throw new Error("Provider dry-run result capture helper output is not deterministic.");
}

const helperWrapped = captureModule.runMinimalManualGatedProviderDryRunResultCaptureMvpForStaticFixture();
if (JSON.stringify(helperWrapped) !== JSON.stringify(helperDirectA)) {
  throw new Error("Provider dry-run result capture helper wrapper diverges from the server-only helper.");
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
  recoverySummaryCount: recoverySummary.recordCount,
  checklistLineCount: auditApprovalJoinChecklist.length,
  stableReviewKey: reviewModule.buildStableProviderDryRunResultCaptureReviewKey("openai-compatible-text-provider-dry-run-capture-slot"),
  stableOutputReviewKey: reviewModule.buildStableProviderDryRunResultCaptureOutputReviewKey("code-assistance-request"),
  uniqueDisplayCount: uniqueDisplayStrings.length,
  helperCaptureState: helperDirectA.captureState,
  helperCredentialValueState: helperDirectA.credentialValueState,
  helperEnvVarState: helperDirectA.envVarState,
  helperProviderKeyState: helperDirectA.providerKeyState,
  helperProviderSdkImportState: helperDirectA.providerSdkImportState,
  helperLiveProviderExecutionState: helperDirectA.liveProviderExecutionState,
  helperProviderResponseState: helperDirectA.providerResponseState,
  helperModelOutputState: helperDirectA.modelOutputState,
  helperPersistenceState: helperDirectA.persistenceState,
  helperNoFrontendRequestStatement: helperDirectA.noFrontendRequestStatement,
  helperNoApiRouteStatement: helperDirectA.noApiRouteStatement,
  helperNoProviderCallStatement: helperDirectA.noProviderCallStatement,
  helperNoModelCallStatement: helperDirectA.noModelCallStatement,
  helperNoRealApprovalRequestStatement: helperDirectA.noRealApprovalRequestStatement,
  helperNoRealApprovalRecordingStatement: helperDirectA.noRealApprovalRecordingStatement,
  helperNoApprovalTokenStatement: helperDirectA.noApprovalTokenStatement,
  helperNoApprovalLeaseStatement: helperDirectA.noApprovalLeaseStatement
}));
'@

  $validationRaw = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute provider dry-run result capture review validation."
  }

  return $validationRaw | ConvertFrom-Json
}

Write-Host "=== Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview smoke ==="

$jarvisPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$homePath = Join-Path $root "src\app\page-client.tsx"
$providersPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$athenaAliasPath = Join-Path $root "src\app\athena\page.tsx"
$athenaContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$athenaShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$jarvisVideoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$reviewModuleDir = Join-Path $root "src\lib\codexforge\min-provider-capture-review"
$captureModuleDir = Join-Path $root "src\lib\codexforge\min-provider-capture"
$captureHelperPath = Join-Path $root "src\lib\codexforge\min-provider-capture\min-provider-capture-helper.server.ts"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"

foreach ($path in @(
  $jarvisPath,
  $homePath,
  $providersPath,
  $athenaAliasPath,
  $athenaContentPath,
  $athenaPanelPath,
  $athenaShellPath,
  $athenaModelPath,
  $jarvisVideoPanelPath,
  $navigationTypesPath,
  $reviewModuleDir,
  $captureModuleDir,
  $captureHelperPath,
  $checkpointPath,
  $allSmokePath
)) {
  Assert-FileExists $path
}

$jarvisSource = Normalize-Whitespace (Get-CombinedSourceText (Get-SourceFiles @(
  $jarvisPath,
  $athenaContentPath,
  $athenaPanelPath,
  $athenaShellPath,
  $athenaModelPath
)))
$homeSource = Normalize-Whitespace (Get-CombinedSourceText (Get-SourceFiles @(
  $homePath,
  $athenaContentPath,
  $athenaShellPath,
  $athenaModelPath
)))
$providersSource = Normalize-Whitespace (Get-CombinedSourceText (Get-SourceFiles @(
  $providersPath
)))
$videoSource = Normalize-Whitespace (Get-CombinedSourceText (Get-SourceFiles @(
  $jarvisVideoPanelPath
)))
$reviewModuleSource = Get-CombinedSourceText (Get-SourceFiles @($reviewModuleDir))
$reviewModuleNormalized = Normalize-Whitespace $reviewModuleSource
$captureModuleSource = Get-CombinedSourceText (Get-SourceFiles @($captureModuleDir))
$captureModuleNormalized = Normalize-Whitespace $captureModuleSource
$captureHelperSource = Get-Content -Raw $captureHelperPath
$captureHelperNormalized = Normalize-Whitespace $captureHelperSource
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
$athenaAliasText = Get-Content -Raw $athenaAliasPath

$validation = Invoke-ProviderDryRunResultCaptureReviewValidation -RepoRootPath $repoRoot

Assert-Equal ([string]$validation.reviewCount) "9" "review record count"
Assert-Equal ([string]$validation.outputReviewCount) "9" "output review record count"
Assert-Equal ([string]$validation.gateFailureCount) "495" "gate failure review record count"
Assert-Equal ([string]$validation.recoveryPlanCount) "9" "recovery plan count"
Assert-Equal ([string]$validation.readinessChecklistCount) "351" "readiness checklist record count"
Assert-Equal ([string]$validation.auditSummaryCount) "9" "audit summary count"
Assert-Equal ([string]$validation.acceptancePostureCount) "9" "acceptance posture count"
Assert-Equal ([string]$validation.capabilityGroupCount) "2" "capability group count"
Assert-Equal ([string]$validation.providerSlotGroupCount) "5" "provider slot group count"
Assert-Equal ([string]$validation.credentialReferenceGroupCount) "2" "credential reference group count"
Assert-Equal ([string]$validation.reviewSummaryPhase) "6089" "review summary phase"
Assert-Equal $validation.reviewSummaryLatestBatch "6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "review summary latest batch"
Assert-Equal $validation.reviewSummaryPreviousBatch "6026-6057 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP" "review summary previous batch"
Assert-Equal $validation.reviewSummaryNextBatch "6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP" "review summary next batch"
Assert-Equal $validation.reviewSummaryCurrentReadiness "minimal-provider-dry-run-result-capture-review-only / backend-only / dry-run-fixture-capture-only / credential-reference-only / not-live-provider-executing / not persistent" "review summary readiness"
Assert-Equal $validation.reviewSummaryAcceptanceState "not accepted for live provider execution or persistence / provider dry-run result capture fixture MVP accepted only" "review summary acceptance state"
Assert-Equal $validation.reviewSummaryRecoveryPosture "manual review only" "review summary recovery posture"
Assert-Equal ([string]$validation.checklistLineCount) "5" "audit approval join checklist line count"
Assert-Equal $validation.stableReviewKey "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review:openai-compatible-text-provider-dry-run-capture-slot" "stable review key"
Assert-Equal $validation.stableOutputReviewKey "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-output-review:code-assistance-request" "stable output review key"
Assert-Equal ([string]$validation.uniqueDisplayCount) "2" "unique display helper deduplicates"
Assert-Equal $validation.helperCaptureState "captured-provider-dry-run-fixture-result-in-memory-only" "server-only helper capture state preserved"
Assert-Equal $validation.helperCredentialValueState "not present / not read" "server-only helper credential value state preserved"
Assert-Equal $validation.helperEnvVarState "not read" "server-only helper env var state preserved"
Assert-Equal $validation.helperProviderKeyState "not read" "server-only helper provider key state preserved"
Assert-Equal $validation.helperProviderSdkImportState "not imported" "server-only helper provider SDK import state preserved"
Assert-Equal $validation.helperLiveProviderExecutionState "blocked" "server-only helper live provider execution state preserved"
Assert-Equal $validation.helperProviderResponseState "not received from provider" "server-only helper provider response state preserved"
Assert-Equal $validation.helperModelOutputState "not generated by provider/model" "server-only helper model output state preserved"
Assert-Equal $validation.helperPersistenceState "not implemented" "server-only helper persistence state preserved"
Assert-Contains $validation.helperNoFrontendRequestStatement "no frontend request" "server-only helper no frontend request statement"
Assert-Contains $validation.helperNoApiRouteStatement "no API route" "server-only helper no API route statement"
Assert-Contains $validation.helperNoProviderCallStatement "no provider call" "server-only helper no provider call statement"
Assert-Contains $validation.helperNoModelCallStatement "no model call" "server-only helper no model call statement"
Assert-Contains $validation.helperNoRealApprovalRequestStatement "no real approval request" "server-only helper no real approval request statement"
Assert-Contains $validation.helperNoRealApprovalRecordingStatement "no real approval recording" "server-only helper no real approval recording statement"
Assert-Contains $validation.helperNoApprovalTokenStatement "no approval token" "server-only helper no approval token statement"
Assert-Contains $validation.helperNoApprovalLeaseStatement "no approval lease" "server-only helper no approval lease statement"

Assert-Contains $reviewModuleNormalized "6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "batch marker 6058-6089 exists"
Assert-Contains $reviewModuleNormalized "6089" "phase 6089 exists"
Assert-Contains $reviewModuleNormalized "Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "review and recovery preview title exists"

Assert-Contains $athenaAliasText 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal manual-gated provider adapter dry-run result capture MVP",
  "Provider adapter dry-run result capture evidence preview",
  "Backend-owned minimal provider adapter dry-run result capture review",
  "Provider adapter dry-run result capture output review",
  "Provider adapter dry-run result capture gate failure review",
  "Provider adapter dry-run result capture recovery plan",
  "Provider adapter dry-run result capture recovery readiness",
  "Provider adapter dry-run result capture review audit summary",
  "Provider adapter dry-run result capture acceptance posture",
  "Athena can review the backend-owned minimal manual-gated provider adapter dry-run result capture MVP",
  "provider adapter dry-run result capture review is preview-only",
  "server-only provider dry-run result capture helper exists",
  "provider dry-run fixture response is captured in memory only",
  "provider dry-run result capture is deterministic fixture-only",
  "provider adapter dry-run result capture is not persistent",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "backup provider slot is preview-only",
  "local/private alternative is preview-only",
  "provider adapter dry-run result capture is not live provider execution",
  "no frontend request is created",
  "no API route is created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "no live provider execution",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database write",
  "no file write",
  "provider adapter dry-run audit and approval join MVP comes next",
  "current readiness: minimal-provider-dry-run-result-capture-review-only / backend-only / dry-run-fixture-capture-only / credential-reference-only / not-live-provider-executing / not persistent",
  "acceptance state: not accepted for live provider execution or persistence / provider dry-run result capture fixture MVP accepted only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled"
)) {
  Assert-Contains $jarvisSource $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now review the backend-owned minimal manual-gated provider adapter dry-run result capture MVP",
  "provider adapter dry-run result capture review is preview-only",
  "server-only provider dry-run result capture helper exists",
  "provider dry-run fixture response is captured in memory only",
  "provider dry-run result capture is deterministic fixture-only",
  "provider adapter dry-run result capture is not persistent",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "no frontend request is created",
  "no API route is created",
  "No model calls yet",
  "No prompt sending",
  "No provider SDKs imported",
  "queue, worker, and job execution remain blocked",
  "result, audit, and approval persistence remain blocked",
  "provider adapter dry-run audit and approval join MVP comes next"
)) {
  Assert-Contains $homeSource $needle "home contains $needle"
}

foreach ($needle in @(
  "Backend-owned minimal provider adapter dry-run result capture review",
  "Provider adapter dry-run result capture output review",
  "Provider adapter dry-run result capture gate failure review",
  "Provider adapter dry-run result capture recovery plan",
  "Provider adapter dry-run result capture recovery readiness",
  "Provider adapter dry-run result capture acceptance posture",
  "provider adapter dry-run result capture review is preview-only",
  "provider dry-run fixture response is captured in memory only",
  "provider adapter dry-run result capture is not persistent",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "no live provider execution",
  "no model calls",
  "no persistence",
  "provider adapter dry-run audit and approval join MVP comes next"
)) {
  Assert-Contains $providersSource $needle "/providers contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Generate video - locked"
)) {
  Assert-Contains $videoSource $needle "/jarvis-video still contains $needle"
}

foreach ($needle in @(
  "Backend-owned minimal provider adapter dry-run result capture review",
  "Provider adapter dry-run result capture output review",
  "Provider adapter dry-run result capture gate failure review",
  "Provider adapter dry-run result capture recovery plan",
  "Provider adapter dry-run result capture recovery readiness",
  "Provider adapter dry-run result capture review audit summary",
  "Provider adapter dry-run result capture acceptance posture",
  "server-only provider dry-run result capture helper exists",
  "provider dry-run result capture is deterministic fixture-only",
  "captured in memory only",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "live provider execution is blocked",
  'modelCallState: "not called"',
  "no prompt sending",
  "no provider SDK imports",
  "no live provider execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes"
)) {
  Assert-Contains $reviewModuleNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'import "server-only";',
  "captureMinimalManualGatedProviderAdapterDryRunResultMvp",
  "runMinimalManualGatedProviderDryRunResultCaptureMvpForStaticFixture"
)) {
  Assert-Contains $captureHelperNormalized $needle "server-only provider dry-run result capture helper marker contains $needle"
}

foreach ($needle in @(
  "captured-provider-dry-run-fixture-result-in-memory-only",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "live provider execution is blocked"
)) {
  Assert-Contains $captureModuleNormalized $needle "provider dry-run result capture module marker contains $needle"
}

Assert-Contains $allSmokeText "smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-review-recovery-preview-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $checkpointText "Highest detected phase: 6089" "checkpoint current doc reports Highest detected phase: 6089"
Assert-Contains $checkpointText "Latest completed batch: 6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointText "Next likely batch: 6090-6121 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Audit and Approval Join MVP" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource 'from\s+["''](?:openai|@anthropic-ai/sdk|anthropic|@google/generative-ai|google-generativeai|gemini)["'']|require\(["''](?:openai|@anthropic-ai/sdk|anthropic|@google/generative-ai|google-generativeai|gemini)["'']\)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\bfetch\s*\(|\bXMLHttpRequest\b|\baxios\b|navigator\.sendBeacon|new\s+Request\s*\(' "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource 'window\.localStorage|globalThis\.localStorage|\blocalStorage\s*\.|\blocalStorage\s*\[|window\.sessionStorage|globalThis\.sessionStorage|\bsessionStorage\s*\.|\bsessionStorage\s*\[|window\.indexedDB|globalThis\.indexedDB|\bindexedDB\s*\.|document\.cookie|cookies\s*\(' "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource 'child_process|execSync|exec\(|spawn\(|Start-Process|powershell|cmd\.exe|shelljs|Deno\.Command|Bun\.spawn' "no command/process/shell execution from app code"
Assert-Contains $navigationTypesText "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesText 'CodexForgeNavigationRouteHref\s*=\s*string' "no route href loosening to string"
Assert-Contains $navigationTypesText "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesText 'commandDeckRole\s*:\s*string' "no commandDeckRole loosening to string"
Assert-NotMatches $reviewModuleSource 'process\.env|import\.meta\.env' "no env var reads in provider dry-run result capture review module"
Assert-NotMatches $reviewModuleSource '\b(read|get|load|resolve|decrypt)Credential(Value|Secret|Key)\b|\bcredentialStore\b|\bsecretManager\b|\bvault\b' "no credential value reads in provider dry-run result capture review module"
Assert-NotMatches $reviewModuleSource '\b(read|get|load|resolve)Provider(Key|Token|Secret)\b|\bproviderKeyValue\b|\bapiKeyValue\b' "no provider key reads in provider dry-run result capture review module"
Assert-NotMatches $reviewModuleSource 'from\s+["''](?:openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)["'']|require\(["''](?:openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)["'']\)' "no provider SDK imports in provider dry-run result capture review module"
Assert-NotMatches $athenaPanelText 'key=\{(?:group|record|review)\.(?:providerSlotId|providerSlotLabel|credentialReferenceId|opaqueCredentialReferenceLabel)\}' "AthenaCommandCenterPanel does not use raw repeated provider ids or credential ids as sibling React keys for provider dry-run result capture review list rendering"

Write-Host "[PASS] Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview smoke passed"
