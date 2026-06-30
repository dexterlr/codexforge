param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1816 First Strategy Performance Review Loop Candidate" `
  -ScriptFile "smoke-codexforge-first-strategy-performance-review-loop-candidate.ps1" `
  -Domain "src\lib\codexforge\first-strategy-performance-review-loop-candidate" `
  -Route "src\app\first-strategy-performance-review-loop-candidate" `
  -CommandLabel "Go to First Strategy Performance Review Loop Candidate" `
  -RouteHref "/first-strategy-performance-review-loop-candidate" `
  -Markers @("First strategy performance review loop candidate", "First strategy performance review loop candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion live trading order placement evidence persistence or dispatch from the UI", "First strategy performance review loop candidate requires explicit operator approval", "Candidate combines strategy scorecard rule outcome review entry rule review exit rule review risk rule review invalidation review evidence feedback hypothesis update watchlist feedback operator review strategy change request no auto tune boundary cockpit summary and denied paths", "Denied first strategy performance review loop paths remain blocked", "First strategy performance review loop checklist")
