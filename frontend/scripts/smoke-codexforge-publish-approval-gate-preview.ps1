param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2144 Publish Approval Gate Preview"
  ScriptFile = "smoke-codexforge-publish-approval-gate-preview.ps1"
  Domain = "src\\lib\\codexforge\\publish-approval-gate-preview"
  Route = "src\\app\\publish-approval-gate-preview"
  CommandLabel = "Go to Publish Approval Gate Preview"
  RouteHref = "/publish-approval-gate-preview"
  ContractFamily = "PublishGateway"
  Markers = @("Publish approval gate preview", "Publish approval gate preview does not approve posts persist approvals publish content or schedule content from the UI", "Publish approval gate preview requires backend-owned approval capture rights review brand review account authorization and audit trail", "Publish approval gate preview shows simulated operator approval simulated rights approval simulated brand approval simulated account approval simulated denied frontend approval persistence", "Denied publish approval gate paths remain blocked", "Publish approval gate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-artifact-export-publish-gateway-contract-smoke-helper.ps1") @params
