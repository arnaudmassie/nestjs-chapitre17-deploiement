import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AnnounceEntity } from './entities/announce.entity';
import { AnnounceService } from './announce.service';
// import { CreateAnnounce } from './interface/create-announce';
import { CreateAnnounceDto } from './interface/create-announce.dto';
import { SearchQuery } from './interface/search-query';
import { AuthGuard } from 'src/guards/auth.guards';
import { Roles } from 'src/guards/role.decorator';
import { Role } from 'src/user/interface/role';

@Controller('announce')
export class AnnounceController {
  constructor(private announceService: AnnounceService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Teacher)
  // createAnnounce(@Body() body: CreateAnnounce): Promise<AnnounceEntity> {
  // createAnnounce(@Body() body: CreateAnnounceDto): Promise<AnnounceEntity> {
  createAnnounce(
    @Body() body: CreateAnnounceDto,
    @Req() { user },
  ): Promise<AnnounceEntity> {
    // return this.announceService.createAnnounce(body);
    return this.announceService.createAnnounce({ ...body, userId: user.sub });
  }

  @Get('search')
  searchAnnounce(
    // @Query('levelName') levelName: string,
    // @Query('subjectName') subjectName: string,
    @Query() { levelName, subjectName }: SearchQuery,
  ): Promise<AnnounceEntity> {
    return this.announceService.searchAnnounce({ levelName, subjectName });
  }
}
