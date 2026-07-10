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

function Normalize-Whitespace {
  param([AllowEmptyString()][string]$Text)
  return ([regex]::Replace($Text, "\s+", " ")).Trim()
}

Write-Host "=== CodexForge Athena Cross-Workspace Run Timeline and Audit Memory Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$contentPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\jarvis-unified-product-ia-content.ts"
$videoPagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$videoPageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$navigationRegistryPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationRouteStatePath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-route-state.ts"
$commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"

$requiredPaths = @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $athenaPanelPath,
  $athenaModelPath,
  $contentPath,
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath,
  $checkpointPath,
  $runbookPath,
  $allSmokePath,
  $navigationTypesPath,
  $navigationRegistryPath,
  $navigationRouteStatePath,
  $commandRegistryPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$jarvisSource = Get-CombinedFileText @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homeShellPath,
  $athenaPanelPath,
  $athenaModelPath,
  $contentPath
)
$homeSource = Get-CombinedFileText @(
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $athenaModelPath,
  $contentPath
)
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$athenaModelSource = Get-Content -Raw $athenaModelPath
$athenaPageSource = Get-Content -Raw $athenaPagePath
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$docsNormalized = Normalize-Whitespace $docsSource
$allSmokeSource = Get-Content -Raw $allSmokePath
$navigationSource = Get-CombinedFileText @(
  $navigationTypesPath,
  $navigationRegistryPath,
  $navigationRouteStatePath,
  $commandRegistryPath
)

foreach ($needle in @(
  "4554-4585 - Athena Cross-Workspace Run Timeline and Audit Memory",
  "Athena Cross-Workspace Run Timeline and Audit Memory",
  "ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_AUDIT_MEMORY_PHASE = 4585",
  "ATHENA_PRODUCT_UX_POLISH_OPERATOR_HOME_TAKEOVER_BATCH",
  "ATHENA_CROSS_WORKSPACE_RUN_TIMELINE_PREVIEW_ITEMS",
  "ATHENA_AUDIT_MEMORY_PREVIEW_ITEMS",
  "buildStableAthenaTimelineKey",
  "buildStableAthenaAuditMemoryKey",
  "listCrossWorkspaceTimelineItems",
  "groupTimelineItemsByPlugin",
  "groupTimelineItemsByBlockedState",
  "buildTimelinePreviewForCommand",
  "buildAuditMemoryPreview",
  "buildBlockedStateSummary",
  "buildNextActionSummary",
  "buildProductPolishChecklist",
  'timelineVersion: "athena-cross-workspace-run-timeline-v1"',
  'timelineMode: "preview-only"',
  'auditMemoryVersion: "athena-audit-memory-preview-v1"',
  'memoryMode: "static-preview-only"',
  'runStatus: "not-executed"',
  'pluginExecutionState: "not-executed"',
  'providerState: "not-called"',
  'queueState: "not-dispatched"',
  'workerState: "not-dispatched"',
  'jobState: "not-executed"',
  'resultState: "not-persisted"',
  'auditState: "not-persisted"',
  'approvalState: "not-persisted"',
  "nextProductPolishChecklist",
  "no persistent memory",
  "no browser storage",
  "no localStorage",
  "no sessionStorage",
  "no IndexedDB",
  "no cookies",
  "no database writes",
  "Result capture is pending until approved backend execution exists."
)) {
  Assert-Contains $athenaModelSource $needle "typed Athena timeline or audit memory model contains $needle"
}

