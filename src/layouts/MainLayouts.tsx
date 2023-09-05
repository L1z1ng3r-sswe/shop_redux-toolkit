import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayouts = () => {
  const lacation = useLocation();
  const [isAuthPage, setIsAuthPage] = useState(false);
  useEffect(() => {
    if (location.pathname === "/auth") {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      {isAuthPage ? (
        <div
          style={{
            margin: "0 auto",
            width: "100%",
            height: "100vh",
            backgroundColor: "black",
          }}
        >
          <Outlet />
        </div>
      ) : (
        <div
          style={{
            margin: "0 auto",
            // marginTop: "2vh",
            maxWidth: "80vw",
            minHeight: "90vh",
          }}
        >
          <Outlet />
        </div>
      )}
    </>
  );
};

export default MainLayouts;
