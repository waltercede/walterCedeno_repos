import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Tribe } from "./tribe";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_organization: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  status: number;

  @Column({ length: 50, nullable: true })
  email: string;

  @OneToMany(() => Tribe, (tribe) => tribe.id_organization)
  tribe: Tribe[];
}
