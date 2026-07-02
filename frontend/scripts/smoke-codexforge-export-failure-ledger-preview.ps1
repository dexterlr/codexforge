param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2132 Export Failure Ledger Preview"
  ScriptFile = "smoke-codexforge-export-failure-ledger-preview.ps1"
  Domain = "src\\lib\\codexforge\\export-failure-ledger-preview"
  Route = "src\\app\\export-failure-ledger-preview"
  CommandLabel = "Go to Export Failure Ledger Preview"
  RouteHref = "/export-failure-ledger-preview"
  ContractFamily = "ArtifactExport"
  Markers = @("Export failure ledger preview", "Export failure ledger preview does not persist failures retry exports inspect logs or dispatch workers from the UI", "Export failure ledger preview requires backend-owned failure ledger retry policy artifact validation and audit trail", "Export failure ledger preview shows simulated failure code simulated blocked prerequisite simulated retry eligibility simulated operator review simulated denied frontend failure persistence", "Denied export failure ledger paths remain blocked", "Export failure ledger checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
