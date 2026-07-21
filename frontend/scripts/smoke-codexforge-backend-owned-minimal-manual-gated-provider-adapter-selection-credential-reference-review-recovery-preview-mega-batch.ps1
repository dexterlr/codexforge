param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
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

function Invoke-ProviderSelectionReviewValidation {
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
  "min-provider-review",
  "index.ts"
));
const providerModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-provider-select",
  "index.ts"
));

const requiredReviewExports = [
  "buildStableProviderSelectionCredentialReferenceReviewKey",
  "buildStableProviderSelectionOutputReviewKey",
  "buildStableProviderSelectionGateFailureReviewKey",
  "buildStableProviderSelectionRecoveryPlanKey",
  "buildStableProviderSelectionRecoveryReadinessChecklistKey",
  "buildStableProviderSelectionReviewAuditSummaryKey",
  "buildStableProviderSelectionAcceptancePostureKey",
  "listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews",
  "listProviderSelectionOutputReviewRecords",
  "listProviderSelectionGateFailureReviewRecords",
  "listProviderSelectionRecoveryPlanPreviews",
  "listProviderSelectionRecoveryReadinessChecklistRecords",
  "listProviderSelectionReviewAuditSummaries",
  "listProviderSelectionAcceptancePostureRecords",
  "groupProviderSelectionReviewsByCapabilityFamily",
  "groupProviderSelectionReviewsByProviderSlot",
  "groupProviderSelectionReviewsByCredentialReference",
  "buildProviderSelectionReviewSummary",
  "buildProviderSelectionOutputReviewSummary",
  "buildProviderSelectionGateFailureSummary",
  "buildProviderSelectionRecoverySummary",
  "buildProviderAdapterDryRunAdmissionMvpChecklist"
];

