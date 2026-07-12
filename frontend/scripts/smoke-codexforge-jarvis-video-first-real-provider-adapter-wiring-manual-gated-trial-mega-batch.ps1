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

Write-Host "=== CodexForge Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial Mega Batch smoke ==="

$pagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$previewTypePath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-first-real-provider-adapter-wiring-preview.ts"
$serverIndexPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\index.ts"
$serverWiringPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-first-real-provider-adapter-wiring-manual-gated-trial.ts"
$manualScriptPath = Join-Path $root "scripts\manual-codexforge-jarvis-video-provider-trial.ps1"
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
  $serverWiringPath,
  $manualScriptPath,
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
$serverSource = Get-CombinedFileText @($previewTypePath, $serverIndexPath, $serverWiringPath)
$panelSource = Get-Content -Raw $panelPath
$manualScriptSource = Get-Content -Raw $manualScriptPath
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointSmokeSource = Get-Content -Raw $checkpointSmokePath
$homeSource = Get-CombinedFileText @($homePageClientPath, $homeShellPath, $homeContentPath)
$navigationSource = Get-CombinedFileText @($navigationTypesPath, $navigationRegistryPath, $commandRegistryPath)

Assert-Contains $serverSource 'import "server-only";' "server-only boundary marker exists"

foreach ($needle in @(
  "4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
  "Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
  "4393",
  "buildStaticJarvisVideoFirstRealProviderAdapterWiringPreview",
  "firstRealProviderAdapterWiringPreview",
  "jarvisVideoFirstRealProviderAdapterWiringPreview"
)) {
  Assert-Contains $routeSource $needle "route source contains $needle"
  Assert-Contains $serverSource $needle "server source contains $needle"
}

Assert-Contains $serverSource "Next likely batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review" "server source contains next manual provider trial batch marker"

foreach ($needle in @(
  "Phase 4393 Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
  "smoke-codexforge-jarvis-video-first-real-provider-adapter-wiring-manual-gated-trial-mega-batch.ps1"
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
  "Real provider adapter wiring"
)) {
  Assert-Contains $panelSource $needle "video studio panel contains $needle"
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
) "/jarvis-video keeps the control console above the fold and places real provider adapter wiring before deeper diagnostics"

foreach ($needle in @(
  "provider adapter wiring version",
  "manual gated trial mode",
  "provider adapter target reference",
  "provider capability reference",
  "provider credential slot reference using opaque token labels only, no secrets",
  "credential isolation requirement",
  "operator approval reference",
  "approval packet digest reference",
  "runtime envelope reference",
  "result review/recovery reference",
  "result capture envelope reference",
  "audit envelope reference",
  "approval join envelope reference",
  "prompt/brief digest reference",
  "settings digest reference",
  "safety notes digest reference",
  "manual trial preflight gate",
  "provider adapter availability gate",
  "credential presence gate, label-only/no value",
  "operator approval gate",
  "kill switch gate",
  "idempotency gate",
  "single-call lock gate",
  "replay block gate",
  "network egress gate",
  "cost/rate/duration/resolution gate",
  "timeout/cancel gate",
  "safety gate",
  "privacy/redaction gate",
  "queue state: not dispatched",
  "worker state: not dispatched",
  "job state: not executed",
  "result state: not persisted",
  "audit state: not persisted",
  "approval state: not persisted",
  "artifact state: placeholder only",
  "retry/fallback state: disabled",
  "manual gated trial blocker list",
  "manual gated trial acceptance checklist",
  "next result capture/UX review acceptance checklist",
  "first real provider adapter wiring only",
  "manual gated trial path only",
  "disabled by default",
  "hard kill switch",
  "provider call not executed during validation",
  "no live video generation during validation",
  "no frontend provider call",
  "provider adapter wiring path defined",
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
  "manual provider trial capture/UX review in a future batch",
  "First real provider adapter wiring path is defined",
  "Manual gated trial is disabled by default",
  "Provider calls never run from frontend",
  "Operator approval is required",
  "Credential isolation is required",
  "Kill switch remains enforced",
  "Queue/worker/job dispatch remain disabled",
  "Result/audit/approval persistence remain unimplemented",
  "Manual trial capture and UX review are next",
  "provider adapter not wired yet"
)) {
  Assert-Contains $serverSource $needle "server-only provider adapter wiring model contains $needle"
}

foreach ($needle in @(
  "buildStableProviderAdapterWiringKey",
  "listManualGatedTrialBlockers",
  "listRequiredManualApprovalGates",
  "listRequiredCredentialIsolationGates",
  "buildBlockedManualTrialResult",
  "buildManualTrialReadinessSummary",
  "buildNextCaptureUxReviewChecklist",
  "runJarvisVideoFirstRealProviderManualTrialWithAdapter",
  "buildStaticJarvisVideoFirstRealProviderAdapterWiringPreview"
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
  "4330-4361"
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
  "Jarvis Video First Gated Provider Execution Trial Runtime"
)) {
  Assert-Contains $serverSource $needle "server-only evidence label contains $needle"
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
}

foreach ($needle in @(
  "Highest detected phase: 4809",
  "Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery",
  "Next likely batch: 4810-4841 - Athena Model Routing and Provider Selection Preview"
)) {
  Assert-Contains $checkpointSmokeSource $needle "checkpoint docs smoke expects $needle"
}

foreach ($needle in @(
  "CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_ENABLED",
  "CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_CONFIRM",
  "I_UNDERSTAND_PROVIDER_COSTS_AND_APPROVE",
  "CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_DRY_RUN",
  "CODEXFORGE_JARVIS_VIDEO_PROVIDER_CREDENTIAL_SLOT_LABEL",
  "CODEXFORGE_JARVIS_VIDEO_OPERATOR_APPROVAL_REFERENCE",
  "provider adapter not wired yet",
  "Manual dry-run mode is the only supported mode in 4362-4393",
  "No provider call was attempted.",
  "No queue, worker, or job was dispatched.",
  "No result, audit, approval, or artifact state was persisted."
)) {
  Assert-Contains $manualScriptSource $needle "manual trial script contains $needle"
}

Assert-NotContains $allSmokeSource "manual-codexforge-jarvis-video-provider-trial.ps1" "manual provider trial script is not referenced by aggregate smoke"
Assert-NotMatches $manualScriptSource 'Write-Host\s+\$env:|Write-Output\s+\$env:|Write-Verbose\s+\$env:' "manual trial script does not echo env values"

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

Write-Host "[OK] CodexForge Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial Mega Batch smoke passed."
