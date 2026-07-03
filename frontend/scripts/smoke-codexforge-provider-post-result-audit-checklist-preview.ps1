param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2421 Provider Post Result Audit Checklist Preview"
  ScriptFile = "smoke-codexforge-provider-post-result-audit-checklist-preview.ps1"
  Domain = "provider-post-result-audit-checklist-preview"
  Route = "provider-post-result-audit-checklist-preview"
  CommandLabel = "Go to Provider Post Result Audit Checklist Preview"
  RouteHref = "/provider-post-result-audit-checklist-preview"
  Phase = 2421
  Title = "Provider Post Result Audit Checklist Preview"
  Markers = @(
  'Provider post result audit checklist preview'
  'Provider post result audit checklist preview defines post-result audit checks using synthetic mock outputs only'
  'Provider post result audit checklist preview requires result safety redaction approval trace rejection and recovery states'
  'Provider post result audit checklist preview blocks automatic result acceptance'
  'Denied provider post result audit paths remain blocked'
  'Provider post result audit checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-approval-audit-enforcement-smoke-helper.ps1") @params
