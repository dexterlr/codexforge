param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 882 Model Latency Score Preview" `
  -ScriptFile "smoke-codexforge-model-latency-score-preview.ps1" `
  -Domain "src\lib\codexforge\model-latency-score-preview" `
  -Route "src\app\model-latency-score-preview" `
  -MainPanel "ModelLatencyScorePreviewPanel" `
  -CommandLabel "Go to Model Latency Score Preview" `
  -Modules @("model-latency-score-preview-model.ts", "index.ts") `
  -Components @("ModelLatencyScorePreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelLatencyScorePreviewStableKey", "buildModelLatencyScorePreview", "buildModelLatencyScorePreviewItems", "buildModelLatencyScorePreviewBoundary", "buildModelLatencyScorePreviewModel", "summarizeModelLatencyScorePreview", "MODEL_LATENCY_SCORE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model latency score preview", "Model latency score preview does not benchmark models", "Latency scoring requires explicit operator approval", "Latency scores inform efficient routing", "Denied latency score paths remain blocked", "Latency score checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model latency score preview does not benchmark models", "Latency scoring requires explicit operator approval", "Denied latency score paths remain blocked") `
  -RouteHref "/model-latency-score-preview"

Write-Host "[OK] CodexForge Phase 882 Model latency score preview smoke passed."
