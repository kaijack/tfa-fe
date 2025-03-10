import React from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";
import { MenuItem } from "@/types/types";

type MenuTreeNodeProps = {
  menu: MenuItem;
  expandedNodes: Set<string>;
  setExpandedNodes: (nodes: Set<string>) => void;
  setSelectedMenu: (menu: MenuItem) => void;
  setShowForm: (show: boolean) => void;
  addChildMenu: (menu: MenuItem) => void;
  toggleExpand: (menuId: string) => void;
  maxDepth?: number;
};

const MenuTreeNode: React.FC<MenuTreeNodeProps> = ({
  menu,
  expandedNodes,
  setExpandedNodes,
  setSelectedMenu,
  setShowForm,
  addChildMenu,
  maxDepth = 0,
  toggleExpand,
}) => {
  const isExpanded = expandedNodes.has(menu.id);

  const getLastChildId = (node: MenuItem): string => {
    if (!node.children || node.children.length === 0) {
      return node.id;
    }
    return getLastChildId(node.children[node.children.length - 1]);
  };

  return (
    <li className="relative">
      <div className="absolute top-0 left-0 w-px h-full bg-gray-300"></div>
      <div className="flex items-center relative pl-4">
        {
          menu?.children?.length === 0 ? <div className="absolute left-0 top-1/2 w-9 h-px bg-gray-300"></div> : <div className="absolute left-0 top-1/2 w-4 h-px bg-gray-300"></div>
        }

        {/* Expand/Collapse Button */}
        {(menu.children?.length > 0 || menu.depth < maxDepth && menu.depth === 0 && maxDepth === 0) && (
          <button
            className="p-1 text-gray-500 hover:text-gray-800 pl-1"
            onClick={() => toggleExpand(menu.id)}
          >
            {isExpanded ? <AiOutlineDown size={16} /> : <AiOutlineRight size={16} />}
          </button>
        )}

        {/* Menu Name */}
        {
          menu?.children?.length === 0 ?

            <span
              className="cursor-pointer hover:text-blue-500 pl-7"
              onClick={() => {
                setSelectedMenu(menu);
                setShowForm(true);
              }}
            >
              {menu.name}
            </span> :

            <span
              className="cursor-pointer hover:text-blue-500 pl-1"
              onClick={() => {
                setSelectedMenu(menu);
                setShowForm(true);
              }}
            >
              {menu.name}
            </span>

        }
        {/* Add Child Button */}
        {menu.canAddChild && (
          <button
            className="ml-2 p-1 text-blue-500 hover:text-blue-700"
            onClick={() => addChildMenu(menu)}
          >
            <FiPlus size={16} />
          </button>
        )}
      </div>

      {/* Render Children */}
      {isExpanded && menu.children && menu.children.length > 0 && (
        <ul className="pl-6 relative">
          {menu.children.map((child) => (
            <MenuTreeNode
              key={child.id}
              menu={child}
              expandedNodes={expandedNodes}
              setExpandedNodes={setExpandedNodes}
              setSelectedMenu={setSelectedMenu}
              setShowForm={setShowForm}
              addChildMenu={addChildMenu}
              maxDepth={maxDepth}
              toggleExpand={toggleExpand}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default MenuTreeNode;
