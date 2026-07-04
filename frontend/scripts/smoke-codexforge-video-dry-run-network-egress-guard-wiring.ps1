param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2846 Video Dry Run Network Egress Guard Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-network-egress-guard-wiring.ps1" `
  -Route "video-dry-run-network-egress-guard-wiring" `
  -CommandLabel "Go to Video Dry Run Network Egress Guard Wiring" `
  -RouteHref "/video-dry-run-network-egress-guard-wiring" `
  -Phase "2846" `
  -Title "Video Dry Run Network Egress Guard Wiring"
