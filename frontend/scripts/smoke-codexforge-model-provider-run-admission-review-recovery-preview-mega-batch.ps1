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

Write-Host "=== CodexForge Model Provider Run Admission Review and Recovery Preview Mega Batch smoke ==="

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
$previewTypesPath = Join-Path $root "src\lib\codexforge\model-provider-run-admission-review-recovery-preview\model-provider-run-admission-review-recovery-preview-types.ts"
$previewCatalogPath = Join-Path $root "src\lib\codexforge\model-provider-run-admission-review-recovery-preview\model-provider-run-admission-review-recovery-preview-catalog.ts"
$previewIndexPath = Join-Path $root "src\lib\codexforge\model-provider-run-admission-review-recovery-preview\index.ts"
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
$athenaPanelSource = Get-Content -Raw $athenaPanelPath

$frontEndSourceFiles = Get-SourceFiles @(
  (Join-Path $root "src\app\athena"),
  (Join-Path $root "src\app\jarvis"),
  (Join-Path $root "src\app\jarvis-video"),
  (Join-Path $root "src\app\page.tsx"),
  (Join-Path $root "src\app\page-client.tsx"),
  (Join-Path $root "src\lib\codexforge\jarvis-unified-product-ia-map"),
  (Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map"),
  (Join-Path $root "src\lib\codexforge\model-provider-run-admission-review-recovery-preview"),
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
  "4906-4937 - Model Provider Run Admission Review and Recovery Preview",
  "4937",
  "Model Provider Run Admission Review and Recovery Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $docsNormalized + " " + $allSmokeSource) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Manual gated model provider run admission preview",
  "Run admission gate evaluation",
  "Admission ticket preview",
  "Admission blockers and recovery",
  "Model provider run admission review",
  "Admission decision review",
  "Gate failure review",
  "Admission recovery plan",
  "Admission recovery readiness",
  "Athena can review why model provider run admission is held",
  "admission review is preview-only",
  "run admission state: not admitted",
  "admission decision state: held",
  "admission token is not issued",
  "admission lease is not created",
  "admission ticket is not issued",
  "provider execution is blocked",
  "queue dispatch is blocked",
  "worker dispatch is blocked",
  "job execution is blocked",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "backend-owned run admission contract comes next",
  "decision state: held / not admitted",
  "top blocking gates",
  "top missing evidence",
  "manual recovery requirement",
  "explicit no-admission-no-execution statement",
  "operator approval gate failure",
  "manual confirmation gate failure",
  "kill switch gate failure",
  "audit gate failure",
  "server-only adapter gate failure",
  "opaque credential gate failure",
  "prompt payload review gate failure",
  "privacy/redaction gate failure",
  "cost/rate/timeout gate failure",
  "dry-run result review gate failure",
  "acceptance matrix gate failure",
  "queue/worker/job gates blocked",
  "recovery is manual review only",
  "retry disabled",
  "fallback disabled"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena is the main Jarvis control layer",
  "Open Athena Command Center",
  "Open Jarvis Video Studio",
  "Athena can now preview model provider run admission reviews",
  "admission review is preview-only",
  "admission decision remains held",
  "run admission state is not admitted",
  "backend-owned run admission contract comes next",
  "no model calls yet",
  "no prompt sending",
  "no provider SDKs imported",
  "Plugin/provider execution remains blocked until approvals and backend gates are satisfied",
  "queue, worker, and job execution remain blocked"
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
  Assert-Contains $videoNormalized $needle "/jarvis-video contains $needle"
}

foreach ($needle in @(
  "MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH",
  "MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_PHASE",
  "NEXT_BACKEND_OWNED_MODEL_PROVIDER_RUN_ADMISSION_CONTRACT_BATCH",
  "model-provider-run-admission-review-preview-v1",
  "model-provider-run-admission-decision-review-preview-v1",
  "model-provider-run-admission-gate-failure-review-preview-v1",
  "model-provider-run-admission-recovery-plan-preview-v1",
  "model-provider-run-admission-recovery-readiness-checklist-v1",
  "model-provider-run-admission-review-audit-summary-preview-v1",
  "model provider run admission review and recovery preview only",
  "admission review is preview-only",
  "decision review is preview-only",
  "gate failure review is preview-only",
  "recovery plan is preview-only",
  "recovery readiness is preview-only",
  "run admission state is not admitted",
  "admission decision remains held",
  "admission token is not issued",
  "admission lease is not created",
  "admission ticket is not issued",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no LLM/model calls",
  "no prompt sending",
  "no SDK imports",
  "no retry execution",
  "no fallback execution",
  "opaque credential references only",
  "backend-owned model provider run admission contract next",
  "buildStableAdmissionReviewKey",
  "buildStableAdmissionDecisionReviewKey",
  "buildStableGateFailureReviewKey",
  "buildStableAdmissionRecoveryPlanKey",
  "buildStableAdmissionRecoveryChecklistKey",
  "buildStableAdmissionReviewAuditSummaryKey",
  "listModelProviderRunAdmissionReviews",
  "listAdmissionDecisionReviews",
  "listGateFailureReviewRecords",
  "listAdmissionRecoveryPlanPreviews",
  "listAdmissionRecoveryReadinessChecklistRecords",
  "listAdmissionReviewAuditSummaries",
  "groupAdmissionReviewsByCapabilityFamily",
  "groupAdmissionReviewsByWorkspaceTarget",
  "buildAdmissionReviewSummary",
  "buildGateFailureSummary",
  "buildAdmissionRecoverySummary",
  "buildBackendOwnedRunAdmissionContractChecklist",
  "uniqueAdmissionReviewDisplayStrings",
  "No queue dispatch",
  "No worker dispatch",
  "No job execution",
  "No provider execution"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'currentReleaseGateBatch = "4906-4937 - Model Provider Run Admission Review and Recovery Preview"',
  "Phase 4937 Model Provider Run Admission Review and Recovery Preview",
  "smoke-codexforge-model-provider-run-admission-review-recovery-preview-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4937. Latest completed batch: 4906-4937 - Model Provider Run Admission Review and Recovery Preview. Previous completed batch: 4874-4905 - Manual Gated Model Provider Run Admission Preview.",
  "Highest detected phase: 4937",
  "Latest completed batch: 4906-4937 - Model Provider Run Admission Review and Recovery Preview",
  "Previous completed batch: 4874-4905 - Manual Gated Model Provider Run Admission Preview",
  "Next likely batch: 4938-4969 - Backend-Owned Model Provider Run Admission Contract",
  "model provider run admission review and recovery preview only",
  "admission review is preview-only",
  "decision review is preview-only",
  "gate failure review is preview-only",
  "recovery plan is preview-only",
  "recovery readiness is preview-only",
  "run admission state is not admitted",
  "admission decision remains held",
  "admission token is not issued",
  "admission lease is not created",
  "admission ticket is not issued",
  "recovery is manual review only",
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
  "backend-owned model provider run admission contract next"
)) {
  Assert-Contains $docsNormalized $needle "checkpoint docs contain $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"

Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( representativeAdmissionDecisionReview.key, "top-blocking-gate", index, gate )' "AthenaCommandCenterPanel uses contextual keys for representative decision blocking gates"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( representativeAdmissionDecisionReview.key, "top-missing-evidence", index, item )' "AthenaCommandCenterPanel uses contextual keys for representative decision missing evidence"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( record.key, "top-blocking-gate", index, gate )' "AthenaCommandCenterPanel uses contextual keys for decision review gate chips"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( record.key, "top-missing-evidence", index, item )' "AthenaCommandCenterPanel uses contextual keys for decision review evidence chips"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( "admission-recovery-readiness-blocked", "item", index, record.checklistId )' "AthenaCommandCenterPanel uses contextual keys for recovery readiness chips"
Assert-NotMatches $athenaPanelSource 'topBlockingGates\.map\(\(gate,\s*index\)\s*=>\s*\(\s*<span\s+key=\{gate\}' "AthenaCommandCenterPanel does not use raw blocking gate ids as chip keys"
Assert-NotMatches $athenaPanelSource 'topMissingEvidence\.map\(\(item,\s*index\)\s*=>\s*\(\s*<span\s+key=\{item\}' "AthenaCommandCenterPanel does not use raw evidence labels as chip keys"
Assert-NotMatches $athenaPanelSource 'blockedAdmissionRecoveryReadinessChecklistRecords\.map\(\s*\(record,\s*index\)\s*=>\s*\(\s*<span\s+key=\{record\.checklistId\}' "AthenaCommandCenterPanel does not use raw checklist ids as chip keys"

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

Write-Host "[PASS] CodexForge model provider run admission review and recovery preview checks passed."
