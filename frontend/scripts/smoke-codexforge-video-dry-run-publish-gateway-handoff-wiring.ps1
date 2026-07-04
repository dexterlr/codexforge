param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2839 Video Dry Run Publish Gateway Handoff Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-publish-gateway-handoff-wiring.ps1" `
  -Route "video-dry-run-publish-gateway-handoff-wiring" `
  -CommandLabel "Go to Video Dry Run Publish Gateway Handoff Wiring" `
  -RouteHref "/video-dry-run-publish-gateway-handoff-wiring" `
  -Phase "2839" `
  -Title "Video Dry Run Publish Gateway Handoff Wiring"
