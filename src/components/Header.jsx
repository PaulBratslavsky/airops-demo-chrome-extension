import React from "react";
import reactLogo from "./../assets/react.svg";
import airOpsLogo from "./../assets/air-ops.png";
import strapiLogo from "./../assets/strapi.svg";
import viteLogo from "./../assets/vite.svg";

export default function Header() {
  return (
    <div>
      <div className="flex justify-center">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://strapi.io" target="_blank">
          <img src={strapiLogo} className="logo" alt="Strapi logo" />
        </a>
        <a href="https://airops.com" target="_blank">
          <img src={airOpsLogo} className="logo" alt="AirOps logo" />
        </a>
      </div>
      <h1 className="text-violet-400 text-lg">
        Vite <span className="text-white">+</span> React{" "}
        <span className="text-white">+</span> Strapi{" "}
        <span className="text-white">+</span> AirOps
      </h1>
    </div>
  );
}
