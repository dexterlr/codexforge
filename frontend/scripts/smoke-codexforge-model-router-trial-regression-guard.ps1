param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 934 Model Router Trial Regression Guard" `
  -ScriptFile "smoke-codexforge-model-router-trial-regression-guard.ps1" `
  -Domain "src\lib\codexforge\model-router-trial-regression-guard" `
  -Route "src\app\model-router-trial-regression-guard" `
  -MainPanel "ModelRouterTrialRegressionGuardPanel" `
  -CommandLabel "Go to Model Router Trial Regression Guard" `
  -Modules @("model-router-trial-regression-guard-model.ts", "index.ts") `
  -Components @("ModelRouterTrialRegressionGuardPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterTrialRegressionGuardStableKey", "buildModelRouterTrialRegressionGuard", "buildModelRouterTrialRegressionGuardItems", "buildModelRouterTrialRegressionGuardBoundary", "buildModelRouterTrialRegressionGuardModel", "summarizeModelRouterTrialRegressionGuard", "MODEL_ROUTER_TRIAL_REGRESSION_GUARD_LANGUAGE") `
  -PhaseMarkers @("Model router trial regression guard", "Model router trial regression guard does not call models", "Model router regression guards require explicit operator approval", "Regression guards preserve shared brain routing rules", "Denied model router regression paths remain blocked", "Model router regression checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router trial regression guard does not call models", "Model router regression guards require explicit operator approval", "Denied model router regression paths remain blocked") `
  -RouteHref "/model-router-trial-regression-guard"

Write-Host "[OK] CodexForge Phase 934 Model router trial regression guard smoke passed."
