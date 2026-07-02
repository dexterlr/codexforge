param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2220 Holographic Command Grid Preview"
  ScriptFile = "smoke-codexforge-holographic-command-grid-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Holographic Command Grid Preview"
  RouteHref = "/holographic-command-grid-preview"
  Markers = @("Holographic command grid preview", "Holographic command grid preview adds a premium command grid for project script storyboard assets audio captions rights approvals render export and publish areas", "Holographic command grid preview uses deterministic synthetic data and local state only with no backend calls or persistence", "Holographic command grid preview keeps all action cards non-executing", "Denied holographic command grid execution paths remain blocked", "Holographic command grid checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
