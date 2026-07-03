param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2445 Controlled Provider Audit Bound Packet Preview"
  ScriptFile = "smoke-codexforge-controlled-provider-audit-bound-packet-preview.ps1"
  Domain = "controlled-provider-audit-bound-packet-preview"
  Route = "controlled-provider-audit-bound-packet-preview"
  CommandLabel = "Go to Controlled Provider Audit Bound Packet Preview"
  RouteHref = "/controlled-provider-audit-bound-packet-preview"
  Phase = 2445
  Title = "Controlled Provider Audit Bound Packet Preview"
  Markers = @(
  'Controlled provider audit bound packet preview'
  'Controlled provider audit bound packet preview maps synthetic audit intent and audit result metadata into the controlled dry run candidate without writing audit logs'
  'Controlled provider audit bound packet preview keeps audit persistence backend-owned and review-only'
  'Controlled provider audit bound packet preview blocks unverifiable execution claims'
  'Denied controlled provider audit bound paths remain blocked'
  'Controlled provider audit bound checklist'
  )
}
& (Join-Path $PSScriptRoot "codexforge-controlled-provider-dry-run-smoke-helper.ps1") @params
