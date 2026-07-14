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

Write-Host "=== CodexForge Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract Mega Batch smoke ==="

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
$joinTypesPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-audit-approval-join-contract\backend-owned-synthetic-dry-run-audit-approval-join-contract-types.ts"
$joinCatalogPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-audit-approval-join-contract\backend-owned-synthetic-dry-run-audit-approval-join-contract-catalog.ts"
$joinIndexPath = Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-audit-approval-join-contract\index.ts"
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
  $joinTypesPath,
  $joinCatalogPath,
  $joinIndexPath,
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
  $joinTypesPath,
  $joinCatalogPath,
  $joinIndexPath
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
  (Join-Path $root "src\lib\codexforge\backend-owned-synthetic-dry-run-audit-approval-join-contract"),
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
$athenaPanelNormalized = Normalize-Whitespace $athenaPanelSource

foreach ($needle in @(
  "5130-5161 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract",
  "5161",
  "Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract"
)) {
  Assert-Contains ($jarvisNormalized + " " + $homeNormalized + " " + $providersNormalized + " " + $typedModelNormalized + " " + $docsNormalized + " " + $allSmokeSource) $needle "batch marker contains $needle"
}

Assert-Contains (Get-Content -Raw $athenaPagePath) 'export { default } from "../jarvis/page";' "/athena aliases /jarvis"

foreach ($needle in @(
  "Athena",
  "Athena Command Center",
  "Backend-owned synthetic dry-run result capture review",
  "Result capture acceptance posture",
  "Backend-owned synthetic dry-run audit and approval join contract",
  "Synthetic audit join contract",
  "Synthetic approval join contract",
  "Result to audit and approval link contract",
  "Audit and approval join request/response contract",
  "Audit and approval join gates",
  "Audit and approval join readiness matrix",
  "Audit and approval evidence packet preview",
  "Athena can preview backend-owned synthetic dry-run audit and approval join contracts",
  "audit and approval join contract is preview-only",
  "audit join state: not persisted",
  "approval join state: not persisted",
  "result reference state: not persisted",
  "evidence packet state: preview-only",
  "join request is not created",
  "join invocation is not invoked",
  "join response is not received",
  "join error is not received",
  "database write is not implemented",
  "file write is not implemented",
  "No prompt sending",
  "No model calls yet",
  "No provider SDKs imported",
  "end-to-end packet review and recovery preview comes next"
)) {
  Assert-Contains $jarvisNormalized $needle "/jarvis contains $needle"
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
  "Backend-owned synthetic dry-run audit and approval join contract",
  "Synthetic audit join contract",
  "Synthetic approval join contract",
  "Result to audit and approval link contract",
  "Audit and approval join request/response contract",
  "Audit and approval join gates",
  "Audit and approval join readiness matrix",
  "Audit and approval evidence packet preview",
  "audit and approval join review is preview-only",
  "audit join state: not persisted",
  "approval join state: not persisted",
  "result reference state: not persisted",
  "evidence packet state: preview-only",
  "end-to-end packet review and recovery preview comes next"
)) {
  Assert-Contains $providersNormalized $needle "providers contains $needle"
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
  "BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_BATCH",
  "BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_CONTRACT_PHASE",
  "PREVIOUS_COMPLETED_BACKEND_OWNED_SYNTHETIC_DRY_RUN_RESULT_CAPTURE_REVIEW_RECOVERY_PREVIEW_BATCH",
  "NEXT_BACKEND_OWNED_SYNTHETIC_DRY_RUN_AUDIT_APPROVAL_JOIN_REVIEW_RECOVERY_PREVIEW_BATCH",
  "backend-owned synthetic dry-run audit and approval join contract only",
  "audit and approval join contract is preview-only",
  "audit join state is not persisted",
  "approval join state is not persisted",
  "result reference state is not persisted",
  "evidence packet is preview-only",
  "join request is not created",
  "join invocation is not invoked",
  "join response is not received",
  "join error is not received",
  "audit envelope state is not created",
  "approval envelope state is not created",
  "audit append state is not appended",
  "approval append state is not appended",
  "audit persistence is not implemented",
  "approval persistence is not implemented",
  "result persistence is not implemented",
  "database write is not implemented",
  "file write is not implemented",
  "result id is not issued",
  "result digest is deterministic preview only",
  "audit and approval joins are not persisted",
  "no prompt sending",
  "no LLM/model calls",
  "no provider SDK imports",
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
  "No audit join. No persistence.",
  "No approval join. No persistence.",
  "No result-audit-approval link persisted.",
  "No join request created.",
  "No join response. No persistence.",
  "No join error. No retry. No fallback.",
  "No evidence packet persistence.",
  "buildStableSyntheticAuditApprovalJoinContractKey",
  "buildStableSyntheticAuditJoinKey",
  "buildStableSyntheticApprovalJoinKey",
  "buildStableResultAuditApprovalLinkKey",
  "buildStableAuditApprovalJoinRequestKey",
  "buildStableAuditApprovalJoinResponseKey",
  "buildStableAuditApprovalJoinErrorKey",
  "buildStableAuditApprovalJoinGateKey",
  "buildStableAuditApprovalJoinReadinessKey",
  "buildStableAuditApprovalEvidencePacketKey",
  "listBackendOwnedSyntheticDryRunAuditApprovalJoinContracts",
  "listSyntheticAuditJoinContracts",
  "listSyntheticApprovalJoinContracts",
  "listResultAuditApprovalLinkContracts",
  "listAuditApprovalJoinRequestContracts",
  "listAuditApprovalJoinResponseContracts",
  "listAuditApprovalJoinErrorContracts",
  "listAuditApprovalJoinGateRecords",
  "listAuditApprovalJoinReadinessMatrixRecords",
  "listAuditApprovalEvidencePacketPreviews",
  "groupAuditApprovalJoinContractsByCapabilityFamily",
  "groupAuditApprovalJoinContractsByWorkspaceTarget",
  "buildAuditApprovalJoinContractSummary",
  "buildAuditApprovalJoinGateSummary",
  "buildAuditApprovalJoinReadinessSummary",
  "buildNextAuditApprovalJoinReviewAndRecoveryChecklist",
  "uniqueAuditApprovalJoinDisplayStrings"
)) {
  Assert-Contains $typedModelNormalized $needle "typed model/data contains $needle"
}

