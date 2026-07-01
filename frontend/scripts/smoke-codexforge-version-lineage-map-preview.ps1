param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1835 Version Lineage Map Preview"
  ScriptFile = "smoke-codexforge-version-lineage-map-preview.ps1"
  Domain = "src\lib\codexforge\version-lineage-map-preview"
  Route = "src\app\version-lineage-map-preview"
  CommandLabel = "Go to Version Lineage Map Preview"
  RouteHref = "/version-lineage-map-preview"
  Markers = @("Version lineage map preview", "Version lineage map preview does not persist versions create branches write files apply diffs or promote strategies from the UI", "Version lineage map preview requires deterministic synthetic lineage entries only", "Version lineage map preview shows simulated parent version simulated draft version simulated review state simulated retirement state simulated rollback reference and denied frontend persistence", "Denied version lineage map paths remain blocked", "Version lineage map checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
