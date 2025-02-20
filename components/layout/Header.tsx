import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center px-4 py-2 bg-white ">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 4h16v2H4V4zm0 5h16v2H4V9zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
          </svg>
        </span>
        <span>/ {title}</span>
      </div>
    </div>
  );
};

export default Header;
