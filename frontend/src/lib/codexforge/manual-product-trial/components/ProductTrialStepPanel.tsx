import { buildDefaultProductTrialScenario } from "../index";
import { ItemPanel } from "./ItemPanel";
export function ProductTrialStepPanel() { return <ItemPanel item={buildDefaultProductTrialScenario()} />; }
