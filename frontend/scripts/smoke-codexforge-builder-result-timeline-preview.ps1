param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1010 Builder Result Timeline Preview" `
  -ScriptFile "smoke-codexforge-builder-result-timeline-preview.ps1" `
  -Domain "src\lib\codexforge\builder-result-timeline-preview" `
  -Route "src\app\builder-result-timeline-preview" `
  -MainPanel "BuilderResultTimelinePreviewPanel" `
  -CommandLabel "Go to Builder Result Timeline Preview" `
  -Modules @("builder-result-timeline-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderResultTimelinePreviewStableKey", "buildBuilderResultTimelinePreview", "buildBuilderResultTimelinePreviewItems", "buildBuilderResultTimelinePreviewBoundary", "buildBuilderResultTimelinePreviewModel", "summarizeBuilderResultTimelinePreview", "BUILDER_RESULT_TIMELINE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder result timeline preview", "Builder result timeline preview does not persist results", "Result timeline review requires explicit operator approval", "Result timelines route outputs through shared result review", "Denied builder result timeline paths remain blocked", "Builder result timeline checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder result timeline preview does not persist results", "Result timeline review requires explicit operator approval", "Denied builder result timeline paths remain blocked") `
  -RouteHref "/builder-result-timeline-preview"

Write-Host "[OK] CodexForge Phase 1010 Builder Result Timeline Preview smoke passed."
