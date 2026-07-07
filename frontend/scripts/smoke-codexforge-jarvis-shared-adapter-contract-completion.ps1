param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3625 Jarvis Shared Backend Adapter Contract Completion' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-completion.ps1' -Route 'jarvis-shared-adapter-contract-completion' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Completion' -RouteHref '/jarvis-shared-adapter-contract-completion' -Phase '3625' -Title 'Jarvis Shared Backend Adapter Contract Completion'
