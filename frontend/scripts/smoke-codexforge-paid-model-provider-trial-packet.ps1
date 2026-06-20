param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 911 Paid Model Provider Trial Packet" `
  -ScriptFile "smoke-codexforge-paid-model-provider-trial-packet.ps1" `
  -Domain "src\lib\codexforge\paid-model-provider-trial-packet" `
  -Route "src\app\paid-model-provider-trial-packet" `
  -MainPanel "PaidModelProviderTrialPacketPanel" `
  -CommandLabel "Go to Paid Model Provider Trial Packet" `
  -Modules @("paid-model-provider-trial-packet-model.ts", "index.ts") `
  -Components @("PaidModelProviderTrialPacketPanel.tsx", "index.ts") `
  -Exports @("buildPaidModelProviderTrialPacketStableKey", "buildPaidModelProviderTrialPacket", "buildPaidModelProviderTrialPacketItems", "buildPaidModelProviderTrialPacketBoundary", "buildPaidModelProviderTrialPacketModel", "summarizePaidModelProviderTrialPacket", "PAID_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Paid model provider trial packet", "Paid model provider trial packet does not call paid models", "Paid model trials require explicit operator approval", "Paid models use shared CodexForge memory and knowledge", "Denied paid model trial paths remain blocked", "Paid model provider trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Paid model provider trial packet does not call paid models", "Paid model trials require explicit operator approval", "Denied paid model trial paths remain blocked") `
  -RouteHref "/paid-model-provider-trial-packet"

Write-Host "[OK] CodexForge Phase 911 paid model provider trial packet smoke passed."
