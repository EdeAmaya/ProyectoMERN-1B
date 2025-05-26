import express from "express";
import productsRoutes from "./src/routes/products.js"
import clientsRoutes from "./src/routes/clients.js"
import employeesRoutes from "./src/routes/employees.js"
import sucursalesRoutes from "./src/routes/sucursales.js"
import categoriasRoutes from "./src/routes/categorias.js"
import reviewsRoutes from "./src/routes/reviews.js"
import evaluacionesRoutes from "./src/routes/evaluaciones.js"
import registerEmployeesRoutes from "./src/routes/registerEmployees.js"
import loginRoutes from "./src/routes/login.js"
import cookieParser from "cookie-parser";
import logoutRoutes from "./src/routes/logout.js";
import registerClientsRoutes from "./src/routes/registerClients.js";
import passwordRecoveryRoutes from "./src/routes/passwordRecovery.js";
import blogRuotes from "./src/routes/blog.js";
import { validateAuthToken } from "./src/middlewares/validateAuthToken.js";
import cors from "cors";



const app = express();

app.use(
    cors({
      origin: "http://localhost:5173", // Dominio del cliente
      credentials: true, // Permitir envío de cookies y credenciales
    })
  );

app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productsRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/employees", validateAuthToken(["Employee"]),employeesRoutes);
app.use("/api/sucursales", sucursalesRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/evaluaciones", evaluacionesRoutes);
app.use("/api/registerEmployees", registerEmployeesRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoutes)
app.use("/api/registerClients", registerClientsRoutes);
app.use("/api/passwordRecovery", passwordRecoveryRoutes);

app.use("/api/blog", blogRuotes);



export default app;



