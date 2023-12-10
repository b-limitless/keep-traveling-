import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Car } from './cars/car.entity';

@Module({
  // imports: [UsersModule, CarsModule],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], 
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite', 
          database: config.get<string>('DB_NAME'), 
          entities: [User, Car]
        }
      }
    }),
    UsersModule,
    CarsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
