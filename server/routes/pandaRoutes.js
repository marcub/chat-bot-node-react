import { Router } from 'express';
const router = Router();
import { getUpcomingMatches } from '../controller/pandaController.js';

router.get('/upcomingMatches', getUpcomingMatches);

export default router;