for (const exportName of requiredReviewExports) {
  if (typeof reviewModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

const reviewsA = reviewModule.listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();
const reviewsB = reviewModule.listBackendOwnedMinimalManualGatedProviderAdapterSelectionCredentialReferenceReviews();
if (JSON.stringify(reviewsA) !== JSON.stringify(reviewsB)) {
  throw new Error("Provider selection review records are not deterministic.");
}

const outputReviews = reviewModule.listProviderSelectionOutputReviewRecords();
const gateFailures = reviewModule.listProviderSelectionGateFailureReviewRecords();
const recoveryPlans = reviewModule.listProviderSelectionRecoveryPlanPreviews();
const readinessChecklist = reviewModule.listProviderSelectionRecoveryReadinessChecklistRecords();
const auditSummaries = reviewModule.listProviderSelectionReviewAuditSummaries();
const acceptancePostures = reviewModule.listProviderSelectionAcceptancePostureRecords();
const capabilityGroups = reviewModule.groupProviderSelectionReviewsByCapabilityFamily();
const providerSlotGroups = reviewModule.groupProviderSelectionReviewsByProviderSlot();
const credentialGroups = reviewModule.groupProviderSelectionReviewsByCredentialReference();
const reviewSummary = reviewModule.buildProviderSelectionReviewSummary();
const outputSummary = reviewModule.buildProviderSelectionOutputReviewSummary();
const gateSummary = reviewModule.buildProviderSelectionGateFailureSummary();
const recoverySummary = reviewModule.buildProviderSelectionRecoverySummary();
const checklist = reviewModule.buildProviderAdapterDryRunAdmissionMvpChecklist();
const helper = providerModule.runMinimalManualGatedProviderSelectionCredentialReferenceMvpForStaticFixture();

process.stdout.write(JSON.stringify({
  reviewCount: reviewsA.length,
  outputReviewCount: outputReviews.length,
  gateFailureCount: gateFailures.length,
  recoveryPlanCount: recoveryPlans.length,
  readinessChecklistCount: readinessChecklist.length,
  auditSummaryCount: auditSummaries.length,
  acceptancePostureCount: acceptancePostures.length,
  capabilityGroupCount: capabilityGroups.length,
  providerSlotGroupCount: providerSlotGroups.length,
  credentialGroupCount: credentialGroups.length,
  highestDetectedPhase: String(reviewSummary.highestDetectedPhase),
  latestCompletedBatch: reviewSummary.latestCompletedBatch,
  previousCompletedBatch: reviewSummary.previousCompletedBatch,
  nextLikelyBatch: reviewSummary.nextLikelyBatch,
  currentReadiness: reviewSummary.currentReadiness,
  acceptanceState: reviewSummary.acceptanceState,
  reviewKey: reviewModule.buildStableProviderSelectionCredentialReferenceReviewKey("conversational-planning-request"),
  outputReviewKey: reviewModule.buildStableProviderSelectionOutputReviewKey("conversational-planning-request"),
  gateFailureKey: reviewModule.buildStableProviderSelectionGateFailureReviewKey("conversational-planning-request", "backend-only-boundary"),
  recoveryPlanKey: reviewModule.buildStableProviderSelectionRecoveryPlanKey("conversational-planning-request"),
  readinessKey: reviewModule.buildStableProviderSelectionRecoveryReadinessChecklistKey("conversational-planning-request", "server-only-provider-selection-helper-reviewed"),
  auditSummaryKey: reviewModule.buildStableProviderSelectionReviewAuditSummaryKey("conversational-planning-request"),
  acceptanceKey: reviewModule.buildStableProviderSelectionAcceptancePostureKey("conversational-planning-request"),
  providerSlotLabels: [...new Set(reviewsA.map((review) => review.providerSlotLabel))],
  requestLabels: [...new Set(reviewsA.map((review) => review.requestLabel))],
  helperSelectionState: helper.selectionState,
  helperProviderSlotLabel: helper.providerSlotLabel,
  helperBackupProviderSlotLabel: helper.backupProviderSlotLabel,
  helperOpaqueCredentialReferenceLabel: helper.opaqueCredentialReferenceLabel,
  helperCredentialValueState: helper.credentialValueState,
  helperEnvVarState: helper.envVarState,
  helperProviderKeyState: helper.providerKeyState,
  helperPromptTransmissionState: helper.promptTransmissionState,
  helperProviderExecutionState: helper.providerExecutionState
}));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute provider selection review validation."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Provider Adapter Selection Credential Reference Review and Recovery Preview Mega Batch smoke ==="

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
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$iaContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$reviewTypesPath = Join-Path $root "src\lib\codexforge\min-provider-review\min-provider-review-types.ts"
$reviewCatalogPath = Join-Path $root "src\lib\codexforge\min-provider-review\min-provider-review-catalog.ts"
$reviewIndexPath = Join-Path $root "src\lib\codexforge\min-provider-review\index.ts"
$providerHelperPath = Join-Path $root "src\lib\codexforge\min-provider-select\min-provider-select-helper.server.ts"
$providerTypesPath = Join-Path $root "src\lib\codexforge\min-provider-select\min-provider-select-types.ts"
$providerCatalogPath = Join-Path $root "src\lib\codexforge\min-provider-select\min-provider-select-catalog.ts"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"

$requiredPaths = @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $providersPageClientPath,
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath,
  $athenaPanelPath,
  $athenaModelPath,
  $iaContentPath,
  $navigationTypesPath,
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath,
  $providerHelperPath,
  $providerTypesPath,
  $providerCatalogPath,
  $allSmokePath,
  $checkpointCurrentPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$jarvisSource = Get-CombinedFileText @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPanelPath,
  $athenaModelPath,
  $iaContentPath
)
$homeSource = Get-CombinedFileText @(
  $homePagePath,
  $homePageClientPath,
  $athenaModelPath,
  $iaContentPath
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
  $providerTypesPath,
  $providerCatalogPath,
  $providerHelperPath
)
$reviewModuleSource = Get-CombinedFileText @(
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath
)
$providerModuleSource = Get-CombinedFileText @(
  $providerTypesPath,
  $providerCatalogPath,
  $providerHelperPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$navigationTypesText = Get-Content -Raw $navigationTypesPath
$athenaPanelText = Get-Content -Raw $athenaPanelPath
$frontEndSource = Get-CombinedSourceText (Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\ai-providers"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
))

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$providersNormalized = Normalize-Whitespace $providersSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$reviewModuleNormalized = Normalize-Whitespace $reviewModuleSource
$providerModuleNormalized = Normalize-Whitespace $providerModuleSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview",
  "5897",
  "Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
  "Provider adapter selection evidence preview",
  "Backend-owned minimal provider adapter selection and credential reference review",
  "Provider adapter selection output review",
  "Provider adapter selection gate failure review",
  "Provider adapter selection recovery plan",
  "Provider adapter selection recovery readiness",
  "Provider adapter selection review audit summary",
  "Provider adapter selection acceptance posture",
  "Athena can review the backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
  "provider adapter selection review is preview-only",
  "server-only provider selection helper exists",
  "provider slot selection is deterministic fixture-only",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "provider adapter selection is not provider-capable yet",
  "no frontend request is created",
  "no API route is created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "no provider execution",
  "provider adapter dry-run admission MVP comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now review the backend-owned minimal manual-gated provider adapter selection and credential reference MVP",
  "provider adapter selection review is preview-only",
  "server-only provider selection helper exists",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider adapter dry-run admission MVP comes next"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Backend-owned minimal provider adapter selection and credential reference review",
  "Provider adapter selection output review",
  "Provider adapter selection gate failure review",
  "Provider adapter selection recovery plan",
  "Provider adapter selection recovery readiness",
  "Provider adapter selection acceptance posture",
  "provider adapter selection review is preview-only",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "no provider execution",
  "no model calls",
  "no persistence",
  "provider adapter dry-run admission MVP comes next"
)) {
  Assert-Contains $providersNormalized $needle "/ai-providers contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Generate video - locked"
)) {
  Assert-Contains $videoNormalized $needle "/jarvis-video still contains $needle"
}

