param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 819 Backend Adapter Approval Preview" `
  -ScriptFile "smoke-codexforge-backend-adapter-approval-preview.ps1" `
  -Domain "src\lib\codexforge\backend-adapter-approval-preview" `
  -Route "src\app\backend-adapter-approval-preview" `
  -MainPanel "BackendAdapterApprovalPreviewPanel" `
  -CommandLabel "Go to Backend Adapter Approval Preview" `
  -Modules @("backend-adapter-approval-preview-model.ts", "index.ts") `
  -Components @("BackendAdapterApprovalPreviewPanel.tsx", "index.ts") `
  -Exports @("buildBackendAdapterApprovalPreviewStableKey", "buildBackendAdapterApprovalPreview", "buildBackendAdapterApprovalPreviewItems", "buildBackendAdapterApprovalPreviewBoundary", "buildBackendAdapterApprovalPreviewModel", "summarizeBackendAdapterApprovalPreview", "BACKEND_ADAPTER_APPROVAL_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Backend adapter approval preview", "Backend adapter approval preview does not approve actions", "Adapter approvals require explicit operator confirmation", "Denied approval shortcuts remain blocked", "Approval adapter groups", "Approval preview checklist", "static implementation preview", "review-only", "not executable from UI", "approval required", "operator-approved", "denied paths remain blocked", "future model-router bounded concern", "no live model routing") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Backend adapter approval preview does not approve actions", "Adapter approvals require explicit operator confirmation", "Denied approval shortcuts remain blocked") `
  -RouteHref "/backend-adapter-approval-preview"

Write-Host "[OK] CodexForge Phase 819 Backend adapter approval preview smoke passed."
