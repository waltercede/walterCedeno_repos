import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Organization } from "./organization";
import { Repository } from "./repository";

@Entity()
export class Tribe {
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
