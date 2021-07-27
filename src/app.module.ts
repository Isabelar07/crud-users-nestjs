import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'Users',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),

    UsersModule,
  ],
  controllers: [
    UsersController, AppController],
  providers: [
    UsersService, AppService],
})
export class AppModule { }
