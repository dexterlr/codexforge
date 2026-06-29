param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1681 Stop Loss Rule Draft Preview" `
  -ScriptFile "smoke-codexforge-stop-loss-rule-draft-preview.ps1" `
  -Domain "src\lib\codexforge\stop-loss-rule-draft-preview" `
  -Route "src\app\stop-loss-rule-draft-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Stop Loss Rule Draft Preview" `
  -RouteHref "/stop-loss-rule-draft-preview" `
  -Markers @("Stop loss rule draft preview", "Stop loss rule draft preview does not size orders place stops or control broker accounts", "Stop loss rule draft preview requires explicit operator approval", "Stop loss rule draft preview shows stop concept stop distance assumption volatility note invalidation trigger risk impact and backend-owned enforcement boundary", "Denied stop loss rule draft paths remain blocked", "Stop loss rule draft checklist")
