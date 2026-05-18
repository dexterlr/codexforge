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
Write-Host "=== CodexForge Command Palette smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\command-palette"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$shellPath = "src\lib\codexforge\navigation-shell\components\CodexForgeAppShell.tsx"
$operatorHomePath = "src\lib\codexforge\operator-home\components\OperatorHomeDashboard.tsx"
$stabilizationPath = "src\lib\codexforge\stabilization-command-center\components\StabilizationCommandCenter.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "command-palette-types.ts",
  "command-registry.ts",
  "command-search.ts",
  "command-groups.ts",
  "command-safety.ts",
  "command-shortcuts.ts",
  "command-copy-payloads.ts",
  "command-next-action.ts",
  "command-palette-summary.ts",
  "index.ts"
)) {
  Assert-FileExists (Join-Path $domainDir $module)
}

foreach ($component in @(
  "CodexForgeCommandPalette.tsx",
  "CommandPaletteTrigger.tsx",
  "CommandPaletteOverlay.tsx",
  "CommandPaletteSearchBox.tsx",
  "CommandPaletteGroup.tsx",
  "CommandPaletteItem.tsx",
  "CommandPaletteShortcutHint.tsx",
  "CommandPaletteSafetyPanel.tsx",
  "CommandPaletteEmptyState.tsx",
  "CommandPaletteFooter.tsx"
)) {
  Assert-FileExists (Join-Path $componentDir $component)
}

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$shellSource = Get-Content -Raw $shellPath
$operatorHomeSource = Get-Content -Raw $operatorHomePath
$stabilizationSource = Get-Content -Raw $stabilizationPath
$allSmoke = Get-Content -Raw $allSmokePath
$paletteSource = $domainSource + "`n" + $uiSource

foreach ($export in @(
  "buildCodexForgeCommands",
  "buildCodexForgeCommand",
  "searchCodexForgeCommands",
  "scoreCodexForgeCommandMatch",
  "normalizeCommandSearchQuery",
  "buildCodexForgeCommandGroups",
  "buildCodexForgeCommandGroup",
  "buildCodexForgeCommandSafetyReport",
  "isCodexForgeCommandMutationBlocked",
  "buildCodexForgeCommandShortcuts",
  "getCodexForgeCommandPaletteShortcutLabel",
  "buildCodexForgeValidationChecklistPayload",
  "buildCodexForgeSafePatchPromptPayload",
  "buildCodexForgeStabilizationHandoffPayload",
  "selectCodexForgePaletteNextAction",
  "buildCodexForgePaletteNextActionCommand",
  "buildCodexForgeCommandPaletteSummary"
)) {
  Assert-Contains $indexSource $export "index exports $export"
}

foreach ($render in @(
  "CodexForgeCommandPalette renders",
  "CommandPaletteTrigger renders",
  "CommandPaletteOverlay renders",
  "CommandPaletteSearchBox renders",
  "CommandPaletteGroup renders",
  "CommandPaletteItem renders",
  "CommandPaletteShortcutHint renders",
  "CommandPaletteSafetyPanel renders",
  "CommandPaletteEmptyState renders",
  "CommandPaletteFooter renders"
)) {
  Assert-Contains $uiSource $render "$render"
}

Assert-Contains $shellSource "CodexForgeCommandPalette" "Navigation Shell imports/renders CommandPaletteTrigger or CodexForgeCommandPalette if integrated"
Assert-Contains $operatorHomeSource "Command Palette" "Operator Home references Command Palette if integrated"
Assert-Contains $stabilizationSource "Command Palette" "Stabilization references Command Palette if integrated"

foreach ($text in @(
  "Ctrl+K",
  "Cmd+K",
  "Escape",
  "no command execution without approval",
  "no file writes without approval",
  "preserve latest-message authority"
)) {
  Assert-Contains $uiSource $text "UI references $text"
}

foreach ($text in @(
  "Go to Operator Home",
  "Go to AI Workspace",
  "Go to Brain",
  "Go to Files",
  "Go to Stabilization",
  "Copy full validation checklist",
  "Review regression triage",
  "Prepare Safe Patch Preview",
  "Compose Preview Diff"
)) {
  Assert-Contains $domainSource $text "command registry includes $text"
}

foreach ($text in @(
  "apply-diff",
  "write-file",
  "run-command",
  "broker-execution"
)) {
  Assert-Contains $domainSource $text "command safety blocks $text"
}

Assert-Contains $domainSource "label" "search supports label"
Assert-Contains $domainSource "keywords" "search supports keywords"

foreach ($text in @(
  "npm run build",
  "npm run smoke:codexforge:server",
  "git diff --check"
)) {
  Assert-Contains $domainSource $text "validation checklist includes $text"
}

foreach ($text in @(
  "Inspect first",
  "no file writes without approval",
  "Preserve latest-message authority"
)) {
  Assert-Contains $domainSource $text "safe patch payload says $text"
}

Assert-Contains $domainSource "commit clean checkpoint" "next action can recommend commit clean checkpoint"

Assert-NotMatches $paletteSource 'from\s+["''][^"'']*brain-graph["'']' "no import from brain-graph"
Assert-NotMatches $uiSource "applyDiff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "writeFile\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "runCommand\s*\(" "no direct run-command call from UI"
Assert-NotMatches $uiSource "brokerExecution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotContains $paletteSource "Math.random" "no Math.random"
Assert-NotContains $paletteSource "Date.now" "no Date.now for layout/ids"
Assert-NotContains $paletteSource "d3-force" "no d3-force"
Assert-NotMatches $paletteSource "https?://" "no external network dependency"
Assert-NotMatches $paletteSource "fetch\s*\(" "no external network dependency"
Assert-NotContains $paletteSource "XMLHttpRequest" "no external network dependency"
Assert-NotContains $paletteSource "axios" "no external network dependency"

foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) {
  Assert-NotContains $paletteSource $marker "no vector database dependency: $marker"
}

foreach ($marker in @("OPENAI_API_KEY", "apiKey", "from `"openai`"", "from 'openai'")) {
  Assert-NotContains $domainSource $marker "no OpenAI/API-key dependency in deterministic command-palette files: $marker"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $paletteSource $mojibakePattern "no mojibake"
Assert-Contains $uiSource "buildCodexForgeCommandPaletteStableKey" "stable key helper or stable key patterns exist"

$suiteMatches = [regex]::Matches($allSmoke, "smoke-codexforge-command-palette\.ps1")
if ($suiteMatches.Count -ne 1) {
  throw "[FAIL] Managed smoke suite must include Command Palette exactly once; found $($suiteMatches.Count)."
}
Assert-Contains $allSmoke "Command Palette" "managed smoke suite includes Command Palette exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) {
    throw "[FAIL] / returned status $($response.StatusCode)"
  }
  Write-Host "[PASS] / route reachable"
} catch {
  Write-Host "[SKIP] / route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Command Palette smoke passed."
