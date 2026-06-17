param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 658 First Provider Model Controlled Trial" `
  -ScriptFile "smoke-codexforge-first-provider-model-controlled-trial.ps1" `
  -Domain "src\lib\codexforge\first-provider-model-controlled-trial" `
  -Route "src\app\first-provider-model-controlled-trial" `
  -MainPanel "FirstProviderModelControlledTrialPanel" `
  -CommandLabel "Go to First Provider Model Controlled Trial" `
  -Modules @("first-provider-model-controlled-trial-model.ts", "index.ts") `
  -Components @("FirstProviderModelControlledTrialPanel.tsx", "index.ts") `
  -Exports @("buildFirstProviderModelControlledTrialStableKey", "buildFirstProviderModelControlledTrial", "buildFirstProviderModelControlledTrials", "buildFirstProviderModelControlledTrialBoundary", "buildFirstProviderModelControlledTrialModel", "summarizeFirstProviderModelControlledTrial", "FIRST_PROVIDER_MODEL_CONTROLLED_TRIAL_LANGUAGE") `
  -PhaseMarkers @("First provider/model controlled trial", "First provider/model controlled trial does not call providers or models", "Provider/model calls require explicit operator approval", "Prompt preview", "Redaction", "Cost/rate-limit", "Output handling", "Result review") `
  -PlainEnglish @("First provider/model controlled trial identity", "Prompt preview", "Redaction", "Cost/rate-limit", "Output handling", "Result review", "Next recommended action") `
  -RouteHref "/first-provider-model-controlled-trial"

Write-Host "[OK] CodexForge Phase 658 first provider/model controlled trial smoke passed."
