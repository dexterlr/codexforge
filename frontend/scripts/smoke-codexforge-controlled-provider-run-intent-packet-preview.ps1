param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2443 Controlled Provider Run Intent Packet Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-run-intent-packet-preview.ps1"
  Domain = "controlled-provider-run-intent-packet-preview"
  Route = "controlled-provider-run-intent-packet-preview"
  CommandLabel = "Go to Controlled Provider Run Intent Packet Preview"
  RouteHref = "/controlled-provider-run-intent-packet-preview"
  Phase = 2443
  Title = "Controlled Provider Run Intent Packet Preview"
  Markers = @(
  'Controlled provider run intent packet preview'
  'Controlled provider run intent packet preview defines synthetic intent payload shape without sending prompts or calling providers'
  'Controlled provider run intent packet preview includes provider family privacy class cost class fixture id approval state audit state and denied execution state'
  'Controlled provider run intent packet preview keeps intent review-only'
  'Denied controlled provider run intent paths remain blocked'
  'Controlled provider run intent checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
