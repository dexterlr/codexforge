param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3601 Jarvis Shared Backend Adapter Contract Dry Run Mode Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-dry-run-mode-wiring.ps1' -Route 'jarvis-shared-adapter-contract-dry-run-mode-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Dry Run Mode Wiring' -RouteHref '/jarvis-shared-adapter-contract-dry-run-mode-wiring' -Phase '3601' -Title 'Jarvis Shared Backend Adapter Contract Dry Run Mode Wiring'
