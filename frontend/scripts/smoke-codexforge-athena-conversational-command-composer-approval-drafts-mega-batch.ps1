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

Write-Host "=== CodexForge Athena Conversational Command Composer and Approval Drafts Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$athenaStatusPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaOperatorStatusPanel.tsx"
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
  $athenaStatusPanelPath,
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
  $athenaStatusPanelPath,
  $athenaModelPath,
  $contentPath
)
$homeSource = Get-CombinedFileText @(
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $athenaStatusPanelPath,
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
  "4618-4649 - Athena Conversational Command Composer and Approval Drafts",
  "Athena Conversational Command Composer and Approval Drafts",
  "ATHENA_CONVERSATIONAL_COMMAND_COMPOSER_APPROVAL_DRAFTS_PHASE",
  "ATHENA_CONVERSATIONAL_COMMAND_COMPOSER_APPROVAL_DRAFTS_MARKERS",
  "ATHENA_MODEL_PROVIDER_REGISTRY_CAPABILITY_MATRIX_BATCH",
  "buildStableAthenaCommandComposerKey",
  "buildStableAthenaApprovalDraftKey",
  "listAthenaCommandDraftExamples",
  "listAthenaApprovalDraftExamples",
  "composeStaticAthenaCommandDraftByExactSamplePhrase",
  "composeStaticAthenaCommandDraftByIntentId",
  "buildAthenaMissingInformationPrompts",
  "buildAthenaApprovalDraftPreview",
  "buildAthenaBlockedComposerSummary",
  "nextServerOnlyAdapterChecklist",
  'commandComposerVersion: "athena-conversational-command-composer-v1"',
  'composerMode: "preview-only"',
  'approvalDraftVersion: "athena-approval-draft-preview-v1"',
  'approvalDraftMode: "preview-only"',
  'chatInputState: "inert/local only"',
  'noPromptSendingStatement: "No prompt sending"',
  'noModelCallStatement: "No model calls yet"',
  'executionPosture: "blocked-by-default"',
  "No prompt sending",
  "No model calls yet",
  "No plugin execution from chat yet",
  "no persistent memory",
  "no browser storage",
  "AI model provider registry"
)) {
  Assert-Contains $athenaModelSource $needle "typed Athena conversational composer model contains $needle"
}

Assert-Contains $athenaPageSource 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Your upper Jarvis layer",
  "Plan, route, review, and safely hand off work across CodexForge",
  "Conversational command composer",
  "Approval draft preview",
  "Athena can draft structured commands from natural requests",
  "Composer is preview-only",
  "Chat input remains inert/local only",
  "No prompt sending",
  "No model calls yet",
  "No plugin execution from chat yet",
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
  "Model calls: not connected yet"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis Athena conversational composer source contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena is the main Jarvis control layer",
  "Open Athena Command Center",
  "Open Jarvis Video Studio",
  "Athena can draft structured commands",
  "Athena can draft approval packets",
  "Athena can now preview AI model provider slots",
  "server-only adapter contracts come next",
  "Plugin execution remains blocked until approvals and backend gates are satisfied"
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
  "Highest detected phase: 4649",
  "Latest completed batch: 4618-4649 - Athena Conversational Command Composer and Approval Drafts",
  "Previous completed batch: 4586-4617 - Athena Product UX Polish and Operator Home Takeover",
  "Next likely batch: 4650-4681 - CodexForge Full Smoke Harness Triage and Required Release Gate",
  "Athena conversational command composer and approval drafts only",
  "command composer is preview-only",
  "approval drafts are preview-only",
  "chat input remains inert/local only",
  "no prompt sending",
  "no LLM/model calls",
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
  "no persistent memory",
  "no browser storage",
  "no database writes",
  "backend-only execution path required",
  "operator approval required",
  "kill switch required",
  "audit required",
  "model provider registry next"
)) {
  Assert-Contains $docsNormalized $needle "checkpoint docs contain $needle"
}

foreach ($needle in @(
  "Phase 4649 Athena Conversational Command Composer and Approval Drafts",
  "smoke-codexforge-athena-conversational-command-composer-approval-drafts-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "aggregate smoke contains $needle"
}

Assert-Ordered $allSmokeSource @(
  "Phase 4457 Jarvis Video Manual Provider Trial Execution Enablement",
  "Phase 4489 Athena Unified Chat Control Plane Foundation",
  "Phase 4521 Athena Plugin Registry and Command Router",
  "Phase 4553 Athena Approval-Gated Tool Execution Bridge",
  "Phase 4585 Athena Cross-Workspace Run Timeline and Audit Memory",
  "Phase 4617 Athena Product UX Polish and Operator Home Takeover",
  "Phase 4649 Athena Conversational Command Composer and Approval Drafts",
  "Jarvis Video Studio Release Candidate Mega Batch"
) "aggregate smoke keeps the Athena conversational composer batch in sequence"

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
  '\bfs\.',
  'readFile',
  'writeFile'
)) {
  Assert-NotMatches $athenaModelSource $pattern "Athena composer helpers stay deterministic and in-memory only"
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

Write-Host "[OK] CodexForge Athena Conversational Command Composer and Approval Drafts Mega Batch smoke passed."
