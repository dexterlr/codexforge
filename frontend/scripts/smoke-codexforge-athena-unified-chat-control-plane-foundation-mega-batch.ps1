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

Write-Host "=== CodexForge Athena Unified Chat Control Plane Foundation Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$homeStylesPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.module.css"
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
$commandRegistryPath = Join-Path $root "src\lib\codexforge\command-palette\command-registry.ts"

$requiredPaths = @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $homeStylesPath,
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
  $commandRegistryPath
)

foreach ($needle in @(
  "4458-4489 - Athena Unified Chat Control Plane Foundation",
  "Athena Unified Chat Control Plane Foundation",
  "ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_PHASE = 4489",
  "highestDetectedPhase: ATHENA_UNIFIED_CHAT_CONTROL_PLANE_FOUNDATION_PHASE",
  "ATHENA_CONTROL_PLANE_IDENTITY",
  "ATHENA_SUGGESTED_PROMPTS",
  "ATHENA_PLUGIN_REGISTRY_PREVIEW",
  "ATHENA_SAFETY_GATES",
  "ATHENA_COMMAND_INTENTS"
)) {
  Assert-Contains $jarvisSource $needle "Athena foundation source contains $needle"
}

Assert-Contains $athenaPageSource 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Ask Athena to plan, route, review, and safely hand off work across CodexForge.",
  "Make a cinematic product video",
  "Build a landing page",
  "Create an avatar presenter",
  "Review the audit trail",
  "Prepare an approval packet",
  "Show what is blocked"
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
  'routeHref: "/jarvis-safety"'
)) {
  Assert-Contains $athenaModelSource $needle "Athena plugin launcher route exists for $needle"
}

foreach ($needle in @(
  "Jarvis Video Studio",
  "Jarvis Websites",
  "Jarvis Avatar",
  "Jarvis Workflows",
  "Audit / Runs",
  "Providers",
  "Safety",
  "Athena can plan and route",
  "Execution remains approval-gated",
  "Provider calls stay backend-only",
  "No autonomous execution",
  "Kill switch and audit remain required"
)) {
  Assert-Contains $jarvisSource $needle "Athena launcher or safety marker contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Open Jarvis Chat",
  "Open Jarvis Video Studio",
  "Athena helps you plan, route, review, and safely hand off AI work across CodexForge.",
  "What can Athena do now?",
  "What stays locked?"
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
  "Athena is the main chat operator brain above all specialist Jarvis workspaces.",
  "Athena operator input",
  "Draft an operator request for Athena. This stays local to the page and executes nothing.",
  "pluginRegistryPreview: ATHENA_PLUGIN_REGISTRY_PREVIEW",
  "Athena unified chat control plane foundation only. Chat input is inert/local only.",
  "video brief intent",
  "website build intent",
  "avatar presenter intent",
  "workflow automation intent",
  "audit review intent",
  "provider readiness intent",
  "safety review intent",
  "approval packet intent",
  "no autonomous execution"
)) {
  Assert-Contains $athenaModelSource $needle "typed Athena model contains $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4489",
  "Latest completed batch: 4458-4489 - Athena Unified Chat Control Plane Foundation",
  "Previous completed batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement",
  "Next likely batch: 4490-4521 - Athena Plugin Registry and Command Router",
  "Athena unified chat control plane foundation only",
  "chat input is inert/local only",
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
  "Phase 4489 Athena Unified Chat Control Plane Foundation",
  "smoke-codexforge-athena-unified-chat-control-plane-foundation-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "aggregate smoke contains $needle"
}

Assert-Ordered $allSmokeSource @(
  "Phase 4425 Jarvis Video First Manual Provider Trial Result Capture and UX Review",
  "Phase 4457 Jarvis Video Manual Provider Trial Execution Enablement",
  "Phase 4489 Athena Unified Chat Control Plane Foundation",
  "Jarvis Video Studio Release Candidate Mega Batch"
) "aggregate smoke keeps the Athena batch in sequence"

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

Write-Host "[OK] CodexForge Athena Unified Chat Control Plane Foundation Mega Batch smoke passed."
