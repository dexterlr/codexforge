param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4036 Jarvis Video Trial Result Review Recovery No Persistence Guard Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-no-persistence-guard-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-no-persistence-guard-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-no-persistence-guard-wiring' -Phase 'Phase 4036' -Title 'Jarvis Video Trial Result Review Recovery No Persistence Guard Wiring'
