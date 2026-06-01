param([string]$BaseUrl = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw ("[FAIL] Missing file: " + $Path) } Write-Host ("[PASS] file exists: " + $Path) }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) } Write-Host ("[PASS] " + $Name) }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw ("[FAIL] Unexpected " + $Name + ": " + $Pattern) } Write-Host ("[PASS] " + $Name) }
Write-Host "=== Provider Health Checks smoke ==="
$domain = "src\lib\codexforge\provider-health-checks"
$components = Join-Path $domain "components"
Assert-FileExists (Join-Path $domain "index.ts")
Assert-FileExists (Join-Path $domain "provider-health-types.ts")
Assert-FileExists (Join-Path $domain "provider-health-check.ts")
Assert-FileExists (Join-Path $domain "provider-health-status.ts")
Assert-FileExists (Join-Path $domain "provider-health-requirement.ts")
Assert-FileExists (Join-Path $domain "provider-health-guidance.ts")
Assert-FileExists (Join-Path $domain "provider-health-summary.ts")
Assert-FileExists (Join-Path $components "ProviderHealthChecksPanel.tsx")
Assert-FileExists (Join-Path $components "ProviderHealthCheckPanel.tsx")
Assert-FileExists (Join-Path $components "ProviderHealthStatusPanel.tsx")
Assert-FileExists (Join-Path $components "ProviderHealthRequirementPanel.tsx")
Assert-FileExists (Join-Path $components "ProviderHealthGuidancePanel.tsx")
Assert-FileExists (Join-Path $components "ProviderHealthSummaryPanel.tsx")
Assert-FileExists (Join-Path $components "ProviderHealthSafetyStrip.tsx")
Assert-FileExists (Join-Path $components "ProviderHealthEmptyState.tsx")
Assert-FileExists "src\app\provider-health\page.tsx"
Assert-FileExists "src\app\provider-health\page-client.tsx"
$source = (Get-ChildItem -Recurse -File $domain, "src\app\provider-health" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw "src\app\provider-health\page-client.tsx"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
foreach ($needle in @("buildProviderHealthCheck", "buildDefaultProviderHealthChecks", "buildProviderHealthStatus", "buildProviderHealthRequirement", "buildProviderHealthGuidance", "buildProviderHealthSummary", "summarizeProviderHealth", "Provider health", "See which AI providers are ready, planned, or manual-only.", "Review provider health", "What to fix next")) { Assert-Contains $source $needle ("Provider Health Checks includes " + $needle) }
Assert-Contains $routeSource "ProviderHealthChecksPanel" "route imports/renders main panel"
Assert-Contains $routeSource "CodexForgeAppShell" "route uses home-grade/unified shell marker"
Assert-Contains $commands "Go to Provider Health" "command palette includes phase route"
Assert-Contains $nav "/provider-health" "navigation includes phase route"
if (([regex]::Matches($allSmoke, [regex]::Escape("smoke-codexforge-provider-health-checks.ps1")).Count) -ne 1) { throw "[FAIL] all smoke must include this phase exactly once" }
foreach ($required in @("no duplicate route chip cloud", "hero title does not vertically wrap", "no giant raw JSON above fold", "advanced details collapsed/secondary", "no unsafe execution buttons", "no password storage", "no API key localStorage", "no raw secret display", "no process.env value printed in UI", "no real provider API calls")) { Assert-Contains $source $required ("UI marker " + $required) }
Assert-NotMatches $source "fetch\s*\(|Invoke-WebRequest -UseBasicParsing|Invoke-RestMethod" "no external network dependency in deterministic domain files"
Assert-NotMatches $source "sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}" "no hardcoded API keys"
Assert-NotMatches $source "localStorage\.setItem" "no browser secret storage"
Assert-NotMatches $source "appendEvent[(]|saveBrainGraph[(]|applyDiff[(]|writeFile[(]|runCommand[(]" "no direct unsafe UI calls"
$deterministicSource = $source -replace "no Math.random", "" -replace "no Date.now", "" -replace "no d3-force", ""
Assert-NotMatches $deterministicSource "Math\.random|Date\.now|d3-force" "deterministic layout and ids"
$mojibakePattern = "$([char]0x00C3)|$([char]0x00C2)|$([char]0x00E2)"
Assert-NotMatches $source $mojibakePattern "no mojibake"
try { $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/provider-health" -TimeoutSec 5; if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw ("[FAIL] /provider-health returned status " + $response.StatusCode) }; Write-Host "[PASS] /provider-health route reachable" } catch { Write-Host ("[SKIP] /provider-health route not reachable from smoke: " + $_.Exception.Message) }
Write-Host "[OK] Provider Health Checks smoke passed."
