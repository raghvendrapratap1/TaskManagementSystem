import express from "express";
import authRoutes  from './routes/auth.routes.js'
import taskRoutes  from './routes/task.routes.js'
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/auth",authRoutes)
app.use("/api/tasks",taskRoutes)

export default app;