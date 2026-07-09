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

Write-Host "=== CodexForge Athena Plugin Registry and Command Router Mega Batch smoke ==="

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
$athenaModelSource = Get-Content -Raw $athenaModelPath
$athenaPageSource = Get-Content -Raw $athenaPagePath
$docsSource = Get-CombinedFileText @($checkpointPath, $runbookPath)
$allSmokeSource = Get-Content -Raw $allSmokePath
$navigationSource = Get-CombinedFileText @(
  $navigationTypesPath,
  $navigationRegistryPath,
  $navigationRouteStatePath,
  $commandRegistryPath
)

foreach ($needle in @(
  "4490-4521 - Athena Plugin Registry and Command Router",
  "Athena Plugin Registry and Command Router",
  "ATHENA_PLUGIN_REGISTRY_COMMAND_ROUTER_PHASE = 4521",
  "ATHENA_PLUGIN_REGISTRY_PREVIEW",
  "ATHENA_COMMAND_INTENTS",
  "buildStableAthenaPluginKey",
  "buildStableAthenaCommandKey",
  "listAthenaPlugins",
  "listAthenaCommandIntents",
  "resolveStaticAthenaCommandIntent",
  "resolveStaticAthenaCommandIntentByExactSamplePhrase",
  "buildAthenaRoutePreview",
  "buildAthenaBlockedActionSummary",
  "buildAthenaApprovalRequirementsSummary",
  "buildAthenaAuditRequirementsSummary"
)) {
  Assert-Contains $jarvisSource $needle "Athena router foundation source contains $needle"
}

Assert-Contains $athenaPageSource 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Ask Athena to plan, route, review, and safely hand off work across CodexForge.",
  "Athena plugin registry",
  "Command router preview",
  "Make a cinematic product video",
  "Jarvis Video Studio",
  "Build a landing page",
  "Jarvis Websites",
  "Create an avatar presenter",
  "Jarvis Avatar",
  "Review the audit trail",
  "Audit / Runs",
  "Prepare an approval packet",
  "Show what is blocked",
  "Check provider readiness",
  "Review my projects",
  "No plugin execution from chat yet"
)) {
  Assert-Contains $jarvisSource $needle "/jarvis Athena source contains $needle"
}

foreach ($needle in @(
  'routeHref: "/jarvis-video"',
  'routeHref: "/jarvis-websites"',
  'routeHref: "/jarvis-avatar"',
  'routeHref: "/jarvis-workflows"',
  'routeHref: "/jarvis-audit"',
  'routeHref: "/ai-providers"',
  'routeHref: "/video-assets"',
  'routeHref: "/video-projects"',
  'routeHref: "/jarvis-safety"',
  'routeHref: "/jarvis-trading"',
  'routeHref: "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring"',
  'routeTarget: "/approval-queue"'
)) {
  Assert-Contains $athenaModelSource $needle "Athena registry or router route exists for $needle"
}

foreach ($needle in @(
  "Jarvis Video Studio",
  "Jarvis Websites",
  "Jarvis Avatar",
  "Jarvis Workflows",
  "Audit / Runs",
  "Providers",
  "Assets",
  "Projects",
  "Safety / Settings",
  "Trading",
  "Developer / Checkpoints",
  "Athena knows the specialist workspaces",
  "Execution remains approval-gated",
  "Backend-only execution required",
  "No plugin execution from chat yet"
)) {
  Assert-Contains $jarvisSource $needle "Athena registry or posture marker contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Open Athena Command Center",
  "Open Jarvis Video Studio",
  "Athena helps you plan, route, review, and safely hand off AI work across CodexForge.",
  "Athena is the main chat control layer.",
  "backend-only"
)) {
  Assert-Contains $homeSource $needle "home source contains $needle"
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
  Assert-Contains $videoSource $needle "/jarvis-video preserves $needle"
}

foreach ($needle in @(
  "Athena plugin registry and command router only. Plugin registry is inert. Command router is preview-only. Chat input stays local and executes nothing.",
  "Jarvis Video Studio",
  "Jarvis Websites",
  "Jarvis Avatar",
  "Jarvis Workflows",
  "Audit / Runs",
  "Providers",
  "Assets",
  "Projects",
  "Safety / Settings",
  "Trading",
  "Developer / Checkpoints",
  "video-generation-intent",
  "website-build-intent",
  "avatar-presenter-intent",
  "audit-review-intent",
  "provider-readiness-intent",
  "safety-review-intent",
  "video brief intent",
  "website build intent",
  "avatar presenter intent",
  "audit review intent",
  "provider readiness intent",
  "safety review intent",
  "preview-only",
  "no autonomous execution"
)) {
  Assert-Contains $athenaModelSource $needle "typed Athena model contains $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4521",
  "Latest completed batch: 4490-4521 - Athena Plugin Registry and Command Router",
  "Previous completed batch: 4458-4489 - Athena Unified Chat Control Plane Foundation",
  "Next likely batch: 4522-4553 - Athena Approval-Gated Tool Execution Bridge",
  "Athena plugin registry and command router only",
  "plugin registry is inert",
  "command router is preview-only",
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
  Assert-Contains $docsSource $needle "checkpoint docs contain $needle"
}

foreach ($needle in @(
  "Phase 4521 Athena Plugin Registry and Command Router",
  "smoke-codexforge-athena-plugin-registry-command-router-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "aggregate smoke contains $needle"
}

Assert-Ordered $allSmokeSource @(
  "Phase 4457 Jarvis Video Manual Provider Trial Execution Enablement",
  "Phase 4489 Athena Unified Chat Control Plane Foundation",
  "Phase 4521 Athena Plugin Registry and Command Router",
  "Jarvis Video Studio Release Candidate Mega Batch"
) "aggregate smoke keeps the Athena router batch in sequence"

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
  Assert-NotMatches $athenaModelSource $pattern "Athena router helpers stay deterministic and in-memory only"
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
  '\bcommandDeckRole\s*:\s*string\b'
)) {
  Assert-NotMatches $navigationSource $pattern "navigation typing stays strict"
}

Write-Host "[OK] CodexForge Athena Plugin Registry and Command Router Mega Batch smoke passed."
