import React from "react";
import { MenuItem } from "../../types/types";

type MenuTreeActionsProps = {
  filteredMenus: MenuItem[];
  setExpandedNodes: (nodes: Set<string>) => void;
};

const MenuTreeActions: React.FC<MenuTreeActionsProps> = ({
  filteredMenus,
  setExpandedNodes,
}) => {
  const handleExpandAll = () => {
    const allNodeIds = new Set<string>();
    const collectNodeIds = (items: MenuItem[]) => {
      items.forEach((item) => {
        allNodeIds.add(item.id);
        if (item.children && item.children.length > 0) {
          collectNodeIds(item.children);
        }
      });
    };
    collectNodeIds(filteredMenus);
    setExpandedNodes(allNodeIds);
  };

  const handleCollapseAll = () => {
    setExpandedNodes(new Set<string>());
  };

  return (
    <div className="flex gap-2 items-center mb-4">
      <button
        className="bg-[#1D2939] text-white py-2 px-4 rounded-2xl"
        onClick={handleExpandAll}
      >
        Expand All
      </button>
      <button
        className="bg-white text-black py-2 px-4 rounded-2xl"
        onClick={handleCollapseAll}
      >
        Collapse All
      </button>
    </div>
  );
};

export default MenuTreeActions;
