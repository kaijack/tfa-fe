import { HeaderProps } from "@/types/types";
import React from "react";
import { FaFolder } from "react-icons/fa";



const Header: React.FC<HeaderProps> = ({ title, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="flex flex-col items-start pl-4">
      {/* Button */}
      <div className="flex items-center space-x-2 text-sm mt-3 -ml-1">
        {!isSidebarOpen && (
          <button
            className={`top-5 transition-all duration-300 z-50 rounded-md text-black ${isSidebarOpen ? "left-[100px]" : "left-4"
              }`}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <div
              style={{
                maskImage: `url(/icons/menuOpen.svg)`,
                WebkitMaskImage: `url(/icons/menuOpen.svg)`,
                maskSize: "cover",
                WebkitMaskSize: "cover",
              }}
              className="w-7 h-7 bg-black"
            />
          </button>
        )}
      </div>

      {/* Folder Icon and Title */}
      <span className="flex items-center mt-2">
        <FaFolder className="text-gray-300 mr-2" />
        <span className="ml-1 text-gray-300"> / </span>
        <span className="ml-2"> {title}</span>
      </span>
    </div>
  );
};

export default Header;