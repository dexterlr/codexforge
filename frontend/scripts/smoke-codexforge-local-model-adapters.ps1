param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host "=== CodexForge Local Model Adapters smoke ==="

$domain = "src\lib\codexforge\provider-adapters"
Assert-FileExists (Join-Path $domain "ollama-local-adapter.ts")
Assert-FileExists (Join-Path $domain "lm-studio-local-adapter.ts")
Assert-FileExists "src\app\provider-adapters\page.tsx"
Assert-FileExists "src\app\provider-adapters\page-client.tsx"
Assert-FileExists (Join-Path $domain "components\ProviderAdaptersPanel.tsx")

$source = (Get-ChildItem -Recurse -File $domain, "src\app\provider-adapters" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

foreach ($needle in @("buildOllamaLocalAdapter", "buildOllamaModelFamilies", "buildOllamaCapabilityProfile", "buildOllamaRoutingHints", "buildOllamaSafetyProfile", "buildLmStudioLocalAdapter", "buildLmStudioModelFamilies", "buildLmStudioCapabilityProfile", "buildLmStudioRoutingHints", "buildLmStudioSafetyProfile", "Ollama", "LM Studio", "local/private", "No live local server call yet", "quality depends on the model you have loaded", "ProviderAdaptersPanel")) {
  Assert-Contains $source $needle "local adapters include $needle"
}
Assert-Contains $commands "Go to Provider Adapters" "command palette includes provider adapters"
Assert-Contains $nav "/provider-adapters" "navigation includes provider adapters"
if (([regex]::Matches($allSmoke, "smoke-codexforge-local-model-adapters\.ps1")).Count -ne 1) { throw "[FAIL] all smoke must include local model adapters exactly once" }

Assert-NotMatches $source "fetch\s*\(" "no fetch call"
Assert-NotMatches $source "(sk|api)[_-]?[A-Za-z0-9]{20,}" "no hardcoded API key"
Assert-NotMatches $source "localStorage\.setItem" "no localStorage secret write"
Assert-NotMatches $source "process\.env" "no process env value printed"
Assert-NotMatches $source "password\s*[:=]" "no password field"
Assert-NotMatches $source "Math\.random|Date\.now" "deterministic adapter definitions"
Assert-NotMatches $source "d3-force" "no d3-force"
$mojibakePattern = "$([char]0x00C3)|$([char]0x00C2)|$([char]0x00E2)"
Assert-NotMatches $source $mojibakePattern "no mojibake"
Assert-NotMatches $source "appendEvent[(]|saveBrainGraph[(]|applyDiff[(]|writeFile[(]|runCommand[(]" "no unsafe execution calls"

Write-Host "[OK] CodexForge Local Model Adapters smoke passed."
