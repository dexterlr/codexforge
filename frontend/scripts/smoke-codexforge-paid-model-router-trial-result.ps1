param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 930 Paid Model Router Trial Result" `
  -ScriptFile "smoke-codexforge-paid-model-router-trial-result.ps1" `
  -Domain "src\lib\codexforge\paid-model-router-trial-result" `
  -Route "src\app\paid-model-router-trial-result" `
  -MainPanel "PaidModelRouterTrialResultPanel" `
  -CommandLabel "Go to Paid Model Router Trial Result" `
  -Modules @("paid-model-router-trial-result-model.ts", "index.ts") `
  -Components @("PaidModelRouterTrialResultPanel.tsx", "index.ts") `
  -Exports @("buildPaidModelRouterTrialResultStableKey", "buildPaidModelRouterTrialResult", "buildPaidModelRouterTrialResultItems", "buildPaidModelRouterTrialResultBoundary", "buildPaidModelRouterTrialResultModel", "summarizePaidModelRouterTrialResult", "PAID_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE") `
  -PhaseMarkers @("Paid model router trial result", "Paid model router trial result does not call paid models", "Paid model trial results require explicit operator approval", "Paid model trial results require spend approval", "Denied paid model trial result paths remain blocked", "Paid model trial result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Paid model router trial result does not call paid models", "Paid model trial results require explicit operator approval", "Denied paid model trial result paths remain blocked") `
  -RouteHref "/paid-model-router-trial-result"

Write-Host "[OK] CodexForge Phase 930 Paid model router trial result smoke passed."
