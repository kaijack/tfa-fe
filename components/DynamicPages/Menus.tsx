import React, { useEffect, useState } from "react";
import { useGetMenus } from "@/api/menus";
import MenuTreeFilters from "@/components/MenuTree/MenuTreeFilters";
import MenuTreeActions from "@/components/MenuTree/MenuTreeActions";
import MenuTreeNode from "@/components/MenuTree/MenuTreeNode";
import MenuForm from "./Menu-Registration";
import { MenuItem } from "types/types";
import { useRouter } from "next/router";
import { markCanAddChild } from "utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSelectedMenu, setExpandedNodes } from "@/redux/slices/menuSlice";

const MenuTree: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: menus = [], isLoading, isError } = useGetMenus();

  const selectedMenu = useSelector((state: RootState) => state.menu.selectedMenu);
  const expandedNodes = useSelector((state: RootState) => new Set(state.menu.expandedNodes));

  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (menus.length > 0) {
      const allNodeIds = new Set<string>();

      const collectNodeIds = (items: MenuItem[]) => {
        items.forEach((item) => {
          allNodeIds.add(item.id);
          if (item.children?.length) collectNodeIds(item.children);
        });
      };

      collectNodeIds(menus);
      dispatch(setExpandedNodes(allNodeIds)); 
    }
  }, [menus, dispatch]);
  
  const filteredMenus = menus.filter((menu: MenuItem) =>
    menu.name.startsWith(selectedFilter)
  );

  const handleSave = async (menu: MenuItem) => {
    try {
      setShowForm(false);
    } catch (error) {
      console.error("Error saving menu:", error);
    }
  };

  const isDataOptions = menus.map((x: MenuItem) => x.name);

  function addChildMenu(params: any) {
    const newMenu = {
      id: "",
      parent_id: params?.id || "",
      parent_name: params?.name || "",
      name: "",
      depth: params?.depth + 1 || 0,
      children: [],
    };
    router.push({
      pathname: "/Menu-Registration",
      query: newMenu,
    });
  }

  const toggleExpand = (menuId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (newExpandedNodes.has(menuId)) {
      newExpandedNodes.delete(menuId);
    } else {
      newExpandedNodes.add(menuId);
    }
    dispatch(setExpandedNodes(newExpandedNodes));
  };

  const handleExpandAll = () => {
    const allNodeIds = new Set<string>();

    const collectNodeIds = (items: MenuItem[]) => {
      items.forEach((item) => {
        allNodeIds.add(item.id);
        if (item.children?.length) collectNodeIds(item.children);
      });
    };

    collectNodeIds(menus);
    dispatch(setExpandedNodes(allNodeIds));
  };

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
        <MenuTreeActions
          setExpandedNodes={(nodes) => dispatch(setExpandedNodes(nodes))} 
          
          handleExpandAll={handleExpandAll}
        />

        {/* Menu Tree */}
        {isLoading ? (
          <div>Loading menus...</div>
        ) : isError ? (
          <div>Error loading menus. Please try again.</div>
        ) : filteredMenus.length > 0 ? (
          <ul className="relative list-none">
            {markCanAddChild(filteredMenus).map((menu) => (
              <MenuTreeNode
                expandedNodes={new Set(expandedNodes)} 
                setExpandedNodes={(nodes) => dispatch(setExpandedNodes(nodes))} 
                setSelectedMenu={(menu: MenuItem) => dispatch(setSelectedMenu(menu))}
                addChildMenu={addChildMenu}
                key={menu.id}
                menu={menu}
                setShowForm={setShowForm}
                toggleExpand={toggleExpand}
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
            handleExpandAll={handleExpandAll}
          />
        </div>
      )}
    </div>
  );
};

export default MenuTree;
