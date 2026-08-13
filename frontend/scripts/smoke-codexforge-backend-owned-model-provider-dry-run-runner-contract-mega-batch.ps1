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

Write-Host "=== CodexForge Backend-Owned Model Provider Dry-Run Runner Contract Mega Batch smoke ==="

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
$dryRunRunnerTypesPath = Join-Path $root "src\lib\codexforge\backend-owned-model-provider-dry-run-runner-contract\backend-owned-model-provider-dry-run-runner-contract-types.ts"
$dryRunRunnerCatalogPath = Join-Path $root "src\lib\codexforge\backend-owned-model-provider-dry-run-runner-contract\backend-owned-model-provider-dry-run-runner-contract-catalog.ts"
$dryRunRunnerIndexPath = Join-Path $root "src\lib\codexforge\backend-owned-model-provider-dry-run-runner-contract\index.ts"
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
  $dryRunRunnerTypesPath,
  $dryRunRunnerCatalogPath,
  $dryRunRunnerIndexPath,
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
  $dryRunRunnerTypesPath,
  $dryRunRunnerCatalogPath,
  $dryRunRunnerIndexPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$runbookSource = Get-Content -Raw $runbookPath
$docsSource = $checkpointCurrentSource + "`n" + $runbookSource
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$athenaPanelSource = Get-Content -Raw $athenaPanelPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\backend-owned-model-provider-dry-run-runner-contract"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$docsNormalized = Normalize-Whitespace $docsSource
$athenaPanelNormalized = Normalize-Whitespace $athenaPanelSource

foreach ($needle in @(
  "4970-5001 - Backend-Owned Model Provider Dry-Run Runner Contract",
  "5001",
  "Backend-Owned Model Provider Dry-Run Runner Contract"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $docsNormalized + " " + $allSmokeSource) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned model provider run admission contract",
  "Backend admission request/response contract",
  "Backend admission gate schema",
  "Backend contract readiness matrix",
  "Backend-owned model provider dry-run runner contract",
  "Dry-run runner request/response contract",
  "Dry-run runner gate schema",
  "Dry-run runner readiness matrix",
  "Athena can preview the backend-owned dry-run runner contract",
  "backend-owned dry-run runner contract is preview-only",
  "runner contract state: draft / preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "provider response is not received",
  "model output is not generated",
  "fixture result is not produced",
  "provider execution is blocked",
  "queue dispatch is blocked",
  "worker dispatch is blocked",
  "job execution is blocked",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "dry-run runner review and recovery preview comes next",
  "dry-run request contract preview",
  "dry-run response contract preview",
  "dry-run error contract preview",
  "prompt payload is redacted placeholder only",
  "prompt transmission state: not sent",
  "credential reference posture: opaque label only",
  "dry-run response is not received",
  "dry-run error is not received",
  "no queue dispatch until backend runner implementation",
  "no worker dispatch until backend runner implementation",
  "no job execution until backend runner implementation",
  "current readiness: not executable / contract-only"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena is the main Jarvis control layer",
  "Open Jarvis Chat",
  "Open Jarvis Video Studio",
  "Athena can now preview backend-owned model provider dry-run runner contracts",
  "backend-owned dry-run runner contract is preview-only",
  "runner contract state is draft / preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "dry-run runner review and recovery preview comes next",
  "no model calls yet",
  "no prompt sending"
)) {
  Assert-Contains $homeNormalized $needle "home contains $needle"
}

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Generate video - locked",
  "Run backend dry-run - locked",
  "Approve backend handoff - locked"
)) {
  Assert-Contains $videoNormalized $needle "/jarvis-video contains $needle"
}

