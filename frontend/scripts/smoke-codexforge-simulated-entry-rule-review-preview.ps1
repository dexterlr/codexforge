param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1805 Simulated Entry Rule Review Preview" `
  -ScriptFile "smoke-codexforge-simulated-entry-rule-review-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-entry-rule-review-preview" `
  -Route "src\app\simulated-entry-rule-review-preview" `
  -CommandLabel "Go to Simulated Entry Rule Review Preview" `
  -RouteHref "/simulated-entry-rule-review-preview" `
  -Markers @("Simulated entry rule review preview", "Simulated entry rule review preview does not issue entry signals recommend buys place orders or execute trades from the UI", "Simulated entry rule review preview requires deterministic synthetic entry-rule review only", "Simulated entry rule review preview shows simulated entry context simulated thesis fit simulated timing note simulated missed entry simulated false entry and review-only outcome", "Denied simulated entry rule review paths remain blocked", "Simulated entry rule review checklist")
