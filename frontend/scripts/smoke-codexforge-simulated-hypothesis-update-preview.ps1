param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1810 Simulated Hypothesis Update Preview" `
  -ScriptFile "smoke-codexforge-simulated-hypothesis-update-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-hypothesis-update-preview" `
  -Route "src\app\simulated-hypothesis-update-preview" `
  -CommandLabel "Go to Simulated Hypothesis Update Preview" `
  -RouteHref "/simulated-hypothesis-update-preview" `
  -Markers @("Simulated hypothesis update preview", "Simulated hypothesis update preview does not rewrite strategy rules auto tune hypotheses promote memory or generate live trading instructions from the UI", "Simulated hypothesis update preview requires operator-reviewed synthetic hypothesis notes only", "Simulated hypothesis update preview shows simulated hypothesis kept simulated hypothesis revised simulated hypothesis rejected simulated evidence basis and no auto-promotion", "Denied simulated hypothesis update paths remain blocked", "Simulated hypothesis update checklist")
