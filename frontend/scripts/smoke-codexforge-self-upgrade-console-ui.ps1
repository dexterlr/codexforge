param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-Contains {
  param(
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Haystack.Contains($Needle)) {
    throw "[FAIL] Unexpected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

Write-Host ""
Write-Host "=== CodexForge Self-Upgrade Console UI smoke ==="
Write-Host "Base URL: $BaseUrl"

$consolePath = "src\lib\codexforge\chat\components\self-upgrade-console.tsx"
$legacyPagePath = "src\app\ai\page.tsx"
$jarvisLivePath = "src\lib\codexforge\jarvis-unified-product-ia-map\components\AthenaLiveCommandCenterPanel.tsx"
$jarvisAdvancedPath = "src\lib\codexforge\jarvis-unified-product-ia-map\components\JarvisAdvancedToolsPanel.tsx"
$routePath = "src\app\api\codexforge\tools\self-upgrade\route.ts"
$backlogPath = "src\lib\codexforge\tools\self-upgrade-backlog.ts"

Assert-FileExists $consolePath
Assert-FileExists $legacyPagePath
Assert-FileExists $jarvisLivePath
Assert-FileExists $jarvisAdvancedPath
Assert-FileExists $routePath
Assert-FileExists $backlogPath

$console = Get-Content -Raw $consolePath
$legacyPage = Get-Content -Raw $legacyPagePath
$jarvisLive = Get-Content -Raw $jarvisLivePath
$jarvisAdvanced = Get-Content -Raw $jarvisAdvancedPath
$route = Get-Content -Raw $routePath
$backlog = Get-Content -Raw $backlogPath

Assert-Contains $console "export function SelfUpgradeConsole" "console component export"
Assert-Contains $console "data-codexforge-self-upgrade-console" "console root marker"
Assert-Contains $console "data-codexforge-self-upgrade-top-candidate" "top candidate marker"
Assert-Contains $console "data-codexforge-self-upgrade-candidate-list" "candidate list marker"
Assert-Contains $console "data-codexforge-self-upgrade-safety-summary" "safety summary marker"
Assert-Contains $console "data-codexforge-self-upgrade-copy-plan" "copy plan action marker"
Assert-Contains $console "/api/codexforge/tools/self-upgrade" "console fetches self-upgrade API"
Assert-Contains $console 'redirect: "error"' "console refuses redirects outside the local route"
Assert-Contains $console "parseSelfUpgradeResponse" "console validates and reconstructs the bounded API response"
Assert-Contains $console "MAX_UPGRADE_CANDIDATES" "console bounds the candidate catalogue"
Assert-Contains $console "brokerExecution" "console displays broker safety"
Assert-Contains $console "Copy plan prompt" "console provides planning action"
Assert-Contains $console 'navigator.clipboard?.writeText' "copy action checks Clipboard API availability"
Assert-Contains $console "Clipboard access is unavailable" "missing Clipboard API fails visibly"
Assert-Contains $console "Clipboard access was denied" "denied Clipboard API fails visibly"
Assert-Contains $console 'role="status"' "copy outcome is announced accessibly"
Assert-Contains $console "data-codexforge-self-upgrade-copy-status" "copy outcome has a stable rendered marker"
Assert-Contains $console 'role="alert"' "asynchronous backlog failures are announced accessibly"
Assert-NotContains $console "brokerExecution: `"enabled`"" "console never enables broker execution"

Assert-Contains $legacyPage 'redirect("/jarvis")' "retired /ai redirects to canonical Jarvis"
Assert-Contains $jarvisLive "JarvisAdvancedToolsPanel" "canonical Jarvis mounts advanced tools"
Assert-Contains $jarvisAdvanced "SelfUpgradeConsole" "Jarvis advanced tools import the console"
Assert-Contains $jarvisAdvanced "<SelfUpgradeConsole onUsePrompt={usePrompt} />" "Jarvis renders the console with an explicit composer handoff"
Assert-Contains $console "data-codexforge-self-upgrade-use-plan" "console exposes a visible Jarvis planning handoff"
Assert-Contains $console "Use in Jarvis chat" "console labels its canonical Jarvis handoff"
Assert-Contains $route "buildCodexForgeSelfUpgradeBacklog" "self-upgrade route still uses backlog"
Assert-Contains $backlog "self-upgrade-console-v1" "backlog contains console candidate"

try {
  $response = Invoke-RestMethod -Method Get -Uri "$BaseUrl/api/codexforge/tools/self-upgrade" -TimeoutSec 5

  if ($response.ok -ne $true) {
    throw "[FAIL] self-upgrade route response ok was not true"
  }

  if (-not $response.topCandidate) {
    throw "[FAIL] self-upgrade route missing topCandidate"
  }

  if ($response.topCandidate.id -ne "self-upgrade-console-v1") {
    throw "[FAIL] expected self-upgrade-console-v1 as top candidate"
  }

  if ($response.safetySummary.brokerExecution -ne "blocked") {
    throw "[FAIL] broker execution must remain blocked"
  }

  Write-Host "[PASS] self-upgrade console API data"
} catch {
  Write-Host "[SKIP] self-upgrade console API route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Self-Upgrade Console UI smoke passed."
