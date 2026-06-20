param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 933 Model Router Trial Summary" `
  -ScriptFile "smoke-codexforge-model-router-trial-summary.ps1" `
  -Domain "src\lib\codexforge\model-router-trial-summary" `
  -Route "src\app\model-router-trial-summary" `
  -MainPanel "ModelRouterTrialSummaryPanel" `
  -CommandLabel "Go to Model Router Trial Summary" `
  -Modules @("model-router-trial-summary-model.ts", "index.ts") `
  -Components @("ModelRouterTrialSummaryPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterTrialSummaryStableKey", "buildModelRouterTrialSummary", "buildModelRouterTrialSummaryItems", "buildModelRouterTrialSummaryBoundary", "buildModelRouterTrialSummaryModel", "summarizeModelRouterTrialSummary", "MODEL_ROUTER_TRIAL_SUMMARY_LANGUAGE") `
  -PhaseMarkers @("Model router trial summary", "Model router trial summary does not route live requests", "Model router summaries require explicit operator approval", "Trial summaries explain cost quality speed privacy and task fit", "Denied model router summary paths remain blocked", "Model router trial summary checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router trial summary does not route live requests", "Model router summaries require explicit operator approval", "Denied model router summary paths remain blocked") `
  -RouteHref "/model-router-trial-summary"

Write-Host "[OK] CodexForge Phase 933 Model router trial summary smoke passed."
