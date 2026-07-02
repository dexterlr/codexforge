param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2174 Usage License Policy Preview"
  ScriptFile = "smoke-codexforge-usage-license-policy-preview.ps1"
  Domain = "src\lib\codexforge\usage-license-policy-preview"
  Route = "src\app\usage-license-policy-preview"
  CommandLabel = "Go to Usage License Policy Preview"
  RouteHref = "/usage-license-policy-preview"
  ContractFamily = "RightsConsentAudit"
  Markers = @("Usage license policy preview", "Usage license policy preview does not grant licenses persist rights mutate content or publish from the UI", "Usage license policy preview requires backend-owned license policy rights review consent review and audit trail", "Usage license policy preview shows simulated license scope simulated platform limit simulated time window simulated attribution requirement simulated denied frontend license grant", "Denied usage license policy paths remain blocked", "Usage license policy checklist")
}
& (Join-Path $PSScriptRoot "codexforge-approval-rights-audit-contract-smoke-helper.ps1") @params
