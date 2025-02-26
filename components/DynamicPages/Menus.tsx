import React, { useState, useEffect } from "react";
import { useGetMenus } from "@/api/menus";
import MenuTreeFilters from "@/components/MenuTree/MenuTreeFilters";
import MenuTreeActions from "@/components/MenuTree/MenuTreeActions";
import MenuTreeNode from "@/components/MenuTree/MenuTreeNode";
import MenuForm from "./Menu-Registration";
import { MenuItem } from "types/types";
import { useRouter } from "next/router";
import { markCanAddChild } from "utils/helpers";

const MenuTree: React.FC = () => {
  const router = useRouter();
  const { data: menus = [], isLoading, isError } = useGetMenus();
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (menus.length > 0) {
      const allNodeIds = new Set<string>();

      const collectNodeIds = (items: MenuItem[]) => {
        items.forEach((item) => {
          allNodeIds.add(item.id);
          if (item.children && item.children.length > 0) {
            collectNodeIds(item.children);
          }
        });
      };

      collectNodeIds(menus);
      setExpandedNodes(allNodeIds);
    }
  }, [menus]);

  const filteredMenus = menus?.filter((menu: any) => menu.name.startsWith(selectedFilter));

  const handleSave = async (menu: MenuItem) => {
    try {
      setShowForm(false);
    } catch (error) {
      console.error("Error saving menu:", error);
    }
  };

  const isDataOptions = menus?.map((x: MenuItem) => x?.name);

  function addChildMenu(params: any) {
    const isParams = {
      id: "",
      parent_id: params?.id || "",
      parent_name: params?.name || "",
      name: "",
      depth: params?.depth + 1 || 0,
      children: [],
    }
    router.push({
      pathname: "/Menu-Registration",
      query: isParams
    });
  }

  const toggleExpand = (menuId: string) => {
    setExpandedNodes((prev) => {
      const newExpandedNodes = new Set(prev);
      if (newExpandedNodes.has(menuId)) {
        newExpandedNodes.delete(menuId);
      } else {
        newExpandedNodes.add(menuId);
      }
      return newExpandedNodes;
    });
  };

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
        <MenuTreeActions setExpandedNodes={setExpandedNodes} handleExpandAll={handleExpandAll} />

        {/* Menu Tree */}
        {isLoading ? (
          <div>Loading menus...</div>
        ) : isError ? (
          <div>Error loading menus. Please try again.</div>
        ) : filteredMenus.length > 0 ? (
          <ul className="relative list-none">
            {markCanAddChild(filteredMenus)?.map((menu: any) => (
              <MenuTreeNode
                addChildMenu={addChildMenu}
                key={menu.id}
                menu={menu}
                expandedNodes={expandedNodes}
                setExpandedNodes={setExpandedNodes}
                setSelectedMenu={setSelectedMenu}
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
