param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1815 Cockpit Strategy Performance Review Summary" `
  -ScriptFile "smoke-codexforge-cockpit-strategy-performance-review-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-strategy-performance-review-summary" `
  -Route "src\app\cockpit-strategy-performance-review-summary" `
  -CommandLabel "Go to Cockpit Strategy Performance Review Summary" `
  -RouteHref "/cockpit-strategy-performance-review-summary" `
  -Markers @("Cockpit strategy performance review summary", "Cockpit strategy performance review summary keeps the cockpit as the normal user surface", "Cockpit strategy performance review summary does not provide financial advice personalise recommendations issue buy sell instructions auto tune strategies promote strategies place orders dispatch orders execute trades fetch live market data calculate real P&L persist evidence or write files from the cockpit", "Cockpit strategy performance review summary shows strategy scorecard rule outcome review entry rule review exit rule review risk rule review invalidation review evidence feedback hypothesis update watchlist feedback operator decision strategy change request no auto tune boundary and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit strategy performance review checklist")
