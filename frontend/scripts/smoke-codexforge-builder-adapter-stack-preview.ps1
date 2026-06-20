param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1007 Builder Adapter Stack Preview" `
  -ScriptFile "smoke-codexforge-builder-adapter-stack-preview.ps1" `
  -Domain "src\lib\codexforge\builder-adapter-stack-preview" `
  -Route "src\app\builder-adapter-stack-preview" `
  -MainPanel "BuilderAdapterStackPreviewPanel" `
  -CommandLabel "Go to Builder Adapter Stack Preview" `
  -Modules @("builder-adapter-stack-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderAdapterStackPreviewStableKey", "buildBuilderAdapterStackPreview", "buildBuilderAdapterStackPreviewItems", "buildBuilderAdapterStackPreviewBoundary", "buildBuilderAdapterStackPreviewModel", "summarizeBuilderAdapterStackPreview", "BUILDER_ADAPTER_STACK_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Builder adapter stack preview", "Builder adapter stack preview does not execute adapters", "Adapter stack review requires explicit operator approval", "Adapter stacks include backend and domain adapter gates", "Denied builder adapter stack paths remain blocked", "Builder adapter stack checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder adapter stack preview does not execute adapters", "Adapter stack review requires explicit operator approval", "Denied builder adapter stack paths remain blocked") `
  -RouteHref "/builder-adapter-stack-preview"

Write-Host "[OK] CodexForge Phase 1007 Builder Adapter Stack Preview smoke passed."
