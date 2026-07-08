param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4021 Jarvis Video Trial Result Review Recovery Recovery Plan Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-recovery-plan-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-recovery-plan-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-recovery-plan-wiring' -Phase 'Phase 4021' -Title 'Jarvis Video Trial Result Review Recovery Recovery Plan Wiring'
