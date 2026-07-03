param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2508 Real Provider Execution Lock Preview"
  ScriptFile = "smoke-codexforge-real-provider-execution-lock-preview.ps1"
  Domain = "real-provider-execution-lock-preview"
  Route = "real-provider-execution-lock-preview"
  CommandLabel = "Go to Real Provider Execution Lock Preview"
  RouteHref = "/real-provider-execution-lock-preview"
  Phase = 2508
  Title = "Real Provider Execution Lock Preview"
  Markers = @(
  'Real provider execution lock preview'
  'Real provider execution lock preview defines a locked execution state without creating runtime locks queues workers services or route handlers'
  'Real provider execution lock preview keeps real execution unavailable by default'
  'Real provider execution lock preview blocks hidden execution affordances'
  'Denied real provider execution lock paths remain blocked'
  'Real provider execution lock checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
