import { Navigate, Outlet, useLoaderData, useLocation } from "react-router";

import Header from "./Header";
import Footer from "./footer";

export default function RootLayout() {
  return (
    <>
      {true ? (
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
        <Navigate to="login" state={{ from: location }} replace />
      )}
    </>
  );
}
