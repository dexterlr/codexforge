import { buildEscalationPlaybook } from "../index";
import { ItemPanel } from "./ItemPanel";
export function EscalationPlaybookPanel() { return <ItemPanel item={buildEscalationPlaybook()} />; }
