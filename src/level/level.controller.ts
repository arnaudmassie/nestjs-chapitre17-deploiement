import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelSubjectInterface } from './level';
import { LevelEntity } from './entities/level.entity';
import { AddLevelDto } from './interface/add-level.dto';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  // @Get('subject/:name')
  // findLevelAndSubjectByName(
  //   @Param('name') name: string,
  //   // ): LevelSubjectInterface[] {
  // ): Promise<LevelSubjectInterface> {
  //   return this.levelService.findLevelAndSubjectByName(name);
  // }

  @Post()
  // addSubject(@Body() level: AddLevelDto): Promise<LevelEntity> {
  addLevel(@Body() level: AddLevelDto): Promise<LevelEntity> {
    return this.levelService.createNewLevel(level);
  }
}
