import React, { useState, useEffect } from "react";
import toast, {Toaster} from 'react-hot-toast';

const useDataEmployees = () => {

    const ApiRegister="http://localhost:4000/api/registerEmployees";
    const ApiEmployees="http://localhost:4000/api/employees";
 
    const [activeTab, setActiveTab] = useState("list");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [dui, setDui] = useState("");
    const [address, setAddress] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [hireDate, setHireDate] = useState("");
    const [isssNumber, setIsssNumber] = useState("");
    const [errorEmpleado, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    
    const cleanData = () => {
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setTelephone("");
        setDui("");
        setAddress("");
        setBirthdate("");
        setHireDate("");
        setIsssNumber("");
        setId("");
    };
    
    //funcion para guardar los datos del usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        if (
            !name ||
            !lastName ||
            !email ||
            !password ||
            !telephone ||
            !dui ||
            !address ||
            !birthdate ||
            !hireDate ||
            !isssNumber
        ) {
            setError("Todos los campos son obligatorios");
            toast.error('Todos los campos son obligatorios');
            setLoading(false);
            return;
        }
    
        try {
            // Corregir nombres de campos para coincidir con el backend
            const newEmployee = {
                name,
                lastname: lastName, // backend usa 'lastname', no 'lastName'
                email,
                password,
                telephone,
                dui,
                address,
                birthday: birthdate, // backend usa 'birthday', no 'birthdate'
                hireDate,
                isssNumber,
                isVerified: false // agregar campo por defecto
            };
    
            console.log(newEmployee, "datos nuevo empleado");
    
            const response = await fetch(ApiRegister, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEmployee),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Hubo un error al registrar el empleado");
            }
    
            const data = await response.json();
            toast.success('Empleado registrado correctamente');
            setSuccess("Empleado registrado correctamente");
            cleanData();
            fetchData();
        } catch (error) {
            setError(error.message);
            console.error("Error:", error);
            toast.error('Ocurrió un error al registrar el empleado');
        } finally {
            setLoading(false);
        }
    };
    
    //funcion para obtener los datos de los empleados
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(ApiEmployees);
            if (!response.ok) {
                throw new Error("Error al obtener los empleados");
            }
            const data = await response.json();
            console.log("Empleados obtenidos:", data);
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Error al cargar los empleados");
            setEmployees([]);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const deleteEmployee = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
            return;
        }
        
        try {
            const response = await fetch(`${ApiEmployees}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!response.ok) {
                throw new Error("Error al eliminar el empleado");
            }
    
            const result = await response.json();
            console.log("Empleado eliminado:", result);
            toast.success('Empleado eliminado correctamente');
            
            // Actualizar la lista después de borrar
            fetchData();
        } catch (error) {
            console.error("Error deleting employee:", error);
            toast.error("Error al eliminar el empleado");
        }
    };
    
    const updateEmployee = async (dataEmployee) => {
        setId(dataEmployee._id);
        setName(dataEmployee.name);
        // Mapear correctamente los nombres de campos
        setLastName(dataEmployee.lastname || dataEmployee.lastName);
        setEmail(dataEmployee.email);
        setTelephone(dataEmployee.telephone);
        setDui(dataEmployee.dui);
        setAddress(dataEmployee.address);
        // Formatear fecha para input date
        setBirthdate(dataEmployee.birthday ? dataEmployee.birthday.split('T')[0] : '');
        setHireDate(dataEmployee.hireDate ? dataEmployee.hireDate.split('T')[0] : '');
        setIsssNumber(dataEmployee.isssNumber);
        setError(null);
        setSuccess(null);
        setActiveTab("form");
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        if (
            !name ||
            !lastName ||
            !email ||
            !telephone ||
            !dui ||
            !address ||
            !birthdate ||
            !hireDate ||
            !isssNumber
        ) {
            setError("Todos los campos son obligatorios");
            toast.error('Todos los campos son obligatorios');
            setLoading(false);
            return;
        }
    
        try {
            // Corregir nombres de campos para coincidir con el backend
            const updatedEmployee = {
                name,
                lastname: lastName, // backend usa 'lastname'
                email,
                password: password || undefined, // solo incluir si hay password
                telephone,
                dui,
                address,
                birthday: birthdate, // backend usa 'birthday'
                hireDate,
                isssNumber,
                isVerified: true // mantener verificado al actualizar
            };
    
            console.log("Actualizando empleado:", updatedEmployee);
    
            const response = await fetch(`${ApiEmployees}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmployee),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error al actualizar el empleado");
            }
    
            const result = await response.json();
            console.log("Empleado actualizado:", result);
            toast.success('Empleado actualizado correctamente');
            setSuccess("Empleado actualizado correctamente");
            cleanData();
            setId("");
            setActiveTab("list");
            fetchData();
        } catch (error) {
            setError(error.message);
            console.error("Error al actualizar:", error);
            toast.error("Error al actualizar el empleado");
        } finally {
            setLoading(false);
        }
    };

    return {
        activeTab,
        setActiveTab,
        id,
        setId,
        name,
        setName,
        lastName,
        setLastName,
        email,
        setEmail,
        password,
        setPassword,
        telephone,
        setTelephone,
        dui,
        setDui,
        address,
        setAddress,
        birthdate,
        setBirthdate,
        hireDate,
        setHireDate,
        isssNumber,
        setIsssNumber,
        errorEmpleado,
        setError,
        success,
        setSuccess,
        loading,
        setLoading,
        employees,
        setEmployees,
        cleanData,
        handleSubmit,
        fetchData,
        deleteEmployee,
        updateEmployee,
        handleUpdate,
    };
};

export default useDataEmployees;