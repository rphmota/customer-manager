import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'customers', schema: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn({ name: 'id_customer' })
  id: number;

  @Column()
  name: string;
  
  @Column()
  company_price: number;
  
  @Column()
  salary: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
