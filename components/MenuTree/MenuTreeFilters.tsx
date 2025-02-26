import React, { useEffect } from "react";

type MenuTreeFiltersProps = {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  options: string[]; 
};

const MenuTreeFilters: React.FC<MenuTreeFiltersProps> = ({
  selectedFilter,
  setSelectedFilter,
  options,
}) => {
  useEffect(() => {
    if (!selectedFilter && options.length > 0) {
      setSelectedFilter(options[0]);
    }
  }, [selectedFilter, options, setSelectedFilter]);

  return (
    <select
      className="w-full bg-white border border-gray-300 rounded-md p-2 mb-4"
      value={selectedFilter}
      onChange={(e) => setSelectedFilter(e.target.value)}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
};

export default MenuTreeFilters;
