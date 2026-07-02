param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2157 Multi Step Approval Chain Preview"
  ScriptFile = "smoke-codexforge-multi-step-approval-chain-preview.ps1"
  Domain = "src\lib\codexforge\multi-step-approval-chain-preview"
  Route = "src\app\multi-step-approval-chain-preview"
  CommandLabel = "Go to Multi Step Approval Chain Preview"
  RouteHref = "/multi-step-approval-chain-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Multi step approval chain preview", "Multi step approval chain preview does not advance approvals persist chain state dispatch notifications or trigger actions from the UI", "Multi step approval chain preview requires backend-owned approval chain state identity binding escalation policy and audit trail", "Multi step approval chain preview shows simulated creator review simulated legal review simulated operator review simulated final hold simulated denied frontend approval mutation", "Denied multi step approval chain paths remain blocked", "Multi step approval chain checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
