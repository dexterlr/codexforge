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

function Assert-Matches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if (-not [regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Missing $Name with pattern $Pattern"
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

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution MVP Mega Batch smoke ==="

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
$newModuleTypesPath = Join-Path $root "src\lib\codexforge\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-types.ts"
$newModuleCatalogPath = Join-Path $root "src\lib\codexforge\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-catalog.ts"
$newModuleIndexPath = Join-Path $root "src\lib\codexforge\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp\index.ts"
$newModuleRunnerPath = Join-Path $root "src\lib\codexforge\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-runner.server.ts"
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
  $newModuleTypesPath,
  $newModuleCatalogPath,
  $newModuleIndexPath,
  $newModuleRunnerPath,
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
  $newModuleTypesPath,
  $newModuleCatalogPath,
  $newModuleIndexPath
)
$serverHelperSource = Get-Content -Raw $newModuleRunnerPath
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$athenaPanelSource = Get-Content -Raw $athenaPanelPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
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
  "5386-5417 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution MVP",
  "5417",
  "Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution MVP"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned synthetic dry-run manual approval decision review",
  "Manual approval decision acceptance posture",
  "Backend-owned minimal manual-gated synthetic dry-run execution MVP",
  "Synthetic execution input",
  "Synthetic execution result",
  "Synthetic MVP result envelope",
  "Synthetic MVP gates",
  "Synthetic MVP readiness matrix",
  "Synthetic MVP audit and approval preview",
  "Athena can preview the backend-owned minimal manual-gated synthetic dry-run execution MVP",
  "minimal synthetic execution MVP is backend-only",
  "synthetic execution result is produced in memory only",
  "server-only synthetic execution helper exists",
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
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "execution review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview the backend-owned minimal manual-gated synthetic dry-run execution MVP",
  "minimal synthetic execution MVP is backend-only",
  "synthetic execution result is produced in memory only",
  "no frontend request is created",
  "no API route is created",
  "execution review and recovery preview comes next"
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
  "backend-owned minimal manual-gated synthetic dry-run execution MVP",
  "synthetic execution input",
  "synthetic execution result",
  "synthetic MVP result envelope",
  "synthetic MVP audit preview",
  "synthetic MVP approval preview",
  "synthetic MVP gates",
  "synthetic MVP readiness matrix",
  "deterministic synthetic result only",
  "synthetic execution result is produced in memory only",
  "server-only synthetic execution helper exists",
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
  Assert-Contains ($typedModelNormalized + " " + $serverHelperNormalized) $needle "typed model/data contains $needle"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-mega-batch.ps1" "all-smoke references new MVP smoke"
Assert-Contains $checkpointNormalized "Highest detected phase: 5417" "checkpoint current doc reports phase 5417"
Assert-Contains $checkpointNormalized "Latest completed batch: 5386-5417 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution MVP" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5418-5449 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution Review and Recovery Preview" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource 'from\s+["''][^"'']*(openai|anthropic|replicate|fal-ai|elevenlabs|stability|together|groq)[^"'']*["'']' "provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\bfetch\s*\(' "fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\blocalStorage\.|\bsessionStorage\.|\bindexedDB\b\s*[\.\(]|\bIndexedDB\b\s*[\.\(]' "browser storage usage in Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\bdocument\.cookie\b|\bcookieStore\.' "cookie usage in Athena/Jarvis files"
Assert-NotMatches $frontEndSource 'child_process|exec\s*\(|spawn\s*\(|powershell|cmd\.exe|process\.execPath' "command/process/shell execution from app code"
Assert-NotMatches $navigationTypesSource 'type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "route href loosening to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole\s*:\s*string\b' "commandDeckRole loosening to string"
Assert-Contains $athenaPanelSource 'buildScopedItemKey(' "AthenaCommandCenterPanel uses scoped key helper"
Assert-Contains $athenaPanelSource '"synthetic-mvp-capability"' "AthenaCommandCenterPanel scopes synthetic MVP capability keys"
Assert-Contains $athenaPanelSource '"synthetic-mvp-workspace"' "AthenaCommandCenterPanel scopes synthetic MVP workspace keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.capabilityFamilyId\}' "AthenaCommandCenterPanel avoids raw capability ids as sibling keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.workspaceTarget\}' "AthenaCommandCenterPanel avoids raw workspace ids as sibling keys"

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ts = require("typescript");

const runnerPath = process.argv[process.argv.length - 1];
const source = fs.readFileSync(runnerPath, "utf8");
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
  __filename: runnerPath,
  __dirname: path.dirname(runnerPath),
  console
};

