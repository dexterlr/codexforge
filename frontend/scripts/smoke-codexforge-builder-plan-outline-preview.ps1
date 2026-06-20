param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1006 Builder Plan Outline Preview" `
  -ScriptFile "smoke-codexforge-builder-plan-outline-preview.ps1" `
  -Domain "src\lib\codexforge\builder-plan-outline-preview" `
  -Route "src\app\builder-plan-outline-preview" `
  -MainPanel "BuilderPlanOutlinePreviewPanel" `
  -CommandLabel "Go to Builder Plan Outline Preview" `
  -Modules @("builder-plan-outline-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderPlanOutlinePreviewStableKey", "buildBuilderPlanOutlinePreview", "buildBuilderPlanOutlinePreviewItems", "buildBuilderPlanOutlinePreviewBoundary", "buildBuilderPlanOutlinePreviewModel", "summarizeBuilderPlanOutlinePreview", "BUILDER_PLAN_OUTLINE_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder plan outline preview", "Builder plan outline preview does not create files", "Builder plan outlining requires explicit operator approval", "Plan outlines include model routing backend adapters and domain adapters", "Denied builder plan outline paths remain blocked", "Builder plan outline checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder plan outline preview does not create files", "Builder plan outlining requires explicit operator approval", "Denied builder plan outline paths remain blocked") `
  -RouteHref "/builder-plan-outline-preview"

Write-Host "[OK] CodexForge Phase 1006 Builder Plan Outline Preview smoke passed."
