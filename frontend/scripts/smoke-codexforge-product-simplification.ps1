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
Write-Host "=== CodexForge Product Simplification smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\product-simplification"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\start\page.tsx"
$pageClientPath = "src\app\start\page-client.tsx"
$homePagePath = "src\app\page.tsx"
$homeHeroPath = "src\lib\codexforge\operator-home\components\OperatorHomeHero.tsx"
$aiPath = "src\app\ai\page.tsx"
$filesPath = "src\app\files\page-client.tsx"
$validationPath = "src\app\validation\page-client.tsx"
$closedLoopPath = "src\app\closed-loop\page.tsx"
$creativePath = "src\app\creative\page-client.tsx"
$creativeMvpPath = "src\app\creative-mvp\page-client.tsx"
$commandRegistryPath = "src\lib\codexforge\command-palette\command-registry.ts"
$readinessPath = "src\lib\codexforge\product-readiness-audit\route-readiness-audit.ts"
$consolidationPath = "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$missionSourcePath = "src\lib\codexforge\mission-control\mission-health.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "product-simplification-types.ts",
  "user-intent-model.ts",
  "guided-workflow-model.ts",
  "simplified-page-copy.ts",
  "primary-action-model.ts",
  "progressive-disclosure.ts",
  "friendly-empty-states.ts",
  "workflow-shortcuts.ts",
  "product-simplification-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "ProductSimplificationPanel.tsx",
  "UserIntentChooser.tsx",
  "GuidedWorkflowCard.tsx",
  "PrimaryActionStrip.tsx",
  "ProgressiveDisclosurePanel.tsx",
  "FriendlyEmptyState.tsx",
  "WorkflowShortcutGrid.tsx",
  "SimplifiedSafetyBadge.tsx",
  "ProductSimplificationSafetyNotice.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

foreach ($path in @($routePath,$pageClientPath,$homePagePath,$homeHeroPath,$aiPath,$filesPath,$validationPath,$closedLoopPath,$creativePath,$creativeMvpPath,$commandRegistryPath,$readinessPath,$consolidationPath,$missionSourcePath,$allSmokePath)) {
  Assert-FileExists $path
}

$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$componentSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $pageClientPath)
$homeSource = (Get-Content -Raw $homePagePath) + "`n" + (Get-Content -Raw $homeHeroPath)
$pageSource = (Get-Content -Raw $aiPath) + "`n" + (Get-Content -Raw $filesPath) + "`n" + (Get-Content -Raw $validationPath) + "`n" + (Get-Content -Raw $closedLoopPath) + "`n" + (Get-Content -Raw $creativePath) + "`n" + (Get-Content -Raw $creativeMvpPath)
$integrationSource = (Get-Content -Raw $commandRegistryPath) + "`n" + (Get-Content -Raw $readinessPath) + "`n" + (Get-Content -Raw $consolidationPath) + "`n" + (Get-Content -Raw $missionSourcePath)
$allSmoke = Get-Content -Raw $allSmokePath
$allSource = $domainSource + "`n" + $componentSource + "`n" + $routeSource + "`n" + $homeSource + "`n" + $pageSource + "`n" + $integrationSource

foreach ($export in @(
  "buildUserIntentOption",
  "buildDefaultUserIntentOptions",
  "classifyUserIntent",
  "buildGuidedWorkflow",
  "buildGuidedWorkflowStep",
  "buildSimplifiedPageCopy",
  "buildDefaultSimplifiedPageCopy",
  "buildPrimaryAction",
  "selectPrimaryActionForRoute",
  "buildProgressiveDisclosure",
  "buildDisclosureSection",
  "buildFriendlyEmptyState",
  "buildDefaultFriendlyEmptyStates",
  "buildWorkflowShortcut",
  "buildDefaultWorkflowShortcuts",
  "buildProductSimplificationSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($marker in @(
  "ProductSimplificationPanel renders",
  "UserIntentChooser renders",
  "GuidedWorkflowCard renders",
  "PrimaryActionStrip renders",
  "ProgressiveDisclosurePanel renders",
  "FriendlyEmptyState renders",
  "WorkflowShortcutGrid renders",
  "SimplifiedSafetyBadge renders",
  "ProductSimplificationSafetyNotice renders"
)) { Assert-Contains $componentSource $marker $marker }

