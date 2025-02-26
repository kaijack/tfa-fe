import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/layout/Layout";
import { useGetMenus } from "@/api/menus";
import { MenuItem } from "types/types";
import { transformMenus } from "utils/helpers";

const Home: React.FC = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [menuName, setMenuName] = useState<string>("");
  const [activePage, setActivePage] = useState<string | null>(null);
  const [DynamicComponent, setDynamicComponent] = useState<React.ReactNode>(null);
  const router = useRouter();
  const { pathname } = router;

  const { data } = useGetMenus();

  const normalizeName = (name: string) =>
    encodeURIComponent(name.trim().replace(/\s+/g, "-"));

  useEffect(() => {
    if (data) {
      const transformedMenus = transformMenus(data);
      setMenus(transformedMenus);

      const currentMenu = transformedMenus.find(
        (menu) => `/${(menu.name)}` === pathname
      );


      if (currentMenu) {
        setMenuName(currentMenu.name);
        loadDynamicComponent(currentMenu.name);
      } else if (transformedMenus.length > 0) {
        const defaultMenu = transformedMenus[0];
        setMenuName(defaultMenu.name);
        loadDynamicComponent(defaultMenu.name);
        router.replace(`/${(defaultMenu.name)}`);
      }
    }
  }, [data, pathname]);


  const loadDynamicComponent = async (menuName: string) => {
    try {
      const normalizedMenuName = normalizeName(menuName);

      const Component = dynamic(() =>
        import(`@/components/DynamicPages/${normalizedMenuName}`).catch(() => {
          console.error(`Component for menu "${menuName}" not found.`);
          return () => <div>Component not found</div>;
        })
      );

      setDynamicComponent(<Component />);
      setActivePage(menuName);
    } catch (error) {
      console.error(`Error loading dynamic component for menu "${menuName}":`, error);
    }
  };

  const handleMenuClick = (menuName: string) => {
    if (menuName !== activePage) {
      setMenuName(menuName);
      loadDynamicComponent(menuName);
      router.push(`/${menuName}`);
    }
  };

  return (
    <Layout
      menu={menus}
      menuName={menuName}
      loading={false}
      onMenuClick={handleMenuClick}
    >
      {DynamicComponent || <div>Loading content...</div>}
    </Layout>
  );
};

export default Home;
