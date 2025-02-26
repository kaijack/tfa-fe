import React from "react";
import { MenuItem } from "../../types/types";

type MenuTreeActionsProps = {
  setExpandedNodes: React.Dispatch<React.SetStateAction<Set<string>>>;
  handleExpandAll: () => void;
};


const MenuTreeActions: React.FC<MenuTreeActionsProps> = ({
  setExpandedNodes,
  handleExpandAll,
}) => {

  const handleCollapseAll = () => {
    setExpandedNodes(() => new Set());
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
