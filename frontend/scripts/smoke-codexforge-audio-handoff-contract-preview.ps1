param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2084 Audio Handoff Contract Preview"
  ScriptFile = "smoke-codexforge-audio-handoff-contract-preview.ps1"
  Domain = "src\lib\codexforge\audio-handoff-contract-preview"
  Route = "src\app\audio-handoff-contract-preview"
  CommandLabel = "Go to Audio Handoff Contract Preview"
  RouteHref = "/audio-handoff-contract-preview"
  Contract = "Audio"
  Markers = @("Audio handoff contract preview", "Audio handoff contract preview does not export packets download files create artifacts or persist handoffs from the UI", "Audio handoff contract preview requires backend-owned handoff workflow artifact storage approval capture and audit trail", "Audio handoff contract preview shows simulated handoff packet simulated caption workflow target simulated render workflow target simulated approval gate simulated denied frontend handoff persistence", "Denied audio handoff paths remain blocked", "Audio handoff contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
