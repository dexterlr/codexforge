param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 871 Model Context Sync Packet" `
  -ScriptFile "smoke-codexforge-model-context-sync-packet.ps1" `
  -Domain "src\lib\codexforge\model-context-sync-packet" `
  -Route "src\app\model-context-sync-packet" `
  -MainPanel "ModelContextSyncPacketPanel" `
  -CommandLabel "Go to Model Context Sync Packet" `
  -Modules @("model-context-sync-packet-model.ts", "index.ts") `
  -Components @("ModelContextSyncPacketPanel.tsx", "index.ts") `
  -Exports @("buildModelContextSyncPacketStableKey", "buildModelContextSyncPacket", "buildModelContextSyncPacketItems", "buildModelContextSyncPacketBoundary", "buildModelContextSyncPacketModel", "summarizeModelContextSyncPacket", "MODEL_CONTEXT_SYNC_PACKET_LANGUAGE") `
  -PhaseMarkers @("Model context sync packet", "Model context sync packet does not send prompts", "Context sync requires explicit operator approval", "All models receive approved shared brain context", "Denied context sync paths remain blocked", "Context sync packet checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model context sync packet does not send prompts", "Context sync requires explicit operator approval", "Denied context sync paths remain blocked") `
  -RouteHref "/model-context-sync-packet"

Write-Host "[OK] CodexForge Phase 871 Model context sync packet smoke passed."
