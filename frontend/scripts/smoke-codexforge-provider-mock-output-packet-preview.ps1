param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2379 Provider Mock Output Packet Preview"
  ScriptFile = "smoke-codexforge-provider-mock-output-packet-preview.ps1"
  Domain = "provider-mock-output-packet-preview"
  Route = "provider-mock-output-packet-preview"
  CommandLabel = "Go to Provider Mock Output Packet Preview"
  RouteHref = "/provider-mock-output-packet-preview"
  Phase = 2379
  Title = "Provider Mock Output Packet Preview"
  Markers = @(
  'Provider mock output packet preview',
  'Provider mock output packet preview defines synthetic mock output payload shape without receiving model output or streaming tokens',
  'Provider mock output packet preview uses deterministic fake result metadata only and does not persist outputs',
  'Provider mock output packet preview keeps provider output handling backend-owned',
  'Denied provider mock output paths remain blocked',
  'Provider mock output checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-provider-mock-result-harness-smoke-helper.ps1") @params
