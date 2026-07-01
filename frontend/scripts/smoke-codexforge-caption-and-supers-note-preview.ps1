param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1938 Caption And Supers Note Preview"
  ScriptFile = "smoke-codexforge-caption-and-supers-note-preview.ps1"
  Domain = "src\lib\codexforge\caption-and-supers-note-preview"
  Route = "src\app\caption-and-supers-note-preview"
  CommandLabel = "Go to Caption And Supers Note Preview"
  RouteHref = "/caption-and-supers-note-preview"
  Markers = @("Caption and supers note preview", "Caption and supers note preview does not transcribe audio burn captions export subtitles or write caption files from the UI", "Caption and supers note preview requires backend-owned caption workflow", "Caption and supers note preview shows simulated caption style simulated lower third note simulated accessibility note simulated subtitle target simulated export blocked state", "Denied caption and supers note paths remain blocked", "Caption and supers note checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

