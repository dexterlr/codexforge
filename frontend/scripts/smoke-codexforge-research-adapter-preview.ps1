param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 694 Research Adapter Preview" `
  -ScriptFile "smoke-codexforge-research-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\research-adapter-preview" `
  -Route "src\\app\\research-adapter-preview" `
  -MainPanel "ResearchAdapterPreviewPanel" `
  -CommandLabel "Go to Research Adapter Preview" `
  -Modules @("research-adapter-preview-model.ts", "index.ts") `
  -Components @("ResearchAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildResearchAdapterPreviewStableKey", "buildResearchAdapterPreview", "buildResearchAdapterPreviews", "buildResearchAdapterPreviewBoundary", "buildResearchAdapterPreviewModel", "summarizeResearchAdapterPreview", "RESEARCH_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Research adapter preview", "Research adapter preview does not browse, search, or fetch sources", "Research execution requires explicit operator approval", "Research question", "Source scope", "Live research boundary", "Citation plan", "Contradiction review", "Evidence/result review", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Research adapter preview identity", "Research question", "Source scope", "Live research boundary", "Citation plan", "Contradiction review", "Evidence/result review", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/research-adapter-preview"

Write-Host "[OK] CodexForge Phase 694 research adapter preview smoke passed."
