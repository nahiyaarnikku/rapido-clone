import React, { Suspense, useContext } from "react";
import "./safety.css";
import DataContext from "../../Context/Context";
import Footer from "../Footer/Footer";
import ClipLoader from "react-spinners/ClipLoader";
const Overview = React.lazy(() => import("./Overview"));
const Cutomers = React.lazy(() => import("./Cutomers"));
const Captains = React.lazy(() => import("./Captains"));


const Safety = () => {
  const navs = ["Overview", "Customers", "Captains"];
  const { safetyNav, setSafetyNav } = useContext(DataContext);

  return (
    <div className="safety-container">
      <div className="nav-containers px-2 px-md-4">
        {navs.map((nav, index) => (
          <p
            className="safety-nav"
            key={index}
            onClick={() => setSafetyNav(nav)}
          >
            {nav}
          </p>
        ))}
      </div>
      <div className="main">
        {safetyNav === "Overview" ? (
          <Suspense
            fallback={
              <div className="suspense">
                <ClipLoader
                  color={"#f9c935"}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            }
          >
            <Overview />
          </Suspense>
        ) : safetyNav === "Customers" ? (
          <Suspense
            fallback={
              <div className="suspense">
                <ClipLoader
                  color={"#f9c935"}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            }
          >
            <Cutomers />
          </Suspense>
        ) : (
          <Suspense
            fallback={
              <div className="suspense">
                <ClipLoader
                  color={"#f9c935"}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            }
          >
            <Captains />
          </Suspense>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Safety;
