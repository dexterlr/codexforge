param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1008 Builder Approval Timeline Preview" `
  -ScriptFile "smoke-codexforge-builder-approval-timeline-preview.ps1" `
  -Domain "src\lib\codexforge\builder-approval-timeline-preview" `
  -Route "src\app\builder-approval-timeline-preview" `
  -MainPanel "BuilderApprovalTimelinePreviewPanel" `
  -CommandLabel "Go to Builder Approval Timeline Preview" `
  -Modules @("builder-approval-timeline-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderApprovalTimelinePreviewStableKey", "buildBuilderApprovalTimelinePreview", "buildBuilderApprovalTimelinePreviewItems", "buildBuilderApprovalTimelinePreviewBoundary", "buildBuilderApprovalTimelinePreviewModel", "summarizeBuilderApprovalTimelinePreview", "BUILDER_APPROVAL_TIMELINE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder approval timeline preview", "Builder approval timeline preview does not approve actions", "Approval timeline review requires explicit operator approval", "Approval timelines list every gated model backend and domain action", "Denied builder approval timeline paths remain blocked", "Builder approval timeline checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder approval timeline preview does not approve actions", "Approval timeline review requires explicit operator approval", "Denied builder approval timeline paths remain blocked") `
  -RouteHref "/builder-approval-timeline-preview"

Write-Host "[OK] CodexForge Phase 1008 Builder Approval Timeline Preview smoke passed."
