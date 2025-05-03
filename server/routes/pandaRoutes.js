import { Router } from 'express';
const router = Router();
import { getUpcomingMatches, getPastMatches } from '../controller/pandaController.js';

router.get('/upcomingMatches', getUpcomingMatches);
router.get('/pastMatches', getPastMatches);

export default router;