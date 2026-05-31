import type { ApplyTrialHardeningItem } from "../index";
import { card, muted } from "./ComponentStyles";
export function ItemPanel({ item }: { item: ApplyTrialHardeningItem }) { return <article style={card}><strong>{item.title}</strong><p style={muted}>{item.detail}</p><p style={muted}>{item.nextAction}</p></article>; }
