import express from 'express';
import { resizeImage} from './controller';

const router = express();

router.get('/api/images', resizeImage);

export default router;