import { Global, Module } from '@nestjs/common';
import { InitialRepository } from './initial/initial.repository';
import { InitialService } from './initial/initial.service';
import { OrganizationRepository } from './repositories/organization.repository';
import { RegistrationRepository } from './repositories/registration.repository';
import { ServiceRepository } from './repositories/service.repository';
import { SpecialistRepository } from './repositories/specialist.repository';
import { UserRepository } from './repositories/user.repository';
import { MongoDBModule } from '../shared/adapters/mongo';
import { ConfigModule } from '../config/config.module';
import { MongoDBConfig } from '../config/mongodb.config';
import { MongoCollections } from './models/collections.models';
import { SpecialistServiceRepository } from './repositories/specialist_service.repository';

@Global()
@Module({
  imports: [
    MongoDBModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: MongoDBConfig,
    }),
  ],
  providers: [
    InitialRepository,
    InitialService,
    MongoDBModule.forCollection(MongoCollections.USERS),
    MongoDBModule.forCollection(MongoCollections.ORGANIZATIONS),
    MongoDBModule.forCollection(MongoCollections.REGISTRATIONS),
    MongoDBModule.forCollection(MongoCollections.SERVICES),
    MongoDBModule.forCollection(MongoCollections.SPECIALISTS),
    MongoDBModule.forCollection(MongoCollections.SPECIALISTS_SERVICES),
    OrganizationRepository,
    RegistrationRepository,
    ServiceRepository,
    SpecialistRepository,
    SpecialistRepository,
    SpecialistServiceRepository,
    UserRepository,
  ],
  exports: [
    OrganizationRepository,
    RegistrationRepository,
    ServiceRepository,
    SpecialistRepository,
    SpecialistRepository,
    SpecialistServiceRepository,
    UserRepository,
  ],
})
export class DatabaseModule {}
