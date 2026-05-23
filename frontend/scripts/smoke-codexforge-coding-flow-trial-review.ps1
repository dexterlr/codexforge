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
Write-Host "=== CodexForge Coding Flow Trial Review smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\coding-flow-trial-review"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\code-flow\trial-review\page.tsx"
$pageClientPath = "src\app\code-flow\trial-review\page-client.tsx"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "coding-flow-trial-review-types.ts",
  "trial-run-record.ts",
  "trial-observation.ts",
  "trial-pass-fail-checklist.ts",
  "trial-screen-review.ts",
  "trial-friction-log.ts",
  "trial-validation-review.ts",
  "trial-safety-review.ts",
  "trial-ux-fix-plan.ts",
  "trial-go-no-go-decision.ts",
  "trial-review-handoff.ts",
  "trial-review-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "CodingFlowTrialReviewPanel.tsx",
  "TrialRunRecordPanel.tsx",
  "TrialObservationPanel.tsx",
  "TrialPassFailChecklistPanel.tsx",
  "TrialScreenReviewPanel.tsx",
  "TrialFrictionLogPanel.tsx",
  "TrialValidationReviewPanel.tsx",
  "TrialSafetyReviewPanel.tsx",
  "TrialUxFixPlanPanel.tsx",
  "TrialGoNoGoDecisionPanel.tsx",
  "TrialReviewHandoffPanel.tsx",
  "TrialReviewSafetyStrip.tsx",
  "TrialReviewEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
$integrationSource = @(
  "src\app\code-flow\trial\page-client.tsx",
  "src\app\run-history\page-client.tsx",
  "src\app\workflow-results\page-client.tsx",
  "src\app\start\page-client.tsx",
  "src\app\readiness\page-client.tsx",
  "src\app\consolidation\page-client.tsx",
  "src\app\mission\page-client.tsx"
) | ForEach-Object { Get-Content -Raw $_ }
$integrationSource = $integrationSource -join "`n"
$wizardSource = (Get-ChildItem "src\lib\codexforge\workflow-wizard" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commandSource = (Get-ChildItem "src\lib\codexforge\command-palette" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$productSource = (Get-ChildItem "src\lib\codexforge\product-simplification" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"

foreach ($export in @(
  "buildTrialRunRecord",
  "validateTrialRunRecord",
  "buildTrialObservation",
  "buildTrialObservationItem",
  "buildTrialPassFailChecklist",
  "buildTrialPassFailChecklistItem",
  "buildTrialScreenReview",
  "buildTrialScreenReviewItem",
  "buildTrialFrictionLog",
  "buildTrialFrictionLogItem",
  "buildTrialValidationReview",
  "buildTrialValidationReviewItem",
  "buildTrialSafetyReview",
  "buildTrialSafetyReviewCheck",
  "buildTrialUxFixPlan",
  "buildTrialUxFixItem",
  "buildTrialGoNoGoDecision",
  "buildTrialGoNoGoReason",
  "buildTrialReviewHandoff",
  "buildTrialReviewHandoffSection",
  "buildTrialReviewSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "CodingFlowTrialReviewPanel renders",
  "TrialRunRecordPanel renders",
  "TrialObservationPanel renders",
  "TrialPassFailChecklistPanel renders",
  "TrialScreenReviewPanel renders",
  "TrialFrictionLogPanel renders",
  "TrialValidationReviewPanel renders",
  "TrialSafetyReviewPanel renders",
  "TrialUxFixPlanPanel renders",
  "TrialGoNoGoDecisionPanel renders",
  "TrialReviewHandoffPanel renders",
  "TrialReviewSafetyStrip renders",
  "TrialReviewEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "CodingFlowTrialReviewPanel" "/code-flow/trial-review imports/renders CodingFlowTrialReviewPanel"
Assert-Contains $allSource "Review the coding trial" "/code-flow/trial-review says Review the coding trial"
Assert-Contains $allSource "Copy trial review" "/code-flow/trial-review says Copy trial review"
foreach ($text in @("no auto-apply", "no auto-run", "approval required", "preserve latest-message authority")) { Assert-Contains $allSource $text "UI says $text" }
Assert-Contains $allSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $allSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $allSource "whiteSpace: `"nowrap`"" "route hero title does not vertically wrap"
foreach ($text in @("no auto-apply occurred", "no auto-run occurred", "next action was obvious")) { Assert-Contains $allSource $text "checklist includes $text" }
foreach ($route in @("/start", "/code-flow", "/files", "/apply-validation", "/validation", "/workflow-results", "/run-history")) { Assert-Contains $allSource $route "screen review includes $route" }
foreach ($text in @("unclear primary action", "wording too technical")) { Assert-Contains $allSource $text "friction log includes $text" }
Assert-Contains $allSource "no auto-run occurred" "validation review checks no auto-run occurred"
Assert-Contains $allSource "no direct write-file UI" "safety review checks no direct write-file UI"
Assert-Contains $allSource "no direct run-command UI" "safety review checks no direct run-command UI"
Assert-Contains $allSource "primary-action" "UX fix plan includes primary-action category"
Assert-Contains $allSource "go-with-fixes" "go/no-go decision supports go-with-fixes"
Assert-Contains $allSource "UX fix prompt" "handoff supports UX fix prompt"
Assert-Contains $integrationSource "Trial Review" "/code-flow/trial references Trial Review if integrated"
Assert-Contains $integrationSource "Trial Review" "/run-history references Trial Review if integrated"
Assert-Contains $integrationSource "Trial Review" "/workflow-results references Trial Review if integrated"
Assert-Contains $wizardSource "Trial Review" "Workflow Wizard references Trial Review if integrated"
Assert-Contains $productSource "Coding Trial Review" "Product Simplification references Coding Trial Review if integrated"
Assert-Contains $commandSource "Go to Coding Trial Review" "Command Palette includes Go to Coding Trial Review if integrated"
Assert-Contains $integrationSource "Coding Flow Trial Review" "Product Readiness references Coding Flow Trial Review if integrated"
Assert-Contains $integrationSource "Coding Flow Trial Review" "Consolidation references Coding Flow Trial Review if integrated"
Assert-Contains $integrationSource "Coding Flow Trial Review readiness" "Mission Control references Coding Flow Trial Review if integrated"
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
Assert-NotMatches $allSource "https?://" "no external network dependency in coding-flow-trial-review files"
Assert-NotContains $allSource "fetch(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $allSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "localStorage.setItem", "localStorage.getItem", "process.env.", "Math.random", "Date.now", "d3-force")) { Assert-NotContains $allSource $marker "blocked marker absent: $marker" }
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $allSource "buildTrialReviewStableKey" "stable key helper or stable key patterns exist"

$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-coding-flow-trial-review\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Coding Flow Trial Review exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmokeSource "Coding Flow Trial Review" "managed smoke suite includes Coding Flow Trial Review exactly once"

Write-Host "[PASS] CodexForge Coding Flow Trial Review smoke complete."
