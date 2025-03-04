import React, { useEffect, useState } from "react";
import { FaFolder, FaTh } from "react-icons/fa";
import { useRouter } from "next/router";

type MenuItem = {
  name: string;
  depth: number;
  children?: MenuItem[];
};

type SidebarProps = {
  menu: MenuItem[];
  loading: boolean;
  onMenuClick: (name: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ menu, loading, onMenuClick }) => {
  const router = useRouter();
  const currentPath = decodeURIComponent(router.asPath.replace("/", ""));
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    if (menu.length > 0) {
      const findAncestors = (items: MenuItem[], target: string, path: string[] = []): string[] | null => {
        for (const item of items) {
          const newPath = [...path, item.name];
          console.log(item.name, target);
          
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
  // console.log(openItems);
  

  const renderMenu = (items: MenuItem[], depth = 0) => (
    <ul className="text-sm">
      {items.map((item) => (
        <li key={item.name} className="mb-1">
          <div
            className={`flex items-center relative cursor-pointer rounded-md px-3 py-2 hover:bg-gray-700 
              ${openItems[openItems?.length -1] === item.name ? "bg-gray-700 text-white" : "text-gray-400"}`}
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
    <div className="h-screen w-64 bg-gray-900 text-white">
      <div className="p-4 text-lg font-bold">Sidebar</div>
      <nav className="p-2">
        {loading ? <p className="text-gray-400">Loading...</p> : menu.length > 0 ? renderMenu(menu) : <p className="text-gray-400">No menu available</p>}
      </nav>
    </div>
  );
};

export default Sidebar;
