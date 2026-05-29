import { Navigate, Outlet, useLoaderData, useLocation } from "react-router";

import Header from "./Header";
import Footer from "./footer";
import RootLayout from "./Root";

export default function ClientLayout() {
  const isInternalUser = !!sessionStorage.getItem("accessToken");
  console.log(isInternalUser);
  return (
    <>
      {isInternalUser ? (
        <RootLayout />
      ) : (
        <>
          <main className="main client">
            <div className="guest-container">
              <Outlet />
            </div>
          </main>
          <Footer client={true} />
        </>
      )}
    </>
  );
}
