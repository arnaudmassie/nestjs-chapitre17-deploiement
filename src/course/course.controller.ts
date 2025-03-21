import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseEntity } from './entities/course.entity';
import { AuthGuard } from 'src/guards/auth.guards';
import { Roles } from 'src/guards/role.decorator';
import { Role } from 'src/user/interface/role';
import { CreateCourseDto } from './interface/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(Role.Student)
  createCourse(
    @Body() body: CreateCourseDto,
    @Req() { user },
  ): Promise<CourseEntity> {
    return this.courseService.createCourse({ ...body, userId: user.sub });
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.Student, Role.Teacher)
  findMyCourses(@Req() { user }): Promise<CourseEntity[]> {
    return this.courseService.findCourses(user.sub);
  }
}
