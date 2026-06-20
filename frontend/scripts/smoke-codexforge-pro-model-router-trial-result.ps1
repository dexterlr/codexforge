param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 931 Pro Model Router Trial Result" `
  -ScriptFile "smoke-codexforge-pro-model-router-trial-result.ps1" `
  -Domain "src\lib\codexforge\pro-model-router-trial-result" `
  -Route "src\app\pro-model-router-trial-result" `
  -MainPanel "ProModelRouterTrialResultPanel" `
  -CommandLabel "Go to Pro Model Router Trial Result" `
  -Modules @("pro-model-router-trial-result-model.ts", "index.ts") `
  -Components @("ProModelRouterTrialResultPanel.tsx", "index.ts") `
  -Exports @("buildProModelRouterTrialResultStableKey", "buildProModelRouterTrialResult", "buildProModelRouterTrialResultItems", "buildProModelRouterTrialResultBoundary", "buildProModelRouterTrialResultModel", "summarizeProModelRouterTrialResult", "PRO_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE") `
  -PhaseMarkers @("Pro model router trial result", "Pro model router trial result does not call pro models", "Pro model trial results require explicit operator approval", "Pro model trial results require quality justification", "Denied pro model trial result paths remain blocked", "Pro model trial result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Pro model router trial result does not call pro models", "Pro model trial results require explicit operator approval", "Denied pro model trial result paths remain blocked") `
  -RouteHref "/pro-model-router-trial-result"

Write-Host "[OK] CodexForge Phase 931 Pro model router trial result smoke passed."
