param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 955 Project Goal Intake Packet" `
  -ScriptFile "smoke-codexforge-project-goal-intake-packet.ps1" `
  -Domain "src\lib\codexforge\project-goal-intake-packet" `
  -Route "src\app\project-goal-intake-packet" `
  -MainPanel "ProjectGoalIntakePacketPanel" `
  -CommandLabel "Go to Project Goal Intake Packet" `
  -Modules @("project-goal-intake-packet-model.ts", "index.ts") `
  -Components @("ProjectGoalIntakePacketPanel.tsx", "index.ts") `
  -Exports @("buildProjectGoalIntakePacketStableKey", "buildProjectGoalIntakePacket", "buildProjectGoalIntakePacketItems", "buildProjectGoalIntakePacketBoundary", "buildProjectGoalIntakePacketModel", "summarizeProjectGoalIntakePacket", "PROJECT_GOAL_INTAKE_PACKET_LANGUAGE") `
  -PhaseMarkers @("Project goal intake packet", "Project goal intake packet does not send prompts", "Goal intake requires explicit operator approval", "Goal packets preserve shared CodexForge brain context", "Denied project goal intake paths remain blocked", "Project goal intake checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project goal intake packet does not send prompts", "Goal intake requires explicit operator approval", "Denied project goal intake paths remain blocked") `
  -RouteHref "/project-goal-intake-packet"

Write-Host "[OK] CodexForge Phase 955 Project goal intake packet smoke passed."
