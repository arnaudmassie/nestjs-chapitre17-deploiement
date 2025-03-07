import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './interface/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOne(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async createUser({
    firstName,
    lastName,
    email,
    password,
    role,
  }: CreateUserDto): Promise<UserEntity> {
    const passwordHash = await hash(password, 10);
    return this.userRepository.save({
      firstName,
      lastName,
      email,
      passwordHash,
      role,
    });
  }
}
