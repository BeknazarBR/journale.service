import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from './config/jwt.config';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { SpecialistModule } from './modules/specialist/specialist.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useClass: JwtConfig,
    }),
    ConfigModule,
    DatabaseModule,
    AuthModule,
    OrganizationsModule,
    SpecialistModule,
  ],
  providers: [AuthGuard],
})
export class AppModule {}
