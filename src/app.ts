import { router } from "./routes/mainRoute.js"
import express from "express";

const app = express();
app.use(express.json());

const PORT : number = 3001;

app.listen(PORT , ()=> console.log(`Server is running at Port : ${PORT}`))
app.use(router);


