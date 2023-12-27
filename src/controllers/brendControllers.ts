import { Request, Response } from 'express';
import BrendModel from '../models/brendSchema';

class BrendController {
  static async registerBrend(req: Request, res: Response) {
    try {
      const {
        namebrend,
        location,
        phone,
        nameGerent,
        idOffice,
        description,
      } = req.body;

      // Vérifier si la marque existe déjà
      const existingBrend = await BrendModel.findOne({ namebrend });
      if (existingBrend) {
        return res.status(400).json({ error: 'La marque existe déjà' });
      }

      // Créer une nouvelle marque
      const newBrend = new BrendModel({
        namebrend,
        location,
        phone,
        nameGerent,
        idOffice,
        description,
      });

      // Enregistrer la nouvelle marque dans la base de données
      await newBrend.save();

      res.status(201).json({"message": "Enregistrement de la marque réussi"});
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la marque :', error);
      res.status(500).json({ error: 'Erreur serveur lors de l\'enregistrement de la marque' });
    }
  }

  static async getAllBrends(req: Request, res: Response) {
    try {
      // Récupérer toutes les marques depuis la base de données
      const allBrends = await BrendModel.find();

      res.status(200).json({  "message": "Récupération de toutes les marques réussie",data:allBrends});
    } catch (error) {
      console.error('Erreur lors de la récupération de toutes les marques :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération de toutes les marques' });
    }
  }

  static async getBrendById(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const brend = await BrendModel.findById(id);

      if (!brend) {
        return res.status(404).json({ error: 'Marque non trouvée' });
      }

      res.status(200).json({  "message": "Récupération de la marque par ID réussie",data:brend});
    } catch (error) {
      console.error('Erreur lors de la récupération de la marque par ID :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération de la marque par ID' });
    }
  }

  static async deleteBrend(req: Request, res: Response) {
    try {
      const { id } = req.params; // L'identifiant de la marque à supprimer

      // Vérifier si la marque existe
      const existingBrend = await BrendModel.findById(id);
      if (!existingBrend) {
        return res.status(404).json({ error: 'Marque non trouvée' });
      }

      // Supprimer la marque
      await existingBrend.deleteOne();

      res.status(200).json({ message: 'Marque supprimée avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la marque :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la suppression de la marque' });
    }
  }

  static async updateBrend(req: Request, res: Response) {
    try {
      const { id } = req.params; 
      const updates = req.body; 

      // Vérifier si la marque existe
      const existingBrend = await BrendModel.findById(id);
      if (!existingBrend) {
        return res.status(404).json({ error: 'Marque non trouvée' });
      }

      // Mettre à jour la marque
      await existingBrend.updateOne(updates);

      // Récupérer la marque mise à jour depuis la base de données
      const updatedBrend = await BrendModel.findById(id);

      res.status(200).json({ message: 'Marque mise à jour avec succès', data: updatedBrend });
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la marque :', error);
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la marque' });
    }
  }

}

export default BrendController;
