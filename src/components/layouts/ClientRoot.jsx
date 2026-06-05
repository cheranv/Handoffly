import { Outlet } from "react-router";

import Footer from "./footer";

export default function ClientLayout() {
  return (
    <>
      <>
        <main className="main client">
          <div className="guest-container">
            <Outlet />
          </div>
        </main>
        <Footer client={true} />
      </>
    </>
  );
}
