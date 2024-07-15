import { useEffect, useState } from "react";
import fallbackData from "./fallback_data.json";
import axios from "axios";

const useFetchConfig = () => {
  const [appConfig, setAppConfig] = useState(null);
  const [stale, setStale] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlParams = Object.fromEntries(params.entries());
        const projectID = urlParams.projectID;

        if (!projectID) {
          setAppConfig(fallbackData.mappings.appConfig);
          setStale(true);
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
          setStale(false);
        } else {
          setAppConfig(fallbackData.mappings.appConfig);
          setStale(true);
        }

        console.log(data);
      } catch (error) {
        console.error("Error fetching live config:", error.response);
      }
    };

    fetchConfig();
  }, []);

  return { appConfig, stale };
};

export default useFetchConfig;
