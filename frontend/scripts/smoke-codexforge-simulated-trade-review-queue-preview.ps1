param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1788 Simulated Trade Review Queue Preview" `
  -ScriptFile "smoke-codexforge-simulated-trade-review-queue-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-trade-review-queue-preview" `
  -Route "src\app\simulated-trade-review-queue-preview" `
  -CommandLabel "Go to Simulated Trade Review Queue Preview" `
  -RouteHref "/simulated-trade-review-queue-preview" `
  -Markers @("Simulated trade review queue preview", "Simulated trade review queue preview does not execute trades route orders mutate ledgers or persist review state from the UI", "Simulated trade review queue preview requires deterministic synthetic trade review rows only", "Simulated trade review queue preview shows simulated fill review simulated rejection review simulated cancel review simulated position update review and operator review note", "Denied simulated trade review queue paths remain blocked", "Simulated trade review queue checklist")
