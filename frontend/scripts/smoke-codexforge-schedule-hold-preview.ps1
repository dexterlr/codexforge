param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2147 Schedule Hold Preview"
  ScriptFile = "smoke-codexforge-schedule-hold-preview.ps1"
  Domain = "src\\lib\\codexforge\\schedule-hold-preview"
  Route = "src\\app\\schedule-hold-preview"
  CommandLabel = "Go to Schedule Hold Preview"
  RouteHref = "/schedule-hold-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Schedule hold preview", "Schedule hold preview does not hold schedules persist queue state dispatch workers or publish content from the UI", "Schedule hold preview requires backend-owned schedule ledger approval capture timezone policy and audit trail", "Schedule hold preview shows simulated hold reason simulated schedule window simulated approval state simulated release requirement simulated denied frontend schedule mutation", "Denied schedule hold paths remain blocked", "Schedule hold checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
