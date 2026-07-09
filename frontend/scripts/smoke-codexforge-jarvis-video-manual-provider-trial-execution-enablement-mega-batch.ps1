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

Write-Host "=== CodexForge Jarvis Video Manual Provider Trial Execution Enablement Mega Batch smoke ==="

$pagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$pageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$panelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$previewTypePath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\jarvis-video-manual-provider-trial-execution-enablement-preview.ts"
$serverIndexPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\index.ts"
$serverEnablementPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-manual-provider-trial-execution-enablement.ts"
$serverPreviousCapturePath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-first-manual-provider-trial-result-capture-ux-review.ts"
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
  $serverEnablementPath,
  $serverPreviousCapturePath,
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
$panelSource = Get-Content -Raw $panelPath
$serverSource = Get-CombinedFileText @(
  $previewTypePath,
  $serverIndexPath,
  $serverEnablementPath,
  $serverPreviousCapturePath
)
$manualScriptSource = Get-Content -Raw $manualScriptPath
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
  $serverEnablementPath
)

Assert-Contains $serverSource 'import "server-only";' "server-only boundary marker exists"

foreach ($needle in @(
  "4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement",
  "Jarvis Video Manual Provider Trial Execution Enablement",
  "4457",
  "highestDetectedPhase: 4457",
  "buildStaticJarvisVideoManualProviderTrialExecutionEnablementPreview",
  "manualProviderTrialExecutionEnablementPreview",
  "jarvisVideoManualProviderTrialExecutionEnablementPreview",
  "Manual execution enablement"
)) {
  Assert-Contains $reviewSource $needle "execution enablement source contains $needle"
}

foreach ($needle in @(
  "Phase 4457 Jarvis Video Manual Provider Trial Execution Enablement",
  "smoke-codexforge-jarvis-video-manual-provider-trial-execution-enablement-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

Assert-Ordered $allSmokeSource @(
  "Phase 4393 Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
  "Phase 4425 Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "Phase 4457 Jarvis Video Manual Provider Trial Execution Enablement",
  "Jarvis Video Studio Release Candidate Mega Batch"
) "aggregate smoke keeps the 4457 smoke in sequence"

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
  "Manual execution enablement"
)) {
  Assert-Contains $panelSource $needle "video studio panel contains $needle"
}

Assert-Ordered $panelSource @(
  'aria-label="Video generation control"',
  'aria-label="Manual execution enablement"',
  'aria-label="Manual provider trial capture"',
  'aria-label="Real provider adapter wiring"',
  'aria-label="Provider trial result review and recovery"',
  'aria-label="First gated provider trial runtime"',
  'aria-label="First gated provider trial preparation"',
  'aria-label="Result capture and audit join"',
  'aria-label="Server-only synthetic dry run"',
  'aria-label="Backend dry-run admission"'
) "/jarvis-video keeps the control console first and the manual execution enablement section above deeper diagnostics"

foreach ($needle in @(
  "manual provider trial execution enablement version",
  "manual execution mode",
  "manual gated trial reference",
  "manual capture/UX review reference",
  "provider adapter wiring reference",
  "provider trial runtime reference",
  "provider result review/recovery reference",
  "result capture envelope reference",
  "audit envelope reference",
  "approval join envelope reference",
  "prompt/brief digest reference",
  "settings digest reference",
  "safety notes digest reference",
  "provider adapter target reference",
  "provider credential slot reference using opaque token labels only, no secrets",
  "credential isolation requirement",
  "operator approval requirement",
  "manual confirmation requirement",
  "explicit cost acknowledgement requirement",
  "hard kill switch requirement",
  "idempotency requirement",
  "single-call lock requirement",
  "replay block requirement",
  "network egress approval requirement",
  "cost/rate/duration/resolution guard requirement",
  "timeout/cancel guard requirement",
  "safety gate requirement",
  "privacy/redaction gate requirement",
  "queue state: not dispatched",
  "worker state: not dispatched",
  "job state: not executed",
  "result state: not persisted",
  "audit state: not persisted",
  "approval state: not persisted",
  "artifact state: placeholder only",
  "retry/fallback state: disabled",
  "export/publish state: blocked",
  "execution enablement blockers",
  "manual run checklist",
  "next manual provider trial run capture/recovery checklist"
)) {
  Assert-Contains $serverSource $needle "server-only execution enablement model contains $needle"
}

