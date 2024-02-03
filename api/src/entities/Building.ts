import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Buildings {
  @PrimaryGeneratedColumn('uuid')
  geom_id: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  city: string;

  @Column({ type: 'varchar', length: 255 })
  country: string;

  @Column({ name: 'roof_material', type: 'varchar', length: 255 })
  roofMaterial: string;

  @Column({ name: 'roof_type', type: 'varchar', length: 255 })
  roofType: string;

  @Column({ type: 'float' })
  area: number;

  @Column({ type: 'integer' })
  storeys: number;

  @Column({ type: 'float' })
  height: number;

  @Column({
    name: 'geometry',
    type: 'geometry',
    spatialFeatureType: 'GeometryCollection',
    srid: 4326,
  })
  geometry: any;
}
