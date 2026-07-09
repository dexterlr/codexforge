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

Write-Host "=== CodexForge Jarvis Video First Provider Trial Result Review and Recovery Mega Batch smoke ==="

$pagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$reviewRecoveryPreviewPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-first-provider-trial-result-review-recovery-preview.ts"
$serverIndexPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\index.ts"
$serverReviewRecoveryPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-first-provider-trial-result-review-recovery.ts"
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
  $reviewRecoveryPreviewPath,
  $serverIndexPath,
  $serverReviewRecoveryPath,
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
$serverSource = Get-CombinedFileText @($reviewRecoveryPreviewPath, $serverIndexPath, $serverReviewRecoveryPath)
$panelSource = Get-Content -Raw $panelPath
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointSmokeSource = Get-Content -Raw $checkpointSmokePath
$homeSource = Get-CombinedFileText @($homePageClientPath, $homeShellPath, $homeContentPath)
$navigationSource = Get-CombinedFileText @($navigationTypesPath, $navigationRegistryPath, $commandRegistryPath)

Assert-Contains $serverSource 'import "server-only";' "server-only boundary marker exists"

foreach ($needle in @(
  "4330-4361 - Jarvis Video First Provider Trial Result Review and Recovery",
  "Jarvis Video First Provider Trial Result Review and Recovery",
  "4361"
)) {
  Assert-Contains $routeSource $needle "route source contains $needle"
  Assert-Contains $serverSource $needle "server source contains $needle"
  Assert-Contains $docsSource $needle "docs contain $needle"
}

foreach ($needle in @(
  "buildStaticJarvisVideoFirstProviderTrialResultReviewRecoveryPreview",
  "firstProviderTrialResultReviewRecoveryPreview",
  "jarvisVideoFirstProviderTrialResultReviewRecoveryPreview"
)) {
  Assert-Contains $routeSource $needle "route wiring contains $needle"
}

foreach ($needle in @(
  "Phase 4361 Jarvis Video First Provider Trial Result Review and Recovery",
  "smoke-codexforge-jarvis-video-first-provider-trial-result-review-recovery-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
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
  "Real provider adapter wiring",
  "Provider trial result review and recovery"
)) {
  Assert-Contains $panelSource $needle "/jarvis-video panel contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video generation control"',
  'aria-label="Real provider adapter wiring"',
  'aria-label="Provider trial result review and recovery"',
  'aria-label="First gated provider trial runtime"',
  'aria-label="First gated provider trial preparation"',
  'aria-label="Result capture and audit join"',
  'aria-label="Server-only synthetic dry run"',
  'aria-label="Backend dry-run admission"'
) "/jarvis-video keeps the control console above the fold and places review and recovery before deeper diagnostics"

foreach ($needle in @(
  "Provider trial result review is defined",
  "Recovery review is defined",
  "Runtime remains disabled by default",
  "Provider execution still requires injected server-only adapter",
  "No provider call happens during validation",
  "Operator acceptance is required before promotion",
  "Retry and fallback remain review-only",
  "Result/audit/approval persistence remain unimplemented",
  "Export/publish remains blocked",
  "Next step is first real provider adapter wiring and manual gated trial"
)) {
  Assert-Contains $serverSource $needle "review/recovery preview contains $needle"
}

