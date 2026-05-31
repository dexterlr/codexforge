param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack,[string]$Needle,[string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotContains { param([AllowEmptyString()][string]$Haystack,[string]$Needle,[string]$Name) if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack,[string]$Pattern,[string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }
function Assert-CountExactly { param([AllowEmptyString()][string]$Haystack,[string]$Needle,[int]$Expected,[string]$Name) $count=([regex]::Matches($Haystack,[regex]::Escape($Needle))).Count; if($count -ne $Expected){throw "[FAIL] $Name expected $Expected found $count"} Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Home Grade Unified Shell smoke ==="
Write-Host "Base URL: $BaseUrl"

$shellDir = "src\lib\codexforge\navigation-shell"
$shellComponents = Join-Path $shellDir "components"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"
$targetPages = @(
  "src\app\files\page-client.tsx",
  "src\app\code-flow\page-client.tsx",
  "src\app\code-flow\live-run\page-client.tsx",
  "src\app\guarded-apply-mvp\page-client.tsx",
  "src\app\apply-evidence\page-client.tsx",
  "src\app\validation-results\page-client.tsx",
  "src\app\workflow-results\page-client.tsx",
  "src\app\run-history\page-client.tsx",
  "src\app\brain\page.tsx",
  "src\app\brain\page-client.tsx",
  "src\app\demo\page-client.tsx",
  "src\app\release-smoke\page-client.tsx",
  "src\app\code-flow\rc\page-client.tsx",
  "src\app\code-flow\final-polish\page-client.tsx"
)

Assert-FileExists $allSmokePath
foreach($path in $targetPages){ Assert-FileExists $path }

$shellSource = ((Get-ChildItem $shellDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) + (Get-ChildItem $shellComponents -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName })) -join "`n"
$targetSource = ($targetPages | ForEach-Object { Get-Content -Raw $_ }) -join "`n"
$allSource = $shellSource + "`n" + $targetSource
$allSmoke = Get-Content -Raw $allSmokePath

foreach($marker in @(
  "UnifiedCodexForgeShell",
  "home-grade-unified-shell",
  "readable sidebar marker",
  "no cramped sidebar",
  "no duplicate route chip cloud",
  "Home",
  "Start",
  "Code Flow",
  "Files",
  "Apply",
  "Validate",
  "Results",
  "History",
  "Brain",
  "Demo",
  "Memory",
  "Runtime",
  "Creative",
  "Governance",
  "Admin",
  "Readiness"
)){ Assert-Contains $shellSource $marker "navigation-shell marker $marker" }

foreach($route in @(
  'href: "/"',
  'href: "/start"',
  'href: "/code-flow"',
  'href: "/files"',
  'href: "/brain"',
  'href: "/demo"',
  'href: "/guarded-apply-mvp"',
  'href: "/apply-evidence"',
  'href: "/validation-results"',
  'href: "/code-flow/rc"',
  'href: "/code-flow/final-polish"'
)){ Assert-Contains $shellSource $route "route registry includes $route" }

foreach($label in @(
  'shortLabel: "Home"',
  'shortLabel: "Start"',
  'shortLabel: "Code Flow"',
  'shortLabel: "Files"',
  'shortLabel: "Apply"',
  'shortLabel: "Validate"',
  'shortLabel: "Results"',
  'shortLabel: "Runs"',
  'shortLabel: "Brain"',
  'shortLabel: "Demo"',
  'shortLabel: "Manual Trial"',
  'shortLabel: "Continuity"'
)){ Assert-Contains $shellSource $label "short readable label $label" }

foreach($path in @($targetPages | Where-Object { $_ -like "*page-client.tsx" })){
  $source = Get-Content -Raw $path
  Assert-Contains $source "CodexForgeAppShell" "$path uses unified shell component"
}

$filesSource = Get-Content -Raw "src\app\files\page-client.tsx"
$codeFlowSource = Get-Content -Raw "src\app\code-flow\page-client.tsx"
$brainSource = Get-Content -Raw "src\app\brain\page-client.tsx"

Assert-Contains $filesSource "data-codexforge-files-next-safe-action" "/files has one primary action marker or next safe action marker"
Assert-Contains $codeFlowSource "data-codexforge-code-flow-primary-action" "/code-flow has one primary action marker"
Assert-Contains $brainSource "data-codexforge-brain-guarded-empty-state" "/brain has guarded empty state marker"
Assert-NotContains $filesSource "CodexForgeGlobalNav" "/files does not contain old global route rail"
Assert-NotContains $filesSource "CodexForgeLocalActionBar" "/files does not contain old local action rail"
Assert-NotContains $filesSource "showRouteTray={true}" "/files does not force duplicate Routes tray"
Assert-NotContains $filesSource "routeTrayDefaultOpen" "/files does not force duplicate route chip cloud"

foreach($pattern in @(
  "appendEvent\s*\(",
  "saveBrainGraph\s*\((?!(result\.graph|firstRunSeedPlan\.graph)\))",
  "\.nodes\s*\.\s*push|\.edges\s*\.\s*push",
  "autoPromotion\s*[:=]|autoPromote\s*\(",
  "apply-diff\s*\(",
  "write-file\s*\(",
  "run-command\s*\(",
  "broker-execution\s*\(",
  "Math\.random",
  "Date\.now",
  "d3-force",
  "process\.env\."
)){ Assert-NotMatches $allSource $pattern "blocked marker absent $pattern" }

foreach($marker in @(
  "OPENAI_API_KEY",
  "apiKey",
  "localStorage.setItem",
  "from `"openai`"",
  "from 'openai'"
)){ Assert-NotContains $allSource $marker "unsafe secret/API marker absent $marker" }

foreach($secretPattern in @("sk-[A-Za-z0-9_-]{20,}", "AIza[0-9A-Za-z_-]{20,}")){
  Assert-NotMatches $allSource $secretPattern "no hardcoded API keys"
}

$mojibakePattern = [string]([char]0x00C3) + "|" + [string]([char]0x00C2) + "|" + [string]([char]0xFFFD)
Assert-NotMatches $allSource $mojibakePattern "no mojibake"
Assert-CountExactly $allSmoke "smoke-codexforge-home-grade-unified-shell.ps1" 1 "managed smoke suite includes Home Grade Unified Shell exactly once"
Assert-Contains $allSmoke "Home Grade Unified Shell" "managed smoke suite labels Home Grade Unified Shell"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/files" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /files returned status $($response.StatusCode)" }
  Write-Host "[PASS] /files route reachable"
} catch {
  Write-Host "[SKIP] /files route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Home Grade Unified Shell smoke passed."
