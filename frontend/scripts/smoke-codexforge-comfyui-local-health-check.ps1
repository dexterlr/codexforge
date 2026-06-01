param([string]$BaseUrl = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }
Write-Host "=== ComfyUI Local Health Check smoke ==="
$domain = "src\lib\codexforge\comfyui-local-health-check"; $components = Join-Path $domain "components"; $route = "src\app\comfyui-health"
Assert-DirectoryExists $domain; Assert-DirectoryExists $components
foreach ($file in @("comfyui-health-types.ts","comfyui-health-target.ts","comfyui-health-plan.ts","comfyui-health-safety.ts","comfyui-health-result.ts","comfyui-health-summary.ts","index.ts")) { Assert-FileExists (Join-Path $domain $file) }
foreach ($file in @("ComfyUiLocalHealthPanel.tsx","ComfyUiHealthTargetPanel.tsx","ComfyUiHealthPlanPanel.tsx","ComfyUiHealthSafetyPanel.tsx","ComfyUiHealthResultPanel.tsx","ComfyUiHealthSummaryPanel.tsx","ComfyUiHealthSafetyStrip.tsx","ComfyUiHealthEmptyState.tsx","index.ts")) { Assert-FileExists (Join-Path $components $file) }
Assert-FileExists "$route\page.tsx"; Assert-FileExists "$route\page-client.tsx"
$source = (Get-ChildItem -Recurse -File $domain, $route | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$index = Get-Content -Raw (Join-Path $domain "index.ts")
$routeSource = Get-Content -Raw "$route\page-client.tsx"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
foreach ($export in @("buildComfyUiHealthTarget","buildDefaultComfyUiHealthTarget","buildComfyUiHealthPlan","buildComfyUiHealthSafety","buildComfyUiHealthResult","buildComfyUiHealthSummary","summarizeComfyUiHealth")) { Assert-Contains $source $export "expected export $export" }
foreach ($needle in @("ComfyUI health","Check whether your local ComfyUI setup is ready without running a workflow.","Review ComfyUI check","http://127.0.0.1:8188","local-only","metadata-only","future approved live check","no workflow run","no prompt is sent","no cloud credits spent")) { Assert-Contains $source $needle "plain English/source includes $needle" }
Assert-Contains $routeSource "ComfyUiLocalHealthPanel" "route imports/renders main panel"; Assert-Contains $routeSource "CodexForgeAppShell" "route uses home-grade/unified shell marker"
Assert-Contains $commands "Go to ComfyUI Health" "command palette includes Go to ComfyUI Health"; Assert-Contains $nav "/comfyui-health" "navigation includes /comfyui-health"
if (([regex]::Matches($allSmoke, "smoke-codexforge-comfyui-local-health-check\.ps1")).Count -ne 1) { throw "[FAIL] managed smoke suite includes phase exactly once" }
foreach ($required in @("plain English","no duplicate route chip cloud","hero title does not vertically wrap","no giant raw JSON above fold","advanced details collapsed/secondary","no unsafe execution buttons","no real video generation","no image generation","no ComfyUI workflow run","no prompt payload sent to providers","no cloud provider API calls","no password storage","no API key localStorage","no raw secret display","no process.env value printed in UI","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no direct apply-diff call from UI","no direct write-file call from UI","no direct run-command call from UI","no broker-execution call except blocked-policy text","no Math.random","no Date.now","no d3-force","no mojibake","no obvious duplicate React key patterns")) { Assert-Contains $source $required "UI marker $required" }
$deterministicSource = $source -replace "no Math.random", "" -replace "no Date.now", "" -replace "no d3-force", "" -replace "no broker-execution call except blocked-policy text", ""
$networkPattern = "fetch\s*\(|XMLHttpRequest|axios|Invoke-" + "WebRequest|Invoke-" + "RestMethod"
Assert-NotMatches $deterministicSource $networkPattern "no external network dependency"
Assert-NotMatches $deterministicSource "sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}" "no hardcoded API keys"
Assert-NotMatches $deterministicSource "localStorage\.setItem|password\s*[:=]|process\.env\.[A-Za-z0-9_]+|appendEvent\s*\(|saveBrainGraph\s*\(|applyDiff\s*\(|writeFile\s*\(|runCommand\s*\(|broker-execution\s*\(" "no unsafe storage, execution, graph mutation, raw env print"
Assert-NotMatches $deterministicSource "Math\.random|Date\.now|d3-force" "deterministic ids/layout"
Assert-NotMatches $source "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)" "no mojibake"
Write-Host "[OK] ComfyUI Local Health Check smoke passed."
