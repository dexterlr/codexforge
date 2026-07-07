param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3618 Jarvis Shared Backend Adapter Contract Website Manifest Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-website-manifest-wiring.ps1' -Route 'jarvis-shared-adapter-contract-website-manifest-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Website Manifest Wiring' -RouteHref '/jarvis-shared-adapter-contract-website-manifest-wiring' -Phase '3618' -Title 'Jarvis Shared Backend Adapter Contract Website Manifest Wiring'