foreach ($needle in @(
  "Manual provider trial execution path is enabled for gated operator review",
  "It is blocked by default",
  "Provider calls never run during validation",
  "Provider calls never run from frontend",
  "Manual confirmation is required",
  "Operator approval is required",
  "Credential isolation is required",
  "Kill switch must be off",
  "Queue/worker/job dispatch remain disabled",
  "Result/audit/approval persistence remain unimplemented",
  "Artifact handoff remains placeholder only",
  "Next step is first manual provider trial run capture and recovery",
  "manual execution enablement",
  "blocked by default",
  "manual run capture next",
  "manual provider trial execution enablement only",
  "provider call not executed during validation",
  "no live video generation during validation",
  "no frontend provider call",
  "hard kill switch required",
  "cost acknowledgement required",
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
  "first manual provider trial run capture/recovery in a future batch"
)) {
  Assert-Contains $serverSource $needle "server-only execution enablement markers contain $needle"
}

foreach ($needle in @(
  "buildStableManualExecutionEnablementKey",
  "listManualExecutionBlockers",
  "evaluateManualExecutionGates",
  "buildBlockedManualExecutionResult",
  "buildManualExecutionReadinessSummary",
  "buildNextManualRunCaptureRecoveryChecklist"
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
  "4362-4393",
  "4394-4425"
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
  "Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial",
  "Jarvis Video First Manual Provider Trial Result Capture and UX Review"
)) {
  Assert-Contains $serverSource $needle "server-only evidence label contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4457. Latest completed batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement. Previous completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review.",
  "Highest detected phase: 4457. Latest completed batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement. Previous completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review.",
  "Latest completed batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement",
  "Previous completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "Next likely batch: 4458-4489 - Jarvis Video First Manual Provider Trial Run Capture and Recovery",
  "manual provider trial execution enablement only",
  "blocked by default",
  "provider call not executed during validation",
  "no live video generation during validation",
  "no frontend provider call",
  "manual confirmation required",
  "operator approval required",
  "credential isolation required",
  "hard kill switch required",
  "cost acknowledgement required",
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
  "first manual provider trial run capture/recovery in a future batch"
)) {
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4457. Latest completed batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement. Previous completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review."
  "Highest detected phase: 4457. Latest completed batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement. Previous completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review."
  "Next likely batch: 4458-4489 - Jarvis Video First Manual Provider Trial Run Capture and Recovery"
)) {
  Assert-Contains $checkpointSmokeSource $needle "checkpoint docs smoke expects $needle"
}

foreach ($needle in @(
  "Batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement",
  "Mode: blocker review by default",
  "Execution posture: blocked by default",
  "This harness defaults to dry-run and blocker review. It never runs automatically.",
  "CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_ENABLED",
  "CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_CONFIRM",
  "I_UNDERSTAND_PROVIDER_COSTS_AND_APPROVE",
  "CODEXFORGE_JARVIS_VIDEO_OPERATOR_APPROVED",
  "CODEXFORGE_JARVIS_VIDEO_KILL_SWITCH",
  "CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_MODE",
  "MANUAL_GATED_TRIAL",
  "CODEXFORGE_JARVIS_VIDEO_PROVIDER_ADAPTER_TARGET_LABEL",
  "CODEXFORGE_JARVIS_VIDEO_PROVIDER_CREDENTIAL_ENV_VAR_NAME",
  "No provider call was attempted.",
  "No queue, worker, or job was dispatched.",
  "No result, audit, approval, or artifact state was persisted.",
  "adapter not wired for execution yet"
)) {
  Assert-Contains $manualScriptSource $needle "manual script contains $needle"
}

Assert-NotContains $allSmokeSource "manual-codexforge-jarvis-video-provider-trial.ps1" "manual provider trial script is not referenced by aggregate smoke"

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
  'Write-Host\s+.*\$env:',
  'Write-Output\s+.*\$env:',
  'Write-Host\s+.*Get-ChildItem\s+Env:',
  'Write-Output\s+.*Get-ChildItem\s+Env:'
)) {
  Assert-NotMatches $manualScriptSource $pattern "manual script does not echo secrets"
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

Write-Host "[OK] CodexForge Jarvis Video Manual Provider Trial Execution Enablement Mega Batch smoke passed."
