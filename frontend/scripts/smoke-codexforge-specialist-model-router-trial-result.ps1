param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 932 Specialist Model Router Trial Result" `
  -ScriptFile "smoke-codexforge-specialist-model-router-trial-result.ps1" `
  -Domain "src\lib\codexforge\specialist-model-router-trial-result" `
  -Route "src\app\specialist-model-router-trial-result" `
  -MainPanel "SpecialistModelRouterTrialResultPanel" `
  -CommandLabel "Go to Specialist Model Router Trial Result" `
  -Modules @("specialist-model-router-trial-result-model.ts", "index.ts") `
  -Components @("SpecialistModelRouterTrialResultPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistModelRouterTrialResultStableKey", "buildSpecialistModelRouterTrialResult", "buildSpecialistModelRouterTrialResultItems", "buildSpecialistModelRouterTrialResultBoundary", "buildSpecialistModelRouterTrialResultModel", "summarizeSpecialistModelRouterTrialResult", "SPECIALIST_MODEL_ROUTER_TRIAL_RESULT_LANGUAGE") `
  -PhaseMarkers @("Specialist model router trial result", "Specialist model router trial result does not call specialist models", "Specialist model trial results require explicit operator approval", "Specialist trial results require domain-fit justification", "Denied specialist model trial result paths remain blocked", "Specialist model trial result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist model router trial result does not call specialist models", "Specialist model trial results require explicit operator approval", "Denied specialist model trial result paths remain blocked") `
  -RouteHref "/specialist-model-router-trial-result"

Write-Host "[OK] CodexForge Phase 932 Specialist model router trial result smoke passed."
