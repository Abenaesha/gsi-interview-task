import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import buildingRoutes from 'routes/buildings';
import { AppDataSource } from 'data-source';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/', buildingRoutes);

app.get('/', (req, res) => {
  res.send('Server is running ABDAL');
});

// Start the Express server
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

AppDataSource.initialize()
  .then(async () => {
    console.log('Initialized successfully');
  })
  .catch((error) => console.log(error));
