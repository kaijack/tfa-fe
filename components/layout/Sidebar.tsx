import React, { useEffect } from "react";
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
  menuName: String;
};

const Sidebar: React.FC<SidebarProps> = ({ menu, loading, onMenuClick, menuName }) => {
  const router = useRouter();
  const currentPath = router.asPath; 
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const findParentNames = (items: MenuItem[], targetName: string): string[] => {
    for (const item of items) {
      if (item.name === targetName) return [item.name];
      if (item.children) {
        const parentNames = findParentNames(item.children, targetName);
        if (parentNames.length > 0) return [item.name, ...parentNames];
      }
    }
    return [];
  };

  const updateOpenItems = (path: string) => {
    if (menu.length > 0) {
      const normalizedPath = decodeURIComponent(path.replace("/", ""));
      const openNames = findParentNames(menu, normalizedPath);
      setOpenItems(openNames);
    }
  };
  console.log(menuName);
  
  useEffect(() => {
    if (currentPath?.includes(String(menuName))) {
      updateOpenItems(currentPath); // Ensure data is available before updating
    }
  }, [menu, currentPath]); // Dependency array for when data is loaded
  
  const toggleItem = (name: string, hasChildren: boolean) => {
    if (hasChildren) {
      setOpenItems((prev) =>
        prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
      );
    }
    onMenuClick(name);
  };

  const renderMenu = (items: MenuItem[], depth = 0) => {
    return (
      <ul className="text-sm">
        {items.map((item) => (
          <li key={item.name} className="mb-1">
            <div
              className={`flex items-center relative cursor-pointer rounded-md px-3 py-2 hover:bg-gray-700 ${
                openItems.includes(item.name) ? "text-white" : "text-gray-400"
              } ${currentPath === `/${item.name}` ? "bg-gray-700" : ""}`}
              style={{
                paddingLeft: `${depth * 16 + 16}px`,
              }}
              onClick={() =>
                toggleItem(item.name, !!(item.children && item.children.length > 0))
              }
            >
              {depth === 0 ? (
                <FaFolder className="text-gray-400 mr-2" />
              ) : (
                <FaTh className="text-gray-400 mr-2" />
              )}
              <span>{item.name}</span>
            </div>
            {item.children && openItems.includes(item.name) && (
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
