import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 72, nullable: false })
  passwordHash: string;

  @Column({ type: 'bigint', nullable: false })
  createdAt: number; //unix timestamp in milliseconds

  @Column({ type: 'bigint', nullable: false })
  updatedAt: number; //unix timestamp in milliseconds

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
