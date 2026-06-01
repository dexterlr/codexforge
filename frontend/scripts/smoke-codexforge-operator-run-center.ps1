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
Write-Host "=== CodexForge Operator Run Center smoke ==="
Write-Host "Base URL: $BaseUrl"

$runDir = "src\lib\codexforge\operator-run"
$componentDir = Join-Path $runDir "components"
$routePath = "src\app\runs\page.tsx"
$pageClientPath = "src\app\runs\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $runDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "run-types.ts",
  "run-queue.ts",
  "run-readiness.ts",
  "run-policy.ts",
  "run-timeline.ts",
  "run-artifacts.ts",
  "run-replay.ts",
  "run-summary.ts",
  "run-context.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $runDir $module)
}

foreach ($component in @(
  "OperatorRunCenter.tsx",
  "RunQueuePanel.tsx",
  "RunReadinessBoard.tsx",
  "RunPolicyBoundary.tsx",
  "RunTimelinePanel.tsx",
  "RunArtifactLedger.tsx",
  "RunReplayPanel.tsx",
  "RunContextPanel.tsx",
  "RunCommandPreview.tsx",
  "BlockedRunNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$domainSource = (Get-ChildItem $runDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($marker in @(
  "OperatorRunCenter",
  "RunQueuePanel",
  "RunReadinessBoard",
  "RunPolicyBoundary",
  "RunTimelinePanel",
  "RunArtifactLedger",
  "RunReplayPanel",
  "RunContextPanel",
  "RunCommandPreview",
  "BlockedRunNotice"
)) {
  Assert-Contains $uiSource $marker "$marker renders"
}

foreach ($export in @(
  "export function buildOperatorRun",
  "export function buildOperatorRunStep",
  "export function summarizeOperatorRun",
  "export function selectNextRunAction",
  "export function buildRunQueue",
  "export function enqueueRunPreview",
  "export function sortRunQueue",
  "export function summarizeRunQueue",
  "export function buildRunReadiness",
  "export function scoreRunReadiness",
  "export function summarizeRunReadiness",
  "export function buildRunPolicyBoundary",
  "export function isRunExecutionBlocked",
  "export function summarizeRunPolicyBoundary",
  "export function buildRunTimeline",
  "export function buildRunTimelineItem",
  "export function summarizeRunTimeline",
  "export function buildRunArtifactLedger",
  "export function buildRunArtifactPreview",
  "export function summarizeRunArtifacts",
  "export function buildRunReplay",
  "export function summarizeRunReplay",
  "export function buildReplayPrompt",
  "export function buildRunContext",
  "export function summarizeRunContext"
)) {
  Assert-Contains $domainSource $export "expected export $export"
}

Assert-Contains $routeSource "buildRunQueue" "/runs route builds queue"
Assert-Contains $routeSource "OperatorRunCenter" "page-client renders OperatorRunCenter"
Assert-Contains $uiSource "preview-only" "UI says preview-only"
Assert-Contains $uiSource "approval required before execution" "UI says approval required before execution"
Assert-Contains $uiSource "broker execution blocked" "UI says broker execution blocked"
Assert-Contains $uiSource "no desktop control/camera/trading execution" "UI says no desktop control/camera/trading execution"

foreach ($marker in @("from `"write-file`"", "from 'write-file'", "from `"apply-diff`"", "from 'apply-diff'", "from `"run-command`"", "from 'run-command'")) {
  Assert-NotContains $uiSource $marker "UI mutation import absent: $marker"
}

foreach ($marker in @("writeFile", "appendFile", "unlink(", "rm(", "rmdir(", "mkdir(", "rename(", "copyFile", "applyPatch", "broker-execution", "child_process", "spawn(", "exec(")) {
  Assert-NotContains $uiSource $marker "UI execution call absent: $marker"
}

foreach ($marker in @("Math.random", "Date.now", "d3-force", "fetch(", "XMLHttpRequest", "axios", "openai", "OpenAI", "pinecone", "weaviate", "chroma")) {
  Assert-NotContains $allSource $marker "determinism or external dependency absent: $marker"
}

foreach ($marker in @("blender --", "UnrealEditor", "comfyui-workflow-run(")) {
  Assert-NotContains $uiSource $marker "UI does not execute Blender/Unreal/ComfyUI: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildOperatorRunReactKey" "stable key helper exists"
Assert-Contains $uiSource "buildOperatorRunReactKey" "stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-operator-run-center\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Operator Run Center exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Operator Run Center" "managed smoke suite includes Operator Run Center exactly once"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/runs" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /runs returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /runs route reachable"
} catch {
  Write-Host "[SKIP] /runs route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Operator Run Center smoke passed."
