param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2080 Audio Caption Link Contract Preview"
  ScriptFile = "smoke-codexforge-audio-caption-link-contract-preview.ps1"
  Domain = "src\lib\codexforge\audio-caption-link-contract-preview"
  Route = "src\app\audio-caption-link-contract-preview"
  CommandLabel = "Go to Audio Caption Link Contract Preview"
  RouteHref = "/audio-caption-link-contract-preview"
  Contract = "Audio"
  Markers = @("Audio caption link contract preview", "Audio caption link contract preview does not burn captions export subtitles persist captions or write subtitle files from the UI", "Audio caption link contract preview requires backend-owned caption workflow caption storage approval capture and audit trail", "Audio caption link contract preview shows simulated caption reference simulated timing note simulated accessibility note simulated export hold simulated denied frontend caption persistence", "Denied audio caption link paths remain blocked", "Audio caption link contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
