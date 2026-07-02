param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2150 Frontend Publish Blocked Preview"
  ScriptFile = "smoke-codexforge-frontend-publish-blocked-preview.ps1"
  Domain = "src\\lib\\codexforge\\frontend-publish-blocked-preview"
  Route = "src\\app\\frontend-publish-blocked-preview"
  CommandLabel = "Go to Frontend Publish Blocked Preview"
  RouteHref = "/frontend-publish-blocked-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Frontend publish blocked preview", "Frontend publish blocked preview blocks frontend publishing frontend scheduling frontend social API calls frontend media upload frontend token storage frontend account authorization frontend publish persistence frontend schedule persistence and frontend telemetry persistence", "Frontend publish blocked preview requires backend-owned publish gateway account authorization approval capture rights review scheduling gateway and audit trail", "Frontend publish blocked preview shows denied publish denied schedule denied social API denied media upload denied token storage and backend prerequisite", "Denied frontend publish paths remain blocked", "Frontend publish blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
