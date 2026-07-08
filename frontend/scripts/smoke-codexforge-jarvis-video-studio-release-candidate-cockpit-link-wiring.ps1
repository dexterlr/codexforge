param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4062 Jarvis Video Studio Release Candidate Cockpit Link Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-cockpit-link-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-cockpit-link-wiring' -RouteHref '/jarvis-video-studio-release-candidate-cockpit-link-wiring' -Phase 'Phase 4062' -Title 'Jarvis Video Studio Release Candidate Cockpit Link Wiring'
