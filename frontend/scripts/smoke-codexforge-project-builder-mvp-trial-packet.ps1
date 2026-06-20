param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 968 Project Builder MVP Trial Packet" `
  -ScriptFile "smoke-codexforge-project-builder-mvp-trial-packet.ps1" `
  -Domain "src\lib\codexforge\project-builder-mvp-trial-packet" `
  -Route "src\app\project-builder-mvp-trial-packet" `
  -MainPanel "ProjectBuilderMvpTrialPacketPanel" `
  -CommandLabel "Go to Project Builder MVP Trial Packet" `
  -Modules @("project-builder-mvp-trial-packet-model.ts", "index.ts") `
  -Components @("ProjectBuilderMvpTrialPacketPanel.tsx", "index.ts") `
  -Exports @("buildProjectBuilderMvpTrialPacketStableKey", "buildProjectBuilderMvpTrialPacket", "buildProjectBuilderMvpTrialPacketItems", "buildProjectBuilderMvpTrialPacketBoundary", "buildProjectBuilderMvpTrialPacketModel", "summarizeProjectBuilderMvpTrialPacket", "PROJECT_BUILDER_MVP_TRIAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("Project builder MVP trial packet", "Project builder MVP trial packet does not run trials", "Project builder trials require explicit operator approval", "Trial packets preserve shared context memory evidence and audit gates", "Denied project builder trial paths remain blocked", "Project builder MVP trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project builder MVP trial packet does not run trials", "Project builder trials require explicit operator approval", "Denied project builder trial paths remain blocked") `
  -RouteHref "/project-builder-mvp-trial-packet"

Write-Host "[OK] CodexForge Phase 968 Project builder MVP trial packet smoke passed."
