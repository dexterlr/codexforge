param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1988 Artifact Persistence Blocked Preview"
  ScriptFile = "smoke-codexforge-artifact-persistence-blocked-preview.ps1"
  Domain = "src\lib\codexforge\artifact-persistence-blocked-preview"
  Route = "src\app\artifact-persistence-blocked-preview"
  CommandLabel = "Go to Artifact Persistence Blocked Preview"
  RouteHref = "/artifact-persistence-blocked-preview"
  Markers = @("Artifact persistence blocked preview", "Artifact persistence blocked preview does not create artifacts persist files store media upload assets download assets or write browser storage from the UI", "Artifact persistence blocked preview requires backend-owned artifact storage and approval capture", "Artifact persistence blocked preview shows denied artifact creation denied media storage denied file write denied browser storage denied asset persistence and backend prerequisite", "Denied artifact persistence paths remain blocked", "Artifact persistence blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

