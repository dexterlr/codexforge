param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1806 Simulated Exit Rule Review Preview" `
  -ScriptFile "smoke-codexforge-simulated-exit-rule-review-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-exit-rule-review-preview" `
  -Route "src\app\simulated-exit-rule-review-preview" `
  -CommandLabel "Go to Simulated Exit Rule Review Preview" `
  -RouteHref "/simulated-exit-rule-review-preview" `
  -Markers @("Simulated exit rule review preview", "Simulated exit rule review preview does not issue sell signals recommend exits place orders or execute trades from the UI", "Simulated exit rule review preview requires deterministic synthetic exit-rule review only", "Simulated exit rule review preview shows simulated exit context simulated stop logic simulated target logic simulated early exit simulated late exit and review-only outcome", "Denied simulated exit rule review paths remain blocked", "Simulated exit rule review checklist")
