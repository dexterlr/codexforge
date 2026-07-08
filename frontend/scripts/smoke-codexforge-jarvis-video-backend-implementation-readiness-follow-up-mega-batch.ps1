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

Write-Host "=== CodexForge Jarvis Video Backend Implementation Readiness Follow-Up Mega Batch smoke ==="

$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$modelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-model.ts"
$sectionsPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-sections.ts"
$safetyPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-safety.ts"
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
$homeContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"

$requiredPaths = @(
  $pageClientPath,
  $panelPath,
  $modelPath,
  $sectionsPath,
  $safetyPath,
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

$routeSource = Get-CombinedFileText @(
  $pageClientPath,
  $panelPath,
  $modelPath,
  $sectionsPath,
  $safetyPath,
  $followUpPath
)
$followUpSource = Get-Content -Raw $followUpPath
$panelSource = Get-Content -Raw $panelPath
$homeSource = Get-CombinedFileText @(
  $homePageClientPath,
  $homeShellPath,
  $homeContentPath
)
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$allSmokeSource = Get-Content -Raw $allSmokePath
$navigationSource = Get-CombinedFileText @(
  $navigationTypesPath,
  $navigationRegistryPath,
  $commandRegistryPath
)

foreach ($needle in @(
  "4106-4137 - Jarvis Video Backend Implementation Readiness Follow-Up",
  "Jarvis Video Backend Implementation Readiness Follow-Up",
  "Backend implementation readiness",
  "Review backend readiness",
  "Confirm server-only boundary",
  "Prepare runner contract",
  "Keep generation locked",
  "Provider calls remain blocked",
  "Queue and worker dispatch remain disabled",
  "Result and audit persistence remain unimplemented",
  "Operator approval required"
)) {
  Assert-Contains $routeSource $needle "route source contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Waiting for backend runner",
  "No video generated yet",
  "Generate video - locked",
  "Run backend dry-run - locked",
  "Approve backend handoff - locked",
  "Video Studio URL: /jarvis-video",
  "Safe handoff flow"
)) {
  Assert-Contains $panelSource $needle "video control console contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Open Jarvis Video Studio",
  "What can I do now?",
  "What is still locked?"
)) {
  Assert-Contains $homeSource $needle "home cockpit contains $needle"
}

foreach ($needle in @(
  "server-only module boundary",
  "backend contract inventory",
  "runner admission contract readiness",
  "operator approval readiness",
  "approval packet join readiness",
  "credential isolation readiness",
  "provider adapter shell readiness",
  "queue admission readiness",
  "worker isolation readiness",
  "job lease readiness",
  "result envelope readiness",
  "audit envelope readiness",
  "artifact handoff readiness",
  "egress policy readiness",
  "safety gate readiness",
  "privacy/redaction gate readiness",
  "cost/rate/duration guard readiness",
  "timeout/cancel guard readiness",
  "idempotency key readiness",
  "single-call lock readiness",
  "replay block readiness",
  "retry/fallback policy readiness",
  "rollback readiness",
  "observability trace readiness",
  "acceptance criteria for the next backend-only contract batch"
)) {
  Assert-Contains $followUpSource $needle "follow-up model contains $needle"
}

foreach ($needle in @(
  "server-only boundary required",
  "backend-only execution path required",
  "credential isolation required",
  "no provider import or call",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no artifact persistence",
  "no retry/fallback execution",
  "no fetch/network calls",
  "no provider SDK imports in frontend",
  "disabled by default",
  "hard kill switch"
)) {
  Assert-Contains $followUpSource $needle "follow-up safety contains $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4137",
  "Latest completed batch: 4106-4137 - Jarvis Video Backend Implementation Readiness Follow-Up",
  "Previous completed batch: 4074-4105 - Jarvis Video Backend Execution Implementation Plan",
  "Next likely batch: 4138-4169 - Jarvis Video Backend Runner Contract Hardening"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
}

foreach ($needle in @(
  "Phase 4137 Jarvis Video Backend Implementation Readiness Follow-Up",
  "smoke-codexforge-jarvis-video-backend-implementation-readiness-follow-up-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video generation control"',
  'aria-label="Mission and readiness"',
  'aria-label="Video production timeline"'
) "/jarvis-video places the product console before readiness and timeline sections"

Assert-Ordered $panelSource @(
  'aria-label="Backend implementation readiness"',
  'aria-label="Backend readiness safety and approval state"',
  'aria-label="Backend readiness evidence and contract inputs"',
  'aria-label="Backend execution implementation plan"',
  'aria-label="Implementation safety and approval state"',
  'aria-label="Implementation evidence and acceptance"',
  'aria-label="Developer diagnostics"'
) "/jarvis-video keeps readiness, safety, evidence, and diagnostics ordered"

$jarvisVideoSourceFiles = @(
  Get-ChildItem -Path (Join-Path $root "src\app") -Recurse -File |
    Where-Object {
      $_.Extension -in @(".ts", ".tsx") -and
      $_.FullName -match "jarvis-video"
    }
  Get-ChildItem -Path (Join-Path $root "src\lib\codexforge") -Recurse -File |
    Where-Object {
      $_.Extension -in @(".ts", ".tsx") -and
      $_.FullName -match "jarvis-video"
    }
) | Select-Object -ExpandProperty FullName -Unique

$jarvisVideoSource = Get-CombinedFileText $jarvisVideoSourceFiles
$homeGuardedSource = Get-CombinedFileText @(
  $homePageClientPath,
  $homeShellPath,
  $homeContentPath
)
$inertFrontendPatterns = @(
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
  'writeFile\s*\(',
  'appendFile\s*\(',
  'dispatchWorker\s*\(',
  'queue\.add\s*\(',
  'enqueue\s*\(',
  'upload\s*\(',
  'download\s*\('
)

foreach ($pattern in $inertFrontendPatterns) {
  Assert-NotMatches $jarvisVideoSource $pattern "Jarvis video frontend source stays inert"
  Assert-NotMatches $homeGuardedSource $pattern "home cockpit frontend source stays inert"
}

foreach ($pattern in @(
  ':\s*any\b',
  'as any',
  '<\s*any\s*>',
  'Array<any>',
  '@ts-nocheck',
  '@ts-expect-error'
)) {
  Assert-NotMatches $routeSource $pattern "touched route source avoids unsafe TypeScript escapes"
  Assert-NotMatches $homeGuardedSource $pattern "touched home source avoids unsafe TypeScript escapes"
}

foreach ($pattern in @(
  'commandDeckRole\s*:\s*string',
  'href\s*:\s*string'
)) {
  Assert-NotMatches $navigationSource $pattern "navigation contracts stay narrow"
}

Write-Host "[OK] CodexForge Jarvis Video Backend Implementation Readiness Follow-Up Mega Batch smoke passed."
