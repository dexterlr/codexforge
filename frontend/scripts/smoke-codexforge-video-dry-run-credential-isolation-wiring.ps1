param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2843 Video Dry Run Credential Isolation Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-credential-isolation-wiring.ps1" `
  -Route "video-dry-run-credential-isolation-wiring" `
  -CommandLabel "Go to Video Dry Run Credential Isolation Wiring" `
  -RouteHref "/video-dry-run-credential-isolation-wiring" `
  -Phase "2843" `
  -Title "Video Dry Run Credential Isolation Wiring"
