param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 949 Model-Routed Execution Sandbox Review" `
  -ScriptFile "smoke-codexforge-model-routed-execution-sandbox-review.ps1" `
  -Domain "src\lib\codexforge\model-routed-execution-sandbox-review" `
  -Route "src\app\model-routed-execution-sandbox-review" `
  -MainPanel "ModelRoutedExecutionSandboxReviewPanel" `
  -CommandLabel "Go to Model-Routed Execution Sandbox Review" `
  -Modules @("model-routed-execution-sandbox-review-model.ts", "index.ts") `
  -Components @("ModelRoutedExecutionSandboxReviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRoutedExecutionSandboxReviewStableKey", "buildModelRoutedExecutionSandboxReview", "buildModelRoutedExecutionSandboxReviewItems", "buildModelRoutedExecutionSandboxReviewBoundary", "buildModelRoutedExecutionSandboxReviewModel", "summarizeModelRoutedExecutionSandboxReview", "MODEL_ROUTED_EXECUTION_SANDBOX_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Model-routed execution sandbox review", "Model-routed execution sandbox review does not run sandboxes", "Sandbox use requires explicit operator approval", "Sandbox reviews include model and adapter risk", "Denied model-routed sandbox paths remain blocked", "Model-routed sandbox checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model-routed execution sandbox review does not run sandboxes", "Sandbox use requires explicit operator approval", "Denied model-routed sandbox paths remain blocked") `
  -RouteHref "/model-routed-execution-sandbox-review"

Write-Host "[OK] CodexForge Phase 949 Model-routed execution sandbox review smoke passed."
