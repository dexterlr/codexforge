param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2531 Real Provider Call Fixture Safety Guard"
  ScriptFile = "smoke-codexforge-real-provider-call-fixture-safety-guard.ps1"
  Domain = "real-provider-call-fixture-safety-guard"
  Route = "real-provider-call-fixture-safety-guard"
  CommandLabel = "Go to Real Provider Call Fixture Safety Guard"
  RouteHref = "/real-provider-call-fixture-safety-guard"
  Phase = 2531
  Title = "Real Provider Call Fixture Safety Guard"
  Markers = @(
  'Real provider call fixture safety guard'
  'Real provider call fixture safety guard verifies real provider call guard fixtures remain synthetic with no real prompts credentials tokens outputs provider payloads or user secrets'
  'Real provider call fixture safety guard preserves backend execution controlled dry run approval audit mock result dry run provider adapter and gateway boundaries'
  'Real provider call fixture safety guard blocks real data capture'
  'Denied real provider fixture safety paths remain blocked'
  'Real provider fixture safety checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-real-provider-call-guard-smoke-helper.ps1") @params
