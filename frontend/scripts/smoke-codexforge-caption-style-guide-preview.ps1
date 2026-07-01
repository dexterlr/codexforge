param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1967 Caption Style Guide Preview"
  ScriptFile = "smoke-codexforge-caption-style-guide-preview.ps1"
  Domain = "src\lib\codexforge\caption-style-guide-preview"
  Route = "src\app\caption-style-guide-preview"
  CommandLabel = "Go to Caption Style Guide Preview"
  RouteHref = "/caption-style-guide-preview"
  Markers = @("Caption style guide preview", "Caption style guide preview does not burn captions export subtitle files persist captions or write files from the UI", "Caption style guide preview requires backend-owned caption workflow before persistence", "Caption style guide preview shows simulated caption casing simulated caption placement simulated line length note simulated readability note simulated export blocked state", "Denied caption style guide paths remain blocked", "Caption style guide checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

