param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2415 Provider Operator Approval Gate Preview"
  ScriptFile = "smoke-codexforge-provider-operator-approval-gate-preview.ps1"
  Domain = "provider-operator-approval-gate-preview"
  Route = "provider-operator-approval-gate-preview"
  CommandLabel = "Go to Provider Operator Approval Gate Preview"
  RouteHref = "/provider-operator-approval-gate-preview"
  Phase = 2415
  Title = "Provider Operator Approval Gate Preview"
  Markers = @(
  'Provider operator approval gate preview'
  'Provider operator approval gate preview defines explicit operator approval gate requirements without enabling provider execution'
  'Provider operator approval gate preview does not verify identity persist approvals authorize provider accounts or call providers'
  'Provider operator approval gate preview keeps all actions blocked'
  'Denied provider operator approval gate paths remain blocked'
  'Provider operator approval gate checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
