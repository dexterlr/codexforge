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
Write-Host "=== CodexForge Evidence-Grounded Chat smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\evidence-grounded-chat"
$componentDir = Join-Path $domainDir "components"
$aiPagePath = "src\app\ai\page.tsx"
$memoryClientPath = "src\app\memory\page-client.tsx"
$tasksClientPath = "src\app\tasks\page-client.tsx"
$brainClientPath = "src\app\brain\page-client.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "evidence-grounded-chat-types.ts",
  "evidence-selection.ts",
  "evidence-grounding-context.ts",
  "evidence-citation-model.ts",
  "evidence-trust-policy.ts",
  "evidence-chat-prompt.ts",
  "evidence-reply-sections.ts",
  "evidence-grounding-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "EvidenceGroundedChatPanel.tsx",
  "EvidenceSelectionPanel.tsx",
  "EvidenceGroundingCard.tsx",
  "EvidenceCitationPanel.tsx",
  "EvidenceTrustPolicyPanel.tsx",
  "EvidencePromptPreviewPanel.tsx",
  "EvidenceReplyGroundingPanel.tsx",
  "EvidenceGroundingSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$aiPageSource = Get-Content -Raw $aiPagePath
$memorySource = Get-Content -Raw $memoryClientPath
$tasksSource = Get-Content -Raw $tasksClientPath
$brainSource = Get-Content -Raw $brainClientPath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$groundingSource = $domainSource + "`n" + $uiSource
$allSource = $groundingSource + "`n" + $aiPageSource + "`n" + $memorySource + "`n" + $tasksSource + "`n" + $brainSource + "`n" + $missionSource

foreach ($export in @(
  "buildEvidenceChatSelection",
  "buildEvidenceGroundingContext",
  "buildEvidenceCitationModel",
  "buildEvidenceTrustPolicy",
  "isEvidenceAllowedForChatGrounding",
  "buildEvidenceGroundedChatPrompt",
  "buildEvidenceGroundedReplySections"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "EvidenceGroundedChatPanel renders",
  "EvidenceSelectionPanel renders",
  "EvidenceGroundingCard renders",
  "EvidenceCitationPanel renders",
  "EvidenceTrustPolicyPanel renders",
  "EvidencePromptPreviewPanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $aiPageSource "EvidenceGroundedChatPanel" "/ai imports/renders EvidenceGroundedChatPanel"
Assert-Contains $memorySource "Evidence-Grounded Chat" "/memory references Evidence-Grounded Chat"
Assert-Contains $tasksSource "Evidence-Grounded Chat" "/tasks references Evidence-Grounded Chat"
Assert-Contains $brainSource "Evidence-grounded chat uses selected evidence only" "/brain references Evidence-Grounded Chat"
Assert-Contains $missionSource "Evidence-Grounded Chat readiness" "Mission Control includes Evidence-Grounded Chat readiness"
Assert-Contains $missionSource "Use reviewed evidence in chat" "Mission Control next action: Use reviewed evidence in chat"

foreach ($text in @(
  "selected evidence only",
  "No hidden context injection",
  "evidence is context, not proof",
  "verify current files before edits",
  "no file mutation without Safe Patch Preview",
  "preserve latest-message authority"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

Assert-Contains $domainSource "return item.selected && item.injectionReadiness !== `"blocked`"" "policy blocks unselected evidence"
Assert-Contains $domainSource "Low confidence must be marked weak" "policy marks low confidence as weak"
Assert-Contains $domainSource "Stale evidence must be marked stale" "policy marks stale evidence as stale"
Assert-Contains $domainSource "Use this as context, not proof" "prompt says use context, not proof"
Assert-Contains $domainSource "Verify current files before proposing edits" "prompt says verify current files"
Assert-Contains $domainSource "Do not write files without Safe Patch Preview" "prompt says do not write files without Safe Patch Preview"
Assert-Contains $uiSource "citation model includes file/path/line/match/evidence id" "citation model includes file/path/line/match/evidence id"
Assert-Contains $uiSource "reply sections include Evidence used" "reply sections include Evidence used"
Assert-Contains $uiSource "reply sections include Confidence and caveats" "reply sections include Confidence and caveats"

Assert-NotMatches $groundingSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $groundingSource 'from\s+["''][^"'']*write-file["'']' "no write-file import"
Assert-NotMatches $groundingSource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff import"
Assert-NotMatches $groundingSource 'from\s+["''][^"'']*run-command["'']' "no run-command import"
Assert-NotMatches $groundingSource "broker-execution\s*\(" "no broker-execution call"
Assert-NotContains $groundingSource "Math.random" "no Math.random"
Assert-NotContains $groundingSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $groundingSource "d3-force" "no d3-force"
Assert-NotMatches $groundingSource "https?://" "no external network dependency"
Assert-NotContains $groundingSource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $groundingSource "axios" "no external network library dependency"
Assert-NotMatches $groundingSource "fetch\s*\(" "no fetch dependency in evidence-grounded-chat files"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $groundingSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $groundingSource $marker "no OpenAI/API-key dependency in deterministic evidence-grounded-chat files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildEvidenceGroundedChatStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-evidence-grounded-chat\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Evidence-Grounded Chat exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Evidence-Grounded Chat" "managed smoke suite includes Evidence-Grounded Chat exactly once"

Write-Host "[OK] CodexForge Evidence-Grounded Chat smoke passed."
