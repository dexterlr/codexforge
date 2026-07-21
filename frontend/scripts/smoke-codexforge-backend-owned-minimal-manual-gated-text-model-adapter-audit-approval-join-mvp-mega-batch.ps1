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

function Invoke-TextAdapterAuditApprovalJoinValidation {
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

const joinModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-text-audit-join",
  "index.ts"
));

const requiredExports = [
  "buildStableMinimalTextAdapterAuditApprovalJoinMvpKey",
  "listMinimalManualGatedTextModelAdapterAuditApprovalJoinMvpRecords",
  "listTextAdapterAuditApprovalJoinInputs",
  "listTextAdapterAuditJoinOutputs",
  "listTextAdapterApprovalJoinOutputs",
  "listTextAdapterAuditApprovalJoinEnvelopes",
  "listTextAdapterAuditApprovalJoinGates",
  "listTextAdapterAuditApprovalJoinReadinessMatrixRecords",
  "listTextAdapterAuditApprovalEvidencePreviews",
  "buildTextAdapterAuditApprovalJoinSummary",
  "buildTextAdapterAuditApprovalJoinGateSummary",
  "buildTextAdapterAuditApprovalJoinReadinessSummary",
  "buildNextTextAdapterAuditApprovalJoinReviewRecoveryChecklist",
  "joinMinimalManualGatedTextModelAdapterAuditAndApprovalMvp",
  "runMinimalManualGatedTextAdapterAuditApprovalJoinMvpForStaticFixture"
];

