param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-asset-storage-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgeAssetStorageBackendWiringSmoke `
  -SmokeName "Phase 2636 Asset Storage Metadata Envelope Wiring" `
  -ScriptFile "smoke-codexforge-asset-storage-metadata-envelope-wiring.ps1" `
  -Route "asset-storage-metadata-envelope-wiring" `
  -CommandLabel "Go to Asset Storage Metadata Envelope Wiring" `
  -RouteHref "/asset-storage-metadata-envelope-wiring" `
  -Phase "2636" `
  -Title "Asset Storage Metadata Envelope Wiring" `
  -Markers @(
  "2634?2665 ? Asset Storage Backend Wiring Mega Batch v1",
  "Asset Storage Backend Wiring",
  "review-only asset storage diagnostic",
  "blocked asset storage execution",
  "protected asset storage boundary",
  "asset storage contract",
  "asset metadata envelope",
  "asset validation boundary",
  "asset classification boundary",
  "asset path policy",
  "asset namespace guard",
  "upload blocked",
  "download blocked",
  "storage mutation blocked",
  "asset persistence blocked",
  "no live asset storage",
  "no upload/download",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no storage provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no render/export/publish/schedule",
  "no command execution from the app",
  "no service creation",
  "no API creation from frontend",
  "no queue dispatch",
  "no worker dispatch",
  "no process spawning",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "asset state",
  "asset recovery",
  "operator review",
  "completion guard",
  "next likely batch: 2666?2697 ? Audio Storage Backend Wiring"
)
