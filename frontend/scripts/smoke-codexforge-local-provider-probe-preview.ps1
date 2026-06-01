param([string]$BaseUrl = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }
Write-Host "=== Local Provider Probe Preview smoke ==="
$domain = "src\lib\codexforge\local-provider-probe-preview"; $components = Join-Path $domain "components"
foreach ($file in @("local-provider-probe-types.ts","local-provider-target.ts","local-provider-probe-plan.ts","local-provider-probe-result.ts","local-provider-probe-safety.ts","local-provider-probe-summary.ts","index.ts")) { Assert-FileExists (Join-Path $domain $file) }
foreach ($file in @("LocalProviderProbePreviewPanel.tsx","LocalProviderTargetPanel.tsx","LocalProviderProbePlanPanel.tsx","LocalProviderProbeResultPanel.tsx","LocalProviderProbeSafetyPanel.tsx","LocalProviderProbeSummaryPanel.tsx","LocalProviderProbeSafetyStrip.tsx","LocalProviderProbeEmptyState.tsx","index.ts")) { Assert-FileExists (Join-Path $components $file) }
Assert-FileExists "src\app\local-provider-probes\page.tsx"; Assert-FileExists "src\app\local-provider-probes\page-client.tsx"
$source = (Get-ChildItem -Recurse -File $domain, "src\app\local-provider-probes" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = Get-Content -Raw "src\app\local-provider-probes\page-client.tsx"; $commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"; $nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"; $allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
foreach ($needle in @("buildLocalProviderTarget","buildDefaultLocalProviderTargets","buildLocalProviderProbePlan","buildLocalProviderProbeResult","buildLocalProviderProbeSafety","buildLocalProviderProbeSummary","summarizeLocalProviderProbePreview","Ollama local server","LM Studio local server","ComfyUI local server","custom local OpenAI-compatible server","check base URL presence","check local-only host","check health endpoint plan","check no prompt payload sent","check no secrets sent","metadata-only result","Local provider probes","Preview safe checks for local AI servers before using them.","Review local probe plan")) { Assert-Contains $source $needle "local probe includes $needle" }
Assert-Contains $routeSource "LocalProviderProbePreviewPanel" "route imports/renders main panel"; Assert-Contains $routeSource "CodexForgeAppShell" "route uses home-grade/unified shell marker"
Assert-Contains $commands "Go to Local Provider Probes" "command palette includes phase route"; Assert-Contains $nav "/local-provider-probes" "navigation includes phase route"
if (([regex]::Matches($allSmoke, "smoke-codexforge-local-provider-probe-preview\.ps1")).Count -ne 1) { throw "[FAIL] managed smoke suite includes phase exactly once" }
foreach ($required in @("no duplicate route chip cloud","hero title does not vertically wrap","no giant raw JSON above fold","advanced details collapsed/secondary","no unsafe execution buttons","no password storage","no API key localStorage","no raw secret display","no process.env value printed in UI","no real provider API calls","no prompt payload sent to providers")) { Assert-Contains $source $required "UI marker $required" }
$networkPattern = "fetch\s*\(|Invoke-" + "WebRequest|Invoke-" + "RestMethod"
Assert-NotMatches $source $networkPattern "no external network dependency in deterministic new domain files"
Assert-NotMatches $source "sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}" "no hardcoded API keys"
Assert-NotMatches $source "localStorage\.setItem|password\s*[:=]|appendEvent[(]|saveBrainGraph[(]|applyDiff[(]|writeFile[(]|runCommand[(]" "no unsafe storage, execution, or graph mutation"
$deterministicSource = $source -replace "no Math.random", "" -replace "no Date.now", "" -replace "no d3-force", ""
Assert-NotMatches $deterministicSource "Math\.random|Date\.now" "no Math.random and no Date.now for deterministic ids/layout"
Assert-NotMatches $deterministicSource "d3-force" "no d3-force"
$mojibakePattern = "$([char]0x00C3)|$([char]0x00C2)|$([char]0x00E2)"
Assert-NotMatches $source $mojibakePattern "no mojibake"
Write-Host "[OK] Local Provider Probe Preview smoke passed."
