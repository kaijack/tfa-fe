import React from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { MenuItem } from "../../types/types";

type MenuTreeNodeProps = {
  menu: MenuItem;
  expandedNodes: Set<string>;
  setExpandedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  setSelectedMenu: (menu: MenuItem) => void;
  setShowForm: (show: boolean) => void;
};

const MenuTreeNode: React.FC<MenuTreeNodeProps> = ({
  menu,
  expandedNodes,
  setExpandedNodes,
  setSelectedMenu,
  setShowForm,
}) => {
  const toggleExpand = (id: string) => {
    setExpandedNodes((prevExpandedNodes) => {
      const updatedNodes = new Set<string>(prevExpandedNodes);
      if (updatedNodes.has(id)) {
        updatedNodes.delete(id);
      } else {
        updatedNodes.add(id);
      }
      return updatedNodes;
    });
  };

  return (
    <li className="relative">
      {/* Line to parent */}
      <div className="absolute top-0 left-0 w-px h-full bg-gray-300"></div>
      <div className="flex items-center relative pl-4">
        {/* Horizontal line */}
        <div className="absolute left-0 top-1/2 w-4 h-px bg-gray-300"></div>

        {menu.children?.length > 0 && (
          <button
            className="p-1 text-gray-500 hover:text-gray-800"
            onClick={() => toggleExpand(menu.id)}
          >
            {expandedNodes.has(menu.id) ? <AiOutlineDown size={16} /> : <AiOutlineRight size={16} />}
          </button>
        )}
        <span
          className="cursor-pointer hover:text-blue-500"
          onClick={() => {
            setSelectedMenu(menu);
            setShowForm(true);
          }}
        >
          {menu.name}
        </span>
      </div>

      {/* Render children */}
      {expandedNodes.has(menu.id) && menu.children && (
        <ul className="pl-6 relative">
          {menu.children.map((child) => (
            <MenuTreeNode
              key={child.id}
              menu={child}
              expandedNodes={expandedNodes}
              setExpandedNodes={setExpandedNodes}
              setSelectedMenu={setSelectedMenu}
              setShowForm={setShowForm}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuTreeNode;
