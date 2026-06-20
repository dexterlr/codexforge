param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 912 Pro Model Provider Trial Packet" `
  -ScriptFile "smoke-codexforge-pro-model-provider-trial-packet.ps1" `
  -Domain "src\lib\codexforge\pro-model-provider-trial-packet" `
  -Route "src\app\pro-model-provider-trial-packet" `
  -MainPanel "ProModelProviderTrialPacketPanel" `
  -CommandLabel "Go to Pro Model Provider Trial Packet" `
  -Modules @("pro-model-provider-trial-packet-model.ts", "index.ts") `
  -Components @("ProModelProviderTrialPacketPanel.tsx", "index.ts") `
  -Exports @("buildProModelProviderTrialPacketStableKey", "buildProModelProviderTrialPacket", "buildProModelProviderTrialPacketItems", "buildProModelProviderTrialPacketBoundary", "buildProModelProviderTrialPacketModel", "summarizeProModelProviderTrialPacket", "PRO_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Pro model provider trial packet", "Pro model provider trial packet does not call pro models", "Pro model trials require explicit operator approval", "Pro models use shared CodexForge memory and knowledge", "Denied pro model trial paths remain blocked", "Pro model provider trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Pro model provider trial packet does not call pro models", "Pro model trials require explicit operator approval", "Denied pro model trial paths remain blocked") `
  -RouteHref "/pro-model-provider-trial-packet"

Write-Host "[OK] CodexForge Phase 912 pro model provider trial packet smoke passed."
