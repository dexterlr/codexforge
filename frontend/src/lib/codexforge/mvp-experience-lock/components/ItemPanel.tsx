import type { MvpExperienceLockItem } from "../index";
import { card, muted } from "./ComponentStyles";
export function ItemPanel({ item }: { item: MvpExperienceLockItem }) { return <article style={card}><strong>{item.title}</strong><p style={muted}>{item.detail}</p><p style={muted}>{item.nextAction}</p></article>; }
