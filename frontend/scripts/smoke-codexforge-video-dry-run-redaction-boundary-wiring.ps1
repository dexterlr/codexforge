param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2849 Video Dry Run Redaction Boundary Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-redaction-boundary-wiring.ps1" `
  -Route "video-dry-run-redaction-boundary-wiring" `
  -CommandLabel "Go to Video Dry Run Redaction Boundary Wiring" `
  -RouteHref "/video-dry-run-redaction-boundary-wiring" `
  -Phase "2849" `
  -Title "Video Dry Run Redaction Boundary Wiring"
