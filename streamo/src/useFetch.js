import { useEffect } from "react";
import fallbackData from "./fallback_data.json";
import axios from "axios";
import configStore from "./store";
import crypto from "crypto";

export const generateScaleHash = () => {
  const date = new Date();
  const currentHour = date.getUTCHours();
  const currentMinute = Math.floor(date.getUTCMinutes() / 5) * 5;
  const randomizer = Math.floor(Math.random() * 10);
  const permanentSalt = "5adf9a7c3be84f966c00dc5c33a4a115f311eb1a962e540c0beccdc5d6d171d4";

  const temporarySalt = `${currentHour}${currentMinute}`;
  const dataToHash = `${permanentSalt}${temporarySalt}${randomizer}`;

  const generatedHash = crypto
    .createHash("sha256")
    .update(dataToHash)
    .digest("hex");

  return generatedHash;
};

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
          setAppConfig(fallbackData.data.mappings.appConfig);
          setPlayerConfig(fallbackData.data.mappings.playerConfig);
          return;
        }

        const hash = generateScaleHash();

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
              "x-client-hash": hash,
            },
          }
        );

        const responseAPI = response.data;
        console.log(responseAPI);

        if (responseAPI.code === "FOUND") {
          setAppConfig(responseAPI.data.mappings.appConfig);
          setPlayerConfig(responseAPI.data.mappings.playerConfig);
          setStale(false);
        } else {
          setAppConfig(fallbackData.data.mappings.appConfig);
          setPlayerConfig(fallbackData.data.mappings.playerConfig);
          setStale(true);
        }
      } catch (error) {
        console.log("Error fetching live config:", error.response);
      }
    };

    fetchConfig();
  }, []);

  return { appConfig, playerConfig, stale, projectID };
};

export default useFetchConfig;