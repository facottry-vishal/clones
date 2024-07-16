import create from 'zustand';
import axios from 'axios';
import fallbackData from './fallback_data.json';

// Create a Zustand store
const useStore = create((set) => ({
  appConfig: null,
  playerConfig: null,
  stale: true,
  fetchConfig: async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlParams = Object.fromEntries(params.entries());
      const projectID = urlParams.projectID;

      if (!projectID) {
        set({
          appConfig: fallbackData.mappings.appConfig,
          playerConfig: fallbackData.mappings.playerConfig,
          stale: true,
        });
        return;
      }

      const response = await axios.post(
        "https://facottry-server.onrender.com/scale/get-mapping",
        {
          filter: {
            COUNTRY: "IN",
            SUBSCRIPTION: "PAID",
          },
          projectID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const data = response.data;

      if (data.code === "FOUND") {
        set({
          appConfig: data.mappings.appConfig,
          playerConfig: data.mappings.playerConfig,
          stale: false,
        });
      } else {
        set({
          appConfig: fallbackData.mappings.appConfig,
          playerConfig: fallbackData.mappings.playerConfig,
          stale: true,
        });
      }

    } catch (error) {
      console.error("Error fetching live config:", error);
      set({
        appConfig: fallbackData.mappings.appConfig,
        playerConfig: fallbackData.mappings.playerConfig,
        stale: true,
      });
    }
  },
}));

export default useStore;
