param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2070 Frontend Asset Persistence Blocked Preview"
  ScriptFile = "smoke-codexforge-frontend-asset-persistence-blocked-preview.ps1"
  Domain = "src\lib\codexforge\frontend-asset-persistence-blocked-preview"
  Route = "src\app\frontend-asset-persistence-blocked-preview"
  CommandLabel = "Go to Frontend Asset Persistence Blocked Preview"
  RouteHref = "/frontend-asset-persistence-blocked-preview"
  Contract = "Asset"
  Markers = @("Frontend asset persistence blocked preview", "Frontend asset persistence blocked preview blocks frontend upload frontend download frontend media storage frontend object storage frontend file writes frontend asset persistence frontend rights persistence frontend artifact persistence and frontend access mutation", "Frontend asset persistence blocked preview requires backend-owned asset storage rights workflow access control approval capture and audit trail", "Frontend asset persistence blocked preview shows denied upload denied download denied asset persistence denied rights persistence denied artifact persistence and backend prerequisite", "Denied frontend asset persistence paths remain blocked", "Frontend asset persistence blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
