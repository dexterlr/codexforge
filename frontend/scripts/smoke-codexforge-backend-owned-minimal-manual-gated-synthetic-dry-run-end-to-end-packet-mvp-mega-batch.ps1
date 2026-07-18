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

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP Mega Batch smoke ==="

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
$packetModuleTypesPath = Join-Path $root "src\lib\codexforge\min-synth-e2e-mvp\min-synth-e2e-mvp-types.ts"
$packetModuleCatalogPath = Join-Path $root "src\lib\codexforge\min-synth-e2e-mvp\min-synth-e2e-mvp-catalog.ts"
$packetModuleIndexPath = Join-Path $root "src\lib\codexforge\min-synth-e2e-mvp\index.ts"
$packetModuleHelperPath = Join-Path $root "src\lib\codexforge\min-synth-e2e-mvp\min-synth-e2e-mvp-helper.server.ts"
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
  $packetModuleTypesPath,
  $packetModuleCatalogPath,
  $packetModuleIndexPath,
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
  $packetModuleTypesPath,
  $packetModuleCatalogPath,
  $packetModuleIndexPath
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
  "5578-5609 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP",
  "5609",
  "Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal synthetic audit and approval join review",
  "Synthetic audit and approval join acceptance posture",
  "Backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP",
  "Synthetic end-to-end packet input",
  "Synthetic end-to-end packet output",
  "Synthetic end-to-end packet envelope",
  "Synthetic end-to-end packet stage summary",
  "Synthetic end-to-end packet gates",
  "Synthetic end-to-end packet readiness matrix",
  "Synthetic end-to-end packet evidence preview",
  "Athena can preview the backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP",
  "minimal synthetic end-to-end packet MVP is backend-only",
  "synthetic end-to-end packet is produced in memory only",
  "server-only synthetic end-to-end packet helper exists",
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
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "end-to-end packet review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview the backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP",
  "minimal synthetic end-to-end packet MVP is backend-only",
  "synthetic end-to-end packet is produced in memory only",
  "synthetic execution, capture, audit join, and approval join are bundled in memory only",
  "no frontend request is created",
  "no API route is created",
  "end-to-end packet review and recovery preview comes next"
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
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-mvp-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-input-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-output-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-envelope-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-stage-summary-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-gate-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-readiness-matrix-v1",
  "Synthetic end-to-end packet input",
  "Synthetic end-to-end packet output",
  "Synthetic end-to-end packet envelope",
  "Synthetic end-to-end packet stage summary",
  "Synthetic end-to-end packet gates",
  "Synthetic end-to-end packet readiness matrix",
  "Synthetic end-to-end packet evidence preview",
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
  Assert-NotMatches $source "Math\.random|Date\.now|crypto\.randomUUID" "deterministic packet source excludes nondeterministic generators"
  Assert-NotMatches $source "fetch\s*\(|XMLHttpRequest|axios\.|navigator\.sendBeacon" "deterministic packet source excludes network calls"
  Assert-NotMatches $source "process\.env\." "deterministic packet source excludes env var reads"
  Assert-NotMatches $source "localStorage|sessionStorage|indexedDB|document\.cookie" "deterministic packet source excludes browser storage"
}

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-mvp-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $allSmokeNormalized "Phase 5609 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP" "scripts/smoke-codexforge-all.ps1 contains phase 5609 release gate"

Assert-Contains $checkpointNormalized "Highest detected phase: 5609" "checkpoint current doc reports Highest detected phase: 5609"
Assert-Contains $checkpointNormalized "Latest completed batch: 5578-5609 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP" "checkpoint current doc reports latest completed packet batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5610-5641 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview" "checkpoint current doc reports next likely packet review batch"

