param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-studio-release-candidate-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoStudioReleaseCandidateSmoke -SmokeName 'Phase 4060 Jarvis Video Studio Release Candidate Product IA Link Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-studio-release-candidate-product-ia-link-wiring.ps1' -Route 'jarvis-video-studio-release-candidate-product-ia-link-wiring' -RouteHref '/jarvis-video-studio-release-candidate-product-ia-link-wiring' -Phase 'Phase 4060' -Title 'Jarvis Video Studio Release Candidate Product IA Link Wiring'
