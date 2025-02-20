import React, { useState, useEffect } from "react";
import { useGetMenus, useCreateMenu, useUpdateMenu, useDeleteMenu } from "@/api/menus";
import MenuTreeFilters from "../MenuTree/MenuTreeFilters";
import MenuTreeActions from "../MenuTree/MenuTreeActions";
import MenuTreeNode from "../MenuTree/MenuTreeNode";
import MenuForm from "./Menu-Registration";
import { MenuItem } from "types/types";

const MenuTree: React.FC = () => {
  const { data: menus = [], isLoading, isError } = useGetMenus();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { mutate: createMenu } = useCreateMenu();
  const { mutate: updateMenu } = useUpdateMenu();
  const { mutate: deleteMenu } = useDeleteMenu();

  useEffect(() => {
    if (menus.length > 0 && selectedFilter === "All") {
      setSelectedFilter(menus[0]?.name || "All");
    }
  }, [menus]);
  
  const filteredMenus =
    selectedFilter === "All"
      ? menus
      : menus?.filter((menu: any) => menu.name.startsWith(selectedFilter));

  const handleSave = (menu: MenuItem) => {
    if (menu.id) {
      updateMenu(menu); 
    } else {
      createMenu(menu); 
    }
    setShowForm(false);
  };

  const isDataOptions = menus?.map((x) => x?.name);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* Sidebar Panel */}
      <div className="w-full md:w-[400px] p-6 overflow-auto">
        {/* Filters */}
        <MenuTreeFilters
          options={isDataOptions}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        {/* Expand/Collapse Actions */}
        <MenuTreeActions filteredMenus={filteredMenus} setExpandedNodes={setExpandedNodes} />

        {/* Menu Tree */}
        {isLoading ? (
          <div>Loading menus...</div>
        ) : isError ? (
          <div>Error loading menus. Please try again.</div>
        ) : filteredMenus.length > 0 ? (
          <ul className="relative list-none">
            {filteredMenus?.map((menu: any) => (
              <MenuTreeNode
                key={menu.id}
                menu={menu}
                expandedNodes={expandedNodes}
                setExpandedNodes={setExpandedNodes}
                setSelectedMenu={setSelectedMenu}
                setShowForm={setShowForm}
              />
            ))}
          </ul>
        ) : (
          <div>No menus available for this filter.</div>
        )}
      </div>

      {/* Form Panel */}
      {showForm && (
        <div className="fixed bottom-0 left-0 w-full md:relative md:w-full bg-white p-6 md:flex-1">
          <MenuForm
            onSave={handleSave}
            initialData={selectedMenu}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MenuTree;
