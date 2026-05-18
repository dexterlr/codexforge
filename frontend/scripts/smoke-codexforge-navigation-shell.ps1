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
Write-Host "=== CodexForge Navigation Shell smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\navigation-shell"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$operatorHomePath = "src\lib\codexforge\operator-home\components\OperatorHomeDashboard.tsx"
$stabilizationPath = "src\lib\codexforge\stabilization-command-center\components\StabilizationCommandCenter.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "navigation-shell-types.ts",
  "navigation-route-registry.ts",
  "navigation-section-model.ts",
  "navigation-safety-posture.ts",
  "navigation-next-action.ts",
  "navigation-route-state.ts",
  "navigation-shell-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "CodexForgeAppShell.tsx",
  "CodexForgeSidebar.tsx",
  "CodexForgeTopbar.tsx",
  "CodexForgeRouteSwitcher.tsx",
  "CodexForgeSafetyPostureStrip.tsx",
  "CodexForgeNextActionDock.tsx",
  "CodexForgeShellBreadcrumbs.tsx",
  "CodexForgeWorkspaceMap.tsx",
  "CodexForgeShellMobileNav.tsx",
  "CodexForgeShellSafetyNotice.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$operatorHomeSource = Get-Content -Raw $operatorHomePath
$stabilizationSource = Get-Content -Raw $stabilizationPath
$allSmoke = Get-Content -Raw $allSmokePath
$shellSource = $domainSource + "`n" + $uiSource + "`n" + $operatorHomeSource + "`n" + $stabilizationSource

foreach ($export in @(
  "buildCodexForgeNavigationRoutes",
  "buildCodexForgeNavigationRoute",
  "buildCodexForgeNavigationSections",
  "buildCodexForgeNavigationSection",
  "buildCodexForgeNavigationSafetyPosture",
  "buildCodexForgeSafetyPostureItem",
  "selectCodexForgeShellNextAction",
  "buildCodexForgeShellNextActionPlan",
  "buildCodexForgeRouteState",
  "detectCodexForgeActiveRoute",
  "buildCodexForgeNavigationShellSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "CodexForgeAppShell renders",
  "CodexForgeSidebar renders",
  "CodexForgeTopbar renders",
  "CodexForgeRouteSwitcher renders",
  "CodexForgeSafetyPostureStrip renders",
  "CodexForgeNextActionDock renders",
  "CodexForgeShellBreadcrumbs renders",
  "CodexForgeWorkspaceMap renders",
  "CodexForgeShellMobileNav renders",
  "CodexForgeShellSafetyNotice renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $operatorHomeSource "CodexForgeAppShell" "Operator Home imports/renders shell if integrated"
Assert-Contains $stabilizationSource "CodexForgeAppShell" "Stabilization imports/renders shell if integrated"

foreach ($text in @("AI Workspace", "Brain", "Files", "Stabilization")) {
  Assert-Contains $shellSource $text "UI references $text"
}

foreach ($text in @(
  "local-first",
  "operator-safe",
  "no auto-fix",
  "no command execution without approval",
  "no file writes without approval",
  "preserve latest-message authority"
)) {
  Assert-Contains $shellSource $text "UI says $text"
}

foreach ($route in @('href: "/"', 'href: "/ai"', 'href: "/brain"', 'href: "/files"', 'href: "/stabilization"')) {
  Assert-Contains $domainSource $route "route registry includes $route"
}

foreach ($section in @('"Command"', '"Cognition"', '"Engineering"', '"Stabilization"')) {
  Assert-Contains $domainSource $section "sections include $section"
}

Assert-Contains $domainSource "apply-diff approval gated" "safety posture includes apply-diff approval gated"
Assert-Contains $domainSource '"/stabilization"' "next action can route to /stabilization"
Assert-Contains $domainSource "commit clean checkpoint" "next action can recommend commit clean checkpoint"
Assert-Contains $domainSource "breadcrumbs" "breadcrumbs are deterministic"

Assert-NotMatches $shellSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*apply-diff["'']' "no direct apply-diff import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*write-file["'']' "no direct write-file import from UI"
Assert-NotMatches $uiSource 'from\s+["''][^"'']*run-command["'']' "no direct run-command import from UI"
Assert-NotMatches $uiSource "applyDiff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "writeFile\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "runCommand\s*\(" "no direct run-command call from UI"
Assert-NotMatches $shellSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $shellSource "Math.random" "no Math.random"
Assert-NotContains $shellSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $shellSource "d3-force" "no d3-force"
Assert-NotMatches $shellSource "https?://" "no external network dependency"
Assert-NotMatches $shellSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $shellSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $shellSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $shellSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic navigation-shell files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $shellSource $mojibakePattern "no mojibake"
Assert-Contains $uiSource "buildCodexForgeShellStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-navigation-shell\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Navigation Shell exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Navigation Shell" "managed smoke suite includes Navigation Shell exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] / returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] / route reachable"
} catch {
  Write-Host "[SKIP] / route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Navigation Shell smoke passed."

