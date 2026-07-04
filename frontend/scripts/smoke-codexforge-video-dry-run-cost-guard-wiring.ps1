param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2854 Video Dry Run Cost Guard Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-cost-guard-wiring.ps1" `
  -Route "video-dry-run-cost-guard-wiring" `
  -CommandLabel "Go to Video Dry Run Cost Guard Wiring" `
  -RouteHref "/video-dry-run-cost-guard-wiring" `
  -Phase "2854" `
  -Title "Video Dry Run Cost Guard Wiring"
