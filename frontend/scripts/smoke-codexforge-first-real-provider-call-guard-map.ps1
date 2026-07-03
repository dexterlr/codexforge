param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2506 First Real Provider Call Guard Map"
  ScriptFile = "smoke-codexforge-first-real-provider-call-guard-map.ps1"
  Domain = "first-real-provider-call-guard-map"
  Route = "first-real-provider-call-guard-map"
  CommandLabel = "Go to First Real Provider Call Guard Map"
  RouteHref = "/first-real-provider-call-guard-map"
  Phase = 2506
  Title = "First Real Provider Call Guard Map"
  Markers = @(
  'First real provider call guard map'
  'First real provider call guard map defines mandatory guardrails before any future real provider call without implementing live provider execution'
  'First real provider call guard map does not call providers call models send prompts stream responses store credentials store tokens persist outputs create services or create APIs'
  'First real provider call guard map keeps provider execution blocked pending first approved provider trial'
  'Denied real provider call guard paths remain blocked'
  'First real provider call guard checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
