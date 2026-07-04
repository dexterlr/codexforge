param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2845 Video Dry Run Provider Import Guard Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-provider-import-guard-wiring.ps1" `
  -Route "video-dry-run-provider-import-guard-wiring" `
  -CommandLabel "Go to Video Dry Run Provider Import Guard Wiring" `
  -RouteHref "/video-dry-run-provider-import-guard-wiring" `
  -Phase "2845" `
  -Title "Video Dry Run Provider Import Guard Wiring"
