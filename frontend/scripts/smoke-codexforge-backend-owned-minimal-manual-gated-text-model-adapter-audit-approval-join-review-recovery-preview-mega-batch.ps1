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

function Get-CombinedFileText {
  param([string[]]$Paths)
  return ($Paths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
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

function Get-CombinedSourceText {
  param([System.IO.FileInfo[]]$Files)
  return ($Files | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
}

function Normalize-Whitespace {
  param([AllowEmptyString()][string]$Text)
  return ([regex]::Replace($Text, "\s+", " ")).Trim()
}

function Invoke-TextAdapterAuditApprovalJoinReviewValidation {
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
  "min-text-aa-review",
  "index.ts"
));

const requiredExports = [
  "buildStableMinimalTextAdapterAuditApprovalJoinReviewKey",
  "buildStableTextAdapterAuditApprovalJoinOutputReviewKey",
  "buildStableTextAdapterAuditApprovalJoinGateFailureReviewKey",
  "buildStableTextAdapterAuditApprovalJoinRecoveryPlanKey",
  "buildStableTextAdapterAuditApprovalJoinRecoveryReadinessChecklistKey",
  "buildStableTextAdapterAuditApprovalJoinReviewAuditSummaryKey",
  "buildStableTextAdapterAuditApprovalJoinAcceptancePostureKey",
  "listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews",
  "listTextAdapterAuditApprovalJoinOutputReviewRecords",
  "listTextAdapterAuditApprovalJoinGateFailureReviewRecords",
  "listTextAdapterAuditApprovalJoinRecoveryPlanPreviews",
  "listTextAdapterAuditApprovalJoinRecoveryReadinessChecklistRecords",
  "listTextAdapterAuditApprovalJoinReviewAuditSummaries",
  "listTextAdapterAuditApprovalJoinAcceptancePostureRecords",
  "groupTextAdapterAuditApprovalJoinReviewsByCapabilityFamily",
  "groupTextAdapterAuditApprovalJoinReviewsByWorkspaceTarget",
  "buildTextAdapterAuditApprovalJoinReviewSummary",
  "buildTextAdapterAuditApprovalJoinOutputReviewSummary",
  "buildTextAdapterAuditApprovalJoinGateFailureSummary",
  "buildTextAdapterAuditApprovalJoinRecoverySummary",
  "buildProviderAdapterSelectionAndCredentialReferenceMvpChecklist"
];

for (const exportName of requiredExports) {
  if (typeof reviewModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

const reviewsA = reviewModule.listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews();
const reviewsB = reviewModule.listBackendOwnedMinimalManualGatedTextModelAdapterAuditApprovalJoinReviews();
if (JSON.stringify(reviewsA) !== JSON.stringify(reviewsB)) {
  throw new Error("Text adapter audit approval join review records are not deterministic.");
}

const reviews = reviewsA;
const outputReviews = reviewModule.listTextAdapterAuditApprovalJoinOutputReviewRecords();
const gateFailures = reviewModule.listTextAdapterAuditApprovalJoinGateFailureReviewRecords();
const recoveryPlans = reviewModule.listTextAdapterAuditApprovalJoinRecoveryPlanPreviews();
const readiness = reviewModule.listTextAdapterAuditApprovalJoinRecoveryReadinessChecklistRecords();
const auditSummaries = reviewModule.listTextAdapterAuditApprovalJoinReviewAuditSummaries();
const acceptancePostures = reviewModule.listTextAdapterAuditApprovalJoinAcceptancePostureRecords();
const capabilityGroups = reviewModule.groupTextAdapterAuditApprovalJoinReviewsByCapabilityFamily();
const workspaceGroups = reviewModule.groupTextAdapterAuditApprovalJoinReviewsByWorkspaceTarget();
const reviewSummary = reviewModule.buildTextAdapterAuditApprovalJoinReviewSummary();
const outputReviewSummary = reviewModule.buildTextAdapterAuditApprovalJoinOutputReviewSummary();
const gateFailureSummary = reviewModule.buildTextAdapterAuditApprovalJoinGateFailureSummary();
const recoverySummary = reviewModule.buildTextAdapterAuditApprovalJoinRecoverySummary();
const checklist = reviewModule.buildProviderAdapterSelectionAndCredentialReferenceMvpChecklist();

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
  highestDetectedPhase: String(reviewSummary.highestDetectedPhase),
  latestCompletedBatch: reviewSummary.latestCompletedBatch,
  previousCompletedBatch: reviewSummary.previousCompletedBatch,
  nextLikelyBatch: reviewSummary.nextLikelyBatch,
  currentReadiness: reviewSummary.currentReadiness,
  acceptanceState: reviewSummary.acceptanceState,
  stableReviewKey: reviewModule.buildStableMinimalTextAdapterAuditApprovalJoinReviewKey("conversational-planning-request"),
  stableOutputKey: reviewModule.buildStableTextAdapterAuditApprovalJoinOutputReviewKey("conversational-planning-request"),
  outputStatement: outputReviews[0].explicitAuditApprovalJoinFixtureOnlyNoRealOutputNoProviderCallNoPersistenceStatement,
  gateStatement: gateFailures[0].explicitNoLiveGatePassStatement,
  recoveryStatement: recoveryPlans[0].explicitNoRetryNoFallbackNoProviderNoPromptNoPersistenceStatement,
  acceptanceStatement: acceptancePostures[0].explicitTextAdapterAuditApprovalJoinFixtureAcceptedLiveProviderExecutionNotAcceptedStatement,
  outputReviewSummaryCount: String(outputReviewSummary.outputReviewCount),
  recoverySummaryCount: String(recoverySummary.recoveryPlanCount)
}));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute text adapter audit approval join review validation."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Text Model Adapter Audit Approval Join Review Recovery Preview Mega Batch smoke ==="

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
$reviewTypesPath = Join-Path $root "src\lib\codexforge\min-text-aa-review\min-text-aa-review-types.ts"
$reviewCatalogPath = Join-Path $root "src\lib\codexforge\min-text-aa-review\min-text-aa-review-catalog.ts"
$reviewIndexPath = Join-Path $root "src\lib\codexforge\min-text-aa-review\index.ts"
$joinTypesPath = Join-Path $root "src\lib\codexforge\min-text-audit-join\min-text-audit-join-types.ts"
$joinCatalogPath = Join-Path $root "src\lib\codexforge\min-text-audit-join\min-text-audit-join-catalog.ts"
$joinHelperPath = Join-Path $root "src\lib\codexforge\min-text-audit-join\min-text-audit-join-helper.server.ts"
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
  $joinTypesPath,
  $joinCatalogPath,
  $joinHelperPath,
  $allSmokePath,
  $checkpointCurrentPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$jarvisText = Get-CombinedFileText @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $jarvisIaContentPath
)
$homeText = Get-CombinedFileText @(
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $athenaModelPath,
  $jarvisIaContentPath
)
$providersText = Get-CombinedFileText @(
  $providersPagePath,
  $providersPageClientPath
)
$videoText = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$reviewModuleText = Get-CombinedFileText @(
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath
)
$joinModuleText = Get-CombinedFileText @(
  $joinTypesPath,
  $joinCatalogPath,
  $joinHelperPath
)
$athenaJarvisText = Get-CombinedFileText @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $providersPageClientPath,
  $athenaPanelPath,
  $athenaModelPath,
  $jarvisIaContentPath
)
$navigationTypesText = Get-Content -Raw $navigationTypesPath
$allSmokeText = Get-Content -Raw $allSmokePath
$checkpointText = Get-Content -Raw $checkpointCurrentPath
$athenaPanelText = Get-Content -Raw $athenaPanelPath

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

