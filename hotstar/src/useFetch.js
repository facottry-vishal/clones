import { useEffect, useState } from "react";
import fallbackData from "./fallback_data.json";
import axios from "axios";
import configStore from "./store";

const useFetchConfig = () => {
  const {
    appConfig,
    setAppConfig,
    playerConfig,
    setPlayerConfig,
    stale,
    setStale
  } = configStore();
  
  const params = new URLSearchParams(window.location.search);
  const urlParams = Object.fromEntries(params.entries());
  let projectID = urlParams.projectID;

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        if (projectID) {
          localStorage.setItem("projectID", projectID);
        } else if (localStorage.getItem("projectID")) {
          projectID = localStorage.getItem("projectID");
        } else {
          projectID = null;
          setAppConfig(fallbackData.mappings.appConfig);
          setPlayerConfig(fallbackData.mappings.playerConfig);
          return;
        }

        const response = await axios.post(
          "https://facottry-server.onrender.com/scale/get-mapping",
          {
            filter: {
              COUNTRY: "IN",
              SUBSCRIPTION: "FREE",
            },
            projectID,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;

        if (data.code === "FOUND") {
          setAppConfig(data.mappings.appConfig);
          setPlayerConfig(data.mappings.playerConfig);
          setStale(false);
        } else {
          setAppConfig(fallbackData.mappings.appConfig);
          setPlayerConfig(fallbackData.mappings.playerConfig);
          setStale(true);
        }
      } catch (error) {
        console.error("Error fetching live config:", error.response);
      }
    };

    fetchConfig();
  }, []);

  return { appConfig, playerConfig, stale, projectID };
};

export default useFetchConfig;
