// components/Root.jsx
import React from "react";
import { Outlet } from "react-router";
import LiquidEther from "../components/LiquidEther";
import Navigation from "../components/Navigation";

const Root = () => {
  return (
    <div id="home" className="relative min-h-screen ref={containerRef}">
      <div className="fixed inset-0 -z-10">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={15}
          cursorSize={90}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.3}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={0.5}
          autoRampDuration={0.6}
        />
      </div>

      {/* Dark overlay for better readability */}
      <div className="fixed inset-0 -z-5 bg-deep-navy/70 backdrop-blur-[1px]"></div>

      <Navigation />
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
