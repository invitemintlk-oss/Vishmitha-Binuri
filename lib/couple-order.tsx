'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { COUPLE, type Side } from '@/lib/guest';

const SideContext = createContext<Side>('groom');

/** Wraps the invitation so every section knows whose side invited the guest. */
export function CoupleOrderProvider({ side, children }: { side: Side; children: ReactNode }) {
  return <SideContext.Provider value={side}>{children}</SideContext.Provider>;
}

/** Returns the couple's names in the order for this invitation (inviting side first). */
export function useCoupleOrder() {
  const side = useContext(SideContext);
  const brideFirst = side === 'bride';
  return {
    side,
    brideFirst,
    first: brideFirst ? COUPLE.bride : COUPLE.groom,
    second: brideFirst ? COUPLE.groom : COUPLE.bride,
    /** Put two groom/bride-ordered items into this invitation's order. */
    order: <T,>(groomItem: T, brideItem: T): [T, T] =>
      brideFirst ? [brideItem, groomItem] : [groomItem, brideItem],
  };
}
