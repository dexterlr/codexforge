param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 820 Backend Adapter Audit Preview" `
  -ScriptFile "smoke-codexforge-backend-adapter-audit-preview.ps1" `
  -Domain "src\lib\codexforge\backend-adapter-audit-preview" `
  -Route "src\app\backend-adapter-audit-preview" `
  -MainPanel "BackendAdapterAuditPreviewPanel" `
  -CommandLabel "Go to Backend Adapter Audit Preview" `
  -Modules @("backend-adapter-audit-preview-model.ts", "index.ts") `
  -Components @("BackendAdapterAuditPreviewPanel.tsx", "index.ts") `
  -Exports @("buildBackendAdapterAuditPreviewStableKey", "buildBackendAdapterAuditPreview", "buildBackendAdapterAuditPreviewItems", "buildBackendAdapterAuditPreviewBoundary", "buildBackendAdapterAuditPreviewModel", "summarizeBackendAdapterAuditPreview", "BACKEND_ADAPTER_AUDIT_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Backend adapter audit preview", "Backend adapter audit preview does not write audit records", "Audit persistence requires explicit operator approval", "Denied audit paths remain blocked", "Audit adapter groups", "Audit preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend adapter audit preview does not write audit records", "Audit persistence requires explicit operator approval", "Denied audit paths remain blocked") `
  -RouteHref "/backend-adapter-audit-preview"

Write-Host "[OK] CodexForge Phase 820 Backend adapter audit preview smoke passed."
