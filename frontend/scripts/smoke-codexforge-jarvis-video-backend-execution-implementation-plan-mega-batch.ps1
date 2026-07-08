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

Write-Host "=== CodexForge Jarvis Video Backend Execution Implementation Plan Mega Batch smoke ==="

$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$modelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-model.ts"
$sectionsPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-sections.ts"
$gatesPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-gates.ts"
$safetyPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-safety.ts"
$planPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-backend-execution-implementation-plan.ts"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$navigationRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"

$requiredPaths = @(
  $pageClientPath,
  $panelPath,
  $modelPath,
  $sectionsPath,
  $gatesPath,
  $safetyPath,
  $planPath,
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
  $gatesPath,
  $safetyPath,
  $planPath
)
$planSource = Get-Content -Raw $planPath
$panelSource = Get-Content -Raw $panelPath
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$allSmokeSource = Get-Content -Raw $allSmokePath
$navigationSource = Get-CombinedFileText @(
  $navigationTypesPath,
  $navigationRegistryPath,
  $commandRegistryPath
)

foreach ($needle in @(
  "4074-4105 - Jarvis Video Backend Execution Implementation Plan",
  "Jarvis Video Backend Execution Implementation Plan",
  "Backend execution implementation plan",
  "Plan backend execution",
  "Review server-only path",
  "Confirm approval gates",
  "Prepare credential isolation",
  "Generation locked",
  "Backend-owned execution required",
  "Operator approval required",
  "No provider call from frontend",
  "This batch is a plan only",
  "No queue/worker/provider/persistence exists yet",
  "next backend implementation must be server-only"
)) {
  Assert-Contains $routeSource $needle "route source contains $needle"
}

foreach ($needle in @(
  "server-only execution boundary",
  "execution disabled by default",
  "hard kill switch",
  "credential isolation plan",
  "operator approval gate",
  "approval packet join plan",
  "queue/job/worker plan",
  "provider adapter implementation plan",
  "network egress policy plan",
  "result capture plan",
  "audit/result persistence plan",
  "artifact handoff plan",
  "timeout/cost/rate guard plan",
  "idempotency key plan",
  "single-call lock plan",
  "replay block plan",
  "retry/fallback review plan",
  "redaction/privacy/safety review plan",
  "rollout checklist",
  "rollback checklist",
  "observability/trace plan",
  "acceptance checklist for future implementation batch"
)) {
  Assert-Contains $planSource $needle "implementation plan model contains $needle"
}

foreach ($needle in @(
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no provider execution",
  "no result persistence",
  "no audit persistence",
  "disabled by default",
  "hard kill switch",
  "backend-only execution path required",
  "operator approval required",
  "credential isolation required"
)) {
  Assert-Contains $planSource $needle "implementation plan safety contains $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4105",
  "Latest completed batch: 4074-4105 - Jarvis Video Backend Execution Implementation Plan",
  "Previous completed batch: 4042-4073 - Jarvis Video Studio Release Candidate"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
}

foreach ($needle in @(
  "Phase 4105 Jarvis Video Backend Execution Implementation Plan",
  "smoke-codexforge-jarvis-video-backend-execution-implementation-plan-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video production timeline"',
  'aria-label="Backend execution implementation plan"',
  'aria-label="Implementation safety and approval state"',
  'aria-label="Implementation evidence and acceptance"',
  'aria-label="Developer diagnostics"'
) "/jarvis-video keeps workflow before safety, evidence, and diagnostics"

$jarvisVideoSourceFiles = @(
  Get-ChildItem -Path (Join-Path $root "src\app\jarvis-video") -Recurse -File |
    Where-Object { $_.Extension -in @(".ts", ".tsx") }
  Get-ChildItem -Path (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map") -Recurse -File |
    Where-Object { $_.Extension -in @(".ts", ".tsx") }
) | Select-Object -ExpandProperty FullName

$jarvisVideoSource = Get-CombinedFileText $jarvisVideoSourceFiles

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
  'writeFile\s*\(',
  'appendFile\s*\(',
  'dispatchWorker\s*\(',
  'queue\.add\s*\(',
  'enqueue\s*\(',
  'upload\s*\(',
  'download\s*\(',
  'render\s*\(',
  'publish\s*\('
)) {
  Assert-NotMatches $jarvisVideoSource $pattern "Jarvis video frontend source stays inert"
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
}

foreach ($pattern in @(
  'commandDeckRole\s*:\s*string',
  'href\s*:\s*string',
  'routeHref\s*:\s*string'
)) {
  Assert-NotMatches $navigationSource $pattern "navigation and command types stay literal-safe"
}

Assert-Contains $planSource "queue/job/worker plan" "plan includes queue/job/worker markers"
Assert-Contains $planSource "provider adapter implementation plan" "plan includes provider adapter markers"
Assert-Contains $planSource "review-only input; does not execute" "evidence sources stay review-only"

Write-Host "[OK] CodexForge Jarvis Video Backend Execution Implementation Plan Mega Batch smoke passed."
