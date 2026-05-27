import React, { useState } from "react";
import "../../styles/projectHandoff.scss";
import { InputField, TextArea } from "../commonComponents/InputField";
import { useNavigate } from "react-router";
import Toaster from "../commonComponents/Toaster";
import { supabase } from "../../lib/supabase";

const CreateProjectHandoff = () => {
  const Navigate = useNavigate();
  const [projectLinks, setProjectLinks] = useState([
    {
      label: "",
      url: "",
    },
  ]);

  const [loginCredentials, setLoginCredentials] = useState([
    {
      label: "",
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

  const [projectInfo, setProjectInfo] = useState({
    title: "",
    description: "",
    clientName: "",
  });

  const [clientGuidance, setClientGuidance] = useState("");
  const [error, setError] = useState([]);
  const [showCopied, setShowCopied] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [visibleKeys, setVisibleKeys] = useState({});

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

  const togglePasswordVisibility = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const toggleSecretKeys = (index) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const handleRemoveCredential = (index) => {
    const updatedCredentials = [...loginCredentials];
    updatedCredentials.splice(index, 1);
    setLoginCredentials(updatedCredentials);
  };

  const validateForm = ({
    projectInfo,
    projectLinks,
    loginCredentials,
    secretCredential,
    clientInstructions,
  }) => {
    const errors = {};

    // -----------------------------
    // Project Info Validation
    // -----------------------------
    if (!projectInfo.title.trim()) {
      errors.title = "Project title is required";
    }

    // -----------------------------
    // Project Links Validation
    // -----------------------------
    const linkErrors = [];

    projectLinks.forEach((link, index) => {
      const currentError = {};

      if (!link.label.trim()) {
        currentError.label = "Link label is required";
      }

      if (!link.url.trim()) {
        currentError.url = "URL is required";
      } else {
        try {
          new URL(link.url);
        } catch {
          currentError.url = "Enter a valid URL";
        }
      }

      if (Object.keys(currentError).length > 0) {
        linkErrors[index] = currentError;
      }
    });

    if (linkErrors.length > 0) {
      errors.projectLinks = linkErrors;
    }

    // -----------------------------
    // Login Credentials Validation
    // -----------------------------
    const loginErrors = [];

    loginCredentials.forEach((credential, index) => {
      const currentError = {};

      if (!credential.label.trim()) {
        currentError.label = "Label is required";
      }

      if (!credential.username.trim()) {
        currentError.username = "Username is required";
      }

      if (!credential.password.trim()) {
        currentError.password = "Password is required";
      }

      if (Object.keys(currentError).length > 0) {
        loginErrors[index] = currentError;
      }
    });

    if (loginErrors.length > 0) {
      errors.loginCredentials = loginErrors;
    }

    // -----------------------------
    // Secret Credentials Validation
    // -----------------------------
    const secretErrors = [];

    secretCredential?.forEach((secret, index) => {
      const currentError = {};

      if (!secret.label.trim()) {
        currentError.label = "Label is required";
      }

      if (!secret.value.trim()) {
        currentError.value = "Value is required";
      }

      if (Object.keys(currentError).length > 0) {
        secretErrors[index] = currentError;
      }
    });

    if (secretErrors.length > 0) {
      errors.secretCredentials = secretErrors;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  const handlePreview = () => {
    let check = validateForm({
      projectInfo,
      projectLinks,
      loginCredentials,
      secretCredential,
      clientGuidance,
    });

    if (check?.isValid === false) {
      setError(check.errors);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    let handoffData = {
      projectInfo,
      projectLinks,
      loginCredentials,
      secretCredential,
      clientGuidance,
    };
    localStorage.setItem("handoff", JSON.stringify(handoffData));

    Navigate("/preview/1");
  };
  const handleGenerate = async () => {
    let check = validateForm({
      projectInfo,
      projectLinks,
      loginCredentials,
      secretCredential,
      clientGuidance,
    });

    if (check?.isValid === false) {
      setError(check.errors);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    let handoffData = {
      projectInfo,
      projectLinks,
      loginCredentials,
      secretCredential,
      clientGuidance,
    };
    // localStorage.setItem("handoff", JSON.stringify(handoffData));
    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          data: {
            projectInfo,
            projectLinks,
            loginCredentials,
            secretCredential,
            clientGuidance,
          },
        },
      ])
      .select();
    if (error) {
    } else {
      console.log(data);
      // Navigate("/preview/1");
      Navigate(`/share/${data[0].id}`);
    }
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
                value={projectInfo.title}
                onChange={(e) => {
                  setProjectInfo({ ...projectInfo, title: e.target.value });
                  setError({ ...error, title: "" });
                }}
                className={error?.title ? "error" : ""}
              />
              <p className="error-text">{error?.title}</p>
            </div>
            <div className="w-50">
              <InputField
                label="Client Name"
                type="text"
                placeholder="Enter client name"
                value={projectInfo.clientName}
                onChange={(e) => {
                  setProjectInfo({
                    ...projectInfo,
                    clientName: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <TextArea
            label="Project Description"
            placeholder="Enter project description"
            value={projectInfo.description}
            onChange={(e) => {
              setProjectInfo({ ...projectInfo, description: e.target.value });
            }}
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
                    setError((prevErrors) => ({
                      ...prevErrors,
                      projectLinks: {
                        ...prevErrors.projectLinks,
                        [index]: {
                          ...prevErrors.projectLinks?.[index],
                          label: "",
                        },
                      },
                    }));
                  }}
                  placeholder="Enter label"
                  className={error?.projectLinks?.[index]?.label ? "error" : ""}
                />
                <p className="error-text">
                  {error?.projectLinks?.[index]?.label}
                </p>
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
                    setError((prevErrors) => ({
                      ...prevErrors,
                      projectLinks: {
                        ...prevErrors.projectLinks,
                        [index]: {
                          ...prevErrors.projectLinks?.[index],
                          url: "",
                        },
                      },
                    }));
                  }}
                  className={error?.projectLinks?.[index]?.url ? "error" : ""}
                />
                <p className="error-text">
                  {error?.projectLinks?.[index]?.url}
                </p>
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
          {loginCredentials.map((logs, index) => (
            <div className="flex-container" key={`logs-${index}`}>
              <div className="w-30 two-icons">
                <InputField
                  label={`cmslabel`}
                  type="text"
                  value={logs.label}
                  onChange={(e) => {
                    const updatedLinks = [...loginCredentials];
                    updatedLinks[index].label = e.target.value;
                    setLoginCredentials(updatedLinks);
                    setError((prevError) => {
                      const updatedErrors = [
                        ...(prevError.loginCredentials || []),
                      ];

                      updatedErrors[index] = {
                        ...updatedErrors[index],
                        label: "",
                      };

                      return {
                        ...prevError,
                        loginCredentials: updatedErrors,
                      };
                    });
                  }}
                  placeholder="Enter username"
                  className={
                    error?.loginCredentials?.[index]?.label ? "error" : ""
                  }
                />
                <p className="error-text">
                  {error?.loginCredentials?.[index]?.label}
                </p>
              </div>
              <div className="w-30 two-icons">
                <InputField
                  label={`username`}
                  type="text"
                  value={logs.username}
                  onChange={(e) => {
                    const updatedLinks = [...loginCredentials];
                    updatedLinks[index].username = e.target.value;
                    setLoginCredentials(updatedLinks);
                    setError((prevError) => {
                      const updatedErrors = [
                        ...(prevError.loginCredentials || []),
                      ];

                      updatedErrors[index] = {
                        ...updatedErrors[index],
                        username: "",
                      };

                      return {
                        ...prevError,
                        loginCredentials: updatedErrors,
                      };
                    });
                  }}
                  placeholder="Enter username"
                  className={
                    error?.loginCredentials?.[index]?.username ? "error" : ""
                  }
                />
                <p className="error-text">
                  {error?.loginCredentials?.[index]?.username}
                </p>
              </div>
              <div className="w-30 two-icons">
                <InputField
                  label={`password`}
                  type={visiblePasswords[index] ? "text" : "password"}
                  placeholder="Enter password"
                  value={logs.password}
                  onChange={(e) => {
                    const updatedLinks = [...loginCredentials];

                    updatedLinks[index].password = e.target.value;

                    setLoginCredentials(updatedLinks);

                    setError((prevError) => {
                      const updatedErrors = [
                        ...(prevError.loginCredentials || []),
                      ];

                      updatedErrors[index] = {
                        ...updatedErrors[index],
                        password: "",
                      };

                      return {
                        ...prevError,
                        loginCredentials: updatedErrors,
                      };
                    });
                  }}
                  className={
                    error?.loginCredentials?.[index]?.password ? "error" : ""
                  }
                />
                <div className="password-icons cursor-pointer">
                  {visiblePasswords[index] ? (
                    <svg
                      width="18"
                      height="12"
                      viewBox="0 0 18 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        togglePasswordVisibility(index);
                      }}
                    >
                      <path
                        d="M8.7198 9.23071C9.66405 9.23071 10.466 8.90023 11.1258 8.23925C11.7855 7.57828 12.1153 6.77567 12.1153 5.83142C12.1153 4.88717 11.7848 4.08519 11.1239 3.42547C10.4629 2.76575 9.66028 2.43589 8.71603 2.43589C7.77178 2.43589 6.9698 2.76638 6.31008 3.42735C5.65036 4.08833 5.32051 4.89094 5.32051 5.83519C5.32051 6.77944 5.65099 7.58142 6.31197 8.24114C6.97294 8.90085 7.77555 9.23071 8.7198 9.23071V9.23071M8.71792 8.0833C8.09292 8.0833 7.56167 7.86455 7.12417 7.42705C6.68667 6.98955 6.46792 6.4583 6.46792 5.8333C6.46792 5.2083 6.68667 4.67705 7.12417 4.23955C7.56167 3.80205 8.09292 3.5833 8.71792 3.5833C9.34292 3.5833 9.87417 3.80205 10.3117 4.23955C10.7492 4.67705 10.9679 5.2083 10.9679 5.8333C10.9679 6.4583 10.7492 6.98955 10.3117 7.42705C9.87417 7.86455 9.34292 8.0833 8.71792 8.0833V8.0833M8.71906 11.6666C6.80271 11.6666 5.05661 11.138 3.48076 10.0809C1.90491 9.02372 0.744658 7.60787 0 5.8333C0.744658 4.05874 1.90453 2.64288 3.47961 1.58573C5.0547 0.528576 6.80042 0 8.71677 0C10.6331 0 12.3792 0.528576 13.9551 1.58573C15.5309 2.64288 16.6912 4.05874 17.4358 5.8333C16.6912 7.60787 15.5313 9.02372 13.9562 10.0809C12.3811 11.138 10.6354 11.6666 8.71906 11.6666V11.6666M8.71792 5.8333V5.8333V5.8333V5.8333V5.8333V5.8333V5.8333V5.8333V5.8333V5.8333M8.71792 10.4166C10.2874 10.4166 11.7283 10.0034 13.0408 9.17705C14.3533 8.35066 15.3568 7.23608 16.0512 5.8333C15.3568 4.43053 14.3533 3.31594 13.0408 2.48955C11.7283 1.66316 10.2874 1.24997 8.71792 1.24997C7.14847 1.24997 5.7075 1.66316 4.395 2.48955C3.0825 3.31594 2.07903 4.43053 1.38458 5.8333C2.07903 7.23608 3.0825 8.35066 4.395 9.17705C5.7075 10.0034 7.14847 10.4166 8.71792 10.4166V10.4166"
                        fill="#6366F1"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        togglePasswordVisibility(index);
                      }}
                    >
                      <path
                        d="M15.7726 12.973L14.6496 11.85C14.7996 11.0218 14.5633 10.2773 13.9408 9.61625C13.3185 8.95542 12.5548 8.7 11.6496 8.85L10.5266 7.727C10.7523 7.62567 10.9837 7.54967 11.2208 7.499C11.458 7.44834 11.7176 7.423 11.9996 7.423C13.1343 7.423 14.0974 7.81884 14.8891 8.6105C15.6808 9.40217 16.0766 10.3653 16.0766 11.5C16.0766 11.782 16.0513 12.0448 16.0006 12.2885C15.9499 12.532 15.8739 12.7602 15.7726 12.973ZM18.9533 16.0845L17.8496 15.05C18.4829 14.5667 19.0454 14.0375 19.5371 13.4625C20.0288 12.8875 20.4496 12.2333 20.7996 11.5C19.9663 9.81667 18.7704 8.47917 17.2121 7.4875C15.6538 6.49584 13.9163 6 11.9996 6C11.5163 6 11.0413 6.03334 10.5746 6.1C10.1079 6.16667 9.64959 6.26667 9.19959 6.4L8.03434 5.23475C8.66634 4.98342 9.31184 4.79817 9.97084 4.679C10.6298 4.55967 11.3061 4.5 11.9996 4.5C14.3431 4.5 16.4565 5.14617 18.3398 6.4385C20.2232 7.73084 21.5969 9.418 22.4611 11.5C22.0906 12.3935 21.6121 13.2275 21.0256 14.002C20.4389 14.7763 19.7482 15.4705 18.9533 16.0845ZM19.7611 21.8693L15.7151 17.8538C15.2023 18.0436 14.6339 18.1988 14.0101 18.3193C13.3864 18.4398 12.7163 18.5 11.9996 18.5C9.64959 18.5 7.53617 17.8538 5.65934 16.5615C3.78234 15.2692 2.40859 13.582 1.53809 11.5C1.90725 10.6167 2.38417 9.79267 2.96884 9.028C3.5535 8.26317 4.19709 7.6 4.89959 7.0385L2.13034 4.2385L3.18434 3.18475L20.8148 20.8153L19.7611 21.8693ZM5.95359 8.09225C5.42525 8.51275 4.91142 9.01825 4.41209 9.60875C3.91275 10.1991 3.50859 10.8295 3.19959 11.5C4.03292 13.1833 5.22875 14.5208 6.78709 15.5125C8.34542 16.5042 10.0829 17 11.9996 17C12.4548 17 12.908 16.9615 13.3593 16.8845C13.8105 16.8077 14.1932 16.7283 14.5073 16.6463L13.2418 15.35C13.0713 15.4192 12.8739 15.4743 12.6496 15.5153C12.4253 15.5564 12.2086 15.577 11.9996 15.577C10.8649 15.577 9.90175 15.1812 9.11009 14.3895C8.31842 13.5978 7.92259 12.6347 7.92259 11.5C7.92259 11.2975 7.94317 11.0857 7.98434 10.8645C8.02534 10.6433 8.08042 10.4411 8.14959 10.2578L5.95359 8.09225Z"
                        fill="#6366F1"
                      />
                    </svg>
                  )}
                </div>
                <p className="error-text">
                  {error?.loginCredentials?.[index]?.password}
                </p>
              </div>

              <button
                className="copy-link cursor-pointer"
                onClick={() => {
                  if (logs.password) {
                    navigator.clipboard.writeText(logs.password);
                    setShowCopied(true);
                    setTimeout(() => {
                      setShowCopied(false);
                    }, 1000);
                  }
                }}
              >
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
              Add Details
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
                    setError((prevError) => {
                      const updatedErrors = [
                        ...(prevError.secretCredentials || []),
                      ];

                      updatedErrors[index] = {
                        ...updatedErrors[index],
                        label: "",
                      };

                      return {
                        ...prevError,
                        secretCredentials: updatedErrors,
                      };
                    });
                  }}
                  placeholder="Enter username"
                  className={
                    error?.secretCredentials?.[index]?.label ? "error" : ""
                  }
                />
                <p className="error-text">
                  {error?.secretCredentials?.[index]?.label}
                </p>
              </div>
              <div className="w-50 two-icons">
                <InputField
                  label={`Value`}
                  type={visibleKeys[index] ? "text" : "password"}
                  placeholder="Enter Value"
                  value={link.value}
                  onChange={(e) => {
                    const updatedLinks = [...secretCredential];
                    updatedLinks[index].value = e.target.value;
                    setSecretCredential(updatedLinks);
                    setError((prevError) => {
                      const updatedErrors = [
                        ...(prevError.secretCredentials || []),
                      ];

                      updatedErrors[index] = {
                        ...updatedErrors[index],
                        value: "",
                      };

                      return {
                        ...prevError,
                        secretCredentials: updatedErrors,
                      };
                    });
                  }}
                  className={
                    error?.secretCredentials?.[index]?.value ? "error" : ""
                  }
                />
                <div className="password-icons cursor-pointer">
                  {visibleKeys[index] ? (
                    <svg
                      width="18"
                      height="12"
                      viewBox="0 0 18 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        toggleSecretKeys(index);
                      }}
                    >
                      <path
                        d="M8.7198 9.23071C9.66405 9.23071 10.466 8.90023 11.1258 8.23925C11.7855 7.57828 12.1153 6.77567 12.1153 5.83142C12.1153 4.88717 11.7848 4.08519 11.1239 3.42547C10.4629 2.76575 9.66028 2.43589 8.71603 2.43589C7.77178 2.43589 6.9698 2.76638 6.31008 3.42735C5.65036 4.08833 5.32051 4.89094 5.32051 5.83519C5.32051 6.77944 5.65099 7.58142 6.31197 8.24114C6.97294 8.90085 7.77555 9.23071 8.7198 9.23071V9.23071M8.71792 8.0833C8.09292 8.0833 7.56167 7.86455 7.12417 7.42705C6.68667 6.98955 6.46792 6.4583 6.46792 5.8333C6.46792 5.2083 6.68667 4.67705 7.12417 4.23955C7.56167 3.80205 8.09292 3.5833 8.71792 3.5833C9.34292 3.5833 9.87417 3.80205 10.3117 4.23955C10.7492 4.67705 10.9679 5.2083 10.9679 5.8333C10.9679 6.4583 10.7492 6.98955 10.3117 7.42705C9.87417 7.86455 9.34292 8.0833 8.71792 8.0833V8.0833M8.71906 11.6666C6.80271 11.6666 5.05661 11.138 3.48076 10.0809C1.90491 9.02372 0.744658 7.60787 0 5.8333C0.744658 4.05874 1.90453 2.64288 3.47961 1.58573C5.0547 0.528576 6.80042 0 8.71677 0C10.6331 0 12.3792 0.528576 13.9551 1.58573C15.5309 2.64288 16.6912 4.05874 17.4358 5.8333C16.6912 7.60787 15.5313 9.02372 13.9562 10.0809C12.3811 11.138 10.6354 11.6666 8.71906 11.6666V11.6666M8.71792 5.8333V5.8333V5.8333V5.8333V5.8333V5.8333V5.8333V5.8333V5.8333V5.8333M8.71792 10.4166C10.2874 10.4166 11.7283 10.0034 13.0408 9.17705C14.3533 8.35066 15.3568 7.23608 16.0512 5.8333C15.3568 4.43053 14.3533 3.31594 13.0408 2.48955C11.7283 1.66316 10.2874 1.24997 8.71792 1.24997C7.14847 1.24997 5.7075 1.66316 4.395 2.48955C3.0825 3.31594 2.07903 4.43053 1.38458 5.8333C2.07903 7.23608 3.0825 8.35066 4.395 9.17705C5.7075 10.0034 7.14847 10.4166 8.71792 10.4166V10.4166"
                        fill="#6366F1"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        toggleSecretKeys(index);
                      }}
                    >
                      <path
                        d="M15.7726 12.973L14.6496 11.85C14.7996 11.0218 14.5633 10.2773 13.9408 9.61625C13.3185 8.95542 12.5548 8.7 11.6496 8.85L10.5266 7.727C10.7523 7.62567 10.9837 7.54967 11.2208 7.499C11.458 7.44834 11.7176 7.423 11.9996 7.423C13.1343 7.423 14.0974 7.81884 14.8891 8.6105C15.6808 9.40217 16.0766 10.3653 16.0766 11.5C16.0766 11.782 16.0513 12.0448 16.0006 12.2885C15.9499 12.532 15.8739 12.7602 15.7726 12.973ZM18.9533 16.0845L17.8496 15.05C18.4829 14.5667 19.0454 14.0375 19.5371 13.4625C20.0288 12.8875 20.4496 12.2333 20.7996 11.5C19.9663 9.81667 18.7704 8.47917 17.2121 7.4875C15.6538 6.49584 13.9163 6 11.9996 6C11.5163 6 11.0413 6.03334 10.5746 6.1C10.1079 6.16667 9.64959 6.26667 9.19959 6.4L8.03434 5.23475C8.66634 4.98342 9.31184 4.79817 9.97084 4.679C10.6298 4.55967 11.3061 4.5 11.9996 4.5C14.3431 4.5 16.4565 5.14617 18.3398 6.4385C20.2232 7.73084 21.5969 9.418 22.4611 11.5C22.0906 12.3935 21.6121 13.2275 21.0256 14.002C20.4389 14.7763 19.7482 15.4705 18.9533 16.0845ZM19.7611 21.8693L15.7151 17.8538C15.2023 18.0436 14.6339 18.1988 14.0101 18.3193C13.3864 18.4398 12.7163 18.5 11.9996 18.5C9.64959 18.5 7.53617 17.8538 5.65934 16.5615C3.78234 15.2692 2.40859 13.582 1.53809 11.5C1.90725 10.6167 2.38417 9.79267 2.96884 9.028C3.5535 8.26317 4.19709 7.6 4.89959 7.0385L2.13034 4.2385L3.18434 3.18475L20.8148 20.8153L19.7611 21.8693ZM5.95359 8.09225C5.42525 8.51275 4.91142 9.01825 4.41209 9.60875C3.91275 10.1991 3.50859 10.8295 3.19959 11.5C4.03292 13.1833 5.22875 14.5208 6.78709 15.5125C8.34542 16.5042 10.0829 17 11.9996 17C12.4548 17 12.908 16.9615 13.3593 16.8845C13.8105 16.8077 14.1932 16.7283 14.5073 16.6463L13.2418 15.35C13.0713 15.4192 12.8739 15.4743 12.6496 15.5153C12.4253 15.5564 12.2086 15.577 11.9996 15.577C10.8649 15.577 9.90175 15.1812 9.11009 14.3895C8.31842 13.5978 7.92259 12.6347 7.92259 11.5C7.92259 11.2975 7.94317 11.0857 7.98434 10.8645C8.02534 10.6433 8.08042 10.4411 8.14959 10.2578L5.95359 8.09225Z"
                        fill="#6366F1"
                      />
                    </svg>
                  )}
                </div>
                <p className="error-text">
                  {error?.secretCredentials?.[index]?.value}
                </p>
              </div>

              <button
                className="copy-link cursor-pointer"
                onClick={() => {
                  if (link.value) {
                    navigator.clipboard.writeText(link.value);
                    setShowCopied(true);
                    setTimeout(() => {
                      setShowCopied(false);
                    }, 1000);
                  }
                }}
              >
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
            value={clientGuidance}
            onChange={(e) => setClientGuidance(e.target.value)}
          />
        </div>
      </section>
      <section id="buttons">
        <div className="flex-container">
          <button
            className="preview-project cursor-pointer"
            onClick={handlePreview}
          >
            Preview Handoff
          </button>
          <button
            className="create-project cursor-pointer"
            onClick={handleGenerate}
          >
            Generate Handoff
          </button>
        </div>
      </section>
      <Toaster show={showCopied} />
    </div>
  );
};

export default CreateProjectHandoff;
