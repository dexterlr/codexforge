param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2321 Provider Adapter Approval Mapping Preview"
  ScriptFile = "smoke-codexforge-provider-adapter-approval-mapping-preview.ps1"
  Domain = "provider-adapter-approval-mapping-preview"
  Route = "provider-adapter-approval-mapping-preview"
  CommandLabel = "Go to Provider Adapter Approval Mapping Preview"
  RouteHref = "/provider-adapter-approval-mapping-preview"
  Markers = @("Provider adapter approval mapping preview", "Provider adapter approval mapping preview defines how explicit operator approval will map to adapter execution without approving actions", "Provider adapter approval mapping preview does not persist approvals verify identity or authorize provider accounts", "Provider adapter approval mapping preview keeps execution blocked until backend approval enforcement exists", "Denied provider adapter approval mapping paths remain blocked", "Provider adapter approval mapping checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-backend-adapter-contract-smoke-helper.ps1") @params
