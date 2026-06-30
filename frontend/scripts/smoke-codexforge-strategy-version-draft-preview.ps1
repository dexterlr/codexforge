param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1826 Strategy Version Draft Preview"
  ScriptFile = "smoke-codexforge-strategy-version-draft-preview.ps1"
  Domain = "src\lib\codexforge\strategy-version-draft-preview"
  Route = "src\app\strategy-version-draft-preview"
  CommandLabel = "Go to Strategy Version Draft Preview"
  RouteHref = "/strategy-version-draft-preview"
  Markers = @("Strategy version draft preview", "Strategy version draft preview does not persist versions write files create branches apply diffs or promote strategy versions from the UI", "Strategy version draft preview requires backend-owned versioning workflow", "Strategy version draft preview shows simulated version id simulated draft status simulated prior version simulated proposed version simulated approval requirement and no frontend persistence", "Denied strategy version draft paths remain blocked", "Strategy version draft checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params