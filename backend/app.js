import express from "express";
import productsRoutes from "./src/routes/products.js"
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
import sucursalesRoutes from "./src/routes/sucursales.js"

const app = express();

app.use(express.json());

app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/sucursales", sucursalesRoutes);


export default app;



