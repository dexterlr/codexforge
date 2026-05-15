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
Write-Host "=== CodexForge Chat Recall Context smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\chat-recall"
$componentDir = Join-Path $domainDir "components"
$aiPagePath = "src\app\ai\page.tsx"
$brainPagePath = "src\app\brain\page-client.tsx"
$brainRecallPanelPath = "src\lib\codexforge\brain-recall\components\BrainRecallPanel.tsx"
$brainRecallHandoffPanelPath = "src\lib\codexforge\brain-recall\components\BrainRecallHandoffPanel.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "chat-recall-types.ts",
  "chat-recall-selection.ts",
  "chat-recall-context.ts",
  "chat-recall-grounding.ts",
  "chat-recall-safety.ts",
  "chat-recall-handoff.ts",
  "chat-recall-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "ChatRecallContextPanel.tsx",
  "ChatRecallSelectionPanel.tsx",
  "ChatRecallContextCard.tsx",
  "ChatRecallGroundingPanel.tsx",
  "ChatRecallSafetyNotice.tsx",
  "ChatRecallHandoffPanel.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$aiPageSource = Get-Content -Raw $aiPagePath
$brainPageSource = Get-Content -Raw $brainPagePath
$brainRecallPanelSource = Get-Content -Raw $brainRecallPanelPath
$brainRecallHandoffPanelSource = Get-Content -Raw $brainRecallHandoffPanelPath
$allSmoke = Get-Content -Raw $allSmokePath
$recallSource = $domainSource + "`n" + $uiSource
$allSource = $recallSource + "`n" + $aiPageSource + "`n" + $brainPageSource + "`n" + $brainRecallPanelSource + "`n" + $brainRecallHandoffPanelSource

foreach ($export in @(
  "buildChatRecallSelection",
  "buildChatRecallContext",
  "buildChatRecallGroundingPolicy",
  "buildChatRecallSafetyBoundary",
  "buildChatRecallHandoff"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

Assert-Contains $aiPageSource "ChatRecallContextPanel" "Chat UI imports/renders ChatRecallContextPanel"
Assert-Contains ($brainPageSource + $brainRecallPanelSource + $brainRecallHandoffPanelSource) "chat recall handoff" "Brain page references chat recall handoff if integrated"

foreach ($text in @(
  "Recalled memory may be stale",
  "visible context",
  "No hidden context injection",
  "Verify current files before editing",
  "No file mutation without safe preview",
  "Only selected recall items are injected",
  "Use this as context, not as proof",
  "Inspect current files before proposing edits"
)) {
  Assert-Contains $allSource $text "UI or policy says $text"
}

Assert-Contains $domainSource "Only selected recall items are injected" "policy only allows selected recall items"
Assert-Contains $domainSource "context, not as proof" "handoff says context not proof"
Assert-Contains $domainSource "Inspect current files" "handoff says inspect current files"

Assert-NotMatches $recallSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotContains $recallSource "write-file" "no write-file import"
Assert-NotContains $recallSource "apply-diff" "no apply-diff import"
Assert-NotContains $recallSource "run-command" "no run-command import"
Assert-NotContains $allSource "broker-execution" "no broker-execution call"
Assert-NotContains $recallSource "Math.random" "no Math.random"
Assert-NotContains $recallSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $recallSource "d3-force" "no d3-force"
Assert-NotMatches $recallSource "https?://" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $recallSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey")) {
  Assert-NotContains $recallSource $marker "no OpenAI/API-key dependency: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $recallSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildChatRecallStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-chat-recall-context\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Chat Recall Context exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Chat Recall Context" "managed smoke suite includes Chat Recall Context exactly once"

Write-Host "[OK] CodexForge Chat Recall Context smoke passed."
