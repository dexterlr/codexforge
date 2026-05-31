import { buildRecoveryPlaybook } from "../index";
import { ItemPanel } from "./ItemPanel";
export function RecoveryPlaybookPanel() { return <ItemPanel item={buildRecoveryPlaybook()} />; }
