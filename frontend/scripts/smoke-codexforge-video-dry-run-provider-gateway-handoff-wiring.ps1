param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2830 Video Dry Run Provider Gateway Handoff Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-provider-gateway-handoff-wiring.ps1" `
  -Route "video-dry-run-provider-gateway-handoff-wiring" `
  -CommandLabel "Go to Video Dry Run Provider Gateway Handoff Wiring" `
  -RouteHref "/video-dry-run-provider-gateway-handoff-wiring" `
  -Phase "2830" `
  -Title "Video Dry Run Provider Gateway Handoff Wiring"
