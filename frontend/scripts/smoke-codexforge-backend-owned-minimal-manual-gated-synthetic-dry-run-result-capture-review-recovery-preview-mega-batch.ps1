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

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture Review and Recovery Preview Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$videoPagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$videoPageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$reviewModuleTypesPath = Join-Path $root "src\lib\codexforge\min-synth-capture-review\min-synth-capture-review-types.ts"
$reviewModuleCatalogPath = Join-Path $root "src\lib\codexforge\min-synth-capture-review\min-synth-capture-review-catalog.ts"
$reviewModuleIndexPath = Join-Path $root "src\lib\codexforge\min-synth-capture-review\index.ts"
$resultCaptureHelperPath = Join-Path $root "src\lib\codexforge\min-synth-result-capture\min-synth-result-capture-helper.server.ts"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"

$requiredPaths = @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $navigationTypesPath,
  $reviewModuleTypesPath,
  $reviewModuleCatalogPath,
  $reviewModuleIndexPath,
  $resultCaptureHelperPath,
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
  $athenaModelPath
)
$homeSource = Get-CombinedFileText @(
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $athenaModelPath
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
$serverHelperSource = Get-Content -Raw $resultCaptureHelperPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$athenaPanelSource = Get-Content -Raw $athenaPanelPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
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
  "5482-5513 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture Review and Recovery Preview",
  "5513",
  "Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture Review and Recovery Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal manual-gated synthetic dry-run result capture MVP",
  "Synthetic result capture audit and approval preview",
  "Backend-owned minimal synthetic result capture review",
  "Synthetic result capture output review",
  "Synthetic result capture gate failure review",
  "Synthetic result capture recovery plan",
  "Synthetic result capture recovery readiness",
  "Synthetic result capture review audit summary",
  "Synthetic result capture acceptance posture",
  "Athena can review the backend-owned minimal manual-gated synthetic dry-run result capture MVP",
  "minimal synthetic result capture review is preview-only",
  "server-only synthetic result capture helper exists",
  "synthetic result capture is produced in memory only",
  "deterministic synthetic capture only",
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
  "audit and approval join MVP comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now review the backend-owned minimal manual-gated synthetic dry-run result capture MVP",
  "minimal synthetic result capture review is preview-only",
  "server-only synthetic result capture helper exists",
  "synthetic result capture is produced in memory only",
  "no frontend request is created",
  "no API route is created",
  "audit and approval join MVP comes next"
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
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-output-review-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-gate-failure-review-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-plan-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-recovery-readiness-checklist-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-audit-summary-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-acceptance-posture-preview-v1",
  "Backend-owned minimal synthetic result capture review",
  "Synthetic result capture output review",
  "Synthetic result capture gate failure review",
  "Synthetic result capture recovery plan",
  "Synthetic result capture recovery readiness",
  "Synthetic result capture review audit summary",
  "Synthetic result capture acceptance posture",
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

Assert-Contains $serverHelperNormalized "captureMinimalManualGatedSyntheticDryRunResultMvp" "server-only result capture helper marker still exists"
Assert-Contains $serverHelperNormalized "deterministic synthetic capture only" "deterministic synthetic capture marker still exists"
Assert-Contains $serverHelperNormalized "synthetic result capture is produced in memory only" "in-memory only capture marker still exists"

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-recovery-preview-mega-batch.ps1" "all-smoke references new result capture review smoke"
Assert-Contains $checkpointNormalized "Highest detected phase: 5513" "checkpoint current doc reports Highest detected phase: 5513"
Assert-Contains $checkpointNormalized "Latest completed batch: 5482-5513 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture Review and Recovery Preview" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5514-5545 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join MVP" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource 'from\s+["''][^"'']*(openai|anthropic|replicate|fal-ai|elevenlabs|stability|together|groq)[^"'']*["'']' "provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\bfetch\s*\(' "fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\blocalStorage\.|\bsessionStorage\.|\bindexedDB\b\s*[\.\(]|\bIndexedDB\b\s*[\.\(]' "browser storage usage in Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\bdocument\.cookie\b|\bcookieStore\.' "cookie usage in Athena/Jarvis files"
Assert-NotMatches $frontEndSource 'child_process|exec\s*\(|spawn\s*\(|powershell|cmd\.exe|process\.execPath' "command/process/shell execution from app code"
Assert-NotMatches $navigationTypesSource 'type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "route href loosening to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole\s*:\s*string\b' "commandDeckRole loosening to string"
Assert-Contains $athenaPanelSource 'buildScopedItemKey(' "AthenaCommandCenterPanel uses scoped key helper"
Assert-Contains $athenaPanelSource '"synthetic-result-capture-review-capability"' "AthenaCommandCenterPanel scopes synthetic result capture review capability keys"
Assert-Contains $athenaPanelSource '"synthetic-result-capture-review-workspace"' "AthenaCommandCenterPanel scopes synthetic result capture review workspace keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.capabilityFamilyId\}' "AthenaCommandCenterPanel avoids raw capability ids as sibling keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.workspaceTarget\}' "AthenaCommandCenterPanel avoids raw workspace ids as sibling keys"

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ts = require("typescript");

const helperPath = process.argv[process.argv.length - 1];
const source = fs.readFileSync(helperPath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020
  }
}).outputText;

