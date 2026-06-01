param(
  [Parameter(Mandatory = $true)][string]$PhaseName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$MainPanel,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string[]]$Modules,
  [Parameter(Mandatory = $true)][string[]]$Components,
  [Parameter(Mandatory = $true)][string[]]$Exports,
  [Parameter(Mandatory = $true)][string[]]$PlainEnglish,
  [string[]]$ExtraRoutes = @()
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-DirectoryExists {
  param([string]$Path)
  if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" }
  Write-Host "[PASS] directory exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

Write-Host "=== $PhaseName smoke ==="

$componentsDir = Join-Path $Domain "components"
Assert-DirectoryExists $Domain
Assert-DirectoryExists $componentsDir

foreach ($file in $Modules) { Assert-FileExists (Join-Path $Domain $file) }
foreach ($file in $Components) { Assert-FileExists (Join-Path $componentsDir $file) }
Assert-FileExists "$Route\page.tsx"
Assert-FileExists "$Route\page-client.tsx"

$domainFiles = @(Get-ChildItem -Recurse -File $Domain)
$routeFiles = @(Get-ChildItem -Recurse -File $Route)
$source = (($domainFiles + $routeFiles) | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$sharedUi = Get-Content -Raw "src\lib\codexforge\video-foundation-ui.tsx"
$sourceWithShared = $source + "`n" + $sharedUi
$routeSource = Get-Content -Raw "$Route\page-client.tsx"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

foreach ($export in $Exports) { Assert-Contains $source $export "expected export $export" }
foreach ($needle in $PlainEnglish) { Assert-Contains $source $needle "plain English/source includes $needle" }

Assert-Contains $routeSource $MainPanel "route imports/renders main panel"
Assert-Contains $routeSource "CodexForgeAppShell" "route uses home-grade/unified shell marker"
Assert-Contains $routeSource "showHeroRouteChips={false}" "no duplicate route chip cloud"
Assert-Contains $commands $CommandLabel "command palette includes $CommandLabel"
Assert-Contains $nav ($Route -replace "^src\\app", "" -replace "\\", "/") "navigation includes route"
foreach ($extraRoute in $ExtraRoutes) { Assert-Contains $source $extraRoute "integration link $extraRoute" }

foreach ($required in @(
  "plain English",
  "no duplicate route chip cloud",
  "hero title does not vertically wrap",
  "no giant raw JSON above fold",
  "advanced details collapsed/secondary",
  "no unsafe execution buttons",
  "no real video generation",
  "no image generation",
  "no ComfyUI workflow run",
  "no prompt payload sent to providers",
  "no cloud provider API calls",
  "no password storage",
  "no API key localStorage",
  "no raw secret display",
  "no process.env value printed in UI",
  "no hardcoded API keys",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct graph mutation from UI",
  "no memory auto-promotion",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no broker-execution call except blocked-policy text",
  "no Math.random",
  "no Date.now",
  "no d3-force",
  "no mojibake",
  "no obvious duplicate React key patterns"
)) { Assert-Contains $source $required "UI marker $required" }

Assert-Contains $sourceWithShared "whiteSpace: `"nowrap`"" "hero title does not vertically wrap"
Assert-Contains $sourceWithShared "PreviewFoundationDetail" "advanced details collapsed/secondary"
Assert-NotMatches $source "<button" "no unsafe execution buttons"

$deterministicSource = $sourceWithShared
foreach ($marker in @(
  "no Math.random",
  "no Date.now",
  "no d3-force",
  "no broker-execution call except blocked-policy text",
  "no direct appendEvent call from UI",
  "no direct saveBrainGraph call from UI",
  "no direct graph mutation from UI",
  "no memory auto-promotion",
  "no direct apply-diff call from UI",
  "no direct write-file call from UI",
  "no direct run-command call from UI",
  "no password storage",
  "no API key localStorage",
  "no raw secret display",
  "no process.env value printed in UI",
  "no hardcoded API keys"
)) { $deterministicSource = $deterministicSource.Replace($marker, "") }

$networkPattern = "fetch\s*\(|XMLHttpRequest|axios|Invoke-" + "WebRequest|Invoke-" + "RestMethod"
Assert-NotMatches $deterministicSource $networkPattern "no cloud provider API calls or external network dependency"
Assert-NotMatches $deterministicSource "sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}" "no hardcoded API keys"
Assert-NotMatches $deterministicSource "localStorage\.setItem|password\s*[:=]|process\.env\.[A-Za-z0-9_]+|appendEvent\s*\(|saveBrainGraph\s*\(|applyDiff\s*\(|writeFile\s*\(|runCommand\s*\(|broker-execution\s*\(" "no unsafe storage, execution, graph mutation, or raw env print"
Assert-NotMatches $deterministicSource "Math\.random|Date\.now|d3-force" "deterministic ids/layout"
Assert-NotMatches $sourceWithShared "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)" "no mojibake"
Assert-NotMatches $sourceWithShared "key=\{index\}|key=\{i\}" "no obvious duplicate React key patterns"

if (([regex]::Matches($allSmoke, [regex]::Escape($ScriptFile))).Count -ne 1) { throw "[FAIL] managed smoke suite includes script exactly once: $ScriptFile" }
if (([regex]::Matches($allSmoke, [regex]::Escape($PhaseName))).Count -ne 1) { throw "[FAIL] managed smoke suite includes phase exactly once: $PhaseName" }
Write-Host "[PASS] managed smoke suite includes phase exactly once"
Write-Host "[OK] $PhaseName smoke passed."
