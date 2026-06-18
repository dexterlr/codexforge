param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 685 Local Runtime Adapter Preview" `
  -ScriptFile "smoke-codexforge-local-runtime-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\local-runtime-adapter-preview" `
  -Route "src\\app\\local-runtime-adapter-preview" `
  -MainPanel "LocalRuntimeAdapterPreviewPanel" `
  -CommandLabel "Go to Local Runtime Adapter Preview" `
  -Modules @("local-runtime-adapter-preview-model.ts", "index.ts") `
  -Components @("LocalRuntimeAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildLocalRuntimeAdapterPreviewStableKey", "buildLocalRuntimeAdapterPreview", "buildLocalRuntimeAdapterPreviews", "buildLocalRuntimeAdapterPreviewBoundary", "buildLocalRuntimeAdapterPreviewModel", "summarizeLocalRuntimeAdapterPreview", "LOCAL_RUNTIME_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Local runtime adapter preview", "Local runtime adapter preview does not start local runtimes", "Local runtime adapter execution requires explicit operator approval", "Runtime name", "Port/network", "Process lifecycle", "Stop plan", "Logging", "Evidence", "Recovery", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Local runtime adapter preview identity", "Runtime name", "Port/network", "Process lifecycle", "Stop plan", "Logging", "Evidence", "Recovery", "Denied actions", "Unresolved blockers", "Next recommended action") `
  -RouteHref "/local-runtime-adapter-preview"

Write-Host "[OK] CodexForge Phase 685 local runtime adapter preview smoke passed."
