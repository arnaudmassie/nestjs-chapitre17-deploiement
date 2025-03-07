import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelEntity } from 'src/level/entities/level.entity';
import { SubjectEntity } from 'src/subject/entities/subject.entity';
import { Repository } from 'typeorm';
import { AnnounceEntity } from './entities/announce.entity';
import { SubjectService } from 'src/subject/subject.service';
import { LevelService } from 'src/level/level.service';
// import { CreateAnnounce } from './interface/create-announce';
import { CreateAnnounceDto } from './interface/create-announce.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AnnounceService {
  constructor(
    @InjectRepository(AnnounceEntity)
    private announceRepository: Repository<AnnounceEntity>,
    private subjectService: SubjectService,
    private levelService: LevelService,
    private userService: UserService,
  ) {}

  async findOneById(id: number) {
    return await this.announceRepository.findOneBy({ id });
  }

  async findAllByUser(user: UserEntity) {
    return await this.announceRepository.find({
      where: {
        teacher: user,
      },
      relations: ['courses'],
    });
  }

  async createAnnounce({
    price,
    level: { name: levelName },
    subject: { name: subjectName },
    userId,
    // }: CreateAnnounce): Promise<AnnounceEntity> {
    // }: CreateAnnounceDto): Promise<AnnounceEntity> {
  }: CreateAnnounceDto & { userId: number }): Promise<AnnounceEntity> {
    // if (!levelName || !subjectName || !price) {
    //   throw new HttpException(
    //     'bad request subject or level or price not found',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // if (price < 0) {
    //   throw new HttpException(
    //     'bad request price too low',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    const user = await this.userService.findOneById(userId);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    const level = (await this.levelService.findOneByName(levelName))!;
    if (!level) {
      throw new HttpException('level not found', HttpStatus.NOT_FOUND);
    }
    const subject = (await this.subjectService.findOneByName(subjectName))!;
    if (!subject) {
      throw new HttpException('subject not found', HttpStatus.NOT_FOUND);
    }
    const announce = await this.announceRepository.save({
      price,
      level,
      subject,
      teacher: user,
    });

    return announce;
  }

  async searchAnnounce({
    levelName,
    subjectName,
  }: {
    levelName: string;
    subjectName: string;
  }): Promise<AnnounceEntity> {
    const level = (await this.levelService.findOneByName(levelName))!;
    const subject = (await this.subjectService.findOneByName(subjectName))!;
    const announce = await this.announceRepository.findOneBy({
      level,
      subject,
    });

    if (!announce) {
      throw new HttpException(
        `no announce linked to subject: ${subjectName} and level: ${levelName}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return announce!;
  }
}
