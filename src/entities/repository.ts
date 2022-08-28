import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,BaseEntity
} from "typeorm";
import { Tribe } from "./tribe";

@Entity()
export class Repository  extends BaseEntity{
  @PrimaryGeneratedColumn()
  id_repository: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 1 })
  state: string;

  @CreateDateColumn()
  create_time: Date;

  @Column({ length: 1 })
  status: string;

  @ManyToOne(() => Tribe, (tribe) => tribe.id_tribe)
  id_tribe: Tribe
}
