param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 927 Local Model Bridge Evidence Packet" `
  -ScriptFile "smoke-codexforge-local-model-bridge-evidence-packet.ps1" `
  -Domain "src\lib\codexforge\local-model-bridge-evidence-packet" `
  -Route "src\app\local-model-bridge-evidence-packet" `
  -MainPanel "LocalModelBridgeEvidencePacketPanel" `
  -CommandLabel "Go to Local Model Bridge Evidence Packet" `
  -Modules @("local-model-bridge-evidence-packet-model.ts", "index.ts") `
  -Components @("LocalModelBridgeEvidencePacketPanel.tsx", "index.ts") `
  -Exports @("buildLocalModelBridgeEvidencePacketStableKey", "buildLocalModelBridgeEvidencePacket", "buildLocalModelBridgeEvidencePacketItems", "buildLocalModelBridgeEvidencePacketBoundary", "buildLocalModelBridgeEvidencePacketModel", "summarizeLocalModelBridgeEvidencePacket", "LOCAL_MODEL_BRIDGE_EVIDENCE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Local model bridge evidence packet", "Local model bridge evidence packet does not persist outputs", "Local bridge evidence capture requires explicit operator approval", "Evidence packets return through shared result review", "Denied local bridge evidence paths remain blocked", "Local bridge evidence checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local model bridge evidence packet does not persist outputs", "Local bridge evidence capture requires explicit operator approval", "Denied local bridge evidence paths remain blocked") `
  -RouteHref "/local-model-bridge-evidence-packet"

Write-Host "[OK] CodexForge Phase 927 Local model bridge evidence packet smoke passed."
