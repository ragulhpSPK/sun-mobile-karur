import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const router = useRouter();
  const result = useSelector((data) => {
    return data.search.searches;
  });

  return (
    <div>
      {router.pathname.split("/").includes("dashboard") ||
      router.pathname.split("/").includes("admin") ||
      router.pathname.split("/").includes("explore") ||
      router.pathname.split("/").includes("customPage") ? (
        ""
      ) : (
        <Navbar />
      )}
      <div>{children}</div>
      {router.pathname.split("/").includes("dashboard") || result.length > 0 ? (
        ""
      ) : router.pathname.split("/").includes("profiles") ||
        router.pathname.split("/").includes("admin") ||
        router.pathname.split("/").includes("explore") ||
        router.pathname.split("/").includes("customPage") ? (
        ""
      ) : (
        <Footer />
      )}
    </div>
  );
}

export default Layout;
