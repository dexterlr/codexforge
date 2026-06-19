param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 884 Model Cost Efficiency Score Preview" `
  -ScriptFile "smoke-codexforge-model-cost-efficiency-score-preview.ps1" `
  -Domain "src\lib\codexforge\model-cost-efficiency-score-preview" `
  -Route "src\app\model-cost-efficiency-score-preview" `
  -MainPanel "ModelCostEfficiencyScorePreviewPanel" `
  -CommandLabel "Go to Model Cost Efficiency Score Preview" `
  -Modules @("model-cost-efficiency-score-preview-model.ts", "index.ts") `
  -Components @("ModelCostEfficiencyScorePreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelCostEfficiencyScorePreviewStableKey", "buildModelCostEfficiencyScorePreview", "buildModelCostEfficiencyScorePreviewItems", "buildModelCostEfficiencyScorePreviewBoundary", "buildModelCostEfficiencyScorePreviewModel", "summarizeModelCostEfficiencyScorePreview", "MODEL_COST_EFFICIENCY_SCORE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model cost efficiency score preview", "Model cost efficiency score preview does not spend credits", "Cost efficiency scoring requires explicit operator approval", "Cheapest capable model is preferred when safe", "Denied cost score paths remain blocked", "Cost efficiency checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model cost efficiency score preview does not spend credits", "Cost efficiency scoring requires explicit operator approval", "Denied cost score paths remain blocked") `
  -RouteHref "/model-cost-efficiency-score-preview"

Write-Host "[OK] CodexForge Phase 884 Model cost efficiency score preview smoke passed."
