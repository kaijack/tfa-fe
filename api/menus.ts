import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MenuItem } from "types/types";


const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


const fetchMenus = async () => {
  const { data } = await axios.get(`${API_URL}/menus/hierarchy`);
  return data;
};

export const useGetMenus = () => {
  return useQuery({
    queryKey: ["menus"], 
    queryFn: fetchMenus,
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false, 
  });
};

export const useCreateMenu = async (menus: MenuItem) => {
  return axios.post(`${API_URL}/menus`, menus);
};

export const updateMenu = async (menu: MenuItem) => {
  const response = await axios.put(`${API_URL}/menus/${menu.id}`, menu);
  return response.data;
};

export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] }); 
    },
  });
};

export const useDeleteMenu = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/menus/${id}`);
    },
    onSuccess: () => {
      
    },
    onError: (error) => {
      console.error("Error deleting menu:", error);
    },
  });
};
