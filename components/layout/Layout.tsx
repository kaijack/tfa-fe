import React from "react";
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
  return (
    <div className="flex flex-row w-full h-screen">
      {/* Sidebar */}
      <Sidebar menu={menu} loading={loading} onMenuClick={onMenuClick} menuName={menuName} />

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <Header title={menuName} />

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
