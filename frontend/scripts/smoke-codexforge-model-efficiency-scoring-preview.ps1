param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 846 Model Efficiency Scoring Preview" `
  -ScriptFile "smoke-codexforge-model-efficiency-scoring-preview.ps1" `
  -Domain "src\lib\codexforge\model-efficiency-scoring-preview" `
  -Route "src\app\model-efficiency-scoring-preview" `
  -MainPanel "ModelEfficiencyScoringPreviewPanel" `
  -CommandLabel "Go to Model Efficiency Scoring Preview" `
  -Modules @("model-efficiency-scoring-preview-model.ts", "index.ts") `
  -Components @("ModelEfficiencyScoringPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelEfficiencyScoringPreviewStableKey", "buildModelEfficiencyScoringPreview", "buildModelEfficiencyScoringPreviewItems", "buildModelEfficiencyScoringPreviewBoundary", "buildModelEfficiencyScoringPreviewModel", "summarizeModelEfficiencyScoringPreview", "MODEL_EFFICIENCY_SCORING_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model efficiency scoring preview", "Model efficiency scoring preview does not score live providers", "Efficiency scoring requires explicit operator approval", "Cost speed quality privacy and context are scored together", "Denied scoring shortcuts remain blocked", "Efficiency scoring checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model efficiency scoring preview does not score live providers", "Efficiency scoring requires explicit operator approval", "Denied scoring shortcuts remain blocked") `
  -RouteHref "/model-efficiency-scoring-preview"

Write-Host "[OK] CodexForge Phase 846 Model efficiency scoring preview smoke passed."
