param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2208 Interactive UX Contract Summary"
  ScriptFile = "smoke-codexforge-interactive-ux-contract-summary.ps1"
  Domain = "src\lib\codexforge\interactive-ux-contract-summary"
  Route = "src\app\interactive-ux-contract-summary"
  CommandLabel = "Go to Interactive UX Contract Summary"
  RouteHref = "/interactive-ux-contract-summary"
  Markers = @("Interactive UX contract summary", "Interactive UX contract summary states that the UX is clickable local state only and not backend wired", "Interactive UX contract summary does not enable persistence upload download render export publish schedule provider calls model calls connector calls or command execution", "Interactive UX contract summary maps each visible product action to its backend contract prerequisite", "Denied UX contract paths remain blocked", "Interactive UX contract summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
