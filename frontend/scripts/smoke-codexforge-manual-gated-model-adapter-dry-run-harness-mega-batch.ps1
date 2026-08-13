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

function Get-SourceFiles {
  param([string[]]$Paths)

  $files = @()
  foreach ($path in $Paths) {
    if (-not (Test-Path $path)) {
      continue
    }

    $item = Get-Item $path
    if ($item.PSIsContainer) {
      $files += Get-ChildItem -Path $item.FullName -Recurse -File | Where-Object {
        @(".ts", ".tsx", ".js", ".jsx") -contains $_.Extension
      }
    } else {
      $files += $item
    }
  }

  return @($files | Sort-Object -Property FullName -Unique)
}

function Get-CombinedFileText {
  param([string[]]$Paths)
  return ($Paths | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
}

function Get-CombinedSourceText {
  param([System.IO.FileInfo[]]$Files)
  return ($Files | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
}

function Normalize-Whitespace {
  param([AllowEmptyString()][string]$Text)
  return ([regex]::Replace($Text, "\s+", " ")).Trim()
}

Write-Host "=== CodexForge Manual Gated Model Adapter Dry-Run Harness Mega Batch smoke ==="

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
$harnessTypesPath = Join-Path $root "src\lib\codexforge\manual-gated-model-adapter-dry-run-harness\manual-gated-model-adapter-dry-run-harness-types.ts"
$harnessCatalogPath = Join-Path $root "src\lib\codexforge\manual-gated-model-adapter-dry-run-harness\manual-gated-model-adapter-dry-run-harness-catalog.ts"
$harnessIndexPath = Join-Path $root "src\lib\codexforge\manual-gated-model-adapter-dry-run-harness\index.ts"
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
  $harnessTypesPath,
  $harnessCatalogPath,
  $harnessIndexPath,
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
  $harnessTypesPath,
  $harnessCatalogPath,
  $harnessIndexPath,
  $athenaModelPath,
  $providerPanelPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$runbookSource = Get-Content -Raw $runbookPath
$navigationTypesSource = Get-Content -Raw $navigationTypesPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\ai-providers"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\ai-provider-registry"),
  (Join-Path $root "src\lib\codexforge\manual-gated-model-adapter-dry-run-harness"),
  (Join-Path $root "src\lib\codexforge\server-only-model-adapter-contracts"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$providerNormalized = Normalize-Whitespace $providerSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource
$runbookNormalized = Normalize-Whitespace $runbookSource

foreach ($needle in @(
  "4746-4777 - Manual Gated Model Adapter Dry-Run Harness",
  "4777",
  "Manual Gated Model Adapter Dry-Run Harness"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $providerNormalized + " " + $typedModelNormalized + " " + $checkpointNormalized) $needle "batch marker contains $needle"
}

Assert-Contains $athenaPagePath 'src\app\athena\page.tsx' "athena alias file path preserved"
Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "AI model provider registry",
  "Capability matrix",
  "Server-only model adapter contracts",
  "Adapter envelope preview",
  "Server-only adapter gates",
  "Manual gated model adapter dry-run harness",
  "Dry-run scenario preview",
  "Fixture result preview",
  "Manual dry-run gates",
  "dry-run harness is fixture-only",
  "manual operator approval is required",
  "manual confirmation is required",
  "kill switch required",
  "audit required",
  "server-only adapter contract required",
  "No model calls yet",
  "No prompt sending",
  "No provider SDKs imported",
  "provider execution is blocked",
  "Athena model routing and provider selection preview comes next",
  "text planning",
  "code assistance",
  "image storyboard",
  "video prompt planning",
  "audio narration",
  "transcription/caption",
  "embeddings/search",
  "safety/moderation",
  "local/private inference"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena is the main Jarvis control layer",
  "Open Jarvis Chat",
  "Open Jarvis Video Studio",
  "Athena can now preview manual gated model adapter dry-runs",
  "Athena can now preview model adapter dry-run result reviews",
  "dry-run harness is fixture-only",
  "Athena model routing and provider selection preview comes next",
  "no model calls yet",
  "no prompt sending"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Video generation control",
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
  'MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_BATCH = "4746-4777 - Manual Gated Model Adapter Dry-Run Harness"',
  'MANUAL_GATED_MODEL_ADAPTER_DRY_RUN_HARNESS_PHASE = 4777',
  'harnessMode: "manual gated dry-run only"',
  'fixtureMode: "fixture-only"',
  'providerCallPosture: "not implemented"',
  'modelCallPosture: "not implemented"',
  'promptSendingPosture: "not implemented"',
  'sdkPosture: "no SDK imports"',
  'credentialPosture: "opaque credential references only"',
  'secretPosture: "no plaintext secrets"',
  'environmentPosture: "no env var reads"',
  'frontendPosture: "blocked"',
  'backendPosture: "server-only required"',
  'executionPosture: "blocked by default"',
  'manualOperatorApprovalRequired: "manual operator approval required"',
  'manualConfirmationRequired: "manual confirmation required"',
  'killSwitchRequired: "kill switch required"',
  'auditRequired: "audit required"',
  'resultPersistenceState: "result persistence not implemented"',
  'auditPersistenceState: "audit persistence not implemented"',
  'approvalPersistenceState: "approval persistence not implemented"',
  "text planning dry-run scenario",
  "code assistance dry-run scenario",
  "image storyboard dry-run scenario",
  "video prompt planning dry-run scenario",
  "audio narration dry-run scenario",
  "transcription/caption dry-run scenario",
  "embeddings/search dry-run scenario",
  "safety/moderation dry-run scenario",
  "local/private inference dry-run scenario",
  'REQUEST_PACKET_VERSION = "jarvis-model-gateway-dry-run-request-packet-preview-v1"',
  'promptPayloadPosture: "redacted placeholder only"',
  'promptTransmissionState: "not sent"',
  'fixtureInputState: "static fixture only"',
  'credentialReferencePosture: "opaque label only"',
  'approvalReferencePosture: "preview-only"',
  'auditReferencePosture: "preview-only"',
  'idempotencyKeyPosture: "deterministic preview key only"',
  'FIXTURE_RESULT_VERSION = "jarvis-model-gateway-dry-run-fixture-result-preview-v1"',
  'SHARED_FIXTURE_RESULT_STATE = "static placeholder only"',
  'providerResponseState: "not received"',
  'modelOutputState: "not generated"',
  'tokenCostAccountingState: "estimated placeholder only"',
  'resultCaptureState: "not implemented"',
  'failureRecoveryState: "not implemented"',
  'DENIAL_FAILURE_VERSION = "jarvis-model-gateway-dry-run-denial-preview-v1"',
  'retryFallbackPosture: "disabled"',
  'recoveryPosture: "future manual review only"',
  'auditPosture: "not persisted"',
  "operator approval",
  "manual confirmation",
  "single dry-run lock",
  "no persistence until future backend batch",
  "buildStableModelAdapterDryRunHarnessKey",
  "buildStableDryRunScenarioKey",
  "buildStableDryRunRequestPacketKey",
  "buildStableDryRunFixtureResultKey",
  "buildStableDryRunDenialFailureKey",
  "listManualGatedModelAdapterDryRunScenarios",
  "listDryRunRequestPacketPreviews",
  "listDryRunFixtureResultPreviews",
  "listDryRunDenialFailurePreviews",
  "listManualDryRunGateChecklist",
  "groupDryRunScenariosByCapabilityFamily",
  "groupDryRunScenariosByWorkspaceTarget",
  "buildDryRunReadinessSummary",
  "buildBlockedDryRunExecutionSummary",
  "buildNextResultReviewAndRecoveryChecklist",
  "No model calls yet",
  "No prompt sending",
  "No provider SDKs imported",
  "opaque credential references only",
  "dry-run result review and recovery comes next"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'currentReleaseGateBatch = "4778-4809 - Model Adapter Dry-Run Result Review and Recovery"',
  'Phase 4809 Model Adapter Dry-Run Result Review and Recovery',
  'smoke-codexforge-model-adapter-dry-run-result-review-recovery-mega-batch.ps1',
  'Phase 4777 Manual Gated Model Adapter Dry-Run Harness',
  'smoke-codexforge-manual-gated-model-adapter-dry-run-harness-mega-batch.ps1'
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

foreach ($needle in @(
  "manual gated model adapter dry-run harness only",
  "dry-run harness is fixture-only",
  "dry-run packets are preview-only",
  "fixture results are static preview only",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no provider SDK imports",
  "no provider execution",
  "no plugin execution",
  "no autonomous execution",
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
  "server-only adapters required",
  "manual approval required",
  "manual confirmation required",
  "kill switch required",
  "audit required",
  "opaque credential references only",
  "no plaintext secrets",
  "dry-run result review and recovery next"
)) {
  Assert-Contains ($checkpointNormalized + " " + $runbookNormalized) $needle "checkpoint docs contain $needle"
}

Assert-NotMatches $frontEndSource '(?m)^\s*import\s+.+from\s+["''][^"'']*(openai|anthropic|generative-ai|genai|mistral|replicate|fal-ai|elevenlabs|assemblyai|deepgram|groq|ollama)[^"'']*["'']' "frontend Athena/Jarvis files do not import provider SDKs"
Assert-NotMatches $frontEndSource '\bfetch\s*\(' "frontend Athena/Jarvis files do not call fetch"
Assert-NotMatches $frontEndSource '\baxios\b' "frontend Athena/Jarvis files do not call axios"
Assert-NotMatches $frontEndSource '\bXMLHttpRequest\b' "frontend Athena/Jarvis files do not use XMLHttpRequest"
Assert-NotMatches $frontEndSource '\bEventSource\b' "frontend Athena/Jarvis files do not use EventSource"
Assert-NotMatches $frontEndSource '\bWebSocket\b' "frontend Athena/Jarvis files do not use WebSocket"
Assert-NotMatches $frontEndSource '\bnavigator\.sendBeacon\b' "frontend Athena/Jarvis files do not use sendBeacon"
Assert-NotMatches $frontEndSource '\bwindow\.localStorage\b|\blocalStorage\.' "frontend Athena/Jarvis files do not use localStorage"
Assert-NotMatches $frontEndSource '\bwindow\.sessionStorage\b|\bsessionStorage\.' "frontend Athena/Jarvis files do not use sessionStorage"
Assert-NotMatches $frontEndSource '\bwindow\.indexedDB\b|\bindexedDB\.' "frontend Athena/Jarvis files do not use IndexedDB"
Assert-NotMatches $frontEndSource '\bdocument\.cookie\b|\bcookieStore\.' "frontend Athena/Jarvis files do not use cookies"
Assert-NotMatches $frontEndSource '\bchild_process\b|\bexec\s*\(|\bspawn\s*\(|\bexeca\b|\bBun\.spawn\b|\bDeno\.Command\b|\bStart-Process\b|\brunCommand\s*\(' "frontend Athena/Jarvis files do not execute shell or process commands"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing stays Route"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole typing stays strict"
Assert-NotMatches $navigationTypesSource 'export type CodexForgeNavigationRouteHref\s*=\s*string;' "route href typing is not loosened to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole:\s*string\b' "commandDeckRole is not loosened to string"

Write-Host "[PASS] CodexForge Manual Gated Model Adapter Dry-Run Harness smoke completed"
