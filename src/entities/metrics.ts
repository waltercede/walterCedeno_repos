import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column, OneToOne,
  JoinColumn,
  BaseEntity
} from "typeorm";
import { Repository } from "./repository";

@Entity()
export class Metrics extends BaseEntity{
  // @PrimaryColumn()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  coverage: number;

  @Column({ type: 'int' })
  bugs: number;

  @Column({ type: 'int' })
  vulnerabilities: number;

  @Column({ type: 'int' })
  hotspot: number;

  @Column({ type: 'int' })
  code_smells: number;


  @OneToOne(() => Repository, { nullable: true })
  @JoinColumn()
  id_repository: Repository

}
