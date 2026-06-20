param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 910 Free Model Provider Trial Packet" `
  -ScriptFile "smoke-codexforge-free-model-provider-trial-packet.ps1" `
  -Domain "src\lib\codexforge\free-model-provider-trial-packet" `
  -Route "src\app\free-model-provider-trial-packet" `
  -MainPanel "FreeModelProviderTrialPacketPanel" `
  -CommandLabel "Go to Free Model Provider Trial Packet" `
  -Modules @("free-model-provider-trial-packet-model.ts", "index.ts") `
  -Components @("FreeModelProviderTrialPacketPanel.tsx", "index.ts") `
  -Exports @("buildFreeModelProviderTrialPacketStableKey", "buildFreeModelProviderTrialPacket", "buildFreeModelProviderTrialPacketItems", "buildFreeModelProviderTrialPacketBoundary", "buildFreeModelProviderTrialPacketModel", "summarizeFreeModelProviderTrialPacket", "FREE_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Free model provider trial packet", "Free model provider trial packet does not call free models", "Free model trials require explicit operator approval", "Free models use shared CodexForge memory and knowledge", "Denied free model trial paths remain blocked", "Free model provider trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Free model provider trial packet does not call free models", "Free model trials require explicit operator approval", "Denied free model trial paths remain blocked") `
  -RouteHref "/free-model-provider-trial-packet"

Write-Host "[OK] CodexForge Phase 910 free model provider trial packet smoke passed."
