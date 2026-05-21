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
Write-Host "=== CodexForge Real Coding Flow smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\real-coding-flow"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\code-flow\page.tsx"
$pageClientPath = "src\app\code-flow\page-client.tsx"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "real-coding-flow-types.ts",
  "coding-flow-input.ts",
  "coding-flow-file-step.ts",
  "coding-flow-change-request.ts",
  "coding-flow-preview-step.ts",
  "coding-flow-apply-step.ts",
  "coding-flow-validation-step.ts",
  "coding-flow-result-step.ts",
  "coding-flow-route-handoff.ts",
  "coding-flow-next-action.ts",
  "real-coding-flow-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "RealCodingFlowPanel.tsx",
  "CodingFlowStartPanel.tsx",
  "CodingFlowFileStepPanel.tsx",
  "CodingFlowChangeRequestPanel.tsx",
  "CodingFlowPreviewStepPanel.tsx",
  "CodingFlowApplyStepPanel.tsx",
  "CodingFlowValidationStepPanel.tsx",
  "CodingFlowResultStepPanel.tsx",
  "CodingFlowProgressPanel.tsx",
  "CodingFlowNextActionPanel.tsx",
  "CodingFlowSafetyStrip.tsx",
  "CodingFlowEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource

foreach ($export in @(
  "buildCodingFlowInput",
  "validateCodingFlowInput",
  "buildCodingFlowFileStep",
  "buildCodingFlowChangeRequest",
  "validateCodingFlowChangeRequest",
  "buildCodingFlowPreviewStep",
  "buildCodingFlowApplyStep",
  "buildCodingFlowValidationStep",
  "buildCodingFlowResultStep",
  "buildCodingFlowRouteHandoff",
  "buildCodingFlowRouteHandoffAction",
  "selectCodingFlowNextAction",
  "buildCodingFlowNextActionPlan",
  "buildRealCodingFlowSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "RealCodingFlowPanel renders",
  "CodingFlowStartPanel renders",
  "CodingFlowFileStepPanel renders",
  "CodingFlowChangeRequestPanel renders",
  "CodingFlowPreviewStepPanel renders",
  "CodingFlowApplyStepPanel renders",
  "CodingFlowValidationStepPanel renders",
  "CodingFlowResultStepPanel renders",
  "CodingFlowProgressPanel renders",
  "CodingFlowNextActionPanel renders",
  "CodingFlowSafetyStrip renders",
  "CodingFlowEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "RealCodingFlowPanel" "/code-flow imports/renders RealCodingFlowPanel"
foreach ($text in @("Fix code safely", "Pick a file", "Preview patch", "Review before apply", "Run checks", "Prepare checks", "Review result", "no auto-apply", "no auto-run", "approval required", "preview first", "preserve latest-message authority")) {
  Assert-Contains $allSource $text "UI says $text"
}
Assert-Contains $allSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $allSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $allSource "whiteSpace: `"nowrap`"" "route hero title does not vertically wrap"
Assert-Contains $allSource "advanced details are collapsed or visually secondary" "advanced details are collapsed or visually secondary"
Assert-Contains $allSource "no giant raw JSON above fold" "no giant raw JSON above fold"

Assert-Contains $domainSource "Select a file before describing a patch request." "change request validation blocks missing file"
Assert-Contains $domainSource "Describe what you want changed." "change request validation blocks missing change text"
foreach ($command in @("npm run build", "npm run smoke:codexforge:server", "git diff --check", "git status --short")) {
  Assert-Contains $domainSource $command "validation step includes $command"
}
Assert-Contains $domainSource '"open-files", "Open Files", "/files", "No file selected."' "next action routes missing file to /files"
Assert-Contains $domainSource '"/closed-loop", "Validation failed."' "next action routes failed validation to /closed-loop"
Assert-Contains $domainSource '"/files"' "route handoff includes /files"
Assert-Contains $domainSource '"/validation"' "route handoff includes /validation"
Assert-Contains $domainSource '"/closed-loop"' "route handoff includes /closed-loop"

$workflowWizardSource = (Get-ChildItem "src\lib\codexforge\workflow-wizard" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$startSource = Get-Content -Raw "src\app\start\page-client.tsx"
$filesSource = Get-Content -Raw "src\app\files\page-client.tsx"
$validationSource = Get-Content -Raw "src\app\validation\page-client.tsx"
$closedLoopSource = Get-Content -Raw "src\app\closed-loop\page.tsx"
$aiSource = Get-Content -Raw "src\app\ai\page.tsx"
$productSource = (Get-ChildItem "src\lib\codexforge\product-simplification" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commandSource = (Get-ChildItem "src\lib\codexforge\command-palette" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$readinessSource = (Get-Content -Raw "src\app\readiness\page-client.tsx")
$consolidationSource = (Get-Content -Raw "src\app\consolidation\page-client.tsx")
$missionSource = (Get-Content -Raw "src\app\mission\page-client.tsx")

Assert-Contains $workflowWizardSource "/code-flow" "Workflow Wizard references /code-flow if integrated"
Assert-Contains ($workflowWizardSource + $startSource) "/code-flow" "/start Fix code points to /code-flow if integrated"
Assert-Contains $filesSource "Code Flow" "/files references Code Flow if integrated"
Assert-Contains $validationSource "Code Flow" "/validation references Code Flow if integrated"
Assert-Contains $closedLoopSource "Code Flow" "/closed-loop references Code Flow if integrated"
Assert-Contains $aiSource "Code Flow" "/ai references Code Flow if integrated"
Assert-Contains $productSource "Real coding flow" "Product Simplification references Real coding flow if integrated"
Assert-Contains $commandSource "Go to Code Flow" "Command Palette includes Go to Code Flow if integrated"
Assert-Contains $commandSource "Start safe code fix" "Command Palette includes Start safe code fix if integrated"
Assert-Contains $readinessSource "One Real End-to-End Coding Flow" "Product Readiness references One Real End-to-End Coding Flow if integrated"
Assert-Contains $consolidationSource "One Real End-to-End Coding Flow" "Consolidation references One Real End-to-End Coding Flow if integrated"
Assert-Contains $missionSource "Coding Flow readiness" "Mission Control references Coding Flow readiness if integrated"

Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI unless guarded text"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $allSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotMatches $allSource "https?://" "no external network dependency in real-coding-flow files"
Assert-NotContains $allSource "fetch(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $allSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "localStorage.setItem", "localStorage.getItem", "process.env.", "Math.random", "Date.now", "d3-force")) { Assert-NotContains $allSource $marker "blocked marker absent: $marker" }
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $allSource "buildCodingFlowStableKey" "stable key helper or stable key patterns exist"

$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-real-coding-flow\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Real Coding Flow exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmokeSource "Real Coding Flow" "managed smoke suite includes Real Coding Flow exactly once"

Write-Host "[PASS] CodexForge Real Coding Flow smoke complete."
