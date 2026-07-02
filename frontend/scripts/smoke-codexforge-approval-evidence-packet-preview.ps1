param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2160 Approval Evidence Packet Preview"
  ScriptFile = "smoke-codexforge-approval-evidence-packet-preview.ps1"
  Domain = "src\lib\codexforge\approval-evidence-packet-preview"
  Route = "src\app\approval-evidence-packet-preview"
  CommandLabel = "Go to Approval Evidence Packet Preview"
  RouteHref = "/approval-evidence-packet-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Approval evidence packet preview", "Approval evidence packet preview does not upload evidence persist files store approvals or write artifacts from the UI", "Approval evidence packet preview requires backend-owned evidence storage checksum capture redaction policy and audit trail", "Approval evidence packet preview shows simulated evidence packet simulated checklist simulated checksum placeholder simulated redaction note simulated denied frontend evidence persistence", "Denied approval evidence packet paths remain blocked", "Approval evidence packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
