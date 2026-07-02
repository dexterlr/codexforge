param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2036 Approval Capture Contract Preview"
  ScriptFile = "smoke-codexforge-approval-capture-contract-preview.ps1"
  Domain = "src\lib\codexforge\approval-capture-contract-preview"
  Route = "src\app\approval-capture-contract-preview"
  CommandLabel = "Go to Approval Capture Contract Preview"
  RouteHref = "/approval-capture-contract-preview"
  Markers = @("Approval capture contract preview", "Approval capture contract preview does not persist approvals release locks approve exports publish content or dispatch workers from the UI", "Approval capture contract preview requires backend-owned approval capture identity binding audit trail revocation policy and explicit operator approval", "Approval capture contract preview shows simulated approval contract simulated operator identity prerequisite simulated revocation prerequisite simulated audit prerequisite simulated denied frontend approval persistence", "Denied approval capture contract paths remain blocked", "Approval capture contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params

