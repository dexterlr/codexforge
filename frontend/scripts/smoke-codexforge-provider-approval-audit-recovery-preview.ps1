param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2431 Provider Approval Audit Recovery Preview"
  ScriptFile = "smoke-codexforge-provider-approval-audit-recovery-preview.ps1"
  Domain = "provider-approval-audit-recovery-preview"
  Route = "provider-approval-audit-recovery-preview"
  CommandLabel = "Go to Provider Approval Audit Recovery Preview"
  RouteHref = "/provider-approval-audit-recovery-preview"
  Phase = 2431
  Title = "Provider Approval Audit Recovery Preview"
  Markers = @(
  'Provider approval audit recovery preview'
  'Provider approval audit recovery preview defines recovery paths for approval denial expiry revocation audit mismatch and redaction failure without retrying providers'
  'Provider approval audit recovery preview keeps recovery backend-owned and auditable'
  'Provider approval audit recovery preview blocks live retry and fallback execution'
  'Denied provider approval audit recovery paths remain blocked'
  'Provider approval audit recovery checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
