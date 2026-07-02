param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2156 Operator Attestation Preview"
  ScriptFile = "smoke-codexforge-operator-attestation-preview.ps1"
  Domain = "src\lib\codexforge\operator-attestation-preview"
  Route = "src\app\operator-attestation-preview"
  CommandLabel = "Go to Operator Attestation Preview"
  RouteHref = "/operator-attestation-preview"
  ContractFamily = "ApprovalCapture"
  Markers = @("Operator attestation preview", "Operator attestation preview does not capture signatures persist attestations verify identity or approve actions from the UI", "Operator attestation preview requires backend-owned operator identity binding attestation storage approval capture and audit trail", "Operator attestation preview shows simulated operator name simulated role simulated attestation text simulated approval gate simulated denied frontend attestation persistence", "Denied operator attestation paths remain blocked", "Operator attestation checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
