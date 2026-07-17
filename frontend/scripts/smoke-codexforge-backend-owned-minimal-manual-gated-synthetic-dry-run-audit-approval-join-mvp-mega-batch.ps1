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

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join MVP Mega Batch smoke ==="

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
$joinModuleTypesPath = Join-Path $root "src\lib\codexforge\min-synth-audit-join\min-synth-audit-join-types.ts"
$joinModuleCatalogPath = Join-Path $root "src\lib\codexforge\min-synth-audit-join\min-synth-audit-join-catalog.ts"
$joinModuleIndexPath = Join-Path $root "src\lib\codexforge\min-synth-audit-join\index.ts"
$joinModuleHelperPath = Join-Path $root "src\lib\codexforge\min-synth-audit-join\min-synth-audit-join-helper.server.ts"
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
  $joinModuleTypesPath,
  $joinModuleCatalogPath,
  $joinModuleIndexPath,
  $joinModuleHelperPath,
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
  $joinModuleTypesPath,
  $joinModuleCatalogPath,
  $joinModuleIndexPath
)
$serverHelperSource = Get-Content -Raw $joinModuleHelperPath
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
  "5514-5545 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join MVP",
  "5545",
  "Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join MVP"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $serverHelperNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal synthetic result capture review",
  "Synthetic result capture acceptance posture",
  "Backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP",
  "Synthetic audit and approval join input",
  "Synthetic audit join output",
  "Synthetic approval join output",
  "Synthetic audit and approval join envelope",
  "Synthetic audit and approval join gates",
  "Synthetic audit and approval join readiness matrix",
  "Synthetic audit and approval join evidence preview",
  "Athena can preview the backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP",
  "minimal synthetic audit and approval join MVP is backend-only",
  "synthetic audit and approval join is produced in memory only",
  "server-only synthetic audit and approval join helper exists",
  "deterministic synthetic audit and approval join only",
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
  "audit and approval join review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview the backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP",
  "minimal synthetic audit and approval join MVP is backend-only",
  "synthetic audit and approval join is produced in memory only",
  "no frontend request is created",
  "no API route is created",
  "audit and approval join review and recovery preview comes next"
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
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-mvp-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-input-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-join-output-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-approval-join-output-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-envelope-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-gate-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-readiness-matrix-v1",
  "Synthetic audit and approval join input",
  "Synthetic audit join output",
  "Synthetic approval join output",
  "Synthetic audit and approval join envelope",
  "Synthetic audit and approval join gates",
  "Synthetic audit and approval join readiness matrix",
  "Synthetic audit and approval join evidence preview",
  "deterministic synthetic audit and approval join only",
  "synthetic audit and approval join is produced in memory only",
  "server-only synthetic audit and approval join helper exists",
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

Assert-Contains $serverHelperNormalized "joinMinimalManualGatedSyntheticDryRunAuditAndApprovalMvp" "server-only audit and approval join helper marker exists"
Assert-Contains $serverHelperNormalized "deterministic synthetic audit and approval join only" "deterministic synthetic audit and approval join marker exists"
Assert-Contains $serverHelperNormalized "synthetic audit and approval join is produced in memory only" "in-memory only join marker exists"

Assert-Contains $allSmokeNormalized "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-mvp-mega-batch.ps1" "all-smoke references new audit and approval join MVP smoke"
Assert-Contains $checkpointNormalized "Highest detected phase: 5545" "checkpoint current doc reports Highest detected phase: 5545"
Assert-Contains $checkpointNormalized "Latest completed batch: 5514-5545 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join MVP" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointNormalized "Next likely batch: 5546-5577 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview" "checkpoint current doc reports next likely batch"

Assert-NotMatches $frontEndSource 'from\s+["''][^"'']*(openai|anthropic|replicate|fal-ai|elevenlabs|stability|together|groq)[^"'']*["'']' "provider SDK imports in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\bfetch\s*\(' "fetch/network calls in frontend Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\blocalStorage\.|\bsessionStorage\.|\bindexedDB\b\s*[\.\(]|\bIndexedDB\b\s*[\.\(]' "browser storage usage in Athena/Jarvis files"
Assert-NotMatches $frontEndSource '\bdocument\.cookie\b|\bcookieStore\.' "cookie usage in Athena/Jarvis files"
Assert-NotMatches $frontEndSource 'child_process|exec\s*\(|spawn\s*\(|powershell|cmd\.exe|process\.execPath' "command/process/shell execution from app code"
Assert-NotMatches $navigationTypesSource 'type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "route href loosening to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole\s*:\s*string\b' "commandDeckRole loosening to string"
Assert-Contains $athenaPanelSource 'buildScopedItemKey(' "AthenaCommandCenterPanel uses scoped key helper"
Assert-Contains $athenaPanelSource '"synthetic-audit-approval-join-mvp-capability"' "AthenaCommandCenterPanel scopes synthetic audit approval join MVP capability keys"
Assert-Contains $athenaPanelSource '"synthetic-audit-approval-join-mvp-workspace"' "AthenaCommandCenterPanel scopes synthetic audit approval join MVP workspace keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.capabilityFamilyId\}' "AthenaCommandCenterPanel avoids raw capability ids as sibling keys"
Assert-NotMatches $athenaPanelSource 'key=\{group\.workspaceTarget\}' "AthenaCommandCenterPanel avoids raw workspace ids as sibling keys"

$nodeScript = @'
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ts = require("typescript");

const helperPath = process.argv[process.argv.length - 1];
const moduleCache = new Map();

function resolveTsModule(specifier, fromFile) {
  if (specifier === "server-only") {
    return "__server_only__";
  }

  if (!specifier.startsWith(".") && !specifier.startsWith("/")) {
    throw new Error("Unexpected runtime import: " + specifier + " from " + fromFile);
  }

  const targetPath = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    targetPath,
    targetPath + ".ts",
    targetPath + ".tsx",
    targetPath + ".js",
    targetPath + ".jsx",
    path.join(targetPath, "index.ts"),
    path.join(targetPath, "index.tsx"),
    path.join(targetPath, "index.js"),
    path.join(targetPath, "index.jsx")
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  throw new Error("Unable to resolve " + specifier + " from " + fromFile);
}

function loadTsModule(filePath) {
  if (filePath === "__server_only__") {
    return {};
  }

  if (moduleCache.has(filePath)) {
    return moduleCache.get(filePath).exports;
  }

  const source = fs.readFileSync(filePath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
      jsx: ts.JsxEmit.ReactJSX
    },
    fileName: filePath
  }).outputText;

  const sandboxModule = { exports: {} };
  moduleCache.set(filePath, sandboxModule);

  const sandbox = {
    module: sandboxModule,
    exports: sandboxModule.exports,
    require: (specifier) => loadTsModule(resolveTsModule(specifier, filePath)),
    __filename: filePath,
    __dirname: path.dirname(filePath),
    console,
    process,
    Buffer,
    setTimeout,
    clearTimeout
  };

  vm.runInNewContext(compiled, sandbox, { filename: filePath });
  return sandboxModule.exports;
}

