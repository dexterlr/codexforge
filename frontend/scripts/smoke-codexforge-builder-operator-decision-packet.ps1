param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1014 Builder Operator Decision Packet" `
  -ScriptFile "smoke-codexforge-builder-operator-decision-packet.ps1" `
  -Domain "src\lib\codexforge\builder-operator-decision-packet" `
  -Route "src\app\builder-operator-decision-packet" `
  -MainPanel "BuilderOperatorDecisionPacketPanel" `
  -CommandLabel "Go to Builder Operator Decision Packet" `
  -Modules @("builder-operator-decision-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildBuilderOperatorDecisionPacketStableKey", "buildBuilderOperatorDecisionPacket", "buildBuilderOperatorDecisionPacketItems", "buildBuilderOperatorDecisionPacketBoundary", "buildBuilderOperatorDecisionPacketModel", "summarizeBuilderOperatorDecisionPacket", "BUILDER_OPERATOR_DECISION_PACKET_LANGUAGE") `
  -PhaseMarkers @("Builder operator decision packet", "Builder operator decision packet does not make decisions automatically", "Operator decisions require explicit human approval", "Decision packets preserve shared brain memory evidence and audit gates", "Denied builder operator decision paths remain blocked", "Builder operator decision checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Builder operator decision packet does not make decisions automatically", "Operator decisions require explicit human approval", "Denied builder operator decision paths remain blocked") `
  -RouteHref "/builder-operator-decision-packet"

Write-Host "[OK] CodexForge Phase 1014 Builder Operator Decision Packet smoke passed."
