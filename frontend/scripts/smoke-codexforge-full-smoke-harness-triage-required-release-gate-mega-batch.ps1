param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$repoRoot = Resolve-Path (Join-Path $root "..")
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

function Assert-NotContains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -ge 0) {
    throw "[FAIL] Unexpected $Name`: $Needle"
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
  param([System.IO.FileInfo[]]$Files)
  return ($Files | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
}

Write-Host "=== CodexForge Full Smoke Harness Triage and Required Release Gate Mega Batch smoke ==="

$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$archiveDocPath = Join-Path $root "docs\codexforge-smoke-historical-archive.md"
$archiveInventoryPath = Join-Path $root "scripts\smoke-codexforge-historical-archive-inventory.ps1"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$jarvisUnifiedModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-model.ts"
$jarvisVideoModelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-model.ts"

foreach ($path in @(
  $allSmokePath,
  $archiveDocPath,
  $archiveInventoryPath,
  $checkpointPath,
  $runbookPath,
  $navigationTypesPath,
  $athenaModelPath,
  $jarvisUnifiedModelPath,
  $jarvisVideoModelPath
)) {
  Assert-FileExists $path
}

$allSmokeSource = Get-Content -Raw $allSmokePath
$archiveDocSource = Get-Content -Raw $archiveDocPath
$archiveInventorySource = Get-Content -Raw $archiveInventoryPath
$checkpointSource = Get-Content -Raw $checkpointPath
$runbookSource = Get-Content -Raw $runbookPath
$docsSource = $checkpointSource + "`n" + $runbookSource
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$routeTypeSource = (Get-Content -Raw $athenaModelPath) + "`n" + (Get-Content -Raw $jarvisUnifiedModelPath) + "`n" + (Get-Content -Raw $jarvisVideoModelPath)

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\main-pages-god-tier-ux"),
  (Join-Path $root "src\lib\codexforge\operator-home"),
  (Join-Path $root "src\lib\codexforge\navigation-shell"),
  (Join-Path $root "src\lib\codexforge\command-palette")
)
$frontEndSource = Get-CombinedFileText $frontEndSourceFiles

