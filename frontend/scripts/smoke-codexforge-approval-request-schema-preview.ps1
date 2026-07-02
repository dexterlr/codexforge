param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2155 Approval Request Schema Preview"
  ScriptFile = "smoke-codexforge-approval-request-schema-preview.ps1"
  Domain = "src\lib\codexforge\approval-request-schema-preview"
  Route = "src\app\approval-request-schema-preview"
  CommandLabel = "Go to Approval Request Schema Preview"
  RouteHref = "/approval-request-schema-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Approval request schema preview", "Approval request schema preview does not create approval requests persist approval state or trigger protected actions from the UI", "Approval request schema preview requires backend-owned approval request validation identity binding evidence storage and audit trail", "Approval request schema preview shows simulated approval id simulated requester simulated protected action simulated evidence requirement simulated denied frontend approval request", "Denied approval request schema paths remain blocked", "Approval request schema checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
