import { create } from "zustand";

// Create a Zustand store
const configStore = create((set) => ({
  appConfig: null,
  playerConfig: null,
  stale: true,
  setAppConfig: (appConfig) => set({ appConfig }),
  setPlayerConfig: (playerConfig) => set({ playerConfig }),
  setStale: (stale) => set({ stale }),
}));

export default configStore;