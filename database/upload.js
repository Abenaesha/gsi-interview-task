import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

import { promises as fs } from 'fs';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
});


const createTableQuery = `
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE TABLE IF NOT EXISTS buildings (
    geom_id UUID PRIMARY KEY,
    address VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    roof_material VARCHAR(255),
    roof_type VARCHAR(255),
    area FLOAT,
    storeys INT,
    height FLOAT,
    geometry GEOMETRY(GeometryCollection, 4326)
);
`;

const insertDataQuery = `
INSERT INTO buildings (geom_id, address, city, country, roof_material, roof_type, area, storeys, height, geometry)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, ST_GeomFromGeoJSON($10))
ON CONFLICT (geom_id) DO NOTHING;
`;

const testConnection = async () => {
  try {
    await pool.connect();
    console.log('Database connection successful!');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

const insertData = async () => {
  await testConnection();
  await pool.query(createTableQuery);

  // Read the JSON file
  const fileContent = await fs.readFile('buildings.json', 'utf8');
  const buildings = JSON.parse(fileContent);

  for (const building of buildings) {
    const {
      geom_id,
      address,
      city,
      country,
      roof_material,
      roof_type,
      area,
      storeys,
      height,
      geometry,
    } = building;

    await pool.query(insertDataQuery, [
      geom_id,
      address,
      city,
      country,
      roof_material,
      roof_type,
      area,
      storeys,
      height,
      JSON.stringify(geometry),
    ]);
  }

  console.log('Data insertion complete.');
  await pool.end();
};

insertData().catch(console.error);
