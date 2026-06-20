param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 926 Local Model Bridge Context Packet" `
  -ScriptFile "smoke-codexforge-local-model-bridge-context-packet.ps1" `
  -Domain "src\lib\codexforge\local-model-bridge-context-packet" `
  -Route "src\app\local-model-bridge-context-packet" `
  -MainPanel "LocalModelBridgeContextPacketPanel" `
  -CommandLabel "Go to Local Model Bridge Context Packet" `
  -Modules @("local-model-bridge-context-packet-model.ts", "index.ts") `
  -Components @("LocalModelBridgeContextPacketPanel.tsx", "index.ts") `
  -Exports @("buildLocalModelBridgeContextPacketStableKey", "buildLocalModelBridgeContextPacket", "buildLocalModelBridgeContextPacketItems", "buildLocalModelBridgeContextPacketBoundary", "buildLocalModelBridgeContextPacketModel", "summarizeLocalModelBridgeContextPacket", "LOCAL_MODEL_BRIDGE_CONTEXT_PACKET_LANGUAGE") `
  -PhaseMarkers @("Local model bridge context packet", "Local model bridge context packet does not send prompts", "Local bridge context sync requires explicit operator approval", "Context packets preserve shared CodexForge brain state", "Denied local bridge context paths remain blocked", "Local bridge context checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local model bridge context packet does not send prompts", "Local bridge context sync requires explicit operator approval", "Denied local bridge context paths remain blocked") `
  -RouteHref "/local-model-bridge-context-packet"

Write-Host "[OK] CodexForge Phase 926 Local model bridge context packet smoke passed."
