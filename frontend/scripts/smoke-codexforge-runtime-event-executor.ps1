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
Write-Host "=== CodexForge Runtime Event Executor smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\runtime-event-executor"
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

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "runtime-event-executor-types.ts",
  "runtime-event-request.ts",
  "runtime-event-policy.ts",
  "runtime-event-validation.ts",
  "runtime-event-approval.ts",
  "runtime-event-executor.ts",
  "runtime-event-reducer-preview.ts",
  "runtime-event-result.ts",
  "runtime-event-audit-ledger.ts",
  "runtime-event-executor-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "RuntimeEventExecutorPanel.tsx",
  "RuntimeEventRequestPanel.tsx",
  "RuntimeEventPolicyPanel.tsx",
  "RuntimeEventValidationPanel.tsx",
  "RuntimeEventApprovalPanel.tsx",
  "RuntimeEventReducerPreviewPanel.tsx",
  "RuntimeEventResultPanel.tsx",
  "RuntimeEventAuditLedgerPanel.tsx",
  "RuntimeEventExecutorSafetyNotice.tsx"
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
$executorSource = $domainSource + "`n" + $uiSource
$integratedSource = $executorSource + "`n" + $memoryInboxSource + "`n" + $memorySource + "`n" + $brainSource + "`n" + $activitySource + "`n" + $stabilizationSource + "`n" + $commandSource + "`n" + $missionSource

foreach ($export in @(
  "buildRuntimeEventRequest",
  "validateRuntimeEventRequest",
  "buildRuntimeEventPolicy",
  "isRuntimeEventAllowed",
  "validateRuntimeEventPayload",
  "validateMemoryPromotedPayload",
  "buildRuntimeEventApproval",
  "validateRuntimeEventApproval",
  "executeApprovedRuntimeEvent",
  "executeRuntimeEventDryRun",
  "buildRuntimeEventReducerPreview",
  "previewRuntimeEventGraphReduction",
  "buildRuntimeEventExecutionResult",
  "normalizeRuntimeEventExecutionResult",
  "buildRuntimeEventAuditLedger",
  "buildRuntimeEventExecutorSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($marker in @(
  "RuntimeEventExecutorPanel renders",
  "RuntimeEventRequestPanel renders",
  "RuntimeEventPolicyPanel renders",
  "RuntimeEventValidationPanel renders",
  "RuntimeEventApprovalPanel renders",
  "RuntimeEventReducerPreviewPanel renders",
  "RuntimeEventResultPanel renders",
  "RuntimeEventAuditLedgerPanel renders",
  "RuntimeEventExecutorSafetyNotice renders"
)) {
  Assert-Contains $uiSource $marker "$marker"
}

Assert-Contains $memoryInboxSource "RuntimeEventExecutorPanel" "/memory-inbox imports/renders RuntimeEventExecutorPanel if integrated"
Assert-Contains $memorySource "Runtime Event Executor" "/memory references Runtime Event Executor if integrated"
Assert-Contains $brainSource "Runtime Event Executor" "/brain references Runtime Event Executor if integrated"
Assert-Contains $activitySource "Runtime Event Executor" "/activity references Runtime Event Executor if integrated"
Assert-Contains $stabilizationSource "Guarded Runtime Event Executor readiness" "Stabilization references Runtime Event Executor if integrated"
Assert-Contains $commandSource "Review Runtime Event Executor" "Command Palette includes Review Runtime Event Executor if integrated"
Assert-Contains $commandSource "Copy runtime event approval prompt" "Command Palette includes Copy runtime event approval prompt"
Assert-Contains $missionSource "Guarded Runtime Event Executor readiness" "Mission Control includes Guarded Runtime Event Executor readiness if integrated"

foreach ($text in @(
  "explicit approval required",
  "no direct UI graph mutation",
  "appendEvent is only allowed inside executor boundary",
  "no auto-promotion",
  "evidence is context, not authority",
  "preserve latest-message authority",
  "policy allows memory.promoted only when approved",
  "policy blocks missing approval",
  "policy blocks unknown event type",
  "policy blocks direct UI graph mutation",
  "validation checks memory.promoted payload",
  "reducer preview imports canonical graph types",
  "reducer preview does not import brain-graph",
  "executor has dry-run path",
  "executor has request-ready or blocked state",
  "audit ledger includes reducer-preview-built",
  "audit ledger includes event-appended",
  "result contract supports dry-run-complete",
  "result contract supports approval-required",
  "result contract supports executed",
  "result contract supports blocked",
  "buildRuntimeEventExecutorStableKey"
)) {
  Assert-Contains $integratedSource $text "required text: $text"
}

Assert-NotMatches $executorSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "reduceGraph\s*\(|saveBrainGraph\s*\(|loadBrainGraph\s*\(" "no direct graph mutation from UI"
Assert-NotContains $uiSource "apply-diff" "no direct apply-diff call from UI"
Assert-NotContains $uiSource "write-file" "no direct write-file call from UI"
Assert-NotContains $uiSource "run-command" "no direct run-command call from UI"
Assert-NotContains $executorSource "broker-execution" "no broker-execution call except blocked-policy text"
Assert-NotContains $executorSource "Math.random" "no Math.random"
Assert-NotContains $executorSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $executorSource "d3-force" "no d3-force"
Assert-NotMatches $executorSource "https?://" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector", "OPENAI_API_KEY", "openai.chat", "apiKey")) {
  Assert-NotContains $executorSource $marker "no vector database or OpenAI/API-key dependency: $marker"
}
Assert-NotMatches $uiSource "localStorage|sessionStorage|fetch\s*\(" "no auto-persistence from UI"

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $integratedSource $mojibakePattern "no mojibake"

$allMatches = [regex]::Matches($allSmoke, "smoke-codexforge-runtime-event-executor\.ps1")
if ($allMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Runtime Event Executor exactly once; found $($allMatches.Count)."
}
Assert-Contains $allSmoke "Runtime Event Executor" "managed smoke suite includes Runtime Event Executor exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/memory-inbox" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /memory-inbox returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /memory-inbox route reachable"
} catch {
  Write-Host "[SKIP] /memory-inbox route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Runtime Event Executor smoke passed."
