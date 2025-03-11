import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import { updateMenu, useCreateMenu } from "@/api/menus";
import { MenuFormProps } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";

const MenuForm: React.FC<MenuFormProps> = ({ initialData = null }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [menuData, setMenuData] = useState({
    id: initialData?.id || "",
    parent_id: Array.isArray(router.query?.parent_id) ? router.query.parent_id[0] : router.query?.parent_id || initialData?.parent_id || "",
    parent_name: Array.isArray(router.query?.parent_name) ? router.query.parent_name[0] : router.query?.parent_name || initialData?.parent_name || "",
    depth: Number(router.query?.depth) || initialData?.depth || 0,
    name: initialData?.name || "",
    children: initialData?.children || [],
  });

  useEffect(() => {
    setMenuData((prev) => ({
      ...prev,
      id: initialData?.id || prev.id,
      parent_id: initialData?.parent_id || prev.parent_id,
      parent_name: initialData?.parent_name || prev.parent_name,
      name: initialData?.name || prev.name,
      depth: initialData?.depth || prev.depth,
    }));
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuData((prev) => ({
      ...prev,
      [name]: name === "depth" ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 
    try {
      let updatedMenu = null;

      if (menuData.id) {
        updatedMenu = await updateMenu(menuData);
      } else {
        updatedMenu = await useCreateMenu(menuData);
        router.push("/Menus");
      }

      if (updatedMenu) {
        await queryClient.invalidateQueries({ queryKey: ["menus"] });
      }
    } catch (error) {
      console.error("Error saving menu:", error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit}>
        {menuData.id && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Menu ID</label>
            <input type="text" value={menuData.id} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100" readOnly />
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Depth</label>
          <input type="number" name="depth" value={menuData.depth} disabled className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Parent Data</label>
          <input type="text" value={menuData.parent_name || "None"} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100" readOnly />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={menuData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button type="button" className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300" onClick={router.back}>
            Cancel
          </button>
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg text-white ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;
