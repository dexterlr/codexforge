import { buildRollbackPlaybook } from "../index";
import { ItemPanel } from "./ItemPanel";
export function RollbackPlaybookPanel() { return <ItemPanel item={buildRollbackPlaybook()} />; }
