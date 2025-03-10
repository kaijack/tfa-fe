import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

type LayoutProps = {
  children: React.ReactNode;
  menu: any[];
  loading: boolean;
  menuName: string;
  onMenuClick: (name: string) => void;
};

const Layout: React.FC<LayoutProps> = ({ children, menu, loading, menuName, onMenuClick }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-row w-full h-screen">
      {/* Sidebar */}
      <Sidebar
        setIsSidebarOpen={setIsSidebarOpen}
        menu={menu}
        loading={loading}
        onMenuClick={onMenuClick}
        menuName={menuName}
        isSidebarOpen={isSidebarOpen}
      />
      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <Header
          title={menuName}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Page Content */}
        <div className="p-4 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;