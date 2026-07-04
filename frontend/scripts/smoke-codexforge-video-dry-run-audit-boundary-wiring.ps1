param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2847 Video Dry Run Audit Boundary Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-audit-boundary-wiring.ps1" `
  -Route "video-dry-run-audit-boundary-wiring" `
  -CommandLabel "Go to Video Dry Run Audit Boundary Wiring" `
  -RouteHref "/video-dry-run-audit-boundary-wiring" `
  -Phase "2847" `
  -Title "Video Dry Run Audit Boundary Wiring"
