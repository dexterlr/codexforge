param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1011 Builder Recovery Timeline Preview" `
  -ScriptFile "smoke-codexforge-builder-recovery-timeline-preview.ps1" `
  -Domain "src\lib\codexforge\builder-recovery-timeline-preview" `
  -Route "src\app\builder-recovery-timeline-preview" `
  -MainPanel "BuilderRecoveryTimelinePreviewPanel" `
  -CommandLabel "Go to Builder Recovery Timeline Preview" `
  -Modules @("builder-recovery-timeline-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderRecoveryTimelinePreviewStableKey", "buildBuilderRecoveryTimelinePreview", "buildBuilderRecoveryTimelinePreviewItems", "buildBuilderRecoveryTimelinePreviewBoundary", "buildBuilderRecoveryTimelinePreviewModel", "summarizeBuilderRecoveryTimelinePreview", "BUILDER_RECOVERY_TIMELINE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder recovery timeline preview", "Builder recovery timeline preview does not trigger recovery", "Recovery timeline review requires explicit operator approval", "Recovery timelines include rollback backup and restore checkpoints", "Denied builder recovery timeline paths remain blocked", "Builder recovery timeline checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder recovery timeline preview does not trigger recovery", "Recovery timeline review requires explicit operator approval", "Denied builder recovery timeline paths remain blocked") `
  -RouteHref "/builder-recovery-timeline-preview"

Write-Host "[OK] CodexForge Phase 1011 Builder Recovery Timeline Preview smoke passed."
