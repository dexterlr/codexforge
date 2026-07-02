param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2142 Platform Policy Preview"
  ScriptFile = "smoke-codexforge-platform-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\platform-policy-preview"
  Route = "src\\app\\platform-policy-preview"
  CommandLabel = "Go to Platform Policy Preview"
  RouteHref = "/platform-policy-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Platform policy preview", "Platform policy preview does not call platform APIs upload media mutate accounts or publish content from the UI", "Platform policy preview requires backend-owned platform policy validation account authorization rights review and audit trail", "Platform policy preview shows simulated platform rule simulated media limit simulated caption policy simulated rights gate simulated denied frontend platform mutation", "Denied platform policy paths remain blocked", "Platform policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
