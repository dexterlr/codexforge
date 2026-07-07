param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-operator-control-plane-foundation-smoke-helper.ps1')
Invoke-CodexForgeJarvisOperatorControlPlaneFoundationSmoke -SmokeName 'Phase 3572 Jarvis Control Plane Chatbot Brain Awareness Wiring' -ScriptFile 'smoke-codexforge-jarvis-control-plane-chatbot-brain-awareness-wiring.ps1' -Route 'jarvis-control-plane-chatbot-brain-awareness-wiring' -CommandLabel 'Go to Jarvis Control Plane Chatbot Brain Awareness Wiring' -RouteHref '/jarvis-control-plane-chatbot-brain-awareness-wiring' -Phase '3572' -Title 'Jarvis Control Plane Chatbot Brain Awareness Wiring'