$jarvisNormalized = Normalize-Whitespace $jarvisText
$homeNormalized = Normalize-Whitespace $homeText
$providersNormalized = Normalize-Whitespace $providersText
$videoNormalized = Normalize-Whitespace $videoText
$reviewModuleNormalized = Normalize-Whitespace $reviewModuleText
$joinModuleNormalized = Normalize-Whitespace $joinModuleText
$allSmokeNormalized = Normalize-Whitespace $allSmokeText
$checkpointNormalized = Normalize-Whitespace $checkpointText

Assert-Contains $reviewModuleNormalized "5802-5833 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join Review and Recovery Preview" "batch marker 5802-5833 exists"
Assert-Contains $reviewModuleNormalized "5833" "phase 5833 exists"
Assert-Contains $reviewModuleNormalized "Backend-owned minimal text adapter audit and approval join review" "typed review marker"
Assert-Contains $reviewModuleNormalized "Text adapter audit and approval join output review" "typed output review marker"
Assert-Contains $reviewModuleNormalized "Text adapter audit and approval join gate failure review" "typed gate failure review marker"
Assert-Contains $reviewModuleNormalized "Text adapter audit and approval join recovery plan" "typed recovery plan marker"
Assert-Contains $reviewModuleNormalized "Text adapter audit and approval join recovery readiness" "typed recovery readiness marker"
Assert-Contains $reviewModuleNormalized "Text adapter audit and approval join review audit summary" "typed audit summary marker"
Assert-Contains $reviewModuleNormalized "Text adapter audit and approval join acceptance posture" "typed acceptance marker"
Assert-Contains $reviewModuleNormalized "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-review-preview-v1" "typed review version marker"
Assert-Contains $reviewModuleNormalized "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-output-review-preview-v1" "typed output review version marker"
Assert-Contains $reviewModuleNormalized "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-gate-failure-review-preview-v1" "typed gate failure version marker"
Assert-Contains $reviewModuleNormalized "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-recovery-plan-preview-v1" "typed recovery plan version marker"
Assert-Contains $reviewModuleNormalized "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-recovery-readiness-checklist-v1" "typed recovery readiness checklist version marker"
Assert-Contains $reviewModuleNormalized "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-review-audit-summary-preview-v1" "typed review audit summary version marker"
Assert-Contains $reviewModuleNormalized "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-acceptance-posture-preview-v1" "typed acceptance posture version marker"

