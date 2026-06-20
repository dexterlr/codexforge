param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 992 Automation Workflow Builder Target Packet" `
  -ScriptFile "smoke-codexforge-automation-workflow-builder-target-packet.ps1" `
  -Domain "src\lib\codexforge\automation-workflow-builder-target-packet" `
  -Route "src\app\automation-workflow-builder-target-packet" `
  -MainPanel "AutomationWorkflowBuilderTargetPacketPanel" `
  -CommandLabel "Go to Automation Workflow Builder Target Packet" `
  -Modules @("automation-workflow-builder-target-packet-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildAutomationWorkflowBuilderTargetPacketStableKey", "buildAutomationWorkflowBuilderTargetPacket", "buildAutomationWorkflowBuilderTargetPacketItems", "buildAutomationWorkflowBuilderTargetPacketBoundary", "buildAutomationWorkflowBuilderTargetPacketModel", "summarizeAutomationWorkflowBuilderTargetPacket", "AUTOMATION_WORKFLOW_BUILDER_TARGET_PACKET_LANGUAGE") `
  -PhaseMarkers @("Automation workflow builder target packet", "Automation workflow builder target packet does not create automations", "Automation workflow building requires explicit operator approval", "Automation packets include schedule trigger and permission review", "Denied automation workflow builder paths remain blocked", "Automation workflow builder checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Automation workflow builder target packet does not create automations", "Automation workflow building requires explicit operator approval", "Denied automation workflow builder paths remain blocked") `
  -RouteHref "/automation-workflow-builder-target-packet"

Write-Host "[OK] CodexForge Phase 992 Automation Workflow Builder Target Packet smoke passed."
