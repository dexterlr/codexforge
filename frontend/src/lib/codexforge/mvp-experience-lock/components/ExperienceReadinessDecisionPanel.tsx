import { buildExperienceReadinessDecision } from "../index";
import { ItemPanel } from "./ItemPanel";
export function ExperienceReadinessDecisionPanel() { return <ItemPanel item={buildExperienceReadinessDecision()} />; }
