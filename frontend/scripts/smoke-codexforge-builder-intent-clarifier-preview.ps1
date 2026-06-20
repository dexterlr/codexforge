param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1004 Builder Intent Clarifier Preview" `
  -ScriptFile "smoke-codexforge-builder-intent-clarifier-preview.ps1" `
  -Domain "src\lib\codexforge\builder-intent-clarifier-preview" `
  -Route "src\app\builder-intent-clarifier-preview" `
  -MainPanel "BuilderIntentClarifierPreviewPanel" `
  -CommandLabel "Go to Builder Intent Clarifier Preview" `
  -Modules @("builder-intent-clarifier-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderIntentClarifierPreviewStableKey", "buildBuilderIntentClarifierPreview", "buildBuilderIntentClarifierPreviewItems", "buildBuilderIntentClarifierPreviewBoundary", "buildBuilderIntentClarifierPreviewModel", "summarizeBuilderIntentClarifierPreview", "BUILDER_INTENT_CLARIFIER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder intent clarifier preview", "Builder intent clarifier preview does not call models", "Intent clarification requires explicit operator approval", "Intent clarification keeps latest-message authority", "Denied builder intent clarification paths remain blocked", "Builder intent clarifier checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder intent clarifier preview does not call models", "Intent clarification requires explicit operator approval", "Denied builder intent clarification paths remain blocked") `
  -RouteHref "/builder-intent-clarifier-preview"

Write-Host "[OK] CodexForge Phase 1004 Builder Intent Clarifier Preview smoke passed."
