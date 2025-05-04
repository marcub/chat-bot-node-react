import { Router } from 'express';
const router = Router();
import { getAnswerQuestion } from '../controller/ragController.js';

router.post('/getAnswerQuestion', getAnswerQuestion);

export default router;