const sandboxModule = { exports: {} };
const sandbox = {
  module: sandboxModule,
  exports: sandboxModule.exports,
  require: (name) => {
    if (name === "server-only") {
      return {};
    }
    throw new Error("Unexpected runtime import: " + name);
  },
  __filename: helperPath,
  __dirname: path.dirname(helperPath),
  console
};

vm.runInNewContext(compiled, sandbox, { filename: helperPath });

const captureMinimalManualGatedSyntheticDryRunResultMvp =
  sandboxModule.exports.captureMinimalManualGatedSyntheticDryRunResultMvp;
const runMinimalManualGatedSyntheticDryRunResultCaptureMvpForStaticFixture =
  sandboxModule.exports.runMinimalManualGatedSyntheticDryRunResultCaptureMvpForStaticFixture;

if (typeof captureMinimalManualGatedSyntheticDryRunResultMvp !== "function") {
  throw new Error("Missing captureMinimalManualGatedSyntheticDryRunResultMvp export");
}
if (typeof runMinimalManualGatedSyntheticDryRunResultCaptureMvpForStaticFixture !== "function") {
  throw new Error("Missing runMinimalManualGatedSyntheticDryRunResultCaptureMvpForStaticFixture export");
}

const first = JSON.stringify(
  runMinimalManualGatedSyntheticDryRunResultCaptureMvpForStaticFixture()
);
const second = JSON.stringify(
  runMinimalManualGatedSyntheticDryRunResultCaptureMvpForStaticFixture()
);

if (first !== second) {
  throw new Error("Deterministic synthetic result capture check failed");
}

const parsed = JSON.parse(first);
if (parsed.syntheticCaptureId !== "synthetic-result-capture-preview:conversational-planning-request") {
  throw new Error("Unexpected synthetic capture id: " + parsed.syntheticCaptureId);
}
if (parsed.syntheticDigest !== "synthetic-result-capture-digest-preview:conversational-planning-request:in-memory-only") {
  throw new Error("Unexpected synthetic capture digest: " + parsed.syntheticDigest);
}
if (parsed.inMemoryOnlyCaptureStatement !== "synthetic result capture is produced in memory only") {
  throw new Error("Unexpected in-memory capture statement");
}
if (parsed.deterministicSyntheticCaptureStatement !== "deterministic synthetic capture only") {
  throw new Error("Unexpected deterministic capture statement");
}
if (parsed.persistenceState !== "not implemented") {
  throw new Error("Unexpected persistence state: " + parsed.persistenceState);
}

console.log(first);
'@

$runnerJson = $nodeScript | & node - $resultCaptureHelperPath
$runnerNormalized = Normalize-Whitespace $runnerJson
Assert-Contains $runnerNormalized '"resultCaptureMvpId":"conversational-planning-request"' "server-only helper executes deterministic capture fixture"
Assert-Contains $runnerNormalized '"syntheticCaptureId":"synthetic-result-capture-preview:conversational-planning-request"' "server-only helper returns deterministic capture id"
Assert-Contains $runnerNormalized '"syntheticDigest":"synthetic-result-capture-digest-preview:conversational-planning-request:in-memory-only"' "server-only helper returns deterministic capture digest"
Assert-Contains $runnerNormalized '"inMemoryOnlyCaptureStatement":"synthetic result capture is produced in memory only"' "server-only helper returns in-memory-only capture marker"
Assert-Contains $runnerNormalized '"persistenceState":"not implemented"' "server-only helper returns not-implemented persistence state"

Write-Host "[PASS] Backend-owned minimal manual-gated synthetic dry-run result capture review and recovery preview smoke passed"
