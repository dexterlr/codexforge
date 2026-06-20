param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 914 Model Router Trial Cockpit" `
  -ScriptFile "smoke-codexforge-model-router-trial-cockpit.ps1" `
  -Domain "src\lib\codexforge\model-router-trial-cockpit" `
  -Route "src\app\model-router-trial-cockpit" `
  -MainPanel "ModelRouterTrialCockpitPanel" `
  -CommandLabel "Go to Model Router Trial Cockpit" `
  -Modules @("model-router-trial-cockpit-model.ts", "index.ts") `
  -Components @("ModelRouterTrialCockpitPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterTrialCockpitStableKey", "buildModelRouterTrialCockpit", "buildModelRouterTrialCockpitItems", "buildModelRouterTrialCockpitBoundary", "buildModelRouterTrialCockpitModel", "summarizeModelRouterTrialCockpit", "MODEL_ROUTER_TRIAL_COCKPIT_LANGUAGE") `
  -PhaseMarkers @("Model router trial cockpit", "Model router trial cockpit does not route live requests", "Model router trials require explicit operator approval", "Trial cockpit uses shared brain model criteria", "Denied model router trial paths remain blocked", "Model router trial cockpit checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router trial cockpit does not route live requests", "Model router trials require explicit operator approval", "Denied model router trial paths remain blocked") `
  -RouteHref "/model-router-trial-cockpit"

Write-Host "[OK] CodexForge Phase 914 model router trial cockpit smoke passed."
