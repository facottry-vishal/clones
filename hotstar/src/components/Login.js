import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [appConfig, setAppConfig] = useState(null); // State to hold configuration data

  // Fetch configuration from API on component mount
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("https://facottry-backend.onrender.com/scale/get-mapping", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            filter: {
              COUNTRY: "IN",
              SUBSCRIPTION: "PAID",
            },
            projectID: "vishal_72d8f604-cb87-4358-8dc8-1d53a96670c9",
          }),
        });

        const data = await response.json();
        if (data.code === "FOUND") {
          setAppConfig(data.mappings.appConfig); // Set appConfig state with API response
        }
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };

    fetchConfig();
  }, []);

  // Toggle feature flag
  const toggleFeature = (key) => {
    setAppConfig((prevConfig) => ({
      ...prevConfig,
      [key]: !prevConfig[key],
    }));
  };

  // Render loading state if appConfig is not yet loaded
  if (!appConfig) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Content>
        <CTA>
          {appConfig.loginimages && (
            <CTAlogo1 src="/images/cta-logo-one.svg" alt="" />
          )}
          {appConfig.singaleline && (
            <SignUp>GET ALL THERE</SignUp>
          )}
          {appConfig.descriptionline && (
            <Description>
              Get Premier Access to Raya and the Last Dragon for an additional fee
              with a Disney+ subscription. As of 03/26/21, the price of Disney+
              and The Disney Bundle will increase by $1.
            </Description>
          )}
          {appConfig.images && (
            <CTAlogo2 src="/images/cta-logo-two.png" alt="" />
          )}
        </CTA>
        <BgImage />
      </Content>
    </Container>
  );
};

const Container = styled.section`
  overflow: hidden;
  display: flex;
  height:100vh ;
  flex-direction: column;
  text-align: center;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 80px 40px;
  height: 100%;
`;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/images/login-background.jpg");
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const CTA = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CTAlogo1 = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const SignUp = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;
  &:hover {
    background-color: #0483ee;
  }
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

const CTAlogo2 = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: bottom;
  width: 100%;
`;

export default Login;
