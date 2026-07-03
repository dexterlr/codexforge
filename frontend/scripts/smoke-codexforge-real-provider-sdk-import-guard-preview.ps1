param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2516 Real Provider SDK Import Guard Preview"
  ScriptFile = "smoke-codexforge-real-provider-sdk-import-guard-preview.ps1"
  Domain = "real-provider-sdk-import-guard-preview"
  Route = "real-provider-sdk-import-guard-preview"
  CommandLabel = "Go to Real Provider SDK Import Guard Preview"
  RouteHref = "/real-provider-sdk-import-guard-preview"
  Phase = 2516
  Title = "Real Provider SDK Import Guard Preview"
  Markers = @(
  'Real provider SDK import guard preview'
  'Real provider SDK import guard preview defines SDK import isolation without importing SDKs initializing clients or creating provider clients'
  'Real provider SDK import guard preview keeps provider SDKs outside frontend diagnostics'
  'Real provider SDK import guard preview blocks SDK initialization'
  'Denied real provider SDK import paths remain blocked'
  'Real provider SDK import checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
