param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2853 Video Dry Run Rate Guard Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-rate-guard-wiring.ps1" `
  -Route "video-dry-run-rate-guard-wiring" `
  -CommandLabel "Go to Video Dry Run Rate Guard Wiring" `
  -RouteHref "/video-dry-run-rate-guard-wiring" `
  -Phase "2853" `
  -Title "Video Dry Run Rate Guard Wiring"
