param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$params = @{
  SmokeName = "Phase 2256 Audio Storage Wiring Boundary Preview"
  ScriptFile = "smoke-codexforge-audio-storage-wiring-boundary-preview.ps1"
  Domain = "audio-storage-wiring-boundary-preview"
  Route = "audio-storage-wiring-boundary-preview"
  CommandLabel = "Go to Audio Storage Wiring Boundary Preview"
  RouteHref = "/audio-storage-wiring-boundary-preview"
  Markers = @("Audio Storage Wiring Boundary", "audio storage boundary", "No upload", "No download", "No frontend persistence")
}
& (Join-Path $PSScriptRoot "codexforge-backend-wiring-boundary-smoke-helper.ps1") @params


