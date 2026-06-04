import React, { useEffect, useState } from "react";
import "../../styles/dashboard.scss";
import { InputField } from "../commonComponents/InputField";
import { supabase } from "../../lib/supabase";
import Toaster from "../commonComponents/Toaster";
import { useLoaderData, useNavigate, useRevalidator } from "react-router";
import Loader from "../commonComponents/Loader";
import thumbnail from "../../assets/images/sampleHandoffly.png";
const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [showCopied, setShowCopied] = useState(false);
  const revalidator = useRevalidator();
  const { data } = useLoaderData();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);
    if (error) {
      console.log(error);
    } else {
      revalidator.revalidate();
      setLoading(true);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);

    if (data) {
      setCards(data);
      setLoading(false);
    }
  }, [data]);
  return (
    <>
      <Loader show={loading} />
      <div className="dashboard">
        {/* <h1>Dashboard</h1> */}

        {/* <InputField
        value={""}
        onChange={""}
        placeholder="Search"
        searchable={true}
      /> */}
        <h4>Recent Projects</h4>
        <p className="dashboard-text">
          Manage your client handoffs and project assets in one place.
        </p>
        <div className="flex-container">
          {cards?.map((card) => (
            <div className="card">
              <div className="card-icon">
                <img src={thumbnail} alt="project thumbnail" />
              </div>
              <div className="card-content">
                <p
                  className="card-title"
                  title={card?.project?.projectInfo?.title}
                >
                  {card?.project?.projectInfo?.title}
                </p>
                {card?.project?.projectInfo?.clientName && (
                  <p className="card-client">
                    {" "}
                    <span className="card-client-label">Client:</span>{" "}
                    <span
                      title={card?.project?.projectInfo?.clientName}
                      className="card-client-name"
                    >
                      {card?.project?.projectInfo?.clientName}
                    </span>
                  </p>
                )}
                {card?.project?.projectInfo?.description && (
                  <p
                    className="card-description"
                    title={card?.project?.projectInfo?.description}
                  >
                    {card?.project?.projectInfo?.description.slice(0, 60)}
                    {card?.project?.projectInfo?.description.length > 60
                      ? "..."
                      : ""}
                  </p>
                )}
                <p
                  className="card-url cursor-pointer"
                  title={card.url}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/share/${card?.id}`
                    );
                    setShowCopied(true);
                    setTimeout(() => {
                      setShowCopied(false);
                    }, 1000);
                  }}
                >
                  <svg
                    width="14"
                    height="7"
                    viewBox="0 0 14 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 6.66667H3.33333C2.41111 6.66667 1.625 6.34167 0.975 5.69167C0.325 5.04167 0 4.25556 0 3.33333C0 2.41111 0.325 1.625 0.975 0.975C1.625 0.325 2.41111 0 3.33333 0H6V1.33333H3.33333C2.77778 1.33333 2.30556 1.52778 1.91667 1.91667C1.52778 2.30556 1.33333 2.77778 1.33333 3.33333C1.33333 3.88889 1.52778 4.36111 1.91667 4.75C2.30556 5.13889 2.77778 5.33333 3.33333 5.33333H6V6.66667ZM4 4V2.66667H9.33333V4H4ZM7.33333 6.66667V5.33333H10C10.5556 5.33333 11.0278 5.13889 11.4167 4.75C11.8056 4.36111 12 3.88889 12 3.33333C12 2.77778 11.8056 2.30556 11.4167 1.91667C11.0278 1.52778 10.5556 1.33333 10 1.33333H7.33333V0H10C10.9222 0 11.7083 0.325 12.3583 0.975C13.0083 1.625 13.3333 2.41111 13.3333 3.33333C13.3333 4.25556 13.0083 5.04167 12.3583 5.69167C11.7083 6.34167 10.9222 6.66667 10 6.66667H7.33333Z"
                      fill="#C8C6C8"
                    />
                  </svg>
                  <span className="project-link-url">
                    {`${window.location.origin}/ share/${card?.id}`}
                  </span>
                </p>
                <hr></hr>
                <div className="flex-container card-footer">
                  <span>{formatDate(card.created_at)}</span>
                  <div>
                    <button
                      className="btn cursor-pointer"
                      onClick={() => {
                        window.open(
                          `${window.location.origin}/share/${card?.id}`,
                          "_blank"
                        );
                      }}
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.80768 16.9999C1.30255 16.9999 0.874992 16.8249 0.524995 16.4749C0.174998 16.1249 0 15.6974 0 15.1922V1.80768C0 1.30255 0.174998 0.874992 0.524995 0.524995C0.874992 0.174998 1.30255 0 1.80768 0H8.11532V1.49996H1.80768C1.73075 1.49996 1.66023 1.53202 1.59612 1.59612C1.53202 1.66023 1.49996 1.73075 1.49996 1.80768V15.1922C1.49996 15.2692 1.53202 15.3397 1.59612 15.4038C1.66023 15.4679 1.73075 15.5 1.80768 15.5H15.1922C15.2692 15.5 15.3397 15.4679 15.4038 15.4038C15.4679 15.3397 15.5 15.2692 15.5 15.1922V8.88461H16.9999V15.1922C16.9999 15.6974 16.8249 16.1249 16.4749 16.4749C16.1249 16.8249 15.6974 16.9999 15.1922 16.9999H1.80768V16.9999M6.2192 11.8346L5.16537 10.7807L14.4461 1.49996H10.5V0H16.9999V6.49996H15.5V2.55378L6.2192 11.8346V11.8346"
                          fill="#908FA0"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn cursor-pointer"
                      onClick={() => handleDelete(card.id)}
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
                      </svg>{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            className={`card add-new cursor-pointer  ${
              cards?.length === 0 || !cards ? "no-data" : ""
            }`}
            onClick={() => navigate("/create")}
          >
            <button className="btn cursor-pointer">
              {" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 8H0V6H6V0H8V6H14V8H8V14H6V8Z" fill="#C8C6C8" />
              </svg>
            </button>
            <div className="card-content">
              <p className="card-title">New Project</p>

              <p className="card-description">
                Start a new client handoff workspace
              </p>
            </div>
          </div>
        </div>
        <Toaster show={showCopied} />
      </div>
    </>
  );
};

export default Dashboard;
