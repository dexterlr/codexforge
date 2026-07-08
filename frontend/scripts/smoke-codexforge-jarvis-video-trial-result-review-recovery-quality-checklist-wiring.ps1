param([string]$BaseUrl = 'http://localhost:3000')

. (Join-Path $PSScriptRoot 'codexforge-jarvis-video-trial-result-review-recovery-smoke-helper.ps1')

Invoke-CodexForgeJarvisVideoTrialResultReviewRecoverySmoke -SmokeName 'Phase 4019 Jarvis Video Trial Result Review Recovery Quality Checklist Wiring' -ScriptFile 'smoke-codexforge-jarvis-video-trial-result-review-recovery-quality-checklist-wiring.ps1' -Route 'jarvis-video-trial-result-review-recovery-quality-checklist-wiring' -RouteHref '/jarvis-video-trial-result-review-recovery-quality-checklist-wiring' -Phase 'Phase 4019' -Title 'Jarvis Video Trial Result Review Recovery Quality Checklist Wiring'