Assert-Contains $jarvisNormalized "Athena" "/jarvis contains Athena"
Assert-Contains $jarvisNormalized "Athena Command Center" "/jarvis contains Athena Command Center"
Assert-Contains $jarvisNormalized "Backend-owned minimal manual-gated text model adapter audit and approval join MVP" "/jarvis contains join MVP"
Assert-Contains $jarvisNormalized "Text adapter audit and approval join evidence preview" "/jarvis contains join evidence preview"
Assert-Contains $jarvisNormalized "Backend-owned minimal text adapter audit and approval join review" "/jarvis contains join review"
Assert-Contains $jarvisNormalized "Text adapter audit and approval join output review" "/jarvis contains join output review"
Assert-Contains $jarvisNormalized "Text adapter audit and approval join gate failure review" "/jarvis contains join gate failure review"
Assert-Contains $jarvisNormalized "Text adapter audit and approval join recovery plan" "/jarvis contains join recovery plan"
Assert-Contains $jarvisNormalized "Text adapter audit and approval join recovery readiness" "/jarvis contains join recovery readiness"
Assert-Contains $jarvisNormalized "Text adapter audit and approval join review audit summary" "/jarvis contains join review audit summary"
Assert-Contains $jarvisNormalized "Text adapter audit and approval join acceptance posture" "/jarvis contains join acceptance posture"
Assert-Contains $jarvisNormalized "Athena can review the backend-owned minimal manual-gated text model adapter audit and approval join MVP" "/jarvis contains reviewable join MVP copy"
Assert-Contains $jarvisNormalized "minimal text adapter audit and approval join review is preview-only" "/jarvis contains preview-only review copy"
Assert-Contains $jarvisNormalized "server-only text adapter audit and approval join helper exists" "/jarvis contains server-only join helper copy"
Assert-Contains $jarvisNormalized "text adapter audit and approval join is produced in memory only" "/jarvis contains in-memory join copy"
Assert-Contains $jarvisNormalized "deterministic text adapter audit and approval join only" "/jarvis contains deterministic join copy"
Assert-Contains $jarvisNormalized "text adapter result capture is not persistent" "/jarvis contains result capture not persistent copy"
Assert-Contains $jarvisNormalized "redacted prompt envelope is preview-only" "/jarvis contains redacted prompt copy"
Assert-Contains $jarvisNormalized "prompt transmission state is not sent" "/jarvis contains prompt not sent copy"
Assert-Contains $jarvisNormalized "no frontend request is created" "/jarvis contains no frontend request copy"
Assert-Contains $jarvisNormalized "no API route is created" "/jarvis contains no API route copy"
Assert-Contains $jarvisNormalized "No prompt sending" "/jarvis contains no prompt sending copy"
Assert-Contains $jarvisNormalized "No model calls yet" "/jarvis contains no model calls copy"
Assert-Contains $jarvisNormalized "No provider SDKs imported" "/jarvis contains no provider SDK copy"
Assert-Contains $jarvisNormalized "no provider execution" "/jarvis contains no provider execution copy"
Assert-Contains $jarvisNormalized "no queue dispatch" "/jarvis contains no queue dispatch copy"
Assert-Contains $jarvisNormalized "no worker dispatch" "/jarvis contains no worker dispatch copy"
Assert-Contains $jarvisNormalized "no job execution" "/jarvis contains no job execution copy"
Assert-Contains $jarvisNormalized "no result persistence" "/jarvis contains no result persistence copy"
Assert-Contains $jarvisNormalized "no audit persistence" "/jarvis contains no audit persistence copy"
Assert-Contains $jarvisNormalized "no approval persistence" "/jarvis contains no approval persistence copy"
Assert-Contains $jarvisNormalized "no database write" "/jarvis contains no database write copy"
Assert-Contains $jarvisNormalized "no file write" "/jarvis contains no file write copy"
Assert-Contains $jarvisNormalized "current readiness: minimal-text-adapter-audit-approval-join-review-only / backend-only / fixture-only / in-memory-only / not persistent" "/jarvis contains current readiness copy"
Assert-Contains $jarvisNormalized "acceptance state: not accepted for live provider execution / text adapter audit approval join fixture MVP accepted only" "/jarvis contains acceptance state copy"
Assert-Contains $jarvisNormalized "recovery is manual review only" "/jarvis contains recovery posture copy"
Assert-Contains $jarvisNormalized "retry disabled" "/jarvis contains retry disabled copy"
Assert-Contains $jarvisNormalized "fallback disabled" "/jarvis contains fallback disabled copy"
Assert-Contains $jarvisNormalized "provider adapter selection and credential reference MVP comes next" "/jarvis contains next batch copy"

