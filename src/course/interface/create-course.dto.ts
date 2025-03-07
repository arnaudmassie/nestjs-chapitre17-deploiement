import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateCourseDto {
  @IsNumber()
  @IsPositive()
  announceId: number;

  // @Type(() => Date)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @IsNumber()
  @IsPositive()
  hours: number;
}
