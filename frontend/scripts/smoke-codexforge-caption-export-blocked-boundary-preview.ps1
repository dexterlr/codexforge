param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1974 Caption Export Blocked Boundary Preview"
  ScriptFile = "smoke-codexforge-caption-export-blocked-boundary-preview.ps1"
  Domain = "src\lib\codexforge\caption-export-blocked-boundary-preview"
  Route = "src\app\caption-export-blocked-boundary-preview"
  CommandLabel = "Go to Caption Export Blocked Boundary Preview"
  RouteHref = "/caption-export-blocked-boundary-preview"
  Markers = @("Caption export blocked boundary preview", "Caption export blocked boundary preview blocks frontend subtitle export frontend caption file write frontend transcription frontend download frontend upload frontend artifact creation and frontend publishing", "Caption export blocked boundary preview requires backend-owned caption workflow export service rights review approval capture and operator approval", "Caption export blocked boundary preview shows denied caption export denied subtitle file write denied transcription denied download denied artifact creation denied publish and approval requirement", "Denied caption export paths remain blocked", "Caption export blocked boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

