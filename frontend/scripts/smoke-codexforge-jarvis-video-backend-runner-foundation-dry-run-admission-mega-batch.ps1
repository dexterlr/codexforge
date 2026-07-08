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

function Assert-Ordered {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string[]]$Needles,
    [string]$Name
  )
  $lastIndex = -1
  foreach ($needle in $Needles) {
    $index = $Haystack.IndexOf($needle, [StringComparison]::OrdinalIgnoreCase)
    if ($index -lt 0) {
      throw "[FAIL] Missing ordered marker for $Name`: $needle"
    }
    if ($index -lt $lastIndex) {
      throw "[FAIL] Unexpected order for $Name at marker $needle"
    }
    $lastIndex = $index
  }
  Write-Host "[PASS] $Name"
}

function Get-CombinedFileText {
  param([string[]]$Paths)
  return ($Paths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
}

Write-Host "=== CodexForge Jarvis Video Backend Runner Foundation Dry-Run Admission Mega Batch smoke ==="

$pagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$sharedPreviewPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-backend-runner-foundation-dry-run-admission-preview.ts"
$serverIndexPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\index.ts"
$foundationPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-backend-runner-foundation-dry-run-admission.ts"
$hardeningPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-backend-runner-contract-hardening.ts"
$followUpPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-backend-implementation-readiness-follow-up.ts"
$planPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-backend-execution-implementation-plan.ts"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$navigationRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$homeContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-workspaces.ts"

$requiredPaths = @(
  $pagePath,
  $pageClientPath,
  $panelPath,
  $sharedPreviewPath,
  $serverIndexPath,
  $foundationPath,
  $hardeningPath,
  $followUpPath,
  $planPath,
  $homePageClientPath,
  $homeShellPath,
  $homeContentPath,
  $checkpointPath,
  $runbookPath,
  $allSmokePath,
  $navigationTypesPath,
  $navigationRegistryPath,
  $commandRegistryPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$routeSource = Get-CombinedFileText @($pagePath, $pageClientPath, $panelPath)
$foundationSource = Get-CombinedFileText @($foundationPath, $sharedPreviewPath, $serverIndexPath)
$panelSource = Get-Content -Raw $panelPath
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$allSmokeSource = Get-Content -Raw $allSmokePath
$homeSource = Get-CombinedFileText @($homePageClientPath, $homeShellPath, $homeContentPath)
$navigationSource = Get-CombinedFileText @(
  $navigationTypesPath,
  $navigationRegistryPath,
  $commandRegistryPath
)

Assert-Contains $foundationSource 'import "server-only";' "server-only boundary marker exists"

foreach ($needle in @(
  "4170-4201 - Jarvis Video Backend Runner Foundation Dry-Run Admission",
  "Jarvis Video Backend Runner Foundation Dry-Run Admission",
  "backend dry-run admission foundation only",
  "synthetic dry-run admission only",
  "Backend dry-run admission"
)) {
  Assert-Contains $routeSource $needle "route source contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Video brief",
  "Prompt / concept",
  "Output preview",
  "Waiting for backend runner",
  "No video generated yet",
  "Generate video - locked",
  "Run backend dry-run - locked",
  "Approve backend handoff - locked",
  "Video Studio URL: /jarvis-video",
  "Backend dry-run admission"
)) {
  Assert-Contains $panelSource $needle "video studio panel contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video generation control"',
  'aria-label="Backend dry-run admission"',
  'aria-label="Backend runner contract"',
  'aria-label="Mission and readiness"'
) "/jarvis-video keeps the console first, inserts backend dry-run admission next, and leaves deeper sections below"

foreach ($needle in @(
  "dry-run admission version",
  "runner contract version reference",
  "admission input envelope",
  "admission decision envelope",
  "admission rejection envelope",
  "operator approval reference",
  "approval packet digest reference",
  "video prompt/brief reference",
  "settings reference",
  "safety notes reference",
  "credential isolation reference",
  "opaque token labels only",
  "no secrets",
  "provider adapter reference only",
  "no provider import/call",
  "queue admission reference only",
  "no queue dispatch",
  "worker isolation reference only",
  "no worker dispatch",
  "job lease reference only",
  "no job execution",
  "idempotency key requirement",
  "single-call lock requirement",
  "replay block requirement",
  "kill switch requirement",
  "timeout/cancel guard requirement",
  "cost/rate/duration/resolution guard requirement",
  "network egress policy requirement",
  "safety gate requirement",
  "privacy/redaction gate requirement",
  "result capture placeholder",
  "audit join placeholder",
  "artifact handoff placeholder",
  "no render/export/download",
  "retry/fallback policy placeholder",
  "no retry/fallback execution",
  "observability trace placeholder",
  "no live logging implementation",
  "acceptance criteria for the next server-only runner skeleton batch"
)) {
  Assert-Contains $foundationSource $needle "foundation model contains $needle"
}

foreach ($needle in @(
  "3434-3465",
  "3466-3497",
  "3498-3529",
  "3530-3561",
  "3754-3785",
  "3786-3817",
  "3818-3849",
  "3882-3913",
  "3946-3977",
  "3978-4009",
  "4010-4041",
  "4042-4073",
  "4074-4105",
  "4106-4137",
  "4138-4169"
)) {
  Assert-Contains $foundationSource $needle "foundation evidence contains $needle"
}

foreach ($needle in @(
  "buildJarvisVideoBackendRunnerFoundationDryRunAdmissionStableKey",
  "listJarvisVideoBackendRunnerFoundationDryRunAdmissionRequiredGateIds",
  "listJarvisVideoBackendRunnerFoundationDryRunAdmissionBlockers",
  "buildStaticJarvisVideoBackendRunnerFoundationDryRunAdmissionPreview",
  "evaluateJarvisVideoBackendRunnerFoundationDryRunAdmissionCompleteness",
  "decideJarvisVideoBackendRunnerFoundationDryRunAdmission"
)) {
  Assert-Contains $foundationSource $needle "pure helper exists: $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4201",
  "Latest completed batch: 4170-4201 - Jarvis Video Backend Runner Foundation Dry-Run Admission",
  "Previous completed batch: 4138-4169 - Jarvis Video Backend Runner Contract Hardening",
  "Next likely batch: 4202-4233 - Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
}

foreach ($needle in @(
  "Phase 4201 Jarvis Video Backend Runner Foundation Dry-Run Admission",
  "smoke-codexforge-jarvis-video-backend-runner-foundation-dry-run-admission-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Open Jarvis Video Studio"
)) {
  Assert-Contains $homeSource $needle "home contains $needle"
}

foreach ($pattern in @(
  '\bfetch\s*\(',
  'XMLHttpRequest',
  'EventSource',
  'WebSocket',
  'navigator\.sendBeacon',
  'from\s+[''""]openai[''""]',
  'from\s+[''""]@anthropic',
  'from\s+[''""]@google',
  'from\s+[''""]@aws-sdk',
  'from\s+[''""]replicate[''""]',
  'new\s+OpenAI\s*\(',
  'localStorage\s*[\.\[]',
  'sessionStorage\s*[\.\[]',
  'indexedDB\s*[\.\[]',
  'document\.cookie',
  'child_process',
  'spawn\s*\(',
  'exec\s*\(',
  'execFile\s*\(',
  'upload\s*\(',
  'download\s*\('
)) {
  Assert-NotMatches $routeSource $pattern "frontend route source stays inert"
  Assert-NotMatches $homeSource $pattern "home source stays inert"
}

foreach ($pattern in @(
  'Date\.now\s*\(',
  'Math\.random\s*\(',
  '\bcrypto\b',
  'process\.env',
  '\bfetch\s*\(',
  'new\s+Date\s*\('
)) {
  Assert-NotMatches $foundationSource $pattern "foundation helpers stay deterministic and inert"
}

foreach ($pattern in @(
  ':\s*any\b',
  'as any',
  '<\s*any\s*>',
  'Array<any>',
  '@ts-nocheck',
  '@ts-expect-error'
)) {
  Assert-NotMatches $routeSource $pattern "route source avoids unsafe TypeScript escapes"
  Assert-NotMatches $foundationSource $pattern "foundation source avoids unsafe TypeScript escapes"
}

foreach ($pattern in @(
  '\bcommandDeckRole\s*:\s*string',
  '\bhref\s*:\s*string',
  '\bhref\?\s*:\s*string'
)) {
  Assert-NotMatches $navigationSource $pattern "navigation typing stays strict"
}

Write-Host "[OK] CodexForge Jarvis Video Backend Runner Foundation Dry-Run Admission Mega Batch smoke passed."
