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

Write-Host "=== CodexForge Backend-Owned Synthetic Dry-Run Manual Approval Handoff Contract Mega Batch smoke ==="

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
$handoffTypesPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-manual-approval-handoff-contract\backend-owned-synthetic-dry-run-manual-approval-handoff-contract-types.ts"
$handoffCatalogPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-manual-approval-handoff-contract\backend-owned-synthetic-dry-run-manual-approval-handoff-contract-catalog.ts"
$handoffIndexPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-manual-approval-handoff-contract\index.ts"
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
  $handoffTypesPath,
  $handoffCatalogPath,
  $handoffIndexPath,
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
  $handoffTypesPath,
  $handoffCatalogPath,
  $handoffIndexPath
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
  (Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-manual-approval-handoff-contract"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\ai-provider-registry"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$docsNormalized = Normalize-Whitespace $docsSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource

foreach ($needle in @(
  "5258-5289 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Contract",
  "5289",
  "Backend-Owned Synthetic Dry-Run Manual Approval Handoff Contract"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $docsNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned synthetic dry-run end-to-end packet review",
  "End-to-end packet acceptance posture",
  "Backend-owned synthetic dry-run manual approval handoff contract",
  "Manual approval handoff packet",
  "Manual approval handoff request/response contract",
  "Manual approval scope",
  "Manual approval handoff gates",
  "Manual approval handoff readiness matrix",
  "Manual approval handoff evidence summary",
  "Athena can preview backend-owned synthetic dry-run manual approval handoff contracts",
  "manual approval handoff contract is preview-only",
  "handoff state: draft / preview-only",
  "handoff request is not created",
  "handoff invocation is not invoked",
  "handoff response is not received",
  "handoff error is not received",
  "operator approval state: not requested",
  "manual confirmation state: not captured",
  "approval decision state: not evaluated",
  "approval token is not issued",
  "approval lease is not created",
  "approval reference is not persisted",
  "audit reference is not persisted",
  "result reference is not persisted",
  "evidence packet is preview-only",
  "database write is not implemented",
  "file write is not implemented",
  "queue dispatch is blocked",
  "worker dispatch is blocked",
  "job execution is blocked",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "manual approval handoff review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview backend-owned synthetic dry-run manual approval handoff contracts",
  "manual approval handoff contract is preview-only",
  "handoff state is draft / preview-only",
  "handoff request is not created",
  "operator approval state is not requested",
  "manual confirmation state is not captured",
  "manual approval handoff review and recovery preview comes next",
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
  Assert-Contains $videoNormalized $needle "/jarvis-video still contains $needle"
}

foreach ($needle in @(
  "backend-owned-synthetic-dry-run-manual-approval-handoff-contract-v1",
  "backend-owned-synthetic-dry-run-manual-approval-handoff-packet-v1",
  "backend-owned-synthetic-dry-run-manual-approval-handoff-request-contract-v1",
  "backend-owned-synthetic-dry-run-manual-approval-handoff-response-contract-v1",
  "backend-owned-synthetic-dry-run-manual-approval-handoff-error-contract-v1",
  "backend-owned-synthetic-dry-run-manual-approval-scope-v1",
  "backend-owned-synthetic-dry-run-manual-approval-handoff-gate-v1",
  "backend-owned-synthetic-dry-run-manual-approval-handoff-readiness-v1",
  "backend-owned-synthetic-dry-run-manual-approval-handoff-evidence-summary-v1",
  "backend-owned synthetic dry-run manual approval handoff contract only",
  "manual approval handoff contract is preview-only",
  "no prompt sending",
  "no LLM/model calls",
  "no provider SDK imports",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

Assert-Contains $allSmokeSource "smoke-codexforge-backend-owned-synthetic-dry-run-manual-approval-handoff-contract-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"

foreach ($needle in @(
  "Highest detected phase: 5289",
  "Latest completed batch: 5258-5289 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Contract",
  "Previous completed batch: 5226-5257 - Backend-Owned Synthetic Dry-Run End-to-End Packet Review and Recovery Preview",
  "Next likely batch: 5290-5321 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Review and Recovery Preview"
)) {
  Assert-Contains $checkpointCurrentSource $needle "checkpoint current contains $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"
Assert-Contains $athenaPanelSource 'buildScopedItemKey("manual-approval-handoff-capability"' "AthenaCommandCenterPanel manual approval capability groups use scoped keys"
Assert-Contains $athenaPanelSource 'buildScopedItemKey("manual-approval-handoff-workspace"' "AthenaCommandCenterPanel manual approval workspace groups use scoped keys"

Assert-NotMatches $athenaPanelSource 'manualApprovalHandoffCapabilityGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.capabilityFamilyId\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as manual approval handoff capability keys"
Assert-NotMatches $athenaPanelSource 'manualApprovalHandoffWorkspaceGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.workspaceTarget\}' "AthenaCommandCenterPanel does not use raw repeated workspace ids as manual approval handoff workspace keys"
Assert-NotMatches $athenaPanelSource 'manualApprovalHandoffContracts\.map\(\(record\)\s*=>\s*\(\s*<article\s+key=\{record\.(selectedCapabilityFamily\.id|workspaceTarget|label|id)\}' "AthenaCommandCenterPanel contract list does not use raw repeated fields as sibling keys"
Assert-NotMatches $athenaPanelSource 'manualApprovalScopeRecordsForDisplay\.map\(\(record\)\s*=>\s*\(\s*<article\s+key=\{record\.(scopeId|scopeLabel|requestLabel|handoffContractId)\}' "AthenaCommandCenterPanel scope list does not use raw repeated fields as sibling keys"
Assert-NotMatches $athenaPanelSource 'manualApprovalHandoffGateRecordsForDisplay\.map\(\(record\)\s*=>\s*\(\s*<article\s+key=\{record\.(id|label|requestLabel|handoffContractId)\}' "AthenaCommandCenterPanel gate list does not use raw repeated fields as sibling keys"

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

Write-Host "[PASS] Backend-owned synthetic dry-run manual approval handoff contract smoke passed."
