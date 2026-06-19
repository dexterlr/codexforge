param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 821 Backend Adapter Sandbox Preview" `
  -ScriptFile "smoke-codexforge-backend-adapter-sandbox-preview.ps1" `
  -Domain "src\lib\codexforge\backend-adapter-sandbox-preview" `
  -Route "src\app\backend-adapter-sandbox-preview" `
  -MainPanel "BackendAdapterSandboxPreviewPanel" `
  -CommandLabel "Go to Backend Adapter Sandbox Preview" `
  -Modules @("backend-adapter-sandbox-preview-model.ts", "index.ts") `
  -Components @("BackendAdapterSandboxPreviewPanel.tsx", "index.ts") `
  -Exports @("buildBackendAdapterSandboxPreviewStableKey", "buildBackendAdapterSandboxPreview", "buildBackendAdapterSandboxPreviewItems", "buildBackendAdapterSandboxPreviewBoundary", "buildBackendAdapterSandboxPreviewModel", "summarizeBackendAdapterSandboxPreview", "BACKEND_ADAPTER_SANDBOX_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Backend adapter sandbox preview", "Backend adapter sandbox preview does not start sandboxes", "Sandbox activation requires explicit operator approval", "Denied sandbox paths remain blocked", "Sandbox adapter groups", "Sandbox preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend adapter sandbox preview does not start sandboxes", "Sandbox activation requires explicit operator approval", "Denied sandbox paths remain blocked") `
  -RouteHref "/backend-adapter-sandbox-preview"

Write-Host "[OK] CodexForge Phase 821 Backend adapter sandbox preview smoke passed."
