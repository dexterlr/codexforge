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

Write-Host "=== CodexForge Model Adapter Dry-Run Result Review and Recovery Mega Batch smoke ==="

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
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$reviewTypesPath = Join-Path $root "src\lib\codexforge\model-adapter-dry-run-result-review-recovery\model-adapter-dry-run-result-review-recovery-types.ts"
$reviewCatalogPath = Join-Path $root "src\lib\codexforge\model-adapter-dry-run-result-review-recovery\model-adapter-dry-run-result-review-recovery-catalog.ts"
$reviewIndexPath = Join-Path $root "src\lib\codexforge\model-adapter-dry-run-result-review-recovery\index.ts"
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
  $videoPanelPath,
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath,
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
$providerSource = Get-CombinedFileText @(
  $providersPageClientPath,
  $providerPanelPath
)
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$typedModelSource = Get-CombinedFileText @(
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath,
  $athenaModelPath,
  $providerPanelPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$runbookSource = Get-Content -Raw $runbookPath
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$docsSource = $checkpointCurrentSource + "`n" + $runbookSource

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
  (Join-Path $root "src\lib\codexforge\model-adapter-dry-run-result-review-recovery"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$providerNormalized = Normalize-Whitespace $providerSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$docsNormalized = Normalize-Whitespace $docsSource

foreach ($needle in @(
  "4778-4809 - Model Adapter Dry-Run Result Review and Recovery",
  "4809",
  "Model Adapter Dry-Run Result Review and Recovery"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $providerNormalized + " " + $typedModelNormalized + " " + $docsNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Manual gated model adapter dry-run harness",
  "Dry-run scenario preview",
  "Fixture result preview",
  "Manual dry-run gates",
  "Model adapter dry-run result review",
  "Dry-run quality and safety review",
  "Dry-run recovery plan",
  "Dry-run acceptance matrix",
  "dry-run result review is fixture-only",
  "provider response is not received",
  "model output is not generated",
  "static fixture result only",
  "manual operator review required",
  "audit required",
  "result persistence not implemented",
  "No model calls yet",
  "No prompt sending",
  "provider execution is blocked",
  "quality review is static preview only",
  "safety review is static preview only",
  "redaction review is static preview only",
  "prompt leakage check",
  "credential leakage check",
  "token leakage check",
  "unsafe output check",
  "retry disabled",
  "fallback disabled",
  "recovery is manual review only",
  "Athena model routing and provider selection preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena is the main Jarvis control layer",
  "Open Athena Command Center",
  "Open Jarvis Video Studio",
  "Athena can now preview model adapter dry-run result reviews",
  "dry-run review is fixture-only",
  "Athena model routing and provider selection preview comes next",
  "no model calls yet",
  "no prompt sending"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Model adapter dry-run result review",
  "Dry-run quality and safety review",
  "Dry-run recovery plan",
  "Dry-run acceptance matrix",
  "fixture-only",
  "Provider response is not received",
  "Model output is not generated",
  "No model calls yet",
  "No prompt sending",
  "Provider execution is blocked",
  "Athena model routing and provider selection preview comes next"
)) {
  Assert-Contains $providerNormalized $needle "provider hub contains $needle"
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
  "ModelAdapterDryRunResultReviewRecord",
  "ModelAdapterDryRunQualityReviewRecord",
  "ModelAdapterDryRunSafetyRedactionReviewRecord",
  "ModelAdapterDryRunRecoveryPlanPreviewRecord",
  "ModelAdapterDryRunAcceptanceMatrixRecord",
  "buildStableModelAdapterDryRunReviewKey",
  "buildStableDryRunQualityReviewKey",
  "buildStableDryRunSafetyReviewKey",
  "buildStableDryRunRecoveryPlanKey",
  "buildStableDryRunAcceptanceMatrixKey",
  "listModelAdapterDryRunResultReviews",
  "listDryRunQualityReviews",
  "listDryRunSafetyRedactionReviews",
  "listDryRunRecoveryPlanPreviews",
  "listDryRunAcceptanceMatrixRecords",
  "fixture-only dry-run result review",
  "quality review is static preview only",
  "safety review is static preview only",
  "redaction review is static preview only",
  "recovery is manual review only",
  "dry-run acceptance matrix is preview-only",
  "no prompt sending",
  "no LLM/model calls",
  "no provider SDK imports",
  "no retry execution",
  "no fallback execution",
  "opaque credential references only",
  "Athena model routing and provider selection preview next"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

Assert-Contains $allSmokeSource "smoke-codexforge-model-adapter-dry-run-result-review-recovery-mega-batch.ps1" "all-smoke references the new result review and recovery smoke"
Assert-Contains $allSmokeSource 'currentReleaseGateBatch = "4778-4809 - Model Adapter Dry-Run Result Review and Recovery"' "all-smoke current required release gate batch updated"
Assert-Contains $allSmokeSource 'Phase 4809 Model Adapter Dry-Run Result Review and Recovery' "all-smoke phase 4809 required release smoke updated"

foreach ($needle in @(
  "Highest detected phase: 4809",
  "Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery",
  "Previous completed batch: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness",
  "Next likely batch: 4810-4841 - Athena Model Routing and Provider Selection Preview",
  "model adapter dry-run result review and recovery only",
  "dry-run result review is fixture-only",
  "quality review is static preview only",
  "safety review is static preview only",
  "redaction review is static preview only",
  "recovery is manual review only",
  "dry-run acceptance matrix is preview-only",
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
  "no retry execution",
  "no fallback execution",
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
  "Athena model routing and provider selection preview next"
)) {
  Assert-Contains $docsNormalized $needle "docs contain $needle"
}

Assert-NotMatches $frontEndSource '(?m)^\s*import\s+.+from\s+["''][^"'']*(openai|anthropic|generative-ai|genai|mistral|replicate|fal-ai|elevenlabs|assemblyai|deepgram|groq|ollama)[^"'']*["'']' "frontend Athena/Jarvis files do not import provider SDKs"
Assert-NotMatches $frontEndSource '\bfetch\s*\(' "frontend Athena/Jarvis files do not call fetch"
Assert-NotMatches $frontEndSource '\bwindow\.localStorage\b|\blocalStorage\.' "frontend Athena/Jarvis files do not use localStorage"
Assert-NotMatches $frontEndSource '\bwindow\.sessionStorage\b|\bsessionStorage\.' "frontend Athena/Jarvis files do not use sessionStorage"
Assert-NotMatches $frontEndSource '\bwindow\.indexedDB\b|\bindexedDB\.' "frontend Athena/Jarvis files do not use IndexedDB"
Assert-NotMatches $frontEndSource '\bdocument\.cookie\b|\bcookieStore\.' "frontend Athena/Jarvis files do not use cookies"
Assert-NotMatches $frontEndSource '\bchild_process\b|\bexec\s*\(|\bspawn\s*\(|\bexeca\b|\bBun\.spawn\b|\bDeno\.Command\b|\bStart-Process\b|\brunCommand\s*\(' "frontend Athena/Jarvis files do not execute shell or process commands"
Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing stays Route"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "commandDeckRole typing stays strict"
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "route href typing is not loosened to string"
Assert-NotMatches $navigationTypesSource 'commandDeckRole:\s*string\b' "commandDeckRole is not loosened to string"

Write-Host "[PASS] CodexForge Model Adapter Dry-Run Result Review and Recovery smoke completed"
