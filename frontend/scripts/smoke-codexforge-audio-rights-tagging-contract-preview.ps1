param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2078 Audio Rights Tagging Contract Preview"
  ScriptFile = "smoke-codexforge-audio-rights-tagging-contract-preview.ps1"
  Domain = "src\lib\codexforge\audio-rights-tagging-contract-preview"
  Route = "src\app\audio-rights-tagging-contract-preview"
  CommandLabel = "Go to Audio Rights Tagging Contract Preview"
  RouteHref = "/audio-rights-tagging-contract-preview"
  Contract = "Audio"
  Markers = @("Audio rights tagging contract preview", "Audio rights tagging contract preview does not clear music rights approve usage persist rights or publish content from the UI", "Audio rights tagging contract preview requires backend-owned rights workflow evidence capture approval capture and audit trail", "Audio rights tagging contract preview shows simulated audio rights tag simulated license note simulated attribution need simulated approval state simulated denied frontend rights persistence", "Denied audio rights tagging paths remain blocked", "Audio rights tagging contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
