import type { FirstTaskStep } from "./novice-first-task-types";

export function buildFirstTaskStep(input: FirstTaskStep): FirstTaskStep {
  return input;
}

export function buildDefaultFirstTaskSteps(): FirstTaskStep[] {
  return [
    buildFirstTaskStep({ id: "choose-task", title: "Choose a tiny task", plainEnglish: "Change wording only. Do not change behavior.", nextRoute: "/first-task" }),
    buildFirstTaskStep({ id: "pick-file", title: "Pick one safe file", plainEnglish: "Use a page or component that only shows text.", nextRoute: "/files" }),
    buildFirstTaskStep({ id: "preview", title: "Preview before changing anything", plainEnglish: "Preview means nothing has changed yet.", nextRoute: "/files" }),
    buildFirstTaskStep({ id: "review-apply", title: "Review the apply request", plainEnglish: "Apply may change a file, so approval is required.", nextRoute: "/guarded-apply-mvp" }),
    buildFirstTaskStep({ id: "capture", title: "Capture what happened", plainEnglish: "Evidence is a short note of what happened.", nextRoute: "/apply-evidence" }),
    buildFirstTaskStep({ id: "validate", title: "Run checks separately", plainEnglish: "Validation is separate. Paste the result after you run checks.", nextRoute: "/validation-results" }),
    buildFirstTaskStep({ id: "review", title: "Review the outcome", plainEnglish: "Decide whether the run passed, failed, or needs recovery.", nextRoute: "/review-inbox" }),
  ];
}
