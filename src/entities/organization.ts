import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Tribe } from "./tribe";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_organization: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  status: number;

  @OneToMany(() => Tribe, (tribe) => tribe.id_organization)
  tribe: Tribe[];
}
