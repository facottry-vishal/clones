/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Newsletter = () => {
  const [appConfig, setAppConfig] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("https://facottry-server.onrender.com/scale/get-mapping", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filter: {
              COUNTRY: "US",
              SUBSCRIPTION: "FREE",
            },
            projectID: "vishal_72d8f604-cb87-4358-8dc8-1d53a96670c9",
          }),
        });

        const data = await response.json();
        if (data.code === "FOUND") {
          setAppConfig(data.mappings.appConfig);
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, []);

  if (!appConfig) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {appConfig.newsletter && (
        <section className="newsletter p-5">
          <div className="container-xxl">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="d-flex flex-column align-items-center">
                  <h2 className="mb-3">Sign Up for Our Newsletter</h2>
                  <h5>Get email updates on all our <Link to="/special-offers">special offers</Link></h5>
                </div>
              </div>
              <div className="col-md-6 details d-flex flex-column justify-content-center">
                <div className="input-group mb-3">
                  <input type="email" id="news-input" className="form-control" placeholder="@example.com" aria-label="Email" aria-describedby="basic-addon2" />
                  <button className="btn btn-primary" type="button" id="basic-addon2">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Newsletter;
