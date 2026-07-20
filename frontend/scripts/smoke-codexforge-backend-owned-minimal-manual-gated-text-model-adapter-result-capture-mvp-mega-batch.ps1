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

function Invoke-TextAdapterResultCaptureValidation {
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
  "min-text-capture",
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
  "buildStableMinimalTextAdapterResultCaptureMvpKey",
  "listMinimalManualGatedTextModelAdapterResultCaptureMvpRecords",
  "listTextAdapterResultCaptureInputs",
  "listTextAdapterCapturedFixtureResultOutputs",
  "listTextAdapterResultCaptureEnvelopes",
  "listTextAdapterResultCaptureGates",
  "listTextAdapterResultCaptureReadinessMatrixRecords",
  "buildTextAdapterResultCaptureSummary",
  "buildTextAdapterResultCaptureGateSummary",
  "buildTextAdapterResultCaptureReadinessSummary",
  "buildNextTextAdapterResultCaptureReviewRecoveryChecklist"
];

for (const exportName of requiredExports) {
  if (typeof captureModule[exportName] !== "function") {
    throw new Error(`Missing ${exportName} export.`);
  }
}

if (typeof helperModule.captureMinimalManualGatedTextModelAdapterResultMvp !== "function") {
  throw new Error("Missing captureMinimalManualGatedTextModelAdapterResultMvp export.");
}

if (typeof helperModule.runMinimalManualGatedTextAdapterResultCaptureMvpForStaticFixture !== "function") {
  throw new Error("Missing runMinimalManualGatedTextAdapterResultCaptureMvpForStaticFixture export.");
}

const firstRun = captureModule.listMinimalManualGatedTextModelAdapterResultCaptureMvpRecords();
const secondRun = captureModule.listMinimalManualGatedTextModelAdapterResultCaptureMvpRecords();
if (JSON.stringify(firstRun) !== JSON.stringify(secondRun)) {
  throw new Error("Text adapter result capture records are not deterministic.");
}

const records = firstRun;
const inputs = captureModule.listTextAdapterResultCaptureInputs();
const outputs = captureModule.listTextAdapterCapturedFixtureResultOutputs();
const envelopes = captureModule.listTextAdapterResultCaptureEnvelopes();
const gates = captureModule.listTextAdapterResultCaptureGates();
const readiness = captureModule.listTextAdapterResultCaptureReadinessMatrixRecords();
const summary = captureModule.buildTextAdapterResultCaptureSummary();
const gateSummary = captureModule.buildTextAdapterResultCaptureGateSummary();
const readinessSummary = captureModule.buildTextAdapterResultCaptureReadinessSummary();
const checklist = captureModule.buildNextTextAdapterResultCaptureReviewRecoveryChecklist();
const helper = helperModule.runMinimalManualGatedTextAdapterResultCaptureMvpForStaticFixture();
const stableKey = captureModule.buildStableMinimalTextAdapterResultCaptureMvpKey(
  "conversational-planning-request"
);

process.stdout.write(JSON.stringify({
  recordCount: records.length,
  inputCount: inputs.length,
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
  resultState: outputs[0].capturedResultState,
  envelopeStatement: envelopes[0].explicitFixtureCaptureOnlyNoProviderOutputNoPersistenceStatement,
  blockedGateCount: String(gateSummary.blockedGateCount),
  readinessSummaryCount: String(readinessSummary.readinessCount),
  checklistCount: String(checklist.length),
  helperCaptureState: helper.captureState,
  helperProviderResponseState: helper.providerResponseState,
  helperModelOutputState: helper.modelOutputState,
  helperPersistenceState: helper.persistenceState
}));
'@

  $json = $nodeScript | node - $RepoRootPath
  if ($LASTEXITCODE -ne 0) {
    throw "[FAIL] Unable to execute text adapter result capture validation."
  }

  return $json | ConvertFrom-Json
}

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP Mega Batch smoke ==="

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
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$serverHelperNormalized = Normalize-Whitespace $serverHelperSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource

foreach ($needle in @(
  "5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP",
  "5737",
  "Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal text adapter review",
  "Text adapter acceptance posture",
  "Backend-owned minimal manual-gated text model adapter result capture MVP",
  "Text adapter result capture input",
  "Text adapter captured fixture result output",
  "Text adapter result capture envelope",
  "Text adapter result capture gates",
  "Text adapter result capture readiness matrix",
  "Text adapter result capture evidence preview",
  "Athena can preview the backend-owned minimal manual-gated text model adapter result capture MVP",
  "minimal text adapter result capture MVP is backend-only",
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
  "text adapter result capture review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview the backend-owned minimal manual-gated text model adapter result capture MVP",
  "minimal text adapter result capture MVP is backend-only",
  "server-only text adapter result capture helper exists",
  "text adapter fixture response is captured in memory only",
  "text adapter result capture is not persistent",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "text adapter result capture review and recovery preview comes next"
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
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-input-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-captured-fixture-result-output-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-envelope-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-gate-v1",
  "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-readiness-matrix-v1",
  "Backend-owned minimal manual-gated text model adapter result capture MVP",
  "Text adapter result capture input",
  "Text adapter captured fixture result output",
  "Text adapter result capture envelope",
  "Text adapter result capture gates",
  "Text adapter result capture readiness matrix",
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
  "deterministic fixture result captured in memory only",
  "text-adapter-result-capture-preview",
  "text-adapter-result-capture-digest-preview"
)) {
  Assert-Contains $serverHelperNormalized $needle "server-only text adapter result capture helper marker contains $needle"
}

