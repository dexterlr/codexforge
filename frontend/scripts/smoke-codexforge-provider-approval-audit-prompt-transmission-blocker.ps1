param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2433 Provider Approval Audit Prompt Transmission Blocker"
  ScriptFile = "smoke-codexforge-provider-approval-audit-prompt-transmission-blocker.ps1"
  Domain = "provider-approval-audit-prompt-transmission-blocker"
  Route = "provider-approval-audit-prompt-transmission-blocker"
  CommandLabel = "Go to Provider Approval Audit Prompt Transmission Blocker"
  RouteHref = "/provider-approval-audit-prompt-transmission-blocker"
  Phase = 2433
  Title = "Provider Approval Audit Prompt Transmission Blocker"
  Markers = @(
  'Provider approval audit prompt transmission blocker'
  'Provider approval audit prompt transmission blocker verifies no prompt text is sent to providers models connectors routes workers or network calls'
  'Provider approval audit prompt transmission blocker keeps prompts synthetic review-only and local-state only'
  'Provider approval audit prompt transmission blocker blocks hidden send affordances'
  'Denied provider approval audit prompt transmission paths remain blocked'
  'Provider approval audit prompt transmission checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
