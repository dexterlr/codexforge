param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2028 Asset Storage Contract Preview"
  ScriptFile = "smoke-codexforge-asset-storage-contract-preview.ps1"
  Domain = "src\lib\codexforge\asset-storage-contract-preview"
  Route = "src\app\asset-storage-contract-preview"
  CommandLabel = "Go to Asset Storage Contract Preview"
  RouteHref = "/asset-storage-contract-preview"
  Markers = @("Asset storage contract preview", "Asset storage contract preview does not upload assets download assets store media create artifacts or write files from the UI", "Asset storage contract preview requires backend-owned asset storage malware scanning rights tagging approval capture and audit trail", "Asset storage contract preview shows simulated asset storage interface simulated upload prerequisite simulated rights tag prerequisite simulated scan prerequisite simulated audit prerequisite and denied frontend persistence", "Denied asset storage contract paths remain blocked", "Asset storage contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

