param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2087 Cockpit Audio Storage Contract Summary"
  ScriptFile = "smoke-codexforge-cockpit-audio-storage-contract-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-audio-storage-contract-summary"
  Route = "src\app\cockpit-audio-storage-contract-summary"
  CommandLabel = "Go to Cockpit Audio Storage Contract Summary"
  RouteHref = "/cockpit-audio-storage-contract-summary"
  Contract = "Audio"
  Markers = @("Cockpit audio storage contract summary", "Cockpit audio storage contract summary keeps the cockpit as the normal user surface", "Cockpit audio storage contract summary does not upload audio download audio store media synthesize voice clone voice transcribe audio persist transcripts persist captions persist audio persist consent persist rights create APIs create services call providers call models call connectors run commands or write files from the cockpit", "Cockpit audio storage contract summary shows audio intake schema metadata schema consent tagging rights tagging transcript link caption link redaction retention access policy handoff audit event frontend audio persistence blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit audio storage contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-audio-storage-contract-smoke-helper.ps1") @params
