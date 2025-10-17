import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import LiquidEther from "../components/LiquidEther";
import Navigation from "../components/Navigation";

const Root = () => {
  const [etherProps, setEtherProps] = useState({
    resolution: 0.3,
    cursorSize: 70,
    mouseForce: 15,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // mobile
        setEtherProps({ resolution: 0.5, cursorSize: 35, mouseForce: 8 });
      } else if (width < 1024) {
        // tablet
        setEtherProps({ resolution: 0.4, cursorSize: 55, mouseForce: 12 });
      } else {
        // desktop
        setEtherProps({ resolution: 0.3, cursorSize: 70, mouseForce: 15 });
      }
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="home" className="relative min-h-screen">
      <div className="fixed inset-0 -z-10">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={0.5}
          autoRampDuration={0.6}
          {...etherProps} // responsive props here
        />
      </div>

      <Navigation />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
