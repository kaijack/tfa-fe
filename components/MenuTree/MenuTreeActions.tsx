import React from "react";
import { useDispatch } from "react-redux";
import { setExpandedNodes } from "@/redux/slices/menuSlice";

type MenuTreeActionsProps = {
  setExpandedNodes: (nodes: Set<string>) => void;
  handleExpandAll: () => void;
};

const MenuTreeActions: React.FC<MenuTreeActionsProps> = ({ handleExpandAll }) => {
  const dispatch = useDispatch();
  const allNodeIds = new Set<string>();
  const handleCollapseAll = () => {
    dispatch(setExpandedNodes(allNodeIds));
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
