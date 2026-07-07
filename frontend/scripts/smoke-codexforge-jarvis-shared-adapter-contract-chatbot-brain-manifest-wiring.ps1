param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-shared-backend-adapter-contract-smoke-helper.ps1')
Invoke-CodexForgeJarvisSharedBackendAdapterContractSmoke -SmokeName 'Phase 3620 Jarvis Shared Backend Adapter Contract Chatbot Brain Manifest Wiring' -ScriptFile 'smoke-codexforge-jarvis-shared-adapter-contract-chatbot-brain-manifest-wiring.ps1' -Route 'jarvis-shared-adapter-contract-chatbot-brain-manifest-wiring' -CommandLabel 'Go to Jarvis Shared Backend Adapter Contract Chatbot Brain Manifest Wiring' -RouteHref '/jarvis-shared-adapter-contract-chatbot-brain-manifest-wiring' -Phase '3620' -Title 'Jarvis Shared Backend Adapter Contract Chatbot Brain Manifest Wiring'
