param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4034 Jarvis Video Trial Result Review Recovery Controlled Trial Link Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-controlled-trial-link-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-controlled-trial-link-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-controlled-trial-link-wiring' -Phase 'Phase 4034' -Title 'Jarvis Video Trial Result Review Recovery Controlled Trial Link Wiring'
