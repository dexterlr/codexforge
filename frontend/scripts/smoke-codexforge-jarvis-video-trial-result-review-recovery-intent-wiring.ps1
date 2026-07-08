param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4011 Jarvis Video Trial Result Review Recovery Intent Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-intent-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-intent-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-intent-wiring' -Phase 'Phase 4011' -Title 'Jarvis Video Trial Result Review Recovery Intent Wiring'
