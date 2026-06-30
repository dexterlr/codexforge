param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1804 Simulated Rule Outcome Review Preview" `
  -ScriptFile "smoke-codexforge-simulated-rule-outcome-review-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-rule-outcome-review-preview" `
  -Route "src\app\simulated-rule-outcome-review-preview" `
  -CommandLabel "Go to Simulated Rule Outcome Review Preview" `
  -RouteHref "/simulated-rule-outcome-review-preview" `
  -Markers @("Simulated rule outcome review preview", "Simulated rule outcome review preview does not auto tune rules mutate strategies or approve execution from the UI", "Simulated rule outcome review preview requires deterministic synthetic rule outcome rows only", "Simulated rule outcome review preview shows simulated passed rule simulated failed rule simulated neutral rule simulated exception note and operator review requirement", "Denied simulated rule outcome review paths remain blocked", "Simulated rule outcome review checklist")
