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

Write-Host "=== CodexForge Jarvis Video First Manual Provider Trial Result Capture and UX Review Mega Batch smoke ==="

$pagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$previewTypePath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-first-manual-provider-trial-result-capture-ux-review-preview.ts"
$serverIndexPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\index.ts"
$serverCapturePath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-first-manual-provider-trial-result-capture-ux-review.ts"
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
  $serverCapturePath,
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
$serverSource = Get-CombinedFileText @($previewTypePath, $serverIndexPath, $serverCapturePath)
$panelSource = Get-Content -Raw $panelPath
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointSmokeSource = Get-Content -Raw $checkpointSmokePath
$homeSource = Get-CombinedFileText @($homePageClientPath, $homeShellPath, $homeContentPath)
$navigationSource = Get-CombinedFileText @($navigationTypesPath, $navigationRegistryPath, $commandRegistryPath)
$reviewSource = Get-CombinedFileText @(
  $pagePath,
  $pageClientPath,
  $panelPath,
  $previewTypePath,
  $serverIndexPath,
  $serverCapturePath
)

Assert-Contains $serverSource 'import "server-only";' "server-only boundary marker exists"

foreach ($needle in @(
  "4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "4425",
  "buildStaticJarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview",
  "firstManualProviderTrialResultCaptureUxReviewPreview",
  "jarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview",
  "Manual provider trial capture"
)) {
  Assert-Contains $reviewSource $needle "review source contains $needle"
}

foreach ($needle in @(
  "Phase 4425 Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "smoke-codexforge-jarvis-video-first-manual-provider-trial-result-capture-ux-review-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

Assert-Ordered $allSmokeSource @(
  "Phase 4393 Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
  "Phase 4425 Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "Jarvis Video Studio Release Candidate Mega Batch"
) "aggregate smoke keeps the new 4425 smoke in sequence"

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
  "Manual provider trial capture"
) ) {
  Assert-Contains $panelSource $needle "video studio panel contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video generation control"',
  'aria-label="Manual provider trial capture"',
  'aria-label="Real provider adapter wiring"',
  'aria-label="Provider trial result review and recovery"',
  'aria-label="First gated provider trial runtime"',
  'aria-label="First gated provider trial preparation"',
  'aria-label="Result capture and audit join"',
  'aria-label="Server-only synthetic dry run"',
  'aria-label="Backend dry-run admission"'
) "/jarvis-video keeps the control console first and the manual provider trial capture section above deeper diagnostics"

foreach ($needle in @(
  "manual provider trial capture version",
  "manual capture mode: review only",
  "manual capture input envelope",
  "manual capture decision envelope",
  "manual capture rejection envelope",
  "manual provider result metadata placeholder, no secrets",
  "manual provider artifact metadata placeholder, no download/upload",
  "manual provider status envelope",
  "manual provider duration/resolution/cost placeholder",
  "manual provider safety status placeholder",
  "manual provider privacy/redaction status placeholder",
  "manual artifact handoff placeholder",
  "capture operator review reference",
  "capture approval packet digest reference",
  "capture audit envelope reference",
  "capture approval join reference",
  "capture result quality checklist",
  "capture blocker list",
  "UX review checklist",
  "next execution enablement checklist",
  "UX review version",
  "output preview state",
  "empty result state",
  "manually captured result state",
  "blocked result state",
  "provider not-called validation state",
  "artifact unavailable state",
  "artifact pending review state",
  "result quality review state",
  "safety review state",
  "privacy/redaction review state",
  "cost/rate/duration/resolution review state",
  "operator acceptance review state",
  "export/publish blocked state",
  "recovery review state",
  "next manual execution enablement requirements",
  "first manual provider trial result capture summary",
  "manual capture lanes",
  "UX review lanes",
  "output preview review state",
  "empty/captured/blocked result review states",
  "quality/safety/privacy/cost review states",
  "operator acceptance checklist",
  "artifact handoff placeholder checklist",
  "export/publish blockers",
  "next manual execution enablement checklist"
)) {
  Assert-Contains $serverSource $needle "server-only capture and review model contains $needle"
}

foreach ($needle in @(
  "Manual provider trial capture path is defined",
  "UX review path is defined",
  "Provider call is not executed during validation",
  "Manual gated trial remains disabled by default",
  "Operator approval is required",
  "Credential isolation is required",
  "Output preview can show empty, blocked, or manually captured review states",
  "Result/audit/approval persistence remain unimplemented",
  "Artifact handoff remains placeholder only",
  "Export/publish remains blocked",
  "Next step is manual provider trial execution enablement",
  "first manual provider trial result capture only",
  "UX review path only",
  "manual review only",
  "provider call not executed during validation",
  "no live video generation during validation",
  "no frontend provider call",
  "manual gated trial disabled by default",
  "manual confirmation required",
  "operator approval required",
  "credential isolation required",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no artifact persistence",
  "retry/fallback disabled",
  "export/publish blocked",
  "backend-only execution path required",
  "server-only boundary required",
  "manual provider trial execution enablement in a future batch"
)) {
  Assert-Contains $serverSource $needle "server-only review markers contain $needle"
}