Assert-Contains $homeNormalized "CodexForge Operator Cockpit" "home contains CodexForge Operator Cockpit"
Assert-Contains $homeNormalized "Athena can now review the backend-owned minimal manual-gated text model adapter audit and approval join MVP" "home contains reviewable join MVP copy"
Assert-Contains $homeNormalized "minimal text adapter audit and approval join review is preview-only" "home contains preview-only review copy"
Assert-Contains $homeNormalized "server-only text adapter audit and approval join helper exists" "home contains server-only join helper copy"
Assert-Contains $homeNormalized "text adapter audit and approval join is produced in memory only" "home contains in-memory join copy"
Assert-Contains $homeNormalized "text adapter result capture is not persistent" "home contains result capture not persistent copy"
Assert-Contains $homeNormalized "redacted prompt envelope is preview-only" "home contains redacted prompt copy"
Assert-Contains $homeNormalized "prompt transmission state is not sent" "home contains prompt not sent copy"
Assert-Contains $homeNormalized "no frontend request is created" "home contains no frontend request copy"
Assert-Contains $homeNormalized "no API route is created" "home contains no API route copy"
Assert-Contains $homeNormalized "provider adapter selection and credential reference MVP comes next" "home contains next batch copy"

Assert-Contains $providersNormalized "Backend-owned minimal text adapter audit and approval join review" "/providers contains join review"
Assert-Contains $providersNormalized "Text adapter audit and approval join output review" "/providers contains join output review"
Assert-Contains $providersNormalized "Text adapter audit and approval join gate failure review" "/providers contains join gate failure review"
Assert-Contains $providersNormalized "Text adapter audit and approval join recovery plan" "/providers contains join recovery plan"
Assert-Contains $providersNormalized "Text adapter audit and approval join recovery readiness" "/providers contains join recovery readiness"
Assert-Contains $providersNormalized "Text adapter audit and approval join acceptance posture" "/providers contains join acceptance posture"
Assert-Contains $providersNormalized "minimal text adapter audit and approval join review is preview-only" "/providers contains preview-only review copy"
Assert-Contains $providersNormalized "server-only text adapter audit and approval join helper exists" "/providers contains server-only join helper copy"
Assert-Contains $providersNormalized "text adapter audit and approval join is produced in memory only" "/providers contains in-memory join copy"
Assert-Contains $providersNormalized "no provider execution" "/providers contains no provider execution copy"
Assert-Contains $providersNormalized "no model calls" "/providers contains no model calls copy"
Assert-Contains $providersNormalized "no persistence" "/providers contains no persistence copy"
Assert-Contains $providersNormalized "provider adapter selection and credential reference MVP comes next" "/providers contains next batch copy"

