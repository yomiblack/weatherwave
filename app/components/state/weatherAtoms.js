"use client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

//Current selected location Atom
export const SelectedLocationAtom = atom("");

//Favorites list with local storage persistence
export const favoritesAtom = atomWithStorage("weatherFavorites", []);

//Search history with local storage persistence
export const historyAtom = atomWithStorage("weatherHistory", []);
