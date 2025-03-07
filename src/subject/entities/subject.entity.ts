import { AnnounceEntity } from 'src/announce/entities/announce.entity';
import { LevelEntity } from 'src/level/entities/level.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToOne(() => LevelEntity, (level) => level.subject)
  // @ManyToOne(() => LevelEntity, (level) => level.subject)
  // @JoinColumn()
  // level?: LevelEntity;

  @OneToMany(() => AnnounceEntity, (announce) => announce.subject)
  @JoinColumn()
  announces: AnnounceEntity[];
}
