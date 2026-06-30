param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1800 First Paper Trading Review Dashboard Candidate" `
  -ScriptFile "smoke-codexforge-first-paper-trading-review-dashboard-candidate.ps1" `
  -Domain "src\lib\codexforge\first-paper-trading-review-dashboard-candidate" `
  -Route "src\app\first-paper-trading-review-dashboard-candidate" `
  -CommandLabel "Go to First Paper Trading Review Dashboard Candidate" `
  -RouteHref "/first-paper-trading-review-dashboard-candidate" `
  -Markers @("First paper trading review dashboard candidate", "First paper trading review dashboard candidate does not enable real broker workflows live trading order placement paper execution credential storage account reads dashboard persistence or dispatch from the UI", "First paper trading review dashboard candidate requires explicit operator approval", "Candidate combines simulated performance summary trade review queue risk review queue evidence review queue approval review queue metric cards ledger timeline exception queue review note packet operator signoff dashboard export boundary health status cockpit summary and denied paths", "Denied first paper trading review dashboard paths remain blocked", "First paper trading review dashboard checklist")
