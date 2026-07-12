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

Write-Host "=== CodexForge Server-Only Model Adapter Contracts Mega Batch smoke ==="

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
$providerCatalogPath = Join-Path $root "src\lib\codexforge\ai-provider-registry\ai-model-provider-registry-catalog.ts"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$adapterTypesPath = Join-Path $root "src\lib\codexforge\server-only-model-adapter-contracts\server-only-model-adapter-contracts-types.ts"
$adapterCatalogPath = Join-Path $root "src\lib\codexforge\server-only-model-adapter-contracts\server-only-model-adapter-contracts-catalog.ts"
$adapterIndexPath = Join-Path $root "src\lib\codexforge\server-only-model-adapter-contracts\index.ts"
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
  $providerCatalogPath,
  $videoPanelPath,
  $adapterTypesPath,
  $adapterCatalogPath,
  $adapterIndexPath,
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
  $providerCatalogPath
)
$typedModelSource = Get-CombinedFileText @(
  $adapterTypesPath,
  $adapterCatalogPath,
  $adapterIndexPath,
  $athenaModelPath,
  $providerPanelPath
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
  $providerPanelPath,
  $providerCatalogPath,
  $adapterTypesPath,
  $adapterCatalogPath
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
  "4714-4745 - Server-Only Model Adapter Contracts",
  "4745",
  "Server-Only Model Adapter Contracts"
)) {
  Assert-Contains ($jarvisNormalized + " " + $providerNormalized + " " + $typedModelNormalized + " " + $checkpointNormalized) $needle "batch marker contains $needle"
}

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "AI model provider registry",
  "Capability matrix",
  "Server-only model adapter contracts",
  "Adapter envelope preview",
  "Server-only adapter gates",
  "model adapters must run server-only",
  "frontend provider calls are blocked",
  "No model calls yet",
  "No prompt sending",
  "No provider SDKs imported",
  "opaque credential references only",
  "operator approval required",
  "kill switch required",
  "audit required",
  "Manual gated model adapter dry-run harness",
  "dry-run result review and recovery comes next",
  "request envelope preview",
  "response envelope preview",
  "error envelope preview"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena is the main Jarvis control layer",
  "Open Athena Command Center",
  "Open Jarvis Video Studio",
  "Athena can now preview server-only model adapter contracts",
  "Athena can now preview manual gated model adapter dry-runs",
  "dry-run harness is fixture-only",
  "dry-run result review and recovery comes next",
  "no model calls yet",
  "no prompt sending"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
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
  'SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_BATCH =',
  'SERVER_ONLY_MODEL_ADAPTER_CONTRACTS_PHASE = 4745',
  'MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH =',
  'contractVersion: "jarvis-model-gateway-server-only-model-adapter-contract-v1"',
  'source: "Jarvis Model Gateway / Athena"',
  'contractMode: "preview-only"',
  'adapterPosture: "server-only required"',
  'frontendPosture: "blocked"',
  'providerCallPosture: "not implemented"',
  'modelCallPosture: "not implemented"',
  'promptSendingPosture: "not implemented"',
  'sdkPosture: "no SDK imports"',
  'credentialPosture: "opaque credential references only"',
  'secretPosture: "no plaintext secrets"',
  'environmentPosture: "no env var reads"',
  'executionPosture: "blocked by default"',
  'requestEnvelopeVersion: "jarvis-model-gateway-request-envelope-preview-v1"',
  'responseEnvelopeVersion: "jarvis-model-gateway-response-envelope-preview-v1"',
  'errorEnvelopeVersion: "jarvis-model-gateway-error-envelope-preview-v1"',
  'promptPayloadPosture: "redacted placeholder only"',
  'providerResponseState: "not received"',
  'resultState: "placeholder only"',
  'retryFallbackPosture: "disabled"',
  "manual gated dry-run harness comes next",
  "buildStableModelAdapterContractKey",
  "buildStableModelAdapterRequestEnvelopeKey",
  "buildStableModelAdapterResponseEnvelopeKey",
  "buildStableModelAdapterErrorEnvelopeKey",
  "listServerOnlyModelAdapterContracts",
  "listModelAdapterRequestEnvelopePreviews",
  "listModelAdapterResponseEnvelopePreviews",
  "listModelAdapterErrorEnvelopePreviews",
  "listServerOnlyAdapterGateChecklist",
  "groupAdapterContractsByCapabilityFamily",
  "groupAdapterContractsByWorkspaceTarget",
  "buildAdapterReadinessSummary",
  "buildBlockedModelExecutionSummary",
  "buildNextManualGatedDryRunChecklist"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'Phase 4745 Server-Only Model Adapter Contracts',
  'smoke-codexforge-server-only-model-adapter-contracts-mega-batch.ps1',
  '4714-4745 - Server-Only Model Adapter Contracts'
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke references $needle"
}

foreach ($needle in @(
  "Highest detected phase: 4777",
  "Latest completed batch: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness",
  "Previous completed batch: 4714-4745 - Server-Only Model Adapter Contracts",
  "Next likely batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery"
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
Assert-NotMatches $frontendPreviewSource '\bchild_process\b|\bexec\s*\(|\bspawn\s*\(|\bexeca\b|\bBun\.spawn\b|\bDeno\.Command\b|\bStart-Process\b' "frontend Athena/Jarvis files do not execute shell or process commands"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing stays Route"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole typing stays strict"
Assert-NotMatches $navigationTypesSource 'export type CodexForgeNavigationRouteHref\s*=\s*string;' "route href typing is not loosened to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole:\s*string\b' "commandDeckRole is not loosened to string"

Write-Host "[PASS] CodexForge Server-Only Model Adapter Contracts smoke completed"
