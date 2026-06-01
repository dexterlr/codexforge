export type FirstTaskScenario = { id: string; title: string; subtitle: string; primaryAction: string; safeTask: string };
export type FirstTaskStep = { id: string; title: string; plainEnglish: string; nextRoute: string };
export type FirstTaskSafeFile = { path: string; whySafe: string; avoid: string[] };
export type FirstTaskPreviewGuide = { title: string; meaning: string; checklist: string[] };
export type FirstTaskApplyReviewGuide = { title: string; meaning: string; checklist: string[] };
export type FirstTaskValidationGuide = { title: string; meaning: string; checklist: string[] };
export type FirstTaskResultGuide = { title: string; meaning: string; checklist: string[] };
export type FirstTaskHandoff = { title: string; copyText: string; nextRoute: string };
export type NoviceFirstTaskSummary = {
  scenario: FirstTaskScenario;
  steps: FirstTaskStep[];
  safeFile: FirstTaskSafeFile;
  previewGuide: FirstTaskPreviewGuide;
  applyReviewGuide: FirstTaskApplyReviewGuide;
  validationGuide: FirstTaskValidationGuide;
  resultGuide: FirstTaskResultGuide;
  handoff: FirstTaskHandoff;
};