foreach ($needle in @(
  "buildStableManualProviderCaptureKey",
  "buildStableManualProviderUxReviewKey",
  "normalizeManualCaptureInput",
  "classifyManualProviderCaptureState",
  "buildStaticManualCaptureEnvelope",
  "buildEmptyUxReviewPreview",
  "buildCapturedUxReviewPreviewFromTypedStaticInput",
  "listManualCaptureBlockers",
  "listUxReviewBlockers",
  "listNextManualExecutionEnablementRequirements",
  "buildManualCaptureUxReviewHandoffSummary",
  "buildStaticJarvisVideoFirstManualProviderTrialResultCaptureUxReviewPreview"
)) {
  Assert-Contains $serverSource $needle "pure helper exists: $needle"
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
  "4170-4201",
  "4202-4233",
  "4234-4265",
  "4266-4297",
  "4298-4329",
  "4330-4361",
  "4362-4393"
)) {
  Assert-Contains $serverSource $needle "server-only evidence phase contains $needle"
}

foreach ($needle in @(
  "Backend-Owned Video Provider Execution Runtime Readiness",
  "First Backend-Owned Video Provider Execution Dry Run",
  "First Backend-Owned Video Provider Execution Approval Packet",
  "First Backend-Owned Video Provider Execution Adapter Readiness",
  "First Jarvis-Controlled Video Adapter Plug-in",
  "First Jarvis-Controlled Video Dry Run Workspace",
  "First Jarvis-Controlled Video Approval Packet Workspace",
  "First Jarvis-Controlled Video Backend Execution Readiness",
  "First Jarvis-Controlled Video Controlled Execution Trial",
  "First Jarvis-Controlled Video Backend Trial Runner Contract",
  "First Jarvis-Controlled Video Trial Result Review and Recovery",
  "Jarvis Video Studio Release Candidate",
  "Jarvis Video Backend Execution Implementation Plan",
  "Jarvis Video Backend Implementation Readiness Follow-Up",
  "Jarvis Video Backend Runner Contract Hardening",
  "Jarvis Video Backend Runner Foundation Dry-Run Admission",
  "Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run",
  "Jarvis Video Result Capture Audit Envelope and Approval Join",
  "Jarvis Video First Gated Provider Execution Trial Preparation",
  "Jarvis Video First Gated Provider Execution Trial Runtime",
  "Jarvis Video First Provider Trial Result Review and Recovery",
  "Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial"
)) {
  Assert-Contains $serverSource $needle "server-only evidence label contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4425. Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review. Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial.",
  "Highest detected phase: 4425. Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review. Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial.",
  "Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
  "Next likely batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement",
  "first manual provider trial result capture only",
  "UX review path only",
  "manual review only",
  "provider call not executed during validation",
  "no live video generation during validation",
  "no frontend provider call",
  "manual gated trial disabled by default",
  "manual confirmation required",
  "operator approval required",
  "credential isolation required",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no artifact persistence",
  "retry/fallback disabled",
  "export/publish blocked",
  "backend-only execution path required",
  "server-only boundary required",
  "manual provider trial execution enablement in a future batch"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4425. Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review. Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial.",
  "Highest detected phase: 4425. Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review. Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial.",
  "Next likely batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement"
)) {
  Assert-Contains $checkpointSmokeSource $needle "checkpoint docs smoke expects $needle"
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
  "from\s+['`"]openai['`"]",
  "from\s+['`"]@anthropic",
  "from\s+['`"]@google",
  "from\s+['`"]@aws-sdk",
  "from\s+['`"]replicate['`"]",
  'new\s+OpenAI\s*\(',
  'localStorage\s*[\.\[]',
  'sessionStorage\s*[\.\[]',
  'indexedDB\s*[\.\[]',
  'document\.cookie',
  'child_process',
  'spawn\s*\(',
  'exec\s*\(',
  'execFile\s*\(',
  'Start-Process'
)) {
  Assert-NotMatches $routeSource $pattern "frontend jarvis video source stays inert"
  Assert-NotMatches $homeSource $pattern "home source stays inert"
}

foreach ($pattern in @(
  "from\s+['`"]openai['`"]",
  "from\s+['`"]@anthropic",
  "from\s+['`"]@google",
  "from\s+['`"]@aws-sdk",
  "from\s+['`"]replicate['`"]",
  '\bfetch\s*\(',
  'Date\.now\s*\(',
  'Math\.random\s*\(',
  '\bcrypto\b',
  'process\.env',
  'new\s+Date\s*\(',
  'writeFile\s*\(',
  'appendFile\s*\(',
  'child_process',
  'spawn\s*\(',
  'exec\s*\(',
  'execFile\s*\(',
  'Start-Process'
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

Write-Host "[OK] CodexForge Jarvis Video First Manual Provider Trial Result Capture and UX Review Mega Batch smoke passed."
