import { AnnounceEntity } from 'src/announce/entities/announce.entity';
import { SubjectEntity } from 'src/subject/entities/subject.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToOne(() => SubjectEntity, (subject) => subject.level)
  // @OneToMany(() => SubjectEntity, (subject) => subject.level)
  // subject: SubjectEntity;

  @OneToMany(() => AnnounceEntity, (announce) => announce.level)
  @JoinColumn()
  announces: AnnounceEntity[];
}