foreach ($needle in @(
  "result review version",
  "provider trial runtime reference",
  "runtime result reference",
  "runtime blocked result reference",
  "provider attempt status envelope",
  "provider response metadata placeholder, no secrets",
  "provider not-called validation state",
  "successful result review envelope",
  "failed result review envelope",
  "blocked result review envelope",
  "artifact review placeholder",
  "audit envelope reference",
  "approval join reference",
  "operator review state",
  "operator acceptance envelope",
  "operator rejection envelope",
  "safety review envelope",
  "privacy/redaction review envelope",
  "cost/rate/duration/resolution review envelope",
  "timeout/cancel review envelope",
  "result quality checklist",
  "artifact handoff checklist",
  "export/publish blocker checklist",
  "result review blockers",
  "next manual gated trial acceptance checklist",
  "recovery version",
  "recovery mode: review only",
  "retry review envelope",
  "fallback review envelope",
  "timeout recovery review envelope",
  "cost/rate recovery review envelope",
  "safety recovery review envelope",
  "privacy/redaction recovery review envelope",
  "provider error taxonomy",
  "provider refusal taxonomy",
  "provider timeout taxonomy",
  "provider rate-limit taxonomy",
  "provider cost-limit taxonomy",
  "provider safety-block taxonomy",
  "rollback review envelope",
  "kill switch recovery state",
  "idempotency recovery state",
  "replay-block recovery state",
  "single-call-lock recovery state",
  "recovery blockers",
  "next adapter wiring/manual trial requirements",
  "first provider trial result review and recovery only",
  "provider result review path defined",
  "recovery review only",
  "no provider call during validation",
  "no live video generation during validation",
  "provider adapter injection required",
  "operator acceptance required",
  "retry/fallback review only",
  "no retry execution",
  "no fallback execution",
  "no frontend provider call",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no artifact persistence",
  "export/publish blocked",
  "backend-only execution path required",
  "server-only boundary required",
  "first real provider adapter wiring/manual gated trial in a future batch"
)) {
  Assert-Contains $serverSource $needle "server-only review/recovery model contains $needle"
}

foreach ($needle in @(
  "first provider trial result review summary",
  "provider result review lanes",
  "successFailureBlockedReviewStates",
  "recoveryPlanReview",
  "operatorAcceptanceChecklist",
  "artifactHandoffChecklist",
  "exportPublishBlockerChecklist",
  "nextManualGatedTrialChecklist"
)) {
  Assert-Contains $serverSource $needle "typed product model contains $needle"
}

foreach ($needle in @(
  "JarvisVideoFirstProviderTrialResultReviewRecoveryPreviewCheckpoint",
  "JarvisVideoFirstProviderTrialResultReviewRecoveryPreview",
  "statusBadge",
  "highlights",
  "productStatements",
  "reviewLanes",
  "recoveryLanes",
  "operatorAcceptanceChecklist",
  "artifactHandoffChecklist",
  "exportPublishBlockers",
  "nextManualGatedTrialChecklist",
  "evidenceInputCount"
)) {
  Assert-Contains $serverSource $needle "typed review/recovery preview model contains $needle"
}

foreach ($needle in @(
  "buildStableProviderTrialResultReviewKey",
  "buildStableProviderTrialRecoveryKey",
  "normalizeRuntimeResultReviewInput",
  "classifyStaticProviderTrialResultState",
  "buildStaticSuccessReviewEnvelope",
  "buildStaticFailureReviewEnvelope",
  "buildStaticBlockedReviewEnvelope",
  "buildStaticRecoveryPlanReview",
  "listResultReviewBlockers",
  "listRecoveryBlockers",
  "listNextManualGatedTrialRequirements",
  "buildResultReviewRecoveryHandoffSummary",
  "buildStaticJarvisVideoFirstProviderTrialResultReviewRecoveryPreview"
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
  "4298-4329"
)) {
  Assert-Contains $serverSource $needle "server-only review/recovery evidence phase contains $needle"
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
  "Jarvis Video First Gated Provider Execution Trial Runtime"
)) {
  Assert-Contains $serverSource $needle "server-only review/recovery evidence label contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4425. Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review. Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial.",
  "Highest detected phase: 4425. Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review. Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial.",
  "Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
  "Next likely batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement",
  "first real provider adapter wiring only",
  "manual gated trial path only",
  "provider adapter wiring path defined",
  "manual gated trial disabled by default",
  "hard kill switch",
  "provider call not executed during validation",
  "manual confirmation required",
  "operator approval required",
  "credential isolation required",
  "no frontend provider call",
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
  "manual provider trial capture/UX review in a future batch"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
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

Write-Host "[OK] CodexForge Jarvis Video First Provider Trial Result Review and Recovery Mega Batch smoke passed."
