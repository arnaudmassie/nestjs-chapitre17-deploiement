import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SUBJECTS } from './bdd';
import { InterfacePostSubject, InterfaceSubject } from './subject';
import { SubjectService } from './subject.service';
import { LevelSubjectInterface } from 'src/level/level';
import { SubjectEntity } from './entities/subject.entity';
import { AddSubjectDto } from './interface/add-subject.dto';
import { FindOneParams } from './interface/find-one-params';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  // findAll(): InterfaceSubject[] {
  findAll(): Promise<SubjectEntity[]> {
    return this.subjectService.findAll();
  }

  @Get('favorite')
  findFavorite(): string {
    return this.subjectService.findFavorite();
  }

  @Get(':id')
  // findOneById(@Param('id') id: string): Promise<SubjectEntity> {
  // findOneById(@Param('id') id: string): Promise<SubjectEntity | null> {
  findOneById(
    // @Param('id', ParseIntPipe) id: number,
    @Param('id', ParseIntPipe) { id }: FindOneParams,
  ): Promise<SubjectEntity | null> {
    // return this.subjectService.findOneById(+id);
    return this.subjectService.findOneById(id);
  }

  // @Get(':name/level')
  // // findLevelAndSubject(@Param('name') name: string): LevelSubjectInterface[] {
  // findLevelAndSubject(
  //   @Param('name') name: string,
  // ): Promise<LevelSubjectInterface> {
  //   return this.subjectService.levelAndSubjectFromName(name);
  // }

  @Post()
  // addSubject(@Body() subject: InterfacePostSubject): InterfaceSubject[] {
  // addSubject(@Body() subject: InterfacePostSubject): Promise<SubjectEntity> {
  addSubject(@Body() subject: AddSubjectDto): Promise<SubjectEntity> {
    return this.subjectService.createNewSubject(subject);
  }
}
