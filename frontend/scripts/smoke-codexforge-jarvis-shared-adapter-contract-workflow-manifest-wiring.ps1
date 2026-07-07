param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3622 Jarvis Shared Backend Adapter Contract Workflow Manifest Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-workflow-manifest-wiring.ps1' -Route 'jarvis-shared-adapter-contract-workflow-manifest-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Workflow Manifest Wiring' -RouteHref '/jarvis-shared-adapter-contract-workflow-manifest-wiring' -Phase '3622' -Title 'Jarvis Shared Backend Adapter Contract Workflow Manifest Wiring'
