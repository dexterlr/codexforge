param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4032 Jarvis Video Trial Result Review Recovery Jarvis Video Update Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-jarvis-video-update-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-jarvis-video-update-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-jarvis-video-update-wiring' -Phase 'Phase 4032' -Title 'Jarvis Video Trial Result Review Recovery Jarvis Video Update Wiring'
