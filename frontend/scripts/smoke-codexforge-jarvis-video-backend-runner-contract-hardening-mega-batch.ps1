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

Write-Host "=== CodexForge Jarvis Video Backend Runner Contract Hardening Mega Batch smoke ==="

$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$modelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-model.ts"
$sectionsPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-sections.ts"
$safetyPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-safety.ts"
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
$homeContentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"

$requiredPaths = @(
  $pageClientPath,
  $panelPath,
  $modelPath,
  $sectionsPath,
  $safetyPath,
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

$routeSource = Get-CombinedFileText @(
  $pageClientPath,
  $panelPath,
  $modelPath,
  $sectionsPath,
  $safetyPath,
  $hardeningPath
)
$hardeningSource = Get-Content -Raw $hardeningPath
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
  "4138-4169 - Jarvis Video Backend Runner Contract Hardening",
  "Jarvis Video Backend Runner Contract Hardening",
  "Backend runner contract",
  "Runner contract is being hardened",
  "Backend-only runner required",
  "Operator approval required",
  "Credential isolation required",
  "Queue/worker/job remain disabled",
  "Provider execution remains locked",
  "Result/audit persistence remain unimplemented",
  "Next step is backend dry-run admission foundation"
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
  "Backend runner contract"
)) {
  Assert-Contains $panelSource $needle "video control console contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Open Jarvis Video Studio"
)) {
  Assert-Contains $homeSource $needle "home cockpit contains $needle"
}

foreach ($needle in @(
  "runner contract version",
  "runner input envelope",
  "runner output envelope",
  "runner error envelope",
  "operator approval reference",
  "approval packet digest reference",
  "prompt/brief reference",
  "settings reference",
  "safety notes reference",
  "credential isolation reference",
  "provider adapter reference only",
  "queue admission contract",
  "worker isolation contract",
  "job lease contract",
  "idempotency key contract",
  "single-call lock contract",
  "replay block contract",
  "kill switch contract",
  "timeout/cancel contract",
  "cost/rate/duration/resolution guard contract",
  "network egress policy contract",
  "safety gate contract",
  "privacy/redaction gate contract",
  "result capture contract",
  "result envelope markers remain typed only",
  "audit join contract",
  "audit envelope markers remain typed only",
  "artifact handoff contract",
  "retry/fallback policy contract",
  "rollback contract",
  "observability trace contract",
  "acceptance criteria for the next backend-only dry-run admission batch"
)) {
  Assert-Contains $hardeningSource $needle "hardening model contains $needle"
}

foreach ($needle in @(
  "opaque token names only",
  "no frontend secrets",
  "no provider imports",
  "no provider calls",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no artifact persistence",
  "no retry/fallback execution",
  "disabled by default",
  "hard kill switch",
  "backend-only execution path required",
  "server-only boundary required",
  "provider adapter reference only",
  "dry-run admission only in a future batch",
  "no fetch/network calls",
  "no provider SDK imports in frontend"
)) {
  Assert-Contains $hardeningSource $needle "hardening safety contains $needle"
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
  "4106-4137"
)) {
  Assert-Contains $hardeningSource $needle "hardening evidence source contains $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4169",
  "Latest completed batch: 4138-4169 - Jarvis Video Backend Runner Contract Hardening",
  "Previous completed batch: 4106-4137 - Jarvis Video Backend Implementation Readiness Follow-Up",
  "Next likely batch: 4170-4201 - Jarvis Video Backend Runner Foundation Dry-Run Admission"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
}

foreach ($needle in @(
  "Phase 4169 Jarvis Video Backend Runner Contract Hardening",
  "smoke-codexforge-jarvis-video-backend-runner-contract-hardening-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video generation control"',
  'aria-label="Backend runner contract"',
  'aria-label="Mission and readiness"',
  'aria-label="Video production timeline"'
) "/jarvis-video keeps the control console first and places backend runner contract before deep workflow sections"

Assert-Ordered $panelSource @(
  'aria-label="Backend runner contract hardening"',
  'aria-label="Backend implementation readiness"',
  'aria-label="Backend readiness safety and approval state"',
  'aria-label="Backend readiness evidence and contract inputs"',
  'aria-label="Backend execution implementation plan"',
  'aria-label="Developer diagnostics"'
) "/jarvis-video keeps hardening above historical readiness and diagnostics"

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
) ) {
  Assert-NotMatches $routeSource $pattern "touched route source avoids unsafe TypeScript escapes"
  Assert-NotMatches $homeGuardedSource $pattern "touched home source avoids unsafe TypeScript escapes"
}

foreach ($pattern in @(
  '\bcommandDeckRole\s*:\s*string',
  '\bhref\s*:\s*string',
  '\bhref\?\s*:\s*string'
)) {
  Assert-NotMatches $navigationSource $pattern "navigation typing stays strict"
}

Write-Host "[OK] CodexForge Jarvis Video Backend Runner Contract Hardening Mega Batch smoke passed."
