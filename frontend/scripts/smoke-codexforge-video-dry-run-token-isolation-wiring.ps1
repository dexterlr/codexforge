param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2844 Video Dry Run Token Isolation Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-token-isolation-wiring.ps1" `
  -Route "video-dry-run-token-isolation-wiring" `
  -CommandLabel "Go to Video Dry Run Token Isolation Wiring" `
  -RouteHref "/video-dry-run-token-isolation-wiring" `
  -Phase "2844" `
  -Title "Video Dry Run Token Isolation Wiring"
