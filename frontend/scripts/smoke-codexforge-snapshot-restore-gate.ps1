param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirectoryExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" }
  Write-Host "[PASS] directory exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge Snapshot Restore Approval Gate smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\snapshot-restore-gate"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\snapshot-restore\page.tsx"
$pageClientPath = "src\app\snapshot-restore\page-client.tsx"
$snapshotDir = "src\lib\codexforge\brain-snapshot-manager"
$replayDir = "src\lib\codexforge\runtime-event-replay"
$governanceDir = "src\lib\codexforge\brain-mutation-governance"
$journalDir = "src\lib\codexforge\runtime-event-journal"
$brainPage = "src\app\brain\page-client.tsx"
$activityPage = "src\app\activity\page-client.tsx"
$activityDir = "src\lib\codexforge\global-activity"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$navigationDir = "src\lib\codexforge\navigation-shell"
$globalNavigationDir = "src\lib\codexforge\navigation"
$paletteDir = "src\lib\codexforge\command-palette"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "snapshot-restore-gate-types.ts",
  "restore-candidate.ts",
  "restore-comparison-evidence.ts",
  "restore-replay-evidence.ts",
  "restore-risk-policy.ts",
  "restore-approval-packet.ts",
  "restore-request-preview.ts",
  "restore-governance-ledger.ts",
  "restore-gate-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "SnapshotRestoreGatePanel.tsx",
  "RestoreCandidatePanel.tsx",
  "RestoreComparisonEvidencePanel.tsx",
  "RestoreReplayEvidencePanel.tsx",
  "RestoreRiskPolicyPanel.tsx",
  "RestoreApprovalPacketPanel.tsx",
  "RestoreRequestPreviewPanel.tsx",
  "RestoreGovernanceLedgerPanel.tsx",
  "SnapshotRestoreSafetyNotice.tsx",
  "SnapshotRestoreEmptyState.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw $indexPath
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$snapshotSource = (Get-ChildItem $snapshotDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$replaySource = (Get-ChildItem $replayDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$governanceSource = (Get-ChildItem $governanceDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$journalSource = (Get-ChildItem $journalDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$brainSource = Get-Content -Raw $brainPage
$activitySource = (Get-Content -Raw $activityPage) + "`n" + ((Get-ChildItem $activityDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$stabilizationSource = (Get-ChildItem $stabilizationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$navigationSource = ((Get-ChildItem $navigationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n") + "`n" + ((Get-ChildItem $globalNavigationDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$paletteSource = (Get-ChildItem $paletteDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem $missionDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$restoreSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$integratedSource = $restoreSource + "`n" + $snapshotSource + "`n" + $replaySource + "`n" + $governanceSource + "`n" + $journalSource + "`n" + $brainSource + "`n" + $activitySource + "`n" + $stabilizationSource + "`n" + $navigationSource + "`n" + $paletteSource + "`n" + $missionSource

foreach ($export in @(
  "buildSnapshotRestoreCandidate",
  "validateSnapshotRestoreCandidate",
  "buildSnapshotRestoreComparisonEvidence",
  "buildSnapshotRestoreComparisonItem",
  "buildSnapshotRestoreReplayEvidence",
  "buildSnapshotRestoreReplayEvidenceItem",
  "buildSnapshotRestoreRiskPolicy",
  "isSnapshotRestoreAllowed",
  "buildSnapshotRestoreApprovalPacket",
  "validateSnapshotRestoreApprovalPacket",
  "buildSnapshotRestoreRequestPreview",
  "validateSnapshotRestoreRequestPreview",
  "buildSnapshotRestoreGovernanceLedger",
  "buildSnapshotRestoreGateSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($marker in @(
  "SnapshotRestoreGatePanel renders",
  "RestoreCandidatePanel renders",
  "RestoreComparisonEvidencePanel renders",
  "RestoreReplayEvidencePanel renders",
  "RestoreRiskPolicyPanel renders",
  "RestoreApprovalPacketPanel renders",
  "RestoreRequestPreviewPanel renders",
  "RestoreGovernanceLedgerPanel renders",
  "SnapshotRestoreSafetyNotice renders",
  "SnapshotRestoreEmptyState renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $pageSource "SnapshotRestoreGatePanel" "/snapshot-restore imports/renders SnapshotRestoreGatePanel"
Assert-Contains $snapshotSource "Snapshot Restore Approval Gate" "Brain Snapshot Manager references Snapshot Restore Approval Gate if integrated"
Assert-Contains $replaySource "Snapshot Restore Gate" "Runtime Event Replay references Snapshot Restore Gate if integrated"
Assert-Contains $governanceSource "Snapshot Restore Gate" "Brain Mutation Governance references Snapshot Restore Gate if integrated"
Assert-Contains $journalSource "Snapshot Restore Gate" "Runtime Event Journal references Snapshot Restore Gate if integrated"
Assert-Contains $brainSource "Snapshot Restore Gate" "/brain references Snapshot Restore Gate if integrated"
Assert-Contains $activitySource "Snapshot Restore Gate" "/activity references Snapshot Restore Gate if integrated"
Assert-Contains $stabilizationSource "Snapshot Restore Gate readiness" "Stabilization references Snapshot Restore Gate if integrated"
Assert-Contains $navigationSource "Snapshot Restore" "Navigation Shell references Snapshot Restore if integrated"
Assert-Contains $paletteSource "Go to Snapshot Restore Gate" "Command Palette includes Go to Snapshot Restore Gate if integrated"
Assert-Contains $paletteSource "Copy snapshot restore review prompt" "Command Palette includes Copy snapshot restore review prompt"
Assert-Contains $missionSource "Snapshot Restore Approval Gate readiness" "Mission Control includes Snapshot Restore Approval Gate readiness if integrated"

foreach ($text in @(
  "preview-only",
  "restore blocked by default",
  "no graph mutation",
  "no snapshot restore in Phase 51",
  "no saveBrainGraph from UI",
  "no appendEvent",
  "future guarded snapshot executor required",
  "evidence is context, not authority",
  "preserve latest-message authority"
)) {
  Assert-Contains $uiSource $text "UI says $text"
}

foreach ($text in @(
  "Snapshot restore policy returns allowed false by default",
  "Comparison evidence required",
  "Replay evidence required for graph-changing restore",
  "Governance review required",
  "saveBrainGraph from UI blocked",
  "Live graph mutation blocked"
)) {
  Assert-Contains $domainSource $text "restore policy $text"
}

Assert-Contains $domainSource "Approval packet defaults approved false" "approval packet defaults approved false"
Assert-Contains $domainSource "Request preview says request preview only" "request preview says request preview only"
Assert-Contains $domainSource "restore-blocked" "governance ledger includes restore-blocked"
Assert-Contains $domainSource "future-executor-required" "governance ledger includes future-executor-required"

Assert-NotMatches $restoreSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "loadBrainGraph\s*\(|graph\.nodes\.push|graph\.edges\.push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']|applyDiff\s*\(' "no direct apply-diff call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']|writeFile\s*\(' "no direct write-file call from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']|runCommand\s*\(' "no direct run-command call from UI"
Assert-NotMatches $restoreSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $restoreSource "Math.random" "no Math.random"
Assert-NotContains $restoreSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $restoreSource "d3-force" "no d3-force"
Assert-NotMatches $restoreSource "https?://" "no external network dependency"
Assert-NotMatches $restoreSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $restoreSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $restoreSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $restoreSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "openai.chat")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic snapshot-restore-gate files: $marker"
}

Assert-NotMatches $restoreSource "localStorage\.setItem\s*\(|sessionStorage\.setItem\s*\(|indexedDB\.open\s*\(|persistRestore|saveRestore" "no auto-persistence"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $integratedSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildSnapshotRestoreStableKey" "stable key helper exists"
Assert-Contains $uiSource "buildSnapshotRestoreGateReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-snapshot-restore-gate\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Snapshot Restore Gate exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Snapshot Restore Gate" "managed smoke suite includes Snapshot Restore Gate exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/snapshot-restore" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /snapshot-restore returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /snapshot-restore route reachable"
} catch {
  Write-Host "[SKIP] /snapshot-restore route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Snapshot Restore Approval Gate smoke passed."
