param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2148 Takedown Revocation Policy Preview"
  ScriptFile = "smoke-codexforge-takedown-revocation-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\takedown-revocation-policy-preview"
  Route = "src\\app\\takedown-revocation-policy-preview"
  CommandLabel = "Go to Takedown Revocation Policy Preview"
  RouteHref = "/takedown-revocation-policy-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Takedown revocation policy preview", "Takedown revocation policy preview does not revoke posts call social APIs delete content persist takedown state or mutate accounts from the UI", "Takedown revocation policy preview requires backend-owned takedown workflow account authorization approval capture and audit trail", "Takedown revocation policy preview shows simulated takedown reason simulated revocation state simulated account prerequisite simulated audit requirement simulated denied frontend takedown", "Denied takedown revocation paths remain blocked", "Takedown revocation policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
