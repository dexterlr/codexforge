param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3600 Jarvis Shared Backend Adapter Contract Approval Mode Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-approval-mode-wiring.ps1' -Route 'jarvis-shared-adapter-contract-approval-mode-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Approval Mode Wiring' -RouteHref '/jarvis-shared-adapter-contract-approval-mode-wiring' -Phase '3600' -Title 'Jarvis Shared Backend Adapter Contract Approval Mode Wiring'
