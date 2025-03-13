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


export const markCanAddChild = (menus: MenuItem[], depth: number = 0): MenuItem[] => {
    return menus.map((menu, index) => {
        const updatedChildren = markCanAddChild(menu.children, depth + 1);
        const childrenLength = menu.children.length;
        
        if (childrenLength > 0 && depth >= 3) {
            const isThirdToLastChild = depth > 2 ? true : false;
            return {
                ...menu,
                children: updatedChildren,
                canAddChild: isThirdToLastChild,
            };
        }
        
        if (depth > 4) {
            return {
                ...menu,
                children: updatedChildren,
                canAddChild: false,
            };
        }

        
        if (childrenLength <= 0 && depth <= 1) {
            return {
                ...menu,
                children: updatedChildren,
                canAddChild: true,
            };
        }
        if (childrenLength === 1 && depth >= 1) {
            return {
                ...menu,
                children: updatedChildren,
                canAddChild: true,
            };
        }

        return {
            ...menu,
            children: updatedChildren,
            canAddChild: false,
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