vm.runInNewContext(compiled, sandbox, { filename: runnerPath });

const runMinimalManualGatedSyntheticDryRunMvp =
  sandboxModule.exports.runMinimalManualGatedSyntheticDryRunMvp;

if (typeof runMinimalManualGatedSyntheticDryRunMvp !== "function") {
  throw new Error("Missing runMinimalManualGatedSyntheticDryRunMvp export");
}

const input = {
  executionMvpId: "conversational-planning-request",
  executionMode: "synthetic-only",
  executionOwnership: "backend-owned",
  manualApprovalDecisionFixtureState: "preview-only",
  previewOnlyDecisionState: "preview-only",
  selectedDecisionFixture: "static synthetic approve-preview fixture",
  manualConfirmationFixtureState: "preview-only",
  killSwitchFixtureState: "inactive",
  providerExecutionRequestState: "blocked",
  promptSendingRequestState: "blocked",
  modelCallRequestState: "blocked",
  queueDispatchRequestState: "blocked",
  workerDispatchRequestState: "blocked",
  jobExecutionRequestState: "blocked",
  persistenceRequestState: "blocked"
};

const first = JSON.stringify(runMinimalManualGatedSyntheticDryRunMvp(input));
const second = JSON.stringify(runMinimalManualGatedSyntheticDryRunMvp(input));

if (first !== second) {
  throw new Error("Deterministic synthetic result check failed");
}

const parsed = JSON.parse(first);
if (parsed.resultId !== "synthetic-mvp-result-preview:conversational-planning-request") {
  throw new Error("Unexpected result id: " + parsed.resultId);
}
if (parsed.syntheticDigest !== "synthetic-mvp-digest-preview:conversational-planning-request:approve-preview") {
  throw new Error("Unexpected synthetic digest: " + parsed.syntheticDigest);
}
if (parsed.inMemoryOnlyResultStatement !== "synthetic execution result is produced in memory only") {
  throw new Error("Unexpected in-memory result statement");
}
if (parsed.deterministicSyntheticResultStatement !== "deterministic synthetic result only") {
  throw new Error("Unexpected deterministic result statement");
}
if (parsed.persistenceState !== "not implemented") {
  throw new Error("Unexpected persistence state: " + parsed.persistenceState);
}

console.log(first);
'@

$runnerJson = $nodeScript | & node - $newModuleRunnerPath
$runnerNormalized = Normalize-Whitespace $runnerJson
Assert-Contains $runnerNormalized '"executionMvpId":"conversational-planning-request"' "server-only helper executes deterministic fixture"
Assert-Contains $runnerNormalized '"resultId":"synthetic-mvp-result-preview:conversational-planning-request"' "server-only helper returns deterministic result id"
Assert-Contains $runnerNormalized '"syntheticDigest":"synthetic-mvp-digest-preview:conversational-planning-request:approve-preview"' "server-only helper returns deterministic digest"
Assert-Contains $runnerNormalized '"inMemoryOnlyResultStatement":"synthetic execution result is produced in memory only"' "server-only helper returns in-memory-only marker"
Assert-Contains $runnerNormalized '"persistenceState":"not implemented"' "server-only helper returns not-implemented persistence state"

Write-Host "[PASS] Backend-owned minimal manual-gated synthetic dry-run execution MVP smoke passed"
