import express from 'express';
import BrendController from '../controllers/brendControllers';

const brendRouter = express.Router();

// Route pour l'enregistrement d'une marque
brendRouter.post('/register', BrendController.registerBrend);
brendRouter.get('/all', BrendController.getAllBrends);
brendRouter.get('/:id', BrendController.getBrendById);
brendRouter.delete('/:id', BrendController.deleteBrend);
brendRouter.put('/update/:id', BrendController.updateBrend);


export default brendRouter;
