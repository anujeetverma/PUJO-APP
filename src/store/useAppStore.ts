import { create } from 'zustand';
import { Pandal } from '../types';

interface AppState {
  selectedPandals: Pandal[];
  togglePandalSelection: (pandal: Pandal) => void;
  clearSelection: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedPandals: [],

  togglePandalSelection: (pandal) => set((state) => {
    const exists = state.selectedPandals.find((p) => p.id === pandal.id);

    if (exists) {
      // Remove if already selected
      return { selectedPandals: state.selectedPandals.filter((p) => p.id !== pandal.id) };
    } else {
      // Add if not selected (Max 10 for routing)
      if (state.selectedPandals.length >= 10) return state;
      return { selectedPandals: [...state.selectedPandals, pandal] };
    }
  }),

  clearSelection: () => set({ selectedPandals: [] }),
}));