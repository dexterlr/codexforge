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

Write-Host "=== CodexForge Manual Gated Model Provider Run Admission Preview Mega Batch smoke ==="

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
$previewTypesPath = Join-Path $root "src\lib\codexforge\manual-gated-model-provider-run-admission-preview\manual-gated-model-provider-run-admission-preview-types.ts"
$previewCatalogPath = Join-Path $root "src\lib\codexforge\manual-gated-model-provider-run-admission-preview\manual-gated-model-provider-run-admission-preview-catalog.ts"
$previewIndexPath = Join-Path $root "src\lib\codexforge\manual-gated-model-provider-run-admission-preview\index.ts"
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
  (Join-Path $root "src\lib\codexforge\manual-gated-model-provider-run-admission-preview"),
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
  "4874-4905 - Manual Gated Model Provider Run Admission Preview",
  "4905",
  "Manual Gated Model Provider Run Admission Preview"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $typedModelNormalized + " " + $docsNormalized + " " + $allSmokeSource) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Model provider approval packet",
  "Run intent preview",
  "Approval gate checklist",
  "Run intent blockers",
  "Manual gated model provider run admission preview",
  "Run admission gate evaluation",
  "Admission ticket preview",
  "Admission blockers and recovery",
  "Athena can preview manual model provider run admission",
  "run admission is preview-only",
  "run admission state: not admitted",
  "admission decision is held",
  "admission token is not issued",
  "admission lease is not created",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "provider execution is blocked",
  "queue dispatch is blocked",
  "worker dispatch is blocked",
  "job execution is blocked",
  "manual approval required",
  "manual confirmation required",
  "kill switch required",
  "audit required",
  "run admission review and recovery preview comes next",
  "operator approval gate",
  "manual confirmation gate",
  "kill switch gate",
  "audit gate",
  "server-only adapter gate",
  "opaque credential gate",
  "prompt payload review gate",
  "privacy/redaction gate",
  "cost/rate/timeout gate",
  "idempotency/replay gate",
  "single-run lock gate",
  "dry-run result review gate",
  "acceptance matrix gate",
  "overall gate decision: held / not admitted",
  "ticket state: not issued",
  "admission token state: not issued",
  "admission lease state: not created",
  "queue dispatch state: not dispatched",
  "worker dispatch state: not dispatched",
  "job execution state: not executed"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
}

foreach ($needle in @(
  "CodexForge Operator Cockpit",
  "Athena is the main Jarvis control layer",
  "Open Athena Command Center",
  "Open Jarvis Video Studio",
  "Athena can now preview manual gated model provider run admission",
  "run admission is preview-only",
  "run admission state is not admitted",
  "admission token is not issued",
  "admission lease is not created",
  "run admission review and recovery preview comes next",
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
  "MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_BATCH",
  "MANUAL_GATED_MODEL_PROVIDER_RUN_ADMISSION_PREVIEW_PHASE",
  "NEXT_MODEL_PROVIDER_RUN_ADMISSION_REVIEW_RECOVERY_PREVIEW_BATCH",
  "manual-gated-model-provider-run-admission-preview-v1",
  "manual-run-admission-gate-evaluation-preview-v1",
  "manual-run-admission-ticket-preview-v1",
  "manual-run-admission-denial-recovery-preview-v1",
  "manual-run-admission-blocker-matrix-preview-v1",
  "manual-run-admission-audit-preview-v1",
  "manual gated model provider run admission preview only",
  "run admission is preview-only",
  "run admission state is not admitted",
  "admission decision is held",
  "admission token is not issued",
  "admission lease is not created",
  "gate evaluation is preview-only",
  "admission ticket is preview-only",
  "admission blockers are preview-only",
  "recovery is manual review only",
  "no SDK imports",
  "opaque credential references only",
  "no plaintext secrets",
  "no retry execution",
  "no fallback execution",
  "run admission review and recovery preview next",
  "buildStableManualRunAdmissionPreviewKey",
  "buildStableAdmissionGateEvaluationKey",
  "buildStableAdmissionTicketPreviewKey",
  "buildStableAdmissionDenialRecoveryKey",
  "buildStableManualRunAdmissionBlockerKey",
  "buildStableAdmissionAuditPreviewKey",
  "listManualGatedModelProviderRunAdmissionPreviews",
  "listAdmissionGateEvaluationRecords",
  "listRunAdmissionTicketPreviews",
  "listRunAdmissionDenialRecoveryPreviews",
  "listManualRunAdmissionBlockerMatrix",
  "listManualAdmissionAuditPreviews",
  "groupManualRunAdmissionPreviewsByCapabilityFamily",
  "groupManualRunAdmissionPreviewsByWorkspaceTarget",
  "buildManualRunAdmissionSummary",
  "buildAdmissionGateSummary",
  "buildAdmissionBlockerSummary",
  "buildNextRunAdmissionReviewAndRecoveryChecklist",
  "uniqueManualRunAdmissionDisplayStrings",
  "No queue dispatch",
  "No worker dispatch",
  "No job execution",
  "No provider execution"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'currentReleaseGateBatch = "4874-4905 - Manual Gated Model Provider Run Admission Preview"',
  "Phase 4905 Manual Gated Model Provider Run Admission Preview",
  "smoke-codexforge-manual-gated-model-provider-run-admission-preview-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4905. Latest completed batch: 4874-4905 - Manual Gated Model Provider Run Admission Preview. Previous completed batch: 4842-4873 - Model Provider Approval Packet and Run Intent Preview.",
  "Highest detected phase: 4905",
  "Latest completed batch: 4874-4905 - Manual Gated Model Provider Run Admission Preview",
  "Previous completed batch: 4842-4873 - Model Provider Approval Packet and Run Intent Preview",
  "Next likely batch: 4906-4937 - Model Provider Run Admission Review and Recovery Preview"
)) {
  Assert-Contains $docsNormalized $needle "checkpoint docs contain $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"

Assert-Contains $athenaPanelNormalized 'manualRunAdmissionBlockersForDisplay.map((blocker) => (' "AthenaCommandCenterPanel renders admission blockers for display"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( blocker.key, "capability", index, family.id )' "AthenaCommandCenterPanel uses contextual capability keys for admission blockers"
Assert-Contains $athenaPanelNormalized 'buildScopedItemKey( blocker.key, "workspace", index, target )' "AthenaCommandCenterPanel uses contextual workspace keys for admission blockers"
Assert-NotMatches $athenaPanelNormalized 'manualRunAdmissionBlockersForDisplay\.map\(\(blocker\)\s*=>\s*\([\s\S]*key=\{family\.id\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as sibling keys in admission blocker lists"

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

Write-Host "[OK] CodexForge Manual Gated Model Provider Run Admission Preview Mega Batch smoke passed."
