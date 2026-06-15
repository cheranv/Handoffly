import React, { useEffect } from "react";
import "../../styles/home.scss";
import {
  CheckIcons,
  FileTickIcons,
  FilesIcons,
  PaletteIcons,
  ShieldIcons,
} from "../../assets/Icons/LandingPageIcons";
import Header from "../layouts/Header";
import Footer from "../layouts/footer";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { signInWithGoogle } from "../../lib/authHelper";
import handofflyImage from "../../assets/images/screen.png";
const Home = () => {
  const { session } = useAuth();
  const navigate = useNavigate();
  const documentList = [
    {
      icon: <FilesIcons />,
      heading: "Everything in one place",
      content: "Links, logins, notes — organized clearly for your client.",
    },
    {
      icon: <ShieldIcons />,
      heading: "Share credentials safely",
      content: "Send login details without exposing them publicly.",
    },

    {
      icon: <FileTickIcons />,
      heading: `Client-Friendly
      Interface`,
      content: `Clean and simple client view
      that requires zero training to
      use.`,
    },
    {
      icon: <PaletteIcons />,
      heading: `Custom Branding`,
      content: `Add your logo and brand colors
       to deliver a professional
       experience.`,
    },
  ];
  const workingSteps = [
    {
      heading: `Create your project`,
      content: `Set up a clean handoff in seconds`,
    },
    {
      heading: `Add assets & links`,
      content: `Paste everything your client needs`,
    },
    {
      heading: `Share single link`,
      content: `Send one link — done`,
    },
  ];

  const plansList = [
    {
      heading: "Free Plan",
      price: "$0  forever",
      content: [
        "1 project",
        "Basic sharing",
        "handoffly branding",
        "Unlimited users",
      ],
      text: "Get Started",
    },
    {
      heading: "Pro Plan",
      price: "$20  /per month",
      content: [
        "Unlimited project",
        "Custom branding",
        "Pdf Export",
        "Secure sharing ",
      ],
      text: "Start your free trial ",
    },
  ];

  useEffect(() => {
    if (session) {
      console.log("isLogin", sessionStorage.getItem("isLogin"));
      sessionStorage.setItem("isLogin", true);

      navigate("/");
    }
  }, [session, navigate]);
  return (
    <>
      <Header />
      <main className="main">
        <div className="guest-container">
          <>
            <section id="features">
              <h1>
                Stop sending messy links. Deliver everything in one place.
              </h1>
              <h4>
                Share links, credentials, and notes in a clean client-ready
                page. No more WhatsApp threads or scattered docs.
              </h4>
              <div className="home-button-wrapper">
                <button
                  className={`${true ? "create-button" : "filled-button"}`}
                  onClick={signInWithGoogle}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.8 10.2083C18.8 9.55825 18.7417 8.93325 18.6333 8.33325H10V11.8833H14.9333C14.7167 13.0249 14.0667 13.9916 13.0917 14.6416V16.9499H16.0667C17.8 15.3499 18.8 12.9999 18.8 10.2083V10.2083"
                      fill="#4285F4"
                    />
                    <path
                      d="M9.99974 19.1667C12.4747 19.1667 14.5497 18.35 16.0664 16.95L13.0914 14.6417C12.2747 15.1917 11.2331 15.525 9.99974 15.525C7.61641 15.525 5.59141 13.9167 4.86641 11.75H1.81641V14.1167C3.32474 17.1083 6.41641 19.1667 9.99974 19.1667V19.1667"
                      fill="#34A853"
                    />
                    <path
                      d="M4.86732 11.7416C4.68398 11.1916 4.57565 10.6083 4.57565 9.99993C4.57565 9.3916 4.68398 8.80827 4.86732 8.25827V5.8916H1.81732C1.19232 7.12493 0.833984 8.5166 0.833984 9.99993C0.833984 11.4833 1.19232 12.8749 1.81732 14.1083L4.86732 11.7416V11.7416"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9.99974 4.48325C11.3497 4.48325 12.5497 4.94992 13.5081 5.86659L16.1331 3.24159C14.5414 1.74159 12.4747 0.833252 9.99974 0.833252C6.41641 0.833252 3.32474 2.89159 1.81641 5.89159L4.86641 8.25825C5.59141 6.09159 7.61641 4.48325 9.99974 4.48325V4.48325"
                      fill="#EA4335"
                    />
                  </svg>

                  {false ? "Logout" : "  Continue With Google"}
                </button>

                <button className="demo-button">Book a Demo</button>
              </div>
              <div className="handoffly-image-feature">
                <img src={handofflyImage} alt="handoffly image" lazy></img>
              </div>
              <h1>Everything your client needs. In one place.</h1>
              <div className="flex-container">
                {documentList.map((item) => (
                  <div className="box">
                    <div className="box-icon">{item.icon}</div>
                    <p>{item.heading}</p>
                    <span>{item.content}</span>
                  </div>
                ))}
              </div>
            </section>
            <section id="documentation" className="documentation">
              <h1>How it works</h1>
              <div className="flex-container">
                {workingSteps.map((item, index) => (
                  <div className="box">
                    <div className="box-icon">{index + 1}</div>
                    <p>{item.heading}</p>
                    <span>{item.content}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="pricing">
              <h1>Simple, transparent pricing</h1>
              <div className="flex-container">
                {plansList.map((item) => (
                  <div className="box">
                    <div className="box-inner">
                      <div>
                        <div className="box-icon">{item.price}</div>
                        <p>{item.heading}</p>
                        {item.content.map((item) => (
                          <p className="checklist">
                            <span>
                              <CheckIcons />
                            </span>{" "}
                            <span>{item}</span>
                          </p>
                        ))}
                      </div>
                      <button>{item.text}</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section id="get-started">
              <div className="get-started-box">
                <h1>Start your first handoff today</h1>
                <p>
                  Join 2,000+ designers and agencies delivering better client
                  experiences.
                </p>
                <button className="free-button" onClick={signInWithGoogle}>
                  Get Started For Free
                </button>
                {/* <button
                  className={`${true ? "free-button" : "filled-button"}`}
                  onClick={signInWithGoogle}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.8 10.2083C18.8 9.55825 18.7417 8.93325 18.6333 8.33325H10V11.8833H14.9333C14.7167 13.0249 14.0667 13.9916 13.0917 14.6416V16.9499H16.0667C17.8 15.3499 18.8 12.9999 18.8 10.2083V10.2083"
                      fill="#4285F4"
                    />
                    <path
                      d="M9.99974 19.1667C12.4747 19.1667 14.5497 18.35 16.0664 16.95L13.0914 14.6417C12.2747 15.1917 11.2331 15.525 9.99974 15.525C7.61641 15.525 5.59141 13.9167 4.86641 11.75H1.81641V14.1167C3.32474 17.1083 6.41641 19.1667 9.99974 19.1667V19.1667"
                      fill="#34A853"
                    />
                    <path
                      d="M4.86732 11.7416C4.68398 11.1916 4.57565 10.6083 4.57565 9.99993C4.57565 9.3916 4.68398 8.80827 4.86732 8.25827V5.8916H1.81732C1.19232 7.12493 0.833984 8.5166 0.833984 9.99993C0.833984 11.4833 1.19232 12.8749 1.81732 14.1083L4.86732 11.7416V11.7416"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9.99974 4.48325C11.3497 4.48325 12.5497 4.94992 13.5081 5.86659L16.1331 3.24159C14.5414 1.74159 12.4747 0.833252 9.99974 0.833252C6.41641 0.833252 3.32474 2.89159 1.81641 5.89159L4.86641 8.25825C5.59141 6.09159 7.61641 4.48325 9.99974 4.48325V4.48325"
                      fill="#EA4335"
                    />
                  </svg>

                  {false ? "Logout" : "  Continue With Google"}
                </button> */}
              </div>
            </section>
          </>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
