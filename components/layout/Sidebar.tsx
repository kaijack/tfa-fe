import React, { useEffect, useState } from "react";
import { FaFolder, FaTh, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { MenuItem, SidebarProps } from "types/types";

const Sidebar: React.FC<SidebarProps> = ({ menu, loading, onMenuClick, isSidebarOpen, setIsSidebarOpen }) => {
  const router = useRouter();
  const currentPath = decodeURIComponent(router.asPath.replace("/", ""));
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    if (menu.length > 0) {
      const findAncestors = (items: MenuItem[], target: string, path: string[] = []): string[] | null => {
        for (const item of items) {
          const newPath = [...path, item.name];

          if (item.name.toLowerCase() === target.toLowerCase()) {
            return newPath;
          }
          if (item.children) {
            const foundPath = findAncestors(item.children, target, newPath);
            if (foundPath) return foundPath;
          }
        }
        return null;
      };

      const matchedPath = findAncestors(menu, currentPath?.replace("/", ''));
      if (matchedPath) {
        setOpenItems(matchedPath);
      }
    }
  }, [menu, currentPath]);

  const toggleItem = (name: string, hasChildren: boolean) => {
    setOpenItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
    onMenuClick(name);
  };

  const renderMenu = (items: MenuItem[], depth = 0) => (
    <ul className="text-sm">
      {items.map((item) => (
        <li key={item.name} className="mb-1">
          <div
            className={`flex items-center relative cursor-pointer rounded-md px-3 py-2 hover:bg-gray-700 
              ${openItems[openItems?.length - 1] === item.name ? "bg-gray-700 text-white" : "text-gray-400"}`}
            style={{ paddingLeft: `${depth * 16 + 16}px` }}
            onClick={() => toggleItem(item.name, !!item.children?.length)}
          >
            {depth === 0 ? <FaFolder className="text-gray-400 mr-2" /> : <FaTh className="text-gray-400 mr-2" />}
            <span>{item.name}</span>
          </div>
          {item.children && openItems.includes(item.name) && (
            <div>{renderMenu(item.children, depth + 1)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex">
      {/* ✅ Toggle Button */}
      <button
        className={`absolute top-4 transition-all duration-300 z-50 p-2 rounded-md ${
          isSidebarOpen ? "left-[200px]" : "left-4"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
          <img
            src="/icons/menuClose.svg"
            alt="Menu Close"
            className="w-5 h-5 filter brightness-0 invert" 
          />
      </button>
  
      {/* ✅ Sidebar with transition */}
      <div
        className={`h-screen bg-gray-900 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-4 text-lg font-bold">Sidebar</div>
        <nav className="p-2">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : menu.length > 0 ? (
            renderMenu(menu)
          ) : (
            <p className="text-gray-400">No menu available</p>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
