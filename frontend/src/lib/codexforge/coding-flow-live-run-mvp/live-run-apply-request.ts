import type { LiveRunApplyRequest } from "./coding-flow-live-run-types";
export function buildLiveRunApplyRequest(): LiveRunApplyRequest { return { route: "/guarded-apply-mvp", approvalRequired: true, requestReadyOnly: true }; }
