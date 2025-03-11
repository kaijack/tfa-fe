
export interface LayoutProps  {
  children: React.ReactNode;
  menu: any[];
  loading: boolean;
  menuName: string;
  onMenuClick: (name: string) => void;
};
export interface SidebarProps {
  menu: MenuItem[];
  setIsSidebarOpen: (isOpen: boolean) => void;
  loading: boolean;
  isSidebarOpen: boolean;
  menuName: string;
  onMenuClick: (name: string) => void;
};
export interface HeaderProps  {
  title: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
};
export interface MenuItem {
  id: string | "";
  parent_id: string | "";
  parent_name: string | "";
  name: string | "";
  depth: number | 0;
  children: MenuItem[] | [];
  canAddChild?: boolean
}
export interface SaveItem {
  parent_id: string | null;
  depth: number;
  id: string | null;
  name: string | null;
  parentName: string | null;
  children: MenuItem[];
}
export interface MenuFormProps {
  onSave: (menu: MenuItem) => void;
  initialData?: MenuItem | null;
  onCancel: () => void;
  handleExpandAll: () => void;
}

export interface MenuTreeNodeProps {
  menu: MenuItem;
  expandedNodes: Set<string>;
  setExpandedNodes: (nodes: Set<string>) => void;
  setSelectedMenu: (menu: MenuItem) => void;
  setShowForm: (show: boolean) => void;
  addChildMenu: (menu: MenuItem) => void;
  toggleExpand: (menuId: string) => void;
  maxDepth?: number;
};

export interface MenuTreeFiltersProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  options: string[];
};

export interface MenuTreeActionsProps  {
  setExpandedNodes: (nodes: Set<string>) => void;
  handleExpandAll: () => void;
};
