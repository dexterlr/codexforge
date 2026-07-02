param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2077 Audio Consent Tagging Contract Preview"
  ScriptFile = "smoke-codexforge-audio-consent-tagging-contract-preview.ps1"
  Domain = "src\lib\codexforge\audio-consent-tagging-contract-preview"
  Route = "src\app\audio-consent-tagging-contract-preview"
  CommandLabel = "Go to Audio Consent Tagging Contract Preview"
  RouteHref = "/audio-consent-tagging-contract-preview"
  Contract = "Audio"
  Markers = @("Audio consent tagging contract preview", "Audio consent tagging contract preview does not clear consent approve likeness use persist consent or synthesize audio from the UI", "Audio consent tagging contract preview requires backend-owned consent review evidence capture approval capture and audit trail", "Audio consent tagging contract preview shows simulated consent tag simulated speaker approval note simulated likeness note simulated expiration note simulated denied frontend consent persistence", "Denied audio consent tagging paths remain blocked", "Audio consent tagging contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
