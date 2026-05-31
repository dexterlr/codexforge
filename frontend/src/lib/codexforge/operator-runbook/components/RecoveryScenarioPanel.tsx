import { buildRecoveryScenario } from "../index";
import { ItemPanel } from "./ItemPanel";
export function RecoveryScenarioPanel() { return <ItemPanel item={buildRecoveryScenario()} />; }
