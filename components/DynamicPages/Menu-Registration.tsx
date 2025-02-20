import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { MenuFormProps, MenuItem } from "../../types/types";
import { useCreateMenu } from "@/api/menus";

const MenuForm: React.FC<MenuFormProps> = ({
  onSave,
  initialData = null,
  onCancel,
}) => {

  const [menuData, setMenuData] = useState<{
    id: string | null;
    parent_id: string | null;
    parent_name: string | null;
    name: string;
    depth: number;
    children: MenuItem[]
  }>({
    id: initialData?.id || null,
    parent_id: initialData?.parent_id || null,
    parent_name: initialData?.parent_name || null,
    name: initialData?.name || "",
    depth: initialData?.depth || 0,
    children: initialData?.children || []
  });

  useEffect(() => {
    if (initialData?.name) {
      setMenuData((prev) => ({
        ...prev,
        id: initialData.id || "",
        name: initialData.name || "",
        parent_name: initialData.parent_name || "",
      }));
    } else {
      setMenuData((prev) => ({
        ...prev,
        name: "",
      }));
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuData((prev) => ({
      ...prev,
      [name]: name === "depth" ? (value ? parseInt(value, 10) : 0) : value,
    }));
  };


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { id, ...restData } = menuData;

    const menu: MenuItem = {
      parent_id: initialData?.parent_id || "",
      depth: initialData?.depth || 0,
      id: initialData?.id || "",
      name: menuData?.name || "",
      parent_name: initialData?.parent_name || "",
      children: initialData?.children || []
    };


    if (!initialData) handleSave(menu)
    else onSave(menu);
  };

  const handleSave = async (menu: MenuItem) => {
    try {
      await useCreateMenu(menu);
    } catch (error) {
      console.error("Error saving menu:", error);
    }
  };



  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit}>
        {/* Menu ID */}
        {menuData.id && (
          <div className="mb-6">
            <label
              htmlFor="id"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Menu ID
            </label>
            <input
              type="text"
              id="id"
              name="id"
              value={initialData?.id || ""}
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              readOnly
            />
          </div>
        )}

        {/* Depth */}
        <div className="mb-6">
          <label
            htmlFor="depth"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Depth
          </label>
          <input
            type="number"
            id="depth"
            name="depth"
            disabled
            value={initialData?.depth || 0}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Parent ID Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="parent_id"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Parent Data
          </label>
          <input
            type="text"
            id="parent_id"
            name="parent_id"
            value={initialData?.parent_name || "None"}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>

        {/* Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={menuData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            // onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuForm;
