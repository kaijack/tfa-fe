import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import { useGetMenus } from "@/api/menus";
import { MenuItem } from "types/types";
import { findMenuById, normalizeName, transformMenus } from "utils/helpers";

const MenuPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [menu, setMenu] = useState<MenuItem | null>(null);
  const [menuName, setMenuName] = useState<string>("");
  const [DynamicComponent, setDynamicComponent] = useState<React.ReactNode>(null);
  const { data, isLoading, isError } = useGetMenus();

  const loadDynamicComponent = async (menuName: string) => {
    try {
        const normalizedMenuName = normalizeName(menuName);
        console.log("Loading dynamic component for:", normalizedMenuName);

        const Component = dynamic(() =>
            import(`@/components/DynamicPages/${normalizedMenuName}`).catch(() => {

                return () => <div>Component not found for menu: {menuName}</div>;
            })
        );

        setDynamicComponent(<Component />);
    } catch (error) {
        console.error(`Error loading dynamic component for menu "${menuName}":`, error);
        setDynamicComponent(<div>Failed to load component</div>);
    }
};
 
  useEffect(() => {
    if (data) {
      const transformedMenus = transformMenus(data);
      setMenus(transformedMenus);

      if (id) {
        const normalizedId = id as string;
        const foundMenu = findMenuById(transformedMenus, normalizedId);
        setMenu(foundMenu);
        setMenuName(foundMenu?.name || "");

        if (foundMenu) {
          loadDynamicComponent(foundMenu.name);
        }
      }
    }
  }, [data, id]);

  const handleMenuClick = (menuId: string) => {
    const normalizedMenuId = normalizeName(menuId);
   
    router
      .push(`/${normalizedMenuId}`)
      .then(() => console.log(`Navigated to /${normalizedMenuId}`))
      .catch((error) => console.error("Error during navigation:", error));
  };
      

 
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load menus.</p>;

  return (
    <Layout menu={menus} loading={isLoading} menuName={menuName} onMenuClick={handleMenuClick}>
      {DynamicComponent ? (
        <>
        <h1 className="font-bold text-2xl">{menuName}</h1> <br/>
        {DynamicComponent}
        </>
      ) : menu ? (
        <div>
          <h1 className="text-xl font-bold">{menu.name}</h1>
          <p>Details or content for menu: {menu.name}</p>
        </div>
      ) : (
        <p>No content available for this menu.</p>
      )}
    </Layout>
  );
};

export default MenuPage;
