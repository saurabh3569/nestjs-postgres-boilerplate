import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from 'entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(data: UserDto): Promise<User> {
    const isUsernameNotAvailable = await this.userRepository.exists({
      where: { username: data.username },
    });

    if (isUsernameNotAvailable) {
      throw new ConflictException('Username Already Exist!');
    }

    return await this.userRepository.save(data);
  }

  async login(data: UserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: data.username, password: data.password },
    });

    if (!user) {
      throw new ConflictException('Invalid Credentials!');
    }

    return user;
  }
}
