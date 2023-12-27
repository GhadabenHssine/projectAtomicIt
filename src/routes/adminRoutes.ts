import express from 'express';
import AdminController from '../controllers/adminController';
import verifyToken from '../middleware/verifToken';
import verifAdmin from '../middleware/verifAdmin';

const adminRouter = express.Router();


adminRouter.post('/addBySuperAdmin',verifyToken,verifAdmin, AdminController.addAdminBySuperAdmin);

export default adminRouter;
