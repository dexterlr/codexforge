param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2420 Provider Preflight Approval Checklist Preview"
  ScriptFile = "smoke-codexforge-provider-preflight-approval-checklist-preview.ps1"
  Domain = "provider-preflight-approval-checklist-preview"
  Route = "provider-preflight-approval-checklist-preview"
  CommandLabel = "Go to Provider Preflight Approval Checklist Preview"
  RouteHref = "/provider-preflight-approval-checklist-preview"
  Phase = 2420
  Title = "Provider Preflight Approval Checklist Preview"
  Markers = @(
  'Provider preflight approval checklist preview'
  'Provider preflight approval checklist preview defines preflight checks without executing provider calls or sending prompts'
  'Provider preflight approval checklist preview requires approval decision audit intent privacy class redaction scope cost class and denial state'
  'Provider preflight approval checklist preview keeps execution blocked'
  'Denied provider preflight approval paths remain blocked'
  'Provider preflight approval checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
