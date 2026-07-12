param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$parentRoot = Resolve-Path (Join-Path $root "..")
if (Test-Path (Join-Path $parentRoot "README.md")) {
  $repoRoot = $parentRoot
} else {
  $repoRoot = Resolve-Path $root
}
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

Write-Host "=== CodexForge Model Provider Approval Packet and Run Intent Preview Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$videoPagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$videoPageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$previewTypesPath = Join-Path $root "src\lib\codexforge\model-provider-approval-packet-run-intent-preview\model-provider-approval-packet-run-intent-preview-types.ts"
$previewCatalogPath = Join-Path $root "src\lib\codexforge\model-provider-approval-packet-run-intent-preview\model-provider-approval-packet-run-intent-preview-catalog.ts"
$previewIndexPath = Join-Path $root "src\lib\codexforge\model-provider-approval-packet-run-intent-preview\index.ts"
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
  $videoPanelPath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $previewTypesPath,
  $previewCatalogPath,
  $previewIndexPath,
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
$typedModelSource = Get-CombinedFileText @(
  $previewTypesPath,
  $previewCatalogPath,
  $previewIndexPath,
  $athenaModelPath,
  $athenaPanelPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$runbookSource = Get-Content -Raw $runbookPath
$docsSource = $checkpointCurrentSource + "`n" + $runbookSource
$navigationTypesSource = Get-Content -Raw $navigationTypesPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\model-provider-approval-packet-run-intent-preview"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$docsNormalized = Normalize-Whitespace $docsSource

foreach ($needle in @(
  "4842-4873 - Model Provider Approval Packet and Run Intent Preview",
  "4873",
  "Model Provider Approval Packet and Run Intent Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $docsNormalized + " " + $allSmokeSource) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Athena model routing preview",
  "Provider selection rationale",
  "Model routing chain preview",
  "Provider selection blockers",
  "Model provider approval packet",
  "Run intent preview",
  "Approval gate checklist",
  "Run intent blockers",
  "Athena can draft model provider approval packets",
  "approval packet is preview-only",
  "run intent is preview-only",
  "operator review only",
  "prompt payload is redacted placeholder only",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "provider execution is blocked",
  "opaque credential references only",
  "approval expiry and revocation are preview-only",
  "manual gated run admission preview comes next",
  "run admission state: not admitted",
  "selected capability family",
  "provider slot label",
  "backup provider slot label",
  "local/private alternative",
  "idempotency key posture",
  "replay block posture",
  "single-run lock posture",
  "manual confirmation state"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena is the main Jarvis control layer",
  "Open Athena Command Center",
  "Open Jarvis Video Studio",
  "Athena can now preview model provider approval packets",
  "Athena can now preview run intents for selected model routes",
  "approval packet is preview-only",
  "run intent is preview-only",
  "manual gated run admission preview comes next",
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
  Assert-Contains $videoNormalized $needle "/jarvis-video contains $needle"
}

foreach ($needle in @(
  "MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_BATCH",
  "MODEL_PROVIDER_APPROVAL_PACKET_RUN_INTENT_PREVIEW_PHASE",
  "NEXT_MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH",
  "model-provider-approval-packet-preview-v1",
  "model-provider-run-intent-preview-v1",
  "model-provider-approval-gate-checklist-preview-v1",
  "model-provider-run-intent-blocker-matrix-preview-v1",
  "model-provider-approval-expiry-revocation-preview-v1",
  "approval packet is preview-only",
  "run intent is preview-only",
  "approval gates are preview-only",
  "run intent blockers are preview-only",
  "approval expiry and revocation are preview-only",
  "No execution. No prompt sending. No model calls. No provider execution. No plugin execution.",
  "no SDK imports",
  "opaque credential references only",
  "no plaintext secrets",
  "no retry execution",
  "no fallback execution",
  "manual gated run admission preview next",
  "manual gated model provider run admission preview next",
  "buildStableModelProviderApprovalPacketKey",
  "buildStableModelProviderRunIntentKey",
  "buildStableApprovalGateChecklistKey",
  "buildStableRunIntentBlockerKey",
  "buildStableApprovalExpiryRevocationKey",
  "listModelProviderApprovalPackets",
  "listModelProviderRunIntentPreviews",
  "listApprovalGateChecklistRecords",
  "listRunIntentBlockerMatrix",
  "listApprovalExpiryRevocationPreviews",
  "groupApprovalPacketsByCapabilityFamily",
  "groupApprovalPacketsByWorkspaceTarget",
  "buildApprovalPacketSummary",
  "buildRunIntentSummary",
  "buildRunIntentBlockerSummary",
  "buildNextManualGatedRunAdmissionChecklist"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'currentReleaseGateBatch = "4842-4873 - Model Provider Approval Packet and Run Intent Preview"',
  "Phase 4873 Model Provider Approval Packet and Run Intent Preview",
  "smoke-codexforge-model-provider-approval-packet-run-intent-preview-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4873. Latest completed batch: 4842-4873 - Model Provider Approval Packet and Run Intent Preview. Previous completed batch: 4810-4841 - Athena Model Routing and Provider Selection Preview.",
  "Highest detected phase: 4873",
  "Latest completed batch: 4842-4873 - Model Provider Approval Packet and Run Intent Preview",
  "Previous completed batch: 4810-4841 - Athena Model Routing and Provider Selection Preview",
  "Next likely batch: 4874-4905 - Manual Gated Model Provider Run Admission Preview"
)) {
  Assert-Contains $docsNormalized $needle "checkpoint docs contain $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"

Assert-NotMatches $frontEndSource '(?m)^\s*import\s+.+from\s+["''][^"'']*(openai|anthropic|generative-ai|genai|mistral|replicate|fal-ai|elevenlabs|assemblyai|deepgram|groq|ollama)[^"'']*["'']' "frontend Athena/Jarvis files do not import provider SDKs"
Assert-NotMatches $frontEndSource '\bfetch\s*\(' "frontend Athena/Jarvis files do not call fetch"
Assert-NotMatches $frontEndSource '\baxios\b' "frontend Athena/Jarvis files do not call axios"
Assert-NotMatches $frontEndSource '\bXMLHttpRequest\b' "frontend Athena/Jarvis files do not use XMLHttpRequest"
Assert-NotMatches $frontEndSource '\bwindow\.localStorage\b|\blocalStorage\.' "frontend Athena/Jarvis files do not use localStorage"
Assert-NotMatches $frontEndSource '\bwindow\.sessionStorage\b|\bsessionStorage\.' "frontend Athena/Jarvis files do not use sessionStorage"
Assert-NotMatches $frontEndSource '\bwindow\.indexedDB\b|\bindexedDB\.' "frontend Athena/Jarvis files do not use IndexedDB"
Assert-NotMatches $frontEndSource '\bdocument\.cookie\b|\bcookieStore\.' "frontend Athena/Jarvis files do not use cookies"
Assert-NotMatches $frontEndSource '\bchild_process\b|\bexec\s*\(|\bspawn\s*\(|\bexeca\b|\bBun\.spawn\b|\bDeno\.Command\b|\bStart-Process\b|\brunCommand\s*\(' "frontend Athena/Jarvis files do not execute shell or process commands"
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "route href typing is not loosened to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole\s*:\s*string\b' "commandDeckRole is not loosened to string"
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeCommandDeckRole\s*=\s*string\b' "commandDeckRole typing is not loosened to string"

Write-Host "[OK] CodexForge Model Provider Approval Packet and Run Intent Preview Mega Batch smoke passed."
