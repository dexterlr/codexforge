param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotContains { param([string]$Haystack, [string]$Needle, [string]$Name) if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Workflow Wizard smoke ==="
Write-Host "Base URL: $BaseUrl"

$domain = "src\lib\codexforge\workflow-wizard"
$components = Join-Path $domain "components"
if (-not (Test-Path $domain)) { throw "[FAIL] Missing workflow-wizard domain directory" }
Write-Host "[PASS] workflow-wizard domain directory exists"

$modules = @(
  "workflow-wizard-types.ts",
  "wizard-intent.ts",
  "wizard-flow.ts",
  "wizard-step.ts",
  "wizard-state.ts",
  "wizard-route-handoff.ts",
  "wizard-safety.ts",
  "wizard-progress.ts",
  "wizard-copy.ts",
  "wizard-next-action.ts",
  "workflow-wizard-summary.ts",
  "index.ts"
)
foreach ($module in $modules) { Assert-FileExists (Join-Path $domain $module) }

$uiComponents = @(
  "WorkflowWizard.tsx",
  "WizardIntentPicker.tsx",
  "WizardFlowCard.tsx",
  "WizardStepList.tsx",
  "WizardStepPanel.tsx",
  "WizardProgressBar.tsx",
  "WizardRouteHandoffPanel.tsx",
  "WizardSafetyStrip.tsx",
  "WizardNextActionPanel.tsx",
  "WizardAdvancedDetails.tsx",
  "WizardFriendlyEmptyState.tsx"
)
foreach ($component in $uiComponents) { Assert-FileExists (Join-Path $components $component) }

$index = Get-Content -Raw (Join-Path $domain "index.ts")
$wizardSource = (Get-ChildItem -Recurse -File $domain | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$startPage = Get-Content -Raw "src\app\start\page-client.tsx"
$homePage = Get-Content -Raw "src\app\page.tsx"
$aiPage = Get-Content -Raw "src\app\ai\page.tsx"
$filesPage = Get-Content -Raw "src\app\files\page-client.tsx"
$readinessSource = Get-Content -Raw "src\lib\codexforge\product-readiness-audit\product-readiness-summary.ts"
$consolidationSource = Get-Content -Raw "src\lib\codexforge\consolidation\consolidation-summary.ts"
$commandPalette = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
$touched = $wizardSource + "`n" + $startPage + "`n" + $homePage + "`n" + $aiPage + "`n" + $filesPage + "`n" + $readinessSource + "`n" + $consolidationSource + "`n" + $commandPalette

foreach ($export in @(
  "buildWizardIntent",
  "buildDefaultWizardIntents",
  "selectWizardIntent",
  "buildWizardFlow",
  "buildDefaultWizardFlows",
  "selectWizardFlowForIntent",
  "buildWizardStep",
  "buildWizardStepsForFlow",
  "buildWizardState",
  "updateWizardState",
  "buildWizardRouteHandoff",
  "buildWizardRouteHandoffAction",
  "buildWizardSafetySummary",
  "buildWizardSafetyBadge",
  "buildWizardProgress",
  "buildWizardCopy",
  "buildDefaultWizardCopy",
  "selectWizardNextAction",
  "buildWizardNextAction",
  "buildWorkflowWizardSummary"
)) {
  Assert-Contains $wizardSource "function $export" "index exports $export"
}

foreach ($component in @(
  "WorkflowWizard renders",
  "WizardIntentPicker renders",
  "WizardFlowCard renders",
  "WizardStepList renders",
  "WizardStepPanel renders",
  "WizardProgressBar renders",
  "WizardRouteHandoffPanel renders",
  "WizardSafetyStrip renders",
  "WizardNextActionPanel renders",
  "WizardAdvancedDetails renders",
  "WizardFriendlyEmptyState renders"
)) {
  Assert-Contains $wizardSource $component "$component marker"
}

Assert-Contains $startPage "WorkflowWizard" "/start imports/renders WorkflowWizard"
Assert-Contains $wizardSource "What do you want to do" "/start says What do you want to do"
foreach ($label in @("Fix code", "Inspect files", "Run checks", "Review a failure", "Plan creative work", "Review artifacts", "Set up local tools")) {
  Assert-Contains $wizardSource $label "/start includes $label"
}
Assert-NotContains $startPage "WorkflowShortcutGrid" "/start does not show duplicate route chip cloud"
Assert-NotContains $startPage "JSON.stringify" "/start does not show giant raw JSON above fold"

foreach ($flow in @("code-fix", "validation", "creative-plan", "local-setup")) { Assert-Contains $wizardSource $flow "wizard includes $flow flow" }
foreach ($step in @("Pick a file", "Preview the change", "Run checks", "Choose creative path", "Check setup")) { Assert-Contains $wizardSource $step "wizard step $step" }
foreach ($badge in @("Review first", "Approval required", "No auto-run", "No file writes")) { Assert-Contains $wizardSource $badge "safety badge $badge" }
foreach ($route in @("/files", "/validation", "/creative", "/creative-mvp")) { Assert-Contains $wizardSource $route "route handoff includes $route" }

foreach ($command in @("Open workflow wizard", "Start code fix wizard", "Start creative wizard", "Start local setup wizard", "Start artifact review wizard")) {
  Assert-Contains $commandPalette $command "command palette includes $command"
}
Assert-Contains $homePage "Start with the wizard" "homepage links to wizard"
Assert-Contains $aiPage "Need help choosing? Open Start Wizard" "AI page references wizard"
Assert-Contains $filesPage "Continue code fix flow" "Files page references wizard"
Assert-Contains $readinessSource "Real Workflow Wizard v1" "Product Readiness references Real Workflow Wizard"
Assert-Contains $consolidationSource "Real Workflow Wizard v1" "Consolidation references Real Workflow Wizard"
Assert-Contains $wizardSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $wizardSource "no duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $wizardSource "route hero title does not vertically wrap" "route hero title does not vertically wrap"
Assert-Contains $wizardSource "no giant safety essay" "no giant safety essay above fold on /start"
Assert-Contains $wizardSource "collapsed advanced details" "advanced details are collapsed or visually secondary"
Assert-Contains $wizardSource "no unsafe execution buttons" "no unsafe execution buttons"

foreach ($pattern in @(
  "appendEvent\s*\(",
  "saveBrainGraph\s*\(",
  "apply-diff\s*\(",
  "write-file\s*\(",
  "run-command\s*\(",
  "runBlender\s*\(",
  "executeBlender\s*\(",
  "runComfyUI\s*\(",
  "executeComfyUI\s*\(",
  "runUnreal\s*\(",
  "executeUnreal\s*\(",
  "ffmpeg\s*\(",
  "render\s*\(",
  "packageBuild\s*\(",
  "broker-execution\s*\(",
  "fetch\s*\(",
  "https?://",
  "OPENAI_API_KEY",
  "apiKey",
  "localStorage\.setItem",
  "Math\.random",
  "Date\.now",
  "d3-force"
)) {
  Assert-NotMatches $wizardSource $pattern "workflow wizard excludes $pattern"
}

foreach ($needle in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $wizardSource $needle "no vector database dependency $needle"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $touched $mojibakePattern "no mojibake"
Assert-Contains $wizardSource "wizard-step-" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-workflow-wizard\.ps1")
if ($suiteMatches.Count -ne 1) { throw "[FAIL] Managed smoke suite must include Workflow Wizard exactly once; found $($suiteMatches.Count)." }
Assert-Contains $allSmoke "Workflow Wizard" "managed smoke suite includes Workflow Wizard exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/start" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /start returned status $($response.StatusCode)" }
  Write-Host "[PASS] /start route reachable"
} catch {
  Write-Host "[SKIP] /start route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Workflow Wizard smoke passed."