const helperModule = loadTsModule(helperPath);
const joinMinimalManualGatedSyntheticDryRunAuditAndApprovalMvp =
  helperModule.joinMinimalManualGatedSyntheticDryRunAuditAndApprovalMvp;
const runMinimalManualGatedSyntheticAuditApprovalJoinMvpForStaticFixture =
  helperModule.runMinimalManualGatedSyntheticAuditApprovalJoinMvpForStaticFixture;

if (typeof joinMinimalManualGatedSyntheticDryRunAuditAndApprovalMvp !== "function") {
  throw new Error("Missing joinMinimalManualGatedSyntheticDryRunAuditAndApprovalMvp export");
}
if (typeof runMinimalManualGatedSyntheticAuditApprovalJoinMvpForStaticFixture !== "function") {
  throw new Error("Missing runMinimalManualGatedSyntheticAuditApprovalJoinMvpForStaticFixture export");
}

const first = JSON.stringify(
  runMinimalManualGatedSyntheticAuditApprovalJoinMvpForStaticFixture()
);
const second = JSON.stringify(
  runMinimalManualGatedSyntheticAuditApprovalJoinMvpForStaticFixture()
);

if (first !== second) {
  throw new Error("Deterministic synthetic audit and approval join check failed");
}

const parsed = JSON.parse(first);
if (parsed.auditApprovalJoinMvpId !== "conversational-planning-request") {
  throw new Error("Unexpected auditApprovalJoinMvpId: " + parsed.auditApprovalJoinMvpId);
}
if (parsed.joinState !== "joined-synthetic-in-memory-only") {
  throw new Error("Unexpected joinState: " + parsed.joinState);
}
if (parsed.syntheticAuditJoinId !== "synthetic-audit-join-preview:conversational-planning-request") {
  throw new Error("Unexpected syntheticAuditJoinId: " + parsed.syntheticAuditJoinId);
}
if (parsed.syntheticApprovalJoinId !== "synthetic-approval-join-preview:conversational-planning-request") {
  throw new Error("Unexpected syntheticApprovalJoinId: " + parsed.syntheticApprovalJoinId);
}
if (parsed.syntheticJoinDigest !== "synthetic-audit-approval-join-digest-preview:conversational-planning-request:in-memory-only") {
  throw new Error("Unexpected syntheticJoinDigest: " + parsed.syntheticJoinDigest);
}
if (parsed.inMemoryOnlyJoinStatement !== "synthetic audit and approval join is produced in memory only") {
  throw new Error("Unexpected in-memory join statement");
}
if (parsed.deterministicSyntheticJoinStatement !== "deterministic synthetic audit and approval join only") {
  throw new Error("Unexpected deterministic join statement");
}
if (parsed.persistenceState !== "not implemented") {
  throw new Error("Unexpected persistence state: " + parsed.persistenceState);
}

console.log(first);
'@

$runnerJson = $nodeScript | & node - $joinModuleHelperPath
$runnerNormalized = Normalize-Whitespace $runnerJson
Assert-Contains $runnerNormalized '"auditApprovalJoinMvpId":"conversational-planning-request"' "server-only helper executes deterministic join fixture"
Assert-Contains $runnerNormalized '"joinState":"joined-synthetic-in-memory-only"' "server-only helper returns joined in-memory-only state"
Assert-Contains $runnerNormalized '"syntheticAuditJoinId":"synthetic-audit-join-preview:conversational-planning-request"' "server-only helper returns deterministic audit join id"
Assert-Contains $runnerNormalized '"syntheticApprovalJoinId":"synthetic-approval-join-preview:conversational-planning-request"' "server-only helper returns deterministic approval join id"
Assert-Contains $runnerNormalized '"syntheticJoinDigest":"synthetic-audit-approval-join-digest-preview:conversational-planning-request:in-memory-only"' "server-only helper returns deterministic join digest"
Assert-Contains $runnerNormalized '"inMemoryOnlyJoinStatement":"synthetic audit and approval join is produced in memory only"' "server-only helper returns in-memory-only join marker"
Assert-Contains $runnerNormalized '"deterministicSyntheticJoinStatement":"deterministic synthetic audit and approval join only"' "server-only helper returns deterministic join marker"
Assert-Contains $runnerNormalized '"persistenceState":"not implemented"' "server-only helper returns not-implemented persistence state"

Write-Host "[PASS] Backend-owned minimal manual-gated synthetic dry-run audit and approval join MVP smoke passed"