Assert-Contains $athenaPageSource 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Athena plugin registry",
  "Command router preview",
  "Approval-gated tool bridge",
  "Handoff packet preview",
  "Cross-workspace run timeline",
  "Audit memory preview",
  "Make a cinematic product video",
  "Jarvis Video Studio",
  "Build a landing page",
  "Jarvis Websites",
  "Create an avatar presenter",
  "Jarvis Avatar",
  "Review the audit trail",
  "Prepare an approval packet",
  "Show what is blocked",
  "Check provider readiness",
  "Review my projects",
  "No runs have executed from chat",
  "Audit memory is static preview only",
  "No persistent memory"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis Athena timeline or audit source contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Open Athena Command Center",
  "Open Jarvis Video Studio",
  "Athena helps you plan, route, review, and safely hand off AI work across CodexForge.",
  "Athena is the main chat control layer",
  "Athena can preview cross-workspace run timelines",
  "show audit memory previews",
  "Plugin execution remains blocked until approvals and backend gates are satisfied",
  "backend-only"
)) {
  Assert-Contains $homeNormalized $needle "home source contains $needle"
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
  "Video Studio URL: /jarvis-video"
)) {
  Assert-Contains $videoNormalized $needle "/jarvis-video preserves $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4585",
  "Latest completed batch: 4554-4585 - Athena Cross-Workspace Run Timeline and Audit Memory",
  "Previous completed batch: 4522-4553 - Athena Approval-Gated Tool Execution Bridge",
  "Next likely batch: 4586-4617 - Athena Product UX Polish and Operator Home Takeover",
  "Athena cross-workspace run timeline and audit memory only",
  "timeline is preview-only",
  "audit memory is static preview only",
  "no persistent memory",
  "no browser storage",
  "no database writes",
  "no prompt sending",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no autonomous execution",
  "no plugin execution",
  "no provider execution",
  "no live video generation",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "backend-only execution path required",
  "operator approval required",
  "kill switch required",
  "audit required"
)) {
  Assert-Contains $docsNormalized $needle "checkpoint docs contain $needle"
}

foreach ($needle in @(
  "Phase 4585 Athena Cross-Workspace Run Timeline and Audit Memory",
  "smoke-codexforge-athena-cross-workspace-run-timeline-audit-memory-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "aggregate smoke contains $needle"
}

Assert-Ordered $allSmokeSource @(
  "Phase 4457 Jarvis Video Manual Provider Trial Execution Enablement",
  "Phase 4489 Athena Unified Chat Control Plane Foundation",
  "Phase 4521 Athena Plugin Registry and Command Router",
  "Phase 4553 Athena Approval-Gated Tool Execution Bridge",
  "Phase 4585 Athena Cross-Workspace Run Timeline and Audit Memory",
  "Jarvis Video Studio Release Candidate Mega Batch"
) "aggregate smoke keeps the Athena timeline batch in sequence"

foreach ($pattern in @(
  '\bfetch\s*\(',
  'XMLHttpRequest',
  'WebSocket',
  'EventSource',
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
  'cookie\s*=',
  'child_process',
  'spawn\s*\(',
  'exec\s*\(',
  'execFile\s*\(',
  'Start-Process'
)) {
  Assert-NotMatches $jarvisSource $pattern "Athena and Jarvis frontend source stays inert"
  Assert-NotMatches $homeSource $pattern "home source stays inert"
}

foreach ($pattern in @(
  'Date\.now\s*\(',
  'Math\.random\s*\(',
  'crypto\.',
  'process\.env',
  'fs\.',
  'readFile',
  'writeFile'
)) {
  Assert-NotMatches $athenaModelSource $pattern "Athena timeline and audit helpers stay deterministic and in-memory only"
}

foreach ($pattern in @(
  ':\s*any\b',
  '<\s*any\s*>',
  'as any',
  'Array<any>',
  '@ts-nocheck',
  '@ts-expect-error'
)) {
  Assert-NotMatches $jarvisSource $pattern "Athena and Jarvis source avoids unsafe TypeScript escapes"
}

foreach ($pattern in @(
  '\bhref\s*:\s*string\b',
  '\bhref\?\s*:\s*string\b',
  '\bcommandDeckRole\s*:\s*string\b',
  '\bcommandDeckRole\?\s*:\s*string\b'
)) {
  Assert-NotMatches $navigationSource $pattern "navigation typing stays strict"
}

Write-Host "[OK] CodexForge Athena Cross-Workspace Run Timeline and Audit Memory Mega Batch smoke passed."
