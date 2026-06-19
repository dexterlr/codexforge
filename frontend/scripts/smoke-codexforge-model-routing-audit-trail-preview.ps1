param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 856 Model Routing Audit Trail Preview" `
  -ScriptFile "smoke-codexforge-model-routing-audit-trail-preview.ps1" `
  -Domain "src\lib\codexforge\model-routing-audit-trail-preview" `
  -Route "src\app\model-routing-audit-trail-preview" `
  -MainPanel "ModelRoutingAuditTrailPreviewPanel" `
  -CommandLabel "Go to Model Routing Audit Trail Preview" `
  -Modules @("model-routing-audit-trail-preview-model.ts", "index.ts") `
  -Components @("ModelRoutingAuditTrailPreviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRoutingAuditTrailPreviewStableKey", "buildModelRoutingAuditTrailPreview", "buildModelRoutingAuditTrailPreviewItems", "buildModelRoutingAuditTrailPreviewBoundary", "buildModelRoutingAuditTrailPreviewModel", "summarizeModelRoutingAuditTrailPreview", "MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Model routing audit trail preview", "Model routing audit trail preview does not write audit records", "Model routing audit writes require explicit operator approval", "Routing decisions reference shared brain state", "Denied routing audit paths remain blocked", "Model routing audit checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model routing audit trail preview does not write audit records", "Model routing audit writes require explicit operator approval", "Denied routing audit paths remain blocked") `
  -RouteHref "/model-routing-audit-trail-preview"

Write-Host "[OK] CodexForge Phase 856 Model routing audit trail preview smoke passed."
