import { Request, Response } from 'express';
import AdminModel, { IAdmin } from '../models/adminSchema';

class AdminController {
  static async addAdminBySuperAdmin(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;

      const newAdmin: IAdmin = new AdminModel({ username, password, email });

      // Enregistrer le nouvel admin dans la base de données
      await newAdmin.save();

      res.status(201).json({ message: 'Admin ajouté avec succès' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'admin par le super admin :', error);
      res.status(500).json({ error: 'Erreur serveur lors de l\'ajout de l\'admin par le super admin' });
    }
  }
}

export default AdminController;
