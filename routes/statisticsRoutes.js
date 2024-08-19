import express from 'express';
import { getStatistics } from '../controllers/statisticsController.js'; // Update the path if necessary

const router = express.Router();

router.get('/statistics', getStatistics);

export default router;