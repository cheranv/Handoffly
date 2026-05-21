import { Navigate, Outlet, useLoaderData, useLocation } from "react-router";

import Header from "./Header";
import Footer from "./footer";

export default function ClientLayout() {
  return (
    <>
      {true ? (
        <>
          <main className="main client">
            <div className="guest-container">
              <Outlet />
            </div>
          </main>
          <Footer client={true} />
        </>
      ) : (
        <Navigate to="login" state={{ from: location }} replace />
      )}
    </>
  );
}
