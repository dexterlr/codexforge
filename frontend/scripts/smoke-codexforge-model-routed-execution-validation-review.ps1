param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 950 Model-Routed Execution Validation Review" `
  -ScriptFile "smoke-codexforge-model-routed-execution-validation-review.ps1" `
  -Domain "src\lib\codexforge\model-routed-execution-validation-review" `
  -Route "src\app\model-routed-execution-validation-review" `
  -MainPanel "ModelRoutedExecutionValidationReviewPanel" `
  -CommandLabel "Go to Model-Routed Execution Validation Review" `
  -Modules @("model-routed-execution-validation-review-model.ts", "index.ts") `
  -Components @("ModelRoutedExecutionValidationReviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRoutedExecutionValidationReviewStableKey", "buildModelRoutedExecutionValidationReview", "buildModelRoutedExecutionValidationReviewItems", "buildModelRoutedExecutionValidationReviewBoundary", "buildModelRoutedExecutionValidationReviewModel", "summarizeModelRoutedExecutionValidationReview", "MODEL_ROUTED_EXECUTION_VALIDATION_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Model-routed execution validation review", "Model-routed execution validation review does not validate live outputs", "Validation requires explicit operator approval", "Validation reviews include model and adapter expectations", "Denied model-routed validation paths remain blocked", "Model-routed validation checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model-routed execution validation review does not validate live outputs", "Validation requires explicit operator approval", "Denied model-routed validation paths remain blocked") `
  -RouteHref "/model-routed-execution-validation-review"

Write-Host "[OK] CodexForge Phase 950 Model-routed execution validation review smoke passed."
