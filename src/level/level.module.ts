import { forwardRef, Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { SubjectModule } from 'src/subject/subject.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelEntity } from './entities/level.entity';

@Module({
  // imports: [forwardRef(() => SubjectModule)],
  imports: [
    // forwardRef(() => SubjectModule),
    TypeOrmModule.forFeature([LevelEntity]),
  ],
  controllers: [LevelController],
  providers: [LevelService],
  exports: [LevelService],
})
export class LevelModule {}
