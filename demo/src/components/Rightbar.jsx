import React, { useState } from "react";

const Rightbar = () => {
  const [activeTab, setActiveTab] = useState("scene");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-gray-200">
        <img src="/pic.png" alt="Image" />
      </div>

      {/* Tabs */}
      <div className="flex border border-gray-500 border-r-0 border-l-0">
        <div
          className={`w-1/2 cursor-pointer border-r-2 p-2 text-center text-lg border-gray-500 transition ease-in-out duration-300 ${
            activeTab === "scene"
              ? "bg-white text-gray-800 font-semibold"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabClick("scene")}
        >
          Scene
        </div>

        <div
          className={`w-1/2 cursor-pointer text-center p-2 text-lg transition ease-in-out duration-300  ${
            activeTab === "assets"
              ? "bg-white text-gray-800 font-bold"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabClick("assets")}
        >
          Assets
        </div>
      </div>

      {/* Tabs content based on selected tab */}
      <div className="mt-4">
        {activeTab === "scene" && (
          <div className="flex flex-col px-4 py-2">
            <p>Some Scenes will go here </p>
            <p>Scenes details</p>
          </div>
        )}

        {activeTab === "assets" && (
          <div className="flex flex-col px-4 py-2">
            <p>Some Assets will go here </p>
            <p>Assets details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rightbar;
