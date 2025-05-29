import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useDataProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    const API = "http://localhost:4000/api/products";

    // Obtener todos los productos
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error("Error al obtener los productos");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al cargar los productos");
        } finally {
            setLoading(false);
        }
    };

    // Guardar nuevo producto
    const saveProduct = async (e) => {
        e.preventDefault();
        
        if (!name || !price || !stock) {
            toast.error("Por favor completa los campos obligatorios");
            return;
        }

        try {
            const newProduct = {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock)
            };

            const response = await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                throw new Error("Error al registrar el producto");
            }

            toast.success('Producto registrado exitosamente');
            await fetchProducts(); // Recargar la lista
            clearForm();
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al registrar el producto");
        }
    };

    // Eliminar producto
    const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`${API}/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el producto");
            }

            toast.success('Producto eliminado exitosamente');
            await fetchProducts(); // Recargar la lista
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al eliminar el producto");
        }
    };

    // Preparar producto para edición
    const updateProduct = (product) => {
        setId(product._id);
        setName(product.name);
        setDescription(product.description || "");
        setPrice(product.price.toString());
        setStock(product.stock.toString());
    };

    // Editar producto existente
    const handleEdit = async (e) => {
        e.preventDefault();

        if (!name || !price || !stock) {
            toast.error("Por favor completa los campos obligatorios");
            return;
        }

        try {
            const editProduct = {
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock)
            };

            const response = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editProduct),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar el producto");
            }

            toast.success('Producto actualizado exitosamente');
            await fetchProducts(); // Recargar la lista
            clearForm();
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al actualizar el producto");
        }
    };

    // Limpiar formulario
    const clearForm = () => {
        setId("");
        setName("");
        setDescription("");
        setPrice("");
        setStock("");
    };

    // Cargar productos al montar el componente
    useEffect(() => {
        fetchProducts();
    }, []);

    return {
        // Estados
        products,
        loading,
        id,
        name,
        description,
        price,
        stock,
        
        // Setters
        setName,
        setDescription,
        setPrice,
        setStock,
        
        // Funciones
        fetchProducts,
        saveProduct,
        deleteProduct,
        updateProduct,
        handleEdit,
        clearForm
    };
};

export default useDataProducts;