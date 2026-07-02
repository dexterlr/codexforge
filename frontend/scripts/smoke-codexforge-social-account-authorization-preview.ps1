param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2139 Social Account Authorization Preview"
  ScriptFile = "smoke-codexforge-social-account-authorization-preview.ps1"
  Domain = "src\\lib\\codexforge\\social-account-authorization-preview"
  Route = "src\\app\\social-account-authorization-preview"
  CommandLabel = "Go to Social Account Authorization Preview"
  RouteHref = "/social-account-authorization-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Social account authorization preview", "Social account authorization preview does not authorize accounts store tokens call social APIs persist credentials or expose secrets from the UI", "Social account authorization preview requires backend-owned account authorization credential vault token rotation approval capture and audit trail", "Social account authorization preview shows simulated account placeholder simulated permission scope simulated token rotation note simulated approval gate simulated denied frontend credential storage", "Denied social account authorization paths remain blocked", "Social account authorization checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
