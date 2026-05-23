param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotContains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Run History smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\run-history"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\run-history\page.tsx"
$pageClientPath = "src\app\run-history\page-client.tsx"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "run-history-types.ts",
  "run-history-record.ts",
  "run-history-event.ts",
  "run-history-timeline.ts",
  "run-history-filters.ts",
  "run-history-review-status.ts",
  "run-history-handoff.ts",
  "run-history-next-action.ts",
  "run-history-memory-candidate.ts",
  "run-history-export.ts",
  "run-history-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "RunHistoryTimeline.tsx",
  "RunHistoryRecordCard.tsx",
  "RunHistoryEventList.tsx",
  "RunHistoryFilterBar.tsx",
  "RunHistoryReviewStatusPanel.tsx",
  "RunHistoryHandoffPanel.tsx",
  "RunHistoryNextActionPanel.tsx",
  "RunHistoryMemoryCandidatePanel.tsx",
  "RunHistoryExportPanel.tsx",
  "RunHistorySafetyStrip.tsx",
  "RunHistoryEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource

foreach ($export in @(
  "buildRunHistoryRecord",
  "validateRunHistoryRecord",
  "buildRunHistoryEvent",
  "buildRunHistoryEventsForRecord",
  "buildRunHistoryTimeline",
  "groupRunHistoryRecords",
  "buildRunHistoryFilters",
  "applyRunHistoryFilters",
  "buildRunHistoryReviewStatus",
  "buildRunHistoryReviewCheck",
  "buildRunHistoryHandoff",
  "buildRunHistoryHandoffSection",
  "selectRunHistoryNextAction",
  "buildRunHistoryNextActionPlan",
  "buildRunHistoryMemoryCandidate",
  "validateRunHistoryMemoryCandidate",
  "buildRunHistoryExport",
  "buildRunHistoryExportSection",
  "buildRunHistorySummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "RunHistoryTimeline renders",
  "RunHistoryRecordCard renders",
  "RunHistoryEventList renders",
  "RunHistoryFilterBar renders",
  "RunHistoryReviewStatusPanel renders",
  "RunHistoryHandoffPanel renders",
  "RunHistoryNextActionPanel renders",
  "RunHistoryMemoryCandidatePanel renders",
  "RunHistoryExportPanel renders",
  "RunHistorySafetyStrip renders",
  "RunHistoryEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "RunHistoryTimeline" "/run-history imports/renders RunHistoryTimeline"
Assert-Contains $routeSource "Run history" "/run-history says Run history"
foreach ($text in @("no auto-promotion", "no Brain auto-mutation", "no auto-persist into Brain", "review required", "preserve latest-message authority")) {
  Assert-Contains $allSource $text "UI says $text"
}
Assert-Contains $allSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $allSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $allSource "whiteSpace: `"nowrap`"" "route hero title does not vertically wrap"
Assert-NotContains $allSource "overflowWrap: `"anywhere`"" "display headings do not use overflowWrap:anywhere"

foreach ($text in @(
  "code-fix",
  "validation",
  "closed-loop",
  "preview-created",
  "validation-output-reviewed",
  "result-captured",
  "Needs review",
  "Failed",
  "Code fix",
  "secrets checked",
  "validation result",
  "Validation failed -> closed-loop",
  "Needs review -> open workflow results",
  "no-auto-promotion",
  "markdown"
)) { Assert-Contains $allSource $text "domain/UI marker $text" }

$workflowResultsSource = Get-Content -Raw "src\app\workflow-results\page-client.tsx"
$codeFlowSource = Get-Content -Raw "src\app\code-flow\page-client.tsx"
$applyValidationSource = Get-Content -Raw "src\app\apply-validation\page-client.tsx"
$validationSource = Get-Content -Raw "src\app\validation\page-client.tsx"
$closedLoopSource = Get-Content -Raw "src\app\closed-loop\page.tsx"
$workflowWizardSource = (Get-ChildItem "src\lib\codexforge\workflow-wizard" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$productSource = (Get-ChildItem "src\lib\codexforge\product-simplification" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$activitySource = Get-Content -Raw "src\app\activity\page-client.tsx"
$memorySource = ((Get-ChildItem "src\lib\codexforge\memory-review" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n") + "`n" + ((Get-ChildItem "src\lib\codexforge\operator-memory-inbox" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n") + "`n" + $uiSource
$commandSource = (Get-ChildItem "src\lib\codexforge\command-palette" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$readinessSource = Get-Content -Raw "src\app\readiness\page-client.tsx"
$consolidationSource = Get-Content -Raw "src\app\consolidation\page-client.tsx"
$missionSource = Get-Content -Raw "src\app\mission\page-client.tsx"

Assert-Contains $workflowResultsSource "Run History" "/workflow-results references Run History if integrated"
Assert-Contains $codeFlowSource "Run History" "/code-flow references Run History if integrated"
Assert-Contains $applyValidationSource "Run History" "/apply-validation references Run History if integrated"
Assert-Contains $validationSource "Run History" "/validation references Run History if integrated"
Assert-Contains $closedLoopSource "Run History" "/closed-loop references Run History if integrated"
Assert-Contains $workflowWizardSource "/run-history" "Workflow Wizard references /run-history if integrated"
Assert-Contains $productSource "Review run history" "Product Simplification references Run History if integrated"
Assert-Contains $activitySource "Run History" "Global Activity Feed references Run History if integrated"
Assert-Contains $memorySource "run history candidate" "Memory Review or Operator Memory Inbox references run history candidate if integrated"
Assert-Contains $commandSource "Go to Run History" "Command Palette includes Go to Run History if integrated"
Assert-Contains $commandSource "Review recent runs" "Command Palette includes Review recent runs if integrated"
Assert-Contains $commandSource "Copy run handoff" "Command Palette includes Copy run handoff if integrated"
Assert-Contains $commandSource "Copy run memory candidate" "Command Palette includes Copy run memory candidate if integrated"
Assert-Contains $readinessSource "Run History Timeline" "Product Readiness references Run History Timeline if integrated"
Assert-Contains $consolidationSource "Run History Timeline" "Consolidation references Run History Timeline if integrated"
Assert-Contains $missionSource "Run History Timeline readiness" "Mission Control references Run History Timeline if integrated"

Assert-Contains $allSource "no giant raw JSON above fold" "no giant raw JSON above fold"
Assert-Contains $allSource "advanced details are collapsed or visually secondary" "advanced details are collapsed or visually secondary"
Assert-Contains $allSource "no unsafe execution buttons" "no unsafe execution buttons"

Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $allSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotMatches $allSource "https?://" "no external network dependency in run-history files"
Assert-NotContains $allSource "fetch(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $allSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "localStorage.setItem", "localStorage.getItem", "process.env.", "Math.random", "Date.now", "d3-force")) { Assert-NotContains $allSource $marker "blocked marker absent: $marker" }
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $allSource "buildRunHistoryStableKey" "stable key helper or stable key patterns exist"

$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-run-history\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Run History exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmokeSource "Run History" "managed smoke suite includes Run History exactly once"

Write-Host "[PASS] CodexForge Run History smoke complete."
