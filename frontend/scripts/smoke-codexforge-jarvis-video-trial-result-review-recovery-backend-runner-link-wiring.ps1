param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4033 Jarvis Video Trial Result Review Recovery Backend Runner Link Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-backend-runner-link-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-backend-runner-link-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-backend-runner-link-wiring' -Phase 'Phase 4033' -Title 'Jarvis Video Trial Result Review Recovery Backend Runner Link Wiring'
