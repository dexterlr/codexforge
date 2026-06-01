param([string]$BaseUrl = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }
Write-Host "=== Local Video Workflow Catalog smoke ==="
$domain = "src\lib\codexforge\local-video-workflow-catalog"; $components = Join-Path $domain "components"; $route = "src\app\video-workflows"
Assert-DirectoryExists $domain; Assert-DirectoryExists $components
foreach ($file in @("local-video-workflow-types.ts","local-video-workflow.ts","local-video-workflow-step.ts","local-video-workflow-requirement.ts","local-video-workflow-risk.ts","local-video-workflow-routing.ts","local-video-workflow-summary.ts","index.ts")) { Assert-FileExists (Join-Path $domain $file) }
foreach ($file in @("LocalVideoWorkflowCatalogPanel.tsx","LocalVideoWorkflowPanel.tsx","LocalVideoWorkflowStepPanel.tsx","LocalVideoWorkflowRequirementPanel.tsx","LocalVideoWorkflowRiskPanel.tsx","LocalVideoWorkflowRoutingPanel.tsx","LocalVideoWorkflowSummaryPanel.tsx","LocalVideoWorkflowSafetyStrip.tsx","LocalVideoWorkflowEmptyState.tsx","index.ts")) { Assert-FileExists (Join-Path $components $file) }
Assert-FileExists "$route\page.tsx"; Assert-FileExists "$route\page-client.tsx"
$source = (Get-ChildItem -Recurse -File $domain, $route | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$index = Get-Content -Raw (Join-Path $domain "index.ts")
$routeSource = Get-Content -Raw "$route\page-client.tsx"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"
foreach ($export in @("buildLocalVideoWorkflow","buildDefaultLocalVideoWorkflows","buildLocalVideoWorkflowStep","buildLocalVideoWorkflowRequirement","buildLocalVideoWorkflowRisk","buildLocalVideoWorkflowRouting","buildLocalVideoWorkflowSummary","summarizeLocalVideoWorkflows")) { Assert-Contains $source $export "expected export $export" }
foreach ($needle in @("Video workflows","Plan local video generation before spending cloud credits.","Choose video workflow","Prompt to keyframe","Keyframe to short video draft","Image to video draft","Low-res video draft","Upscale video","Interpolate frames","Storyboard to shots","Batch render queue","Local draft then cloud final","local drafts","final render","GPU and time cost")) { Assert-Contains $source $needle "plain English/source includes $needle" }
Assert-Contains $routeSource "LocalVideoWorkflowCatalogPanel" "route imports/renders main panel"; Assert-Contains $routeSource "CodexForgeAppShell" "route uses home-grade/unified shell marker"
Assert-Contains $commands "Go to Video Workflows" "command palette includes Go to Video Workflows"; Assert-Contains $nav "/video-workflows" "navigation includes /video-workflows"
if (([regex]::Matches($allSmoke, "smoke-codexforge-local-video-workflow-catalog\.ps1")).Count -ne 1) { throw "[FAIL] managed smoke suite includes phase exactly once" }
foreach ($required in @("plain English","no duplicate route chip cloud","hero title does not vertically wrap","no giant raw JSON above fold","advanced details collapsed/secondary","no unsafe execution buttons","no real video generation","no image generation","no ComfyUI workflow run","no prompt payload sent to providers","no cloud provider API calls","no password storage","no API key localStorage","no raw secret display","no process.env value printed in UI","no direct appendEvent call from UI","no direct saveBrainGraph call from UI","no direct graph mutation from UI","no memory auto-promotion","no direct apply-diff call from UI","no direct write-file call from UI","no direct run-command call from UI","no broker-execution call except blocked-policy text","no Math.random","no Date.now","no d3-force","no mojibake","no obvious duplicate React key patterns")) { Assert-Contains $source $required "UI marker $required" }
$deterministicSource = $source -replace "no Math.random", "" -replace "no Date.now", "" -replace "no d3-force", "" -replace "no broker-execution call except blocked-policy text", ""
$networkPattern = "fetch\s*\(|XMLHttpRequest|axios|Invoke-" + "WebRequest|Invoke-" + "RestMethod"
Assert-NotMatches $deterministicSource $networkPattern "no external network dependency"
Assert-NotMatches $deterministicSource "sk-[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{20,}" "no hardcoded API keys"
Assert-NotMatches $deterministicSource "localStorage\.setItem|password\s*[:=]|process\.env\.[A-Za-z0-9_]+|appendEvent\s*\(|saveBrainGraph\s*\(|applyDiff\s*\(|writeFile\s*\(|runCommand\s*\(|broker-execution\s*\(" "no unsafe storage, execution, graph mutation, raw env print"
Assert-NotMatches $deterministicSource "Math\.random|Date\.now|d3-force" "deterministic ids/layout"
Assert-NotMatches $source "$([char]0x00C3)|$([char]0x00C2)|$([char]0xFFFD)" "no mojibake"
Write-Host "[OK] Local Video Workflow Catalog smoke passed."
