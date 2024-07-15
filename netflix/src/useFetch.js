import { useEffect, useState } from 'react';
import fallbackData from "./fallback_data.json";

const useFetchConfig = () => {
  const [appConfig, setAppConfig] = useState(null);
  const [stale, setStale] = useState(true);
  console.log("appConfig", appConfig);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlParams = Object.fromEntries(params.entries());
        let projectID = urlParams.projectID || "vishal_72d8f604-cb87-4358-8dc8-1d53a96670c9";
        
        console.log("projectID", projectID);

        const response = await fetch(
          "https://facottry-server.onrender.com/scale/get-mapping",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              filter: {
                COUNTRY: "IN",
                SUBSCRIPTION: "FREE",
              },
              projectID,
            }),
          }
        );

        const data = await response.json();
        console.log("data", data);

        if (data.code === "FOUND") {
          setAppConfig(data.mappings.appConfig);
          setStale(false);
        } else {
          setAppConfig(fallbackData.mappings.appConfig);
          setStale(true);
        }
      } catch (error) {
        console.error("Error fetching live config:", error.response);
      }
    };

    fetchConfig();
  }, []);

  return {appConfig, stale};
};

export default useFetchConfig;