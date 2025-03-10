import React from "react";
import { FaFolder } from "react-icons/fa";

type HeaderProps = {
  title: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ title, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="flex flex-col items-start px-4">
      {/* Button */}
      <div className="flex items-center space-x-2 text-sm mt-3">
        {!isSidebarOpen && (
          <button
            className={`top-4 transition-all duration-300 z-50 p-2 rounded-md text-black ${
              isSidebarOpen ? "left-[200px]" : "left-4"
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
        <FaFolder className="text-gray-400 mr-2" />
        <span className="ml-3">/ {title}</span>
      </span>
    </div>
  );
};

export default Header;