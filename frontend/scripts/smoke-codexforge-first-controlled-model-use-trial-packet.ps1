param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 888 First Controlled Model-Use Trial Packet" `
  -ScriptFile "smoke-codexforge-first-controlled-model-use-trial-packet.ps1" `
  -Domain "src\lib\codexforge\first-controlled-model-use-trial-packet" `
  -Route "src\app\first-controlled-model-use-trial-packet" `
  -MainPanel "FirstControlledModelUseTrialPacketPanel" `
  -CommandLabel "Go to First Controlled Model-Use Trial Packet" `
  -Modules @("first-controlled-model-use-trial-packet-model.ts", "index.ts") `
  -Components @("FirstControlledModelUseTrialPacketPanel.tsx", "index.ts") `
  -Exports @("buildFirstControlledModelUseTrialPacketStableKey", "buildFirstControlledModelUseTrialPacket", "buildFirstControlledModelUseTrialPacketItems", "buildFirstControlledModelUseTrialPacketBoundary", "buildFirstControlledModelUseTrialPacketModel", "summarizeFirstControlledModelUseTrialPacket", "FIRST_CONTROLLED_MODEL_USE_TRIAL_PACKET_LANGUAGE") `
  -PhaseMarkers @("First controlled model-use trial packet", "First controlled model-use trial packet does not call models", "First controlled model use requires explicit operator approval", "Trial packets sync shared memory and knowledge", "Denied model-use trial paths remain blocked", "Controlled model-use trial checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "First controlled model-use trial packet does not call models", "First controlled model use requires explicit operator approval", "Denied model-use trial paths remain blocked") `
  -RouteHref "/first-controlled-model-use-trial-packet"

Write-Host "[OK] CodexForge Phase 888 First controlled model-use trial packet smoke passed."
