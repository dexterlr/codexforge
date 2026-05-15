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
Write-Host "=== CodexForge Read-Only Step Execution smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\read-only-step-execution"
$componentDir = Join-Path $domainDir "components"
$tasksClientPath = "src\app\tasks\page-client.tsx"
$aiPagePath = "src\app\ai\page.tsx"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$bridgePath = Join-Path $domainDir "read-only-client-bridge.ts"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "read-only-execution-types.ts",
  "read-only-execution-request.ts",
  "read-only-execution-policy.ts",
  "read-only-tool-router.ts",
  "read-only-execution-result.ts",
  "read-only-execution-ledger.ts",
  "read-only-evidence.ts",
  "read-only-execution-summary.ts",
  "read-only-client-bridge.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "ReadOnlyStepExecutionPanel.tsx",
  "ReadOnlyExecutionRequestPanel.tsx",
  "ReadOnlyExecutionPolicyPanel.tsx",
  "ReadOnlyToolRouterPanel.tsx",
  "ReadOnlyExecutionResultPanel.tsx",
  "ReadOnlyEvidencePanel.tsx",
  "ReadOnlyExecutionLedgerPanel.tsx",
  "ReadOnlyExecutionSafetyNotice.tsx",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$tasksSource = Get-Content -Raw $tasksClientPath
$aiPageSource = Get-Content -Raw $aiPagePath
$missionSource = (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$bridgeSource = Get-Content -Raw $bridgePath
$allSmoke = Get-Content -Raw $allSmokePath
$readOnlySource = $domainSource + "`n" + $uiSource + "`n" + $tasksSource
$allSource = $readOnlySource + "`n" + $aiPageSource + "`n" + $missionSource

foreach ($export in @(
  "buildReadOnlyExecutionRequest",
  "validateReadOnlyExecutionRequest",
  "buildReadOnlyExecutionPolicy",
  "isReadOnlyExecutionAllowed",
  "buildReadOnlyToolRoute",
  "classifyReadOnlyTool",
  "buildReadOnlyExecutionResult",
  "normalizeReadOnlyExecutionResult",
  "buildReadOnlyEvidence",
  "buildReadOnlyExecutionLedger"
)) {
  Assert-Contains $domainSource $export "index exports $export"
}

foreach ($render in @(
  "ReadOnlyStepExecutionPanel renders",
  "ReadOnlyExecutionPolicyPanel renders",
  "ReadOnlyToolRouterPanel renders",
  "ReadOnlyExecutionResultPanel renders",
  "ReadOnlyEvidencePanel renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $tasksSource "ReadOnlyStepExecutionPanel" "/tasks imports/renders ReadOnlyStepExecutionPanel"

foreach ($text in @(
  "Read-only execution only",
  "Mutation tools remain blocked",
  "explicit approval required",
  "no file mutation"
)) {
  Assert-Contains $allSource $text "UI says $text"
}

foreach ($tool in @("read-file", "list-files", "search-project", "snapshot-project")) {
  Assert-Contains $domainSource $tool "policy allows $tool"
}

foreach ($tool in @(
  "write-file",
  "apply-diff",
  "run-command",
  "run-tests",
  "build-web-app",
  "broker-execution",
  "external-api"
)) {
  Assert-Contains $domainSource $tool "policy blocks $tool"
}

Assert-Contains $bridgeSource "executeApprovedReadOnlyStep" "client bridge execute function exists"
Assert-Contains $bridgeSource "classifyReadOnlyTool" "client bridge refuses mutation tools before fetch"
Assert-Contains $bridgeSource "eligible-read-only" "client bridge allows only eligible read-only tools"
Assert-Contains $bridgeSource "approvalState" "execute route payload includes approval state"
Assert-Contains $bridgeSource "/api/codexforge/tools/execute" "client bridge uses guarded local execute route"
Assert-Contains $bridgeSource "Does not auto-run on render." "client bridge documents no auto-run on render"
Assert-NotContains $uiSource "useEffect(" "client bridge does not auto-run on render from UI"

Assert-Contains $domainSource '"blocked"' "result model supports blocked"
Assert-Contains $domainSource '"completed"' "result model supports completed"
foreach ($evidenceType in @('"file"', '"path"', '"line"', '"match"', '"warning"', '"error"')) {
  Assert-Contains $domainSource $evidenceType "evidence model supports $evidenceType"
}

Assert-Contains $aiPageSource "Read-Only Step Execution" "AI page references Read-Only Step Execution or /tasks"
Assert-Contains $missionSource "Read-Only Step Execution" "Mission Control references Read-Only Step Execution"

Assert-NotMatches $readOnlySource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $readOnlySource 'from\s+["''][^"'']*write-file["'']' "no write-file execution/import from UI"
Assert-NotMatches $readOnlySource 'from\s+["''][^"'']*apply-diff["'']' "no apply-diff execution/import from UI"
Assert-NotMatches $readOnlySource 'from\s+["''][^"'']*run-command["'']' "no run-command execution/import from UI"
Assert-NotMatches $readOnlySource "broker-execution\s*\(" "no broker-execution call except static blocked-policy string assertions"
Assert-NotContains $readOnlySource "Math.random" "no Math.random"
Assert-NotContains $readOnlySource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $readOnlySource "d3-force" "no d3-force"
Assert-NotMatches $readOnlySource "https?://" "no external network dependency URL"
Assert-NotContains $readOnlySource "XMLHttpRequest" "no external XMLHttpRequest dependency"
Assert-NotContains $readOnlySource "axios" "no external network library dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $readOnlySource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI", "openai")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic read-only execution files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $readOnlySource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildReadOnlyExecutionStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-read-only-step-execution\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Read-Only Step Execution exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Read-Only Step Execution" "managed smoke suite includes Read-Only Step Execution exactly once"

Write-Host "[OK] CodexForge Read-Only Step Execution smoke passed."
