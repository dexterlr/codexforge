param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4027 Jarvis Video Trial Result Review Recovery Artifact Handoff Review Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-artifact-handoff-review-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-artifact-handoff-review-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-artifact-handoff-review-wiring' -Phase 'Phase 4027' -Title 'Jarvis Video Trial Result Review Recovery Artifact Handoff Review Wiring'
