import { SetStateAction } from "react";

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



export interface SidebarProps  {
  menu: MenuItem[];
  setIsSidebarOpen: (isOpen: boolean) => void;
  loading: boolean;
  isSidebarOpen: boolean;
  menuName: string;
  onMenuClick: (name: string) => void;
};
