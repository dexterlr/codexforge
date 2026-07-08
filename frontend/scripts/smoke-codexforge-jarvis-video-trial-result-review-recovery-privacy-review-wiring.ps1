param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4015 Jarvis Video Trial Result Review Recovery Privacy Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-privacy-review-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-privacy-review-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-privacy-review-wiring' -Phase 'Phase 4015' -Title 'Jarvis Video Trial Result Review Recovery Privacy Review Wiring'
