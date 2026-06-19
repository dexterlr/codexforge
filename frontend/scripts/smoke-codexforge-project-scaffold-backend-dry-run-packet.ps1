param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 834 Project Scaffold Backend Dry-Run Packet" `
  -ScriptFile "smoke-codexforge-project-scaffold-backend-dry-run-packet.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-backend-dry-run-packet" `
  -Route "src\app\project-scaffold-backend-dry-run-packet" `
  -MainPanel "ProjectScaffoldBackendDryRunPacketPanel" `
  -CommandLabel "Go to Project Scaffold Backend Dry-Run Packet" `
  -Modules @("project-scaffold-backend-dry-run-packet-model.ts", "index.ts") `
  -Components @("ProjectScaffoldBackendDryRunPacketPanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldBackendDryRunPacketStableKey", "buildProjectScaffoldBackendDryRunPacket", "buildProjectScaffoldBackendDryRunPacketItems", "buildProjectScaffoldBackendDryRunPacketBoundary", "buildProjectScaffoldBackendDryRunPacketModel", "summarizeProjectScaffoldBackendDryRunPacket", "PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_LANGUAGE") `
  -PhaseMarkers @("Project scaffold backend dry-run packet", "Project scaffold backend dry-run packet does not create projects", "Project scaffold dry-runs require explicit operator approval", "Denied project scaffold dry-run paths remain blocked", "Project scaffold dry-run groups", "Project scaffold dry-run checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Project scaffold backend dry-run packet does not create projects", "Project scaffold dry-runs require explicit operator approval", "Denied project scaffold dry-run paths remain blocked") `
  -RouteHref "/project-scaffold-backend-dry-run-packet"

Write-Host "[OK] CodexForge Phase 834 Project scaffold backend dry-run packet smoke passed."
