param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1713 Loss Handling Rule Preview" `
  -ScriptFile "smoke-codexforge-loss-handling-rule-preview.ps1" `
  -Domain "src\lib\codexforge\loss-handling-rule-preview" `
  -Route "src\app\loss-handling-rule-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Loss Handling Rule Preview" `
  -RouteHref "/loss-handling-rule-preview" `
  -Markers @("Loss handling rule preview", "Loss handling rule preview does not offset losses with protected profit or guarantee recovery", "Loss handling rule preview requires explicit operator approval", "Loss handling rule preview shows losing trades have no profit to lock losses reduce active capital protected profit stays protected unless explicitly released and no recovery guarantee", "Denied loss handling paths remain blocked", "Loss handling rule checklist")
