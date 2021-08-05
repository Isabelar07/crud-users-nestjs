import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    async create(dto: CreateUserDto) {
        return await this.usersRepository.save(dto);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const userId = await this.usersRepository.findOne(id);
        if (!userId) {
            throw new HttpException('Usuário não existe', HttpStatus.BAD_REQUEST);
        }

        return userId;
    }

    async update(id: string, dto: UpdateUserDto) {
        const userId = await this.findOne(id)

        if (!userId) {
            throw new HttpException('Usuário não existe', HttpStatus.BAD_REQUEST);
        }

        await this.usersRepository.update(userId, dto);

        return userId;
    }

    async remove(id: string) {
        const userId = await this.findOne(id)

        if (!userId) {
            throw new HttpException('Usuário não existe', HttpStatus.BAD_REQUEST);
        }

        await this.usersRepository.delete(userId);

        return { message: 'Deletado com sucesso' };
    }
}