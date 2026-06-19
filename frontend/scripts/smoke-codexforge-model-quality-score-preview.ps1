param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 883 Model Quality Score Preview" `
  -ScriptFile "smoke-codexforge-model-quality-score-preview.ps1" `
  -Domain "src\lib\codexforge\model-quality-score-preview" `
  -Route "src\app\model-quality-score-preview" `
  -MainPanel "ModelQualityScorePreviewPanel" `
  -CommandLabel "Go to Model Quality Score Preview" `
  -Modules @("model-quality-score-preview-model.ts", "index.ts") `
  -Components @("ModelQualityScorePreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelQualityScorePreviewStableKey", "buildModelQualityScorePreview", "buildModelQualityScorePreviewItems", "buildModelQualityScorePreviewBoundary", "buildModelQualityScorePreviewModel", "summarizeModelQualityScorePreview", "MODEL_QUALITY_SCORE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model quality score preview", "Model quality score preview does not evaluate live outputs", "Quality scoring requires explicit operator approval", "Quality scores inform efficient routing", "Denied quality score paths remain blocked", "Quality score checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model quality score preview does not evaluate live outputs", "Quality scoring requires explicit operator approval", "Denied quality score paths remain blocked") `
  -RouteHref "/model-quality-score-preview"

Write-Host "[OK] CodexForge Phase 883 Model quality score preview smoke passed."
