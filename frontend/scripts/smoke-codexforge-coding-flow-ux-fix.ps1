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
Write-Host "=== CodexForge Coding Flow UX Fix smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\coding-flow-ux-fix"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\code-flow\ux-fixes\page.tsx"
$pageClientPath = "src\app\code-flow\ux-fixes\page-client.tsx"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "coding-flow-ux-fix-types.ts",
  "coding-flow-friction-model.ts",
  "coding-flow-copy-fix.ts",
  "coding-flow-primary-action-fix.ts",
  "coding-flow-panel-priority.ts",
  "coding-flow-empty-state-fix.ts",
  "coding-flow-validation-copy-fix.ts",
  "coding-flow-result-guidance-fix.ts",
  "coding-flow-route-handoff-fix.ts",
  "coding-flow-ux-fix-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "CodingFlowUxFixPanel.tsx",
  "CodingFlowFrictionPanel.tsx",
  "CodingFlowCopyFixPanel.tsx",
  "CodingFlowPrimaryActionFixPanel.tsx",
  "CodingFlowPanelPriorityPanel.tsx",
  "CodingFlowEmptyStateFixPanel.tsx",
  "CodingFlowValidationCopyFixPanel.tsx",
  "CodingFlowResultGuidanceFixPanel.tsx",
  "CodingFlowRouteHandoffFixPanel.tsx",
  "CodingFlowUxFixSafetyStrip.tsx",
  "CodingFlowUxFixEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource

foreach ($export in @(
  "buildCodingFlowFriction",
  "buildDefaultCodingFlowFrictions",
  "buildCodingFlowCopyFix",
  "buildDefaultCodingFlowCopyFixes",
  "buildCodingFlowPrimaryActionFix",
  "selectCodingFlowPrimaryAction",
  "buildCodingFlowPanelPriority",
  "buildCodingFlowPanelPriorityItem",
  "buildCodingFlowEmptyStateFix",
  "buildDefaultCodingFlowEmptyStateFixes",
  "buildCodingFlowValidationCopyFix",
  "buildValidationGuidanceCopy",
  "buildCodingFlowResultGuidanceFix",
  "buildResultGuidanceOutcome",
  "buildCodingFlowRouteHandoffFix",
  "buildRouteHandoffFixItem",
  "buildCodingFlowUxFixSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "CodingFlowUxFixPanel renders",
  "CodingFlowFrictionPanel renders",
  "CodingFlowCopyFixPanel renders",
  "CodingFlowPrimaryActionFixPanel renders",
  "CodingFlowPanelPriorityPanel renders",
  "CodingFlowEmptyStateFixPanel renders",
  "CodingFlowValidationCopyFixPanel renders",
  "CodingFlowResultGuidanceFixPanel renders",
  "CodingFlowRouteHandoffFixPanel renders",
  "CodingFlowUxFixSafetyStrip renders",
  "CodingFlowUxFixEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "CodingFlowUxFixPanel" "/code-flow/ux-fixes imports/renders CodingFlowUxFixPanel"
Assert-Contains $routeSource "Make the coding flow easier" "/code-flow/ux-fixes says Make the coding flow easier"
Assert-Contains $allSource "Copy UX fix checklist" "/code-flow/ux-fixes says Copy UX fix checklist"
foreach ($text in @("no auto-apply", "no auto-run", "approval required", "preserve latest-message authority")) { Assert-Contains $allSource $text "UI says $text" }
Assert-Contains $allSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $allSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $allSource "whiteSpace: `"nowrap`"" "route hero title does not vertically wrap"

foreach ($text in @("too many panels", "unclear primary action", "wording too technical")) { Assert-Contains $allSource $text "friction includes $text" }
foreach ($text in @("Pick a file", "Preview patch", "Continue code flow", "essential", "advanced", "Pick a file to start", "Copy these checks", "Run them in your terminal", "Paste the output back", "validation passed", "validation failed", "/code-flow to /files", "/apply-validation to /validation", "/validation to /workflow-results")) {
  Assert-Contains $allSource $text "UX fix source includes $text"
}

$codeFlowSource = Get-Content -Raw "src\app\code-flow\page-client.tsx"
$applyValidationSource = Get-Content -Raw "src\app\apply-validation\page-client.tsx"
$workflowResultsSource = Get-Content -Raw "src\app\workflow-results\page-client.tsx"
$runHistorySource = Get-Content -Raw "src\app\run-history\page-client.tsx"
$startSource = Get-Content -Raw "src\app\start\page-client.tsx"
$commandSource = (Get-ChildItem "src\lib\codexforge\command-palette" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$readinessSource = Get-Content -Raw "src\app\readiness\page-client.tsx"
$consolidationSource = Get-Content -Raw "src\app\consolidation\page-client.tsx"
$missionSource = Get-Content -Raw "src\app\mission\page-client.tsx"

Assert-Contains $codeFlowSource "Continue code flow" "/code-flow uses clearer next action or Continue code flow if integrated"
Assert-Contains $applyValidationSource "Prepare validation checklist" "/apply-validation uses Prepare validation checklist if integrated"
Assert-Contains $workflowResultsSource "Copy workflow handoff" "/workflow-results uses Copy workflow handoff if integrated"
Assert-Contains $runHistorySource "Review latest run" "/run-history uses Review latest run if integrated"
Assert-Contains $startSource "Fix code clear" "/start keeps Fix code clear if integrated"
Assert-Contains $commandSource "Go to Coding UX Fixes" "Command Palette includes Go to Coding UX Fixes if integrated"
Assert-Contains $commandSource "Copy coding UX fix checklist" "Command Palette includes Copy coding UX fix checklist"
Assert-Contains $commandSource "Copy simplified validation copy" "Command Palette includes Copy simplified validation copy"
Assert-Contains $commandSource "Copy route handoff checklist" "Command Palette includes Copy route handoff checklist"
Assert-Contains $readinessSource "Coding Flow UX Fix Pack" "Product Readiness references Coding Flow UX Fix Pack if integrated"
Assert-Contains $consolidationSource "Coding Flow UX Fix Pack" "Consolidation references Coding Flow UX Fix Pack if integrated"
Assert-Contains $missionSource "Coding Flow UX Fix Pack readiness" "Mission Control references Coding Flow UX Fix Pack if integrated"

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
Assert-NotMatches $allSource "https?://" "no external network dependency in coding-flow-ux-fix files"
Assert-NotContains $allSource "fetch(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $allSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "localStorage.setItem", "localStorage.getItem", "process.env.", "Math.random", "Date.now", "d3-force")) { Assert-NotContains $allSource $marker "blocked marker absent: $marker" }
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $allSource "buildCodingFlowUxFixStableKey" "stable key helper or stable key patterns exist"

$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-coding-flow-ux-fix\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Coding Flow UX Fix exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmokeSource "Coding Flow UX Fix" "managed smoke suite includes Coding Flow UX Fix exactly once"

Write-Host "[PASS] CodexForge Coding Flow UX Fix smoke complete."
