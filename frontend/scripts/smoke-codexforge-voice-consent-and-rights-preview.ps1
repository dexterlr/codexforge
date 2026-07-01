param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1965 Voice Consent And Rights Preview"
  ScriptFile = "smoke-codexforge-voice-consent-and-rights-preview.ps1"
  Domain = "src\lib\codexforge\voice-consent-and-rights-preview"
  Route = "src\app\voice-consent-and-rights-preview"
  CommandLabel = "Go to Voice Consent And Rights Preview"
  RouteHref = "/voice-consent-and-rights-preview"
  Markers = @("Voice consent and rights preview", "Voice consent and rights preview does not clear consent license voices approve likeness use persist rights or synthesize audio from the UI", "Voice consent and rights preview requires backend-owned consent review rights review and approval capture", "Voice consent and rights preview shows simulated consent status simulated speaker approval note simulated rights note simulated likeness note simulated denied frontend rights persistence", "Denied voice consent and rights paths remain blocked", "Voice consent and rights checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

