param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 602 Launch Boundary Audit" `
  -ScriptFile "smoke-codexforge-launch-boundary-audit.ps1" `
  -Domain "src\lib\codexforge\launch-boundary-audit" `
  -Route "src\app\launch-boundary-audit" `
  -MainPanel "LaunchBoundaryAuditPanel" `
  -CommandLabel "Go to Launch Boundary Audit" `
  -Modules @("launch-boundary-audit-types.ts", "launch-boundary-audit-summary.ts", "index.ts") `
  -Components @("LaunchBoundaryAuditPanel.tsx", "index.ts") `
  -Exports @("buildLaunchBoundaryAuditStableKey", "buildLaunchBoundaryAudit", "buildLaunchBoundaryAudits", "buildLaunchBoundaryAuditBoundary", "buildLaunchBoundaryAuditModel", "summarizeLaunchBoundaryAudit", "LAUNCH_BOUNDARY_AUDIT_LANGUAGE") `
  -PhaseMarkers @("Launch boundary audit", "Launch boundary audit does not run boundary probes", "Launch boundary approval requires explicit operator approval", "Unresolved launch boundary blockers stay blocked", "Boundary audit groups", "File test project execution checklist") `
  -PlainEnglish @("Launch boundary audit identity", "Provider local connector automation boundary checklist", "Evidence logging audit checklist", "Rollback stop checklist", "Denied audit actions", "Unresolved launch boundary blockers", "Launch approval packet route", "Launch go/no-go route", "Next recommended action") `
  -RouteHref "/launch-boundary-audit"

Write-Host "[OK] CodexForge Phase 602 launch boundary audit smoke passed."
