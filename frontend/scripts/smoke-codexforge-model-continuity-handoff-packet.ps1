param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 852 Model Continuity Handoff Packet" `
  -ScriptFile "smoke-codexforge-model-continuity-handoff-packet.ps1" `
  -Domain "src\lib\codexforge\model-continuity-handoff-packet" `
  -Route "src\app\model-continuity-handoff-packet" `
  -MainPanel "ModelContinuityHandoffPacketPanel" `
  -CommandLabel "Go to Model Continuity Handoff Packet" `
  -Modules @("model-continuity-handoff-packet-model.ts", "index.ts") `
  -Components @("ModelContinuityHandoffPacketPanel.tsx", "index.ts") `
  -Exports @("buildModelContinuityHandoffPacketStableKey", "buildModelContinuityHandoffPacket", "buildModelContinuityHandoffPacketItems", "buildModelContinuityHandoffPacketBoundary", "buildModelContinuityHandoffPacketModel", "summarizeModelContinuityHandoffPacket", "MODEL_CONTINUITY_HANDOFF_PACKET_LANGUAGE") `
  -PhaseMarkers @("Model continuity handoff packet", "Model continuity handoff packet does not transfer live prompts", "Model handoff requires explicit operator approval", "Models can pick up from shared task memory", "Denied model handoff paths remain blocked", "Continuity handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model continuity handoff packet does not transfer live prompts", "Model handoff requires explicit operator approval", "Denied model handoff paths remain blocked") `
  -RouteHref "/model-continuity-handoff-packet"

Write-Host "[OK] CodexForge Phase 852 Model continuity handoff packet smoke passed."
