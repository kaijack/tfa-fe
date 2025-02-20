import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MenuItem } from "types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";


export const useGetMenus = () =>
  useQuery<MenuItem[]>({
    queryKey: ["menus"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/menus/hierarchy`);
      return response.data; 
    },
  });


export const useCreateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (menu: MenuItem) => {
      const response = await axios.post(`${API_URL}/menus`, menu, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menus"]); 
    },
    onError: (error) => {
      console.error("Error creating menu:", error);
    },
  });
};


export const useUpdateMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (menu: MenuItem) => {
      const response = await axios.put(`${API_URL}/menus/${menu.id}`, menu, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menus"]); 
    },
    onError: (error) => {
      console.error("Error updating menu:", error);
    },
  });
};


export const useDeleteMenu = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/menus/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["menus"]); 
    },
    onError: (error) => {
      console.error("Error deleting menu:", error);
    },
  });
};
