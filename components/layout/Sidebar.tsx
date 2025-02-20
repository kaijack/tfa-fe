import React, { useEffect, useRef } from "react";
import { FaFolder, FaTh } from "react-icons/fa";
import { useRouter } from "next/router";

type MenuItem = {
  id: string; 
  name: string;
  depth: number;
  children?: MenuItem[];
};

type SidebarProps = {
  menu: MenuItem[];
  loading: boolean;
  onMenuClick: (id: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ menu, loading, onMenuClick }) => {
  const router = useRouter();
  const currentPath = router.asPath; 
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const findParentIds = (items: MenuItem[], targetId: string): string[] => {
    for (const item of items) {
      if (item.id === targetId) return [item.id]; 
      if (item.children) {
        const parentIds = findParentIds(item.children, targetId);
        if (parentIds.length > 0) return [item.id, ...parentIds];
      }
    }
    return [];
  };

  const updateOpenItems = (path: string) => {
    if (menu.length > 0) {
      const normalizedPath = decodeURIComponent(path.replace("/", ""));
      const openIds = findParentIds(menu, normalizedPath);
      setOpenItems(openIds); 
    }
  };
  
  useEffect(() => {
    updateOpenItems(currentPath); 
  }, [menu, currentPath]);

  const toggleItem = (id: string, hasChildren: boolean) => {
    if (hasChildren) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
    onMenuClick(id); 
  };

  
  const renderMenu = (items: MenuItem[], depth = 0) => {
    return (
      <ul className="text-sm">
        {items.map((item) => (
          <li key={item.id} className="mb-1">
            <div
              className={`flex items-center relative cursor-pointer rounded-md px-3 py-2 hover:bg-gray-700 ${
                openItems.includes(item.id) ? "text-white" : "text-gray-400"
              } ${currentPath === `/${item.id}` ? "bg-gray-700" : ""}`}
              style={{
                paddingLeft: `${depth * 16 + 16}px`,
              }}
              onClick={() =>
                toggleItem(item.id, !!(item.children && item.children.length > 0))
              }
            >
              {depth === 0 ? (
                <FaFolder className="text-gray-400 mr-2" />
              ) : (
                <FaTh className="text-gray-400 mr-2" />
              )}
              <span>{item.name}</span>
            </div>
            {item.children && openItems.includes(item.id) && (
              <div>{renderMenu(item.children, depth + 1)}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white">
      <div className="p-4 text-lg font-bold">Sidebar</div>
      <nav className="p-2">
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : menu?.length > 0 ? (
          renderMenu(menu)
        ) : (
          <p className="text-gray-400">No menu available</p>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
