import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,BaseEntity
} from "typeorm";
import { Organization } from "./organization";
import { Repository } from "./repository";

@Entity()
export class Tribe  extends BaseEntity{
  @PrimaryGeneratedColumn()
  id_tribe: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  status: number;

  @ManyToOne(() => Organization, (organization) => organization.id_organization)
  id_organization: Organization;

  @OneToMany(() => Repository, (repository) => repository.id_tribe)
  repository: Repository[];
}
