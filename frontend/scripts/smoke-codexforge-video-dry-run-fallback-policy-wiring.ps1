param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2852 Video Dry Run Fallback Policy Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-fallback-policy-wiring.ps1" `
  -Route "video-dry-run-fallback-policy-wiring" `
  -CommandLabel "Go to Video Dry Run Fallback Policy Wiring" `
  -RouteHref "/video-dry-run-fallback-policy-wiring" `
  -Phase "2852" `
  -Title "Video Dry Run Fallback Policy Wiring"