foreach ($needle in @(
  "4778-4809 - Model Adapter Dry-Run Result Review and Recovery",
  "Phase 4809 Model Adapter Dry-Run Result Review and Recovery",
  "smoke-codexforge-model-adapter-dry-run-result-review-recovery-mega-batch.ps1",
  "4746-4777 - Manual Gated Model Adapter Dry-Run Harness",
  "Phase 4777 Manual Gated Model Adapter Dry-Run Harness",
  "smoke-codexforge-manual-gated-model-adapter-dry-run-harness-mega-batch.ps1",
  "4714-4745 - Server-Only Model Adapter Contracts",
  "Phase 4745 Server-Only Model Adapter Contracts",
  "smoke-codexforge-server-only-model-adapter-contracts-mega-batch.ps1",
  "4682-4713 - AI Model Provider Registry and Capability Matrix",
  "Phase 4713 AI Model Provider Registry and Capability Matrix",
  "smoke-codexforge-ai-model-provider-registry-capability-matrix-mega-batch.ps1",
  "4650-4681 - CodexForge Full Smoke Harness Triage and Required Release Gate",
  "Phase 4681 CodexForge Full Smoke Harness Triage and Required Release Gate",
  "current required release gate",
  "Historical archived smokes are preserved as evidence and are not run by default.",
  "Phase 4649 Athena Conversational Command Composer and Approval Drafts",
  "smoke-codexforge-athena-conversational-command-composer-approval-drafts-mega-batch.ps1",
  "Phase 4617 Athena Product UX Polish and Operator Home Takeover",
  "smoke-codexforge-athena-product-ux-polish-operator-home-takeover-mega-batch.ps1",
  "Phase 4585 Athena Cross-Workspace Run Timeline and Audit Memory",
  "smoke-codexforge-athena-cross-workspace-run-timeline-audit-memory-mega-batch.ps1",
  "Phase 4553 Athena Approval-Gated Tool Execution Bridge",
  "smoke-codexforge-athena-approval-gated-tool-execution-bridge-mega-batch.ps1",
  "Phase 4521 Athena Plugin Registry and Command Router",
  "smoke-codexforge-athena-plugin-registry-command-router-mega-batch.ps1",
  "Phase 4489 Athena Unified Chat Control Plane Foundation",
  "smoke-codexforge-athena-unified-chat-control-plane-foundation-mega-batch.ps1",
  "Phase 4457 Jarvis Video Manual Provider Trial Execution Enablement",
  "smoke-codexforge-jarvis-video-manual-provider-trial-execution-enablement-mega-batch.ps1",
  "Phase 4425 Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "smoke-codexforge-jarvis-video-first-manual-provider-trial-result-capture-ux-review-mega-batch.ps1",
  "Phase 4393 Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
  "smoke-codexforge-jarvis-video-first-real-provider-adapter-wiring-manual-gated-trial-mega-batch.ps1",
  "Phase 4361 Jarvis Video First Provider Trial Result Review and Recovery",
  "smoke-codexforge-jarvis-video-first-provider-trial-result-review-recovery-mega-batch.ps1",
  "smoke-codexforge-jarvis-product-experience-god-tier-ux-mega-batch.ps1",
  "smoke-codexforge-jarvis-unified-product-ia-god-tier-ux-mega-batch.ps1",
  "smoke-codexforge-checkpoint-docs.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

Assert-NotMatches $allSmokeSource 'File\s*=\s*"smoke-codexforge-historical-archive-inventory\.ps1"' "all-smoke does not register the archive inventory as a default smoke step"
Assert-NotMatches $allSmokeSource '&\s*\(Join-Path\s+\$scriptRoot\s+"smoke-codexforge-historical-archive-inventory\.ps1"\)' "all-smoke does not invoke the archive inventory by default"

foreach ($needle in @(
  "historical phase smokes are preserved as evidence",
  "historical phase smokes are non-gating by default",
  'current release gate is `scripts/smoke-codexforge-all.ps1`',
  "do not prove those old phases are currently product-valid",
  "does not claim archived historical smokes pass"
)) {
  Assert-Contains ($archiveDocSource + "`n" + $archiveInventorySource) $needle "archive documentation contains $needle"
}

Assert-NotContains $archiveDocSource "archived historical smokes passed" "archive doc does not claim archived historical smokes passed"

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4809. Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery. Previous completed batch: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness.",
  "Highest detected phase: 4809. Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery. Previous completed batch: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness. Next likely batch: 4810-4841 - Athena Model Routing and Provider Selection Preview.",
  "Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery",
  "Previous completed batch: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness",
  "Next likely batch: 4810-4841 - Athena Model Routing and Provider Selection Preview",
  "current required release gate only",
  "historical phase smokes are preserved as archive evidence",
  "historical phase smokes are non-gating by default",
  "no historical pass claim",
  "model adapter dry-run result review and recovery only",
  "dry-run result review is fixture-only",
  "quality review is static preview only",
  "safety review is static preview only",
  "redaction review is static preview only",
  "recovery is manual review only",
  "dry-run acceptance matrix is preview-only",
  "manual gated model adapter dry-run harness only",
  "dry-run harness is fixture-only",
  "dry-run packets are preview-only",
  "fixture results are static preview only",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no autonomous execution",
  "no plugin execution",
  "no provider execution",
  "no live video generation",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no persistent memory",
  "no browser storage",
  "no database writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval required",
  "manual confirmation required",
  "kill switch required",
  "audit required",
  "opaque credential references only",
  "no plaintext secrets",
  "Athena model routing and provider selection preview next"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs or runbook contain $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "navigation route href type stays Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole union type still exists"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses CodexForgeCommandDeckRole"
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "navigation route href type is not loosened to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole\s*:\s*string\b' "commandDeckRole is not loosened to string"
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeCommandDeckRole\s*=\s*string\b' "commandDeckRole union type is not loosened to string"

foreach ($pattern in @(
  'export\s+type\s+AthenaCommandRouteHref\s*=\s*string\b',
  'export\s+type\s+AthenaPluginRouteHref\s*=\s*string\b',
  'export\s+type\s+JarvisUnifiedProductIaRouteHref\s*=\s*string\b',
  'export\s+type\s+JarvisVideoStudioReleaseCandidateRouteHref\s*=\s*string\b'
)) {
  Assert-NotMatches $routeTypeSource $pattern "current route href unions stay typed"
}

foreach ($pattern in @(
  'from\s+[''"]openai[''"]',
  'from\s+[''"]@anthropic',
  'from\s+[''"]@google',
  'from\s+[''"]@aws-sdk',
  'from\s+[''"]replicate[''"]',
  'new\s+OpenAI\s*\(',
  '\bfetch\s*\(',
  'XMLHttpRequest',
  'WebSocket',
  'EventSource',
  'navigator\.sendBeacon',
  'localStorage\s*[\.\[]',
  'sessionStorage\s*[\.\[]',
  'indexedDB\s*[\.\[]',
  'document\.cookie',
  'cookie\s*=',
  'child_process',
  'spawn\s*\(',
  'exec\s*\(',
  'execFile\s*\(',
  'Start-Process',
  'runCommand\s*\('
)) {
  Assert-NotMatches $frontEndSource $pattern "Athena/Jarvis/frontend source avoids $pattern"
}

Write-Host "[PASS] CodexForge Full Smoke Harness Triage and Required Release Gate Mega Batch smoke passed."
