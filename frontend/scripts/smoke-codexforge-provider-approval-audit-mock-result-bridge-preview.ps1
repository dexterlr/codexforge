param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2430 Provider Approval Audit Mock Result Bridge Preview"
  ScriptFile = "smoke-codexforge-provider-approval-audit-mock-result-bridge-preview.ps1"
  Domain = "provider-approval-audit-mock-result-bridge-preview"
  Route = "provider-approval-audit-mock-result-bridge-preview"
  CommandLabel = "Go to Provider Approval Audit Mock Result Bridge Preview"
  RouteHref = "/provider-approval-audit-mock-result-bridge-preview"
  Phase = 2430
  Title = "Provider Approval Audit Mock Result Bridge Preview"
  Markers = @(
  'Provider approval audit mock result bridge preview'
  'Provider approval audit mock result bridge preview maps approval audit gates to mock result review without accepting real outputs'
  'Provider approval audit mock result bridge preview keeps bridge data synthetic and review-only'
  'Provider approval audit mock result bridge preview blocks result persistence'
  'Denied provider approval audit mock result bridge paths remain blocked'
  'Provider approval audit mock result bridge checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
