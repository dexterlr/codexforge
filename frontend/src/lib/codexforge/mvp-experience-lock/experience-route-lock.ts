import { buildMvpExperienceLockItem, type MvpExperienceLockItem } from "./mvp-experience-lock-types";
export function buildExperienceRouteLock(): MvpExperienceLockItem {
  return buildMvpExperienceLockItem("route", "Route lock", "Home looks premium, Start is clear, Files shell is fixed, Brain loads, live run is clear, guarded apply is safe, evidence and validation are clear, results and history are useful.");
}
