param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1000 Universal Builder MVP Trial Packet" `
  -ScriptFile "smoke-codexforge-universal-builder-mvp-trial-packet.ps1" `
  -Domain "src\lib\codexforge\universal-builder-mvp-trial-packet" `
  -Route "src\app\universal-builder-mvp-trial-packet" `
  -MainPanel "UniversalBuilderMvpTrialPacketPanel" `
  -CommandLabel "Go to Universal Builder MVP Trial Packet" `
  -Modules @("universal-builder-mvp-trial-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildUniversalBuilderMvpTrialPacketStableKey", "buildUniversalBuilderMvpTrialPacket", "buildUniversalBuilderMvpTrialPacketItems", "buildUniversalBuilderMvpTrialPacketBoundary", "buildUniversalBuilderMvpTrialPacketModel", "summarizeUniversalBuilderMvpTrialPacket", "UNIVERSAL_BUILDER_MVP_TRIAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Universal builder MVP trial packet", "Universal builder MVP trial packet does not run trials", "Universal builder trials require explicit operator approval", "Trial packets preserve shared context memory evidence and audit gates", "Denied universal builder trial paths remain blocked", "Universal builder MVP trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Universal builder MVP trial packet does not run trials", "Universal builder trials require explicit operator approval", "Denied universal builder trial paths remain blocked") `
  -RouteHref "/universal-builder-mvp-trial-packet"

Write-Host "[OK] CodexForge Phase 1000 Universal Builder MVP Trial Packet smoke passed."
