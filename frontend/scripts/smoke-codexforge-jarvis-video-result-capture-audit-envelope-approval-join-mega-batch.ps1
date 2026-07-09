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

Write-Host "=== CodexForge Jarvis Video Result Capture Audit Envelope and Approval Join Mega Batch smoke ==="

$pagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$previewTypePath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-result-capture-audit-envelope-approval-join-preview.ts"
$serverIndexPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\index.ts"
$serverEnvelopePath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-result-capture-audit-envelope-approval-join.ts"
$sectionsPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-sections.ts"
$gatesPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-gates.ts"
$modelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-model.ts"
$safetyPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-studio-release-candidate-safety.ts"
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
  $serverEnvelopePath,
  $sectionsPath,
  $gatesPath,
  $modelPath,
  $safetyPath,
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
  $serverEnvelopePath
)
$productModelSource = Get-CombinedFileText @(
  $sectionsPath,
  $gatesPath,
  $modelPath,
  $safetyPath
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
  "4234-4265 - Jarvis Video Result Capture Audit Envelope and Approval Join",
  "Jarvis Video Result Capture Audit Envelope and Approval Join",
  "4265"
)) {
  Assert-Contains $routeSource $needle "route source contains $needle"
  Assert-Contains $serverSource $needle "server source contains $needle"
  Assert-Contains $productModelSource $needle "product model source contains $needle"
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
  "Result capture and audit join"
)) {
  Assert-Contains $panelSource $needle "video studio panel contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video generation control"',
  'aria-label="Result capture and audit join"',
  'aria-label="Server-only synthetic dry run"',
  'aria-label="Backend dry-run admission"',
  'aria-label="Backend runner contract"'
) "/jarvis-video keeps the console first and places result capture and audit join ahead of deeper diagnostics"

foreach ($needle in @(
  "result capture envelope version",
  "synthetic runner result reference",
  "synthetic result id/key reference",
  "capture input envelope",
  "capture decision envelope",
  "capture rejection envelope",
  "captured result summary envelope",
  "captured artifact placeholder envelope",
  "provider state: not called",
  "execution state: synthetic dry run only",
  "capture blocker envelope",
  "acceptance criteria for the next gated provider trial preparation batch",
  "audit envelope version",
  "synthetic dry-run trace reference",
  "operator identity placeholder",
  "approval packet digest reference",
  "input prompt/brief digest reference",
  "settings digest reference",
  "safety notes digest reference",
  "credential isolation reference using opaque token labels only, no secrets",
  "queue state: not dispatched",
  "worker state: not dispatched",
  "job state: not executed",
  "persistence state: not persisted",
  "artifact state: placeholder only",
  "result state: captured envelope only",
  "safety gate state",
  "privacy/redaction gate state",
  "cost/rate/duration/resolution guard state",
  "timeout/cancel guard state",
  "idempotency key state",
  "single-call lock state",
  "replay block state",
  "kill switch state",
  "retry/fallback disabled state",
  "observability trace placeholder",
  "approval join envelope version",
  "operator approval reference",
  "result capture envelope reference",
  "audit envelope reference",
  "join status",
  "join blockers",
  "join acceptance checklist",
  "next gated provider trial preparation requirements",
  "result capture envelope only",
  "audit envelope only",
  "approval join envelope only",
  "synthetic dry-run capture only",
  "Synthetic dry-run result capture envelope is defined",
  "Audit envelope is defined",
  "Approval join envelope is defined",
  "Provider execution remains locked",
  "Queue/worker/job dispatch remain disabled",
  "Result/audit/approval persistence remain unimplemented",
  "Artifact handoff remains placeholder only",
  "Next step is first gated provider execution trial preparation",
  "next likely batch: 4266-4297 - Jarvis Video First Gated Provider Execution Trial Preparation"
)) {
  Assert-Contains $serverSource $needle "server-only model contains $needle"
}

foreach ($needle in @(
  "3434-3465 - Backend-Owned Video Provider Execution Runtime Readiness",
  "3466-3497 - First Backend-Owned Video Provider Execution Dry Run",
  "3498-3529 - First Backend-Owned Video Provider Execution Approval Packet",
  "3530-3561 - First Backend-Owned Video Provider Execution Adapter Readiness",
  "3754-3785 - First Jarvis-Controlled Video Adapter Plug-in",
  "3786-3817 - First Jarvis-Controlled Video Dry Run Workspace",
  "3818-3849 - First Jarvis-Controlled Video Approval Packet Workspace",
  "3882-3913 - First Jarvis-Controlled Video Backend Execution Readiness",
  "3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial",
  "3978-4009 - First Jarvis-Controlled Video Backend Trial Runner Contract",
  "4010-4041 - First Jarvis-Controlled Video Trial Result Review and Recovery",
  "4042-4073 - Jarvis Video Studio Release Candidate",
  "4074-4105 - Jarvis Video Backend Execution Implementation Plan",
  "4106-4137 - Jarvis Video Backend Implementation Readiness Follow-Up",
  "4138-4169 - Jarvis Video Backend Runner Contract Hardening",
  "4170-4201 - Jarvis Video Backend Runner Foundation Dry-Run Admission",
  "4202-4233 - Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run"
)) {
  Assert-Contains $serverSource $needle "server-only evidence contains $needle"
}

foreach ($needle in @(
  "buildStableResultCaptureKey",
  "buildStableAuditEnvelopeKey",
  "buildStableApprovalJoinKey",
  "normalizeSyntheticResultCaptureInput",
  "buildStaticResultCaptureEnvelope",
  "buildStaticAuditEnvelope",
  "buildStaticApprovalJoinEnvelope",
  "evaluateStaticCaptureCompleteness",
  "listCaptureBlockers",
  "listNextGatedProviderTrialPreparationRequirements",
  "buildStaticResultCaptureAuditEnvelopeApprovalJoinPreview"
)) {
  Assert-Contains $serverSource $needle "pure helper exists: $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4265",
  "Latest completed batch: 4234-4265 - Jarvis Video Result Capture Audit Envelope and Approval Join",
  "Previous completed batch: 4202-4233 - Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run",
  "Next likely batch: 4266-4297 - Jarvis Video First Gated Provider Execution Trial Preparation"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
  Assert-Contains $checkpointSmokeSource $needle "checkpoint docs smoke expects $needle"
}

foreach ($needle in @(
  "Phase 4265 Jarvis Video Result Capture Audit Envelope and Approval Join",
  "smoke-codexforge-jarvis-video-result-capture-audit-envelope-approval-join-mega-batch.ps1"
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
  Assert-NotMatches $productModelSource $pattern "product model source avoids unsafe TypeScript escapes"
}

foreach ($pattern in @(
  '\bcommandDeckRole\s*:\s*string',
  '\bhref\s*:\s*string',
  '\bhref\?\s*:\s*string'
)) {
  Assert-NotMatches $navigationSource $pattern "navigation typing stays strict"
}

Write-Host "[OK] CodexForge Jarvis Video Result Capture Audit Envelope and Approval Join Mega Batch smoke passed."
