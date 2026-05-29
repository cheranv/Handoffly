import { Navigate, Outlet, useNavigation } from "react-router";

import MainHeader from "./MainHeader";
import SideNav from "./SideNav";
import Loader from "../commonComponents/Loader";

export default function RootLayout() {
  const navigation = useNavigation();
  let token =
    sessionStorage.getItem("accessToken") &&
    sessionStorage.getItem("accessToken");
  return (
    <>
      {token ? (
        <>
          <Loader show={navigation.state === "loading"} />
          <MainHeader />
          <main className="main pages">
            <SideNav />
            <div className="container">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <Navigate to="/home" replace />
      )}
    </>
  );
}
