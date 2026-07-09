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

Write-Host "=== CodexForge Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run Mega Batch smoke ==="

$pagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$previewTypePath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-server-only-runner-synthetic-dry-run-preview.ts"
$serverIndexPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\index.ts"
$serverSkeletonPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-server-only-runner-synthetic-dry-run.ts"
$foundationPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-backend-runner-foundation-dry-run-admission.ts"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointSmokePath = Join-Path $root "scripts\smoke-codexforge-checkpoint-docs.ps1"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$navigationRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$homeContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"

$requiredPaths = @(
  $pagePath,
  $pageClientPath,
  $panelPath,
  $previewTypePath,
  $serverIndexPath,
  $serverSkeletonPath,
  $foundationPath,
  $checkpointPath,
  $runbookPath,
  $allSmokePath,
  $checkpointSmokePath,
  $navigationTypesPath,
  $navigationRegistryPath,
  $commandRegistryPath,
  $homePageClientPath,
  $homeShellPath,
  $homeContentPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$routeSource = Get-CombinedFileText @($pagePath, $pageClientPath, $panelPath)
$serverSource = Get-CombinedFileText @(
  $previewTypePath,
  $serverIndexPath,
  $serverSkeletonPath
)
$panelSource = Get-Content -Raw $panelPath
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointSmokeSource = Get-Content -Raw $checkpointSmokePath
$homeSource = Get-CombinedFileText @(
  $homePageClientPath,
  $homeShellPath,
  $homeContentPath
)
$navigationSource = Get-CombinedFileText @(
  $navigationTypesPath,
  $navigationRegistryPath,
  $commandRegistryPath
)

Assert-Contains $serverSource 'import "server-only";' "server-only boundary marker exists"

foreach ($needle in @(
  "4202-4233 - Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run",
  "Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run",
  "4233",
  "server-only runner skeleton only",
  "synthetic dry run only",
  "static result envelope only"
)) {
  Assert-Contains $routeSource $needle "route source contains $needle"
  Assert-Contains $serverSource $needle "server source contains $needle"
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
  "Server-only synthetic dry run"
)) {
  Assert-Contains $panelSource $needle "video studio panel contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video generation control"',
  'aria-label="Server-only synthetic dry run"',
  'aria-label="Backend dry-run admission"',
  'aria-label="Backend runner contract"',
  'aria-label="Mission and readiness"'
) "/jarvis-video keeps the console first and inserts server-only synthetic dry run before deeper diagnostics"

foreach ($needle in @(
  "server-only runner skeleton version",
  "synthetic dry-run request envelope",
  "normalized synthetic dry-run request",
  "synthetic dry-run result preview",
  "static synthetic result envelope",
  "static synthetic error envelope",
  "static synthetic artifact placeholder",
  "static synthetic audit placeholder",
  "static synthetic approval join placeholder",
  "static synthetic trace placeholder",
  "provider adapter reference only",
  "no provider import/call",
  "provider execution remains locked",
  "queue/worker/job dispatch remain disabled",
  "result/audit/approval persistence remain unimplemented",
  "artifact handoff remains placeholder only",
  "retry/fallback execution remains disabled",
  "next result capture/audit/approval join acceptance checklist"
)) {
  Assert-Contains $serverSource $needle "server-only model contains $needle"
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
  "4138-4169",
  "4170-4201"
)) {
  Assert-Contains $serverSource $needle "server-only evidence contains $needle"
}

foreach ($needle in @(
  "buildJarvisVideoServerOnlyRunnerSyntheticDryRunStableKey",
  "normalizeJarvisVideoServerOnlyRunnerSyntheticDryRunInputEnvelope",
  "evaluateJarvisVideoServerOnlyRunnerSyntheticDryRunGuardCompleteness",
  "buildJarvisVideoServerOnlyRunnerSyntheticDryRunResultPreview",
  "buildJarvisVideoServerOnlyRunnerSyntheticDryRunBlockedExecutionSummary",
  "buildJarvisVideoServerOnlyRunnerSyntheticDryRunAuditPlaceholder",
  "buildJarvisVideoServerOnlyRunnerSyntheticDryRunApprovalJoinPlaceholder",
  "buildJarvisVideoServerOnlyRunnerSyntheticDryRunArtifactPlaceholder",
  "buildJarvisVideoServerOnlyRunnerSyntheticDryRunTracePlaceholder",
  "listJarvisVideoServerOnlyRunnerSyntheticDryRunDisabledExecutionSurfaces",
  "listJarvisVideoServerOnlyRunnerSyntheticDryRunNextBatchCaptureRequirements",
  "buildStaticJarvisVideoServerOnlyRunnerSyntheticDryRunPreview"
)) {
  Assert-Contains $serverSource $needle "pure helper exists: $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4233",
  "Latest completed batch: 4202-4233 - Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run",
  "Previous completed batch: 4170-4201 - Jarvis Video Backend Runner Foundation Dry-Run Admission",
  "Next likely batch: 4234-4265 - Jarvis Video Result Capture Audit Envelope and Approval Join"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
  Assert-Contains $checkpointSmokeSource $needle "checkpoint docs smoke expects $needle"
}

foreach ($needle in @(
  "Phase 4233 Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run",
  "smoke-codexforge-jarvis-video-server-only-runner-skeleton-synthetic-dry-run-mega-batch.ps1"
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
  'new\s+Date\s*\(',
  'writeFile\s*\(',
  'appendFile\s*\(',
  'child_process',
  'spawn\s*\(',
  'exec\s*\(',
  'execFile\s*\('
)) {
  Assert-NotMatches $serverSource $pattern "server-only helpers stay deterministic and inert"
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
  Assert-NotMatches $serverSource $pattern "server source avoids unsafe TypeScript escapes"
}

foreach ($pattern in @(
  '\bcommandDeckRole\s*:\s*string',
  '\bhref\s*:\s*string',
  '\bhref\?\s*:\s*string'
)) {
  Assert-NotMatches $navigationSource $pattern "navigation typing stays strict"
}

Write-Host "[OK] CodexForge Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run Mega Batch smoke passed."
