param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 929 Free Model Router Trial Result" `
  -ScriptFile "smoke-codexforge-free-model-router-trial-result.ps1" `
  -Domain "src\lib\codexforge\free-model-router-trial-result" `
  -Route "src\app\free-model-router-trial-result" `
  -MainPanel "FreeModelRouterTrialResultPanel" `
  -CommandLabel "Go to Free Model Router Trial Result" `
  -Modules @("free-model-router-trial-result-model.ts", "index.ts") `
  -Components @("FreeModelRouterTrialResultPanel.tsx", "index.ts") `
  -Exports @("buildFreeModelRouterTrialResultStableKey", "buildFreeModelRouterTrialResult", "buildFreeModelRouterTrialResultItems", "buildFreeModelRouterTrialResultBoundary", "buildFreeModelRouterTrialResultModel", "summarizeFreeModelRouterTrialResult", "FREE_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE") `
  -PhaseMarkers @("Free model router trial result", "Free model router trial result does not call free models", "Free model trial results require explicit operator approval", "Free model trial results use shared CodexForge context", "Denied free model trial result paths remain blocked", "Free model trial result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Free model router trial result does not call free models", "Free model trial results require explicit operator approval", "Denied free model trial result paths remain blocked") `
  -RouteHref "/free-model-router-trial-result"

Write-Host "[OK] CodexForge Phase 929 Free model router trial result smoke passed."
