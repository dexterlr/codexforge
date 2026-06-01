import type { KeyframeConsistencyNote } from "./keyframe-plan-types";
export function buildKeyframeConsistencyNote(): KeyframeConsistencyNote { return { id: "keyframe-consistency", notes: ["same subject design", "same color palette", "same lighting direction", "same camera height"], plainEnglish: "Consistency notes help future still frames match before video motion is attempted." }; }
