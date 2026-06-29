param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1724 Trading Workspace Hub Preview" `
  -ScriptFile "smoke-codexforge-trading-workspace-hub-preview.ps1" `
  -Domain "src\lib\codexforge\trading-workspace-hub-preview" `
  -Route "src\app\trading-workspace-hub-preview" `
  -CommandLabel "Go to Trading Workspace Hub Preview" `
  -RouteHref "/trading-workspace-hub-preview" `
  -Markers @("Trading workspace hub preview", "Trading workspace hub preview groups trading research mandate risk governor strategy lab backtest paper trading and profit lockbox into one user-facing trading workspace", "Trading workspace hub preview requires explicit operator approval", "Trading workspace hub preview hides individual trading phase pages from normal navigation while preserving direct diagnostic access", "Denied trading workspace hub paths remain blocked", "Trading workspace hub checklist")
