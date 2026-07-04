param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2831 Video Dry Run Asset Storage Handoff Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-asset-storage-handoff-wiring.ps1" `
  -Route "video-dry-run-asset-storage-handoff-wiring" `
  -CommandLabel "Go to Video Dry Run Asset Storage Handoff Wiring" `
  -RouteHref "/video-dry-run-asset-storage-handoff-wiring" `
  -Phase "2831" `
  -Title "Video Dry Run Asset Storage Handoff Wiring"
