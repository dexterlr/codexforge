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

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview Mega Batch smoke ==="

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
$reviewModuleTypesPath = Join-Path $root "src\lib\codexforge\min-synth-e2e-review\min-synth-e2e-review-types.ts"
$reviewModuleCatalogPath = Join-Path $root "src\lib\codexforge\min-synth-e2e-review\min-synth-e2e-review-catalog.ts"
$reviewModuleIndexPath = Join-Path $root "src\lib\codexforge\min-synth-e2e-review\index.ts"
$packetModuleHelperPath = Join-Path $root "src\lib\codexforge\min-synth-e2e-mvp\min-synth-e2e-mvp-helper.server.ts"
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
  $reviewModuleTypesPath,
  $reviewModuleCatalogPath,
  $reviewModuleIndexPath,
  $packetModuleHelperPath,
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
  $reviewModuleTypesPath,
  $reviewModuleCatalogPath,
  $reviewModuleIndexPath
)
$serverHelperSource = Get-Content -Raw $packetModuleHelperPath
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
  "5610-5641 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview",
  "5641",
  "Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP",
  "Synthetic end-to-end packet evidence preview",
  "Backend-owned minimal synthetic end-to-end packet review",
  "Synthetic end-to-end packet output review",
  "Synthetic end-to-end packet gate failure review",
  "Synthetic end-to-end packet recovery plan",
  "Synthetic end-to-end packet recovery readiness",
  "Synthetic end-to-end packet review audit summary",
  "Synthetic end-to-end packet acceptance posture",
  "Athena can review the backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP",
  "minimal synthetic end-to-end packet review is preview-only",
  "server-only synthetic end-to-end packet helper exists",
  "synthetic end-to-end packet is produced in memory only",
  "deterministic synthetic end-to-end packet only",
  "synthetic execution, capture, audit join, and approval join are bundled in memory only",
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
  "text model adapter MVP comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now review the backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP",
  "minimal synthetic end-to-end packet review is preview-only",
  "server-only synthetic end-to-end packet helper exists",
  "synthetic end-to-end packet is produced in memory only",
  "synthetic execution, capture, audit join, and approval join are bundled in memory only",
  "no frontend request is created",
  "no API route is created",
  "text model adapter MVP comes next"
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
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-output-review-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-gate-failure-review-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-plan-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-recovery-readiness-checklist-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-audit-summary-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-acceptance-posture-preview-v1",
  "Backend-owned minimal synthetic end-to-end packet review",
  "Synthetic end-to-end packet output review",
  "Synthetic end-to-end packet gate failure review",
  "Synthetic end-to-end packet recovery plan",
  "Synthetic end-to-end packet recovery readiness",
  "Synthetic end-to-end packet review audit summary",
  "Synthetic end-to-end packet acceptance posture",
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
  "buildMinimalManualGatedSyntheticDryRunEndToEndPacketMvp",
  "runMinimalManualGatedSyntheticDryRunEndToEndPacketMvpForStaticFixture",
  "server-only synthetic end-to-end packet helper exists",
  "deterministic synthetic end-to-end packet only",
  "synthetic end-to-end packet is produced in memory only",
  "assembled-synthetic-in-memory-only"
)) {
  Assert-Contains $serverHelperNormalized $needle "server-only end-to-end packet helper marker contains $needle"
}

foreach ($source in @($typedModelSource, $serverHelperSource)) {
  Assert-NotMatches $source "Math\.random|Date\.now|crypto\.randomUUID" "deterministic packet review source excludes nondeterministic generators"
  Assert-NotMatches $source "fetch\s*\(|XMLHttpRequest|axios\.|navigator\.sendBeacon" "deterministic packet review source excludes network calls"
  Assert-NotMatches $source "process\.env\." "deterministic packet review source excludes env var reads"
  Assert-NotMatches $source "localStorage|sessionStorage|indexedDB|document\.cookie" "deterministic packet review source excludes browser storage"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-recovery-preview-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $allSmokeNormalized "Phase 5641 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview" "scripts/smoke-codexforge-all.ps1 contains phase 5641 release gate"

Assert-Contains $checkpointNormalized "Highest detected phase: 5641" "checkpoint current doc reports Highest detected phase: 5641"
Assert-Contains $checkpointNormalized "Latest completed batch: 5610-5641 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview" "checkpoint current doc reports latest completed packet review batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP" "checkpoint current doc reports next likely text model adapter batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesSource "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesSource "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"

Assert-Contains $athenaPanelSource '"synthetic-end-to-end-packet-review-capability"' "AthenaCommandCenterPanel uses scoped packet review capability keys"
Assert-Contains $athenaPanelSource '"synthetic-end-to-end-packet-review-workspace"' "AthenaCommandCenterPanel uses scoped packet review workspace keys"
Assert-NotMatches $athenaPanelSource "key=\{group\.capabilityFamilyId\}" "AthenaCommandCenterPanel does not use raw repeated capability ids as sibling React keys for synthetic end-to-end packet review list rendering"
Assert-NotMatches $athenaPanelSource "key=\{group\.workspaceTarget\}" "AthenaCommandCenterPanel does not use raw workspace ids as sibling React keys for synthetic end-to-end packet review list rendering"

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
  "min-synth-e2e-review",
  "index.ts"
));

const packetModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-synth-e2e-mvp",
  "min-synth-e2e-mvp-helper.server.ts"
));

const requiredExports = [
  "listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews",
  "listSyntheticEndToEndPacketOutputReviewRecords",
  "listSyntheticEndToEndPacketGateFailureReviewRecords",
  "listSyntheticEndToEndPacketRecoveryPlanPreviews",
  "listSyntheticEndToEndPacketRecoveryReadinessChecklistRecords",
  "listSyntheticEndToEndPacketReviewAuditSummaries",
  "listSyntheticEndToEndPacketAcceptancePostureRecords",
  "buildSyntheticEndToEndPacketReviewSummary"
];

for (const exportName of requiredExports) {
  if (typeof reviewModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

if (typeof packetModule.runMinimalManualGatedSyntheticDryRunEndToEndPacketMvpForStaticFixture !== "function") {
  throw new Error("Missing runMinimalManualGatedSyntheticDryRunEndToEndPacketMvpForStaticFixture export.");
}

const reviewsFirst = reviewModule.listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews();
const reviewsSecond = reviewModule.listBackendOwnedMinimalManualGatedSyntheticDryRunEndToEndPacketReviews();
if (JSON.stringify(reviewsFirst) !== JSON.stringify(reviewsSecond)) {
  throw new Error("Review records are not deterministic.");
}

const outputs = reviewModule.listSyntheticEndToEndPacketOutputReviewRecords();
const gateFailures = reviewModule.listSyntheticEndToEndPacketGateFailureReviewRecords();
const recoveryPlans = reviewModule.listSyntheticEndToEndPacketRecoveryPlanPreviews();
const readiness = reviewModule.listSyntheticEndToEndPacketRecoveryReadinessChecklistRecords();
const auditSummaries = reviewModule.listSyntheticEndToEndPacketReviewAuditSummaries();
const acceptance = reviewModule.listSyntheticEndToEndPacketAcceptancePostureRecords();
const summary = reviewModule.buildSyntheticEndToEndPacketReviewSummary();
const packet = packetModule.runMinimalManualGatedSyntheticDryRunEndToEndPacketMvpForStaticFixture();

process.stdout.write(JSON.stringify({
  reviewCount: reviewsFirst.length,
  outputReviewCount: outputs.length,
  gateFailureCount: gateFailures.length,
  recoveryPlanCount: recoveryPlans.length,
  readinessChecklistCount: readiness.length,
  auditSummaryCount: auditSummaries.length,
  acceptanceCount: acceptance.length,
  firstReviewId: reviewsFirst[0].id,
  firstPacketState: reviewsFirst[0].syntheticEndToEndPacketState,
  firstProviderExecutionState: reviewsFirst[0].providerExecutionState,
  firstResultPersistenceState: reviewsFirst[0].resultPersistenceState,
  acceptanceState: acceptance[0].acceptanceState,
  currentBatch: summary.currentBatch,
  highestDetectedPhase: summary.highestDetectedPhase,
  nextLikelyBatch: summary.nextLikelyBatch,
  helperPacketState: packet.packetState,
  helperPersistenceState: packet.persistenceState
}));
'@

$nodeOutput = $nodeScript | node - $root 2>&1
if ($LASTEXITCODE -ne 0) {
  throw "[FAIL] Deterministic synthetic packet review verification failed.`n$nodeOutput"
}

$nodeJsonLine = (($nodeOutput -split "(\r?\n)") | Where-Object { $_ -match '^\{' }) | Select-Object -Last 1
if (-not $nodeJsonLine) {
  throw "[FAIL] Deterministic synthetic packet review verification did not return JSON."
}

$nodeResult = $nodeJsonLine | ConvertFrom-Json

if ($nodeResult.reviewCount -ne 11) {
  throw "[FAIL] Unexpected review record count: $($nodeResult.reviewCount)"
}
Write-Host "[PASS] deterministic synthetic packet review count"

if ($nodeResult.outputReviewCount -ne 11) {
  throw "[FAIL] Unexpected output review record count: $($nodeResult.outputReviewCount)"
}
Write-Host "[PASS] deterministic synthetic packet output review count"

if ($nodeResult.gateFailureCount -ne 440) {
  throw "[FAIL] Unexpected gate failure review count: $($nodeResult.gateFailureCount)"
}
Write-Host "[PASS] deterministic synthetic packet gate failure review count"

if ($nodeResult.recoveryPlanCount -ne 11) {
  throw "[FAIL] Unexpected recovery plan count: $($nodeResult.recoveryPlanCount)"
}
Write-Host "[PASS] deterministic synthetic packet recovery plan count"

if ($nodeResult.readinessChecklistCount -ne 374) {
  throw "[FAIL] Unexpected recovery readiness checklist count: $($nodeResult.readinessChecklistCount)"
}
Write-Host "[PASS] deterministic synthetic packet recovery readiness checklist count"

if ($nodeResult.auditSummaryCount -ne 11) {
  throw "[FAIL] Unexpected review audit summary count: $($nodeResult.auditSummaryCount)"
}
Write-Host "[PASS] deterministic synthetic packet review audit summary count"

if ($nodeResult.acceptanceCount -ne 11) {
  throw "[FAIL] Unexpected acceptance posture count: $($nodeResult.acceptanceCount)"
}
Write-Host "[PASS] deterministic synthetic packet acceptance posture count"

if ($nodeResult.firstReviewId -ne "conversational-planning-request") {
  throw "[FAIL] Unexpected first review id: $($nodeResult.firstReviewId)"
}
Write-Host "[PASS] deterministic synthetic packet first review id"

if ($nodeResult.firstPacketState -ne "assembled-synthetic-in-memory-only") {
  throw "[FAIL] Unexpected first packet review state: $($nodeResult.firstPacketState)"
}
Write-Host "[PASS] deterministic synthetic packet first review state"

if ($nodeResult.firstProviderExecutionState -ne "blocked") {
  throw "[FAIL] Unexpected provider execution state: $($nodeResult.firstProviderExecutionState)"
}
Write-Host "[PASS] deterministic synthetic packet provider execution state"

if ($nodeResult.firstResultPersistenceState -ne "not implemented") {
  throw "[FAIL] Unexpected result persistence state: $($nodeResult.firstResultPersistenceState)"
}
Write-Host "[PASS] deterministic synthetic packet result persistence state"

if ($nodeResult.acceptanceState -ne "not accepted for live execution / synthetic end-to-end packet MVP accepted only") {
  throw "[FAIL] Unexpected acceptance state: $($nodeResult.acceptanceState)"
}
Write-Host "[PASS] deterministic synthetic packet acceptance state"

if ($nodeResult.currentBatch -ne "5610-5641 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview") {
  throw "[FAIL] Unexpected current batch: $($nodeResult.currentBatch)"
}
Write-Host "[PASS] deterministic synthetic packet review summary batch"

if ([int]$nodeResult.highestDetectedPhase -ne 5641) {
  throw "[FAIL] Unexpected review summary phase: $($nodeResult.highestDetectedPhase)"
}
Write-Host "[PASS] deterministic synthetic packet review summary phase"

if ($nodeResult.nextLikelyBatch -ne "5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP") {
  throw "[FAIL] Unexpected next likely batch: $($nodeResult.nextLikelyBatch)"
}
Write-Host "[PASS] deterministic synthetic packet review next batch"

if ($nodeResult.helperPacketState -ne "assembled-synthetic-in-memory-only") {
  throw "[FAIL] Unexpected helper packet state: $($nodeResult.helperPacketState)"
}
Write-Host "[PASS] deterministic synthetic packet helper state"

if ($nodeResult.helperPersistenceState -ne "not implemented") {
  throw "[FAIL] Unexpected helper persistence state: $($nodeResult.helperPersistenceState)"
}
Write-Host "[PASS] deterministic synthetic packet helper persistence state"

Write-Host "[PASS] Backend-owned minimal manual-gated synthetic dry-run end-to-end packet review and recovery preview smoke completed."
