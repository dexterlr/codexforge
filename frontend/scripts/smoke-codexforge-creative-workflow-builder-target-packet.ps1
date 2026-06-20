param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 993 Creative Workflow Builder Target Packet" `
  -ScriptFile "smoke-codexforge-creative-workflow-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\creative-workflow-builder-target-packet" `
  -Route "src\app\creative-workflow-builder-target-packet" `
  -MainPanel "CreativeWorkflowBuilderTargetPacketPanel" `
  -CommandLabel "Go to Creative Workflow Builder Target Packet" `
  -Modules @("creative-workflow-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildCreativeWorkflowBuilderTargetPacketStableKey", "buildCreativeWorkflowBuilderTargetPacket", "buildCreativeWorkflowBuilderTargetPacketItems", "buildCreativeWorkflowBuilderTargetPacketBoundary", "buildCreativeWorkflowBuilderTargetPacketModel", "summarizeCreativeWorkflowBuilderTargetPacket", "CREATIVE_WORKFLOW_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Creative workflow builder target packet", "Creative workflow builder target packet does not render assets", "Creative workflow building requires explicit operator approval", "Creative packets include asset pipeline and render review", "Denied creative workflow builder paths remain blocked", "Creative workflow builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Creative workflow builder target packet does not render assets", "Creative workflow building requires explicit operator approval", "Denied creative workflow builder paths remain blocked") `
  -RouteHref "/creative-workflow-builder-target-packet"

Write-Host "[OK] CodexForge Phase 993 Creative Workflow Builder Target Packet smoke passed."
