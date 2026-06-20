param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 951 Model-Routed Execution Operator Trial" `
  -ScriptFile "smoke-codexforge-model-routed-execution-operator-trial.ps1" `
  -Domain "src\lib\codexforge\model-routed-execution-operator-trial" `
  -Route "src\app\model-routed-execution-operator-trial" `
  -MainPanel "ModelRoutedExecutionOperatorTrialPanel" `
  -CommandLabel "Go to Model-Routed Execution Operator Trial" `
  -Modules @("model-routed-execution-operator-trial-model.ts", "index.ts") `
  -Components @("ModelRoutedExecutionOperatorTrialPanel.tsx", "index.ts") `
  -Exports @("buildModelRoutedExecutionOperatorTrialStableKey", "buildModelRoutedExecutionOperatorTrial", "buildModelRoutedExecutionOperatorTrialItems", "buildModelRoutedExecutionOperatorTrialBoundary", "buildModelRoutedExecutionOperatorTrialModel", "summarizeModelRoutedExecutionOperatorTrial", "MODEL_ROUTED_EXECUTION_OPERATOR_TRIAL_LANGUAGE") `
  -PhaseMarkers @("Model-routed execution operator trial", "Model-routed execution operator trial does not execute actions", "Operator trials require explicit operator approval", "Operator trials preserve shared brain model routing rules", "Denied model-routed operator trial paths remain blocked", "Model-routed operator trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model-routed execution operator trial does not execute actions", "Operator trials require explicit operator approval", "Denied model-routed operator trial paths remain blocked") `
  -RouteHref "/model-routed-execution-operator-trial"

Write-Host "[OK] CodexForge Phase 951 Model-routed execution operator trial smoke passed."
