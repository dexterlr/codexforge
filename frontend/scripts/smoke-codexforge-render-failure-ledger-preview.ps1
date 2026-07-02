param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2100 Render Failure Ledger Preview"
  ScriptFile = "smoke-codexforge-render-failure-ledger-preview.ps1"
  Domain = "src\\lib\\codexforge\\render-failure-ledger-preview"
  Route = "src\\app\\render-failure-ledger-preview"
  CommandLabel = "Go to Render Failure Ledger Preview"
  RouteHref = "/render-failure-ledger-preview"
  ContractFamily = "Render"
  Markers = @("Render failure ledger preview", "Render failure ledger preview does not persist failures retry jobs inspect logs or dispatch workers from the UI", "Render failure ledger preview requires backend-owned failure ledger redaction policy retry policy and audit trail", "Render failure ledger preview shows simulated failure code simulated blocked prerequisite simulated retry eligibility simulated operator review simulated denied frontend failure persistence", "Denied render failure ledger paths remain blocked", "Render failure ledger checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-worker-orchestration-contract-smoke-helper.ps1") @params