foreach ($needle in @(
  'currentReleaseGateBatch = "5130-5161 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract"',
  'currentReleaseGateBatch = "5098-5129 - Backend-Owned Synthetic Dry-Run Result Capture Review and Recovery Preview"',
  "Phase 5161 Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract",
  "smoke-codexforge-backend-owned-synthetic-dry-run-audit-approval-join-contract-mega-batch.ps1"
)) {
  Assert-Contains $allSmokeSource $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 5161. Latest completed batch: 5130-5161 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract. Previous completed batch: 5098-5129 - Backend-Owned Synthetic Dry-Run Result Capture Review and Recovery Preview. Next likely batch: 5162-5193 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview.",
  "Highest detected phase: 5161",
  "Latest completed batch: 5130-5161 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Contract",
  "Previous completed batch: 5098-5129 - Backend-Owned Synthetic Dry-Run Result Capture Review and Recovery Preview",
  "Next likely batch: 5162-5193 - Backend-Owned Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview",
  "backend-owned synthetic dry-run audit and approval join contract only",
  "audit and approval join contract is preview-only",
  "audit join state is not persisted",
  "approval join state is not persisted",
  "result reference state is not persisted",
  "evidence packet is preview-only",
  "join request is not created",
  "join invocation is not invoked",
  "join response is not received",
  "join error is not received",
  "audit envelope state is not created",
  "approval envelope state is not created",
  "audit append state is not appended",
  "approval append state is not appended",
  "audit persistence is not implemented",
  "approval persistence is not implemented",
  "result persistence is not implemented",
  "database write is not implemented",
  "file write is not implemented",
  "result id is not issued",
  "result digest is deterministic preview only",
  "audit and approval joins are not persisted",
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
  "backend-owned synthetic dry-run audit and approval join review and recovery preview next"
)) {
  Assert-Contains $docsNormalized $needle "checkpoint docs contain $needle"
}

Assert-Contains $navigationTypesSource "export type CodexForgeNavigationRouteHref = Route;" "route href typing remains Route-based"
Assert-Contains $navigationTypesSource "export type CodexForgeCommandDeckRole =" "commandDeckRole typing remains enumerated"
Assert-Contains $navigationTypesSource "commandDeckRole: CodexForgeCommandDeckRole;" "navigation route type still uses commandDeckRole typing"

foreach ($needle in @(
  '"audit-approval-join-summary",',
  '"audit-approval-join-capability-group",',
  '"audit-approval-join-workspace-group",',
  '"audit-approval-join-current-review-layer",',
  '"audit-approval-join-gate-summary",',
  '"audit-approval-join-readiness-summary",'
)) {
  Assert-Contains $athenaPanelNormalized $needle "AthenaCommandCenterPanel contains contextual audit/approval join key scope $needle"
}

Assert-NotMatches $athenaPanelSource 'auditApprovalJoinCapabilityGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.capabilityFamilyId\}' "AthenaCommandCenterPanel does not use raw repeated capability ids as audit/approval join capability keys"
Assert-NotMatches $athenaPanelSource 'auditApprovalJoinWorkspaceGroups\.map\(\(group,\s*index\)\s*=>\s*\(\s*<span\s+key=\{group\.workspaceTarget\}' "AthenaCommandCenterPanel does not use raw repeated workspace ids as audit/approval join workspace keys"

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

Write-Host "[PASS] CodexForge backend-owned synthetic dry-run audit and approval join contract checks passed."
