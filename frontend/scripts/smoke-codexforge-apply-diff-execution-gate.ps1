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
Write-Host "=== CodexForge Apply-Diff Execution Gate smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\apply-diff-execution-gate"
$componentDir = Join-Path $domainDir "components"
$aiPagePath = "src\app\ai\page.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$tasksPagePath = "src\app\tasks\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "apply-execution-gate-types.ts",
  "execution-gate-input.ts",
  "execution-approval-state.ts",
  "execution-policy-confirmation.ts",
  "execution-request-packet.ts",
  "execution-bridge.ts",
  "execution-result-contract.ts",
  "execution-audit-ledger.ts",
  "execution-gate-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "ApplyDiffExecutionGatePanel.tsx",
  "ExecutionGateInputPanel.tsx",
  "ExecutionApprovalStatePanel.tsx",
  "ExecutionPolicyConfirmationPanel.tsx",
  "ExecutionRequestPacketPanel.tsx",
  "ExecutionBridgePanel.tsx",
  "ExecutionResultContractPanel.tsx",
  "ExecutionAuditLedgerPanel.tsx",
  "ApplyDiffExecutionSafetyNotice.tsx",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$gateSource = $domainSource + "`n" + $uiSource
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = Get-Content -Raw $filesPagePath
$tasksSource = Get-Content -Raw $tasksPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$allSource = $gateSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $missionSource

foreach ($export in @(
  "buildApplyExecutionGateInput",
  "validateApplyExecutionGateInput",
  "buildApplyExecutionApprovalState",
  "validateApplyExecutionApprovalState",
  "buildApplyExecutionPolicyConfirmation",
  "isApplyExecutionPolicySatisfied",
  "buildApplyExecutionRequestPacket",
  "validateApplyExecutionRequestPacket",
  "buildApplyExecutionBridgePayload",
  "executeApprovedApplyDiffRequest",
  "buildApplyExecutionResultContract",
  "normalizeApplyExecutionResultContract",
  "buildApplyExecutionAuditLedger",
  "buildApplyDiffExecutionGateSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "ApplyDiffExecutionGatePanel renders",
  "ExecutionApprovalStatePanel renders",
  "ExecutionPolicyConfirmationPanel renders",
  "ExecutionRequestPacketPanel renders",
  "ExecutionBridgePanel renders",
  "ExecutionResultContractPanel renders",
  "ExecutionAuditLedgerPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $tasksSource "<ApplyDiffExecutionGatePanel compact />" "/tasks imports/renders ApplyDiffExecutionGatePanel"
Assert-Contains $aiSource 'redirect("/jarvis")' "/ai redirects to canonical Jarvis"
Assert-NotContains $aiSource "ApplyDiffExecutionGatePanel" "/ai mounts no competing Apply-Diff Execution Gate panel"
Assert-Contains $filesSource "Apply-Diff Execution Gate" "/files references Apply-Diff Execution Gate if integrated"
Assert-Contains $tasksSource "Apply-Diff Execution Gate" "/tasks references Apply-Diff Execution Gate if integrated"
Assert-Contains $missionSource "Apply-Diff Execution Gate readiness" "Mission Control includes Apply-Diff Execution Gate readiness"
Assert-Contains $missionSource "Review approved apply request" "Mission Control next action: Review approved apply request"

foreach ($text in @(
  "explicit operator approval required",
  "no silent execution",
  "apply-diff is approval-required",
  "execute route is the guarded boundary",
  "verification required after dispatch",
  "rollback plan required",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "explicitOperatorApproval: source.explicitOperatorApproval === true" "approval state defaults false"
Assert-Contains $domainSource "Explicit operator approval required." "policy blocks missing approval"
Assert-Contains $domainSource "Pseudo-only patch blocks execution." "policy blocks pseudo-only patch"
Assert-Contains $domainSource "Real patch required before execution." "policy blocks missing real patch"
Assert-Contains $domainSource "brokerExecutionBlocked: true" "policy blocks broker-execution"
Assert-Contains $domainSource "writeFileDirectCallBlocked: true" "policy blocks direct write-file"
Assert-Contains $domainSource "runCommandDirectCallBlocked: true" "policy blocks direct run-command"
Assert-Contains $domainSource 'toolName: "apply-diff"' "request packet uses tool name apply-diff"
Assert-Contains $domainSource "approvalState" "request packet includes approval state"
Assert-Contains $domainSource "rollbackNotes" "request packet includes rollback notes"
Assert-Contains $domainSource "Bridge refuses mutation without approval." "bridge refuses mutation without approval"
Assert-Contains $domainSource "bridge does not auto-run on render" "bridge does not auto-run on render"
Assert-Contains $domainSource "bridge uses existing execute route only if implemented" "bridge uses existing execute route only if implemented"
Assert-Contains $domainSource '"/api/codexforge/tools/execute"' "bridge uses guarded existing local execute route"
Assert-Contains $domainSource '"blocked"' "result contract supports blocked"
Assert-Contains $domainSource '"request-ready"' "result contract supports request-ready"
Assert-Contains $domainSource '"completed"' "result contract supports completed"
Assert-Contains $domainSource '"failed"' "result contract supports failed"
Assert-Contains $domainSource '"user-dispatched"' "ledger includes user-dispatched"
Assert-Contains $domainSource '"result-captured"' "ledger includes result-captured"
Assert-Contains $domainSource "buildApplyDiffExecutionGateStableKey" "stable key helper or stable key patterns exist"

Assert-NotMatches $gateSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI except static text/payload labels"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $gateSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $gateSource "Math.random" "no Math.random"
Assert-NotContains $gateSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $gateSource "d3-force" "no d3-force"
Assert-NotMatches $gateSource "https?://" "no external network dependency"
Assert-NotContains $gateSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $gateSource "axios" "no external network library dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $gateSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $gateSource $marker "no OpenAI/API-key dependency in deterministic apply-diff-execution-gate files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-apply-diff-execution-gate\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Apply-Diff Execution Gate exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Apply-Diff Execution Gate" "managed smoke suite includes Apply-Diff Execution Gate exactly once"

Write-Host "[OK] CodexForge Apply-Diff Execution Gate smoke passed."