Assert-Contains $videoNormalized "Video generation control" "/jarvis-video still contains Video generation control"
Assert-Contains $videoNormalized "Prompt / concept" "/jarvis-video still contains Prompt / concept"
Assert-Contains $videoNormalized "Output preview" "/jarvis-video still contains Output preview"
Assert-Contains $videoNormalized "Generate video - locked" "/jarvis-video still contains Generate video - locked"

Assert-Contains $reviewModuleNormalized "backend-owned minimal manual-gated text model adapter audit and approval join review and recovery preview only" "typed model contains preview-only review marker"
Assert-Contains $reviewModuleNormalized "no model calls" "typed model contains no model calls marker"
Assert-Contains $reviewModuleNormalized "no prompt sending" "typed model contains no prompt sending marker"
Assert-Contains $reviewModuleNormalized "no provider SDK imports" "typed model contains no provider SDK imports marker"
Assert-Contains $reviewModuleNormalized "no provider execution" "typed model contains no provider execution marker"
Assert-Contains $reviewModuleNormalized "no result persistence" "typed model contains no result persistence marker"
Assert-Contains $reviewModuleNormalized "no audit persistence" "typed model contains no audit persistence marker"
Assert-Contains $reviewModuleNormalized "no approval persistence" "typed model contains no approval persistence marker"
Assert-Contains $reviewModuleNormalized "no database writes" "typed model contains no database write marker"
Assert-Contains $reviewModuleNormalized "no file writes" "typed model contains no file write marker"
Assert-Contains $joinModuleNormalized "server-only text adapter audit and approval join helper exists" "server-only join helper marker still exists"
Assert-Contains $joinModuleNormalized "deterministic text adapter audit and approval join only" "deterministic join marker still exists"
Assert-Contains $joinModuleNormalized "text adapter audit and approval join is produced in memory only" "in-memory join marker exists"
Assert-Contains $joinModuleNormalized "joined-text-adapter-fixture-in-memory-only" "server-only helper in-memory state marker exists"

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-review-recovery-preview-mega-batch.ps1" "all smoke references the new smoke"
Assert-Contains $checkpointNormalized "Highest detected phase: 5833" "checkpoint reports phase 5833"
Assert-Contains $checkpointNormalized "Latest completed batch: 5802-5833 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join Review and Recovery Preview" "checkpoint reports latest completed batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5834-5865 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP" "checkpoint reports next likely batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"
Assert-Contains $navigationTypesText "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesText "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesText "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesText "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"
Assert-Contains $athenaPanelText "text-adapter-aa-review-capability" "Athena review capability list uses scoped key context"
Assert-Contains $athenaPanelText "text-adapter-aa-review-workspace" "Athena review workspace list uses scoped key context"
Assert-Contains $athenaPanelText "buildScopedItemKey(" "Athena panel uses scoped keys"
Assert-NotMatches $athenaPanelText 'key=\{group\.capabilityFamilyId\}' "Athena review capability list does not use raw capability id keys"
Assert-NotMatches $athenaPanelText 'key=\{group\.workspaceTarget\}' "Athena review workspace list does not use raw workspace target keys"

$validation = Invoke-TextAdapterAuditApprovalJoinReviewValidation $root

