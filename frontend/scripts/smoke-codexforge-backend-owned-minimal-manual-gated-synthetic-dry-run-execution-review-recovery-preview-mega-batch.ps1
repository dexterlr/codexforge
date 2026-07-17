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

function Assert-ContainsAny {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string[]]$Needles,
    [string]$Name
  )

  foreach ($needle in $Needles) {
    if ($Haystack.IndexOf($needle, [StringComparison]::OrdinalIgnoreCase) -ge 0) {
      Write-Host "[PASS] $Name"
      return
    }
  }

  throw "[FAIL] Missing $Name`: $($Needles -join ' | ')"
}

function Assert-Matches {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Pattern,
    [string]$Name
  )
  if (-not [regex]::IsMatch($Haystack, $Pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    throw "[FAIL] Missing $Name with pattern $Pattern"
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

Write-Host "=== CodexForge Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution Review and Recovery Preview Mega Batch smoke ==="

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
$reviewTypesPath = Join-Path $root "src\lib\codexforge\minimal-synth-exec-review\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-recovery-preview-types.ts"
$reviewCatalogPath = Join-Path $root "src\lib\codexforge\minimal-synth-exec-review\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-recovery-preview-catalog.ts"
$reviewIndexPath = Join-Path $root "src\lib\codexforge\minimal-synth-exec-review\index.ts"
$mvpTypesPath = Join-Path $root "src\lib\codexforge\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-types.ts"
$mvpCatalogPath = Join-Path $root "src\lib\codexforge\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-catalog.ts"
$mvpRunnerPath = Join-Path $root "src\lib\codexforge\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-runner.server.ts"
$mvpIndexPath = Join-Path $root "src\lib\codexforge\backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp\index.ts"
$allSmokePath = Join-Path $root "scripts\smoke-codexforge-all.ps1"
$checkpointCurrentPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
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
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath,
  $mvpTypesPath,
  $mvpCatalogPath,
  $mvpRunnerPath,
  $mvpIndexPath,
  $allSmokePath,
  $checkpointCurrentPath,
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
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath,
  $mvpTypesPath,
  $mvpCatalogPath,
  $mvpRunnerPath,
  $mvpIndexPath
)
$allSmokeSource = Get-Content -Raw $allSmokePath
$checkpointCurrentSource = Get-Content -Raw $checkpointCurrentPath
$navigationTypesSource = Get-Content -Raw $navigationTypesPath
$athenaPanelSource = Get-Content -Raw $athenaPanelPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\minimal-synth-exec-review"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\navigation-shell")
)
$frontEndSource = Get-CombinedSourceText $frontEndSourceFiles

$jarvisNormalized = Normalize-Whitespace $jarvisSource
$homeNormalized = Normalize-Whitespace $homeSource
$videoNormalized = Normalize-Whitespace $videoSource
$typedModelNormalized = Normalize-Whitespace $typedModelSource
$allSmokeNormalized = Normalize-Whitespace $allSmokeSource
$checkpointNormalized = Normalize-Whitespace $checkpointCurrentSource