foreach ($needle in @(
  "BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_BATCH",
  "BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_CONTRACT_PHASE",
  "NEXT_BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH",
  "backend-owned model provider dry-run runner contract only",
  "backend-owned dry-run runner contract is preview-only",
  "runner contract state is draft / preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "dry-run response is not received",
  "dry-run error is not received",
  "provider response is not received",
  "model output is not generated",
  "fixture result is not produced",
  "dry-run runner request/response/error contracts are preview-only",
  "dry-run runner gate schema is preview-only",
  "dry-run runner readiness matrix is preview-only",
  "dry-run runner handoff preview is preview-only",
  "current readiness is not executable / contract-only",
  "no prompt sending",
  "no LLM/model calls",
  "no provider SDK imports",
  "no retry execution",
  "no fallback execution",
  "opaque credential references only",
  "backend-owned dry-run runner review and recovery preview next",
  "buildStableBackendDryRunRunnerContractKey",
  "buildStableBackendDryRunRequestContractKey",
  "buildStableBackendDryRunResponseContractKey",
  "buildStableBackendDryRunErrorContractKey",
  "buildStableBackendDryRunRunnerGateSchemaKey",
  "buildStableBackendDryRunRunnerReadinessMatrixKey",
  "buildStableBackendDryRunRunnerHandoffPreviewKey",
  "listBackendOwnedModelProviderDryRunRunnerContracts",
  "listBackendDryRunRequestContracts",
  "listBackendDryRunResponseContracts",
  "listBackendDryRunErrorContracts",
  "listBackendDryRunRunnerGateSchemaRecords",
  "listBackendDryRunRunnerReadinessMatrixRecords",
  "listBackendDryRunRunnerHandoffPreviews",
  "groupBackendDryRunRunnerContractsByCapabilityFamily",
  "groupBackendDryRunRunnerContractsByWorkspaceTarget",
  "buildBackendDryRunRunnerContractSummary",
  "buildBackendDryRunRunnerGateSummary",
  "buildBackendDryRunRunnerReadinessSummary",
  "buildNextDryRunRunnerReviewAndRecoveryChecklist",
  "uniqueBackendDryRunRunnerDisplayStrings"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'currentReleaseGateBatch = "4970-5001 - Backend-Owned Model Provider Dry-Run Runner Contract"',
  "Phase 5001 Backend-Owned Model Provider Dry-Run Runner Contract",
  "smoke-codexforge-backend-owned-model-provider-dry-run-runner-contract-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 5001",
  "Latest completed batch: 4970-5001 - Backend-Owned Model Provider Dry-Run Runner Contract",
  "Previous completed batch: 4938-4969 - Backend-Owned Model Provider Run Admission Contract",
  "Next likely batch: 5002-5033 - Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview",
  "backend-owned model provider dry-run runner contract only",
  "backend-owned dry-run runner contract is preview-only",
  "runner contract state is draft / preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "dry-run response is not received",
  "dry-run error is not received",
  "provider response is not received",
  "model output is not generated",
  "fixture result is not produced",
  "dry-run runner request/response/error contracts are preview-only",
  "dry-run runner gate schema is preview-only",
  "dry-run runner readiness matrix is preview-only",
  "current readiness is not executable / contract-only",
  "backend-owned dry-run runner review and recovery preview next"
)) {
  Assert-Contains $docsNormalized $needle "checkpoint docs contain $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"

Assert-Contains $athenaPanelNormalized '"backend-dry-run-runner-capability-group",' "AthenaCommandCenterPanel uses contextual keys for dry-run capability groups"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey(record.key, "requirement", index, item)' "AthenaCommandCenterPanel uses contextual keys for dry-run contract requirement chips"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey(contract.key, "triplet", index, item)' "AthenaCommandCenterPanel uses contextual keys for dry-run triplet chips"
Assert-Contains $athenaPanelNormalized 'contract.key, "validation-error", index, item' "AthenaCommandCenterPanel uses contextual keys for dry-run validation error chips"
Assert-Contains $athenaPanelNormalized 'ownerGroup.owner, "gate-label", index, record.id' "AthenaCommandCenterPanel uses contextual keys for dry-run gate labels"
Assert-Contains $athenaPanelNormalized '"backend-dry-run-runner-readiness-summary",' "AthenaCommandCenterPanel uses contextual keys for dry-run readiness summary chips"
Assert-NotMatches $athenaPanelSource 'backendDryRunRunnerContracts\.map\(\(record\)\s*=>\s*\(\s*<article\s+key=\{record\.selectedCapabilityFamily\.id\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as dry-run runner keys"
Assert-NotMatches $athenaPanelSource 'backendDryRunRunnerTripletRecords\.map\(\(\{ contract, request, response, error, handoff \}\)\s*=>\s*\(\s*<article\s+key=\{contract\.selectedCapabilityFamily\.id\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as dry-run triplet keys"
Assert-NotMatches $athenaPanelSource 'ownerGroup\.records\.map\(\(record,\s*index\)\s*=>\s*\(\s*<span\s+key=\{record\.id\}' "AthenaCommandCenterPanel does not use raw gate ids as dry-run gate keys"

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
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeCommandDeckRole\s*=\s*string\b' "commandDeckRole typing is not loosened to string"

Write-Host "[PASS] CodexForge backend-owned model provider dry-run runner contract checks passed."
