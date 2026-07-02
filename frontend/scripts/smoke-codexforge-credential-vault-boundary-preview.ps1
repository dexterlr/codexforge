param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2046 Credential Vault Boundary Preview"
  ScriptFile = "smoke-codexforge-credential-vault-boundary-preview.ps1"
  Domain = "src\lib\codexforge\credential-vault-boundary-preview"
  Route = "src\app\credential-vault-boundary-preview"
  CommandLabel = "Go to Credential Vault Boundary Preview"
  RouteHref = "/credential-vault-boundary-preview"
  Markers = @("Credential vault boundary preview", "Credential vault boundary preview does not store API keys store tokens read secrets write secrets or expose credentials from the UI", "Credential vault boundary preview requires backend-owned credential vault access policy rotation policy secret scanning and audit trail", "Credential vault boundary preview shows simulated vault prerequisite simulated key rotation prerequisite simulated access boundary simulated audit requirement simulated denied frontend credential storage", "Denied credential vault paths remain blocked", "Credential vault boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-provider-gateway-contract-smoke-helper.ps1") @params