foreach ($source in @($typedModelSource, $serverHelperSource)) {
  Assert-NotMatches $source "Math\.random|Date\.now|crypto\.randomUUID" "deterministic text adapter result capture source excludes nondeterministic generators"
  Assert-NotMatches $source "fetch\s*\(|XMLHttpRequest|axios\.|navigator\.sendBeacon" "deterministic text adapter result capture source excludes network calls"
  Assert-NotMatches $source "process\.env\." "deterministic text adapter result capture source excludes env var reads"
  Assert-NotMatches $source "localStorage|sessionStorage|indexedDB|document\.cookie" "deterministic text adapter result capture source excludes browser storage"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $allSmokeNormalized "Phase 5737 Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP" "scripts/smoke-codexforge-all.ps1 contains phase 5737 release gate"

Assert-Contains $checkpointNormalized "Highest detected phase: 5737" "checkpoint current doc reports Highest detected phase: 5737"
Assert-Contains $checkpointNormalized "Latest completed batch: 5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP" "checkpoint current doc reports latest completed text adapter result capture batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview" "checkpoint current doc reports next likely text adapter result capture review batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesSource "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesSource "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"

Assert-Contains $athenaPanelSource '"text-adapter-result-capture-summary"' "AthenaCommandCenterPanel uses scoped text adapter result capture summary keys"
Assert-Contains $athenaPanelSource '"text-adapter-result-capture-gates"' "AthenaCommandCenterPanel uses scoped text adapter result capture gate keys"
Assert-Contains $athenaPanelSource '"text-adapter-result-capture-readiness"' "AthenaCommandCenterPanel uses scoped text adapter result capture readiness keys"
Assert-NotMatches $athenaPanelSource "key=\{group\.capabilityFamilyId\}" "AthenaCommandCenterPanel does not use raw repeated capability ids as sibling React keys for text adapter result capture MVP list rendering"

$validation = Invoke-TextAdapterResultCaptureValidation $root
Assert-Equal $validation.highestDetectedPhase "5737" "result capture summary reports phase 5737"
Assert-Equal $validation.latestCompletedBatch "5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP" "result capture summary reports latest completed batch"
Assert-Equal $validation.previousCompletedBatch "5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview" "result capture summary reports previous completed batch"
Assert-Equal $validation.nextLikelyBatch "5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview" "result capture summary reports next likely batch"
Assert-Equal $validation.currentReadiness "minimal-text-adapter-result-capture-mvp-only / backend-only / fixture-only / in-memory-only / not persistent" "result capture summary reports capture readiness"
Assert-Equal $validation.stableKey "backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp:conversational-planning-request" "stable result capture key remains deterministic"
Assert-Equal $validation.captureState "captured-text-adapter-fixture-in-memory-only" "capture record remains in-memory only"
Assert-Equal $validation.resultState "deterministic fixture result captured in memory only" "captured output remains deterministic in memory only"
Assert-Equal $validation.envelopeStatement "Fixture capture only. No provider output. No persistence." "capture envelope keeps fixture-only statement"
Assert-Equal $validation.helperCaptureState "captured-text-adapter-fixture-in-memory-only" "server-only helper remains in-memory only"
Assert-Equal $validation.helperProviderResponseState "not received" "server-only helper keeps provider response blocked"
Assert-Equal $validation.helperModelOutputState "not generated" "server-only helper keeps model output blocked"
Assert-Equal $validation.helperPersistenceState "not implemented" "server-only helper keeps persistence blocked"

if ([int]$validation.recordCount -lt 1) {
  throw "[FAIL] Expected at least 1 text adapter result capture MVP record."
}
Write-Host "[PASS] text adapter result capture MVP record count is $($validation.recordCount)"

if ([int]$validation.inputCount -lt 1) {
  throw "[FAIL] Expected at least 1 text adapter result capture input record."
}
Write-Host "[PASS] text adapter result capture input count is $($validation.inputCount)"

if ([int]$validation.outputCount -lt 1) {
  throw "[FAIL] Expected at least 1 captured fixture result output record."
}
Write-Host "[PASS] text adapter captured fixture result output count is $($validation.outputCount)"

if ([int]$validation.envelopeCount -lt 1) {
  throw "[FAIL] Expected at least 1 text adapter result capture envelope record."
}
Write-Host "[PASS] text adapter result capture envelope count is $($validation.envelopeCount)"

if ([int]$validation.gateCount -lt 35) {
  throw "[FAIL] Expected at least 35 text adapter result capture gate records."
}
Write-Host "[PASS] text adapter result capture gate count is $($validation.gateCount)"

if ([int]$validation.readinessCount -lt 20) {
  throw "[FAIL] Expected at least 20 text adapter result capture readiness records."
}
Write-Host "[PASS] text adapter result capture readiness count is $($validation.readinessCount)"

if ([int]$validation.checklistCount -lt 4) {
  throw "[FAIL] Expected at least 4 text adapter result capture review checklist lines."
}
Write-Host "[PASS] text adapter result capture review checklist count is $($validation.checklistCount)"

Write-Host "[PASS] CodexForge Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP smoke completed."
