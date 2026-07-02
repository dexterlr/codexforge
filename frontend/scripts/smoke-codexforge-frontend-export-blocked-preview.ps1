param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2134 Frontend Export Blocked Preview"
  ScriptFile = "smoke-codexforge-frontend-export-blocked-preview.ps1"
  Domain = "src\\lib\\codexforge\\frontend-export-blocked-preview"
  Route = "src\\app\\frontend-export-blocked-preview"
  CommandLabel = "Go to Frontend Export Blocked Preview"
  RouteHref = "/frontend-export-blocked-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Frontend export blocked preview", "Frontend export blocked preview blocks frontend artifact creation frontend artifact persistence frontend export frontend download frontend upload frontend file writes frontend signed URL creation frontend export persistence and frontend audit persistence", "Frontend export blocked preview requires backend-owned artifact storage export service access policy approval capture and audit trail", "Frontend export blocked preview shows denied artifact creation denied export denied download denied file write denied persistence and backend prerequisite", "Denied frontend export paths remain blocked", "Frontend export blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
