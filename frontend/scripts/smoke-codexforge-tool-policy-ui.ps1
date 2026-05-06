param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$panelPath = Join-Path $root "src\lib\codexforge\chat\components\tool-policy-decision-panel.tsx"
$structuredPath = Join-Path $root "src\lib\codexforge\chat\components\structured-reply-block.tsx"

function Assert-FileExists {
  param([string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Expected file missing: $Path"
  }
}

function Assert-Contains {
  param(
    [string]$Name,
    [string]$Content,
    [string]$Needle
  )

  if ($Content -notlike "*$Needle*") {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }
}

Write-Host ""
Write-Host "=== CodexForge tool-policy UI smoke ==="
Write-Host "Base URL: $BaseUrl"

Assert-FileExists -Path $panelPath
Assert-FileExists -Path $structuredPath

$panel = Get-Content $panelPath -Raw
$structured = Get-Content $structuredPath -Raw

Assert-Contains -Name "panel export" -Content $panel -Needle "export function ToolPolicyDecisionPanel"
Assert-Contains -Name "panel summary prop" -Content $panel -Needle "summary?: CodexForgeVisibleToolPolicy |"
Assert-Contains -Name "panel summary type" -Content $panel -Needle "CodexForgeVisibleToolPolicy"
Assert-Contains -Name "panel root marker" -Content $panel -Needle "data-codexforge-tool-policy-panel"
Assert-Contains -Name "panel tone marker" -Content $panel -Needle "data-codexforge-tool-policy-tone"

Assert-Contains -Name "structured panel import" -Content $structured -Needle "ToolPolicyDecisionPanel"
Assert-Contains -Name "structured summary helper" -Content $structured -Needle "getStructuredToolPolicySummary"
Assert-Contains -Name "structured panel render" -Content $structured -Needle "<ToolPolicyDecisionPanel summary={getStructuredToolPolicySummary(structured)} />"

Write-Host "[OK] CodexForge tool-policy UI smoke passed."
