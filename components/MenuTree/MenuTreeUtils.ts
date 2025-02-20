import { MenuItem } from "../../types/types";

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
