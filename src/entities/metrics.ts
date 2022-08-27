import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    OneToOne,
    JoinColumn
  } from "typeorm";
  import { Tribe } from "./tribe";
  import { Repository } from "./repository";
  
  @Entity()
  export class Metrics {
    @PrimaryGeneratedColumn()
    @ManyToOne(() => Tribe, (tribe) => tribe.id_tribe, {
      nullable: true,
    })
    tribe: Tribe

    @Column({ length: 50 })
    name: string;
    @Column({ length: 1 })
    state: string;
    @CreateDateColumn()
    create_time: Date;
    @Column({ length: 1 })
    status: string;
    @OneToOne(() => Repository)
    @JoinColumn()
    id_repository: Repository
  }
  