param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 693 Creative Adapter Preview" `
  -ScriptFile "smoke-codexforge-creative-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\creative-adapter-preview" `
  -Route "src\\app\\creative-adapter-preview" `
  -MainPanel "CreativeAdapterPreviewPanel" `
  -CommandLabel "Go to Creative Adapter Preview" `
  -Modules @("creative-adapter-preview-model.ts", "index.ts") `
  -Components @("CreativeAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildCreativeAdapterPreviewStableKey", "buildCreativeAdapterPreview", "buildCreativeAdapterPreviews", "buildCreativeAdapterPreviewBoundary", "buildCreativeAdapterPreviewModel", "summarizeCreativeAdapterPreview", "CREATIVE_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Creative adapter preview", "Creative adapter preview does not generate images, video, or 3D assets", "Creative execution requires explicit operator approval", "Creative brief", "Storyboard", "Prompt summary", "Provider/local tool boundary", "Output review", "Packaging/export", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Creative adapter preview identity", "Creative brief", "Storyboard", "Prompt summary", "Provider/local tool boundary", "Output review", "Packaging/export", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/creative-adapter-preview"

Write-Host "[OK] CodexForge Phase 693 creative adapter preview smoke passed."
