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

Write-Host "=== CodexForge Jarvis Video First Gated Provider Execution Trial Preparation Mega Batch smoke ==="

$pagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$previewTypePath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-first-gated-provider-execution-trial-preparation-preview.ts"
$serverIndexPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\index.ts"
$serverPreparationPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-first-gated-provider-execution-trial-preparation.ts"
$releaseModelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-model.ts"
$releaseSafetyPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-safety.ts"
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
  $serverPreparationPath,
  $releaseModelPath,
  $releaseSafetyPath,
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
$serverSource = Get-CombinedFileText @($previewTypePath, $serverIndexPath, $serverPreparationPath)
$productModelSource = Get-CombinedFileText @($previewTypePath, $releaseModelPath, $releaseSafetyPath)
$panelSource = Get-Content -Raw $panelPath
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointSmokeSource = Get-Content -Raw $checkpointSmokePath
$homeSource = Get-CombinedFileText @($homePageClientPath, $homeShellPath, $homeContentPath)
$navigationSource = Get-CombinedFileText @($navigationTypesPath, $navigationRegistryPath, $commandRegistryPath)

Assert-Contains $serverSource 'import "server-only";' "server-only boundary marker exists"

foreach ($needle in @(
  "4266-4297 - Jarvis Video First Gated Provider Execution Trial Preparation",
  "Jarvis Video First Gated Provider Execution Trial Preparation",
  "4297"
)) {
  Assert-Contains $routeSource $needle "route source contains $needle"
  Assert-Contains $serverSource $needle "server source contains $needle"
  Assert-Contains $docsSource $needle "docs contain $needle"
}

foreach ($needle in @(
  "Phase 4297 Jarvis Video First Gated Provider Execution Trial Preparation",
  "smoke-codexforge-jarvis-video-first-gated-provider-execution-trial-preparation-mega-batch.ps1"
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
  "First gated provider trial preparation"
)) {
  Assert-Contains $panelSource $needle "video studio panel contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video generation control"',
  'aria-label="First gated provider trial preparation"',
  'aria-label="Result capture and audit join"',
  'aria-label="Server-only synthetic dry run"',
  'aria-label="Backend dry-run admission"'
) "/jarvis-video keeps the control console above the fold and places first gated provider trial preparation ahead of deeper diagnostics"

foreach ($needle in @(
  "trial preparation version",
  "provider execution trial mode: preparation only",
  "provider adapter reference only",
  "provider capability reference",
  "provider credential slot reference using opaque token labels only, no secrets",
  "credential isolation requirement",
  "operator approval reference",
  "approval packet digest reference",
  "result capture envelope reference",
  "audit envelope reference",
  "approval join envelope reference",
  "prompt/brief digest reference",
  "settings digest reference",
  "safety notes digest reference",
  "provider preflight gate envelope",
  "safety preflight gate envelope",
  "privacy/redaction preflight gate envelope",
  "cost/rate/duration/resolution preflight gate envelope",
  "timeout/cancel preflight gate envelope",
  "idempotency key requirement",
  "single-call lock requirement",
  "replay block requirement",
  "kill switch requirement",
  "network egress policy requirement",
  "queue state: not dispatched",
  "worker state: not dispatched",
  "job state: not executed",
  "provider state: not called",
  "result state: not persisted",
  "audit state: not persisted",
  "approval state: not persisted",
  "artifact state: placeholder only",
  "retry/fallback state: disabled",
  "runtime blocker list",
  "trial readiness checklist",
  "next runtime batch acceptance criteria",
  "Provider trial preparation is defined",
  "Provider execution is still locked",
  "Operator approval is required",
  "Credential isolation is required",
  "Result capture, audit envelope, and approval join are ready as handoff references",
  "Queue/worker/job dispatch remain disabled",
  "Result/audit/approval persistence remain unimplemented",
  "Next step is the first backend-only gated provider execution runtime",
  "Next likely batch: 4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime"
)) {
  Assert-Contains $serverSource $needle "server-only preparation model contains $needle"
}

foreach ($needle in @(
  "providerPreflightGateSummary",
  "approvalReadinessChecklist",
  "credentialIsolationChecklist",
  "resultAuditApprovalHandoffChecklist",
  "runtimeBlockers",
  "nextRuntimeAcceptanceChecklist",
  "nextRuntimeReadinessSummary",
  "evidenceInputCount",
  "First gated provider trial preparation defined",
  "Preparation only; backend-only runtime required",
  "next likely batch: 4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime"
)) {
  Assert-Contains $productModelSource $needle "typed product model source contains $needle"
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
  "4234-4265"
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
  "Jarvis Video Result Capture Audit Envelope and Approval Join"
)) {
  Assert-Contains $serverSource $needle "server-only evidence label contains $needle"
}

foreach ($needle in @(
  "buildJarvisVideoFirstGatedProviderExecutionTrialPreparationStableKey",
  "buildJarvisVideoFirstGatedProviderExecutionTrialPreparationPreflightGateSummary",
  "listJarvisVideoFirstGatedProviderExecutionTrialPreparationRuntimeBlockers",
  "listJarvisVideoFirstGatedProviderExecutionTrialPreparationRequiredRuntimeApprovals",
  "listJarvisVideoFirstGatedProviderExecutionTrialPreparationCredentialIsolationGates",
  "listJarvisVideoFirstGatedProviderExecutionTrialPreparationHandoffEnvelopes",
  "evaluateJarvisVideoFirstGatedProviderExecutionTrialPreparationCompleteness",
  "buildJarvisVideoFirstGatedProviderExecutionTrialPreparationNextRuntimeReadinessSummary",
  "buildStaticJarvisVideoFirstGatedProviderExecutionTrialPreparationPreview"
)) {
  Assert-Contains $serverSource $needle "pure helper exists: $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4297",
  "Latest completed batch: 4266-4297 - Jarvis Video First Gated Provider Execution Trial Preparation",
  "Previous completed batch: 4234-4265 - Jarvis Video Result Capture Audit Envelope and Approval Join",
  "Next likely batch: 4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime",
  "first gated provider trial preparation only",
  "provider adapter reference only",
  "provider preflight only",
  "no provider execution",
  "no live video generation",
  "no provider call",
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
  "operator approval required",
  "credential isolation required",
  "first gated provider execution runtime only in a future batch"
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
  'from\s+[''"]openai[''"]',
  'from\s+[''"]@anthropic',
  'from\s+[''"]@google',
  'from\s+[''"]@aws-sdk',
  'from\s+[''"]replicate[''"]',
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
  Assert-NotMatches $productModelSource $pattern "product model source avoids unsafe TypeScript escapes"
}

foreach ($pattern in @(
  '\bcommandDeckRole\s*:\s*string',
  '\bhref\s*:\s*string',
  '\bhref\?\s*:\s*string'
)) {
  Assert-NotMatches $navigationSource $pattern "navigation typing stays strict"
}

Write-Host "[OK] CodexForge Jarvis Video First Gated Provider Execution Trial Preparation Mega Batch smoke passed."
