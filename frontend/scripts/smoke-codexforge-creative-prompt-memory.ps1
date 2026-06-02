param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Creative Prompt Memory" `
  -ScriptFile "smoke-codexforge-creative-prompt-memory.ps1" `
  -Domain "src\lib\codexforge\creative-prompt-memory" `
  -Route "src\app\creative-memory" `
  -MainPanel "CreativePromptMemoryPanel" `
  -CommandLabel "Go to Creative Memory" `
  -Modules @("creative-prompt-memory-types.ts","creative-prompt-memory-candidate.ts","creative-prompt-memory-source.ts","creative-prompt-memory-review.ts","creative-prompt-memory-tag.ts","creative-prompt-memory-reuse.ts","creative-prompt-memory-handoff.ts","creative-prompt-memory-summary.ts","index.ts") `
  -Components @("CreativePromptMemoryPanel.tsx","CreativePromptMemoryCandidatePanel.tsx","CreativePromptMemorySourcePanel.tsx","CreativePromptMemoryReviewPanel.tsx","CreativePromptMemoryTagPanel.tsx","CreativePromptMemoryReusePanel.tsx","CreativePromptMemoryHandoffPanel.tsx","CreativePromptMemorySummaryPanel.tsx","CreativePromptMemorySafetyStrip.tsx","CreativePromptMemoryEmptyState.tsx","index.ts") `
  -Exports @("buildCreativePromptMemoryCandidate","buildDefaultCreativePromptMemoryCandidates","buildCreativePromptMemorySource","buildCreativePromptMemoryReview","buildCreativePromptMemoryTag","buildCreativePromptMemoryReuse","buildCreativePromptMemoryHandoff","buildCreativePromptMemorySummary","summarizeCreativePromptMemory") `
  -PlainEnglish @("Creative prompt memory","Review useful prompt ideas before reusing or saving them.","Review prompt memory","prompt memory","reviewed memory candidates","candidate id","source kind","prompt excerpt","style notes","subject notes","camera notes","reuse tags","quality notes","safety notes","review status","persistence posture","video-prompt","storyboard","keyframe-plan","local-image-request","local-keyframe-request","local-video-draft-request","artifact-review-note","manual-note","candidate","useful","needs-edit","rejected","approved-for-future-memory","not-persisted","Copy prompt memory handoff allowed","nothing is secretly sent to an AI provider","nothing is secretly written into memory","no auto-save button","no Brain mutation","no auto-generation","no fake generation success","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button","no silent persistence") `
  -ExtraRoutes @("/video-prompt","/local-image","/local-keyframes","/local-video-draft","/video-review","/style-presets")
