import { DataSource, DataSourceOptions } from 'typeorm';
import { LevelEntity } from './level/entities/level.entity';
import { SubjectEntity } from './subject/entities/subject.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AnnounceEntity } from './announce/entities/announce.entity';
import { UserEntity } from './user/entities/user.entity';
import { CourseEntity } from './course/entities/course.entity';

const { env } = process;

const options: DataSourceOptions = {
  // type: 'mariadb',
  // host: 'localhost',
  // port: 3306,
  // username: 'root',
  // password: 'root',
  // database: 'mentor',
  //@ts-ignore
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT!),
  username: env.DB_USERNAME,
  password: env.DB_PASS,
  database: env.DB_NAME,
  //   migrations: ['./migration/*.ts'],
  migrations: ['./dist/migration/*.js'],
  // migrations: ['./dist/migration/*{.ts, .js}'],
  // entities: [SubjectEntity, LevelEntity],
  // entities: [SubjectEntity, LevelEntity, AnnounceEntity],
  entities: [
    SubjectEntity,
    LevelEntity,
    AnnounceEntity,
    UserEntity,
    CourseEntity,
  ],
};

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  ...options,
  synchronize: true,
  // synchronize: false,
};

export const connectionSource = new DataSource(options);
