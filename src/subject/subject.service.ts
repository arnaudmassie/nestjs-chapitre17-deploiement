import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { SUBJECTS } from './bdd';
import { InterfacePostSubject, InterfaceSubject } from './subject';
// import { BddService } from 'src/bdd/bdd.service';
import { LevelInterface, LevelSubjectInterface } from 'src/level/level';
import { LevelService } from 'src/level/level.service';
// import { TOKEN_LEVELS } from 'src/bdd/constante';
// import { ConfigService } from 'src/config/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectEntity } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SubjectService {
  constructor(
    // private bdd: BddService,
    @InjectRepository(SubjectEntity)
    private subjectRepository: Repository<SubjectEntity>,
    // @Inject(forwardRef(() => LevelService))
    // private levelService: LevelService,
    // @Inject('LEVELS') private bddLevels: LevelInterface[],
    // @Inject(TOKEN_LEVELS) private bddLevels: LevelInterface[],
    // private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  // findAll(): InterfaceSubject[] {
  //   // return SUBJECTS;
  //   return this.bdd.get<InterfaceSubject>('subjects');
  // }

  async findAll(): Promise<SubjectEntity[]> {
    // return this.subjectRepository.find();
    // const subjectCache =
    // await this.cacheManager.get<SubjectEntity[]>('findAll');
    // if (!subjectCache) {
    const subjects = await this.subjectRepository.find();
    // await this.cacheManager.set('findAll', subjects, 0);
    return subjects;
    // }
    // return subjectCache;
  }

  // findOneById(id: number): InterfaceSubject {
  //   // const subject = SUBJECTS.find((s) => s.id === id)!;
  //   // const subject = this.findAll().find((s) => s.id === id)!;
  //   // return subject;
  //   return this.bdd.getById<InterfaceSubject>('subjects', id);
  // }
  // findOneById(id: number): Promise<SubjectEntity> {
  async findOneById(id: number): Promise<SubjectEntity | null> {
    // return this.subjectRepository.findOneBy({ id });
    const subject = await this.subjectRepository.findOneBy({ id });

    if (!subject) {
      throw new HttpException(
        `no subject linked to id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return subject;
  }

  findOneByName(name: string): Promise<SubjectEntity | null> {
    return this.subjectRepository.findOneBy({ name });
  }

  // createNewSubject({ name }: InterfacePostSubject): InterfaceSubject[] {
  //   // const sortedByIdSubject = SUBJECTS.sort((a, b) => a.id - b.id);
  //   const sortedByIdSubject = this.findAll().sort((a, b) => a.id - b.id);
  //   const newId = sortedByIdSubject[sortedByIdSubject.length - 1].id + 1;
  //   return [...SUBJECTS, { id: newId, name, levelId: 1 }];
  // }

  async createNewSubject({
    name,
  }: InterfacePostSubject): Promise<SubjectEntity> {
    // if (!name) {
    //   throw new HttpException(
    //     'bad request name not found',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // const newSubject = await this.subjectRepository.save({
    //   name,
    // });
    // return newSubject;
    return await this.subjectRepository.save({
      name,
    });
  }

  // levelAndSubjectFromName(name: string): LevelSubjectInterface[] {
  //   const subject = this.findAll().find((s) => s.name === name)!;
  //   // const levels = this.levelService.findAll();
  //   const levels = this.bddLevels;
  //   const filteredLevels = levels.filter((l) => l.id === subject.levelId);
  //   return filteredLevels.map((level) => ({
  //     level,
  //     subject,
  //   }));
  // }

  // async levelAndSubjectFromName(name: string): Promise<LevelSubjectInterface> {
  //   const subject = await this.subjectRepository.findOneBy({ name });
  //   return {
  //     subject: {
  //       id: subject?.id!,
  //       name: subject?.name!,
  //     },
  //     level: {
  //       id: subject?.level?.id!,
  //       name: subject?.level?.name!,
  //     },
  //   };
  // }

  findFavorite(): string {
    // return this.configService.get('FAVORITE_SUBJECT');
    // return 'Maths';
    return this.configService.get<string>('FAVORITE_SUBJECT')!;
  }
}