Assert-NotMatches $frontEndSource '(?s)import.{0,200}(openai|@anthropic-ai/sdk|anthropic|groq-sdk|replicate|@google/generative-ai|@azure/openai|together-ai)' "no provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "fetch\s*\(|axios\.|XMLHttpRequest|navigator\.sendBeacon|new\s+Request\s*\(" "no fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource "localStorage\.(getItem|setItem|removeItem|clear)|sessionStorage\.(getItem|setItem|removeItem|clear)|indexedDB(\.open|\s*\()|document\.cookie|cookies\s*\(" "no localStorage/sessionStorage/IndexedDB/cookies in Athena/Jarvis files"
Assert-NotMatches $frontEndSource "child_process|execSync|spawn\s*\(|Start-Process|cmd\.exe|powershell\.exe|shelljs|Deno\.Command|Bun\.spawn" "no command/process/shell execution from app code"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-NotMatches $navigationTypesSource "CodexForgeNavigationRouteHref\s*=\s*string" "no route href loosening to string"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole remains typed"
Assert-NotMatches $navigationTypesSource "commandDeckRole\s*:\s*string" "no commandDeckRole loosening to string"

Assert-Contains $athenaPanelSource '"synthetic-end-to-end-packet-mvp-capability"' "AthenaCommandCenterPanel uses scoped packet capability keys"
Assert-Contains $athenaPanelSource '"synthetic-end-to-end-packet-mvp-workspace"' "AthenaCommandCenterPanel uses scoped packet workspace keys"
Assert-NotMatches $athenaPanelSource "key=\{group\.capabilityFamilyId\}" "AthenaCommandCenterPanel does not use raw repeated capability ids as sibling React keys for synthetic end-to-end packet MVP list rendering"
Assert-NotMatches $athenaPanelSource "key=\{group\.workspaceTarget\}" "AthenaCommandCenterPanel does not use raw workspace ids as sibling React keys for synthetic end-to-end packet MVP list rendering"

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

const packetModule = require(path.join(
  repoRoot,
  "src",
  "lib",
  "codexforge",
  "min-synth-e2e-mvp",
  "min-synth-e2e-mvp-helper.server.ts"
));

const runPacket = packetModule.runMinimalManualGatedSyntheticDryRunEndToEndPacketMvpForStaticFixture;
const buildPacket = packetModule.buildMinimalManualGatedSyntheticDryRunEndToEndPacketMvp;

if (typeof runPacket !== "function") {
  throw new Error("Missing runMinimalManualGatedSyntheticDryRunEndToEndPacketMvpForStaticFixture export.");
}

if (typeof buildPacket !== "function") {
  throw new Error("Missing buildMinimalManualGatedSyntheticDryRunEndToEndPacketMvp export.");
}

const first = runPacket();
const second = runPacket();

if (JSON.stringify(first) !== JSON.stringify(second)) {
  throw new Error("Packet helper output is not deterministic.");
}

process.stdout.write(JSON.stringify({
  endToEndPacketMvpId: first.endToEndPacketMvpId,
  packetState: first.packetState,
  syntheticEndToEndPacketId: first.syntheticEndToEndPacketId,
  syntheticPacketDigest: first.syntheticPacketDigest,
  noFrontendRequestStatement: first.noFrontendRequestStatement,
  noApiRouteStatement: first.noApiRouteStatement,
  persistenceState: first.persistenceState,
  stageSummaryLabel: first.stageSummary.label
}));
'@

$nodeOutput = $nodeScript | node - $root 2>&1
if ($LASTEXITCODE -ne 0) {
  throw "[FAIL] Deterministic synthetic packet helper verification failed.`n$nodeOutput"
}

$nodeJsonLine = (($nodeOutput -split "(\r?\n)") | Where-Object { $_ -match '^\{' }) | Select-Object -Last 1
if (-not $nodeJsonLine) {
  throw "[FAIL] Deterministic synthetic packet helper verification did not return JSON."
}

$nodeResult = $nodeJsonLine | ConvertFrom-Json

if ($nodeResult.endToEndPacketMvpId -ne "conversational-planning-request") {
  throw "[FAIL] Unexpected packet fixture id: $($nodeResult.endToEndPacketMvpId)"
}
Write-Host "[PASS] deterministic synthetic packet fixture id"

if ($nodeResult.packetState -ne "assembled-synthetic-in-memory-only") {
  throw "[FAIL] Unexpected packet state: $($nodeResult.packetState)"
}
Write-Host "[PASS] deterministic synthetic packet state"

if ($nodeResult.syntheticEndToEndPacketId -ne "synthetic-end-to-end-packet-preview:conversational-planning-request") {
  throw "[FAIL] Unexpected synthetic end-to-end packet id: $($nodeResult.syntheticEndToEndPacketId)"
}
Write-Host "[PASS] deterministic synthetic end-to-end packet id"

if ($nodeResult.syntheticPacketDigest -ne "synthetic-end-to-end-packet-digest-preview:conversational-planning-request:in-memory-only") {
  throw "[FAIL] Unexpected synthetic packet digest: $($nodeResult.syntheticPacketDigest)"
}
Write-Host "[PASS] deterministic synthetic packet digest"

if ($nodeResult.noFrontendRequestStatement -ne "no frontend request is created") {
  throw "[FAIL] Unexpected no frontend request statement: $($nodeResult.noFrontendRequestStatement)"
}
Write-Host "[PASS] packet helper reports no frontend request"

if ($nodeResult.noApiRouteStatement -ne "no API route is created") {
  throw "[FAIL] Unexpected no API route statement: $($nodeResult.noApiRouteStatement)"
}
Write-Host "[PASS] packet helper reports no API route"

if ($nodeResult.persistenceState -ne "not implemented") {
  throw "[FAIL] Unexpected packet persistence state: $($nodeResult.persistenceState)"
}
Write-Host "[PASS] packet helper reports not implemented persistence"

if ($nodeResult.stageSummaryLabel -ne "static synthetic placeholder only") {
  throw "[FAIL] Unexpected packet stage summary label: $($nodeResult.stageSummaryLabel)"
}
Write-Host "[PASS] packet helper reports static synthetic stage summary"

Write-Host "[PASS] Backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP smoke completed."
