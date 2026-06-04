import { Navigate, Outlet, useNavigation } from "react-router";

import MainHeader from "./MainHeader";
import SideNav from "./SideNav";
import Loader from "../commonComponents/Loader";
import { useAuth } from "../../context/AuthContext";

export default function RootLayout() {
  const navigation = useNavigation();

  const { session, loading } = useAuth();
  if (loading) return <Loader show={loading} />;

  return (
    <>
      {session ? (
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
