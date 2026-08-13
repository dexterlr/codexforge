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

function Get-CombinedFileText {
  param([string[]]$Paths)
  return ($Paths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
}

function Normalize-Whitespace {
  param([AllowEmptyString()][string]$Text)
  return ([regex]::Replace($Text, "\s+", " ")).Trim()
}

Write-Host "=== CodexForge AI Model Provider Registry and Capability Matrix Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$videoPagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$videoPageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$providersPageClientPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$providerPanelPath = Join-Path $root "src\lib\codexforge\ai-provider-registry\components\AiProviderRegistryPanel.tsx"
$providerTypesPath = Join-Path $root "src\lib\codexforge\ai-provider-registry\ai-provider-registry-types.ts"
$providerCatalogPath = Join-Path $root "src\lib\codexforge\ai-provider-registry\ai-model-provider-registry-catalog.ts"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$navigationTypesPath = Join-Path $root "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"

$requiredPaths = @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $videoPagePath,
  $videoPageClientPath,
  $providersPageClientPath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $providerPanelPath,
  $providerTypesPath,
  $providerCatalogPath,
  $videoPanelPath,
  $allSmokePath,
  $checkpointCurrentPath,
  $runbookPath,
  $navigationTypesPath
)

foreach ($path in $requiredPaths) {
  Assert-FileExists $path
}

$jarvisSource = Get-CombinedFileText @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath
)
$homeSource = Get-CombinedFileText @(
  $homePagePath,
  $homePageClientPath,
  $homeShellPath,
  $athenaModelPath
)
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$providerSource = Get-CombinedFileText @(
  $providersPageClientPath,
  $providerPanelPath,
  $providerTypesPath,
  $providerCatalogPath
)
$typedModelSource = Get-CombinedFileText @(
  $providerTypesPath,
  $providerCatalogPath,
  $athenaModelPath
)
$frontendPreviewSource = Get-CombinedFileText @(
  $jarvisPagePath,
  $jarvisPageClientPath,
  $athenaPagePath,
  $homePagePath,
  $homePageClientPath,
  $providersPageClientPath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $providerPanelPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$runbookSource = Get-Content -Raw $runbookPath
$navigationTypesSource = Get-Content -Raw $navigationTypesPath

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$providerNormalized = Normalize-Whitespace $providerSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource
$runbookNormalized = Normalize-Whitespace $runbookSource

foreach ($needle in @(
  "4682-4713 - AI Model Provider Registry and Capability Matrix",
  "4713",
  "AI Model Provider Registry and Capability Matrix"
)) {
  Assert-Contains ($jarvisNormalized + " " + $providerNormalized + " " + $checkpointNormalized) $needle "batch marker contains $needle"
}

foreach ($needle in @(
  "Jarvis",
  "Jarvis Chat",
  "AI model provider registry",
  "Capability matrix",
  "Provider selection preview",
  "Provider slots are registry-only",
  "No model calls yet",
  "No prompt sending",
  "No provider SDKs imported",
  "Server-only adapters required",
  "Credential isolation required",
  "Operator approval required",
  "Kill switch required",
  "Audit required",
  "text/chat",
  "code",
  "image",
  "video",
  "audio/voice",
  "transcription",
  "embeddings/search",
  "safety/moderation",
  "local inference"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Open Jarvis Chat",
  "Open Jarvis Video Studio",
  "dry-run harness is fixture-only",
  "no model calls yet",
  "no prompt sending"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Jarvis can review model provider slots",
  "CodexForge / Jarvis Model Gateway",
  "Jarvis Chat",
  "Open Jarvis Chat",
  "Jarvis model routing and provider selection preview comes next",
  "Provider slots are registry-only",
  "No model calls yet",
  "No prompt sending"
)) {
  Assert-Contains $providerNormalized $needle "provider page contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Generate video - locked"
)) {
  Assert-Contains $videoNormalized $needle "/jarvis-video preserves $needle"
}

foreach ($needle in @(
  'registryVersion: "athena-jarvis-model-gateway-registry-v1"',
  'source: "CodexForge / Jarvis Model Gateway"',
  '"Jarvis Chat"',
  'registryMode: "preview-only"',
  'providerStatus: "registry-only / not connected"',
  'capabilityMatrix: CAPABILITY_MATRIX',
  'providerSelectionPreview: PROVIDER_SELECTION_PREVIEW',
  "Provider slots are registry-only",
  "No model calls yet",
  "No prompt sending",
  "No provider SDKs imported",
  "Server-only adapters required",
  "Credential isolation required",
  "4714-4745 - Server-Only Model Adapter Contracts",
  "Define request and response envelopes for each provider family.",
  "Keep credentials as opaque backend-only references.",
  "Manual gated model adapter dry-run harness",
  "provider slots are visible in CodexForge",
  "Define server-only planning adapter contracts for Jarvis command normalization"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'Phase 4713 AI Model Provider Registry and Capability Matrix',
  'smoke-codexforge-ai-model-provider-registry-capability-matrix-mega-batch.ps1',
  '4682-4713 - AI Model Provider Registry and Capability Matrix'
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke references $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4809",
  "Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery",
  "Previous completed batch: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness",
  "Next likely batch: 4810-4841 - Athena Model Routing and Provider Selection Preview"
)) {
  Assert-Contains $checkpointNormalized $needle "checkpoint current doc contains $needle"
  Assert-Contains $runbookNormalized $needle "runbook contains $needle"
}

Assert-NotMatches $frontendPreviewSource '(?m)^\s*import\s+.+from\s+["''][^"'']*(openai|anthropic|generative-ai|genai|mistral|replicate|fal-ai|elevenlabs|assemblyai|deepgram|groq|ollama)[^"'']*["'']' "frontend Athena/Jarvis files do not import provider SDKs"
Assert-NotMatches $frontendPreviewSource '\bfetch\s*\(' "frontend Athena/Jarvis files do not call fetch"
Assert-NotMatches $frontendPreviewSource '\baxios\b' "frontend Athena/Jarvis files do not call axios"
Assert-NotMatches $frontendPreviewSource '\bXMLHttpRequest\b' "frontend Athena/Jarvis files do not use XMLHttpRequest"
Assert-NotMatches $frontendPreviewSource '\bnavigator\.sendBeacon\b' "frontend Athena/Jarvis files do not use sendBeacon"
Assert-NotMatches $frontendPreviewSource '\bwindow\.localStorage\b|\blocalStorage\.' "frontend Athena/Jarvis files do not use localStorage"
Assert-NotMatches $frontendPreviewSource '\bwindow\.sessionStorage\b|\bsessionStorage\.' "frontend Athena/Jarvis files do not use sessionStorage"
Assert-NotMatches $frontendPreviewSource '\bwindow\.indexedDB\b|\bindexedDB\.' "frontend Athena/Jarvis files do not use IndexedDB"
Assert-NotMatches $frontendPreviewSource '\bdocument\.cookie\b|\bcookieStore\.' "frontend Athena/Jarvis files do not use cookies"
Assert-NotMatches $frontendPreviewSource '\bchild_process\b|\bexec\s*\(|\bspawn\s*\(|\bexeca\b|\bBun\.spawn\b|\bDeno\.Command\b' "frontend Athena/Jarvis files do not execute shell or process commands"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing stays Route"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole typing stays strict"
Assert-NotMatches $navigationTypesSource 'export type CodexForgeNavigationRouteHref\s*=\s*string;' "route href typing is not loosened to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole:\s*string\b' "commandDeckRole is not loosened to string"

Write-Host "[PASS] CodexForge AI model provider registry and capability matrix smoke completed"
