param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2146 Publish Failure Ledger Preview"
  ScriptFile = "smoke-codexforge-publish-failure-ledger-preview.ps1"
  Domain = "src\\lib\\codexforge\\publish-failure-ledger-preview"
  Route = "src\\app\\publish-failure-ledger-preview"
  CommandLabel = "Go to Publish Failure Ledger Preview"
  RouteHref = "/publish-failure-ledger-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Publish failure ledger preview", "Publish failure ledger preview does not persist failures retry publish jobs inspect logs or call social APIs from the UI", "Publish failure ledger preview requires backend-owned failure ledger retry policy platform health and audit trail", "Publish failure ledger preview shows simulated failure code simulated platform hold simulated retry eligibility simulated operator review simulated denied frontend failure persistence", "Denied publish failure ledger paths remain blocked", "Publish failure ledger checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
