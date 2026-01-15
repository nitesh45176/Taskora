import express from 'express'
import { acceptTask, cancelByRunner, cancelByUser, createTask, getMyAcceptedTasks, getMyActiveTask, getMyCreatedTasks, getOpenTasks, getTaskById, markDelivered, startTask } from '../controllers/task.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/task', protect, getOpenTasks)
router.get('/task/my-created', protect, getMyCreatedTasks)
router.get('/task/my-accepted', protect, getMyAcceptedTasks)
router.get('/task/my-active', protect, getMyActiveTask)
router.get('/task/:id', protect, getTaskById)
router.post("/", protect, createTask);
router.patch('/task/:taskId/accept',protect, acceptTask)
router.patch('/task/:taskId/start',protect, startTask)
router.patch('/task/:taskId/deliver',protect, markDelivered)
router.patch('/task/:taskId/cancel/user',protect, cancelByUser)
router.patch('/task/:taskId/cancel/runner',protect, cancelByRunner)


export default router;