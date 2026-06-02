param([string]$BaseUrl = "http://localhost:3000")
& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Video Project Workspace" `
  -ScriptFile "smoke-codexforge-video-project-workspace.ps1" `
  -Domain "src\lib\codexforge\video-project-workspace" `
  -Route "src\app\video-projects" `
  -MainPanel "VideoProjectWorkspacePanel" `
  -CommandLabel "Go to Video Projects" `
  -Modules @("video-project-workspace-types.ts","video-project.ts","video-project-section.ts","video-project-status.ts","video-project-readiness.ts","video-project-next-action.ts","video-project-handoff.ts","video-project-workspace-summary.ts","index.ts") `
  -Components @("VideoProjectWorkspacePanel.tsx","VideoProjectPanel.tsx","VideoProjectSectionPanel.tsx","VideoProjectStatusPanel.tsx","VideoProjectReadinessPanel.tsx","VideoProjectNextActionPanel.tsx","VideoProjectHandoffPanel.tsx","VideoProjectWorkspaceSummaryPanel.tsx","VideoProjectWorkspaceSafetyStrip.tsx","VideoProjectWorkspaceEmptyState.tsx","index.ts") `
  -Exports @("buildVideoProject","buildDefaultVideoProject","buildVideoProjectSection","buildDefaultVideoProjectSections","buildVideoProjectStatus","buildVideoProjectReadiness","buildVideoProjectNextAction","buildVideoProjectHandoff","buildVideoProjectWorkspaceSummary","summarizeVideoProjectWorkspace") `
  -PlainEnglish @("Video project workspace","Keep prompts, shots, keyframes, drafts, and reviews together.","Review project","brief","prompt","style","consistency kit","shot library","storyboard","keyframes","local image requests","local video draft requests","artifact capture","review","comparison","finishing","export handoff","idea","planning","assets-needed","draft-ready","review-needed","finishing-ready","export-ready","blocked","archived-preview","Copy project handoff allowed","preview/review","approved project persistence boundary","No generate button","No export button","No hidden persistence","no auto-generation","no fake generation success","no real export","no upload","no direct ComfyUI workflow run","no ComfyUI queue submit","no job queue mutation","no arbitrary file browsing","no delete artifact button","no silent persistence") `
  -ExtraRoutes @("/video-prompt","/storyboard","/keyframes","/local-video-draft","/video-artifacts","/video-review","/video-final-render","/video-assets","/render-history","/video-export")
