import { Navigate, Outlet, useLoaderData, useLocation } from "react-router";

import Header from "./Header";
import Footer from "./footer";

export default function RootLayout() {
  let token =
    sessionStorage.getItem("accessToken") &&
    sessionStorage.getItem("accessToken");
  return (
    <>
      {token ? (
        <>
          <Header />
          <main className="main">
            <div className="guest-container">
              <Outlet />
            </div>
          </main>
          <Footer />
        </>
      ) : (
        <Navigate to="/home" replace />
      )}
    </>
  );
}
