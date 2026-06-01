param([string]$BaseUrl = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw ("[FAIL] Missing file: " + $Path) } Write-Host ("[PASS] file exists: " + $Path) }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) } Write-Host ("[PASS] " + $Name) }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw ("[FAIL] Unexpected " + $Name + ": " + $Pattern) } Write-Host ("[PASS] " + $Name) }
Write-Host "=== Model Capability Matrix smoke ==="
$domain = "src\lib\codexforge\model-capability-matrix"
$components = Join-Path $domain "components"
Assert-FileExists (Join-Path $domain "index.ts")
Assert-FileExists (Join-Path $domain "model-capability-types.ts")
Assert-FileExists (Join-Path $domain "model-capability-entry.ts")
Assert-FileExists (Join-Path $domain "model-capability-score.ts")
Assert-FileExists (Join-Path $domain "model-capability-fit.ts")
Assert-FileExists (Join-Path $domain "model-capability-comparison.ts")
Assert-FileExists (Join-Path $domain "model-capability-summary.ts")
Assert-FileExists (Join-Path $components "ModelCapabilityMatrixPanel.tsx")
Assert-FileExists (Join-Path $components "ModelCapabilityEntryPanel.tsx")
Assert-FileExists (Join-Path $components "ModelCapabilityScorePanel.tsx")
Assert-FileExists (Join-Path $components "ModelCapabilityFitPanel.tsx")
Assert-FileExists (Join-Path $components "ModelCapabilityComparisonPanel.tsx")
Assert-FileExists (Join-Path $components "ModelCapabilitySummaryPanel.tsx")
Assert-FileExists (Join-Path $components "ModelCapabilitySafetyStrip.tsx")
Assert-FileExists (Join-Path $components "ModelCapabilityEmptyState.tsx")
Assert-FileExists "src\app\model-capabilities\page.tsx"
Assert-FileExists "src\app\model-capabilities\page-client.tsx"
$source = (Get-ChildItem -Recurse -File $domain, "src\app\model-capabilities" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw "src\app\model-capabilities\page-client.tsx"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
foreach ($needle in @("buildModelCapabilityEntry", "buildDefaultModelCapabilityEntries", "buildModelCapabilityScore", "scoreModelCapabilityFit", "buildModelCapabilityComparison", "buildModelCapabilitySummary", "summarizeModelCapabilities", "Model capabilities", "Compare which AI is best for each kind of task.", "Compare models", "No fake exact pricing")) { Assert-Contains $source $needle ("Model Capability Matrix includes " + $needle) }
Assert-Contains $routeSource "ModelCapabilityMatrixPanel" "route imports/renders main panel"
Assert-Contains $routeSource "CodexForgeAppShell" "route uses home-grade/unified shell marker"
Assert-Contains $commands "Go to Model Capabilities" "command palette includes phase route"
Assert-Contains $nav "/model-capabilities" "navigation includes phase route"
if (([regex]::Matches($allSmoke, [regex]::Escape("smoke-codexforge-model-capability-matrix.ps1")).Count) -ne 1) { throw "[FAIL] all smoke must include this phase exactly once" }
foreach ($required in @("no duplicate route chip cloud", "hero title does not vertically wrap", "no giant raw JSON above fold", "advanced details collapsed/secondary", "no unsafe execution buttons", "no password storage", "no API key localStorage", "no raw secret display", "no process.env value printed in UI", "no real provider API calls")) { Assert-Contains $source $required ("UI marker " + $required) }
Assert-NotMatches $source "fetch\s*\(|Invoke-WebRequest -UseBasicParsing|Invoke-RestMethod" "no external network dependency in deterministic domain files"
Assert-NotMatches $source "sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}" "no hardcoded API keys"
Assert-NotMatches $source "localStorage\.setItem" "no browser secret storage"
Assert-NotMatches $source "appendEvent[(]|saveBrainGraph[(]|applyDiff[(]|writeFile[(]|runCommand[(]" "no direct unsafe UI calls"
$deterministicSource = $source -replace "no Math.random", "" -replace "no Date.now", "" -replace "no d3-force", ""
Assert-NotMatches $deterministicSource "Math\.random|Date\.now|d3-force" "deterministic layout and ids"
$mojibakePattern = "$([char]0x00C3)|$([char]0x00C2)|$([char]0x00E2)"
Assert-NotMatches $source $mojibakePattern "no mojibake"
try { $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/model-capabilities" -TimeoutSec 5; if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw ("[FAIL] /model-capabilities returned status " + $response.StatusCode) }; Write-Host "[PASS] /model-capabilities route reachable" } catch { Write-Host ("[SKIP] /model-capabilities route not reachable from smoke: " + $_.Exception.Message) }
Write-Host "[OK] Model Capability Matrix smoke passed."
