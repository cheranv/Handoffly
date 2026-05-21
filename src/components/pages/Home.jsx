import React from "react";
import "../../styles/home.scss";
import {
  CheckIcons,
  FileTickIcons,
  FilesIcons,
  PaletteIcons,
  ShieldIcons,
} from "../../assets/Icons/LandingPageIcons";

const Home = () => {
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
  return (
    <>
      <section id="features">
        <h1>Stop sending messy links. Deliver everything in one place.</h1>
        <h4>
          Share links, credentials, and notes in a clean client-ready page. No
          more WhatsApp threads or scattered docs.
        </h4>
        <div className="home-button-wrapper">
          <button className="create-button">Create Your First Hand Off</button>

          <button className="demo-button">Book a Demo</button>
        </div>
        <div className="handoffly-image-feature">
          <img
            src="/src/assets/images/screen.png"
            alt="handoffly image"
            lazy
          ></img>
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
          <button className="free-button">Get Started For Free</button>
        </div>
      </section>
    </>
  );
};

export default Home;
