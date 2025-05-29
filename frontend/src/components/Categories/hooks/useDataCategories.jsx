import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useDataCategories = () => {
  const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/categorias";
  const [id, setId] = useState("");
  const [nameCategory, setNameCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(""); // New state for status
  const [image, setImage] = useState(""); // New state for image
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const response = await fetch(API);
    if (!response.ok) {
      throw new Error("Error fetching categories");
    }
    const data = await response.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const saveCategory = async (e) => {
    e.preventDefault();
    const newCategory = {
      name: nameCategory,
      description,
      status, // Include status
      image, // Include image
    };

    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    });

    if (!response.ok) {
      throw new Error("Error saving category");
    }

    const data = await response.json();
    toast.success("Category saved");
    fetchCategories();
    setNameCategory("");
    setDescription("");
    setStatus(""); // Clear status
    setImage(""); // Clear image
  };

  const deleteCategory = async (id) => {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error deleting category");
    }

    toast.success("Category deleted");
    fetchCategories();
  };

  const updateCategories = async (dataCategory) => {
    setId(dataCategory._id);
    setNameCategory(dataCategory.name);
    setDescription(dataCategory.description);
    setStatus(dataCategory.status); // Set status
    setImage(dataCategory.image); // Set image
    setActiveTab("form");
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const editCategory = {
        name: nameCategory,
        description,
        status,
        image,
      };
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCategory),
      });

      if (!response.ok) {
        throw new Error("Error updating category");
      }

      toast.success("Category updated");
      fetchCategories();
      setId("");
      setNameCategory("");
      setDescription("");
      setStatus(""); // Clear status
      setImage(""); // Clear image
      setActiveTab("list");
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  return {
    activeTab,
    setActiveTab,
    id,
    nameCategory,
    setNameCategory,
    description,
    setDescription,
    status,
    setStatus, // Include setter for status
    image,
    setImage, // Include setter for image
    categories,
    loading,
    saveCategory,
    deleteCategory,
    updateCategories,
    handleEdit,
  };
};

export default useDataCategories;