foreach ($needle in @(
  "backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-review-preview-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-output-review-preview-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-failure-review-preview-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-plan-preview-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-readiness-checklist-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-review-audit-summary-preview-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-selection-acceptance-posture-preview-v1",
  "Backend-owned minimal provider adapter selection and credential reference review",
  "Provider adapter selection output review",
  "Provider adapter selection gate failure review",
  "Provider adapter selection recovery plan",
  "Provider adapter selection recovery readiness",
  "Provider adapter selection review audit summary",
  "Provider adapter selection acceptance posture",
  "not called",
  "not sent",
  "not imported",
  "blocked",
  "not implemented"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'import "server-only";',
  "runMinimalManualGatedProviderSelectionCredentialReferenceMvpForStaticFixture",
  "selected-provider-slot-and-opaque-credential-reference-fixture-only",
  "provider slot selection is deterministic fixture-only",
  "credential reference is opaque label only"
)) {
  Assert-Contains $providerModuleNormalized $needle "server-only provider selection helper marker contains $needle"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-review-recovery-preview-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $checkpointNormalized "Highest detected phase: 5897" "checkpoint current doc reports Highest detected phase: 5897"
Assert-Contains $checkpointNormalized "Latest completed batch: 5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5898-5929 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"
Assert-Contains $navigationTypesText "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesText "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesText "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesText "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"
Assert-NotMatches $reviewModuleSource "process\.env\." "no env var reads in provider selection review module"
Assert-NotMatches $reviewModuleSource "\bcredentialValue\b" "no credential value reads in provider selection review module"
Assert-NotMatches $reviewModuleSource "\bproviderKey\b(?!State)" "no provider key reads in provider selection review module"
Assert-Contains $athenaPanelText "provider-selection-review-summary" "Athena provider selection review list uses scoped key context"
Assert-Contains $athenaPanelText "provider-selection-output-review" "Athena provider selection output review list uses scoped key context"
Assert-Contains $athenaPanelText "provider-selection-gate-failure-review" "Athena provider selection gate failure review list uses scoped key context"
Assert-Contains $athenaPanelText "provider-selection-recovery-readiness" "Athena provider selection recovery readiness list uses scoped key context"
Assert-NotMatches $athenaPanelText 'key=\{record\.providerSelectionReviewId\}' "Athena provider selection review rendering does not use raw provider selection review ids as keys"
Assert-NotMatches $athenaPanelText 'key=\{record\.opaqueCredentialReferenceLabel\}' "Athena provider selection review rendering does not use raw credential labels as keys"

$validation = Invoke-ProviderSelectionReviewValidation $root

if ([int]$validation.reviewCount -lt 5) { throw "[FAIL] Expected at least 5 provider selection review records, found $($validation.reviewCount)" }
if ([int]$validation.outputReviewCount -lt 5) { throw "[FAIL] Expected at least 5 provider selection output review records, found $($validation.outputReviewCount)" }
if ([int]$validation.gateFailureCount -lt 49) { throw "[FAIL] Expected at least 49 provider selection gate failure records, found $($validation.gateFailureCount)" }
if ([int]$validation.recoveryPlanCount -lt 5) { throw "[FAIL] Expected at least 5 provider selection recovery plans, found $($validation.recoveryPlanCount)" }
if ([int]$validation.readinessChecklistCount -lt 40) { throw "[FAIL] Expected at least 40 provider selection readiness checklist records, found $($validation.readinessChecklistCount)" }
if ([int]$validation.auditSummaryCount -lt 5) { throw "[FAIL] Expected at least 5 provider selection audit summaries, found $($validation.auditSummaryCount)" }
if ([int]$validation.acceptancePostureCount -lt 5) { throw "[FAIL] Expected at least 5 provider selection acceptance posture records, found $($validation.acceptancePostureCount)" }
if ([int]$validation.capabilityGroupCount -lt 2) { throw "[FAIL] Expected at least 2 capability groups, found $($validation.capabilityGroupCount)" }
if ([int]$validation.providerSlotGroupCount -lt 5) { throw "[FAIL] Expected at least 5 provider slot groups, found $($validation.providerSlotGroupCount)" }
if ([int]$validation.credentialGroupCount -lt 2) { throw "[FAIL] Expected at least 2 credential reference groups, found $($validation.credentialGroupCount)" }

Assert-Equal ([string]$validation.highestDetectedPhase) "5897" "validated highest detected phase"
Assert-Equal ([string]$validation.latestCompletedBatch) "5866-5897 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference Review and Recovery Preview" "validated latest completed batch"
Assert-Equal ([string]$validation.previousCompletedBatch) "5834-5865 - Backend-Owned Minimal Manual-Gated Provider Adapter Selection and Credential Reference MVP" "validated previous completed batch"
Assert-Equal ([string]$validation.nextLikelyBatch) "5898-5929 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Admission MVP" "validated next likely batch"
Assert-Equal ([string]$validation.currentReadiness) "minimal-provider-selection-credential-reference-review-only / backend-only / credential-reference-only / fixture-only / not provider-capable / not persistent" "validated current readiness"
Assert-Equal ([string]$validation.acceptanceState) "not accepted for live provider execution / provider selection credential reference fixture MVP accepted only" "validated acceptance state"
Assert-Equal ([string]$validation.reviewKey) "backend-owned-minimal-manual-gated-provider-adapter-selection-credential-reference-review:conversational-planning-request" "validated review key"
Assert-Equal ([string]$validation.outputReviewKey) "backend-owned-minimal-manual-gated-provider-adapter-selection-output-review:conversational-planning-request" "validated output review key"
Assert-Equal ([string]$validation.gateFailureKey) "backend-owned-minimal-manual-gated-provider-adapter-selection-gate-failure-review:conversational-planning-request:backend-only-boundary" "validated gate failure review key"
Assert-Equal ([string]$validation.recoveryPlanKey) "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-plan:conversational-planning-request" "validated recovery plan key"
Assert-Equal ([string]$validation.readinessKey) "backend-owned-minimal-manual-gated-provider-adapter-selection-recovery-readiness:conversational-planning-request:server-only-provider-selection-helper-reviewed" "validated readiness checklist key"
Assert-Equal ([string]$validation.auditSummaryKey) "backend-owned-minimal-manual-gated-provider-adapter-selection-review-audit-summary:conversational-planning-request" "validated review audit summary key"
Assert-Equal ([string]$validation.acceptanceKey) "backend-owned-minimal-manual-gated-provider-adapter-selection-acceptance-posture:conversational-planning-request" "validated acceptance posture key"
Assert-Contains ($validation.providerSlotLabels -join " | ") "OpenAI-compatible text provider slot" "validation includes OpenAI-compatible text provider slot"
Assert-Contains ($validation.providerSlotLabels -join " | ") "Anthropic-compatible text provider slot" "validation includes Anthropic-compatible text provider slot"
Assert-Contains ($validation.providerSlotLabels -join " | ") "Gemini-compatible text provider slot" "validation includes Gemini-compatible text provider slot"
Assert-Contains ($validation.providerSlotLabels -join " | ") "local/private text provider slot" "validation includes local/private text provider slot"
Assert-Contains ($validation.providerSlotLabels -join " | ") "fallback disabled slot" "validation includes fallback disabled slot"
Assert-Contains ($validation.requestLabels -join " | ") "conversational planning request" "validation includes conversational planning request"
Assert-Contains ($validation.requestLabels -join " | ") "code assistance request" "validation includes code assistance request"
Assert-Contains ($validation.requestLabels -join " | ") "website copy/code request" "validation includes website copy/code request"
Assert-Contains ($validation.requestLabels -join " | ") "audit/recovery explanation request" "validation includes audit/recovery explanation request"
Assert-Equal ([string]$validation.helperSelectionState) "selected-provider-slot-and-opaque-credential-reference-fixture-only" "validated helper selection state"
Assert-Equal ([string]$validation.helperCredentialValueState) "not present / not read" "validated helper credential value state"
Assert-Equal ([string]$validation.helperEnvVarState) "not read" "validated helper env var state"
Assert-Equal ([string]$validation.helperProviderKeyState) "not read" "validated helper provider key state"
Assert-Equal ([string]$validation.helperPromptTransmissionState) "not sent" "validated helper prompt transmission state"
Assert-Equal ([string]$validation.helperProviderExecutionState) "blocked" "validated helper provider execution state"

Write-Host "[PASS] Backend-Owned Minimal Manual-Gated Provider Adapter Selection Credential Reference Review and Recovery Preview smoke completed"
