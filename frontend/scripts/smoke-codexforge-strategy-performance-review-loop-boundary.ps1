param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1802 Strategy Performance Review Loop Boundary" `
  -ScriptFile "smoke-codexforge-strategy-performance-review-loop-boundary.ps1" `
  -Domain "src\lib\codexforge\strategy-performance-review-loop-boundary" `
  -Route "src\app\strategy-performance-review-loop-boundary" `
  -CommandLabel "Go to Strategy Performance Review Loop Boundary" `
  -RouteHref "/strategy-performance-review-loop-boundary" `
  -Markers @("Strategy performance review loop boundary", "Strategy performance review loop boundary does not provide financial advice personalised recommendations buy sell instructions auto tune strategies promote strategies place orders dispatch orders execute trades fetch live market data or calculate real P&L from the UI", "Strategy performance review loop boundary requires explicit operator approval", "Strategy performance review loop boundary prepares deterministic synthetic strategy feedback workflows without frontend execution auto tuning or promotion", "Denied strategy performance review paths remain blocked", "Strategy performance review loop boundary checklist")
