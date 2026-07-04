param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2832 Video Dry Run Audio Storage Handoff Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-audio-storage-handoff-wiring.ps1" `
  -Route "video-dry-run-audio-storage-handoff-wiring" `
  -CommandLabel "Go to Video Dry Run Audio Storage Handoff Wiring" `
  -RouteHref "/video-dry-run-audio-storage-handoff-wiring" `
  -Phase "2832" `
  -Title "Video Dry Run Audio Storage Handoff Wiring"
