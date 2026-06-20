param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1005 Builder Target Recommendation Preview" `
  -ScriptFile "smoke-codexforge-builder-target-recommendation-preview.ps1" `
  -Domain "src\lib\codexforge\builder-target-recommendation-preview" `
  -Route "src\app\builder-target-recommendation-preview" `
  -MainPanel "BuilderTargetRecommendationPreviewPanel" `
  -CommandLabel "Go to Builder Target Recommendation Preview" `
  -Modules @("builder-target-recommendation-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderTargetRecommendationPreviewStableKey", "buildBuilderTargetRecommendationPreview", "buildBuilderTargetRecommendationPreviewItems", "buildBuilderTargetRecommendationPreviewBoundary", "buildBuilderTargetRecommendationPreviewModel", "summarizeBuilderTargetRecommendationPreview", "BUILDER_TARGET_RECOMMENDATION_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder target recommendation preview", "Builder target recommendation preview does not route live requests", "Target recommendation requires explicit operator approval", "Target recommendation supports game and non-game project families", "Denied builder target recommendation paths remain blocked", "Builder target recommendation checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder target recommendation preview does not route live requests", "Target recommendation requires explicit operator approval", "Denied builder target recommendation paths remain blocked") `
  -RouteHref "/builder-target-recommendation-preview"

Write-Host "[OK] CodexForge Phase 1005 Builder Target Recommendation Preview smoke passed."
