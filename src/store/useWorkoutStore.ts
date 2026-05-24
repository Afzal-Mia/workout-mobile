import { create } from 'zustand';

interface WorkoutState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
