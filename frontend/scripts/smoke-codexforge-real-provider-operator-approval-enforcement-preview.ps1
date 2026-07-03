param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2510 Real Provider Operator Approval Enforcement Preview"
  ScriptFile = "smoke-codexforge-real-provider-operator-approval-enforcement-preview.ps1"
  Domain = "real-provider-operator-approval-enforcement-preview"
  Route = "real-provider-operator-approval-enforcement-preview"
  CommandLabel = "Go to Real Provider Operator Approval Enforcement Preview"
  RouteHref = "/real-provider-operator-approval-enforcement-preview"
  Phase = 2510
  Title = "Real Provider Operator Approval Enforcement Preview"
  Markers = @(
  'Real provider operator approval enforcement preview'
  'Real provider operator approval enforcement preview defines explicit operator approval enforcement without approving or executing provider actions'
  'Real provider operator approval enforcement preview requires approval before any future provider trial'
  'Real provider operator approval enforcement preview blocks unapproved execution'
  'Denied real provider approval enforcement paths remain blocked'
  'Real provider approval enforcement checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
