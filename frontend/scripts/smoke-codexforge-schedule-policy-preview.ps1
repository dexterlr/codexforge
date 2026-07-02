param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2141 Schedule Policy Preview"
  ScriptFile = "smoke-codexforge-schedule-policy-preview.ps1"
  Domain = "src\\lib\\codexforge\\schedule-policy-preview"
  Route = "src\\app\\schedule-policy-preview"
  CommandLabel = "Go to Schedule Policy Preview"
  RouteHref = "/schedule-policy-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Schedule policy preview", "Schedule policy preview does not schedule posts persist schedule state create calendars or dispatch workers from the UI", "Schedule policy preview requires backend-owned scheduling gateway timezone policy approval capture and audit trail", "Schedule policy preview shows simulated schedule window simulated timezone rule simulated approval gate simulated worker prerequisite simulated denied frontend schedule persistence", "Denied schedule policy paths remain blocked", "Schedule policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
