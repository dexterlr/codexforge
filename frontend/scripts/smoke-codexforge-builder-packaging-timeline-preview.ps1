param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1012 Builder Packaging Timeline Preview" `
  -ScriptFile "smoke-codexforge-builder-packaging-timeline-preview.ps1" `
  -Domain "src\lib\codexforge\builder-packaging-timeline-preview" `
  -Route "src\app\builder-packaging-timeline-preview" `
  -MainPanel "BuilderPackagingTimelinePreviewPanel" `
  -CommandLabel "Go to Builder Packaging Timeline Preview" `
  -Modules @("builder-packaging-timeline-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderPackagingTimelinePreviewStableKey", "buildBuilderPackagingTimelinePreview", "buildBuilderPackagingTimelinePreviewItems", "buildBuilderPackagingTimelinePreviewBoundary", "buildBuilderPackagingTimelinePreviewModel", "summarizeBuilderPackagingTimelinePreview", "BUILDER_PACKAGING_TIMELINE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder packaging timeline preview", "Builder packaging timeline preview does not package outputs", "Packaging timeline review requires explicit operator approval", "Packaging timelines include export artifact and runbook review", "Denied builder packaging timeline paths remain blocked", "Builder packaging timeline checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder packaging timeline preview does not package outputs", "Packaging timeline review requires explicit operator approval", "Denied builder packaging timeline paths remain blocked") `
  -RouteHref "/builder-packaging-timeline-preview"

Write-Host "[OK] CodexForge Phase 1012 Builder Packaging Timeline Preview smoke passed."
