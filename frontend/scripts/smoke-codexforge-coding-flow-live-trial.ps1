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
Write-Host "=== CodexForge Coding Flow Live Trial smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\coding-flow-live-trial"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\code-flow\trial\page.tsx"
$pageClientPath = "src\app\code-flow\trial\page-client.tsx"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "coding-flow-live-trial-types.ts",
  "live-trial-plan.ts",
  "live-trial-checklist.ts",
  "live-trial-example-change.ts",
  "live-trial-safe-file-choice.ts",
  "live-trial-screen-guide.ts",
  "live-trial-validation-guide.ts",
  "live-trial-result-capture.ts",
  "live-trial-troubleshooting.ts",
  "live-trial-handoff.ts",
  "live-trial-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "CodingFlowLiveTrialPanel.tsx",
  "LiveTrialPlanPanel.tsx",
  "LiveTrialChecklistPanel.tsx",
  "LiveTrialExampleChangePanel.tsx",
  "LiveTrialSafeFileChoicePanel.tsx",
  "LiveTrialScreenGuidePanel.tsx",
  "LiveTrialValidationGuidePanel.tsx",
  "LiveTrialResultCapturePanel.tsx",
  "LiveTrialTroubleshootingPanel.tsx",
  "LiveTrialHandoffPanel.tsx",
  "LiveTrialSafetyStrip.tsx",
  "LiveTrialEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $pageClientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$integrationSource = @(
  "src\app\start\page-client.tsx",
  "src\app\code-flow\page-client.tsx",
  "src\app\apply-validation\page-client.tsx",
  "src\app\workflow-results\page-client.tsx",
  "src\app\run-history\page-client.tsx",
  "src\app\closed-loop\page.tsx",
  "src\app\readiness\page-client.tsx",
  "src\app\consolidation\page-client.tsx",
  "src\app\mission\page-client.tsx"
) | ForEach-Object { Get-Content -Raw $_ }
$integrationSource = $integrationSource -join "`n"
$commandSource = (Get-ChildItem "src\lib\codexforge\command-palette" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$productSource = (Get-ChildItem "src\lib\codexforge\product-simplification" -Recurse -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource

foreach ($export in @(
  "buildLiveTrialPlan",
  "buildDefaultLiveTrialPlan",
  "buildLiveTrialChecklist",
  "buildLiveTrialChecklistItem",
  "buildLiveTrialExampleChange",
  "buildDefaultLiveTrialExampleChanges",
  "buildLiveTrialSafeFileChoice",
  "buildDefaultLiveTrialSafeFileChoices",
  "buildLiveTrialScreenGuide",
  "buildLiveTrialScreenGuideStep",
  "buildLiveTrialValidationGuide",
  "buildLiveTrialValidationCommand",
  "buildLiveTrialResultCapture",
  "buildLiveTrialResultCaptureItem",
  "buildLiveTrialTroubleshooting",
  "buildLiveTrialTroubleshootingItem",
  "buildLiveTrialHandoff",
  "buildLiveTrialHandoffSection",
  "buildLiveTrialSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "CodingFlowLiveTrialPanel renders",
  "LiveTrialPlanPanel renders",
  "LiveTrialChecklistPanel renders",
  "LiveTrialExampleChangePanel renders",
  "LiveTrialSafeFileChoicePanel renders",
  "LiveTrialScreenGuidePanel renders",
  "LiveTrialValidationGuidePanel renders",
  "LiveTrialResultCapturePanel renders",
  "LiveTrialTroubleshootingPanel renders",
  "LiveTrialHandoffPanel renders",
  "LiveTrialSafetyStrip renders",
  "LiveTrialEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "CodingFlowLiveTrialPanel" "/code-flow/trial imports/renders CodingFlowLiveTrialPanel"
Assert-Contains $routeSource "Try the coding flow" "/code-flow/trial says Try the coding flow"
Assert-Contains $allSource "Start trial" "/code-flow/trial says Start trial"
foreach ($text in @("no auto-apply", "no auto-run", "approval required", "preserve latest-message authority")) { Assert-Contains $allSource $text "UI says $text" }
Assert-Contains $allSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $allSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $allSource "whiteSpace: `"nowrap`"" "route hero title does not vertically wrap"
Assert-Contains $allSource "Pick a safe file" "checklist includes Pick a safe file"
Assert-Contains $allSource "Preview the patch" "checklist includes Preview the patch"
Assert-Contains $allSource "Prepare validation" "checklist includes Prepare validation"
Assert-Contains $allSource "Capture result" "checklist includes Capture result"
Assert-Contains $allSource "copy-only wording change" "examples include copy-only wording change"
Assert-Contains $allSource "small UI label change" "examples include small UI label change"
Assert-Contains $allSource "UI copy component" "safe file choices include UI copy component"
Assert-Contains $allSource "package.json" "risky file choices include package.json"
Assert-Contains $allSource "tool policy" "risky file choices include tool policy"
foreach ($route in @("/start", "/code-flow", "/files", "/apply-validation", "/validation", "/workflow-results", "/run-history")) { Assert-Contains $allSource $route "screen guide includes $route" }
foreach ($command in @("npm run build", "npm run smoke:codexforge:server", "git diff --check")) { Assert-Contains $allSource $command "validation guide includes $command" }
Assert-Contains $allSource "validation result" "result capture includes validation result"
Assert-Contains $allSource "/closed-loop" "troubleshooting routes failed validation to /closed-loop"
Assert-Contains $allSource "markdown trial report" "handoff supports markdown trial report"
Assert-Contains $integrationSource "Coding Trial" "/start references Coding Trial if integrated"
Assert-Contains $integrationSource "Coding Trial" "/code-flow references Coding Trial if integrated"
Assert-Contains $integrationSource "Coding Trial" "/apply-validation references Coding Trial if integrated"
Assert-Contains $integrationSource "Coding Trial" "/workflow-results references Coding Trial if integrated"
Assert-Contains $integrationSource "Coding Trial" "/run-history references Coding Trial or trial run if integrated"
Assert-Contains $integrationSource "trial troubleshooting" "/closed-loop references trial troubleshooting if integrated"
Assert-Contains $commandSource "Go to Coding Trial" "Command Palette includes Go to Coding Trial if integrated"
Assert-Contains $productSource "Coding Flow Live Trial" "Product Readiness references Coding Flow Live Trial if integrated"
Assert-Contains $integrationSource "Coding Flow Live Trial" "Consolidation references Coding Flow Live Trial if integrated"
Assert-Contains $integrationSource "Coding Flow Live Trial readiness" "Mission Control references Coding Flow Live Trial if integrated"
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
Assert-NotMatches $allSource "https?://" "no external network dependency in coding-flow-live-trial files"
Assert-NotContains $allSource "fetch(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $allSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'", "localStorage.setItem", "localStorage.getItem", "process.env.", "Math.random", "Date.now", "d3-force")) { Assert-NotContains $allSource $marker "blocked marker absent: $marker" }
$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-Contains $allSource "buildLiveTrialStableKey" "stable key helper or stable key patterns exist"

$allSmokeSource = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$suiteMatches = [regex]::Matches($allSmokeSource, "smoke-codexforge-coding-flow-live-trial\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Coding Flow Live Trial exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmokeSource "Coding Flow Live Trial" "managed smoke suite includes Coding Flow Live Trial exactly once"

Write-Host "[PASS] CodexForge Coding Flow Live Trial smoke complete."
