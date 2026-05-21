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
Write-Host "=== CodexForge Workflow Result Persistence smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\workflow-result-persistence"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\workflow-results\page.tsx"
$pageClientPath = "src\app\workflow-results\page-client.tsx"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "workflow-result-types.ts",
  "workflow-result-record.ts",
  "workflow-result-capture.ts",
  "workflow-result-storage-policy.ts",
  "validation-result-record.ts",
  "workflow-result-handoff.ts",
  "workflow-result-review.ts",
  "workflow-result-next-action.ts",
  "workflow-result-memory-candidate.ts",
  "workflow-result-export.ts",
  "workflow-result-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "WorkflowResultPersistencePanel.tsx",
  "WorkflowResultRecordPanel.tsx",
  "WorkflowResultCapturePanel.tsx",
  "WorkflowResultStoragePolicyPanel.tsx",
  "ValidationResultRecordPanel.tsx",
  "WorkflowResultHandoffPanel.tsx",
  "WorkflowResultReviewPanel.tsx",
  "WorkflowResultNextActionPanel.tsx",
  "WorkflowResultMemoryCandidatePanel.tsx",
  "WorkflowResultExportPanel.tsx",
  "WorkflowResultSafetyStrip.tsx",
  "WorkflowResultEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource

foreach ($export in @(
  "buildWorkflowResultRecord",
  "validateWorkflowResultRecord",
  "buildWorkflowResultCapture",
  "buildWorkflowResultCaptureItem",
  "buildWorkflowResultStoragePolicy",
  "isWorkflowResultStorageAllowed",
  "buildValidationResultRecord",
  "buildValidationCommandResult",
  "buildWorkflowResultHandoff",
  "buildWorkflowResultHandoffSection",
  "buildWorkflowResultReview",
  "buildWorkflowResultReviewCheck",
  "selectWorkflowResultNextAction",
  "buildWorkflowResultNextActionPlan",
  "buildWorkflowResultMemoryCandidate",
  "validateWorkflowResultMemoryCandidate",
  "buildWorkflowResultExport",
  "buildWorkflowResultExportSection",
  "buildWorkflowResultSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "WorkflowResultPersistencePanel renders",
  "WorkflowResultRecordPanel renders",
  "WorkflowResultCapturePanel renders",
  "WorkflowResultStoragePolicyPanel renders",
  "ValidationResultRecordPanel renders",
  "WorkflowResultHandoffPanel renders",
  "WorkflowResultReviewPanel renders",
  "WorkflowResultNextActionPanel renders",
  "WorkflowResultMemoryCandidatePanel renders",
  "WorkflowResultExportPanel renders",
  "WorkflowResultSafetyStrip renders",
  "WorkflowResultEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "WorkflowResultPersistencePanel" "/workflow-results imports/renders WorkflowResultPersistencePanel"
foreach ($text in @("Review workflow results", "no auto-promotion", "no Brain auto-mutation", "no auto-persist into Brain", "review required", "preserve latest-message authority")) {
  Assert-Contains $allSource $text "UI says $text"
}
Assert-Contains $allSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $allSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $allSource "whiteSpace: `"nowrap`"" "route hero title does not vertically wrap"
Assert-NotContains $allSource "overflowWrap: `"anywhere`"" "display headings do not use overflowWrap:anywhere"

foreach ($text in @(
  "Brain auto-mutation blocked",
  "memory auto-promotion blocked",
  "raw secrets blocked",
  "does not fabricate output",
  "caps excerpts",
  "validation status included",
  "next action included",
  "secrets checked",
  "Validation failed -> closed-loop fix workflow",
  "Validation passed -> commit/tag/push guidance",
  "No-auto-promotion guarantee",
  "sensitive details",
  "markdown",
  "issue-draft"
)) { Assert-Contains $allSource $text "domain/UI marker $text" }

$codeFlowSource = Get-Content -Raw "src\app\code-flow\page-client.tsx"
$applyValidationSource = Get-Content -Raw "src\app\apply-validation\page-client.tsx"
$validationSource = Get-Content -Raw "src\app\validation\page-client.tsx"
$closedLoopSource = Get-Content -Raw "src\app\closed-loop\page.tsx"
$workflowWizardSource = (Get-ChildItem "src\lib\codexforge\workflow-wizard" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$productSource = (Get-ChildItem "src\lib\codexforge\product-simplification" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$memorySource = ((Get-ChildItem "src\lib\codexforge\memory-review" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n") + "`n" + ((Get-ChildItem "src\lib\codexforge\operator-memory-inbox" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n") + "`n" + $uiSource
$commandSource = (Get-ChildItem "src\lib\codexforge\command-palette" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$readinessSource = Get-Content -Raw "src\app\readiness\page-client.tsx"
$consolidationSource = Get-Content -Raw "src\app\consolidation\page-client.tsx"
$missionSource = Get-Content -Raw "src\app\mission\page-client.tsx"

Assert-Contains $codeFlowSource "Workflow Results" "/code-flow references Workflow Results if integrated"
Assert-Contains $applyValidationSource "Workflow Results" "/apply-validation references Workflow Results if integrated"
Assert-Contains $validationSource "Workflow Results" "/validation references Workflow Results if integrated"
Assert-Contains $closedLoopSource "Workflow Results" "/closed-loop references Workflow Results if integrated"
Assert-Contains $workflowWizardSource "/workflow-results" "Workflow Wizard references /workflow-results if integrated"
Assert-Contains $productSource "Review workflow results" "Product Simplification references Workflow Results if integrated"
Assert-Contains $memorySource "workflow result candidate" "Memory Review or Operator Memory Inbox references workflow result candidate if integrated"
Assert-Contains $commandSource "Go to Workflow Results" "Command Palette includes Go to Workflow Results if integrated"
Assert-Contains $commandSource "Copy workflow handoff" "Command Palette includes Copy workflow handoff if integrated"
Assert-Contains $commandSource "Copy validation result summary" "Command Palette includes Copy validation result summary if integrated"
Assert-Contains $commandSource "Copy memory review candidate" "Command Palette includes Copy memory review candidate if integrated"
Assert-Contains $readinessSource "Workflow Result Persistence" "Product Readiness references Workflow Result Persistence if integrated"
Assert-Contains $consolidationSource "Workflow Result Persistence" "Consolidation references Workflow Result Persistence if integrated"
Assert-Contains $missionSource "Workflow Result Persistence readiness" "Mission Control references Workflow Result Persistence if integrated"

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
Assert-NotMatches $allSource "https?://" "no external network dependency in workflow-result-persistence files"
Assert-NotContains $allSource "fetch(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $allSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "localStorage.setItem", "localStorage.getItem", "process.env.", "Math.random", "Date.now", "d3-force")) { Assert-NotContains $allSource $marker "blocked marker absent: $marker" }
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $allSource "buildWorkflowResultStableKey" "stable key helper or stable key patterns exist"

$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-workflow-result-persistence\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Workflow Result Persistence exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmokeSource "Workflow Result Persistence" "managed smoke suite includes Workflow Result Persistence exactly once"

Write-Host "[PASS] CodexForge Workflow Result Persistence smoke complete."
