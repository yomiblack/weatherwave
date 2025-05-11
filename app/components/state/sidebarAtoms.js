import { atom } from "jotai";

export const sidebarOpenAtom = atom(false);
export const toggleSidebarAtom = atom(null, (get, set) =>
  set(sidebarOpenAtom, !get(sidebarOpenAtom))
);
