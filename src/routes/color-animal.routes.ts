import {Router} from 'express';
import colorAnimal from '../controllers/color-animal.controller';

const router = Router();

router.get('/all', colorAnimal.getAllColorsAndAnimals)
router.get('/random', colorAnimal.getRandomColorsAndAnimals)
router.post('/add', colorAnimal.addColorAnimal);
router.post('/edit', colorAnimal.editColorsAndAnimals);
router.delete('/delete', colorAnimal.deleteColorsAndAnimals);


export default router;