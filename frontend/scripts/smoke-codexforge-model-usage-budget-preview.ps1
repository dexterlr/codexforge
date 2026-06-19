param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 870 Model Usage Budget Preview" `
  -ScriptFile "smoke-codexforge-model-usage-budget-preview.ps1" `
  -Domain "src\lib\codexforge\model-usage-budget-preview" `
  -Route "src\app\model-usage-budget-preview" `
  -MainPanel "ModelUsageBudgetPreviewPanel" `
  -CommandLabel "Go to Model Usage Budget Preview" `
  -Modules @("model-usage-budget-preview-model.ts", "index.ts") `
  -Components @("ModelUsageBudgetPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelUsageBudgetPreviewStableKey", "buildModelUsageBudgetPreview", "buildModelUsageBudgetPreviewItems", "buildModelUsageBudgetPreviewBoundary", "buildModelUsageBudgetPreviewModel", "summarizeModelUsageBudgetPreview", "MODEL_USAGE_BUDGET_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model usage budget preview", "Model usage budget preview does not spend credits", "Model budget use requires explicit operator approval", "Paid spend remains operator-controlled", "Denied budget paths remain blocked", "Model budget checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model usage budget preview does not spend credits", "Model budget use requires explicit operator approval", "Denied budget paths remain blocked") `
  -RouteHref "/model-usage-budget-preview"

Write-Host "[OK] CodexForge Phase 870 Model usage budget preview smoke passed."
