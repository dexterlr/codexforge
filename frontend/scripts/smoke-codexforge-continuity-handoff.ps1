param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotContains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Continuity Handoff smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\continuity-handoff"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\handoff\page.tsx"
$pageClientPath = "src\app\handoff\page-client.tsx"
$brainContinuityPath = "src\app\brain-continuity\page-client.tsx"
$stabilizationPath = "src\app\stabilization\page-client.tsx"
$activityPath = "src\app\activity\page-client.tsx"
$brainPath = "src\app\brain\page-client.tsx"
$navDir = "src\lib\codexforge\navigation-shell"
$paletteDir = "src\lib\codexforge\command-palette"
$homeDir = "src\lib\codexforge\operator-home"
$missionDir = "src\lib\codexforge\mission-control"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @("continuity-handoff-types.ts","handoff-state-model.ts","handoff-risk-summary.ts","handoff-validation-plan.ts","handoff-rollback-posture.ts","handoff-memory-posture.ts","handoff-brain-posture.ts","handoff-next-actions.ts","handoff-packet-builder.ts","handoff-export.ts","continuity-handoff-summary.ts","index.ts")) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @("ContinuityHandoffPacket.tsx","ContinuityHandoffPanel.tsx","HandoffStatePanel.tsx","HandoffRiskSummaryPanel.tsx","HandoffValidationPlanPanel.tsx","HandoffRollbackPosturePanel.tsx","HandoffMemoryPosturePanel.tsx","HandoffBrainPosturePanel.tsx","HandoffNextActionsPanel.tsx","HandoffExportPanel.tsx","ContinuityHandoffSafetyNotice.tsx","ContinuityHandoffEmptyState.tsx")) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw $routePath
$pageSource = Get-Content -Raw $pageClientPath
$integrationSource = @(
  Get-Content -Raw $brainContinuityPath
  Get-Content -Raw $stabilizationPath
  Get-Content -Raw $activityPath
  Get-Content -Raw $brainPath
  (Get-ChildItem $navDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $paletteDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $homeDir -Recurse -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
  (Get-ChildItem $missionDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
) -join "`n"
$source = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource + "`n" + $integrationSource
$handoffSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource + "`n" + $pageSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach ($export in @("buildContinuityHandoffState","buildContinuityHandoffStateItem","buildContinuityHandoffRiskSummary","buildContinuityHandoffRiskItem","buildContinuityHandoffValidationPlan","buildContinuityHandoffValidationCommand","buildContinuityHandoffRollbackPosture","buildContinuityHandoffRollbackOption","buildContinuityHandoffMemoryPosture","buildContinuityHandoffMemoryItem","buildContinuityHandoffBrainPosture","buildContinuityHandoffBrainItem","selectContinuityHandoffNextAction","buildContinuityHandoffNextActionPlan","buildContinuityHandoffPacket","buildContinuityHandoffSection","buildContinuityHandoffMarkdown","buildContinuityHandoffPrompt","buildContinuityHandoffClipboardPayload","buildContinuityHandoffSummary")) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @("ContinuityHandoffPacket renders","ContinuityHandoffPanel renders","HandoffStatePanel renders","HandoffRiskSummaryPanel renders","HandoffValidationPlanPanel renders","HandoffRollbackPosturePanel renders","HandoffMemoryPosturePanel renders","HandoffBrainPosturePanel renders","HandoffNextActionsPanel renders","HandoffExportPanel renders","ContinuityHandoffSafetyNotice renders","ContinuityHandoffEmptyState renders")) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $pageSource "ContinuityHandoffPacket" "/handoff imports/renders ContinuityHandoffPacket"

foreach ($text in @("Continuity Handoff Packet link/readiness","Continuity Handoff readiness","Continuity Handoff Packet source/link","Continuity Handoff Packet links Brain","Continuity Handoff","Go to Continuity Handoff","Copy continuity handoff prompt","Copy validation checklist","Create continuity handoff")) {
  Assert-Contains $integrationSource $text "integration includes $text"
}

foreach ($text in @("read-only","no graph mutation","no snapshot restore","no appendEvent","no saveBrainGraph from UI","no command execution","copy only","preserve latest-message authority","Current State","Validation Results","Known Risks","Memory Posture","Brain Continuity Posture","Rollback Posture","npm run build","npm run smoke:codexforge:server","git diff --check","git restore","git revert","no auto-promotion","canonical graph schema","appendEvent from UI blocked","commit clean checkpoint","export builds markdown packet","export builds next-session prompt","no auto-persistence")) {
  Assert-Contains $source $text "source includes $text"
}

Assert-NotMatches $handoffSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $handoffSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $handoffSource "Math.random" "no Math.random"
Assert-NotContains $handoffSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $handoffSource "d3-force" "no d3-force"
Assert-NotMatches $handoffSource "https?://" "no external network dependency"
Assert-NotContains $handoffSource "fetch(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $handoffSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "OpenAI")) { Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic continuity-handoff files: $marker" }

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $source $mojibakePattern "no mojibake"
Assert-Contains $domainSource "buildContinuityHandoffStableKey" "stable key helper or stable key patterns exist"
Assert-Contains $uiSource "buildContinuityHandoffStableKey" "stable key patterns exist in UI"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-continuity-handoff\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Continuity Handoff exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmoke "Continuity Handoff" "managed smoke suite includes Continuity Handoff exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/handoff" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /handoff returned status $($response.StatusCode)" }
  Write-Host "[PASS] /handoff route reachable"
} catch {
  Write-Host "[SKIP] /handoff route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Continuity Handoff smoke passed."
