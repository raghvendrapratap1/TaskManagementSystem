import express from 'express';
import { createTask,getMyTasks,updateTask,deleteTask } from '../controllers/task.controller.js';

import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);


router.post("/",createTask);
router.get("/",getMyTasks);
router.put("/:id",authMiddleware,updateTask);
router.delete("/:id",authMiddleware,deleteTask);

export default router;