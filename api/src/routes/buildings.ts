import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Buildings } from 'entities/Building';

const router = express.Router();

// Retrieve a list of buildings
router.get('/buildings', async (req: Request, res: Response) => {
  try {
    const buildings = await AppDataSource.manager.find(Buildings);

    console.log(buildings);

    return res.status(200).json({ data: buildings });
  } catch (error) {
    console.error('Error retrieving buildings:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