for (const exportName of requiredExports) {
  if (typeof joinModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

const recordsA = joinModule.listMinimalManualGatedTextModelAdapterAuditApprovalJoinMvpRecords();
const recordsB = joinModule.listMinimalManualGatedTextModelAdapterAuditApprovalJoinMvpRecords();
if (JSON.stringify(recordsA) !== JSON.stringify(recordsB)) {
  throw new Error("Text adapter audit approval join MVP records are not deterministic.");
}

const mvpRecords = recordsA;
const inputs = joinModule.listTextAdapterAuditApprovalJoinInputs();
const auditOutputs = joinModule.listTextAdapterAuditJoinOutputs();
const approvalOutputs = joinModule.listTextAdapterApprovalJoinOutputs();
const envelopes = joinModule.listTextAdapterAuditApprovalJoinEnvelopes();
const gates = joinModule.listTextAdapterAuditApprovalJoinGates();
const readiness = joinModule.listTextAdapterAuditApprovalJoinReadinessMatrixRecords();
const evidence = joinModule.listTextAdapterAuditApprovalEvidencePreviews();
const summary = joinModule.buildTextAdapterAuditApprovalJoinSummary();
const gateSummary = joinModule.buildTextAdapterAuditApprovalJoinGateSummary();
const readinessSummary = joinModule.buildTextAdapterAuditApprovalJoinReadinessSummary();
const checklist = joinModule.buildNextTextAdapterAuditApprovalJoinReviewRecoveryChecklist();
const helperA = joinModule.runMinimalManualGatedTextAdapterAuditApprovalJoinMvpForStaticFixture();
const helperB = joinModule.runMinimalManualGatedTextAdapterAuditApprovalJoinMvpForStaticFixture();

if (JSON.stringify(helperA) !== JSON.stringify(helperB)) {
  throw new Error("Text adapter audit approval join helper output is not deterministic.");
}

process.stdout.write(JSON.stringify({
  joinCount: mvpRecords.length,
  inputCount: inputs.length,
  auditOutputCount: auditOutputs.length,
  approvalOutputCount: approvalOutputs.length,
  envelopeCount: envelopes.length,
  gateCount: gates.length,
  readinessCount: readiness.length,
  evidenceCount: evidence.length,
  checklistCount: checklist.length,
  highestDetectedPhase: String(summary.highestDetectedPhase),
  latestCompletedBatch: summary.latestCompletedBatch,
  previousCompletedBatch: summary.previousCompletedBatch,
  nextLikelyBatch: summary.nextLikelyBatch,
  currentReadiness: summary.currentReadiness,
  gateSummaryCount: String(gateSummary.gateCount),
  readinessSummaryCount: String(readinessSummary.readinessCount),
  stableKey: joinModule.buildStableMinimalTextAdapterAuditApprovalJoinMvpKey("conversational-planning-request"),
  helperJoinState: helperA.joinState,
  helperAuditJoinState: helperA.auditJoinState,
  helperApprovalJoinState: helperA.approvalJoinState,
  helperProviderResponseState: helperA.providerResponseState,
  helperModelOutputState: helperA.modelOutputState,
  helperPersistenceState: helperA.persistenceState,
  helperCurrentReadiness: helperA.currentReadiness,
  helperNoFrontendRequestStatement: helperA.noFrontendRequestStatement,
  helperNoApiRouteStatement: helperA.noApiRouteStatement
}));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute text adapter audit approval join validation."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP Mega Batch smoke ==="

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
$joinTypesPath = Join-Path $root "src\lib\codexforge\min-text-audit-join\min-text-audit-join-types.ts"
$joinCatalogPath = Join-Path $root "src\lib\codexforge\min-text-audit-join\min-text-audit-join-catalog.ts"
$joinIndexPath = Join-Path $root "src\lib\codexforge\min-text-audit-join\index.ts"
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
  $joinTypesPath,
  $joinCatalogPath,
  $joinIndexPath,
  $joinHelperPath,
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
  $joinTypesPath,
  $joinCatalogPath,
  $joinIndexPath
)
$serverHelperSource = Get-Content -Raw $joinHelperPath
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

$batchMarkerSource =
  $jarvisNormalized + " " +
  $homeNormalized + " " +
  $providersNormalized + " " +
  $typedModelNormalized + " " +
  $serverHelperNormalized + " " +
  $checkpointNormalized + " " +
  $allSmokeNormalized

foreach ($needle in @(
  "5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP",
  "5801",
  "Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP"
)) {
  Assert-Contains $batchMarkerSource $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal text adapter result capture review",
  "Text adapter result capture acceptance posture",
  "Backend-owned minimal manual-gated text model adapter audit and approval join MVP",
  "Text adapter audit and approval join input",
  "Text adapter audit join output",
  "Text adapter approval join output",
  "Text adapter audit and approval join envelope",
  "Text adapter audit and approval join gates",
  "Text adapter audit and approval join readiness matrix",
  "Text adapter audit and approval join evidence preview",
  "Athena can preview the backend-owned minimal manual-gated text model adapter audit and approval join MVP",
  "minimal text adapter audit and approval join MVP is backend-only",
  "server-only text adapter audit and approval join helper exists",
  "text adapter audit and approval join is produced in memory only",
  "deterministic text adapter audit and approval join only",
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
  "text adapter audit and approval join review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview the backend-owned minimal manual-gated text model adapter audit and approval join MVP",
  "minimal text adapter audit and approval join MVP is backend-only",
  "server-only text adapter audit and approval join helper exists",
  "text adapter audit and approval join is produced in memory only",
  "deterministic text adapter audit and approval join only",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "text adapter audit and approval join review and recovery preview comes next"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Backend-owned minimal manual-gated text model adapter audit and approval join MVP",
  "Text adapter audit and approval join input",
  "Text adapter audit join output",
  "Text adapter approval join output",
  "Text adapter audit and approval join envelope",
  "Text adapter audit and approval join gates",
  "Text adapter audit and approval join readiness matrix",
  "minimal text adapter audit and approval join MVP is backend-only",
  "text adapter audit and approval join is produced in memory only",
  "no provider execution",
  "no model calls",
  "no persistence",
  "text adapter audit and approval join review and recovery preview comes next"
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
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-mvp-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-input-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-join-output-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-approval-join-output-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-envelope-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-gate-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-readiness-matrix-v1",
  "Backend-owned minimal manual-gated text model adapter audit and approval join MVP",
  "Text adapter audit and approval join input",
  "Text adapter audit join output",
  "Text adapter approval join output",
  "Text adapter audit and approval join envelope",
  "Text adapter audit and approval join gates",
  "Text adapter audit and approval join readiness matrix",
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
  "joinMinimalManualGatedTextModelAdapterAuditAndApprovalMvp",
  "runMinimalManualGatedTextAdapterAuditApprovalJoinMvpForStaticFixture",
  "joined-text-adapter-fixture-in-memory-only",
  "deterministic text adapter audit and approval join only",
  "text adapter audit and approval join is produced in memory only"
)) {
  Assert-Contains $serverHelperNormalized $needle "server-only text adapter audit approval join helper marker contains $needle"
}

