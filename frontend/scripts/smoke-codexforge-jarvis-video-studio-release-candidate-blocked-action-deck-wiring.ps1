param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4057 Jarvis Video Studio Release Candidate Blocked Action Deck Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-blocked-action-deck-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-blocked-action-deck-wiring' -RouteHref '/jarvis-video-studio-release-candidate-blocked-action-deck-wiring' -Phase 'Phase 4057' -Title 'Jarvis Video Studio Release Candidate Blocked Action Deck Wiring'
