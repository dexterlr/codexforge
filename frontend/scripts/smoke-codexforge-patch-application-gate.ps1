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
Write-Host "=== CodexForge Patch Application Gate smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\patch-application-gate"
$componentDir = Join-Path $domainDir "components"
$aiPagePath = "src\app\ai\page.tsx"
$filesPagePath = "src\app\files\page-client.tsx"
$tasksPagePath = "src\app\tasks\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "patch-application-gate-types.ts",
  "apply-gate-input.ts",
  "apply-approval-packet.ts",
  "apply-policy.ts",
  "apply-request-preview.ts",
  "apply-mutation-firewall.ts",
  "apply-verification-gate.ts",
  "apply-rollback-gate.ts",
  "apply-gate-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "PatchApplicationGatePanel.tsx",
  "ApplyGateInputPanel.tsx",
  "ApplyApprovalPacketPanel.tsx",
  "ApplyPolicyPanel.tsx",
  "ApplyRequestPreviewPanel.tsx",
  "ApplyMutationFirewallPanel.tsx",
  "ApplyVerificationGatePanel.tsx",
  "ApplyRollbackGatePanel.tsx",
  "PatchApplicationGateSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$gateSource = $domainSource + "`n" + $uiSource
$aiSource = Get-Content -Raw $aiPagePath
$filesSource = Get-Content -Raw $filesPagePath
$tasksSource = Get-Content -Raw $tasksPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$allSource = $gateSource + "`n" + $aiSource + "`n" + $filesSource + "`n" + $tasksSource + "`n" + $missionSource

foreach ($export in @(
  "buildApplyGateInput",
  "validateApplyGateInput",
  "buildApplyApprovalPacket",
  "validateApplyApprovalPacket",
  "buildPatchApplyPolicy",
  "isPatchApplyRequestAllowed",
  "buildApplyRequestPreview",
  "buildApplyRequestPayloadPreview",
  "buildApplyMutationFirewall",
  "isMutationBlockedByFirewall",
  "buildApplyVerificationGate",
  "buildApplyRollbackGate",
  "buildPatchApplicationGateSummary"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "PatchApplicationGatePanel renders",
  "ApplyApprovalPacketPanel renders",
  "ApplyPolicyPanel renders",
  "ApplyRequestPreviewPanel renders",
  "ApplyMutationFirewallPanel renders",
  "ApplyVerificationGatePanel renders",
  "ApplyRollbackGatePanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $tasksSource "<PatchApplicationGatePanel compact />" "/tasks imports/renders PatchApplicationGatePanel"
Assert-Contains $aiSource 'redirect("/jarvis")' "/ai redirects to canonical Jarvis"
Assert-NotContains $aiSource "PatchApplicationGatePanel" "/ai mounts no competing Patch Application Gate panel"
Assert-Contains $filesSource "Patch Application Gate" "/files references Patch Application Gate if integrated"
Assert-Contains $tasksSource "Patch Application Gate" "/tasks references Patch Application Gate if integrated"
Assert-Contains $missionSource "Patch Application Gate readiness" "Mission Control includes Patch Application Gate readiness"
Assert-Contains $missionSource "Review apply gate" "Mission Control next action: Review apply gate"

foreach ($text in @(
  "explicit human approval required",
  "actual mutation remains blocked",
  "pseudo diff alone is not applyable",
  "apply-diff requires tool-policy approval",
  "current files must be verified",
  "rollback plan required",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "Explicit human approval required." "policy blocks missing approval"
Assert-Contains $domainSource "Rollback plan required." "policy blocks missing rollback plan"
Assert-Contains $domainSource "Verification plan required." "policy blocks missing verification plan"
Assert-Contains $domainSource "Pseudo diff alone is not applyable." "policy blocks pseudo diff direct apply"
Assert-Contains $domainSource "apply-diff without explicit approval is blocked." "mutation firewall blocks apply-diff without approval"
Assert-Contains $domainSource "write-file without tool-policy approval is blocked." "mutation firewall blocks write-file without approval"
Assert-Contains $domainSource "run-command without tool-policy approval is blocked." "mutation firewall blocks run-command without approval"
Assert-Contains $domainSource "broker-execution always blocked." "mutation firewall blocks broker-execution"
Assert-Contains $domainSource "displayOnly: true" "request preview says display-only"
Assert-Contains $domainSource "does not call apply-diff" "request preview does not call apply-diff"
Assert-Contains $domainSource "npm run build" "verification gate suggests npm run build"
Assert-Contains $domainSource "git diff --check" "verification gate suggests git diff --check"
Assert-Contains $domainSource "git restore" "rollback gate mentions git restore"
Assert-Contains $domainSource "git revert" "rollback gate mentions git revert"
Assert-Contains $domainSource "buildPatchApplicationGateStableKey" "stable key helper or stable key patterns exist"

Assert-NotMatches $gateSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $gateSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $gateSource "Math.random" "no Math.random"
Assert-NotContains $gateSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $gateSource "d3-force" "no d3-force"
Assert-NotMatches $gateSource "https?://" "no external network dependency"
Assert-NotContains $gateSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $gateSource "axios" "no external network library dependency"
Assert-NotMatches $gateSource "fetch\s*\(" "no fetch dependency in deterministic patch-application-gate files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $gateSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $gateSource $marker "no OpenAI/API-key dependency in deterministic patch-application-gate files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-patch-application-gate\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Patch Application Gate exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Patch Application Gate" "managed smoke suite includes Patch Application Gate exactly once"

Write-Host "[OK] CodexForge Patch Application Gate smoke passed."
