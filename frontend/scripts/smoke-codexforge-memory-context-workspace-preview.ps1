param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-domain-workspace-smoke-helper.ps1") `
  -SmokeName "Phase 1636 Memory Context Workspace Preview" `
  -ScriptFile "smoke-codexforge-memory-context-workspace-preview.ps1" `
  -Domain "src\lib\codexforge\memory-context-workspace-preview" `
  -Route "src\app\memory-context-workspace-preview" `
  -MainPanel "CockpitDomainWorkspaceRoutePanel" `
  -CommandLabel "Go to Memory Context Workspace Preview" `
  -RouteHref "/memory-context-workspace-preview" `
  -Markers @("Memory context workspace preview", "Memory context workspace preview does not promote memory automatically", "Memory context workspace preview requires explicit operator approval", "Memory context workspace preview shows project context goal memory evidence-backed learning retention redaction approval needs and denied memory paths", "Denied memory context workspace paths remain blocked", "Memory context workspace checklist")
