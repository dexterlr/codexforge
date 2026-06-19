param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 853 Cross-Model Result Comparison Preview" `
  -ScriptFile "smoke-codexforge-cross-model-result-comparison-preview.ps1" `
  -Domain "src\lib\codexforge\cross-model-result-comparison-preview" `
  -Route "src\app\cross-model-result-comparison-preview" `
  -MainPanel "CrossModelResultComparisonPreviewPanel" `
  -CommandLabel "Go to Cross-Model Result Comparison Preview" `
  -Modules @("cross-model-result-comparison-preview-model.ts", "index.ts") `
  -Components @("CrossModelResultComparisonPreviewPanel.tsx", "index.ts") `
  -Exports @("buildCrossModelResultComparisonPreviewStableKey", "buildCrossModelResultComparisonPreview", "buildCrossModelResultComparisonPreviewItems", "buildCrossModelResultComparisonPreviewBoundary", "buildCrossModelResultComparisonPreviewModel", "summarizeCrossModelResultComparisonPreview", "CROSS_MODEL_RESULT_COMPARISON_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Cross-model result comparison preview", "Cross-model result comparison preview does not call models", "Cross-model comparison requires explicit operator approval", "Model results compare against shared evidence and task state", "Denied comparison paths remain blocked", "Cross-model comparison checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Cross-model result comparison preview does not call models", "Cross-model comparison requires explicit operator approval", "Denied comparison paths remain blocked") `
  -RouteHref "/cross-model-result-comparison-preview"

Write-Host "[OK] CodexForge Phase 853 Cross-model result comparison preview smoke passed."
