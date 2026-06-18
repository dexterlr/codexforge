param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 692 Packaging Adapter Preview" `
  -ScriptFile "smoke-codexforge-packaging-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\packaging-adapter-preview" `
  -Route "src\\app\\packaging-adapter-preview" `
  -MainPanel "PackagingAdapterPreviewPanel" `
  -CommandLabel "Go to Packaging Adapter Preview" `
  -Modules @("packaging-adapter-preview-model.ts", "index.ts") `
  -Components @("PackagingAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildPackagingAdapterPreviewStableKey", "buildPackagingAdapterPreview", "buildPackagingAdapterPreviews", "buildPackagingAdapterPreviewBoundary", "buildPackagingAdapterPreviewModel", "summarizePackagingAdapterPreview", "PACKAGING_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Packaging adapter preview", "Packaging adapter preview does not create packages or exports", "Packaging/export execution requires explicit operator approval", "Bundle", "Artifact", "Destination", "Redaction/license", "Handoff", "Rollback", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Packaging adapter preview identity", "Bundle", "Artifact", "Destination", "Redaction/license", "Handoff", "Rollback", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/packaging-adapter-preview"

Write-Host "[OK] CodexForge Phase 692 packaging adapter preview smoke passed."