foreach ($needle in @(
  "5418-5449 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution Review and Recovery Preview",
  "5449",
  "Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution Review and Recovery Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $checkpointNormalized + " " + $allSmokeNormalized) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned minimal manual-gated synthetic dry-run execution MVP",
  "Synthetic MVP audit and approval preview",
  "Backend-owned minimal synthetic execution review",
  "Synthetic execution result review",
  "Synthetic execution gate failure review",
  "Synthetic execution recovery plan",
  "Synthetic execution recovery readiness",
  "Synthetic execution review audit summary",
  "Synthetic execution acceptance posture",
  "Athena can review the backend-owned minimal manual-gated synthetic dry-run execution MVP",
  "minimal synthetic execution review is preview-only",
  "server-only synthetic execution helper exists",
  "synthetic execution result is produced in memory only",
  "deterministic synthetic result only",
  "no frontend request is created",
  "no API route is created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "no provider execution",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "result capture MVP comes next",
  "current readiness: minimal-synthetic-execution-review-only / backend-only / in-memory-only / not provider-capable / not persistent",
  "acceptance state: not accepted for live execution / synthetic MVP accepted only",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

Assert-Contains $homeNormalized "CodexForge Operator Cockpit" "home contains CodexForge Operator Cockpit"
Assert-Contains $homeNormalized "no frontend request is created" "home contains no frontend request is created"
Assert-Contains $homeNormalized "no API route is created" "home contains no API route is created"
Assert-ContainsAny $homeNormalized @(
  "Athena can now review the backend-owned minimal manual-gated synthetic dry-run execution MVP",
  "Athena can now preview the backend-owned minimal manual-gated synthetic dry-run result capture MVP"
) "home contains current Athena synthetic dry-run progress copy"
Assert-ContainsAny $homeNormalized @(
  "minimal synthetic execution review is preview-only",
  "minimal synthetic result capture MVP is backend-only"
) "home contains synthetic dry-run posture copy"
Assert-ContainsAny $homeNormalized @(
  "server-only synthetic execution helper exists",
  "server-only synthetic result capture helper exists"
) "home contains server-only synthetic helper copy"
Assert-ContainsAny $homeNormalized @(
  "synthetic execution result is produced in memory only",
  "synthetic result capture is produced in memory only"
) "home contains in-memory-only synthetic copy"
Assert-ContainsAny $homeNormalized @(
  "result capture MVP comes next",
  "result capture review and recovery preview comes next"
) "home contains the current synthetic dry-run next-step copy"

foreach ($needle in @(
  "Video generation control",
  "Prompt / concept",
  "Output preview",
  "Generate video - locked"
)) {
  Assert-Contains $videoNormalized $needle "/jarvis-video still contains $needle"
}

foreach ($needle in @(
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-result-review-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-gate-failure-review-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-plan-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-recovery-readiness-checklist-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-audit-summary-preview-v1",
  "backend-owned-minimal-manual-gated-synthetic-dry-run-execution-acceptance-posture-preview-v1",
  "Backend-owned minimal synthetic execution review",
  "Synthetic execution result review",
  "Synthetic execution gate failure review",
  "Synthetic execution recovery plan",
  "Synthetic execution recovery readiness",
  "Synthetic execution review audit summary",
  "Synthetic execution acceptance posture",
  "buildStableMinimalSyntheticExecutionReviewKey",
  "buildStableSyntheticExecutionResultReviewKey",
  "buildStableSyntheticExecutionGateFailureReviewKey",
  "buildStableSyntheticExecutionRecoveryPlanKey",
  "buildStableSyntheticExecutionRecoveryReadinessChecklistKey",
  "buildStableSyntheticExecutionReviewAuditSummaryKey",
  "buildStableSyntheticExecutionAcceptancePostureKey",
  "listBackendOwnedMinimalManualGatedSyntheticDryRunExecutionReviews",
  "listSyntheticExecutionResultReviewRecords",
  "listSyntheticExecutionGateFailureReviewRecords",
  "listSyntheticExecutionRecoveryPlanPreviews",
  "listSyntheticExecutionRecoveryReadinessChecklistRecords",
  "listSyntheticExecutionReviewAuditSummaries",
  "listSyntheticExecutionAcceptancePostureRecords",
  "groupSyntheticExecutionReviewsByCapabilityFamily",
  "groupSyntheticExecutionReviewsByWorkspaceTarget",
  "buildSyntheticExecutionReviewSummary",
  "buildSyntheticExecutionResultReviewSummary",
  "buildSyntheticExecutionGateFailureSummary",
  "buildSyntheticExecutionRecoverySummary",
  "buildMinimalSyntheticResultCaptureMvpChecklist",
  "buildUniqueSyntheticExecutionReviewDisplayStrings",
  "server-only synthetic execution helper exists",
  "deterministic synthetic result only",
  "synthetic execution result is produced in memory only",
  "no model calls",
  "no prompt sending",
  "no provider SDK imports",
  "no provider execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no database writes",
  "no file writes"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

Assert-Contains $allSmokeSource "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-recovery-preview-mega-batch.ps1" "scripts/smoke-codexforge-all.ps1 references this new smoke"
Assert-Contains $checkpointCurrentSource "Highest detected phase: 5449" "checkpoint current doc reports Highest detected phase: 5449"
Assert-Contains $checkpointCurrentSource "Latest completed batch: 5418-5449 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution Review and Recovery Preview" "checkpoint current doc reports latest completed batch"
Assert-Contains $checkpointCurrentSource "Next likely batch: 5450-5481 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture MVP" "checkpoint current doc reports next likely batch"

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"

Assert-Contains $athenaPanelSource 'synthetic-execution-review-capability' "AthenaCommandCenterPanel synthetic execution review capability group keys are scoped"
Assert-Contains $athenaPanelSource 'synthetic-execution-review-workspace' "AthenaCommandCenterPanel synthetic execution review workspace group keys are scoped"
Assert-NotMatches $athenaPanelSource 'syntheticExecutionReviewCapabilityGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.capabilityFamilyId\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as synthetic execution review capability keys"
Assert-NotMatches $athenaPanelSource 'syntheticExecutionReviewWorkspaceGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.workspaceTarget\}' "AthenaCommandCenterPanel does not use raw repeated workspace ids as synthetic execution review workspace keys"

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

Write-Host "[PASS] Backend-owned minimal manual-gated synthetic dry-run execution review and recovery preview smoke passed."
