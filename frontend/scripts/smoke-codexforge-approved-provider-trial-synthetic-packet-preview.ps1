param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2554 Approved Provider Trial Synthetic Packet Preview"
  ScriptFile = "smoke-codexforge-approved-provider-trial-synthetic-packet-preview.ps1"
  Domain = "approved-provider-trial-synthetic-packet-preview"
  Route = "approved-provider-trial-synthetic-packet-preview"
  CommandLabel = "Go to Approved Provider Trial Synthetic Packet Preview"
  RouteHref = "/approved-provider-trial-synthetic-packet-preview"
  Phase = 2554
  Title = "Approved Provider Trial Synthetic Packet Preview"
  Markers = @(
  'Approved provider trial synthetic packet preview'
  'Approved provider trial synthetic packet preview defines deterministic trial packet shape without provider calls model calls prompt sending or response capture'
  'Approved provider trial synthetic packet preview keeps trial packet review-only and synthetic'
  'Approved provider trial synthetic packet preview blocks real data capture'
  'Denied approved provider synthetic packet paths remain blocked'
  'Approved provider synthetic packet checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-first-approved-provider-trial-smoke-helper.ps1") @params
