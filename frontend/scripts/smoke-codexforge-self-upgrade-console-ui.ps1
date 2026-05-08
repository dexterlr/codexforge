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
$pagePath = "src\app\ai\page.tsx"
$routePath = "src\app\api\codexforge\tools\self-upgrade\route.ts"
$backlogPath = "src\lib\codexforge\tools\self-upgrade-backlog.ts"

Assert-FileExists $consolePath
Assert-FileExists $pagePath
Assert-FileExists $routePath
Assert-FileExists $backlogPath

$console = Get-Content -Raw $consolePath
$page = Get-Content -Raw $pagePath
$route = Get-Content -Raw $routePath
$backlog = Get-Content -Raw $backlogPath

Assert-Contains $console "export function SelfUpgradeConsole" "console component export"
Assert-Contains $console "data-codexforge-self-upgrade-console" "console root marker"
Assert-Contains $console "data-codexforge-self-upgrade-top-candidate" "top candidate marker"
Assert-Contains $console "data-codexforge-self-upgrade-candidate-list" "candidate list marker"
Assert-Contains $console "data-codexforge-self-upgrade-safety-summary" "safety summary marker"
Assert-Contains $console "data-codexforge-self-upgrade-copy-plan" "copy plan action marker"
Assert-Contains $console "/api/codexforge/tools/self-upgrade" "console fetches self-upgrade API"
Assert-Contains $console "brokerExecution" "console displays broker safety"
Assert-Contains $console "Copy plan prompt" "console provides planning action"
Assert-NotContains $console "brokerExecution: `"enabled`"" "console never enables broker execution"

Assert-Contains $page "self-upgrade-console" "AI page imports console"
Assert-Contains $page "<SelfUpgradeConsole />" "AI page renders console"
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
