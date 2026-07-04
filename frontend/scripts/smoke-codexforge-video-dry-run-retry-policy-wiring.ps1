param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2851 Video Dry Run Retry Policy Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-retry-policy-wiring.ps1" `
  -Route "video-dry-run-retry-policy-wiring" `
  -CommandLabel "Go to Video Dry Run Retry Policy Wiring" `
  -RouteHref "/video-dry-run-retry-policy-wiring" `
  -Phase "2851" `
  -Title "Video Dry Run Retry Policy Wiring"
