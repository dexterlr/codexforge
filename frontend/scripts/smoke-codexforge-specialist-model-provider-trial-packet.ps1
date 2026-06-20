param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 913 Specialist Model Provider Trial Packet" `
  -ScriptFile "smoke-codexforge-specialist-model-provider-trial-packet.ps1" `
  -Domain "src\lib\codexforge\specialist-model-provider-trial-packet" `
  -Route "src\app\specialist-model-provider-trial-packet" `
  -MainPanel "SpecialistModelProviderTrialPacketPanel" `
  -CommandLabel "Go to Specialist Model Provider Trial Packet" `
  -Modules @("specialist-model-provider-trial-packet-model.ts", "index.ts") `
  -Components @("SpecialistModelProviderTrialPacketPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistModelProviderTrialPacketStableKey", "buildSpecialistModelProviderTrialPacket", "buildSpecialistModelProviderTrialPacketItems", "buildSpecialistModelProviderTrialPacketBoundary", "buildSpecialistModelProviderTrialPacketModel", "summarizeSpecialistModelProviderTrialPacket", "SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Specialist model provider trial packet", "Specialist model provider trial packet does not call specialist models", "Specialist model trials require explicit operator approval", "Specialist models use shared CodexForge memory and knowledge", "Denied specialist model trial paths remain blocked", "Specialist model provider trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist model provider trial packet does not call specialist models", "Specialist model trials require explicit operator approval", "Denied specialist model trial paths remain blocked") `
  -RouteHref "/specialist-model-provider-trial-packet"

Write-Host "[OK] CodexForge Phase 913 specialist model provider trial packet smoke passed."
