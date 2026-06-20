param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1016 Universal Builder Cockpit Trial Packet" `
  -ScriptFile "smoke-codexforge-universal-builder-cockpit-trial-packet.ps1" `
  -Domain "src\lib\codexforge\universal-builder-cockpit-trial-packet" `
  -Route "src\app\universal-builder-cockpit-trial-packet" `
  -MainPanel "UniversalBuilderCockpitTrialPacketPanel" `
  -CommandLabel "Go to Universal Builder Cockpit Trial Packet" `
  -Modules @("universal-builder-cockpit-trial-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildUniversalBuilderCockpitTrialPacketStableKey", "buildUniversalBuilderCockpitTrialPacket", "buildUniversalBuilderCockpitTrialPacketItems", "buildUniversalBuilderCockpitTrialPacketBoundary", "buildUniversalBuilderCockpitTrialPacketModel", "summarizeUniversalBuilderCockpitTrialPacket", "UNIVERSAL_BUILDER_COCKPIT_TRIAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Universal builder cockpit trial packet", "Universal builder cockpit trial packet does not run trials", "Universal builder cockpit trials require explicit operator approval", "Trial packets preserve shared context memory evidence and audit gates", "Denied universal builder cockpit trial paths remain blocked", "Universal builder cockpit trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Universal builder cockpit trial packet does not run trials", "Universal builder cockpit trials require explicit operator approval", "Denied universal builder cockpit trial paths remain blocked") `
  -RouteHref "/universal-builder-cockpit-trial-packet"

Write-Host "[OK] CodexForge Phase 1016 Universal Builder Cockpit Trial Packet smoke passed."
