import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    create(dto: CreateUserDto) {
        return this.usersRepository.save(dto)
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    update(id: string, dto: UpdateUserDto) {
        return this.usersRepository.update(id, dto);
    }

    remove(id: string) {
        this.usersRepository.delete(id);

        return { message: 'Deletado com sucesso' }
    }
}