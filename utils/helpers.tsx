import { MenuItem } from "types/types";

export const normalizeName = (name: string) =>
    encodeURIComponent(
        name
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9\-]/g, "")
    );


export const transformMenus = (data: MenuItem[]): MenuItem[] => {
    return data?.map((menu) => ({
        id: menu.id || "",
        name: menu.name || "Unnamed Menu",
        depth: menu.depth || 0,
        parent_id: menu.parent_id || "",
        parent_name: menu.parent_name || "",
        children: menu.children ? transformMenus(menu.children) : [],
    }));
};

export const findMenuById = (menuList: MenuItem[], normalizedId: string): MenuItem | null => {
    for (const menu of menuList) {
        if (normalizeName(menu.id) === normalizedId || normalizeName(menu.name) === normalizedId) {
            return menu;
        }
        if (menu.children) {
            const found = findMenuById(menu.children, normalizedId);
            if (found) return found;
        }
    }
    return null;
};


export const markCanAddChild = (menus: MenuItem[]): MenuItem[] => {
    return menus.map((menu, index) => {
        const updatedChildren = markCanAddChild(menu.children);

        const lastChild = updatedChildren.length > 0 ? updatedChildren[updatedChildren.length - 1] : null;
        return {
            ...menu,
            children: updatedChildren,
            canAddChild: index === 0 && lastChild !== null && lastChild.children.length === 0,

        };
    });
};


export const collectNodeIds = (items: MenuItem[]): Set<string> => {
    const allNodeIds = new Set<string>();
    items.forEach((item) => {
        allNodeIds.add(item.id);
        if (item.children && item.children.length > 0) {
            const childNodeIds = collectNodeIds(item.children);
            childNodeIds.forEach((id) => allNodeIds.add(id));
        }
    });
    return allNodeIds;
};