if ([int]$validation.reviewCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter audit approval join reviews, found $($validation.reviewCount)"
}
Write-Host "[PASS] text adapter audit approval join review count is $($validation.reviewCount)"

if ([int]$validation.outputReviewCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter audit approval join output reviews, found $($validation.outputReviewCount)"
}
Write-Host "[PASS] text adapter audit approval join output review count is $($validation.outputReviewCount)"

if ([int]$validation.gateFailureCount -lt 400) {
  throw "[FAIL] Expected at least 400 text adapter audit approval join gate failure reviews, found $($validation.gateFailureCount)"
}
Write-Host "[PASS] text adapter audit approval join gate failure review count is $($validation.gateFailureCount)"

if ([int]$validation.recoveryPlanCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter audit approval join recovery plans, found $($validation.recoveryPlanCount)"
}
Write-Host "[PASS] text adapter audit approval join recovery plan count is $($validation.recoveryPlanCount)"

if ([int]$validation.readinessCount -lt 300) {
  throw "[FAIL] Expected at least 300 text adapter audit approval join recovery readiness records, found $($validation.readinessCount)"
}
Write-Host "[PASS] text adapter audit approval join recovery readiness record count is $($validation.readinessCount)"

if ([int]$validation.auditSummaryCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter audit approval join review audit summaries, found $($validation.auditSummaryCount)"
}
Write-Host "[PASS] text adapter audit approval join review audit summary count is $($validation.auditSummaryCount)"

if ([int]$validation.acceptanceCount -lt 11) {
  throw "[FAIL] Expected at least 11 text adapter audit approval join acceptance postures, found $($validation.acceptanceCount)"
}
Write-Host "[PASS] text adapter audit approval join acceptance posture count is $($validation.acceptanceCount)"

if ([int]$validation.capabilityGroupCount -lt 4) {
  throw "[FAIL] Expected at least 4 text adapter audit approval join capability groups, found $($validation.capabilityGroupCount)"
}
Write-Host "[PASS] text adapter audit approval join capability group count is $($validation.capabilityGroupCount)"

if ([int]$validation.workspaceGroupCount -lt 3) {
  throw "[FAIL] Expected at least 3 text adapter audit approval join workspace groups, found $($validation.workspaceGroupCount)"
}
Write-Host "[PASS] text adapter audit approval join workspace group count is $($validation.workspaceGroupCount)"

if ([int]$validation.checklistCount -lt 4) {
  throw "[FAIL] Expected at least 4 provider adapter selection and credential reference checklist lines, found $($validation.checklistCount)"
}
Write-Host "[PASS] provider adapter selection and credential reference checklist count is $($validation.checklistCount)"

Assert-Equal ([string]$validation.highestDetectedPhase) "5833" "validated highest detected phase"
Assert-Equal ([string]$validation.latestCompletedBatch) "5802-5833 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join Review and Recovery Preview" "validated latest completed batch"
Assert-Equal ([string]$validation.previousCompletedBatch) "5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP" "validated previous completed batch"
Assert-Equal ([string]$validation.nextLikelyBatch) "5834-5865 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP" "validated next likely batch"
Assert-Equal ([string]$validation.currentReadiness) "minimal-text-adapter-audit-approval-join-review-only / backend-only / fixture-only / in-memory-only / not persistent" "validated current readiness"
Assert-Equal ([string]$validation.acceptanceState) "not accepted for live provider execution / text adapter audit approval join fixture MVP accepted only" "validated acceptance state"
Assert-Equal ([string]$validation.outputStatement) "Audit approval join fixture only. No real output. No provider call. No persistence." "validated output statement"
Assert-Equal ([string]$validation.gateStatement) "No live gate pass." "validated gate statement"
Assert-Equal ([string]$validation.recoveryStatement) "No retry. No fallback. No provider execution. No prompt sending. No persistence." "validated recovery statement"
Assert-Equal ([string]$validation.acceptanceStatement) "Text adapter audit approval join fixture accepted only. Live provider execution not accepted." "validated acceptance statement"

Write-Host "[PASS] Backend-Owned Minimal Manual-Gated Text Model Adapter Audit Approval Join Review Recovery Preview smoke completed"
