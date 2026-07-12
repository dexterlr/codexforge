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

Write-Host "=== CodexForge Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview Mega Batch smoke ==="

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
$reviewTypesPath = Join-Path $root "src\lib\codexforge\backend-owned-model-provider-dry-run-runner-review-recovery-preview\backend-owned-model-provider-dry-run-runner-review-recovery-preview-types.ts"
$reviewCatalogPath = Join-Path $root "src\lib\codexforge\backend-owned-model-provider-dry-run-runner-review-recovery-preview\backend-owned-model-provider-dry-run-runner-review-recovery-preview-catalog.ts"
$reviewIndexPath = Join-Path $root "src\lib\codexforge\backend-owned-model-provider-dry-run-runner-review-recovery-preview\index.ts"
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
$videoSource = Get-CombinedFileText @(
  $videoPagePath,
  $videoPageClientPath,
  $videoPanelPath
)
$typedModelSource = Get-CombinedFileText @(
  $reviewTypesPath,
  $reviewCatalogPath,
  $reviewIndexPath
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
  (Join-Path $root "src\lib\codexforge\backend-owned-model-provider-dry-run-runner-review-recovery-preview"),
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
  "5002-5033 - Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview",
  "5033",
  "Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $docsNormalized + " " + $allSmokeSource) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned model provider dry-run runner contract",
  "Dry-run runner request/response contract",
  "Dry-run runner gate schema",
  "Dry-run runner readiness matrix",
  "Backend-owned dry-run runner review",
  "Dry-run runner decision review",
  "Dry-run runner gate failure review",
  "Dry-run runner recovery plan",
  "Dry-run runner recovery readiness",
  "Dry-run runner acceptance posture",
  "Athena can review why the backend-owned dry-run runner is held",
  "dry-run runner review is preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "dry-run response is not received",
  "dry-run error is not received",
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
  "synthetic dry-run runner skeleton comes next",
  "decision state: held / not executable",
  "runner reason summary",
  "top blocking gates",
  "top missing evidence",
  "manual recovery requirement",
  "backend skeleton dependency",
  "explicit no-runner-invocation-no-execution statement",
  "backend admission contract gate failure",
  "admission token gate failure",
  "admission lease gate failure",
  "runner invocation gate failure",
  "provider adapter boundary gate failure",
  "queue/worker/job gates blocked",
  "persistence gate failure",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled",
  "acceptance state: not accepted / preview-only"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena is the main Jarvis control layer",
  "Open Athena Command Center",
  "Open Jarvis Video Studio",
  "Athena can now preview backend-owned model provider dry-run runner reviews",
  "dry-run runner review is preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "synthetic dry-run runner skeleton comes next",
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
  "BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_BATCH",
  "BACKEND_OWNED_MODEL_PROVIDER_DRY_RUN_RUNNER_REVIEW_RECOVERY_PREVIEW_PHASE",
  "NEXT_BACKEND_OWNED_MODEL_PROVIDER_SYNTHETIC_DRY_RUN_RUNNER_SKELETON_BATCH",
  "backend-owned model provider dry-run runner review and recovery preview only",
  "dry-run runner review is preview-only",
  "dry-run runner decision review is preview-only",
  "dry-run runner gate failure review is preview-only",
  "dry-run runner recovery plan is preview-only",
  "dry-run runner recovery readiness is preview-only",
  "dry-run runner review audit summary is preview-only",
  "dry-run runner acceptance posture is preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "dry-run response is not received",
  "dry-run error is not received",
  "provider response is not received",
  "model output is not generated",
  "fixture result is not produced",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no LLM/model calls",
  "no prompt sending",
  "no provider SDK imports",
  "no retry execution",
  "no fallback execution",
  "opaque credential references only",
  "backend-owned synthetic dry-run runner skeleton next",
  "buildStableBackendDryRunRunnerReviewKey",
  "buildStableDryRunRunnerDecisionReviewKey",
  "buildStableDryRunRunnerGateFailureReviewKey",
  "buildStableDryRunRunnerRecoveryPlanKey",
  "buildStableDryRunRunnerRecoveryReadinessChecklistKey",
  "buildStableDryRunRunnerReviewAuditSummaryKey",
  "buildStableDryRunRunnerAcceptancePostureKey",
  "listBackendOwnedModelProviderDryRunRunnerReviews",
  "listDryRunRunnerDecisionReviewRecords",
  "listDryRunRunnerGateFailureReviewRecords",
  "listDryRunRunnerRecoveryPlanPreviews",
  "listDryRunRunnerRecoveryReadinessChecklistRecords",
  "listDryRunRunnerReviewAuditSummaries",
  "listDryRunRunnerAcceptancePostureRecords",
  "groupDryRunRunnerReviewsByCapabilityFamily",
  "groupDryRunRunnerReviewsByWorkspaceTarget",
  "buildDryRunRunnerReviewSummary",
  "buildDryRunRunnerGateFailureSummary",
  "buildDryRunRunnerRecoverySummary",
  "buildSyntheticDryRunRunnerSkeletonChecklist",
  "uniqueDryRunRunnerReviewDisplayStrings"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'currentReleaseGateBatch = "5002-5033 - Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview"',
  "Phase 5033 Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview",
  "smoke-codexforge-backend-owned-model-provider-dry-run-runner-review-recovery-preview-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 5033",
  "Latest completed batch: 5002-5033 - Backend-Owned Model Provider Dry-Run Runner Review and Recovery Preview",
  "Previous completed batch: 4970-5001 - Backend-Owned Model Provider Dry-Run Runner Contract",
  "Next likely batch: 5034-5065 - Backend-Owned Model Provider Synthetic Dry-Run Runner Skeleton",
  "backend-owned model provider dry-run runner review and recovery preview only",
  "dry-run runner review is preview-only",
  "dry-run runner decision review is preview-only",
  "dry-run runner gate failure review is preview-only",
  "dry-run runner recovery plan is preview-only",
  "dry-run runner recovery readiness is preview-only",
  "dry-run runner acceptance posture is preview-only",
  "dry-run request is not created",
  "dry-run invocation is not invoked",
  "dry-run execution is not executed",
  "dry-run response is not received",
  "dry-run error is not received",
  "provider response is not received",
  "model output is not generated",
  "fixture result is not produced",
  "acceptance state is not accepted / preview-only",
  "recovery is manual review only",
  "backend-owned synthetic dry-run runner skeleton next"
)) {
  Assert-Contains $docsNormalized $needle "checkpoint docs contain $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"

Assert-Contains $athenaPanelNormalized '"backend-dry-run-runner-review-capability-group",' "AthenaCommandCenterPanel uses contextual keys for review capability groups"
Assert-Contains $athenaPanelNormalized '"backend-dry-run-runner-review-workspace-group",' "AthenaCommandCenterPanel uses contextual keys for review workspace groups"
Assert-Contains $athenaPanelNormalized '"backend-dry-run-runner-review-summary",' "AthenaCommandCenterPanel uses contextual keys for review summary chips"
Assert-Contains $athenaPanelNormalized 'dryRunRunnerGateFailureReviewsForDisplay = uniqueRecordsByString' "AthenaCommandCenterPanel deduplicates gate failure review display records"
Assert-Contains $athenaPanelNormalized '"backend-dry-run-runner-gate-failure-summary",' "AthenaCommandCenterPanel uses contextual keys for gate failure summary chips"
Assert-Contains $athenaPanelNormalized 'representativeDryRunRunnerDecisionReview.key, "top-gate", index, item' "AthenaCommandCenterPanel uses contextual keys for decision review gate chips"
Assert-Contains $athenaPanelNormalized '"acceptance-blocker",' "AthenaCommandCenterPanel uses contextual keys for acceptance blocker chips"
Assert-Contains $athenaPanelNormalized '"dispatch-blocker",' "AthenaCommandCenterPanel uses contextual keys for queue/worker/job blocker chips"
Assert-NotMatches $athenaPanelSource 'dryRunRunnerReviewCapabilityGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.capabilityFamilyId\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as dry-run review keys"
Assert-NotMatches $athenaPanelSource 'dryRunRunnerReviewWorkspaceGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.workspaceTarget\}' "AthenaCommandCenterPanel does not use raw repeated workspace ids as dry-run review keys"
Assert-NotMatches $athenaPanelSource 'dryRunRunnerGateFailureReviewsForDisplay\.map\(\(record\)\s*=>\s*\(\s*<article\s+key=\{record\.failedGateId\}' "AthenaCommandCenterPanel does not use raw failed gate ids as dry-run gate keys"
Assert-NotMatches $athenaPanelSource 'backendOwnedDryRunRunnerReviews\.map\(\(record\)\s*=>\s*\(\s*<article\s+key=\{record\.selectedCapabilityFamily\.id\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as dry-run review cards"

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

Write-Host "[PASS] CodexForge backend-owned model provider dry-run runner review and recovery preview checks passed."