foreach ($source in @($typedModelSource, $serverHelperSource)) {
  Assert-NotMatches $source "Math\.random|Date\.now|crypto\.randomUUID" "deterministic text adapter audit approval join source excludes nondeterministic generators"
  Assert-NotMatches $source "fetch\s*\(|XMLHttpRequest|axios\.|navigator\.sendBeacon" "deterministic text adapter audit approval join source excludes network calls"
  Assert-NotMatches $source "process\.env\." "deterministic text adapter audit approval join source excludes env var reads"
  Assert-NotMatches $source "localStorage|sessionStorage|indexedDB|document\.cookie" "deterministic text adapter audit approval join source excludes browser storage"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-audit-approval-join-mvp-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"

Assert-Contains $checkpointNormalized "Highest detected phase: 5801" "checkpoint current doc reports Highest detected phase: 5801"
Assert-Contains $checkpointNormalized "Latest completed batch: 5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP" "checkpoint current doc reports latest completed text adapter audit approval join batch"
Assert-Contains $checkpointNormalized "Previous completed batch: 5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview" "checkpoint current doc reports previous completed text adapter result capture review batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5802-5833 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join Review and Recovery Preview" "checkpoint current doc reports next likely text adapter audit approval join review batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesSource "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesSource "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"

Assert-Contains $athenaPanelSource '"text-adapter-audit-approval-join-capability"' "AthenaCommandCenterPanel uses scoped text adapter audit approval join capability keys"
Assert-Contains $athenaPanelSource '"text-adapter-audit-approval-join-workspace"' "AthenaCommandCenterPanel uses scoped text adapter audit approval join workspace keys"
Assert-NotMatches $athenaPanelSource "key=\{group\.capabilityFamily\}" "AthenaCommandCenterPanel does not use raw repeated capability ids as sibling React keys for text adapter audit approval join MVP list rendering"

$validation = Invoke-TextAdapterAuditApprovalJoinValidation $root
Assert-Equal $validation.highestDetectedPhase "5801" "join summary reports phase 5801"
Assert-Equal $validation.latestCompletedBatch "5770-5801 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join MVP" "join summary reports latest completed batch"
Assert-Equal $validation.previousCompletedBatch "5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview" "join summary reports previous completed batch"
Assert-Equal $validation.nextLikelyBatch "5802-5833 - Backend-Owned Minimal Manual-Gated Text Model Adapter Audit and Approval Join Review and Recovery Preview" "join summary reports next likely batch"
Assert-Equal $validation.currentReadiness "minimal-text-adapter-audit-approval-join-mvp-only / backend-only / fixture-only / in-memory-only / not persistent" "join summary reports readiness"
Assert-Equal $validation.helperJoinState "joined-text-adapter-fixture-in-memory-only" "server-only helper remains in-memory only"
Assert-Equal $validation.helperAuditJoinState "deterministic audit join in memory only" "server-only helper keeps deterministic audit join state"
Assert-Equal $validation.helperApprovalJoinState "deterministic approval join in memory only" "server-only helper keeps deterministic approval join state"
Assert-Equal $validation.helperProviderResponseState "not received" "server-only helper keeps provider response blocked"
Assert-Equal $validation.helperModelOutputState "not generated" "server-only helper keeps model output blocked"
Assert-Equal $validation.helperPersistenceState "not implemented" "server-only helper keeps persistence blocked"
Assert-Equal $validation.helperCurrentReadiness "minimal-text-adapter-audit-approval-join-mvp-only / backend-only / fixture-only / in-memory-only / not persistent" "server-only helper reports current readiness"
Assert-Equal $validation.helperNoFrontendRequestStatement "no frontend request is created" "server-only helper keeps frontend request blocked"
Assert-Equal $validation.helperNoApiRouteStatement "no API route is created" "server-only helper keeps API route blocked"

if ([int]$validation.joinCount -lt 1) {
  throw "[FAIL] Expected at least 1 text adapter audit approval join MVP record."
}
Write-Host "[PASS] text adapter audit approval join MVP record count is $($validation.joinCount)"

if ([int]$validation.inputCount -lt 1) {
  throw "[FAIL] Expected at least 1 text adapter audit approval join input record."
}
Write-Host "[PASS] text adapter audit approval join input record count is $($validation.inputCount)"

if ([int]$validation.auditOutputCount -lt 1) {
  throw "[FAIL] Expected at least 1 text adapter audit join output record."
}
Write-Host "[PASS] text adapter audit join output record count is $($validation.auditOutputCount)"

if ([int]$validation.approvalOutputCount -lt 1) {
  throw "[FAIL] Expected at least 1 text adapter approval join output record."
}
Write-Host "[PASS] text adapter approval join output record count is $($validation.approvalOutputCount)"

if ([int]$validation.envelopeCount -lt 1) {
  throw "[FAIL] Expected at least 1 text adapter audit approval join envelope record."
}
Write-Host "[PASS] text adapter audit approval join envelope record count is $($validation.envelopeCount)"

if ([int]$validation.gateCount -lt 40) {
  throw "[FAIL] Expected at least 40 text adapter audit approval join gate records."
}
Write-Host "[PASS] text adapter audit approval join gate count is $($validation.gateCount)"

if ([int]$validation.readinessCount -lt 20) {
  throw "[FAIL] Expected at least 20 text adapter audit approval join readiness records."
}
Write-Host "[PASS] text adapter audit approval join readiness count is $($validation.readinessCount)"

if ([int]$validation.evidenceCount -lt 1) {
  throw "[FAIL] Expected at least 1 text adapter audit approval evidence preview record."
}
Write-Host "[PASS] text adapter audit approval evidence preview count is $($validation.evidenceCount)"

if ([int]$validation.checklistCount -lt 4) {
  throw "[FAIL] Expected at least 4 text adapter audit approval join review and recovery checklist lines."
}
Write-Host "[PASS] text adapter audit approval join checklist count is $($validation.checklistCount)"

Write-Host "[PASS] backend-owned minimal manual-gated text model adapter audit and approval join MVP mega batch smoke passed"
