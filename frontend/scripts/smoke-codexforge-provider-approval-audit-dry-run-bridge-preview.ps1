param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2429 Provider Approval Audit Dry Run Bridge Preview"
  ScriptFile = "smoke-codexforge-provider-approval-audit-dry-run-bridge-preview.ps1"
  Domain = "provider-approval-audit-dry-run-bridge-preview"
  Route = "provider-approval-audit-dry-run-bridge-preview"
  CommandLabel = "Go to Provider Approval Audit Dry Run Bridge Preview"
  RouteHref = "/provider-approval-audit-dry-run-bridge-preview"
  Phase = 2429
  Title = "Provider Approval Audit Dry Run Bridge Preview"
  Markers = @(
  'Provider approval audit dry run bridge preview'
  'Provider approval audit dry run bridge preview maps approval audit gates to the previous dry run harness without executing providers'
  'Provider approval audit dry run bridge preview keeps bridge data synthetic and review-only'
  'Provider approval audit dry run bridge preview blocks prompt transmission'
  'Denied provider approval audit dry run bridge paths remain blocked'
  'Provider approval audit dry run bridge checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