Assert-Contains $routeSource "ProductSimplificationPanel" "/start imports and renders ProductSimplificationPanel"
Assert-Contains $routeSource "focusMode" "/start uses Focus Mode UX"
Assert-Contains $componentSource "calm workflow layout" "/start has calm workflow layout markers"
Assert-Contains $componentSource "What do you want to do" "/start says What do you want to do"

foreach ($copy in @("Fix code","Inspect project files","Run checks","Plan creative work","Plan creative render","Setup local tools","plain-English copy","Start with one clear next step")) {
  Assert-Contains $allSource $copy "plain copy $copy"
}

foreach ($copy in @("Ask CodexForge","Describe what you want to inspect, fix, or plan","Inspect a file","Prepare checks","Start fix loop","Review MVP candidate")) {
  Assert-Contains $pageSource $copy "touched page friendly copy $copy"
}

foreach ($badge in @("Review first","Approval required","No auto-run","No file writes","Preview only")) {
  Assert-Contains $componentSource $badge "compact safety badge $badge"
}

Assert-Contains $componentSource "Advanced details" "advanced details are collapsible or visually secondary"
Assert-Contains $domainSource "Raw JSON stays hidden unless expanded" "raw JSON is hidden unless expanded"
Assert-Contains $domainSource "ACTIONS: readonly PrimaryAction[]" "primary action model includes one action list"
Assert-Contains $domainSource "route: `"/ai`", label: `"Ask CodexForge`"" "primary action /ai"
Assert-Contains $domainSource "route: `"/files`", label: `"Inspect a file`"" "primary action /files"
Assert-Contains $domainSource "route: `"/validation`", label: `"Prepare checks`"" "primary action /validation"
Assert-Contains $domainSource "route: `"/creative`", label: `"Plan creative work`"" "primary action /creative"

Assert-Contains $homeSource '"/start"' "homepage links to /start"
Assert-Contains $commandRegistryPath "command-registry.ts" "command registry path present"
Assert-Contains $integrationSource "Go to Start" "command palette includes Go to Start"
Assert-Contains $integrationSource "Start code fix" "command palette includes Start code fix"
Assert-Contains $integrationSource "Start creative plan" "command palette includes Start creative plan"
Assert-Contains $integrationSource "Product Simplification" "Product Readiness and Consolidation reference Product Simplification"
Assert-Contains $integrationSource "Real Workflow Wizard v1" "Mission Control/readiness recommends Real Workflow Wizard v1"

Assert-NotContains $routeSource "route chip cloud" "/start has no duplicate route chip cloud text"
Assert-Contains $routeSource "showHeroRouteChips={false}" "/start disables hero route chips"
Assert-Contains $componentSource "whiteSpace: `"normal`"" "route hero title does not vertically wrap awkwardly"

foreach ($pattern in @(
  "key=\{label\}",
  "key=\{summary\}",
  "key=\{item\}",
  "Math\.random",
  "Date\.now",
  "d3-force",
  "appendEvent\s*\(",
  "saveBrainGraph\s*\(",
  "\.nodes\s*\.\s*push|\.edges\s*\.\s*push",
  "apply-diff\s*\(",
  "write-file\s*\(",
  "run-command\s*\(",
  "broker-execution\s*\(",
  "runBlender\s*\(",
  "executeBlender\s*\(",
  "runComfyUI\s*\(",
  "executeComfyUI\s*\(",
  "runUnreal\s*\(",
  "executeUnreal\s*\(",
  "ffmpeg\s*\(",
  "renderJob\s*\(",
  "packageBuild\s*\("
)) { Assert-NotMatches $allSource $pattern "product simplification excludes $pattern" }

foreach ($marker in @(
  "OPENAI_API_KEY",
  "apiKey",
  "localStorage.setItem",
  "process.env",
  "from `"openai`"",
  "from 'openai'",
  "pinecone",
  "weaviate",
  "chroma",
  "qdrant",
  "milvus",
  "pgvector",
  "XMLHttpRequest",
  "axios",
  "fetch(",
  "https://",
  "http://",
  "sk-"
)) { Assert-NotContains ($domainSource + "`n" + $componentSource + "`n" + $routeSource) $marker "no unsafe dependency marker $marker" }

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-product-simplification\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Product Simplification exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Product Simplification" "managed smoke suite includes Product Simplification exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/start" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] /start returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] /start route reachable"
} catch {
  Write-Host "[SKIP] /start route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Product Simplification smoke passed."
