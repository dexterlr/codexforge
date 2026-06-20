param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1009 Builder Evidence Timeline Preview" `
  -ScriptFile "smoke-codexforge-builder-evidence-timeline-preview.ps1" `
  -Domain "src\lib\codexforge\builder-evidence-timeline-preview" `
  -Route "src\app\builder-evidence-timeline-preview" `
  -MainPanel "BuilderEvidenceTimelinePreviewPanel" `
  -CommandLabel "Go to Builder Evidence Timeline Preview" `
  -Modules @("builder-evidence-timeline-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderEvidenceTimelinePreviewStableKey", "buildBuilderEvidenceTimelinePreview", "buildBuilderEvidenceTimelinePreviewItems", "buildBuilderEvidenceTimelinePreviewBoundary", "buildBuilderEvidenceTimelinePreviewModel", "summarizeBuilderEvidenceTimelinePreview", "BUILDER_EVIDENCE_TIMELINE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder evidence timeline preview", "Builder evidence timeline preview does not persist evidence", "Evidence timeline review requires explicit operator approval", "Evidence timelines route outputs through shared evidence review", "Denied builder evidence timeline paths remain blocked", "Builder evidence timeline checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder evidence timeline preview does not persist evidence", "Evidence timeline review requires explicit operator approval", "Denied builder evidence timeline paths remain blocked") `
  -RouteHref "/builder-evidence-timeline-preview"

Write-Host "[OK] CodexForge Phase 1009 Builder Evidence Timeline Preview smoke passed."
