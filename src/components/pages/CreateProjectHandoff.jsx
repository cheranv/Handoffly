import React, { useState } from "react";
import "../../styles/projectHandoff.scss";
import { InputField, TextArea } from "../commonComponents/InputField";

const CreateProjectHandoff = () => {
  const [projectLinks, setProjectLinks] = useState([
    {
      label: "",
      url: "",
    },
  ]);

  const [loginCredentials, setLoginCredentials] = useState([
    {
      username: "",
      password: "",
    },
  ]);

  const [secretCredential, setSecretCredential] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const handleRemoveLink = (index) => {
    const updatedLinks = [...projectLinks];
    updatedLinks.splice(index, 1);
    setProjectLinks(updatedLinks);
  };

  const handleAddLink = () => {
    setProjectLinks([
      ...projectLinks,
      {
        label: "",
        url: "",
      },
    ]);
  };

  const handleAddMoreCredentials = () => {
    setLoginCredentials([
      ...loginCredentials,
      {
        username: "",
        password: "",
      },
    ]);
  };

  const handleAddSecretCredential = () => {
    setSecretCredential([
      ...secretCredential,
      {
        label: "",
        value: "",
      },
    ]);
  };

  const handleRemoveCredential = (index) => {
    const updatedCredentials = [...loginCredentials];
    updatedCredentials.splice(index, 1);
    setLoginCredentials(updatedCredentials);
  };
  return (
    <div className="create-handoff">
      <div className="create-handoff-header">
        <h1>Create Project Handoff</h1>
        <h4>
          Package your project assets, credentials, and documentation into a
          secure, professional delivery for your client.
        </h4>
      </div>
      <section id="project-details">
        <div className="box">
          <h6>Project Information</h6>
          <div className="flex-container">
            <div className="w-50">
              <InputField
                label="Project Name"
                type="text"
                placeholder="Enter project name"
              />
            </div>
            <div className="w-50">
              <InputField
                label="Client Name"
                type="text"
                placeholder="Enter client name"
              />
            </div>
          </div>
          <TextArea
            label="Project Description"
            placeholder="Enter project description"
          />
        </div>
      </section>
      <section id="project-links">
        <div className="box">
          <h6>Project Links</h6>
          {projectLinks.map((link, index) => (
            <div className="flex-container" key={`link-${index}`}>
              <div className="w-30">
                <InputField
                  label={`label`}
                  type="text"
                  value={link.label}
                  onChange={(e) => {
                    const updatedLinks = [...projectLinks];
                    updatedLinks[index].label = e.target.value;
                    setProjectLinks(updatedLinks);
                  }}
                  placeholder="Enter label"
                />
              </div>
              <div className="w-60">
                <InputField
                  label={`url`}
                  type="text"
                  placeholder="Enter url"
                  value={link.url}
                  onChange={(e) => {
                    const updatedLinks = [...projectLinks];
                    updatedLinks[index].url = e.target.value;
                    setProjectLinks(updatedLinks);
                  }}
                />
              </div>
              {projectLinks.length > 1 && (
                <button
                  className="delete-link cursor-pointer"
                  onClick={handleRemoveLink}
                >
                  <svg
                    width="13"
                    height="15"
                    viewBox="0 0 13 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.33973 14.0704C1.92414 14.0704 1.56917 13.9233 1.27484 13.6289C0.980501 13.3346 0.833333 12.9796 0.833333 12.564V1.98714H0V0.737172H3.74997V0H8.74997V0.737172H12.4999V1.98714H11.6666V12.564C11.6666 12.985 11.5208 13.3413 11.2291 13.6329C10.9374 13.9246 10.5811 14.0704 10.1602 14.0704H2.33973V14.0704M10.4166 1.98714H2.0833V12.564C2.0833 12.6388 2.10734 12.7003 2.15542 12.7484C2.2035 12.7964 2.26494 12.8205 2.33973 12.8205H10.1602C10.2243 12.8205 10.2831 12.7938 10.3365 12.7403C10.3899 12.6869 10.4166 12.6282 10.4166 12.564V1.98714V1.98714M4.08653 11.1538H5.3365V3.65381H4.08653V11.1538V11.1538M7.16344 11.1538H8.41341V3.65381H7.16344V11.1538V11.1538M2.0833 1.98714V1.98714V12.564C2.0833 12.6388 2.0833 12.7003 2.0833 12.7484C2.0833 12.7964 2.0833 12.8205 2.0833 12.8205V12.8205C2.0833 12.8205 2.0833 12.7964 2.0833 12.7484C2.0833 12.7003 2.0833 12.6388 2.0833 12.564V1.98714V1.98714"
                      fill="#9CA3AF"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <div className="flex-container">
            <button
              className="add-more-link cursor-pointer"
              onClick={handleAddLink}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.79165 6.04162H0V4.79165H4.79165V0H6.04162V4.79165H10.8333V6.04162H6.04162V10.8333H4.79165V6.04162V6.04162"
                  fill="#dce3f0"
                />
              </svg>
              Add Link
            </button>
          </div>
        </div>
      </section>
      <section id="project-credentials">
        <div className="box">
          <h6>Login Credentials </h6>
          {loginCredentials.map((link, index) => (
            <div className="flex-container" key={`link-${index}`}>
              <div className="w-50 two-icons">
                <InputField
                  label={`username`}
                  type="text"
                  value={link.username}
                  onChange={(e) => {
                    const updatedLinks = [...loginCredentials];
                    updatedLinks[index].username = e.target.value;
                    setLoginCredentials(updatedLinks);
                  }}
                  placeholder="Enter username"
                />
              </div>
              <div className="w-50 two-icons">
                <InputField
                  label={`password`}
                  type="text"
                  placeholder="Enter password"
                  value={link.url}
                  onChange={(e) => {
                    const updatedLinks = [...loginCredentials];
                    updatedLinks[index].password = e.target.value;
                    setLoginCredentials(updatedLinks);
                  }}
                />
              </div>

              <button className="copy-link cursor-pointer">
                <svg
                  width="13"
                  height="16"
                  viewBox="0 0 13 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.42303 12.4999C4.0021 12.4999 3.6458 12.3541 3.35413 12.0624C3.06247 11.7708 2.91664 11.4145 2.91664 10.9935V1.5064C2.91664 1.08546 3.06247 0.72916 3.35413 0.437496C3.6458 0.145832 4.0021 0 4.42303 0H11.4102C11.8311 0 12.1874 0.145832 12.4791 0.437496C12.7707 0.72916 12.9166 1.08546 12.9166 1.5064V10.9935C12.9166 11.4145 12.7707 11.7708 12.4791 12.0624C12.1874 12.3541 11.8311 12.4999 11.4102 12.4999H4.42303V12.4999M4.42303 11.25H11.4102C11.4743 11.25 11.533 11.2233 11.5865 11.1698C11.6399 11.1164 11.6666 11.0576 11.6666 10.9935V1.5064C11.6666 1.44229 11.6399 1.38353 11.5865 1.3301C11.533 1.27668 11.4743 1.24997 11.4102 1.24997H4.42303C4.35893 1.24997 4.30016 1.27668 4.24674 1.3301C4.19332 1.38353 4.16661 1.44229 4.16661 1.5064V10.9935C4.16661 11.0576 4.19332 11.1164 4.24674 11.1698C4.30016 11.2233 4.35893 11.25 4.42303 11.25V11.25M1.5064 15.4166C1.08546 15.4166 0.72916 15.2707 0.437496 14.9791C0.145832 14.6874 0 14.3311 0 13.9102V3.17307H1.24997V13.9102C1.24997 13.9743 1.27668 14.033 1.3301 14.0865C1.38353 14.1399 1.44229 14.1666 1.5064 14.1666H9.74351V15.4166H1.5064V15.4166M4.16661 11.25C4.16661 11.25 4.16661 11.2233 4.16661 11.1698C4.16661 11.1164 4.16661 11.0576 4.16661 10.9935V1.5064C4.16661 1.44229 4.16661 1.38353 4.16661 1.3301C4.16661 1.27668 4.16661 1.24997 4.16661 1.24997V1.24997C4.16661 1.24997 4.16661 1.27668 4.16661 1.3301C4.16661 1.38353 4.16661 1.44229 4.16661 1.5064V10.9935C4.16661 11.0576 4.16661 11.1164 4.16661 11.1698C4.16661 11.2233 4.16661 11.25 4.16661 11.25V11.25V11.25"
                    fill="#9CA3AF"
                  />
                </svg>
              </button>

              {loginCredentials.length > 1 && (
                <button
                  className="delete-link cursor-pointer"
                  onClick={() => {
                    const updatedLinks = [...loginCredentials];
                    updatedLinks.splice(index, 1);
                    setLoginCredentials(updatedLinks);
                  }}
                >
                  <svg
                    width="13"
                    height="15"
                    viewBox="0 0 13 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.33973 14.0704C1.92414 14.0704 1.56917 13.9233 1.27484 13.6289C0.980501 13.3346 0.833333 12.9796 0.833333 12.564V1.98714H0V0.737172H3.74997V0H8.74997V0.737172H12.4999V1.98714H11.6666V12.564C11.6666 12.985 11.5208 13.3413 11.2291 13.6329C10.9374 13.9246 10.5811 14.0704 10.1602 14.0704H2.33973V14.0704M10.4166 1.98714H2.0833V12.564C2.0833 12.6388 2.10734 12.7003 2.15542 12.7484C2.2035 12.7964 2.26494 12.8205 2.33973 12.8205H10.1602C10.2243 12.8205 10.2831 12.7938 10.3365 12.7403C10.3899 12.6869 10.4166 12.6282 10.4166 12.564V1.98714V1.98714M4.08653 11.1538H5.3365V3.65381H4.08653V11.1538V11.1538M7.16344 11.1538H8.41341V3.65381H7.16344V11.1538V11.1538M2.0833 1.98714V1.98714V12.564C2.0833 12.6388 2.0833 12.7003 2.0833 12.7484C2.0833 12.7964 2.0833 12.8205 2.0833 12.8205V12.8205C2.0833 12.8205 2.0833 12.7964 2.0833 12.7484C2.0833 12.7003 2.0833 12.6388 2.0833 12.564V1.98714V1.98714"
                      fill="#9CA3AF"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <div className="flex-container">
            <button
              className="add-more-link cursor-pointer"
              onClick={handleAddMoreCredentials}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.79165 6.04162H0V4.79165H4.79165V0H6.04162V4.79165H10.8333V6.04162H6.04162V10.8333H4.79165V6.04162V6.04162"
                  fill="#dce3f0"
                />
              </svg>
              Add Link
            </button>
          </div>
          <hr></hr>
          <h6>Secret Keys & Tokens </h6>
          {secretCredential.map((link, index) => (
            <div className="flex-container" key={`link-${index}`}>
              <div className="w-50 two-icons">
                <InputField
                  label={`Label`}
                  type="text"
                  value={link.label}
                  onChange={(e) => {
                    const updatedLinks = [...secretCredential];
                    updatedLinks[index].label = e.target.value;
                    setSecretCredential(updatedLinks);
                  }}
                  placeholder="Enter username"
                />
              </div>
              <div className="w-50 two-icons">
                <InputField
                  label={`Value`}
                  type="text"
                  placeholder="Enter Value"
                  value={link.url}
                  onChange={(e) => {
                    const updatedLinks = [...secretCredential];
                    updatedLinks[index].Value = e.target.value;
                    setSecretCredential(updatedLinks);
                  }}
                />
              </div>

              <button className="copy-link cursor-pointer">
                <svg
                  width="13"
                  height="16"
                  viewBox="0 0 13 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.42303 12.4999C4.0021 12.4999 3.6458 12.3541 3.35413 12.0624C3.06247 11.7708 2.91664 11.4145 2.91664 10.9935V1.5064C2.91664 1.08546 3.06247 0.72916 3.35413 0.437496C3.6458 0.145832 4.0021 0 4.42303 0H11.4102C11.8311 0 12.1874 0.145832 12.4791 0.437496C12.7707 0.72916 12.9166 1.08546 12.9166 1.5064V10.9935C12.9166 11.4145 12.7707 11.7708 12.4791 12.0624C12.1874 12.3541 11.8311 12.4999 11.4102 12.4999H4.42303V12.4999M4.42303 11.25H11.4102C11.4743 11.25 11.533 11.2233 11.5865 11.1698C11.6399 11.1164 11.6666 11.0576 11.6666 10.9935V1.5064C11.6666 1.44229 11.6399 1.38353 11.5865 1.3301C11.533 1.27668 11.4743 1.24997 11.4102 1.24997H4.42303C4.35893 1.24997 4.30016 1.27668 4.24674 1.3301C4.19332 1.38353 4.16661 1.44229 4.16661 1.5064V10.9935C4.16661 11.0576 4.19332 11.1164 4.24674 11.1698C4.30016 11.2233 4.35893 11.25 4.42303 11.25V11.25M1.5064 15.4166C1.08546 15.4166 0.72916 15.2707 0.437496 14.9791C0.145832 14.6874 0 14.3311 0 13.9102V3.17307H1.24997V13.9102C1.24997 13.9743 1.27668 14.033 1.3301 14.0865C1.38353 14.1399 1.44229 14.1666 1.5064 14.1666H9.74351V15.4166H1.5064V15.4166M4.16661 11.25C4.16661 11.25 4.16661 11.2233 4.16661 11.1698C4.16661 11.1164 4.16661 11.0576 4.16661 10.9935V1.5064C4.16661 1.44229 4.16661 1.38353 4.16661 1.3301C4.16661 1.27668 4.16661 1.24997 4.16661 1.24997V1.24997C4.16661 1.24997 4.16661 1.27668 4.16661 1.3301C4.16661 1.38353 4.16661 1.44229 4.16661 1.5064V10.9935C4.16661 11.0576 4.16661 11.1164 4.16661 11.1698C4.16661 11.2233 4.16661 11.25 4.16661 11.25V11.25V11.25"
                    fill="#9CA3AF"
                  />
                </svg>
              </button>

              {secretCredential.length > 1 && (
                <button
                  className="delete-link cursor-pointer"
                  onClick={() => {
                    const updatedLinks = [...secretCredential];
                    updatedLinks.splice(index, 1);
                    setSecretCredential(updatedLinks);
                  }}
                >
                  <svg
                    width="13"
                    height="15"
                    viewBox="0 0 13 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.33973 14.0704C1.92414 14.0704 1.56917 13.9233 1.27484 13.6289C0.980501 13.3346 0.833333 12.9796 0.833333 12.564V1.98714H0V0.737172H3.74997V0H8.74997V0.737172H12.4999V1.98714H11.6666V12.564C11.6666 12.985 11.5208 13.3413 11.2291 13.6329C10.9374 13.9246 10.5811 14.0704 10.1602 14.0704H2.33973V14.0704M10.4166 1.98714H2.0833V12.564C2.0833 12.6388 2.10734 12.7003 2.15542 12.7484C2.2035 12.7964 2.26494 12.8205 2.33973 12.8205H10.1602C10.2243 12.8205 10.2831 12.7938 10.3365 12.7403C10.3899 12.6869 10.4166 12.6282 10.4166 12.564V1.98714V1.98714M4.08653 11.1538H5.3365V3.65381H4.08653V11.1538V11.1538M7.16344 11.1538H8.41341V3.65381H7.16344V11.1538V11.1538M2.0833 1.98714V1.98714V12.564C2.0833 12.6388 2.0833 12.7003 2.0833 12.7484C2.0833 12.7964 2.0833 12.8205 2.0833 12.8205V12.8205C2.0833 12.8205 2.0833 12.7964 2.0833 12.7484C2.0833 12.7003 2.0833 12.6388 2.0833 12.564V1.98714V1.98714"
                      fill="#9CA3AF"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          <div className="flex-container">
            <button
              className="add-more-link cursor-pointer"
              onClick={handleAddSecretCredential}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.79165 6.04162H0V4.79165H4.79165V0H6.04162V4.79165H10.8333V6.04162H6.04162V10.8333H4.79165V6.04162V6.04162"
                  fill="#dce3f0"
                />
              </svg>
              Add Link
            </button>
          </div>
        </div>
      </section>
      <section id="instruction">
        <div className="box">
          <h6>Notes & Instructions</h6>

          <TextArea
            label="Client Guidance"
            placeholder="Add specific instructions for the client, next steps, or maintenance details..."
          />
        </div>
      </section>
      <section id="buttons">
        <div className="flex-container">
          <button className="preview-project cursor-pointer">
            Preview Handoff
          </button>
          <button className="create-project cursor-pointer">
            Generate Handoff
          </button>
        </div>
      </section>
    </div>
  );
};

export default CreateProjectHandoff;
