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

Write-Host "=== CodexForge Backend-Owned Synthetic Dry-Run End-to-End Packet Contract Mega Batch smoke ==="

$jarvisPagePath = Join-Path $root "src\app\jarvis\page.tsx"
$jarvisPageClientPath = Join-Path $root "src\app\jarvis\page-client.tsx"
$athenaPagePath = Join-Path $root "src\app\athena\page.tsx"
$homePagePath = Join-Path $root "src\app\page.tsx"
$homePageClientPath = Join-Path $root "src\app\page-client.tsx"
$providersPagePath = Join-Path $root "src\app\ai-providers\page.tsx"
$providersPageClientPath = Join-Path $root "src\app\ai-providers\page-client.tsx"
$videoPagePath = Join-Path $root "src\app\jarvis-video\page.tsx"
$videoPageClientPath = Join-Path $root "src\app\jarvis-video\page-client.tsx"
$videoPanelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\components\JarvisVideoStudioReleaseCandidatePanel.tsx"
$athenaPanelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaCommandCenterPanel.tsx"
$homeShellPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisUnifiedProductShell.tsx"
$athenaModelPath = Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map\athena-control-plane-model.ts"
$providerPanelPath = Join-Path $root "src\lib\codexforge\ai-provider-registry\components\AiProviderRegistryPanel.tsx"
$packetTypesPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-end-to-end-packet-contract\backend-owned-synthetic-dry-run-end-to-end-packet-contract-types.ts"
$packetCatalogPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-end-to-end-packet-contract\backend-owned-synthetic-dry-run-end-to-end-packet-contract-catalog.ts"
$packetIndexPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-end-to-end-packet-contract\index.ts"
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
  $providersPagePath,
  $providersPageClientPath,
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath,
  $athenaPanelPath,
  $homeShellPath,
  $athenaModelPath,
  $providerPanelPath,
  $packetTypesPath,
  $packetCatalogPath,
  $packetIndexPath,
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
$providersSource = Get-CombinedFileText @(
  $providersPagePath,
  $providersPageClientPath,
  $providerPanelPath
)
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$typedModelSource = Get-CombinedFileText @(
  $packetTypesPath,
  $packetCatalogPath,
  $packetIndexPath
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
  (Join-Path $root "src\app\ai-providers"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-end-to-end-packet-contract"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\ai-provider-registry"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$providersNormalized = Normalize-Whitespace $providersSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$docsNormalized = Normalize-Whitespace $docsSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource

foreach ($needle in @(
  "5194-5225 - Backend-Owned Synthetic Dry-Run End-to-End Packet Contract",
  "5225",
  "Backend-Owned Synthetic Dry-Run End-to-End Packet Contract"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $providersNormalized + " " + $typedModelNormalized + " " + $docsNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned synthetic dry-run audit and approval join review",
  "Audit and approval join acceptance posture",
  "Backend-owned synthetic dry-run end-to-end packet contract",
  "Synthetic end-to-end stage contract",
  "Synthetic end-to-end lineage",
  "End-to-end packet request/response contract",
  "End-to-end packet gates",
  "End-to-end packet readiness matrix",
  "End-to-end packet acceptance posture",
  "Athena can preview backend-owned synthetic dry-run end-to-end packet contracts",
  "end-to-end packet contract is preview-only",
  "packet state: draft / preview-only",
  "packet request is not created",
  "packet invocation is not invoked",
  "packet response is not received",
  "packet error is not received",
  "admission state: not admitted",
  "dry-run execution is not executed",
  "result capture state: not captured",
  "audit join state: not persisted",
  "approval join state: not persisted",
  "evidence packet is preview-only",
  "database write is not implemented",
  "file write is not implemented",
  "queue dispatch is blocked",
  "worker dispatch is blocked",
  "job execution is blocked",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "end-to-end packet review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "Backend-owned synthetic dry-run end-to-end packet contract",
  "Synthetic end-to-end stage contract",
  "Synthetic end-to-end lineage",
  "End-to-end packet request/response contract",
  "End-to-end packet gates",
  "End-to-end packet readiness matrix",
  "End-to-end packet acceptance posture",
  "end-to-end packet contract is preview-only",
  "packet state: draft / preview-only",
  "packet request is not created",
  "packet invocation is not invoked",
  "packet response is not received",
  "audit join state: not persisted",
  "approval join state: not persisted",
  "end-to-end packet review and recovery preview comes next"
)) {
  Assert-Contains $providersNormalized $needle "providers contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview backend-owned synthetic dry-run end-to-end packet contracts",
  "end-to-end packet contract is preview-only",
  "packet state is draft / preview-only",
  "packet request is not created",
  "packet invocation is not invoked",
  "packet response is not received",
  "result capture state is not captured",
  "audit join state is not persisted",
  "approval join state is not persisted",
  "end-to-end packet review and recovery preview comes next",
  "no model calls yet",
  "no prompt sending",
  "no provider SDKs imported",
  "queue, worker, and job execution remain blocked"
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
  "backend-owned synthetic dry-run end-to-end packet contract",
  "backend-owned-synthetic-dry-run-end-to-end-packet-stage-contract-v1",
  "backend-owned-synthetic-dry-run-end-to-end-packet-lineage-v1",
  "backend-owned-synthetic-dry-run-end-to-end-packet-request-contract-v1",
  "backend-owned-synthetic-dry-run-end-to-end-packet-response-contract-v1",
  "backend-owned-synthetic-dry-run-end-to-end-packet-error-contract-v1",
  "backend-owned-synthetic-dry-run-end-to-end-packet-gate-v1",
  "backend-owned-synthetic-dry-run-end-to-end-packet-readiness-v1",
  "backend-owned-synthetic-dry-run-end-to-end-packet-acceptance-posture-v1",
  "run-intent-stage",
  "approval-packet-stage",
  "evidence-packet-stage",
  "final-end-to-end-packet-stage",
  "buildStableSyntheticEndToEndPacketContractKey",
  "buildStableSyntheticEndToEndPacketStageKey",
  "buildStableSyntheticEndToEndPacketLineageKey",
  "buildStableSyntheticEndToEndPacketRequestKey",
  "buildStableSyntheticEndToEndPacketResponseKey",
  "buildStableSyntheticEndToEndPacketErrorKey",
  "buildStableSyntheticEndToEndPacketGateKey",
  "buildStableSyntheticEndToEndPacketReadinessKey",
  "buildStableSyntheticEndToEndPacketAcceptanceKey",
  "listBackendOwnedSyntheticDryRunEndToEndPacketContracts",
  "listSyntheticEndToEndPacketStageRecords",
  "listSyntheticEndToEndPacketLineageRecords",
  "listSyntheticEndToEndPacketRequestContracts",
  "listSyntheticEndToEndPacketResponseContracts",
  "listSyntheticEndToEndPacketErrorContracts",
  "listSyntheticEndToEndPacketGateRecords",
  "listSyntheticEndToEndPacketReadinessMatrixRecords",
  "listSyntheticEndToEndPacketAcceptancePostureRecords",
  "groupSyntheticEndToEndPacketsByCapabilityFamily",
  "groupSyntheticEndToEndPacketsByWorkspaceTarget",
  "buildSyntheticEndToEndPacketSummary",
  "buildSyntheticEndToEndPacketGateSummary",
  "buildSyntheticEndToEndPacketReadinessSummary",
  "buildNextEndToEndPacketReviewAndRecoveryChecklist",
  "buildUniqueSyntheticEndToEndPacketDisplayStrings",
  "no LLM/model calls",
  "no prompt sending",
  "no provider SDK imports",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file write"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'currentReleaseGateBatch = "5194-5225 - Backend-Owned Synthetic Dry-Run End-to-End Packet Contract"',
  "Phase 5225 Backend-Owned Synthetic Dry-Run End-to-End Packet Contract",
  "smoke-codexforge-backend-owned-synthetic-dry-run-end-to-end-packet-contract-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 5225. Latest completed batch: 5194-5225 - Backend-Owned Synthetic Dry-Run End-to-End Packet Contract. Previous completed batch: 5162-5193 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview. Next likely batch: 5226-5257 - Backend-Owned Synthetic Dry-Run End-to-End Packet Review and Recovery Preview.",
  "Highest detected phase: 5225",
  "Latest completed batch: 5194-5225 - Backend-Owned Synthetic Dry-Run End-to-End Packet Contract",
  "Previous completed batch: 5162-5193 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview",
  "Next likely batch: 5226-5257 - Backend-Owned Synthetic Dry-Run End-to-End Packet Review and Recovery Preview",
  "backend-owned synthetic dry-run end-to-end packet contract only",
  "end-to-end packet contract is preview-only",
  "packet state is draft / preview-only",
  "packet request is not created",
  "packet invocation is not invoked",
  "packet response is not received",
  "packet error is not received",
  "admission state is not admitted",
  "admission token is not issued",
  "admission lease is not created",
  "dry-run request is not created",
  "runner invocation is not invoked",
  "dry-run execution is not executed",
  "provider response is not received",
  "model output is not generated",
  "synthetic fixture result is static placeholder only",
  "result capture state is not captured",
  "result persistence is not implemented",
  "audit join state is not persisted",
  "approval join state is not persisted",
  "result reference state is not persisted",
  "evidence packet is preview-only",
  "audit envelope state is not created",
  "approval envelope state is not created",
  "database write is not implemented",
  "file write is not implemented",
  "current readiness is end-to-end-packet-contract-only / not executable / not persistent",
  "acceptance state is not accepted / preview-only",
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
  "backend-owned synthetic dry-run end-to-end packet review and recovery preview next"
)) {
  Assert-Contains $checkpointCurrentSource $needle "checkpoint current contains $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"

Assert-NotMatches $athenaPanelSource 'endToEndPacketCapabilityGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.capabilityFamilyId\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as end-to-end packet capability keys"
Assert-NotMatches $athenaPanelSource 'endToEndPacketWorkspaceGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.workspaceTarget\}' "AthenaCommandCenterPanel does not use raw repeated workspace ids as end-to-end packet workspace keys"
Assert-NotMatches $athenaPanelSource 'endToEndPacketContracts\.map\(\(record\)\s*=>\s*\(\s*<article\s+key=\{record\.(selectedCapabilityFamily\.id|workspaceTarget|label|id)\}' "AthenaCommandCenterPanel packet list does not use raw repeated fields as sibling keys"

Assert-NotMatches $frontEndSource '(?m)^\s*import\s+.+from\s+["''][^"'']*(openai|anthropic|generative-ai|genai|mistral|replicate|fal-ai|elevenlabs|assemblyai|deepgram|groq|ollama)[^"'']*["'']' "frontend Athena/Jarvis/provider files do not import provider SDKs"
Assert-NotMatches $frontEndSource '\bfetch\s*\(' "frontend Athena/Jarvis/provider files do not call fetch"
Assert-NotMatches $frontEndSource '\baxios\b' "frontend Athena/Jarvis/provider files do not call axios"
Assert-NotMatches $frontEndSource '\bXMLHttpRequest\b' "frontend Athena/Jarvis/provider files do not use XMLHttpRequest"
Assert-NotMatches $frontEndSource '\bwindow\.localStorage\b|\blocalStorage\.' "frontend Athena/Jarvis/provider files do not use localStorage"
Assert-NotMatches $frontEndSource '\bwindow\.sessionStorage\b|\bsessionStorage\.' "frontend Athena/Jarvis/provider files do not use sessionStorage"
Assert-NotMatches $frontEndSource '\bwindow\.indexedDB\b|\bindexedDB\.' "frontend Athena/Jarvis/provider files do not use IndexedDB"
Assert-NotMatches $frontEndSource '\bdocument\.cookie\b|\bcookieStore\.' "frontend Athena/Jarvis/provider files do not use cookies"
Assert-NotMatches $frontEndSource '\bchild_process\b|\bexec\s*\(|\bspawn\s*\(|\bexeca\b|\bBun\.spawn\b|\bDeno\.Command\b|\bStart-Process\b|\brunCommand\s*\(' "frontend Athena/Jarvis/provider files do not execute shell or process commands"
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "route href typing is not loosened to string"
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeCommandDeckRole\s*=\s*string\b' "commandDeckRole typing is not loosened to string"

Write-Host "[PASS] Backend-owned synthetic dry-run end-to-end packet contract smoke passed."
