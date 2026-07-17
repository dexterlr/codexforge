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

Write-Host "=== CodexForge Backend-Owned Synthetic Dry-Run Manual Approval Decision Contract Mega Batch smoke ==="

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
$decisionTypesPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-manual-approval-decision-contract\backend-owned-synthetic-dry-run-manual-approval-decision-contract-types.ts"
$decisionCatalogPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-manual-approval-decision-contract\backend-owned-synthetic-dry-run-manual-approval-decision-contract-catalog.ts"
$decisionIndexPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-manual-approval-decision-contract\index.ts"
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
  $decisionTypesPath,
  $decisionCatalogPath,
  $decisionIndexPath,
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
  $decisionTypesPath,
  $decisionCatalogPath,
  $decisionIndexPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$runbookSource = Get-Content -Raw $runbookPath
$docsSource = $checkpointCurrentSource + "`n" + $runbookSource
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$athenaPanelSource = Get-Content -Raw $athenaPanelPath
$athenaPanelNormalized = Normalize-Whitespace $athenaPanelSource

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-manual-approval-decision-contract"),
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
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource

foreach ($needle in @(
  "5322-5353 - Backend-Owned Synthetic Dry-Run Manual Approval Decision Contract",
  "5353",
  "Backend-Owned Synthetic Dry-Run Manual Approval Decision Contract"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $docsNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned synthetic dry-run manual approval handoff review",
  "Manual approval handoff acceptance posture",
  "Backend-owned synthetic dry-run manual approval decision contract",
  "Manual approval decision packet",
  "Manual approval decision request/response contract",
  "Approval outcome preview",
  "Manual approval decision gates",
  "Manual approval decision readiness matrix",
  "Manual approval decision evidence summary",
  "Athena can preview backend-owned synthetic dry-run manual approval decision contracts",
  "manual approval decision contract is preview-only",
  "decision state: draft / preview-only / not evaluated",
  "decision request is not created",
  "decision invocation is not invoked",
  "decision response is not received",
  "decision error is not received",
  "operator approval state: not requested",
  "manual confirmation state: not captured",
  "approval outcome state: not decided",
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
  "manual approval decision review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena can now preview backend-owned synthetic dry-run manual approval decision contracts",
  "manual approval decision contract is preview-only",
  "decision state is draft / preview-only / not evaluated",
  "decision request is not created",
  "operator approval state is not requested",
  "manual confirmation state is not captured",
  "approval outcome state is not decided",
  "manual approval decision review and recovery preview comes next",
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
  "backend-owned-synthetic-dry-run-manual-approval-decision-contract-v1",
  "backend-owned-synthetic-dry-run-manual-approval-decision-packet-v1",
  "backend-owned-synthetic-dry-run-manual-approval-decision-request-contract-v1",
  "backend-owned-synthetic-dry-run-manual-approval-decision-response-contract-v1",
  "backend-owned-synthetic-dry-run-manual-approval-decision-error-contract-v1",
  "backend-owned-synthetic-dry-run-approval-outcome-preview-v1",
  "backend-owned-synthetic-dry-run-manual-approval-decision-gate-v1",
  "backend-owned-synthetic-dry-run-manual-approval-decision-readiness-v1",
  "backend-owned-synthetic-dry-run-manual-approval-decision-evidence-summary-v1",
  "manual approval decision contract is preview-only",
  "decision state is draft / preview-only / not evaluated",
  "decision request is not created",
  "decision invocation is not invoked",
  "decision response is not received",
  "decision error is not received",
  "approval outcome state is not decided",
  "no prompt sending",
  "no LLM/model calls",
  "no provider SDK imports",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file write"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

Assert-Contains $allSmokeSource "smoke-codexforge-backend-owned-synthetic-dry-run-manual-approval-decision-contract-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"

foreach ($needle in @(
  "Highest detected phase: 5353",
  "Latest completed batch: 5322-5353 - Backend-Owned Synthetic Dry-Run Manual Approval Decision Contract",
  "Previous completed batch: 5290-5321 - Backend-Owned Synthetic Dry-Run Manual Approval Handoff Review and Recovery Preview",
  "Next likely batch: 5354-5385 - Backend-Owned Synthetic Dry-Run Manual Approval Decision Review and Recovery Preview"
)) {
  Assert-Contains $checkpointCurrentSource $needle "checkpoint current contains $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( "manual-approval-decision-capability"' "AthenaCommandCenterPanel manual approval decision capability groups use scoped keys"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( "manual-approval-decision-workspace"' "AthenaCommandCenterPanel manual approval decision workspace groups use scoped keys"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( "manual-approval-decision-outcome"' "AthenaCommandCenterPanel manual approval decision outcomes use scoped keys"

Assert-NotMatches $athenaPanelSource 'manualApprovalDecisionCapabilityGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.capabilityFamilyId\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as manual approval decision capability keys"
Assert-NotMatches $athenaPanelSource 'manualApprovalDecisionWorkspaceGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.workspaceTarget\}' "AthenaCommandCenterPanel does not use raw repeated workspace ids as manual approval decision workspace keys"
Assert-NotMatches $athenaPanelSource 'manualApprovalOutcomePreviewRecordsForDisplay\.map\(\(record\)\s*=>\s*\(\s*<article\s+key=\{record\.(outcomeId|outcomeLabel)\}' "AthenaCommandCenterPanel manual approval decision outcomes do not use raw repeated fields as sibling keys"

Assert-NotMatches $frontEndSource '(?m)^\s*import\s+.+from\s+["''][^"'']*(openai|anthropic|generative-ai|genai|mistral|replicate|fal-ai|elevenlabs|assemblyai|deepgram|groq|ollama)[^"'']*["'']' "frontend Athena/Jarvis files do not import provider SDKs"
Assert-NotMatches $frontEndSource '\bfetch\s*\(' "frontend Athena/Jarvis files do not call fetch"
Assert-NotMatches $frontEndSource '\baxios\b' "frontend Athena/Jarvis files do not call axios"
Assert-NotMatches $frontEndSource '\bXMLHttpRequest\b' "frontend Athena/Jarvis files do not use XMLHttpRequest"
Assert-NotMatches $frontEndSource '\bwindow\.localStorage\b|\blocalStorage\.' "frontend Athena/Jarvis files do not use localStorage"
Assert-NotMatches $frontEndSource '\bwindow\.sessionStorage\b|\bsessionStorage\.' "frontend Athena/Jarvis files do not use sessionStorage"
Assert-NotMatches $frontEndSource '\bwindow\.indexedDB\b|\bindexedDB\.' "frontend Athena/Jarvis files do not use IndexedDB"
Assert-NotMatches $frontEndSource '\bdocument\.cookie\b|\bcookieStore\.' "frontend Athena/Jarvis files do not use cookies"
Assert-NotMatches $frontEndSource '\bchild_process\b|\bexec\s*\(|\bspawn\s*\(|\bexeca\b|\bBun\.spawn\b|\bDeno\.Command\b|\bStart-Process\b|\brunCommand\s*\(' "frontend app code does not execute shell or process commands"
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeNavigationRouteHref\s*=\s*string\b' "route href typing is not loosened to string"
Assert-NotMatches $navigationTypesSource 'export\s+type\s+CodexForgeCommandDeckRole\s*=\s*string\b' "commandDeckRole typing is not loosened to string"

Write-Host "[PASS] Backend-owned synthetic dry-run manual approval decision contract smoke passed."
