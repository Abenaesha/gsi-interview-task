import express, { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Buildings } from 'entities/Buildings';

const router = express.Router();

export interface BuildingGeo {
  address: string;
  area: number;
  city: string;
  country: string;
  geom_id: string;
  height: number;
  roofMaterial: string;
  roofType: string;
  storeys: number;
  geometry: any;
}

interface ErrorRes {
  error: string;
}

// Retrieve a list of buildings
router.get('/buildings', async (req: Request, res: Response) => {
  try {
    const buildings = await AppDataSource.manager.find(Buildings);

    return res.status(200).json({ data: buildings });
  } catch (error) {
    console.error('Error retrieving buildings:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get(
  '/buildings/:id',
  async (req: Request, res: Response<{ data: BuildingGeo } | ErrorRes>) => {
    const { id } = req.params;

    try {
      const building = await AppDataSource.manager.findOneBy(Buildings, {
        geom_id: id,
      });

      if (!building) {
        return res.status(404).json({ error: 'Building not found' });
      }

      return res.status(200).json({ data: building });
    } catch (error) {
      console.error('Error retrieving building:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.post(
  '/buildings',
  async (
    req: Request<{}, {}, BuildingGeo>,
    res: Response<{ data: BuildingGeo } | ErrorRes>
  ) => {
    const newBuildingData = req.body;

    console.log(newBuildingData);
    try {
      const newBuilding = AppDataSource.manager.create(
        Buildings,
        newBuildingData
      );

      console.log(newBuilding);

      const savedBuilding = await AppDataSource.manager.save(newBuilding);

      return res.status(201).json({ data: savedBuilding });
    } catch (error) {
      console.error('Error creating building:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

router.patch('/buildings/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (typeof updateData.geometry === 'string') {
      updateData.geometry = JSON.parse(updateData.geometry);
    }

    const building = await AppDataSource.manager.findOneBy(Buildings, {
      geom_id: id,
    });

    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }

    const updatedBuildingData = AppDataSource.manager.merge(
      Buildings,
      building,
      updateData
    );

    const updatedBuilding = await AppDataSource.manager.save(
      Buildings,
      updatedBuildingData
    );

    return res.status(200).json({ data: updatedBuilding });
  } catch (error) {
    console.error('Error updating building:', error);
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
});

router.delete('/buildings/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const building = await AppDataSource.manager.findOneBy(Buildings, {
      geom_id: id,
    });

    if (!building) {
      return res.status(404).json({ error: 'Building not found' });
    }

    await AppDataSource.manager.remove(building);

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting building:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
