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

function Invoke-ProviderDryRunResultCaptureValidation {
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

const requiredExports = [
  "buildStableProviderDryRunResultCaptureMvpKey",
  "listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords",
  "listProviderDryRunResultCaptureInputs",
  "listProviderDryRunResultCaptureChecks",
  "listProviderDryRunCapturedFixtureResultOutputs",
  "listProviderDryRunResultCaptureEnvelopes",
  "listProviderDryRunResultCaptureGates",
  "listProviderDryRunResultCaptureReadinessMatrixRecords",
  "buildStaticProviderDryRunResultCaptureServerRunRecord",
  "buildProviderDryRunResultCaptureSummary",
  "buildProviderDryRunResultCaptureGateSummary",
  "buildProviderDryRunResultCaptureReadinessSummary",
  "buildNextProviderDryRunResultCaptureReviewRecoveryChecklist",
  "runMinimalManualGatedProviderDryRunResultCaptureMvpForStaticFixture"
];

for (const exportName of requiredExports) {
  if (typeof captureModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

if (typeof helperModule.captureMinimalManualGatedProviderAdapterDryRunResultMvp !== "function") {
  throw new Error("Missing captureMinimalManualGatedProviderAdapterDryRunResultMvp export.");
}

const firstRun = captureModule.listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords();
const secondRun = captureModule.listMinimalManualGatedProviderAdapterDryRunResultCaptureMvpRecords();
if (JSON.stringify(firstRun) !== JSON.stringify(secondRun)) {
  throw new Error("Provider dry-run result capture records are not deterministic.");
}

const records = firstRun;
const inputs = captureModule.listProviderDryRunResultCaptureInputs();
const checks = captureModule.listProviderDryRunResultCaptureChecks();
const outputs = captureModule.listProviderDryRunCapturedFixtureResultOutputs();
const envelopes = captureModule.listProviderDryRunResultCaptureEnvelopes();
const gates = captureModule.listProviderDryRunResultCaptureGates();
const readiness = captureModule.listProviderDryRunResultCaptureReadinessMatrixRecords();
const summary = captureModule.buildProviderDryRunResultCaptureSummary();
const gateSummary = captureModule.buildProviderDryRunResultCaptureGateSummary();
const readinessSummary = captureModule.buildProviderDryRunResultCaptureReadinessSummary();
const checklist = captureModule.buildNextProviderDryRunResultCaptureReviewRecoveryChecklist();
const helper = captureModule.runMinimalManualGatedProviderDryRunResultCaptureMvpForStaticFixture();
const stableKey = captureModule.buildStableProviderDryRunResultCaptureMvpKey(
  "text-chat-provider-dry-run-result-capture"
);

process.stdout.write(JSON.stringify({
  recordCount: records.length,
  inputCount: inputs.length,
  checkCount: checks.length,
  outputCount: outputs.length,
  envelopeCount: envelopes.length,
  gateCount: gates.length,
  readinessCount: readiness.length,
  highestDetectedPhase: String(summary.highestDetectedPhase),
  latestCompletedBatch: summary.latestCompletedBatch,
  previousCompletedBatch: summary.previousCompletedBatch,
  nextLikelyBatch: summary.nextLikelyBatch,
  currentReadiness: summary.currentReadiness,
  stableKey,
  captureState: records[0].captureState,
  captureMode: records[0].captureMode,
  outputCaptureState: outputs[0].captureState,
  blockedPersistenceState: gateSummary.summaryLines[0],
  helperCaptureState: helper.captureState,
  helperCredentialValueState: helper.credentialValueState,
  helperEnvVarState: helper.envVarState,
  helperProviderKeyState: helper.providerKeyState,
  helperProviderSdkImportState: helper.providerSdkImportState,
  helperLiveProviderExecutionState: helper.liveProviderExecutionState,
  helperProviderResponseState: helper.providerResponseState,
  helperModelOutputState: helper.modelOutputState,
  helperPersistenceState: helper.persistenceState,
  helperNoFrontendRequestStatement: helper.noFrontendRequestStatement,
  helperNoApiRouteStatement: helper.noApiRouteStatement,
  helperNoProviderCallStatement: helper.noProviderCallStatement,
  helperNoModelCallStatement: helper.noModelCallStatement,
  helperNoRealApprovalRequestStatement: helper.noRealApprovalRequestStatement,
  helperNoRealApprovalRecordingStatement: helper.noRealApprovalRecordingStatement,
  helperNoApprovalTokenStatement: helper.noApprovalTokenStatement,
  helperNoApprovalLeaseStatement: helper.noApprovalLeaseStatement,
  checklistCount: checklist.length,
  readinessSummaryCount: readinessSummary.recordCount
}));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute provider dry-run result capture validation."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP Mega Batch smoke ==="

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
$captureTypesPath = Join-Path $root "src\lib\codexforge\min-provider-capture\min-provider-capture-types.ts"
$captureCatalogPath = Join-Path $root "src\lib\codexforge\min-provider-capture\min-provider-capture-catalog.ts"
$captureIndexPath = Join-Path $root "src\lib\codexforge\min-provider-capture\index.ts"
$captureHelperPath = Join-Path $root "src\lib\codexforge\min-provider-capture\min-provider-capture-helper.server.ts"
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
  $captureTypesPath,
  $captureCatalogPath,
  $captureIndexPath
)
$captureModuleSource = Get-CombinedFileText @(
  $captureTypesPath,
  $captureCatalogPath,
  $captureHelperPath
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
$captureModuleNormalized = Normalize-Whitespace $captureModuleSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource

foreach ($needle in @(
  "6026-6057 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP",
  "6057",
  "Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $providersNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal provider adapter dry-run execution review",
  "Provider adapter dry-run execution acceptance posture",
  "Backend-owned minimal manual-gated provider adapter dry-run result capture MVP",
  "Provider adapter dry-run result capture input",
  "Provider adapter dry-run result capture check",
  "Provider adapter dry-run captured fixture result output",
  "Provider adapter dry-run result capture envelope",
  "Provider adapter dry-run result capture gates",
  "Provider adapter dry-run result capture readiness matrix",
  "Provider adapter dry-run result capture evidence preview",
  "Provider adapter dry-run result capture blocked persistence summary",
  "Athena can preview the backend-owned minimal manual-gated provider adapter dry-run result capture MVP",
  "provider adapter dry-run result capture is backend-only",
  "server-only provider dry-run result capture helper exists",
  "provider dry-run fixture response is captured in memory only",
  "provider dry-run result capture is deterministic fixture-only",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not present",
  "credential value is not read",
  "env vars are not read",
  "provider key is not read",
  "selected provider slot is preview-only",
  "provider adapter dry-run result capture is not live provider execution",
  "provider adapter dry-run result capture is not persistent",
  "no frontend request is created",
  "no API route is created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "no live provider execution",
  "no result persistence",
  "provider adapter dry-run result capture review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview the backend-owned minimal manual-gated provider adapter dry-run result capture MVP",
  "provider adapter dry-run result capture is backend-only",
  "server-only provider dry-run result capture helper exists",
  "provider dry-run fixture response is captured in memory only",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "provider adapter dry-run result capture review and recovery preview comes next"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Backend-owned minimal manual-gated provider adapter dry-run result capture MVP",
  "Provider adapter dry-run result capture input",
  "Provider adapter dry-run result capture check",
  "Provider adapter dry-run captured fixture result output",
  "Provider adapter dry-run result capture gates",
  "Provider adapter dry-run result capture readiness matrix",
  "provider adapter dry-run result capture is backend-only",
  "provider dry-run fixture response is captured in memory only",
  "live provider execution is blocked",
  "credential reference is opaque label only",
  "credential value is not read",
  "env vars are not read",
  "no live provider execution",
  "no model calls",
  "no persistence",
  "provider adapter dry-run result capture review and recovery preview comes next"
)) {
  Assert-Contains $providersNormalized $needle "providers route source contains $needle"
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
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-mvp-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-input-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-check-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-captured-fixture-result-output-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-envelope-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-gate-v1",
  "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-readiness-matrix-v1",
  "Backend-owned minimal manual-gated provider adapter dry-run result capture MVP",
  "Provider adapter dry-run result capture input",
  "Provider adapter dry-run result capture check",
  "Provider adapter dry-run captured fixture result output",
  "Provider adapter dry-run result capture envelope",
  "Provider adapter dry-run result capture gates",
  "Provider adapter dry-run result capture readiness matrix",
  "no model calls",
  "no prompt sending",
  "no provider SDK imports",
  "no live provider execution",
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
  "captureMinimalManualGatedProviderAdapterDryRunResultMvp",
  "runMinimalManualGatedProviderDryRunResultCaptureMvpForStaticFixture"
)) {
  Assert-Contains $serverHelperNormalized $needle "server-only provider dry-run result capture helper marker contains $needle"
}

foreach ($needle in @(
  "captured-provider-dry-run-fixture-result-in-memory-only",
  "deterministic-fixture-only",
  "provider-dry-run-result-capture-preview",
  "provider-dry-run-result-capture-digest-preview"
)) {
  Assert-Contains $captureModuleNormalized $needle "provider dry-run result capture module marker contains $needle"
}

foreach ($source in @($typedModelSource, $serverHelperSource)) {
  Assert-NotMatches $source "Math\.random|Date\.now|crypto\.randomUUID" "provider dry-run result capture source excludes nondeterministic generators"
  Assert-NotMatches $source "fetch\s*\(|XMLHttpRequest|axios\.|navigator\.sendBeacon" "provider dry-run result capture source excludes network calls"
  Assert-NotMatches $source "process\.env\." "provider dry-run result capture source excludes env var reads"
  Assert-NotMatches $source "fs\.|readFile|writeFile|appendFile|createWriteStream" "provider dry-run result capture source excludes file access"
}

Assert-NotMatches $captureModuleSource "providerKey\s*=|credentialValue\s*=|envVar\s*=" "provider dry-run result capture module excludes credential or provider key reads"
Assert-Contains $captureModuleNormalized "provider key is not read" "provider key not read marker exists"
Assert-Contains $captureModuleNormalized "credential value is not read" "credential value not read marker exists"
Assert-Contains $captureModuleNormalized "env vars are not read" "env vars not read marker exists"
Assert-Contains $captureModuleNormalized "credential reference is opaque label only" "opaque credential reference marker exists"
Assert-Contains $captureModuleNormalized "live provider execution is blocked" "live provider execution blocked marker exists"

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-mvp-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $allSmokeNormalized "Phase 6057 Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP" "scripts/smoke-codexforge-all.ps1 contains phase 6057 release gate"

Assert-Contains $checkpointNormalized "Highest detected phase: 6057" "checkpoint current doc reports Highest detected phase: 6057"
Assert-Contains $checkpointNormalized "Latest completed batch: 6026-6057 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointNormalized "Next likely batch: 6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesSource "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesSource "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"

Assert-Contains $athenaPanelSource '"provider-dry-run-result-capture-summary"' "AthenaCommandCenterPanel uses scoped provider dry-run result capture summary keys"
Assert-Contains $athenaPanelSource '"provider-dry-run-result-capture-gates"' "AthenaCommandCenterPanel uses scoped provider dry-run result capture gate keys"
Assert-Contains $athenaPanelSource '"provider-dry-run-result-capture-readiness"' "AthenaCommandCenterPanel uses scoped provider dry-run result capture readiness keys"
Assert-NotMatches $athenaPanelSource "key=\{group\.providerSlotId\}" "AthenaCommandCenterPanel does not use raw repeated provider ids as sibling React keys for provider dry-run result capture MVP list rendering"
Assert-NotMatches $athenaPanelSource "key=\{group\.credentialReferenceId\}" "AthenaCommandCenterPanel does not use raw repeated credential ids as sibling React keys for provider dry-run result capture MVP list rendering"

$validation = Invoke-ProviderDryRunResultCaptureValidation $root
Assert-Equal $validation.highestDetectedPhase "6057" "result capture summary reports phase 6057"
Assert-Equal $validation.latestCompletedBatch "6026-6057 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP" "result capture summary reports latest completed batch"
Assert-Equal $validation.previousCompletedBatch "5994-6025 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Execution Review and Recovery Preview" "result capture summary reports previous completed batch"
Assert-Equal $validation.nextLikelyBatch "6058-6089 - Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture Review and Recovery Preview" "result capture summary reports next likely batch"
Assert-Equal $validation.currentReadiness "minimal-provider-dry-run-result-capture-mvp-only / backend-only / dry-run-fixture-capture-only / credential-reference-only / not-live-provider-executing / not persistent" "result capture summary reports current readiness"
Assert-Equal $validation.stableKey "backend-owned-minimal-manual-gated-provider-adapter-dry-run-result-capture-mvp:text-chat-provider-dry-run-result-capture" "stable result capture key remains deterministic"
Assert-Equal $validation.captureState "captured-provider-dry-run-fixture-result-in-memory-only" "capture record remains in-memory only"
Assert-Equal $validation.captureMode "deterministic-fixture-only" "capture mode remains deterministic fixture only"
Assert-Equal $validation.outputCaptureState "captured-provider-dry-run-fixture-result-in-memory-only" "captured output remains deterministic in memory only"
Assert-Equal $validation.helperCaptureState "captured-provider-dry-run-fixture-result-in-memory-only" "server-only helper remains in-memory only"
Assert-Equal $validation.helperCredentialValueState "not present / not read" "server-only helper keeps credential value unread"
Assert-Equal $validation.helperEnvVarState "not read" "server-only helper keeps env vars unread"
Assert-Equal $validation.helperProviderKeyState "not read" "server-only helper keeps provider key unread"
Assert-Equal $validation.helperProviderSdkImportState "not imported" "server-only helper keeps provider SDK imports blocked"
Assert-Equal $validation.helperLiveProviderExecutionState "blocked" "server-only helper keeps live provider execution blocked"
Assert-Equal $validation.helperProviderResponseState "not received from provider" "server-only helper keeps provider response blocked"
Assert-Equal $validation.helperModelOutputState "not generated by provider/model" "server-only helper keeps model output blocked"
Assert-Equal $validation.helperPersistenceState "not implemented" "server-only helper keeps persistence blocked"
Assert-Equal $validation.helperNoFrontendRequestStatement "no frontend request is created" "server-only helper keeps frontend requests blocked"
Assert-Equal $validation.helperNoApiRouteStatement "no API route is created" "server-only helper keeps API routes blocked"
Assert-Equal $validation.helperNoProviderCallStatement "no provider call exists" "server-only helper keeps provider calls blocked"
Assert-Equal $validation.helperNoModelCallStatement "no model call exists" "server-only helper keeps model calls blocked"
Assert-Equal $validation.helperNoRealApprovalRequestStatement "no real approval request exists" "server-only helper keeps real approval requests blocked"
Assert-Equal $validation.helperNoRealApprovalRecordingStatement "no real approval recording exists" "server-only helper keeps real approval recording blocked"
Assert-Equal $validation.helperNoApprovalTokenStatement "no approval token exists" "server-only helper keeps approval tokens blocked"
Assert-Equal $validation.helperNoApprovalLeaseStatement "no approval lease exists" "server-only helper keeps approval leases blocked"

if ([int]$validation.recordCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider dry-run result capture MVP records."
}
Write-Host "[PASS] provider dry-run result capture MVP record count is $($validation.recordCount)"

if ([int]$validation.inputCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider dry-run result capture input records."
}
Write-Host "[PASS] provider dry-run result capture input count is $($validation.inputCount)"

if ([int]$validation.checkCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider dry-run result capture check records."
}
Write-Host "[PASS] provider dry-run result capture check count is $($validation.checkCount)"

if ([int]$validation.outputCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider dry-run captured fixture result output records."
}
Write-Host "[PASS] provider dry-run captured fixture result output count is $($validation.outputCount)"

if ([int]$validation.envelopeCount -lt 2) {
  throw "[FAIL] Expected at least 2 provider dry-run result capture envelope records."
}
Write-Host "[PASS] provider dry-run result capture envelope count is $($validation.envelopeCount)"

if ([int]$validation.gateCount -lt 40) {
  throw "[FAIL] Expected at least 40 provider dry-run result capture gate records."
}
Write-Host "[PASS] provider dry-run result capture gate count is $($validation.gateCount)"

if ([int]$validation.readinessCount -lt 20) {
  throw "[FAIL] Expected at least 20 provider dry-run result capture readiness records."
}
Write-Host "[PASS] provider dry-run result capture readiness count is $($validation.readinessCount)"

if ([int]$validation.checklistCount -lt 4) {
  throw "[FAIL] Expected at least 4 provider dry-run result capture review checklist lines."
}
Write-Host "[PASS] provider dry-run result capture review checklist count is $($validation.checklistCount)"

Write-Host "[PASS] CodexForge Backend-Owned Minimal Manual-Gated Provider Adapter Dry-Run Result Capture MVP smoke completed."
