import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SubjectService } from 'src/subject/subject.service';
import { LevelInterface, LevelSubjectInterface } from './level';
import { LEVELS } from './bdd';
// import { BddService } from 'src/bdd/bdd.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LevelEntity } from './entities/level.entity';

@Injectable()
export class LevelService {
  // constructor(private readonly subjectService: SubjectService) {}
  constructor(
    @InjectRepository(LevelEntity)
    private levelRepository: Repository<LevelEntity>,
    // @Inject(forwardRef(() => SubjectService))
    // private readonly subjectService: SubjectService,
    // private bdd: BddService,
  ) {}

  // findAll(): LevelInterface[] {
  //   return this.bdd.get<LevelInterface>('levels');
  // }

  findAll(): Promise<LevelEntity[]> {
    return this.levelRepository.find();
  }

  findOneByName(name: string): Promise<LevelEntity | null> {
    return this.levelRepository.findOneBy({ name });
  }

  // findLevelAndSubjectByName(name: string): LevelSubjectInterface[] {
  //   const level = this.findAll().find((l) => l.name === name)!;
  //   const subjects = this.subjectService.findAll();
  //   const filteredSubjects = subjects.filter((s) => s.levelId === level?.id);

  //   return filteredSubjects.map<LevelSubjectInterface>((subject) => ({
  //     subject,
  //     level,
  //   }));
  // }

  // async findLevelAndSubjectByName(
  //   name: string,
  // ): Promise<LevelSubjectInterface> {
  //   const level = await this.levelRepository.findOneBy({ name });
  //   return {
  //     subject: {
  //       id: level?.subject.id!,
  //       name: level?.subject.name!,
  //     },
  //     level: {
  //       id: level?.id!,
  //       name: level?.name!,
  //     },
  //   };
  // }

  async createNewLevel(level: { name: string }): Promise<LevelEntity> {
    return this.levelRepository.save({ name: level.name });
  }
}
