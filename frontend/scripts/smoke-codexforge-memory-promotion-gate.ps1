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
Write-Host "=== CodexForge Memory Promotion Gate smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\memory-promotion-gate"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$memoryInboxPage = "src\lib\codexforge\operator-memory-inbox\components\OperatorMemoryInbox.tsx"
$memoryPage = "src\app\memory\page-client.tsx"
$brainPage = "src\app\brain\page-client.tsx"
$activityPage = "src\app\activity\page-client.tsx"
$stabilizationDir = "src\lib\codexforge\stabilization-command-center"
$commandPalettePath = "src\lib\codexforge\brain\components\commands\brain-command-registry.ts"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$memorySuitePath = "scripts\smoke-codexforge-memory-suite.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "memory-promotion-gate-types.ts",
  "promotion-gate-input.ts",
  "promotion-approval-packet.ts",
  "promotion-policy.ts",
  "promotion-event-preview.ts",
  "promotion-request-packet.ts",
  "promotion-execution-bridge.ts",
  "promotion-audit-ledger.ts",
  "promotion-gate-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "MemoryPromotionGatePanel.tsx",
  "PromotionGateInputPanel.tsx",
  "PromotionApprovalPacketPanel.tsx",
  "PromotionPolicyPanel.tsx",
  "PromotionEventPreviewPanel.tsx",
  "PromotionRequestPacketPanel.tsx",
  "PromotionExecutionBridgePanel.tsx",
  "PromotionAuditLedgerPanel.tsx",
  "MemoryPromotionSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw $indexPath
$memoryInboxSource = Get-Content -Raw $memoryInboxPage
$memorySource = Get-Content -Raw $memoryPage
$brainSource = Get-Content -Raw $brainPage
$activitySource = Get-Content -Raw $activityPage
$stabilizationSource = (Get-ChildItem $stabilizationDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commandSource = Get-Content -Raw $commandPalettePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$memorySuite = Get-Content -Raw $memorySuitePath
$gateSource = $domainSource + "`n" + $uiSource
$integratedSource = $gateSource + "`n" + $memoryInboxSource + "`n" + $memorySource + "`n" + $brainSource + "`n" + $activitySource + "`n" + $stabilizationSource + "`n" + $commandSource + "`n" + $missionSource

foreach ($export in @(
  "buildMemoryPromotionGateInput",
  "validateMemoryPromotionGateInput",
  "buildMemoryPromotionApprovalPacket",
  "validateMemoryPromotionApprovalPacket",
  "buildMemoryPromotionPolicy",
  "isMemoryPromotionAllowed",
  "buildMemoryPromotedEventPreview",
  "buildMemoryPromotionRuntimePayloadPreview",
  "buildMemoryPromotionRequestPacket",
  "validateMemoryPromotionRequestPacket",
  "buildMemoryPromotionExecutionBridge",
  "executeApprovedMemoryPromotionRequest",
  "buildMemoryPromotionAuditLedger",
  "buildMemoryPromotionGateSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($marker in @(
  "MemoryPromotionGatePanel renders",
  "PromotionGateInputPanel renders",
  "PromotionApprovalPacketPanel renders",
  "PromotionPolicyPanel renders",
  "PromotionEventPreviewPanel renders",
  "PromotionRequestPacketPanel renders",
  "PromotionExecutionBridgePanel renders",
  "PromotionAuditLedgerPanel renders",
  "MemoryPromotionSafetyNotice renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $memoryInboxSource "MemoryPromotionGatePanel" "/memory-inbox imports/renders MemoryPromotionGatePanel if integrated"
Assert-Contains $memorySource "Memory Promotion Gate" "/memory references Memory Promotion Gate if integrated"
Assert-Contains $brainSource "Memory Promotion Gate" "/brain references Memory Promotion Gate if integrated"
Assert-Contains $activitySource "Memory Promotion Gate" "/activity references Memory Promotion Gate if integrated"
Assert-Contains $stabilizationSource "Memory Promotion Gate readiness" "Stabilization references Memory Promotion Gate if integrated"
Assert-Contains $commandSource "Review Memory Promotion Gate" "Command Palette includes Review Memory Promotion Gate if integrated"
Assert-Contains $commandSource "Copy Memory Promotion Review Prompt" "Command Palette includes Copy memory promotion review prompt"
Assert-Contains $missionSource "Memory Promotion Gate readiness" "Mission Control includes Memory Promotion Gate readiness if integrated"

foreach ($text in @(
  "explicit approval required",
  "no auto-promotion",
  "no graph mutation",
  "appendEvent is not called from UI",
  "evidence is context, not authority",
  "preserve latest-message authority",
  "explicit approval required",
  "reviewed state required",
  "evidence snippets required",
  "low confidence blocks promotion unless extra acknowledgement",
  "Duplicate risk blocks promotion unless dedupe was reviewed",
  "Contradiction risk blocks promotion unless an explicit operator decision",
  "memory.promoted",
  "future reducer boundary",
  "policy confirmation",
  "execution remains blocked",
  "event-preview-built",
  "bridge-blocked",
  "buildMemoryPromotionGateStableKey"
)) {
  Assert-Contains $integratedSource $text "required text: $text"
}

Assert-NotMatches $gateSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "reduceGraph\s*\(|saveBrainGraph\s*\(|loadBrainGraph\s*\(" "no direct graph mutation from UI"
Assert-NotContains $uiSource "apply-diff" "no direct apply-diff call from UI"
Assert-NotContains $uiSource "write-file" "no direct write-file call from UI"
Assert-NotContains $uiSource "run-command" "no direct run-command call from UI"
Assert-NotContains $gateSource "broker-execution" "no broker-execution call except blocked-policy text"
Assert-NotContains $gateSource "Math.random" "no Math.random"
Assert-NotContains $gateSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $gateSource "d3-force" "no d3-force"
Assert-NotMatches $gateSource "https?://" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector", "OPENAI_API_KEY", "openai.chat", "apiKey")) {
  Assert-NotContains $gateSource $marker "no vector database or OpenAI/API-key dependency: $marker"
}
Assert-NotMatches $gateSource "localStorage|sessionStorage|fetch\s*\(" "no auto-persistence or network call"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $integratedSource $mojibakePattern "no mojibake"

$allMatches = [regex]::Matches($allSmoke, "smoke-codexforge-memory-promotion-gate\.ps1")
if ($allMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Memory Promotion Gate exactly once; found $($allMatches.Count)."
}
Assert-Contains $allSmoke "Memory Promotion Gate" "managed smoke suite includes Memory Promotion Gate exactly once"

$suiteMatches = [regex]::Matches($memorySuite, "smoke-codexforge-memory-promotion-gate\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Memory Suite must include Memory Promotion Gate exactly once; found $($suiteMatches.Count)."
}

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/memory-inbox" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /memory-inbox returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /memory-inbox route reachable"
} catch {
  Write-Host "[SKIP] /memory-inbox route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Memory Promotion Gate smoke passed."
